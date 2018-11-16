exports.getSurroundingWorkableTiles = function(source) {
    const boundingBox = [source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1];
    const surroundingTerrain = source.room.lookForAtArea(LOOK_TERRAIN, ...boundingBox, true);
    return _.filter(surroundingTerrain, {'terrain': 'plain'})
}

exports.checkForContainer = function(source) {
    const boundingBox = [source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1];
    const structures = source.room.lookForAtArea(LOOK_STRUCTURES, ...boundingBox, true);
    const containers = _.filter(structures, function(land) {
        return land.structure.structureType === 'container'
    });

    if (containers.length) {
        return {
            hasContainer: true,
            container: containers[0]
        }
    } else {
        return {
            hasContainer: false,
            container: {}
        }
    }
}
