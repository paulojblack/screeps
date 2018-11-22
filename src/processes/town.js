class Town extends kernel.process {
    constructor (...args) {
        super(...args)

        this.priority = PRIORITIES_PLAYER
        if (!this.data.gcl) {
            this.data.gcl = Game.gcl.level
        }
        if (this.data.gcl < Game.gcl.level) {
            qlib.notify.send(`GCL has increased to ${Game.gcl.level}`)
            this.data.gcl = Game.gcl.level
        }
    }

    main() {
        if (!Game.rooms[this.data.room] || !Game.rooms[this.data.room].controller.my) {
            Room.removeTown(this.data.room)
            return this.pkill()
        }

        this.room = Game.rooms[this.data.room];

        // Kill process if mistakenly called
        if (!this.room) {
            Log.warn(`Room ${this.data.room} process terminated early: room not available`)
            return this.pkill()
        };

        this.launchChildProcess('spawns', 'spawns', {'room': this.data.room})

        // this.launchUpkeep();
        this.launchCreeps()

    }

    launchCreeps () {
        // Launch fillers
        let options = {
            'priority': 3
        }
        if (this.room.getRoomSetting('PURE_CARRY_FILLERS')) {
            options['carry_only'] = true
            options['energy'] = Math.max(Math.min(1600, this.room.energyCapacityAvailable / 2), 400)
        }
        const fillerQuantity = this.room.getRoomSetting('ADDITIONAL_FILLERS') ? 4 : 2
        this.launchCreepProcess('fillers', 'filler', this.data.room, fillerQuantity, options)

        if (this.room.isEconomyCapable('UPGRADE_CONTROLLERS')) {
            let upgraderQuantity = this.room.getRoomSetting('UPGRADERS_QUANTITY')
            // If the room is not done being built up reduce the upgraders.
            if (this.room.controller.level > this.room.controller.level) {
                upgraderQuantity = 0
            }
            if (this.room.isEconomyCapable('EXTRA_UPGRADERS')) {
                upgraderQuantity += 2
            }
            if (this.room.isEconomyCapable('MORE_EXTRA_UPGRADERS')) {
                upgraderQuantity += 2
            }
            if (this.room.controller.level >= 8) {
                upgraderQuantity = 1
            }
            this.launchCreepProcess('upgraders', 'upgrader', this.data.room, upgraderQuantity, {
                'priority': 5
            })
        }
    }
}
module.exports = Town
