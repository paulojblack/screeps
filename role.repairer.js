var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} this */
    run: function() {
        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        // if this is harvesting energy but is full
        else if (this.memory.working === false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working == true) {
            let structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(structure);
                }
            } else {
                roleBuilder.run.call(this);
            }
        }
        else {
            this.getNewEnergy(true, true);
        }
    }
};
