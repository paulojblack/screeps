var roleBuilder = require('role.builder');
module.exports = {
    run: (creep) => {
        let flag;
        let target;

        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter:(enemy) => {
                for(let part in enemy.body){
                    if(part.type == ATTACK || part.type == RANGED_ATTACK || part.type == HEAL){
                        return true;
                    }
                }
                return false;
            }
        });

        if (target) {
            if (creep.attack(target) != OK){
                creep.moveTo(target);
            }

            return;
        // } else if (creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)) {
        //     target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        //
        //     if(target){
        //         if(creep.attack(target) == ERR_NOT_IN_RANGE){
        //             creep.moveTo(target);
        //         }
        //     }
        } else {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                //These targets are specifically enemies WITHOUT any warfare body parts.
                if(creep.attack(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            } else if (Game.flags.Grunt) {
                //places to be
                flag = Game.flags['Grunt']
            } else {
                //nothin to do
                flag = Game.flags["Rally_"+creep.memory.home];
            }

            if (flag && !creep.pos.isEqualTo(flag.pos)) {
                creep.moveTo(flag);
            }
        }
    }
};
