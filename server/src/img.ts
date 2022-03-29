import express from 'express'
import fs from 'fs/promises'
import path from 'path'
const router = express.Router()
// router.use(express.static('..../frontend/img')
//이미지 저장

router.get('/note',async (req,res)=>{
    const data = await fs.readFile(path.resolve(__dirname,'..','..', 'frontend/img/bookbackground.png'))
    res.sendFile('bookbackground.png')
})

router.get('/logo', async (req,res)=>{
    const data = await fs.readFile(path.resolve(__dirname,'..','..', 'frontend/img/wadswac.png'));
    res.end(data);
})
router.get('/face',async(req,res)=>{
    const data = await fs.readFile(path.resolve(__dirname,'..','..', 'frontend/img/asdwasd.png'))
    res.end(data)
})
router.get('/background1',async(req,res)=>{
    const data = await fs.readFile(path.resolve(__dirname,'..','..', 'frontend/img/asdwacwasd.png'))
    res.end(data)
})

export default router