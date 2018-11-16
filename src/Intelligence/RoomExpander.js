module.exports = class RoomExpander {
    constructor(room) {
        this.room = room;
        this.memory = room.memory;
    }

    expand() {
        let self = this;
        let parentRoom = self.room;
        let neighbors = parentRoom.memory.neighbors;

        let visible = _.filter(neighbors, function(n) {
            return n.visible === false && n.accessible === true;
        })

        if (!visible || !visible.length) {
            return undefined
        }

        let newColony = visible[0];
        let parentOffCenter = new RoomPosition(22, 22, parentRoom.name)

        let stagingFlag = parentOffCenter.lookFor(LOOK_FLAGS);

        if (!stagingFlag || stagingFlag.length === 0) {
            console.log('Create staging flag for room', newColony.name, 'in room', parentRoom.name)
            return parentOffCenter.createFlag([parentRoom.name, newColony.name, 'colonize'].join())
        }
    }

    moveStagingFlag(stagingFlag) {
        let self = this;
        let parentRoom = self.room;
        let newColony = stagingFlag.name.split(',')[1];
        let newFlagPosition = new RoomPosition(25, 25, newColony);

        try {
            console.log('Moving staging flag from', parentRoom.name, 'to', newColony)
            return stagingFlag.setPosition(newFlagPosition)
        } catch (e) {
            console.log(e.stack)
        }

    }

}
