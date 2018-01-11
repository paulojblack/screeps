architectOrchestra = function(spawn) {
    let room = spawn.room;

    if (room.memory.initPaths === undefined) {
        sourcePath(spawn, room);
        controllerPath(spawn, room);
        room.memory.initPaths = true;
    }
}

sourcePath = function(spawn, room) {
    room.sources.forEach((source) => {
        room.findPath(source.pos, spawn.pos).forEach((tile) => {
            room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
        })
    });
};

controllerPath = function(spawn, room) {
    room.findPath(spawn.pos, room.controller.pos).forEach((tile) => {
        room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
    })
};


module.exports = {
    architectOrchestra: architectOrchestra

}
