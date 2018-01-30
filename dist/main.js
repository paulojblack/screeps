var protoSpawn = require('proto.spawn');
var protoRoom = require('proto.room');
var protoRoom = require('proto.flag');
// var protoCreep = require('proto.creep');
var protoTower = require('proto.tower');
var protoSource = require('proto.source');
const RoomCommander = require('class.RoomCommander');
const constants = require('util.constants');
const profiler = require('screeps-profiler');
// const refreshTimers = require('util.caches').refreshTimers;
const roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    defenseBuilder: require('role.defenseBuilder'),
    scout: require('role.scout'),
    claimnant: require('role.claimnant'),
    miner: require('role.miner'),
    lorry: require('role.lorry')
};
profiler.enable();

module.exports.loop = function() {
  profiler.wrap(function() {
      for (const roomName in constants.myRooms) {
          const roomCategory = constants.myRooms[roomName]

          const room = Game.rooms[roomName];
          if (room) {
              // console.log(JSON.stringify(room.childRooms))
              const roomCommander = new RoomCommander(room)
              roomCommander.processRoom()

          }
      }

      // Run creep roles
      for (const name in Game.creeps) {
          try {
              const creep = Game.creeps[name];
              const roleSubClass = new roles[creep.memory.role](creep);

              roleSubClass.run();

          } catch(e) {
              console.log('Creep error in role', creep.memory.role, 'creep named', creep);
              console.log('Naughty creep', JSON.stringify(creep))
              console.log(JSON.stringify(creep.memory))
              console.log(e)
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
  });
}
