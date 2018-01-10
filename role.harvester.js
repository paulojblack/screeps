var roleBuilder = require('role.builder');
let Role = require('class.role')
module.exports = {
    run: function() {
        let creep = this;
        let role = new Role();

        creep.memory.working = role.setWorkingState(creep);
        creep.say('h')
        if (creep.memory.working === true) {
            return role.depositEnergy(creep, {
                depositTo: 'living'
            })
        } else {
            return role.getEnergy(creep, {
                gatherFrom: 'source'
            });
        }
    }
}
