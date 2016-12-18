var harvestDuty = require('duty.harvest');

var dutyUpgrade = {
    
    run: function(creep) {
        if(creep.room.controller != null && creep.room.controller.my) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            return true;
        } else {
            creep.moveTo(Game.spawns['Home'].room.controller);
        }
        return false;
    }
};

module.exports = dutyUpgrade;