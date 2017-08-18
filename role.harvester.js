module.exports = {
    run: function() {
        if (this.memory.working !== false && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working !== true && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working == true) {
            let structure = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_CONTAINER
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });

            if (structure != undefined) {
                if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return this.moveTo(structure);
                }
            }
        } else {
            return this.getEnergy(true, true);
        }
    }
}
