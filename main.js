var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;

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
        if(creep.memory.role == 'harvester') {
            harvesterCount++;
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            upgraderCount++;
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            builderCount++;
            roleBuilder.run(creep);
        } else {
            creep.say('I hate my job: ' + creep.memory.role);
        }
    }
    
    for(var spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];
        //if(harvesterCount < 2 && spawn.canCreateCreep([WORK, WORK, WORK, WORK, MOVE]) == OK) {
        //    spawn.createCreep([WORK, WORK, WORK, WORK, MOVE], undefined, {role: 'harvester'})
        //}
        if(upgraderCount < 1 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'})
        }
        if(harvesterCount < 2 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE , MOVE], undefined, {role: 'harvester'})
        }
        if(upgraderCount < 2 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'})
        }
        if(builderCount < 4 && spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE]) == OK) {
            spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'})
        }
    }
}
