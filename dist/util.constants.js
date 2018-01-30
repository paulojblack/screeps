exports.farmRooms = {
    "E12N39": 'fake'
}

exports.myRooms = {
    W3N8: {
        type:'HOMEBASE'
    },
    W2N8: {
        type:'COLONY'
    },
    W1N8: {
        type:'COLONY'
    },
    W3N7: {
        type: 'RAID',
        parent: 'W3N8'
    },
    //Pprod rooms
    W22N48:{
        type: 'HOMEBASE'
    },
    W21N48:{
        type: 'HOMEBASE'
    }
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
