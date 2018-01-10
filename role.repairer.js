var Role = require('class.role');

module.exports = {
    run: function() {
        let creep = this;
        let role = new Role();

        creep.memory.working = role.setWorkingState(creep)

        if (this.memory.working == true) {
            return role.depositEnergy(creep, {
                depositTo: 'repair_site'
            })
        } else {
            return role.getEnergy(creep, {
                gatherFrom: 'container'
            });
        }
    }
};
