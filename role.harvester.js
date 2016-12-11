var harvestDuty = require('duty.harvest');

var roleHarvester = {

    run: function(creep) {
        if(creep.memory.deliveringHarvest && creep.carry.energy == 0) {
            creep.memory.deliveringHarvest = false;
            creep.say('harvesting');
        }
        if(!creep.memory.deliveringHarvest && creep.carry.energy == creep.carryCapacity) {
            creep.memory.deliveringHarvest = true;
            creep.say('delivering harvest');
        }

        if(creep.memory.deliveringHarvest) {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            for(var i = 0; i < targets.length; i++) {
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    if(creep.moveTo(targets[i]) == OK) {
                        break;
                    }
                }else{
                    break;
                }
            }
        }else{
            harvestDuty.run(creep);
        }
    }
};

module.exports = roleHarvester;