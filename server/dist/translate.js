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
const request_1 = __importDefault(require("request"));
const router = express_1.default.Router();
const client_id = 'xu51U6cKIozeBvwugrXX';
const client_secret = '8x4ibSHXN5';
router.post('/', (req /*번역 해야할 문자*/, res /*번역 된 문자*/) => __awaiter(void 0, void 0, void 0, function* () {
    const bool = req.body.bool;
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const text = req.body.value;
    console.log(text, 11);
    let source, target;
    if (bool) {
        source = 'ko';
        target = 'en';
    }
    else {
        source = 'en';
        target = 'ko';
    }
    console.log(source, target);
    const options = {
        url: api_url,
        form: { 'source': source, 'target': target, 'text': text },
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request_1.default.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            console.log(body, 29);
            res.end(body);
        }
        else {
            res.json({ status: 'bad', code: response.statusCode });
            console.log('error = ' + error);
            console.log(body);
        }
    });
}));
exports.default = router;
//# sourceMappingURL=translate.js.map