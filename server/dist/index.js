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
const express_1 = __importDefault(require("express")); //express
const promises_1 = __importDefault(require("fs/promises"));
const admin_1 = __importDefault(require("./admin"));
const app = express_1.default();
const img_1 = __importDefault(require("./img"));
const hash_1 = __importDefault(require("./hash"));
const mail_1 = __importDefault(require("./mail"));
const DB_1 = require("./DB");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = require("./users");
const translate_1 = __importDefault(require("./translate"));
const share_1 = __importDefault(require("./share"));
const exam_1 = __importDefault(require("./exam"));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
// import io from 'socket.io'
// import http from 'http'
// let server = http.createServer(app);
// io.listen(server)
const path_1 = __importDefault(require("path"));
// app.get('./module/id.js',(req,res)=>{
//     console.log('hi')
//     res.sendFile('id.js',{
//         root:'./module'
//     })
// })
app.use(/.+\.js$/, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = path_1.default.resolve(__dirname, '..', '..', 'frontend', `dist${req.originalUrl}`);
    try {
        yield promises_1.default.access(result);
        res.sendFile(path_1.default.basename(result), {
            root: path_1.default.dirname(result)
        });
    }
    catch (err) {
        next();
    }
}));
app.get('/mail', (req, res) => {
    res.sendFile('/mail.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist/login')
    });
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile('favicon.ico', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/img')
    });
});
//mail?????? ?????? ?????? ?????????(????????? ?????? ??????)
app.use('/mail', mail_1.default);
//admin?????? ?????? ?????? ?????????(????????? ?????? ??????)
app.use('/admin', admin_1.default);
app.use('/translate', translate_1.default);
app.use('/img', img_1.default);
app.use('/share', share_1.default);
app.use('/exam', exam_1.default);
//?????????
app.get('/error', (req, res) => {
    res.sendFile('error.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
app.post('/wordcardinfo', (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.body;
    let data = query.title.split('/');
    const share = data[0];
    const title = data[1];
    const dt = yield DB_1.findOne(req.cookies);
    console.log(typeof (dt));
    let result1 = dt.made[share];
    let result = null;
    console.log(result1[0]);
    for (let i = 0; i < result1.length; i++) {
        if (result1[i].title == title) {
            result = result1[i];
        }
    }
    console.log(title, 'good');
    res.json({ result: result, status: 'good' });
}));
app.post('/practicefetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.body;
    const share = query.share;
    const temp = query.title;
    const title = temp.replace(/\!\@\!\@\$\(/g, ' ');
    const dt = yield DB_1.findOne(req.cookies);
    console.log(typeof (dt));
    let result1 = dt.made[share];
    let result = null;
    for (let i = 0; i < result1.length; i++) {
        console.log(result1[i].title, title);
        if (result1[i].title == title) {
            console.log(result1[i], 125);
            result = result1[i];
        }
    }
    console.log(title, result);
    res.json({ result, status: 'good' });
}));
app.get('/bless', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bless = [
        "Even a one thousand miles journey begins with the first step. - Korean Proverb",
        "It's the earliest time that you thought it was late.",
        "It always seems impossible until it???s done. - Nelson Mandela",
        "Believe you can and you???re halfway there.",
        "I???ve failed over and over and over again in my life. And that is why I succeed. ??? Michael Jordan",
        "It???s not going to be easy, but it???s going to be worth it.",
        "The merit of an action lies in finishing it to the end. - Genghis Khan",
        "Don't spend your days in vainly. Your youth will never return. - Jung-geun An",
        "Well done is better than well said. - benjamin Franklin",
        "Impossible + a drop of sweat = I'm Possible.",
        "Need Help? Go to support tab.",
        "If you do not like how things are, change them. - Jim Rohn",
        "You can always be better. - Tiger Woods",
        "Without studying the soul sick. - Seneca"
    ];
    let num = Math.floor(Math.random() * 14);
    const data = bless[num];
    res.json({ status: 'good', word: data });
}));
//????????? ???
app.get('/login', (req, res) => {
    res.clearCookie('id');
    res.clearCookie('hash'); //?????? ???????????? ?????? ?????????
    res.sendFile('login.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist/login')
    });
});
//???????????? ??????
app.get('/logout', (req, res) => {
    res.clearCookie('id'); //id ?????? ?????????
    res.clearCookie('hash'); //?????? ?????? ?????????
    res.redirect('/login'); //????????? ???????????? ???????????????
});
app.post('/del', users_1.del);
//????????? ?????? ??????
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, pass } = req.body; //???????????? ?????????id, pass ????????????
    const hash = hash_1.default(id, pass); // ????????? ????????? ?????? ??????
    const check = yield DB_1.checkUser(id, hash); // ???????????? ????????? ??????????????? ?????? / ??????????????? ??????
    if (check) { //?????? ???????????? ??????????????? ???????????????
        const cookieObj = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true }; //?????? ??????????????? ????????? ?????? ??????
        res.cookie('id', id, cookieObj); //????????? id, hash ??????
        res.cookie('hash', hash, cookieObj);
        res.json({ status: 'good', url: '/' });
    }
    else {
        res.json({ status: 'bad', reason: 'ID or Password is(are) wrong.' }); //???????????? ???????????? ?????? ??????
    }
}));
//?????? ?????? ??????
app.use('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, hash } = req.cookies; //????????? ?????? id, hash ????????????
    if (id && hash) { //?????? ????????? ?????????
        const check = yield DB_1.checkUser(id, hash); //?????? ?????? ?????? ??????
        console.log(check); // ??????
        if (check) { //?????? ???
            console.log(hash);
            next(); //?????? ????????????
            return false;
        }
    }
    res.redirect('/login'); //????????? ?????? ?????? ?????????????????????
}));
//?????? ?????? ????????? ?????? ???????????? ???
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
})
    .get('/nick', (req, res) => {
    res.json({ nick: req.cookies.id });
})
    .get('/userinfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield DB_1.findOne(req.cookies));
}));
app.get('/:modify', (req, res) => {
    res.sendFile(`${req.params.modify}.html`, {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
}); // practice + modify
app.post('/savewordcard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.query.share;
    const title = req.query.title;
    const patch = req.body.patch;
    const legacy = req.body.legacy;
    console.log(patch, 231);
    console.log(share, title, 232);
    const id = yield DB_1.findOne(req.cookies);
    console.log(legacy, 234);
    // const isExist = (elem:any)=>{
    //     elem.title = legacy.title
    // }
    const num = id.made[share].findIndex(v => v.title === legacy.title);
    // const num = id.made[share].indexOf(legacy.title) // ?????? ??? ?????????
    //legacyobj = ??????????????? ??? ??? ?????????
    //id = ??? ????????? ?????? ??????
    //patch = ?????? ?????????
    const query = {
        share: share,
        title: title
    };
    console.log(id, 235);
    const result = yield DB_1.updateWordcard(patch, id, 'users', query, num);
    if (result.status == 'good')
        res.json('Saved Suuccessfully!');
    else
        (res.json('something Went Wrong'));
}))
    .post('/createnew', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const obj = {
        title: title,
        type: 'wordcard',
        content: []
    };
    const userdata = yield DB_1.findOne(req.cookies);
    const bool = yield DB_1.checkOverlapWordCard(obj, 'users', title, userdata);
    if (!bool && bool !== null) {
        const create = yield DB_1.createNewWordCard(obj, 'users', userdata);
        if (create) {
            res.json({ status: 'good' });
        }
        else {
            res.json({ status: 'bad', reason: 'error occured' });
        }
    }
    else if (bool !== null) {
        res.json({ status: 'bad', reason: 'duplicated title' });
    }
    else {
        res.json({ status: "bad", reason: 'error occured.' });
    }
}))
    .post('/deleteWordCard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const title = req.body.title;
    const userdata = yield DB_1.findOne(req.cookies);
    try {
        console.log(share, title, 284);
        const del = yield DB_1.deleteWordCard(title, 'users', share, userdata);
        console.log(del, 286);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: err });
    }
    res.json({ status: 'good' });
}))
    .post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data, 297);
    try {
        const userdata = yield DB_1.findOne(req.cookies);
        let result1 = userdata.made[data.share];
        let result = null;
        for (let i = 0; i < result1.length; i++) {
            if (result1[i].title === data.title) {
                result = result1[i];
                console.log(result, 307);
            }
        }
        // result - ?????? ???
        if (!result) {
            res.json({ status: 'bad', reason: 'error occured' });
        }
        try {
            const uploadwordcard = yield DB_1.upload(data.title, 'users', userdata, result);
        }
        catch (error) {
            console.log(error);
            res.json({ status: 'bad', reason: error });
        }
        res.json({ status: 'good' });
        // ?????? ???????????? ??? ????????? ??????
    }
    catch (err) {
        console.log(err),
            res.json({ status: 'bad', reason: err });
    }
}));
app.post('/personcheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.cookies.id;
    const { pass } = req.body; //???????????? ?????????id, pass ????????????
    const hash = hash_1.default(id, pass); // ????????? ????????? ?????? ??????
    const check = yield DB_1.checkUser(id, hash); // ???????????? ????????? ??????????????? ?????? / ??????????????? ??????
    if (check) { //?????? ???????????? ??????????????? ???????????????
        res.json({ status: 'good' });
    }
    else {
        res.json({ status: 'bad', reason: 'Password is wrong.' }); //???????????? ???????????? ?????? ??????
    }
}));
app.post('/newdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    try { // hash(pass)
        const newpass = req.body.newpass;
        const id = req.cookies.id;
        const newhash = hash_1.default(id, newpass);
        const userdata = yield DB_1.findOne(req.cookies);
        const newdata = yield DB_1.newData('users', type, newhash, userdata);
        res.json({ status: 'good' });
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: err });
    }
}));
app.post('/suggest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = req.body.genre;
    const textvalue = req.body.textvalue;
    const userdata = yield DB_1.findOne(req.cookies);
    const obj = {
        id: userdata.id,
        genre,
        textvalue
    };
    try {
        const sug = yield DB_1.putsuggest(obj, 'suggestion');
        res.json({ status: 'good' });
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: err });
    }
}))
    .get('/prepexam', (req, res) => {
    res.sendFile('prepexam.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
// Database Name
app.listen(4000, () => { console.log('Server ready'); });
//# sourceMappingURL=index.js.map