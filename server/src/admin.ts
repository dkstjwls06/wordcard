import express from 'express'
import {checkUser} from './DB'
import {add,del} from './users'
import path from 'path'
const router = express.Router();



// const main = async () => {
//     console.log(col);
//     const data = await col.findOne({hash:'2+J70h+B6j178b4fAk0Iys3keRixA0AZXnoX5U3v7bWtjtb6NlWSLm6v2dHspBtaEDEvHtIkkMgeMNlPqpuVXw=='});
//     console.log(data);
// }
// main();

router.use('/', async (req, res, next) => {
    const { id, hash } = req.cookies; // 브라우저 저장된 쿠키 불러오기
    const check:boolean = await checkUser(id, hash, true); //유저확인
    console.log(`admin : ${check}`); // admin이면 true, 아님 false 
    if(check){ //true 이면
        next(); // 다음 라우터로 넘김
    } else {
        res.redirect('/error');
    }
});

router.get('/', (req, res) => {
    res.sendFile('admin.html', { // ./view에 있는 admin.html 보내기
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    });
});

router.post('/add', add); // 계정추가(어드민)

router.post('/del', del); // 계정삭제(어드민)

export default router;