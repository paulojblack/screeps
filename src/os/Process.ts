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

    public launchChildProcess(label: string, name: string, data: any) {
        if (!this.data.children) {
            this.data.children = {}
        }

        if (this.data.children[label]) {
            return true
        }

        this.data.children[label] = kernel.launchProcess(name, data, this.pid)
        return this.data.children[label]
    }

    public pkill() {
        delete kernel.scheduler.mem.procs.index[this.pid]
    }
}
