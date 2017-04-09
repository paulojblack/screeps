module.exports = {
    /*
    Parent spawn -> Container1 -> ... -> Final Container
    Each transport has one parent node and one child node
    For N nodes we need N-1 suppliers
    If the parent node of the transport is empty it will move to the next up the chain
    If the child node of the transport is full it will wait until there is space to deposit

    Possible extension - check for duration of waiting period of full container, after which transport will expend
    resources on nearby repairs before resuming work.

    Check for container energy level before executing movement.

    //Creep 0: Spawn->C0
    //Creep 1: C0->C1
    //Creep 2: C1->C2
    //Creep 3: C2->C3
    //Creep 4: C3->C4
     */

    run: function(suppliers) {
        suppliers.forEach((supplier, index) => {
            var creep = Game.creeps[supplier.name],
                containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER)
                    }
                }),
                source,
                target;

            //two transports working the spawn
            if (index <= 1) {
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) && structure.energy === structure.energyCapacity
                    }
                });
                target = containers[0];
            } else {
                // Subtract to account for zero and first creep Spwn->C0
                source = containers[index - 2];
                target = containers[index - 1]
            }

            if(creep.carry[RESOURCE_ENERGY] === 0) {
                    creep.memory.loaded = false
                }
            if(creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {
                 creep.memory.loaded = true
            }

            if (creep.memory.loaded === true) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            creep.say('supply')
        })
    }
}
