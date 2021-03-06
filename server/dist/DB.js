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
    if (err) { //????????????
        console.error(err);
        return false; //?????? ????????? ?????? ??????
    }
    else {
        const db = client.db(dbName); //dbName ?????? db ?????? (????????? 'test')
        const col = yield db.collections(); //
        for (let i of col) {
            map.set(i.collectionName, i);
        }
        console.log('Ready');
        // const data = await col.findOne({hash:'2+J70h+B6j178b4fAk0Iys3keRixA0AZXnoX5U3v7bWtjtb6NlWSLm6v2dHspBtaEDEvHtIkkMgeMNlPqpuVXw=='});
    }
}));
const checkUser = (id, hash, isAdmin = false) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield map.get('users').findOne({ hash }); // ????????? ????????? ????????? ?????? ?????? ??????????????? ??????
    if (data) { // ?????? ??????
        if (isAdmin) { //??????????????????
            if (data.isAdmin && id === data.id) { // ????????? ??????, ?????????
                return true;
            }
        }
        else {
            if (data.id === id) { //????????? ??????
                return true;
            }
        }
    }
    return false; //???????????? ??? ?????? - ???????????? ?????? ?????? ?????? / ?????? ??????
});
exports.checkUser = checkUser;
const checkOverlap = (name, value, type = "users") => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield map.get(type).findOne({
        [name]: value
    });
    if (data) { // ???????????? ???????????? ?????? ???
        return false; // ?????? ??????
    }
    else { // ?????? ???
        return true; //?????? ?????? (ID?????? ??????)
    }
});
exports.checkOverlap = checkOverlap;
const findOne = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try { // ?????? ????????? ????????? ??????
        const data = yield map.get(type).findOne(obj);
        return data;
    }
    catch (err) { // ???????????? ?????? ?????? null ??????
        console.log(err);
        return null;
    }
});
exports.findOne = findOne;
const insertData = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).insertOne(obj); // obj(????????????) ????????? ??????
        return true;
    }
    catch (err) {
        console.log(err);
        return false; // ?????? ????????? ?????? ??????
    }
});
exports.insertData = insertData;
const deleteData = (obj, type = 'users') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield map.get(type).deleteOne(obj); // ?????? ?????? ?????? ?????? ??????
        return true; // ?????? ??????
    }
    catch (err) { // ?????? ??? ?????? ??????
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
const updateWordcard = (newobj /*????????????*/, userdata /*?????? ??????*/, type = 'users', query, num) => __awaiter(void 0, void 0, void 0, function* () {
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
const createNewWordCard = (obj, type = 'users', userdata /*?????? ??????*/) => __awaiter(void 0, void 0, void 0, function* () {
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
const checkOverlapWordCard = (obj /*??? ??????*/, type = 'users' /*collection ??????*/, title /*??????*/, userdata /*?????? ??????*/) => __awaiter(void 0, void 0, void 0, function* () {
    try { //???????????? ??????
        const arr = yield map.get(type).findOne({
            _id: userdata._id,
            "made.unshare": { "$elemMatch": { title } }
        });
        console.log(arr);
        if (arr) {
            return true; // ??????
        }
        else {
            console.log('hi');
            return false; // ??????
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
const upload = (title /*??????*/, type = 'users' /*?????????*/, userdata /*????????? ??????*/, targetObj /*share??? ????????? ??? ???*/) => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield map.get(path).updateOne({ _id: userdata._id }, // ?????? _id???
        {
            $set: { [`${type}`]: newdata }
        } // ???????????? ??????(??????)??? ??? ???????????? ??????
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
const updateexam = (newobj /*????????????*/, examdata /*?????? ??????*/, type = 'exam') => __awaiter(void 0, void 0, void 0, function* () {
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
        WtoM:[ / ???????????? ??????
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
        WtoS:[ / ???????????? ??????
            0:{
                question:'alternative',
                answer:[
                    0:'answer1',
                    1:'answer2'
                    etc(???????????? ','??? split ??????)
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