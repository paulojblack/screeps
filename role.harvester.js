var roleBuilder = require('role.builder');
let Role = require('class.role')
module.exports = {
    run: function() {
        let creep = this;
        let role = new Role();
        console.log('getting setting')
        // role.workingState = '123'
        // console.log(role.workingState)
        console.log('exit gs')

        console.log('First invocation', role.fixWorkingState(creep))
        // creep.memory.working = role.fixWorkingState(creep)
        console.log(JSON.stringify(creep))
        console.log('did it error here')
        console.log('in main role',creep.memory.working)
        if (creep.memory.working === true) {
            let structure = role.getClosestLivingTower(creep, {
                structureType: 'living'
            })
            // console.log(structure)
            if (structure !== undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(structure);
                }
            }
            // } else {
            //     return roleBuilder.run.call(creep);
            // }
        } else {
            return creep.getEnergy(true, true);
        }
    }
}
