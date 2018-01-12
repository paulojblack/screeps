        let util = require('proto.util.source')

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

Object.defineProperty(Source.prototype, 'config', {
    get: function () {
        let source = this;
        delete source.memory.sourceConfig
        if (source._config === undefined) {
            if (source.memory.config === undefined) {
                const terrainDetails = util.getSurroundingPlains(source).map((plot) => {
                    return {
                        x: plot.x,
                        y: plot.y,
                        creep: undefined
                    }
                })

                source.memory.config = Object.assign({},
                    {
                        workSlot: terrainDetails,
                        workSlotTotal: terrainDetails.length
                    },
                    util.checkForContainer(source)
                );
            }

            source._config = source.memory.config;
        }
        return source._config;
    },
    set: function(postedObj) {
        let source = this;
        let minerWorkSlots = 2;
        let updateObj = {
            needsCreeps: false
        }

        let assignedCreeps = getMinersAssignedToSource(source);
        // if (!source.config.workSlotTotal || assignedCreeps <= source.config.workSlotTotal) {
        //     updateObj.needsCreeps = false
        // } else {
        //     updateObj.needsCreeps = true;
        //     updateObj.availableWorkSlots = source.config.workSlotTotal - assignedCreeps;
        // }

        if (assignedCreeps.length < minerWorkSlots) {
            updateObj.needsCreeps = true
            updateObj.availableMinerSlots = minerWorkSlots - assignedCreeps.length;
        } else {
            updateObj.needsCreeps = false;
        }

        if (_.isObject(updateObj)) {

            // console.log(updateObj)
        }

        Object.assign(source.memory.config,
            util.checkForContainer(source),
            updateObj
        );

        source._config = source.memory.config;
    },
    enumerable: false,
    configurable: true
});

//For now just using this for miners
let getMinersAssignedToSource = function(source) {
    return source.room.find(FIND_MY_CREEPS, {
        filter: (c) => c.memory.targetSource === source.id && c.memory.role === 'miner'
    });
}

module.exports = {}
