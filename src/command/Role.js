const Depositer = require('plan.private.Depositer');
const Extractor = require('plan.private.Extractor');
/**
 * [exports description]
 * It's not the best jargon, but for now structures are either LIVING or LIFELESS
 * Living structures are spawns, extensions and towers (anything that can consume the resource)
 * Lifeless are all else
 * @type {[type]}
 */
module.exports = class Role {
    constructor(creep) {
        this.creep = creep;
        this.memory = creep.memory;

        this.deposit = new Depositer(creep);
        this.extract = new Extractor(creep);
    }


    /**
     * Working is defined as any action involving depositing resources into anything
     * NOT working just means they are withdrawing, or travelling to withdraw resources
     * @param {[type]} creep [description]
     */
    setWorkingState(creep) {
        // Feature flag while building out inheritance classes
        // console.log('out',JSON.stringify(this.creep.memory))
        if (this.creep) {
            creep = this.creep;
        }

        if (creep.memory.working === true && creep.carry.energy === 0) {
            return false;
        }
        if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            return true;
        }
        if (creep.memory.working === undefined) {
            return true;
        }

        return creep.memory.working;
    }

    /**
     * [setDestination description]
     * @param {[type]} creep [description]
     * @param {...SetDestinationOptions}
     */
    setDestination(creep, opts) {
        if (opts.structureType === 'living') {
            return Role.getClosestUnfilledLivingStructure(creep, opts);
        }
        if (opts.structureType === 'construction_site') {
            return Role.getClosestConstructionSite(creep, opts);
        }
    }

    /**
     * It's not the best jargon, but for now structures are either LIVING or LIFELESS
     * Living structures are spawns, extensions and towers (anything that can consume the resource)
     * Lifeless are all else
     */

    /**
     * [getClosestUnfilledLivingStructure description]
     * @return {[type]} [description]
     */
    // static getClosestUnfilledLivingStructure(creep, opts) {
    //
    //     return creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    //             filter: (s) => (
    //                     s.structureType == STRUCTURE_SPAWN
    //                     || s.structureType == STRUCTURE_EXTENSION
    //                     || s.structureType == STRUCTURE_TOWER
    //                 ) && s.energy < s.energyCapacity
    //             });
    // }
    //
    // getClosestUnfilledLivingStructure(creep, opts) {
    //
    //     return creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    //             filter: (s) => (
    //                     s.structureType == STRUCTURE_SPAWN
    //                     || s.structureType == STRUCTURE_EXTENSION
    //                     || s.structureType == STRUCTURE_TOWER
    //                 ) && s.energy < s.energyCapacity
    //             });
    // }
    //
    // static getClosestConstructionSite(creep, opts) {
    //     return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    // }
    // getClosestConstructionSite(creep, opts) {
    //     return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    // }
    // static getClosestDamagedStructure(creep, opts) {
    //     return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
    //     });
    // }
    // getClosestDamagedStructure(creep, opts) {
    //     return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
    //     });
    // }
    // /**
    //  * Needs work INCOMPLETE
    //  * @param  {[type]} creep [description]
    //  * @param  {[type]} opts  [description]
    //  * @return {[type]}       [description]
    //  */
    // static getClosestDamagedWall(creep, opts) {
    //     return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (s) => s.hits < s.hitsMax &&
    //         (s.structureType === STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
    //     });
    // }
};

/**
 * @typedef {Object} SetDestinationOptions
 * @property {string} structureType
 * @property {string} gatherFrom
 */
