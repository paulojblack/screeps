module.exports = {
    run: function() {
        this.say(this.memory.role)
        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        if (this.memory.working === true) {
            // Send to empty containers near controller
            let target = this.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });
            console.log(target)

            if (target && target.store[RESOURCE_ENERGY] <= target.storeCapacity) {

                if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else {
                if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            }
        } else {
                let source = this.room.find(FIND_MY_SPAWNS)[0].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] > 100
                });

                if (source) {
                    if (this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(source);
                    }
                }
            }
        }
    };
