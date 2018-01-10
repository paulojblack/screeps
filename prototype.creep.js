const roles = {
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

Creep.prototype.runRole = function(creep) {
    try {
        roles[creep.memory.role].run.call(creep);
    } catch(e) {
        // console.log('Creep error in role', creep.memory.role, 'creep named', creep);
        // console.log('Naughty creep', JSON.stringify(creep))
        // console.log(e)
    }
};

/**
 * [description]
 * @param  {[Boolean]} useContainer [description]
 * @param  {[Boolean]} useSource    [description]
 * @return {[type]}              [description]
 */
Creep.prototype.getEnergy = function(useContainer, useSource) {
    let container;

    if (useContainer) {

        container = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER &&
            s.store[RESOURCE_ENERGY] > 500
        });

        if (!container && this.room.storage) {
            if (this.room.storage.store[RESOURCE_ENERGY] >= 500) {
                container = this.room.storage;
            }
        }

        if (container) {
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return this.moveTo(container);
            }
        }
    }

    if (!container && useSource) {
        let source;

        if (this.memory.binaryID === 'odd') {
            source = this.room.sources[1]
        } else {
            source = this.room.sources[0]
        }

        if (this.harvest(source) === ERR_NOT_IN_RANGE) {
            return this.moveTo(source);
        }
    }
};
