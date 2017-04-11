var reporter = require('reporter'),
    delegator = require('delegator'),
    birther = require('birther'),
    construction = require('meta.construction'),
    supplyChain = require('supply.chain'),
    // globals = require('globals')
    timers = require('timers');

module.exports.loop = function () {
    Object.keys(Game.rooms).forEach((room) => {
        var thisRoom = Game.rooms[room],
            creepsByRole = {
                harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
                upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
                builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
                repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'),
                suppliers: _.filter(Game.creeps, (creep) => creep.memory.role == 'supplier'),
                defense_engineers: _.filter(Game.creeps, (creep) => creep.memory.role == 'defense_engineer')
            };

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        // supplyChain.run(creepsByRole.suppliers);
        reporter.standardRoom(room, creepsByRole);
        birther.simpleBirthing(creepsByRole);
        delegator.standardDelegate(thisRoom);
    })

    console.log('Tick is healthy, time: ' + Game.time);
}
