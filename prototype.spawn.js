StructureSpawn.prototype.spawnCreepsIfNecessary = (spawn) => {
    let room = spawn.room;
    let existingCreeps = {};
    const creepsInRoom = room.find(FIND_MY_CREEPS);
    const maxEnergy = room.energyCapacityAvailable;

    for (let role of Memory.listOfRoles) {
        existingCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    }

    if (existingCreeps['harvester'] < Memory.desiredCreeps['harvester']) {
        spawn.createCustomCreep(spawn, maxEnergy, 'harvester')
    } else if (existingCreeps['miner'] < Memory.desiredCreeps['miner']) {
        // check if all sources have miners
        let sources = room.find(FIND_SOURCES);
        // iterate over all sources
        for (let source of sources) {
            // if the source has no miner
            if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                // check whether or not the source has a container
                /** @type {Array.StructureContainer} */
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                // if there is a container next to the source
                if (containers.length > 0) {
                    // spawn a miner
                    name = spawn.createMiner(spawn, source.id);
                    break;
                }
            }
        }
    } else if (false) {
        spawn.createLongDistanceHarvester(spawn, 800, 2, spawn.room.name,'E12N39');
    } else if (existingCreeps['harvester'] >= Memory.desiredCreeps['harvester']) {
        Memory.listOfRoles.forEach((role) => {
            if (role !== 'miner' || role !== 'grunt') {
                if (existingCreeps[role] < Memory.desiredCreeps[role]) {
                    spawn.createCustomCreep(spawn, maxEnergy, role);
                }
            }
        });
        //TODO THIS SHIT IS CRAZY
        // spawn.createGrunt(spawn)
    }
}
StructureSpawn.prototype.createMiner = (spawn, id) => {
    return spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined,
        { role: 'miner', sourceId: id, working: false });
};

StructureSpawn.prototype.createGrunt = (spawn, id) => {
    let body = [];

    for (let i = 0; i < 7; i++) {
        body.push(ATTACK);
    }
    for (let i = 0; i < 4; i++) {
        body.push(MOVE);
    }

    return spawn.createCreep(body, undefined,
        { role: 'grunt', home: spawn.room.name });
};

StructureSpawn.prototype.createLongDistanceHarvester = (spawn, energy, numberOfWorkParts, home, target) => {
    // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
    let body = [];
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
    return spawn.createCreep(body, undefined, {
        role: 'longDistanceHarvester',
        home: home,
        target: target,
        working: false
    });
};

StructureSpawn.prototype.createCustomCreep = (spawn, energy, roleName) => {
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
    // create creep with the created body and the given role
    return spawn.createCreep(body, undefined, { role: roleName, working: false });
};
