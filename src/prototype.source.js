/*
TODO
Consolidate the look at area for structures and land into one query
*/

Object.defineProperty(Source.prototype, 'memory', {
    configurable: true,
    get: function() {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            return undefined;
        }
        return Memory.mySourcesMemory[this.id] =
        Memory.mySourcesMemory[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.mySourcesMemory[this.id] = value;
    }
});

Object.defineProperty(Source.prototype, 'sourceConfig', {
    get: function () {
        let source = this;

        if (source._sourceConfig === undefined) {
                const terrainDetails = getSurroundingPlains(source).map((plot) => {
                    return {
                        x: plot.x,
                        y: plot.y
                    }
                })

                source.memory.sourceConfig = Object.assign({},
                    {freeSpaces: terrainDetails},
                    checkForContainer(source)
                );

            source._sourceConfig = source.memory.sourceConfig;
        }
        return source._sourceConfig;
    },
    enumerable: false,
    configurable: true
});

let getSurroundingPlains = function(source) {
    const boundingBox = [source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1];
    const surroundingTerrain = source.room.lookForAtArea(LOOK_TERRAIN, ...boundingBox, true);
    return _.filter(surroundingTerrain, {'terrain': 'plain'})
}

let checkForContainer = function(source) {
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
