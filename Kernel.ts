import Process from "./Process"
import Scheduler from "./Scheduler"

export default class Kernel {
    scheduler: Scheduler
    mem: any
    process: any
    // init
    // retrieve any existing schedule
    // queue new items in sched
    // Run procs
    constructor() {
        global.kernel = this;

        this.mem = Memory.twoodos;
        this.scheduler = new Scheduler();
        this.process = Process;

    }

    public init() {
        console.log('pcount', this.scheduler.getProcessCount())

        if (this.scheduler.getProcessCount() <= 0) {
            this.launchProcess('universe', 'data', 0)
        }
    }

    public run() {

        if(this.continueExecutingKernel()) {
            const proc = this.scheduler.getNextProcess();
            console.log(JSON.stringify(proc))
            console.log(proc)
            // const x = proc.main()
            console.log('finished main', JSON.stringify(this.mem.scheduler.procs))
            this.mem.scheduler.procs.running = false;
            this.mem.scheduler.procs.index = {};
        }
    }

    public launchProcess(name: string, data: any, parent?: number) {
        const PID = this.scheduler.getNextPID();

        // Register process in process map
        this.mem.scheduler.procs.index[PID] = {
            name,
            data,
            parent
        }

        // Determine importance of process and add it to the queue
        if (!this.mem.scheduler.procs.priorityQueue[1]) {
            this.mem.scheduler.procs.priorityQueue[1] = [];
        }

        this.mem.scheduler.procs.priorityQueue[1].push(PID);
        console.log('launching', JSON.stringify(this.mem.scheduler.procs))
        return PID;

    }

    public continueExecutingKernel() {
        return true;
    }


}
