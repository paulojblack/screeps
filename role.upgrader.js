module.exports = {
    run: function(creep, options) {

        if(creep.carry[RESOURCE_ENERGY] === 0) {
            creep.memory.ugprading = false
        }

        if(creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {
            creep.memory.upgrading = true
        }

        if(creep.memory.upgrading === false) {
            options.chooseEnergySource(creep)
        } else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#2400ff'}});
            }
        }
        creep.say('upgrade');
	}
};
