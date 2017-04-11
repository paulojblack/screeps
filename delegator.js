var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    roleRepairer = require('role.repairer'),
    roleTransporter = require('role.transporter'),
    roleDefenseEngineer = require('role.defense_engineer'),
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
            if(creep.memory.capability.includes('defender')) {
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
            if(creep.memory.role === 'supplier') {
                // roleTransporter.run(creep, options);
            }
            if(creep.memory.role === 'defense_engineer') {
                roleDefenseEngineer.run(creep, options);
            }
        })
    }
}
