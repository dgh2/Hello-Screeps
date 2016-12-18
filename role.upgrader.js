var harvestDuty = require('duty.harvest');
var upgradeDuty = require('duty.upgrade');

var roleUpgrader = {

    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }
        
        if(creep.memory.upgrading) {
            if(!upgradeDuty.run(creep)){
                creep.say('No controller!');
                //creep.memory.role = 'harvester';
            }
        }else{
            harvestDuty.run(creep);
        }
    }
};

module.exports = roleUpgrader;