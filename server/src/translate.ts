
import express from 'express'
import request from 'request'
const router = express.Router()
const client_id:string = 'xu51U6cKIozeBvwugrXX'
const client_secret:string = '8x4ibSHXN5'
router.post('/',async (req/*번역 해야할 문자*/,res/*번역 된 문자*/)=>{
    const bool = req.body.bool
    const api_url:string = 'https://openapi.naver.com/v1/papago/n2mt';
    const text = req.body.value
    console.log(text, 11)
    let source:string, target:string
    if(bool){
        source = 'ko'
        target = 'en'
    }else{
        source = 'en'
        target = 'ko'
    }
    console.log(source, target)
    const options = {
        url:api_url,
        form:{'source':source,'target':target,'text':text},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    }
    request.post(options,(error,response,body)=>{
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            console.log(body, 29)
            res.end(body);
        } else {
            res.json({status:'bad',code:response.statusCode})
            console.log('error = ' + error);
            console.log(body)
        }
    })
})
export default router