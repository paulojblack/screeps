Room.prototype.registerTown = function() {
}

Room.removeTown = function (roomName) {
  if (Memory.territory && Memory.territory[roomName]) {
    delete Memory.territory[roomName]
    Log.info(`Removing city ${roomName}`)
  }
}
