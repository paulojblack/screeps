module.exports = class Extractor {
    constructor(creep) {
        this.creep = creep;
    }

    assignedSource() {
        const self = this;

        const source = Game.getObjectById(self.creep.memory.boundSource);

        if (self.creep.harvest(source) === ERR_NOT_IN_RANGE) {
            return self.creep.moveTo(source);
        }
    }

    assignedSourceContainer() {
        const self = this;

        const source = Game.getObjectById(self.creep.memory.boundSource);

        const sourceContainer = source.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
        })

        if (!sourceContainer || !sourceContainer.length) {
            return 'NO_AVAILABLE_SOURCE'
        }

        return self.withdrawEnergyOrApproach(sourceContainer[0])
    }

    droppedEnergy() {
        let self = this;
        const droppedEnergy = self.creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: r => r.resourceType === 'energy'
        });

        if (droppedEnergy.length === 0) {
            return 'NO_AVAILABLE_SOURCE'
        }

        if (self.creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
            return self.creep.moveTo(droppedEnergy[0].pos);
        }

    }

    closestContainer() {
        const self = this;
        const closestContainer = self.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => (
                (s.structureType === STRUCTURE_CONTAINER
                || s.structureType === STRUCTURE_STORAGE)
                && s.store[RESOURCE_ENERGY] > 0
        )});

        if (!closestContainer) {
            return 'NO_AVAILABLE_SOURCE'
        }

        return self.withdrawEnergyOrApproach(closestContainer)
    }

    withdrawEnergyOrApproach(energySource) {
        let self = this
        if (self.creep.withdraw(energySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            return self.creep.moveTo(energySource);
        }

        return self.creep.withdraw(energySource, RESOURCE_ENERGY);
    }

}
