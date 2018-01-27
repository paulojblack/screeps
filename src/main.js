var protoSpawn = require('proto.spawn');
var protoRoom = require('proto.room');
var protoCreep = require('proto.creep');
var protoTower = require('proto.tower');
var protoSource = require('proto.source');
const RoomCommander = require('class.RoomCommander');
const constants = require('util.constants');
const architect = require('util.architect');
const profiler = require('screeps-profiler');
const refreshTimers = require('util.caches').refreshTimers
profiler.enable();

module.exports.loop = function() {
  profiler.wrap(function() {

      // Handle room coordination
      for (const roomName in constants.myRooms) {
          const room = Game.rooms[roomName];
          if (room) {
              const roomCommander = new RoomCommander(room)
              roomCommander.processRoom()
              // architect.roadPlanner(room);
              refreshTimers(room);
          }
      }

      // Run creep roles
      for (name in Game.creeps) {
          const creep = Game.creeps[name];
          creep.runRole(creep);
      }

      if((Game.time)%60==0){
          for(let room in Game.rooms){
              architect.runExtensionBuilder(Game.rooms[room]);
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
