let Role = require('class.role');

module.exports = {
    run: function () {
        let creep = this;
        let role = new Role();

        creep.memory.working = role.setWorkingState(creep);

        if (creep.memory.working === true) {
            return role.depositEnergy(creep, {
                depositTo: 'living'
            })
        } else {
            return role.getEnergy(creep, {
                gatherFrom: 'anything'
            })
        }
    }
};
