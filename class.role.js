/**
 * [exports description]
 * It's not the best jargon, but for now structures are either LIVING or LIFELESS
 * Living structures are spawns, extensions and towers (anything that can consume the resource)
 * Lifeless are all else
 * @type {[type]}
 */
module.exports = class Role {
    /**
     * [getEnergy description]
     * @param  {[type]} creep [description]
     * @param  {[type]} opts  [description]
     * @return {[type]}       [description]
     */
    getEnergy(creep, opts) {
        let energySource;

        if (opts.gatherFrom === 'container' || opts.gatherFrom === 'anything') {
            energySource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 500
            });
        }

        if (!energySource && opts.gatherFrom === 'storage' || opts.gatherFrom === 'anything') {
            if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >= 500) {
                energySource = creep.room.storage;
            }
        }

        if (energySource) {
            return Role.withdrawEnergy(creep, energySource);
        }

        // Send to a source otherwise
        return Role.harvestEnergy(creep);
    }

    static withdrawEnergy(creep, energySource) {
        if (creep.withdraw(energySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(energySource);
        }
    }

    static harvestEnergy(creep) {
        let energySource;

        if (creep.memory.binaryID === 'odd') {
            energySource = creep.room.sources[1]
        } else {
            energySource = creep.room.sources[0]
        }

        if (creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(energySource);
        }
    }
    /** END GET ENERGY METHODS **/
    /** BEGIN DEPOSIT ENERGY METHODS **/

    /**
     * [depositEnergy description]
     * @param  {[type]} creep [description]
     * @param  {[type]} opts  [description]
     * @return {[type]}       [description]
     */
    depositEnergy(creep, opts) {
        if (opts.depositTo === 'construction') {
            return Role.depositToConstructionSite(creep)
        }

        if (opts.depositTo === 'repair_site') {
            return Role.depositToRepairStructure(creep)
        }

        if (opts.depositTo === 'controller') {
            return Role.depositToController(creep)
        }

        return Role.depositToLivingStructure(creep)
    }

    static depositToLivingStructure(creep) {
        const structure = Role.getClosestUnfilledLivingStructure(creep);

        if (structure) {
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(structure);
            }
        }
    }

    static depositToConstructionSite(creep) {
        const constructionSite= Role.getClosestConstructionSite(creep);

        if (constructionSite !== undefined && creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(constructionSite);
        }
    }

    static depositToController(creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(creep.room.controller);
        }
    }

    static depositToRepairStructure(creep) {
        const repairSite = Role.getClosestDamagedStructure(creep);

        if (repairSite != undefined) {
            if (creep.repair(repairSite) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(repairSite);
            }
        }
    }
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
        if (creep.memory.working === undefined) {
            return true
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
            return Role.getClosestUnfilledLivingStructure(creep, opts)
        }
        if (opts.structureType === 'construction_site') {
            return Role.getClosestConstructionSite(creep, opts)
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
    static getClosestUnfilledLivingStructure(creep, opts) {

        return creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (
                        s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER
                    ) && s.energy < s.energyCapacity
                });
    }

    static getClosestConstructionSite(creep, opts) {
        return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    }

    static getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }

    /**
     * Needs work INCOMPLETE
     * @param  {[type]} creep [description]
     * @param  {[type]} opts  [description]
     * @return {[type]}       [description]
     */
    static getClosestDamagedWall(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax &&
            (s.structureType === STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
        });
    }
}

/**
 * @typedef {Object} SetDestinationOptions
 * @property {string} structureType
 * @property {string} gatherFrom
 */
