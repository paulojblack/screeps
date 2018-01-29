const states = require('util.constants').roomStates;

module.exports = class RoomDecorator {
    constructor(room) {
        this.room = room;
        this.memory = room.memory;

        this.memory.creepsList = this.getCreepsAssignedToRoom()
        this.memory.existingRoles = this.getExistingRoomRoles();
        this.memory.state = this.getRoomState();
        this.memory.nextCreep = this.getDesiredCreeps()
    }

    /**
     * Get array of creep object with $creep.memory.target === room.name (string)
     * @return {[type]} [description]
     */
    getCreepsAssignedToRoom() {
        const self = this;
        let roomCreeps = [];

        for (const name in Game.creeps) {
            if (Game.creeps[name].memory.target === this.room.name) {
                roomCreeps.push(Game.creeps[name])
            }
        }

        return roomCreeps

    }

    /**
     * This should handle panic states, standard states, expansion states, resource gathering states
     * perhaps more, we'll see how it pans out.
     * @return {[type]} [description]
     */
    getRoomState() {
        const self = this;

        if (self.roomCreeps === 0) {
            return states.STATE_PANIC
        }

        if (self.room.name === 'W3N8') {
            return states.STATE_OWNED_HOME
        }

        if (self.room.controller.level) {
            return states.STATE_START
        }
    }

    getExistingRoomRoles() {
        const self = this;

        let roles = {
            builders: 0,
            harvesters: 0,
            upgraders: 0,
            miners: 0,
            lorries: 0,
            claimnants: 0,
            repairers: 0,
            defenseBuilders: 0,
            roadbuilders: 0,
            extractors: 0
        }

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];

            if(creep.memory.target === this.room.name){
                if (creep.memory.role === 'harvester') {
                    roles.harvesters++;
                } else if (creep.memory.role === 'upgrader') {
                    roles.upgraders++;
                } else if (creep.memory.role === 'builder') {
                    roles.builders++;
                } else if (creep.memory.role === 'miner') {
                    roles.miners++;
                } else if (creep.memory.role === 'lorry') {
                    roles.lorries++;
                } else if (creep.memory.role === 'repairer') {
                    roles.repairers++;
                } else if (creep.memory.role === 'roadbuilder') {
                    roles.roadbuilders++;
                } else if (creep.memory.role === 'extractor') {
                    roles.extractors++;
                } else if (creep.memory.role === 'defenseBuilder') {
                    roles.defenseBuilder++;
                }
            }
        }
        return roles
    }

    getDesiredCreeps() {
        const self = this;

        if (self.memory.existingRoles['harvesters'] < self.room.sources.length) {
            return 'harvester'
        }

        if (self.memory.existingRoles['miners'] < self.room.sources.length) {
            return 'miner'
        }

        if (self.memory.existingRoles['builders'] < 1) {
            return 'builder'
        }

        if (self.memory.existingRoles['lorries'] < 2) {
            return 'lorry'
        }

        if (self.memory.existingRoles['upgraders'] < 1) {
            return 'upgrader'
        }

        if (self.memory.existingRoles['repairers'] < 1) {
            return 'repairer'
        }


        if (self.memory.existingRoles['defenseBuilders'] < 1) {
            return 'defenseBuilder'
        }

        return undefined
    }
}
