const architect = require('architect');
let constants = require('constants');

Room.prototype.creepCountByCtrlLevel = (room) => {
    let roleMap = constants.roleMap;
    let roomLevel = room.controller.level

    if (roomLevel === 1) {
        roleMap['upgrader'].count = 3;
    }

    if (roomLevel === 2) {
        roleMap['upgrader'].count = 3;
        roleMap['repairer'].count = 2;
        roleMap['lorry'].count = 4;
    }

    if (roomLevel === 3) {
        roleMap['upgrader'].count = 3;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
    }

    if (roomLevel >= 4) {
        roleMap['upgrader'].count = 3;
        roleMap['repairer'].count = 1;
        roleMap['lorry'].count = 1;
    }

    // If there are constructionsites, 2, if not, none.
    roleMap['builder'] = room.memory.constructionSites.length ? 2 : 0;
    // Counts the number of sources with containers built
    roleMap['miner'].count = getMinerCount(room);

    return roleMap;
};

var getMinerCount = function(room) {
    return _.filter(room.sources, function(source) {
        return _.get(source, 'sourceConfig.hasContainer') === true
    }).length;
}

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
                creepConfig: room.creepCountByCtrlLevel(room),
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
            // _room._containers
        }
        return room._containers
    },
    enumerable: false,
    configurable: true
});

/**
 * Returns ID of controller container
 * @type {[type]}
 */
Object.defineProperty(Room.prototype, 'controllerContainer', {
    get: function() {
        let room = this;

        if (!room._controller_container) {
            room._controller_container = room.controller.pos.findInRange(FIND_STRUCTURES, 6, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            }).map(cont => cont.id);
        }
        if (room._controller_container) {
            return room._controller_container
        }

        return undefined
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

Object.defineProperty(Room.prototype, 'constructionSites', {
    get: function() {
        let room = this;

        if (!room._constructionSites) {

            if (!room.memory.constructionSites) {
                room.memory.constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
            }
            room._constructionSites = room.memory.constructionSites
        }
        return room._constructionSites;
    },
    set: function(newValue) {

        this.memory.constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES)
        this._constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
    },
    enumerable: false,
    configurable: true
});
