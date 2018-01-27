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

        roomFurnisher.roadPlanner()
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
    }

    handleSpawnHarvester() {
        let self = this;

        const harvesters = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === 'harvester'
        });

        const roomSourceIDs = _.pluck(self.room.sources, 'id')
        const boundSources = _.pluck(harvesters, 'memory.boundSource')

        const unboundSources = _.difference(roomSourceIDs, boundSources)

        // Harvester assigned to spawn room
        if (unboundSources.length) {
            // Pass this in to create minimum energy harvester if none exist
            let panicFlag = 0;

            if (unboundSources.length === self.room.sources.length) {
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

        const miners = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === 'miner'
        });

        const roomSourceIDs = _.pluck(self.room.sources, 'id')
        const boundSources = _.pluck(miners, 'memory.boundSource')

        const unboundSources = _.difference(roomSourceIDs, boundSources)

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

    handleSpawnGeneric(role) {
        let self = this;

        const units = self.memory.creepsList.filter(function(creep) {
            return creep.memory.role === role
        });

        const roomSourceIDs = _.pluck(self.room.sources, 'id')
        const boundSources = _.pluck(units, 'memory.boundSource')

        const unboundSources = _.difference(roomSourceIDs, boundSources)

        if (unboundSources.length) {
            // Pass this in to create minimum energy harvester if none exist
            for (const spawn of self.room.find(FIND_MY_SPAWNS)) {
                const bindSource = unboundSources.unshift();
                const target = self.room.name;
                const home = self.room.name;

                return spawn.spawnGeneric(bindSource, target, home, role)
            }
        }

        // TODO handle neighboring rooms
    }
}



/*

RoomObserver should not trigger any actions it will only just collect information needed
for other operations and add it to the memory.

states
STATE_C1
STATE_MED
STATE_END
STATE_PANIC


checks to determine actions

do i have any creeps tasked to gather and store energy?
what is my controller level?
what is my desired numnber of creeps relative to the current number
what is my room energy vs capacity
what type of creep do I need

then that information gets sent to the spawn
the spawn will then refer to some (readonly) props of the room to build the creep

CreepFactory will be the spawner method

 */
