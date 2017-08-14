var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    // wallRepairer: require('role.wallRepairer'),
    // longDistanceHarvester: require('role.longDistanceHarvester'),
    // claimer: require('role.claimer'),
    miner: require('role.miner'),
    longLorry: require('role.longLorry'),
    lorry: require('role.lorry')
};

Creep.prototype.runRole = (creep) => {
    // console.log(JSON.stringify(creep.body))
    // console.log(JSON.stringify(creep.memory))
    roles[creep.memory.role].run(creep);
};

Creep.prototype.getEnergy = (creep, useContainer, useSource) => {
    let container;
    // if the Creep should look for containers
    if (useContainer) {
        // find closest container
        container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
            s.store[RESOURCE_ENERGY] > 0
        });
        // if one was found
        if (container != undefined) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
    // if no container was found and the Creep should look for Sources
    if (container == undefined && useSource) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards it
            creep.moveTo(source);
        }
    }
};

Creep.prototype.shouldCreepWork = (creep) => {
    if (creep.memory.working === true && creep.carry.energy === 0) {
        return false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        return true;
    }
}
