let roleLorry = require('role.lorry')
module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} this */
    run: function() {

        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        // if this is supposed to transfer energy to a structure
        if (this.memory.working === true) {
            // find closest spawn, extension or tower which is not full
            let targetContainer = this.room.controller.pos.findInRange(FIND_STRUCTURES, 5, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            })[0];

            if (targetContainer == undefined) {
                roleLorry.run.call(this)
            }

            // if we found one
            if (targetContainer != undefined) {
                // try to transfer energy, if it is not in range
                if (this.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(targetContainer);
                }
            }
            } else {
                let spawn = this.room.find(FIND_MY_SPAWNS)[0]

                let sourceContainer = this.room.sources[0].pos.findInRange(FIND_STRUCTURES, 8, {
                    filter: s => (s.structureType === STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] > 600)
                })[0];

                if (sourceContainer === undefined) {
                    roleLorry.run.call(this)
                }

                if (sourceContainer !== undefined) {
                    if (this.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(sourceContainer);
                    }
                }
            }
        }
    };
