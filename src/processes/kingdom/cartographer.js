class Cartographer extends kernel.process {
    constructor (...args) {
        super(...args)
        this.priority = PRIORITIES_CARTOGRAPHER

        // if {!Memory.map} {
        //     Memory.map = {
        //         town: {}
        //     }
        // }
        // Suspect that this could cause a first tick bug if its referred to before definition in firstinit
        this.map = Memory.map
    }

    main() {
        if (!Memory.firstInit.cartographer) {
            this.firstInit()
        }


        // Empire wide processes
    }

    firstInit() {
        if (!Memory.map || Object.keys(Memory.map).length <= 0) {
            Memory.map = {}
            for (let roomName of Object.keys(Game.rooms)) {
                const room = Game.rooms[roomName];

                if (room.controller && room.controller.my) {
                    Memory.map[roomName] = {}
                }
            }
        }

        Memory.firstInit.cartographer = true
    }




}

module.exports = Cartographer
