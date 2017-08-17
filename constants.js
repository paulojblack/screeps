exports.farmRooms = {
    "E12N39": 'fake'
}

exports.myRooms = {
    E11N39: {
        type: 'base'
    },
    E12N39: {
        type: 'scavenge',
        companionRoom: 'E11N39',
        localOrder: {
            repairer: 1,
            longDistanceHarvester: 1,
            grunt: 2,
            miner: 1
        }
    },
    E12N38: {
        type: 'scavenge',
        companionRoom: 'E11N39',
        localOrder: {
            repairer: 1,
            longDistanceHarvester: 1,
            grunt: 1
        }
    }
}
