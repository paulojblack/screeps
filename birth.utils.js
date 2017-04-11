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
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        DEFAULT_CONFIGURATION = {
            'harvester': 7,
            'upgrader':5,
            'builder': 0,
            'repairer': 1,
            'supplier': 0,
            'defense_engineer': 1
        },
        HARVESTER_MINIMUM = {
            'harvester': DEFAULT_CONFIGURATION['harvester'],
            'upgrader': 1,
            'builder': 0,
            'repairer': 0,
            'supplier': 0,
            'defense_engineer': 0
        }

        if (harvesters.length < DEFAULT_CONFIGURATION['harvester']) {
            console.log('HARVESTER EMERGENCY ACTIVATED')
            return HARVESTER_MINIMUM[role]
        } else {
            return DEFAULT_CONFIGURATION[role]
        }
    }
}
