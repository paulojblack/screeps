var roleBuilder = require('role.builder');
let Role = require('class.role')
module.exports = {
    run: function() {
        let creep = this;
        let role = new Role();

        creep.memory.working = role.setWorkingState(creep)

        //Do I need to get resources?
        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });

            if (structure !== undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(structure);
                }
            } else {
                return roleBuilder.run.call(creep);
            }
        } else {
            return creep.getEnergy(true, true);
        }
    }
}
