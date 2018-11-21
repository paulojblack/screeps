global.LEVEL_BREAKDOWN = {}
const structures = Object.keys(CONTROLLER_STRUCTURES)
let structure;
for (structure of structures) {
    const levels = Object.keys(CONTROLLER_STRUCTURES[structure])
    let level;
    for (level of levels) {
        if (!LEVEL_BREAKDOWN[level]) {
            LEVEL_BREAKDOWN[level] = {}
        }
        LEVEL_BREAKDOWN[level][structure] = CONTROLLER_STRUCTURES[structure][level]
    }
}
/**
des -> Memorize desired structures by level
layout -> plan for location of all structures by level, calculated VERY infrequentlypau
ex -> Memorized existing structures
next -> highest priority structure in desired and not in existing

*/
module.exports = class BasePlanner {
    constructor(room) {
        this.room = room
        this.memory = room.memory
        this.map = Game.map.getRoomTerrain(this.room.name)

    }

    logic() {
        const currentRoomLevel = this.room.controller.level;

        this.room.memory.schemata = {
            level: currentRoomLevel,
            maxStructureCount: STRUCTURE_COUNTS_BY_LEVEL[currentRoomLevel]
        }

        if (!this.room.memory.thoroughfare) {
            this.getLocalHighwayPath()
        }

        // this.memory.str

        // this.memory.structureToBuild

        // Log.warn(this.memory.schemata, 'blueprint')
        // }
    }

    createBlueprint() {
        const terrain = Game.map.getRoomTerrain(this.room.name);


        // Log.debug(structures)
        // Log.debug(CONTROLLER_STRUCTURES, 'basearch')
        // Log.warn(LEVEL_BREAKDOWN, 'basearch')
        //
        // Log.warn(STRUCTURE_COUNTS_BY_LEVEL[currentRoomLevel], 'basearch')
        // const structureDB = {}
    }

    getExtensionPlan() {

    }

    getLocalHighwayPath() {
        // Log.info(this.room)
        // Log.info(this.room.sources[0].id)
        const firstRoomSpawn = this.room.find(FIND_MY_SPAWNS) ? this.room.find(FIND_MY_SPAWNS)[0] : undefined
        const sources = _.pluck(this.room.sources, 'id')

        if (firstRoomSpawn === undefined || !sources.length) {
            Log.error('BaseArchitect.getLocalHighwayPath received bad input');
            return
        };

        const spawnPos = firstRoomSpawn.pos
        const highwayPath = _.flatten(sources.map((source) => {
            return PathFinder.search(spawnPos, Game.getObjectById(source).pos).path.map((path) => {
                return path
            })
        }))
        // this.room.memory.queuedConstructionSites.road = 'test'
        // Log.info(highwayPath)
        // Log.info(room.memory.queuedConstructionSites.road)
        // const buildsites = paths.map()
        // Log.info(_.unionBy(paths[0].path, paths[1].path))
        // Log.info(_.uniq(paths).length)




    }
};
