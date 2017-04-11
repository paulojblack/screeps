var construction = require('meta.construction'),
    timers = require('timers');

var getNaturalEnergySource = function getNaturalEnergySource(creep) {
    var sources = creep.room.find(FIND_SOURCES),
        sourceToMine = creep.memory.id % 2 === 0 ? 1 : 0;

    var harv = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    sourceToMine = _.findIndex(harv, creep) >= 3 ? 0 : 1
    //redirect if source is dry
    // sourceToMine = 1//sources[sourceToMine].energy === 0 ? 1 : sourceToMine;

    if(creep.harvest(sources[sourceToMine]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[sourceToMine], {visualizePathStyle: {stroke: '#0dff00'}});
    }
}

var metaHarvest = {
    getNaturalEnergySource: getNaturalEnergySource,
    getOptimalEnergySource: function(creep){
        var availableContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                }
        });

        if (availableContainer) {
            if(creep.withdraw(availableContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(availableContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else if(creep.memory.role) {
                var spawns = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) && structure.energy >= 50
                    }
                });

                if(creep.withdraw(spawns, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawns, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
        } else if(creep.memory.role !== 'builder') {
            getNaturalEnergySource(creep);
        }
    }
}

module.exports = metaHarvest
