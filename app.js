const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Mediator = require('./application/modules/Mediator');
const UserManager = require("./application/modules/userManager/UserManager");
const GameManager = require("./application/modules/gameManager/GameManager");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



const { PORT, NAME, VERSION, MEDIATOR } = require('./config');
const mediator = new Mediator(MEDIATOR);
new UserManager({ mediator });
new GameManager({ mediator });

const Router = require("./application/router/Router");
const router = new Router({ mediator });

io.on('connection', socket => {
    console.log('connected ', socket.id);
    const user_id = socket.id;
    const interval = setInterval(() => {
        io.emit('getScene', mediator.get(mediator.TRIGGERS.GET_PLAYERS));
    },100);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
    socket.on('message', data => io.emit('message', data));
    socket.on('login', data => {
        const nick = data.nick;
        mediator.call(
            mediator.EVENTS.USER_LOGIN, { nick, user_id }
        );
        console.log(mediator.get(mediator.TRIGGERS.GET_PLAYERS));
    });
});



app.use(express.static(__dirname + "/public"));
app.use("/", router);

server.listen(PORT, () => console.log(`App ${NAME} version ${VERSION}`));

/*
Мы впихиваем сокет айди в массив когда юзер конектится
сокет айди мы привязываем к нику чтобы в дальнейшем в верхнем правом углу выводит список игроков и их очки
*/ 
