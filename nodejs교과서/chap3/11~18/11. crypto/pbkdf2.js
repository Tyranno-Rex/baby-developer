const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    });
});

/*
pbkdf2는 간단히 말하면 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시알고리즘을 반복해서 적용.
sha512로 변환된 결과값을 다시 sha512로 변환하는 과정을 10만 번 반복한다.
*/