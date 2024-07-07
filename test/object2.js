
const path = require('path');

async function readObjectFromFile() {
    filePath = './object.js'
    const obj = await import(filePath);
    return obj.default;

}

readObjectFromFile();

