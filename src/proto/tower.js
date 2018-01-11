StructureTower.prototype.defend = function() {
    // console.log(JSON.stringify(this))
    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target) {
        this.attack(target);
    } else {
        target = this.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax
        });
        this.heal(target);
    }

    if (target) {
        this.attack(target);
    } else {
        target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && (
                s.structureType === STRUCTURE_WALL ||
                s.structureType === STRUCTURE_RAMPART)
        });
    }

    if (target) {
        //slow things down a bit
        if (Game.time % 5 === 0) {
            this.repair(target);
        }
    }
};

module.exports = {}
