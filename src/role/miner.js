let Role = require('class.Role');
const partCosts = require('util.constants').partCosts

module.exports = class Miner extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        let miner = this;
        let creep = miner.creep;

        let source = Game.getObjectById(creep.memory.boundSource);

        try {
            if (!creep.memory.positioned) {
                return miner.positionMiner(source);
            } else {
                return miner.harvestEnergyOrApproach(source)
            }
        } catch(e) {
            console.log('A miner has errored')
            console.log(creep)

            console.log(source)
            console.log(e)
        }
    }

    positionMiner(source) {
        const creep = this.creep;
        const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (!creep.memory.target || creep.room.name === creep.memory.target) {

            if (container) {
                if (creep.pos.isEqualTo(container.pos)) {
                    creep.memory.positioned = true;
                } else {
                    creep.moveTo(container);
                }
            } else if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                return creep.moveTo(source)
            } else {
                creep.memory.positioned = true;
            }


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
        let design = [WORK, MOVE];
        let spent = 150;
        const workSlotsAvailable = Math.floor(budget / 100)

        while(spent + 100 <= budget){
	        design.push(WORK);
	        spent = spent + 100;
	    }

        return design;
    }
}
