let Role = require('class.Role');

module.exports = class Lorry extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        let lorry = this;
        let creep = lorry.creep;

        creep.say('l')
        creep.memory.working = lorry.setWorkingState(creep);

        if (creep.memory.working === true) {
            if (lorry.deposit.livingStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.livingStructure();
            }

            if (lorry.deposit.storageStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.storageStructure()
            }

            if (lorry.deposit.controllerContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.controllerContainer()
            }

            if (lorry.deposit.spawnContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.spawnContainer()
            }

            return creep.say('lazy lorry')

        } else {
            if (lorry.extract.assignedSourceContainer() !== 'NO_AVAILABLE_SOURCE') {
                return lorry.extract.assignedSourceContainer();
            }

            console.log('lorry', lorry, 'has no sources')

        }

    }

    static getDesign(budget, room) {
        let design = [];
        let spent = 0;

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
