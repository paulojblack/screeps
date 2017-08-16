StructureSpawn.prototype.spawnCreepsIfNecessary = function() {
    let room = this.room;
    let existingCreeps = {};
    const creepsInRoom = room.find(FIND_MY_CREEPS);
    const maxEnergy = room.energyCapacityAvailable;

    for (let role of Memory.listOfRoles) {
        existingCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    }

    console.log(JSON.stringify(existingCreeps))
    console.log(JSON.stringify(Memory.desiredCreeps))
    // this.createGrunt()
    //emergency backup
    if (creepsInRoom.length === 0) {
        this.createHarvester();
    }
    if (existingCreeps['harvester'] < Memory.desiredCreeps['harvester']) {
        this.createCustomCreep(maxEnergy, 'harvester')
    } else if (existingCreeps['miner'] < Memory.desiredCreeps['miner']) {
        // check if all sources have miners
        // iterate over all sources
        for (let source of room.sources) {
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
                    this.createMiner(source.id);
                    break;
                }
            }
        }
    } else if (existingCreeps['lorry'] < Memory.desiredCreeps['lorry']) {

        this.createCustomCreep(maxEnergy, 'lorry')

    } else if (Game.time % 150 === 0) {
        this.createCustomCreep(maxEnergy, 'longDistanceHarvester', {
            role: 'longDistanceHarvester',
            home: this.room.name,
            target: 'E12N39',
            working: false
        });

    } else if (existingCreeps['harvester'] >= Memory.desiredCreeps['harvester']) {
        Memory.listOfRoles.forEach((role) => {
            if (role !== 'miner' || role !== 'grunt') {
                if (existingCreeps[role] < Memory.desiredCreeps[role]) {
                    this.createCustomCreep(maxEnergy, role);
                }
            }
        });
        //TODO THIS SHIT IS CRAZY
        // this.createGrunt()
    }
}
StructureSpawn.prototype.createHarvester = function(id) {
    return this.createCreep([WORK, CARRY, CARRY, MOVE], undefined,
        { role: 'harvester', sourceId: id, working: false });
};
StructureSpawn.prototype.createMiner = function(id) {
    return this.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], undefined,
        { role: 'miner', sourceId: id, working: false });
};

StructureSpawn.prototype.createGrunt = function(id) {
    let body = [];

    for (let i = 0; i < 7; i++) {
        body.push(ATTACK);
    }
    for (let i = 0; i < 4; i++) {
        body.push(MOVE);
    }

    return this.createCreep(body, undefined,
        { role: 'grunt', home: this.room.name });
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
        initialMemory = { role: roleName, working: false, home: this.room }
    }
    // create creep with the created body and the given role
    return this.createCreep(body, undefined, initialMemory);
};

let constants = {
    foo: 'bar'
}
