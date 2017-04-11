module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, options) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }

	    if(creep.memory.repairing) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_WALL ||
                        structure.structureType === STRUCTURE_RAMPART ||
                        structure.structureType === STRUCTURE_TOWER) && structure.hits < structure.hitsMax

                }
            })

            if (target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
        else {
            options.chooseEnergySource(creep);
	    }

        creep.say('def-eng')
	}
};
