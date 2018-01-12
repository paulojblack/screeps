let caches = require('util.caches');
let util = require('proto.util.spawn');
const constants = require('util.constants')

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
    if (room.energyAvailable >= 300) {
        for (let role in roleMap) {
            if (existingCreeps[role] >= desiredCreeps[role]) {
                continue
            }
            return spawn.composeCreeps.call(spawn, roleMap, existingCreeps, role)

        }
    }
};

StructureSpawn.prototype.composeCreeps = function(roleMap, existingCreeps, role) {
    let spawn = this;
    let room = spawn.room;

        let buildSchema = roleMap[role];
        // Go to next iteration if number of workers is satisfied


        let tempBody = [];
        let literalCost = 0;
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
            }
        }

        // Start by adding literals
        for (literal in buildSchema.partsLiteral) {
            for (let i = 0; i < buildSchema.partsLiteral[literal]; i++) {
                tempBody.push(literal)
                // This will just increment the cost of a WORK part to the literalCost
                //which can then be subtracted from the remaining energy to use.
                //TODO map this to the actual cost of the body part
                literalCost += constants.partCosts[literal];
            }
        }

        // Subtract expense of literal parts and get remaining number of parts
        let remainingParts = Math.floor((room.energyAvailable - literalCost) / 50)

        for (ratio in buildSchema.partsRatio) {
            // The number of remaining parts (after literal), multiplied by the fraction of parts
            // allocated for this part type.
            // Use floor to make sure we don't err above remaining energy
            let partCount = Math.floor(remainingParts * buildSchema.partsRatio[ratio])

            for (let i = 0; i < partCount; i++) {
                tempBody.push(ratio)
            }
        }

        spawn.createCreep(tempBody.map(getBodyConstant), undefined, memory);
        caches.refreshSourceConfig(spawn.room);
}

var getBodyConstant = function(value) {
    switch (value) {
        case 'WORK':
            return WORK
        case 'MOVE':
            return MOVE
        case 'CARRY':
            return CARRY
        case 'ATTACK':
            return ATTACK
        case 'RANGED_ATTACK':
            return RANGED_ATTACK
        case 'HEAL':
            return HEAL
        case 'CLAIM':
            return CLAIM
        case 'TOUGH':
            return TOUGH
    }

}

let getAssignedSource = function(room) {

    return _.find(room.sources, function(source) {
        return source.config.needsCreeps === true
    });
}

module.exports = {}
