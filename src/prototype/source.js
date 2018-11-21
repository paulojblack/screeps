const util = require('proto.util.source');

Object.defineProperty(Source.prototype, 'getSlots', {
    get: function() {
        if (this._slotCount === undefined) {
            if (this.memory.slotCount === undefined) {
                let slotCount = 0;
                [this.pos.x - 1, this.pos.x, this.pos.x + 1].forEach(x => {
                    [this.pos.y - 1, this.pos.y, this.pos.y + 1].forEach(y => {
                        if (Game.map.getTerrainAt(x, y, this.pos.roomName) != 'wall')
                        slotCount++;
                    }, this);
                }, this);
                this.memory.slotCount = slotCount;
            }
            this._slotCount = this.memory.slotCount
        }

        return this._slotCount
    }
})

Object.defineProperty(Source.prototype, 'memory', {
    configurable: true,
    get() {
        if (_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if (!_.isObject(Memory.mySourcesMemory)) {
            return undefined;
        }
        return Memory.mySourcesMemory[this.id] = Memory.mySourcesMemory[this.id] || {};
    },
    set(value) {
        if (_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if (!_.isObject(Memory.mySourcesMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.mySourcesMemory[this.id] = value;
    }
});

// For now just using this for miners
const getMinersAssignedToSource = function (source) {
    return source.room.find(FIND_MY_CREEPS, {
        filter: c => c.memory.targetSource === source.id && c.memory.role === 'miner'
    });
};

module.exports = {};
