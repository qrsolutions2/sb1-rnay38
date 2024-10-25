const fs = require('fs');
const path = require('path');

const testFile = path.join(__dirname, 'test-output.txt');

console.log('Writing to file...');
fs.writeFileSync(testFile, 'Hello, World!');

console.log('Reading from file...');
const content = fs.readFileSync(testFile, 'utf8');

console.log('File content:', content);

console.log('Deleting file...');
fs.unlinkSync(testFile);

console.log('File I/O test complete.');