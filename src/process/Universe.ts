import Process from '../os/Process';

export default class Universe extends Process {

    constructor(pid: number, name: string, data: any, parent: number) {
        super(pid, name, data, parent)
    }

    public main() {
        // iterate through my rooms and launch the room process for each one
        for(const room of Object.keys(Game.rooms)) {
            this.launchChildProcess(`room_${room}`, 'town', { room })
        }

        this.pkill()
    }
}
