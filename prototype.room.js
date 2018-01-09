const architect = require('architect');
let constants = require('constants');

Room.prototype.getRoomRoleMap = (roomLevel) => {
    let roleMap = constants.roleMap;

    if (roomLevel === 1) {
        roleMap['harvester'].count = 3;
        roleMap['builder'].count = 2;
        roleMap['upgrader'].count = 3;
    }

    if (roomLevel === 2) {
        roleMap['harvester'].count = 2;
        roleMap['builder'].count = 2;
        roleMap['upgrader'].count = 3;
        roleMap['miner'].count = 2;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
        roleMap['longLorry'].count = 1;
    }

    if (roomLevel === 3) {
        roleMap['harvester'].count = 2;
        roleMap['builder'].count = 2;
        roleMap['upgrader'].count = 3;
        roleMap['miner'].count = 2;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
    }

    if (roomLevel >= 4) {
        roleMap['harvester'].count = 3;
        roleMap['builder'].count = 2;
        roleMap['upgrader'].count = 3;
        roleMap['miner'].count = 2;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
    }

    return roleMap;
};

Room.prototype.composeScavenge = function() {
    const parent = Game.rooms[this.config.companionRoom];
    if (parent.energyAvailable === parent.energyCapacityAvailable && Game.time % 3 === 0) {
        const spawn = parent.find(FIND_MY_SPAWNS)[0];
        spawn.createScavengers(this);
    }
}

// Caching/memory extensions
// Object.defineProperty(Room.prototype, 'config', {
//     get: function() {
//         if (!this._config) {
//             let config = constants.myRooms[this.name];
//             if (config.type === 'base') {
//                 config.localOrder = this.baseOrder(this.controller.level);
//             }
//
//             this._config = config;
//         }
//         return this._config
//     },
//     enumerable: false,
//     configurable: true
// });

//NEED TO ADD A CACHE REFRESH
Object.defineProperty(Room.prototype, 'containers', {
    get: function() {
        if (!this._containers) {
            if (!this.memory.containerIds) {
                this.memory.containerIds = this.find(FIND_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER
                }).map(cont => cont.id);
            }

            this._containers = this.memory.containerIds.map(id => Game.getObjectById(id))
        }
        return this._containers
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        if (!this._sources) {
            if (!this.memory.sourceIds) {
                this.memory.sourceIds = this.find(FIND_SOURCES)
                                        .map(source => source.id);
            }
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        return this._sources;
    },
    set: function(newValue) {
        this.memory.sources = newValue.map(source => source.id);
        this._sources = newValue;
    },
    enumerable: false,
    configurable: true
});

// Object.defineProperty(Room.prototype, 'sources', {
//     get: function() {
//         if (!this._sources) {
//             if (!this.memory.sourceIds) {
//                 this.memory.sourceIds = this.find(FIND_SOURCES)
//                                         .map(source => source.id);
//             }
//             this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
//         }
//         return this._sources;
//     },
//     set: function(newValue) {
//         this.memory.sources = newValue.map(source => source.id);
//         this._sources = newValue;
//     },
//     enumerable: false,
//     configurable: true
// });
