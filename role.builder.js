var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function() {
        try {
            // if target is defined and this is not in target room
            if (this.memory.target !== undefined && this.room.name !== this.memory.target) {
                let exit = this.room.findExitTo(Game.rooms[this.memory.target]);
                this.moveTo(this.pos.findClosestByRange(exit));

                return
            }

            if (this.memory.working === true && this.carry.energy === 0) {
                this.memory.working = false;
            } else if (this.memory.working !== true && this.carry.energy === this.carryCapacity) {
                this.memory.working = true;
            }

            if (this.memory.working == true) {
                let constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                if (constructionSite !== undefined && this.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    this.moveTo(constructionSite);
                }
                else {
                    roleUpgrader.run.call(this);
                }
            } else {
                this.getNewEnergy(true, true);
            }
        } catch(e) {
            console.log('Builder error')
            console.log(this)
            console.log(e)
        }
    }
};
