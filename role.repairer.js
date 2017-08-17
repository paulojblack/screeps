var roleBuilder = require('role.builder');

module.exports = {
    run: function() {
        if (this.memory.target !== undefined && this.room.name !== this.memory.target                    ) {
            let exit = this.room.findExitTo(Game.rooms[this.memory.target]);
            this.moveTo(this.pos.findClosestByRange(exit));

            return
        }

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
