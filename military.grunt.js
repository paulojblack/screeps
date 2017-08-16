var roleBuilder = require('role.builder');
module.exports = {
    run: function() {
        let flag;
        let target;
        // console.log(Game.getObjectById('59940ff7bbe0903fb0c2d4c7'))
        // this.attack(Game.getObjectById('59940ff7bbe0903fb0c2d4c7'))
        target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
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
            console.log(target)
            if (this.attack(target) != OK){
                console.log(target)
                this.moveTo(target);
            }

            return;
        } else if (this.pos.findClosestByRange(FIND_STRUCTURES)) {
            // console.log(this.pos.findClosestByRange(FIND_STRUCTURES))
            // console.log(this.body.forEach((i) => console.log(JSON.stringify(i))))
            target = Game.getObjectById('59940ffaa0ada570902c99f3')//this.pos.findClosestByRange(FIND_STRUCTURES);
            // console.log(target)
            if(target){
                if(this.attack(target) == ERR_NOT_IN_RANGE){

                    this.moveTo(target);
                }
            }
        } else {
            target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                //These targets are specifically enemies WITHOUT any warfare body parts.
                if(this.attack(target) == ERR_NOT_IN_RANGE){
                    this.moveTo(target);
                }
            } else if (Game.flags.Grunt) {
                //places to be
                flag = Game.flags['Grunt']
            } else {
                //nothin to do
                flag = Game.flags["Rally_"+this.memory.home];
            }

            if (flag && !this.pos.isEqualTo(flag.pos)) {
                this.moveTo(flag);
            }
        }
    }
};
