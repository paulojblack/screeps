module.exports = {
    run: function() {
        let creep = this;
        creep.say('m')
        let source = Game.getObjectById(creep.memory.targetSource);
        let container;
        // console.log(source)
        try {
            if (!creep.memory.positioned) {
                if (!creep.memory.target || creep.room.name === creep.memory.target) {
                    container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    })[0];

                    if (creep.pos.isNearTo(container.pos)) {
                        creep.memory.positioned = true;
                    } else {
                        creep.moveTo(container);
                    }
                } else {
                    creep.moveTo(source)
                }
            } else {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    return creep.moveTo(source);
                }
            }
        } catch(e) {
            console.log('Miner Error')
            console.log(creep)

            console.log(source)
            console.log(e)
        }
    }
};
