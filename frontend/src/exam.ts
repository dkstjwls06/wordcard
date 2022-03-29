import {fetchData} from './id'
import {wordinfo, card,query, exam, Num, ques} from './types'
let elms:wordinfo = null;
// import * as socketio from 'socket.io-client';

// let tempobj = {word,mean,synonym} as wordinfo


const signout = document.querySelector('#signout');
        
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
//signout

const settimeout = (time:number) => new Promise((res, rej) => {
    setTimeout(res, time);
}); // time초 기다리기

const waittillpress = (target:HTMLElement, type:string) => new Promise((res,rej)=>{
    target.addEventListener(type, res, {once:true});
});

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

// if(socketio.connect().disconnected){
//     const del = async () => {
//         const res = await fetch('/exam/userOffline?')
//     }
//     del()
// }
const title = [...document.querySelectorAll('.title')] as HTMLDivElement[]


const waiting = document.querySelector('.waiting') as HTMLDivElement
const whileexam = document.querySelector('.whileexam') as HTMLDivElement
//기본 틀

const ready = [...document.querySelectorAll('.ready')] as HTMLDivElement[]
//시작 시

const questiondiv = document.querySelector('.question') as HTMLDivElement
const given = document.querySelector('.given') as HTMLDivElement
//문제

const choicelist = document.querySelector('.list') as HTMLOListElement
// 객관식

const answer = document.querySelector('.answer') as HTMLInputElement
//주관식

const status = [...document.querySelectorAll('.status')] as HTMLDivElement[]
// 정 / 오답

const next = document.querySelector('.next') as HTMLDivElement
//다음 문제로

const time = document.querySelector('.timeleft') as HTMLDivElement
//남은 시간

let params = (new URL(`${location}`)).searchParams
let data = {
    type:params.get('type'),
    title:params.get('title').replace(/\!\@\!\@\$\(/g,' ')
} 
whileexam.classList.add('none')
const settitle = ()=>{
    title[0].innerHTML = `Range : ${data.title}`
    title[1].innerHTML = `Type : ${data.type}`
}
settitle()
//제목 표출



const arr:(keyof Num)[] = ['WtoM','WtoS','MtoW','MtoS','StoW','StoM']

let examdata = null as exam;
const doingexam = async()=>{
    const res = await fetch(`/exam/getExamData?type=${params.get('type')}&madeby=${params.get('madeby')}&title=${params.get('title')}&share=${params.get('share')}&examinee=${params.get('examinee')}`)
    const result =await res.json()
    console.log(result)
    examdata = result.examdata;
    console.log(examdata)// 결과를 첨삭 형식으로 여기다 넣기

    waiting.classList.remove('none')
    ready[0].classList.remove('none')
    await settimeout(3000);
    ready[0].classList.add('none')
    ready[1].classList.remove('none')
    await settimeout(500) 
    ready[1].classList.add('none')
    waiting.classList.add('none')
    
    whileexam.classList.remove('none')

    let questionlist = examdata.question
    let nu = 1;
    type Replace = {W:string; M:string; S:string};
    let replace:Replace = { // 치환 리스트
        W:'word',
        M:'mean',
        S:'synonym'
    }
    if(examdata.type === 'objective'){
        choicelist.classList.remove('none')
        for(let i of arr){ // 유형 6개
            const key1 = i[0] as keyof Replace
            const key2 = i[3] as keyof Replace
            let from = replace[key1] as 'word' | 'mean' | 'synonym'
            let to = replace[key2] as 'word' | 'mean' | 'synonym'
            for(let j = 0; j < examdata.question[i].length; j++){
                let trigger = false
                console.log('eifj')
                let question = questionlist[i][j] as ques// 지금 내야 할 문제 가져오기
                console.log(question)
                questiondiv.innerHTML = `Q${nu}. Which choice is the best fit?`
                nu++
                given.innerHTML = `Given word : ${question.question}`
                for(let k =0; k< 5; k++){
                    let li = document.createElement('li')
                    li.innerHTML = question.choice[k]
                    choicelist.appendChild(li)
                }
                const choices = document.querySelector('ol > li')
                time.classList.remove('none')
                time.innerHTML = 'Time Left : 5 sec'
                let timeleft = 5
                const fun = setInterval(()=>{
                    console.log('counting')
                    timeleft--;
                    time.innerHTML = `Time Left : ${timeleft} sec`
                    if(timeleft===0) clearInterval(fun)
                },1000)
                let answer = question.answer
                choicelist.addEventListener('click',e=>{
                    let target = e.target as HTMLLIElement
                    console.log(target.innerHTML)
                    
                    if(target.innerHTML === question.choice[answer]){ // 맞았을 때
                        examdata.question[i][j].result = 'correct'
                        examdata.question[i][j].chosen = target.innerHTML
                        status[0].classList.remove('none')
                        console.log('맞음')
                        clearInterval(fun)
                    }else{ // 틀렸을 때
                        if(timeleft===0){ 
                            return
                        }
                        examdata.question[i][j].result = 'wrong'
                        examdata.question[i][j].chosen = target.innerHTML
                        status[1].classList.remove('none')
                        status[1].innerHTML = `Wrong Choice :/ <br> Answer : ${examdata.question[i][j].choice[answer]}`
                        console.log('틀림')
                        clearInterval(fun)
                    }
                    next.classList.remove('none')
                    trigger = true

                })

                await settimeout(5000) //시간제한 5초.
                console.log(trigger)
                if(!trigger){
                    examdata.question[i][j].result = 'wrong'
                    examdata.question[i][j].chosen = null // 선택 안함 (시간 초과)
                    status[1].classList.remove('none')
                    status[1].innerHTML = `You ran all of time! :| <br> Answer : ${examdata.question[i][j].choice[answer]}`
                }

                next.classList.remove('none')

                await waittillpress(next,'click')

                while ( choicelist.hasChildNodes() )
                {
                     choicelist.removeChild( choicelist.firstChild );       
                }
                next.classList.add('none')
                status[1].innerHTML = ''
                for(let k =0 ; k < 2 ; k++){
                    status[k].classList.add('none')
                }
                timeleft = 5
                console.log(timeleft)
                clearInterval(fun)
            }

        }
    }else{
        //주관식
    }
    const endfetch = async()=>{
        const res = await fetch('/exam/resultdata',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(examdata)
        })
        const status = await res.json()
        if(status.status == 'good'){
            console.log(status,236)
        }else{
            alert("We're sorry, but an error occured. We'll find the problem and fix it as soon as we can!")
        }
    }
    endfetch()
    location.href = '/exam/examresult' 
}
doingexam()


// 시험 시작

/*
{
    MtoS:[
        {
            answer:2,
            choice:['option1',option2... etc]
            question:'questionquery'

            +++++
            chosen:3
            result:'wrong',

        }
    ]
}
*/

// if(examdata.type === 'objective'){

    
// }else{

// }

