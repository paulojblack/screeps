exports.farmRooms = {
    "E12N39": 'fake'
}

exports.myRooms = {
    W3N8: 'OWNED_BASE',
    W22N48: {
        type: 'base'
    }
}

exports.roomStates = {
    STATE_OWNED_HOME: 1,
    STATE_START: 2,
    STATE_MED: 3,
    STATE_END: 4,
    STATE_PANIC: 0
}


//Keys are the possible levels a room controller can have, each entry is the desired number of that building
//to construct
exports.constructionPlanner = {
    1: {},
    2: {
        STRUCTURE_EXTENSION: 5,
        STRUCTURE_CONTAINER: 3
    },
    3: {
        STRUCTURE_EXTENSION: 10,
        STRUCTURE_CONTAINER: 3,
        STRUCTURE_TOWER: 1
    }
}

exports.roleMap = {
    harvester: {
        count: 2,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2,
            CARRY: 2,
            MOVE: 2
        }
    },
    miner: {
        count: 0,
        partsRatio: {

        },
        partsLiteral: {
            MOVE: 1,
            WORK: 5
        }
    },
    lorry: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2,
            CARRY:2,
            MOVE: 2
        }
    },
    upgrader: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2,
            CARRY: 2,
            MOVE: 2
        }
    },
    repairer: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2,
            CARRY: 2,
            MOVE: 2
        }
    },
    builder: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2,
            CARRY:2,
            MOVE: 2
        }
    }
}

exports.partCosts = {
    work: 100,
    move: 50,
    carry: 50,
    attack: 80,
    ranged_attack: 150,
    heal: 250,
    claim: 600,
    tough: 10
}


//unused
var getBodyConstant = function(value) {
    switch (value) {
        case 'WORK':
            return WORK
        case 'MOVE':
            return MOVE
        case 'CARRY':
            return CARRY
        case 'ATTACK':
            return ATTACK
        case 'RANGED_ATTACK':
            return RANGED_ATTACK
        case 'HEAL':
            return HEAL
        case 'CLAIM':
            return CLAIM
        case 'TOUGH':
            return TOUGH
    }

}
