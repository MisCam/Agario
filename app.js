const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Mediator = require('./application/modules/Mediator');
const UserManager = require("./application/modules/userManager/UserManager");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

io.on('connection', socket => {
    console.log('connected ', socket.id);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
    socket.on('message', data => io.emit('message', data));
});

const { PORT, NAME, VERSION, MEDIATOR } = require('./config');
const mediator = new Mediator(MEDIATOR);
new UserManager({ mediator });

const Router = require("./application/router/Router");
const router = new Router({ mediator });
app.use(express.static(__dirname + "/public"));
app.use("/", router);

server.listen(PORT, () => console.log(`App ${NAME} version ${VERSION}`));
