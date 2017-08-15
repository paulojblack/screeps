const architect = require('architect');

Room.prototype.sourceInfo = (room, spawn) => {
    const sources = room.find(FIND_SOURCES);
    let sourceMap = {
        total: sources.length,
        sources: {}
    };

    let closestToSpawn;
    let closestPathDistance = 0;

    sources.forEach((source) => {
        pathFromSpawn = spawn.pos.findPathTo(source)
        sourceMap.sources[source.id] = {
            pathFromSpawn: pathFromSpawn,
            energyCap: spawn.energyCapacity
            // workSpaces: architect.checkBoxTiles.call(architect, room, source, 'work')
        }


        if (pathFromSpawn.length > closestPathDistance) {
            closestToSpawn = source.id
            closestPathDistance = pathFromSpawn.length
        }

        if (sourceMap.sources[source.id]['needsWork'] === undefined) {
            sourceMap.sources[source.id].needsWork = true;
        }

        sourceMap.closestToSpawn = closestToSpawn;
    });
    spawn.memory.sourceMap = sourceMap
    //Report
    // room.sourceReport(room, sourceMap);
    return sourceMap
}

Room.prototype.sourceReport = (room, sourceMap) => {
    room.visual.text('Source Report', 1, 1, { align: 'left', color: 'orange' });
    room.visual.text('Count ' + sourceMap.total, 1, 2, { align: 'left', color: 'green' });
    room.visual.text('Info TTL:  ' + (100 - Game.time % 100), 1, 3, { align: 'left', color: 'red' });
}

Room.prototype.determineSocialOrder = (roomLevel) => {
    let desiredCreeps = {}

    if (roomLevel === 1) {
        Memory.listOfRoles = ['harvester', 'upgrader', 'builder'];
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 1;
        }
        desiredCreeps.harvester = 3;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 2;
    }

    if (roomLevel === 2) {
        Memory.listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry', 'wallRepairer'];
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 2;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 2;
        desiredCreeps.longLorry = 3;
        desiredCreeps.lorry = 1;
        desiredCreeps.harvester = 1;
        desiredCreeps.repairer = 1;
    }

    if (roomLevel === 3) {
        Memory.listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry', 'wallRepairer', 'grunt'];
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 2;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 3;
        desiredCreeps.longLorry = 1;
        desiredCreeps.lorry = 2;
        desiredCreeps.harvester = 1;
        desiredCreeps.grunt = 0;
    }
    Memory.desiredCreeps = desiredCreeps;
    return;
}
