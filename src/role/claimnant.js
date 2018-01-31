let Role = require('class.Role')

module.exports = class Claimnant extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {

        let scout = this;
        let creep = scout.creep;
        let targetRoom = Game.rooms[creep.memory.target]
        creep.say('c')

        try {
            if (creep.room.name !== targetRoom.name) {
                return creep.travelTo(new RoomPosition(25,25, targetRoom.name))
            }

            if (creep.room.name === targetRoom.name) {
                if(creep.room.controller) {
                    if (creep.claimController(targetRoom.controller) === ERR_NOT_IN_RANGE) {
                        return creep.travelTo(targetRoom.controller)
                    } else {
                        return creep.claimController(targetRoom.controller)
                    }
                }
            }
        } catch(e) {
            console.log(e.stack)
            console.log('Claimnant error')
        }
    }

    static getDesign(budget, room) {
        return [MOVE, CLAIM, CLAIM]//1250
    }
}
