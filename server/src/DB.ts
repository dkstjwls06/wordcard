import {MongoClient, Collection } from 'mongodb'
import secretobj from './secret' 
//url = secretobj.url
import { examdata, makeuser,query,Share } from './types';
const dbName:string = 'test';
const client = new MongoClient(secretobj.url, { useUnifiedTopology: true });
// Use connect method to connect to the server

const map = new Map<string, Collection<any>>();
const createexpire = async () => {
    try {
        const exam = await map.get('exam').createIndex( { "createdAt": new Date() }, { expireAfterSeconds: 3600 } )
    } catch (error) {
        throw error
    }
}    


client.connect(async (err) => { // 서버에 연결
    if(err){ //에러나면
        console.error(err);
        return false; //에러 출력후 함수 종료
    } else {
        const db = client.db(dbName); //dbName 명의 db 생성 (여기선 'test')
        const col = await db.collections(); //
        for(let i of col){
            map.set(i.collectionName, i);
        }
        
        console.log('Ready');
        
        // const data = await col.findOne({hash:'2+J70h+B6j178b4fAk0Iys3keRixA0AZXnoX5U3v7bWtjtb6NlWSLm6v2dHspBtaEDEvHtIkkMgeMNlPqpuVXw=='});
    }
});

export const checkUser = async (id:string, hash:string, isAdmin:boolean = false) => { //유저 존재 확인
    const data = await map.get('users').findOne({hash}); // 유저가 입력한 해시랑 같은 것이 존재하는지 확인
    if(data){ // 있는 경우
        if(isAdmin){//어드민인경우
            if(data.isAdmin && id === data.id){ // 아이디 일치, 어드민
                return true;
            }
        } else {
            if(data.id === id){ //아이디 일치
                return true;
            }
        }
    }
    return false; //여기까지 온 경우 - 무엇이든 하나 이상 틀림 / 함수 종료
};

export const checkOverlap = async (name:string, value:string, type:string="users") => { // 아이디 중복확인
    const data = await map.get(type).findOne({ //type(기본은 users) 안에서 해당 아이디 존재하는지 DB에서 찾아보기
        [name]:value 
    });
    if(data){ // 중복되는 아이디가 있을 시
        return false; // 거짓 반환
    } else { // 없을 시
        return true; //허가 반환 (ID생성 허락)
    }
};

export const findOne = async <K>(obj:object, type:string = 'users') => { // 유저 찾기 (찾는 객체, 콜렉션 (현재는 users))
    try{ // 해당 데이터 찾아서 반환
        const data:K = await map.get(type).findOne(obj);
        return data;
    } catch(err){ // 에러나면 에러 표시 null 반환
        console.log(err);
        return null;
    }
}

export const insertData = async (obj:any, type:string = 'users') => { // 회원가입 - 유저 정보 넣기
    try{
        await map.get(type).insertOne(obj); // obj(유저정보) 객체에 추가
        return true;
    } catch(err){
        console.log(err);
        return false; // 에러 발생시 함수 종료
    }
};

export const deleteData = async (obj:object, type:string='users') => { // 유저 정보 삭제
    try{
        await map.get(type).deleteOne(obj); // 해당 유저 정보 객체 삭제
        return true; // 함수 종료
    } catch(err){ // 에러 시 함수 종료
        console.log(err);
        return false;
    }
};

export const findWordcard = async (legacyobj:object,type:string='users')=>{
    try{
        await map.get(type).find(legacyobj)
    }catch(err){
        console.log(err)
        return false
    }
}

export const updateWordcard = async (newobj:object/*변경사항*/,userdata:makeuser/*유저 정보*/, type:string='users',query:query,num:number)=>{
    try {
        await map.get(type).updateOne(
            {_id:userdata._id},
            {$set:{[`made.${query.share}.${num}`]:newobj}}
        )
        return {status:'good'}
    } catch (err) {
        console.log(err)
        return {status:'bad'}        
    }
    
}

export const createNewWordCard = async (obj:Share, type:string = 'users', userdata:makeuser /*유저 정보*/)=>{
    try {
        await map.get(type).updateOne(
            {_id:userdata._id},
            {$push:{['made.unshare']:obj}}
        )
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
export const checkOverlapWordCard = async ( obj:Share/*새 객체*/,type:string = 'users' /*collection 위치*/, title:string /*제목*/, userdata:makeuser /*유저 정보*/)=>{
    try { //중복확인 절차
        const arr = await map.get(type).findOne({
            _id: userdata._id,
            "made.unshare": { "$elemMatch":{ title } }
        })
        console.log(arr)
        if(arr){
            return true // 중복
        }else{
            console.log('hi')
            return false // 통과
        }
        // arr.findIndex((v: { title: string; }) => v.title === title)
        
    } catch (err) {
        console.log(err);
        return null
    }
}

export const deleteWordCard = async (title:string,type:string='users',share:string,userdata:makeuser)=>{
    try {
        const res = await map.get(type).updateOne({
            _id: userdata._id,
        }, {
            '$pull' : {
                [`made.${share}`] : { title }
            }
        });
        console.log(res)
    } catch (err) {
        console.log(err)
        throw err;
    }
    return true
}

export const upload = async ( title:string /*제목*/, type:string='users'/*콜렉션*/,userdata:makeuser /*사용자 정보*/,targetObj:Share /*share에 넣어야 할 것*/)=>{
    try {
        const res = await map.get(type).updateOne({
            _id:userdata._id
        },{
            '$push':{
                [`made.share`] : targetObj
            }
        })

    } catch (error) {
        console.log(error)
        throw error;
    }
    return true;
}

export const getShare = async(type:string='users')=>{
    const sharearray = []
    try {
        
        const projection = {'_id':false,'id':true,'made.share':true}
        const res = await map.get(type).find({}).project(projection)
        for await(let i of res){
            for(let j=0; j<i.made.share.length;j++){
                const obj = {
                    id:i.id,
                    data:i.made.share[j]
                }
                sharearray.push(obj)
            }
            
        }
        console.log(sharearray)
    } catch (err) {
        console.log(err)
        throw err;
    }
    return sharearray;
}

export const newData = async (path:'users', type:'hash',newdata:string,userdata:makeuser)=>{
    try {
        const res = await map.get(path).updateOne(
            {_id:userdata._id}, // 해당 _id의
            {
                $set:{[`${type}`]:newdata}
            } // 아이디나 해시(비번)을 새 데이터로 바꿈
        )
        return true;
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const putsuggest = async (obj:object,type='suggestion')=>{
    try {
        
        const res = await map.get(type).insertOne(obj)
        return true
    } catch (err) {
        throw err;
    } 
}

export const offline = async (data:object) => {
    try{
        const res = await map.get('exam').deleteOne(data)
        return true
    }catch(err){
        console.log(err)
        throw err;
    }
}

export const updateexam = async (newobj:object/*변경사항*/,examdata:examdata/*유저 정보*/, type:string='exam')=>{
    try {
        // 'made.share.0.title'
        await map.get(type).updateOne(
            {_id:examdata._id},
            {$set:{[`question`]:newobj}}
        )
        return true;
    } catch (err) {
        console.log(err)
        throw err        
    }
    
}



/*
{
    id,
    title,
    share,
    madeby,
    type,
    question;{
        WtoM:[ / 객관식인 경우
            0:{
                question:'tremendous',
                answer:2 (0~4),
                choose:{
                    0:'wrong answer',
                    1:'wrong answer',
                    2:'right answer',
                    3:'wrong answer',
                    4:'wrong answer'
                }
            }
        ],
        WtoS:[ / 주관식인 경우
            0:{
                question:'alternative',
                answer:[
                    0:'answer1',
                    1:'answer2'
                    etc(배열에서 ','로 split 된것)
                ]
            }
        ],
        MtoW,
        MtoS,
        StoW,
        StoM
    }
}

*/