module.exports = {
    /*
    Assigns permanent values to creeps to allow control of sub-groups of a certain role
     */
    assignIdentity: (count, creepRole) => {
        var desiredIdentities,
            currentIdentities;

        desiredIdentities = Array.apply(null, Array(count)).map((val, ind) => {return ind;})

        currentIdentities = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole).map((fella) => {
            return fella.memory.identity
        });

        return Math.ceil(Math.random() * 100)//_.xor(desiredIdentities, currentIdentities)[0]
    },
    /*
    Parses values bound by index to shorten long body part arrays
     */
    bodyParser: (desiredParts) => {
        var partMap = {
                0: WORK,
                1: CARRY,
                2: MOVE
            };

        return _.flatten(desiredParts.map((val, ind) => {
            return Array(val).fill(partMap[ind])
        }));
    },
    /*
    Controls unit production depending on situation. Prevents overproduction of non-resource gathering units.
     */
    getDynamicUnitCount: (role) => {
        var creepsByRole = {
            harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
            upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
            builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
            repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'),
            suppliers: _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' || creep.memory.role == 'supplier')
        },
        DEFAULT_CONFIGURATION = {
            'harvester': 7,
            'upgrader':2,
            'builder': 0,
            'repairer': 1,
            'supplier': 0,
            'defense_engineer': 0
        },
        HARVESTER_MINIMUM = {
            'harvester': DEFAULT_CONFIGURATION['harvester'],
            'upgrader': 1,
            'builder': 0,
            'repairer': 0,
            'supplier': 0,
            'defense_engineer': 0
        }

        if (creepsByRole.harvesters.length < DEFAULT_CONFIGURATION['harvester']) {
            return HARVESTER_MINIMUM[role]
        }

        return DEFAULT_CONFIGURATION[role]
    }
}
