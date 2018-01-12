let caches = require('util.caches');
let util = require('proto.util.spawn');
const constants = require('util.constants');
const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    wallRepairer: require('role.wallRepairer'),
    miner: require('role.miner'),
    lorry: require('role.lorry')
};

StructureSpawn.prototype.spawnCreepsIfNecessary = function() {
    let spawn = this;
    let room = this.room;
    const roleMap = room.config.creepConfig

    let desiredCreeps =  _.mapValues(roleMap, (role) => {return role.count});

    let existingCreeps = _.reduce(Game.creeps, function(acc, creep, key) {
        if (creep.memory.target === room.name) {
            acc[creep.memory.role] += 1
            return acc
        }
    }, _.mapValues(desiredCreeps, (count) => 0));

    console.log('I have', JSON.stringify(existingCreeps))
    console.log('I want', JSON.stringify(desiredCreeps))

    // 300 is the amount a spawn can hold
    for (let role in roleMap) {
        if (existingCreeps[role] >= desiredCreeps[role]) {
            continue
        }
        return spawn.composeCreeps.call(spawn, roleMap, existingCreeps, role)
    }
};

StructureSpawn.prototype.composeCreeps = function(roleMap, existingCreeps, role) {
    let spawn = this;
    let room = spawn.room;
    let body;
    let buildSchema = roleMap[role];
    // Go to next iteration if number of workers is satisfied

    let memory = {
        role: role,
        working: false,
        //TODO change this so we have unique IDs (1,2,3,4) which the creep spawned to replace
        //a dead creep will be assigned.
        binaryID: existingCreeps['harvester'] % 2 === 0 ? 'even' : 'odd',
        home: room.name,
        target: room.name
    }

    if (role === 'miner') {
        if (getAssignedSource(spawn.room)) {
            memory.targetSource = getAssignedSource(spawn.room)['id']
        } else {
            return;
        }
    }

    // Start by adding literals
    if (role === 'harvester') {
        body = roles[role].getDesign(room.energyAvailable, room)
    } else {
        body = roles[role].getDesign(room.energyCapacityAvailable, room)
    }

    spawn.createCreep(body, undefined, memory);
    caches.refreshSourceConfig(spawn.room);
}

let getAssignedSource = function(room) {

    return _.find(room.sources, function(source) {
        return source.config.needsCreeps === true
    });
}

module.exports = {}
