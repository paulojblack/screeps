'use strict';

class Process {
    constructor (pid, name, data, parent) {
        this.pid = pid
        this.name = name
        this.data = data
        this.parent = parent
    }

    run() {
        this.main();
    }

    sleep (ticks) {
        kernel.scheduler.sleep(this.pid, ticks, true)
    }

    suicide () {
        return kernel.scheduler.kill(this.pid)
    }
}


module.exports = Process;
