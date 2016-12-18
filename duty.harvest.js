var dutyHarvest = {
    
    run: function(creep) {
        var method = 'pickup';
        var targets = Game.spawns['Home'].room.find(FIND_DROPPED_RESOURCES);
        if(targets.length == 0) {
            method = 'withdraw';
            targets = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                               i.store[RESOURCE_ENERGY] > 0
            });
            if(targets.length == 0) {
                method = 'harvest';
                targets = Game.spawns['Home'].room.find(FIND_SOURCES_ACTIVE);
            }
        }
        for(var i = 0; i < targets.length; i++) {
            if((method == 'pickup' && creep.pickup(targets[i]) == ERR_NOT_IN_RANGE) ||
                    (method == 'withdraw' && creep.withdraw(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ||
                    (method == 'harvest' && creep.harvest(targets[i]) == ERR_NOT_IN_RANGE)) {
                if(creep.moveTo(targets[i]) == OK) {
                    return true;
                }
            }else{
                break;
            }
        }
        return false;
    }
};

module.exports = dutyHarvest;