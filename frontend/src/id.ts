export const fetchData = async <T>()=>{
    const res = await fetch('/nick')
    const data = await res.json()
    return data.nick;
}

// 클라이언트임!!!!
