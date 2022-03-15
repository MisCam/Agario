class BaseModule {
    constructor({ mediator }) {
        this.mediator = mediator;
        this.TRIGGERS = mediator.getTriggerTypes();
        this.EVENTS = mediator.getEventTypes();
    }
}

module.exports = BaseModule