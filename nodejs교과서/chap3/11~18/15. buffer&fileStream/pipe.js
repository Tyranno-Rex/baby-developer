const fs = require('fs');

const readStream = fs.createReadStream('pipe_read.txt');
const writeStream = fs.createWriteStream('pipe_write.txt');

readStream.pipe(writeStream);