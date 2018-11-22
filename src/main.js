global.Log = require('vendor.log');
global.traveler = require('vendor.traveler');
require('constants');

/* Add "sos library" - https://github.com/ScreepsOS/sos-library */
global.SOS_LIB_PREFIX = 'vendor.'
global.sos_lib = require('vendor.sos_lib')

require('prototype.controller');
require('prototype.creep');
require('prototype.creep.actions');
require('prototype.creep.movement');
require('prototype.room.cartography');
require('prototype.room.config');
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
    Log.warn('init k')
    Log.info(Memory)
    k.init();
    k.run();
    Log.warn('exit kernel')
    Log.info(Memory)

};
