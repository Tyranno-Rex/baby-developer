const fs = require('fs');

fs.writeFile('./writeme.txt', '새로 작성된 내용입니다.', (err) => {
    if (err) {
        throw err;
    }
    fs.readFile('./writeme.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data.toString());
    })
});