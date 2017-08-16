//https://www.npmjs.com/package/screeps-profiler
require('prototype.spawn');
require('prototype.room');
require('prototype.creep');
require('prototype.tower');
const architect = require('architect').architectOrchestra;
//TODO
// Track units not in room for spawn control
// Clean up redundant code

module.exports.loop = () => {
    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        if (Game.time % 150 === 0) {
            architect(spawn);
            spawn.room.determineSocialOrder(spawn.room.controller.level)
        }
        spawn.spawnCreepsIfNecessary(spawn);
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
    console.log('Next tick')
};
