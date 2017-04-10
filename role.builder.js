module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, options) {

	    if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 extract');
	    }
	    if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
        // creep.memory.building = true;
	    if(creep.memory.building) {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
            options.chooseEnergySource(creep)
	    }

        creep.say('builder')
	}
};
