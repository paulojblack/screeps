// var roleBuilder = require('role.builder');
let roleLonglorry = require('role.longLorry');

module.exports = {
    run: function () {
        this.say('l')
        // console.log(this.room.storage.store[RESOURCE_ENERGY])
        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working === true) {
            var structure = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
                });

                if (structure) {
                    if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        return this.moveTo(structure);
                    }
                } else {
                    return roleLonglorry.run.call(this)
                }
            } else {
                let container = this.room.storage;

                if (container.store[RESOURCE_ENERGY] <= 1000) {
                    container = this.pos.findClosestByRange(this.room.containers, {
                        filter: s => s.store[RESOURCE_ENERGY] > 100
                    });
                }
                if (container) {
                    if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        return this.moveTo(container);
                    }
                } else {
                    return roleLonglorry.run.call(this)
                }
            }
        }
    };
