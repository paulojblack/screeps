//DEPRECATED
module.exports = {
    getRoomStructuresById: function(thisRoom) {
        return _.reduce(thisRoom.find(FIND_MY_STRUCTURES), function(res, val, key) {
                (res[val.structureType] || (res[val.structureType] = [])).push(val.id)
                return res
            }, {});
    },
    getRoomEnergyStoreIds: function(thisRoom) {
        return _.flattenDeep(_.values(_.pick(this.getRoomStructuresById(thisRoom), ['container', 'spawn', 'extension'])))
    },
    getFullestEnergyStore: function(thisRoom) {
        return _.reduce(this.getRoomEnergyStoreIds(thisRoom), (res, id) => {
            var testEnergy = Number(Game.getObjectById(id).energy),
                accEnergy = Number(_.get(Game.getObjectById(res), 'energy', 0));

            return testEnergy >= accEnergy ? id : res
        }, 0)
    },
    getBestEnergySource: function(creep){
        if(creep.room.energyAvailable >= 500) {
            var spawns = creep.room.find(FIND_MY_SPAWNS);

            if(creep.withdraw(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawns[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
    }
}
