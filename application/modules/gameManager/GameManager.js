const BaseModule = require('../BaseModule');

class GameManager extends BaseModule {
    constructor(options){
        super(options);
        this.users = [];
        // Сюда надо писать set и subscribe

        this.mediator.subscribe(
            this.EVENTS.USER_LOGIN, 
            ({nick, user_id}) => this.login(nick, user_id),
        );
        this.mediator.subscribe(
            this.EVENTS.USER_MOVE, 
            (user_id, x, y) => this.move(user_id,x,y),
        );
        this.mediator.set(
            this.TRIGGERS.GET_PLAYERS, 
            () => this.getPlayers(),
        );
    }

    login(nickname, user_id) {
        this.users.push({user_id, nickname, x:300, y:300, radius:25, color:'0xff0000'});
        return true;
    }

    getPlayers(){
        return this.users;
    }

    move(user_id, x, y){
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].user_id == user_id){
                this.users[i].x = x;
                this.users[i].y = y;
            }
        }
        return true;
    }
}

module.exports = GameManager;