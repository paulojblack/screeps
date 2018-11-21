const Role = require('command.Role');

module.exports = class Miner extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        const miner = this;
        const creep = miner.creep;

        const source = Game.getObjectById(creep.memory.boundSource);

        try {
            if (!creep.memory.positioned) {
                return miner.positionMiner(source);
            }
            return miner.extract.harvestEnergyOrApproach(source);
        } catch (e) {
            creep.say('error');
            console.log(e.stack);
            console.log('In room', creep.room.name);
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
                return creep.moveTo(source);
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
        const design = [WORK, MOVE];
        let spent = 150;
        // const workSlotsAvailable = Math.min(Math.floor(budget / 100), 400)

        while (spent + 100 <= Math.min(budget, 550)) {
	        design.push(WORK);
	        spent += 100;
	    }

        return design;
    }
};
