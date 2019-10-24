import Process from '../os/Process'

export default class Universe extends Process {
    constructor(pid: number, name: string, data: any, parent: number) {
        super(pid, name, data, parent)

    }

    public main() {

        // iterate through my rooms and launch the room process for each one
        for(const room of Object.keys(Game.rooms)) {
            console.log('room universe', Game.rooms[room])
        }

        // super.pkill(this.pid)
        // return 'string'
    }
}
