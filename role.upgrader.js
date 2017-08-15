module.exports = {
    run: (creep) => {
        try {
            if (creep.memory.working === true && creep.carry.energy === 0) {

                creep.memory.working = false;
            }
            else if (creep.memory.working !== true && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
            // if creep is supposed to transfer energy to the controller
            if (creep.memory.working === true) {
                // instead of upgraderController we could also use:
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                creep.getEnergy(creep, true, true);
            }
        } catch(e) {
            console.log(e);
        }
    }
};
