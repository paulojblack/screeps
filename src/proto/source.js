let util = require('./proto.util.source')

Source.prototype.getSlots = function(){
	var slots = 0;
    slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y+1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x,   this.pos.y+1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y+1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x+1, this.pos.y-1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x,   this.pos.y-1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y-1)[0] == "wall" ? slots : slots + 1;
	slots = this.room.lookForAt(LOOK_TERRAIN, this.pos.x-1, this.pos.y)[0] == "wall" ? slots : slots + 1;

    slots = Math.min(slots, 2);

    //console.log("Slots: "+slots);

	return slots;
};
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

// Object.defineProperty(Source.prototype, 'config', {
//     get: function () {
//         let source = this;
//         delete source.memory.sourceConfig
//         if (source._config === undefined) {
//             if (source.memory.config === undefined) {
//                 const terrainDetails = util.getSurroundingPlains(source).map((plot) => {
//                     return {
//                         x: plot.x,
//                         y: plot.y,
//                         creep: undefined
//                     }
//                 })
//                 console.log('in the getter')
//                 source.memory.config = Object.assign({},
//                     {
//                         workSlot: terrainDetails,
//                         workSlotTotal: terrainDetails.length
//                     },
//                     util.checkForContainer(source)
//                 );
//             }
//
//             source._config = source.memory.config;
//         }
//         return source._config;
//     },
//     set: function(postedObj) {
//         let source = this;
//         let minerWorkSlots = 1;
//         let updateObj = {
//             needsCreeps: false
//         }
//         const terrainDetails = util.getSurroundingWorkableTiles(source).map((plot) => {
//             return {
//                 x: plot.x,
//                 y: plot.y,
//                 creep: undefined
//             }
//         })
//
//         let assignedCreeps = getMinersAssignedToSource(source);
//
//         if (assignedCreeps.length < minerWorkSlots) {
//             updateObj.needsCreeps = true
//             updateObj.availableMinerSlots = minerWorkSlots - assignedCreeps.length;
//         } else {
//             updateObj.needsCreeps = false;
//         }
//
//         console.log('in the setter')
//         Object.assign(source.memory.config,
//             util.checkForContainer(source),
//             updateObj
//         );
//
//         source._config = source.memory.config;
//     },
//     enumerable: false,
//     configurable: true
// });

//For now just using this for miners
let getMinersAssignedToSource = function(source) {
    return source.room.find(FIND_MY_CREEPS, {
        filter: (c) => c.memory.targetSource === source.id && c.memory.role === 'miner'
    });
}

module.exports = {}
