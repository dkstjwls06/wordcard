"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
// app.use('/public', express.static(path.resolve(__dirname, 'front/dist')))
app.get('/', (req, res) => {
    console.log('왔음');
    res.redirect('/public/index.html');
});
const server = app.listen(4000);
const io = new socket_io_1.Server(server);
io.of('/api').on('connection', socket => {
    console.log('연결 성공');
    socket.on('echo', e => {
        socket.emit('echo', {
            data: e.data,
            date: Date.now()
        });
    });
    socket.on('disconnect', e => {
        console.log('연결이 끊김');
    });
});
//# sourceMappingURL=index%20fuck.js.map