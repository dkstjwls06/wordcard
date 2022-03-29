import path from 'path'
import {fetchData} from './id'
import {wordinfo, wordcard,query} from './types'
let elms:wordinfo = null;

// let tempobj = {word,mean,synonym} as wordinfo


const signout = document.querySelector('#signout');
        
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
//signout

const nick = document.querySelector('.nick')
const init = async () => {
    const data = await fetchData()
    for(let i = 0 ; i < 2; i++){
        nick.innerHTML=data
    }
    return
}
init()
//nickname

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
//underword

const support = document.querySelector('#support')
support.addEventListener('click',e=>{
    location.href = '/support'
})

const share = document.querySelector('#share')
share.addEventListener('click',e=>{
    location.href = '/share'
})


    const tbody = document.querySelector('#wordtable tbody')
    const titlecontainer = document.querySelector('#title')
    let params = (new URL(`${location}`)).searchParams
    let data = {
        share:params.get('share'),
        title:params.get('title').replaceAll('!@!@$(', ' '),
        madeby:params.get('madeby')
    } // 공유 여부 / 제목 얻어내기
    if(data.madeby){
        const modify = document.querySelector('#modify')
        modify.remove()
        const back = document.createElement('div')
        back.innerHTML = 'Back'
        const nav = document.querySelector('nav')
        nav.appendChild(back)
        back.addEventListener('click',e=>{
            location.href = '/share'
        })
    }else{
        const modify = document.querySelector('#modify')
        modify.addEventListener('click',e=>{
            let temp = window.location.pathname
            let name = temp.replace(/\/practice/,'')
            window.parent.location.href = `/modify?share=${data.share}&title=${data.title}`
        })
    
    }
    let adddata: any[] = []
    if(!data.madeby){
        const fetchtitle = async ()=>{
        
            const res = await fetch(`/practicefetch`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await res.json()
            const uldata = result.result
            console.log(uldata)
            
            titlecontainer.innerHTML = uldata.title
            const array = ['word','mean','synonym']
            for(let i = 0; i < uldata.content.length; i++){
                adddata.push(uldata.content[i])
                const tr = document.createElement('tr')
                for(let j = 0; j < 3; j++){
                    const td = document.createElement('td')
                    td.innerHTML = uldata.content[i][array[j]]
                    td.classList.add(array[j])
                    tr.appendChild(td)
                }
                
                
                tbody.appendChild(tr)
            }
            if(uldata.content.length<11){
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerHTML = 'You need to add at least 10 words to play the game. Add your word now!'
                td.colSpan = 3
                tr.appendChild(td)
                tbody.appendChild(tr)
            }
        }
        console.log(adddata)
        fetchtitle()
    }else{
        const fetchtitle = async()=>{
            const res = await fetch(`/share/practicefetch`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await res.json()
            const uldata = result.result
            console.log(uldata)
            
            titlecontainer.innerHTML = uldata.title
            const array = ['word','mean','synonym']
            for(let i = 0; i < uldata.content.length; i++){
                adddata.push(uldata.content[i])
                const tr = document.createElement('tr')
                for(let j = 0; j < 3; j++){
                    const td = document.createElement('td')
                    td.innerHTML = uldata.content[i][array[j]]
                    td.classList.add(array[j])
                    tr.appendChild(td)
                }
                
                
                tbody.appendChild(tr)
            }
            if(uldata.content.length<10){
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerHTML = 'You need to add at least 10 words to play the game. Add your word now!'
                td.colSpan = 3
                tr.appendChild(td)
                tbody.appendChild(tr)
            }
        }
        console.log(adddata)
        fetchtitle()
    }
    

    const word = document.querySelectorAll('.word')
    const mean = document.querySelectorAll('.mean')
    const synonym = document.querySelectorAll('.synonym')

    elms = { word:[], mean:[], synonym:[] }
    let arr = ['word','mean','synonym']
    const optioncontainer = document.querySelector('#optioncontainer');
    const doelement =(elm:'word'|'mean'|'synonym', b:boolean/*bool / true 시 발동 / false 시 환원*/)=>{
        if(b){
            console.log(elm, true) 
            // const targets = document.querySelectorAll(`.${elm}`)
            // console.log(targets)
            // for(let i = 0; i < adddata.length; i++){
            //     const td = document.createElement('td')
            //     td.classList.add(elm)
            //     td.classList.add('temp')
            //     targets[i].classList.add('none')
            //     targets[i].parentElement.appendChild(td)

            // }

            //질문 할 것
        }else console.log(elm, false)
        // database : adddata
    };
    optioncontainer.addEventListener('input', e => {
        const tar = e.target as HTMLInputElement;
        if(tar.value === 'word' || tar.value === 'mean' || tar.value === 'synonym'){
            doelement(tar.value, tar.checked);
        }
    })   


    // console.log(title)


    // const modify = document.querySelector('#modify')
    // const exam = document.querySelector('#exam')

    // // // exam.addEventListener('click',e=>{
    // // //     window.parent.location.href = '/prepexam'
    // // // })

    const upload = document.querySelector('#upload')
    if(data.share==='unshare'){
        upload.classList.remove('none')
    }

    upload.addEventListener('click',e=>{
        let check = window.confirm('Do you really want to upload?')
        if(check){
            const fetchData = async ()=>{
                const res = await fetch('/upload',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                    //data.share, data.title
                })
                const result = await res.json()
                console.log(result)
            }
            fetchData()
            
        }
    })

    const exam = document.querySelector('#exam')
    exam.addEventListener('click',async e=>{
        if(!data.madeby){
            location.href = `/prepexam?share=${data.share}&title=${data.title}`
        }else{
            location.href = `/prepexam?share=${data.share}&title=${data.title}&madeby=${data.madeby}`
        }
        
    })
    // madeby === null 이면 내가 만든거!