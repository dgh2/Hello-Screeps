var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleCollector = require('role.collector');

module.exports.loop = function () {
    console.log('Turn start!');
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    var attackerCount = 0;
    var collectorCount = 0;

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        if(creep.spawning) {
            continue;
        }else if(creep.memory.role == 'harvester') {
            harvesterCount++;
            roleHarvester.run(creep);
        }else if(creep.memory.role == 'upgrader') {
            upgraderCount++;
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'builder') {
            builderCount++;
            roleBuilder.run(creep);
        }else if(creep.memory.role == 'attacker') {
            attackerCount++;
            roleAttacker.run(creep);
        }else if(creep.memory.role == 'collector') {
            collectorCount++;
            roleCollector.run(creep);
        }else{
            creep.say(creep.memory.role+"--");
        }
    }
    
    for(var spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];
        if(spawn.room.find(FIND_HOSTILE_CREEPS).length > attackerCount*0.8 && spawn.canCreateCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE]) == OK) {
            spawn.createCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE], undefined,  {role: 'attacker'});
        }else if(spawn.room.find(FIND_HOSTILE_SPAWNS).length > 0 && spawn.canCreateCreep([ATTACK, ATTACK, ATTACK, MOVE]) == OK) {
            spawn.createCreep([ATTACK, ATTACK, ATTACK, MOVE], undefined,  {role: 'attacker'});
        }else if(harvesterCount < 1/*TODO: # of spawns accessible + number of low level harvesters*/ && spawn.canCreateCreep([WORK, WORK, WORK, WORK, CARRY, MOVE]) == OK) {
            spawn.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        }else if(collectorCount < 1 && spawn.canCreateCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE]) == OK) {
            spawn.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], undefined, {role: 'collector'});
        }else if(builderCount < 2 && spawn.canCreateCreep([MOVE, MOVE, MOVE, WORK, CARRY, WORK, CARRY, MOVE]) == OK) {
            spawn.createCreep([MOVE, MOVE, MOVE, WORK, CARRY, WORK, CARRY, MOVE], undefined, {role: 'builder'});
        }else if(upgraderCount < 7 && spawn.canCreateCreep([MOVE, WORK, MOVE, WORK, MOVE, WORK, CARRY, MOVE]) == OK) {
            spawn.createCreep([MOVE, WORK, MOVE, WORK, MOVE, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
        }
        
        /*if(spawn.room.find(FIND_HOSTILE_CREEPS).length > attackerCount*0.8 && spawn.canCreateCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE]) == OK) {
            spawn.createCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE], undefined,  {role: 'attacker'});
        }else if(spawn.room.find(FIND_HOSTILE_SPAWNS).length > 0 && spawn.canCreateCreep([ATTACK, ATTACK, ATTACK, MOVE]) == OK) {
            spawn.createCreep([ATTACK, ATTACK, ATTACK, MOVE], undefined,  {role: 'attacker'});
        }else if(harvesterCount < 2 && spawn.canCreateCreep([WORK, WORK, WORK, WORK, CARRY, MOVE]) == OK) {
            spawn.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        }else if(harvesterCount < 2 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE , MOVE], undefined, {role: 'harvester'});
        }else if(upgraderCount < 2 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
        }else if(collectorCount < 2 && spawn.canCreateCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE]) == OK) {
            spawn.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], undefined, {role: 'collector'});
        }else if(builderCount < 1 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
        }else if(builderCount < 3 && spawn.canCreateCreep([WORK, CARRY, MOVE, CARRY, MOVE, MOVE, WORK, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, CARRY, MOVE, MOVE, WORK, MOVE], undefined, {role: 'builder'});
        }else if(upgraderCount < 5 && spawn.canCreateCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        }*/
    }
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    console.log("harvesters: "+harvesterCount);
    console.log("upgraders: "+upgraderCount);
    console.log("builders: "+builderCount);
    console.log("attackers: "+attackerCount);
    console.log("collectors: "+collectorCount);
}
