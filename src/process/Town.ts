import Process from '../os/Process';

export default class Town extends Process {
    room: Room

    constructor(pid: number, name: string, data: any, parent: number) {
        super(pid, name, data, parent)


    } 

    public main() {
        this.room = Game.rooms[this.data.room]
        if (!this.room) {
            return this.pkill()
        }

        const maxspawns = CONTROLLER_STRUCTURES[STRUCTURE_SPAWN][this.room.controller.level]
        console.log(maxspawns)
        this.pkill()
        // return 'string'
    }
}
