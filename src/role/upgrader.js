let Role = require('class.role');

module.exports = class RoleUpgrader extends Role {
    constructor(creep) {
        super(creep)
    }

    run() {
        try {
            let upgrader = this;
            let creep = upgrader.creep;

            creep.memory.working = upgrader.setWorkingState(creep)

            if (creep.memory.working === true) {
                return upgrader.depositEnergy(creep, {
                    depositTo: 'controller'
                })
            } else {
                return upgrader.getEnergy(creep, {
                    gatherFrom: 'controller_container'
                });
            }
        } catch(e) {
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
        var design = [MOVE, CARRY, CARRY, WORK];
	    var spent = 250;

	    //Add as many WORK, CARRY and MOVE as we can
	    while(spent + 50 <= budget){
	        design[design.length] = CARRY;
	        spent = spent + 50;

	        if(spent + 50 > budget){
	            return design;
	        }
	        design[design.length] = MOVE;
	        spent = spent + 50;

	        if(spent + 50 > budget){
	            return design;
	        }
	        design[design.length] = CARRY;
	        spent = spent + 50;

	        if(spent + 50 > budget){
	            return design;
	        }
	        design[design.length] = CARRY;
	        spent = spent + 50;

	        if(spent + 50 > budget){
	            return design;
	        }
	        design[design.length] = MOVE;
	        spent = spent + 50;

	        if(spent + 100 > budget){
	            return design;
	        }
	        design[design.length] = WORK;
	        spent = spent + 100;
	    }

	    return design;
    }
}
