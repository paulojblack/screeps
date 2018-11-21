const getBuilderCount = function (room) {
    sites = room.constructionSites;

    if (!sites.length) {
        return 0;
    }

    if (sites.length < 5) {
        return 1;
    }

    if (sites.length >= 5) {
        return 2;
    }

    console.log('Something is wrong with proto.room.getBuilderCount');
};

// Object.defineProperty(Room.prototype, 'testsites', {
//     get() {
//         if (!this._testsites) {
//             if (!this.memory.testsites) {
//                 this.memory.testsites = [1,2,3]
//             }
//             room._sources = room.memory.sourceIds.map(id => Game.getObjectById(id));
//         }
//         return room._sources;
//     },
//     set(newValue) {
//         room.memory.sources = newValue.map(source => source.id);
//         room._sources = newValue;
//     },
//     enumerable: false,
//     configurable: true
// });

Object.defineProperty(Room.prototype, 'childRooms', {
    get() {
        const room = this;

        if (!room._childRooms) {
            const childRooms = [];
            const flags = Game.flags;

            for (f in flags) {
                const flag = Game.flags[f];
                const [parentRoom, childRoom, action] = flag.name.split(',');
                // console.log(flag.sources)
                if (parentRoom === room.name) {
                    flag.memory.parentRoom = parentRoom;
                    flag.memory.action = action;

                    childRooms.push({
                        childRoom,
                        parentRoom,
                        action,
                        flagName: flag.name
                    });
                }
            }
            // console.log(JSON.stringify(flags))
            room._childRooms = childRooms;
        }
        return room._childRooms;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'containers', {
    get() {
        const room = this;

        if (!room._containers) {
            room._containers = room.find(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            }).map(cont => cont.id);
        }
        return room._containers;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'demographics', {
    get() {
        const room = this;
        const data = {};

        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            const memory = creep.memory;

            if (!data[memory.role]) {
                data[memory.role] = {
                    count: 1,
                    creeps: [creep]
                };
            } else {
                data[memory.role].count++;
                data[memory.role].creeps.push(creep);
            }
        }

        return data;
    },
    enumerable: false,
    configurable: true
});

/**
 * Returns ID of controller container
 * @type {[type]}
 */
Object.defineProperty(Room.prototype, 'controllerContainer', {
    get() {
        const room = this;

        if (!room._controller_container) {
            room._controller_container = room.controller.pos.findInRange(FIND_STRUCTURES, 6, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            }).map(cont => cont.id);
        }
        if (room._controller_container) {
            return room._controller_container[0];
        }

        return undefined;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sourceContainers', {
    get() {
        const room = this;

        if (!room._sourceContainers) {
            const sources = room.sources;
            const sourceContainers = sources.map(source => source.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            }));
        }
        if (room._sourceContainers) {
            return room._sourceContainers;
        }

        return undefined;
    },
    enumerable: false,
    configurable: true
});

/**
 * Returns ID of spawn container
 * @type {[type]}
 */
Object.defineProperty(Room.prototype, 'spawnContainer', {
    get() {
        const room = this;

        if (!room._spawn_container) {
            const spawns = room.find(FIND_MY_SPAWNS);

            if (spawns.length) {
                room._spawn_container = spawns[0].pos.findInRange(FIND_STRUCTURES, 6, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER
                }).map(cont => cont.id);
            }
        }

        if (room._spawn_container) {
            return room._spawn_container[0];
        }

        return undefined;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'sources', {
    get() {
        const room = this;
        if (!room._sources) {
            if (!room.memory.sourceIds) {
                room.memory.sourceIds = room.find(FIND_SOURCES)
                    .map(source => source.id);
            }
            room._sources = room.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        return room._sources;
    },
    set(newValue) {
        room.memory.sources = newValue.map(source => source.id);
        room._sources = newValue;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'childSources', {
    get() {
        const room = this;

        if (!room._childSources) {
            const childRooms = _.pluck(room.childRooms, 'childRoom');
            let childSources = [];

            if (childRooms) {
                childSources = childSources.concat(_.flatten(childRooms.map((cr) => {
                    if (Game.rooms[cr]) {
                        return Game.rooms[cr].sources;
                    }
                })));
            }
            room._childSources = childSources;
        }
        return room._childSources;
    },
    set(newValue) {
        room.memory.childSources = newValue.map(source => source.id);
        room._childSources = newValue;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Room.prototype, 'constructionSites', {
    get() {
        const room = this;

        if (!room._constructionSites) {
            let constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
            const childRooms = room.childRooms;

            if (childRooms) {
                const childConstructionSites = _.flatten(childRooms.map((child) => {
                    const childRoomObject = Game.rooms[child.childRoom];
                    if (!childRoomObject) {
                        // no scout present
                        return [];
                    }
                    return childRoomObject.constructionSites;
                }));


                constructionSites = constructionSites.concat(childConstructionSites);
            }

            room._constructionSites = constructionSites;
        }
        return room._constructionSites;
    },
    enumerable: false,
    configurable: true
});

module.exports = {};
