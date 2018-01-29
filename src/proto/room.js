const architect = require('util.architect');
let constants = require('util.constants');

let getBuilderCount = function(room) {
    sites = room.constructionSites

    if (!sites.length) {
        return 0
    }

    if (sites.length < 5) {
        return 1
    }

    if (sites.length >= 5) {
        return 2
    }

    console.log('Something is wrong with proto.room.getBuilderCount')

}

Object.defineProperty(Room.prototype, 'childRooms', {
    get: function() {
        let room = this;

        if (!room._childRooms) {
            let childRooms = [];
            let flags = Game.flags;

            for (f in flags) {
                let flag = Game.flags[f];
                let [parentRoom, childRoom, action] = flag.name.split(',');
                // console.log(flag.sources)
                if (parentRoom === room.name) {
                    flag.memory.parentRoom = parentRoom;
                    flag.memory.action = action;

                    childRooms.push({
                        childRoom: childRoom,
                        parentRoom: parentRoom,
                        action: action,
                        flagName: flag.name
                    })
                }

            }
            // console.log(JSON.stringify(flags))
            room._childRooms = childRooms
        }
        return room._childRooms
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
            return room._controller_container[0]
        }

        return undefined
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sourceContainers', {
    get: function() {
        let room = this;

        if (!room._sourceContainers) {
            const sources = room.sources;
            let sourceContainers = sources.map(function(source) {
                    return source.pos.findInRange(FIND_STRUCTURES, 3, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER
                    })

            })
        }
        if (room._sourceContainers) {
            return room._sourceContainers
        }

        return undefined
    },
    enumerable: false,
    configurable: true
});

/**
 * Returns ID of spawn container
 * @type {[type]}
 */
Object.defineProperty(Room.prototype, 'spawnContainer', {
    get: function() {
        let room = this;

        if (!room._spawn_container) {
            const spawns = room.find(FIND_MY_SPAWNS)

            if (spawns.length) {
                room._spawn_container = spawns[0].pos.findInRange(FIND_STRUCTURES, 6, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER
                }).map(cont => cont.id);
            }
        }

        if (room._spawn_container) {
            return room._spawn_container[0]
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
            room.memory.constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);

            room._constructionSites = room.memory.constructionSites
        }
        return room._constructionSites;
    },
    enumerable: false,
    configurable: true
});

module.exports = {}
