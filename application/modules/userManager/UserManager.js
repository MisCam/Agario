const BaseModule = require('../BaseModule');

class userManager extends BaseModule {
    constructor(options) {
        super(options);
        this.users = [];

        this.mediator.set(
            this.TRIGGERS.GET_USER_ID, 
            (login, password) => this.login(login, password),
        );
        this.mediator.set(
            this.TRIGGERS.CHECK_USER, 
            (login) => this.checkUser(login),
        );
        this.mediator.subscribe(
            this.EVENTS.USER_REGISTRATION, 
            (login, password) => this.registration(login, password),
        );
    }

    checkUser(login){
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].login === login) {               
                return true;
            }
        }
        return false;
    }

    registration(data) {
        const {login, password} = data;
        if (login && password) {
            const user = { login, password };
            this.users.push(user);
        }
        return true;
    }

    login(data) {
        const {login, password} = data;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].login === login &&
                this.users[i].password === password
            ) {
                this.mediator.call(this.EVENTS.USER_LOGIN, this.users[i]);
                return i;
            }
        }
        return false;
    }
}

module.exports = userManager;