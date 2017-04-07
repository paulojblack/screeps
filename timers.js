module.exports = {
    ten: function() {
        if(Game.time % 10 === 0) {
            // Blow away dead creeps
            for(var name in Memory.creeps) {
                if(!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
        }
    },
    twohundred: function(id) {

    }

}
