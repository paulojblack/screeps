'use strict'

const Scheduler = require('twoodos.scheduler')
const Process = require('twoodos.process')

global.BUCKET_EMERGENCY = 1000
global.BUCKET_FLOOR = 2000
global.BUCKET_CEILING = 9500
const BUCKET_BUILD_LIMIT = 15000
const CPU_BUFFER = 130
const CPU_MINIMUM = 0.30
const CPU_ADJUST = 0.05
const CPU_GLOBAL_BOOST = 60
const MINIMUM_PROGRAMS = 0.3
const PROGRAM_NORMALIZING_BURST = 2
const RECURRING_BURST = 1.75
const RECURRING_BURST_FREQUENCY = 25
const MIN_TICKS_BETWEEN_GC = 20
const GC_HEAP_TRIGGER = 0.85
const GLOBAL_LAST_RESET = Game.time
const IVM = typeof Game.cpu.getHeapStatistics === 'function' && Game.cpu.getHeapStatistics()

class TwoodOSKernel {
    constructor() {
        global.kernel = this

        if (!Memory.twoodos) {
            Memory.twoodos = {}
        }

        if (!Memory.firstInit) {
            Memory.firstInit = {}
        }

        this.mem = Memory.twoodos;
        this.scheduler = new Scheduler();
        this.process = Process;
    }

    init() {
        this.scheduler.refreshQueue()
        // TODO move to a "from scratch" initialization layer
        // This only runs the very first time the code is executed

        if (this.scheduler.getProcessCount() <= 0) {
            this.launchProcess('player')
        }

    }

    run() {

        while (this.shouldContinue()) {
            const runningProcess = this.scheduler.getNextProcess()

            if (!runningProcess) {
                return
            }
            runningProcess.run()
        }
    };

    launchProcess (name, data = {}, parent = false) {
        const pid = this.scheduler.getNextPid();

        this.mem.scheduler.processes.index[pid] = {
            n: name,
            d: data,
            p: parent
        };


        const priority = this.scheduler.getPriorityForPid(pid)

        if (!this.mem.scheduler.processes.queues[priority]) {
            this.mem.scheduler.processes.queues[priority] = []
        }

        this.mem.scheduler.processes.queues[priority].push(pid)
        return pid
    }

    shouldContinue () {
        if (this.simulation) {
            return true
        }

        // If the bucket has dropped below the emergency level enable the bucket rebuild functionality.
        if (Game.cpu.bucket <= BUCKET_EMERGENCY) {
            if (!Memory.twoodos.last_build_bucket || (Game.time - Memory.twoodos.last_build_bucket) > BUCKET_BUILD_LIMIT) {
                Memory.twoodos.build_bucket = true
                Memory.twoodos.last_build_bucket = Game.time
                return false
            }
        }

        // If the bucket rebuild flag is set don't run anything until the bucket has been reset.
        if (Memory.twoodos.build_bucket) {
            if (Game.cpu.bucket >= BUCKET_CEILING) {
                delete Memory.twoodos.build_bucket
            } else {
                return false
            }
        }

        // Make sure to stop if cpuUsed has hit the maximum allowed cpu.
        const cpuUsed = Game.cpu.getUsed()
        if (cpuUsed >= Game.cpu.tickLimit - CPU_BUFFER) {
            return false
        }

        // Allow if the cpu used is less than this tick's limit.
        const cpuLimit = this.getCpuLimit()
        if (cpuUsed < cpuLimit) {
            return true
        }

        // Ensure that a minumum number of processes runs each tick.
        // This is primarily useful for garbage collection cycles.
        if (Game.cpu.bucket > BUCKET_FLOOR) {
            const total = this.scheduler.getProcessCount()
            const completed = this.scheduler.getCompletedProcessCount()
            if (completed / total < MINIMUM_PROGRAMS) {
                if (cpuUsed < cpuLimit * PROGRAM_NORMALIZING_BURST) {
                    return true
                }
            }
        }

        return false
    }

    getCpuLimit () {
        if (Game.cpu.bucket > BUCKET_CEILING) {
            return Math.min(Game.cpu.tickLimit - CPU_BUFFER, Game.cpu.bucket * 0.05)
        }

        if (Game.cpu.bucket < BUCKET_EMERGENCY) {
            return 0
        }

        if (Game.cpu.bucket < BUCKET_FLOOR) {
            return Game.cpu.limit * CPU_MINIMUM
        }

        if (!this._cpuLimit) {
            const bucketRange = BUCKET_CEILING - BUCKET_FLOOR
            const depthInRange = (Game.cpu.bucket - BUCKET_FLOOR) / bucketRange
            const minToAllocate = Game.cpu.limit * CPU_MINIMUM
            const maxToAllocate = Game.cpu.limit
            this._cpuLimit = (minToAllocate + this.sigmoidSkewed(depthInRange) * (maxToAllocate - minToAllocate)) * (1 - CPU_ADJUST)
            if (this.newglobal) {
                this._cpuLimit += CPU_GLOBAL_BOOST
            } else if (RECURRING_BURST_FREQUENCY && Game.time % RECURRING_BURST_FREQUENCY === 0) {
                this._cpuLimit *= RECURRING_BURST
            }
        }

        return this._cpuLimit
    }


}

module.exports = TwoodOSKernel
