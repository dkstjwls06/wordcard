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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// router.use(express.static('..../frontend/img')
//이미지 저장
router.get('/note', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(path_1.default.resolve(__dirname, '..', '..', 'frontend/img/bookbackground.png'));
    res.sendFile('bookbackground.png');
}));
router.get('/logo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(path_1.default.resolve(__dirname, '..', '..', 'frontend/img/wadswac.png'));
    res.end(data);
}));
router.get('/face', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(path_1.default.resolve(__dirname, '..', '..', 'frontend/img/asdwasd.png'));
    res.end(data);
}));
router.get('/background1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(path_1.default.resolve(__dirname, '..', '..', 'frontend/img/asdwacwasd.png'));
    res.end(data);
}));
exports.default = router;
//# sourceMappingURL=img.js.map