var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function() {
        try {
            console.log(this)
            console.log(this.pos)
            console.log(this.memory.target)
            console.log(this.memory.working)
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
                if (this.room.name === this.memory.target) {
                    let constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    console.log(constructionSite)
                    if (constructionSite !== undefined && this.build(constructionSite) === ERR_NOT_IN_RANGE) {
                        return this.moveTo(constructionSite);
                    }
                } else {
                    var exit = this.room.findExitTo(Game.rooms[this.memory.target]);

                    return this.moveTo(this.pos.findClosestByRange(exit));
                }
            } else {
                if (this.room.name === this.memory.target) {
                    if (this.memory.target !== this.memory.home) {
                        return this.getNewEnergy(false, true);
                    } else {
                        return this.getNewEnergy(true, true);
                    }
                } else {
                    var exit = this.room.findExitTo(this.memory.target);

                    return this.moveTo(this.pos.findClosestByRange(exit));
                }
            }
        } catch(e) {
            console.log('Builder error')
            console.log(this)
            console.log(e)
        }
    }
};
