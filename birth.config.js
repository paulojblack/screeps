module.exports = {
    HARVESTER: {
        COUNT: 7,
        BODY: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        MEM: {
            role: 'harvester',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest']
        }
    },
    UPGRADER: {
        COUNT: 7,
        BODY: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        MEM: {
            role: 'upgrader',
            upgrading: false,
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    BUILDER: {
        COUNT: 3,
        BODY: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        MEM: {
            role: 'builder',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    REPAIRER: {
        COUNT: 1,
        BODY: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        MEM: {
            role: 'repairer',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    SUPPLIER: {
        COUNT: 4,
        BODY: [ CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        MEM: {
            role: 'supplier',
            id: Math.ceil(Math.random() * 100),
            capability: ['transport']
        }
    }
}
