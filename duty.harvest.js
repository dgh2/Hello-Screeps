var dutyHarvest = {
    
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        for(var i = 0; i < sources.length; i++) {
            if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(sources[i]) == OK) {
                    break;
                }
            }else{
                break;
            }
        }
    }
};

module.exports = dutyHarvest;