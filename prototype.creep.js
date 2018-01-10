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
        console.log('Creep error in role', creep.memory.role, 'creep named', creep);
        console.log('Naughty creep', JSON.stringify(creep))
        console.log(e)
    }
};
