"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const hash_1 = __importDefault(require("./hash"));
const DB_js_1 = require("./DB.js");
const secret_1 = __importDefault(require("./secret"));
const users_1 = require("./users");
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: secret_1.default.mail // 보내는 메일 주소
});
router.post('/add', users_1.add); // 일단 양식 만들어놓기
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, pass } = req.body;
    if (id && pass) {
        const check = yield DB_js_1.checkOverlap('mail', id); // 메일  중복확인
        if (check) { // 중복확인 통과 시
            try {
                const hash = hash_1.default(id, (new Date()).toString()); // id, Date로 해시 만들기
                const info = yield transporter.sendMail({
                    from: '서버',
                    to: id,
                    subject: 'Verify email to access the wordcard-',
                    html: `<h1>Signup Verification</h1><a href="${secret_1.default.address}/mail/hash?hash=${encodeURIComponent(hash)}">click here to finish verify</a>`
                });
                console.log(info);
                yield DB_js_1.insertData({
                    mail: id,
                    hash: hash,
                    date: new Date()
                }, 'tempmail');
                res.cookie('mail', id, { expires: new Date(Date.now() + 1000 * 60 * 10), httpOnly: true }); //10분 후에 파기될 쿠키 생성
                res.json({ status: 'good', url: '/mail/check' }); // 응답 : status good
            }
            catch (err) { // 여기서 에러시 유효성 검사 통과 x
                console.error(err);
                res.json({ status: 'bad', reason: '잘못된 이메일입니다.' });
            }
        }
        else { // 여기서 에러 시 중복확인에 걸려버림
            res.json({ status: 'bad', reason: '이미 존재하는 이메일입니다.' });
        }
    }
    else { //여기서 에러 시 param. 오류
        res.json({ status: 'bad', reason: '잘못된 파라미터' });
    }
}));
//mail쿠키 체크
router.use('/', (req, res, next) => {
    const mail = req.cookies.mail;
    if (mail) { // 쿠키가 존재할 시
        next(); //다음
    }
    else {
        res.redirect('/error'); // 아닐 시 잘못된 접근 페이지로 이동
    }
});
router.get('/page2signup', (req, res) => {
    console.log('hi');
    res.redirect('./mail.html');
});
router.get('/check', (req, res) => {
    res.sendFile('mailComplete.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist/login')
    });
});
router.get('/hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('코드 실행');
    const hash = req.query.hash;
    console.log(hash);
    const data = yield DB_js_1.findOne({ hash }, 'tempmail');
    if (data) {
        res.cookie('mail', data /*.mail*/, { expires: new Date(Date.now() + 1000 * 60 * 5), httpOnly: true });
        res.sendFile('addid.html', {
            root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist/login')
        });
    }
    else {
        res.redirect('/error'); // 그렇지 않을 시 잘못된 접근 페이지로 이동
    }
}));
exports.default = router;
//# sourceMappingURL=mail.js.map