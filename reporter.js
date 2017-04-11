var reporter = {
    standardRoom: function(room, thisRoom) {
        new RoomVisual(room).text('Harvesters: ' + thisRoom.creepsByRole.harvesters.length, 2, 0, {color: '#008620'});
        new RoomVisual(room).text('Upgraders: ' + thisRoom.creepsByRole.upgraders.length, 2, 1, {color: '#008620'});
        new RoomVisual(room).text('Builders: ' + thisRoom.creepsByRole.builders.length, 2, 2, {color: '#008620'});
        new RoomVisual(room).text('Repairers: ' + thisRoom.creepsByRole.repairers.length, 2, 3, {color: '#008620'});
        new RoomVisual(room).text('Suppliers: ' + thisRoom.creepsByRole.suppliers.length, 2, 4, {color: '#008620'});
        new RoomVisual(room).text('Defense Engineers: ' + thisRoom.creepsByRole.defense_engineers.length, 2, 5, {color: '#008620'});
    }
}

module.exports = reporter;
