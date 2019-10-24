global.DEFAULT_PRIORITY = global.PRIORITIES_DEFAULT || 6
const MAX_PRIORITY = 16
const MAX_PID = 9999999
const WALL = 9

class Scheduler {
    constructor() {
        if (!Memory.twoodos.scheduler) {
            Memory.twoodos.scheduler = {}
        }
        this.mem = Memory.twoodos.scheduler
        this.processCache = {}

        if (!this.mem.processes) {
            this.mem.processes = {
                'index': {},
                'running': false,
                'completed': [],
                'queues': {},
                'sleep': {}
            }
        } else {
            // For upgrading
            if (!this.mem.processes.sleep) {
                this.mem.processes.sleep = {}
            }
        }
    }

    refreshQueue() {
        // Promote processes that did not run.
        for (let x = 0; x <= MAX_PRIORITY; x++) {
            // If we're at the lowest priority merge it with the next priority rather than replacing it, so no pids are lost.
            if (x === 0 || x === WALL) {
                if (!this.mem.processes.queues[x]) {
                    this.mem.processes.queues[x] = []
                }
                if (this.mem.processes.queues[x + 1]) {
                    this.mem.processes.queues[x] = this.mem.processes.queues[x].concat(this.mem.processes.queues[x + 1])
                }
                continue
            }

            // Don't merge priorities from above the wall to below it.
            if ((x + 1) === WALL) {
                continue
            }

            // If the last tick did not hit the wall then do not promote "above the wall" processes.
            if (x >= WALL && this.mem.processes.hitwall) {
                break
            }

            // Replace the current priority queue with the one above it, or reset this one if there is none.
            if (this.mem.processes.queues[x + 1]) {
                this.mem.processes.queues[x] = this.mem.processes.queues[x + 1]
                this.mem.processes.queues[x + 1] = []
            } else {
                this.mem.processes.queues[x] = []
            }
        }

        // Add processes that did run back into the system, including any "running" scripts that never completed
        if (this.mem.processes.running) {
            this.mem.processes.completed.push(this.mem.processes.running)
            this.mem.processes.running = false
        }

        // Randomize order of completed processes before reinserting them to
        // * prevent error prone combinations (such as two really high processes running back to back) from recurring,
        // * keep specific processes from being favored by the scheduler.
        const completed = _.shuffle(_.uniq(this.mem.processes.completed))

        let pid;

        for (pid of completed) {
            // If process is dead do not merge it back into the queue system.
            if (!this.mem.processes.index[pid]) {
                continue
            }
            try {
                const priority = this.getPriorityForPid(pid)
                this.mem.processes.queues[priority].push(pid)
            } catch (err) {
                delete this.mem.processes.index[pid]
                Log.error(err, LOG_ERROR)
            }
        }
        this.mem.processes.hitwall = false
        this.mem.processes.completed = []
    }

    getNextProcess () {
        // Reset any "running" pids
        if (this.mem.processes.running) {
            this.mem.processes.completed.push(this.mem.processes.running)
            this.mem.processes.running = false
        }

        // Iterate through the queues until a pid is found.
        let x
        for (x = 0; x <= MAX_PRIORITY; x++) {
            if (x >= WALL) {
                this.mem.processes.hitwall = true
            }
            if (!this.mem.processes.queues[x] || this.mem.processes.queues[x].length <= 0) {
                continue
            }

            this.mem.processes.running = this.mem.processes.queues[x].shift()

            // Don't run this pid twice in a single tick.
            if (this.mem.processes.completed.includes(this.mem.processes.running)) {
                continue
            }

            // If process doesn't exist anymore don't use it.
            if (!this.mem.processes.index[this.mem.processes.running]) {
                continue
            }

            // If process has a parent and the parent has died kill the child process.
            if (this.mem.processes.index[this.mem.processes.running].p) {
                if (!this.isPidActive(this.mem.processes.index[this.mem.processes.running].p)) {
                    this.pkill(this.mem.processes.running)
                    continue
                }
            }

            return this.getProcessForPid(this.mem.processes.running)
        }

        // Nothing was found
        return false
    }

    getNextPid () {
        if (!this.mem.lastPid) {
            this.mem.lastPid = 0
        }
        while (true) {
            this.mem.lastPid++
            if (this.mem.lastPid > MAX_PID) {
                this.mem.lastPid = 0
            }
            if (this.mem.processes.index[this.mem.lastPid]) {
                continue
            }
            return this.mem.lastPid
        }
    }

    getProcessForPid (pid) {
        if (!this.processCache[pid]) {
            const ProgramClass = this.getProcessClass(this.mem.processes.index[pid].n)
            this.processCache[pid] = new ProgramClass(pid,
                this.mem.processes.index[pid].n,
                this.mem.processes.index[pid].d,
                this.mem.processes.index[pid].p
            )
        }
        return this.processCache[pid]
    }

    getProcessClass (process) {
        return require(`processes.${process}`)
    }

    getProcessCount () {
        return Object.keys(this.mem.processes.index).length
    }

    getCompletedProcessCount () {
        return this.mem.processes.completed.length
    }

    isPidActive (pid) {
        if(this.mem.processes.index[pid]) {
            return true
        }
        return false
    }

    getPriorityForPid (pid) {
        const program = this.getProcessForPid(pid)
        if (!program.getPriority) {
            return DEFAULT_PRIORITY
        }
        const priority = program.getPriority()
        return priority < MAX_PRIORITY ? priority : MAX_PRIORITY
    }

    wake (pid) {
        if (this.mem.processes.index[pid] && this.mem.processes.sleep.list && this.mem.processes.sleep.list[pid]) {
            const priority = this.getPriorityForPid(pid)
            // Push the process back to the execution queue
            this.mem.processes.queues[priority].push(pid)
            // and remove it from sleep list
            delete this.mem.processes.sleep.list[pid]
        }
    }

    pkill (pid) {
        if (this.mem.processes.index[pid]) {
            // Process needs to be woken up first
            this.wake(pid)
            delete this.mem.processes.index[pid]
        }
    }
}

module.exports = Scheduler;
