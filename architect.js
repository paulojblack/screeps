architectOrchestra = (spawn) => {
    let room = spawn.room;

    if (room.memory.initPaths === undefined) {
        sourcePath(spawn, room);
        controllerPath(spawn, room);
        room.memory.initPaths = true;
    }
}

sourcePath = (spawn, room) => {
    room.find(FIND_SOURCES).forEach((source) => {
        room.findPath(source.pos, spawn.pos).forEach((tile) => {
            room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
        })
    });
};

controllerPath = (spawn, room) => {
    room.findPath(spawn.pos, room.controller.pos).forEach((tile) => {
        room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
    })
};

/*
storagePath = (room) => {
    let structure = room.find(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_EXTENSION
            || s.structureType == STRUCTURE_CONTAINER
            || s.structureType == STRUCTURE_TOWER)
        });
    console.log('In storpat')

    structure.forEach((struct) => {
        console.log('struct')
        console.log(struct.memory)
        // let workSpaces = checkBoxTiles(room, struct, 'plain')
    })
};

//UTILITIES
checkBoxTiles = (room, entity, tileType, structureType) => {
    let workSpaces = 9;
    const sourceBoundingBox = getBoundingBox(entity.pos, room);

    _.find(_.values(sourceBoundingBox), (tile) => {
        workSpaces -= _.filter(_.flattenDeep(_.values(tile)), {structureType: structureType, terrain: tileType}).length;
    });

    return workSpaces;
};

getBoundingBox = (pos, room, x, y) => {
    if (pos) {
        x = pos.x;
        y = pos.y
    }

    return room.lookAtArea(y-1, x-1, y+1, x+1);
}
*/
module.exports = {
    //checkBoxTiles: checkBoxTiles,
    architectOrchestra: architectOrchestra

}
