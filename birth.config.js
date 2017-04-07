module.exports = {
    HARVESTER: {
        COUNT: 7,
        BODY: [WORK, WORK, WORK, CARRY,MOVE],
        MEM: {
            role: 'harvester',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest']
        }
    },
    UPGRADER: {
        COUNT: 3,
        BODY: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        MEM: {
            role: 'upgrader',
            upgrading: false,
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    BUILDER: {
        COUNT: 2,
        BODY: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        MEM: {
            role: 'builder',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    REPAIRER: {
        COUNT: 2,
        BODY: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        MEM: {
            role: 'repairer',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    TRANSPORTER: {
        COUNT: 2,
        BODY: [ CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        MEM: {
            role: 'transporter',
            id: Math.ceil(Math.random() * 100),
            capability: ['transport']
        }
    }
}
