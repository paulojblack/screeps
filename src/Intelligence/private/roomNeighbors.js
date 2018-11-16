module.exports = function(room) {
    let [fullRoomName, latDir, latVal, longDir, longVal] = room.name.match(/([A-Z])(\d*)([A-z])(\d*)$/)
    let neighbors = {
        left: {
            accessible: room.find(FIND_EXIT_LEFT).length > 0 ? true : false,
            name: getLeftNeighborRoomName(latDir, latVal, longDir, longVal)
        },
        right: {
            accessible: room.find(FIND_EXIT_RIGHT).length > 0 ? true : false,
            name: getRightNeighborRoomName(latDir, latVal, longDir, longVal)
        },
        top: {
            accessible: room.find(FIND_EXIT_TOP).length > 0 ? true : false,
            name: getTopNeighborRoomName(latDir, latVal, longDir, longVal)
        },
        bottom: {
            accessible: room.find(FIND_EXIT_BOTTOM).length > 0 ? true : false,
            name: getBottomNeighborRoomName(latDir, latVal, longDir, longVal)
        }
    };
    
    neighbors.left.visible =  Game.rooms[neighbors.left.name] !== undefined ? true : false;
    neighbors.right.visible = Game.rooms[neighbors.right.name] !== undefined ? true : false;
    neighbors.top.visible = Game.rooms[neighbors.top.name] !== undefined ? true : false;
    neighbors.bottom.visible = Game.rooms[neighbors.bottom.name] !== undefined ? true : false;

    return neighbors
}

let getLeftNeighborRoomName = function(latDir, latVal, longDir, longVal) {
    //Flip cardinal direction if at the border
    if (latVal === 0) {
        return ['W', latVal, longDir, longVal].join('')
    }
    if (latDir === 'E') {
        return ['W', latVal + 1, longDir, longVal].join('')
    }
    if (latDir === 'W') {
        return ['W', latVal - 1, longDir, longVal].join('')
    }
}

let getRightNeighborRoomName = function(latDir, latVal, longDir, longVal) {
    //Flip cardinal direction if at the border
    if (latVal === 0) {
        return ['E', latVal, longDir, longVal].join('')
    }
    if (latDir === 'W') {
        return [latDir, latVal + 1, longDir, longVal].join('')
    }
    if (latDir === 'E') {
        return [latDir, latVal - 1, longDir, longVal].join('')
    }
}

let getTopNeighborRoomName = function(latDir, latVal, longDir, longVal) {
    //Flip cardinal direction if at the border
    if (longVal === 0) {
        return ['N', latVal, longDir, longVal].join('')
    }
    if (longDir === 'N') {
        return [latDir, latVal, longDir, longVal + 1].join('')
    }
    if (longDir === 'S') {
        return [latDir, latVal - 1, longDir, longVal - 1].join('')
    }
}

let getBottomNeighborRoomName = function(latDir, latVal, longDir, longVal) {
    //Flip cardinal direction if at the border
    if (longVal === 0) {
        return ['S', latVal, longDir, longVal].join('')
    }
    if (longDir === 'S') {
        return [latDir, latVal, longDir, longVal + 1].join('')
    }
    if (longDir === 'S') {
        return [latDir, latVal, longDir, longVal - 1].join('')
    }
}
