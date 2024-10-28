export default async function Read(props) {
    
    // 에러: [ Server ] Error: Route "/read/[id]" used params.id. params should be awaited before using its properties. 
    // 원인: Next.js 13 이상에서는 동적 라우트의 params가 Promise를 반환하기 때문에 에러발생
    // 해결: await 키워드를 사용하여 params를 Promise로 만들
    const { id } = await props.params;  
    return (
        <>
            <h1>Read</h1>
            {id}
        </>
    )
}