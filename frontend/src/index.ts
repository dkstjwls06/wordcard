import { status,randomword,made } from "./types";
import { fetchData } from "./id"

const signout = document.querySelector('#signout');

signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});

// fuckout / signout

const nick = document.querySelectorAll('.nick')
const init = async () => {
    const data = await fetchData()
    nick[0].innerHTML=data
    nick[1].innerHTML = data
    return
}
init()
 
// nick / userstat

const bless = document.querySelector('#blessing')
const fetchbless = async ()=>{
    console.log('hi')
    const res = await fetch('/bless')
    const data:randomword = await res.json()
    bless.innerHTML = data.word
}   
fetchbless(); 
const mypage = document.querySelector('#mypage')
mypage.addEventListener('click', e=>{
    location.href = '/'
})

// undertext
const support = document.querySelector('#support')
support.addEventListener('click',e=>{
    location.href = '/support'
})

const share = document.querySelector('#share')
share.addEventListener('click',e=>{
    location.href = '/share'
})

const fetchul = async ()=>{
    const res = await fetch('/userinfo')
    const data = await res.json()
    console.log(data)
    const made = data.made
    const share = made.share
    const unshare = made.unshare
    console.log(share, unshare)
    
    
    const sharedul = document.querySelector('#sharedul')
    const unsharedul = document.querySelector('#unsharedul')
    console.log(share.length, unshare.length)
    if(share.length==0){
        let li = document.createElement('li')
        li.innerHTML = "You can upload your private wordcard and share to others!"
        sharedul.appendChild(li)
    }
    if(unshare.length==0){
        let li = document.createElement('li')
        li.innerHTML = "You haven't made anything yet. Create One!"
        unsharedul.appendChild(li)
    }
    for(let i=0;i<share.length;i++){
        let li = document.createElement('li')
        li.innerHTML = share[i].title
        sharedul.appendChild(li)
    }
    
    for(let i=0;i<unshare.length;i++){
        let li = document.createElement('li')
        li.innerHTML = unshare[i].title
        unsharedul.appendChild(li)
    }
    
}
fetchul();

//makeul

let visited:boolean
let clickedTarget:HTMLLIElement
let clickedTargettitle: string;
const ul:NodeListOf<HTMLUListElement> = document.querySelectorAll('.statul')
const stat = document.querySelector<HTMLDivElement>('#stat2');
const statUl = document.querySelector<HTMLDivElement>('#stat1');

statUl.addEventListener('click', e => {
    const tar = e.target as HTMLLIElement;
    if(tar.nodeName !== 'LI') return;
    if(clickedTarget){
        // clickedTarget.setAttribute('style',"color: rgb(94, 198, 230); border:none")
        clickedTarget.style.color = 'rgb(94, 198, 230)'
    } 
    clickedTarget = tar;
    clickedTargettitle = tar.textContent;
    tar.style.color = 'limegreen'
    // clickedTarget.setAttribute('style',"color:limegreen; border:0 1px solid")
    visited = true;
});

stat.addEventListener('click', e => {
    const tar = e.target as HTMLDivElement;
    if(!tar.classList.contains('statbtn')) return;
    if(!visited){
        alert('Choose ur range first.')
        return
    }
    const id = tar.id;
    let share = clickedTarget.parentElement.id
    share = share.replace(/dul/g,'')
    console.log(share)
    encodeURI(share)
    let title = clickedTargettitle.replace(/\s/g, "!@!@$(")
    encodeURI(title)
    location.href = `/practice?share=${share}&title=${title}`
    console.log(id)
});

const createnew:HTMLDivElement = document.querySelector('#createNew')
createnew.addEventListener('click',async e=>{
    const newtitle = prompt('Type new title',)
    if(newtitle.trim().length === 0 || newtitle.match(/\!\@\!\@\$\(/)){
        alert('That string cant be Title. Try another.')
        return
    }
    console.log({title:newtitle})
    const res = await fetch('/createnew',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({title:newtitle})
    })
    const status = await res.json()
    console.log(status)
    if(status.status === 'good'){
        const title = newtitle.replaceAll(' ','!@!@$(')
        location.href = `/practice?share=unshare&title=${title}`
    }
    
})

