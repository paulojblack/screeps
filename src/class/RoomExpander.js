module.exports = class RoomExpander {
    constructor(room) {
        this.room = room;
        this.memory = room.memory;
    }

    expand() {
        let self = this;
        let parentRoom = self.room;
        let childRooms = parentRoom.childRooms;
        // console.log(self.memory.exits)
        //Run through each exit

        // self.memory.exits.forEach((direction) {
        //
        // })
    }

}
