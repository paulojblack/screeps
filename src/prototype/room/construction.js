global.STRUCTURE_LOADER = 'loader'
global.STRUCTURE_CRANE = 'crane'
const structureMap = [
  false,
  'spawn',
  'extension',
  'road',
  'constructedWall',
  'rampart',
  'link',
  'container',
  'tower',
  'lab',
  'observer',
  'powerSpawn',
  'extractor',
  'storage',
  'terminal',
  'nuker',
  'loader',
  'crane'
]

const structures = Object.keys(CONTROLLER_STRUCTURES)
const skipStructures = [
  STRUCTURE_ROAD,
  STRUCTURE_WALL,
  STRUCTURE_RAMPART,
  STRUCTURE_CONTAINER
]

const orderStructures = [
  STRUCTURE_SPAWN,
  STRUCTURE_STORAGE,
  STRUCTURE_TOWER,
  STRUCTURE_EXTENSION,
  STRUCTURE_CONTAINER,
  STRUCTURE_LINK,
  STRUCTURE_WALL,
  STRUCTURE_EXTRACTOR,
  STRUCTURE_TERMINAL,
  STRUCTURE_LAB,
  STRUCTURE_RAMPART,
  STRUCTURE_OBSERVER,
  STRUCTURE_NUKER,
  STRUCTURE_POWER_SPAWN,
  STRUCTURE_ROAD
]

global.LEVEL_BREAKDOWN = {}
let structure
for (structure of structures) {
  const levels = Object.keys(CONTROLLER_STRUCTURES[structure])
  let level
  for (level of levels) {
    if (!LEVEL_BREAKDOWN[level]) {
      LEVEL_BREAKDOWN[level] = {}
    }
    LEVEL_BREAKDOWN[level][structure] = CONTROLLER_STRUCTURES[structure][level]
  }
}

Room.prototype.constructNextMissingStructure = function() {
    const structureType = this.getNextMissingStructureType()
  if (!structureType) {
    return false
  }

}

Room.prototype.getStructureCount = function (structureFind = FIND_MY_STRUCTURES) {
  const structures = this.find(structureFind)
  const counts = {}
  let structure
  for (structure of structures) {
    if (!counts[structure.structureType]) {
      counts[structure.structureType] = 0
    }
    counts[structure.structureType]++
  }
  return counts
}

Room.getLayout = function (roomName) {
  return new RoomLayout(roomName)
}

class RoomLayout {
    constructor(roomName) {
        this.roomName = roomName
    }
}
