//https://www.npmjs.com/package/screeps-profiler
require('prototype.spawn');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
const constants = require('constants');
const architect = require('architect').architectOrchestra;
//TODO
// Track units not in room for spawn control
// Clean up redundant code
const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
profiler.enable();
module.exports.loop = function() {
  profiler.wrap(function() {
      for (room in constants.myRooms) {
          if (Game.rooms[room]) {
              roomOrchestra.call(Game.rooms[room])
          }
      }

      for (name in Game.creeps) {
          let creep = Game.creeps[name];
          creep.runRole(creep);
      }

      for (let name in Memory.creeps) {
          if (Game.creeps[name] === undefined) {
              delete Memory.creeps[name]
          }
      }

      let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
      for (let tower of towers) {
          tower.defend(tower);
      }

    //   console.log('Next tick')
  });
}

const roomOrchestra = function() {
    if (this.config.type === 'base') {
        for (let spawn of this.find(FIND_MY_SPAWNS)) {
            if (Game.time % 150 === 0) {
                architect(spawn);
            }
            spawn.spawnCreepsIfNecessary(spawn);
        }
    }
    // console.log(JSON.stringify(this.config))
    if (this.config.type === 'scavenge') {
        this.composeScavenge();
    }
}
