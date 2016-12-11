var harvestDuty = require('duty.harvest');

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
        
        if(creep.room.controller != null) {
            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                harvestDuty.run(creep);
            }
        }else{
            creep.say('No controller!');
            creep.memory.role = 'harvester';
        }
    }
};

module.exports = roleUpgrader;