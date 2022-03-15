const BaseModule = require('../BaseModule');

class GameManager extends BaseModule {
    constructor(options){
        super(options);
        this.users = [];
        // Сюда надо писать set и subscribe

        this.mediator.subscribe(
            this.EVENTS.USER_LOGIN, 
            (login) => this.login(login),
        );
        this.mediator.subscribe(
            this.EVENTS.USER_MOVE, 
            (nickname, x, y) => this.move(nickname,x,y),
        );
        this.mediator.set(
            this.TRIGGERS.GET_PLAYERS, 
            () => this.getPlayers(),
        );
    }

    login(nickname) {
        const { nickname } = data;
        this.users.push({nickname, x:300, y:300, radius:25, color:'0xff0000'});
        return true;
    }

    getPlayers(){
        return this.users;
    }

    move(nickname, x, y){
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].nickname == nickname){
                this.users[i].x = x;
                this.users[i].y = y;
            }
        }
        return true;
    }
}

module.exports = GameManager;