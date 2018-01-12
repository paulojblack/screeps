var Role = require('class.role');

module.exports = {
    run: function() {
        let repairer = new RoleRepairer(this)

        repairer.memory.working = repairer.setWorkingState()

        if (repairer.memory.working == true) {
            return repairer.depositEnergy(repairer.creep, {
                depositTo: 'repair_site'
            })
        } else {
            return repairer.getEnergy(repairer.creep, {
                gatherFrom: 'container'
            });
        }
    }

};

const RoleRepairer = class RoleRepairer extends Role {
    constructor(creep) {
        super()
        this.creep = creep;
        //TODO remove if CPU prohibits
        this.memory = this.creep.memory;
    }

    static getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }
}
