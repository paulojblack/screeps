const architect = require('architect');
let constants = require('constants');

Room.prototype.baseOrder = (roomLevel) => {
    let desiredCreeps = {};
    let listOfRoles;

    if (roomLevel === 1) {
        listOfRoles = ['harvester', 'upgrader', 'builder'];
        for (let role of listOfRoles) {
            desiredCreeps[role] = 1;
        }
        desiredCreeps.harvester = 3;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 2;
    }

    if (roomLevel === 2) {
        listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry', 'wallRepairer'];
        for (let role of listOfRoles) {
            desiredCreeps[role] = 2;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 2;
        desiredCreeps.longLorry = 3;
        desiredCreeps.lorry = 1;
        desiredCreeps.harvester = 1;
        desiredCreeps.repairer = 1;
    }

    if (roomLevel === 3) {
        listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry', 'wallRepairer', 'grunt'];
        for (let role of listOfRoles) {
            desiredCreeps[role] = 2;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.builder = 3;
        desiredCreeps.upgrader = 3;
        desiredCreeps.longLorry = 2;
        desiredCreeps.lorry = 2;
        desiredCreeps.harvester = 1;
        desiredCreeps.grunt = 0;
        desiredCreeps.wallRepairer = 1;
        desiredCreeps.repairer = 1;
    }

    if (roomLevel >= 4) {
        listOfRoles = ['harvester', 'upgrader', 'repairer', 'builder', 'miner', 'lorry', 'longLorry', 'wallRepairer', 'grunt'];
        for (let role of listOfRoles) {
            desiredCreeps[role] = 2;
        }

        desiredCreeps.miner = 2;
        desiredCreeps.builder = 1;
        desiredCreeps.upgrader = 1;
        desiredCreeps.longLorry = 1;
        desiredCreeps.lorry = 1;
        desiredCreeps.harvester = 1;
        desiredCreeps.grunt = 0;
        desiredCreeps.wallRepairer = 1;
        desiredCreeps.repairer = 1;
    }

    return desiredCreeps;
};

Room.prototype.composeScavenge = function() {
    const parent = Game.rooms[this.config.companionRoom];
    if (parent.energyAvailable === parent.energyCapacityAvailable && Game.time % 10 === 0) {
        const spawn = parent.find(FIND_MY_SPAWNS)[0];
        spawn.createScavengers(this);
    }
}

// Caching/memory extensions
Object.defineProperty(Room.prototype, 'config', {
    get: function() {
        if (!this._config) {
            let config = constants.myRooms[this.name];
            if (config.type === 'base') {
                config.localOrder = this.baseOrder(this.controller.level);
            }

            this._config = config;
        }
        return this._config
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
            // If we dont have the value stored locally
        if (!this._sources) {
                // If we dont have the value stored in memory
            if (!this.memory.sourceIds) {
                    // Find the sources and store their id's in memory,
                    // NOT the full objects
                this.memory.sourceIds = this.find(FIND_SOURCES)
                                        .map(source => source.id);
            }
            // Get the source objects from the id's in memory and store them locally
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        // return the locally stored value
        return this._sources;
    },
    set: function(newValue) {
        // when storing in memory you will want to change the setter
        // to set the memory value as well as the local value
        this.memory.sources = newValue.map(source => source.id);
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});
