import {fetchData} from './id'
import {wordinfo, card,query} from './types'
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
let params = (new URL(`${location}`)).searchParams
let data = {
    share:params.get('share'),
    title:params.get('title').replaceAll('!@!@$(', ' '),
    madeby:params.get('madeby')
}
let max:number = null

const maxcon = document.querySelector('#maxcon')
const rangetitle = document.querySelector('#rangetitle')
const rangeul = document.querySelector('#rangeul')
let con = {} as card
const fetchInfo = async () => {
    const res = await fetch('/share/practicefetch',{
        method:'POST',
        headers:{
            'Content-Type':'Application/json'
        },
        body:JSON.stringify(data)
    })
    const result = await res.json()
    console.log(result)
    const content = result.result
    con = content
    max = content.content.length
    maxcon.innerHTML = `Each pattern's max limit is ${max}.`
    rangetitle.innerHTML = content.title
    const fillul = ()=>{
        const array = ['word','mean']
        for(let i of content.content){
            console.log(i)
            const li:HTMLLIElement = document.createElement('li')
            const input:HTMLInputElement = document.createElement('input')
            const checkcon:HTMLDivElement = document.createElement('div')
            checkcon.classList.add('checkcon')
            input.type = 'checkbox'
            input.classList.add('checkbox')
            input.checked = true
            checkcon.appendChild(input)
            li.appendChild(checkcon)
            for(let j of array){
                const div:HTMLDivElement = document.createElement('div')
                div.innerHTML = i[j]
                div.classList.add(j)
                li.appendChild(div)
            }

            rangeul.appendChild(li)
        }

    }
    fillul()

}
fetchInfo()

const startbtn = document.querySelector('#startbtn')
startbtn.addEventListener('click',e=>{
    console.log(con)
    const radio = [...document.querySelectorAll('.radio')] as HTMLInputElement[]
    const input = [...document.querySelectorAll('.checkbox')] as HTMLInputElement[]
    const number = [...document.querySelectorAll('.num')] as HTMLInputElement[]
    const turn = ['WtoM','WtoS','MtoW','MtoS','StoW','StoM']
    const num:number[] = []
    for(let i = 0; i < 6; i++){
        if(number[i].value===''){
            const cnt = 0
            num.push(cnt)
        }else{
            const cnt = Number(number[i].value)
            num.push(cnt)
        }
        
    }  
    console.log(con.content)
    for(let i =0; i < con.content.length; i++){
        console.log(input[i])
        if(!input[i].checked){
            con.content.splice(i,1)
            console.log(con.content)
        }
    }
    let type:string = null
    const finalrange = con.content
    if(radio[0]){
        type = 'objective'
    }else{
        type = 'subjective'
    }
    const finalobj = {
        type,
        title:data.title,
        share:data.share,
        number:{
            WtoM:num[0],
            WtoS:num[1],
            MtoW:num[2],
            MtoS:num[3],
            StoW:num[4],
            StoM:num[5]
        },
        madeby:data.madeby,
        range:finalrange
    }
    const givedata = async ()=>{
        if(finalobj.range.length<5){
            alert('You need to add at least 5 words.')
        }
        const res = await fetch('/exam/examstart',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(finalobj)
        })
        const result = await res.json()
        console.log(result) 
        if(result.status === 'good'){
            const examdata = result.examdata
            const title = examdata.title.replaceAll(' ', '!@!@$(')
            location.href = `/exam?type=${examdata.type}&madeby=${examdata.madeby}&title=${title}&share=${examdata.share}&examinee=${examdata.examinee}`
        }else{
            alert(result.reason)
            return
        }
 
        
    }
    givedata()
    //examdata 구성 방식
    /*
    {
        title, 
        share,
        madeby(sometimes null),
        type:'objective' | 'subjective,
        number:{ 
            WtoM,
            WtoS,
            MtoW,
            MtoS,
            StoW,
            StoM
        },
        range:[
            0:{word:'',mean:[''],synonym:['']},
            ...etc
        ]
    }
    */
})
