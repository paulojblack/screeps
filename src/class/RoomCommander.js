const RoomDecorator = require('class.RoomDecorator')
const RoomFurnisher = require('class.RoomFurnisher')
const RoomExpander = require('class.RoomExpander')

module.exports = class RoomCommander extends RoomDecorator {
    constructor(room) {
        super(room)
    }

    processRoom() {
        let self = this;
        let roomFurnisher = new RoomFurnisher(self.room);
        let roomExpander = new RoomExpander(self.room);

        self.spawnCreep();

        if (Game.time % 30 === 0) {
            console.log('Room:', self.room, 'creep status at', Game.time, 'real time', new Date())
            console.log('Next creep', self.memory.nextCreep)
            console.log(JSON.stringify(self.memory.existingRoles))

            // if (!self.room.childRooms.length) {
            //
            //     roomExpander.expand();
            // } else {
            //     let stagingFlag = new RoomPosition(22, 22, self.room.name).lookFor(LOOK_FLAGS);
            //     if (stagingFlag.length !== 0) {
            //         roomExpander.moveStagingFlag(stagingFlag[0])
            //     }
            // }
        }

        if (Game.time % 60 === 0) {
            roomFurnisher.runExtensionBuilder()
            roomFurnisher.roadPlanner()
        }

        if (Game.time % 120 === 0) {
            roomFurnisher.surroundStructures()
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

        if (self.memory.nextCreep === 'claimnant') {
            return self.handleSpawnClaimnant('claimnant');
        }

        if (self.memory.nextCreep === 'grunt') {
            return self.handleSpawnGeneric('grunt');
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

                return spawn.spawnGeneric(undefined, target, home, 'scout')
            }
        }
    }


    handleSpawnClaimnant() {
        let self = this;
        const claimnants = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === 'claimnant'
        });

        const childRooms = _.pluck(self.room.childRooms, 'childRoom')
        const claimnantTargets = _.pluck(claimnants, 'memory.target');
        const unreservedRooms = _.difference(childRooms, claimnantTargets)

        if (unreservedRooms && unreservedRooms.length) {
            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const home = self.room.name;
                const target = unreservedRooms[0];

                return spawn.spawnGeneric(undefined, target, home, 'claimnant')
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

        let unboundSources =  _.difference(roomSourceIDs, boundSources)

        if (unboundSources.length) {

            return unboundSources
        }

        const childSourceIDs = _.pluck(self.room.childSources, 'id');
        const boundChildSources = _.pluck(units, 'memory.boundSource');

        return _.difference(childSourceIDs, boundChildSources);

    }

}
