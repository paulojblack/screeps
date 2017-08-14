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
            energyCap: spawn.energyCapacity,
            workSpaces: architect.checkBoxTiles.call(architect, room, source, 'work')
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
    room.sourceReport(room, sourceMap);
    return sourceMap
}

Room.prototype.sourceReport = (room, sourceMap) => {
    room.visual.text('Source Report', 1, 1, { align: 'left', color: 'orange' });
    room.visual.text('Count ' + sourceMap.total, 1, 2, { align: 'left', color: 'green' });
    room.visual.text('Info TTL:  ' + (100 - Game.time % 100), 1, 3, { align: 'left', color: 'red' });
}

//possible work spaces surrounding source
// Room.prototype.getSourceWorkspaces = (room, source) => {
//     const sourceBoundingBox = architect.getBoundingBox(source.pos, room)
//     //3x3 grid surrounding source
//     let workSpaces = 9;
//
//     _.find(_.values(sourceBoundingBox), (tile) => {
//         workSpaces -= _.filter(_.flattenDeep(_.values(tile)), {terrain: 'wall'}).length;
//     });
//
//     return workSpaces;
// }

Room.prototype.analysis = (room) => {
    let roomInfo = {
        contrLevel: room.controller.level,
        eAvail: room.energyAvailable,
        eCap: room.energyCapacityAvailable
    };

    return roomInfo;
    // let socialOrder = room.determineSocialOrder
}

Room.prototype.determineSocialOrder = (roomLevel) => {
    let desiredCreeps = {}

    if (roomLevel === 1) {
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 1;
        }
        desiredCreeps.harvester = 3;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 2;
        desiredCreeps.repairer = 0;
    }

    if (roomLevel === 2) {
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 3;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.upgrader = 5;
        desiredCreeps.longLorry = 1;
        desiredCreeps.harvester = 1;
    }

    if (roomLevel === 3) {
        for (let role of Memory.listOfRoles) {
            desiredCreeps[role] = 4;
        }
        
        desiredCreeps.miner = 2;
        desiredCreeps.upgrader = 5;
        desiredCreeps.longLorry = 1;
        desiredCreeps.harvester = 1;
    }

    return desiredCreeps
}
