const fs = require('fs');

fs.writeFileSync('test.log', 'This is a test log entry.\n');
console.log('Test file created successfully.');

const content = fs.readFileSync('test.log', 'utf8');
console.log('File content:', content);