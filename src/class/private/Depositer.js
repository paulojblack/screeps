// let Role = require('class.Role')
module.exports = class Depositer {
    constructor(creep) {
        this.creep = creep;
    }

    livingStructure() {
        const creep = this.creep;
        const structure = this.getClosestUnfilledLivingStructure(creep);

        if (!structure) {
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (structure && creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(structure);
        }
    }

    constructionSite() {
        const creep = this.creep;
        let constructionSite = this.getClosestConstructionSite(creep);

        if (!constructionSite) {
            constructionSite = this.getFirstChildConstructionSite(creep)
        }

        if (!constructionSite) {
            return 'NO_AVAILABLE_STRUCTURE'
        }


        if (constructionSite !== undefined && creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(constructionSite);
        }

    }

    repairStructure() {
        const creep = this.creep;
        const repairSite = this.getClosestDamagedStructure(creep);

        if (!repairSite){
            return 'NO_AVAILABLE_STRUCTURE'
        }

        if (creep.repair(repairSite) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(repairSite);
        }

    }

    storageStructure() {
        const creep = this.creep;
        let storage = Game.rooms[creep.memory.home].storage

        if (!storage) {
            return 'NO_AVAILABLE_STRUCTURE'
        }
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(storage);
        }


    }

    controllerContainer() {
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

    spawnContainer() {
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

    controller() {
        const creep = this.creep;

        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            return creep.moveTo(creep.room.controller);
        }
    }

    getClosestUnfilledLivingStructure(creep, opts) {
        let structures =  creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (
                        s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                    ) && s.energy < s.energyCapacity
                });

        if (!structures || structures.length === 0) {
            structures = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < 1000
                    });
        }
        return structures;
    }

    getClosestConstructionSite(creep, opts) {
        return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    }

    getFirstChildConstructionSite(creep) {
        let childRooms = creep.room.childRooms;
        if (childRooms && childRooms.length) {

            const childConstructionSites = _.flatten(childRooms.map((child) => {
                const childRoomObject = Game.rooms[child.childRoom];

                if (!childRoomObject) {
                    //no scout present
                    return []
                }
                return childRoomObject.constructionSites;
            }));

            if (childConstructionSites && childConstructionSites.length) {
                return childConstructionSites[0]
            }
            return undefined
        }
        return undefined
    }

    getClosestDamagedStructure(creep, opts) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
    }
}
