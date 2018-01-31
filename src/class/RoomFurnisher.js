module.exports = class RoomFurnisher {
    constructor(room) {
        this.room = room;
        this.memory = room.memory
    }
    //borrowed code
    getNextVacancy() {
        let self = this;
        let structs = self.room.find(FIND_MY_STRUCTURES, {
                filter: function(structure){
                    return structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION;
                }
            });

        if(structs.length == 0){
            return;
        }

        //100 attempts
        for (let i = 0; i < 50; i++) {
            let rand = structs[Math.floor(Math.random()*structs.length)];

            const xPlus = Math.floor(Math.random()*2) == 0;
            const yPlus = Math.floor(Math.random()*2) == 0;

            const x = xPlus ? rand.pos.x + 1 : rand.pos.x - 1;
            const y = yPlus ? rand.pos.y + 1 : rand.pos.y - 1;

            let pos = self.room.getPositionAt(x, y);
            const occupied = _.filter(pos.lookFor(LOOK_STRUCTURES), function(structure) {
                       return structure.structureType !== 'road'
                });

            if(
                occupied.length === 0 &&
                pos.lookFor(LOOK_CONSTRUCTION_SITES).length === 0 &&
                pos.lookFor(LOOK_TERRAIN) != "wall"
            ){
                return pos;
            }
        }

        console.log("Failed to find structure placement after 50 attempts at "+self.room.name);
    }
    //borrowed code
    runExtensionBuilder() {
        let self = this;

        if(
            !self.room.memory.currentExtentionSite
            || self.room.getPositionAt(
                self.room.memory.currentExtentionSite.x,
                self.room.memory.currentExtentionSite.y
            ).lookFor(LOOK_CONSTRUCTION_SITES).length == 0
        ){
            let pos = this.getNextVacancy(self.room);
            if(pos){
                let code = pos.createConstructionSite(STRUCTURE_EXTENSION);
                if(code === 0){
                    console.log("New extension being built at "+pos);
                    self.room.memory.currentExtentionSite = pos;
                } else {
                    self.room.memory.currentExtentionSite = null;
                }
            }
        }
    }

    roadPlanner() {
        const self = this;
        const room = self.room;

        for (const spawn of room.find(FIND_MY_SPAWNS)) {
            if (room.memory.initPaths === undefined) {
                self.sourceToSpawn(spawn, room);
                self.controllerToSpawn(spawn, room);

                room.memory.initPaths = true;
            }


            if (room.childRooms) {
                for (let child of room.childRooms) {
                    let childRoom = Game.rooms[child.childRoom]

                    if (childRoom && childRoom.memory.connected === undefined) {
                        let path = PathFinder.search(childRoom.sources[0].pos, spawn.pos).path
                        path.forEach((tile) => {
                            let pos = new RoomPosition(tile.x, tile.y, tile.roomName)
                            pos.createConstructionSite(STRUCTURE_ROAD);
                        })

                        childRoom.memory.connected = true;
                    }
                }
            }

            // if (room.memory.controllerToSourcePaths === true) {
            //     self.sourcesToController()
            // }
        }
    }

    sourceToSpawn(spawn, room) {
        room.sources.forEach((source) => {
            room.findPath(source.pos, spawn.pos).forEach((tile) => {
                room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
            })
        });
    }

    controllerToSpawn(spawn, room) {
        room.findPath(spawn.pos, room.controller.pos).forEach((tile) => {
            room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
        })
    }

    surroundStructures(spawn, room) {
        let self = this;
        let pos, leftx, rightx, topy, boty;

        let structures = self.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (
                s.structureType !== STRUCTURE_ROAD
                && s.structureType !== STRUCTURE_WALL
            )
        });
        let terrain = structures.map(structure => {
            pos = structure.pos;
            [topy, leftx, boty, rightx] = [pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1]

            for (let y = pos.y - 1; y <= pos.y + 1; y++) {
                for (let x = pos.x - 1; x <= pos.x + 1; x++) {
                    self.room.createConstructionSite(x,y, STRUCTURE_ROAD)

                }
            }
        })
        console.log('created roads surrounding all structures')
    }
    roomToRoom(spawn, room) {

    }
    /**
     * pretty fucked up
     */
    // sourcesToController() {
    //     let self = this;
    //     let upper;
    //     self.room.sources.forEach((source) => {
    //         // upper = self.room.findPath(source.pos, self.room.controller.pos)[10]
    //         // console.log(JSON.stringify(upper))
    //         self.room.findPath(source.pos, self.room.controller.pos).forEach((tile) => {
    //
    //             // self.room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
    //         })
    //     });
    //
    //     self.room.memory.controllerToSourcePaths = true
    // }
}
