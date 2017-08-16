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
                        || s.structureType == STRUCTURE_EXTENSION)
                        // || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                    });

                    if (structure == undefined) {
                        structure = this.room.storage;
                    }

                    if (structure != undefined) {
                        if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                }
                else {
                    let constructionSites = this.room.find(FIND_CONSTRUCTION_SITES);

                    // if (constructionSites) {
                    //     roleBuilder.run.call(this)
                    // } else {
                    // try {
                    //     roleRepairer.run.call(this)
                    // } catch(e) {
                    //     console.log('Long Harvester running repair failed');
                    //     console.log(e);
                    // }

                    var exit = this.room.findExitTo(this.memory.home);
                    this.moveTo(this.pos.findClosestByRange(exit));
                }
            }
            else {
                if (this.room.name == this.memory.target) {
                    let source =  this.room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                        i.store[RESOURCE_ENERGY] >= 0
                    })[0];

                    if (source) {
                        if (this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(source);
                        }
                    } else {
                        source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
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
