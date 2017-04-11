var reporter = require('reporter'),
    delegator = require('delegator'),
    birther = require('birther'),
    construction = require('meta.construction'),
    supplyChain = require('supply.chain'),
    globals = require('globals')
    timers = require('timers');

module.exports.loop = function () {
    Object.keys(Game.rooms).forEach((room) => {
        var thisRoom = Game.rooms[room];

        // if(Game.time % 10 === 0) {
        //     timers.ten()
        // }
        //
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        // supplyChain.run(creepsByRole.suppliers);
        reporter.standardRoom(room, thisRoom);
        birther.simpleBirthing(thisRoom.creepsByRole);
        delegator.standardDelegate(thisRoom);
    })

    console.log('Tick is healthy, time: ' + Game.time);
}
