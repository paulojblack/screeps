//https://www.npmjs.com/package/screeps-profiler
require('prototype.spawn');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
const constants = require('constants');
const architect = require('architect').architectOrchestra;
const profiler = require('screeps-profiler');
profiler.enable();

module.exports.loop = function() {
  profiler.wrap(function() {
      // Handle room coordination
      for (let room in constants.myRooms) {
          if (Game.rooms[room]) {
              roomOrchestra.call(Game.rooms[room])
              // extensionSitePlanner.call(Game.rooms[room]);
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

      console.log('Next tick')
  });
}

/**
 * Starting from position of spawn, traverse out and explore suitable patches of
 * land for placing extensions
 *
 * Start by passing in no argument for a displacement marker, then check to see if
 * original search has failed. If it has, pass in displacement
 * @return {[type]} [description]
 */
var extensionSitePlanner = function(offset_x, offset_y) {
    let room = this;
    let pos, x, y;

    // Offset will not exist if this is the first iteration
    if (!offset_x) {
        pos = room.find(FIND_MY_SPAWNS)[0].pos;
        [x,y] = [pos.x, pos.y];
    } else {
        [x,y] = [offset_x, offset_y]
    }
    // Corners of box, the true bool value is for lookAtArea to return in array form
    let boundingBox= [y - 1, x - 1, y + 1, x + 1, true]

    const terriainDetails = room.lookAtArea(...boundingBox)

    // How many structures? Return if any.
    let structureCount = _.filter(terriainDetails, 'structure').length
    // Desire 9 terrain plots
    let plainCount = _.filter(terriainDetails, {'terrain': 'plain'}).length

    // Return recursively if this fails
    if (structureCount === 0 && plainCount === 9) {
        console.log('Its all ship shape!')
        //Place construction sites
        return 'Great Job'
    }

    // Return recursively if above failed
    console.log('Found', structureCount, 'structures and', plainCount, 'plains. Trying again');

    if (x > y) {
        console.log('Decrementing y');
        return extensionSitePlanner.call(room, x, y-1)
    } else {
        console.log('Decrementing x');
        return extensionSitePlanner.call(room, x-1, y)
    }

}

const roomOrchestra = function() {
    let room = this;

    if (room.config.type === 'base') {
        for (let spawn of room.find(FIND_MY_SPAWNS)) {
            if (Game.time % 1 === 0) {
                architect(spawn);
            }
            spawn.spawnCreepsIfNecessary(spawn);
        }
    }

    if (room.config.type === 'scavenge') {
        room.composeScavenge();
    }
}
