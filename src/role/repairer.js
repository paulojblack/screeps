var Role = require('class.role');

module.exports = class RoleRepairer extends Role {
    constructor(creep) {
        super(creep)
        // this.memory = this.creep.memory;
    }

    run() {
        let me = this;
        me.creep.memory.working = me.setWorkingState()

        if (me.creep.memory.working == true) {
            return me.depositEnergy(me.creep, {
                depositTo: 'repair_site'
            })
        } else {
            return me.getEnergy(me.creep, {
                gatherFrom: 'container'
            });
        }
    }

    static getDesign(budget, room){
		var design = [MOVE, CARRY, WORK];
		var spent = 200;

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
