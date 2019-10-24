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
        if (this.scheduler.getProcessCount() <= 0) {
            this.launchProcess('universe', {}, 0)
        }
    }

    public run() {

        while(this.continueExecutingKernel()) {
            const proc = this.scheduler.getNextProcess();

            // To get around TS2532
            if (proc && proc.main) {
                proc.main()
            }

            console.log('finished main', JSON.stringify(this.mem.scheduler.procs))
            this.mem.scheduler.procs.running = false;

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

        const priority = this.scheduler.getPriorityForPid(PID);

        // Determine importance of process and add it to the queue
        if (!this.mem.scheduler.procs.priorityQueue[priority]) {
            this.mem.scheduler.procs.priorityQueue[priority] = [];
        }

        this.mem.scheduler.procs.priorityQueue[priority].push(PID);
        console.log('launching', JSON.stringify(this.mem.scheduler.procs))
        return PID;

    }

    public continueExecutingKernel() {
        if (this.scheduler.getProcessCount() > 0) {
            return true;
        }
    }


}
