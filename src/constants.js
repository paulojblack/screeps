/**
Meta/game constants
*/
CONTROLLER_MESSAGE = 'Hey hai hey'

/**
OS constants
*/
global.BUCKET_EMERGENCY = 1000
global.BUCKET_FLOOR = 2000
global.BUCKET_CEILING = 9500
/**
End OS constants
*/

global.ECONOMY_CRASHED = 0
global.ECONOMY_FALTERING = 1
global.ECONOMY_DEVELOPING = 2
global.ECONOMY_STABLE = 3
global.ECONOMY_SURPLUS = 4
global.ECONOMY_BURSTING = 5

global.RAMPART_PATHWAY = 1
global.RAMPART_EDGE = 2
global.RAMPART_SECONDARY_STRUCTURES = 3
global.RAMPART_PRIMARY_STRUCTURES = 4
global.RAMPART_CONTROLLER = 5
global.RAMPART_GATEWAY = 6
global.WALL_GATEWAY = 7


/**
PRIORITIES
*/
global.PRIORITIES_CREEP_DEFAULT = 4
global.PRIORITIES_CREEP_UPGRADER = 6
global.PRIORITIES_FORTIFY = 6
global.PRIORITIES_MINE = 6

global.PRIORITIES_SPAWNS = 3
global.PRIORITIES_DEFENSE = 3

global.PRIORITIES_SPAWN_DEFAULT = 4;
global.PRIORITIES_KINGDOM_INTEL = 4
global.PRIORITIES_CARTOGRAPHER = 4

global.PRIORITIES_CREEP_FACTOTUM = 7
global.PRIORITIES_CREEP_SPOOK = 6
global.PRIORITIES_CREEP_REPLENISHER = 6

global.PRIORITIES_PUBLICWORKS = 7
global.PRIORITIES_EXPAND = 8
global.PRIORITIES_PLAYER = 8
global.PRIORITIES_TOWN = 8
global.PRIORITIES_CITY_LABS = 8

global.PRIORITIES_CONSTRUCTION = 9
global.PRIORITIES_CITY_REBOOT = 9
global.PRIORITIES_EMPIRE_MARKET = 10
global.PRIORITIES_RESPAWNER = 12
global.PRIORITIES_MAINTENANCE = 12

global.STRUCTURE_COUNTS_BY_LEVEL = {
    0: {
        "spawn": 0,
        "extension": 0,
        "road": 2500,
        "container": 5
    },
    1: {
        "spawn": 1,
        "extension": 0,
        "link": 0,
        "road": 2500,
        "constructedWall": 0,
        "rampart": 0,
        "storage": 0,
        "tower": 0,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 0,
        "terminal": 0,
        "lab": 0,
        "container": 5,
        "nuker": 0
    },
    2: {
        "spawn": 1,
        "extension": 5,
        "link": 0,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 0,
        "tower": 0,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 0,
        "terminal": 0,
        "lab": 0,
        "container": 5,
        "nuker": 0
    },
    3: {
        "spawn": 1,
        "extension": 10,
        "link": 0,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 0,
        "tower": 1,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 0,
        "terminal": 0,
        "lab": 0,
        "container": 5,
        "nuker": 0
    },
    4: {
        "spawn": 1,
        "extension": 20,
        "link": 0,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 1,
        "tower": 1,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 0,
        "terminal": 0,
        "lab": 0,
        "container": 5,
        "nuker": 0
    },
    5: {
        "spawn": 1,
        "extension": 30,
        "link": 2,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 1,
        "tower": 2,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 0,
        "terminal": 0,
        "lab": 0,
        "container": 5,
        "nuker": 0
    },
    6: {
        "spawn": 1,
        "extension": 40,
        "link": 3,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 1,
        "tower": 2,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 1,
        "terminal": 1,
        "lab": 3,
        "container": 5,
        "nuker": 0
    },
    7: {
        "spawn": 2,
        "extension": 50,
        "link": 4,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 1,
        "tower": 3,
        "observer": 0,
        "powerSpawn": 0,
        "extractor": 1,
        "terminal": 1,
        "lab": 6,
        "container": 5,
        "nuker": 0
    },
    8: {
        "spawn": 3,
        "extension": 60,
        "link": 6,
        "road": 2500,
        "constructedWall": 2500,
        "rampart": 2500,
        "storage": 1,
        "tower": 6,
        "observer": 1,
        "powerSpawn": 1,
        "extractor": 1,
        "terminal": 1,
        "lab": 10,
        "container": 5,
        "nuker": 1
    }
}
