class Player extends kernel.process {
    constructor (...args) {
        super(...args)
        this.priority = PRIORITIES_PLAYER
        console.log(uhh)
    }

    main() {
        console.log('player running')
    }
}

module.exports = Player
