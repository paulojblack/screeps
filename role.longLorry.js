module.exports = {
    run: function() {
        this.say('ll')
        if (this.memory.working === true && this.carry.energy === 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && this.carry.energy === this.carryCapacity) {
            this.memory.working = true;
        }

        // if this is supposed to transfer energy to a structure
        if (this.memory.working === true) {
            let targetContainer = this.room.storage;

            if (targetContainer === undefined) {
                targetContainer = this.room.storage;
                if (this.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targetContainer);
                }
            } else {
                if (this.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targetContainer);
                }
            }
        } else {
                let sourceContainer = this.pos.findClosestByRange(this.room.containers, {
                    filter: s => s.store[RESOURCE_ENERGY] > 300
                });

                if (sourceContainer) {
                    if (this.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(sourceContainer);
                    }
                }
            }
        }
    };
