var birthUtils = require('birth.utils');

module.exports = {
    HARVESTER: {
        COUNT: 4,
        BODY: [WORK, WORK, CARRY, MOVE],
        MEM: {
            role: 'harvester',
            identity: Math.ceil(Math.random() * 50),
            capability: ['harvest']
        }
    },
    UPGRADER: {
        COUNT: 1,
        BODY: [WORK, CARRY, MOVE, MOVE],
        MEM: {
            role: 'upgrader',
            upgrading: false,
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    BUILDER: {
        COUNT: 2,
        BODY: [WORK, CARRY, MOVE, MOVE],
        MEM: {
            role: 'builder',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    REPAIRER: {
        COUNT: 1,
        BODY: [WORK, CARRY, CARRY, MOVE],
        MEM: {
            role: 'repairer',
            id: Math.ceil(Math.random() * 50),
            capability: ['harvest', 'construction']
        }
    },
    SUPPLIER: {
        COUNT: 0,
        BODY: [ CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        MEM: {
            role: 'supplier',
            id: Math.ceil(Math.random() * 100),
            capability: ['transport']
        }
    }
}
