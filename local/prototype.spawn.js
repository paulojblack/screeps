StructureSpawn.prototype.spawnCreepsIfNecessary = (spawn) => {
    let room = spawn.room;
    const creepsInRoom = room.find(FIND_MY_CREEPS);

    let analysis = room.analysis(room);
    let desiredCreeps = room.determineSocialOrder(analysis.contrLevel);
    let existingCreeps = {}
    for (let role of Memory.listOfRoles) {
        existingCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    }
    if (Game.time % 500 === 0) {
        room.sourceInfo(room, spawn);
    }

    if (existingCreeps['harvester'] < desiredCreeps['harvester']) {
        spawn.createHarvester(spawn, spawn.memory.sourceMap.closestToSpawn)
    }
    if (existingCreeps['miner'] < desiredCreeps['miner']) {
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
    }

    if (existingCreeps['harvester'] >= desiredCreeps['harvester']) {
        Memory.listOfRoles.forEach((role) => {
            const maxEnergy = room.energyCapacityAvailable;
            if (role !== 'miner') {
                if (existingCreeps[role] < desiredCreeps[role]) {
                    spawn.createCustomCreep(spawn, maxEnergy, role);
                }
            }
        })
    }
}


StructureSpawn.prototype.createHarvester = (spawn, sourceId) => {
    return spawn.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE], undefined,
        { role: 'harvester', sourceId: sourceId, working: false });
};


StructureSpawn.prototype.createMiner = (spawn, id) => {
    return spawn.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], undefined,
        { role: 'miner', sourceId: id, working: false });

};

// create a new function for StructureSpawn
StructureSpawn.prototype.createCustomCreep = (spawn, energy, roleName) => {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
    var body = [];
    for (let i = 0; i <= numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i <= numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    // create creep with the created body and the given role
    return spawn.createCreep(body, undefined, { role: roleName, working: false });
};
