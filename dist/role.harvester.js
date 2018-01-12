var roleBuilder = require('role.builder');
let Role = require('class.role')

module.exports = class RoleHarvester extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {
        let harvester = this;
        let creep = harvester.creep;

        creep.memory.working = harvester.setWorkingState(creep);
        creep.say('h')
        if (creep.memory.working === true) {
            return harvester.depositEnergy(creep, {
                depositTo: 'living'
            })
        } else {
            return harvester.getEnergy(creep, {
                gatherFrom: 'source'
            });
        }
    }

    static getDesign(budget, room) {
        var design = [MOVE, CARRY, WORK];
	    var spent = 200;

        while(spent + 100 <= budget){
	        design[design.length] = WORK;
	        spent = spent + 100;
	    }

        if(budget == spent + 50){
	        design[design.length] = MOVE;
	        spent = spent + 50;
	    }

        return design;
    }
}
