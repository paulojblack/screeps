module.exports = {
    run: function() {
        console.log('im an ugprader')
        try {
            if (this.memory.working === true && this.carry.energy === 0) {

                this.memory.working = false;
            }
            else if (this.memory.working !== true && this.carry.energy === this.carryCapacity) {
                this.memory.working = true;
            }
            // if this is supposed to transfer energy to the controller
            if (this.memory.working === true) {
                // instead of upgraderController we could also use:
                if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                    this.moveTo(this.room.controller);
                }
            }
            else {
                this.getEnergy(true, true);
            }
        } catch(e) {
            console.log(e);
        }
    }
};
