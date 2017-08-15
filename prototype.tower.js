StructureTower.prototype.defend = (tower) => {
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
        tower.attack(target);
    }
};
