Room.prototype.creepsByRole = {
    harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
    upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
    builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
    repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'),
    suppliers: _.filter(Game.creeps, (creep) => creep.memory.role == 'supplier'),
    defense_engineers: _.filter(Game.creeps, (creep) => creep.memory.role == 'defense_engineer')
};
