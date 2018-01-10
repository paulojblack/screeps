exports.farmRooms = {
    "E12N39": 'fake'
}

exports.myRooms = {
    W6N1: {
        type: 'base'
    }
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
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2
        }
    },
    upgrader: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2
        }
    },
    repairer: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2
        }
    },
    builder: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 2
        }
    },
    miner: {
        count: 0,
        partsRatio: {
            WORK: 0.5
        },
        partsLiteral: {
            MOVE: 1
        }
    },
    lorry: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 1
        }
    },
    longLorry: {
        count: 0,
        partsRatio: {
            CARRY: 0.5,
            MOVE: 0.5
        },
        partsLiteral: {
            WORK: 1
        }
    }
    // wallRepairer: {
    //     count: 0,
    //     partsRatio: {
    //         CARRY: 0.5,
    //         MOVE: 0.5
    //     },
    //     partsLiteral: {
    //         WORK: 1
    //     }
    // },
    // grunt: {
    //     count: 0,
    //     partsRatio: {
    //         CARRY: 0.5,
    //         MOVE: 0.5
    //     },
    //     partsLiteral: {
    //         WORK: 1
    //     }
    // }
}
