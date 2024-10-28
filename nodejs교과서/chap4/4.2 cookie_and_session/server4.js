const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// parseCookies 함수 정의: 기본 인자로 빈 문자열을 받음
const parseCookies = (cookie = '') => 
    cookie
        // 쿠키 문자열을 ';' 기준으로 나누어 배열로 변환
        .split(';')
        // 각 요소를 '=' 기준으로 나누어 키-값 쌍의 배열로 변환
        .map(v => v.split('='))
        // 배열의 각 요소를 구조 분해 할당하여 키와 나머지 값으로 나누고, 나머지 값을 다시 '='로 연결
        .map(([k, ...vs]) => [k.trim(), vs.join('=')])
        
        // 키-값 쌍의 배열을 누적하여 최종 객체로 변환
        .reduce((acc, [k, v]) => {
            // 키를 트림하여 공백 제거 후, 디코드된 값을 객체에 추가
            acc[k.trim()] = decodeURIComponent(v);
            // 누적된 객체를 반환
            return acc;
        }, {}); // 초기값으로 빈 객체를 설정


http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        
        expires.setMinutes(expires.getUTCMinutes() + 5);
        res.writeHead(302, {
            Location: '/',

            // 에러 : Invalid character in header content 
            // 원인 : ["Set-Cookie"]는 공백없이 header의 값을 작성하지 않으면 발생 
            // 해결 : 개행 금지
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.name) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
}).listen(8083, () => {
    console.log('8083번 포트에서 서버가 대기 중입니다~ 대기핑');
})