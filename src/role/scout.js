const Role = require('command.Role');

module.exports = class Scout extends Role {
    constructor(creep) {
        super(creep);
    }

    run() {
        const scout = this;
        const creep = scout.creep;

        // move to constructor

        try {
            if (!creep.memory.positioned) {
                return scout.positionScout();
            }
            // move to position
        } catch (e) {
            console.log(e);
            console.log('Scout error');
        }
    }

    positionScout() {
        const scout = this;
        const creep = scout.creep;

        // if (creep.room.name === creep.memory.target) {
        return creep.moveTo(new RoomPosition(25, 25, creep.memory.target));
        // } else {
        // creep.moveTo(creep.memory.)
        // }
    }

    static getDesign(budget, room) {
        const design = [MOVE, MOVE, MOVE];
	    const spent = 150;

        return design;
    }
};
