var harvestDuty = require('duty.harvest');

var roleBuilder = {

    run: function(creep) {
        //(spawn.room.find(FIND_HOSTILE_SPAWNS).length > 0 || spawn.room.find(FIND_HOSTILE_CREEPS).length*1.1 > attackerCount)
        
        var targets = Game.spawns['Home'].room.find(FIND_HOSTILE_CREEPS);
        if(targets.length == 0) {
            targets = Game.spawns['Home'].room.find(FIND_HOSTILE_SPAWNS);
        }
        
        if(targets.length > 0) {
            if(creep.getActiveBodyparts(RANGED_ATTACK)) {
                for(var i = 0; i < targets.length; i++) {
                    if(creep.rangedAttack(targets[i]) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[i]) == OK) {
                            break;
                        }
                    }else{
                        //creep.moveTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS))
                        break;
                    }
                }
            }else if(creep.getActiveBodyparts(ATTACK)) {
                for(var i = 0; i < targets.length; i++) {
                    if(creep.attack(targets[i]) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(targets[i]) == OK) {
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }else{
                creep.say('Goodbye, cruel world!');
                creep.suicide();
            }
        }else{
            creep.say('No enemies!');
            //creep.memory.role = 'builder';
        }
    }
};

module.exports = roleBuilder;