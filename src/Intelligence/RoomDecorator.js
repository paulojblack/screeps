const roomNeighbors = require('Intelligence.private.roomNeighbors');

module.exports = class RoomDecorator {
    constructor(room, roomType) {
        this.room = room;
        this.memory = room.memory;
        this.memory.creepsList = this.getCreepsFromRoom()
        this.memory.roomPopulation = this.getRoomPopulation();
        this.memory.nextCreep = this.getDesiredCreeps()

        if (this.memory.neighbors === undefined) {
            this.memory.neighbors = roomNeighbors(room);
        }

        const ctrlLvl = this.room.controller.level
        if (ctrlLvl <= 3) {
            this.memory.stage = 'new'
        } else if (ctrllvl <= 6) {
            this.memory.stage = 'stable'
        } else {
            this.memory.stage = 'advanced'
        }
    }

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
    getRoomPopulation() {
        let roles = {
            builder: 0,
            harvester: 0,
            upgrader: 0,
            miner: 0,
            lorry: 0,
            scouts: 0,
            repairer: 0,
            defenseBuilders: 0,
            grunts: 0,
            roadbuilders: 0,
            claimnant: 0
        }

        for(let name in Game.creeps) {

            let creep = Game.creeps[name];

            if(creep.memory.home === this.room.name){
                if (creep.memory.role === 'harvester') {
                    roles.harvester++;
                } else if (creep.memory.role === 'upgrader') {
                    roles.upgrader++;
                } else if (creep.memory.role === 'builder') {
                    roles.builder++;
                } else if (creep.memory.role === 'miner') {
                    roles.miner++;
                } else if (creep.memory.role === 'lorry') {
                    roles.lorry++;
                } else if (creep.memory.role === 'repairer') {
                    roles.repairer++;
                } else if (creep.memory.role === 'scout') {
                    roles.scouts++;
                } else if (creep.memory.role === 'claimnant') {
                    roles.claimnant++;
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
        this.memory.roomPopulation = this.getRoomPopulation()

        if (this.memory.roomPopulation['harvester'] < 2 * this.room.sources.length) {
            return 'harvester'
        }

        if (this.memory.roomPopulation['miner'] < Math.max(this.room.sources.length - 1, 1)) {
            return 'miner'
        }

        if (this.memory.roomPopulation['lorry'] < 1) {
            return 'lorry'
        }

        if (this.memory.roomPopulation['builders'] < 2) {
            if (this.room.constructionSites.length > 2) {
                return 'builder'
            } else if (this.memory.roomPopulation['builders'] < 1) {
                return 'builder'
            }
        }

        if (this.memory.roomPopulation['miner'] < this.room.sources.length) {
            return 'miner'
        }

        if (this.memory.roomPopulation['lorry'] < 2) {
            return 'lorry'
        }

        if (this.memory.roomPopulation['upgrader'] < 1) {
            return 'upgrader'
        }

        if (this.memory.roomPopulation['repairer'] < 1) {
            return 'repairer'
        }

        if (this.memory.roomPopulation['scouts'] < this.room.childRooms.length) {
            return 'scout'
        }

        if (this.memory.roomPopulation['defenseBuilders'] < 1) {
            return 'defenseBuilder'
        }

        if (this.memory.roomPopulation['miner'] < (this.room.sources.length + this.room.childSources.length)) {
            return 'miner'
        }

        if (this.memory.roomPopulation['lorry'] < (this.room.sources.length + this.room.childSources.length)) {
            return 'lorry'
        }

        if (this.memory.roomPopulation['builders'] < (this.room.sources.length + this.room.childSources.length)) {
            return 'builder'
        }

        if (this.memory.roomPopulation['claimnant'] < (this.room.childRooms.length)) {
            return 'claimnant'
        }

        if (this.memory.roomPopulation['grunts'] < 1) {
            return 'grunt'
        }

        return undefined
    }

}
