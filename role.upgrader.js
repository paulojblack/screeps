let Role = require('class.role');

module.exports = {
    run: function() {
        try {
            let creep = this;
            let role = new Role();

            creep.memory.working = role.setWorkingState(creep)

            if (creep.memory.working === true) {
                return role.depositEnergy(creep, {
                    depositTo: 'controller'
                })
            } else {
                return role.getEnergy(creep, {
                    gatherFrom: 'container'
                });
            }
        } catch(e) {
            console.log(e);
        }
    }
};
