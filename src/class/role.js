let Depositer = require('class.private.Depositer');
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

    }

    harvestEnergyFromAssignedSource() {
        const self = this;
        const source = Game.getObjectById(self.memory.boundSource);

        const droppedEnergy = self.checkDroppedEnergy();

        if (droppedEnergy) {
            if (self.creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                return self.creep.moveTo(droppedEnergy[0].pos);
            }
        }

        if (self.creep.harvest(source) === ERR_NOT_IN_RANGE) {
            return self.creep.moveTo(source);
        }
    }

    withdrawFromClosestContainer() {
        const self = this;

        const energySource = self.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER &&
            s.store[RESOURCE_ENERGY] > 0
        });

        if (!energySource) {
            return 'NO_AVAILABLE_SOURCE'
        }

        return self.withdrawEnergyOrApproach(energySource)
    }

    withdrawFromSourceContainers() {
        const self = this;
    }

    checkDroppedEnergy() {
        let self = this;

        return self.creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: r => r.resourceType === 'energy'
        })
    }

    withdrawEnergyOrApproach(energySource) {
        let self = this
        if (self.creep.withdraw(energySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return self.creep.moveTo(energySource);
        }
    }

    /**
     * [getEnergy description]
     * @param  {[type]} creep [description]
     * @param  {[type]} opts  [description]
     * @return {[type]}       [description]
     */
    getEnergy(creep, opts) {
        let energySource;

        if (opts.gatherFrom === 'controller_container') {
            energySource = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 1
            });
        }

        if (opts.gatherFrom === 'container' || opts.gatherFrom === 'anything') {
            //TODO fix this insanity

            energySource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 0
                && s.id !== creep.room.controllerContainer
                && s.id !== creep.room.spawnContainer
            });
        }

        if (!energySource && opts.gatherFrom === 'storage' || opts.gatherFrom === 'anything') {
            if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >= 500) {
                energySource = creep.room.storage;
            }
        }

        if (energySource) {
            return Role.withdrawEnergyOrApproach(creep, energySource);
        }

        // Send to a source otherwise
        return Role.harvestEnergyOrApproach(creep);
    }

    static withdrawEnergyOrApproach(creep, energySource) {
        if (creep.withdraw(energySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(energySource);
        }
    }

    static harvestEnergyOrApproach(creep) {
        let energySource;
        let droppedEnergy = Role.getDroppedEnergy(creep)

        if (droppedEnergy) {
            if (creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                return creep.moveTo(droppedEnergy[0].pos);
            }
        }

        if (creep.memory.binaryID === 'odd') {
            energySource = creep.room.sources[1]
        } else {
            energySource = creep.room.sources[0]
        }

        if (creep.memory.targetSource) {
            energySource = creep.memory.targetSource
        }
        if (creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(energySource);
        }
    }

    harvestEnergyOrApproach(source) {
        let creep = this.creep;

        if (source) {
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                return creep.moveTo(source);
            }
        } else {
            console.log('A', creep.memory.role, 'has no target source')
        }
    }

    static getDroppedEnergy(creep) {
        return creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: r => r.resourceType === 'energy'
        })
    }
    /** END GET ENERGY METHODS **/
    /** BEGIN DEPOSIT ENERGY METHODS **/

    depositToLivingStructure() {
        const creep = this.creep;
        const structure = Role.getClosestUnfilledLivingStructure(creep);

        if (!structure) {
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (structure && creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(structure);
        }
    }

    depositToConstructionSite() {
        const creep = this.creep;
        const constructionSite= Role.getClosestConstructionSite(creep);

        if (!constructionSite) {
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (constructionSite !== undefined && creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(constructionSite);
        }

    }

    depositToRepairStructure() {
        const creep = this.creep;
        const repairSite = Role.getClosestDamagedStructure(creep);

        if (!repairSite){
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (creep.repair(repairSite) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(repairSite);
        }

    }

    depositToControllerContainer() {
        const creep = this.creep;
        const controllerContainer = Game.getObjectById(creep.room.controllerContainer)

        if (!controllerContainer) {
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (controllerContainer.store[RESOURCE_ENERGY] < controllerContainer.storeCapacity) {

            if (creep.transfer(controllerContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(controllerContainer);
            }
        }

    }

    depositToSpawnContainer() {
        const creep = this.creep;
        const spawnContainer = Game.getObjectById(creep.room.spawnContainer)

        if (!spawnContainer) {
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (spawnContainer.store[RESOURCE_ENERGY] < spawnContainer.storeCapacity) {

            if (creep.transfer(spawnContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(spawnContainer);
            }
        }
    }

    depositToController() {
        const creep = this.creep;

        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(creep.room.controller);
        }
    }

    /**
     * Working is defined as any action involving depositing resources into anything
     * NOT working just means they are withdrawing, or travelling to withdraw resources
     * @param {[type]} creep [description]
     */
    setWorkingState(creep) {
        //Feature flag while building out inheritance classes
        // console.log('out',JSON.stringify(this.creep.memory))
        if (this.creep) {
            creep = this.creep;
        }

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

    getClosestUnfilledLivingStructure(creep, opts) {

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
    getClosestConstructionSite(creep, opts) {
        return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    }
    static getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }
    getClosestDamagedStructure(creep, opts) {
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
