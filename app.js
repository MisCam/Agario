const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Mediator = require('./application/modules/Mediator');
const PhoneBook = require("./application/modules/phonebook/PhoneBook");
const UserManager = require("./application/modules/userManager/UserManager");
const NoteBook = require("./application/modules/notebook/NoteBook");

io.on('connection', socket => {
    console.log('connected ', socket.id);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
    socket.on('message', data => io.emit('message', data));
});

const { PORT, NAME, VERSION, MEDIATOR } = require('./config');
const mediator = new Mediator(MEDIATOR);
new UserManager({ mediator });
new PhoneBook({ mediator });
new NoteBook({ mediator });

const Router = require("./application/router/Router");
const router = new Router({ mediator });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static(__dirname + "/public"));
app.use("/", router);

server.listen(PORT, () => console.log(`App ${NAME} version ${VERSION}`));
