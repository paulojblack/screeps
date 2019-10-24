global.Log = require('vendor.log');
global.traveler = require('vendor.traveler');
require('constants');

/* Add "sos library" - https://github.com/ScreepsOS/sos-library */
global.SOS_LIB_PREFIX = 'vendor.'
global.sos_lib = require('vendor.sos_lib')
require('vendor.roomvisual')
require('prototype.controller');
require('prototype.creep');
require('prototype.creep.actions');
require('prototype.creep.movement');
require('prototype.room.cartography');
require('prototype.room.config');
require('prototype.room.construction');
require('prototype.room.economy');
require('prototype.room.intel');
require('prototype.room.landmarks');
require('prototype.room.logistics');
require('prototype.room.meta');
require('prototype.room.movement');
require('prototype.room.spawns');
require('prototype.room.structures');
require('prototype.roomposition');

const TwoodOSKernel = require('twoodos.kernel');
module.exports.loop = function () {
    const k = new TwoodOSKernel()

    k.init();
    for (let r in Game.rooms) {
        const room = Game.rooms[r]

    }
    // Log.info(Memory)
    // Log.debug(Game.rooms)
    // Log.debug(Game.rooms['W7N4'].getLayout('W7N4'))

    k.run();
};
