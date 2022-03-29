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
const path_1 = __importDefault(require("path"));
const DB_1 = require("./DB");
const router = express_1.default.Router();
router.post('/examstart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomArrayShuffle = (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        };
        const examdata = req.body;
        if (examdata.type === 'objective' && examdata.range.length <= 5) {
            console.log('Status:bad, reason:insufficient words');
            res.json({ status: 'bad', reason: 'You need to add at least 6 words to start this.' });
        }
        examdata['question'] = {};
        console.log(examdata, 10);
        examdata['examinee'] = req.cookies.id;
        const type = ['WtoM', 'WtoS', 'MtoW', 'MtoS', 'StoW', 'StoM'];
        let questionResult = {
            WtoM: [],
            WtoS: [],
            MtoW: [],
            MtoS: [],
            StoW: [],
            StoM: []
        };
        let replace = {
            W: 'word',
            M: 'mean',
            S: 'synonym'
        };
        for (let i = 0; i < examdata.range.length; i++) {
            let means = examdata.range[i].mean;
            let synonyms = examdata.range[i].synonym;
            examdata.range[i].mean = means.join(', ');
            examdata.range[i].synonym = synonyms.join(', ');
        } //
        let questionlist = examdata.range;
        console.log(questionlist, 56);
        for (let i of type) {
            let templist = randomArrayShuffle(questionlist); // 여기서 이미 섞임
            let questionchoice = randomArrayShuffle(questionlist);
            console.log(templist, 31); // 범위는 templist만 가지고 놀것!
            if (examdata.type === 'objective') {
                for (let j = 0; j < examdata.number[i]; j++) { // 각각 개수만큼 문제를 만드는 곳
                    // 문제 / 정답 정하기
                    const data = templist[j]; // 문제 / 정답 리스트
                    console.log(data);
                    templist.splice(j, 1);
                    const key1 = i[0];
                    const key2 = i[3];
                    let from = replace[key1];
                    let to = replace[key2]; // 결과값 : word, mean, syn
                    // to 쪽은 틀린 답안 만들때도 사용!
                    let question = data[from]; //문제 낼 것
                    let answer = data[to];
                    console.log(question, answer, 60);
                    // 답안 선택지 만들기 
                    const random = Math.floor(Math.random() * 5); // 정답 0~4
                    const set = new Set(); // 집합 생성
                    while (set.size < 5) {
                        if (set.size === random) {
                            set.add(answer);
                            continue;
                        }
                        let wrongchoice = () => {
                            console.log(templist.length, questionchoice.length, 88);
                            const wrong = Math.floor(Math.random() * questionchoice.length);
                            const result = questionchoice[wrong];
                            const final = result[to];
                            return final;
                        };
                        let wrong = wrongchoice();
                        if (wrong === answer) {
                            continue;
                        }
                        console.log(`${wrong} | ${answer}`);
                        set.add(wrong);
                    }
                    //배열에 넣기
                    const result = {
                        question,
                        answer: random,
                        choice: Array.from(set)
                    };
                    questionResult[i].push(result);
                }
            }
            else { //subjective
                for (let i = 0; i < examdata.range.length; i++) {
                    let means = examdata.range[i].mean;
                    let synonyms = examdata.range[i].synonym;
                    examdata.range[i].mean = means.join(';');
                    examdata.range[i].synonym = synonyms.join(';');
                } //
                console.log(examdata.range);
            }
        }
        console.log(examdata, 75);
        delete examdata.range;
        examdata['question'] = questionResult;
        console.log('hi');
        try {
            const put = yield DB_1.putsuggest(examdata, 'exam'); // 제안 아니라 시험 데이터 넣는거임!!(단지 메서드가 비슷해서 재활용)
        }
        catch (error) {
            console.log(error);
            res.json({ status: 'bad', reason: 'error occured' });
        }
        res.json({ examdata, status: 'good' });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 'bad', error });
    }
}));
router.get('/', (req, res) => {
    res.sendFile('exam.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
router.get('/userOffline', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        examinee: req.query.examinee,
        share: req.query.share,
        madeby: req.query.madeby
    };
    const title = req.query.title;
    console.log(data, title, 162);
    title.replace(/\!\@\!\@\$\(/g, ' ');
    data['title'] = title;
    const off = yield DB_1.offline(data);
    res.end('good');
}));
router.get('/getExamData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        type: req.query.type,
        madeby: req.query.madeby,
        share: req.query.share,
        examinee: req.query.examinee
    };
    let title = req.query.title;
    console.log(title, 178);
    obj['title'] = title.replace(/\!\@\!\@\$\(/g, ' ');
    try {
        const examdata = yield DB_1.findOne(obj, 'exam');
        console.log(examdata, 180);
        res.json({ status: 'good', examdata });
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: 'error occured' });
    }
}))
    .post('/resultdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examdata = req.body;
    const newobj = examdata.question;
    try {
        console.log(examdata, newobj, 198);
        const find = yield DB_1.findOne({ _id: examdata._id }, 'exam');
        console.log(find);
        const update = yield DB_1.updateexam(newobj, examdata);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'bad', reason: 'error occured' });
    }
    res.json({ status: 'good' });
}))
    .get('/examresult', (req, res) => {
    res.sendFile('examresult.html', {
        root: path_1.default.resolve(__dirname, '..', '..', 'frontend/dist')
    });
});
exports.default = router;
//# sourceMappingURL=exam.js.map