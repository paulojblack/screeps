var roleBuilder = require('role.builder');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, options) {

        if(!creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = true;
	    }
	    if(creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.harvesting = false;
	    }

	    if(creep.memory.harvesting === true) {
            options.chooseEnergySource(creep)
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};
