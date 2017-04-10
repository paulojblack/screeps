var reporter = require('reporter'),
    delegator = require('delegator'),
    birther = require('birther'),
    utility = require('utility'),
    construction = require('meta.construction'),
    supplyChain = require('supply.chain'),
    timers = require('timers');

module.exports.loop = function () {
    //Room info
    Object.keys(Game.rooms).forEach((room) => {
        var thisRoom = Game.rooms[room],
            creepsByRole = {
                harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
                upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
                builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
                repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'),
                suppliers: _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' || creep.memory.role == 'supplier')
            };

        if(Game.time % 10 === 0) {
            timers.ten()
        }

        // supplyChain.run(creepsByRole.suppliers);
        reporter.standardRoom(room, creepsByRole);
        birther.simpleBirthing(creepsByRole);
        delegator.standardDelegate(thisRoom);
    })

    console.log('Tick is healthy, time: ' + Game.time);
}
