var reporter = {
    standardRoom: function(room, creepsByRole) {
        new RoomVisual(room).text('Harvesters: ' + creepsByRole.harvesters.length, 2, 0, {color: '#008620'});
        new RoomVisual(room).text('Upgraders: ' + creepsByRole.upgraders.length, 2, 1, {color: '#008620'});
        new RoomVisual(room).text('Builders: ' + creepsByRole.builders.length, 2, 2, {color: '#008620'});
        new RoomVisual(room).text('Repairers: ' + creepsByRole.repairers.length, 2, 3, {color: '#008620'});
        new RoomVisual(room).text('Suppliers: ' + creepsByRole.suppliers.length, 2, 4, {color: '#008620'});
    }
}

module.exports = reporter;
