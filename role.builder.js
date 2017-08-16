var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function() {
        // try {
            // if target is defined and this is not in target room
            if (this.memory.target != undefined && this.room.name != this.memory.target) {
                // find exit to target room
                let exit = this.room.findExitTo(this.memory.target);
                // move to exit
                this.moveTo(this.pos.findClosestByRange(exit));

                return;
            }

            if (this.memory.working === true && this.carry.energy === 0) {
                this.memory.working = false;
            }
            // if this is harvesting energy but is full
            else if (this.memory.working !== true && this.carry.energy === this.carryCapacity) {
                this.memory.working = true;
            }

            // if this is supposed to complete a constructionSite
            if (this.memory.working == true) {
                let constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                //TODO generalize
                //check adjacent room
                if (constructionSite === undefined) {
                    constructionSite = Game.rooms['E12N39'].find(FIND_CONSTRUCTION_SITES)
                }
            
                if (constructionSite !== undefined && this.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    this.moveTo(constructionSite);
                }
                else {
                    roleUpgrader.run.call(this);
                }
            } else {
                this.getNewEnergy(true, true);
            }
        // } catch(e) {
        //     console.log(e)
        // }
    }
};
