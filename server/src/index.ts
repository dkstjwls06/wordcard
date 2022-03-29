import express from 'express' //express
import fs from 'fs/promises'
import admin from './admin'
const app = express()
import img from './img'
import makeHash from './hash'
import mail from './mail'
import {upload,createNewWordCard, checkUser, findOne,checkOverlapWordCard, updateWordcard, deleteWordCard, newData, putsuggest} from './DB'
import cookieParser from 'cookie-parser'
import {del} from './users'
import translate from './translate';
import share from './share'
import exam from './exam'
app.use(cookieParser());
app.use(express.json());
// import io from 'socket.io'
// import http from 'http'
// let server = http.createServer(app);
// io.listen(server)
import path from 'path'
import rt from './translate'
import { makeuser, Share ,query} from './types'

// app.get('./module/id.js',(req,res)=>{
//     console.log('hi')
//     res.sendFile('id.js',{
//         root:'./module'
//     })

// })

app.use(/.+\.js$/, async (req, res, next) => {
    const result = path.resolve(__dirname, '..', '..', 'frontend', `dist${req.originalUrl}`);
    try{
        await fs.access(result);
        res.sendFile(path.basename(result), {
            root:path.dirname(result)
        });
    } catch(err){
        next();
    }
})


app.get('/mail', (req, res) => {
    res.sendFile('/mail.html', {
        root: path.resolve(__dirname,'..','..', 'frontend/dist/login')
    })
})

app.get('/favicon.ico',(req,res)=>{
    res.sendFile('favicon.ico',{
        root: path.resolve(__dirname,'..','..', 'frontend/img')
    })
})
//mail쪽에 있는 모든 코드들(요청에 대한 전송)
app.use('/mail', mail);

//admin쪽에 있는 모든 코드들(요청에 대한 전송)
app.use('/admin', admin);

app.use('/translate',translate)

app.use('/img',img)
app.use('/share',share)

app.use('/exam',exam)

//에러창
app.get('/error', (req, res) => {
    res.sendFile('error.html', {
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    });
});

app.post('/wordcardinfo',async (req,res,err)=>{
    let query = req.body
    let data = query.title.split('/')
    const share:'share'|'unshare' = data[0]
    const title:string = data[1]
    
    const dt = await findOne<makeuser>(req.cookies)
    console.log(typeof(dt))
    
    let result1 = dt.made[share]
    let result = null
    console.log(result1[0])
    for(let i=0; i<result1.length;i++){
        if(result1[i].title == title){
            result = result1[i]
        }
    }
    console.log(title, 'good')
    res.json({result:result,status:'good'})
})
app.post('/practicefetch',async (req,res)=>{
    let query = req.body
    const share:'share'|'unshare' = query.share
    const temp:string = query.title
    const title = temp.replace(/\!\@\!\@\$\(/g,' ')
    const dt = await findOne<makeuser>(req.cookies)
    console.log(typeof(dt))
    
    let result1 = dt.made[share]
    let result:Share = null;
    
    for(let i=0; i<result1.length;i++){
        console.log(result1[i].title, title)
        if(result1[i].title == title){
            console.log(result1[i],125)
            result = result1[i];
        }
    }
    console.log(title,result)
    res.json({result,status:'good'})
    
})
   
app.get('/bless',async (req,res)=>{
    const bless= [
        "Even a one thousand miles journey begins with the first step. - Korean Proverb",
        "It's the earliest time that you thought it was late.",
        "It always seems impossible until it’s done. - Nelson Mandela",
        "Believe you can and you’re halfway there.",
        "I’ve failed over and over and over again in my life. And that is why I succeed. – Michael Jordan",
        "It’s not going to be easy, but it’s going to be worth it.",
        "The merit of an action lies in finishing it to the end. - Genghis Khan",
        "Don't spend your days in vainly. Your youth will never return. - Jung-geun An",
        "Well done is better than well said. - benjamin Franklin",
        "Impossible + a drop of sweat = I'm Possible.",
        "Need Help? Go to support tab.",
        "If you do not like how things are, change them. - Jim Rohn",
        "You can always be better. - Tiger Woods",
        "Without studying the soul sick. - Seneca"
    ]
    let num:number = Math.floor(Math.random()*14)
    const data:string = bless[num]
    
    res.json({status:'good', word:data})
})

//로그인 창
app.get('/login', (req, res) => {
    res.clearCookie('id');
    res.clearCookie('hash');//전에 남아있을 쿠키 지우기
    res.sendFile('login.html', { //로그인 페이지 보내기
        root:path.resolve(__dirname, '..', '..', 'frontend/dist/login')
    });
});

//로그아웃 신호
app.get('/logout', (req, res) => {
    res.clearCookie('id'); //id 쿠키 지우기
    res.clearCookie('hash'); //비번 쿠키 지우기
    res.redirect('/login'); //로그인 페이지로 리다이렉트
});
app.post('/del',del)
//로그인 정보 확인
app.post('/login', async (req, res) => {
    const { id, pass } = req.body; //사용자가 입력한id, pass 불러오기
    const hash:string = makeHash(id, pass); // 불러온 것으로 해시 생성
    const check:boolean = await checkUser(id, hash); // 아이디와 해시가 일치하는지 확인 / 관리자인지 확인
    if(check){//만약 아이디와 비밀번호가 들어맞다면
        const cookieObj:object = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true }; //다시 로그인할때 편리한 쿠키 생성
        res.cookie('id', id, cookieObj);//쿠키에 id, hash 저장
        res.cookie('hash', hash, cookieObj);
        res.json({status:'good', url:'/'});
    } else {
        res.json({status:'bad', reason:'ID or Password is(are) wrong.'}); //무엇이든 일치하지 않은 경우
    }
});

//일반 유저 검사
app.use('/', async (req, res, next) => { // 이미 전에 로그인 한 사람의 경우
    const { id, hash } = req.cookies; //쿠키에 있는 id, hash 꺼내오기
    if(id && hash){ //전부 뭐라도 있다면
        const check:boolean = await checkUser(id, hash); //유저 존재 여부 확인
        console.log(check); // 출력
        if(check){ //존재 시
            console.log(hash);
            next(); //그냥 넘어가기
            return false;
        }
    }
    res.redirect('/login'); //그렇지 않은 경우 로그인페이지로
});

//일반 창은 여기서 부터 작성하면 됨
app.get('/', (req, res) => {
    
    res.sendFile('index.html', {
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    });
})
.get('/nick',(req,res)=>{
    res.json({nick:req.cookies.id})
})
.get('/userinfo', async (req,res)=>{
    res.json(await findOne(req.cookies))
})

app.get('/:modify',(req,res)=>{
    
    res.sendFile(`${req.params.modify}.html`,{
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    })
}) // practice + modify

app.post('/savewordcard',async (req,res)=>{
    const share=req.query.share as 'share'|'unshare'
    const title=req.query.title as string
    const patch = req.body.patch
    const legacy = req.body.legacy
    console.log(patch,231)
    console.log(share,title,232)
    const id:makeuser = await findOne(req.cookies)
    console.log(legacy,234)
    // const isExist = (elem:any)=>{
    //     elem.title = legacy.title
    // }
    const num = id.made[share].findIndex(v => v.title === legacy.title);
    // const num = id.made[share].indexOf(legacy.title) // 배열 안 위치값
    //legacyobj = 바뀌기전의 딱 그 부분만
    //id = 한 유저의 전체 정보
    //patch = 바뀐 부분만
    const query = {
        share:share,
        title:title
    }
    console.log(id,235)
    const result= await updateWordcard(patch,id,'users',query,num)
    if(result.status == 'good') res.json('Saved Suuccessfully!')
    else(res.json('something Went Wrong'))
    
    
})

.post('/createnew',async (req,res)=>{
    
    const title = req.body.title as string
    const obj:Share = {
        title:title,
        type:'wordcard',
        content:[]
    }
    const userdata = await findOne(req.cookies)
    const bool = await checkOverlapWordCard(obj,'users',title,userdata);
    

    if(!bool && bool!==null){
        const create = await createNewWordCard(obj,'users',userdata)
        if(create){
            res.json({status:'good'})
        }else{
            res.json({status:'bad',reason:'error occured'})
        }
    }else if(bool !==null){
        res.json({status:'bad',reason:'duplicated title'})
    }else{
        res.json({status:"bad",reason:'error occured.'})
    }
})
.post('/deleteWordCard',async (req,res)=>{
    const share = req.body.share as string
    const title = req.body.title as string
    const userdata:makeuser= await findOne(req.cookies)
    try {
        console.log(share,title,284)
        const del = await deleteWordCard(title,'users',share,userdata)
        console.log(del,286)
    } catch (err) {
        console.log(err) 
        res.json({status:'bad',reason:err})
    }
    res.json({status:'good'})
})

.post('/upload',async (req,res)=>{
    const data = req.body as query;console.log(data,297)
    try {
        const userdata:makeuser = await findOne(req.cookies)
        
        let result1 = userdata.made[data.share]
        let result:Share = null;
        
        for(let i=0; i<result1.length;i++){
            if(result1[i].title === data.title){
                result = result1[i];
                console.log(result,307)
            }
        }
        // result - 올릴 것
        if(!result){
            res.json({status:'bad',reason:'error occured'})
        }
        try {
            const uploadwordcard =await upload(data.title,'users',userdata,result)
        } catch (error) {
            console.log(error)
            res.json({status:'bad',reason:error})
        }
        res.json({status:'good'})
        // 제목 중복확인 후 올리기 작업
    } catch (err) {
        console.log(err),
        res.json({status:'bad',reason:err})
    } 
})

app.post('/personcheck', async (req, res) => { // 본인확인
    const id = req.cookies.id
    const { pass } = req.body; //사용자가 입력한id, pass 불러오기
    const hash:string = makeHash(id,pass); // 불러온 것으로 해시 생성
    const check:boolean = await checkUser(id, hash); // 아이디와 해시가 일치하는지 확인 / 관리자인지 확인
    if(check){//만약 아이디와 비밀번호가 들어맞다면
        res.json({status:'good'});
    } else {
        res.json({status:'bad', reason:'Password is wrong.'}); //무엇이든 일치하지 않은 경우
    }
});

app.post('/newdata', async (req,res)=>{
    const type:'hash' = req.body.type
    try { // hash(pass)
        const newpass = req.body.newpass as string
        const id = req.cookies.id as string
        const newhash = makeHash(id,newpass)
        const userdata = await findOne(req.cookies)
        const newdata = await newData('users',type,newhash,userdata)
        res.json({status:'good'})
    } catch (err) {
        console.log(err)
        res.json({status:'bad',reason:err})
    }
})

app.post('/suggest',async (req,res)=>{
    const genre = req.body.genre as string
    const textvalue = req.body.textvalue as string
    const userdata:makeuser = await findOne(req.cookies)
    const obj = {
        id:userdata.id,
        genre,
        textvalue
    }
    try {
        const sug = await putsuggest(obj,'suggestion')
        res.json({status:'good'})
    } catch (err) {
        console.log(err)
        res.json({status:'bad',reason:err})
    }
    
})

.get('/prepexam',(req,res)=>{
    res.sendFile('prepexam.html',{
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    })
})
// Database Name
app.listen(4000,()=>{console.log('Server ready')});
