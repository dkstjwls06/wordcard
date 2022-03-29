const signout = document.querySelector('#signout');
const titlecontainer:HTMLInputElement = document.querySelector('#titlevalue')
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
//signout
const array1 = ['word','mean','synonym']
    const array2 = ['wordinp','meaninp','synonyminp']
    const ul = document.querySelector('#wordcon')
import {fetchData} from "./id"
const nick = document.querySelector('.nick')
const init = async () => {
    const data = await fetchData()
    nick.innerHTML=data
    return
}
init()

//nick / userstat

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

//bottom random sentence

const support = document.querySelector('#support')
support.addEventListener('click',e=>{
    location.href = '/support'
})

const share = document.querySelector('#share')
share.addEventListener('click',e=>{
    location.href = '/share'
})

// const tbody = document.querySelector('#wordtable tbody')
// const titlecontainer = document.querySelector('#title')
let params = (new URL(`${location}`)).searchParams
let data = {
    share:params.get('share'),
    title:params.get('title').replace(/\!\@\!\@\$\(/g,' ')
} // 공유 여부 / 제목 얻어내기
const fetchtitle = async ()=>{ // 제목으로 정보들 불러오기
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
    
    titlecontainer.value = uldata.title
    
    console.log(uldata['content'].length)
    for(let i = 0; i<uldata['content'].length; i++){
        const li = document.createElement('li')
        for(let j = 0; j < 3; j++){
            const inp = document.createElement('input')
            inp.classList.add(array2[j]) 
            inp.type = 'text'
            inp.value = uldata['content'][i][array1[j]]
            inp.classList.add('inp')
            li.appendChild(inp)
        }
        ul.appendChild(li)        
    }
    for(let i = 0; i<5; i++){
        const li = document.createElement('li')
        for(let j = 0; j < 3; j++){
            const inp = document.createElement('input')
            inp.classList.add(array2[j]) 
            inp.type = 'text'
            inp.classList.add('inp')
            li.appendChild(inp)
        }
        ul.appendChild(li)        
    }
    const addmore = document.createElement('li')
    addmore.innerHTML = 'Add More!'
    addmore.classList.add('addbtn')
    ul.appendChild(addmore)
    
    console.log(addmore)
    addmore.addEventListener('click',e=>{
        for(let i = 0; i<5; i++){
            const li = document.createElement('li')
            for(let j = 0; j < 3; j++){
                const inp = document.createElement('input')
                inp.classList.add(array2[j]) 
                inp.type = 'text'
                inp.classList.add('inp')
                li.appendChild(inp)
            }
            ul.appendChild(li)        
        }
        ul.removeChild(addmore)
        ul.appendChild(addmore)
        
    })
}

fetchtitle()

const sortbtn = document.querySelector('#sortbtn')
const autotyperbtn = document.querySelector('#autotyperbtn')
const sort:HTMLSelectElement = document.querySelector('#sort')
const autotyper:HTMLSelectElement = document.querySelector('#automean')
sortbtn.addEventListener('click',e=>{
    if(sort.value==='true'){
        let li = [...document.querySelectorAll<HTMLLIElement>('li:not(.addbtn)')]
        let words = []
        const inp = [...document.querySelectorAll<HTMLInputElement>('.inp .wordinp')];
        // let cnt = 0;
        // for(let i=0; i<li.length;i++){
        //     if(inp[i].value == ''){
        //         cnt++

        //     }
        // }
        const newLi = li.sort((a,b)=>{
            let c = a.firstChild as HTMLInputElement
            let d = b.firstChild as HTMLInputElement
            return c.value > d.value ? -1 : c.value < d.value ? 1 : 0;
        }).filter(v => (v.firstChild as HTMLInputElement).value)
        const ul = document.querySelector('ul')
        while(ul.firstElementChild.classList.value !== 'addbtn') ul.removeChild(ul.firstChild)
        for(let i of newLi){
            ul.insertAdjacentElement('afterbegin', i); // addmore 버튼 앞에 생성
        }
        // for(let i = 0; i < inp.length;i+=3){
        //     //i:word
        //     //i+1:mean
        //     //i+2:synonym
        //     if(!inp[i].value || !inp[i+1].value || !inp[i+2].value) continue
        //     let tempmean = inp[i+1].value.split(',')
        //     console.log(tempmean)
        //     let tempsynonym = inp[i+2].value.split(',')
        //     const obj = {
        //         word:inp[i].value,
        //         mean:tempmean,
        //         synonym:tempsynonym
        //     }
        //     saveword.push(obj)
        // }
        // saveword.sort((a, b)=> { 
        //     return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
        // });
    }
})
const auto = async ()=>{
    const ul = document.querySelector('ul')
    ul.addEventListener('click',async e=>{
        const target = e.target as HTMLInputElement
        if(target.classList.contains('meaninp')){
            const li = target.parentElement
            const word = li.firstChild as HTMLInputElement
            console.log(word)
            const value = word.value
            console.log(value)
            const bool:boolean = false
            const res = await fetch('/translate',{
                method:'POST',
                headers:{
                    'Content-Type':'Application/json'
                },
                body:JSON.stringify({
                    bool,
                    value
                })
            })
            const result = await res.json()
            target.value = result.message.result.translatedText
            // target.innerHTML = result.result['translatedText']
        }
    })
}
autotyperbtn.addEventListener('click',async e=>{
    const start = await auto()
})
const save = document.querySelector('#save')
save.addEventListener('click',e=>{
    let li = document.querySelectorAll('li')
    let saveword: { word: string; mean: string[]; synonym: string[]; }[] = []
    const inp = [...document.querySelectorAll<HTMLInputElement>('.inp')];
    for(let i = 0; i < inp.length;i+=3){
        //i:word
        //i+1:mean
        //i+2:synonym
        if(!inp[i].value || !inp[i+1].value || !inp[i+2].value) continue
        let tempmean = inp[i+1].value.split(',')
        let tempsynonym = inp[i+2].value.split(',')
        console.log(tempmean, tempsynonym)
        const obj = {
            word:inp[i].value,
            mean:tempmean,
            synonym:tempsynonym
        }
        saveword.push(obj)
    }
    console.log(saveword)
    

    const fetchData = async ()=>{
        
        let temp = params.get('title')
        
        let data = {
            share:params.get('share'),
            title:temp.replaceAll('!@!@$(',' ')
        }
        const newobj = {
            title:data.title,
            type:'wordcard',
            content:saveword
        }
        const res0 = await fetch(`/practicefetch`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const result = await res0.json()
        const bruh = result.result
        console.log(data)
        const res = await fetch(`/savewordcard?share=${data.share}&title=${data.title}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({patch:newobj,legacy:bruh})
        })
        const resolve = await res.json()
        console.log(resolve)
        if(resolve =='Saved Suuccessfully!') alert('Saved successfully!')
        else alert("We're sorry, But something went wrong.")
    }
    fetchData()

})

const del = document.querySelector('#delete')
del.addEventListener('click',e=>{
    if(window.confirm('Last Warning : Do you really want to delete this WordCard?')){
        let temp = params.get('title')
        
        let data = {
            share:params.get('share'),
            title:temp.replaceAll('!@!@$(',' ')
        }
        const fetchData = async()=>{
            const res = await fetch('/deleteWordCard',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await res.json()
            console.log(result)
            if(result.status === 'good'){
                alert('Deleted.')
                location.href = '/'
            }else{
                alert(`Failed to delete - Reason : ${result.err}`)
            }
        }
        fetchData()
    }
})



//     if(uldata.content.length<11){
//         const tr = document.createElement('tr')
//         const td = document.createElement('td')
//         td.innerHTML = 'You need to add at least 10 words to play the game. Add tour word now!'
//         td.colSpan = 3
//         tr.appendChild(td)
//         tbody.appendChild(tr)
//     }
//     word = [...document.querySelectorAll('.word')]
//     mean = [...document.querySelectorAll('.mean')]
//     synonym = [...document.querySelectorAll('.synonym')]
    
//     elms = { word, mean, synonym }
    
// }
// fetchtitle()
// console.log(title)


// let elms
// let word
// let mean
// let synonym
// let tempobj = {word:[],mean:[],synonym:[]}
// const optioncontainer = document.querySelector('#optioncontainer');
// const doelement = (elm, b)=>{
//     if(b){
//         for(let i = 0; i < elms[elm].length;i++){
//             tempobj[elm].push(elms[elm][i].innerHTML)
//             elms[elm][i].innerHTML = ''
//         }
//     }else{
//         for(let i = 0; i < elms[elm].length;i++){
//             elms[elm][i].innerHTML = tempobj[elm][i]
//         }
//     }          
// };

// optioncontainer.addEventListener('input', e => {
//     doelement(e.target.value, e.target.checked);
// })  