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
//공유 wordcard 관리 미들웨어
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const DB_1 = require("./DB");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.sendFile('share.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
router.get('/getShare', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: 'error occured' });
    }
    const getshare = yield DB_1.getShare();
    res.json({ status: 'good', getshare: getshare });
}));
router.post('/practicefetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.body;
    console.log(query);
    const share = query.share;
    const temp = query.title;
    const title = temp.replace(/\!\@\!\@\$\(/g, ' ');
    const madeby = query.madeby;
    const madeuser = yield DB_1.findOne({ id: madeby });
    console.log(madeuser);
    let result1 = madeuser.made[share];
    let result = null;
    for (let i = 0; i < result1.length; i++) {
        console.log(result1[i].title, title);
        if (result1[i].title == title) {
            console.log(result1[i]);
            result = result1[i];
        }
    }
    console.log(title, result);
    res.json({ result, status: 'good' });
}));
exports.default = router;
//# sourceMappingURL=share.js.map