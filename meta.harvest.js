var construction = require('meta.construction'),
    timers = require('timers');

var getNaturalEnergySource = function getNaturalEnergySource(creep) {
    var sources = creep.room.find(FIND_SOURCES),
        sourceToMine = creep.memory.id % 3 === 0 ? 1 : 0;

    sourceToMine = sources[sourceToMine].energy === 0 ? 1 : sourceToMine;

    if(creep.harvest(sources[sourceToMine]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[sourceToMine], {visualizePathStyle: {stroke: '#0dff00'}});
    }
}

var metaHarvest = {
    getNaturalEnergySource: getNaturalEnergySource,
    getOptimalEnergySource: function(creep){
        var availableContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= 200
            }
        });

        if (availableContainer) {
            if(creep.withdraw(availableContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(availableContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // } else if(creep.room.energyAvailable >= 450) {
        //
        //     var spawns = creep.room.find(FIND_MY_SPAWNS);
        //
        //     if(creep.withdraw(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(spawns[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // } else {
        //     getNaturalEnergySource(creep);
	    // }
    }
}

module.exports = metaHarvest
