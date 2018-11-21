const BaseDeputy = require('plan.RoomDeputies.BaseDeputy');

module.exports = class FlagCommander {
    constructor(flagName) {
        const [roomType, roomLabel] = flagName.split('_');

        this.flagName = flagName;
        this.flag = Game.flags[flagName];
        this.roomType = roomType;
        this.roomLabel = roomLabel;
        this.room = Game.rooms[this.flag.room.name];
    }

    giveOrders() {
        if (this.room === undefined) {
            Log.info('Room not visible');
        } else if (this.roomType === 'base') {
            const baseDeputy = new BaseDeputy(this.room);
            baseDeputy.manageRoom();
        }
    }

    localAnalysis() {

    }
};
