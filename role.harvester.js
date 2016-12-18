var harvestDuty = require('duty.harvest');
var deliverDuty = require('duty.deliver');

var roleHarvester = {

    run: function(creep) {
        if(creep.memory.deliveringHarvest && creep.carry.energy == 0) {
            creep.memory.deliveringHarvest = false;
            creep.say('harvesting');
        }
        if(!creep.memory.deliveringHarvest && creep.carry.energy == creep.carryCapacity) {
            creep.memory.deliveringHarvest = true;
            creep.say('delivering');
        }

        if(creep.memory.deliveringHarvest) {
            deliverDuty.run(creep, true);
        }else{
            var targets = Game.spawns['Home'].room.find(FIND_SOURCES_ACTIVE);
            for(var i = 0; i < targets.length; i++) {
                if(creep.harvest(targets[i]) == ERR_NOT_IN_RANGE) {
                    if(creep.moveTo(targets[i]) == OK) {
                        break;
                    }
                }else{
                    break;
                }
            }
        }
    }
};

module.exports = roleHarvester;