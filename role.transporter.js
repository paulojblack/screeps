// module.exports = {
//     run: function(creep) {
//         var targets = creep.room.find(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
//                 }
//             }),
//             sources = creep.room.find(FIND_MY_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType === STRUCTURE_EXTENSION ||
//                             structure.structureType === STRUCTURE_SPAWN) && structure.energy >= (structure.energyCapacity * .50);
//                 }
//             });
//
//         if(creep.carry[RESOURCE_ENERGY] === 0) {
//             creep.say('extract')
//             creep.memory.loaded = false
//         }
//
//         if(creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {
//             creep.memory.loaded = true
//         }
//
//         if (creep.memory.loaded === true) {
//             if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//             }
//         } else {
//             if(creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//         }
//         console.log(creep)
//         creep.say('transport')
//     }
// }
