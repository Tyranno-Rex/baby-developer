const fs = require('fs');

const writeStream = fs.createWriteStream('./write2.txt');

writeStream.on('finish', () =>{
    console.log('파일 쓰기 완료');
});

writeStream.write('해당 문자열을 작성하고 싶습니다.\n');
writeStream.write('과연 입력이 잘 되었을까요?');
writeStream.end();