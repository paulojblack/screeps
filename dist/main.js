//https://www.npmjs.com/package/screeps-profiler
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
      for (let room in constants.myRooms) {
          thisRoom = Game.rooms[room];
          if (thisRoom) {

              roomOrchestra.call(thisRoom)
              refreshTimers(thisRoom);
          }
      }

      // Handle creep roles
      for (name in Game.creeps) {
          let creep = Game.creeps[name];
          creep.runRole(creep);
      }

      // Delete dead creeps
      for (let name in Memory.creeps) {
          if (Game.creeps[name] === undefined) {
              delete Memory.creeps[name]
          }
      }

      let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
      for (let tower of towers) {
          tower.defend(tower);
      }


  });
}

let cacheRefresh = function() {

    if (Game.time % 2 === 0) {
        //Construction sites
        for(let room in constants.myRooms) {
            let roomObject = Game.rooms[room]
            if (roomObject) {
                roomObject.constructionSites = 'REFRESH'

                // Sources
                for (let source in roomObject.sources) {
                    // roomObject.sources[source].config = 'REFRESH'
                    roomObject.sources[source].config = {

                    }
                    console.log(JSON.stringify(roomObject.sources[source].config))

                }
            }
        }

    }
}


const roomOrchestra = function() {
    let room = this;

    for (let spawn of room.find(FIND_MY_SPAWNS)) {
        if (Game.time % 1 === 0) {
            architect(spawn);
        }
        spawn.spawnCreepsIfNecessary(spawn);
    }

}
