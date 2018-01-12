let Role = require('class.role');
const partCosts = require('util.constants').partCosts

module.exports = class RoleMiner extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        let miner = this;
        let creep = miner.creep;
        creep.say('m')
        let source = Game.getObjectById(creep.memory.targetSource);
        let container;

        // RoleMiner.getDesign(100)

        try {
            if (!creep.memory.positioned) {
                if (!creep.memory.target || creep.room.name === creep.memory.target) {
                    container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    })[0];

                    if (creep.pos.isNearTo(container.pos)) {
                        creep.memory.positioned = true;
                    } else {
                        creep.moveTo(container);
                    }
                } else {
                    creep.moveTo(source)
                }
            } else {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    return creep.moveTo(source);
                }
            }
        } catch(e) {
            console.log('A miner has errored')
            console.log(creep)

            console.log(source)
            console.log(e)
        }
    }
    /**
     * One work harvest 2 energy per tick. In an owned room, sources have 3000 energy,
     * replenishing in 300 ticks. Thus, 5 WORK is the max needed to exhaust a cycle.
     * TODO abstract this to handle center rooms (4000 energy, do much later)
     * @param  {[type]} budget [description]
     * @param  {[type]} room   [description]
     * @return {[type]}        [description]
     */
    static getDesign(budget, room) {
        return [WORK,WORK,WORK,WORK,WORK,MOVE];
    }
}
