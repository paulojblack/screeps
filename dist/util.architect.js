architectOrchestra = function(spawn) {
    let room = spawn.room;
    let x = room.find(FIND_CONSTRUCTION_SITES)
    console.log(x)
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
    roadPlanner: function(room) {
        console.log('planner')
        for (const spawn of room.find(FIND_MY_SPAWNS)) {
            // if (room.memory.initPaths === undefined) {
                sourcePath(spawn, room);
                controllerPath(spawn, room);
                room.memory.initPaths = true;
            // }
        }
    },
    getNextVacancy: function(room){
        var structs = room.find(FIND_MY_STRUCTURES, {
                filter: function(structure){
                    return structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION;
                }
            });

        if(structs.length == 0){
            return;
        }

        //100 attempts
        for (i = 0; i < 50; i++) {
            var rand = structs[Math.floor(Math.random()*structs.length)];

            var xPlus = Math.floor(Math.random()*2) == 0;
            var yPlus = Math.floor(Math.random()*2) == 0;

            var x = xPlus ? rand.pos.x + 1 : rand.pos.x - 1;
            var y = yPlus ? rand.pos.y + 1 : rand.pos.y - 1;

            var pos = room.getPositionAt(x, y);

            //console.log(pos.lookFor(LOOK_STRUCTURES)+":"+pos.lookFor(LOOK_CONSTRUCTION_SITES) +":"+ pos.lookFor(LOOK_TERRAIN))

            if(pos.lookFor(LOOK_STRUCTURES).length == 0 && pos.lookFor(LOOK_CONSTRUCTION_SITES).length == 0 && pos.lookFor(LOOK_TERRAIN) != "wall" && pos.lookFor(LOOK_CREEPS).length == 0){
                return pos;
            }
        }

        console.log("Failed to find structure placement after 50 attempts at "+room.name);
    },

    runExtensionBuilder: function(room){
        if(!room.memory.currentExtentionSite || room.getPositionAt(room.memory.currentExtentionSite.x, room.memory.currentExtentionSite.y).lookFor(LOOK_CONSTRUCTION_SITES).length == 0){
            var pos = this.getNextVacancy(room);
            if(pos){
                var code = pos.createConstructionSite(STRUCTURE_EXTENSION);
                if(code == 0){
                    console.log("New extention being built at "+pos);
                    room.memory.currentExtentionSite = pos;
                } else {
                    room.memory.currentExtentionSite = null;
                }
            }
        }
    }

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
