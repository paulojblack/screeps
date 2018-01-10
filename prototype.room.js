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
        roleMap['builder'].count = 3;
        roleMap['upgrader'].count = 3;
        roleMap['miner'].count = 2;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 2;
        roleMap['longLorry'].count = 0;
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

/**
 * Receives an array containing two x,y pairs representing opposite (left, right) corners
 * of a 3x3 box. From these coords, create one extension construction site at each corner and one
 * in the middle of the box
 * ALL ARGUMENTS ORDERED X,Y
 * @param  {[Array]} boundingBox [description]
 * @return {[type]}             [description]
 */
Room.prototype.createExtensionSites = function(boundingBox) {
    let room = this;
    console.log(JSON.stringify(room))
    const topLeftSite = [boundingBox[0], boundingBox[1]];
    const constructionSites = {
        topLeftSite: topLeftSite,
        lowRightSite: [boundingBox[2], boundingBox[3]],
        topRightSite: [topLeftSite[0] + 2, topLeftSite[1]],
        lowLeftSite: [topLeftSite[0], topLeftSite[1] + 2],
        centerSite: [topLeftSite[0] + 1, topLeftSite[1] + 1]
    }

    for (site in constructionSites) {
        // console.log('Creating new extension')
        // console.log('The name of the site is', site);
        // console.log('And the pos is ', constructionSites[site])
    }
    // room.createConstructionSite(...topLeftSite, STRUCTURE_EXTENSION)
    // room.createConstructionSite(...lowRightSite, STRUCTURE_EXTENSION)
    // room.createConstructionSite(...topRightSite, STRUCTURE_EXTENSION)
    // room.createConstructionSite(...lowLeftSite, STRUCTURE_EXTENSION)
    // room.createConstructionSite(...centerSite, STRUCTURE_EXTENSION)
}



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
