let Role = require('class.role');

module.exports = class Lorry extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        let lorry = this;
        let creep = lorry.creep;

        creep.memory.working = lorry.setWorkingState(creep);

        if (creep.memory.working === true) {
            return lorry.depositEnergy(creep, {
                depositTo: 'living'
            })
        } else {
            return lorry.getEnergy(creep, {
                gatherFrom: 'anything'
            })
        }
    }

    static getDesign(budget, room) {
        var design = [];
        var spent = 0;

        budget = Math.min(1800, budget)

        //Add as many CARRY and MOVE as we can
        while(spent + 150 <= budget){
            design[design.length] = MOVE
            design[design.length] = CARRY
            design[design.length] = CARRY
            spent = spent + 150
        }

        return design
    }

}
