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
const express_1 = __importDefault(require("express"));
const DB_1 = require("./DB");
const users_1 = require("./users");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// const main = async () => {
//     console.log(col);
//     const data = await col.findOne({hash:'2+J70h+B6j178b4fAk0Iys3keRixA0AZXnoX5U3v7bWtjtb6NlWSLm6v2dHspBtaEDEvHtIkkMgeMNlPqpuVXw=='});
//     console.log(data);
// }
// main();
router.use('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, hash } = req.cookies; // 브라우저 저장된 쿠키 불러오기
    const check = yield DB_1.checkUser(id, hash, true); //유저확인
    console.log(`admin : ${check}`); // admin이면 true, 아님 false 
    if (check) { //true 이면
        next(); // 다음 라우터로 넘김
    }
    else {
        res.redirect('/error');
    }
}));
router.get('/', (req, res) => {
    res.sendFile('admin.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
router.post('/add', users_1.add); // 계정추가(어드민)
router.post('/del', users_1.del); // 계정삭제(어드민)
exports.default = router;
//# sourceMappingURL=admin.js.map