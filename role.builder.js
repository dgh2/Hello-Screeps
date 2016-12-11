var harvestDuty = require('duty.harvest');

var roleBuilder = {

    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            for(var i = 0; i < targets.length; i++) {
                if(creep.build(targets[i]) == ERR_NOT_IN_RANGE) {
                    if(creep.moveTo(targets[i]) == OK) {
                        break;
                    }
                }else{
                    break;
                }
            }
        } else {
            harvestDuty.run(creep);
        }
    }
};

module.exports = roleBuilder;