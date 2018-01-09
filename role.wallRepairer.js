var roleBuilder = require('role.builder');

module.exports = {
    /** @param {Creep} this */
    run: function() {
        this.memory.working = false
        if (this.memory.working == true && this.carry.energy == 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy == this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working == true) {
            var walls = this.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
            });

            var target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                if (target != undefined) {
                    break;
                }
            }

            if (target !== undefined) {
                if (this.repair(target) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else {
                roleBuilder.run.call(this);
            }
        }
        else {
            this.getEnergy(true, true);
        }
    }
};
