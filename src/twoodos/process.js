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

    pkill () {
        return kernel.scheduler.pkill(this.pid)
    }

    getPriority () {
        return this.priority || DEFAULT_PRIORITY
    }

    launchChildProcess (label, name, data = {}) {
        if (!this.data.children) {
            this.data.children = {}
        }
        if (this.data.children[label]) {
            return true
        }
        this.data.children[label] = kernel.launchProcess(name, data, this.pid)
        return this.data.children[label]
    }

    launchCreepProcess (label, role, roomname, quantity = 1, options = {}) {
        const room = Game.rooms[roomname]
        if (!room) {
            return false
        }
        if (!this.data.children) {
            this.data.children = {}
        }
        let x
        for (x = 0; x < quantity; x++) {
            const specificLabel = label + x
            if (this.data.children[specificLabel]) {
                continue
            }
            const creepName = room.queueCreep(role, options)
            this.launchChildProcess(specificLabel, 'creep', {
                'creep': creepName
            })
        }
    }

    getChildProcessPid (label) {
        if (!this.data.children) {
            return false
        }
        if (!this.data.children[label]) {
            return false
        }
        return this.data.children[label]
    }

}


module.exports = Process;
