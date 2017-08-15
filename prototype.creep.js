var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    wallRepairer: require('role.wallRepairer'),
    longDistanceHarvester: require('role.longDistanceHarvester'),
    // claimer: require('role.claimer'),
    miner: require('role.miner'),
    longLorry: require('role.longLorry'),
    lorry: require('role.lorry'),
    grunt: require('military.grunt')
};

Creep.prototype.runRole = (creep) => {
    roles[creep.memory.role].run(creep);
};

Creep.prototype.getEnergy = (creep, useContainer, useSource) => {
    let container;

    if (useContainer) {
        container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
            s.store[RESOURCE_ENERGY] > 500
        });

        if (container != undefined) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }

    if (container == undefined && useSource) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};
