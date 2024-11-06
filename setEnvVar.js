import fs from 'fs';
import path from 'path';

const storeToken = (key, value) => {
    const filePath = path.join(process.cwd(), '.env');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines = file.split('\n');

    let newLines = [];
    let found = false;

    for (let line of lines) {
        if (line.startsWith(`${key}=`)) {
            found = true;
            newLines.push(`${key}=${value}`);
        } else {
            newLines.push(line);
        }
    }

    if (!found) {
        newLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Key-value pair '${key}=${value}' has been stored in .env.`);
};

export default storeToken;
