import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import generateRandomId from '../Utils.js';
import fs from 'fs';

dotenv.config();

let token = "";
let jsonData = [];  // Initialize an empty array to store users

describe("Dmoney API Automation", () => {

    it("1. Admin login", async () => {
        const {data} = await axios.post(`${process.env.base_url}/user/login`, {
            "email": "admin@roadtocareer.net",
            "password": "1234",
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        // Log the response data to verify the output
        console.log(data);

        expect(data.message).to.contains("Login successful");
        //storeToken('token', data.token);
        token = data.token;

    })

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("2. Create 2 customers and 1 agent", async () => {
        const roles = ['Customer', 'Customer', 'Agent'];
        
        for (const role of roles) {
            const { data } = await axios.post(`${process.env.base_url}/user/create`, {
                name: `Axios user ${faker.person.firstName()}`,
                email: faker.internet.email(),
                password: "1234",
                phone_number: `01502${generateRandomId(100000, 999999)}`,
                nid: generateRandomId(100000000, 999999999).toString(),
                role: role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                    "X-AUTH-SECRET-KEY": process.env.secretKey
                }
            });
            
            jsonData.push(data.user);
            fs.writeFileSync('./userData.json', JSON.stringify(jsonData, null, 2));
        }
    });

    // Delay between requests to avoid potential rate limiting
    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("3. Give 2000 tk from System to agent", async () => {
        const agentPhoneNumber = jsonData[2]?.phone_number;
        
        const response = await axios.post(`${process.env.base_url}/transaction/deposit`, {
            from_account: "SYSTEM",
            to_account: agentPhoneNumber,
            amount: 2000
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(201);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("4. Deposit 1500 tk from agent to a customer", async () => {
        const agentPhoneNumber = jsonData[2]?.phone_number;
        const customerPhoneNumber = jsonData[0]?.phone_number;
        
        const response = await axios.post(`${process.env.base_url}/transaction/deposit`, {
            from_account: agentPhoneNumber,
            to_account: customerPhoneNumber,
            amount: 1500
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(201);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("5. Withdraw 500 tk by customer to agent", async () => {
        const customerPhoneNumber = jsonData[0]?.phone_number;
        const agentPhoneNumber = jsonData[2]?.phone_number;
        
        const response = await axios.post(`${process.env.base_url}/transaction/withdraw`, {
            from_account: customerPhoneNumber,
            to_account: agentPhoneNumber,
            amount: 500
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(201);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("6. Send 500 tk from one customer to another", async () => {
        const customer1PhoneNumber = jsonData[0]?.phone_number;
        const customer2PhoneNumber = jsonData[1]?.phone_number;
        
        const response = await axios.post(`${process.env.base_url}/transaction/sendmoney`, {
            from_account: customer1PhoneNumber,
            to_account: customer2PhoneNumber,
            amount: 500
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(201);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("7. Payment of 100 tk to a merchant by recipient customer", async () => {
        const customerPhoneNumber = jsonData[1]?.phone_number;
        
        const response = await axios.post(`${process.env.base_url}/transaction/payment`, {
            from_account: customerPhoneNumber,
            to_account: "01301474846",
            amount: 100
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(201);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("8. Check balance of the recipient customer", async () => {
        const customerPhoneNumber = jsonData[1]?.phone_number;
        
        const response = await axios.get(`${process.env.base_url}/transaction/balance/${customerPhoneNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
                "X-AUTH-SECRET-KEY": process.env.secretKey
            }
        });
        expect(response.status).to.equal(200);
        console.log(`Balance of recipient customer: ${response.data.balance}`);
    });

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
});
