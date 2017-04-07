var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    roleRepairer = require('role.repairer'),
    roleTransporter = require('role.transporter'),
    harvest = require('meta.harvest');

module.exports = {
    standardDelegate: function(thisRoom) {
        Object.keys(Game.creeps).forEach((name) => {

            var creep = Game.creeps[name],
                options = {};

            if(creep.memory.capability.includes('harvest')) {
                options.chooseEnergySource = harvest.getNaturalEnergySource
            }
            if(creep.memory.capability.includes('construction')) {
                options.chooseEnergySource = harvest.getOptimalEnergySource
            }

            if(creep.memory.role === 'harvester') {
                roleHarvester.run(creep, options);
            }
            if(creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep, options);
            }
            if(creep.memory.role === 'builder') {
                roleBuilder.run(creep, options);
            }
            if(creep.memory.role === 'repairer') {
                roleRepairer.run(creep, options);
            }
            if(creep.memory.role === 'transporter') {
                // roleTransporter.run(creep, options);
            }
        })
    }
}
