const RoomDecorator = require('class.RoomDecorator')
const RoomFurnisher = require('class.RoomFurnisher')

module.exports = class RoomCommander extends RoomDecorator {
    constructor(room) {
        super(room)
    }

    processRoom() {
        let self = this;
        let roomFurnisher = new RoomFurnisher(self.room);

        self.spawnCreep();

        if (Game.time % 60 === 0) {
            roomFurnisher.runExtensionBuilder()
            roomFurnisher.roadPlanner()
        }

        if (self.room.childRooms.length) {
            self.processChildRooms();
        }
    }

    spawnCreep() {
        const self = this;

        if (self.memory.nextCreep === undefined) {
            return undefined
        }

        if (self.memory.nextCreep === 'harvester') {
            return self.handleSpawnHarvester();
        }

        if (self.memory.nextCreep === 'miner') {
            return self.handleSpawnMiner();
        }

        if (self.memory.nextCreep === 'builder') {
            return self.handleSpawnGeneric('builder');
        }

        if (self.memory.nextCreep === 'upgrader') {
            return self.handleSpawnGeneric('upgrader');
        }

        if (self.memory.nextCreep === 'lorry') {
            return self.handleSpawnGeneric('lorry');
        }

        if (self.memory.nextCreep === 'repairer') {
            return self.handleSpawnGeneric('repairer');
        }

        if(self.memory.nextCreep === 'scout') {
            return self.handleSpawnScout('scout');
        }

        if (self.memory.nextCreep === 'defenseBuilder') {
            return self.handleSpawnGeneric('defenseBuilder');
        }

    }

    handleSpawnHarvester() {
        let self = this;

        let unboundSources = self.getBoundSource('harvester');

        // Harvester assigned to spawn room
        if (unboundSources.length) {
                // Pass this in to create minimum energy harvester if none exist
            let panicFlag = 0;

            if (unboundSources.length > 0) {
                panicFlag = 1
            }

            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const bindSource = unboundSources[0];
                const target = self.room.name;
                const home = self.room.name;


                return spawn.spawnHarvester(bindSource, target, home, panicFlag)
                //add a check to make sure spawn isnt building
            }
        }

        // TODO handle neighboring rooms

    }

    handleSpawnMiner() {
        let self = this;

        let unboundSources = self.getBoundSource('miner');

        if (unboundSources.length) {
            // Pass this in to create minimum energy harvester if none exist
            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const bindSource = unboundSources[0];
                const target = self.room.name;
                const home = self.room.name;

                return spawn.spawnMiner(bindSource, target, home)
            }
        }

        // TODO handle neighboring rooms
    }


    handleSpawnScout() {
        let self = this;
        const scouts = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === 'scout'
        });

        const childRooms = _.pluck(self.room.childRooms, 'childRoom')
        const scoutTargets = _.pluck(scouts, 'memory.target');
        const unreservedRooms = _.difference(childRooms, scoutTargets)

        if (unreservedRooms && unreservedRooms.length) {
            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const home = self.room.name;
                const target = unreservedRooms[0];
                console.log(unreservedRooms)
                return spawn.spawnGeneric(undefined, target, home, 'scout')
            }

        }

    }

    handleSpawnGeneric(role) {
        let self = this;

        let unboundSources = self.getBoundSource(role);

        if (unboundSources.length) {
            // Pass this in to create minimum energy harvester if none exist
            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const bindSource = unboundSources[0]
                const target = self.room.name;
                const home = self.room.name;

                return spawn.spawnGeneric(bindSource, target, home, role)
            }
        }

        // TODO handle neighboring rooms
    }

    getBoundSource(role) {
        const self = this;

        const units = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === role
        });

        const roomSourceIDs = _.pluck(self.room.sources, 'id')
        const boundSources = _.pluck(units, 'memory.boundSource')

        return _.difference(roomSourceIDs, boundSources)
    }

    processChildRooms() {
        let self = this;
        let parentRoom = self.room;
        let childRooms = parentRoom.childRooms;

        for (let child of childRooms) {
            let childFlag = Game.flags[[child.parentRoom,child.childRoom,child.action].join(',')]

            if (childFlag.memory.intialized === undefined) {
                self.initializeChildRoom(childFlag)
            }

            // console.log(childFlag)
            // console.log(JSON.stringify(childFlag.memory))
        }
        // console.log('processing child room')
    }

    initializeChildRoom(childFlag) {
        let self = this;
        let parentRoom = self.room;
        const flagPos = childFlag.pos;
        const parentRoomStoragePos = parentRoom.storage.pos;
        // console.log(flagPos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES))
        // console.log(flagPos, parentRoomStoragePos)
        let connectionPath = parentRoomStoragePos.findPathTo(flagPos)
        // console.log(JSON.stringify(connectionPath))

    }

}
