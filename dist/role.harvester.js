var roleBuilder = require('role.builder');
let Role = require('class.role')

module.exports = class Harvester extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {
        let harvester = this;
        let creep = harvester.creep;

        creep.memory.working = harvester.setWorkingState(creep);

        if (creep.memory.working === true) {
            return harvester.depositEnergy(creep, {
                depositTo: 'living'
            })
        } else {
            return harvester.harvestEnergyFromAssignedSource()
        }
    }

    static getDesign(budget, room) {
        var design = [MOVE, CARRY, WORK];
	    var spent = 200;

        while(spent + 200 <= budget){
	        design.push(MOVE);
	        design.push(CARRY);
	        design.push(WORK);
	        spent = spent + 200;
	    }

        if(spent + 100 <= budget){
	        design.push(WORK)
	        spent = spent + 100;
	    }

        if(spent + 50 <= budget){
	        design.push(CARRY)
	        spent = spent + 50;
	    }

        return design;
    }
}
