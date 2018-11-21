module.exports = class RoomExpander {
    constructor(room) {
        this.room = room;
        this.memory = room.memory;
    }

    expand() {
        const self = this;
        const parentRoom = self.room;
        const neighbors = parentRoom.memory.neighbors;

        const visible = _.filter(neighbors, n => n.visible === false && n.accessible === true);

        if (!visible || !visible.length) {
            return undefined;
        }

        const newColony = visible[0];
        const parentOffCenter = new RoomPosition(22, 22, parentRoom.name);

        const stagingFlag = parentOffCenter.lookFor(LOOK_FLAGS);

        if (!stagingFlag || stagingFlag.length === 0) {
            console.log('Create staging flag for room', newColony.name, 'in room', parentRoom.name);
            return parentOffCenter.createFlag([parentRoom.name, newColony.name, 'colonize'].join());
        }
    }

    moveStagingFlag(stagingFlag) {
        const self = this;
        const parentRoom = self.room;
        const newColony = stagingFlag.name.split(',')[1];
        const newFlagPosition = new RoomPosition(25, 25, newColony);

        try {
            console.log('Moving staging flag from', parentRoom.name, 'to', newColony);
            return stagingFlag.setPosition(newFlagPosition);
        } catch (e) {
            console.log(e.stack);
        }
    }
};
