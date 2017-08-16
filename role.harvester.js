
module.exports = {
    run: function() {
        // if creep is bringing energy to a structure but has no energy left
        if (this.memory.working !== false && this.carry.energy === 0) {
            this.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (this.memory.working !== true && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }
        // if creep is supposed to transfer energy to a structure
        if (this.memory.working == true) {
            let structure;
            const containers = this.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] <= 0
            });

            if (containers.length && this.room.energyAvailable / this.room.energyCapacityAvailable >= 0.8) {

                structure = containers[0];
            } else {
                structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_CONTAINER
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });
            }

            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(structure);
                }
            }
        }
        else {
            this.getNewEnergy(true, true);
        }
    }
};
