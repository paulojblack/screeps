global.Log = require('vendor.log');
global.traveler = require('vendor.traveler');
global.cli = require('twoodos.cli.wrapper')
require('constants');
// require('prototype.creep');
// require('prototype.flag');
// require('prototype.room');
// require('prototype.room.control');
// require('prototype.room.control');
// require('prototype.room.structures');
// require('prototype.source');
// require('prototype.tower');
// const FlagCommander = require('plan.FlagCommander');
// const profiler = require('screeps-profiler');
//
// const roles = {
//     harvester: require('role.harvester'),
//     upgrader: require('role.upgrader'),
//     builder: require('role.builder'),
//     repairer: require('role.repairer'),
//     defenseBuilder: require('role.defenseBuilder'),
//     scout: require('role.scout'),
//     claimnant: require('role.claimnant'),
//     miner: require('role.miner'),
//     grunt: require('role.grunt'),
//     lorry: require('role.lorry')
// };
// profiler.enable();

const TwoodOSKernel = require('twoodos.kernel');
module.exports.loop = function () {
    const kernel = new TwoodOSKernel()

    Log.warn('init kernel')
    // RawMemory.set(JSON.stringify({}))
    Log.info(Memory)
    // kernel.init();
    // profiler.wrap(() => {
    //     try {
    //         Log.info(Game.time);
    //         for (const flagName in Game.flags) {
    //             let roomType; let
    //                 roomLabel;
    //             const flagRoomName = Game.flags[flagName].room.name
    //                 [roomType, roomLabel] = flagName.split('_');
    //
    //             const flagCommander = new FlagCommander(flagName);
    //
    //             flagCommander.giveOrders();
    //         }
    //
    //         // Run creep roles
    //         for (const name in Game.creeps) {
    //             try {
    //                 const creep = Game.creeps[name];
    //                 const roleSubClass = new roles[creep.memory.role](creep);
    //
    //                 roleSubClass.run();
    //             } catch (e) {
    //                 console.log(e.stack);
    //             }
    //         }
    //
    //         // Delete dead creeps
    //         for (const name in Memory.creeps) {
    //             if (Game.creeps[name] === undefined) {
    //                 delete Memory.creeps[name];
    //             }
    //         }
    //
    //         const towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    //         for (const tower of towers) {
    //             tower.defend(tower);
    //         }
    //     } catch (e) {
    //         console.log(e.stack);
    //     }
    // });
};
