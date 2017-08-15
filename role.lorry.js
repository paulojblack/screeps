var roleBuilder = require('role.builder');
module.exports = {
    run: (creep) => {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
                });

                if (structure == undefined) {
                    structure = creep.room.storage;
                }

                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                } else {
                    roleBuilder.run(creep)
                }
            } else {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });

                // if (container === undefined) {
                //     container = creep.room.storage;
                // }

                if (container !== undefined && container !== null) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                } else {
                    roleBuilder.run(creep)
                }
            }
        }
    };
