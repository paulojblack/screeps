var protoSpawn = require('proto.spawn');
var protoRoom = require('proto.room');
var protoRoom = require('proto.flag');
var protoTower = require('proto.tower');
var protoSource = require('proto.source');
const RoomCommander = require('class.RoomCommander');
const constants = require('util.constants');
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
          for (const roomName in constants.myRooms) {
              const roomCategory = constants.myRooms[roomName]

              const room = Game.rooms[roomName];
              if (room) {
                  console.log(room.controller.my)

                  // console.log(JSON.stringify(room.childRooms))
                  const roomCommander = new RoomCommander(room)
                  roomCommander.processRoom()

              }


          }
          // for (roomName in Game.rooms) {
          //     let room = Game.rooms[roomName];
          //     if (room === undefined) {
          //        continue
          //     }
          //     if(room.controller.my) {
          //
          //     }
          // }
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
