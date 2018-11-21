const Role = require('command.Role');

module.exports = class Repairer extends Role {
    constructor(creep) {
        super(creep);
        // this.memory = this.creep.memory;
    }

    run() {
        const repairer = this;
        const creep = repairer.creep;

        creep.memory.working = repairer.setWorkingState();

        if (repairer.creep.memory.working == true) {
            if (repairer.deposit.repairStructure() !== 'NO_AVAILABLE_STRUCTURE') {
                return repairer.deposit.repairStructure();
            }

            if (repairer.deposit.constructionSite() !== 'NO_AVAILABLE_STRUCTURE') {
                return repairer.deposit.constructionSite();
            }

            return repairer.deposit.controller();
        }
        if (repairer.extract.closestContainer() !== 'NO_AVAILABLE_SOURCE') {
            return repairer.extract.closestContainer();
        }

        if (repairer.extract.droppedEnergy() !== 'NO_AVAILABLE_SOURCE') {
            return repairer.extract.droppedEnergy();
        }

        return repairer.extract.assignedSource();
    }

    static getDesign(budget, room) {
        const design = [MOVE, CARRY, WORK];
        let spent = 200;

        budget = Math.min(600, budget);

        // Add as many WORK, CARRY and MOVE as we can
        while (spent + 150 <= budget) {
            design[design.length] = MOVE;
            design[design.length] = CARRY;
            design[design.length] = CARRY;
            spent += 150;

            if (spent + 200 > budget) {
                return design;
            }
            design[design.length] = MOVE;
            design[design.length] = CARRY;
            design[design.length] = WORK;
            spent += 200;
        }

        return design;
    }

    static getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }
};
