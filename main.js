//https://www.npmjs.com/package/screeps-profiler
require('prototype.spawn');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
require('prototype.source');
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
              Game.rooms[room].sources.forEach((source) => {
                  // console.log(source)
                  // console.log('Source stuff')
                  console.log('sourceConfig', JSON.stringify(source.sourceConfig))
                  // console.log(JSON.stringify(source))
                  // console.log(JSON.stringify(source.memory))
              })
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
    let boundingBox= [y - 1, x - 1, y + 1, x + 1]

    const terrainDetails = room.lookAtArea(...boundingBox, true)

    // How many structures? Return if any.
    let structureCount = _.filter(terrainDetails, 'structure').length
    // Desire 9 terrain plots
    let plainCount = _.filter(terrainDetails, {'terrain': 'plain'}).length

    if (structureCount === 0 && plainCount === 9) {
        //Place construction sites
        return room.createExtensionSites.call(room, boundingBox);
    }

    // Return recursively if above failed
    console.log('Found', structureCount, 'structures and', plainCount, 'plains. Trying again');
    console.log('X,Y=', x, y)
    if (x > y) {
        console.log('Decrementing y');
        return extensionSitePlanner.call(room, x-1, y)
    } else {
        console.log('Decrementing x');
        return extensionSitePlanner.call(room, x, y-1)
    }

}

// /**
//  * Receives an array containing two x,y pairs representing opposite (left, right) corners
//  * of a 3x3 box. From these coords, create one extension construction site at each corner and one
//  * in the middle of the box
//  * ALL ARGUMENTS ORDERED X,Y
//  * @param  {[Array]} boundingBox [description]
//  * @return {[type]}             [description]
//  */
// let createExtensionSites = function(boundingBox) {
//     let room = this;
//     const topLeftSite = [boundingBox[0], boundingBox[1]];
//     const constructionSites = {
//         topLeftSite: topLeftSite,
//         lowRightSite: [boundingBox[2], boundingBox[3]],
//         topRightSite: [topLeftSite[0] + 2, topLeftSite[1]],
//         lowLeftSite: [topLeftSite[0], topLeftSite[1] + 2],
//         centerSite: [topLeftSite[0] + 1, topLeftSite[1] + 1]
//     }
//
//     for (site in constructionSites) {
//         // console.log('Creating new extension')
//         // console.log('The name of the site is', site);
//         // console.log('And the pos is ', constructionSites[site])
//     }
//     // room.createConstructionSite(...topLeftSite, STRUCTURE_EXTENSION)
//     // room.createConstructionSite(...lowRightSite, STRUCTURE_EXTENSION)
//     // room.createConstructionSite(...topRightSite, STRUCTURE_EXTENSION)
//     // room.createConstructionSite(...lowLeftSite, STRUCTURE_EXTENSION)
//     // room.createConstructionSite(...centerSite, STRUCTURE_EXTENSION)
// }

const roomOrchestra = function() {
    let room = this;

    for (let spawn of room.find(FIND_MY_SPAWNS)) {
        if (Game.time % 1 === 0) {
            architect(spawn);
        }
        spawn.spawnCreepsIfNecessary(spawn);
    }

    // if (room.config.type === 'scavenge') {
    //     room.composeScavenge();
    // }
}
