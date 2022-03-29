const signout = document.querySelector('#signout');
const titlecontainer:HTMLInputElement = document.querySelector('#titlevalue')
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
import {fetchData} from "./id"
const nick = document.querySelector('.nick')
const init = async () => {
    const data = await fetchData()
    nick.innerHTML = data
    return
}
init()
const bless = document.querySelector('#blessing')
const fetchbless = async ()=>{
    console.log('hi')
    const res = await fetch('/bless')
    const data = await res.json()
    bless.innerHTML = data.word
}   
fetchbless(); 
const mypage = document.querySelector('#mypage')
mypage.addEventListener('click', e=>{
    location.href = '/'
})

const support = document.querySelector('#support')
support.addEventListener('click',e=>{
    location.href = '/support'
})

const share = document.querySelector('#share')
share.addEventListener('click',e=>{
    location.href = '/share'
})



const shareul = document.querySelector('.shareul')
const fetchInfo = async ()=>{
    const res = await fetch('/share/getShare')
    const result = await res.json()
    console.log(result)

    for(let i of result.getshare){
        console.log(i)
        const li = document.createElement('li')
        const data = [i.data.title,i.id] as string[]
        const array = ['one','two']
        for(let i = 0; i < 2; i++){
            const div = document.createElement('div')
            div.innerHTML = data[i]
            div.classList.add(array[i])
            li.appendChild(div)
        }
        li.classList.add('list')
        shareul.appendChild(li)

    }
    

    
}
fetchInfo()

shareul.addEventListener('click',async e=>{
    const target = e.target as HTMLDivElement | HTMLLIElement
    console.dir(target.nodeName)
    if(target.nodeName!=='LI'){
        const targetLi = target.parentElement
        const temp = [targetLi.firstChild,targetLi.lastChild] as HTMLDivElement[]
        const title = temp[0].innerHTML.replaceAll(' ','!@!@$(')
        const user = temp[1].innerHTML
        console.log(title,user)
        const nick = await fetchData()
        location.href = `/practice?share=share&title=${title}&madeby=${user}`
    }
})

