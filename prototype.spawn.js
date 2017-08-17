StructureSpawn.prototype.spawnCreepsIfNecessary = function() {
    let room = this.room;
    let existingCreeps = {};
    const creepsInRoom = room.find(FIND_MY_CREEPS);

    // console.log(test.length)
    // console.log(JSON.stringify(test))
    // for (c of test) {
    //     console.log(c.memory.role)
    // }
    const maxEnergy = room.energyCapacityAvailable;

    for (let role in room.config.localOrder) {
        existingCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role === role);
    }
    console.log(JSON.stringify(existingCreeps))
    console.log(JSON.stringify(room.config.localOrder))
    //emergency backup
    if (creepsInRoom.length === 0) {
        this.createHarvester();
    }

    if (existingCreeps['harvester'] < room.config.localOrder['harvester']) {
        this.createCustomCreep(maxEnergy, 'harvester')
    } else if (existingCreeps['miner'] < room.config.localOrder['miner']) {
        // check if all sources have miners
        // iterate over all sources
        for (let source of room.sources) {
            if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                // if there is a container next to the source
                if (containers.length > 0) {
                    // spawn a miner
                    this.createCustomCreep(maxEnergy, 'miner',
                    {role: 'miner', working: false, target: this.room.name, sourceId: source.id});
                    break;
                }
            }
        }
    } else if (existingCreeps['lorry'] < room.config.localOrder['lorry']) {
        this.createCustomCreep(maxEnergy, 'lorry')
    } else if (existingCreeps['harvester'] >= room.config.localOrder['harvester']) {
        for (role in room.config.localOrder) {
            if (role !== 'miner' || role !== 'grunt') {
                if (existingCreeps[role] < room.config.localOrder[role]) {
                    this.createCustomCreep(maxEnergy, role, { role: role, working: false, home: room.name, target: room.name});
                }
            }
        }
    }
}
StructureSpawn.prototype.createHarvester = function(id) {
    return this.createCreep([WORK, CARRY, CARRY, MOVE], undefined,
        { role: 'harvester', sourceId: id, working: false });
};
StructureSpawn.prototype.createMiner = function(initialMemory) {
    // Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined,
    //     { role: 'miner', target: 'E12N39', sourceId: '5982fec6b097071b4adc17c2', working: false });
    return this.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined, initialMemory);
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
    if (roleName === 'miner') {
        return this.createMiner(initialMemory)
    }

    // create a balanced body as big as possible with the given energy
    let numberOfParts = Math.floor(energy / 200);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));

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
    // create creep with the created body and the given role
    return this.createCreep(body, undefined, initialMemory);
};

StructureSpawn.prototype.createScavengers = function(childRoom) {
    let existingCreeps = _.mapValues(childRoom.config.localOrder, (role) => 0);
    let localOrder = childRoom.config.localOrder;
    const creepList = _.filter(Game.creeps, function(c) {return c.memory.target === childRoom.name});

    for (creep of creepList) {
        existingCreeps[creep.memory.role] = _.sum(creepList, (c) => c.memory.role === creep.memory.role)
    }
    // only add builders if needed
    if (childRoom.find(FIND_CONSTRUCTION_SITES).length) {
        localOrder.builder = 1;
    }
    for (role in localOrder) {
        if (Game.time % 10 === 0) {
            console.log('In', childRoom, 'for', role, 'exist',existingCreeps[role], 'desire', localOrder[role]);
        }
        if (existingCreeps[role] < localOrder[role]) {
            console.log('Attempting to spawn scavenger')
            this.createCustomCreep(this.room.energyCapacityAvailable, role,
                {role: role, working: false, home: this.room.name, target: childRoom.name}
            );
    }
    }
};
