const express = require("express");
const router = express.Router();

const baseRouter = require("./BaseRouter");

function Router({ mediator }) {
    router.get("/users/registration/:login/:password", registrationHandler);
    router.get("/users/login/:login/:password", loginHandler);
    router.get("/book/add/:number/:name/:user_id", phoneBookAddHandler);
    router.get("/book/delete/:number/:user_id", phoneBookDeleteHandler);
    router.get("/*", getError);

    const BaseRouter = new baseRouter();

    function getError(request, response) {
        response.json(BaseRouter.error(9000));
    }

    function phoneBookAddHandler(request, response) {
        const { number, name, user_id } = request.params;
        if (user_id) {
            return response.json(BaseRouter.answer(mediator.get(mediator.TRIGGERS.ADD_CONTACT, {number, name, user_id})));
        }
        response.json(BaseRouter.error(1001));
    }

    //это
    function phoneBookDeleteHandler(request, response) {
        const { number, user_id } = request.params;
        if(user_id){
            return response.json(BaseRouter.answer(mediator.get(mediator.TRIGGERS.DELETE_CONTACT, { number, user_id })));
        }
        return response.json(BaseRouter.error(1002));
    }

    function registrationHandler(request, response) {
        const { login, password } = request.params;
        const user = mediator.get(mediator.TRIGGERS.CHECK_USER, login);
        if (!user) {
            mediator.call(mediator.EVENTS.USER_REGISTRATION, {login, password});
            response.json(BaseRouter.answer('Пользователь был зарегестрирован'));
            return;
        }
        response.json(BaseRouter.error(1001));
    }

    function loginHandler(request, response) {
        const { login, password } = request.params;
        const user_id = mediator.get(mediator.TRIGGERS.GET_USER_ID, {login, password});
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
