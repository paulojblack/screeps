let roleLorry = require('role.lorry')
module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} creep */
    run: (creep) => {
        // console.log(creep.room.name)
        // console.log("Rally_"+creep)
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working === true) {
            // find closest spawn, extension or tower which is not full
            let targetContainer = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 5, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            })[0];

            if (targetContainer == undefined) {
                roleLorry.run(creep)
            }

            // if we found one
            if (targetContainer != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(targetContainer);
                }
            }
            } else {
                let spawn = creep.room.find(FIND_MY_SPAWNS)[0]

                let sourceContainer = creep.room.find(FIND_SOURCES)[0].pos.findInRange(FIND_STRUCTURES, 8, {
                    filter: s => (s.structureType === STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] >= (s.storeCapacity / 5))
                })[0];

                if (sourceContainer === undefined) {
                    roleLorry.run(creep)
                }

                if (sourceContainer !== undefined) {
                    if (creep.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sourceContainer);
                    }
                }
            }
        }
    };
