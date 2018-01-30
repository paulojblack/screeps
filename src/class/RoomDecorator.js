const states = require('util.constants').roomStates;
const roomNeighbors = require('class.private.roomNeighbors');

module.exports = class RoomDecorator {
    constructor(room) {
        this.room = room;
        this.memory = room.memory;

        this.memory.creepsList = this.getCreepsFromRoom()
        this.memory.existingRoles = this.getExistingRoomRoles();
        this.memory.nextCreep = this.getDesiredCreeps()
        this.memory.neighbors = roomNeighbors(room);
    }

    /**
     * Get array of creep object with $creep.memory.target === room.name (string)
     * @return {[type]} [description]
     */
    getCreepsFromRoom() {
        const self = this;
        let roomCreeps = [];

        for (const name in Game.creeps) {
            if (Game.creeps[name].memory.home === this.room.name) {
                roomCreeps.push(Game.creeps[name])
            }
        }

        return roomCreeps

    }

    getExistingRoomRoles() {
        const self = this;

        let roles = {
            builders: 0,
            harvesters: 0,
            upgraders: 0,
            miners: 0,
            lorries: 0,
            scouts: 0,
            repairers: 0,
            defenseBuilders: 0,
            grunts: 0,
            roadbuilders: 0,
            claimnants: 0
        }

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];

            if(creep.memory.home === this.room.name){
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
                } else if (creep.memory.role === 'scout') {
                    roles.scouts++;
                } else if (creep.memory.role === 'claimnant') {
                    roles.claimnants++;
                } else if (creep.memory.role === 'defenseBuilder') {
                    roles.defenseBuilders++;
                } else if (creep.memory.role === 'grunt') {
                    roles.grunts++;
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

        if (self.memory.existingRoles['miners'] < Math.max(self.room.sources.length - 1, 1)) {
            return 'miner'
        }

        if (self.memory.existingRoles['lorries'] < 1) {
            return 'lorry'
        }

        if (self.memory.existingRoles['builders'] < 2) {
            if (self.room.constructionSites.length > 2) {
                return 'builder'
            } else if (self.memory.existingRoles['builders'] < 1) {
                return 'builder'
            }
        }

        if (self.memory.existingRoles['miners'] < self.room.sources.length) {
            return 'miner'
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

        if (self.memory.existingRoles['scouts'] < self.room.childRooms.length) {
            return 'scout'
        }

        if (self.memory.existingRoles['defenseBuilders'] < 1) {
            return 'defenseBuilder'
        }

        if (self.memory.existingRoles['miners'] < (self.room.sources.length + self.room.childSources.length)) {
            return 'miner'
        }

        if (self.memory.existingRoles['lorries'] < (self.room.sources.length + self.room.childSources.length)) {
            return 'lorry'
        }

        if (self.memory.existingRoles['builders'] < (self.room.sources.length + self.room.childSources.length)) {
            return 'builder'
        }

        if (self.memory.existingRoles['claimnants'] < (self.room.childRooms.length)) {
            return 'claimnant'
        }

        if (self.memory.existingRoles['grunts'] < 1) {
            return 'grunt'
        }

        return undefined
    }

    // getRoomNeighbors() {
    //     let self = this;
    //     let exits = {
    //         left: {
    //
    //         },
    //         right: {
    //
    //         },
    //         top: {
    //
    //         },
    //         bottom: {
    //
    //         },
    //     };
    //
    //     // if (self.room.find(FIND_EXIT_LEFT).length) {
    //     //     exits.push('LEFT')
    //     // }
    //     // if (self.room.find(FIND_EXIT_TOP).length) {
    //     //     exits.push('TOP')
    //     // }
    //     // if (self.room.find(FIND_EXIT_RIGHT).length) {
    //     //     exits.push('RIGHT')
    //     // }
    //     // if (self.room.find(FIND_EXIT_BOTTOM).length) {
    //     //     exits.push('BOTTOM')
    //     // }
    //
    //     return exits;
    // }

}
