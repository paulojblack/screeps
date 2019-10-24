/**
The scheduler is responsible for
1) Executing procs that have been queued by Process instances

procs object:
index - stores the mapping of PID and relevant data
priorityQueue - prioritized object of arrays of PIDs, with the keys ranging from 1 (highest priority) to ?? (lowest priority)
completed - list of PIDs completed this tick, to be cleaned up at end of cycle.
**/

import Universe from '../process/Universe';
const MAX_PID = 99;
export default class Scheduler {
    mem: any
    processCache: any
    procs: any


    constructor() {
        if (!Memory.twoodos.scheduler) {
            Memory.twoodos.scheduler = {}
        }

        this.mem = Memory.twoodos.scheduler
        this.processCache = {}

        if (!this.mem.procs) {
            this.mem.procs = {
                'index': {},
                'running': false,
                'completed': [],
                'priorityQueue': {},
                'sleep': {}
            }
        } else {
            // For upgrading
            if (!this.mem.procs.sleep) {
                this.mem.procs.sleep = {}
            }
        }
    }

    public getProcessCount() {
        return  Object.keys(this.mem.procs.index).length
    }

    public getNextProcess() {
        for (let priority = 1; priority < 15; priority++) {
            if (!this.mem.procs.priorityQueue[priority] || this.mem.procs.priorityQueue[priority].length <= 0) {
                continue
            }

            this.mem.procs.running = this.mem.procs.priorityQueue[priority].shift()

            return this.getProcessForPid(this.mem.procs.running);

        }
    }

    public getProcessForPid(pid: number) {
        const processMeta = this.mem.procs.index[pid]
        const ProgramClass = this.getProcessClass(processMeta.name);

        // return new ProgramClass(pid, processMeta.name, processMeta.data, processMeta.parent)
        return new ProgramClass(pid, processMeta.name, processMeta.data, processMeta.parent)
    }

    public getProcessClass(name: string) {
        return Universe;
    }

    public getNextPID() {
        let nextPID;

        if (!this.mem.lastPID) {
            this.mem.lastPID = 0;
        }

        while (true) {
            this.mem.lastPID++
            // hacky math.min here because for some reason a lte comparison isnt working
            if (this.mem.lastPID > MAX_PID) {
                this.mem.lastPID = 0;
            }
            console.log(this.mem.lastPID)
            if (this.mem.procs.index[this.mem.lastPID]) {
                continue
            }

            nextPID = this.mem.lastPID;
            break;
        }
        return nextPID

    }
}
