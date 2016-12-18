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
            var criticalRepairs = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                filter: function(object){
                    return object.hits < object.hitsMax && object.hits < 500;
                } 
            });
            if(criticalRepairs.length > 0) {
                //creep.say('repairing');
                criticalRepairs.sort(function(a, b) {return (Math.round(100*(a.hitsMax-a.hits)/a.hitsMax) - Math.round(100*(b.hitsMax-b.hits)/b.hitsMax));});
                //repairs.sort(function(a, b) {return (a.hits - b.hits);});
                for(var i = 0; i < criticalRepairs.length; i++) {
                    if(creep.repair(criticalRepairs[i]) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(criticalRepairs[i]) == OK) {
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }else{
                targets = Game.spawns['Home'].room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length > 0) {
                    //creep.say('building');
                    for(var i = 0; i < targets.length; i++) {
                        if(creep.build(targets[i]) == ERR_NOT_IN_RANGE) {
                            if(creep.moveTo(targets[i]) == OK) {
                                break;
                            }
                        }else{
                            break;
                        }
                    }
                }else{
                    var repairs = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.hits < object.hitsMax/3;
                        } 
                    });
                    if(repairs.length == 0) {
                        repairs = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.hits < object.hitsMax/2;
                            } 
                        });
                    }
                    if(repairs.length == 0) {
                        repairs = Game.spawns['Home'].room.find(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.hits < object.hitsMax;
                            } 
                        });
                    }
                    if(repairs.length > 0) {
                        //creep.say('repairing');
                        repairs.sort(function(a, b) {return (Math.round(100*(a.hitsMax-a.hits)/a.hitsMax) - Math.round(100*(b.hitsMax-b.hits)/b.hitsMax));});
                        //repairs.sort(function(a, b) {return (a.hits - b.hits);});
                        for(var i = 0; i < repairs.length; i++) {
                            if(creep.repair(repairs[i]) == ERR_NOT_IN_RANGE) {
                                if(creep.moveTo(repairs[i]) == OK) {
                                    break;
                                }
                            }else{
                                break;
                            }
                        }
                    }else{
                        creep.say('No builds!');
                        //creep.memory.role = 'upgrader';
                    }
                }
            }
        } else {
            harvestDuty.run(creep);
        }
    }
};

module.exports = roleBuilder;