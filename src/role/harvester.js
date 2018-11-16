var roleBuilder = require('role.builder');
let Role = require('Execution.Role')

module.exports = class Harvester extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {
        let harvester = this;
        let creep = harvester.creep;

        //move to constructor
        creep.memory.working = harvester.setWorkingState(creep);

        if (creep.memory.working === true) {

            if (harvester.deposit.livingStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return harvester.deposit.livingStructure();
            }

            if (harvester.deposit.controllerContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return harvester.deposit.controllerContainer()
            }

            return harvester.deposit.controller()

        } else {

            if (harvester.extract.droppedEnergy() !== 'NO_AVAILABLE_SOURCE') {
                return harvester.extract.droppedEnergy();
            }

            if (harvester.extract.assignedSourceContainer() !== 'NO_AVAILABLE_SOURCE') {
                return harvester.extract.assignedSourceContainer();
            }

            return harvester.extract.assignedSource()
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
