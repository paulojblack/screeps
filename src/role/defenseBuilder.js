let Role = require('class.Role');

module.exports = class DefenseBuilder extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {
        try {
            let defenseBuilder = this;
            let creep = defenseBuilder.creep;


            creep.memory.working = defenseBuilder.setWorkingState(creep)

            if (defenseBuilder.creep.memory.working == true) {
                let walls = defenseBuilder.creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => (
                        s.structureType == STRUCTURE_WALL
                        || s.structureType == STRUCTURE_RAMPART
                    )
                });

                let target = undefined;

                for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                    for (let wall of walls) {
                        if (wall.hits / wall.hitsMax < percentage) {
                            target = wall;
                            break;
                        }
                    }

                    if (target != undefined) {
                        break;
                    }
                }

                if (target !== undefined) {
                    if (defenseBuilder.creep.repair(target) == ERR_NOT_IN_RANGE) {
                        defenseBuilder.creep.travelTo(target);
                    }
                }
            } else {
                if (defenseBuilder.extract.roomStorage() !== 'NO_AVAILABLE_SOURCE') {
                    return defenseBuilder.extract.roomStorage()
                }

                return defenseBuilder.extract.assignedSource()
            }
        } catch (e) {
            console.log(e.stack)
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
};
