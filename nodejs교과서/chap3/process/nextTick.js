setImmediate(() => {console.log('immediate');});

process.nextTick(() => { console.log('nextTick');});

setTimeout(() => {console.log('timeout');}, 0);

Promise.resolve().then(() => console.log('promise'));


// 실생 결과:
// nextTick
// promise
// timeout
// immediate



// process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.
// 코드 맨 밑에 Promise를 넣은 것은 resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시된다.
// 즉, process.nextTick과 Promise를 마이크로태스크(microtask)라고 따로 구분지어 부른다.