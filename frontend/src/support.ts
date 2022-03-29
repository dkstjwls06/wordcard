const signout = document.querySelector('#signout');
const titlecontainer:HTMLInputElement = document.querySelector('#titlevalue')
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
import {fetchData} from "./id"
const nick = document.querySelectorAll('.nick')
const init = async () => {
    const data = await fetchData()
    for(let i = 0; i<2;i++)nick[i].innerHTML = data
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

const changeid = document.querySelector('#changeid')
const changepass = document.querySelector('#changepass')

changepass.addEventListener('click',async e=>{
    const pass = prompt('Enter your current Password')
    const obj = {
        pass
    };
    const res = await fetch('/personcheck', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
    });
    const check = await res.json();
    if(check.status === 'good'){
        const newpass = prompt('Enter New Password.')
        const res = await fetch('/newdata',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify({type:'hash',newpass})
        })
        const result = await res.json()
        if(result.status === 'good'){
            alert('Successfully Changed!')
            location.href = '/'
        }else{
            alert(`Change process failed : ${result.reason}`)
        }
    } else {
        alert(check.reason);
    }
    
})

const select:HTMLSelectElement = document.querySelector('#selection')
const submit:HTMLDivElement = document.querySelector('#submit')
const text:HTMLTextAreaElement = document.querySelector('textarea')
submit.addEventListener('click',e=>{
    const genre = select.value
    const textvalue = text.value
    const fetchData = async ()=>{
        const obj = {
            genre,
            textvalue
        }
        const res = await fetch('/suggest',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(obj)
        })
        const check = await res.json()
        console.log(check)
        if(check){
            alert('Sending Successful! Thanks for your opinion!')
            location.reload()
        } else alert(`We're sorry, But error occured. Error : ${check.reason}`)
    }
    fetchData()
})