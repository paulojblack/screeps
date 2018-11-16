let Role = require('Execution.Role')

module.exports = class Scout extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {

        let scout = this;
        let creep = scout.creep;

        //move to constructor

        try {
            if (!creep.memory.positioned) {
                return scout.positionScout();
            } else {
                //move to position
            }
        } catch(e) {
            console.log(e)
            console.log('Scout error')
        }
    }

    positionScout() {
        let scout = this;
        let creep = scout.creep;

        // if (creep.room.name === creep.memory.target) {
        return creep.moveTo(new RoomPosition(25,25, creep.memory.target))
        // } else {
            // creep.moveTo(creep.memory.)
        // }
    }

    static getDesign(budget, room) {
        var design = [MOVE, MOVE, MOVE];
	    var spent = 150;

        return design;
    }
}
