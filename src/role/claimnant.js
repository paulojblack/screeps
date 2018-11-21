const Role = require('command.Role');

module.exports = class Claimnant extends Role {
    constructor(creep) {
        super(creep);
    }

    run() {
        const scout = this;
        const creep = scout.creep;
        creep.say('c');

        try {
            if (creep.room.name !== creep.memory.target) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.target));
            }

            if (creep.room.name === creep.memory.target) {
                if (creep.room.controller) {
                    if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        return creep.moveTo(creep.room.controller);
                    }
                    return creep.claimController(creep.room.controller);
                }
            }
        } catch (e) {
            console.log(e.stack);
            console.log('Claimnant error');
        }
    }

    static getDesign(budget, room) {
        return [MOVE, CLAIM, CLAIM];// 1250
    }
};
