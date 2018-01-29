const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    defenseBuilder: require('role.defenseBuilder'),
    scout: require('role.scout'),
    miner: require('role.miner'),
    lorry: require('role.lorry')
};

Creep.prototype.runRole = function(creep) {
    try {
        let roleSubClass = new roles[creep.memory.role](creep)

        roleSubClass.run()

    } catch(e) {
        console.log('Creep error in role', creep.memory.role, 'creep named', creep);
        console.log('Naughty creep', JSON.stringify(creep))
        console.log(JSON.stringify(creep.memory))
        console.log(e)
    }
};

module.exports = {}
