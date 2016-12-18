var dutyDeliver = {
    
    run: function(creep, includeContainers) {
        var targets;
        if(includeContainers) {
            targets = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }
            });
        }
        if(targets == null || targets.length == 0) {
            targets = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
                }
            });
        }
        if(targets.length > 0) {
            for(var i = 0; i < targets.length; i++) {
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    if(creep.moveTo(targets[i]) == OK) {
                        break;
                    }
                }else{
                    break;
                }
            }
            return true;
        }
        //creep.say('Drop ' + creep.carry[RESOURCE_ENERGY]);
        //creep.drop(RESOURCE_ENERGY, creep.carry[RESOURCE_ENERGY]);
        return false;
    }
};

module.exports = dutyDeliver;