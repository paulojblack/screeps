var roleUpgrader = require('role.upgrader');
let Role = require('class.role')
module.exports = {
    run: function() {
        try {
            let creep = this;
            let role = new Role();

            creep.memory.working = role.setWorkingState(creep);
            creep.say('b')

            if (creep.memory.working == true) {
                return role.depositEnergy(creep, {
                    depositTo: 'construction'
                })
            } else {
                return role.getEnergy(creep, {
                    gatherFrom: 'container'
                });
            }
        } catch(e) {
            console.log('Builder error')
            console.log(e)
        }
    }
};
