
StructureSpawn.prototype.spawnCreepsIfNecessary = function() {
    let spawn = this;
    let room = this.room;
    const roleMap = room.config.creepConfig
    let desiredCreeps =  _.mapValues(roleMap, (role) => {return role.count});
    let existingCreeps = _.mapValues(desiredCreeps, (role) => 0);

    const creepList = _.filter(Game.creeps, function(c) {return c.memory.target === room.name});

    for (role in roleMap) {
        existingCreeps[role] = _.sum(creepList, (c) => c.memory.role === role)
    }

    console.log('I have', JSON.stringify(existingCreeps))
    console.log('I want', JSON.stringify(desiredCreeps))
    // 300 is the amount a spawn can hold
    if (room.energyAvailable >= 300) {
        return spawn.composeCreeps.call(spawn, roleMap, existingCreeps)
    }

};

StructureSpawn.prototype.composeCreeps = function(roleMap, existingCreeps) {
    let spawn = this;
    let room = spawn.room;

    for (role in roleMap) {
        let buildSchema = roleMap[role];
        // Go to next iteration if number of workers is satisfied

        if (existingCreeps[role] >= buildSchema.count) {
            continue
        }

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
            memory.sourceId = getMinerSource(room)
        }

        // Start by adding literals
        for (literal in buildSchema.partsLiteral) {
            for (let i = 0; i < buildSchema.partsLiteral[literal]; i++) {
                tempBody.push(literal)
                // This will just increment the cost of a WORK part to the literalCost
                //which can then be subtracted from the remaining energy to use.
                //TODO map this to the actual cost of the body part
                literalCost += 100;
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
        break;
    }
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

var getMinerSource = function(room) {
    let sources = room.sources;
    let targetName = room.name;
    const creepList = _.filter(Game.creeps, function(c) {return c.memory.target === room.name});

    for (let source of sources) {
        if (!_.some(creepList, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
            let containers = source.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            // if there is a container next to the source
            if (containers.length > 0) {
                return source.id
            } else {
                continue;
            }
        } else {
            continue;
        }
    }
}

/**
 * Create lorries to ferry resources back and forth.
 * Assign exactly one WORK part, then split remaining resources in two and assign equally
 * between MOVE and CARRY
 * @param  {[type]} initialMemory [description]
 * @return {[type]}               [description]
 */
StructureSpawn.prototype.createLorry = function(initialMemory) {
    let spawn = this;
    let room = spawn.room
    let body = [WORK];
    const remainingParts = Math.floor((room.energyAvailable - 100) / 50)

    for (let i = 0; i < remainingParts / 2; i++) {
        body.push(CARRY);
    }

    for (let i = 0; i < remainingParts / 2; i++) {
        body.push(MOVE);
    }

    return spawn.createCreep(body, undefined, initialMemory) ;
};



StructureSpawn.prototype.createGrunt = function(initialMemory) {
    let body = [];

    for (let i = 0; i < 4; i++) {
        body.push(TOUGH);
    }

    for (let i = 0; i < 4; i++) {
        body.push(MOVE);
    }

    for (let i = 0; i < 7; i++) {
        body.push(ATTACK);
    }

    for (let i = 0; i < 2; i++) {
        body.push(RANGED_ATTACK);
    }

    return this.createCreep(body, undefined, initialMemory);
};

StructureSpawn.prototype.createLongDistanceHarvester = function(energy, numberOfWorkParts, home, target) {
    // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
    let body = [];
    // let auxiliaryType;

    for (let i = 0; i < numberOfWorkParts; i++) {
        body.push(WORK);
    }
    // 150 = 100 (cost of WORK) + 50 (cost of MOVE)
    energy -= 150 * numberOfWorkParts;

    var numberOfParts = Math.floor(energy / 100);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, Math.floor((50 - numberOfWorkParts * 2) / 2));
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
        body.push(MOVE);
    }

    // create creep with the created body
    return this.createCreep(body, undefined, {
        role: 'longDistanceHarvester',
        home: home,
        target: target,
        working: false
    });
};

StructureSpawn.prototype.createCustomCreep = function(energy, roleName, initialMemory) {
    if (roleName === 'grunt') {
        return this.createGrunt(initialMemory)
    }
    // create a balanced body as big as possible with the given energy
    let numberOfParts = Math.floor(energy / 200);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, 5);

    let body = [];
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE); 
    }

    if (initialMemory === undefined) {
        initialMemory = { role: roleName, working: false, home: this.room.name, target: this.room.name }
    }
    // create creep with the desired body and the given role
    return this.createCreep(body, undefined, initialMemory);
};

StructureSpawn.prototype.createScavengers = function(childRoom) {
    let localOrder = childRoom.config.localOrder;
    let existingCreeps = _.mapValues(localOrder, (role) => 0);
    const creepList = _.filter(Game.creeps, function(c) {return c.memory.target === childRoom.name});

    for (creep of creepList) {
        existingCreeps[creep.memory.role] = _.sum(creepList, (c) => c.memory.role === creep.memory.role)
    }
    // only add builders if needed
    if (childRoom.find(FIND_CONSTRUCTION_SITES).length) {
        localOrder.builder = 1;
    }
    for (role in localOrder) {
        console.log('In', childRoom, 'for', role, 'exist',existingCreeps[role], 'desire', localOrder[role]);
        if (existingCreeps[role] < localOrder[role]) {
            if (role === 'miner') {
                return this.doctrineMiner(creepList, this.room.energyCapacityAvailable, childRoom);
            } else {

            }
            console.log('Attempting to spawn scavenger')
            this.createCustomCreep(this.room.energyCapacityAvailable, role,
                {role: role, working: false, home: this.room.name, target: childRoom.name}
            );
    }
    }
};

module.exports = {}
