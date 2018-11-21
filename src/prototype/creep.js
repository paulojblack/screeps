Creep.prototype.refuel = function() {
    // If empty, refuel
    if (this.carry.RESOURCE_ENERGY <= 0) {
        this.memory.refuel = true;
    }

    // Arbitrary selection of 0.75. Could be open to optimization.
    if (this.carry.RESOURCE_ENERGY >= this.carryCapacity * 0.75) {
        this.memory.refuel = true;
    }

    if (!this.memory.refuel) {
        this.memory.refuel = true;
    }

    let storage = false;

    if (this.room.storage) {
        //handle when storage exists
    }

    const resources = this.room.find(FIND_DROPPED_RESOURCES, {
        filter: function(resource) {
            if (resource.resourceType !== RESOURCE_ENERGY || resource.amount < carryCap) {
                return false
            }

            // Is resource on top of container?
            const structures = resource.pos.lookFor(LOOK_STRUCTURES)
            for (let structure of structures) {
                if (structure.structureType === STRUCTURE_CONTAINER) {
                    return true
                }
            }

            // Is the resource near the room storage?
            if (resource.room.storage && resource.room.storage.pos.getRangeTo(resource) <= 2) {
                return true
            }

            // Is the resource on top of the suicide booth?
            const suicideBooth = resource.room.getSuicideBooth()
            if (suicideBooth && resource.pos.getRangeTo(suicideBooth) === 0) {
                return true
            }

            return false
        }
    })

    if (resources.length > 0) {
        const resource = this.pos.findClosestByRange(resources)
        if (!this.pos.isNearTo(resource)) {
            this.travelTo(resource)
        }
        if (this.pos.isNearTo(resource)) {
            this.pickup(resource)
        }
        return true
    }

    // If there is no storage check for containers.
    const containers = _.filter(this.room.structures[STRUCTURE_CONTAINER], (a) => a.store[RESOURCE_ENERGY] > Math.min(a.storeCapacity, carryCap))
    if (containers.length > 0) {
        const container = this.pos.findClosestByRange(containers)
        if (!this.pos.isNearTo(container)) {
            this.travelTo(container)
        }
        if (this.pos.isNearTo(container)) {
            this.withdraw(container, RESOURCE_ENERGY)
        }
        return true
    }

    // Harvest from source
    if (this.getActiveBodyparts(WORK) <= 0) {
        // Still returning true because the creep still does need to recharge.
        return true
    }
    const sources = this.room.find(FIND_SOURCES_ACTIVE)
    if (sources.length <= 0) {
        // Still returning true since energy is still needed
        return true
    }

    sources.sort((a, b) => a.pos.getRangeTo(a.room.controller) - b.pos.getRangeTo(b.room.controller))
    const idx = parseInt(this.name[this.name.length - 1], 36)
    const source = sources[idx % sources.length]

    if (!this.pos.isNearTo(source)) {
        this.travelTo(source)
    }

    if (this.pos.isNearTo(source)) {
        this.harvest(source)
    }

    return true
};
