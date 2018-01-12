var protoSpawn = require('proto.spawn');
var protoRoom = require('proto.room');
var protoCreep = require('proto.creep');
var protoTower = require('proto.tower');
var protoSource = require('proto.source');
const constants = require('util.constants');
const architect = require('util.architect').architectOrchestra;
const profiler = require('screeps-profiler');
const refreshTimers = require('util.caches').refreshTimers
profiler.enable();

module.exports.loop = function() {
  profiler.wrap(function() {

      // Handle room coordination
      for (const room in constants.myRooms) {
          const thisRoom = Game.rooms[room];
          if (thisRoom) {
              for (const spawn of thisRoom.find(FIND_MY_SPAWNS)) {
                  spawn.spawnCreepsIfNecessary(spawn);
              }
              refreshTimers(thisRoom);
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
