"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_1 = __importDefault(require("./secret"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = (id, pass) => {
    return crypto_1.default.createHash('sha512').update(`${id}${secret_1.default.secret}${pass}`).digest('base64');
};
//# sourceMappingURL=hash.js.map