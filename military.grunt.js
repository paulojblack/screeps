var roleBuilder = require('role.builder');
module.exports = {

    run: function() {
        let flag;
        let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (target) {
            if (this.attack(target) === ERR_NOT_IN_RANGE){
                this.moveTo(target);
            }

            return;
        } else if (this.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)) {
            target = this.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)

            if(target && target.structureType !== STRUCTURE_CONTROLLER ){
                if(this.attack(target) === ERR_NOT_IN_RANGE){

                    this.moveTo(target);
                }
                return;
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
                flag = Game.flags["Rally_"+this.memory.target];
            }

            if (flag && !this.pos.isEqualTo(flag.pos)) {
                this.moveTo(flag);
            }
        }
    }
};
