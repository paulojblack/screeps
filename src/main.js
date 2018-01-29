var protoSpawn = require('proto.spawn');
var protoRoom = require('proto.room');
var protoRoom = require('proto.flag');
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
      // let testRoomPos= new RoomPosition(25,25, 'W2N8')
      // console.log(testRoomPos)
      // Handle room coordination
      for (const roomName in constants.myRooms) {
          const roomCategory = constants.myRooms[roomName]
          // console.log(roomCategory)

          const room = Game.rooms[roomName];
          if (room) {
              // console.log(JSON.stringify(room.childRooms))
              const roomCommander = new RoomCommander(room)
              roomCommander.processRoom()

              refreshTimers(room);
          }
      }

      // Run creep roles
      for (name in Game.creeps) {
          const creep = Game.creeps[name];
          creep.runRole(creep);
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
