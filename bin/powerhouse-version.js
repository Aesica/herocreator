/*==============================================================================
 * powerhouse-version.js
 *
 * PowerHouse Version Javascript
 *
 * Author: Kyle W T Sherman
 *
 * Contributor(s):  Aesica
 *
 * Time-stamp: <2016-01-30 20:06:47 (kyle)>
 *============================================================================*/

//==============================================================================
// Version Update
//==============================================================================

// version update class
/**@constructor*/
VersionUpdate = function(id, version, funct) {
    this.id = id;
    this.version = version;
    this.funct = funct;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', version=\'' + this.version + '\', funct=\'' + this.funct + '\', code=' + this.code() + ']';
    }
}

// version update data
// function must handle the following values for 'thing': data, pos, i, inc, code1, code2, code3, code4, archetype, superStat, innateTalent, talent, travelPower, framework, power, mask, specializationTree, specialization
// valid values: type, pos, i, inc, code1, code2, code3, code4, archetype, superStat, innateTalent, talent, travelPower, framework, power, mask, specializationTree, specialization
// valid types: init, start, archetype, superStat, innateTalent, talent, travelPower, power, specialization
//
// mask modifications:
//   advantageId:   0 1 2 3 4  5  6  7   8   9   10
//   decimal value: 1 2 4 8 16 32 64 128 256 512 1024
var dataVersionUpdate = [];
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(dataVersionUpdate.length, 0, null);

// version 1 => 2
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 1,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data':
            var data = value['data'];
            if (value['type'] == 'init') {
                // add archetype to start of data
                data.splice(0, 0, numToUrlCode(value['archetype']));
                // advantages now use two characters
                // powers start at position 16, are going from 3 to 4 characters, and there are 14 of them
                for (var i = 17 + 13 * 3; i >= 17; i -= 3) {
                    data.splice(i, 0, '0');
                }
                // add specializations to end of data
                for (var i = 0; i < 3 * 4; i++) {
                    data.splice(data.length, 0, '0');
                }
            }
            return data;
        case 'pos':
            // add archetype to start of data
            if (value['type'] == 'start' && value['pos'] == 0) return 1;
            return value['pos'];
        case 'i':
            // add archetype to start of data
            if (value['type'] == 'start' && value['i'] == 0) return 1;
            return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask':
            // add Munitions: Bullet Beatdown: Break the Trigger advantage
            if (value['type'] == 'power' && codeNum1 == 8 && codeNum2 == 3) return value['mask'] + (value['mask']&48);
            return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 2 => 3
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 2,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower':
            // move Mach Speed and Athletics travel powers to their new positions (following Acrobatics)
            if (codeNum1 >= 5 && codeNum1 <= 31) return value['travelPower'] + 2;
            if (codeNum1 >= 32 && codeNum1 <= 33) return value['travelPower']-27;
            return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask':
            // add Fire: Fire Strike: Kindling advantage
            if (value['type'] == 'power' && codeNum1 == 2 && codeNum2 == 1) return value['mask'] + (value['mask']&48);
            // add Martial Arts: Shuriken Storm: Strong Arm advantage
            if (value['type'] == 'power' && codeNum1 == 10 && codeNum2 == 19) return value['mask'] + (value['mask']&16);
            if (value['type'] == 'power' && codeNum1 == 11 && codeNum2 == 18) return value['mask'] + (value['mask']&16);
            if (value['type'] == 'power' && codeNum1 == 12 && codeNum2 == 18) return value['mask'] + (value['mask']&16);
            if (value['type'] == 'power' && codeNum1 == 13 && codeNum2 == 24) return value['mask'] + (value['mask']&16);
            // add Might: Clobber: It's That Time advantage
            if (value['type'] == 'power' && codeNum1 == 18 && codeNum2 == 0) return value['mask'] + (value['mask']&16);
            // add Might: Hurl: Strong Arm advantage
            if (value['type'] == 'power' && codeNum1 == 18 && codeNum2 == 4) return value['mask'] + (value['mask']&112);
            // add Single Blade: Reaper's Caress: Accelerated Metabolism advantage
            if (value['type'] == 'power' && codeNum1 == 12 && codeNum2 == 1) return value['mask'] + (value['mask']&16);
            return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 3 => 4
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 3,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos':
            // all archetypes get an extra power at level 14 (6th power)
            if (value['type'] == 'start' && value['archetype'] > 1 && value['pos'] == 26) return 27;
            // all archetypes swap powers at level 15 with 16 (7th and 8th powers)
            if (value['type'] == 'start' && value['archetype'] > 1 && value['pos'] == 19) return 20;
            if (value['type'] == 'start' && value['archetype'] > 1 && value['pos'] == 21) return 19;
            if (value['type'] == 'start' && value['archetype'] > 1 && value['pos'] == 20) return 21;
            return value['pos'];
        case 'i': return value['i'];
        case 'inc':
            // all archetypes get an extra power at level 14 (6th power)
            if (value['type'] == 'power' && value['archetype'] > 1 && value['pos'] == 18) return 0;
            return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype':
            // add The Invincible archetype
            if (value['type'] == 'archetype' && value['archetype'] >= 11) return value['archetype'] + 1;
            return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework':
            // update archetype powers
            var archetype = value['archetype'];
            var pos = value['pos'];
            var framework = value['framework'];
            var power = value['power'];
            // all archetypes get an extra power at level 14 (6th power)
            if (value['type'] == 'power' && archetype > 1 && pos == 18) return dataPower[dataArchetype[archetype].powerList[6]].framework;
            // move The Scourge: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 5 && pos == 22 && framework == 26 && power == 16) return dataPower[dataArchetype[archetype].powerList[10]].framework;
            // move The Master: Form of the Master archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 10 && pos == 21 && framework == 13 && power == 8) return dataPower[dataArchetype[archetype].powerList[9]].framework;
            // move The Disciple: Mental Discipline archtype power from level 32 (10th now 11th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 13 && pos == 23 && framework == 14 && power == 16) return dataPower[dataArchetype[archetype].powerList[11][1]].framework;
            // move The Unleashed: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].framework;
            // move The Unleashed: Bountiful Chi Resurgence archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 22 && framework == 13 && power == 18) return dataPower[dataArchetype[archetype].powerList[10][1]].framework;
            // move The Unleashed: Intensity archtype power from level 27 (9th now 10th power) to level 30 (10th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 22 && framework == 13 && power == 11) return dataPower[dataArchetype[archetype].powerList[10][1]].framework;
            // move The Blade: Form of the Swordsman archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 21 && framework == 12 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].framework;
            // move The Blade: Dragon's Bite archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 22 && framework == 12 && power == 12) return dataPower[dataArchetype[archetype].powerList[10]].framework;
            // move The Blade: Inexorable Tides archtype power from level 32 (10th now 11th power) to level 30 (10th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 23 && framework == 13 && power == 6) return dataPower[dataArchetype[archetype].powerList[11][1]].framework;
            // move The Fist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 17 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].framework;
            // move The Impulse: Inertial Dampening Field archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 20 && pos == 22 && framework == 3 && power == 14) return dataPower[dataArchetype[archetype].powerList[10]].framework;
            // move The Specialist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 21 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].framework;
            // move The Savage: Devour Essence archtype power from level 32 (10th now 11th power) to level 40 (12th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 23 && framework == 26 && power == 3) return dataPower[dataArchetype[archetype].powerList[11][1]].framework;
            // move The Savage: Aspect of the Bestial archtype power from level 40 (11th now 12th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 24 && framework == 25 && power == 11) return dataPower[dataArchetype[archetype].powerList[12]].framework;
            // move The Cursed: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 26 && pos == 22 && framework == 26 && power == 16) return dataPower[dataArchetype[archetype].powerList[10]].framework;
            // remove Infernal Supernatural: Aspect of the Ethereal power
            if (codeNum1 == 26 && codeNum2 == 17) return 0;
            return framework;
        case 'power':
            var power = value['power'];
            // update archetype powers
            var archetype = value['archetype'];
            var pos = value['pos'];
            var framework = value['framework'];
            // all archetypes get an extra power at level 14 (6th power)
            if (value['type'] == 'power' && archetype > 1 && pos == 18) return dataPower[dataArchetype[archetype].powerList[6]].power;
            // move The Scourge: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 5 && pos == 22 && framework == 26 && power == 16) return dataPower[dataArchetype[archetype].powerList[10]].power;
            // move The Master: Form of the Master archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 10 && pos == 21 && framework == 13 && power == 8) return dataPower[dataArchetype[archetype].powerList[9]].power;
            // move The Disciple: Mental Discipline archtype power from level 32 (10th now 11th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 13 && pos == 23 && framework == 14 && power == 16) return dataPower[dataArchetype[archetype].powerList[11][1]].power;
            // move The Unleashed: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].power;
            // move The Unleashed: Bountiful Chi Resurgence archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 22 && framework == 13 && power == 18) return dataPower[dataArchetype[archetype].powerList[10][1]].power;
            // move The Unleashed: Intensity archtype power from level 27 (9th now 10th power) to level 30 (10th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 22 && framework == 13 && power == 11) return dataPower[dataArchetype[archetype].powerList[10][1]].power;
            // move The Blade: Form of the Swordsman archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 21 && framework == 12 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].power;
            // move The Blade: Dragon's Bite archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 22 && framework == 12 && power == 12) return dataPower[dataArchetype[archetype].powerList[10]].power;
            // move The Blade: Inexorable Tides archtype power from level 32 (10th now 11th power) to level 30 (10th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 23 && framework == 13 && power == 6) return dataPower[dataArchetype[archetype].powerList[11][1]].power;
            // move The Fist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 17 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].power;
            // move The Impulse: Inertial Dampening Field archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 20 && pos == 22 && framework == 3 && power == 14) return dataPower[dataArchetype[archetype].powerList[10]].power;
            // move The Specialist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 21 && pos == 21 && framework == 10 && power == 6) return dataPower[dataArchetype[archetype].powerList[9]].power;
            // move The Savage: Devour Essence archtype power from level 32 (10th now 11th power) to level 40 (12th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 23 && framework == 26 && power == 3) return dataPower[dataArchetype[archetype].powerList[11][1]].power;
            // move The Savage: Aspect of the Bestial archtype power from level 40 (11th now 12th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 24 && framework == 25 && power == 11) return dataPower[dataArchetype[archetype].powerList[12]].power;
            // move The Cursed: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 26 && pos == 22 && framework == 26 && power == 16) return dataPower[dataArchetype[archetype].powerList[10]].power;
            // add Power Armor powers
            if (codeNum1 == 9 && codeNum2 >= 14) power += 2; // Fire All Weapons and Reconstruction Circuits
            if (codeNum1 == 9 && codeNum2 >= 10) power++; // Plasma Beam
            if (codeNum1 == 9 && codeNum2 >= 8) power += 3; // Lightspeed Dash, Overdrive, and Plasma Cutter
            if (codeNum1 == 9 && codeNum2 >= 7) power++; // Concentration
            if (codeNum1 == 9 && codeNum2 >= 5) power++; // Lightwave Slash
            if (codeNum1 == 9 && codeNum2 >= 2) power++; // Tactical Missiles
            if (codeNum1 == 9 && codeNum2 >= 1) power += 2; // Power Bolts and Laser Edge
            // move Power Armor: Mini Gun up 7 (it's now a tier 1 power)
            if (codeNum1 == 9 && power >= 9 && power <= 15) power++;
            if (codeNum1 == 9 && codeNum2 == 8) power = 9;
            // move Power Armor: Chest Beam up 3 (it's now a tier 2 powers)
            if (codeNum1 == 9 && power >= 18 && power <= 20) power++;
            if (codeNum1 == 9 && codeNum2 == 12) power = 18;
            // remove Infernal Supernatural: Aspect of the Ethereal power
            if (codeNum1 == 26 && codeNum2 == 17) return 0;
            if (codeNum1 == 26 && codeNum2 > 17) power--;
            // add Technology: Concentration power
            if (codeNum1 == 6 && codeNum2 >= 5) power++;
            if (codeNum1 == 7 && codeNum2 >= 12) power++;
            if (codeNum1 == 8 && codeNum2 >= 8) power++;
            // add Mystic: Compassion power
            if (codeNum1 == 19 && codeNum2 >= 8) power++;
            if (codeNum1 == 20 && codeNum2 >= 6) power++;
            if (codeNum1 == 21 && codeNum2 >= 6) power++;
            if (codeNum1 == 22 && codeNum2 >= 6) power++;
            if (codeNum1 == 23 && codeNum2 >= 6) power++;
            if (codeNum1 == 24 && codeNum2 >= 5) power++;
            if (codeNum1 == 25 && codeNum2 >= 7) power++;
            if (codeNum1 == 26 && codeNum2 >= 10) power++;
            // add Mind: Manipulator power
            if (codeNum1 == 14 && codeNum2 >= 9) power++;
            if (codeNum1 == 15 && codeNum2 >= 6) power++;
            return power;
        case 'mask':
            // all archetypes get an extra power at level 14 (6th power)
            var archetype = value['archetype'];
            var pos = value['pos'];
            var framework = value['framework'];
            var power = value['power'];
            if (value['type'] == 'power' && archetype > 1 && pos == 18) return 0;
            // move The Scourge: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 5 && pos == 22 && framework == 26 && power == 16) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Master: Form of the Master archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 10 && pos == 21 && framework == 13 && power == 8) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Disciple: Mental Discipline archtype power from level 32 (10th now 11th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 13 && pos == 23 && framework == 14 && power == 16) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Unleashed: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 21 && framework == 10 && power == 6) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Unleashed: Bountiful Chi Resurgence archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 14 && pos == 22 && framework == 13 && power == 18) {
                setAdvantage(1, 9, value['mask']);
                return 0;
            }
            // move The Blade: Form of the Swordsman archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 21 && framework == 12 && power == 6) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Blade: Dragon's Bite archtype power from level 27 (9th now 10th power) to level 25 (9th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 22 && framework == 12 && power == 12) {
                setAdvantage(1, 9, value['mask']);
                return 0;
            }
            // move The Blade: Inexorable Tides archtype power from level 32 (10th now 11th power) to level 30 (10th power)
            if (value['type'] == 'power' && archetype == 15 && pos == 23 && framework == 13 && power == 6) {
                setAdvantage(1, 10, value['mask']);
                return 0;
            }
            // move The Fist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 17 && pos == 21 && framework == 10 && power == 6) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Impulse: Inertial Dampening Field archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 20 && pos == 22 && framework == 3 && power == 14) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Specialist: Form of the Tempest archtype power from level 22 (8th now 9th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 21 && pos == 21 && framework == 10 && power == 6) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // move The Savage: Devour Essence archtype power from level 32 (10th now 11th power) to level 40 (12th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 23 && framework == 26 && power == 3) {
                var powerCode = numToUrlCode(framework) + numToUrlCode(power);
                var powerId = dataPowerIdFromCode[powerCode];
                var num = 12;
                selectFramework(framework);
                selectPower(num);
                setPower(powerId);
                setAdvantage(1, num, value['mask']);
                return 0;
            }
            // move The Savage: Aspect of the Bestial archtype power from level 40 (11th now 12th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 22 && pos == 24 && framework == 25 && power == 11) {
                setAdvantage(1, 6, value['mask']);
                return phPowerAdvantage[12];
            }
            // move The Cursed: Aspect of the Infernal archtype power from level 27 (9th now 10th power) to level 14 (6th power)
            if (value['type'] == 'power' && archetype == 26 && pos == 22 && framework == 26 && power == 16) {
                setAdvantage(1, 6, value['mask']);
                return 0;
            }
            // add Power Armor: Mini Gun: Infrared Guidance System advantage
            if (value['type'] == 'power' && codeNum1 == 9 && codeNum2 == 8) return value['mask'] + (value['mask']&48);
            return value['mask'];
        case 'specializationTree':
            // fix bug with version 3 corrupting the specializaton mastery value by resetting or clearing the value
            if (value['pos'] == 27) {
                if (value['specializationTree'] < 9) return 1;
                else return 0;
            }
            return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });


// version 4 => 5
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 4,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype':
            // add Archetype: The Night Avenger
            if (value['archetype'] > 22) return value['archetype'] + 1;
            return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework':
            // remove Martial Arts: Sneak power
            if (codeNum1 == 10 && codeNum2 == 16) return 0;
            if (codeNum1 == 11 && codeNum2 == 15) return 0;
            if (codeNum1 == 12 && codeNum2 == 15) return 0;
            if (codeNum1 == 13 && codeNum2 == 19) return 0;
            return value['framework'];
        case 'power':
            var power = value['power'];
            // add Gadgeteering: Boomerang Toss power
            if (codeNum1 == 7 && codeNum2 >= 2) power++;
            // add Gadgeteering: Ricochet Throw and Grapple Gun Pull powers
            if (codeNum1 == 7 && codeNum2 >= 4) power += 2;
            // add Gadgeteering: Throwing Blades and Gas Pellets powers
            if (codeNum1 == 7 && codeNum2 >= 16) power += 2;
            // add Gadgeteering: Bolas power
            if (codeNum1 == 7 && codeNum2 >= 17) power++;
            // add Gadgeteering: Strafing Run power
            if (codeNum1 == 7 && codeNum2 >= 23) power++;
            // add Martial Arts: Night Warrior power
            if (codeNum1 == 10 && codeNum2 >= 10) power++;
            if (codeNum1 == 11 && codeNum2 >= 10) power++;
            if (codeNum1 == 12 && codeNum2 >= 10) power++;
            if (codeNum1 == 13 && codeNum2 >= 12) power++;
            // add Martial Arts: Smoke Bomb Lunge power
            if (codeNum1 == 10 && codeNum2 >= 12) power++;
            if (codeNum1 == 11 && codeNum2 >= 12) power++;
            if (codeNum1 == 12 && codeNum2 >= 12) power++;
            if (codeNum1 == 13 && codeNum2 >= 14) power++;
            // remove Martial Arts: Sneak power
            if (codeNum1 == 10 && codeNum2 == 16) return 0;
            if (codeNum1 == 10 && codeNum2 > 16) power--;
            if (codeNum1 == 11 && codeNum2 == 15) return 0;
            if (codeNum1 == 11 && codeNum2 > 15) power--;
            if (codeNum1 == 12 && codeNum2 == 15) return 0;
            if (codeNum1 == 12 && codeNum2 > 15) power--;
            if (codeNum1 == 13 && codeNum2 == 19) return 0;
            if (codeNum1 == 13 && codeNum2 > 19) power--;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 5 => 6
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 5,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Fire: Rimefire Burst power
            if (codeNum1 == 2 && codeNum2 >= 9) power++;
            // add Force: Redirected Force power
            if (codeNum1 == 3 && codeNum2 >= 12) power++;
            // add Telepathy: Mind Break and Shadow of Doubt powers
            if (codeNum1 == 15 && codeNum2 >= 2) power += 2;
            // add Telepathy: Mental Leech power
            if (codeNum1 == 15 && codeNum2 >= 3) power++;
            // add Telepathy: Congress of Selves power
            if (codeNum1 == 15 && codeNum2 >= 6) power++;
            // add Telepathy: Mental Storm power
            if (codeNum1 == 15 && codeNum2 >= 12) power++;
            // add Telepathy: Master of the Mind power
            if (codeNum1 == 15 && codeNum2 >= 15) power++;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 6 => 7
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 6,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Power Armor: Particle Accelerator power
            if (codeNum1 == 9 && codeNum2 >= 6) power++;
            // add Power Armor: Particle Smash and Unified Theory powers
            if (codeNum1 == 9 && codeNum2 >= 17) power += 2;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 7 => 8
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 7,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Earth: Earth Form power
            if (codeNum1 == 17 && codeNum2 >= 4) power++;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 8 => 9
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 8,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Martial Arts: Fluidity power
            if (codeNum1 >= 10 && codeNum1 <= 13 && codeNum2 >= 12) power++;
            return power;
        case 'mask':
            // remove Radiant Sorcery: Aura of Radiant Protection: Runic Glow advantage
            if (value['type'] == 'power' && codeNum1 == 24 && codeNum2 == 4) return value['mask']&~8;
            return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 9 => 10
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 9,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Power Armor: Rocket Punch power
            if (codeNum1 == 9 && codeNum2 >= 9) power++;
            // add Power Armor: Aspect of the Machine power
            if (codeNum1 == 9 && codeNum2 >= 13) power++;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 10 => 11
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 10,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Power Armor: Binding Shot power
            if (codeNum1 == 9 && codeNum2 >= 19) power++;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 11 => 12
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 11,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype':
            // add Archetype: The Icicle
            if (value['archetype'] > 5) return value['archetype'] + 1;
            return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Force: Gravitic Ripple
            if (codeNum1 == 3 && codeNum2 >= 13) power++;
            // add Ice: Chilled Form power
            if (codeNum1 == 5 && codeNum2 >= 8) power++;
            // add Ice: Icy Embrace power
            if (codeNum1 == 5 && codeNum2 >= 9) power++;
            // add Ice: Icicle Spear power
            if (codeNum1 == 5 && codeNum2 >= 12) power++;
            // add Telekinesis: Lance Rain
            if (codeNum1 == 14 && codeNum2 >= 23) power++;
            // add Might: Nuclear Shockwave
            if (codeNum1 == 18 && codeNum2 >= 21) power++;
            return power;
        case 'mask':
            // add Ice: Ice Blast: Frost Bite advantage
            if (value['type'] == 'power' && codeNum1 == 5 && codeNum2 == 1) return value['mask'] + (value['mask']&48);
            return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 12 => 13
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            // add Electricity: Neuroelectric Pulse
            if (codeNum1 == 1 && codeNum2 >= 10) power++;
            // add Telepathy: Mind Control
            if (codeNum1 == 15 && codeNum2 >= 14) power++;
            return power;
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 13 => 14 (no change)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 14 => 15 (no change)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 15 => 16 (no change)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 16 => 17 (no change)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 17 => 18 (no change)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
        case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 18 => 19 (Munition rifle revamp)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
            var power = value['power'];
            
			// munitions changes
            if (codeNum1 == 8)
			{
				if (codeNum2 == 6) power = 27; // move assault rifle to tier 3, replacing spot with trip wire
				if (codeNum2 >= 8) power += 2; // move smgburst down 2, adding flamethrower and bullet hail
				if (codeNum2 >= 9) power += 2; // move concentration down 2, adding sharpshooter and composure
				if (codeNum2 >= 11) power++; // move bullet beatdown, err, "bullet ballet" down 1, adding execution shot
				if (codeNum2 >= 16) power += 2; // move smoke grenade down 2, adding concussion grenade and incendiary grenade
				if (codeNum2 >= 19) power += 2; // move 2-gun mojo down 2, adding parting shot and (newly-t3) assault rifle
			}
			if (codeNum1 == 11 && codeNum2 >= 18) power++; // add relentless (dual blades)
			if (codeNum1 == 12 && codeNum2 >= 17) power++; // add relentless (fighting claws)
			if (codeNum1 == 13 && codeNum2 >= 19) power++; // add relentless (single blade)
			if (codeNum1 == 14 && codeNum2 >= 19) power++; // add relentless (unarmed)
			if (codeNum1 == 13 && codeNum2 >= 3) power++; // add swift slash to single blade
            return power;
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });
	
// version 19 => 20 (increased max possible value for innate talent and travel power ids
// Note:  This had to be done inside powerhouse.js.  Existing builds are adjusted there.
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power': return value['power'];
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });	

// version 20 => 21 (Added Aurora)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
			// add aurora to ice right after arctic beast
            if (codeNum1 == 5 && codeNum2 > 17) power++;
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });
	
// version 21 => 22 (Added Shadestorm)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
			// add shadestorm to shadow right after ebon rift
            if (codeNum1 == 21 && codeNum2 > 15) power++;
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });
// version 22 => 23 (TK blades revamp)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
            if (codeNum1 == 15) // tk blades framework
			{
				if (codeNum2 == 3) power = 28; // tk assault moved to t3
				if (codeNum2 == 4) power += 2; // telekinesis bumped down 2 slots
				if (codeNum2 >= 6 && codeNum2 <= 8) power += 2; // tk burst, ego form, id mastery bumped down 2 slots
				if (codeNum2 >= 9 && codeNum2 <= 12) power += 4; // manip, tk shield, ego dash, tk reverb bumped down 4 slots
				if (codeNum2 == 13 || codeNum2 == 14) power += 5; // tk eruption, tk wave bumped down 5 slots
				if (codeNum2 == 15 || codeNum2 == 16) power += 7; // ego choke, ego hold bumped down 7 slots
				if (codeNum2 == 17) power = 11; // mental disc moved to tier 1
				if (codeNum2 == 18) power += 6; // ego surge bumped down 6 slots
				if (codeNum2 == 19) power = 17; // ego blade breach moved to t2
				if (codeNum2 >= 20 && codeNum2 <= 22) power += 5; // ego annihilation, tk lance, tk maelstrom bumped down 5 slots
				if (codeNum2 >= 23 && codeNum2 <= 25) power += 6; // lance rain, mind link, mental impact bumped down 6 slots
			}
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 23 => 24 (stuff I forgot in 23.  Oops!)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
            if (codeNum1 == 16) // telepathy framework
			{
				if (codeNum2 > 9) power++; // insert ego form
				if (codeNum2 > 22) power--; // pop master of the mind out of its old slot and shuffle powers accordingly
				if (codeNum2 == 23) power = 27; // remove master of the mind if the user currently had it selected.
			}
			if (codeNum1 == 21 && codeNum2 > 1) power++; // insert dark tether
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });

// version 24 => 25 (electric revamp)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
            if (codeNum1 == 1) // electric framework
			{
				if (codeNum2 == 2) power = 18; // move larc to t3
				if (codeNum2 == 3 || codeNum2 == 4) power--; // bump sigils of the storm and sparkstorm down 1
				if (codeNum2 == 5 || codeNum2 == 6) power++; // bump elec sheath and form up 1
				if (codeNum2 >= 7 && codeNum2 <= 10) power += 2; // bump elec shield, ionic reverb, s.summoner, and tstrike up 2
				if (codeNum2 == 11 || codeNum2 == 12) power += 4; // bump electrocutie and npulse up 4 slots
				if (codeNum2 == 14 || codeNum2 == 15) power += 5; // bump gigglebolt and lstorm up 5 slots
				if (codeNum2 >= 16 && codeNum2 <= 18) power += 6; // bump the 3 ultimates up 6 slots
			}
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });
	
// version 25 => 26 (all this crap just to add moonstruck...)
dataVersionUpdate[dataVersionUpdate.length] = new VersionUpdate(
    dataVersionUpdate.length, 12,
    function(thing, value) {
        var codeNum1 = (value['code1'] == undefined) ? 0 : urlCodeToNum(value['code1']); // framework
        var codeNum2 = (value['code2'] == undefined) ? 0 : urlCodeToNum(value['code2']); // power
        // var codeNum3 = (value['code3'] == undefined) ? 0 : urlCodeToNum(value['code3']);
        // var codeNum4 = (value['code4'] == undefined) ? 0 : urlCodeToNum(value['code4']);
        switch (thing) {
        case 'data': return value['data'];
        case 'pos': return value['pos'];
        case 'i': return value['i'];
        case 'inc': return value['inc'];
        case 'code1': return value['code1'];
        case 'code2': return value['code2'];
        case 'code3': return value['code3'];
        case 'code4': return value['code4'];
        case 'archetype': return value['archetype'];
        case 'superStat': return value['superStat'];
        case 'innateTalent': return value['innateTalent'];
        case 'talent': return value['talent'];
        case 'travelPower': return value['travelPower'];
        case 'framework': return value['framework'];
        case 'power':
			var power = value['power'];
            if (codeNum1 == 23 || codeNum2 >= 22) power++; // moonstruck inserted after Howl in the doge framework.  Much woof, so howl, very moon, wow.
            return power;		
		case 'mask': return value['mask'];
        case 'specializationTree': return value['specializationTree'];
        case 'specialization': return value['specialization'];
        }
    });	
	
	
//==============================================================================
// Get Methods
//==============================================================================

// get data methods
getDataVersionUpdate = function() { return dataVersionUpdate; }

//==============================================================================
// powerhouse-version.js ends here
//==============================================================================
