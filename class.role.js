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
    fixWorkingState(creep) {

        if (creep.memory.working === false) {
            console.log('well this working')

        }
        console.log(creep.memory.working)
        if (creep.memory.working === true && creep.carry.energy === 0) {
            console.log('wjay tjhe fuck')
            creep.memory.working = false
        } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            console.log('going to return true now')
            creep.memory.working =  true
        } else if (creep.working.memory === undefined) {
            console.log('returning true from udnef')
            creep.memory.working =  true
        }
        console.log('Didnt return')
    }

    // get workingState() {
    //     return 'value'
    // }
    // 
    // set workingState(value) {
    //     console.log(value)
    //     this.workingState = value
    // }
    /**
     * [setDestination description]
     * @param {[type]} creep [description]
     * @param {...SetDestinationOptions}
     */
    setDestination(creep, opts) {
        if (opts.structureType === 'living') {
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

        let struct = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (
                        s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER
                    ) && s.energy < s.energyCapacity
                });
        console.log('get living tower', struct)
        return struct
    }
}

/**
 * @typedef {Object} SetDestinationOptions
 * @property {string} structureType
 * @property {string} filter
 */
