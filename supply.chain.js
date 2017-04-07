module.exports = {
    /*
    Parent spawn -> Container1 -> ... -> Final Container
    Each transport has one parent node and one child node
    For N nodes we need N-1 transporters
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

    run: function(transporters) {
        transporters.forEach((transporter, index) => {
            var creep = Game.creeps[transporter.name],
                containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER)
                    }
                }),
                spawn = Game.spawns['Fatherland'],
                target = containers[index],
                source;

            // if (index === 0) {
            //     source = spawn;
            // } else {
            //     // Subtract one to account for zeroeth creep Spwn->C0
            //     // var containerIndex = containers[index - 1].store[RESOURCE_ENERGY] > 0 ? index - 1 : index - 1;
            //     if (containers[index - 1].store[RESOURCE_ENERGY] > 500) {
            //         // creep.say('adapted')
            //         source = containers[containerIndex];
            //         target = containers[0];
            //     } else {
            //         source = containers[index - 1]
            //     }
            // }
            source = spawn;
            target = containers[0]
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

             creep.say('transport')
        })
    }
}
