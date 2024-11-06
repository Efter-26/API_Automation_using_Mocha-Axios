# Dmoney API Automation

This project automates the testing of the Dmoney API using Mocha, Axios, and Chai for HTTP requests and assertions. The tests cover various API endpoints related to user management, transactions, and balance checks.

## Prerequisites

- Node.js
- npm
- JavaScript
- Mocha - Testing framework
- Chai - Assertion library
- Axios - HTTP client for making requests

## Scenario of Automation

1. **Admin Login**

2. **Create 2 Customers and 1 Agent**

3. **Give 2000 tk from System to Agent**

4. **Deposit 1500 tk from Agent to a Customer**

5. **Withdraw 500 tk by Customer to Agent**

6. **Send 500 tk from One Customer to Another**

7. **Payment of 100 tk to a Merchant by Recipient Customer**

8. **Check Balance of the Recipient Customer**

## Some Key Functions

### `generateRandomId(min, max)`
Generates a random number between the specified `min` and `max` to be used for phone numbers or other IDs in the test.

### `storeToken(variableName, token)`
Stores the token in the environment for use across test cases. This is used for authentication in subsequent requests.

### `jsonData`
A JSON file (`userData.json`) that stores the data for users information. This file is updated after creating users.

### `afterEach()`
A delay function used after each test case to avoid throttling or rate-limiting issues.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install the required dependencies:

    ```bash
    npm install mocha chai axios dotenv mochawesome
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
   
   ```bash
    base_url = <set_url>
    secretKey = <set_secret_key>
    token = <generated_token>
    ```
6. To run tests:

    ```bash
    npx mocha tests/Api.test.js
    ```
7. Generate a Mochawesome Report. Here the screenshot of mochawesome-report are given:

![image](https://github.com/user-attachments/assets/c89c9277-dd3a-4469-87fb-250701844a96)
