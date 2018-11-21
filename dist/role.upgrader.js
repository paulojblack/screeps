const Role = require('command.Role');

module.exports = class Upgrader extends Role {
    constructor(creep) {
        super(creep);
    }

    run() {
        try {
            const upgrader = this;
            const creep = upgrader.creep;
            creep.say('u');

            creep.memory.working = upgrader.setWorkingState(creep);

            if (creep.memory.working === true) {
                return upgrader.deposit.controller();
            }
            if (upgrader.extract.closestContainer() !== 'NO_AVAILABLE_SOURCE') {
                return upgrader.extract.closestContainer();
            }

            return upgrader.extract.assignedSource();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * TODO refactor
     * @param  {[type]} budget [description]
     * @param  {[type]} room   [description]
     * @return {[type]}        [description]
     */
    static getDesign(budget, room) {
        const design = [MOVE, CARRY, CARRY, WORK];
	    let spent = 250;

	    // Add as many WORK, CARRY and MOVE as we can
	    while (spent + 50 <= budget) {
	        design.push(CARRY);
	        spent += 50;

	        if (spent + 50 > budget) {
	            return design;
	        }
	        design.push(MOVE);
	        spent += 50;

	        if (spent + 50 > budget) {
	            return design;
	        }
	        design.push(CARRY);
	        spent += 50;

	        if (spent + 50 > budget) {
	            return design;
	        }
	        design.push(CARRY);
	        spent += 50;

	        if (spent + 50 > budget) {
	            return design;
	        }
	        design.push(MOVE);
	        spent += 50;

	        if (spent + 100 > budget) {
	            return design;
	        }
	        design.push(WORK);
	        spent += 100;
	    }

	    return design;
    }
};
