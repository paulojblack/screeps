exports.refreshTimers = function(room) {

    if (Game.time % 50 === 0) {
        //Construction sites
        room.constructionSites = 'REFRESH'

        //SOURCES
        for (let source in room.sources) {
            room.sources[source].config = {}
        }
    }
}

exports.refreshSourceConfig = function(room, update) {
    for (let source in room.sources) {
        room.sources[source].config = update
    }
}
