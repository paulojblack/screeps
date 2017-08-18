let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
module.exports = {
    run: function() {

        if (this.memory.working == true && this.carry.energy == 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy == this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working === true) {
            if (this.room.name === this.memory.home) {
                let structure = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });

                    if (structure === undefined) {
                        structure = this.room.storage;
                        if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    } else {
                        if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                } else {
                    var exit = this.room.findExitTo(Game.rooms[this.memory.home]);
                    this.moveTo(this.pos.findClosestByRange(exit));
                }
            } else {
                if (this.room.name === this.memory.target) {
                    let source = this.room.containers[0];

                    if (source) {
                        if (this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            return this.moveTo(source);
                        }
                    }

                    //No usable container
                    source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

                    if (source) {
                        if (this.harvest(source) !== 0) {
                            return this.moveTo(source);
                        }
                    }

                    roleRepairer.run.call(this)
                } else {
                    var exit = this.room.findExitTo(this.memory.target);
                    this.moveTo(this.pos.findClosestByRange(exit));
                }
            }
        }
    };
