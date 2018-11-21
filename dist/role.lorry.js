const Role = require('command.Role');

module.exports = class Lorry extends Role {
    constructor(creep) {
        // That dude is a
        super(creep);
    }

    run() {
        const lorry = this;
        const creep = lorry.creep;

        creep.say('l');
        creep.memory.working = lorry.setWorkingState(creep);

        if (creep.memory.working === true) {
            if (lorry.deposit.livingStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.livingStructure();
            }

            if (lorry.deposit.storageStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.storageStructure();
            }

            if (lorry.deposit.controllerContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.controllerContainer();
            }

            if (lorry.deposit.spawnContainer() !== 'NO_AVAILABLE_STRUCTURE') {
                return lorry.deposit.spawnContainer();
            }

            return creep.say('lazy lorry');
        }
        if (lorry.extract.assignedSourceContainer() !== 'NO_AVAILABLE_SOURCE') {
            return lorry.extract.assignedSourceContainer();
        }

        if (lorry.extract.droppedEnergy() !== 'NO_AVAILABLE_SOURCE') {
            return lorry.extract.droppedEnergy();
        }

        // console.log('lorry', lorry.creep.name, 'has no sources')
        // creep.say('problem')
    }

    static getDesign(budget, room) {
        const design = [];
        let spent = 0;

        budget = Math.min(1200, budget);

        // Add as many CARRY and MOVE as we can
        while (spent + 150 <= budget) {
            design[design.length] = MOVE;
            design[design.length] = CARRY;
            design[design.length] = CARRY;
            spent += 150;
        }

        return design;
    }
};
