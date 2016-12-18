var harvestDuty = require('duty.harvest');
var upgradeDuty = require('duty.upgrade');
var deliverDuty = require('duty.deliver');

var roleCollector = {

    run: function(creep) {
        if(!creep.memory.collecting && creep.carry.energy == 0) {
            creep.memory.collecting = true;
            creep.say('collecting');
        }
        if(creep.memory.collecting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.collecting = false;
            creep.say('delivering');
        }

        if(creep.memory.collecting) {
            if(!harvestDuty.run(creep)) {
                creep.moveTo(Game.spawns['Home']);
            }
        }else{
            if(!deliverDuty.run(creep, false)) {
                upgradeDuty.run(creep);
            }
        }
    }
};

module.exports = roleCollector;