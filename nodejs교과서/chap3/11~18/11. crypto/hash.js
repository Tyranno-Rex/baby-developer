const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));  
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

/*
createHash 알고리즘: 사용할 해시 알고리즘을 넣어준다. md5, sha1, sha256, sha512 등이 가능하다.
md5, sha1은 취약점이 발견되어 사용을 권장하지 않는다.
sha512로도 충분하지만, 나중에는 더 강화된 알고리즘을 대비해야 한다.

update: 변환할 문자열을 넣는다.
digest: 인코딩할 알고리즘을 넣는다. base64, hex, latin1이 주로 사용된다.
    -> base64가 가장 짧아 애용된다.

*/