// let caches = require('util.caches');
let util = require('proto.util.spawn');
const constants = require('util.constants');
const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    defenseBuilder: require('role.defenseBuilder'),
    claimnant: require('role.claimnant'),
    scout: require('role.scout'),
    miner: require('role.miner'),
    lorry: require('role.lorry')
};

StructureSpawn.prototype.spawnHarvester = function(bindSource, target, home, panicFlag) {
    //Two cases, default to home room, then find nearest untapped sources
    let spawn = this;
    let budget = spawn.room.energyCapacityAvailable;
    const memory = {
        role: 'harvester',
        working: false,
        boundSource: bindSource,
        home: home,
        target: target
    };

    if (panicFlag === 1) {
        //Time to panic
        budget = spawn.room.energyAvailable;
    }

    let body = roles.harvester.getDesign(budget, spawn.room)

    return spawn.createCreep(body, undefined, memory)
}

StructureSpawn.prototype.spawnMiner = function(bindSource, target, home, panicFlag) {
    //Two cases, default to home room, then find nearest untapped sources
    let spawn = this;
    let budget = spawn.room.energyCapacityAvailable;
    const memory = {
        role: 'miner',
        working: false,
        boundSource: bindSource,
        home: home,
        target: target
    };

    let body = roles.miner.getDesign(budget, spawn.room)

    return spawn.createCreep(body, undefined, memory)
}

StructureSpawn.prototype.spawnGeneric = function(bindSource, target, home, role) {
    //Two cases, default to home room, then find nearest untapped sources
    let spawn = this;
    let budget = spawn.room.energyCapacityAvailable;
    const memory = {
        role: role,
        working: false,
        boundSource: bindSource,
        home: home,
        target: target
    };

    let body = roles[role].getDesign(budget, spawn.room)

    return spawn.createCreep(body, undefined, memory)
}


module.exports = {}
