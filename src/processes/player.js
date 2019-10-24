class Player extends kernel.process {
    constructor (...args) {
        super(...args)
        this.priority = PRIORITIES_PLAYER
        if (!this.data.gcl) {
            this.data.gcl = Game.gcl.level
        }
        if (this.data.gcl < Game.gcl.level) {
            this.data.gcl = Game.gcl.level
        }
    }

    //Game wide process parent
    main() {

        this.launchChildProcess('cartographer', 'kingdom.cartographer');


        for(const townName of Object.keys(Memory.map)) {
            if (Game.rooms[townName] && Game.rooms[townName].controller && Game.rooms[townName].controller.my) {
                this.launchChildProcess(`room_${townName}`, 'town', {
                        'room': townName
                    })
                }
        }
    }
}

module.exports = Player
