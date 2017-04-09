module.exports = {
    //Game.map.isRoomAvailable(room.name)
    /** @param {Creep} creep **/
    run: function(creep, options) {
	    if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(sources[sourceToMine]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceToMine], {visualizePathStyle: {stroke: '#0dff00'}});
            }
        }
        else {
            var target = Game.spawns['Fatherland'];
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};
