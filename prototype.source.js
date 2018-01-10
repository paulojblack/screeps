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

Object.defineProperty(Source.prototype, 'freeSpaceCount', {
    get: function () {
        if (this._freeSpaceCount == undefined) {
            if (this.memory.freeSpaceCount == undefined) {
                let freeSpaceCount = 0;
                [this.pos.x - 1, this.pos.x, this.pos.x + 1].forEach(x => {
                    [this.pos.y - 1, this.pos.y, this.pos.y + 1].forEach(y => {
                        if (Game.map.getTerrainAt(x, y, this.pos.roomName) != 'wall')
                        freeSpaceCount++;
                    }, this);
                }, this);
                this.memory.freeSpaceCount = freeSpaceCount;
            }
            this._freeSpaceCount = this.memory.freeSpaceCount;
        }
        return this._freeSpaceCount;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Source.prototype, 'hasContainer', {
    get: function () {
        if (this._hasContainer === undefined) {
            if (this.memory.hasContainer === undefined) {
                let hasContainer = {}

                const boundingBox = [this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1]

                const surroundingTerrain = this.room.lookForAtArea(LOOK_TERRAIN, ...boundingBox, true)
                console.log('IN HERE')
                surroundingTerrain.forEach((land) => {
                    console.log(JSON.stringify(land))
                })
                let freeTerrain = _.filter(surroundingTerrain, {'terrain': 'plain'})
                console.log(freeTerrain)
                freeTerrain.forEach((land) => {
                    console.log(JSON.stringify(land))
                })

                this.memory.hasCsontainer = hasContainer;
            }
            this._hasCsontainer = this.memory.hasContainer;
        }
        return this._hasContainer;
    },
    enumerable: false,
    configurable: true
});

let getSurroundingPlains = function(source) {
    const boundingBox = [source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1];
    const surroundingTerrain = source.room.lookForAtArea(LOOK_TERRAIN, ...boundingBox, true);

    return _.filter(surroundingTerrain, {'terrain': 'plain'})

}
