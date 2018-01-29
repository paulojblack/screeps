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
        for (i = 0; i < 50; i++) {
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
            /*pos.lookFor(LOOK_CREEPS).length === 0*/){
                return pos;
            }
        }

        console.log("Failed to find structure placement after 50 attempts at "+self.room.name);
    }
    //borrowed code
    runExtensionBuilder() {
        let self = this;

        if(!self.room.memory.currentExtentionSite || self.room.getPositionAt(self.room.memory.currentExtentionSite.x, self.room.memory.currentExtentionSite.y).lookFor(LOOK_CONSTRUCTION_SITES).length == 0){
            let pos = this.getNextVacancy(self.room);
            if(pos){
                let code = pos.createConstructionSite(STRUCTURE_EXTENSION);
                if(code === 0){
                    console.log("New extention being built at "+pos);
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

    /**
     * pretty fucked up
     */
    sourcesToController() {
        let self = this;
        let upper;
        self.room.sources.forEach((source) => {
            upper = self.room.findPath(source.pos, self.room.controller.pos)[10]
            self.room.findPath(source.pos, self.room.controller.pos).forEach((tile) => {
                self.room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
            })
        });

        self.room.memory.controllerToSourcePaths = true
    }
}
