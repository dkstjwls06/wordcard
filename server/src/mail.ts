import {Userinfo} from './types'
import nodemailer from 'nodemailer'
import express from 'express'
const router = express.Router();
import makeHash from './hash'
import { checkOverlap, insertData, findOne } from './DB.js'
import obj from './secret'
import { add } from './users'
import path from 'path'


const transporter = nodemailer.createTransport({ // transporter 객체 설정
    service: 'gmail', // gmail에서
    port : 587, // 587번 포트
    host :'smtp.gmail.com', 
    secure : false, // 이걸 꺼두어야 원격으로 메시지 보낼 수 있음
    requireTLS : true,
    auth: obj.mail // 보내는 메일 주소
});


router.post('/add', add); // 일단 양식 만들어놓기
router.post('/register', async (req, res) => { // 가입 요창시
    const { id, pass } = req.body as Userinfo;
    if(id && pass){ 
        const check:boolean = await checkOverlap('mail', id); // 메일  중복확인
        if(check){ // 중복확인 통과 시
            try{
                const hash:string = makeHash(id, (new Date()).toString()) // id, Date로 해시 만들기
                const info = await transporter.sendMail({ // 보낼 양식
                    from:'서버',
                    to:id,
                    subject:'Verify email to access the wordcard-',
                    html:`<h1>Signup Verification</h1><a href="${obj.address}/mail/hash?hash=${encodeURIComponent(hash)}">click here to finish verify</a>`
                });
                console.log(info);
                await insertData({ //tempmail DB에 정보 입력 / 메일, 해시, 날짜
                    mail:id,
                    hash:hash,
                    date:new Date()
                }, 'tempmail');

                res.cookie('mail', id, { expires: new Date(Date.now() + 1000 * 60 * 10), httpOnly: true }); //10분 후에 파기될 쿠키 생성
                
                res.json({status:'good', url:'/mail/check'}); // 응답 : status good
            } catch(err){ // 여기서 에러시 유효성 검사 통과 x
                console.error(err);
                res.json({status:'bad', reason:'잘못된 이메일입니다.'});
            }
        } else { // 여기서 에러 시 중복확인에 걸려버림
            res.json({status:'bad', reason:'이미 존재하는 이메일입니다.'});
        }
    } else { //여기서 에러 시 param. 오류
        res.json({status:'bad', reason:'잘못된 파라미터'});
    }
});

//mail쿠키 체크
router.use('/', (req, res, next) => {
    const mail:string = req.cookies.mail;
    if(mail){ // 쿠키가 존재할 시
        next(); //다음
    } else {
        res.redirect('/error'); // 아닐 시 잘못된 접근 페이지로 이동
    }
});
router.get('/page2signup',(req,res)=>{
    console.log('hi')
    res.redirect('./mail.html')
})
router.get('/check', (req, res) => { // /check 요청
    
    res.sendFile('mailComplete.html', {  // 메일 전송 완료 페이지 보내기
        root:path.resolve(__dirname,'..','..', 'frontend/dist/login')
    });
});



router.get('/hash', async (req, res) => { //뒷쪽의 해시가 일치해야 addid 쪽으로 보내줌
    console.log('코드 실행')
    const hash = req.query.hash;
    console.log(hash);
    const data = await findOne({hash}, 'tempmail');
    if(data){
        res.cookie('mail', data/*.mail*/, { expires: new Date(Date.now() + 1000 * 60 * 5), httpOnly: true });
        res.sendFile('addid.html', {
            root:path.resolve(__dirname,'..','..', 'frontend/dist/login')
        });
    } else {
        res.redirect('/error'); // 그렇지 않을 시 잘못된 접근 페이지로 이동
    }
});


export default router;

