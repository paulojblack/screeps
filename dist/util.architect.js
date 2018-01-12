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


/**
 * Starting from position of spawn, traverse out and explore suitable patches of
 * land for placing extensions
 *
 * Start by passing in no argument for a displacement marker, then check to see if
 * original search has failed. If it has, pass in displacement
 * @return {[type]} [description]
 */
var extensionSitePlanner = function(offset_x, offset_y) {
    let room = this;
    let pos, x, y;
    // Offset will not exist if this is the first iteration
    if (!offset_x) {
        pos = room.find(FIND_MY_SPAWNS)[0].pos;
        [x,y] = [pos.x, pos.y];
    } else {
        [x,y] = [offset_x, offset_y]
    }
    // Corners of box, the true bool value is for lookAtArea to return in array form
    let boundingBox= [y - 1, x - 1, y + 1, x + 1]

    const terrainDetails = room.lookAtArea(...boundingBox, true)

    // How many structures? Return if any.
    let structureCount = _.filter(terrainDetails, 'structure').length
    // Desire 9 terrain plots
    let plainCount = _.filter(terrainDetails, {'terrain': 'plain'}).length

    if (structureCount === 0 && plainCount === 9) {
        //Place construction sites
        return room.createExtensionSites.call(room, boundingBox);
    }

    // Return recursively if above failed
    console.log('Found', structureCount, 'structures and', plainCount, 'plains. Trying again');
    console.log('X,Y=', x, y)
    if (x > y) {
        console.log('Decrementing y');
        return extensionSitePlanner.call(room, x-1, y)
    } else {
        console.log('Decrementing x');
        return extensionSitePlanner.call(room, x, y-1)
    }

}
