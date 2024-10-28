const fs = require('fs');


fs.copyFile('fscopy_read.txt', 'fscopy_write.txt', (err) => {
    if (err) {
        return console.error(error);
    }
    console.log('복사 완료');
});