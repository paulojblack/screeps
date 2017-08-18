module.exports = {
    // a function to run the logic for this role
    run: function() {
        let source = Game.getObjectById(this.memory.sourceId);
        let container;

        if (this.name === 'Aubrey') {
            // this.memory.sourceId = '5982fec6b097071b4adc17c2'
        }
        try {
            if (!this.memory.positioned) {
                if (!this.memory.target || this.room.name === this.memory.target) {
                    container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    })[0];

                    if (this.pos.isEqualTo(container.pos)) {
                        this.memory.positioned = true;
                    } else {
                        this.moveTo(container);
                    }
                } else {
                    this.moveTo(source)
                }
            } else {
                if (this.harvest(source) !== 0) {
                }
            }
        } catch(e) {
            console.log('Miner fuckup')
            console.log(this)
            console.log(JSON.stringify(this.memory))
            console.log(e)
        }
    }
};
