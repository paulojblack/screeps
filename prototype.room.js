const architect = require('architect');
let constants = require('constants');

Room.prototype.creepCountByCtrlLevel = (roomLevel) => {
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
        roleMap['harvester'].count = 2;
        roleMap['builder'].count = 2;
        roleMap['upgrader'].count = 3;
        roleMap['miner'].count = 2;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
    }

    return roleMap;
};

/*
This object will collect all the more complex room level specifications that are
not tightly coupled to a room fixture. The items configured here should only be "inferred"
rather than observed.

To be clear, this object will NOT assign information related to the sources in the room (that is done below)
rather it specifies things like how many creeps to create and how they are composed
 */

Object.defineProperty(Room.prototype, 'config', {
    get: function() {
        let room = this;

        if (!room._config) {
            let config = {
                creepConfig: room.creepCountByCtrlLevel(room.controller.level),
                desiredBuildings: constants.constructionPlanner[room.controller.level]
            }


            room._config = config;
        }
        return room._config
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'containers', {
    get: function() {
        let room = this;

        if (!room._containers) {
            room._containers = room.find(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            }).map(cont => cont.id);

        }
        return room._containers
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        let room = this;
        if (!room._sources) {
            if (!room.memory.sourceIds) {
                room.memory.sourceIds = room.find(FIND_SOURCES)
                                        .map(source => source.id);
            }
            room._sources = room.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        return room._sources;
    },
    set: function(newValue) {
        room.memory.sources = newValue.map(source => source.id);
        room._sources = newValue;
    },
    enumerable: false,
    configurable: true
});



/*
Here be the wtf section
 */

 Room.prototype.composeScavenge = function() {
     const parent = Game.rooms[this.config.companionRoom];
     if (parent.energyAvailable === parent.energyCapacityAvailable && Game.time % 3 === 0) {
         const spawn = parent.find(FIND_MY_SPAWNS)[0];
         spawn.createScavengers(this);
     }
 }
