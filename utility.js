module.exports = {
    placeRoadSites: function(thisRoom) {
        var roomSpawns = thisRoom.find(FIND_MY_SPAWNS)

        roomSpawns.forEach(roomSpawn => {
            var pathArray = thisRoom.findPath(roomSpawn.pos, thisRoom.controller.pos);

            pathArray.forEach(coord => {
                console.log(thisRoom.lookAt(coord.x, coord.y))
            })
        })
    }
}
