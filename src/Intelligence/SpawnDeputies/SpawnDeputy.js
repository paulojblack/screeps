const constants = require('Intelligence.SpawnDeputies.SpawnConstants')

module.exports = class SpawnDeputy {
    constructor(spawnId) {
        this.spawn = Game.getObjectById(spawnId)
    }

    spawnNew(creepSpawnConfig){
        const budget = this.spawn.room.energyCapacityAvailable;
        const name = constants.getUnusedName()

        const design = constants.creepDesigns[creepSpawnConfig.role](
            budget,
            this.spawn.room
        );

        Log.info(`Spawning new ${creepSpawnConfig.role} named ${name} `
            + `at ${this.spawn.name} in ${this.spawn.room.name} `
            + `with budget ${budget}`
        )
        const spawnResultCode = this.spawn.spawnCreep(
            design,
            name,
            {
                memory: creepSpawnConfig
            }
        )

        this.logSpawnResult(spawnResultCode)
    }

    logSpawnResult(resultCode) {
        if (resultCode === 0) {
            Log.success('Spawn is successful')
        }

        if (resultCode === -3) {
            Log.error('Attempting to spawn creep with existing name')
        }

        if (resultCode === -6) {
            Log.error('Attempting to spawn creep with insufficient energy')
        }

        if (resultCode === -10) {
            Log.error('Attempting to spawn creep with no name or improper body')
        }


    }
}
