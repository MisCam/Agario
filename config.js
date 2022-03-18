const CONFIG = {
    NAME: 'Eat Worker',
    VERSION: '0.0.1',
    PORT: 3000,
    
    MEDIATOR: {
        EVENTS: {
            USER_LOGIN: 'USER_LOGIN',
            USER_LOGOUT: 'USER_LOGOUT',
            USER_MOVE: 'USER_MOVE',
        },
        TRIGGERS: {
            GET_PLAYERS : 'GET_PLAYERS',
        }
    }
}

module.exports = CONFIG;