const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    wallRepairer: require('role.wallRepairer'),
    miner: require('role.miner'),
    lorry: require('role.lorry')
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

module.exports = {}