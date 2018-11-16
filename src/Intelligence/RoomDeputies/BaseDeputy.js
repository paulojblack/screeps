const RoomDecorator = require('Intelligence.RoomDecorator')
const RoomFurnisher = require('Intelligence.RoomFurnisher')
const RoomExpander = require('Intelligence.RoomExpander')
const SpawnDeputy = require('Intelligence.SpawnDeputies.SpawnDeputy');

module.exports = class BaseDeputy extends RoomDecorator {
    constructor(room) {
        super(room, 'base')

        if (this.memory.roomType === undefined) {
            this.memory.roomType = 'base'
        }

        // This is currently written under the assumption that every base has 2 sources
        if (this.memory.stage = 'new') {
            this.baseCreepConfig = {
                harvester: {
                    count: 2 * this.room.sources.length,
                    priority: 1
                },
                upgrader: {
                    count: 2,
                    priority: 1
                },
                builder: {
                    count: this.room.constructionSites.length > 2 ? 4 : 2,
                    priority: 2
                },
                repairer: {
                    count: 0,
                    priority: 3
                },
                lorry: {
                    count: 0,
                    priority: 3
                }
            }
        } else if (this.memory.stage = 'stable') {
            this.baseCreepConfig = undefined
        } else if (this.memory.stage = 'advanced') {
            this.baseCreepConfig = undefined
        }



    }

    processRoom() {
        let roomFurnisher = new RoomFurnisher(this.room);
        let roomExpander = new RoomExpander(this.room);

        const creepType = this.determineCreepToSpawn()
        const availableSpawn = this.findAvailableSpawn();

        if (creepType !== undefined && availableSpawn !== undefined) {
            const creepSpawnConfig = {
                targetRoomName: this.room.name,
                homeRoomName: this.room.name,
                role: creepType,
                boundSource: this.getUnboundSource(creepType),
                working: false
            }

            this.orderSpawnCreep(availableSpawn.id, creepSpawnConfig)
            //spawn creep
        }

        /**
        room vis
        */
        this.drawRoomVisuals()

    }

    drawRoomVisuals() {
        let existingStartingYPos = 2
        this.room.visual.text('Living creeps', 2, 1, { font: 0.8, color: 'green'})
        this.room.visual.text('Desired creeps', 8, 1, { font: 0.8, color: 'red'})
        for (const role in this.baseCreepConfig) {
            this.room.visual.text(
                `${role} : ${this.room.demographics[role] ? this.room.demographics[role].count : 0}`,
                0,
                existingStartingYPos,
                {
                    color: 'green',
                    align :'left',
                }
            )
            this.room.visual.text(
                `${role} : ${this.baseCreepConfig[role].count}`,
                6,
                existingStartingYPos,
                {
                    color: 'red',
                    align :'left',
                }
            )
            existingStartingYPos++;
        }
        // let dStartingYPos = 2
        // this.room.visual.text('Living creeps', 2, 1, { font: 0.8})
        // for (const role in this.room.demographics) {
        //     this.room.visual.text(
        //         `${role} : ${this.room.demographics[role].count}`,
        //         0,
        //         existingStartingYPos,
        //         {
        //             color: 'green',
        //             align :'left',
        //         }
        //     )
        //     existingStartingYPos++;
        // }

    }
    orderSpawnCreep(availableSpawn, creepSpawnConfig) {
        Log.warn(availableSpawn)
        const spawnDeputy = new SpawnDeputy(availableSpawn)
        spawnDeputy.spawnNew(creepSpawnConfig)

    }

    findAvailableSpawn() {
        const roomSpawns = this.room.find(FIND_MY_SPAWNS);

        const availableSpawns = _.filter(roomSpawns, (spawn) =>
            spawn.spawning === null
            && spawn.room.energyCapacityAvailable === spawn.room.energyAvailable
        )
        // Log.debug()
        // Log.debug(this.room.energyCapacityAvailable === this.room.energyAvailable)
        if (availableSpawns.length) {
            return availableSpawns[0]
        }

        return undefined
    }
    // getRoomPopulation() {
    //
    // }

    determineCreepToSpawn() {
        const livingCreeps = this.room.demographics;

        let highestPriority = 4;
        let highestPriorityCreepType = undefined;
        for (const creepType in this.baseCreepConfig) {
            const desiredCreepCount = this.baseCreepConfig[creepType].count;
            const livingCreepCount = livingCreeps[creepType] ? livingCreeps[creepType].count : 0;

            if (desiredCreepCount > livingCreepCount) {
                if (this.baseCreepConfig[creepType].priority < highestPriority) {
                    highestPriority = this.baseCreepConfig[creepType].priority;
                    highestPriorityCreepType = creepType
                }
            }

            // end early if at highest priority
            if (highestPriority === 1) {
                return highestPriorityCreepType;
            }

        }

        return highestPriorityCreepType
    }

    getUnboundSource(role) {
        const demographics = this.room.demographics;
        const units = demographics[role] ? demographics[role].creeps : []

        const roomSourceIDs = _.pluck(this.room.sources, 'id')
        const boundSources = _.pluck(units, 'memory.boundSource')
        const unboundSources =  _.difference(roomSourceIDs, boundSources)

        // Fill source if totally unused
        if (unboundSources.length) {
            return unboundSources[0]
        }

        // Fill source if not at capacity
        const boundSourceCounts = _.countBy(boundSources)
        for (const sourceId in boundSourceCounts) {
            if (boundSourceCounts[sourceId] < 2) {
                return sourceId;
            }
        }

        //just say fuck it and return a random source
        return roomSourceIDs[Math.floor(Math.random() * (roomSourceIDs.length -1))]
    }


            // if (Game.time % 30 === 0) {
            //     console.log('Room:', this.room, 'creep status at', Game.time, 'real time', new Date())
            //     console.log('Next creep', this.memory.nextCreep)
            //     console.log(JSON.stringify(this.memory.existingRoles))
            //
            //     if (!this.room.childRooms.length) {
            //
            //         roomExpander.expand();
            //     } else {
            //         let stagingFlag = new RoomPosition(22, 22, this.room.name).lookFor(LOOK_FLAGS);
            //         if (stagingFlag.length !== 0) {
            //             roomExpander.moveStagingFlag(stagingFlag[0])
            //         }
            //     }
            // }
            //
            // if (Game.time % 60 === 0) {
            //     roomFurnisher.runExtensionBuilder()
            //     roomFurnisher.roadPlanner()
            // }
            //
            // if (Game.time % 120 === 0) {
            //     roomFurnisher.surroundStructures()
            // }
}
