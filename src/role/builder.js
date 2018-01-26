let Role = require('class.role')

module.exports = class Builder extends Role {
    constructor(creep) {
        super(creep)
    }

    run () {
        try {
            let builder = this;
            let creep = builder.creep;

            creep.memory.working = builder.setWorkingState(creep);
            creep.say('b')

            if (creep.memory.working == true) {
                return this.depositEnergy(creep, {
                    depositTo: 'construction'
                })
            } else {
                return this.getEnergy(creep, {
                    gatherFrom: 'container'
                });
            }
        } catch(e) {
            console.log('Builder error')
            console.log(e)
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

		var budget = Math.min(1000, budget)

		//Add as many WORK, CARRY and MOVE as we can
        while(spent + 200 <= budget){
            design.push(WORK);
            design.push(CARRY);
	        design.push(MOVE);
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
