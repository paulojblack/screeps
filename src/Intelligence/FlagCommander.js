const BaseDeputy = require('Intelligence.RoomDeputies.BaseDeputy');

module.exports = class FlagCommander {
    constructor(flagName) {
        var [roomType, roomLabel] = flagName.split('_')
        
        this.flagName = flagName
        this.flag = Game.flags[flagName]
        this.roomType = roomType
        this.roomLabel = roomLabel
        this.room = Game.rooms[this.flag.room.name]
    }

    giveOrders() {

        if (this.room === undefined) {
            Log.info('Room not visible')
        } else {
            Log.info('Room visible')
            if (this.roomType === 'base') {
                const baseDeputy = new BaseDeputy(this.room)
                baseDeputy.processRoom()
            }
        }

    }

    localAnalysis() {

    }


}
