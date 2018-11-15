let Role = require('class.Role')

module.exports = class Claimnant extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {

        let scout = this;
        let creep = scout.creep;
        console.log(creep.memory.target)
        //move to constructor
        try {
            if (creep.room.name === creep.memory.target) {
                creep.moveTo(new RoomPosition(25,25, creep.memory.target))
            }

            if (creep.room.name === creep.memory.target) {
                if(creep.room.controller) {
                    if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        return creep.moveTo(creep.room.controller)
                    } else {
                        return creep.claimController(creep.room.controller)
                    }
                }
            }
        } catch(e) {
            console.log(e)
            console.log('Scout error')
        }
    }

    static getDesign(budget, room) {
        return [MOVE, CLAIM, CLAIM]//1250
    }
}
