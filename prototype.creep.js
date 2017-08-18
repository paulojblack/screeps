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

Creep.prototype.runRole = function() {
    try {
        roles[this.memory.role].run.call(this);
    } catch(e) {
        console.log('Creep coord fuckup');
        console.log(this)
        console.log(this.pos)
        console.log(JSON.stringify(this.memory))
        console.log(e)
    }
};

Creep.prototype.getEnergy = function(useContainer, useSource) {
    let container;

    if (useContainer) {
        container = this.pos.findClosestByRange(this.room.containers, {
            filter: s => s.structureType == STRUCTURE_CONTAINER &&
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
        let source = this.pos.findClosestByRange(this.room.sources);

        if (this.harvest(source) === ERR_NOT_IN_RANGE) {
            return this.moveTo(source);
        }
    }
};
