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
exports.del = exports.add = void 0;
const DB_js_1 = require("./DB.js");
const hash_1 = __importDefault(require("./hash")); // 해시 모듈 가저오기
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, pass } = req.body; // id, pass 변수로 추출
    let mail = req.cookies.mail; // 쿠키에 있던 메일 가져오기
    if (id && pass) { // id, pass가 참이면
        const bool = yield DB_js_1.checkOverlap('id', id); //아이디 중복확인
        if (bool) { // 중복되는 id가 없을 걍우
            const hash = hash_1.default(id, pass); // hash 만들기
            if (!mail)
                mail = `temp${Date.now()}@gmail.com`; //메일이 없을경우 임시로 가입한 시간을 이용하여 채워놓기
            const obj = {
                id,
                hash,
                mail,
                isAdmin: false,
                made: {
                    share: [
                    // {
                    //     title:'어휘끝 수능2000 Day 7',
                    //     type:'wordcard',
                    //     content:[
                    //         {
                    //             word:'constrain',
                    //             mean:['견디다'],
                    //             synonym:['stand']
                    //         },
                    //         {
                    //             word:'significant',
                    //             mean:['상당한','중요한'],
                    //             synonym:['considerable','substantial']
                    //         }
                    //     ]
                    // },
                    // {
                    //     title:'어휘끝 수능2000 Day 10',
                    //     type:'wordcard',
                    //     content:[
                    //         {
                    //             word:'constrain',
                    //             mean:['견디다'],
                    //             synonym:['stand']
                    //         },
                    //         {
                    //             word:'significant',
                    //             mean:['상당한','중요한'],
                    //             synonym:['considerable','substantial']
                    //         }
                    //     ]
                    // }
                    ],
                    unshare: [
                    //shared 와 동일
                    ]
                },
                banned: false,
                native: 'ko' //기본설정은 한국
            };
            const r = yield DB_js_1.insertData(obj); // userdata 추가
            if (r) { // 유저데이터가 정상적으로 추가되었을 시
                yield DB_js_1.deleteData({ mail }, 'tempmail'); // tempmail에 있는 이 메일 삭제
                res.clearCookie('mail'); //메일쪽 쿠키 지우기
                res.json({ status: 'good', url: '/' }); // 응답 / 메인 페이지로
            }
            else {
                res.json({ status: 'bad', reason: 'DB Error.' });
            }
        }
        else {
            res.json({ status: 'bad', reason: 'Same ID already Exists.' });
        }
    }
    else {
        res.json({ status: 'bad', reason: 'unsuitable syntax.' });
    }
});
exports.add = add;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body; // req.bpdy객체에 있는 id 확인
    console.log(id); // id 출력
    if (id) { // id 가 있을 시
        const bool = yield DB_js_1.checkOverlap('id', id); //중복확인
        if (!bool) { // 중복확인이 거짓일 시
            const r = yield DB_js_1.deleteData({ id }); // 유저 정보 삭제
            if (r) { // 성공적으로 삭제 되었을 시
                res.json({ status: 'good' }); //응답
            }
            else {
                res.json({ status: 'bad', reason: 'DB error.' });
            }
        }
        else {
            res.json({ status: 'bad', reason: 'No ID to fuckout.' });
        }
    }
    else {
        res.json({ status: 'bad', reason: 'Syntax Error.' });
    }
});
exports.del = del;
// module.exports = {
//     add, del
// };
//# sourceMappingURL=users.js.map