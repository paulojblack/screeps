
module.exports = {
    run: (creep) => {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working !== false && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working !== true && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            let structure;
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] <= 0
            });

            if (containers.length && creep.room.energyAvailable / creep.room.energyCapacityAvailable >= 0.8) {

                structure = containers[0];
            } else {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_CONTAINER
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });
            }

            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
        }
        else {
            creep.getEnergy(creep, false, true);
        }
    }
};
