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
                let structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
                }
                else {
                    var exit = this.room.findExitTo(Game.rooms[this.memory.home]);
                    this.moveTo(this.pos.findClosestByRange(exit));
                }
            } else {
                if (this.room.name === this.memory.target) {
                    let source = this.room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                        i.store[RESOURCE_ENERGY] > 0
                    })[0];

                    if (source) {
                        if (this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(source);
                        }
                    } else {
                        source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

                        if (this.harvest(source) !== 0) {
                            this.moveTo(source);
                        }
                    }
                }
                else {
                    var exit = this.room.findExitTo(this.memory.target);
                    this.moveTo(this.pos.findClosestByRange(exit));
                }
            }
        }
    };
