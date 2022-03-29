//공유 wordcard 관리 미들웨어
import express from 'express'
import path from 'path'
import {getShare,upload,createNewWordCard, checkUser, findOne,checkOverlapWordCard, updateWordcard, deleteWordCard} from './DB'
import {makeuser, Share} from './types'
const router = express.Router()

router.get('/',(req,res)=>{
    res.sendFile('share.html', {
        root:path.resolve(__dirname,'..','..', 'frontend/dist')
    });
})

router.get('/getShare',async (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err)
        res.json({status:'bad',reason:'error occured'})
    }
    const getshare = await getShare()
    
    res.json({status:'good',getshare:getshare})
})

router.post('/practicefetch',async (req,res)=>{
    let query = req.body
    console.log(query)
    const share:'share'= query.share
    const temp:string = query.title
    const title = temp.replace(/\!\@\!\@\$\(/g,' ')
    const madeby = query.madeby
    const madeuser = await findOne<makeuser>({id:madeby})
    console.log(madeuser)
    let result1 = madeuser.made[share]
    let result:Share = null;
    
    for(let i=0; i<result1.length;i++){
        console.log(result1[i].title, title)
        if(result1[i].title == title){
            console.log(result1[i])
            result = result1[i];
        }
    }
    console.log(title,result)
    res.json({result,status:'good'})
})

export default router;