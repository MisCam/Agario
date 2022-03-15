const express = require("express");
const router = express.Router();

const baseRouter = require("./BaseRouter");

function Router({ mediator }) {
    router.get("/users/login/:nick", loginHandler);
    router.get("/players/move", moveHandler);
    router.get("/players/get", getPlayersHandler);
    router.get("/*", getError);

    const BaseRouter = new baseRouter();

    function getError(request, response) {
        response.json(BaseRouter.error(9000));
    }

    function getPlayersHandler(request, response){
        mediator.call(mediator.TRIGGERS.GET_PLAYERS);


    }

    function moveHandler(request, response){
        const { nick, x, y } = request.params;

    }

    function loginHandler(request, response) {
        const { nick } = request.params;
        const user_id = mediator.get(mediator.TRIGGERS.GET_USER_ID, {nick});
        if (user_id !== false) {   
            response.json(BaseRouter.answer({
                id: user_id,
                phoneBook:  mediator.get(mediator.TRIGGERS.GET_PHONE_BOOK, user_id),
                noteBook:  mediator.get(mediator.TRIGGERS.GET_NOTE_BOOK, user_id),
            }));
            return;
        }
        response.json(BaseRouter.error(1003));
    }

    return router;
}


module.exports = Router;
