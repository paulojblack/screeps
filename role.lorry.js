var roleBuilder = require('role.builder');
module.exports = {
    run: function () {
        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working === true) {
            var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
                });

                if (structure == undefined) {
                    structure = this.room.storage;
                }

                if (structure != undefined) {
                    if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(structure);
                    }
                } else {
                    roleBuilder.run.call(this)
                }
            } else {
                let container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 700
                });

                // if (container === undefined) {
                //     container = this.room.storage;
                // }

                if (container !== undefined && container !== null) {
                    if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(container);
                    }
                } else {
                    roleBuilder.run.call(this)
                }
            }
        }
    };
