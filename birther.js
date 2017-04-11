var config = require('birth.config'),
    h = config.HARVESTER,
    u = config.UPGRADER,
    b = config.BUILDER,
    r = config.REPAIRER,
    s = config.SUPPLIER,
    de = config.DEFENSE_ENGINEER;

module.exports = {
    simpleBirthing: function(creepsByRole) {
        if(creepsByRole.harvesters.length < h.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                h.BODY,
                undefined,
                h.MEM
            );
            console.log('Spawning new harvester');
        }

        if (creepsByRole.upgraders.length < u.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                u.BODY,
                undefined,
                u.MEM
            );
            console.log('Spawning new upgrader');
        }

        if (creepsByRole.builders.length < b.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                b.BODY,
                undefined,
                b.MEM
            );
            console.log('Spawning new builder');
        }

        if (creepsByRole.repairers.length < r.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                r.BODY,
                undefined,
                r.MEM
            );
            console.log('Spawning new repairer');
        }

        if (creepsByRole.suppliers.length < s.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                s.BODY,
                undefined,
                s.MEM
            );
            console.log('Spawning new supplier');
        }

        if (creepsByRole.defense_engineers.length < de.COUNT) {
            Game.spawns['Fatherland'].createCreep(
                de.BODY,
                undefined,
                de.MEM
            );
            console.log('Spawning new defense engineer');
        }

        if(Game.spawns['Fatherland'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Fatherland'].spawning.name];
            Game.spawns['Fatherland'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Fatherland'].pos.x + 1,
                Game.spawns['Fatherland'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}
