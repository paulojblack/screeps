require('prototype.spawn');
require('prototype.room');
require('prototype.creep');
const architect = require('architect').architectOrchestra;

Memory.listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry'];
Memory.tbdlistOfRoles = ['harvester', 'lorry', 'claimer', 'upgrader', 'repairer', 'builder', 'wallRepairer'];

module.exports.loop = function() {
    for (let spawnName in Game.spawns) {
        Game.spawns[spawnName].spawnCreepsIfNecessary(Game.spawns[spawnName]);
        architect(Game.spawns[spawnName])
    }


    for (creep in Game.creeps) {
        Game.creeps[creep].runRole(Game.creeps[creep]);
    }

    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name]
        }
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }
    console.log('Next tick')
};
