export default class Process {
    pid: number
    name: string
    data: any
    parent: number

    constructor(pid: number, name: string, data: any, parent: number) {
        this.pid = pid;
        this.name = name;
        this.data = data;
        this.parent = parent;
    }

    public clean() {
        return true;
    }

    public launchChildProcess(pid: number) {
        if (kernel.scheduler.index) {

            delete kernel.scheduler.index[pid]
        }
    }

    public pkill(pid: number) {
        if (kernel.scheduler.index) {

            delete kernel.scheduler.index[pid]
        }
    }
}
