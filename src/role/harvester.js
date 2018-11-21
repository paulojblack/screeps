const roleBuilder = require('role.builder');
const Role = require('command.Role');

module.exports = class Harvester extends Role {
    constructor(creep) {
        super(creep);
    }

    run() {
        const harvester = this;
        const creep = harvester.creep;

        // move to constructor
        creep.memory.working = harvester.setWorkingState(creep);

        if (creep.memory.working === true) {
            if (harvester.deposit.livingStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return harvester.deposit.livingStructure();
            }

            if (harvester.deposit.controllerContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return harvester.deposit.controllerContainer();
            }

            return harvester.deposit.controller();
        }

        if (harvester.extract.droppedEnergy() !== 'NO_AVAILABLE_SOURCE') {
            return harvester.extract.droppedEnergy();
        }

        if (harvester.extract.assignedSourceContainer() !== 'NO_AVAILABLE_SOURCE') {
            return harvester.extract.assignedSourceContainer();
        }

        return harvester.extract.assignedSource();
    }

    static getDesign(budget, room) {
        const design = [MOVE, CARRY, WORK];
	    let spent = 200;

        while (spent + 200 <= budget) {
	        design.push(MOVE);
	        design.push(CARRY);
	        design.push(WORK);
	        spent += 200;
	    }

        if (spent + 100 <= budget) {
	        design.push(WORK);
	        spent += 100;
	    }

        if (spent + 50 <= budget) {
	        design.push(CARRY);
	        spent += 50;
	    }

        return design;
    }
};
