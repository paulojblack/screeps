/**
 * [exports description]
 * It's not the best jargon, but for now structures are either LIVING or LIFELESS
 * Living structures are spawns, extensions and towers (anything that can consume the resource)
 * Lifeless are all else
 * @type {[type]}
 */
module.exports = class Role {
    // constructor() {}

    /**
     * Working is defined as any action involving depositing resources into anything
     * NOT working just means they are withdrawing, or travelling to withdraw resources
     * @param {[type]} creep [description]
     */
    setWorkingState(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            return false
        }

        if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            return true
        }

        // Set working to true just in case something awful happens
        if (creep.memory.working === undefined) {
            creep.memory.working = true
            return
        }
    }
    /**
     * [setDestination description]
     * @param {[type]} creep [description]
     * @param {...SetDestinationOptions} 
     */
    setDestination(creep, opts) {
        if (structureType === 'living') {
            return getClosestLivingTower(creep, opts)
        }

    }
    /**
     * It's not the best jargon, but for now structures are either LIVING or LIFELESS
     * Living structures are spawns, extensions and towers (anything that can consume the resource)
     * Lifeless are all else
     */

    /**
     * [getClosestLivingTower description]
     * @return {[type]} [description]
     */
    getClosestLivingTower(creep, opts) {
        creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
                });

    }
}

/**
 * @typedef {Object} SetDestinationOptions
 * @property {string} structureType
 * @property {string} filter
 */
