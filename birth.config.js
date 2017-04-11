var birthUtils = require('birth.utils');

module.exports = {
    HARVESTER: {
        COUNT: birthUtils.getDynamicUnitCount('harvester'),
        BODY: birthUtils.bodyParser([3, 4, 1]),
        MEM: {
            role: 'harvester',
            identity: birthUtils.assignIdentity(birthUtils.getDynamicUnitCount('harvester'), 'harvester'),
            capability: ['harvest']
        }
    },
    UPGRADER: {
        COUNT: birthUtils.getDynamicUnitCount('upgrader'),
        BODY: birthUtils.bodyParser([2, 4, 3]),
        MEM: {
            role: 'upgrader',
            upgrading: false,
            identity: birthUtils.assignIdentity(birthUtils.getDynamicUnitCount('upgrader'), 'upgrader'),
            capability: ['harvest', 'construction']
        }
    },
    BUILDER: {
        COUNT: birthUtils.getDynamicUnitCount('builder'),
        BODY: birthUtils.bodyParser([4, 2, 2]),
        MEM: {
            role: 'builder',
            identity: birthUtils.assignIdentity(birthUtils.getDynamicUnitCount('builder'), 'builder'),
            capability: ['harvest', 'construction']
        }
    },
    REPAIRER: {
        COUNT: birthUtils.getDynamicUnitCount('repairer'),
        BODY: birthUtils.bodyParser([2, 3, 2]),
        MEM: {
            role: 'repairer',
            identity: birthUtils.assignIdentity(birthUtils.getDynamicUnitCount('repairer'), 'repairer'),
            capability: ['harvest', 'construction']
        }
    },
    SUPPLIER: {
        COUNT: birthUtils.getDynamicUnitCount('supplier'),
        BODY: birthUtils.bodyParser([0, 8, 3]),
        MEM: {
            role: 'supplier',
            identity: birthUtils.assignIdentity(birthUtils.getDynamicUnitCount('supplier'), 'supplier'),
            capability: ['transport']
        }
    },
    DEFENSE_ENGINEER: {
        COUNT: birthUtils.getDynamicUnitCount('defense_engineer'),
        BODY: birthUtils.bodyParser([2, 3, 2]),
        MEM: {
            role: 'defense_engineer',
            capability: ['defender']
        }
    }
}
