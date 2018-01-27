var Role = require('class.Role');

module.exports = class Repairer extends Role {
    constructor(creep) {
        super(creep)
        // this.memory = this.creep.memory;
    }

    run() {
        const repairer = this;
        const creep = repairer.creep;

        creep.memory.working = repairer.setWorkingState()

        if (repairer.creep.memory.working == true) {
            if (repairer.depositToRepairStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return repairer.depositToRepairStructure();
            }

            if (repairer.depositToConstructionSite() !== 'NO_AVAILABLE_STRUCTURE') {
                return repairer.depositToConstructionSite();
            }

            return repairer.depositToController()
        }

        return repairer.getEnergy(creep, {
            gatherFrom: 'container'
        });

    }

    static getDesign(budget, room){
		var design = [MOVE, CARRY, WORK];
		var spent = 200;
        console.log(budget)
		budget = Math.min(600, budget)

		//Add as many WORK, CARRY and MOVE as we can
		while(spent + 150 <= budget){
			design[design.length] = MOVE;
			design[design.length] = CARRY;
			design[design.length] = CARRY;
			spent = spent + 150;

			if(spent + 200 > budget){
				return design;
			}
			design[design.length] = MOVE;
			design[design.length] = CARRY;
			design[design.length] = WORK;
			spent = spent + 200;
		}

		return design;
	}

    static getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }
}
