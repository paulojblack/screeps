global.Log = require('util.Log');
global.Traveler = require('util.Traveler');
var protoRoom = require('proto.room');
var protoRoom = require('proto.flag');
var protoTower = require('proto.tower');
var protoSource = require('proto.source');
const FlagCommander = require('Intelligence.FlagCommander');
const profiler = require('screeps-profiler');
const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    defenseBuilder: require('role.defenseBuilder'),
    scout: require('role.scout'),
    claimnant: require('role.claimnant'),
    miner: require('role.miner'),
    grunt: require('role.grunt'),
    lorry: require('role.lorry')
};
profiler.enable();


module.exports.loop = function() {
  profiler.wrap(function() {
      try {
          for (const flagName in Game.flags) {
              let roomType, roomLabel;
              const flagRoomName = Game.flags[flagName].room.name
              [roomType, roomLabel] = flagName.split('_')

              const flagCommander = new FlagCommander(flagName)

              flagCommander.giveOrders()
          }

          // Run creep roles
          for (const name in Game.creeps) {

              try {
                  const creep = Game.creeps[name];
                  const roleSubClass = new roles[creep.memory.role](creep);

                  roleSubClass.run();

              } catch(e) {
                  console.log(e.stack)
              }
          }

          // Delete dead creeps
          for (const name in Memory.creeps) {
              if (Game.creeps[name] === undefined) {
                  delete Memory.creeps[name]
              }
          }

          let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
          for (const tower of towers) {
              tower.defend(tower);
          }
      } catch(e) {
          console.log(e.stack)
      }
  });
}
