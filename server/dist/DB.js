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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateexam = exports.offline = exports.putsuggest = exports.newData = exports.getShare = exports.upload = exports.deleteWordCard = exports.checkOverlapWordCard = exports.createNewWordCard = exports.updateWordcard = exports.findWordcard = exports.deleteData = exports.insertData = exports.findOne = exports.checkOverlap = exports.checkUser = void 0;
const mongodb_1 = require("mongodb");
const secret_1 = __importDefault(require("./secret"));
const dbName = 'test';
const client = new mongodb_1.MongoClient(secret_1.default.url, { useUnifiedTopology: true });
// Use connect method to connect to the server
const map = new Map();
const createexpire = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield map.get('exam').createIndex({ "createdAt": new Date() }, { expireAfterSeconds: 3600 });
    }
    catch (error) {
        throw error;
    }
});
client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) { //에러나면
        console.error(err);
        return false; //에러 출력후 함수 종료
    }
    else {
        const db = client.db(dbName); //dbName 명의 db 생성 (여기선 'test')
        const col = yield db.collections(); //
        for (let i of col) {
            map.set(i.collectionName, i);
        }
        console.log('Ready');
        // const data = await col.findOne({hash:'2+J70h+B6j178b4fAk0Iys3keRixA0AZXnoX5U3v7bWtjtb6NlWSLm6v2dHspBtaEDEvHtIkkMgeMNlPqpuVXw=='});
    }
}));
const checkUser = (id, hash, isAdmin = false) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield map.get('users').findOne({ hash }); // 유저가 입력한 해시랑 같은 것이 존재하는지 확인
    if (data) { // 있는 경우
        if (isAdmin) { //어드민인경우
            if (data.isAdmin && id === data.id) { // 아이디 일치, 어드민
                return true;
            }
        }
        else {
            if (data.id === id) { //아이디 일치
                return true;
            }
        }
    }
    return false; //여기까지 온 경우 - 무엇이든 하나 이상 틀림 / 함수 종료
});
exports.checkUser = checkUser;
const checkOverlap = (name, value, type = "users") => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield map.get(type).findOne({
        [name]: value
    });
    if (data) { // 중복되는 아이디가 있을 시
        return false; // 거짓 반환
    }
    else { // 없을 시
        return true; //허가 반환 (ID생성 허락)
    }
});
exports.checkOverlap = checkOverlap;
const findOne = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try { // 해당 데이터 찾아서 반환
        const data = yield map.get(type).findOne(obj);
        return data;
    }
    catch (err) { // 에러나면 에러 표시 null 반환
        console.log(err);
        return null;
    }
});
exports.findOne = findOne;
const insertData = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).insertOne(obj); // obj(유저정보) 객체에 추가
        return true;
    }
    catch (err) {
        console.log(err);
        return false; // 에러 발생시 함수 종료
    }
});
exports.insertData = insertData;
const deleteData = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).deleteOne(obj); // 해당 유저 정보 객체 삭제
        return true; // 함수 종료
    }
    catch (err) { // 에러 시 함수 종료
        console.log(err);
        return false;
    }
});
exports.deleteData = deleteData;
const findWordcard = (legacyobj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).find(legacyobj);
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.findWordcard = findWordcard;
const updateWordcard = (newobj /*변경사항*/, userdata /*유저 정보*/, type = 'users', query, num) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).updateOne({ _id: userdata._id }, { $set: { [`made.${query.share}.${num}`]: newobj } });
        return { status: 'good' };
    }
    catch (err) {
        console.log(err);
        return { status: 'bad' };
    }
});
exports.updateWordcard = updateWordcard;
const createNewWordCard = (obj, type = 'users', userdata /*유저 정보*/) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).updateOne({ _id: userdata._id }, { $push: { ['made.unshare']: obj } });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.createNewWordCard = createNewWordCard;
const checkOverlapWordCard = (obj /*새 객체*/, type = 'users' /*collection 위치*/, title /*제목*/, userdata /*유저 정보*/) => __awaiter(void 0, void 0, void 0, function* () {
    try { //중복확인 절차
        const arr = yield map.get(type).findOne({
            _id: userdata._id,
            "made.unshare": { "$elemMatch": { title } }
        });
        console.log(arr);
        if (arr) {
            return true; // 중복
        }
        else {
            console.log('hi');
            return false; // 통과
        }
        // arr.findIndex((v: { title: string; }) => v.title === title)
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.checkOverlapWordCard = checkOverlapWordCard;
const deleteWordCard = (title, type = 'users', share, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield map.get(type).updateOne({
            _id: userdata._id,
        }, {
            '$pull': {
                [`made.${share}`]: { title }
            }
        });
        console.log(res);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    return true;
});
exports.deleteWordCard = deleteWordCard;
const upload = (title /*제목*/, type = 'users' /*콜렉션*/, userdata /*사용자 정보*/, targetObj /*share에 넣어야 할 것*/) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield map.get(type).updateOne({
            _id: userdata._id
        }, {
            '$push': {
                [`made.share`]: targetObj
            }
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    return true;
});
exports.upload = upload;
const getShare = (type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const sharearray = [];
    try {
        const projection = { '_id': false, 'id': true, 'made.share': true };
        const res = yield map.get(type).find({}).project(projection);
        try {
            for (var res_1 = __asyncValues(res), res_1_1; res_1_1 = yield res_1.next(), !res_1_1.done;) {
                let i = res_1_1.value;
                for (let j = 0; j < i.made.share.length; j++) {
                    const obj = {
                        id: i.id,
                        data: i.made.share[j]
                    };
                    sharearray.push(obj);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (res_1_1 && !res_1_1.done && (_a = res_1.return)) yield _a.call(res_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log(sharearray);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    return sharearray;
});
exports.getShare = getShare;
const newData = (path, type, newdata, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield map.get(path).updateOne({ _id: userdata._id }, // 해당 _id의
        {
            $set: { [`${type}`]: newdata }
        } // 아이디나 해시(비번)을 새 데이터로 바꿈
        );
        return true;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.newData = newData;
const putsuggest = (obj, type = 'suggestion') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield map.get(type).insertOne(obj);
        return true;
    }
    catch (err) {
        throw err;
    }
});
exports.putsuggest = putsuggest;
const offline = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield map.get('exam').deleteOne(data);
        return true;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.offline = offline;
const updateexam = (newobj /*변경사항*/, examdata /*유저 정보*/, type = 'exam') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 'made.share.0.title'
        yield map.get(type).updateOne({ _id: examdata._id }, { $set: { [`question`]: newobj } });
        return true;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.updateexam = updateexam;
/*
{
    id,
    title,
    share,
    madeby,
    type,
    question;{
        WtoM:[ / 객관식인 경우
            0:{
                question:'tremendous',
                answer:2 (0~4),
                choose:{
                    0:'wrong answer',
                    1:'wrong answer',
                    2:'right answer',
                    3:'wrong answer',
                    4:'wrong answer'
                }
            }
        ],
        WtoS:[ / 주관식인 경우
            0:{
                question:'alternative',
                answer:[
                    0:'answer1',
                    1:'answer2'
                    etc(배열에서 ','로 split 된것)
                ]
            }
        ],
        MtoW,
        MtoS,
        StoW,
        StoM
    }
}

*/ 
//# sourceMappingURL=DB.js.map