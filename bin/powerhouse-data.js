/*==============================================================================
 * powerhouse-data.js
 *
 * PowerHouse Data Javascript
 *
 * Original Author: Kyle W T Sherman
 *
 * Contributor(s):  Aesica
 *
 * Time-stamp: <2016-02-17 23:15:53 (kyle)>
 *============================================================================*/

//==============================================================================
// Super Stats
//==============================================================================

const TRAVEL_POWER_NONE = 0;
const TRAVEL_POWER_FLIGHT = 1;
const TRAVEL_POWER_JUMP = 2;
const TRAVEL_POWER_SPEED = 3;
const TRAVEL_POWER_ATHLETICS = 4;
const TRAVEL_POWER_SWINGING = 5;
const TRAVEL_POWER_TUNNELING = 6;
const TRAVEL_POWER_TELEPORT = 7;
const TRAVEL_POWER_TYPES = ["", "Flight", "Jump", "Speed", "Athletics", "Swinging", "Tunneling", "Teleport"];

const TP_UNLOCK_NONE = 0;
const TP_UNLOCK_FREE = 1;
const TP_UNLOCK_CSTORE = 2;
const TP_UNLOCK_CSTORE_GOLD = 3;
const TP_UNLOCK_QSTORE = 4;
const TP_UNLOCK_LEGACY = 5;
const TP_UNLOCK_TYPES = ["", "Freely available", "C-Store purchase", "C-STore purchase or Gold/LTS", "Questionite store", "Legacy crafting - no longer available"];

const GCR_UNLOCK = "<br /><br /><b>This power can be obtained from the SCR/GCR store</b>";

// super stat class
/**@constructor*/
SuperStat = function(id, name, desc, abbrev, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.abbrev = abbrev;
    this.tip = tip;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', abbrev=\'' + this.abbrev + '\', tip=\'' + this.tip + '\', code=' + this.code() + ']';
    }
}

// super stat data
var dataSuperStat = [];
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, null, null, null, null);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Strength', '<div class="Sprite Stat_Strength"></div>&nbsp;Strength', 'Str', 'Improves Melee Damage, Melee Knocks, Knock Resistance, and the pick-up and throw ability.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Dexterity', '<div class="Sprite Stat_Dexterity"></div>&nbsp;Dexterity', 'Dex', 'Improves a hero\\\'s Critical Hit Chance and effectiveness of Stealth granting powers.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Constitution', '<div class="Sprite Stat_Constitution"></div>&nbsp;Constitution', 'Con', 'Improves a hero\\\'s Hit Points.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Intelligence', '<div class="Sprite Stat_Intelligence"></div>&nbsp;Intelligence', 'Int', 'Affects the hero\\\'s power cooldown length, Stealth Detection, and the Energy Cost of their powers.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Ego', '<div class="Sprite Stat_Ego"></div>&nbsp;Ego', 'Ego', 'Improves Ranged Damage, Ranged Knocks, and Hold Resistance.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Presence', '<div class="Sprite Stat_Presence"></div>&nbsp;Presence', 'Pre', 'Improves Healing Strength, Hold Duration, and Crowd Control Resistance.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Recovery', '<div class="Sprite Stat_Recovery"></div>&nbsp;Recovery', 'Rec', 'Sets the hero\\\'s Equilibrium, increases rate of Energy generated from Energy building attacks, and grants a small increase to Maximum Energy.');
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, 'Endurance', '<div class="Sprite Stat_Endurance"></div>&nbsp;Endurance', 'End', 'Affects a hero\\\'s Maximum Energy and rate of energy generated from fighting attacks.');

//==============================================================================
// Innate Talents
//==============================================================================

// innate talent class
/**@constructor*/
InnateTalent = function(id, name, desc, extra, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.extra = extra;
    this.tip = tip;
    this.code = function() {
        return numToUrlCode2(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', extra=\'' + this.extra + '\', tip=\'' + this.tip + '\', code=' + this.code() + ']';
    }
}

// innate talent data
var dataInnateTalent = [];
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, null, null, null, null);
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Sureshot', 'Sureshot', 'Dex: 12, Int: 12', 'This is the innate talent for Archery.<br />Con: 5, End: 5, Str: 5, Dex: 12, Int: 12, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Abyssal', 'Abyssal', 'Con: 12, End: 12', 'This is the innate talent for Darkness.<br />Con: 12, End: 12, Str: 5, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Energized', 'Energized', 'Rec: 12, End: 12', 'This is the innate talent for Electricity.<br />Con: 5, End: 12, Str: 5, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 12');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Incandescent', 'Incandescent', 'Pre: 12, Rec: 12', 'This is the innate talent for Fire.<br />Con: 5, End: 5, Str: 5, Dex: 5, Int: 5, Ego: 5, Pre: 12, Rec: 12');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Impetus', 'Impetus', 'Ego: 12, End: 12', 'This is the innate talent for Force.<br />Con: 5, End: 12, Str: 5, Dex: 5, Int: 5, Ego: 12, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Tech Savvy', 'Tech Savvy', 'Int: 12, End: 12', 'This is the innate talent for Gadgeteering.<br />Con: 5, End: 12, Str: 5, Dex: 5, Int: 12, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Absolute Zero', 'Absolute Zero', 'Dex: 12, Rec: 12', 'This is the innate talent for Ice.<br />Con: 5, End: 5, Str: 5, Dex: 12, Int: 5, Ego: 5, Pre: 5, Rec: 12');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'One of Mind and Body', 'One of Mind and Body', 'Str: 12, Dex: 12', 'This is the innate talent for Martial Arts.<br />Con: 5, End: 5, Str: 12, Dex: 12, Int: 5, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Superhuman', 'Superhuman', 'Str: 12, Con: 12', 'This is the innate talent for Might.<br />Con: 12, End: 5, Str: 12, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Quick Trigger', 'Quick Trigger', 'Dex: 12, Ego: 12', 'This is the innate talent for Munitions.<br />Con: 5, End: 5, Str: 5, Dex: 12, Int: 5, Ego: 12, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Mechanized', 'Mechanized', 'Str: 12, Int: 12', 'This is the innate talent for Power Armor.<br />Con: 5, End: 5, Str: 12, Dex: 5, Int: 12, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Arcanus', 'Arcanus', 'Int: 12, Pre: 12', 'This is the innate talent for Sorcery.<br />Con: 5, End: 5, Str: 5, Dex: 5, Int: 12, Ego: 5, Pre: 12, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Inhuman', 'Inhuman', 'Con: 12, Rec: 12', 'This is the innate talent for Infernal Supernatural.<br />Con: 12, End: 5, Str: 5, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 12');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Matter Manipulator', 'Matter Manipulator', 'Con: 12, Ego: 12', 'This is the innate talent for Telekinesis.<br />Con: 12, End: 5, Str: 5, Dex: 5, Int: 5, Ego: 12, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Mind over Matter', 'Mind over Matter', 'Ego: 12, Pre: 12', 'This is the innate talent for Telepathy.<br />Con: 5, End: 5, Str: 5, Dex: 5, Int: 5, Ego: 12, Pre: 12, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Hero', 'The Hero', 'End: 6, Rec: 6, Other Stats: 8', 'This is the innate talent for The Hero.<br />Con: 8, End: 6, Str: 8, Dex: 8, Int: 8, Ego: 8, Pre: 8, Rec: 6');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Divinity', 'Divinity', 'Con: 12, Pre: 12', 'This is the innate talent for Celestial.<br />Con: 12, End: 5, Str: 5, Dex: 5, Int: 5, Ego: 5, Pre: 12, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'Feral', 'Feral', 'Str: 12, Rec: 12', 'This is the innate talent for Bestial Supernatural.<br />Con: 5, End: 5, Str: 12, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 12');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Inferno', 'The Inferno', 'End: 10, Dex: 10, Ego: 8, Rec: 10', 'This is the innate talent for The Inferno.<br />Con: 5, End: 10, Str: 5, Dex: 10, Int: 5, Ego: 8, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Soldier', 'The Soldier', 'Dex: 10, Int: 8, Ego: 10, Rec: 10', 'This is the innate talent for The Soldier.<br />Con: 5, End: 5, Str: 5, Dex: 10, Int: 8, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Blade', 'The Blade', 'End: 8, Str: 10, Dex: 10, Rec: 10', 'This is the innate talent for The Blade.<br />Con: 5, End: 8, Str: 10, Dex: 10, Int: 5, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Savage', 'The Savage', 'Con: 10, Str: 10, Dex: 8, Rec: 10', 'This is the innate talent for The Brute.<br />Con: 10, End: 5, Str: 10, Dex: 8, Int: 5, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Behemoth', 'The Behemoth', 'Con: 10, End: 8, Str: 10, Rec: 10', 'This is the innate talent for The Behemoth.<br />Con: 10, End: 8, Str: 10, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Glacier', 'The Glacier', 'Con: 10, End: 10, Dex: 8, Int: 10', 'This is the innate talent for The Glacier.<br />Con: 10, End: 10, Str: 5, Dex: 8, Int: 10, Ego: 5, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Mind', 'The Mind', 'End: 10, Int: 8, Ego: 10, Pre: 10', 'This is the innate talent for The Mind.<br />Con: 5, End: 10, Str: 5, Dex: 5, Int: 8, Ego: 10, Pre: 10, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Grimoire', 'The Grimoire', 'Int: 10, Ego: 10, Pre: 10, Rec: 8', 'This is the innate talent for The Grimoire.<br />Con: 5, End: 5, Str: 5, Dex: 5, Int: 10, Ego: 10, Pre: 10, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Assassin', 'The Assassin', 'Str: 10, Dex: 10, Int: 8, Ego: 10', 'This is the innate talent for an unknown archetype.<br />Con: 5, End: 5, Str: 10, Dex: 10, Int: 8, Ego: 10, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Marksman', 'The Marksman', 'End: 8, Dex: 10, Int: 10, Ego: 10', 'This is the innate talent for The Marksman.<br />Con: 5, End: 8, Str: 5, Dex: 10, Int: 10, Ego: 10, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Void', 'The Void', 'Con: 10, End: 10, Dex: 8, Ego: 10', 'This is the innate talent for The Void.<br />Con: 10, End: 10, Str: 5, Dex: 8, Int: 5, Ego: 10, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Inventor', 'The Inventor', 'End: 8, Int: 10, Ego: 10, Pre: 10', 'This is the innate talent for The Inventor.<br />Con: 5, End: 8, Str: 5, Dex: 5, Int: 10, Ego: 10, Pre: 10, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Tempest', 'The Tempest', 'End: 10, Dex: 8, Ego: 10, Rec: 10', 'This is the innate talent for The Tempest.<br />Con: 5, End: 10, Str: 5, Dex: 8, Int: 5, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Devastator', 'The Devastator', 'Con: 10, End: 8, Str: 10, Rec: 10', 'This is the innate talent for The Devastator.<br />Con: 10, End: 8, Str: 10, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Disciple', 'The Disciple', 'Dex: 10, Int: 8, Ego: 10, Rec: 10', 'This is the innate talent for The Disciple.<br />Con: 5, End: 5, Str: 5, Dex: 10, Int: 8, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Impulse', 'The Impulse', 'End: 10, Int: 10, Ego: 10, Rec: 8', 'This is the innate talent for The Impulse.<br />Con: 5, End: 10, Str: 5, Dex: 5, Int: 10, Ego: 10, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Fist', 'The Fist', 'Str: 10, Dex: 10, Int: 10, Rec: 8', 'This is the innate talent for The Fist.<br />Con: 5, End: 5, Str: 10, Dex: 10, Int: 10, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Master', 'The Master', 'Con: 10, Str: 10, Dex: 10, Rec: 8', 'This is the innate talent for The Master.<br />Con: 10, End: 5, Str: 10, Dex: 10, Int: 5, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Scourge', 'The Scourge', 'Con: 10, End: 8, Ego: 10, Rec: 10', 'This is the innate talent for The Scourge and The Cursed.<br />Con: 10, End: 8, Str: 5, Dex: 5, Int: 5, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Squall', 'The Squall', 'End: 10, Dex: 8, Ego: 10, Rec: 10', 'This is the innate talent for The Squall.<br />Con: 5, End: 10, Str: 5, Dex: 8, Int: 5, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Mountain', 'The Mountain', 'Con: 10, End: 10, Str: 8, Ego: 10', 'This is the innate talent for The Mountain.<br />Con: 10, End: 10, Str: 8, Dex: 5, Int: 5, Ego: 10, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Unleashed', 'The Unleashed', 'Str: 10, Dex: 10, Int: 8, Rec: 10', 'This is the innate talent for The Unleashed.<br />Con: 5, End: 5, Str: 10, Dex: 10, Int: 8, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Radiant', 'The Radiant', 'Int: 10, Ego: 10, Pre: 10, Rec: 8', 'This is the innate talent for The Radiant.<br />Con: 5, End: 5, Str: 5, Dex: 5, Int: 10, Ego: 10, Pre: 10, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Invincible', 'The Invincible', 'Con: 10, End: 10, Int: 10, Ego: 8', 'This is the innate talent for The Invincible.<br />Con: 10, End: 10, Str: 5, Dex: 5, Int: 10, Ego: 8, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Night Avenger', 'The Night Avenger', 'End: 8, Str: 10, Dex: 10, Ego: 10', 'This is the innate talent for The Night Avenger.<br />Con: 5, End: 8, Str: 10, Dex: 10, Int: 5, Ego: 10, Pre: 5, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Chiller', 'The Chiller', 'Con: 10, End: 10, Dex: 10, Rec: 8', 'This is the innate talent for The Chiller.<br />Con: 10, End: 10, Str: 5, Dex: 10, Int: 5, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Rockstar', 'The Rockstar', 'Str: 10, Con: 10, End: 10, Rec: 8', 'This is the innate talent for The Rockstar.<br />Con: 10, End: 10, Str: 10, Dex: 5, Int: 5, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Predator', 'The Predator', 'Str: 8, Con: 10, Dex: 10, Rec: 10', 'This is the innate talent for The Predator.<br />Con: 8, End: 5, Str: 10, Dex: 10, Int: 5, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Penitent', 'The Penitent', 'Str: 10, End: 10, Dex: 10, Rec: 8', 'This is the innate talent for The Penitent.<br />Con: 5, End: 10, Str: 10, Dex: 10, Int: 5, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Hexslinger', 'The Hexslinger', 'Dex: 10, Int: 10, Ego: 10, Pre: 8', 'This is the innate talent for The Hexslinger.<br />Con: 5, End: 5, Str: 5, Dex: 10, Int: 10, Ego: 10, Pre: 8, Rec: 5');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Witch', 'The Witch', 'Con: 10, Int: 8, Pre: 10, Rec: 10', 'This is the innate talent for The Witch.<br />Con: 10, End: 5, Str: 5, Dex: 5, Int: 8, Ego: 5, Pre: 10, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Cybernetic Warrior', 'The Cybernetic Warrior', 'Con: 10, End: 10, Int: 10, Rec: 8', 'This is the innate talent for The Cybernetic Warrior.<br />Con: 10, End: 10, Str: 5, Dex: 5, Int: 10, Ego: 5, Pre: 5, Rec: 8');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Automaton', 'The Automaton', 'Con: 10, End: 8, Int: 10, Ego: 10', 'This is the innate talent for The Automaton.<br />Con: 10, End: 8, Str: 5, Dex: 5, Int: 10, Ego: 10, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Specialist', 'The Specialist', 'Con: 10, Dex: 10, Int: 8, Rec: 10', 'This is the innate talent for The Specialist.<br />Con: 10, End: 5, Str: 5, Dex: 10, Int: 8, Ego: 5, Pre: 5, Rec: 10');
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, 'The Gunslinger', 'The Gunslinger', 'Con: 10, Dex: 10, Ego: 8, Rec: 10', 'This is the innate talent for The Gunslinger.<br />Con: 10, End: 5, Str: 5, Dex: 10, Int: 5, Ego: 8, Pre: 5, Rec: 10');

//==============================================================================
// Talents
//==============================================================================

// talent class
/**@constructor*/
Talent = function(id, name, desc, extra) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.extra = extra;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', extra=\'' + this.extra + '\', code=' + this.code() + ']';
    }
}

// talent data
var dataTalent = [];
dataTalent[dataTalent.length] = new Talent(dataTalent.length, null, null, null);
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Mighty', 'Mighty', 'Str: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Agile', 'Agile', 'Dex: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Enduring', 'Enduring', 'Con: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Brilliant', 'Brilliant', 'Int: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Indomitable', 'Indomitable', 'Ego: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Intimidating', 'Intimidating', 'Pre: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Tireless', 'Tireless', 'Rec: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Energetic', 'Energetic', 'End: 8');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Martial Focus', 'Martial Focus', 'Str: 5, Dex: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Physical Conditioning', 'Physical Conditioning', 'Str: 5, Con: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Body and Mind', 'Body and Mind', 'Str: 5, Int: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Professional Athlete', 'Professional Athlete', 'Str: 5, Ego: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Impressive Physique', 'Impressive Physicque', 'Str: 5, Pre: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Relentless', 'Relentless', 'Str: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Bodybuilder', 'Bodybuilder', 'Str: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Acrobat', 'Acrobat', 'Dex: 5, Con: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Coordinated', 'Coordinated', 'Dex: 5, Int: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Shooter', 'Shooter', 'Dex: 5, Ego: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Finesse', 'Finesse', 'Dex: 5, Pre: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Impresario', 'Impresario', 'Dex: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Accurate', 'Accurate', 'Dex: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Healthy Mind', 'Healthy Mind', 'Con: 5, Int: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Ascetic', 'Ascetic', 'Con: 5, Ego: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Shrug It Off', 'Shrug It Off', 'Con: 5, Pre: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Quick Recovery', 'Quick Recovery', 'Con: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Boundless Reserves', 'Boundless Reserves', 'Con: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Academics', 'Academics', 'Int: 5, Ego: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Diplomatic', 'Diplomatic', 'Int: 5, Pre: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Negotiator', 'Negotiator', 'Int: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Investigator', 'Investigator', 'Int: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Showmanship', 'Showmanship', 'Ego: 5, Pre: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Wordly', 'Wordly', 'Ego: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Daredevil', 'Daredevil', 'Ego: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Lasting Impression', 'Lasting Impression', 'Pre: 5, Rec: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Prodigy', 'Prodigy', 'Pre: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Amazing Stamina', 'Amazing Stamina', 'Rec: 5, End: 5');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Covert Ops Training', 'Covert Ops Training', 'Str: 3, Dex: 3, Con: 3, Int: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Martial Training', 'Martial Training', 'Str: 3, Dex: 3, Ego: 3, Rec: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Paramilitary Training', 'Paramilitary Training', 'Str: 3, Con: 3, Rec: 3, End: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Discipline Training', 'Discipline Training', 'Str: 3, Int: 3, Pre: 3, End: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Sniper Training', 'Sniper Training', 'Dex: 3, Ego: 3, Pre: 3, End: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Command Training', 'Command Training', 'Int: 3, Ego: 3, Pre: 3, Rec: 3');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Survival Training', 'Survival Training', 'Dex: 3, Con: 3, Pre: 3, Rec: 2, End: 2');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Field Ops Training', 'Field Ops Training', 'Con: 3, Int: 3, Ego: 3, Rec: 2, End: 2');
dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Jack of All Trades', 'Jack of All Trades', 'All: 2');
//dataTalent[dataTalent.length] = new Talent(dataTalent.length, 'Jack of All Trades', 'Jack of All Trades', 'Str: 2, Dex: 2, Con: 2, Int: 2, Ego: 2, Pre: 2, Rec: 2, End: 2');

//==============================================================================
// Power Aliases (set with their powers)
//==============================================================================

// power alias class
/**@constructor*/
PowerAlias = function(id, name, desc, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.tip = tip;
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', tip=\'' + this.tip + '\']';
    }
}

// power alias data
var dataPowerAlias = [];

//==============================================================================
// Power Advantages (set with their powers)
//==============================================================================

// power advantage class
/**@constructor*/
PowerAdvantage = function(id, name, desc, points, dependency, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.points = points;
    this.dependency = dependency;
    this.tip = tip;
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', points=' + this.points + ', dependency=' + this.dependency + ', tip=\'' + this.tip + '\']';
    }
}

//==============================================================================
// Travel Powers
//==============================================================================

// travel power class
/**@constructor*/
TravelPower = function(iTravelPowerType=null, iUnlockType=null, sName=null, sAltIcon=null, sExtra=null, sOverrideTip=null, aOtherSources=[])
{
    this.id = dataTravelPower.length;
    this.name = sName;
    this.desc = null;
	this.isVariant = (sOverrideTip != null);
	this.type = iTravelPowerType;
	this.tip = sOverrideTip;
	this.unlockType = iUnlockType;
    this.advantageList = [];
	
	if (sName)
	{
		if (sAltIcon) this.desc = "<div class=\"Sprite TravelPower_" + sAltIcon + "\"></div>" + sName;
		else this.desc = "<div class=\"Sprite TravelPower_" + sName.replace(/[^A-Za-z0-9_]+/g, "") + "\"></div>" + sName;
	}
	
	if (iTravelPowerType != null)
	{
		this.advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
		this.advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2TP'].name, dataPowerAlias['R2TP'].desc, 1, null, dataPowerAlias['R2TP'].tip));
		this.advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3TP'].name, dataPowerAlias['R3TP'].desc, 1, 1, dataPowerAlias['R3TP'].tip));
		
		if (!sOverrideTip) this.tip = dataPowerAlias[TRAVEL_POWER_TYPES[iTravelPowerType]].tip;
		if (sExtra) this.tip += "<br /><br />" + sExtra;
		
		this.tip = "<b>" + sName + "</b><br /><br />Travel Power - " + TRAVEL_POWER_TYPES[iTravelPowerType] + "<br /><br />" + this.tip;
	}
	
	var i;
	var iLength = aOtherSources.length;
	this.tip += "<ul>";
	if (iUnlockType && iUnlockType > 0) this.tip += "<li>" + TP_UNLOCK_TYPES[iUnlockType] + "</li>";
	for (i = 0; i < iLength; i++)
	{
		this.tip += "<li>" + aOtherSources[i] + "</li>";
	}
	this.tip += "</ul>";
	
	this.insertAdvantage = function(sName, iCost, sTip, iDependency=null)
	{
		this.advantageList.push(new PowerAdvantage(this.advantageList.length, sName, sName, iCost, iDependency, sTip));
	}
	
    this.code = function()
	{
        return numToUrlCode2(this.id);
    }
    this.getAdvantageList = function(mask)
	{
        var advantageList = [];
        if (mask > 0) {
            for (var i = 1; i < this.advantageList.length; i++)
			{
                var test = Math.pow(2, i);
                if ((mask & test) == test) advantageList.push(this.advantageList[i]);
            }
        }
        return advantageList;
    }
    this.getPoints = function(mask)
	{
        var points = 0;
        if (mask > 0)
		{
            for (var i = 1; i < this.advantageList.length; i++)
			{
                var test = Math.pow(2, i);
                if ((mask & test) == test) points += this.advantageList[i].points;
            }
        }
        return points;
    }
    this.hasAdvantage = function(mask, id)
	{
        var test = Math.pow(2, id);
        return (mask > 0 && (mask & test) == test);
    }
    this.addAdvantage = function(mask, id)
	{
        return mask | Math.pow(2, id);
    }
    this.delAdvantage = function(mask, id)
	{
        return mask & ~Math.pow(2, id);
    }
    this.equals = function(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function()
	{
        var advantageList = '[';
        for (var i = 1; i < this.advantageList.length; i++)
		{
            if (i > 1) advantageList = advantageList + ',';
            advantageList = advantageList + '<br /> &nbsp;&nbsp;&nbsp;&nbsp; ' + this.advantageList[i].toString();
        }
        advantageList = advantageList + '<br />]';
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', tip=\'' + this.tip + '\', advantageList=' + advantageList + ', code=' + this.code() + ']';
    }
}

// travel power data
var dataTravelPower = [];

//------------------------------------------------------------------------------
// Travel Power Aliases
//------------------------------------------------------------------------------

dataPowerAlias['Flight'] = new PowerAlias('Flight', 'Flight', '<div class="Sprite TravelPower_Flight"></div>Flight', 'Grants +20 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, ou gain an additional +17 Flight Speed.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Jump'] = new PowerAlias('Jump', 'Superjump', '<div class="Sprite TravelPower_Superjump"></div>Superjump', 'Grants +35 Jump Speed and +60 Jump Height while active.  Outside of combat, you build up speed and height over time.  After 4 seconds, you gain +30 Jump Speed and +34 Jump Height.  After 10 seconds, you gain an additional +17 Jump Speed and +34 Jump Height.<br /><br />While active, you suffer a -6.2% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Speed'] = new PowerAlias('Speed', 'Superspeed', '<div class="Sprite TravelPower_Superspeed"></div>Superspeed', 'Grants 100% Run Speed while active.  Outside of Combat, you build up speed over time.  After 4 seconds, you gain +85% Run Speed.  After 10 seconds, you gain an additional +85% Run Speed.<br /><br />While moving quickly, your jump speed is slightly increases and foes are less likely to notice you.<br /><br />While active, you suffer a -9.4% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Athletics'] = new PowerAlias('Athletics', 'Athletics', '<div class="Sprite TravelPower_Athletics"></div>Athletics', 'Grants +75% Run Speed, +10 Jump Speed, and +10 Jump Height while active.  Outside of combat, you build up speed and height over time.  After 4 seconds, you gain +50% Run Speed, +8.5 Jump Speed, and +8.5 Jump Height.  After 10 seconds, you gain an additional +50% Run Speed, +8.5 Jump Speed, and +8.5 Jump Height.<br /><br />While active, you suffer a -3.1% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Swinging'] = new PowerAlias('Swinging', 'Swinging', '<div class="Sprite TravelPower_Swinging"></div>Swinging', 'Grants +50 Jump Height, +25 Jump Speed, and 45 Swing Speed while active.  Out of combat, you build up jump speed over time.  After 4 seconds, you gain +8.5 Jump Speed and 13 Swing Speed.  After 10 seconds, you gain an additional +8.5 Jump Speed and 13 Swing Speed.');
dataPowerAlias['Tunneling'] = new PowerAlias('Tunneling', 'Tunneling', '<div class="Sprite TravelPower_Tunneling"></div>Tunneling', 'While active, you burrow underground, allowing you to move around beneath the surface, undetected by foes.  While active, you gain +30 Run Speed.');
dataPowerAlias['Teleport'] = new PowerAlias('Teleport', 'Teleportation', '<div class="Sprite TravelPower_Teleportation"></div>Teleportation', 'Phase out for a short period of time.  While out of phase, you gain +60 Flight Speed and it becomes incredibly difficult for foes to notice you, however you cannot use any powers and healing against you is greatly reduced.  The duration of Teleport is reduced while in combat, and if you strike a foe shortly after phasing back in, Teleport activates a short cooldown.');

dataPowerAlias['R2TP'] = new PowerAlias('R2TP', 'Rank 2', 'Rank 2', 'Increases speed of travel power.');
dataPowerAlias['R3TP'] = new PowerAlias('R3TP', 'Rank 3', 'Rank 3', 'Increases speed of travel power.');

dataPowerAlias['Impact'] = new PowerAlias('Impact', 'Impact', 'Impact', 'While this travel power is active, you gain a damage bonus which scales with your current speed. This bonus persists for a short time upon losing speed or stopping.');
dataPowerAlias['Versatility'] = new PowerAlias('Versatility', 'Versatility', 'Versatility', 'While this travel power is active, if you take damage you will receive a stack of Versatility, up to 5 stacks. Versatility increases your movement speed for a short time.');
dataPowerAlias['Flippin'] = new PowerAlias('Flippin\'', 'Flippin\'', 'Flippin\'', 'While Swinging is active, you gain a bonus to your ability to dodge attacks.');
dataPowerAlias['Earthen Embrace'] = new PowerAlias('Earthen Embrace', 'Earthen Embrace', 'Earthen Embrace', 'While tunneling, you will gain a stack of Earthen Embrace every 3 seconds, up to 6 stacks. Earthen Embrace increases your resistance to all types of damage. These stacks will persist for a short time after you stop tunneling.');

//------------------------------------------------------------------------------
// Travel Power Data
//------------------------------------------------------------------------------

dataTravelPower[dataTravelPower.length] = new TravelPower();

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_FREE, dataPowerAlias['Flight'].name);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, TP_UNLOCK_FREE, dataPowerAlias['Jump'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage('Rebounding Resilience', 2, 'While Superjump is active, holds are more difficult to land on you.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_FREE, dataPowerAlias['Speed'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_FREE, 'Acrobatics');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Versatility'].name, 2, dataPowerAlias['Versatility'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_FREE, 'Mach Speed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_FREE, dataPowerAlias['Athletics'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Versatility'].name, 2, dataPowerAlias['Versatility'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT,  TP_UNLOCK_FREE, dataPowerAlias['Teleport'].name);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Ice Slide', null, null, 'This power will probably end up killing you.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_CSTORE_GOLD, dataPowerAlias['Swinging'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_CSTORE_GOLD, dataPowerAlias['Tunneling'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Jet Boots', null, null, 'Help!  My feet are on fire! T___T');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, TP_UNLOCK_CSTORE_GOLD, 'Rocket Jump');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Fire Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Hover Disk', null, null, 'Does not work over water.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Earth Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE_GOLD, 'Lightspeed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Rainbow Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Rainbow Flight: Cloud');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Phoenix Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tornado Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Magic Carpet');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Jet Pack', null, null, 'Jet pack!  whee!');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Heroic Flight');
dataTravelPower[dataTravelPower.length-1].insertAdvantage('Fanfare', 0, 'Adds fanfare music to the activation of the power.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Power Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_QSTORE, 'Scarab Tunneling');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Blazing Speed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage('Blazing Impact', 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Lightning Flash');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Electric Arc');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Snowball Roll');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Distortion Superspeed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Displacement Superspeed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Distortion Acrobatics');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Versatility'].name, 2, dataPowerAlias['Versatility'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Displacement Acrobatics');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Versatility'].name, 2, dataPowerAlias['Versatility'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Retractable Wings');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Electro Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_QSTORE, 'Hyper Ball');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Mystic Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Bat Flight', null, 'Cannot use abilities while active.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Scarab Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_QSTORE, 'Ooze Tunneling');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_QSTORE, 'Inky Ooze Tunneling', 'OozeTunneling');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_QSTORE, 'Metallic Ooze Tunneling', 'OozeTunneling');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

// TODO: get proper image
dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_QSTORE, 'Chain Swinging', 'Swinging');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

// TODO: get proper image
dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_QSTORE, 'Energy Swinging', 'Swinging');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

// TODO: get proper image
dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_QSTORE, 'Vine Swinging', 'Swinging');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_LEGACY, 'Storm Rider', 'ElectroFlight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_LEGACY, 'R.A.D. Sphere', 'HyperBall');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_LEGACY, 'Aethyric Incantation', 'MysticFlight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Energy Slide', null, null, 'Alternate speed power');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, null, 'Flag Speed', null, null, null, ["Patriot event unlock"]);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, null, 'Millennial Flight', null, null, null, ["LTS reward"]);

// TODO: get proper image
dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Ninja Vanish', 'Teleportation');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Cape Glide', null, null, 'Alternate flight power');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE,  'Shadow Wings');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Shadow Skull Flight', null, 'Cannot use abilities while active.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Ninja Leaves');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Flag Flight', 'Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Canadian Flag Flight', 'Flight', null, null, ['Patriot event reward']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Hoverboard', null, null, 'Alternate flight power');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tricolor Flight (Vertical)', 'Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tricolor Flight (Horizontal)', 'Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, null, 'Arcane Flight', 'Flight', null, null, ['Arcane Lockbox']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Tricolor Superspeed (Horizontal)', 'Superspeed');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Tricolor Superspeed (Vertical)', 'MachSpeed');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, null, 'Frost Speed', 'Superspeed', null, null, ['Toybox']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, null, 'Cold Snap Speed', 'MachSpeed', null, null, ['Toybox']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Rainbow Speed', 'Superspeed');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Prism Speed', 'MachSpeed');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Rainbow Acrobatics', 'Acrobatics');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Prism Athletics', 'Athletics');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Blazing Acrobatics', 'Acrobatics');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Scorching Athletics', 'Athletics');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, TP_UNLOCK_CSTORE, 'Rainbow Jump', 'Superjump');


//==============================================================================
// Power Sets
//==============================================================================

// power set class
/**@constructor*/
PowerSet = function(id, name, desc) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\']';
    }
}

// power set data
var dataPowerSet = [];
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Energy Projector', '<div class="Sprite PowerSet_EnergyProjector"></div>&nbsp;Energy Projector');
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Technology', '<div class="Sprite PowerSet_Technology"></div>&nbsp;Technology');
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Martial Arts', '<div class="Sprite PowerSet_MartialArts"></div>&nbsp;Martial Arts');
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Mentalist', '<div class="Sprite PowerSet_Mentalist"></div>&nbsp;Mentalist');
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Brick', '<div class="Sprite PowerSet_Brick"></div>&nbsp;Brick');
dataPowerSet[dataPowerSet.length] = new PowerSet(dataPowerSet.length, 'Mystic', '<div class="Sprite PowerSet_Mystic"></div>&nbsp;Mystic');

//==============================================================================
// Power Frameworks
//==============================================================================

// framework class
/**@constructor*/
Framework = function(id, powerset, name, desc, tip) {
    this.id = id;
	this.powerset = powerset;
    this.name = name;
    this.desc = desc;
    this.tip = tip;
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', tip=\'' + this.tip + '\']';
    }
}

// framework data
var dataFramework = [];
dataFramework[dataFramework.length] = new Framework(dataFramework.length, null, null, null, null);
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 0, 'Electricity', '<div class="Sprite Framework_Electricity"></div>', '<b>Electricity</b><br /><br />You channel the power of the storm. Fling lightning bolts at those who displease you. You are all about offense. Your attacks allow you to fight multiple enemies at once and dominate a battlefield. However, it takes a lot out of you. You can chain your attacks to strike multiple enemies at once and generate Energy for yourself. Generate enough Energy, an you can transform yourself into electricity and become even more powerful.<br /><br />* Recommended Characteristics: Recovery and Endurance<br />* Starting Innate Talent: Energized<br />* Suggested Skill: Mysticism or Arms<br />* Main Damage Type: Electrical<br />* Main Mechanics: Negative Ions<br />* Archetypes: The Tempest');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 0, 'Fire', '<div class="Sprite Framework_Fire"></div>', '<b>Fire</b><br /><br />You can wield the heat of the inferno to damage every enemy in front of you with contemptuous ease. Use your fire powers to fight multiple enemies within range at once. Most of your fire powers will cause enemies to burn for a long time, weakening them long after your initial attack. You create enduring patches of flame on the battlefield and gain Energy from nearby fire.<br /><br />* Recommended Characteristics: Presence and Recovery<br />* Starting Innate Talent: Incandescent<br />* Suggested Skill: Mysticism<br />* Main Damage Type: Fire<br />* Main Mechanics: Clinging Flames<br />* Archetypes: The Inferno');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 0, 'Force', '<div class="Sprite Framework_Force"></div>', '<b>Force</b><br /><br />Wield raw kinetic Energy to protect yourself and your allies, and send your enemies flying. Cast protective forcefields for yourself and your allies while you use your kinetic powers to seriously damage your enemies. Force grants quick access to the personal force field power and allows you to regain Energy to fuel your attacks by protecting and aiding your allies. Every strike aimed at your shield feeds you a small amount of Energy.<br /><br />* Recommended Characteristics: Ego and Endurance<br />* Starting Innate Talent: Impetus<br />* Suggested Skill: Mysticism or Arms<br />* Main Damage Type: Crushing<br />* Main Mechanics: Containment Fields<br />* Archetypes: The Impulse, The Unleashed');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 0, 'Wind', '<div class="Sprite Framework_Wind"></div>', '<b>Wind</b><br /><br />You can control the wind and weather currents around you, creating raging hurricanes, powerful twisters, and huge gusts of wind to Knock Down and Disorient your foes.<br /><br />* Recommended Characteristics: Recovery and Endurance<br />* Starting Innate Talent: Energized<br />* Suggested Skill: Mysticism or Arms<br />* Main Damage Type: Crushing, Electrical, Cold<br />* Main Mechanics: Disorient, Repel<br />* Archetypes: The Squall');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 0, 'Ice', '<div class="Sprite Framework_Ice"></div>', '<b>Ice</b><br /><br />Damage your enemies while slowing them down with ice projections and cages of bitter cold. Trap your enemies in cages of ice, or build explosive ice structures on the field of battle. Your powers are excellent for damaging and trapping. Enemies caught in detonation structures gives you Energy.<br /><br />* Recommended Characteristics: Dexterity and Recovery<br />* Starting Innate Talent: Absolute Zero<br />* Suggested Skill: Science<br />* Main Damage Type: Cold<br />* Main Mechanics: Chill, Ice Objects<br />* Archetypes: The Glacier, The Icicle');

dataFramework[dataFramework.length] = new Framework(dataFramework.length, 1, 'Archery', '<div class="Sprite Framework_Archery"></div>', '<b>Archery</b><br /><br />You are a hunter of men, singling out the corrupt and the unjust. Through the use of specialized arrows archers have access to a wider variety of attacks than most characters and can switch between Roots, Stuns and other status effects at will. When archers establish a quarry their attacks become increasingly accurate and efficient.<br /><br />* Recommended Characteristics: Dexterity and Intelligence<br />* Starting Innate Talent: Sureshot<br />* Suggested Skill: Science<br />* Main Damage Type: Piercing<br />* Archetypes: The Marksman');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 1, 'Gadgeteering', '<div class="Sprite Framework_Gadgeteering"></div>', '<b>Gadgeteering</b><br /><br />Whatever the situation, you have a gadget to solve it. Flaming crocodiles chasing you? No problem… Create pet robots that heal, gunbots that shoot, defensive towers, and many, many more toys. Pets, pets, and more pets.<br /><br />* Recommended Characteristics: Endurance and Intelligence<br />* Starting Innate Talent: Technological Intuition<br />* Suggested Skill: Science<br />* Main Damage Types: Particle<br />* Archetypes: The Inventor, The Night Avenger, and The Automaton');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 1, 'Munitions', '<div class="Sprite Framework_Munitions"></div>', '<b>Munitions</b><br /><br />You use normal world tech to accomplish superhuman feats. Your level of skill is breathtaking. You may be military, law enforcement, paramilitary or independent. You have more firepower than just about everyone else, and it costs you very little. In exchange, you have somewhat less flexibility than some of your fellow superheroes. Mines and demolitions allow you to control territory and a wide variety of weapon replaces allow you to, with planning, find the right gun for the job.<br /><br />* Recommended Characteristics: Dexterity and Ego<br />* Starting Innate Talent: Quick Trigger<br />* Suggested Skill: Mysticism or Science<br />* Main Damage Type: Piercing<br />* Main Mechanics: Critical Hits<br />* Archetypes: The Soldier, The Specialist');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 1, 'Power Armor', '<div class="Sprite Framework_PowerArmor"></div>', '<b>Power Armor</b><br /><br />You are a versatile hero, with equally strong offense and defense. You can use a multitude of weapon systems, activated individually or simultaneously, to create overwhelming wave of firepower. Faster than any other class, you can become invulnerable to the attacks of weaker enemies. You can work will on your own or with a team, thanks to your multi-weapon toggle framework and Targeting Computer.<br /><br />* Recommended Characteristics: Strength and Intelligence<br />* Starting Innate Talent: Mechanized<br />* Suggested Skill: Arms or Science<br />* Main Damage Type: Particle, Crushing<br />* Main Mechanics: Weapon Systems<br />* Archetypes: The Invincible, The Automaton');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 1, 'Laser Sword', '<div class="Sprite Framework_LaserSword"></div>', '<b>Laser Sword</b><br /><br />Your main weapon is your laser sword, a high-damage close combat weapon capable of a number of attacks. You also have Cybernetic energy weapons and other devices at your disposal to make you a deadly adversary.<br /><br />* Recommended Characteristics: Intelligence and Endurance<br />* Starting Innate Talent: Tech Savvy<br />* Suggested Skill: Science or Arms<br />* Main Damage Type: Particle<br />* Main Mechanics: Radiation Effects<br />* Archetypes: The Cybernetic Warrior');

dataFramework[dataFramework.length] = new Framework(dataFramework.length, 2, 'Dual Blades', '<div class="Sprite Framework_DualBlades"></div>', '<b>Dual Blades</b><br /><br />A master of blades, you surround yourself with a withering tempest of steel that damages multiple weaker opponents at once. You gain Energy from every Critical Strike on nearby opponents, which drives you to ever greater prowess. You are the only one with innately multi-target Melee attacks, and you have a strong focus and on scoring Critical Hits.<br /><br />* Recommended Characteristics: Strength and Dexterity<br />* Starting Innate Talent: One of Mind and Body<br />* Suggested Skill: Arms<br />* Main Damage Type: Slashing<br />* Main Mechanics: Critical Hit, Rush/Focus<br />* Archetypes: The Specialist, The Unleashed');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 2, 'Fighting Claws', '<div class="Sprite Framework_FightingClaws"></div>', '<b>Fighting Claws</b><br /><br />You embody the swiftness of the asp, the ferocity of the lion, the precision of the hawk, and the might of the dragon. You can at times inflict bleeding wounds on your opponents that can be exploited for further devastating strikes. Yours is a mobile combat style and random infliction of debilitation effects upon your enemies.<br /><br />* Recommended Characteristics: Strength and Dexterity<br />* Starting Innate Talent: One of Mind and Body<br />* Suggested Skill: Arms<br />* Main Damage Type: Slashing<br />* Main Mechanics: Shredded, Rush/Focus<br />* Archetypes: The Night Avenger');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 2, 'Single Blade', '<div class="Sprite Framework_SingleBlade"></div>', '<b>Single Blade</b><br /><br />The ultimate master of your weapon of choice, you prefer to focus on one specific target and hound that enemy to inevitable defeat. Your attacks are so fierce, your enemies continue to weaken afterwards. Press the attack, and your enemy will completely fall apart. The more you press your opponent with attacks, the more potent the damage you do.<br /><br />* Recommended Characteristics: Strength and Dexterity<br />* Starting Innate Talent: One of Mind and Body<br />* Suggested Skill: Arms<br />* Main Damage Type: Slashing<br />* Main Mechanics: Bleed, Rush/Focus<br />* Archetypes: The Blade, The Penitent');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 2, 'Unarmed', '<div class="Sprite Framework_Unarmed""></div>', '<b>Unarmed</b><br /><br />A master or unarmed martial arts, you specialize in defeated multiple weaker opponents all at once. You are highly agile and mobile and can defeat your enemies with a torrent of kicks and punches. Your agility gives you near supernatural dodging and the ability to gain Energy from dodging an opponents attack. You\\\'re superb in Melee fighting.<br /><br />* Recommended Characteristics: Strength and Dexterity<br />* Starting Innate Talent: One of Mind and Body<br />* Suggested Skill: Arms<br />* Main Damage Type: Crushing<br />* Main Mechanics: Small Dodge Buffs, Rush/Focus<br />* Archetypes: The Master, The Fist');

dataFramework[dataFramework.length] = new Framework(dataFramework.length, 3, 'Telekinesis', '<div class="Sprite Framework_Telekinesis"></div>', '<b>Telekinesis</b><br /><br />You can craft devastating weapons with the power of your mind and exude crushing eaves of force. The telekinesis set mixes close range Melee attacks, using weapons of solidified mental energy, and long range attacks that batter all nearby enemies. You can sheathe yourself in mental energy, dramatically increasing the power of your psi weapon attacks.<br /><br />* Recommended Characteristics: Constitution and Ego<br />* Starting Innate Talent: Matter Manipulator<br />* Suggested Skill: Mysticism or Arms<br />* Main Damage Type: Ego<br />* Main Mechanics: Ego Blades, Ego Leech<br />* Archetypes: The Disciple');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 3, 'Telepathy', '<div class="Sprite Framework_Telepathy"></div>', '<b>Telepathy</b><br /><br />You can attack, control, strengthen or soothe the minds of your foes or allies. You have excellent support and healing powers, as well as crowd control abilities. You can hone your telepathic abilities and learn to gain Energy even as you heal others.<br /><br />* Recommended Characteristics: Ego and Presence<br />* Starting Innate Talent: Mind Reader<br />* Suggested Skill: Mysticism<br />* Main Damage Type: Ego<br />* Main Mechanics: Crowd Control and Healing<br />* Archetypes: The Mind');

dataFramework[dataFramework.length] = new Framework(dataFramework.length, 4, 'Heavy Weapon', '<div class="Sprite Framework_HeavyWeapon"></div>', '<b>Heavy Weapon</b><br /><br />With your strong, heavy swings you are able to take on many foes at once, utilizing the weight of your weapon to Knock your foes down and Disorient them. Striking at one foe or many, you\\\'ll make them regret getting close to you.<br /><br />* Recommended Characteristics: Strength and Recovery<br />* Starting Innate Talent: Feral<br />* Suggested Skill: Arms<br />* Main Damage Type: Crushing<br />* Main Mechanics: Defiant/Enraged and Disorient<br />* Archetypes: The Devastator, The Rockstar');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 4, 'Earth', '<div class="Sprite Framework_Earth"></div>', '<b>Earth</b><br /><br />You have multiple powers that can knock down and weaken your foes, allowing you to gain control of the fight and the attention of your enemies. Your assault enables your allies to attack unhindered, so focus on keeping your enemies attacking you instead of them.<br /><br />* Recommended Characteristics: Constitution and Endurance<br />* Starting Innate Talent: Abyssal<br />* Suggested Skill: Arms<br />* Main Damage Type: Crushing<br />* Main Mechanics: Stagger/Knocks<br />* Archetypes: The Mountain');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 4, 'Might', '<div class="Sprite Framework_Might"></div>', '<b>Might</b><br /><br />Everything around you is a tool you can use. Every enemy is a potential toy to knock around. You excel at slow heavy attacks, massive knock backs and locking down your opponents. The longer you fight, the harder you hit and the less damage you take.<br /><br />* Recommended Characteristics: Strength and Constitution<br />* Starting Innate Talent: Superhuman<br />* Suggested Skill: Arms<br />* Main Damage Type: Crushing<br />* Main Mechanics: Knocks, Defiant/Enraged<br />* Archetypes: The Behemoth');

dataFramework[dataFramework.length] = new Framework(dataFramework.length, 5, 'Celestial', '<div class="Sprite Framework_Celestial"></div>', '<b>Celestial</b><br /><br />Use the power of the Seraphim to heal and strengthen your allies, or release the fury of the Nephilim in a battle against evil.<br /><br />* Recommended Characteristics: Constitution and Presence<br />* Starting Innate Talent: Divinity<br />* Suggested Skill: Science<br />* Main Damage Type: Dimensional<br />* Main Mechanics: Healing/Damage Hybrid powers, Illumination<br />* Archetypes: The Radiant');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 5, 'Darkness', '<div class="Sprite Framework_Darkness"></div>', '<b>Darkness</b><br /><br />The dimensional forces of unadulterated primeval darkness run through you, ripples of power in a sea of extra-dimensional energy. Life drains, transfers, shield made of void, and other dimensional powers are under your command.<br /><br />* Recommended Characteristics: Constitution and Endurance<br />* Starting Innate Talent: Abyssal<br />* Suggested Skill: Arms<br />* Main Damage Type: Dimensional<br />* Main Mechanics: Fear<br />* Archetypes: The Void');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 5, 'Sorcery', '<div class="Sprite Framework_ArcaneSorcery"></div>', '<b>Sorcery</b><br /><br />You can access the powers of the mystic universe. As a sorcerer, you may heal the injured, raise the dead, change the weather, or summon beasts of myth. It\\\'s up to you which spells you choose to learn. You can cast circles of power; stand within them for greater power. You can choose to summon minions if you wish and call upon a greater variety of attacks than any other set.<br /><br />* Recommended Characteristics: Intelligence and Presence<br />* Starting Innate Talent: Arcanus<br />* Suggested Skill: Mysticism or Science<br />* Main Damage Type: Magic<br />* Main Mechanics: ???<br />* Archetypes: The Grimoire, The Hexslinger');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 5, 'Bestial Supernatural', '<div class="Sprite Framework_BestialSupernatural"></div>', '<b>Bestial Supernatural</b><br /><br />You have the fury and powers of a wild beast, ripping and tearing at your enemies in a vicious onslaught of animal rage. You have a diverse set of abilities, including strong crowd control and Melee damage. You can easily improve your regeneration abilities.<br /><br />* Recommended Characteristics: Strength and Recovery<br />* Starting Innate Talent: Feral<br />* Suggested Skill: Arms<br />* Main Damage Type: Slashing<br />* Main Mechanics: ???<br />* Archetypes: The Savage, The Predator, The Penitent');
dataFramework[dataFramework.length] = new Framework(dataFramework.length, 5, 'Infernal Supernatural', '<div class="Sprite Framework_InfernalSupernatural"></div>', '<b>Infernal Supernatural</b><br /><br />Your fiendish powers are forged from nightmare, punishing your foes with a wrathful vengeance. You have an incredibly diverse set of abilities, including excellent crowd control and strong Ranged damage. You can easily improve your regeneration.<br /><br />* Recommended Characteristics: Constitution and Recovery<br />* Starting Innate Talent: Inhuman<br />* Suggested Skill: Arms<br />* Main Damage Type: Toxic<br />* Main Mechanics: Poison/Knocks<br />* Archetypes: The Scourge, The Cursed, The Witch');

//==============================================================================
// Powers
//==============================================================================

// power class
/**@constructor*/
Power = function(id, name, desc, powerSet, framework, power, tier, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.powerSet = powerSet;
    this.framework = framework;
    this.power = power;
    this.tier = tier;
    this.tip = tip;
    this.advantageList = [];
    this.code = function() {
        return numToUrlCode(this.framework) + numToUrlCode(this.power);
    }
    this.getAdvantageList = function(mask) {
        var advantageList = [];
        if (mask > 0) {
            for (var i = 1; i < this.advantageList.length; i++) {
                var test = Math.pow(2, i);
                if ((mask & test) == test) {
                    advantageList.push(this.advantageList[i]);
                }
            }
        }
        return advantageList;
    }
    this.getPoints = function(mask) {
        var points = 0;
        if (mask > 0) {
            for (var i = 1; i < this.advantageList.length; i++) {
                var test = Math.pow(2, i);
                if ((mask & test) == test) {
                    points += this.advantageList[i].points;
                }
            }
        }
        return points;
    }
    this.hasAdvantage = function(mask, id) {
        var test = Math.pow(2, id);
        return (mask > 0 && (mask & test) == test);
    }
    this.addAdvantage = function(mask, id) {
        return mask | Math.pow(2, id);
    }
    this.delAdvantage = function(mask, id) {
        return mask & ~Math.pow(2, id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        var advantageList = '[';
        for (var i = 1; i < this.advantageList.length; i++) {
            if (i > 1) advantageList = advantageList + ',';
            advantageList = advantageList + '<br /> &nbsp;&nbsp;&nbsp;&nbsp; ' + this.advantageList[i].toString();
        }
        advantageList = advantageList + '<br />]';
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', powerSet=' + this.powerSet + ', framework=' + this.framework + ', power=' + this.power + ', tier=' + this.tier + ', tip=' + this.tip + ', advantageList=' + this.advantageList + ', code=' + this.code() + ']';
    }
}

// power data
var dataPower = [];
dataPower[0] = new Power(dataPower.length, null, null, null, 0, 0, null, null);

// energy unlock power data
var dataEnergyUnlockPower = [];

// require group data
var dataRequireGroup = [];

// require group power data
var dataRequireGroupPower = [];

// replace power
var dataReplacePower = [];
//var DATAREPLACEPOWER_CONCENTRATION = -1;

//------------------------------------------------------------------------------
// Power Global Aliases
//------------------------------------------------------------------------------

dataPowerAlias['R2'] = new PowerAlias('R2', 'Rank 2', 'Rank 2', 'Increases the strength of the power by 20%.');
dataPowerAlias['R3'] = new PowerAlias('R3', 'Rank 3', 'Rank 3', 'Increases the strength of the power by an additional 20%.  This bonus is cumulative with Rank 2.');
dataPowerAlias['FR2'] = new PowerAlias('FR2', 'Rank 2', 'Rank 2', 'Grants 2 stacks by default.');
dataPowerAlias['FR3'] = new PowerAlias('FR3', 'Rank 3', 'Rank 3', 'Grants 3 stacks by default.');
dataPowerAlias['R2EB'] = new PowerAlias('R2EB', 'Rank 2', 'Rank 2', 'Increases the strength of the power by 20% and its energy building strength by ~10%.');
dataPowerAlias['R3EB'] = new PowerAlias('R3EB', 'Rank 3', 'Rank 3', 'Increases the strength of the power by an additional 20% and its energy building strength by an additional ~10%.  These bonuses are cumulative with Rank 2.');
dataPowerAlias['AM'] = new PowerAlias('AM', 'Accelerated Metabolism', 'Accelerated Metabolism', 'Every time you use this ability you have a 20% chance to return 10% of your maximum energy.  This effect may only occur once every 15 seconds, even if you have this advantage on multiple powers.');
dataPowerAlias['CC'] = new PowerAlias('CC', 'Break Through', 'Break Through', '+ When the target is blocking, hitting them with this power disables their block for 10 seconds.<br />+ Applies Provoked to the target if they were blocking.  Provoked lowers their damage resistance, healing, and dodge for 10 seconds.<br />+ Your target can removed Provoked by damaging you.<br />+ Provoked cannot be stacked by any target and cannot be refreshed.<br />+ After 10 seconds, your target will gain Unwavering for 10 seconds.  Unwavering prevents their block from being disabled for the duration.<br />+ If used against a target that isnt blocking, they will gain instead gain Unwavering.');
dataPowerAlias['CS'] = new PowerAlias('CS', 'Challenge!', 'Challenge!', 'This advantage causes this attack to generate additional threat against all affected targets, making them more likely to attack you.<br /><br />+ Primary targets receive a large amount of threat every 2 seconds for 4 seconds and a 10% damage debuff for up to 10 seconds which degrades as you take damage from them.<br />+ Secondary targets suffer half as much threat every 2 seconds for 10 seconds and have their damage debuffed by 5% for up to 10 seconds.<br />+ Effect cannot be refreshed or stacked more than once from any of your abilities.<br />+ Some powers lack primary or secondary targets and may only apply the primary or secondary effect.');
dataPowerAlias['NG'] = new PowerAlias('NG', 'Nailed to the Ground', 'Nailed to the Ground', 'Cancels and locks out Travel Powers for a short period of time.');
dataPowerAlias['SP'] = new PowerAlias('SP', 'Stim Pack', 'Stim Pack', '+ Grants you a short heal over time. <br />+ Heals for an additional amount if your health is low.<br />+ Shares a short internal cooldown with other similar advantages.');
dataPowerAlias['OW'] = new PowerAlias('OW', 'Open Wound', 'Open Wound', 'Open Wounds causes wounds to open up on your target over time, inflicting Bleed.');
dataPowerAlias['CF'] = new PowerAlias('CF', 'Clinging Flames', 'Clinging Flames', 'Clinging Flames deals Fire damage every 2 seconds for 12 seconds, with a chance to leap to other nearby targets.');
dataPowerAlias['NQ'] = new PowerAlias('NQ', 'No Quarter', 'No Quarter', 'No Quarter causes affected targets to suffer -15% to Fire and Crushing resistance for 12 seconds.');
dataPowerAlias['AP'] = new PowerAlias('AP', 'Armor Piercing', 'Armor Piercing', 'Armor Piercing causes affected targets to suffer -15% to Piercing and Crushing resistance for 12 seconds.');
dataPowerAlias['Shredded'] = new PowerAlias('Shredded', 'Shredded', 'Shredded', 'Shredded causes affected targets to suffer -12% to Slashing resistance and 6% to Physical resistance for 12 seconds.');
dataPowerAlias['Trauma'] = new PowerAlias('Trauma', 'Trauma', 'Trauma', '+ Applies or refreshes Trauma on your target.<br />+ Trauma ends any healing over time effects on your target and causes them to receive only 50% benefit from any other incoming heals.');
dataPowerAlias['Furious'] = new PowerAlias('Furious', 'Furious', 'Furious', '+ Furious adds a 1% critical hit chance, lasts for 12 seconds, and can stack up to 3 times.<br />+ When struck by an attack while Furious, you gain a stack of Willpower, causing further attacks against you to heal you for a small amount.');
dataPowerAlias['TWST'] = new PowerAlias('Threat Wipe Single', 'Threat Wipe Single', 'Threat Wipe Single', 'Wipes your threat on the target and places you in stealth for 3/4/5 seconds, based on rank.  Puts all other threat wipe abilities on a 30 second cooldown.');
dataPowerAlias['TWAoE'] = new PowerAlias('Threat Wipe AoE', 'Threat Wipe AoE', 'Threat Wipe AoE', '+ Wipes all of your Threat from nearby foes.<br />+ Placates the target, making them unable to attack you.  Placate only works on weaker foes, such as Henchmen, Villains, and Enforcers.<br />+ briefly puts you in Stealth.<br />+ Puts all Threat Wipe abilities on a 30 second cooldown.');
dataPowerAlias['Illuminated'] = new PowerAlias('Illuminated', 'Illuminated', 'Illuminated', 'Attacking Illuminated foes gives allies a 15% chance to be affected by Mend.  Mend heals a small amount of health every 2 seconds for 8 seconds.  Illuminated is a type of Curse.');
dataPowerAlias['Illumination'] = new PowerAlias('Illumination', 'Illumination', 'Illumination', 'Illumination increases direct healing the target receives by 3% for 20 seconds.  Illumination is a type of Enchantment.');
dataPowerAlias['Light Everlasting'] = new PowerAlias('Light Everlasting', 'Light Everlasting', 'Light Everlasting', 'Light Everlasting is a heal over time which restores health every 2 seconds for 10 seconds.  Light Everlasting is a type of Enchantment.');

//------------------------------------------------------------------------------
// Power Set: Energy Projector
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'] = [];

dataPowerAlias['Energy Storm'] = new PowerAlias('Energy Storm', 'Energy Storm', '<div class="Sprite EnergyProjector_EnergyStorm"></div>&nbsp;Energy Storm', 'Energy Projector, Single Target Damage and Cone Debuff<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Absorb power from your enemies and send it back at them with cataclysmic fury.<br /><br />Consume Energy<br />MAINTAIN<br />+ All enemies in a forward arc are slowed.<br />+ For each enemy slowed, you will gain a stack of the Infused Energy Buff, which increases all damage you deal for a short duration.<br />+ While you are affect by Infused Energy, this power becomes Unleashed Tempest.<br />+ If an affected enemy is under the effect of Clinging Flames, Negative Ions, or Chill, that effect will be consumed, and grant you an appropriate type of Energy Charge.<br />+ If an affected enemy is protected by a force field type effect, such as Containment Field, that effect will be significantly degraded, and you will be granted Energy Charge - Force.<br />- This power has a 30 second cooldown that begins when the Infused Energy buffs expire.<br /><br />Unleashed Tempest<br />CLICK<br />+ Extremely powerful single target Particle attack.<br />+ If enhanced by Energy Charge - Fire, this attack will detonate in an area of effect on contact with the target.<br />+ If enhanced by Energy Charge - Ice, this attack gains a significant bonus to critical severity.<br />+ If enhanced by Energy Charge - Electricity, this attack will chain to a second target.<br />+ If enhanced by Energy Charge - Force, this attack will significantly reduce the target\\\'s damage for a short duration.<br />+ In addition, each type of Energy Charge increases the damage done by your Unleashed Tempest, and reduces its energy cost.<br />- Activating Unleashed Tempest consumes all instances of the Infused Energy buff and triggers the cooldown on Consume Energy.');
dataPowerAlias['Weather the Storm'] = new PowerAlias('Weather the Storm', 'Weather the Storm', 'Weather the Storm', 'Secondary Energy Effects, such as Clinging Flames, have a chance to not be consumed when you use Energy Storm.');
dataPowerAlias['Gravity Driver'] = new PowerAlias('Gravity Driver', 'Gravity Driver', '<div class="Sprite EnergyProjector_GravityDriver"></div>&nbsp;Gravity Driver', 'Energy Projector, 80 foot Ranged 40 foot Sphere AoE Damage and Damage Resistance Debuff<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Gravity Driver causes a mass of force to form, and brings it crashing down on your foes with nuclear levels of destructive power.<br /><br /><b>This power can be unlocked from a Ravenswood Lockbox drop.</b><br /><br />CHARGE<br />+ Deals Crushing damage to targets caught in the blast radius as well as knocking nearby foes prone.<br />+ Foes further than 20\\\' from the impact point take half damage and are not knocked prone.');
dataPowerAlias['Fractal Aegis'] = new PowerAlias('Fractal Aegis', 'Fractal Aegis', '<div class="Sprite EnergyProjector_FractalAegis"></div>&nbsp;Fractal Aegis', 'Energy Projector, 20 foot Sphere PBAoE Damage and Knock Up and Defense Buff<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Forces ice spikes to erupt beneath your opponents, then coalesces the icy bits around you for additional protection.<br /><br /><b>This power can be unlocked from a Frozen Lockbox drop.</b><br /><br />CHARGE<br />+ Damage and Knockup surrounding targets.<br />+ Gain a Defense Buff based on number of targets hit.');
dataPowerAlias['Chilling Reminder'] = new PowerAlias('Chilling Reminder', 'Chilling Reminder', 'Chilling Reminder', '+ This advantage causes this attack to generate additional Threat against all affected targets, making them more likely to attack you.<br />+ This advantage inflicts a 5% damage Debuff against all affected targets. If an affected enemy attacks you, it will quickly reduce this Debuff\\\'s strength. Conversely, any damage you inflict restores the Debuff\\\'s strength.');
dataPowerAlias['Mystic Transference'] = new PowerAlias('Mystic Transference', 'Mystic Transference', 'Mystic Transference', 'You now only summon two of these Sigils, but they can be summoned alongside your other Sigils. This also lowers the base recharge time for these Sigils to 10 seconds, and reduces the charge time and cost of these Sigils.');

//------------------------------------------------------------------------------
// Power Framework: Electricity
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(1);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Electric Bolt', '<div class="Sprite Electricity_ElectricBolt"></div>&nbsp;Electric Bolt', 1, 1, pow++, -1, 'Electricity, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Electric Bolt fires shocking arcs of electricity into your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Lightning Overload', 'Lightning Overload', 1, null, 'Grants Electric Bolt a chance to jump to another target on every attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Ionic Infusion', 'Ionic Infusion', 2, null, 'Doubles the chance to apply Negative Ions to your target on every attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Chain Lightning', '<div class="Sprite Electricity_ChainLightning"></div>&nbsp;Chain Lightning', 1, 1, pow++, 0, 'Electricity, 100 foot Ranged Single Target Damage (Blast)<br /><br />Chain Lightning allows you to emit a powerful, directed blast of electrical energy at a target, which can arc to other nearby targets as well.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Lightning Helix', 'Lightning Helix', 1, null, 'Adds an additional, random arc to your Chain Lightning. This arc may go to the same target that another arc goes to, hitting that target twice, or may go to another nearby target. The additional arc also benefits from additional chainging via consuming Negative Ions.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lightning Arc', '<div class="Sprite Electricity_LightningArc"></div>&nbsp;Lightning Arc', 1, 1, pow++, 1, 'Electricity, 100 foot Ranged Single Target Damage<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />Lightning Arc is a sustained barrage of electricity which may arc to additional foes near your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Never Strikes Twice', 'Never Strikes Twice', 2, null, 'Causes Lightning Arc to deal +30% damage against Held targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sigils of the Storm', '<div class="Sprite Electricity_SigilsOfTheStorm"></div>&nbsp;Sigils of the Storm', 1, 1, pow++, 1, 'Electricity, Summon Sigils<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you to deal damage to your foes.  Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sparkstorm', '<div class="Sprite Electricity_Sparkstorm"></div>&nbsp;Sparkstorm', 1, 1, pow++, 1, 'Electricity, 15 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />Sparkstorm is a shower of electrical energy which damages foes close to you. Show them that they do not want to get too close to your electric personality.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Electric Personality', 'Electric Personality', 2, null, 'Changes Sparkstorm to a toggle. The toggle has a max duration equal to the maintain limit of Sparkstorm and retains the same Energy Costs.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Electric Sheath', '<div class="Sprite Electricity_ElectricSheath"></div>&nbsp;Electric Sheath', 1, 1, pow++, 1, 'Electricity, Active Offense and Energy Form<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />Electric Sheath coats you in a tight field of electricity, improving your combat abilities for a short period of time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Matter – Energy Union', 'Matter – Energy Union', 2, null, 'Electric Sheath also grants you an absorption shield when activated.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Electric Form', '<div class="Sprite Electricity_ElectricForm"></div>&nbsp;Electric Form', 1, 1, pow++, 1, 'Electricity, Offensive Passive - Energy Form<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Energy damage.<br />+ Increases your Electrical resistance.<br />+ Increases your Energy damage resistance by a lesser amount.<br />+ Recovers Energy when you take Electrical damage.<br />+ Increases base energy equilibrium and energy recovery.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Electric Shield', '<div class="Sprite Electricity_ElectricShield"></div>&nbsp;Electric Shield', 1, 1, pow++, 1, 'Electricity, Block and 10 foot Sphere PBAoE Damage<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 200% resistance to Physical damage and 250% resistance to Non-Physical damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Nearby enemies suffer Electrical damage while blocking.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Electric Vengeance', 'Electric Vengeance', 3, null, 'If your Energy is high enough, your Electric Shield will automatically retaliate against any aggressors that are within 50 feet. Each retaliatory strike consumes an amount of Energy.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ionic Reverberation', '<div class="Sprite Electricity_IonicReverberation"></div>&nbsp;Ionic Reverberation', 1, 1, pow++, 1, 'Electricity, Energy Unlock (Endurance & Recovery)<br /><br />Requires 1 power from Electricity or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Gives you energy every time one of your abilities consumes Negative Ions.<br />+ generates 1/5 as much energy every time an ability interacts with Negative Ions without consuming it.<br />+ This effect can only occur up to 3 times per second.<br />+ The energy gained scales with your Endurance and Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Storm Summoner', '<div class="Sprite Electricity_StormSummoner"></div>&nbsp;Storm Summoner', 1, 1, pow++, 2, 'Electricity, 25 foot PBAoE Electrical Damage<br /><br />Requires 3 power from Electricity or 4 non-Energy Building powers from any framework.<br /><br />Deals Electrical damage to enemies within 25 yards of you every second.  upon being fully maintained, foes within 25 feet of you are hit by a bolt of lightning, dealing additional lightning damage to any enemies within 10 feet of them.  Each hit has a 25% chance to apply Negative Ions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Strong Winds', 'Strong Winds', 2, null, 'Your storm now repels enemies.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Thunderstrike', '<div class="Sprite Electricity_Thunderstrike"></div>&nbsp;Thunderstrike', 1, 1, pow++, 2, 'Electricity, 100 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 3 powers from Electricity or 4 non-Energy Building powers from any framework.<br /><br />Thunderstrike calls upon the forces of nature to deliver a powerful bolt of lightning onto your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ionic Compression', 'Ionic Compression', 2, null, 'Causes Thunderstrike to Root the targets hit for a short time in addition to its normal damage. Rooted targets are unable to move.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Electrocute', '<div class="Sprite Electricity_Electrocute"></div>&nbsp;Electrocute', 1, 1, pow++, 2, 'Electricity, 50 foot Single Target Hold<br /><br />Requires 3 powers from Electricity or 4 non-Energy Building powers from any framework.<br /><br />Electrocute temporarily immobilizes a target with a massive jolt to their nervous system.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Superconductor', 'Superconductor', 2, null, 'Places a stacking Debuff on the target of Electrocute which increases all Electrical damage dealt to the target by a scaling value for 20 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Neuroelectric Pulse', '<div class="Sprite Electricity_NeuroelectricPulse"></div>&nbsp;Neuroelectric Pulse', 1, 1, pow++, 2, 'Electricity, 15 foot Sphere PBAoE Damage and Energy Gain and Energy Siphon and Root<br /><br />Requires 3 powers from Electricity or 4 non-Energy Building powers from any framework.<br /><br />When activated, an electrical pulse will damage and Root most adjacent foes. Leaves behind a Static Field that grants nearby players Energy and siphons power from foes. The amount it grants scales off of your Recovery. Many enemies are not affected by Power Siphon.<br /><br /><b>This power unlock can be purchased from a Quartermaster at UNTIL HQ.</b>');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ball Lightning', '<div class="Sprite Electricity_BallLightning"></div>&nbsp;Ball Lightning', 1, 1, pow++, 3, 'Electricity, 100 foot Ranged AoE Damage<br /><br />Requires 5 powers from Electricity or 6 non-Energy Building powers from any framework.<br /><br />Ball Lightning summons a sphere of electrical energy to fight your foe. The sphere will chase them down, and deal damage to other nearby enemies as well.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Triplicity', 'Triplicity', 2, null, 'Ball Lightning now summons three Ball Lightnings instead of one, but the periodic damage each one deals is reduced by 60%. All three deal AoE damage, but only the primary one will explode.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gigabolt', '<div class="Sprite Electricity_Gigabolt"></div>&nbsp;Gigabolt', 1, 1, pow++, 3, 'Electricity, 100 foot Ranged 5 foot Cylinder AoE Damage<br /><br />Requires 5 powers from Electricity or 6 non-Energy Building powers from any framework.<br /><br />Gigabolt allows you to summon 1.21 gigawatts to blast your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Death Arc', 'Death Arc', 2, null, 'Any enemies killed by Gigabolt will unleash area effect damage to nearby targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lightning Storm', '<div class="Sprite Electricity_LightningStorm"></div>&nbsp;Lightning Storm', 1, 1, pow++, 3, 'Electricity, 50 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Electricity or 6 non-Energy Building powers from any framework.<br /><br />You charge the air around your foes, causing lightning bolts to repeatedly strike them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Stolen Thunder', 'Stolen Thunder', 2, null, 'Your Lightning Storm hits with such force that your targets are Knocked Down on the initial impact. Additional strikes have a chance to Knock Down the targets again.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Energy Storm'].name, dataPowerAlias['Energy Storm'].desc, 1, 1, pow++, 4, dataPowerAlias['Energy Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Weather the Storm'].name, dataPowerAlias['Weather the Storm'].desc, 2, null, dataPowerAlias['Weather the Storm'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Gravity Driver'].name, dataPowerAlias['Gravity Driver'].desc, 1, 1, pow++, 4, dataPowerAlias['Gravity Driver'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fractal Aegis'].name, dataPowerAlias['Fractal Aegis'].desc, 1, 1, pow++, 4, dataPowerAlias['Fractal Aegis'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Chilling Reminder'].name, dataPowerAlias['Chilling Reminder'].desc, 1, null, dataPowerAlias['Chilling Reminder'].tip));

//------------------------------------------------------------------------------
// Power Framework: Fire
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(2);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Throw Fire', '<div class="Sprite Fire_ThrowFire"></div>&nbsp;Throw Fire', 1, 2, pow++, -1, 'Fire, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Throw fire throws small balls of flame at your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Burning Desire', 'Burning Desire', 1, null, 'Gives your Throw Fire power a chance to chain into an additional target. This second shot does not generate Energy, but has a chance to apply Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fuel My Fire', 'Fuel My Fire', 1, null, 'Grants Throw Fire a chance to apply Clinging Flames to your target on every attack and increases the chance to apply Clinging Flames with the initial double handed attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fire Strike', '<div class="Sprite Fire_FireStrike"></div>&nbsp;Fire Strike', 1, 2, pow++, 0, 'Fire, 100 foot Ranged Single Target Damage and Buff (Blast)<br /><br /><br />Fire Strike throws a small but volatile ball of fire at your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Wild Fire', 'Wild Fire', 2, null, 'If your target is affected by the Clinging Flames condition, your Fire Strike attack will refresh the Clinging Flames effect, and will cause a small mount of fire damage to all targets in a small area of effect.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Kindling', 'Kindling', 2, null, 'Your Fiery Escalation Buff now also increases the damage of your next Fire Power by 10% per stack. However, Fiery Escalation is now consumed by powers that trigger this effect.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Heat Wave', '<div class="Sprite Fire_HeatWave"></div>&nbsp;Heat Wave', 1, 2, pow++, 1, 'Fire, 50 foot Ranged Single Target Damage and Burning and Incapacitate<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />Heat Wave directs a blast of searing air on your target, causing damage and incapacitating the target after a short time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Engulfing Flames', 'Engulfing Flames', 2, null, 'Reduces the damage your Heat Wave deals, but applies a stacking Debuff on your target that reduces their resistance to your fire damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fire Breath', '<div class="Sprite Fire_FireBreath"></div>&nbsp;Fire Breath', 1, 2, pow++, 1, 'Fire, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />Fire Breath allows your character to exhale a cone of flame at your enemies, turning the area in front of you into a blazing inferno.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Spitfire', 'Spitfire', 2, null, 'Increases the chance to apply Clinging Flames from 10% to 20%. Also guarantees the application of Clinging Flames to all targets hit by your Fire Breath when it is fully maintained.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fireball', '<div class="Sprite Fire_Fireball"></div>&nbsp;Fireball', 1, 2, pow++, 1, 'Fire, 50 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />Fireball launches a sphere of flame at your target dealing high damage to the target and additional damage to any enemies near the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Unstable Accelerant', 'Unstable Accelerant', 2, null, 'Your Fireball now Debuffs the affects targets, causing them to take increased damage from Burning effects. Burning effects include:<br />- Clinging Flames<br />- Conflagration<br />- Fire Snake<br />- Heatwave<br />- Flashfire<br />- Pyre Burn (the patch left by Pyre)<br />- Wildfire (the AoE proc for the Fire Strike advantage)'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Living Fire', '<div class="Sprite Fire_LivingFire"></div>&nbsp;Living Fire', 1, 2, pow++, 1, 'Fire, Summon Sigils<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 fiery crystals around you that will detonate when an enemy gets too close.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Immolation', '<div class="Sprite Fire_Immolation"></div>&nbsp;Immolation', 1, 2, pow++, 1, 'Fire, Active Offense and Energy Form<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />Immolation focuses your fire mastery into a concentrated form which increases your combat effectiveness with all attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, 'Rank 3', 'Rank 3', 2, 1,'[ID]'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blazing Body', 'Blazing Body', 1, null, 'Adds periodic PBAoE damage while active.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fiery Form', '<div class="Sprite Fire_FieryForm"></div>&nbsp;Fiery Form', 1, 2, pow++, 1, 'Fire,  Offensive Passive - Energy Form - PBAoE Damage<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />+ Increaes your Elemental damage.<br />+ Increases your Fire damage resistance.<br />+ Increases your Elemental damage resistance by a lesser amount.<br />+ Deals Fire damage to nearby foes.<br />+ 20% chance to apply Clinging Flames to foes that attack you in melee range.  ' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fire Shield', '<div class="Sprite Fire_FireShield"></div>&nbsp;Fire Shield', 1, 2, pow++, 1, 'Fire, Block<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Has a 25% chance to apply Clinging Flames to foes that attack you in melee range.  ' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Thermal Reverberation', '<div class="Sprite Fire_ThermalReverberation"></div>&nbsp;Thermal Reverberation', 1, 2, pow++, 1, 'Fire, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Fire or 2 non-Energy Building powers from any framework.<br />You may only have 1 Energy Unlock power.<br /><br />+ Being near targets affected by your Clinging Flames gives you energy.<br />+ This effect can only occur once every 3 seconds per target.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Rimefire Burst', '<div class="Sprite Fire_RimefireBurst"></div>&nbsp;Rimefire Burst', 1, 2, pow++, 2, 'Fire, 60 foot Ranged Single Target Damage<br /><br />Requires 3 power from Fire or 4 non-Energy Building powers from any framework.<br /><br />Blast your target with a crippling burst of fire and ice, dealing significant damage to the target and spreading to nearby foes if the target is already weakened by your attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Pyre', '<div class="Sprite Fire_Pyre"></div>&nbsp;Pyre', 1, 2, pow++, 2, 'Fire, 25 foot Sphere PBAoE Ranged Damage and Burning DoT<br /><br />Requires 3 powers from Fire or 4 non-Energy Building powers from any framework.<br /><br />Pyre turns the area around you into a raging inferno, dealing damage to any enemies around you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Backdraft', 'Backdraft', 2, null, 'Causes your Pyre to Knock Down all affected foes. Cannot occur more than once every 5 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Conflagration', '<div class="Sprite Fire_Conflagration"></div>&nbsp;Conflagration', 1, 2, pow++, 2, 'Fire, 50 foot Ranged 15 foot Sphere AoE Damage and Burning<br /><br />Requires 3 powers from Fire or 4 non-Energy Building powers from any framework.<br /><br />Conflagration creates a devastating rain of fire around your target, dealing fire damage to the target and any enemies nearby.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Burning Rain', 'Burning Rain', 2, null, 'With this advantage, your Conflagration leaves a fire patch when fully maintained.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Absorb Heat', '<div class="Sprite Fire_AbsorbHeat"></div>&nbsp;Absorb Heat', 1, 2, pow++, 2, PowerTip(2, 2, '25 foot PBAoE sphere and Team Heal', '+ Deals fire damage in an area around you.<br />+ Consumes all of your Clinging Flames, healing you and your team for each Clinging Flames consumed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Pyromancer\'s Blades', '<div class="Sprite Fire_PyromancersBlades"></div>&nbsp;Pyromancer\'s Blades', 1, 2, pow++, 2, PowerTip(2, 2, 'Fire, Uncontrolled Pet', 'Summons a pair of blazing scimitars to attack your foes.  The blades hit up to 3 targets per attack for Fire damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Flashfire', '<div class="Sprite Fire_Flashfire"></div>&nbsp;Flashfire', 1, 2, pow++, 3, 'Fire, 50 foot Ranged 10 foot Sphere AoE Damage and Burning<br /><br />Requires 5 powers from Fire or 6 non-Energy Building powers from any framework.<br /><br />Flashfire turns the area around your target into a raging inferno, dealing damage to the target and any other enemies in the area.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sweltering Heat', 'Sweltering Heat', 2, null, 'Enemies affected by the Pyre created by this power will have their movement speed reduced.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 1, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fire Snake', '<div class="Sprite Fire_FireSnake"></div>&nbsp;Fire Snake', 1, 2, pow++, 3, 'Fire, 10 foot Sphere AoE Damage and Burning DoT<br /><br />Requires 5 powers from Fire or 6 non-Energy Building powers from any framework.<br /><br />Fire Snake summons a serpent of fire to pursue your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Trail Blazer', 'Trail Blazer', 2, null, 'Increases the movement speed of your Fire Snake.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hydra', '<div class="Sprite Fire_Hydra"></div>&nbsp;Hydra', 1, 2, pow++, 3, PowerTip(2, 3, '50 Foot range Summon and AoE', '+ You summon terrifying hydra heads to rain fiery justice down on your foes.<br />+ Each rank increases the number of hydra heads spawned.<br />+ This power also summons a lava pit which damages foes and can apply Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Energy Storm'].name, dataPowerAlias['Energy Storm'].desc, 1, 2, pow++, 4, dataPowerAlias['Energy Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Weather the Storm'].name, dataPowerAlias['Weather the Storm'].desc, 2, null, dataPowerAlias['Weather the Storm'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Gravity Driver'].name, dataPowerAlias['Gravity Driver'].desc, 1, 2, pow++, 4, dataPowerAlias['Gravity Driver'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fractal Aegis'].name, dataPowerAlias['Fractal Aegis'].desc, 1, 2, pow++, 4, dataPowerAlias['Fractal Aegis'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Chilling Reminder'].name, dataPowerAlias['Chilling Reminder'].desc, 1, null, dataPowerAlias['Chilling Reminder'].tip));


//------------------------------------------------------------------------------
// Power Framework: Force
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(3);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Bolts', '<div class="Sprite Force_ForceBolts"></div>&nbsp;Force Bolts', 1, 3, pow++, -1, 'Force, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Force Bolts fires darts of solid energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Energy Refraction', 'Energy Refraction', 2, null, 'Your Force Bolt attacks have a chance to create a shield around you which last for a few seconds and absorbs a modest amount of damage. This shield counts as an Energy Form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Blast', '<div class="Sprite Force_ForceBlast"></div>&nbsp;Force Blast', 1, 3, pow++, 0, 'Force, 100 foot Ranged Single Target Damage and Knock Back (Blast)<br /><br />Emits a blast of crushing energy that may well Knock your foe out of your face.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Field Inversion', 'Field Inversion', 2, null, 'This advantage causes your force blast to briefly invert the harmonics of any force field affecting your target, causing it to emit a pulse of kinetic energy, dealing damage to and around your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Snap', '<div class="Sprite Force_ForceSnap"></div>&nbsp;Force Snap', 1, 3, pow++, 1, 'Force, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage and Knocks your target toward you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Entropic Collapse', 'Entropic Collapse', 2, null, 'Your Force Snap now causes a collapse of energy around your target, Knocking Down other nearby foes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Eruption', '<div class="Sprite Force_ForceEruption"></div>&nbsp;Force Eruption', 1, 3, pow++, 1, 'Force, 10 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Force Eruption is an explosive blast of energy which can fling your foes away from you. We all need our personal space, and you know how to get yours.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Gravitational Polarity', 'Gravitational Polarity', 2, null, 'When Force Eruption is fully charged, this creates a "hot spot" where the eruption occurred. The spot increases all damage by 15% while the caster stands in it.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Personal Force Field', '<div class="Sprite Force_PersonalForceField"></div>&nbsp;Personal Force Field', 1, 3, pow++, 1, 'Force, Defensive Passive<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />+ Applies a regenerating damage absorption shield to you.<br />- The speed at which this shield regenerates is reduced as you take damage.<br />+ While in combat, blocking increases the shield regeneration rate.<br />+ Defense (yellow) and energy (blue) boosts will restore a portion of the shield.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Kinetic Manipulation', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Kinetic Manipulation', 1, 3, pow++, 1, 'Force, Offensive Passive - Energy Form<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your ranged Physical damage.<br />+ Increases your ranged Physical damage resistance.<br />+ Increases your Physical damage resistance by a lesser amount.<br />+ Recovers Energy when you take Crushing damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Protection Field', '<div class="Sprite Force_ProtectionField"></div>&nbsp;Protection Field', 1, 3, pow++, 1, 'Force, 50 foot Ranged Single Friend Shield<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Protection Field allows you to place a field of protective energy around an ally taking the brunt of damage from attacks against them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Expel Impurity', 'Expel Impurity', 2, null, 'Allows your Protection Field to remove the Burn or Bleed with the most duration left when applied.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Shield', '<div class="Sprite Force_ForceShield"></div>&nbsp;Force Shield', 1, 3, pow++, 1, 'Force, Block<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Getting hit while blocking restores more energy than other blocks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Force Sheathe', 'Force Sheathe', 1, null, 'The Force Shield effect persists for a few seconds after you stop blocking, and it will continue to feed you Energy from all incoming attacks, as well as providing a small defensive benefit.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Geyser', '<div class="Sprite Force_ForceGeyser"></div>&nbsp;Force Geyser', 1, 3, pow++, 2, 'Force, 100 foot Ranged Single Target Damage and Knock Up<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />You cause a localized geyser of force energy underneath your target, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Hard Landing', 'Hard Landing', 2, null, 'When your targets hit the ground, they always seem to land in the worst possible way. They suffer a Snare from the attack, temporarily reducing their movement speed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Crushing Wave', '<div class="Sprite Force_CrushingWave"></div>&nbsp;Crushing Wave', 1, 3, pow++, 2, 'Force, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />Crushing Wave releases continuous waves of powerful force energy upon your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Disruptive Force', 'Disruptive Force', 1, null, 'Adds a Knock Down effect to the final pulse of your Crushing Wave.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Containment Field', '<div class="Sprite Force_ContainmentField"></div>&nbsp;Containment Field', 1, 3, pow++, 2, 'Force, 50 foot Ranged Single Target Hold<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />Containment Field allows you to imprison a foe in a sphere of solid energy, preventing them from making a move.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Grinding Halt', 'Grinding Halt', 2, null, 'Causes your Containment Field power to remove Travel Powers from affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Field Surge', '<div class="Sprite Force_FieldSurge"></div>&nbsp;Field Surge', 1, 3, pow++, 2, 'Force, Active Defense<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />Field Surge gives you a temporary force field, and will repair your Personal Force Field as well.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, 'Rank 3', 'Rank 3', 2, 1,'[ID]'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Power Swell', 'Power Swell', 2, null, 'Your Field Surge fills you with force energy, increasing your damage dealt by 15% for the duration.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Redirected Force', '<div class="Sprite Force_RedirectedForce"></div>&nbsp;Redirected Force', 1, 3, pow++, 2, 'Force, 40 foot Sphere PBAoE Ally Defense Buff<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />You protect your allies and bend that force to your will.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gravitic Ripple', '<div class="Sprite Force_FieldSurge"></div>&nbsp;Gravitic Ripple', 1, 3, pow++, 3, 'Force, 25 foot Sphere PBAoE Damage and Gravity Control<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />You distort the local gravity, causing nearby foes to become nexuses of gravitic force.<br /><br /><b>This power unlock can be purchased from an Onslaught Agent.</b><br /><br />MAINTAIN<br />+ Deals Crushing damage to targets around you.<br />+ Applies Gravity Well to all targets, causing them to pull all their nearby allies in.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Cascade', '<div class="Sprite Force_ForceCascade"></div>&nbsp;Force Cascade', 1, 3, pow++, 3, 'Force, 100 foot Ranged 5 foot Cylinder AoE Damage and Knock Back<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Force Cascade unleashes a titanic blast of crushing energy flinging aside any enemies in its path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Containment Blast', 'Containment Blast', 2, null, 'Applies a Paralyze, which functions like Containment Field, to all targets on a full charge.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Force Detonation', '<div class="Sprite Force_ForceDetonation"></div>&nbsp;Force Detonation', 1, 3, pow++, 3, 'Force, 50 foot Ranged 10 foot Sphere AoE Damage and Knock Back<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Force Detonation causes an explosion of energy anywhere you desire, sending nearby enemies flying.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Force Spate', 'Force Spate', 2, null, 'Causes your Force Detonation to temporarily invert any nearby force fields, such as Containment Field. Inverted fields cause an additional burst of damage around the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Inertial Dampening Field', '<div class="Sprite Force_IntertialDampeningField"></div>&nbsp;Inertial Dampening Field', 1, 3, pow++, 3, 'Force, Form (Superstats), 100 foot Team Aura (20 max)<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Grants you and nearby teammates flat damage reduction that scales with your super stats.<br /><br />- Increases energy costs by 10%.<br />- Counts as a Form and thus cannot be used with other Forms.<br />- Does not have an energy return mechanic.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Energy Storm'].name, dataPowerAlias['Energy Storm'].desc, 1, 3, pow++, 4, dataPowerAlias['Energy Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Weather the Storm'].name, dataPowerAlias['Weather the Storm'].desc, 2, null, dataPowerAlias['Weather the Storm'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Gravity Driver'].name, dataPowerAlias['Gravity Driver'].desc, 1, 3, pow++, 4, dataPowerAlias['Gravity Driver'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fractal Aegis'].name, dataPowerAlias['Fractal Aegis'].desc, 1, 3, pow++, 4, dataPowerAlias['Fractal Aegis'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Chilling Reminder'].name, dataPowerAlias['Chilling Reminder'].desc, 1, null, dataPowerAlias['Chilling Reminder'].tip));

//------------------------------------------------------------------------------
// Power Framework: Wind
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(4);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Wind Lash', '<div class="Sprite Wind_WindLash"></div>&nbsp;Wind Lash', 1, 4, pow++, -1, 'Wind, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Wind Lash assaults your foe with powerful bolts of wind.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Stiff Breeze', 'Stiff Breeze', 2, null, 'Extends the chance to Disorient and Repel to every attack, instead of just the first.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gust', '<div class="Sprite Wind_Gust"></div>&nbsp;Gust', 1, 4, pow++, 0, 'Wind, 100 foot Ranged Single Target Damage (Blast)<br /><br />Emits a strong blast of wind that damages your foe and may Knock them away.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Toppling Winds', 'Toppling Winds', 2, null, 'Grants a 45-100% chance (based on charge time) to stagger your target, reducing their damage resistance and movement speed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Wind Breath', '<div class="Sprite Wind_WindBreath"></div>&nbsp;Wind Breath', 1, 4, pow++, 1, 'Wind, 50 foot Ranged 45 degree Cone AoE Damage and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />Wind Breath causes your character to exhale a cone of fast moving wind, pummeling and chilling your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Unstable Footing', 'Unstable Footing', 2, null, 'Adds a chance to Knock Down affected targets. Targets Knocked Down by your Wind Breath will also be Staggered.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hurricane', '<div class="Sprite Wind_Hurricane"></div>&nbsp;Hurricane', 1, 4, pow++, 1, 'Wind, 25 foot Sphere PBAoE Ranged Damage and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />You create a powerful storm all around you, dealing damage to your foes and Repelling them away from you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Perfect Storm', 'Perfect Storm', 3, null, 'Your Hurricane now also deals some Electrical damage, and has a chance to apply Chill and Negative Ions to your targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Stormbringer', '<div class="Sprite Wind_Stormbringer"></div>&nbsp;Stormbringer', 1, 4, pow++, 1, 'Wind, Offensive Passive - Energy Form<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Crushing, Cold, and Electrical damage.<br />+ Increases your Crushing, Cold, and Electrical damage resistance.<br />+ Recovers Energy when you take Crushing, Cold, or Electrical damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Wind Barrier', '<div class="Sprite Wind_WindBarrier"></div>&nbsp;Wind Barrier', 1, 4, pow++, 1, 'Wind, Block and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Repels foes in front of you, as well as foes that attack you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Wind Reverberation', '<div class="Sprite Wind_WindReverberation"></div>&nbsp;Wind Reverberation', 1, 4, pow++, 1, 'Wind, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ generates energy every time you attempt to Repel an enemy.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Updraft', '<div class="Sprite Wind_Updraft"></div>&nbsp;Updraft', 1, 4, pow++, 2, 'Wind, 50 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />A sudden rush of air rises from underneath your target, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Dispersal', 'Dispersal', 3, null, 'Causes your Updraft to deal 50% damage to targets withing 10 feet, and they are Knocked Up and Repelled away from your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Whirlwind', '<div class="Sprite Wind_Whirlwind"></div>&nbsp;Whirlwind', 1, 4, pow++, 2, 'Wind, 50 foot Ranged 15 foot Sphere AoE DoT and Snare<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You summon a powerful Whirlwind on top of your target, causing damage and making it difficult for your foes to move.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Vortex', 'Vortex', 2, null, 'Causes the main target of your Whirlwind to become the focus of a vortex, pulling other nearby foes toward that target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Dust Devil', '<div class="Sprite Wind_DustDevil"></div>&nbsp;Dust Devil', 1, 4, pow++, 2, 'Wind, 100 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You conjure up a Dust Devil to fight your foe. It will chase them down, and deal damage to other nearby enemies as well.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Triple Threat', 'Triple Threat', 2, null, 'Your Dust Devil becomes empowered with Cold and Electric energy, causing it to now deal 40% of normal damage as Crushing damage, an additional 40% of normal damage as Cold damage, and an additional 40% of normal damage as Electrical damage.<br /><br />The Cold damage is increased by 30% against targets affected by Chill, and the Electric damage is increased by 30% against targets affected by Negative Ions.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Twister', '<div class="Sprite Wind_Twister"></div>&nbsp;Twister', 1, 4, pow++, 2, 'Wind, 50 foot Single Target Hold<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You encompass your foe in a fast moving prison of wind. The Twister will keep your target in place, though they may try to break free.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Typhoon', '<div class="Sprite Wind_Typhoon"></div>&nbsp;Typhoon', 1, 4, pow++, 3, 'Wind, 100 foot Ranged 5 foot Cylinder AoE Damage and Repel<br /><br />Requires 5 powers from Wind or 6 non-Energy Building powers from any framework.<br /><br />You create a massive and powerful tunnel of wind, damaging your foes and Knocking them off their feet.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cold Front', 'Cold Front', 1, null, 'Adds a chance (based on charge time) for your Typhoon to Chill your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Ionic Discharge', 'Ionic Discharge', 1, null, 'If your Typhoon hits a target affected by Negative Ions, it has a chance (based on charge time) to cause an Electric Arc to a nearby target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Air Elemental', '<div class="Sprite Wind_AirElemental"></div>&nbsp;Air Elemental', 1, 4, pow++, 3, 'Wind, Controllable Pet<br /><br />Requires 5 powers from Wind or 6 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful entity made of wind to attack your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Energy Storm'].name, dataPowerAlias['Energy Storm'].desc, 1, 4, pow++, 4, dataPowerAlias['Energy Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Weather the Storm'].name, dataPowerAlias['Weather the Storm'].desc, 2, null, dataPowerAlias['Weather the Storm'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Gravity Driver'].name, dataPowerAlias['Gravity Driver'].desc, 1, 4, pow++, 4, dataPowerAlias['Gravity Driver'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fractal Aegis'].name, dataPowerAlias['Fractal Aegis'].desc, 1, 4, pow++, 4, dataPowerAlias['Fractal Aegis'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Chilling Reminder'].name, dataPowerAlias['Chilling Reminder'].desc, 1, null, dataPowerAlias['Chilling Reminder'].tip));

//------------------------------------------------------------------------------
// Power Framework: Ice
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(5);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Shards', '<div class="Sprite Ice_IceShards"></div>&nbsp;Ice Shards', 1, 5, pow++, -1, 'Ice, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Ice Shards gives you the ability to throw razor sharp shards of ice at your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ice Impaler', 'Ice Impaler', 2, null, 'Ice Shards has a significantly increased Critical Hit Chance.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Blast', '<div class="Sprite Ice_IceBlast"></div>&nbsp;Ice Blast', 1, 5, pow++, 0, 'Ice, 100 foot Ranged Single Target Damage and Chill (Blast)<br /><br />Ice Blast allows you to hurl a concentrated bolt of frost at your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Hard Frost', 'Hard Frost', 2, null, 'Ice Blast applies a cold resistance Debuff to targets that are Chilled.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Frost Bite', 'Frost Bite', 2, null, 'Ice Blast now refreshes the Chilled Debuff on targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shatter', '<div class="Sprite Ice_Shatter"></div>&nbsp;Shatter', 1, 5, pow++, 1, 'Ice, 50 foot Ranged 180 degree Cone AoE Damage<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Shatter allows you to throw a fan of ice shards in front of you, slicing into anyone unfortunate enough to be in their path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Crushed Ice', 'Crushed Ice', 2, null, 'Gives Shatter a 50% chance to not consume the Chilled state from targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Frost Breath', '<div class="Sprite Ice_FrostBreath"></div>&nbsp;Frost Breath', 1, 5, pow++, 1, 'Ice, 50 foot Ranged 45 degree Cone AoE Damage and Chill<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Frost Breath causes your character to exhale a cone of frost, freezing your enemies in their tracks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frost Bite', 'Frost Bite', 2, null, 'Frost Breath is guaranteed to add the Chill effect on those it hits.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Wall of Ice', '<div class="Sprite Ice_WallOfIce"></div>&nbsp;Wall of Ice', 1, 5, pow++, 1, 'Ice, 100 foot Ranged AoE Damage and Root<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Wall of Ice calls chunks of ice from the ground in front of you to freeze anything that touches them and then explode violently, sending shards of ice in all directions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frozen Footsteps', 'Frozen Footsteps', 2, null, 'Causes the Wall of Ice to form in your path as you move.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Cage', '<div class="Sprite Ice_IceCage"></div>&nbsp;Ice Cage', 1, 5, pow++, 1, 'Ice, 50 foot Ranged Single Target Damage and Root and DoT<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Ice Cage temporarily immobilizes a target in an icy prison.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sub-Zero Cellblock', 'Sub-Zero Cellblock', 2, null, 'Causes Ice Cage to interrupt any attacks being charged or maintained when it is initially applied.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Sheath', '<div class="Sprite Ice_IceSheath"></div>&nbsp;Ice Sheath', 1, 5, pow++, 1, 'Ice, Active Offense and Energy Form<br /><br />Requires 1 power from Iceity or 2 non-Energy Building powers from any framework.<br /><br />Ice Sheath coats you in a layer of ice focusing your power into a concentrated form which increases your combat effectiveness with all Elemental attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Supercooled', 'Supercooled', 2, null, 'Guarantees those that attack you will have the Chill effect applied to them.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Form', '<div class="Sprite Ice_IceForm"></div>&nbsp;Ice Form', 1, 5, pow++, 1, 'Ice, Offensive Passive - Energy Form<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Elemental damage.<br />+ Increases your Cold damage resistance.<br />+ Increases your Elemental damage resistance by a lesser amount.<br />+ Foes attacking you have a 20% chance to be affected by Chill, reducing their movement speed by 50% for 16 seconds and occasionally trapping them in an Ice Cage.<br />+ Landing a critical hit while Ice Form is active grants you Cold Snap for 10 seconds.<br />+ Recovers Energy when you take Cold damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

// TODO: get correct description
dataPower[dataPower.length] = new Power(dataPower.length, 'Chilled Form', '<div class="Sprite Ice_ChilledForm"></div>&nbsp;Chilled Form', 1, 5, pow++, 1, 'Ice, Form (Dexterity or Ego)<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you maintain or charge a ranged power at least halfway, or when you hit a target at least 25 feet away.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Shield', '<div class="Sprite Ice_IceShield"></div>&nbsp;Ice Shield', 1, 5, pow++, 1, 'Ice, Block<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Has a 25% chance to Chill foes that attack you in melee range, reducing their movement speed by 50% for 16 sec and occasionally trapping them in an Ice Cage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frigid Air', 'Frigid Air', 2, null, 'Allows the Chill effect from Ice Shield to be applied up to a 50 foot range, instead of just in Melee range.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Icy Embrace', '<div class="Sprite Ice_IcyEmbrace"></div>&nbsp;Icy Embrace', 1, 5, pow++, 1, 'Ice, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you apply Chilled to a target.<br />+ This effect can only occur once every 3 seconds and can stack up to 2 times per target.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Burst', '<div class="Sprite Ice_IceBurst"></div>&nbsp;Ice Burst', 1, 5, pow++, 2, 'Ice, 50 foot Ranged 25 foot Sphere AoE Damage and Knock Back<br /><br />Requires 3 powers from Ice or 4 non-Energy Building powers from any framework.<br /><br />Ice Burst creates a spire of ice under your target, lifting them into the air. The column can be destroyed, causing it to detonate violently dealing damage to any enemies around it.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Freeze, Dirtbag', 'Freeze, Dirtbag', 2, null, 'Causes Ice Burst to Paralyze the primary target, instead of Knocking them away.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Snow Storm', '<div class="Sprite Ice_SnowStorm"></div>&nbsp;Snow Storm', 1, 5, pow++, 2, 'Ice, 50 foot Ranged 15 foot Sphere AoE DoT and Chill<br /><br />Requires 3 powers from Ice or 4 non-Energy Building powers from any framework.<br /><br />Snow Storm allows you to summon a swirling blizzard to tear at your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Eye of the Storm', 'Eye of the Storm', 2, null, 'Causes Snow Storm to deal additional damage to targets that attack while affected by the storm.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ice Barrier', '<div class="Sprite Ice_IceBarrier"></div>&nbsp;Ice Barrier', 1, 5, pow++, 2, 'Ice, Active Defense<br /><br />Requires 3 powers from Ice or 4 non-Energy Building powers from any framework.<br /><br />Ice Barrier summons sheets of ice around you to help protect you from all attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frigid Freedom', 'Frigid Freedom', 1, null, 'Ice Barrier no longer Roots you.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Icicle Spear', '<div class="Sprite Ice_IcicleSpear"></div>&nbsp;Icicle Spear', 1, 5, pow++, 3, 'Ice, 100 foot Ranged Single Target Damage<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Icicle Spear deals increased damage against Chilled targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Freezer Burn', 'Freezer Burn', 1, null, 'Gives Icicle Spear a 20% chance to apply Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Avalanche', '<div class="Sprite Ice_Avalanche"></div>&nbsp;Avalanche', 1, 5, pow++, 3, 'Ice, 50 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />You rapidly freeze the air above your targets, creating large chunks of ice which rain down on your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Serrated Shards', 'Serrated Shards', 2, null, 'Avalanche has an increased Critical Hit Chance and increased Critical Severity.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Vapor Form', '<div class="Sprite Ice_VaporForm"></div>&nbsp;Vapor Form', 1, 5, pow++, 3, 'Ice, Self Transformation PBAoE Damage and Chill<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Vapor Form transforms you into a flying cloud of mist.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Invigorating Chill', 'Invigorating Chill', 2, null, 'Adds an Energy gain effect when you deal damage in Vapor Form.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Arctic Beast', '<div class="Sprite Ice_ArcticBeast"></div>&nbsp;Arctic Beast', 1, 5, pow++, 3, 'Ice, Controllable Pet<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful Arctic Beast.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aurora', '<div class="Sprite Ice_Aurora"></div>&nbsp;Aurora', 1, 5, pow++, 3, 'Ice, Self-Resurrect and Heal<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Can be used while dead to resurrect with 50% of your maximum health and grants you the following:<br /><br />+ For the next 20 seconds, killing foes will restore additional health<br />+ For the next 20 seconds, you apply Chill to any foe that attacks you, which slows their movement by 50% for 16 seconds and occasionall traps them in an Ice Cage.<br />+ For the next 10 seconds, you are affected by Cold Snap.<br />- Shares a cooldown with similar powers.' + GCR_UNLOCK);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Energy Storm'].name, dataPowerAlias['Energy Storm'].desc, 1, 5, pow++, 4, dataPowerAlias['Energy Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Weather the Storm'].name, dataPowerAlias['Weather the Storm'].desc, 2, null, dataPowerAlias['Weather the Storm'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Gravity Driver'].name, dataPowerAlias['Gravity Driver'].desc, 1, 5, pow++, 4, dataPowerAlias['Gravity Driver'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fractal Aegis'].name, dataPowerAlias['Fractal Aegis'].desc, 1, 5, pow++, 4, dataPowerAlias['Fractal Aegis'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Chilling Reminder'].name, dataPowerAlias['Chilling Reminder'].desc, 1, null, dataPowerAlias['Chilling Reminder'].tip));

//------------------------------------------------------------------------------
// Power Set: Technology
//------------------------------------------------------------------------------

dataRequireGroup['technology'] = [];

dataPowerAlias['Implosion Engine'] = new PowerAlias('Implosion Engine', 'Implosion Engine', '<div class="Sprite Technology_ImplosionEngine"></div>&nbsp;Implosion Engine', 'Technology, 100 foot Ranged AoE Damage and Reverse Repel and Snare<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />You throw an Implosion Engine, a device that generates a massive gravitational vortex in a very small area, sucking in nearby matter, and dealing significant Dimensional damage.<br /><br />CLICK<br />+ Create and throw an Implosion Engine at your target, dealing Crushing damage from the massive gravity waves, pulling them toward the Engine.<br />- This power is incapable of getting a Critical Hit.');
dataPowerAlias['Inverse Polarization Field'] = new PowerAlias('Inverse Polarization Field', 'Inverse Polarization Field', 'Inverse Polarization Field', 'Just before self-destructing, the polarity of the gravitational field created by Implosion Engine will reverse, sending all affected enemies flying.');
dataPowerAlias['Concentration'] = new PowerAlias('Concentration', 'Concentration', '<div class="Sprite Technology_Concentration"></div>&nbsp;Concentration', 'Technology, Form (Intelligence or Ego)<br /><br />Requires 1 power from Technology or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you maintain or charge a ranged power at least halfway, or when you hit a target at least 25 feet away.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPowerAlias['Mechanical Monstrosity'] = new PowerAlias('Mechanical Monstrosity', 'Mechanical Monstrosity', '<div class="Sprite Technology_MechanicalMonstrosity"></div>&nbsp;Mechcanical Monstrosity', 'Technology, Uncontrolled Pet<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Summons a Mechanical Spider.<br /><br />+ Deals heavy Slashing, Electrical, and Poison damage.<br />+ Attacks have increased threat.<br />+ Can apply Debilitating Poison to foes.<br /><br /><b>This power can be found inside the Spider Lockbox.</b>');
dataPowerAlias['Meltdown'] = new PowerAlias('Meltdown', 'Meltdown', '<div class="Sprite Technology_Meltdown"></div>&nbsp;Meltdown', 'Technology, 15 foot PBAoE Sphere<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Deals Particle damage to nearby targets and knocks them down.  The initial strike applies Plasma Burn immediately, with additional stacks being applied over 5 seconds.<br /><br /><b>This power can be found inside the Toybox.</b>');
dataPowerAlias['Fire All Weapons'] = new PowerAlias('Fire All Weapons', 'Fire All Weapons', '<div class="Sprite Technology_FireAllWeapons"></div>&nbsp;Fire All Weapons', 'Technology, 50 foot 120 degree Cone AoE Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Hand Slot - Shoulder Slot - Chest Slot<br /><br />Deals Particle damage to all targets.');
dataPowerAlias['Showdown'] = new PowerAlias('Showdown', 'Showdown', '<div class="Sprite Technology_Showdown"></div>&nbsp;Showdown', 'Technology, 50 foot 180 degree PBAoE Cone<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Deals Piercing damage and Roots targets for 8 seconds.  Each hit refreshes the Root duration.<br /><br /><b>This power can be found inside the Western Lockbox.</b>');
dataPowerAlias['Burn Through'] = new PowerAlias('Burn Through', 'Burn Through', 'Burn Through', '+ Burn Through reduces your target\\\'s resistance to Crushing and Particle damage by -15% for 12 seconds.<br />+ Burn Through is a type of Radiation.');
dataPowerAlias['Melta Cannon'] = new PowerAlias('Melta Cannon', 'Melta Cannon', 'Melta Cannon', '+ This power gains a 10% chance to apply Plasma Burn, which deals Particle damage every second for 16 seconds per stack.<br />+ Plasma Burn is a type of Radiation.');
dataPowerAlias['YCWS'] = new PowerAlias('YCWS', 'You Clean, We\'ll Sweep', 'You Clean, We\'ll Sweep', '+ Applies a large threat over time effect to your target.<br />+ This effect stacks with the Challenge! effect.');
dataPowerAlias['Extra Bullets'] = new PowerAlias('Extra Bullets', 'Extra Bullets', 'Extra Bullets', '+ Increases the maximum number of targets you can hit with this power by 5, up from 3.<br />+ 15% additional damage agaisnt Feared targets.');

//------------------------------------------------------------------------------
// Power Framework: Archery
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(6);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Strafe', '<div class="Sprite Archery_Strafe"></div>&nbsp;Strafe', 2, 6, pow++, -1, 'Archery, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Strafe fires off a series of arrows at your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aversion', 'Aversion', 2, null, 'Scoring a Critical Hit with Strafe grants you Aversion, adding 20% of your intellect to your Dodge and Avoidance rating for 10 seconds. This can occur at most once every 20 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Straight Shot', '<div class="Sprite Archery_StraightShot"></div>&nbsp;Straight Shot', 2, 6, pow++, 0, 'Archery, 100 foot Ranged Single Target Damage (Blast)<br /><br />You fire a single arrow with deadly precision.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Split the Arrow', 'Split the Arrow', 2, null, 'Your pinpoint accuracy allows you to target the exact location you strike with this arrow, increasing the damage resistance reduction your target suffers, and causing it to affect your next 4 non-energy building direct damage Archery attacks.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Taser Arrow', '<div class="Sprite Archery_TaserArrow"></div>&nbsp;Taser Arrow', 2, 6, pow++, 1, 'Archery, 100 foot Ranged Single Target Damage and Hold<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Taser Arrow fits your arrow with an electrically charged tip delivering a powerful jolt when it strikes your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aftershock', 'Aftershock', 2, null, 'Causes your target to lose Energy and suffer additional Electrical Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sonic Arrow', '<div class="Sprite Archery_SonicArrow"></div>&nbsp;Sonic Arrow', 2, 6, pow++, 1, 'Archery, 100 foot Ranged 10 foot Sphere AoE Damage and Stun<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Sonic Arrow fires a specialized arrow at your target emitting a concentrated blast of noise when it strikes the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Deadly Dissonance', 'Deadly Dissonance', 2, null, 'Increases the Sonic AoE damage dealt by Sonic Arrow by 50% and will now Stun all targets on a full charge instead of just the selected target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Quarry', '<div class="Sprite Archery_Quarry"></div>&nbsp;Quarry', 2, 6, pow++, 1, 'Archery, Slotted Offensive Passive<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Nothing escapes your notice and once you target something, running it down is only a matter of time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Fair Game', 'Fair Game', 2, null, 'When the target of your Quarry dies, you gain a small amount of Health. The amount of Health you gain scales with your Constitution.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 6, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'technology';
//dataReplacePower[dataPower.length-1] = DATAREPLACEPOWER_CONCENTRATION;

dataPower[dataPower.length] = new Power(dataPower.length, 'Evasive Maneuvers', '<div class="Sprite Archery_EvasiveManeuvers"></div>&nbsp;Evasive Maneuvers', 2, 6, pow++, 1, 'Archery, Self Buff<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Evasive Maneuvers causes you to lunge backwards to put distance between you and your foe.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sleight of Mind', 'Sleight of Mind', 2, null, 'Evasive Maneuvers has a 50% chance to wipe all threat from you and places you in Stealth for 3 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hunter\'s Instinct', '<div class="Sprite Archery_HuntersInstinct"></div>&nbsp;Hunter\'s Instinct', 2, 6, pow++, 1, 'Archery, Energy Unlock (Ego, Recovery)<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you deal damage with a non-energy-building Archery power.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Ego, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Snap Shot', '<div class="Sprite Archery_SnapShot"></div>&nbsp;Snap Shot', 2, 6, pow++, 2, 'Archery, 100 foot Ranged Single Target Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />A quick shot designed to take advantage of any opening your target gives you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Finish Him', 'Finish Him', 2, null, 'Your ability to finish off a weakened foe is increased, and Snap Shot now has an additional 35% damage bonus on targets below 25% Health.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Storm of Arrows', '<div class="Sprite Archery_StormOfArrows"></div>&nbsp;Storm of Arrows', 2, 6, pow++, 2, 'Archery, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />Storm of Arrows fires a continuous volley of arrows at your target, striking them and any other targets around them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Achilles\' Heel', 'Achilles\' Heel', 2, null, 'Storm of Arrows pins all enemies in the area under attack to the ground, Rooting them in place and repairing the duration of your Roots on the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Torrent of Arrows', '<div class="Sprite Archery_TorrentOfArrows"></div>&nbsp;Torrent of Arrows', 2, 6, pow++, 2, 'Archery, 100 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />Torrent of Arrows uses your archery skills to fire off multiple arrows in a cone in front of you in a single shot.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Relentless Recurve', 'Relentless Recurve', 2, null, 'Torrent of Arrows Knocks Back all opponents hit by it.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Focused Shot', '<div class="Sprite Archery_FocusedShot"></div>&nbsp;Focused Shot', 2, 6, pow++, 3, 'Archery, 120 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />Focused Shot allows you to carefully aim your next shot and land your attack precisely where you intend.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ballista Bolt', 'Ballista Bolt', 2, null, 'Focused Shot will pierce through enemies hitting any additional enemies in line with your initial target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Explosive Arrow', '<div class="Sprite Archery_ExplosiveArrow"></div>&nbsp;Explosive Arrow', 2, 6, pow++, 3, 'Archery, 100 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />Explosive Arrow fits one of your arrows with an explosive tip, causing the arrow to explode when it strikes your target. ');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Where\'s the Kaboom?', 'Where\'s the Kaboom?', 2, null, 'Explosive Arrow deals an initial amount of Piercing damage and delays the explosive effect for several seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gas Arrow', '<div class="Sprite Archery_GasArrow"></div>&nbsp;Gas Arrow', 2, 6, pow++, 3, 'Archery, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />You launch an arrow filled with a dangerous mixture of toxins.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Noxious Fumes', 'Noxious Fumes', 2, null, 'You focus the chemical mixture of your Gas Arrow to overwhelm the senses of your targets. This causes them to be Snared while inside the cloud, and they also have a 10% chance every second they are in the cloud to become Stunned for a short time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Implosion Engine'].name, dataPowerAlias['Implosion Engine'].desc, 2, 6, pow++, 4, dataPowerAlias['Implosion Engine'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Inverse Polarization Field'].name, dataPowerAlias['Inverse Polarization Field'].desc, 2, null, dataPowerAlias['Inverse Polarization Field'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mechanical Monstrosity'].name, dataPowerAlias['Mechanical Monstrosity'].desc, 2, 6, pow++, 4, dataPowerAlias['Mechanical Monstrosity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fire All Weapons'].name, dataPowerAlias['Fire All Weapons'].desc, 2, 6, pow++, 4, dataPowerAlias['Fire All Weapons'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Meltdown'].name, dataPowerAlias['Meltdown'].desc, 2, 6, pow++, 4, dataPowerAlias['Meltdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Showdown'].name, dataPowerAlias['Showdown'].desc, 2, 6, pow++, 4, dataPowerAlias['Showdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['YCWS'].name, dataPowerAlias['YCWS'].desc, 1, null, dataPowerAlias['YCWS'].tip));

//------------------------------------------------------------------------------
// Power Framework: Gadgeteering
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(7);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Sonic Blaster', '<div class="Sprite Gadgeteering_SonicBlaster"></div>&nbsp;Sonic Blaster', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Sonic Blaster emits a painfully concentrated beam of sound to rip through your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Refraction of Sound', 'Refraction of Sound', 2, null, 'Changes the Sonic Blaster power to deal damage in a cone instead of only to a single target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Particle Rifle', '<div class="Sprite Gadgeteering_ParticleRifle"></div>&nbsp;Particle Rifle', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Particle Rifle discharges concentrated bursts of Particle energy to assault your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Boomerang Toss', '<div class="Sprite Gadgeteering_BoomerangToss"></div>&nbsp;Boomerang Toss', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Use Boomerang Toss to throw a small projectile at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Experimental Blaster', '<div class="Sprite Gadgeteering_ExperimentalBlaster"></div>&nbsp;Experimental Blaster', 2, 7, pow++, 0, 'Gadgeteering, 100 foot Ranged Single Target Damage and Random Effects (Blast)<br /><br />Experimental Blaster is a weapon of your own invention that fires a beam at your target, dealing damage and sometimes having other more... unpredictable effects.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Death Ray', 'Death Ray', 1, null, 'Doubles the chance that your Experimental Blaster deals additional damage when charged less than 1 second, and adds a very very small chance to auto-kill targets it effects. The auto-kill does not work on Master Villains and higher; instead, it deals an additional hit of damage from your blaster.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Pulse Beam Rifle', '<div class="Sprite Gadgeteering_PulseBeamRifle"></div>&nbsp;Pulse Beam Rifle', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Target Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />The Pulse Beam Rifle is designed to target your enemies weak points. While it is one of your most stable creations, it still produces somewhat unpredictable results.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Finite Improbability Engine', 'Finite Improbability Engine', 2, null, 'A reasonable attempt at changing the outcome of random events by evaluating a finite number of improbable outcomes and altering them to your advantage, this device slightly increase the Critical Hit Chance and Critical Severity provided per tick by 1% each, and causes random effects to affect your target when you Critically Hit them.<br /><br />These effects include, but are not limited to: Disorientation, spontaneous Bleeding, indescribable Fear, Slowness of movement ("The Snares"), toxic infusion, temporal displacement, dimensional displacement, important object displacement, other types of displacement, and potentially unknown side effects.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ricochet Throw', '<div class="Sprite Gadgeteering_RicochetThrow"></div>&nbsp;Ricochet Throw', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Target Damage (Blast)<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />You throw a well aimed boomerang at your foes that can bounce to several, striking them for Crushing Damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Microelectronic Controllers', 'Microelectronic Controllers', 2, null, 'Your boomerangs now deal increased damage for each subsequent target they hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Grapple Gun Pull', '<div class="Sprite Gadgeteering_GrappleGunPull"></div>&nbsp;Grapple Gun Pull', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Yank your foe to you using your trusty Grapple Gun.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gauntlet Chainsaw', '<div class="Sprite Gadgeteering_GauntletChainsaw"></div>&nbsp;Gauntlet Chainsaw', 2, 7, pow++, 1, 'Gadgeteering, 10 foot Melee 2.5 foot Cylinder AoE Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Gauntlet Chainsaw uses a glove mounted chainsaw to slash through any targets in your path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ripsaw', 'Ripsaw', 2, null, 'Increases the damage your Gauntlet Chainsaw deals when the target is below 30% Health.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Particle Mine', '<div class="Sprite Gadgeteering_ParticleMine"></div>&nbsp;Particle Mine', 2, 7, pow++, 1, 'Gadgeteering, Placed AoE Ranged Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Particle Mine places a mine on the ground that will explode, dealing heavy Particle damage, when an enemy comes within range.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ejector Module', 'Ejector Module', 2, null, 'Enemies hit by Particle Mine will be Knocked Back in addition to taking damage.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Experimental Burst Ray', '<div class="Sprite Gadgeteering_ExperimentalBurstRay"></div>&nbsp;Experimental Burst Ray', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged 30 degree Cone AoE Damage and Random Effects<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Making tweaks to a basic Experimental Blaster has allowed you to generate a wide-spectrum Particle beam attack with it. You still haven\\\'t worked out all of the kinks, but it\\\'s probably ready for field testing. Probably.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Arcturus Cooling System', 'Arcturus Cooling System', 2, null, 'Increases the chance of getting secondary effects and halves the chance and duration of overheating your Experimental Burst Ray by temporarily creating a portal to an alternate reality, dissipating the immense heat generated from overcharging into that alternate reality instead of our own. The likelihood of that reality being populated is astronomically low, so it\\\'s probably fine.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Entangling Mesh', '<div class="Sprite Gadgeteering_EntanglingMesh"></div>&nbsp;Entangling Mesh', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged 15 foot Sphere AoE Root<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Entangling Mesh adds a web-like explosion to your arsenal. Any enemies caught in the explosion become tangled in the mesh Rooting them in place.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sapping Solution', 'Sapping Solution', 2, null, '5 seconds after being hit by the Entangling Mesh, targets become Snared by the debilitating chemicals of the mesh, causing them to move slowly for a time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Bionic Shielding', '<div class="Sprite Gadgeteering_BionicShielding"></div>&nbsp;Bionic Shielding', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Friend Buff and Heal<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Bionic Shielding places a shield of healing energy around your target, causing them to be healed any time they take damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Overloaded Circuits', 'Overloaded Circuits', 2, null, 'Places an active defense system in your bionic shielding, dealing Electrical damage to anyone who triggers your shield. Damage dealt is based on incoming damage.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Medical Nanites', '<div class="Sprite Gadgeteering_MedicalNanites"></div>&nbsp;Medical Nanites', 2, 7, pow++, 1, 'Gadgeteering, Support Passive, 100 foot PBAoE Friend HoT<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />+ Heals you and allies within 100 feet every 3 seconds.<br />+ Affected allies also gain a small amount of damage resistance.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sonic Device', '<div class="Sprite Gadgeteering_SonicDevice"></div>&nbsp;Sonic Device', 2, 7, pow++, 1, 'Gadgeteering, Self On-Next-Hit Damage and Stun<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Sonic Device adds a focused Sonic pulse to your next attack, increasing the damage of the attack and adding the potential to Stun your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Deafening Dissolution', 'Deafening Dissolution', 2, null, 'Your Sonic Device now deals 20% less damage with single target attacks, but deals 80% additional damage with AoE attacks.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Nanobot Swarm', '<div class="Sprite Gadgeteering_NanobotSwarm"></div>&nbsp;Nanobot Swarm', 2, 7, pow++, 1, 'Gadgeteering, Self Recharge Reduction<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Using millions of tiny robots you refresh yourself and continue fighting as though the fight just started.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rejuvinating Injectors', 'Rejuvinating Injectors', 2, null, 'Causes the activation of Nanobot Swarm to grant you a Heal over Time Buff for several seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 7, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'technology';
//dataReplacePower[dataPower.length-1] = dataPower.length-1;
//for (var i in dataReplacePower) {
//    if (dataReplacePower[i] == DATAREPLACEPOWER_CONCENTRATION) dataReplacePower[i] = dataPower.length-1;
//}
//DATAREPLACEPOWER_CONCENTRATION = dataPower.length-1;

dataPower[dataPower.length] = new Power(dataPower.length, 'Molecular Self-Assembly', '<div class="Sprite Gadgeteering_MolecularSelfAssembly"></div>&nbsp;Molecular Self-Assembly', 2, 7, pow++, 1, 'Gadgeteering, Energy Unlock (Intelligence, Recovery)<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time one of your powers comes off cooldown.<br />+ Restores energy every 3 seconds over 6 seconds.<br />+ This ability does not stack, but additional applications will refresh the duration.<br />+ The energy gained scales with your Intelligence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Tractor Beam', '<div class="Sprite Gadgeteering_TractorBeam"></div>&nbsp;Tractor Beam', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged Single Target Reverse Repel<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Tractor Beam latches on to your target and pulls them towards you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Final Delivery', 'Final Delivery', 2, null, 'Targets that are beamed into Melee range will be damaged and Knocked Back.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sonic Boom Generator', '<div class="Sprite Gadgeteering_SonicBoomGenerator"></div>&nbsp;Sonic Boom Generator', 2, 7, pow++, 2, 'Gadgeteering, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />With this enhanced Sonic Blaster, you can generate a highly concentrated pulse of Sonic energy, which erupts into near deafening levels on your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sonic Suppression Enhancer', 'Sonic Suppression Enhancer', 2, null, 'This modification allows your Sonic Boom Generator to focus the frequency of your Sonic attack such that your targets will be unable to focus and will be more susceptible to Sonic damage for a short period of time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Throwing Blades', '<div class="Sprite Gadgeteering_ThrowingBlades"></div>&nbsp;Throwing Blades', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged 120 degree Cone AoE Damage<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />You throw a flurry of boomerangs at all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Aggression', 'Aggression', 2, null, '+ On a full charge, applies Bleed to a non-Bleeding target.<br />+ Applies Bleed to a non-Bleeding target on tap if used in melee range.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gas Pellets', '<div class="Sprite Gadgeteering_GasPellets"></div>&nbsp;Gas Pellets', 2, 7, pow++, 2, 'Gadgeteering, Ranged AoE Damage and Snare<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />Gas Pellets throws 4 pellets that release a choking fume that damages and slows all enemies caught in its radius.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Oversized Pellet Bag', 'Oversized Pellet Bag', 2, null, 'Your Gas Pellets now have a chance to apply poison.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Tanglecoil Launcher', '<div class="Sprite Gadgeteering_TanglecoilLauncher"></div>&nbsp;Tanglecoil Launcher', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Single Target Hold<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Tanglecoil fires a projectile thats binds your foe, crushing them and preventing any actions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Constricting Coils', 'Constricting Coils', 2, null, 'Reinforced Tanglecoil wires double the damage dealt by your Tanglecoil Launcher.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Bolas', '<div class="Sprite Gadgeteering_Bolas"></div>&nbsp;Bolas', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged Single Target Damage and Hold<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />Bolas throws a projectile that binds your foe, crushing them and preventing any actions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Toxic Nanites', '<div class="Sprite Gadgeteering_ToxicNanites"></div>&nbsp;Toxic Nanites', 2, 7, pow++, 2, 'Gadgeteering, Self On-Next-Hit DoT<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Toxic Nanites laces your next attack with deadly nanites, infecting your target and dealing Toxic Damage over Time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Nerve Damage', 'Nerve Damage', 2, null, 'Adds a Snare to the Toxic Nanite effect, reducing the movement speed of the target for the duration of the DoT effect. When using an AoE attack with Toxic Nanites, the duration of the Snare is reduced.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Miniaturization Drive', '<div class="Sprite Gadgeteering_MiniaturizationDrive"></div>&nbsp;Miniaturization Drive', 2, 7, pow++, 2, 'Gadgeteering, Self On-Next-Hit Debuff<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Miniaturization Drive charges your next attack with a miniaturization field, causing the target of the attack to shrink in size and strength.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Reciprocating Gizmo', 'Reciprocating Gizmo', 2, null, 'Causes you to grow in size as your target shrinks, increasing your movement speed and damage.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Munitions Bots', '<div class="Sprite Gadgeteering_MunitionsBots"></div>&nbsp;Munitions Bots', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon Munitions Bots that can transform back and forth between a minigun armed robot and a powerful but stationary rapid-fire turret.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Support Drones', '<div class="Sprite Gadgeteering_SupportDrones"></div>&nbsp;Support Drones', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />This power summons 2 hovering Support Drones that can toggle between a healing mode, and a light high-tech energy weapon platform.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Attack Toys', '<div class="Sprite Gadgeteering_AttackToys"></div>&nbsp;Attack Toys', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />This power summons automated Attack Toys that can periodically self replicate.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Orbital Cannon', '<div class="Sprite Gadgeteering_OrbitalCannon"></div>&nbsp;Orbital Cannon', 2, 7, pow++, 3, 'Gadgeteering, 100 foot Ranged AoE Damage<br /><br />Requires 5 powers from Gadgeteering or 6 non-Energy Building powers from any framework.<br /><br />Orbital Cannon calls down a Particle blast to destroy your enemies from a weapon platform orbiting high overhead.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Anvil of Dawn', 'Anvil of Dawn', 2, null, 'Orbital Cannon continues firing a steady beam after the initial blast. It will also chase targets, but moves slowly.<br /><br />In this mode the continuing damaging power of the cannon is effective only at the ground level.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Strafing Run', '<div class="Sprite Gadgeteering_StrafingRun"></div>&nbsp;Strafing Run', 2, 7, pow++, 3, 'Gadgeteering, Ranged AoE Damage<br /><br />Requires 5 powers from Gadgeteering or 6 non-energy building powers from any framework.<br /><br />You call in support from your high tech jet which then drops explosives in a targeted area.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Resurrection Serum', '<div class="Sprite Gadgeteering_ResurrectionSerum"></div>&nbsp;Resurrection Serum', 2, 7, pow++, 3, 'Gadgeteering, 15 foot Sphere PBAoE Revive<br /><br />Requires 5 powers from Gadgeteering or 6 non-Energy Building powers from any framework.<br /><br />Resurrection Serum is a carefully crafted concoction administered to fallen allies to return them to action.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Reanimator', 'Reanimator', 2, null, 'Modifies the function of Resurrection Serum to allow its use on enemies who will then fight by your side as a zombie for a time. The duration increases for each rank of Resurrection Serum you purchase.<br /><br />Taking this advantage replaces the original functionality of the power.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Implosion Engine'].name, dataPowerAlias['Implosion Engine'].desc, 2, 7, pow++, 4, dataPowerAlias['Implosion Engine'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Inverse Polarization Field'].name, dataPowerAlias['Inverse Polarization Field'].desc, 2, null, dataPowerAlias['Inverse Polarization Field'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mechanical Monstrosity'].name, dataPowerAlias['Mechanical Monstrosity'].desc, 2, 7, pow++, 4, dataPowerAlias['Mechanical Monstrosity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fire All Weapons'].name, dataPowerAlias['Fire All Weapons'].desc, 2, 7, pow++, 4, dataPowerAlias['Fire All Weapons'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Meltdown'].name, dataPowerAlias['Meltdown'].desc, 2, 7, pow++, 4, dataPowerAlias['Meltdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Showdown'].name, dataPowerAlias['Showdown'].desc, 2, 7, pow++, 4, dataPowerAlias['Showdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['YCWS'].name, dataPowerAlias['YCWS'].desc, 1, null, dataPowerAlias['YCWS'].tip));

//------------------------------------------------------------------------------
// Power Framework: Munitions
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(8);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Gunslinger', '<div class="Sprite Munitions_Gunslinger"></div>&nbsp;Gunslinger', 2, 8, pow++, -1, 'Munitions, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Gunslinger pulls out a pair of pistols to put down your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Trick Shot', 'Trick Shot', 2, null, '50% (100% while Concentrated) chance to hit an additional target within 12 feet. The additional target takes double damage if they are Feared.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Steady Shot', '<div class="Sprite Munitions_SteadyShot"></div>&nbsp;Steady Shot', 2, 8, pow++, -1, 'Munitions, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />You take aim with a single pistol to shoot your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Paint the Target', 'Paint the Target', 2, null, 'Each shot focuses your aim, increasing your chance to Critically Hit and your Critical Severity. This effect stacks up to 5 times, and is consumed when you perform a Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Burst Shot', '<div class="Sprite Munitions_BurstShot"></div>&nbsp;Burst Shot', 2, 8, pow++, 0, PowerTip(8, 1, '50 foot Ranged 2 foot cyllinder', 'Deals Piercing damage to targets and applies Armor Piercing.<br />+ ' + dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Taking Names', 'Taking Names', 2, null, 'Burst Shot now refreshes the Furious buff on you.  If you are not affected by Furious, it will apply one stack.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Off Your Feet', 'Off Your Feet', 2, null, 'Enemies will now be knocked back by Burst Shot.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Pistol Whip', '<div class="Sprite Munitions_PistolWhip"></div>&nbsp;Pistol Whip', 2, 8, pow++, 1, PowerTip(8, 1, '10 foot Melee Single Target Damage and Stun', 'Deals Crushing damage and briefly Stuns the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'They Never Go Easy', 'They Never Go Easy', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rifle Butt', '<div class="Sprite Munitions_RifleButt"></div>&nbsp;Rifle Butt', 2, 8, pow++, 1, PowerTip(8, 1, 'Melee Single Target Damage and Stun', 'Deals single target Crushing damage to the target, briefly stunning them.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Holdout Shot', '<div class="Sprite Munitions_HoldoutShot"></div>&nbsp;Holdout Shot', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged Single Target Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />When you\\\'ve thrown everything at them and they\\\'re still coming Holdout Shot can be your saving grace.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['OW'].name, dataPowerAlias['OW'].desc, 2, null, dataPowerAlias['OW'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Trip Wire', '<div class="Sprite Munitions_TripWire"></div>&nbsp;Trip Wire', 2, 8, pow++, 1, 'Munitions, 50 foot Damage and Knock To<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Your target is Knocked to you.<br /><br />Has a 46-100% chance to apply Disorient to your target.  Disoriented targets have their damage reduced by 10% and their movement speed reduced by 15%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['OW'].name, dataPowerAlias['OW'].desc, 2, null, dataPowerAlias['OW'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shotgun Blast', '<div class="Sprite Munitions_ShotgunBlast"></div>&nbsp;Shotgun Blast', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Shotgun Blast unloads a powerful blast into any enemies in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Breaching Round', 'Breaching Round', 2, null, '+ 100% chance to knock your primary target back.<br />+ 100% chance to knock secondary targets back if they are affected by Armor Piercing.<br />+ Refreshes all stacks of Furious on you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Mind the Uniform', 'Mind the Uniform', 2, null, 'Applies Fear to all affected targets, reducing their damage for a short time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AP'].name, dataPowerAlias['AP'].desc, 2, null, '+ Applies Armor Piercing to your primary target and has a 20% chance to apply it to secondary targets.<br />+ ' + dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Flamethrower', '<div class="Sprite Munitions_Flamethrower"></div>&nbsp;Flamethrower', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals fire damage to up affected targets and has a 10% chance to apply Clinging Flames.  ' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Panic', 'Panic', 2, null, '+ 20% chance to stun targets for 2 seconds.<br />+ If the target is affected by Fear, this chance is increased to 100%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Spitfire', 'Spitfire', 2, null, '+ Increases the chance to apply Clinging Flames to 20%.<br />+ If you ar affected by Furious, this chance increases to 100%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Bullet Hail', '<div class="Sprite Munitions_BulletHail"></div>&nbsp;Bullet Hail', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage every 0.5 sec to up to 3 targets.<br /><br />+ Has a 20% per hit to apply Furious to you.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aggression', 'Aggression', 2, null, '15% chance per tick per target to apply Bleeding to a non-Bleeding target. 100% chance vs non-Bleeding targets in Melee range.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Assault', 'Assault', 2, null, 'Refreshes the Armor Piercing debuff on your targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Wall of Bullets', 'Wall of Bullets', 3, null, 'Maintaining this power grants you an absorption shield that scales up over time, ending when you stop maintaining the power.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['Extra Bullets'].name, dataPowerAlias['Extra Bullets'].desc, 1, null, dataPowerAlias['Extra Bullets'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Submachinegun Burst', '<div class="Sprite Munitions_SubmachinegunBurst"></div>&nbsp;Submachinegun Burst', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage every 0.5 sec to up to 3 targets.<br /><br />+ Has a 20% per hit to apply Furious to you.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aggression', 'Aggression', 2, null, '15% chance per tick per target to apply Bleeding to a non-Bleeding target. 100% chance vs non-Bleeding targets in Melee range.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Assault', 'Assault', 2, null, 'Refreshes the Armor Piercing debuff on your targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Wall of Bullets', 'Wall of Bullets', 3, null, 'Maintaining this power grants you an absorption shield that scales up over time, ending when you stop maintaining the power.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['Extra Bullets'].name, dataPowerAlias['Extra Bullets'].desc, 1, null, dataPowerAlias['Extra Bullets'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Composure', '<div class="Sprite Munitions_Composure"></div>&nbsp;Composure', 2, 8, pow++, 1, 'Munitions Offensive Passive<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />+ Increases the damage of your Technology powers, scaling with your super stats.<br />+ Increases your Dodge and Avoidance rating, scaling with your super stats.<br />+ Increases your Knock resistance, scaling with your super stats.<br />+ Generates energy when you dodge an attack, scaling with your Recovery.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sharp Shooter', '<div class="Sprite Munitions_SharpShooter"></div>&nbsp;Sharp Shooter', 2, 8, pow++, 1, 'Munitions, Form (Dexterity)<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you gain a stack of Furious or deal a critical hit while Furious.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 8, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'technology';
//dataReplacePower[dataPower.length-1] = DATAREPLACEPOWER_CONCENTRATION;

dataPower[dataPower.length] = new Power(dataPower.length, 'Killer Instinct', '<div class="Sprite Munitions_KillerInstinct"></div>&nbsp;Killer Instinct', 2, 8, pow++, 1, 'Munitions, Energy Unlock (Recovery)<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />+ Generates energy every time you deal a critical hit with a non-energy-building Munitions power.<br />+ Restores eenrgy every 3 seconds over 6 seconds.<br />+ The energy gained scales with your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Execution Shot', '<div class="Sprite Munitions_ExecutionShot"></div>&nbsp;Execution Shot', 2, 8, pow++, 2, 'Munitions, 10 foot Melee Finisher<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage.  If the target is below 25% health, the damage is doubled.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Is It Not Just Mayhem?', 'Is It Not Just Mayhem?', 2, null, 'Applies Fear to the target, reducing their damage by 10% for 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'I Pay It Gladly', 'I Pay It Gladly', 2, null, '+ If you kill a target with Execution Shot, you gain 3 stacks of Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Bullet Ballet', '<div class="Sprite Munitions_BulletBeatdown"></div>&nbsp;Bullet Ballet', 2, 8, pow++, 2, 'Munitions, 10 foot Melee/Ranged Combo<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />This gun kata uses all the resources at your disposal to take care of your enemy.  Tutu not included.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Not Without Incident', 'Not Without Incident', 2, null, '30% (100% while Furious) chance to inflict AoE damage (10ft range, max of 5 targets) around your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mini Mines', '<div class="Sprite Munitions_MiniMines"></div>&nbsp;Mini Mines', 2, 8, pow++, 2, 'Munitions, Placed AoE Melee Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Places several mines that last for 12 seconds.  Targets that get too close suffer Crushing damage and are Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Wall of Fire', 'Wall of Fire', 2, null, 'You now create two sets of Mini Mines, allowing them to cover a larger area, but each set does 40% less damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rocket', '<div class="Sprite Munitions_Rocket"></div>&nbsp;Rocket', 2, 8, pow++, 2, 'Munitions, 100 foot Ranged 20 foot Sphere AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Fire and Crushing damage to your primary target and half as much to secondary targets within 20 feet.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Concussive Rocket', 'Concussive Rocket', 2, null, 'Your rockets now Knock Back foes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Frag Grenade', '<div class="Sprite Munitions_FragGrenade"></div>&nbsp;Frag Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE DoT<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Snares and deals Piercing damage every second for 10 seconds to affected targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cuts and Scrapes', 'Cuts and Scrapes', 2, null, '+ Applies Armor Piercing to your primary target.<br /> +' + dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['OW'].name, dataPowerAlias['OW'].desc, 2, null, dataPowerAlias['OW'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Gatling Gun', '<div class="Sprite Munitions_GatlingGun"></div>&nbsp;Gatling Gun', 2, 8, pow++, 2, 'Munitions, 100 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to targets and has a 10% with every hit and 10o% on a full maintain to apply Armor Piercing.  ' + dataPowerAlias['AP'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Listen to Reason', 'Listen to Reason', 2, null, '+ 15% chance to apply Fear to target.<br />+ Refreshes all stacks of Furious.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Sheer Force', 'Sheer Force', 2, null, '+ Repels targets away from you.<br />+ Has a chance to Knock Down targets near you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Concussion Grenade', '<div class="Sprite Munitions_ConcussionGrenade"></div>&nbsp;Concussion Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE Damage + Knockback<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to all targets and knocks them back.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Stun Grenade', 'Stun Grenade', 2, null, 'Targets are Stunned instead of Knocked Back.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Incendiary Grenade', '<div class="Sprite Munitions_IncendiaryGrenade"></div>&nbsp;Incendiary Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Fire damage to targets.  The primary target is affected by Clinging Flames, while secondary targets have a 25% chance to be affected.<br /><br />' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NQ'].name, dataPowerAlias['NQ'].desc, 2, null, dataPowerAlias['NQ'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Smoke Grenade', '<div class="Sprite Munitions_SmokeGrenade"></div>&nbsp;Smoke Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot AoE Threat Wipe and Stealth<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Greatly reduces the perception of affected targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Escape Artist', 'Escape Artist', 2, null, '+ Wipes all threat from affected targets.<br />+ Greatly increases the cooldown of this ability.<br />+ Places you in stealth briefly.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lock N Load', '<div class="Sprite Munitions_LockNLoad"></div>&nbsp;Lock N Load', 2, 8, pow++, 2, 'Munitions, Active Offense<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Lock and Load prepares you for the upcoming fight.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Two Smoking Barrels', 'Two Smoking Barrels', 2, null, 'Whenever you hit with a Melee attack, the cooldown on Lock N Load is reduced by 2 seconds. However, your Lock N Load no longer grants bonus damage to your Melee attacks.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Breakaway Shot', '<div class="Sprite Munitions_BreakawayShot"></div>&nbsp;Breakaway Shot', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 60 degree Cone AoE Damage and 40 foot Reverse Lunge<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Lunge away from your target, dealing Piercing damage targets in front of you.  Knocks Down your primary target and has a 25% chance to also Knock Down secondary targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Microfilament Wire', 'Microfilament Wire', 2, null, 'If used within Melee range of a target, the primary target will be Knocked Towards you after you land.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AP'].name, dataPowerAlias['AP'].desc, 2, null, dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Parting Shot', '<div class="Sprite Munitions_PartingShot"></div>&nbsp;Parting Shot', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 60 degree Cone AoE Damage and 40 foot Reverse Lunge<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Lunge away from your target, dealing Piercing damage to them and Knocking them back.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Predictable', 'Predictable', 2, null, '+ Wipes all threat from your primary target.<br />+ Places you in Stealth briefly.<br />+ Increases the cooldown of Parting Shot to match other similar Threat Wipes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AP'].name, dataPowerAlias['AP'].desc, 2, null, dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Assault Rifle', '<div class="Sprite Munitions_AssaultRifle"></div>&nbsp;Assault Rifle', 2, 8, pow++, 3, 'Munitions, 100 foot Ranged Single Target Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mow \'em Down', 'Mow \'em Down', 2, null, 'Assault Rifle becomes an AoE power capable of hitting up to 3 targets in a 2 foot cylinder.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Uncompromising', 'Uncompromising', 2, null, 'Deals 10% additional base damage for every stack of Furious you have.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Two-Gun Mojo', '<div class="Sprite Munitions_TwoGunMojo"></div>&nbsp;Two-Gun Mojo', 2, 8, pow++, 3, 'Munitions, 50 foot Ranged Single Target Damage and Buff<br /><br />Deals Piercing damage and has a 15% chance per hit to apply Furious.<br /><br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Close the Gap', 'Close the Gap', 2, null, 'Two-Gun Mojo deals increased damage if you are closer to your target.  This bonus caps out at 30% in melee range.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Bullet Spray', 'Bullet Spray', 2, null, 'Two-Gun Mojo becomes an AoE power capable of hitting up to 3 targets in a 2 foot cylinder.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sniper Rifle', '<div class="Sprite Munitions_SniperRifle"></div>&nbsp;Sniper Rifle', 2, 8, pow++, 3, 'Munitions, 120 foot Ranged Damage and Stun<br /><br />Requires 5 powers from Munitions or 6 non-Energy Building powers from any framework.<br /><br />The pinpoint accuracy of the Sniper Rifle is the culmination of years of marksmanship training. This rifle attack must be completely charged to fire. It does heavy damage to the target and has a chance to Stun. Purchasing additional ranks of this power increases the chance to Stun and the amount of damage done.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Tungsten Rounds', 'Tungsten Rounds', 2, null, 'Allows your Sniper Rifle shots to hit up to 3 targets in a line.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lead Tempest', '<div class="Sprite Munitions_LeadTempest"></div>&nbsp;Lead Tempest', 2, 8, pow++, 3, 'Munitions, 50 foot Sphere PBAoE Ranged Damage<br /><br />Requires 5 powers from Munitions or 6 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to enemies.  Has a 10% chance to miss enemies within 30 feet of you and a 25% chance to miss enemies further than 30 feet.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Tread Softly', 'Tread Softly', 2, null, 'Grants a significant bonus to Dodge and Avoidance while maintained. This bonus is doubled if you are currently Concentrated.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Maybe I\'m Just Better', 'Maybe I\'m Just Better', 2, null, '+ Lead Tempest now has a chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Implosion Engine'].name, dataPowerAlias['Implosion Engine'].desc, 2, 8, pow++, 4, dataPowerAlias['Implosion Engine'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Inverse Polarization Field'].name, dataPowerAlias['Inverse Polarization Field'].desc, 2, null, dataPowerAlias['Inverse Polarization Field'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mechanical Monstrosity'].name, dataPowerAlias['Mechanical Monstrosity'].desc, 2, 8, pow++, 4, dataPowerAlias['Mechanical Monstrosity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fire All Weapons'].name, dataPowerAlias['Fire All Weapons'].desc, 2, 8, pow++, 4, dataPowerAlias['Fire All Weapons'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Meltdown'].name, dataPowerAlias['Meltdown'].desc, 2, 8, pow++, 4, dataPowerAlias['Meltdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Showdown'].name, dataPowerAlias['Showdown'].desc, 2, 8, pow++, 4, dataPowerAlias['Showdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['YCWS'].name, dataPowerAlias['YCWS'].desc, 1, null, dataPowerAlias['YCWS'].tip));

//------------------------------------------------------------------------------
// Power Framework: Power Armor
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(9);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Wrist Bolter', '<div class="Sprite PowerArmor_WristBolter"></div>&nbsp;Wrist Bolter', 2, 9, pow++, -1, 'Power Armor, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Wrist Bolter uses wrist mounted Particle cannons to rain destruction down on your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Automated Assault', 'Automated Assault', 1, null, 'Changes the Wrist Bolter to function as a hand slot. Wrist Bolter does not generate Energy while other powers are in use.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Power Bolts', '<div class="Sprite PowerArmor_PowerBolts"></div>&nbsp;Power Bolts', 2, 9, pow++, -1, 'Power Armor, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Power Bolts fires pure Kinetic Energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'It Burns', 'It Burns', 2, null, 'All Power Bolts attacks now have a chance to apply Plasma Burn instead of just the opening attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Power Gauntlet', '<div class="Sprite PowerArmor_PowerGauntlet"></div>&nbsp;Power Gauntlet', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage (Blast)<br /><br />Power Gauntlet uses your gloves as a point to focus Particle energy before using it to blast away any foes in your path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Downrange Disaster', 'Downrange Disaster', 2, null, 'Causes Power Gauntlet to deal less damage when you are close to the target and more damage the further you are from the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Tactical Missiles', '<div class="Sprite PowerArmor_TacticalMissiles"></div>&nbsp;Tactical Missiles', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage (Blast)<br /><br />Tactical Missiles fire from your wrist to obliterate your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blast Radius', 'Blast Radius', 2, null, 'Tactical Missiles now deals its base damage in a 10 foot radius.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Concussor Beam', '<div class="Sprite PowerArmor_ConcussorBeam"></div>&nbsp;Concussor Beam', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage and Repel<br /><br />Hand Slot<br /><br />Deals Particle damage and Repels targets up to 45 feet.  The strength of this Repel increases with each pulse.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frenetic Blast', 'Frenetic Blast', 2, null, 'Reduces the movement speed of the target of Concussor Beam for the maintained time of the power.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Dual Wrist Rocket Barrage', '<div class="Sprite PowerArmor_DualWristRocketBarrage"></div>&nbsp;Dual Wrist Rocket Barrage', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage and Repel<br /><br />Hand Slot<br /><br />Deals Crushing damage and Repels targets up to 45 feet.  The strength of this Repel increases with each pulse.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Frenetic Blast', 'Frenetic Blast', 2, null, 'Reduces the movement speed of the target of Concussor Beam for the maintained time of the power.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Eye Beam', '<div class="Sprite PowerArmor_EyeBeam"></div>&nbsp;Eye Beam', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 2 foot cyllinder AoE Damage<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />Deals Particle damage to all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, '20/20 Fission', '20/20 Fission', 2, null, '+ Maintaining this power for at least half of its duration applies Burn Through.<br />' + dataPowerAlias['Burn Through'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mini Gun', '<div class="Sprite PowerArmor_MiniGun"></div>&nbsp;Mini Gun', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 2 foot cyllinder AoE Damage<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />Deals Crushing damage to all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'U-238 Rounds', 'U-238 Rounds', 2, null, '+ Maintaining this power for at least half of its duration applies Burn Through.<br />' + dataPowerAlias['Burn Through'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Infrared Guidance System', 'Infrared Guidance System', 1, null, 'Increases the radius of this power to 5 feet.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rocket Punch', '<div class="Sprite PowerArmor_RocketPunch"></div>&nbsp;Rocket Punch', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 10 foot Sphere AoE Damage - Blast<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to targets.  Has a 12-50% (based on charge time) chance to Knock Back targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Grasping Hand', 'Grasping Hand', 2, null, 'Rocket Punch now Roots targets instead of knocking them back.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Targeting Computer', '<div class="Sprite PowerArmor_TargetingComputer"></div>&nbsp;Targeting Computer', 2, 9, pow++, 1, 'Power Armor, Offensive Passive - Energy Form<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />+ Increaes your ranged Technology damage.<br />+ After 3 seconds, foes damaged by ranged Technology powers give you 5% critical chance, 10% critical severity, and a smalla mount of damage resistance against them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Invulnerability', '<div class="Sprite PowerArmor_Invulnerability"></div>&nbsp;Invulnerability', 2, 9, pow++, 1, 'Power Armor, Defensive Passive<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Grants you a combination of percent-based and flat damage reduction.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aspect of the Machine', '<div class="Sprite PowerArmor_AspectOfTheMachine"></div>&nbsp;Aspect of the Machine', 2, 9, pow++, 1, 'Power Armor, Form (Strength or Ego)<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged and melee damage.<br /><br />+ You gain a stack each time you kill something.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 5 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.<br />- Killing targets to generate stacks may not always be practical, so investing in ranks is recommended.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 9, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'technology';
//dataReplacePower[dataPower.length-1] = DATAREPLACEPOWER_CONCENTRATION;

dataPower[dataPower.length] = new Power(dataPower.length, 'Energy Shield', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Energy Shield', 2, 9, pow++, 1, 'Power Armor, Block<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 270% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Laser Knight', 'Laser Knight', 3, null, 'If you have the Energy Shield power slotted, this advantage will cause it to activate when you make a Melee attack, increasing your defense for a few seconds, but slightly lowering the attack\\\'s damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Phalanx Defense System', 'Phalanx Defense System', 3, null, 'If you have the Energy Shield power slotted, this advantage will cause it to activate when you make a Power Armor Slot (Chest, Hand, or Shoulder) attack, increasing your defense for a few seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Overdrive', '<div class="Sprite PowerArmor_Overdrive"></div>&nbsp;Overdrive', 2, 9, pow++, 1, 'Power Armor, Energy Unlock (Recovery, Endurance)<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every 3 seconds over 9 seconds every time you use a toggle or maintain power for at least half of its duration.<br />+ This effect stacks up to 3 times.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Micro Munitions', '<div class="Sprite PowerArmor_MicroMunitions"></div>&nbsp;Micro Munitions', 2, 9, pow++, 2, 'Power Armor, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Deals Crushing damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Alpha Strike', 'Alpha Strike', 2, null, '+ Damage is increased when attacking fewer targets.<br />+ The maximum bonus is applied against 1 target, but attacking 5 targets offers no bonus at all.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Chest Beam', '<div class="Sprite PowerArmor_ChestBeam"></div>&nbsp;Chest Beam', 2, 9, pow++, 2, 'Power Armor, 50 foot Ranged 2 foot Cylinder AoE Damage and Debuff<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Particle damage to targets.  In addition, targets are Knocked Back and are affected by Burn Through.<br />' + dataPowerAlias['Burn Through'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Point Blank Blast', 'Point Blank Blast', 2, null, 'Deals increased damage to targets the closer they are to you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Chest Laser', '<div class="Sprite PowerArmor_ChestLaser"></div>&nbsp;Chest Laser', 2, 9, pow++, 2, 'Power Armor, 50 foot Ranged 2 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Deals Particle damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Melta Cannon'].name, dataPowerAlias['Melta Cannon'].desc, 2, null, dataPowerAlias['Melta Cannon'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Plasma Beam', '<div class="Sprite PowerArmor_PlasmaBeam"></div>&nbsp;Plasma Beam', 2, 9, pow++, 2, 'Power Armor, 50 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Hand Slot<br /><br />Deals Particle damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Melta Cannon'].name, dataPowerAlias['Melta Cannon'].desc, 2, null, dataPowerAlias['Melta Cannon'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Binding Shot', '<div class="Sprite Gadgeteering_TanglecoilLauncher"></div>&nbsp;Binding Shot', 2, 9, pow++, 2, 'Power Armor, 50 foot Single Target Hold<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to the target and Paralyzes them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Unbreakable', '<div class="Sprite PowerArmor_Unbreakable"></div>&nbsp;Unbreakable', 2, 9, pow++, 2, 'Power Armor, Active Defense<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Through a focused effort you are able to shrug off attacks without harm.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, 'Rank 3', 'Rank 3', 2, 1,'[ID]'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Better You Than Me', 'Better You Than Me', 2, null, 'Attacks against you while you have Unbreakable active have a chance to grant 1 stack of the Enrage Buff, and to refresh all instances of that Buff on yourself. This can happen at most once every 3 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Energy Wave', '<div class="Sprite PowerArmor_EnergyWave"></div>&nbsp;Energy Wave', 2, 9, pow++, 3, 'Power Armor, 25 foot Sphere PBAoE Ranged Damage - Repel - Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to all nearby targets and repels them.  If charged for at least 50%, each target is also Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Hardened Particle Matrix', 'Hardened Particle Matrix', 3, null, 'Your Energy Wave attack will redirect the enrgy around you into a short duration Shield which absorbs damage based on the number of targets caught in your blast.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Reverse Polarity', 'Reverse Polarity', 2, null, 'Energy Wave will now Knock Towards you instead of away from you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shoulder Launcher', '<div class="Sprite PowerArmor_ShoulderLauncher"></div>&nbsp;Shoulder Launcher', 2, 9, pow++, 3, 'Power Armor, 100 foot Ranged 10 foot Sphere AoE Damage and Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />After 4 seconds, deals Crushing and Particle damage the target and half of that to all foes near the target.  Each target has a 20% chance of being Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Bunker Buster', 'Bunker Buster', 2, null, 'Shoulder Launcher deals additional damage to targets using Block.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hand Cannon', '<div class="Sprite PowerArmor_HandCannon"></div>&nbsp;Hand Cannon', 2, 9, pow++, 3, 'Power Armor, 100 foot Ranged 2 foot Cylinder AoE Damage and Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Hand Slot<br /><br />After 4 seconds, deals Particle damage the target and half of that to all foes near the target.  Each target has a 20% chance of being Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Reconstruction Circuits', '<div class="Sprite PowerArmor_ReconstructionCircuits"></div>&nbsp;Reconstruction Circuits', 2, 9, pow++, 3, 'Power Armor, Self Heal Over Time<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Heals you as long as it is toggled on.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Implosion Engine'].name, dataPowerAlias['Implosion Engine'].desc, 2, 9, pow++, 4, dataPowerAlias['Implosion Engine'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Inverse Polarization Field'].name, dataPowerAlias['Inverse Polarization Field'].desc, 2, null, dataPowerAlias['Inverse Polarization Field'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mechanical Monstrosity'].name, dataPowerAlias['Mechanical Monstrosity'].desc, 2, 9, pow++, 4, dataPowerAlias['Mechanical Monstrosity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fire All Weapons'].name, dataPowerAlias['Fire All Weapons'].desc, 2, 9, pow++, 4, dataPowerAlias['Fire All Weapons'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Meltdown'].name, dataPowerAlias['Meltdown'].desc, 2, 9, pow++, 4, dataPowerAlias['Meltdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Showdown'].name, dataPowerAlias['Showdown'].desc, 2, 9, pow++, 4, dataPowerAlias['Showdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['YCWS'].name, dataPowerAlias['YCWS'].desc, 1, null, dataPowerAlias['YCWS'].tip));

//------------------------------------------------------------------------------
// Power Framework: Laser Sword
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(10);

var pow = 0;

dataPowerAlias['Download'] = new PowerAlias('Download', 'Download', 'Download', 'Applies Download to you, reducing the cost of all Technology powers by 20% for 8 seconds.');
dataPowerAlias['Plasma Burn'] = new PowerAlias('Plasma Burn', 'Plasma Burn', 'Plasma Burn', '+ Plasma Burn is a type of Radiation that deals Particle damage every second for 16 seconds.');
dataPowerAlias['Burn Bright'] = new PowerAlias('Burn Bright', 'Burn Bright', 'Burn Bright', 'Adds 10 seconds to the duration of your Plasma Burn stacks.  This cannot increase their duration above the initial value.');
dataPowerAlias['Radiate'] = new PowerAlias('Radiate', 'Radiate', 'Radiate', '+ Has a 25% chance to apply a stack of Plasma Burn to the target every 2 seconds for 10 seconds.' + dataPowerAlias['Plasma Burn'].tip);

dataPower[dataPower.length] = new Power(dataPower.length, 'Laser Edge', '<div class="Sprite LaserSword_LaserEdge"></div>&nbsp;Laser Edge', 2, 10, pow++, -1, 'Laser Sword, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Laser Edge uses your laser sword to rapidly slice apart your enemies.  The first hit has a chance to apply Plasma Burn.' + dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'It Burns', 'It Burns', 2, null, 'All Laser Edge attacks now have a chance to apply Plasma Burn instead of just the opening attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lightspeed Strike', '<div class="Sprite LaserSword_LightspeedStrike"></div>&nbsp;Lightspeed Strike', 2, 10, pow++, 0, 'Power Armor, 10 foot Frontal Arc Damage (Combo)<br /><br />Deals Particle damage to foes within a 120/120/30 degree arc with a 15/15/50% chance to apply Plasma Burn.<br />' + dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Particle Acceleration', 'Particle Acceleration', 2, null, '+ Finishing the Lightspeed Strike combo applies Disintegrate.<br />+Disintegrate increases the Particle and Energy damage affected foes take for a short while.<br />+ Disintegrate is a type of Radiation'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Legacy Code', 'Legacy Code', 2, null, 'Finishing the Lightspeed Strike combo Knocks Down your foes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Glance', '<div class="Sprite LaserSword_Glance"></div>&nbsp;Glance', 2, 10, pow++, 1, 'Laser Sword, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Particle damage and briefly Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lightwave Slash', '<div class="Sprite LaserSword_LightwaveSlash"></div>&nbsp;Lightwave Slash', 2, 10, pow++, 1, 'Laser Sword, 10 foot Sphere PBAoE Damage<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals particle damage to all targets within 10 feet of you.  On a full charge, affected targets Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Light Mend', 'Light Mend', 2, null, 'Adds 10 seconds to the duration of your Disintegrate effect.  This cannot increase its duration above the initial value.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Burn Bright'].name, dataPowerAlias['Burn Bright'].desc, 2, null, dataPowerAlias['Burn Bright'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Cybernetic Tether', '<div class="Sprite LaserSword_CyberneticTether"></div>&nbsp;Cybernetic Tether', 2, 10, pow++, 1, 'Laser Sword, Melee Damage - Knock To - Plasma Burn<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals Particle damage and knocks your target to you.  Has a 46-100% (based on charge) chance to apply Plasma Burn to the target.' + dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Burn Bright'].name, dataPowerAlias['Burn Bright'].desc, 2, null, dataPowerAlias['Burn Bright'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['Radiate'].name, dataPowerAlias['Radiate'].desc, 2, null, dataPowerAlias['Radiate'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lightspeed Dash', '<div class="Sprite LaserSword_LightspeedDash"></div>&nbsp;Lightspeed Dash', 2, 10, pow++, 1, 'Laser Sword, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Particle damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 13 seconds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

	dataPower[dataPower.length] = new Power(dataPower.length, 'Quantum Stabilizer', '<div class="Sprite LaserSword_QuantumStabilizer"></div>&nbsp;Quantum Stabilizer', 2, 10, pow++, 1, 'Laser Sword, Offensive Passive<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Energy Damage strength, scaling with your Super Stats.<br />+ Increases your resistance to All damage by a small amount and your resistance to Particle damage by a larger amount, scaling with your Super Stats.<br />+ You gain energy over 3 seconds when you take Energy damage, scaling with your Recovery.<br />+ Increases your Knock resistance slightly, scaling with Super Stats.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Particle Accelerator', '<div class="Sprite LaserSword_ParticleAccelerator"></div>&nbsp;Particle Accelerator', 2, 10, pow++, 1, 'Laser Sword, Form (Intelligence)<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Radiation effect.<br />+ Radiation effects include Plasma Burn, Disintegrate, Burn Through, and Overheat.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 10, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'technology';

dataPower[dataPower.length] = new Power(dataPower.length, 'Laser Deflection', '<div class="Sprite LaserSword_LaserDeflection"></div>&nbsp;Laser Deflection', 2, 10, pow++, 1, 'Laser Sword, Block<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ For 2 seconds after you begin blocking, you return a portion of one incoming attack to the attacker.  This effect can only activate once every 5 seconds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Data Conversion', 'Data Conversion', 3, null, '+ When you use a melee attack, you gain Data Conversion for 2 seconds.<br />+ Data Conversion gives you 33% resistance to all damage, 33% resistance to Knock effects, and reduces your damage by 10%.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Unified Theory', '<div class="Sprite LaserSword_UnifiedTheory"></div>&nbsp;Unified Theory', 2, 10, pow++, 1, 'Laser Sword, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />+ does not need to be slotted in Order to function.<br />+ Generates Energy every 3 seconds for 6 seconds whenever you apply a Radiation effect.  This effect does not stack, but can be refreshed.<br />+ Radiation effects include Plasma Burn, Burn Through, overheat, and Disintegrate.<br />+ scales with you Endurance and, to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Plasma Cutter', '<div class="Sprite LaserSword_PlasmaCutter"></div>&nbsp;Plasma Cutter', 2, 10, pow++, 2, 'Laser Sword, 10 foot Melee Single Target Damage<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to the target and consumes all of their Plasma Burn stacks.  After 6 seconds, applies Overheat which deals Particle Damage in a 10 foot radius.  Overheat\\\'s damage is increased by the number of stacks consumed.  during this time, you cannot apply stacks of Plasma Burn.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Encryption', 'Encryption', 2, null, 'Fully charging this power Roots the target for 13 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Particle Smash', '<div class="Sprite LaserSword_ParticleSmash"></div>&nbsp;Particle Smash', 2, 10, pow++, 2, 'Laser Sword, 25 foot Melee 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to the target and nearby foes.  Targets affected by Plasma Burn are affected by Disintegrate, reducing their resistance to Particle damage by -12% and resistance to Energy damage by -6%, Lasting 16 seconds.<br /><br />Consumes all stacks of Plasma Burn, dealing additional Particle damage for every stack consumed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Null Value', 'Null value', 2, null, 'Particle Smash now Stuns your main target and Knocks Down secondary targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Particle Wave', '<div class="Sprite LaserSword_ParticleWave"></div>&nbsp;Particle Wave', 2, 10, pow++, 2, 'Laser Sword, 50 foot Ranged 60 degree Cone AoE Knock To - Plasma Burn<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage and knocks all affected targets toward you and applies a stack of Plasma Burn if they aren\\\'t already affected by it.<br />' + dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Illuminate', 'Illuminate', 2, null, dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Bad Footing', 'Bad Footing', 2, null, 'Disorients your targets.  Disoriented targets have reduced damage and movement speed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Luminescent Slash', '<div class="Sprite LaserSword_LuminescentSlash"></div>&nbsp;Luminescent Slash', 2, 10, pow++, 3, 'Laser Sword, Melee Single Target Damage<br /><br />Requires 5 powers from Laser Sword or 6 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to your target.  On a full charge, your target is Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'End of the Line', 'End of the Line', 2, null, '+ If your energy is above 90%, Luminescent Slash deals 35% additional damage.<br />+ If your energy is above 70%, Luminescent Slash deals 30% additional damage.<br />+ These bonuses do not stack with each other.<br />+ Fully charging this power refreshes your Download effect.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Radiate'].name, dataPowerAlias['Radiate'].desc, 2, null, dataPowerAlias['Radiate'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Implosion Engine'].name, dataPowerAlias['Implosion Engine'].desc, 2, 10, pow++, 4, dataPowerAlias['Implosion Engine'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Inverse Polarization Field'].name, dataPowerAlias['Inverse Polarization Field'].desc, 2, null, dataPowerAlias['Inverse Polarization Field'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mechanical Monstrosity'].name, dataPowerAlias['Mechanical Monstrosity'].desc, 2, 10, pow++, 4, dataPowerAlias['Mechanical Monstrosity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fire All Weapons'].name, dataPowerAlias['Fire All Weapons'].desc, 2, 10, pow++, 4, dataPowerAlias['Fire All Weapons'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Meltdown'].name, dataPowerAlias['Meltdown'].desc, 2, 10, pow++, 4, dataPowerAlias['Meltdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Showdown'].name, dataPowerAlias['Showdown'].desc, 2, 10, pow++, 4, dataPowerAlias['Showdown'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['YCWS'].name, dataPowerAlias['YCWS'].desc, 1, null, dataPowerAlias['YCWS'].tip));

//------------------------------------------------------------------------------
// Power Set: Martial Arts
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'] = [];

dataPowerAlias['Fury of the Dragon'] = new PowerAlias('Fury of the Dragon', 'Fury of the Dragon', '<div class="Sprite MartialArts_FuryOfTheDragon"></div>&nbsp;Fury of the Dragon', 'Martial Arts, 25 foot Melee 60 degree Cone AoE Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Fury of the Dragon causes a chaotic attack of claws and fire, dealing damage to nearby foes.<br /><br />MAINTAINED<br />+ Deals Slashing and Fire damage to targets in front of you.<br />+ The damage dealt by this power is considered melee damage for effects such as the Brawler Role. Note that the damage is not modified by Strength, however.<br />+ If you are affected by Focus, this attack also Snares your foes.<br />+ Deals additional damage for each stack of Focus you have.<br />+ You are immune to Control effects while channeling this power.');
dataPowerAlias['Vorpal Blade'] = new PowerAlias('Vorpal Blade', 'Vorpal Blade', '<div class="Sprite MartialArts_VorpalBlade"></div>&nbsp;Vorpal Blade', 'Martial Arts, 25 foot Melee 60 degree Cone AoE Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />+ AoE Slashing damage.<br />+ Hits multiple times, each strike inflicting Bleed on foes over time.<br />+ Damage is increased by the number of Focus stacks you have.');
dataPowerAlias['Real Ultimate Power'] = new PowerAlias('Real Ultimate Power', 'Real Ultimate Power', 'Real Ultimate Power', 'The purpose of this advantage is to flip out and make people Bleed. Your Fury of the Dragon has multiple chances to cause a Bleed effect on the target.');
dataPowerAlias['Shuriken Throw'] = new PowerAlias('Shuriken Throw', 'Shuriken Throw', '<div class="Sprite MartialArts_ShurikenThrow"></div>&nbsp;Shuriken Throw', 'Martial Arts, 100 foot Ranged Single Target Damage and Knock Down<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Shuriken Throw allows you to throw shuriken with deadly precision.');
dataPowerAlias['Chained Kunai'] = new PowerAlias('Chained Kunai', 'Chained Kunai', '<div class="Sprite MartialArts_ChainedKunai"></div>&nbsp;Chained Kunai', '+ Single target Slashing damage.<br />+ Knocks the target toward you.<br />+ Has a 28%-100% (based on charge) chance to apply Bleed to your target.');
dataPowerAlias['Inexorable Tides'] = new PowerAlias('Inexorable Tides', 'Inexorable Tides', '<div class="Sprite MartialArts_InexorableTides"></div>&nbsp;Inexorable Tides', 'Martial Arts, 10 foot Melee 120 degree Cone AoE Damage and Knock Up<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />A powerful kick at the legs of your opponents, Knocking them into the air.');
dataPowerAlias['Instep Crush'] = new PowerAlias('Instep Crush', 'Instep Crush', 'Instep Crush', 'Adds a Root to the primary target of your Inexorable Tides strikes.');
dataPowerAlias['Smoke Bomb'] = new PowerAlias('Smoke Bomb', 'Smoke Bomb', '<div class="Sprite MartialArts_SmokeBomb"></div>&nbsp;Smoke Bomb', 'Martial Arts, 150 foot Sphere PBAoE Threat Wipe and temporary Stealth<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Smoke Bomb drops a cloud of obscuring smoke at your feet allowing you to execute a strategic retreat when necessary.');
dataPowerAlias['Concussive Escape'] = new PowerAlias('Concussive Escape', 'Concussive Escape', 'Concussive Escape', 'Smoke Bomb Knocks Down affected targets within 15 feet of where the Smoke Bomb lands.');
dataPowerAlias['Lightning Reflexes'] = new PowerAlias('Lightning Reflexes', 'Lightning Reflexes', '<div class="Sprite MartialArts_LightningReflexes"></div>&nbsp;Lightning Reflexes', 'Martial Arts, Defensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increaes your Dodge and Avoidance.<br />+ When hit, your Dodge increases slightly each time until you dodge, resetting the bonus.<br />+ Greatly increaes your resistance to damage over time effects.');
dataPowerAlias['Way of the Warrior'] = new PowerAlias('Way of the Warrior', 'Way of the Warrior', '<div class="Sprite MartialArts_WayOfTheWarrior"></div>&nbsp;Way of the Warrior', 'Martial Arts, Offensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your melee and Bleed damage, plus your other damage by a lesser amount.<br />+ Increases Dodge and Avoidance ratings.<br />+ Recovers Energy when you dodge an attack.');
dataPowerAlias['Intensity'] = new PowerAlias('Intensity', 'Intensity', '<div class="Sprite MartialArts_Intensity"></div>&nbsp;Intensity', 'Martial Arts, Active Offense<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You focus all of your attention on the upcoming battle, harnessing your inner strength to bolster your abilities.');
dataPowerAlias['Night Warrior'] = new PowerAlias('Night Warrior', 'Night Warrior', '<div class="Sprite MartialArts_Sneak"></div>&nbsp;Night Warrior', 'Martial Arts, Slotted Offensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your damage from all sources.<br />+ Bypasses a portion of enemy damage resistance.<br />+ Increases power Charge Speed, Dodge, and Avoidance.<br />+ Unlocks the Sneak power which allows you to move around in stealth.  Some powers deal additional damage when used from Stealth.');
dataPowerAlias['Silent Running'] = new PowerAlias('Silent Running', 'Silent Running', 'Silent Running', 'Increases your movement speed while sneaking.');
dataPowerAlias['Parry'] = new PowerAlias('Parry', 'Parry', '<div class="Sprite MartialArts_Parry"></div>&nbsp;Parry', 'Martial Arts, Block<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ For 2 seconds after blocking, you will return a portion of one incoming attack back to the attacker.  This effect can only be activated once every 5 seconds.');
dataPowerAlias['The Elusive Monk'] = new PowerAlias('The Elusive Monk', 'The Elusive Monk', 'The Elusive Monk', 'If you have the Parry power slotted, this advantage will cause it to activate when you make a Melee attack, increasing your Dodge Rating, Avoidance Rating, and Knock Resistance for a few seconds, but slightly lowering the attack\\\'s damage.');
dataPowerAlias['Fluidity'] = new PowerAlias('Fluidity', 'Fluidity', '<div class="Sprite MartialArts_Fluidity"></div>&nbsp;Fluidity', 'Martial Arts, Block<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Grants 20% Dodge and +300 Avoidance while blocking, your resistance to Knocks and Stuns is increased, and your movement speed is decreased.');
dataPowerAlias['Flowing Like the River'] = new PowerAlias('Flowing Like the River', 'Flowing Like the River', 'Flowing Like the River', 'If you maintain Fluidity for at least 2 seconds, its bonuses will decay over 10 seconds after you stop maintaining it.');
dataPowerAlias['Thunderbolt Lunge'] = new PowerAlias('Thunderbolt Lunge', 'Thunderbolt Lunge', '<div class="Sprite MartialArts_ThunderboltLunge"></div>&nbsp;Thunderbolt Lunge', 'Martial Arts, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Thunderbolt Lunge allows you to quickly close distance with your target.');
dataPowerAlias['Essence Assault'] = new PowerAlias('Essence Assault', 'Essence Assault', 'Essence Assault', 'Thunderbolt Lunge will also Stun your target for a few seconds if you lunge more than 20 feet and they aren\\\'t already controlled.');
dataPowerAlias['Smoke Bomb Lunge'] = new PowerAlias('Smoke Bomb Lunge', 'Smoke Bomb Lunge', '<div class="Sprite MartialArts_SmokeBomb"></div>&nbsp;Smoke Bomb Lunge', 'Martial Arts, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Put down a burst of smoke, disappearing for a moment and reappearing on top of your enemy.');
dataPowerAlias['Strike Down'] = new PowerAlias('Strike Down', 'Strike Down', '<div class="Sprite DualBlades_StrikeDown"></div>&nbsp;Strike Down', 'Martial Arts, 60 foot Lunge, Snare, and Knock Down<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Lunge to your target.<br />+ Single target Slashing damage.<br />+ Snares the target.  Snared targets have their movement speed reduced.<br />+ Knocks down your target if you lunge from more than 20 feet and your target isn\\\'t currently controlled.');
dataPowerAlias['Cut Down'] = new PowerAlias('Cut Down', 'Cut Down', '<div class="Sprite SingleBlade_CutDown"></div>&nbsp;Cut Down', 'Martial Arts, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Lunge to your target.<br />+ Single target Slashing damage.<br />+ Snares the target.  Snared targets have their movement speed reduced.<br />+ Knocks down your target if you lunge from more than 20 feet and your target isn\\\'t currently controlled.');
dataPowerAlias['Sudden Strike'] = new PowerAlias('Sudden Strike', 'Sudden Strike', 'Sudden Strike', 'If you lunge from more than 50 feet away your next single target Melee Critical has 15% more severity.');
dataPowerAlias['Rising Knee'] = new PowerAlias('Rising Knee', 'Rising Knee', '<div class="Sprite MartialArts_RisingKnee"></div>&nbsp;Rising Knee', 'Martial Arts, 10 foot Melee Single Target Damage and Knock Down<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />You quickly bring your knee up, slamming your target hard.');
dataPowerAlias['Flowing Strikes'] = new PowerAlias('Flowing Strikes', 'Flowing Strikes', 'Flowing Strikes', 'Your mastery of unarmed combat allows you to make more effective blows as part of a combo, reducing the target\\\'s Damage Resistance to your next 2 non-energy building Melee Crushing attacks.');
dataPowerAlias['Bountiful Chi Resurgence'] = new PowerAlias('Bountiful Chi Resurgence', 'Bountiful Chi Resurgence', '<div class="Sprite MartialArts_BountifulChiResurgence"></div>&nbsp;Bountiful Chi Resurgence', 'Martial Arts, Self HoT and Debuff<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />Bountiful Chi Resurgence focuses your Chi into healing energy to help you recover from battle.');
dataPowerAlias['Resurgent Reiki'] = new PowerAlias('Resurgent Reiki', 'Resurgent Reiki', 'Resurgent Reiki', 'You gain additional ticks of healing whenever you Dodge an attack while Bountiful Chi Resurgence is active. This effect can only occur once every 0.5 seconds.');
// deprecated
// dataPowerAlias['Sneak'] = new PowerAlias('Sneak', 'Sneak', '<div class="Sprite MartialArts_Sneak"></div>&nbsp;Sneak', 'Martial Arts, self stealth<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />When you need to go unnoticed, Sneaking can get you to otherwise inaccessible spots.');
// dataPowerAlias['Silent Running'] = new PowerAlias('Silent Running', 'Silent Running', 'Silent Running', 'Increases your movement speed while sneaking.');
dataPowerAlias['Masterful Dodge'] = new PowerAlias('Masterful Dodge', 'Masterful Dodge', '<div class="Sprite MartialArts_MasterfulDodge"></div>&nbsp;Masterful Dodge', 'Martial Arts, Active Defense<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />In moments of need you are able to focus your attention on avoiding the attacks of your foes.');
dataPowerAlias['Unfettered Strikes'] = new PowerAlias('Unfettered Strikes', 'Unfettered Strikes', 'Unfettered Strikes', 'Each time you Dodge an attack while Masterful Dodge is active, you gain an Opportunity Strike Buff, increasing your damage for a short time.');
dataPowerAlias['Shuriken Storm'] = new PowerAlias('Shuriken Storm', 'Shuriken Storm', '<div class="Sprite MartialArts_ShurikenStorm"></div>&nbsp;Shuriken Storm', 'Martial Arts, 30 foot Sphere PBAoE Ranged Damage<br /><br />Requires 5 powers from Martial Arts or 6 non-Energy Building powers from any framework.<br /><br />You unleash a hail of shuriken all around you, attempting to hit as many targets as you can.');
dataPowerAlias['Floating Butterfly'] = new PowerAlias('Floating Butterfly', 'Floating Butterfly', 'Floating Butterfly', 'Your rapid movements while maintaining this power make you difficult to land a blow on, granting you a bonus to Dodge and Avoidance.');
dataPowerAlias['Strong Arm'] = new PowerAlias('Strong Arm', 'Strong Arm', 'Strong Arm', 'Causes this power to gain bonus damage from your Strength, instead of your Ego.');
dataPowerAlias['Steadfast'] = new PowerAlias('Steadfast', 'Steadfast', '<div class="Sprite MartialArts_Steadfast"></div>&nbsp;Steadfast', 'Martial Arts, Energy Unlock (Dexterity, Recovery)<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you land a critical hit with a non-energy-building Martial Arts power.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Dexterity, and to a lesser degree, your Recovery.');
dataPowerAlias['Relentless'] = new PowerAlias('Relentless', 'Relentless', '<div class="Sprite MartialArts_Relentless"></div>&nbsp;Relentless', 'Martial Arts, Energy Unlock (Recovery, Endurance)<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you land a critical hit against a target you have Wounded.<br />+ Some Wound effects are Bleed, Shredded, Open Wound, and Deep Wound.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.');

//------------------------------------------------------------------------------
// Power Framework: Dual Blades
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(11);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Rain of Steel', '<div class="Sprite DualBlades_RainOfSteel"></div>&nbsp;Rain of Steel', 3, 11, pow++, -1, 'Dual Blades, Energy Builder, 10 foot Melee 120 degree AoE Damage<br /><br />Rain of Steel launches a series of quick strikes upon your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Grinning Ghost', 'Grinning Ghost', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Blade Tempest', '<div class="Sprite DualBlades_BladeTempest"></div>&nbsp;Blade Tempest', 3, 11, pow++, 0, 'Dual Blades, 10 foot Melee 120 degree Cone AoE Damage (Combo)<br /><br />Blade Tempest is a deadly combination of whirling two blade attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Crashing Crescendo', 'Crashing Crescendo', 2, null, 'Each hit with Blade Tempest adds a stacking Buff which increases your chance to Critically Hit. All stacks of the Buff are removed upon a successful Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Storm\'s Harvest', '<div class="Sprite DualBlades_StormsHarvest"></div>&nbsp;Storm\'s Harvest', 3, 11, pow++, 1, 'Dual Blades, 10 foot Melee Single Target Damage and Root and Disorient<br /><br />Requires 1 power from Dual Blades or 2 non-Energy Building powers from any framework.<br /><br />Storm\\\'s Harvest delivers a powerful two handed blow to your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Red-Eyed Dragon', 'Red-Eyed Dragon', 2, null, 'Storm\\\'s Harvest will always be a Critical Hit, however, after each use you will not be able to Critically Hit with any power for 5 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Throw'].name, dataPowerAlias['Shuriken Throw'].desc, 3, 11, pow++, 1, dataPowerAlias['Shuriken Throw'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Chained Kunai', 'Chained Kunai', 2, null, '+ Allows you to use a Chained Kunai once every 5 seconds.<br />+ This will knock the target toward you instead of down.<br />+ The cost is increased and the range is reduced to 50 feet.<br />+ prevents your regular Shuriken attacks from knocking your target down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Poison Shuriken', 'Poison Shuriken', 2, null, 'Gives your Shuriken a 10% chance to apply Deadly Poison to the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Serrated Edges', 'Serrated Edges', 2, null, 'Gives your Shuriken a 10% chance to apply Bleed to the target.'));
dataPower[dataPower.length-1].advantageList.push(QuickPower(6, dataPowerAlias['Strong Arm'], 1));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Inexorable Tides'].name, dataPowerAlias['Inexorable Tides'].desc, 3, 11, pow++, 1, dataPowerAlias['Inexorable Tides'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Instep Crush'].name, dataPowerAlias['Instep Crush'].desc, 2, null, dataPowerAlias['Instep Crush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Chained Kunai'].name, dataPowerAlias['Chained Kunai'].desc, 3, 11, pow++, 1, dataPowerAlias['Chained Kunai'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(QuickPower(3, dataPowerAlias['OW']));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fine Cuts', 'Fine Cuts', 2, null, 'Fully charging Chained Kunai refreshes your Shredded debuff.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Weak Points', 'Weak Points', 2, null, 'Fully charging Chained Kunai refreshes the duration of Bleeds on your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb'].name, dataPowerAlias['Smoke Bomb'].desc, 3, 11, pow++, 1, dataPowerAlias['Smoke Bomb'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Concussive Escape'].name, dataPowerAlias['Concussive Escape'].desc, 2, null, dataPowerAlias['Concussive Escape'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Form of the Tempest', '<div class="Sprite DualBlades_FormOfTheTempest"></div>&nbsp;Form of the Tempest', 3, 11, pow++, 1, 'Dual Blades, Form (Dexterity)<br /><br />Requires 1 power from Dual Blades or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you land a critical hit.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Gifts of the Storm', 'Gifts of the Storm', 3, null, 'It is the essential nature of a Master of the Tempest style to project everything that they are and have outwards. Against their enemies, practitioners of this style give gifts of their skill and steel, bringing death and justice. With this technique, the enlightened Tempest learns how to harness their Chi to extend this principle, sharing any healing you receive with your allies.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Lightning Reflexes'].name, dataPowerAlias['Lightning Reflexes'].desc, 3, 11, pow++, 1, dataPowerAlias['Lightning Reflexes'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Way of the Warrior'].name, dataPowerAlias['Way of the Warrior'].desc, 3, 11, pow++, 1, dataPowerAlias['Way of the Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Intensity'].name, dataPowerAlias['Intensity'].desc, 3, 11, pow++, 1, dataPowerAlias['Intensity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Night Warrior'].name, dataPowerAlias['Night Warrior'].desc, 3, 11, pow++, 1, dataPowerAlias['Night Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Parry'].name, dataPowerAlias['Parry'].desc, 3, 11, pow++, 1, dataPowerAlias['Parry'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['The Elusive Monk'].name, dataPowerAlias['The Elusive Monk'].desc, 3, null, dataPowerAlias['The Elusive Monk'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fluidity'].name, dataPowerAlias['Fluidity'].desc, 3, 11, pow++, 1, dataPowerAlias['Fluidity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Like the River'].name, dataPowerAlias['Flowing Like the River'].desc, 3, null, dataPowerAlias['Flowing Like the River'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Thunderbolt Lunge'].name, dataPowerAlias['Thunderbolt Lunge'].desc, 3, 11, pow++, 1, dataPowerAlias['Thunderbolt Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Essence Assault'].name, dataPowerAlias['Essence Assault'].desc, 2, null, dataPowerAlias['Essence Assault'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb Lunge'].name, dataPowerAlias['Smoke Bomb Lunge'].desc, 3, 11, pow++, 1, dataPowerAlias['Smoke Bomb Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Sudden Strike'].name, dataPowerAlias['Sudden Strike'].desc, 2, null, dataPowerAlias['Sudden Strike'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Strike Down'].name, dataPowerAlias['Strike Down'].desc, 3, 11, pow++, 1, dataPowerAlias['Strike Down'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Steadfast'].name, dataPowerAlias['Steadfast'].desc, 3, 11, pow++, 1, dataPowerAlias['Steadfast'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Relentless'].name, dataPowerAlias['Relentless'].desc, 3, 11, pow++, 1, dataPowerAlias['Relentless'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Dragon\'s Wrath', '<div class="Sprite DualBlades_DragonsWrath"></div>&nbsp;Dragon\'s Wrath', 3, 11, pow++, 2, 'Dual Blades, 10 foot Melee Single Target Damage with rush<br /><br />Requires 3 powers from Dual Blades or 4 non-Energy Building powers from any framework.<br /><br />Dragon\\\'s Wrath is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Tiger\'s Courage', 'Tiger\'s Courage', 2, null, 'Dragon\\\'s Wrath has its damage increased by a factor of your current chance to land a Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Rising Knee'].name, dataPowerAlias['Rising Knee'].desc, 3, 11, pow++, 2, dataPowerAlias['Rising Knee'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Strikes'].name, dataPowerAlias['Flowing Strikes'].desc, 2, null, dataPowerAlias['Flowing Strikes'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Eye of the Storm', '<div class="Sprite DualBlades_EyeOfTheStorm"></div>&nbsp;Eye of the Storm', 3, 11, pow++, 2, 'Dual Blades, 10 foot Sphere PBAoE Melee Damage and shield<br /><br />Requires 3 powers from Dual Blades or 4 non-Energy Building powers from any framework.<br /><br />Eye of the Storm uses your weapons to surround you in a whirling shield of cutting blades.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blade Beyond the Veil', 'Blade Beyond the Veil', 2, null, 'Eye of the Storm deals damage to enemies attacking you in Melee range for the duration of the maintain.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Cut To Shreds', 'Cut To Shreds', 2, null, 'has a 10% chance to apply Shredded to targets.<br />+ Is guaranteed to apply Shredded to targets on a full maintain.<br /+ ' + dataPowerAlias['Shredded'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Bountiful Chi Resurgence'].name, dataPowerAlias['Bountiful Chi Resurgence'].desc, 3, 11, pow++, 2, dataPowerAlias['Bountiful Chi Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Resurgent Reiki'].name, dataPowerAlias['Resurgent Reiki'].desc, 2, null, dataPowerAlias['Resurgent Reiki'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

// deprecated
// dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Sneak'].name, dataPowerAlias['Sneak'].desc, 3, 11, pow++, 2, dataPowerAlias['Sneak'].tip);
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
// dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Masterful Dodge'].name, dataPowerAlias['Masterful Dodge'].desc, 3, 11, pow++, 2, dataPowerAlias['Masterful Dodge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unfettered Strikes'].name, dataPowerAlias['Unfettered Strikes'].desc, 2, null, dataPowerAlias['Unfettered Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Sword Cyclone', '<div class="Sprite DualBlades_SwordCyclone"></div>&nbsp;Sword Cyclone', 3, 11, pow++, 3, 'Dual Blades, 10 foot Sphere PBAoE Melee Damage<br /><br />Requires 5 powers from Dual Blades or 6 non-Energy Building powers from any framework.<br /><br />Sword Cyclone is a difficult technique allowing a weapons master to deliver devastation to all around them by spinning rapidly with their weapons extended.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Butcher\'s Blades', 'Butcher\'s Blades', 2, null, 'Sword Cyclone becomes a charge power instead of maintain.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Storm'].name, dataPowerAlias['Shuriken Storm'].desc, 3, 11, pow++, 3, dataPowerAlias['Shuriken Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Floating Butterfly'].name, dataPowerAlias['Floating Butterfly'].desc, 2, null, dataPowerAlias['Floating Butterfly'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fury of the Dragon'].name, dataPowerAlias['Fury of the Dragon'].desc, 3, 11, pow++, 4, dataPowerAlias['Fury of the Dragon'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Real Ultimate Power'].name, dataPowerAlias['Real Ultimate Power'].desc, 2, null, dataPowerAlias['Real Ultimate Power'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Vorpal Blade'].name, dataPowerAlias['Vorpal Blade'].desc, 3, 11, pow++, 4, dataPowerAlias['Vorpal Blade'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));


//------------------------------------------------------------------------------
// Power Framework: Fighting Claws
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(12);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Hawk\'s Talons', '<div class="Sprite FightingClaws_HawksTalons"></div>&nbsp;Hawk\'s Talons', 3, 12, pow++, -1, 'Fighting Claws, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Hawk\\\'s Talons executes a series of rapid claw strikes on your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Peerless Predation', 'Peerless Predation', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Viper\'s Fangs', '<div class="Sprite FightingClaws_VipersFangs"></div>&nbsp;Viper\'s Fangs', 3, 12, pow++, 0, 'Fighting Claws, 10 foot Melee Single Target Damage and Debuff (Combo)<br /><br />Viper\\\'s Fangs is a brutal slashing claw attack with the potential to utilize your Chi energy to inflict a venomous wound on your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Spitting Cobra', 'Spitting Cobra', 2, null, 'Grants each attack with Viper\\\'s Fangs a chance to apply Deadly Poison, which stacks up to 10 times and causes your target to suffer Toxic Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rend and Tear', '<div class="Sprite FightingClaws_RendAndTear"></div>&nbsp;Rend and Tear', 3, 12, pow++, 1, 'Fighting Claws, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 1 power from Fighting Claws or 2 non-Energy Building powers from any framework.<br /><br />Rend and Tear is a violent strike with enough force to send the enemy flying into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Drake\'s Deliverance', 'Drake\'s Deliverance', 2, null, 'Rend and Tear does 30% bonus damage, but does the Damage over Time after the initial hit.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Throw'].name, dataPowerAlias['Shuriken Throw'].desc, 3, 12, pow++, 1, dataPowerAlias['Shuriken Throw'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Chained Kunai', 'Chained Kunai', 2, null, '+ Allows you to use a Chained Kunai once every 5 seconds.<br />+ This will knock the target toward you instead of down.<br />+ The cost is increased and the range is reduced to 50 feet.<br />+ prevents your regular Shuriken attacks from knocking your target down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Poison Shuriken', 'Poison Shuriken', 2, null, 'Gives your Shuriken a 10% chance to apply Deadly Poison to the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Serrated Edges', 'Serrated Edges', 2, null, 'Gives your Shuriken a 10% chance to apply Bleed to the target.'));
dataPower[dataPower.length-1].advantageList.push(QuickPower(6, dataPowerAlias['Strong Arm'], 1));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Inexorable Tides'].name, dataPowerAlias['Inexorable Tides'].desc, 3, 12, pow++, 1, dataPowerAlias['Inexorable Tides'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Instep Crush'].name, dataPowerAlias['Instep Crush'].desc, 2, null, dataPowerAlias['Instep Crush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Chained Kunai'].name, dataPowerAlias['Chained Kunai'].desc, 3, 12, pow++, 1, dataPowerAlias['Chained Kunai'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(QuickPower(3, dataPowerAlias['OW']));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fine Cuts', 'Fine Cuts', 2, null, 'Fully charging Chained Kunai refreshes your Shredded debuff.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Weak Points', 'Weak Points', 2, null, 'Fully charging Chained Kunai refreshes the duration of Bleeds on your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb'].name, dataPowerAlias['Smoke Bomb'].desc, 3, 12, pow++, 1, dataPowerAlias['Smoke Bomb'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Concussive Escape'].name, dataPowerAlias['Concussive Escape'].desc, 2, null, dataPowerAlias['Concussive Escape'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Form of the Tiger', '<div class="Sprite FightingClaws_FormOfTheTiger"></div>&nbsp;Form of the Tiger', 3, 12, pow++, 1, 'Fighting Claws, Form (Dexterity)<br /><br />Requires 1 power from Fighting Claws or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you charge a melee power at least halfway.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%..');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rage of the Beast', 'Rage of the Beast', 2, null, 'A practitioner of the Form of the Tiger may channel the pure rage of a great beast when threatened with imprisonment.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Lightning Reflexes'].name, dataPowerAlias['Lightning Reflexes'].desc, 3, 12, pow++, 1, dataPowerAlias['Lightning Reflexes'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Way of the Warrior'].name, dataPowerAlias['Way of the Warrior'].desc, 3, 12, pow++, 1, dataPowerAlias['Way of the Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Intensity'].name, dataPowerAlias['Intensity'].desc, 3, 12, pow++, 1, dataPowerAlias['Intensity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Night Warrior'].name, dataPowerAlias['Night Warrior'].desc, 3, 12, pow++, 1, dataPowerAlias['Night Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Parry'].name, dataPowerAlias['Parry'].desc, 3, 12, pow++, 1, dataPowerAlias['Parry'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['The Elusive Monk'].name, dataPowerAlias['The Elusive Monk'].desc, 3, null, dataPowerAlias['The Elusive Monk'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fluidity'].name, dataPowerAlias['Fluidity'].desc, 3, 12, pow++, 1, dataPowerAlias['Fluidity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Like the River'].name, dataPowerAlias['Flowing Like the River'].desc, 3, null, dataPowerAlias['Flowing Like the River'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Thunderbolt Lunge'].name, dataPowerAlias['Thunderbolt Lunge'].desc, 3, 12, pow++, 1, dataPowerAlias['Thunderbolt Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Essence Assault'].name, dataPowerAlias['Essence Assault'].desc, 2, null, dataPowerAlias['Essence Assault'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb Lunge'].name, dataPowerAlias['Smoke Bomb Lunge'].desc, 3, 12, pow++, 1, dataPowerAlias['Smoke Bomb Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Sudden Strike'].name, dataPowerAlias['Sudden Strike'].desc, 2, null, dataPowerAlias['Sudden Strike'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Steadfast'].name, dataPowerAlias['Steadfast'].desc, 3, 12, pow++, 1, dataPowerAlias['Steadfast'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Relentless'].name, dataPowerAlias['Relentless'].desc, 3, 12, pow++, 1, dataPowerAlias['Relentless'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Dragon\'s Claws', '<div class="Sprite FightingClaws_DragonsClaws"></div>&nbsp;Dragon\'s Claws', 3, 12, pow++, 2, 'Dragon\\\'s Claws, 10 foot Melee Single Target Damage<br /><br />Requires 3 powers from Fighting Claws or 4 non-Energy Building powers from any framework.<br /><br />Dragon\\\'s Claws is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Vertebreak', 'Vertebreak', 2, null, 'Dragon\\\'s Claws will Knock Down the target 3 times over the 3 seconds following the attack. The Knock Down cannot occur more than once every 60 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Rising Knee'].name, dataPowerAlias['Rising Knee'].desc, 3, 12, pow++, 2, dataPowerAlias['Rising Knee'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Strikes'].name, dataPowerAlias['Flowing Strikes'].desc, 2, null, dataPowerAlias['Flowing Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Bountiful Chi Resurgence'].name, dataPowerAlias['Bountiful Chi Resurgence'].desc, 3, 12, pow++, 2, dataPowerAlias['Bountiful Chi Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Resurgent Reiki'].name, dataPowerAlias['Resurgent Reiki'].desc, 2, null, dataPowerAlias['Resurgent Reiki'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

// deprecated
// dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Sneak'].name, dataPowerAlias['Sneak'].desc, 3, 12, pow++, 2, dataPowerAlias['Sneak'].tip);
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
// dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Masterful Dodge'].name, dataPowerAlias['Masterful Dodge'].desc, 3, 12, pow++, 2, dataPowerAlias['Masterful Dodge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unfettered Strikes'].name, dataPowerAlias['Unfettered Strikes'].desc, 2, null, dataPowerAlias['Unfettered Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Tiger\'s Bite', '<div class="Sprite FightingClaws_TigersBite"></div>&nbsp;Tiger\'s Bite', 3, 12, pow++, 3, 'Fighting Claws, 10 foot Melee Single Target Damage<br /><br />Requires 3 powers from Fighting Claws or 4 non-Energy Building powers from any framework.<br /><br />Tiger\\\'s Bite is a powerful slashing attack capable of taking advantage of openings left by your other claw attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mouth of Madness', 'Mouth of Madness', 2, null, 'Tiger\\\'s Bite has a chance to not consume the Shredded effect on the targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Storm'].name, dataPowerAlias['Shuriken Storm'].desc, 3, 12, pow++, 3, dataPowerAlias['Shuriken Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Floating Butterfly'].name, dataPowerAlias['Floating Butterfly'].desc, 2, null, dataPowerAlias['Floating Butterfly'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fury of the Dragon'].name, dataPowerAlias['Fury of the Dragon'].desc, 3, 12, pow++, 4, dataPowerAlias['Fury of the Dragon'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Real Ultimate Power'].name, dataPowerAlias['Real Ultimate Power'].desc, 2, null, dataPowerAlias['Real Ultimate Power'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Vorpal Blade'].name, dataPowerAlias['Vorpal Blade'].desc, 3, 12, pow++, 4, dataPowerAlias['Vorpal Blade'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Framework: Single Blade
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(13);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Reaper\'s Touch', '<div class="Sprite SingleBlade_ReapersTouch"></div>&nbsp;Reaper\'s Touch', 3, 13, pow++, -1, 'Single Blade, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Reaper\\\'s touch uses your blade to rapidly slice apart your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Three Edged Blade', 'Three Edged Blade', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Reaper\'s Caress', '<div class="Sprite SingleBlade_ReapersCaress"></div>&nbsp;Reaper\'s Caress', 3, 13, pow++, 0, 'Single Blade, Melee AoE Damage (Combo) and Focus-based Bleed<br /><br />Reaper\\\'s Caress is a rapid series of attacks capable of leaving the enemy with multiple bleeding wounds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cleaving Strikes', 'Cleaving Strikes', 2, null, 'Finishing the combo applies Shredded, increasing physical damage taken by a small amount, and Slashing damage taken by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Slash', '<div class="Sprite SingleBlade_Slash"></div>&nbsp;Slash', 3, 13, pow++, 0, 'Single Blade, Melee Single Target Damage (Combo) and Bleed<br /><br />Reaper\\\'s Caress is a rapid series of attacks capable of leaving the enemy with multiple bleeding wounds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Serrated Blade', 'Serrated Blade', 2, null, 'Finishing the combo applies Shredded, increasing physical damage taken by a small amount, and Slashing damage taken by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Swift Slash', '<div class="Sprite SingleBlade_SwiftSlash"></div>&nbsp;Swift Slash', 3, 13, pow++, 1, 'Single Blade, Melee Single Target Damage and Stun<br /><br />Deals Slashing damage to the target and stuns it briefly.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Throw'].name, dataPowerAlias['Shuriken Throw'].desc, 3, 13, pow++, 1, dataPowerAlias['Shuriken Throw'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Chained Kunai', 'Chained Kunai', 2, null, '+ Allows you to use a Chained Kunai once every 5 seconds.<br />+ This will knock the target toward you instead of down.<br />+ The cost is increased and the range is reduced to 50 feet.<br />+ prevents your regular Shuriken attacks from knocking your target down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Poison Shuriken', 'Poison Shuriken', 2, null, 'Gives your Shuriken a 10% chance to apply Deadly Poison to the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Serrated Edges', 'Serrated Edges', 2, null, 'Gives your Shuriken a 10% chance to apply Bleed to the target.'));
dataPower[dataPower.length-1].advantageList.push(QuickPower(6, dataPowerAlias['Strong Arm'], 1));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Scything Blade', '<div class="Sprite SingleBlade_ScythingBlade"></div>&nbsp;Scything Blade', 3, 13, pow++, 1, 'Single Blade, 10 foot Melee 120 degree Cone AoE Damage and Bleed<br /><br />Requires 1 power from Single Blade or 2 non-Energy Building powers from any framework.<br /><br />Deals Slashing damage to targets.  Has a 50-100% chance to apply Bleed to targets not currently Bleeding, based on charge time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Swallowtail Cut', 'Swallowtail Cut', 2, null, '+ Scything Blade now applies Swallowtail Cut instead of a standard Bleed.<br />+ Swallowtail Cut deals damage over time based on the maximum hit points of a target.<br />+ Targets of rank supervillain or higher are instead affected by a standard Bleed if not already affected by one.  This application is 100%, regardless of charge time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Heavy Blade', 'Heavy Blade', 2, null, 'Knocks down targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Inexorable Tides'].name, dataPowerAlias['Inexorable Tides'].desc, 3, 13, pow++, 1, dataPowerAlias['Inexorable Tides'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Instep Crush'].name, dataPowerAlias['Instep Crush'].desc, 2, null, dataPowerAlias['Instep Crush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Chained Kunai'].name, dataPowerAlias['Chained Kunai'].desc, 3, 13, pow++, 1, dataPowerAlias['Chained Kunai'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(QuickPower(3, dataPowerAlias['OW']));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fine Cuts', 'Fine Cuts', 2, null, 'Fully charging Chained Kunai refreshes your Shredded debuff.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Weak Points', 'Weak Points', 2, null, 'Fully charging Chained Kunai refreshes the duration of Bleeds on your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb'].name, dataPowerAlias['Smoke Bomb'].desc, 3, 13, pow++, 1, dataPowerAlias['Smoke Bomb'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Concussive Escape'].name, dataPowerAlias['Concussive Escape'].desc, 2, null, dataPowerAlias['Concussive Escape'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Form of the Swordsman', '<div class="Sprite SingleBlade_FormOfTheSwordsman"></div>&nbsp;Form of the Swordsman', 3, 13, pow++, 1, 'Single Blade, Form (Dexterity)<br /><br />Requires 1 power from Single Blade or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Bleed effect.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cut Where it Counts', 'Cut Where it Counts', 2, null, 'The cuts of a master of the Form of the Swordsman strike the most vital areas of their targets, resulting in wounds that are frighteningly difficult to heal.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Lightning Reflexes'].name, dataPowerAlias['Lightning Reflexes'].desc, 3, 13, pow++, 1, dataPowerAlias['Lightning Reflexes'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Way of the Warrior'].name, dataPowerAlias['Way of the Warrior'].desc, 3, 13, pow++, 1, dataPowerAlias['Way of the Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Intensity'].name, dataPowerAlias['Intensity'].desc, 3, 13, pow++, 1, dataPowerAlias['Intensity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Night Warrior'].name, dataPowerAlias['Night Warrior'].desc, 3, 13, pow++, 1, dataPowerAlias['Night Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Parry'].name, dataPowerAlias['Parry'].desc, 3, 13, pow++, 1, dataPowerAlias['Parry'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['The Elusive Monk'].name, dataPowerAlias['The Elusive Monk'].desc, 3, null, dataPowerAlias['The Elusive Monk'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fluidity'].name, dataPowerAlias['Fluidity'].desc, 3, 13, pow++, 1, dataPowerAlias['Fluidity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Like the River'].name, dataPowerAlias['Flowing Like the River'].desc, 3, null, dataPowerAlias['Flowing Like the River'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Thunderbolt Lunge'].name, dataPowerAlias['Thunderbolt Lunge'].desc, 3, 13, pow++, 1, dataPowerAlias['Thunderbolt Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Essence Assault'].name, dataPowerAlias['Essence Assault'].desc, 2, null, dataPowerAlias['Essence Assault'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Cut Down'].name, dataPowerAlias['Cut Down'].desc, 3, 13, pow++, 1, dataPowerAlias['Cut Down'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb Lunge'].name, dataPowerAlias['Smoke Bomb Lunge'].desc, 3, 13, pow++, 1, dataPowerAlias['Smoke Bomb Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Sudden Strike'].name, dataPowerAlias['Sudden Strike'].desc, 2, null, dataPowerAlias['Sudden Strike'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Steadfast'].name, dataPowerAlias['Steadfast'].desc, 3, 13, pow++, 1, dataPowerAlias['Steadfast'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Relentless'].name, dataPowerAlias['Relentless'].desc, 3, 13, pow++, 1, dataPowerAlias['Relentless'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Dragon\'s Bite', '<div class="Sprite SingleBlade_DragonsBite"></div>&nbsp;Dragon\'s Bite', 3, 13, pow++, 2, 'Single Blade, 10 foot Melee Single Target Damage and Rush<br /><br />Requires 3 powers from Single Blade or 4 non-Energy Building powers from any framework.<br /><br />Dragon\\\'s Bite is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cull the Weak', 'Cull the Weak', 2, null, 'This advantage allows your Dragon\\\'s Bite attack to inflict massive damage on enemies at 25% or lower Health. If your target is another Hero or an enemy of Super Villain or higher rank, your damage will be increased by 30%, and Henchmen and Villains are defeated outright.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Rising Knee'].name, dataPowerAlias['Rising Knee'].desc, 3, 13, pow++, 2, dataPowerAlias['Rising Knee'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Strikes'].name, dataPowerAlias['Flowing Strikes'].desc, 2, null, dataPowerAlias['Flowing Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Bountiful Chi Resurgence'].name, dataPowerAlias['Bountiful Chi Resurgence'].desc, 3, 13, pow++, 2, dataPowerAlias['Bountiful Chi Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Resurgent Reiki'].name, dataPowerAlias['Resurgent Reiki'].desc, 2, null, dataPowerAlias['Resurgent Reiki'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

// deprecated
// dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Sneak'].name, dataPowerAlias['Sneak'].desc, 3, 13, pow++, 2, dataPowerAlias['Sneak'].tip);
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
// dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Masterful Dodge'].name, dataPowerAlias['Masterful Dodge'].desc, 3, 13, pow++, 2, dataPowerAlias['Masterful Dodge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unfettered Strikes'].name, dataPowerAlias['Unfettered Strikes'].desc, 2, null, dataPowerAlias['Unfettered Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Reaper\'s Embrace', '<div class="Sprite SingleBlade_ReapersEmbrace"></div>&nbsp;Reaper\'s Embrace', 3, 13, pow++, 3, 'Single Blade, 10 foot Melee Single Target Damage and Bleed Consume<br /><br />Requires 5 powers from Single Blade or 6 non-Energy Building powers from any framework.<br /><br />Reaper\\\'s Embrace is a powerful slashing attack capable of taking advantage of any bleeding wounds the enemy may have.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'No Mercy', 'No Mercy', 2, null, '5-50% chance (based on charge time) to cause 2 Bleeds to your target.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Storm'].name, dataPowerAlias['Shuriken Storm'].desc, 3, 13, pow++, 3, dataPowerAlias['Shuriken Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Floating Butterfly'].name, dataPowerAlias['Floating Butterfly'].desc, 2, null, dataPowerAlias['Floating Butterfly'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fury of the Dragon'].name, dataPowerAlias['Fury of the Dragon'].desc, 3, 13, pow++, 4, dataPowerAlias['Fury of the Dragon'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Real Ultimate Power'].name, dataPowerAlias['Real Ultimate Power'].desc, 2, null, dataPowerAlias['Real Ultimate Power'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Vorpal Blade'].name, dataPowerAlias['Vorpal Blade'].desc, 3, 13, pow++, 4, dataPowerAlias['Vorpal Blade'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Framework: Unarmed
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(14);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Righteous Fists', '<div class="Sprite Unarmed_RighteousFists"></div>&nbsp;Righteous Fists', 3, 14, pow++, -1, 'Unarmed, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Righteous Fists is a fighting technique to deliver a series of rapid punches to your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Drunken Master', 'Drunken Master', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Vicious Strikes', '<div class="Sprite Unarmed_ViciousStrikes"></div>&nbsp;Vicious Strikes', 3, 14, pow++, -1, 'Unarmed, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Vicious Strikes is a fighting technique to deliver a series of rapid punches to your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Drunken Master', 'Drunken Master', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Thundering Kicks', '<div class="Sprite Unarmed_ThunderingKicks"></div>&nbsp;Thundering Kicks', 3, 14, pow++, 0, 'Unarmed, 10 foot Melee Single Target Damage and Dodge Buff (Combo)<br /><br />Thundering Kicks unleashes a flurry of pounding kicks on your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Floating Lotus Blossom', 'Floating Lotus Blossom', 2, null, 'Each successful hit with Thundering Kicks adds a stacking Dodge Buff to you. All stacks of the Buff are removed upon a successful Dodge.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Crashing Wave Kick', '<div class="Sprite Unarmed_CrashingWaveKick"></div>&nbsp;Crashing Wave Kick', 3, 14, pow++, 1, 'Unarmed, 10 foot Melee Single Target Damage<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Crashing Wave Kick delivers a kick powerful enough to Stun an enemy for a short time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Subtlety of the Tides', 'Subtlety of the Tides', 2, null, 'For 8 seconds after using Crashing Wave Kick, all of your Melee attacks have a 50% chance to grant a stack of Ebb and Flow which is a small Dodge and Avoidance Buff. The amount of Dodge and Avoidance granted is increased slightly as you level.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Throw'].name, dataPowerAlias['Shuriken Throw'].desc, 3, 14, pow++, 1, dataPowerAlias['Shuriken Throw'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Chained Kunai', 'Chained Kunai', 2, null, '+ Allows you to use a Chained Kunai once every 5 seconds.<br />+ This will knock the target toward you instead of down.<br />+ The cost is increased and the range is reduced to 50 feet.<br />+ prevents your regular Shuriken attacks from knocking your target down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Poison Shuriken', 'Poison Shuriken', 2, null, 'Gives your Shuriken a 10% chance to apply Deadly Poison to the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Serrated Edges', 'Serrated Edges', 2, null, 'Gives your Shuriken a 10% chance to apply Bleed to the target.'));
dataPower[dataPower.length-1].advantageList.push(QuickPower(6, dataPowerAlias['Strong Arm'], 1));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'One Hundred Hands', '<div class="Sprite Unarmed_OneHundredHands"></div>&nbsp;One Hundred Hands', 3, 14, pow++, 1, 'Unarmed, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Your fists move with lightning speed, rapidly striking foes in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Ghostly Strikes', 'Ghostly Strikes', 1, null, 'You unleash Chi energy while using this power, causing every other tick of damage this power deals to instead be dealt as Dimensional damage. These Ghostly Strikes do 10% more damage than normal strikes, and penetrate through half of your targets resistance.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Inexorable Tides'].name, dataPowerAlias['Inexorable Tides'].desc, 3, 14, pow++, 1, dataPowerAlias['Inexorable Tides'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Instep Crush'].name, dataPowerAlias['Instep Crush'].desc, 2, null, dataPowerAlias['Instep Crush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Chained Kunai'].name, dataPowerAlias['Chained Kunai'].desc, 3, 14, pow++, 1, dataPowerAlias['Chained Kunai'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(QuickPower(3, dataPowerAlias['OW']));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fine Cuts', 'Fine Cuts', 2, null, 'Fully charging Chained Kunai refreshes your Shredded debuff.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Weak Points', 'Weak Points', 2, null, 'Fully charging Chained Kunai refreshes the duration of Bleeds on your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb'].name, dataPowerAlias['Smoke Bomb'].desc, 3, 14, pow++, 1, dataPowerAlias['Smoke Bomb'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Concussive Escape'].name, dataPowerAlias['Concussive Escape'].desc, 2, null, dataPowerAlias['Concussive Escape'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Form of the Master', '<div class="Sprite Unarmed_FormOfTheMaster"></div>&nbsp;Form of the Master', 3, 14, pow++, 1, 'Unarmed, Form (Dexterity)<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you dodge an attack.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Storm\'s Eye Prana', 'Storm\'s Eye Prana', 3, null, 'A dedicated practitioner of the Form of the Master style gains strength among enemies, and is serene in the eye of the storm.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Lightning Reflexes'].name, dataPowerAlias['Lightning Reflexes'].desc, 3, 14, pow++, 1, dataPowerAlias['Lightning Reflexes'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Way of the Warrior'].name, dataPowerAlias['Way of the Warrior'].desc, 3, 14, pow++, 1, dataPowerAlias['Way of the Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Intensity'].name, dataPowerAlias['Intensity'].desc, 3, 14, pow++, 1, dataPowerAlias['Intensity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Night Warrior'].name, dataPowerAlias['Night Warrior'].desc, 3, 14, pow++, 1, dataPowerAlias['Night Warrior'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Parry'].name, dataPowerAlias['Parry'].desc, 3, 14, pow++, 1, dataPowerAlias['Parry'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['The Elusive Monk'].name, dataPowerAlias['The Elusive Monk'].desc, 3, null, dataPowerAlias['The Elusive Monk'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fluidity'].name, dataPowerAlias['Fluidity'].desc, 3, 14, pow++, 1, dataPowerAlias['Fluidity'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Like the River'].name, dataPowerAlias['Flowing Like the River'].desc, 3, null, dataPowerAlias['Flowing Like the River'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Thunderbolt Lunge'].name, dataPowerAlias['Thunderbolt Lunge'].desc, 3, 14, pow++, 1, dataPowerAlias['Thunderbolt Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Essence Assault'].name, dataPowerAlias['Essence Assault'].desc, 2, null, dataPowerAlias['Essence Assault'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Smoke Bomb Lunge'].name, dataPowerAlias['Smoke Bomb Lunge'].desc, 3, 14, pow++, 1, dataPowerAlias['Smoke Bomb Lunge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Sudden Strike'].name, dataPowerAlias['Sudden Strike'].desc, 2, null, dataPowerAlias['Sudden Strike'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Steadfast'].name, dataPowerAlias['Steadfast'].desc, 3, 14, pow++, 1, dataPowerAlias['Steadfast'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Relentless'].name, dataPowerAlias['Relentless'].desc, 3, 14, pow++, 1, dataPowerAlias['Relentless'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Backhand Chop', '<div class="Sprite Unarmed_BackhandChop"></div>&nbsp;Backhand Chop', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee Single Target Damage and Interrupt<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />You quickly spin, delivering a backhanded strike to your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Stinging Bee', 'Stinging Bee', 2, null, 'Sets you up for additional attacks, granting you a stack of Focus.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Elbow Slam', '<div class="Sprite Unarmed_ElbowSlam"></div>&nbsp;Elbow Slam', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee Single Target Damage and Disorient<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />You leap into the air and perform a downward strike with your elbow, attempting to Disorient your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Falling Hammer', 'Falling Hammer', 2, null, 'You deal an additional 30% damage with this power when your target is Knocked or Stunned.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Rising Knee'].name, dataPowerAlias['Rising Knee'].desc, 3, 14, pow++, 2, dataPowerAlias['Rising Knee'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Flowing Strikes'].name, dataPowerAlias['Flowing Strikes'].desc, 2, null, dataPowerAlias['Flowing Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Dragon Kick', '<div class="Sprite Unarmed_DragonKick"></div>&nbsp;Dragon Kick', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />Dragon Kick is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Lashing Dragon Tail', 'Lashing Dragon Tail', 2, null, 'Dragon Kick increases the amount of damage you are able to Dodge from attacks.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Bountiful Chi Resurgence'].name, dataPowerAlias['Bountiful Chi Resurgence'].desc, 3, 14, pow++, 2, dataPowerAlias['Bountiful Chi Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Resurgent Reiki'].name, dataPowerAlias['Resurgent Reiki'].desc, 2, null, dataPowerAlias['Resurgent Reiki'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

// deprecated
// dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Sneak'].name, dataPowerAlias['Sneak'].desc, 3, 14, pow++, 2, dataPowerAlias['Sneak'].tip);
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Silent Running'].name, dataPowerAlias['Silent Running'].desc, 1, null, dataPowerAlias['Silent Running'].tip));
// dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Masterful Dodge'].name, dataPowerAlias['Masterful Dodge'].desc, 3, 14, pow++, 2, dataPowerAlias['Masterful Dodge'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unfettered Strikes'].name, dataPowerAlias['Unfettered Strikes'].desc, 2, null, dataPowerAlias['Unfettered Strikes'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, 'Burning Chi Fist', '<div class="Sprite Unarmed_BurningChiFist"></div>&nbsp;Burning Chi Fist', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and DoT<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />Burning Chi Fist uses your Chi to increase the force of your blow and can even leave behind focused points of burning energy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Fists of Righteous Flame', 'Fists of Righteous Flame', 2, null, 'If fully charged, Burning Chi Fist grants a short duration Buff with each use which grants a chance to add Dimensional damage to each Melee attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Dragon Uppercut', '<div class="Sprite Unarmed_DragonUppercut"></div>&nbsp;Dragon Uppercut', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />You leap upward with great force, and land an uppercut attack on your foe, knocking them up into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Chi Flame', 'Chi Flame', 2, null, 'Causes your Dragon Uppercut to burn your target with Chi energy, dealing an additional 10% damage as Dimensional damage. Fully charging your Dragon Uppercut will cause the target to suffer additional Dimensional Damage over Time for 3 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Open Palm Strike', '<div class="Sprite Unarmed_OpenPalmStrike"></div>&nbsp;Open Palm Strike', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />You perform a focused double palm strike that can send your enemy flying.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Focused Chi Blast', 'Focused Chi Blast', 2, null, 'Causes your Open Plan Strike to unleash a powerful blast of Chi energy in a line in front of you. This advantage causes your attack to now deal half damage as Physical damage to your primary target, and the other half as Dimensional damage to all affected targets in a 25 foot line in front of you, including the primary target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Shuriken Storm'].name, dataPowerAlias['Shuriken Storm'].desc, 3, 14, pow++, 3, dataPowerAlias['Shuriken Storm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Floating Butterfly'].name, dataPowerAlias['Floating Butterfly'].desc, 2, null, dataPowerAlias['Floating Butterfly'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Fury of the Dragon'].name, dataPowerAlias['Fury of the Dragon'].desc, 3, 14, pow++, 4, dataPowerAlias['Fury of the Dragon'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Real Ultimate Power'].name, dataPowerAlias['Real Ultimate Power'].desc, 2, null, dataPowerAlias['Real Ultimate Power'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Vorpal Blade'].name, dataPowerAlias['Vorpal Blade'].desc, 3, 14, pow++, 4, dataPowerAlias['Vorpal Blade'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Set: Mentalist
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'] = [];

dataPowerAlias['Mind Link'] = new PowerAlias('Mind Link', 'Mind Link', '<div class="Sprite Mentalist_MindLink"></div>&nbsp;Mind Link', 'Mentalist, 50 foot Sphere PBAoE Triggered Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />This telepathic link allows you to share pain amongst the enemies around you by forging a psychic bond that forces them to feel the pain of others.<br /><br />MAINTAIN<br />+ A portion of any damage dealt to you or nearby foes while you maintain this power is immediately dealt as Ego damage to all targets in range, up to a maximum of your Ego x 4.<br />+ Damage from this effect causes very little threat.<br />- This effect only occurs once every half second.<br />Increasing the rank of this power increases the maximum damage dealt.<br />+ At Rank 2, this power deals a maximum of Ego x 5 damage.<br />+ At Rank 3, this power deals a maximum of Ego x 6 damage.');
dataPowerAlias['Aggression Inhibitor'] = new PowerAlias('Aggression Inhibitor', 'Aggression Inhibitor', 'Aggression Inhibitor', 'All damage you take while maintaining this power is reduced by 20%.');
// TODO: get correct description
// TODO: does not count towards unlocking in-framework power tiers
dataPowerAlias['Manipulator'] = new PowerAlias('Manipulator', 'Manipulator', '<div class="Sprite Mentalist_Manipulation"></div>&nbsp;Manipulator', 'Mentalist, Form (Intelligence or Presence)<br /><br />Requires 1 power from Mentalist or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases the magnitude of Stuns, Incapacitates, Paralyzes, Roots, Sleeps, and Confuses.  It also increases your ranged and melee damage by a lesser amount.<br /><br />+ You gain a stack each time you Stun, Incapacitate, Paralyze, Root, Sleep, or Confuse a target.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPowerAlias['Mental Impact'] = new PowerAlias('Mental Impact', 'Mental Impact', '<div class="Sprite Mentalist_MentalImpact"></div>&nbsp;Mental Impact', 'Mentalist, 100 foot 20 foot Sphere AoE Damage - Damage Resistance Debuff - Knockdown<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Deals Ego damage to foes.  Any foe damaged by this attack is Knocked Down and suffers 20% reduced damage resistance against all damage types for 12 seconds.  Gives you a atack of Ego Leech for every foe hit.  This power must be fully charged.' + PowerUnlocksFrom('Cybernetic Lockbox'));
dataPowerAlias['LaM'] = new PowerAlias('LaM', 'Leave a Mark', 'Leave a Mark', '+ Applies a large threat over time effect to your target.<br />+ This effect stacks with the Challenge! effect.');

//------------------------------------------------------------------------------
// Power Framework: Telekinesis
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'].push(15);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Kinetic Darts', '<div class="Sprite Telekinesis_KineticDarts"></div>&nbsp;Kinetic Darts', 4, 15, pow++, -1, 'Telekinesis, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Use your mind to launch Kinetic Darts at your enemies, gathering energy as you focus your will in this basic attack mode.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Leeching Strikes', 'Leeching Strikes', 2, null, 'All attacks of this combo gain a 15% chance to grant you a stack of Ego Leech, instead of just the initial attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Incisive Wit', 'Incisive Wit', 2, null, '+ Gives this power a 15% chance to activate an Id Surge.<br />+ Cannot occur more than once every 20 seconds.<br />+ Increases all Paranormal (Dimensional, Ego, Magic) damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blade', '<div class="Sprite Telekinesis_EgoBlade"></div>&nbsp;Ego Blade', 4, 15, pow++, -1, 'Telekinesis, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Creates a weapon from your force of will, enabling you to assault your enemies at close range.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Leeching Strikes', 'Leeching Strikes', 2, null, 'All attacks of this combo gain a 15% chance to grant you a stack of Ego Leech, instead of just the initial attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Incisive Wit', 'Incisive Wit', 2, null, '+ Gives this power a 15% chance to activate an Id Surge.<br />+ Cannot occur more than once every 20 seconds.<br />+ Increases all Paranormal (Dimensional, Ego, Magic) damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Weaponry', '<div class="Sprite Telekinesis_EgoWeaponary"></div>&nbsp;Ego Weaponry', 4, 15, pow++, 0, 'Telekinesis, 10 foot Melee Single Target Damage (Combo)<br /><br />Make a weapon from your force of will. This Ego Weaponry will be used in Melee, driving the strength of your mind against the physical form of your opponent.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Thought Sever', 'Thought Sever', 1, null, 'Ego Weaponry will reduce the Energy of the target with each hit in addition to dealing damage normally. Also causes your Ego Weaponry to deal an additional 20% damage to targets with less than 50% Energy.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Siphoning Strikes', 'Siphoning Strikes', 3, null, 'Your Ego Weaponry attacks no longer deal additional damage when you perform a critical strike with them. Instead, you heal yourself for the amount of additional damage you would have done when performing a critical strike.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Assault', '<div class="Sprite Telekinesis_TelekineticAssault"></div>&nbsp;Telekinetic Assault', 4, 15, pow++, 0, 'Telekinesis, 100 foot Ranged Single Target Damage<br /><br />You unleash a sustained assault of telekinetic blasts upon your foe.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Explosive Potential', 'Explosive Potential', 2, null, 'Your Telekinetic Assault now does a burst of AoE damage around your primary target, hitting other nearby does within 10 feet.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinesis', '<div class="Sprite Telekinesis_Telekinesis"></div>&nbsp;Telekinesis', 4, 15, pow++, 1, 'Telekinesis, 100 foot Ranged Single Target Pick Up and Throw Damage<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Through sheer willpower you are able to lift and throw physical objects.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blade Frenzy', '<div class="Sprite Telekinesis_EgoBladeFrenzy"></div>&nbsp;Ego Blade Frenzy', 4, 15, pow++, 1, 'Telekinesis, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Using a blade of telekinetic energy you are able to use a swirling attack to fight multiple enemies at once.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Unnerving Rage', 'Unnerving Rage', 2, null, 'Causes Ego Blade Frenzy to Root its target for the duration of the attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Burst', '<div class="Sprite Telekinesis_TelekineticBurst"></div>&nbsp;Telekinetic Burst', 4, 15, pow++, 1, 'Telekinesis, 100 foot Ranged 15 foot Sphere AoE Damage and Disorient<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />You create a telekinetic explosion with your mind, causing an eruption of telekinetic energy near your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sudden Impact', 'Sudden Impact', 2, null, 'Your Telekinetic Burst hits with such strength that affected targets are Knocked Down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Form', '<div class="Sprite Telekinesis_EgoForm"></div>&nbsp;Ego Form', 4, 15, pow++, 1, 'Telekinesis, Offensive Passive - Energy Form<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Paranormal damage.<br />+ Increases your Physical damage by a lesser amount.<Br />+ Increases your Ego damage resistance.<br />+ Increases your resistance to all damage by a lesser amount.<br />+ Grants a small power cost discount to Mentalist powers.<br />+ Recovers Energy when you take Ego damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Id Blades', 'Id Blades', 0, null, 'While this power is active, your Ego Blade powers manifest Dual Id Blades instead of a single Ego Blade.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Id Mastery', '<div class="Sprite Telekinesis_IdMastery"></div>&nbsp;Id Mastery', 4, 15, pow++, 1, 'Telekinesis, Offensive Passive<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />+ Can be slotted in an Offensive or Balanced passive power slot.<br />+ Increases all of your Paranormal Melee damage (Dimensional, Ego, Magic), and increases all other Paranormal damage to a lesser degree. These increases scale with your Super Stats.<br />+ Provides a small amount of damage resistance. This effect scales with your Super Stats.<br />+ Provides a cost reduction for all Mentalist (Telekinesis, Telepathy) powers. This effect scales with your Recovery.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Id Blades', 'Id Blades', 0, null, 'While this power is active, your Ego Blade powers manifest Dual Id Blades instead of a single Ego Blade.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Manipulator'].name, dataPowerAlias['Manipulator'].desc, 2, 15, pow++, 1, dataPowerAlias['Manipulator'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Shield', '<div class="Sprite Telekinesis_TelekineticShield"></div>&nbsp;Telekinetic Shield', 4, 15, pow++, 1, 'Telekinesis, Block<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 300% resistance to all Physical damage and 250% resistance to all Non-Physical damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Telekinetic Reinforcement', 'Telekinetic Reinforcement', 1, null, 'Telekinetic Shield will continue to provide a defensive benefit against all damage for a short time after blocking.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blade Dash', '<div class="Sprite Telekinesis_EgoBladeDash"></div>&nbsp;Ego Blade Dash', 4, 15, pow++, 1, 'Telekinesis, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />You use your telekinetic energy do dash forward and slash at your foe.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Head Shot', 'Head Shot', 2, null, 'Ego Blade Dash will also Disorient your target if you lunge more than 20 feet.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Reverberation', '<div class="Sprite Telekinesis_EgoReverberation"></div>&nbsp;Ego Reverberation', 4, 15, pow++, 1, 'Telekinesis, Energy Unlock (Ego, Recovery)<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Geenrates energy every time you apply a stack of Ego Leech.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Ego, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Eruption', '<div class="Sprite Telekinesis_TelekineticEruption"></div>&nbsp;Telekinetic Eruption', 4, 15, pow++, 2, 'Telekinesis, 25 foot Sphere PBAoE Ranged Damage<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />You gather your will and then release it in a massive blast. This blast deals a large amount of damage, and has a chance of Knocking Back your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Enhanced Form', 'Enhanced Form', 2, null, 'The Ego Form resulting from charging Telekinetic Eruption lasts longer than usual.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Wave', '<div class="Sprite Telekinesis_TelekineticWave"></div>&nbsp;Telekinetic Wave', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged 60 degree Cone AoE Damage<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Telekinetic Wave unleashes a blast of energy to fling your enemies away from you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Psychic Tides', 'Psychic Tides', 2, null, 'Telekinetic Wave will decrease the Energy Equilibrium of targets to 1 for 16 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Choke', '<div class="Sprite Telekinesis_EgoChoke"></div>&nbsp;Ego Choke', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged Single Target Damage and Incapacitate<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Having learned your lessons well, you may use your telekinetic powers to choke a single foe.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Garroting Grip', 'Garroting Grip', 2, null, 'Choke Hold reduces the offensive capabilities of your target for a short duration.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Hold', '<div class="Sprite Telekinesis_EgoHold"></div>&nbsp;Ego Hold', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged Single Target Hold<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />You wrap the villain in strands of mental energy. This Ego Hold will keep your target in place, though they may try to break free.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mass Effect', 'Mass Effect', 2, null, 'Mass Effect causes the target of your Ego Hold and enemies near your Ego Hold target to become Snared, reducing their movement speed for a time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mental Discipline', '<div class="Sprite Telekinesis_MentalDiscipline"></div>&nbsp;Mental Discipline', 4, 15, pow++, 2, 'Telekinesis, Form<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Increases (based on rank) your Ego damage by 12/15/18% and each stack of Ego Leech increases your critical chance by 1/1.5.2%.  Increases the cost of all powers by 5%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Id Blades', 'Id Blades', 0, null, 'While this power is active, your Ego Blade powers manifest Dual Id Blades instead of a single Ego Blade.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Surge', '<div class="Sprite Telekinesis_EgoSurge"></div>&nbsp;Ego Surge', 4, 15, pow++, 2, 'Telekinesis, Active Offense and Energy Form<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Through concentration and mental discipline you are able to manifest a second blade of energy when using your ego blade attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Nimble Mind', 'Nimble Mind', 2, null, 'Your Ego Surge greatly enhances your ability to deliver Critical Strikes.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blade Breach', '<div class="Sprite Telekinesis_EgoBladeBreach"></div>&nbsp;Ego Blade Breach', 4, 15, pow++, 3, 'Telekinesis, 10 foot Melee Single Target Damage and Debuff<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />This devastating attack uses highly focused ego weaponry to deal a stunning blow to your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Domineering Will', 'Domineering Will', 1, null, 'Ego Blade Breach will Stun targets who block the attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blade Annihilation', '<div class="Sprite Telekinesis_EgoBladeAnnihilation"></div>&nbsp;Ego Blade Annihilation', 4, 15, pow++, 3, 'Telekinesis, 10 foot Melee Single Target Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />Your control of your ego weaponry is such that you are able to deal devastatingly powerful blows.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mental Acuity', 'Mental Acuity', 2, null, 'Your focus doubles the bonus damage this power deals for each stack of Ego Leech it consumes and increases the damage your Ego Annihilation deals by 50%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Lance', '<div class="Sprite Telekinesis_TelekineticLance"></div>&nbsp;Telekinetic Lance', 4, 15, pow++, 3, 'Telekinesis, 100 foot Ranged Single Target Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />You construct a lance out of mental energy and launch it at your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Id Infusion', 'Id Infusion', 2, null, 'The Ego Infusion Buff granted by consuming stacks of Ego Leech with this power now also grants a 15% increase to all Ego Damage while it is active.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Telekinetic Maelstrom', '<div class="Sprite Telekinesis_TelekineticMaelstrom"></div>&nbsp;Telekinetic Maelstrom', 4, 15, pow++, 3, 'Telekinesis, 25 foot Sphere PBAoE Ranged Damage and Stun<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />This telekinetic attack draws stones from the earth, and flings them at nearby enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Expansive Intellect', 'Expansive Intellect', 2, null, 'Increases the radius of the Telekinetic Maelstrom AoE by 10 feet.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lance Rain', '<div class="Sprite Telekinesis_TelekineticLance"></div>&nbsp;Lance Rain', 4, 15, pow++, 3, 'Telekinesis, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br /><b>This power unlock can be purchased from an Onslaught Agent.</b><br /><br />TAP<br />+ Single target Ego damage.<br /><br />CHARGE<br />+ Increases the damage and Energy cost of the Tap action.<br />+ This power strikes all targets in a 15 foot radius around your primary targets, and each of the following effects is duplicated on each target in range.<br />+ When fully charged, this power consumes all of your stacks of Ego Leech, causing an eruption of Telekinetic Energy that deals additional damage to your target and AoE splash damage in a 10 foot radius around your target.<br />+ When consuming Ego Leech, this power grants you the Ego Infusion Buff. The length of the Buff is increased for each stack consumed. Ego Infusion grants you stacks of Ego Leech over time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mind Link'].name, dataPowerAlias['Mind Link'].desc, 4, 15, pow++, 4, dataPowerAlias['Mind Link'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Aggression Inhibitor'].name, dataPowerAlias['Aggression Inhibitor'].desc, 2, null, dataPowerAlias['Aggression Inhibitor'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mental Impact'].name, dataPowerAlias['Mental Impact'].desc, 4, 15, pow++, 4, dataPowerAlias['Mental Impact'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['LaM'].name, dataPowerAlias['LaM'].desc, 1, null, dataPowerAlias['LaM'].tip));

//------------------------------------------------------------------------------
// Power Framework: Telepathy
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'].push(16);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Psi Lash', '<div class="Sprite Telepathy_PsiLash"></div>&nbsp;Psi Lash', 4, 16, pow++, -1, 'Telepathy, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Assault your foe with this psychic attack, damaging their body as you ready yourself for greater attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Psychic Reverberations', 'Psychic Reverberations', 2, null, 'Psi Lash has a chance to Buff your Ego damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Blast', '<div class="Sprite Telepathy_EgoBlast"></div>&nbsp;Ego Blast', 4, 16, pow++, 0, 'Telepathy, 100 foot Ranged Single Target Damage and Disorient (Blast)<br /><br />Ego Blast assaults your foe\\\'s mind.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mind Opener', 'Mind Opener', 2, null, 'Damage dealt by Ego Blast is increased 30% while you are affected by Telepathic Reverberation.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Rude Awakening', 'Rude Awakening', 1, null, 'Your mental assault is easier to perform on Sleeping targets, causing Ego Blast to deal 15% more damage to them.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mind Break', '<div class="Sprite Telepathy_MindBreak"></div>&nbsp;Mind Break', 4, 16, pow++, 0, 'Telepathy, 100 foot Ranged Single Target Damage and Detonate (Blast)<br /><br />You shatter your foe\\\'s psyche.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow of Doubt', '<div class="Sprite Telepathy_ShadowOfDoubt"></div>&nbsp;Shadow of Doubt', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 10 foot Sphere AoE DoT and Debuff<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You plant doubts in your target\\\'s mind, weakening its mental state.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Malaise', 'Malaise', 2, null, 'Target suffers -15% to their power recharge speed for 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Sprites', '<div class="Sprite Telepathy_EgoSprites"></div>&nbsp;Ego Sprites', 4, 16, pow++, 1, 'Telepathy, 25 foot Sphere PBAoE DoT<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />This ability unleashes sprites composed of psychic energy to assault and harass your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Slave Mentality', 'Slave Mentality', 2, null, 'Ego Sprites will return to you after damaging the enemy and heal you for a short time. This only occurs if the sprites dealt their full amount of damage. You can only have a maximum of 5 stacks of this heal at one time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mental Leech', '<div class="Sprite Telepathy_MentalLeech"></div>&nbsp;Mental Leech', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 20 foot Sphere AoE DoT and Debuff<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You place a heavy burden on your foe\\\'s mind, draining them of willpower.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mental Weakness', 'Mental Weakness', 2, null, 'Increases the time it takes for foes to charge powers by 15%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Placate', '<div class="Sprite Telepathy_EgoPlacate"></div>&nbsp;Ego Placate', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged Single Target Placate<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You are able to subtly convince the target that you are not a threat, never mind that you just beat up a nearby group of their friends.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Svengali\'s Guile', 'Svengali\'s Guile', 2, null, 'Partially refreshes the duration of your Stress, Despondency, and Regret.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Sleep', '<div class="Sprite Telepathy_EgoSleep"></div>&nbsp;Ego Sleep', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 0-15 foot Sphere AoE Sleep<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />The strength of your mind forces slumber over your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Plagued by Nightmares', 'Plagued by Nightmares', 2, null, 'Ego Sleep plagues the target with terrifying nightmares while asleep, affecting them with Fear when they wake up.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Empathic Healing', '<div class="Sprite Telepathy_EmpathicHealing"></div>&nbsp;Empathic Healing', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged Single Target Heal<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />Using the power of your trained mind you are able to speed the healing of wounds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Empathic Amplification', 'Empathic Amplification', 2, null, 'When you heal someone else with Empathic Healing, you transfer the pain to yourself. You can then redirect this pain through your own attacks for a short period of time. Failing to redirect the pain quickly enough will cause you to take damage.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Congress of Selves', '<div class="Sprite Telepathy_CongressOfSelves"></div>&nbsp;Congress of Selves', 4, 16, pow++, 1, 'Telepathy, Slotted Hybrid Passive and Energy Form<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />Your mastery of your psyche has allowed you to strike deep into your foe\\\'s mind and leaving them wracked with pain.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Conditioning', 'Conditioning', 2, null, 'Congress of Selves allows control powers to apply Trauma.' + dataPowerAlias['Trauma'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Manipulator'].name, dataPowerAlias['Manipulator'].desc, 2, 16, pow++, 1, dataPowerAlias['Manipulator'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = new Power(dataPower.length, 'Telepathic Reverberation', '<div class="Sprite Telepathy_TelepathicReverberation"></div>&nbsp;Telepathic Reverberation', 4, 16, pow++, 1, 'Telepathy, Energy Unlock (Presence, Recovery)<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you Hold with a Telepathy power or whenever you damage a Held, Confused, or Disoriented target with your Telepathy attacks.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Presence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Mind Lock', '<div class="Sprite Telepathy_MindLock"></div>&nbsp;Mind Lock', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Confuse and Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Flashing lights, spooky voices, a barrage of twisting images -- one of your mental assaults will certainly confuse your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Befuddling Rage', 'Befuddling Rage', 2, null, 'Confused enemies have their combat stats increased for the duration of the confuse effect.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Psychic Vortex', '<div class="Sprite Telepathy_PsychicVortex"></div>&nbsp;Psychic Vortex', 4, 16, pow++, 2, 'Telepathy, 50 foot Ranged Single Target Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Creates a feedback loop in the minds of your enemies, causing them to take damage whenever they attempt to harm another.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Single Minded', 'Single Minded', 2, null, 'Targets who are close to the Psychic Vortex have a chance to be Stunned.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mind Control', '<div class="Sprite Telepathy_MindControl"></div>&nbsp;Mind Control', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You are able to bend weak minded individuals to server you.<br /><br /><b>This power can be unlocked by purchasing the Psionic Hair and Mind Control Power item from the Zen Store.</b>');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Bewilder', 'Bewilder', 2, null, 'Mind Control now Disorients high ranking foes.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Summon Nightmare', '<div class="Sprite Telepathy_SummonNightmare"></div>&nbsp;Summon Nightmare', 4, 16, pow++, 2, 'Telepathy, Uncontrolled Pet<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You manifest a psychokinetic nightmare that assaults your target with haunting and brutal attacks.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Night Terror', 'Night Terror', 2, null, 'Nightmare entities have their life span increased. They will now attack the target until it is defeated instead of disappearing partway through the fight.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Psionic Healing', '<div class="Sprite Telepathy_PsionicHealing"></div>&nbsp;Psionic Healing', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Heal<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You are able to use your mental training to heal yourself and your allies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Psionic Emanation', 'Psionic Emanation', 2, null, 'Grants your Psionic Healing a chance to perform an AoE heal around the target.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mind Drain', '<div class="Sprite Telepathy_MindDrain"></div>&nbsp;Mind Drain', 4, 16, pow++, 2, 'Telepathy, 50 foot Ranged Single Target Damage and Self Heal<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target, healing you as you deal damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Deplete', 'Deplete', 2, null, 'The heal component of your Mind Drain becomes an AoE (15 foot radius, max of 5 targets) centered on you that heals nearby friends for half as much as it heals you. When using Mind Drain on a target affected by Despondency, the AoE heals for as much as it heals you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mind Wipe', '<div class="Sprite Telepathy_MindWipe"></div>&nbsp;Mind Wipe', 4, 16, pow++, 2, 'Telepathy, 50 foot Single Target Threat Wipe<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Free Your Mind!', 'Free Your Mind!', 2, null, 'Helps allies within 15 feet of your primary target break free from holds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mental Storm', '<div class="Sprite Telepathy_MentalStorm"></div>&nbsp;Mental Storm', 4, 16, pow++, 3, 'Telepathy, 50 foot Ranged 10 foot Sphere AoE DoT and Paralyze<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />You rend your target\\\'s mind with a storm of mental energy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ego Storm', '<div class="Sprite Telepathy_EgoStorm"></div>&nbsp;Ego Storm', 4, 16, pow++, 3, 'Telepathy, 25 foot Sphere PBAoE Ranged Damage and Hold<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />Summon a storm of mental energy and press it into action, damaging the foes daring enough to come close to you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Malevolent Manifestation', 'Malevolent Manifestation', 2, null, 'Your Ego Storm becomes its own entity and will blast your enemies without your assistance after being created. This advantage increases the cost of Ego Storm by 20%, and will cause Ego Storm to be incapable of getting a Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Collective Will', '<div class="Sprite Telepathy_CollectiveWill"></div>&nbsp;Collective Will', 4, 16, pow++, 3, 'Telepathy, 50 foot Sphere AoE Summon Damage<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />You draw on the will of the universe to summon entities which will wear down your enemy\\\'s resistance to your power.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Consume Will', 'Consume Will', 2, null, 'Causes the entities summoned by Collective Will to Debuff their targets, lowering their resistance to Ego damage by 10%.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mindful Reinforcement', '<div class="Sprite Telepathy_MindfulReinforcement"></div>&nbsp;Mindful Reinforcement', 4, 16, pow++, 3, 'Telepathy, 50 foot Ranged Single Friend Shield and Heal<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />Activating this power is a true statement of mind over matter, granting your target a damage absorbing shield, which can heal your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Revitalizing Boost', 'Revitalizing Boost', 2, null, 'If your Mindful Reinforcement shield absorbs the full amount it restores Energy to you.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Master of the Mind', '<div class="Sprite Telepathy_MasterOfTheMind"></div>&nbsp;Master of the Mind', 4, 16, pow++, 3, 'Telepathy, Transform and Self Buff<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />Unleash the full fury of your mind and destroy your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mind Link'].name, dataPowerAlias['Mind Link'].desc, 4, 16, pow++, 4, dataPowerAlias['Mind Link'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Aggression Inhibitor'].name, dataPowerAlias['Aggression Inhibitor'].desc, 2, null, dataPowerAlias['Aggression Inhibitor'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Mental Impact'].name, dataPowerAlias['Mental Impact'].desc, 4, 16, pow++, 4, dataPowerAlias['Mental Impact'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['LaM'].name, dataPowerAlias['LaM'].desc, 1, null, dataPowerAlias['LaM'].tip));

//------------------------------------------------------------------------------
// Power Set: Brick
//------------------------------------------------------------------------------

dataRequireGroup['brick'] = [];

dataPowerAlias['Unleashed Rage'] = new PowerAlias('Unleashed Rage', 'Unleashed Rage', '<div class="Sprite Brick_UnleashedRage"></div>&nbsp;Unleashed Rage', 'Brick, 10 foot Melee 15 foot Sphere AoE Damage and Knock Down and Fear<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Unleashed Rage lets forth a deafening shout, terrifying and damaging nearby foes.<br /><br />CLICK<br />+ Deals Sonic damage to nearby targets.<br />+ The damage dealt by this power is considered melee damage for effects such as the Brawler Role. Note that the damage is not modified by Strength, however.<br />+ Knocks Down affected targets.<br />+ Fears affected targets, causing the enemy to cower in your presence and reducing the damage they deal.<br />+ Deals additional damage for each stack of Enrage you have.');
dataPowerAlias['Power Chord'] = new PowerAlias('Power Chord', 'Power Chord', '<div class="Sprite Brick_PowerChord"></div>&nbsp;Power Chord', 'Brick, 25 foot PBAoE Sphere - Maintain<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Blow your enemies away with the awesome power of music!<br />+ Deals Sonic damage to nearby foes.<br />+ As you maintain this power, you gain a damage boost.<br />+ After you stop maintaining, affected targets are Knocked Back.<br />+ Disorients affected targets, causing them to move slower and deal less damage.');
dataPowerAlias['Defiance'] = new PowerAlias('Defiance', 'Defiance', '<div class="Sprite Brick_Defiance"></div>&nbsp;Defiance', 'Brick, Defensive Passive (Constitution)<br /><br />Requires 1 power from Brick or 2 non-Energy Building powers from any framework.<br /><br />Allows you to build stacks of Defiant! when hit.<br /><br />+ Each stack of Defiant! increases your damage resistance.<br />+ Each time you take damage, you recover energy.<br />+ Stacks up to 6 times and lasts 20 seconds.<br />- Scales specifically with Constitution instead of super stats in general.');
dataPowerAlias['Force of Will'] = new PowerAlias('Force of Will', 'Force of Will', 'Force of Will', 'Adds increasing Knock Back and Stun resistance as your Health gets lower.');
dataPowerAlias['Unstoppable'] = new PowerAlias('Unstoppable', 'Unstoppable', '<div class="Sprite Brick_Unstoppable"></div>&nbsp;Unstoppable', 'Brick, Slotted Offensive Passive<br /><br />Requires 1 power from Brick or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Melee and Bleed damage.<br />+ Increases other damage by a lesser amount.<br />+ Increases your Knock resistance.<br />+ Each time you take damage, a small, flat amount is absorbed.<br />+ Generates energy each time you Knock a target.  This energy scales with Recovery.');
dataPowerAlias['Enrage'] = new PowerAlias('Enrage', 'Enrage', '<div class="Sprite Brick_Enrage"></div>&nbsp;Enrage', 'Brick, Form (Strength)<br /><br />Requires 1 power from Brick or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you Knock an enemy.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPowerAlias['Endorphin Rush'] = new PowerAlias('Endorphin Rush', 'Endorphin Rush', 'Endorphin Rush', 'Activating Enrage will heal you over time. The duration of this heal is based on the number of stacks of Defiant on you. The amount healed is based on your Constitution.');
dataPowerAlias['Giant Growth'] = new PowerAlias('Giant Growth', 'Giant Growth', 'Giant Growth', 'Purchasing this advantage adds a growth effect to Enraged.');
dataPowerAlias['Aggressor'] = new PowerAlias('Aggressor', 'Aggressor', '<div class="Sprite Brick_Aggressor"></div>&nbsp;Aggressor', 'Brick, Active Offense<br /><br />Requires 3 powers from Brick or 4 non-Energy Building powers from any framework.<br /><br />Your aggressive stance increases your damage.');
dataPowerAlias['Rock Concert'] = new PowerAlias('Rock Concert', 'Rock Concert', 'Rock Concert', 'Power Chord no longer gives you the Rocking Out buff.  Instead, Power Chord now applied Exhilarate to nearby allies.  Exhilarate increases their damage by a lesser amount and can stack up to 10 times.  It also gives them energy.');
dataPowerAlias['Rampant'] = new PowerAlias('Rampant', 'Rampant', 'Rampant', 'Cleave now applies Reckless, which gives you bonus Offense and Knock resistance.  Reckless can stack up to 3 times and each stack lasts 12 seconds.');
dataPowerAlias['Vortex Technique'] = new PowerAlias('Vortex Technique', 'Vortex Technique', 'Vortex Technique', '+ This power becomes a knock toward instead of a knock away.<br />+ Fully maintaining this power applies or refreshes Furious.');

//------------------------------------------------------------------------------
// Power Framework: Heavy Weapon
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(17);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Bludgeon', '<div class="Sprite HeavyWeapon_Bludgeon"></div>&nbsp;Bludgeon', 5, 17, pow++, -1, 'Heavy Weapon, Energy Builder, 10 foot Melee Single Target Damage<br /><br />You swing your mighty weapon in an overhand arc, crushing foes in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Until Morale Improves', 'Until Morale Improves', 2, null, 'All attacks of this combo gain a 15% chance to Disorient the primary target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Cleave', '<div class="Sprite HeavyWeapon_Cleave"></div>&nbsp;Cleave', 5, 17, pow++, 0, 'Heavy Weapon, 10 foot Melee 120 degree Cone AoE Damage and Enrage (Combo)<br /><br />You assault your foes with a series of powerful horizontal strikes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Defensive Stance', 'Defensive Stance', 2, null, 'Finishing this combo against a Disoriented target will apply/refresh Defiance on yourself.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Rampant'].name, dataPowerAlias['Rampant'].desc, 2, null, dataPowerAlias['Rampant'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Eruption', '<div class="Sprite HeavyWeapon_Eruption"></div>&nbsp;Eruption', 5, 17, pow++, 1, 'Heavy Weapon, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />A strong underhanded swing that Knocks your foe into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Magma Burst', 'Magma Burst', 2, null, 'Causes a burst of magma to explode on your target, dealing Fire damage and applying Clinging Flames to all enemies within 10 feet of your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Brute Strike', '<div class="Sprite HeavyWeapon_BruteStrike"></div>&nbsp;Brute Strike', 5, 17, pow++, 1, 'Heavy Weapon, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />A deceptive swing that quickly brings the butt of your weapon up to catch your opponent off-guard.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Defiance'].name, dataPowerAlias['Defiance'].desc, 5, 17, pow++, 1, dataPowerAlias['Defiance'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Force of Will'].name, dataPowerAlias['Force of Will'].desc, 2, null, dataPowerAlias['Force of Will'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unstoppable'].name, dataPowerAlias['Unstoppable'].desc, 5, 17, pow++, 1, dataPowerAlias['Unstoppable'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Guard', '<div class="Sprite HeavyWeapon_Guard"></div>&nbsp;Guard', 5, 17, pow++, 1, 'Heavy Weapon, Block<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Damage taken while blocking applies Retaliation.  Retaliation increases the damage of your next attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Punitive Pummeling', 'Punitive Pummeling', 2, null, 'Attacks against you have a chance of reflecting their energy outwards. Every incoming attack that you block with Guard has a 20% change of Knocking Back all nearby enemies. This effect can occur at most once every 10 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Decimate', '<div class="Sprite HeavyWeapon_Decimate"></div>&nbsp;Decimate', 5, 17, pow++, 1, 'Heavy Weapon, 60 foot Lunge, Snare, and Disorient<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />You lunge toward your target, striking them with your weapon.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Restraining Order', 'Restraining Order', 2, null, 'When lunging from more than 20 feet away, you temporarily cripple the target\\\'s legs, Rooting them in place for a short time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Enrage'].name, dataPowerAlias['Enrage'].desc, 5, 17, pow++, 1, dataPowerAlias['Enrage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Endorphin Rush'].name, dataPowerAlias['Endorphin Rush'].desc, 2, null, dataPowerAlias['Endorphin Rush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Giant Growth'].name, dataPowerAlias['Giant Growth'].desc, 0, null, dataPowerAlias['Giant Growth'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Arc of Ruin', '<div class="Sprite HeavyWeapon_ArcOfRuin"></div>&nbsp;Arc of Ruin', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 120 degree Cone AoE Damage and Disorient<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />You wind up for a massive swing, capable of setting your targets off-balance.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'No Quarter', 'No Quarter', 2, null, 'Your strike temporarily reduces your target\\\'s resistance to all Physical damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Wildfire', 'Wildfire', 2, null, '+ Refreshes all Clinging Flames on your targets.<br />+ Knocks Down all targets.  This can only occur once every 3 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Skullcrusher', '<div class="Sprite HeavyWeapon_Skullcrusher"></div>&nbsp;Skullcrusher', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 3 foot Cylinder AoE Damage and Knock Down<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />You raise your weapon up behind your back, devoting all of your strength to a fierce overhead attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Put Them Down', 'Put Them Down', 1, null, 'You are able to take advantage of your foe\\\'s weakened state, allowing your Skullcrusher to deal an additional 15% damage to Disoriented targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Earth Splitter', '<div class="Sprite HeavyWeapon_EarthSplitter"></div>&nbsp;Earth Splitter', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 5 foot Cylinder AoE Damage and Knock Up<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />A powerful blow that channels energy toward your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Bend the Earth', 'Bend the Earth', 2, null, 'Targets further than 25 feet from you are Knocked Towards you instead of up.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Aggressor'].name, dataPowerAlias['Aggressor'].desc, 5, 17, pow++, 2, dataPowerAlias['Aggressor'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Vicious Descent', '<div class="Sprite HeavyWeapon_ViciousDescent"></div>&nbsp;Vicious Descent', 5, 17, pow++, 2, 'Heavy Weapon, 60 foot Lunge 10 foot Sphere PBAoE Melee Damage<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />You leap into the air, crashing down on your foes with your weapon.<br />- This lunge has a much longer cooldown than other lunges.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Relentless', 'Relentless', 2, null, 'Affected targets are Knocked Down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Annihilate', '<div class="Sprite HeavyWeapon_Annihilate"></div>&nbsp;Annihilate', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />A heavy backhanded strike that will send your foe flying away from you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Scorching Blade', 'Scorching Blade', 2, null, 'Your Annihilate deals 30% increased damage against targets affected by Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 2, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Skewer', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Skewer', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Melee 3 foot Cylinder AoE Damage and Enrage<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />You step back and put all of your weight into a powerful forward thrust.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Follow Through', 'Follow Through', 1, null, 'You plant your feet firmly on the ground, bracing yourself for the attack, increasing the Charge damage of Skewer by 25%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Initiative', 'Initiative', 1, null, 'You let loose with a quick burst of strength, increasing the Tap (and base) damage of Skewer by 15%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Brimstone', '<div class="Sprite HeavyWeapon_Brimstone"></div>&nbsp;Brimstone', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Sphere PBAoE Melee Damage and Knock Down<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />You raise your weapon to the sky, charging it with energy that you strike down with, damaging nearby foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aftershock', 'Aftershock', 2, null, 'Fully charing Brimstone will now leave a patch of fire on the ground, burning nearby foes. Only 1 patch may exist at a time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unleashed Rage'].name, dataPowerAlias['Unleashed Rage'].desc, 5, 17, pow++, 4, dataPowerAlias['Unleashed Rage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Power Chord'].name, dataPowerAlias['Power Chord'].desc, 5, 17, pow++, 4, dataPowerAlias['Power Chord'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Rock Concert'].name, dataPowerAlias['Rock Concert'].desc, 2, null, dataPowerAlias['Rock Concert'].tip));

//------------------------------------------------------------------------------
// Power Framework: Earth
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(18);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Wield Earth', '<div class="Sprite Earth_WieldEarth"></div>&nbsp;Wield Earth', 5, 18, pow++, -1, 'Earth, Energy Builder, 10 foot Melee 50 foot Ranged Single Target Damage<br /><br />Bend the nearby stone to assault foes at both close and long range by smashing them with shards of rock.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Faltering Strikes', 'Faltering Strikes', 2, null, 'All Wield Earth attacks now have a chance to Stagger your foe, instead of just the opening attack.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Stone Shot', '<div class="Sprite Earth_StoneShot"></div>&nbsp;Stone Shot', 5, 18, pow++, 0, 'Earth, 100 foot Ranged 0-10 foot Sphere AoE Damage and Stagger (Blast)<br /><br />After pressing nearby earth into a dense ball you launch it at your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Shard Burst', 'Shard Burst', 2, null, 'Increases the Crushing AoE damage dealt by Stone Shot by 50% and will now Stagger all targets on a full charge instead of just the selected target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Onslaught', '<div class="Sprite Earth_Onslaught"></div>&nbsp;Onslaught', 5, 18, pow++, 1, 'Earth, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />You unleash a hail of stones to crush your foes in a flurry of shale and earth.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Excessive Force', 'Excessive Force', 2, null, 'When your Onslaught applies Stagger, it now deals double damage and Knocks your foe down.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Tremor', '<div class="Sprite Earth_Tremor"></div>&nbsp;Tremor', 5, 18, pow++, 1, 'Earth, 50 foot Ranged 15 foot Sphere AoE Damage and Knock<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />Cause a burst of earth to erupt under enemy targets, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rupture', 'Rupture', 2, null, 'If fully charged and your primary target is Staggered, Tremor applies a stack of Stagger to all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Earth Form', '<div class="Sprite Earth_EarthForm"></div>&nbsp;Earth Form', 5, 18, pow++, 1, 'Earth, Offensive Passive - Energy Form<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Physical damage.<br />+ Increases your Crushing damage resistance.<br />+ Increases your Physical damage resistance by a lesser amount.<br />+ Reduces the movement speed of foes within 10/20/30 feet of you by 30/20/10%, based on distance.<br />+ Recovers Energy when you take Crushing damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Defiance'].name, dataPowerAlias['Defiance'].desc, 5, 18, pow++, 1, dataPowerAlias['Defiance'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Force of Will'].name, dataPowerAlias['Force of Will'].desc, 2, null, dataPowerAlias['Force of Will'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unstoppable'].name, dataPowerAlias['Unstoppable'].desc, 5, 18, pow++, 1, dataPowerAlias['Unstoppable'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Stone Shroud', '<div class="Sprite Earth_StoneShroud"></div>&nbsp;Stone Shroud', 5, 18, pow++, 1, 'Earth, Block<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Literally the worst block enhancer in the game by itself.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Enrage'].name, dataPowerAlias['Enrage'].desc, 5, 18, pow++, 1, dataPowerAlias['Enrage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Endorphin Rush'].name, dataPowerAlias['Endorphin Rush'].desc, 2, null, dataPowerAlias['Endorphin Rush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Giant Growth'].name, dataPowerAlias['Giant Growth'].desc, 0, null, dataPowerAlias['Giant Growth'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Land Slide', '<div class="Sprite Earth_LandSlide"></div>&nbsp;Land Slide', 5, 18, pow++, 1, 'Earth, 60 foot Lunge, Snare, and Disorient<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />Ride a wave of earth directly toward your foe and crush them.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rock Solid', 'Rock Solid', 2, null, 'If used against a Staggered target, deals damage to foes within 10 feet of your target and all foes hit are Knocked Up. This consumes your stacks of Stagger on your target. Damage dealt and Knock severity are based on the number of stacks consumed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Upheaval', '<div class="Sprite Earth_Upheaval"></div>&nbsp;Upheaval', 5, 18, pow++, 2, 'Earth, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />You swing with the weight of the earth behind you, launching your foe into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Expansive Terrain', 'Expansive Terrain', 2, null, 'Increases the range of this power to 50 feet. Hitting a Staggered target more than 10 feet away from you will Knock them to you instead of away from you. Upheaval becoming a Ranged power causes it to lose its Melee Strength damage bonus and increases its Energy Cost.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Cave In', '<div class="Sprite Earth_CaveIn"></div>&nbsp;Cave In', 5, 18, pow++, 2, 'Earth, 50 foot Ranged Single Target Damage and Stun<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Summon massive rocks to crush your enemy in a deluge of stone.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Aggressive Gravitation', 'Aggressive Gravitation', 2, null, 'If fully charged and used against a Staggered target, your stacks of Stagger on the target are consumed and turned into stacks of Enraged on you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Quicksand', '<div class="Sprite Earth_Quicksand"></div>&nbsp;Quicksand', 5, 18, pow++, 2, 'Earth, 10-25 foot Sphere PBAoE Ranged Damage and Slow<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Cause the earth around you to become a quagmire that damages foes as it slowly seeps outward.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Repulsing Waves', 'Repulsing Waves', 2, null, 'Quicksand will now Repel foes away from you instead of pulling them towards you. (Will not push them out of maximum range of the power.) Quicksand also gains a chance to Stagger for all foes hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Seismic Smash', '<div class="Sprite Earth_SeismicSmash"></div>&nbsp;Seismic Smash', 5, 18, pow++, 2, 'Earth, 25 foot Lunge 15 foot Sphere PBAoE Ranged Damage<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Crush your enemy between a rock and a hard place as you blast them through a stone wall.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Massive Attack', 'Massive Attack', 2, null, 'Removes AoE component of the power, causing it to deal 60% more damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Aggressor'].name, dataPowerAlias['Aggressor'].desc, 5, 18, pow++, 2, dataPowerAlias['Aggressor'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Fissure', '<div class="Sprite Earth_Fissure"></div>&nbsp;Fissure', 5, 18, pow++, 3, 'Earth, 50 foot Ranged 15 foot Sphere AoE Damage and DoT<br /><br />Requires 5 powers from Earth or 6 non-Energy Building powers from any framework.<br /><br />Cause a Fissure in the earth to form below your targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Reconstruct', 'Reconstruct', 2, null, 'Standing in your Fissure will heal you over time. If you are actively using Stone Shroud, this effect is doubled.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Fault Line', '<div class="Sprite Earth_FaultLine"></div>&nbsp;Fault Line', 5, 18, pow++, 3, 'Earth, 50 foot Ranged 5 foot Cylinder AoE Damage and Knock Up<br /><br />Requires 5 powers from Earth or 6 non-Energy Building powers from any framework.<br /><br />Strike the earth with a mighty blow, causing a rupture that launches enemies into the air.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Compound Fracture', 'Compound Fracture', 2, null, 'If fully charged, targets will become Rooted instead of Knocked Up. When the Root expires, the target will be Knocked Up.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unleashed Rage'].name, dataPowerAlias['Unleashed Rage'].desc, 5, 18, pow++, 4, dataPowerAlias['Unleashed Rage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Power Chord'].name, dataPowerAlias['Power Chord'].desc, 5, 18, pow++, 4, dataPowerAlias['Power Chord'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Rock Concert'].name, dataPowerAlias['Rock Concert'].desc, 2, null, dataPowerAlias['Rock Concert'].tip));

//------------------------------------------------------------------------------
// Power Framework: Might
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(19);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Clobber', '<div class="Sprite Might_Clobber"></div>&nbsp;Clobber', 5, 19, pow++, -1, 'Might, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Clobber lashes out with your fists landing punishing blows on your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Onslaught', 'Onslaught', 2, null, 'Adds a 15% chance to grant you a stack of Enrage if you are not already Enraged. If you are Enraged it will instead refresh your stacks of Enrage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'It\'s That Time', 'It\'s That Time', 2, null, 'All attacks of this combo gain a 15% chance to Disorient the primary target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Beatdown', '<div class="Sprite Might_Beatdown"></div>&nbsp;Beatdown', 5, 19, pow++, 0, 'Might, 10 foot Melee Single Target Damage and Stagger (Combo)<br /><br />Beatdown delivers blows powerful enough to unbalance anyone on the receiving end.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blindside Blow', 'Blindside Blow', 3, null, 'Causes your Beatdown attack to deal 50% additional damage to Snared or Rooted enemies.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Defensive Combo', '<div class="Sprite Might_DefensiveCombo"></div>&nbsp;Defensive Combo', 5, 19, pow++, 1, 'Might, 10 foot Melee Single Target Damage and Threat and Buff<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Defensive Combo allows you to deliver swift blows to your enemy without lowering your guard.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Surge of Strength', 'Surge of Strength', 2, null, 'Defensive Combo attacks now apply or refresh the Defiant Buff on each attack. Defensive Combo will never apply more than 1 stack of Defiant, but it will refresh any number of existing applications of Defiant.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mighty Kick', '<div class="Sprite Might_MightyKick"></div>&nbsp;Mighty Kick', 5, 19, pow++, 1, 'Might, 10 foot Melee Single Target Damage<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />A powerful kick that knocks your foe away.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Madness?!', 'Madness?!', 2, null, 'Hitting a foe with fully charged Mighty Kick will now add or refresh the Defiant Buff.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Head Butt', '<div class="Sprite Might_HeadButt"></div>&nbsp;Head Butt', 5, 19, pow++, 1, 'Might, Melee Single Target Damage and Stun<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Crushing damage and Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hurl', '<div class="Sprite Might_Hurl"></div>&nbsp;Hurl', 5, 19, pow++, 1, 'Might, 100 foot Ranged Single Target Damage and Snare<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Hurl allows you to tear a chunk out of the ground and fling it at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rubble Trouble', 'Rubble Trouble', 2, null, 'Causes your Hurl attack to hit additional targets around your primary target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Iron Chain', '<div class="Sprite Might_IronChain"></div>&nbsp;Iron Chain', 5, 19, pow++, 1, 'Might, 50 foot Ranged Single Target Damage<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Chain whips a length of heavy chain at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Demolishion', 'Demolishion', 2, null, 'Finishing the Iron Chain combo applies Demolish to your primary target.  Demolish increases all Physical damage they receive by a small amount and all Crushing damage they receive by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Rampant'].name, dataPowerAlias['Rampant'].desc, 2, null, dataPowerAlias['Rampant'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Iron Lariat', '<div class="Sprite Might_IronLariat"></div>&nbsp;Iron Lariat', 5, 19, pow++, 1, 'Might, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Lariat lashes out at your enemy using a heavy chain as a whip.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Intimidate', 'Intimidate', 2, null, 'Iron Lariat now applies Fear to your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Red Hot', 'Red Hot', 2, null, 'Iron Lariat now applies Clinging Flames to the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Roomsweeper', '<div class="Sprite Might_Roomsweeper"></div>&nbsp;Roomsweeper', 5, 19, pow++, 1, 'Might, 10 foot Melee 120 degree Cone AoE Damage and Knock<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Roomsweeper swings your fist in a powerful arc Knocking Away any enemies in its path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Concussive Blow', 'Concussive Blow', 2, null, 'Adds a short Stun to your Roomsweeper. This cannot occur more than once every 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Iron Cyclone', '<div class="Sprite Might_IronCyclone"></div>&nbsp;Iron Cyclone', 5, 19, pow++, 1, 'Might, 25 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Cyclone swings a heavy chain around you, lashing out at any enemies that come within its path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Defiance'].name, dataPowerAlias['Defiance'].desc, 5, 19, pow++, 1, dataPowerAlias['Defiance'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Force of Will'].name, dataPowerAlias['Force of Will'].desc, 2, null, dataPowerAlias['Force of Will'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unstoppable'].name, dataPowerAlias['Unstoppable'].desc, 5, 19, pow++, 1, dataPowerAlias['Unstoppable'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Retaliation', '<div class="Sprite Might_Retaliation"></div>&nbsp;Retaliation', 5, 19, pow++, 1, 'Might, Block<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Damage taken while blocking applies Retaliation.  Retaliation increases the damage of your next attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Punitive Pummeling', 'Punitive Pummeling', 2, null, 'Attacks against you have a chance of reflecting their energy outwards. Every incoming attack that you block with retaliation has a 20% chance of Knocking Back all nearby enemies. This effect can occur at most once every 10 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mighty Leap', '<div class="Sprite Might_MightyLeap"></div>&nbsp;Mighty Leap', 5, 19, pow++, 1, 'Might, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Mighty Leap hurls your body toward your enemy, landing a staggering blow.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Bull Rush', 'Bull Rush', 2, null, 'Adds a Knock Back and Snare effect to your Mighty Leap attack that affects any enemies near your primary target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Enrage'].name, dataPowerAlias['Enrage'].desc, 5, 19, pow++, 1, dataPowerAlias['Enrage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Endorphin Rush'].name, dataPowerAlias['Endorphin Rush'].desc, 2, null, dataPowerAlias['Endorphin Rush'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Giant Growth'].name, dataPowerAlias['Giant Growth'].desc, 0, null, dataPowerAlias['Giant Growth'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Uppercut', '<div class="Sprite Might_Uppercut"></div>&nbsp;Uppercut', 5, 19, pow++, 2, 'Might, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Uppercut lands a blow under the chin of your enemy with enough power to launch them into the sky.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Head Trauma', 'Head Trauma', 2, null, 'Uppercut leaves the target Disoriented, and makes focusing painful. If the target charges up powers while Disoriented, they will be Stunned. Can only occur once every 20 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Demolish', '<div class="Sprite Might_Demolish"></div>&nbsp;Demolish', 5, 19, pow++, 2, 'Might, 10 foot Melee Single Target Damage and Debuff<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Demolish is a two handed strike delivered with enough force that the enemy is still recovering when you execute your next attack.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Below the Belt', 'Below the Belt', 2, null, 'Demolish now Knocks Down and Snares foes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Thunderclap', '<div class="Sprite Might_Thunderclap"></div>&nbsp;Thunderclap', 5, 19, pow++, 2, 'Might, 10 foot Sphere PBAoE Melee Damage and Stun<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Thunderclap slams your hands together to generate a Stunning shockwave.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Collateral Damage', 'Collateral Damage', 2, null, 'Increases the range of Thunderclap to 15 feet. The damage within 10 feet remains Melee Crushing damage. The damage on the outer 5 feet is Ranged Sonic damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Hyper Voice', '<div class="Sprite Might_HyperVoice"></div>&nbsp;Hyper Voice', 5, 19, pow++, 2, 'Might, 50 foot 60 degree Cone - Maintain<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Your deafening scream deals Sonic damage, repels foes away, and Knocks Down foes on a full maintain.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Deafening', 'Deafening', 2, null, 'Fully maintaining Hyper voices Deafens your foes, causing them to take 18% increased Sonic damage for the next 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Rattle', 'Rattle', 2, null, 'Hyper voices now has a 20% chance to Disorient foes.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Aggressor'].name, dataPowerAlias['Aggressor'].desc, 5, 19, pow++, 2, dataPowerAlias['Aggressor'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(dataPower.length, 'Haymaker', '<div class="Sprite Might_Haymaker"></div>&nbsp;Haymaker', 5, 19, pow++, 3, 'Might, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Haymaker is a vicious windup punch that sends your enemy flying.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Nullifying Punch', 'Nullifying Punch', 2, null, 'Applies or refreshes Trama on your target. Trama ends any healing over time effects on your target, and causes them to receive only 50% benefit from any other incoming heals.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Havoc Stomp', '<div class="Sprite Might_HavocStomp"></div>&nbsp;Havoc Stomp', 5, 19, pow++, 3, 'Might, 10 foot Sphere PBAoE Melee Damage and Knock<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Havoc Stomp slams your feet into the ground sending a shockwave surging out around you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Cry Havoc', 'Cry Havoc', 2, null, 'Targets Knocked Back by Havoc Stomp are also affected by Fear.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shockwave', '<div class="Sprite Might_Shockwave"></div>&nbsp;Shockwave', 5, 19, pow++, 3, 'Might, 50 foot Ranged 90 degree Cone AoE Damage and Snare<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Shockwave causes you to repeatedly pound your fists on the ground sending a shockwave into any enemies in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Leg Rumbler', 'Leg Rumbler', 1, null, 'Removes travel powers from targets hit by Shockwave.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Nuclear Shockwave', '<div class="Sprite Might_Shockwave"></div>&nbsp;Nuclear Shockwave', 5, 19, pow++, 3, 'Might, 75 foot Ranged 20 foot Cylinder AoE Damage<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />You unleash a wave of nuclear energy, decimating foes in front of you.<br /><br /><b>This power unlock can be purchased from an Onslaught Agent.</b><br /><br />CHARGE<br />+ Deals heavy Crushing and Particle damage to targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Unleashed Rage'].name, dataPowerAlias['Unleashed Rage'].desc, 5, 19, pow++, 4, dataPowerAlias['Unleashed Rage'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Power Chord'].name, dataPowerAlias['Power Chord'].desc, 5, 19, pow++, 4, dataPowerAlias['Power Chord'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Rock Concert'].name, dataPowerAlias['Rock Concert'].desc, 2, null, dataPowerAlias['Rock Concert'].tip));


//------------------------------------------------------------------------------
// Power Set: Mystic
//------------------------------------------------------------------------------

dataRequireGroup['mystic'] = [];

dataPowerAlias['Planar Fracture'] = new PowerAlias('Planar Fracture', 'Planar Fracture', '<div class="Sprite Mystic_PlanarFracture"></div>&nbsp;Planar Fracture', 'Mystic, 50 foot Ranged Single Target Damage and DoT and Debuff<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Planar Fracture creates a tear in time and space, linking this plane with another. Chaotic energy pours forth from the fracture, causing random damage and status effects on your foes.<br /><br />CHARGE<br />+ Creates a Planar Fracture near your target.<br />+ Planar Fracture deals Dimensional damage to targets close to it.<br />+ The chaotic energies flowing from the Planar Fracture create random status effects on nearby enemies.<br />- Must be fully charged.<br />- This power is incapable of getting a Critical Hit.');
dataPowerAlias['Double Vortex'] = new PowerAlias('Double Vortex', 'Double Vortex', 'Double Vortex', 'Your Planar Fracture now causes 2 random Debuffs on each target instead of 1.');
dataPowerAlias['Endbringers Grasp'] = new PowerAlias('Endbringer\'s Grasp', 'Endbringer\'s Grasp', '<div class="Sprite Mystic_EndbringersGrasp"></div>&nbsp;Endbringer\'s Grasp', 'Mystic, 50 foot Ranged AoE Damage and Darkness<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Open a Qliphotic portal, its horrifying power eating away at the sanity of your foes.<br /><br /><b>This power can be unlocked from a Villain Lockbox drop.</b><br /><br />CHARGE<br />+ Open a portal that deals dimensional damage to foes.<br />+ Foes are periodically afflicted with Fear.<br />+ Foes who are afflicted by Fear are periodically corrupted and forced to fight for you.');
dataPowerAlias['Crashing Incantation'] = new PowerAlias('Crashing Incantation', 'Crashing Incantation', '<div class="Sprite Mystic_CrashingIncantation"></div>&nbsp;Crashing Incantation', 'Mystic, 50 foot Ranged AoE Damage and Curse<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />+ Deals Magic damage to targets within a 20 foot radius.<br />+ Applies Jinx to the target, reducing their movement by 15% for 8 seconds.  When the effect expires, affected foes are Knocked Down.<br />+ Jinx is a type of Curse.<br />+ Applies Overpower to affected foes, which reduces their damage resistance by 20% for 12 seconds.' + PowerUnlocksFrom('Arcane Lockbox'));
// TODO: does not count towards unlocking in-framework power tiers
dataPowerAlias['Compassion'] = new PowerAlias('Compassion', 'Compassion', '<div class="Sprite Mystic_Compassion"></div>&nbsp;Compassion', 'Mystic, Form (Presence or Recovery)<br /><br />Requires 1 power from Mystic or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your healing, as well as your ranged and melee damage to a lesser degree.<br /><br />+ You gain a stack each time you heal a target.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');

//------------------------------------------------------------------------------
// Power Framework: Celestial
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(20);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Radiance', '<div class="Sprite Celestial_Radiance"></div>&nbsp;Radiance', 6, 20, pow++, -1, 'Celestial, Energy Builder, 50 foot Ranged Single Target Damage and Heal<br /><br />Radiance fires bolts of dimensional energy at your target, healing your friends and destroying your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Convergence', 'Convergence', 2, null, 'Radiance gains a 20% chance to chain to a secondary target. The chain will have the opposite effect: An attack will chain a heal to a nearby friend; a heal will chain an attack to a nearby enemy.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rebuke', '<div class="Sprite Celestial_Rebuke"></div>&nbsp;Rebuke', 6, 20, pow++, 0, 'Celestial, 100 foot Ranged Single Target Damage and Heal (Blast)<br /><br />Call upon dimensional forces to judge your target, healing your friends and destroying your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Admonish', 'Admonish', 2, null, 'When fully charged, Rebuke now Stuns foes within 10 feet of the primary target (the primary target is not Stunned). This effect is active for both healing and damage forms.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Celestial Conduit', '<div class="Sprite Celestial_CelestialConduit"></div>&nbsp;Celestial Conduit', 6, 20, pow++, 1, 'Celestial, 50 foot Ranged Single Target Damage and Heal<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Deals Dimensional damage to an enemy target or heals a friendly target every 0.5 sec.  If used on a target affected by Illuminated or Illumination, it will chain up to 3 times to additional targets.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Serenity', 'Serenity', 2, null, 'A portion of the energy you use to cast Celestial Conduit is returned if your target is affected by the heal component of Mend. The energy returned scales slightly with your Constitution.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Vengeance', '<div class="Sprite Celestial_Vengeance"></div>&nbsp;Vengeance', 6, 20, pow++, 1, 'Celestial, 50 foot Ranged 8-15 foot Sphere AoE Damage<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Vengeance causes a concentrated burst of dimensional energy to slam into your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Redemption Denied', 'Redemption Denied', 2, null, 'On a full charge, Vengeance now Paralyzes your primary target and Stuns any other affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Iniquity', '<div class="Sprite Celestial_Iniquity"></div>&nbsp;Iniquity', 6, 20, pow++, 1, 'Celestial, 100 foot Ranged Single Friend Heal (Health Trasfer)<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You are the ultimate healer, transferring Health from yourself to your target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Justice', 'Justice', 2, null, 'Inquity can now target up to 5 friends in a cone in front of you. Iniquity is less effective (per target) for each target hit beyond the first.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Conviction', '<div class="Sprite Celestial_Conviction"></div>&nbsp;Conviction', 6, 20, pow++, 1, 'Celestial, Self Heal and Buff<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You are able to temporarily increase your Maximum Health.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Reverence', 'Reverence', 2, null, 'Adds a small AoE (15 foot radius, max of 5 targets) heal component to Conviction.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Imbue', '<div class="Sprite Celestial_Imbue"></div>&nbsp;Imbue', 6, 20, pow++, 1, 'Celestial, Active Offense Self Critical Chance Buff<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You imbue your attacks with increased vigor.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Illusive', 'Illusive', 2, null, 'Activating Imbue will cause you to generate less threat for 10 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Seraphim', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Seraphim', 6, 20, pow++, 1, 'Celestial, Support Passive - Energy Form and 100 foot PBAoE Friend HoT<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Paranormal damage.<br />+ Increases your Dimensional damage resistance.<br />+ Increases your Paranormal damage by a lesser amount.<br />+ Increases the strength of your healing.<br />+ Heals you and nearby friends every 3 seconds.<br />+ Recovers Energy when you take Dimensional damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Balance', 'Balance', 2, null, 'This advantage improves the healing aura effect of your Seraphim power. While you are in combat and Seraphim is active, up to 5 enemy targets within 25 feet of you will take a small amount of Damage over Time.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Compassion'].name, dataPowerAlias['Compassion'].desc, 2, 20, pow++, 1, dataPowerAlias['Compassion'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = new Power(dataPower.length, 'Illumination', '<div class="Sprite Celestial_Illumination"></div>&nbsp;Illumination', 6, 20, pow++, 1, 'Celestial, 15 foot sphere AoE - Heal, Enchantment, and Curse<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Illumination places healing energies around your target and those nearby, aiding your allies in their fight.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Brilliance', 'Brilliance', 2, null, 'Illumination now enhances the Perception of the targeted ally:<br />+60 Minimap Radius perception for 10 seconds.<br />+100% Perception for 10 seconds.<br />+15% Stealth Sight for 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Expulse', '<div class="Sprite Celestial_Expulse"></div>&nbsp;Expulse', 6, 20, pow++, 2, 'Celestial, 15 foot Sphere PBAoE Ranged Damage<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Dimensional damage to nearby foes.<br />+ Leaves behind a Healing Rune which heals nearby allies every second for 10 seconds.<br />+ You cannot have more than one Healing Rune active at once.<br />+ Summoning this Rune counts as applying an Enchantment.<br />- Must be fully charged.<br />');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Impose', 'Impose', 2, null, 'All targets hit by Expulse are Snared after 2 seconds, reducing their movement speed for a time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Expel', 'Expel', 2, null, 'Expulse now knocks back affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Redemption', '<div class="Sprite Celestial_Redemption"></div>&nbsp;Redemption', 6, 20, pow++, 2, 'Celestial, 25 foot Sphere PBAoE Revive<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />Your powers allow you to call other heroes back from the brink of defeat.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Salvation', 'Salvation', 2, null, 'Redemption can now resurrect up to 4 teammates within 50 feet of you. Healing received is divided amongst targets resurrected.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Palliate', '<div class="Sprite Celestial_Palliate"></div>&nbsp;Palliate', 6, 20, pow++, 2, 'Celestial, 100 foot Ranged Single Friend Heal and Buff<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />Calling upon dimensional energies you are able to heal your allies and imbue them with Presence.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Absolve', 'Absolve', 2, null, 'The target of Palliate has their threat wiped and gains stealth for 10 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Holy Water', '<div class="Sprite Celestial_HolyWater"></div>&nbsp;Holy Water', 6, 20, pow++, 3, 'Celestial, 25 foot 90 Degree Cone Damage or Heal<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />+ If Targeting foes, deals Dimensional damage to affected targets every 1 sec for 10 sec.  Illuminated foes will also become Disoriented.<br />+ If Targeting allies, heals affected targets once every 2 sec for 10 sec.' + PowerUnlocksFrom('Nightmare Invasion Store'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Heavenly Mana', 'Heavenly Mana', 2, null, 'Holy Weather now gives allies energy over time or siphons energy from foes.  This effect scales with your Recovery.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Impure Waters', 'Impure Waters', 2, null, 'Causes Illuminated targets to be affected by Deadly Poison instead of Disorient.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Celestial Cleansing', '<div class="Sprite Celestial_CelestialCleansing"></div>&nbsp;Celestial Cleansing', 6, 20, pow++, 3, 'Celestial, 100 foot Ranged Single Friend Cleanse<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />Purge a target, banishing an undesirable effect to far off dimensions.<br /><br /><b>Unlockable Power</b>');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Deliverance', 'Deliverance', 2, null, 'Celestial Cleansing now helps friendly targets around your primary target break free of holds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ascension', '<div class="Sprite Celestial_Ascension"></div>&nbsp;Ascension', 6, 20, pow++, 3, 'Celestial, Active Offense and Energy Form<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />You are able to temporarily draw massive energy from other dimensions, increasing your damage and healing and granting you flight for a short time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Judgment', 'Judgment', 2, null, 'All Illuminations within 100 feet are consumed. Friendly targets who were Illuminated are healed. Enemy targets who were Illuminated take damage.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Planar Fracture'].name, dataPowerAlias['Planar Fracture'].desc, 6, 20, pow++, 4, dataPowerAlias['Planar Fracture'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Double Vortex'].name, dataPowerAlias['Double Vortex'].desc, 2, null, dataPowerAlias['Double Vortex'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Endbringers Grasp'].name, dataPowerAlias['Endbringers Grasp'].desc, 6, 20, pow++, 4, dataPowerAlias['Endbringers Grasp'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Crashing Incantation'].name, dataPowerAlias['Crashing Incantation'].desc, 6, 20, pow++, 4, dataPowerAlias['Crashing Incantation'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Framework: Darkness
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(21);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Bolt', '<div class="Sprite Darkness_ShadowBolt"></div>&nbsp;Shadow Bolt', 6, 21, pow++, -1, 'Darkness, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Shadow Bolt fires balls of dimensional energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Despondency', 'Despondency', 2, null, 'Decreases target\\\'s Dodge chance. Additionally, all Shadow Bolt attacks now have a chance to apply Fear (instead of only the opening attack).'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Blast', '<div class="Sprite Darkness_ShadowBlast"></div>&nbsp;Shadow Blast', 6, 21, pow++, 0, 'Darkness, 100 foot Ranged Single Target Damage and Fear (Blast)<br /><br />Shadow Blast is a highly focused bolt of dimensional energies. Few enemies can stand in its path and survive.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Psychotic Break', 'Psychotic Break', 2, null, 'Full charge vs Feared target pushes them into full on psychosis, Stunning the target and dealing additional Dimensional Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Embrace', '<div class="Sprite Darkness_ShadowEmbrace"></div>&nbsp;Shadow Embrace', 6, 21, pow++, 1, 'Darkness, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Shadow Embrace assaults enemies in front of you with relentless dark energy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Dark Displacement', 'Dark Displacement', 2, null, 'Adds a chance to Knock Down your targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Fatal Allure', 'Fatal Allure', 1, null, 'Feared targets are Knocked Toward you with great force, potentially pulling them clear over your head.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Grasping Shadows', '<div class="Sprite Darkness_GraspingShadows"></div>&nbsp;Grasping Shadows', 6, 21, pow++, 1, 'Darkness, 50 foot Ranged 15 foot Sphere AoE Damage and Hold and Fear<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Grasping Shadows calls on dark dimensional energies to bind your enemies in place.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Unyielding Agony', 'Unyielding Agony', 2, null, 'Grasping Shadows now deals Damage over Time. This damage does not reduce the durability of the Paralyze Hold applied by Grasping Shadows.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Devouring Darkness', 'Devouring Darkness', 2, null, 'Devouring Darkness will now heal you and nearby allies for every enemy you hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Void', 'Void', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Shroud', '<div class="Sprite Darkness_ShadowShroud"></div>&nbsp;Shadow Shroud', 6, 21, pow++, 1, 'Darkness, Active Offense and Energy Form<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Shadow Shroud wraps you in darkness and dimensional energies; this connection to the nether forces improves your combat abilities for a short period of time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Terrifying Visage', 'Terrifying Visage', 2, null, 'Your visage in Shadow Shroud becomes terrifying. Nearby enemies may be Feared, and Feared enemies may be driven to a state of Psychotic Break, Stunning them and dealing Dimensional Damage over Time.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Form', '<div class="Sprite Darkness_ShadowForm"></div>&nbsp;Shadow Form', 6, 21, pow++, 1, 'Darkness, Offensive Passive - Energy Form<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Paranormal damage.<br />+ Increases your Dimensional damage resistance.<br />+ Increases your Paranormal damage resistance by a lesser amount.<br />+ Increases your Aggression Stealth and Perception Stealth.<br />+ Reduces your threat slightly.<br />+ When you attack a foe, you have a chance to recover a small percentage of your health.  This can only happen once every 3 seconds.<br />+ Recovers Energy when you take Dimensional damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Compassion'].name, dataPowerAlias['Compassion'].desc, 2, 21, pow++, 1, dataPowerAlias['Compassion'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = new Power(dataPower.length, 'Ebon Void', '<div class="Sprite Darkness_EbonVoid"></div>&nbsp;Ebon Void', 6, 21, pow++, 1, 'Darkness, Block<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Deals damage to attackers and heals you each time you take damage while blocking.  This effect can only occur once every second.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Voracious Darkness', 'Voracious Darkness', 3, null, 'When taking damage, applies Voracious Darkness, giving you 10% bonus resistance to all damage for 10 seconds.  This effect can stack up to 5 times.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Void Shift', '<div class="Sprite Darkness_VoidShift"></div>&nbsp;Void Shift', 6, 21, pow++, 1, 'Darkness, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Shift through voidspace, disappearing for a moment and reappearing on top of your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Emerging Nightmares', 'Emerging Nightmares', 2, null, 'Applies Fear to your target and other foes within 10 feet, reducing their damage by 10% for 12 sec.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Spirit Reverberation', '<div class="Sprite Darkness_SpiritReverberation"></div>&nbsp;Spirit Reverberation', 6, 21, pow++, 1, 'Darkness, Energy Unlock (Constitution, Recovery)<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you attack a Feared target with Dimensional damage.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Constitution, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Lifedrain', '<div class="Sprite Darkness_Lifedrain"></div>&nbsp;Lifedrain', 6, 21, pow++, 2, 'Darkness, 50 foot Ranged Single Target Damage and Self Heal<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Lifedrain utilizes dark energy to transfer life energy from your enemy to you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Vampiric Sympathy', 'Vampiric Sympathy', 2, null, 'The heal component of your Lifedrain becomes an AoE (15 foot radius, max of 5 targets) centered on you that heals nearby friends for half as much as it heals you. When using Lifedrain on a Feared target, the AoE heals for as much as it heals you.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Soul Vortex', '<div class="Sprite Darkness_SoulVortex"></div>&nbsp;Soul Vortex', 6, 21, pow++, 2, 'Darkness, 50 foot Ranged AoE DoT<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Creates a Rift near your target, dealing Dimensional damage over time and slowly pulling them toward the centered.  Affected foes have a 15/25/35% chance to be Feared each tick, based on rank.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Soul Drain', 'Soul Drain', 2, null, 'Soul Vortex now applies and refreshes Despondency on affected foes after the vortex expires.  Despondency provides a small heal over time to all nearby allies, lasts 20 seconds, and can stack up to 4 times.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Dark Transfusion', '<div class="Sprite Darkness_DarkTransfusion"></div>&nbsp;Dark Transfusion', 6, 21, pow++, 2, 'Darkness, Self Energy Gain and Self Damage (Endurance, Recovery)<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Lose 400 health points in exchange for a large initial energy boost that scales with the maximum size of your energy pool as well as your Recovery, as well as the following effects that last for 15 seconds:<br /><br />+ Sets your energy equilibrium to the maximum.<br />+ Increases your energy regeneration.<br />- You lose 75 health every second.<br />- Reduces the effectiveness of healing effects used on you.  Healing from Life Drain and percent-of-max-health effects are not affected by this reduction.<br /><br />Life Drain effects include:  Life Drain, Mind Drain, Life Essence, Despondency (Soul Vortex, Mental Leech), Devouring Darkness (Summon Shadows), Consumption (Grasping Shadows), Devour Essence, Siphoning Strikes (Ego Weaponry), Back to the Darkness (Ebon Ruin), etc');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blood Sacrifice', 'Blood Sacrifice', 2, null, 'Activating Dark Transfusion with the Blood Sacrifice advantage increases the damage of all of your attacks, up to a specific amount of total damage (approximately equal to a Shadow Blast at your level).'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Void Horror', '<div class="Sprite Darkness_VoidHorror"></div>&nbsp;Void Horror', 6, 21, pow++, 2, 'Darkness, Controllable Pet<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful incarnation of shadow to assault your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ebon Ruin', '<div class="Sprite Darkness_EbonRuin"></div>&nbsp;Ebon Ruin', 6, 21, pow++, 3, 'Darkness, 100 foot Ranged Single Target Damage and DoT and Debuff<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals Dimensional damage to the target.  On a full charge, applies and refreshes Despair, a damage over time effect that stacks up to 3 times.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Nyctophobia', 'Nyctophobia', 1, null, 'Increases the damage of Ebon Ruin by 15% against Feared targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Paranormal Paranoia', 'Paranormal Paranoia', 2, null, 'Ebon Ruin now has a 30-100% chance to apply Fear to the target, based on charge time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Back to the Darkness', 'Back to the Darkness', 2, null, 'Ebon Ruin consumes all of your Shadows pets in a 25 foot radius, healing you for each one consumed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ebon Rift', '<div class="Sprite Darkness_EbonRift"></div>&nbsp;Ebon Rift', 6, 21, pow++, 3, 'Darkness, 50 foot Ranged 15 foot Sphere AoE Damage and Snare<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Ebon Rift opens a hole to another dimension in front of you, drawing your enemies and their life force towards it.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Vengeful Shadows', 'Vengeful Shadows', 2, null, 'Targets that get too close to the Rift will take massive Dimensional damage and be Knocked Back. Targets that are immune to Knock Back will instead take some additional damage if they are too close.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shadow Eruption', '<div class="Sprite Darkness_ShadowEruption"></div>&nbsp;Shadow Eruption', 6, 21, pow++, 3, 'Darkness, 25 foot PbAoE Damage and Knockback<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals shadow damage and knocks all affected enemies away from you.' + GCR_UNLOCK);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Blot', 'Blot', 2, null, 'Stuns affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Drag Back', 'Drag Back', 2, null, 'Shadow Eruption becomes a Knock Towards rather than Knock Away.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Envelope In Shadows', 'Envelope In Shadows', 2, null, 'upon a full charge, Shadow Eruption applied Devoid to targets.  Devoid reduces Dimensional damage resistance.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, 'Consume Fear', 'Consume Fear', 2, null, 'On a full charge, Shadow Eruption consumes all of your Fear effects on affected targets.  Each stack consumed will deal additional Shadow damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Summon Shadows', '<div class="Sprite Darkness_SummonShadows"></div>&nbsp;Summon Shadows', 6, 21, pow++, 3, 'Darkness, Uncontrolled Pet<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Summon Shadows calls forth beings of pure shadow to attack your foes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Devouring Darkness', 'Devouring Darkness', 2, null, 'Causes the damage your Shadows deal to heal you for 20% of the damage they deal.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Planar Fracture'].name, dataPowerAlias['Planar Fracture'].desc, 6, 21, pow++, 4, dataPowerAlias['Planar Fracture'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Double Vortex'].name, dataPowerAlias['Double Vortex'].desc, 2, null, dataPowerAlias['Double Vortex'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Endbringers Grasp'].name, dataPowerAlias['Endbringers Grasp'].desc, 6, 21, pow++, 4, dataPowerAlias['Endbringers Grasp'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Crashing Incantation'].name, dataPowerAlias['Crashing Incantation'].desc, 6, 21, pow++, 4, dataPowerAlias['Crashing Incantation'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Group: Sorcery
//------------------------------------------------------------------------------

dataRequireGroup['sorcery'] = [];

dataPowerAlias['Unbound Ritual'] = new PowerAlias('Unbound Ritual', 'Unbound Ritual', 'Unbound Ritual', 'Causes the pet summoned by this Ritual to no longer be bound to the circle. This allows the summon to follow you around wherever you may go, and your pet no longer goes away when another Ritual pet is summoned. This advantage also adds an Energy Cost to this summon power.');
dataPowerAlias['Eldritch Bolts'] = new PowerAlias('Eldritch Bolts', 'Eldritch Bolts', '<div class="Sprite Sorcery_EldritchBolts"></div>&nbsp;Eldritch Bolts', 'Sorcery, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Eldritch Bolts fires balls of eldritch energy to blast your enemy.');
dataPowerAlias['Wizards Discretion'] = new PowerAlias('Wizards Discretion', 'Wizard\'s Discretion', 'Wizard\'s Discretion', 'Grants your Eldritch Bolts a 20% chance to Stun your target for a few seconds.');
dataPowerAlias['Eldritch Blast'] = new PowerAlias('Eldritch Blast', 'Eldritch Blast', '<div class="Sprite Sorcery_EldritchBlast"></div>&nbsp;Eldritch Blast', 'Sorcery, 100 foot Ranged Single Target Damage and Root (Blast)<br /><br />Eldritch Blast fires a concentrated blast of eldritch energy at your enemy.<br />+ Single target Magic damage.<br />+ 12-50% chance to apply Mystified to you.');
dataPowerAlias['Sorcerers Whim'] = new PowerAlias('Sorcerers Whim', 'Sorcerer\'s Whim', 'Sorcerer\'s Whim', 'Eldritch Blast deals extra damage to held targets.');
dataPowerAlias['Pillar of Poz'] = new PowerAlias('Pillar of Poz', 'Pillar of Poz', '<div class="Sprite Sorcery_PillarOfPoz"></div>&nbsp;Pillar of Poz', 'Sorcery, 15 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Deals Magic damage to nearby foes, leaving behind a Healing Rune.  The Healing Rune heals nearby allies every 0.5 seconds for 10 seconds.');
dataPowerAlias['Dizzying Impact'] = new PowerAlias('Dizzying Impact', 'Dizzying Impact', 'Dizzying Impact', 'Disorients targets for 12 seconds.  Disoriented targets have 10% reduced damage and a 15% movement speed penalty.');
dataPowerAlias['Binding of Aratron'] = new PowerAlias('Binding of Aratron', 'Binding of Aratron', '<div class="Sprite Sorcery_BindingOfAratron"></div>&nbsp;Binding of Aratron', 'Sorcery, 50 foot Single Target Incapacitate<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Binding of Aratron channels eldritch energy to lock your enemy to the ground.');
dataPowerAlias['Tenable Bonds'] = new PowerAlias('Tenable Bonds', 'Tenable Bonds', 'Tenable Bonds', 'While Binding of Aratron is maintained on your target it will drain the target\\\'s Energy and return Health to you.');
dataPowerAlias['Tyrannons Familiar'] = new PowerAlias('Tyrannons Familiar', 'Tyrannon\'s Familiar', '<div class="Sprite Sorcery_TyrannonsFamiliar"></div>&nbsp;Tyrannon\'s Familiar', 'Sorcery, Controllable Pet<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful sorcerous Golem Familiar to battle your enemies and empower your magic.<br /><br />' + PetTip('Golem Familiar', 'Can punch, lunge, and throw rocks at enemies.  Its attacks generates additional threat and it can store up to 2 power charges.', 'Gains 10% damage resistance and can store up to 3 power charges.', 'Damage resistance to 20% and can store up to 4 power charges.', 'Power Siphon - When activated, consumes all power charges to give you energy and a damage bonus, based on the number of power charges consumed.'));
dataPowerAlias['Eldritch Shield'] = new PowerAlias('Eldritch Shield', 'Eldritch Shield', '<div class="Sprite Sorcery_EldritchShield"></div>&nbsp;Eldritch Shield', 'Sorcery, Block<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 300% resistance to all Non-Physical damage and 250% resistance to all Physical damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPowerAlias['Imbue With Power'] = new PowerAlias('Imbue With Power', 'Imbue With Power', 'Imbue With Power', 'Adds a different effect to your shield based on which Aura you have active:<br />+ Aura of Arcane Clarity: Your shield now returns more Energy during a block, scaling with your Intelligence.<br />+ Aura of Primal Majesty: Your shield now has a chance to strike your attacker with a bolt of lightning.<br />+ Aura of Ebon Destruction: Your shield now has a chance to Fear your attackers.<br />+ Aura of Radiant Protection: Your shield now has a chance to place a Heal over Time on you.');
dataPowerAlias['Warlocks Blades'] = new PowerAlias('Warlocks Blades', 'Warlock\'s Blades', '<div class="Sprite Sorcery_WarlocksBlades"></div>&nbsp;Warlock\'s Blades', PowerTip(21, 2, 'Sorcery, Uncontrolled Pet', 'Summons a pair of magical scimitars to attack your foes.  The blades hit up to 3 targets per attack for Magic damage.'));
dataPowerAlias['Skarns Bane'] = new PowerAlias('Skarns Bane', 'Skarn\'s Bane', '<div class="Sprite Sorcery_SkarnsBane"></div>&nbsp;Skarn\'s Bane', 'Sorcery, 50 foot Ranged 45 degree Cone AoE Damage and Debuff<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Skarn\\\'s Bane unleashes a cone of degenerative energy upon your enemies, attacking both their mental and physical beings.');
dataPowerAlias['Warlocks Malice'] = new PowerAlias('Warlocks Malice', 'Warlock\'s Malice', 'Warlock\'s Malice', 'Gives each pulse of Skarn\\\'s Bane a chance to Root the target.');
dataPowerAlias['Hex of Suffering'] = new PowerAlias('Hex of Suffering', 'Hex of Suffering', '<div class="Sprite Sorcery_HexOfSuffering"></div>&nbsp;Hex of Suffering', 'Sorcery, 50 foot Ranged 10 foot Sphere AoE Damage and DoT<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Your target becomes a bearer of a mark of pain, emanating damage.');
dataPowerAlias['Rune of Lethargy'] = new PowerAlias('Rune of Lethargy', 'Rune of Lethargy', 'Rune of Lethargy', 'Targets affected by your Hex of Suffering are Rooted in place for a short duration.');
dataPowerAlias['Urthonas Charm'] = new PowerAlias('Urthonas Charm', 'Urthona\'s Charm', '<div class="Sprite Sorcery_UrthonasCharm"></div>&nbsp;Urthona\'s Charm', 'Sorcery, 100 foot Ranged Single Target Confuse and Debuff<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Urthona\\\'s Charm attacks the mind of your target, causing them to become temporarily confused.');
dataPowerAlias['Ephemeral Endowment'] = new PowerAlias('Ephemeral Endowment', 'Ephemeral Endowment', 'Ephemeral Endowment', 'Increases the damage, defense, and speed of the target of Urthona\\\'s Charm for a short duration.');
dataPowerAlias['Valas Light'] = new PowerAlias('Valas Light', 'Vala\'s Light', '<div class="Sprite Sorcery_ValasLight"></div>&nbsp;Vala\'s Light', 'Sorcery, 50 foot Ranged 10 foot Sphere AoE Friend Heal<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />You channel your magic into life restoring energy, healing multiple allies.');

// Enchantments/Curses
dataPowerAlias['Mystified'] = new PowerAlias('Mystified', 'Mystified', 'Mystified', 'Mystified reduces the cost of your Sorcery, Celestial, Darkness, and Infernal abilities by 3% for 15 seconds.  Mystified can stack up to 3 times.  Mystified is a type of Enchantment.');
dataPowerAlias['Jinxed'] = new PowerAlias('Jinxed', 'Jinxed', 'Jinxed', 'Jinxed reduces the target\\\'s damage by 10% and movement speed by 15% for 8 seconds.  Upon expiring, the target is Knocked Down.  Jinxed is a type of Curse.');


//------------------------------------------------------------------------------
// Power Framework: Sorcery (Formerly Arcane Sorcery)
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(22);
dataRequireGroup['sorcery'].push(22);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Eldritch Bolts'].name, dataPowerAlias['Eldritch Bolts'].desc, 6, 22, pow++, -1, dataPowerAlias['Eldritch Bolts'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Wizards Discretion'].name, dataPowerAlias['Wizards Discretion'].desc, 2, null, dataPowerAlias['Wizards Discretion'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Eldritch Blast'].name, dataPowerAlias['Eldritch Blast'].desc, 6, 22, pow++, 0, dataPowerAlias['Eldritch Blast'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Sorcerers Whim'].name, dataPowerAlias['Sorcerers Whim'].desc, 2, null, dataPowerAlias['Sorcerers Whim'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Chant', 'Chant', 2, null, 'Eldritch Blast now refreshes the duration of Hexed on the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Blinding Light', 'Blinding Light', 2, null, '+ Fully charging Eldritch Blast now applies Illumination to you and nearby allies as well as Illuminated to your target.<br />+ ' + dataPowerAlias['Illumination'].tip + '<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Bad Luck', 'Bad Luck', 2, null, '+ Gives Eldritch Blast a 25-100% chance to apply Jinxed to the target.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Pillar of Poz'].name, dataPowerAlias['Pillar of Poz'].desc, 6, 22, pow++, 1, dataPowerAlias['Pillar of Poz'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Dizzying Impact'].name, dataPowerAlias['Dizzying Impact'].desc, 2, null, dataPowerAlias['Dizzying Impact'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Immense Power', 'Immense Power', 2, null, 'All affected targets are knocked back.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Dilemma', 'Dilemma', 2, null, '+ Applies Jinxed to affected targets.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Mystical', 'Mystical', 2, null, '+ Applies Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sigils of Arcane Runes', '<div class="Sprite Sorcery_SigilsOfArcaneRunes"></div>&nbsp;Sigils of Arcane Runes', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Damage<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 unstable sigils around you that explode whenever an enemy comes near.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sigils of Destruction', '<div class="Sprite Sorcery_SigilsOfDestruction"></div>&nbsp;Sigils of Destruction', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - Damage<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you that deal Magic damage to a nearby target every 2 seconds.  Each attack these sigils make has a 10% chance of Arcing to a secondary target.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sigils of Ebon Weakness', '<div class="Sprite Sorcery_SigilsOfEbonWeakness"></div>&nbsp;Sigils of Ebon Weakness', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Debuff and Curse<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you that reduce the movement speed and damage dealt by nearby foes, scaling with your Presence.  The effect of these sigils counts as a type of Curse.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Sigils of Radiant Sanctuary', '<div class="Sprite Sorcery_SigilsOfRadiantSanctuary"></div>&nbsp;Sigils of Radiant Sanctuary', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Stealth Buff and Heal<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you, granting any nearby allies increased Aggression Stealth, Perception Stealth.  Nearby allies also receive a small amount of Damage Reduction, Knockback Resistance, Hold Resistance, and a small amount of healing every 2 seconds.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Binding of Aratron'].name, dataPowerAlias['Binding of Aratron'].desc, 6, 22, pow++, 1, dataPowerAlias['Binding of Aratron'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Tenable Bonds'].name, dataPowerAlias['Tenable Bonds'].desc, 2, null, dataPowerAlias['Tenable Bonds'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Tyrannons Familiar'].name, dataPowerAlias['Tyrannons Familiar'].desc, 6, 22, pow++, 1, dataPowerAlias['Tyrannons Familiar'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aura of Arcane Clarity', '<div class="Sprite Sorcery_AuraOfArcaneClarity"></div>&nbsp;Aura of Arcane Clarity', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Grants you and up to 20 allies within 100 feet a bonus to Power Cost Discount, Power Recharge Speed, Charge Speed, Perception, and Stealth Sight.<br />+ The bonuses you gain scales with your Superstats.<br />+ The bonuses your allies gain scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aura of Ebon Destruction', '<div class="Sprite Sorcery_AuraOfEbonDestruction"></div>&nbsp;Aura of Ebon Destruction', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Increases the damage dealt by both you and up to 20 allies within 100 feet.<br />+ The damage bonus you gain scales with your Superstats.<br />+ The damage bonus your allies gain scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aura of Primal Majesty', '<div class="Sprite Sorcery_AuraOfPrimalMajesty"></div>&nbsp;Aura of Primal Majesty', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />+ Increases all stats for both you and up to 20 allies within 100 feet.<br />+ The amount of stats you receive scales with your Superstats.<br />+ The stat bonus your allies receive scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aura of Radiant Protection', '<div class="Sprite Sorcery_AuraOfRadiantProtection"></div>&nbsp;Aura of Radiant Protection', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />+ Increases the Damage Resistance of both you and up to 20 allies within 100 feet.<br />+ The amount of Damage Resistance you receive scales with your Superstats.<br />+ The amount of Damage Resistance your allies receive scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Enchanter', '<div class="Sprite Sorcery_Enchanter"></div>&nbsp;Enchanter', 6, 22, pow++, 1, 'Sorcery, Offensive Passive<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Increases your Magic, Dimensional, and Toxic damage while granting a small amount of resistance to Magic, Dimensional, and Toxic damage.  You also gain a small amount of energy when struck by any of those damage types.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Spellcaster', '<div class="Sprite Sorcery_Spellcaster"></div>&nbsp;Spellcaster', 2, 22, pow++, 1, 'Sorcery, Form (Intelligence)<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you apply or refresh an Enchantment or Curse.  (Does not apply to pets, circles, or sigils)<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Compassion'].name, dataPowerAlias['Compassion'].desc, 2, 22, pow++, 1, dataPowerAlias['Compassion'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Eldritch Shield'].name, dataPowerAlias['Eldritch Shield'].desc, 6, 22, pow++, 1, dataPowerAlias['Eldritch Shield'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Imbue With Power'].name, dataPowerAlias['Imbue With Power'].desc, 2, null, dataPowerAlias['Imbue With Power'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = new Power(dataPower.length, 'Conjuring', '<div class="Sprite Sorcery_Conjuring"></div>&nbsp;Conjuring', 6, 22, pow++, 1, 'Sorcery, Energy Unlock (Intelligence, Recovery)<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Being near targets affected by your Curses gives you energy.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Intelligence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, 'Invocation of Storm Calling', '<div class="Sprite Sorcery_InvocationOfStormCalling"></div>&nbsp;Invocation of Storm Calling', 6, 22, pow++, 2, PowerTip(21, 2, '25 foot PbAoE Maintain', 'Deals Magic damage to enemies within 25 yards of you every second.  upon being fully maintained, foes within 25 feet of you are hit by a blast of magic, dealing additional Magic damage to any enemies within 10 feet of them.<br />+ Upon being fully maintained, applies Jinxed to affected targets.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Strong Winds', 'Strong Winds', 2, null, 'Your storm now repels targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Electrify', 'Electrify', 2, null, 'Your storm now has a chance to apply Negative Ions to affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Light Up the Sky', 'Light Up the Sky', 2, null, '+ Upon a full maintain, your storm applies Illuminated to affected targets.<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Mystical', 'Mystical', 2, null, '+ Upon a full maintain, your storm applies Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Skarns Bane'].name, dataPowerAlias['Skarns Bane'].desc, 6, 22, pow++, 2, dataPowerAlias['Skarns Bane'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Warlocks Malice'].name, dataPowerAlias['Warlocks Malice'].desc, 2, null, dataPowerAlias['Warlocks Malice'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Chaos Magic', 'Chaos Magic', 2, null, 'Skarn\\\'s Bane has a 20% chance per tick to apply Bane to the affected targets, afflicting them with one of the following at random:  Fear, Confuse, Disorient, Lethargy, Bleed, Deadly Poison, Clinging Flames, Stun, or Stagger.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Mystical', 'Mystical', 2, null, '+ Skarn\\\'s Bane has a 20% chance to apply Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Tranced', 'Tranced', 2, null, '+ Skarn\\\'s Bane has a 20% chance to Stun the target for 2 seconds.<br />+ This chance increases to 100% if the target is affected by Jinxed.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Soul Beam', '<div class="Sprite Sorcery_SoulBeam"></div>&nbsp;Soul Beam', 6, 22, pow++, 2, PowerTip(21, 2, 'Ranged Damage - Maintain', 'Deals Magic damage every 0.5 second for up to 4 seconds.<br />+ Deals 10% additional damage if the target is affected by a Curse.<br />+ Deals 10% additional damage if you are affected by an Enchantment.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Mystical', 'Mystical', 2, null, '+ Gives Soul Beam a chance to apply and refresh Mystical on you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Star Barrage', '<div class="Sprite Sorcery_StarBarrage"></div>&nbsp;Star Barrage', 6, 22, pow++, 2, PowerTip(21, 2, '100 foot Ranged - 10 foot Sphere AoE Damage - Maintain', 'Deals Magic damage every 0.5 second for up to 4 seconds.<br />+ Has a 20% chance to apply Illuminated to the target.<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, '+ Fully maintaining Star Barrage applies Light Everlasting to allies near the target.<br />+ ' + dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Mystical', 'Mystical', 2, null, '+ Gives Star Barrage a chance to apply and refresh Mystical on you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Arcane Vitality', '<div class="Sprite Sorcery_ArcaneVitality"></div>&nbsp;Arcane Vitality', 6, 22, pow++, 2, 'Sorcery, 50 foot Ranged 45 degree Cone AoE Friend Heal<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />Arcane Vitality creates a focused surge of mystical healing energy that affects you or multiple allies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Impart Freedom', 'Impart Freedom', 2, null, 'Your Arcane Vitality will now remove all control effects at the end of a full maintain.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Mystical', 'Mystical', 2, null, '+ Gives your Arcane Vitality a chance to apply and refresh Mystified on you.<br />+ ' + dataPowerAlias['Mystified'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Divine Renewal', '<div class="Sprite Sorcery_DivineRenewal"></div>&nbsp;Divine Renewal', 6, 22, pow++, 2, 'Sorcery, 25 foot Sphere - Resurrection<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />Revives a nearby hero, bringing them back from the dead with 33/66/100% of their health.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Radiant Renewal', 'Radiant Renewal', 3, null, 'Allows you to resurrect up to 4 allies at a time within 50 feet, but the charge time is increased.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Banish', '<div class="Sprite Sorcery_Banish"></div>&nbsp;Banish', 6, 22, pow++, 2, 'Sorcery, 50 foot Hold<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Paralyzes the target.<br />+ All damage taken by the target is reduced by 50%, but the Paralyze is more difficult to break because of this.<br />+ The Banishment Field portion has no effect on Cosmic enemies or Onslaught Villains.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, 1, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Magician\'s Dust', '<div class="Sprite Sorcery_MagiciansDust"></div>&nbsp;Magician\'s Dust', 6, 22, pow++, 2, 'Sorcery, 50 Threat Wipe and Stealth<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, 1, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Circle of Arcane Power', '<div class="Sprite Sorcery_CircleOfArcanePower"></div>&nbsp;Circle of Arcane Power', 6, 22, pow++, 2, 'Sorcery, Circle - Self Energy Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in this circle greatly reduces your Energy decay and restores your energy every second as long as long as you stand in it.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Circle of Ebon Wrath', '<div class="Sprite Sorcery_CircleOfEbonWrath"></div>&nbsp;Circle of Ebon Wrath', 6, 22, pow++, 2, 'Sorcery, Circle - Self Damage Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in the circle increaes your damage and reduces your threat generation.<br />- Standing in the circle greatly reduces the effectiveness of healing effects used on you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Circle of Primal Dominion', '<div class="Sprite Sorcery_CircleOfPrimalDominion"></div>&nbsp;Circle of Primal Dominion', 6, 22, pow++, 2, 'Sorcery, Circle - Self Energy Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in the circle greatly increases your resistance to Knocks, increases your damage resistance, restores a small amount of health to you every second, and grants you increased stealth Sight.<br />+In the Healer role, the damage resistance and health restored is higher.<br />+ In the Tank role, you gain bonus threat generation in addition to the other bonuses.<br />- Standing in the circle reduces your resistance to Hold effects.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Circle of Radiant Glory', '<div class="Sprite Sorcery_CircleOfRadiantGlory"></div>&nbsp;Circle of Radiant Glory', 6, 22, pow++, 2, 'Sorcery, Circle - Self Resurrection and AoE Heal<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ While summoned, you can tap this pwoer to move the circle to your current location.<br />+ moving the circle causes it to heal allies at the source location as well as the destination location.<br />+ If you die within your circle, you can resurrect yourself.  Doing so destroys the circle and it cannot be summoned again for 2 minutes.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'March of the Dead', '<div class="Sprite Sorcery_MarchOfTheDead"></div>&nbsp;March of the Dead', 6, 22, pow++, 2, PowerTip(21, 2, 'Uncontrolled Pet', '+ Summons 3 Zombies to attack your target.<br />+ Duration is increased by your Intelligence.<br />- Reduces your Equilibrium for a short time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Forced March', 'Forced March', 2, null, 'increaes the duration your zombies are summoned for.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Warlocks Blades'].name, dataPowerAlias['Warlocks Blades'].desc, 6, 22, pow++, 2, dataPowerAlias['Warlocks Blades'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ritual of Ebon Summoning', '<div class="Sprite Sorcery_RitualOfEbonSummoning"></div>&nbsp;Ritual of Ebon Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Daemon', 'Uses long-range, rapid bolts and explosive blasts.', 'Wields a melee-range burning sword with periodic self-buff to increase damage', 'Wields cleaving axes and can ignite the ground beneath it.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ritual of Radiant Summoning', '<div class="Sprite Sorcery_RitualOfRadiantSummoning"></div>&nbsp;Ritual of Radiant Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Radiant Entity', 'Uses Radiant light to heal your allies and attack your enemies.  Can also utilize a blade of light if forced into melee.', 'Can Condemn enemies, damaging foes in a moderate area.', 'Gains a healing aura.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ritual of Primal Summoning', '<div class="Sprite Sorcery_RitualOfPrimalSummoning"></div>&nbsp;Ritual of Primal Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Primal Incarnation', 'Can call down lightning and uses a Bite attack.  Can also howl to buff the damage of both itself and its allies.', 'Can adapt its resistance to attacks as it takes damage.', 'When its health is low, it will grow larger and deal additional damage.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Ritual of Arcane Summoning', '<div class="Sprite Sorcery_RitualOfArcaneSummoning"></div>&nbsp;Ritual of Arcane Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Arcane Construct', 'Pummels foes with its fists and can unleash a PBAoE.', 'Gains eye beams.', 'Gains increased durability, but moves a bit more slowly as well.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Hex of Suffering'].name, dataPowerAlias['Hex of Suffering'].desc, 6, 22, pow++, 3, dataPowerAlias['Hex of Suffering'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Rune of Lethargy'].name, dataPowerAlias['Rune of Lethargy'].desc, 2, null, dataPowerAlias['Rune of Lethargy'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Rune of Dismay', 'Rune of Dismay', 2, null, 'Targets affected by your Hex of Suffering are Stunned for a short duration.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Rune of Terror', 'Rune of Terror', 2, null, 'Targets affected by your Hex of Suffering are Feared.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Valas Light'].name, dataPowerAlias['Valas Light'].desc, 6, 22, pow++, 3, dataPowerAlias['Valas Light'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, dataPowerAlias['Light Everlasting'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Urthonas Charm'].name, dataPowerAlias['Urthonas Charm'].desc, 6, 22, pow++, 3, dataPowerAlias['Urthonas Charm'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Ephemeral Endowment'].name, dataPowerAlias['Ephemeral Endowment'].desc, 2, null, dataPowerAlias['Ephemeral Endowment'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Planar Fracture'].name, dataPowerAlias['Planar Fracture'].desc, 6, 22, pow++, 4, dataPowerAlias['Planar Fracture'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Double Vortex'].name, dataPowerAlias['Double Vortex'].desc, 2, null, dataPowerAlias['Double Vortex'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Endbringers Grasp'].name, dataPowerAlias['Endbringers Grasp'].desc, 6, 22, pow++, 4, dataPowerAlias['Endbringers Grasp'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Crashing Incantation'].name, dataPowerAlias['Crashing Incantation'].desc, 6, 22, pow++, 4, dataPowerAlias['Crashing Incantation'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Group: Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['supernatural'] = [];

dataPowerAlias['Venomous Breath'] = new PowerAlias('Venomous Breath', 'Venomous Breath', '<div class="Sprite Supernatural_VenomousBreath"></div>&nbsp;Venomous Breath', 'Supernatural, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Venomous Breath causes you to exhale a deadly mist of poison to choke and torment your enemies.');
dataPowerAlias['Paralytic Bile'] = new PowerAlias('Paralytic Bile', 'Paralytic Bile', 'Paralytic Bile', 'Targets hit with Venemous Breath have a chance to suffer from an Infection that Stuns them for a short time. Targets that are Bleeding have a 100% chance to be Infected.');
dataPowerAlias['Infectious Bile'] = new PowerAlias('Infectious Bile', 'Infectious Bile', 'Infectious Bile', 'Increases the chance to Poison targets that are Bleeding to 50%.');
dataPowerAlias['Locust Breath'] = new PowerAlias('Locust Breath', 'Locust Breath', 'Locust Breath', 'Venomous Breath becomes Locust Breath.');
dataPowerAlias['Regeneration'] = new PowerAlias('Regeneration', 'Regeneration', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Regeneration', 'Supernatural, Slotted Defensive Passive, Self Heal over Time<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Heals you every 3 seconds, increasing as you take damage.<br />+ Increases damage resistance by 20%.  This value decreases as you take damage.');
dataPowerAlias['Pestilence'] = new PowerAlias('Pestilence', 'Pestilence', '<div class="Sprite Supernatural_Pestilence"></div>&nbsp;Pestilence', 'Supernatural, Offensive Passive, PBAoE DoT<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Toxic and Slashing damage.<br />+ Deals Toxic damage to nearby foes and foes that attack you every 2 seconds.<br />+ Reduces the Toxic resistance of foes for each stack of Poison they have.<br />+ Reduces the Slashing resistance of foes for each stack of Bleed they have.<br />+ Reduces the strength of healing effects on affected targets.');
dataPowerAlias['Supernatural Power'] = new PowerAlias('Supernatural Power', 'Supernatural Power', '<div class="Sprite Supernatural_SupernaturalPower"></div>&nbsp;Supernatural Power', 'Supernatural, Energy Unlock (Recovery)<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />Recovers energy every time a Supernatural power reduces your energy below 15% of your maximum.  Scales with your Rercovery better than most other energy unlocks.');
dataPowerAlias['Soul Mesmerism'] = new PowerAlias('Soul Mesmerism', 'Soul Mesmerism', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Soul Mesmerism', 'Supernatural, 50 foot Single Target Hold<br /><br />Requires 3 powers from Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Soul Mesmerism attempts to hypnotize your enemy, preventing them from taking any actions.');
dataPowerAlias['Glossolalia'] = new PowerAlias('Glossolalia', 'Glossolalia', 'Glossolalia', 'Your target begins speaking in tongues. Nearby foes take Sonic Damage over Time and have a chance to join in the chant. 20% chance per tick to apply a secondary Soul Mesmerism effect to nearby targets.');
dataPowerAlias['Resurgence'] = new PowerAlias('Resurgence', 'Resurgence', '<div class="Sprite Supernatural_Resurgence"></div>&nbsp;Resurgence', 'Supernatural, Active Defense Self Heal<br /><br />Requires 3 powers from Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Heals you for 50/75/100% (based on rank) of your health and temporarily increases your maximum hit points.');
dataPowerAlias['Evanescent Emergence'] = new PowerAlias('Evanescent Emergence', 'Evanescent Emergence', 'Evanescent Emergence', '+ Applies a stack of Furious and refreshes all existing stacks.<br />+ Using Resurgence while held will help break you out of the hold.');

//------------------------------------------------------------------------------
// Power Framework: Bestial Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(23);
dataRequireGroup['supernatural'].push(23);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Bestial Fury', '<div class="Sprite Supernatural_BeastialFury"></div>&nbsp;Bestial Fury', 6, 23, pow++, -1, 'Bestial Supernatural, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Bestial Fury uses your hands as deadly claws to slash apart your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Rip and Tear', 'Rip and Tear', 2, null, 'Tear and rip! Bestial Fury attacks now have a 15% (30% while Enraged) chance to cause the enemy to begin Bleeding.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Barbed Chain', '<div class="Sprite Supernatural_BarbedChain"></div>&nbsp;Barbed Chain', 6, 23, pow++, 0, 'Bestial Supernatural, 25 foot Melee Damage and Bleed (Combo)<br /><br />Deals Slashing damage and has a 25/25/50% (based on combo hit) chance to apply Bleed to the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Sever', 'Sever', 2, null, 'Finishing the combo applies Shredded to the primary target, increasing all physical daamge they take by a small amount, and Slashing damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Wild Slashes', 'Wild Slashes', 2, null, 'Gives the first 2 hits a 25% chance and the final hit a 100% chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Shred', '<div class="Sprite Supernatural_Shred"></div>&nbsp;Shred', 6, 23, pow++, 0, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed (Combo)<br /><br />Shred uses your claws to slash at your enemies, frequently causing them to start bleeding.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Penetrating Strikes', 'Penetrating Strikes', 2, null, 'Finishing the combo applies Shredded to the primary target, increasing all physical daamge they take by a small amount, and Slashing damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Bite', '<div class="Sprite Supernatural_Bite"></div>&nbsp;Bite', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Deals Slashing damage and has a 20% chance to apply Bleed.<br />+ When fully charged, consumes all of your Bleed effects and heals you based on the amount consumed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Furor Venenum', 'Furor Venenum', 2, null, '20% chance to Stun foes.  This chance is increased to 100% if the target is Bleeding or Poisoned.  Biting a Bleeding or Poisoned foe also applies Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Rabies', 'Rabies', 2, null, '+ Fully charging this power on a Poisoned target will spread the affliction to another nearby target.<br />+ This can occur for each type of poison.<br />+ Gives your Bite a 20% chance to apply Poison.<br />+ Refreshes the duration of all Poisons on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Scent of Blood', 'Scent of Blood', 2, null, '+ Charging this power at least halfway on a Bleeding target will spread the affliction to another nearby target.<br />+ Refreshes the duration of all Bleeds on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Feint', '<div class="Sprite Supernatural_Feint"></div>&nbsp;Feint', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Slashing damage and Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Barbed Lariat', '<div class="Sprite Supernatural_BarbedLariat"></div>&nbsp;Barbed Lariat', 6, 23, pow++, 1, 'Bestial Supernatural, 25 foot Melee Single Target Damage and Knock To<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Deals single target Slashing damage and Knocks the target toward you.<br />+ Has a 46-100% chance to apply Bleed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['OW'].name, dataPowerAlias['OW'].desc, 2, null, dataPowerAlias['OW'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Messy', 'Messy', 2, null, 'Fully charging Barbed Lariat refreshes Shredded on your target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Slice and Dice', 'Slice and Dice', 2, null, 'Fully charging Barbed Lariat refreshes Bleeds on the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Frenzy', '<div class="Sprite Supernatural_Frenzy"></div>&nbsp;Frenzy', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee (Combo) Cone AoE Damage and Bleed<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You make wide, swiping attacks with your claws, hitting targets in front of you with a 15/15/50% chance to apply Bleed.  This chance is doubled if you are Enraged.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Fear Sense', 'Fear Sense', 2, null, 'Give Frenzy a 25% chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Poison Tipped Claws', 'Poison Tipped Claws', 2, null, 'Each attack with Frenzy has a 10/10/25% chance (based on combo hit) to apply Deadly Poison to the target.  This chance is doubled if you are Enraged.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Venomous Breath'].name, dataPowerAlias['Venomous Breath'].desc, 6, 23, pow++, 1, dataPowerAlias['Venomous Breath'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Paralytic Bile'].name, dataPowerAlias['Paralytic Bile'].desc, 2, null, dataPowerAlias['Paralytic Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Infectious Bile'].name, dataPowerAlias['Infectious Bile'].desc, 2, null, dataPowerAlias['Infectious Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['Locust Breath'].name, dataPowerAlias['Locust Breath'].desc, 0, null, dataPowerAlias['Locust Breath'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Aspect of the Bestial', '<div class="Sprite Supernatural_AspectOfTheBestial"></div>&nbsp;Aspect of the Bestial', 6, 23, pow++, 1, 'Bestial Supernatural, Form (Strength)<br /><br />Requires 1 power1 from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Bleed or Deadly Poison.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Giant Growth'].name, dataPowerAlias['Giant Growth'].desc, 0, null, dataPowerAlias['Giant Growth'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Regeneration'].name, dataPowerAlias['Regeneration'].desc, 6, 23, pow++, 1, dataPowerAlias['Regeneration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Pestilence'].name, dataPowerAlias['Pestilence'].desc, 6, 23, pow++, 1, dataPowerAlias['Pestilence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Compassion'].name, dataPowerAlias['Compassion'].desc, 2, 23, pow++, 1, dataPowerAlias['Compassion'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = new Power(dataPower.length, 'Antagonize', '<div class="Sprite Supernatural_Antagonize"></div>&nbsp;Antagonize', 6, 23, pow++, 1, 'Bestial Supernatural, Block<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Blocking damage from more than 20 feet away applies or refreshes Antagonized, increasing knock resistance by 25%, Speed by 25%, and Jump Height by 2.5%.  Lasts 10 secondes and stacks up to 3 times.<br />+ Blocking an attack from less than 20 feet away applies or refreshes Cornered.  Cornered increases your resistance by 5% and Knock resistance by 25%.  Lasts 10 seconds and stacks up to 3 times.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Quills', 'Quills', 2, null, 'Adds a 10% chance to apply Poison or Bleed to nearby targets while blocking.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Pounce', '<div class="Sprite Supernatural_Pounce"></div>&nbsp;Pounce', 6, 23, pow++, 1, 'Bestial Supernatural, 60 foot Lunge, Snare, and Knock Down<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Launch yourself through the air at your target, attacking and Knocking them down.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Furious Rush', 'Furious Rush', 2, null, 'Refreshes and applies 1 stack of Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Wild Thing', '<div class="Sprite Supernatural_WildThing"></div>&nbsp;Wild Thing', 6, 23, pow++, 1, 'Bestial Supernatural, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Generates energy every 3 seconds for 6 seconds every time you apply, refresh, or consume a Bleed.<br />+ This effect does not stack, but triggering it again will refresh the duration.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Supernatural Power'].name, dataPowerAlias['Supernatural Power'].desc, 6, 23, pow++, 1, dataPowerAlias['Supernatural Power'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Thrash', '<div class="Sprite Supernatural_Thrash"></div>&nbsp;Thrash', 6, 23, pow++, 2, 'Bestial Supernatural, Maintained Melee Slashing Damage, Heal, and Snare<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Single target melee Slashing damage.<br />+ Snares the affected target.<br />+ The damage dealt by this power heals you for every one of your Bleeds or Deep wounds on the target.<br />+ Bleeds or Deep wounds from other sources do not count toward the heal.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Fester', 'Fester', 2, null, 'Debuffs your target by -5% damage strength over 12 seconds for every one of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lacerating Cyclone', '<div class="Sprite Supernatural_LaceratingCyclone"></div>&nbsp;Lacerating Cyclone', 6, 23, pow++, 2, 'Bestial Supernatural, 25 foot Sphere PBAoE Maintained Damage, Bleed, and Knockback<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Slashing damage to nearby targets.<br />+ Chance per hit to Knock Back targets.  This Knockback effect receives half of the bonus from your Strength and the other half from your Ego.<br />+ Each hit has a 10% chance to apply Bleed.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Cower', '<div class="Sprite Supernatural_Cower"></div>&nbsp;Cower', 6, 23, pow++, 2, 'Bestial Supernatural, AoE Threat Wipe and Stealth<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWAoE'].tip + '<br />- Applies Fear to you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Run Away!', 'Run Away!', 2, null, 'Grants you a temporary 60% bonus to run speed, +6 to Flight, and +6 to Jump height.  These effects last 6 for seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Soul Mesmerism'].name, dataPowerAlias['Soul Mesmerism'].desc, 6, 23, pow++, 2, dataPowerAlias['Soul Mesmerism'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Glossolalia'].name, dataPowerAlias['Glossolalia'].desc, 2, null, dataPowerAlias['Glossolalia'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Resurgence'].name, dataPowerAlias['Resurgence'].desc, 6, 23, pow++, 2, dataPowerAlias['Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Evanescent Emergence'].name, dataPowerAlias['Evanescent Emergence'].desc, 2, null, dataPowerAlias['Evanescent Emergence'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Howl', '<div class="Sprite Supernatural_Howl"></div>&nbsp;Howl', 6, 23, pow++, 2, 'Bestial Supernatural, 25 foot Sphere PBAoE Friend Buff and Fear<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You let loose a fierce howl, inspiring your allies and frightening your foes.<br />+ Applies Fear to nearby foes.<br />+ Applies or refreshes Furious on nearby allies.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Make them Tremble', 'Make them Tremble', 1, null, 'The enemies who hear your Howl are so terrified they have a difficult time moving, becoming Snared and Rooted for a short while.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Intimidating Force', 'Intimidating Force', 2, null, 'Howl now Knocks Down targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Command Animals', '<div class="Sprite Supernatural_CommandAnimals"></div>&nbsp;Command Animals', 6, 23, pow++, 2, 'Bestial Supernatural, Controllable Pet<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon powerful animal companions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Massacre', '<div class="Sprite Supernatural_Massacre"></div>&nbsp;Massacre', 6, 23, pow++, 3, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Knock Down<br /><br />Requires 5 powers from Bestial Supernatural or 6 non-Energy Building powers from any framework.<br /><br />You assault your foe with a powerful slash.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Bloody Mess', 'Bloody Mess', 2, null, 'Your Massacre deals additional damage to Bleeding targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['OW'].name, dataPowerAlias['OW'].desc, 2, null, dataPowerAlias['OW'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Eviscerate', '<div class="Sprite Supernatural_Eviscerate"></div>&nbsp;Eviscerate', 6, 23, pow++, 3, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed Consume<br /><br />Requires 5 powers from Bestial Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Tap<br />+ Deals Slashing damage to your target, refreshing any Bleeds currently active.<br /><br />Charge<br />+ Increases the power and cost of the tap effect.<br />+ If fully charged, replaces all of your Bleeds with Deep wounds.  Deep Wounds deals heavy Slashing damage over time, with the amount of damage scaling with the number of Bleeds consumed.  Damage from Deep wounds ignores dodge, Shields, and partially ignores resistance.<br />+ While Deep wounds is active, you cannot apply any new Bleeds.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Messy', 'Messy', 2, null, 'Eviscerate now refreshes your Shredded debuff by 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Planar Fracture'].name, dataPowerAlias['Planar Fracture'].desc, 6, 23, pow++, 4, dataPowerAlias['Planar Fracture'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Double Vortex'].name, dataPowerAlias['Double Vortex'].desc, 2, null, dataPowerAlias['Double Vortex'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Endbringers Grasp'].name, dataPowerAlias['Endbringers Grasp'].desc, 6, 23, pow++, 4, dataPowerAlias['Endbringers Grasp'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Crashing Incantation'].name, dataPowerAlias['Crashing Incantation'].desc, 6, 23, pow++, 4, dataPowerAlias['Crashing Incantation'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//------------------------------------------------------------------------------
// Power Framework: Infernal Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(24);
dataRequireGroup['supernatural'].push(24);

var pow = 0;

dataPower[dataPower.length] = new Power(dataPower.length, 'Infernal Bolts', '<div class="Sprite Supernatural_InfernalBolts"></div>&nbsp;Infernal Bolts', 6, 24, pow++, -1, 'Infernal Supernatural, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Infernal Bolts fires shards of toxic energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Toxin Overload', 'Toxin Overload', 2, null, 'Infernal Bolts has a 15% chance to apply Deadly Poison on each shot instead of just the first.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Lash', '<div class="Sprite Supernatural_Lash"></div>&nbsp;Lash', 6, 24, pow++, 0, 'Infernal Supernatural, 50 foot Ranged (Combo) Single Target Damage<br /><br />Lash swings a length of infernal chain at your enemy.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Decay', 'Decay', 2, null, 'Finishing the combo applies Debilitating Poison to the target, increasing all Elemental damage they receive by a small amount and all Toxic damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Infernal Blast', '<div class="Sprite Supernatural_InfernalBlast"></div>&nbsp;Infernal Blast', 6, 24, pow++, 0, 'Infernal Supernatural, 100 foot Ranged Single Target Damage and Poison (Blast)<br /><br />Infernal Blast is a highly focused bolt of Toxic power. Your foes will lose this war of attrition.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Virulent Propagation', 'Virulent Propagation', 2, null, 'Fully charging this power on a Poisoned target will spread the affliction to a nearby foe. This can occur for each type of Poison on the target. Refreshes the duration of all Poisons on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Devour Essence', '<div class="Sprite Supernatural_DevourEssence"></div>&nbsp;Devour Essence', 6, 24, pow++, 1, 'Infernal Supernatural, 10 foot Melee Single Target Damage and Self Heal<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Devour Essence is a parasitic attack that drains Health from your enemy and transfers it to you.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Phlebotomist', 'Phlebotomist', 2, null, 'Causes Devour Essence to Root its target for the duration of the attack, and Devour Essence will gain 150% healing from Bleeding or Poisoned targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Vile Lariat', '<div class="Sprite Supernatural_VileLariat"></div>&nbsp;Vile Lariat', 6, 24, pow++, 1, 'Infernal Supernatural, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Vile Lariat lashes out at your enemy using an infernal chain as a whip.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Fester', 'Fester', 2, null, 'Fully charging Vile Lariat debuffs your target by -5% damage strength over 12 seconds for every one of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Viral', 'Viral', 2, null, 'Applies Viral to the target for 10 seconds.  Every 2 seconds, Viral has a 25% chance to apply a stack of Deadly Poison.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Corrupt', 'Corrupt', 2, null, 'Fully charging Vile Lariat refreshes your Poison on the target.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Vicious Cyclone', '<div class="Sprite Supernatural_ViciousCyclone"></div>&nbsp;Vicious Cyclone', 6, 24, pow++, 1, 'Infernal Supernatural, 25 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Vicious Cyclone swings an infernal chain around you, lashing out at any enemies that come within its path.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Venomous Breath'].name, dataPowerAlias['Venomous Breath'].desc, 6, 24, pow++, 1, dataPowerAlias['Venomous Breath'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Paralytic Bile'].name, dataPowerAlias['Paralytic Bile'].desc, 2, null, dataPowerAlias['Paralytic Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['Infectious Bile'].name, dataPowerAlias['Infectious Bile'].desc, 2, null, dataPowerAlias['Infectious Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['Locust Breath'].name, dataPowerAlias['Locust Breath'].desc, 0, null, dataPowerAlias['Locust Breath'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Condemn', '<div class="Sprite Supernatural_Condemn"></div>&nbsp;Condemn', 6, 24, pow++, 1, 'Infernal Supernatural, 50 foot Ranged 8-15 foot Sphere AoE Damage<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Condemn causes a concentrated burst of Toxic energy to slam into your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Redemption Denied', 'Redemption Denied', 2, null, 'On a full charge, Condemn now Paralyzes your primary target and Stuns any other affected targets.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Corrupting Force', 'Corrupting Force', 2, null, 'On a full charge, Condemn applies Debilitating Poison to the target, reducing their Toxic resistance by 12% and all Elemental resistance by 8% for 16 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Dark Rune', 'Dark Rune', 2, null, '+ On a full charge, creates a Healing Rune at the primary target\\\'s location.  This rune heals all allies within it every second for 10 seconds.<br />+ You cannot have more than 1 Healing Rune active at any time.<br />+ Summoning the Healing Rune counts as an Enchantment'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Life Essence', '<div class="Sprite Supernatural_LifeEssence"></div>&nbsp;Life Essence', 6, 24, pow++, 1, 'Infernal Supernatural, 20 foot PBAoE Heal<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Heals you once per tick for an amount, and any allies within 20 feet are healed for half of that amount.  If the target is affected by any Poison, the ally healing is doubled.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Infernal Bond', 'Infernal Bond', 2, null, 'Life Essence now deals Toxic damage to the target in addition to its normal effects.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Aspect of the Infernal', '<div class="Sprite Supernatural_AspectOfTheInfernal"></div>&nbsp;Aspect of the Infernal', 6, 24, pow++, 1, 'Infernal Supernatural, Form (Intelligence or Ego)<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you apply or refresh a Poison.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Regeneration'].name, dataPowerAlias['Regeneration'].desc, 6, 24, pow++, 1, dataPowerAlias['Regeneration'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Pestilence'].name, dataPowerAlias['Pestilence'].desc, 6, 24, pow++, 1, dataPowerAlias['Pestilence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Compassion'].name, dataPowerAlias['Compassion'].desc, 2, 24, pow++, 1, dataPowerAlias['Compassion'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = new Power(dataPower.length, 'Voodoo Doll', '<div class="Sprite Supernatural_VoodooDoll"></div>&nbsp;Voodoo Doll', 6, 24, pow++, 1, 'Infernal Supernatural, Block<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Blocking an attack deals Toxic damage to the attacker.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Voodoo Curse', 'Voodoo Curse', 2, null, '+ Incoming attacks also have a small chance to Stun nearby enemies.<br />+ This effect can only occur once every 10 seconds.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Mephitic', '<div class="Sprite Supernatural_Mephitic"></div>&nbsp;Mephitic', 6, 24, pow++, 1, 'Infernal Supernatural, Energy Unlock (Endurance, Recovery)<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Geenrates energy every 3 seconds for 6 seconds every time you apply or refresh a Poison.<br />+ Additional applications will refresh the effect.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Supernatural Power'].name, dataPowerAlias['Supernatural Power'].desc, 6, 24, pow++, 1, dataPowerAlias['Supernatural Power'].tip);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Epidemic', '<div class="Sprite Supernatural_Epidemic"></div>&nbsp;Epidemic', 6, 24, pow++, 2, 'Infernal Supernatural, 25 foot Sphere PBAoE Ranged Damage and Poison<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Unleash a great plague upon your enemies.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Outbreak', 'Outbreak', 2, null, 'Reduces the maximum maintain time of this power by one second. Also increases the chance to apply Deadly Poison to 25%.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Death\'s Embrace', '<div class="Sprite Supernatural_DeathsEmbrace"></div>&nbsp;Death\'s Embrace', 6, 24, pow++, 2, 'Infernal Supernatural, Resurrection<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />brings a dead players back to life with 33/66/100% (based on rank) of their maximum health.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Pact', 'Pact', 2, null, '+ Can now bring up to 4 dead players back to life.<br />+ Healing received is divided among the number of players resurrected.'));

dataPower[dataPower.length] = new Power(dataPower.length, 'Will-o\'-the-Wisp', '<div class="Sprite Supernatural_WillOTheWisp"></div>&nbsp;Will-o\'-the-Wisp', 6, 24, pow++, 2, 'Infernal Supernatural, 100 feet, 10 foot Sphere Poison and Debuff<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Applies Debilitating Poison to your primary target.<br />+ Debilitating Poison is a type of Poison and Curse.<br />+ Applies Deadly Poison to nearby secondary targets.<br />+ Deadly Poison is a type of Poison.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Guide', 'Guide', 2, null, '+ Applies Illumination to you and nearby allies as well as Illuminated to your targets.<br /> + ' + dataPowerAlias['Illumination'].tip + '<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Cursed', 'Cursed', 2, null, 'Applies Hexed to your primary target, reducing their resistance to Magic damage by 18% for 12 seconds.  Hexed is a type of Curse'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Ghost Fire', 'Ghost Fire', 2, null, '+ Applies Clinging Flames to your primary target.  Clinging Flames is a type of Burning effect that deals Fire damage every 2 seconds for 12 seconds.<br />+ Applies Fear to your primary target.  Fear is a type of Mental state that reduces their damage strength by 10% for 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Harbinger', 'Harbinger', 2, null, 'Stuns the target for 2 seconds.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Crippling Coils', '<div class="Sprite Supernatural_CripplingCoils"></div>&nbsp;Crippling Coils', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Ranged Single Target Incapacitate<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Crippling Coils sends chains through the ground to latch on to your foe, preventing them from attacking or even moving.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Barbed Chains', 'Barbed Chains', 2, null, 'Any time an opponent breaks free from a Hold while affected by Crippling Coils they take a moderate amount of Slashing damage and begin Bleeding.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Light Everlasting', 'Light Everlasting', 2, null, '+ If Crippling Coils is maintained for more than 1 second, applies Light Everlasting to allies near you.<br />+ ' + dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Curse', '<div class="Sprite Supernatural_Curse"></div>&nbsp;Curse', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Ranged 15 foot AoE Target Damage Stun<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Toxic Damage.<br />+ Briefly Stuns the primary target.<br />+ briefly Stuns any secondary targets affected by any Poison.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Jinxed', 'Jinxed', 2, null, '+ Applies Jinxed to your targets.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, 'Needles', 'Needles', 2, null, '+ Applies Bleeding to your target if they aren\\\'t already Bleeding.<br />+ Bleeding is a type of Wound.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, 'Covet', 'Covet', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, 'Corrosion', 'Corrosion', 2, null, 'Refreshes all of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Locust Swarm', '<div class="Sprite Supernatural_LocustSwarm"></div>&nbsp;Locust Swarm', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Single Target Hold<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You call a swarm of locusts on your foe, preventing them from taking any actions.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Festering Bites', 'Festering Bites', 2, null, 'Each time your Locust Swarm deals damage, it has a 15% chance to apply Deadly Poison, which stacks up to 5 times and causes your target to suffer Toxic Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Soul Mesmerism'].name, dataPowerAlias['Soul Mesmerism'].desc, 6, 24, pow++, 2, dataPowerAlias['Soul Mesmerism'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Glossolalia'].name, dataPowerAlias['Glossolalia'].desc, 2, null, dataPowerAlias['Glossolalia'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Resurgence'].name, dataPowerAlias['Resurgence'].desc, 6, 24, pow++, 2, dataPowerAlias['Resurgence'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Evanescent Emergence'].name, dataPowerAlias['Evanescent Emergence'].desc, 2, null, dataPowerAlias['Evanescent Emergence'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(dataPower.length, 'Entrancing', '<div class="Sprite Supernatural_Entrancing"></div>&nbsp;Entrancing', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Single Target Threat Wipe<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

// removed from game
// dataPower[dataPower.length] = new Power(dataPower.length, 'Aspect of the Ethereal', '<div class="Sprite Supernatural_AspectOfTheEthereal"></div>&nbsp;Aspect of the Ethereal', 6, 24, pow++, 2, 'Infernal Supernatural, Self Buff Form<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You focus on your connection with your Infernal powers, increasing their effect.');
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Defile', '<div class="Sprite Supernatural_Defile"></div>&nbsp;Defile', 6, 24, pow++, 3, 'Infernal Supernatural, 100 foot Ranged Single Target Damage and Debuff<br /><br />Requires 5 powers from Infernal Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Defile greatly damages your target and weakens their resistance to toxic damage.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Plague Bearer', 'Plague Bearer', 2, null, 'Fully charging Defile places an AoE Toxic DoT on your target. The target and other foes within 10 feet take Toxic Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, 'Rebirth', '<div class="Sprite Supernatural_Rebirth"></div>&nbsp;Rebirth', 6, 24, pow++, 3, 'Infernal Supernatural, Self Resurrection and Heal<br /><br />Requires 5 powers from Infernal Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Can be used while dead to resurrect with 100% of your maximum health and grants you the following for 20 seconds:<br /><br />+ 100% to damage strength.<br />+ 100% resistance to all damage.<br />+ Killing foes restores a portion of your health.<br />- Lose health equal to 5% of your maximum health every second.<br />- Shares a cooldown with similar powers.');
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, 'Grave Consequences', 'Grave Consequences', 2, null, 'Summons three Zombies to help your return to the land of the living succeed.'));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Planar Fracture'].name, dataPowerAlias['Planar Fracture'].desc, 6, 24, pow++, 4, dataPowerAlias['Planar Fracture'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(3, dataPowerAlias['Double Vortex'].name, dataPowerAlias['Double Vortex'].desc, 2, null, dataPowerAlias['Double Vortex'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Endbringers Grasp'].name, dataPowerAlias['Endbringers Grasp'].desc, 6, 24, pow++, 4, dataPowerAlias['Endbringers Grasp'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(dataPower.length, dataPowerAlias['Crashing Incantation'].name, dataPowerAlias['Crashing Incantation'].desc, 6, 24, pow++, 4, dataPowerAlias['Crashing Incantation'].tip);
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(new PowerAdvantage(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

//==============================================================================
// Specializations (set with their specialization trees)
//==============================================================================

// specialization class
/**@constructor*/
Specialization = function(id, name, desc, tier, maxPoints, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.tier = tier;
    this.maxPoints = maxPoints;
    this.tip = tip;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.getPoints = function(mask) {
        var points = 0;
        if (mask > 0) {
            var test1 = Math.pow(2, this.id*2);
            var test2 = Math.pow(2, this.id*2 + 1);
            if ((mask & test1) == test1) points += 1;
            if ((mask & test2) == test2) points += 2;
        }
        return points;
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', maxPoints=' + this.maxPoints + ', tip=\'' + this.tip + '\', code=' + this.code() + ']';
    }
}

//==============================================================================
// Specialization Trees
//==============================================================================

// helper lookup functions
var dataSuperStatIdFromName = [];
for (var i = 0; i < dataSuperStat.length; i++) {
    dataSuperStatIdFromName[dataSuperStat[i].name] = dataSuperStat[i].id;
}

// specialization tree
/**@constructor*/
SpecializationTree = function(id, name, desc, superStat, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.superStat = (superStat == null) ? null : dataSuperStatIdFromName[superStat];
    this.tip = tip;
    this.specializationList = [];
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.getSpecializationList = function(mask) {
        var specializationList = [];
        for (var i = 0; i < this.specializationList.length; i++) {
            if (mask > 0) {
                var test1 = Math.pow(2, i*2);
                var test2 = Math.pow(2, i*2 + 1);
                var num = 0;
                if ((mask & test1) == test1) num += 1;
                if ((mask & test2) == test2) num += 2;
                specializationList[i] = num;
            } else {
                specializationList[i] = 0;
            }
        }
        return specializationList;
    }
    this.getPoints = function(mask) {
        var points = 0;
        if (mask > 0) {
            var specializationList = this.getSpecializationList(mask);
            for (var i = 0; i < specializationList.length; i++) {
                points += specializationList[i];
            }
        }
        return points;
    }
    this.getTierPoints = function(mask, tier) {
        var points = 0;
        if (mask > 0) {
            var specializationList = this.getSpecializationList(mask);
            for (var i = 0; i < specializationList.length; i++) {
                if (this.specializationList[i].tier == tier) points += specializationList[i];
            }
        }
        return points;
    }
    this.hasSpecialization = function(mask, id) {
        var test1 = Math.pow(2, id*2);
        var test2 = Math.pow(2, id*2 + 1);
        return (mask > 0 && ((mask & test1) == test1) || ((mask & test2) == test2));
    }
    this.incrSpecialization = function(mask, id) {
        var points = this.specializationList[id].getPoints(mask);
        if (points < this.specializationList[id].maxPoints) {
            points++;
            var base = mask & ~Math.pow(2, id*2) & ~Math.pow(2, id*2 + 1);
            switch (points) {
            case 0: return base; break;
            case 1: return base | Math.pow(2, id*2); break;
            case 2: return base | Math.pow(2, id*2 + 1); break;
            case 3: return base | Math.pow(2, id*2) | Math.pow(2, id*2 + 1); break;
            }
        } else {
            return mask;
        }
    }
    this.decrSpecialization = function(mask, id) {
        var points = this.specializationList[id].getPoints(mask);
        if (points > 0) {
            points--;
            var base = mask & ~Math.pow(2, id*2) & ~Math.pow(2, id*2 + 1);
            switch (points) {
            case 0: return base; break;
            case 1: return base | Math.pow(2, id*2); break;
            case 2: return base | Math.pow(2, id*2 + 1); break;
            case 3: return base | Math.pow(2, id*2) | Math.pow(2, id*2 + 1); break;
            }
        } else {
            return mask;
        }
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        var specializationList = '[';
        for (var i = 1; i < this.specializationList.length; i++) {
            if (i > 1) specializationList = specializationList + ',';
            specializationList = specializationList + '<br /> &nbsp;&nbsp;&nbsp;&nbsp; ' + this.specializationList[i].toString();
        }
        specializationList = specializationList + '<br />]';
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', superStat=\'' + ((this.superStat == null) ? 'null' : dataSuperStat[this.superStat].name) + '\', tip=\'' + this.tip + '\', specializationList=' + specializationList + ', code=' + this.code() + ']';
    }
}

// specialization tree data
var dataSpecializationTree = [];
dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, null, null, null, null);

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Strength', 'Strength', 'Strength', 'Primary Super Stat Strength');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Swole', '<div class="Sprite Brick_Defiance"></div>&nbsp;Swole', 1, 3, 'Strength now also grants you +1/2/3 Maximum Health Points.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Physical Peak', '<div class="Sprite SuperStat_Constitution"></div>&nbsp;Physical Peak', 1, 3, 'Your Secondary Super Stats now grant a cost discount to your Melee powers.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Quick Recovery', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Quick Recovery', 1, 2, 'Your Recovery increases your Health Regeneration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Aggression', '<div class="Sprite Might_Retaliation"></div>&nbsp;Aggression', 1, 2, 'Increases the amount of Offense your receive from items by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Balance', '<div class="Sprite SuperStat_Strength"></div>&nbsp;Balance', 2, 2, 'Your Strength now grants Knock bonuses to your Ranged Knock powers, equal to 25/50% of the bonus it grants your Melee powers. However, this Specialization causes your Ego to no longer affect the Knock Strength of your Ranged powers.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Brutality', '<div class="Sprite Might_Demolish"></div>&nbsp;Brutality', 2, 2, 'Your Secondary Super Stats now increase your Critical Severity.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Juggernaut', '<div class="Sprite Framework_Might"></div>&nbsp;Juggernaut', 2, 3, 'Your Constitution now grants Defense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Overpower', '<div class="Sprite Might_Clobber"></div>&nbsp;Overpower', 2, 3, 'Your Strength now increases your Melee Critical Chance.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Strength Mastery', '<div class="Sprite SuperStat_Strength"></div>&nbsp;Strength Mastery', 3, 1, 'Gain 20 Strength and 30 Offense.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Dexterity', 'Dexterity', 'Dexterity', 'Primary Super Stat Dexterity');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Combat Training', '<div class="Sprite Brick_Defiance"></div>&nbsp;Combat Training', 1, 3, 'Offense now also grants Critical Strike Rating.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Gear Utilization', '<div class="Sprite Specialization_GearUtilization"></div>&nbsp;Gear Utilization', 1, 3, 'Increases the amount of Offense and Defense you receive from items by 6/12/18%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Brush It Off', '<div class="Sprite Specialization_BrushItOff"></div>&nbsp;Brush It Off', 1, 2, 'Increases your chance to Dodge AoE attacks by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Power Swell', '<div class="Sprite Specialization_PowerSwell"></div>&nbsp;Power Swell', 1, 2, 'Whenever you get a Critical Strike, the cost of your next Damage or Healing power activation is reduced by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Evasion', '<div class="Sprite Archery_EvasiveManeuvers"></div>&nbsp;Evasion', 2, 2, 'Your Secondary Super Stats now grant Avoidance Rating.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Deadly Aim', '<div class="Sprite Specialization_DeadlyAim"></div>&nbsp;Deadly Aim', 2, 3, 'Your Secondary Super Stats now increase your Critical Severity.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Expose Weakness', '<div class="Sprite Munitions_SniperRifle"></div>&nbsp;Expose Weakness', 2, 2, 'Whenever you Critically Strike a foe, you reduce their resistance to your attacks by 1/2% for 10 seconds. This effect stacks up to 5 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Quick Reflexes', '<div class="Sprite MartialArts_MasterfulDodge"></div>&nbsp;Quick Reflexes', 2, 3, 'Your Dexterity now grants Dodge Chance Rating.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Dexterity Mastery', '<div class="Sprite SuperStat_Dexterity"></div>&nbsp;Dexterity Mastery', 3, 1, 'You gain 20 Dexterity and 10 Critical Severity Rating and Avoidance Rating.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Constitution', 'Constitution', 'Constitution', 'Primary Super Stat Constitution');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Unyielding', '<div class="Sprite PowerArmor_Invulnerability"></div>&nbsp;Unyielding', 1, 2, 'Your Constitution now increases your Hold Restistance.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Fuel My Fire', '<div class="Sprite Specialization_FuelMyFire"></div>&nbsp;Fuel My Fire', 1, 3, 'Taking damage grants you 2/4/6% of your Maximum Energy. This effect can only occur once per second.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Tough', '<div class="Sprite Brick_Defiance"></div>&nbsp;Tough', 1, 3, 'Your Secondary Super Stats now provide an additional 0.5/1/1.5 Maximum Health Points.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Resilient', '<div class="Sprite PowerArmor_Unbreakable"></div>&nbsp;Resilient', 1, 2, 'Your Constitution now increases your Knock Resistance.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Deflection', '<div class="Sprite MartialArts_Parry"></div>&nbsp;Deflection', 2, 3, 'Your Dexterity now grants Dodge Chance Rating.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Quick Healing', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Quick Healing', 2, 3, 'Your Secondary Super Stats increase your Health Regeneration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Adrenaline Rush', '<div class="Sprite SuperStat_Constitution"></div>&nbsp;Adrenaline Rush', 2, 2, 'Whenever one of your attacks critically hits, you are healed for 1/2% of your Maximum Health.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Armored', '<div class="Sprite Specialization_Armored"></div>&nbsp;Armored', 2, 2, 'Increases the amount of Defense you receive from items by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Constitution Mastery', '<div class="Sprite SuperStat_Constitution"></div>&nbsp;Constitution Mastery', 3, 1, 'You gain 20 Constitution and Defense.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Intelligence', 'Intelligence', 'Intelligence', 'Primary Super Stat Intelligence');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Preparation', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Preparation', 1, 2, 'Your Endurance increases your Equilibrium.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Enlightened', '<div class="Sprite Mentalist_MindLink"></div>&nbsp;Enlightened', 1, 3, 'Your non-Super Stats grant 10/20/30% more than their normal stated bonuses.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Tactician', '<div class="Sprite Specialization_Tactician"></div>&nbsp;Tactician', 1, 2, 'Your Secondary Super Stats now grant Offense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Battle of Wits', '<div class="Sprite Sorcery_AuraOfEbonDestruction"></div>&nbsp;Battle of Wits', 1, 3, 'Your Intelligence now grants a bonus to Hold Strength.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Revitalize', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Revitalize', 2, 3, 'Your Energy Builder reduces the remaining recharge time of all your currently recharging abilities by 2/4/6%. This effect can only occur once every 6 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Detect Vulnerability', '<div class="Sprite PowerArmor_TargetingComputer"></div>&nbsp;Detect Vulnerability', 2, 3, 'Your Intelligence now grants Defense Penetration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Tinkering', '<div class="Sprite Specialization_Tinkering"></div>&nbsp;Tinkering', 2, 2, 'Increases the amount of Offense and Defense you receive from items by 6/12%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Expertise', '<div class="Sprite Specialization_Expertise"></div>&nbsp;Expertise', 2, 2, 'Your Secondary Super Stats grant 10/20% more of their normal stated bonuses. (This does not affect the bonus Damage, Healing, or Threat modifiers granted from your Secondary Super Stats, only the default bonuses of those stats.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Intelligence Mastery', '<div class="Sprite SuperStat_Intelligence"></div>&nbsp;Intelligence Mastery', 3, 1, 'Increases all of your non-Super Stats by 10.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Ego', 'Ego', 'Ego', 'Primary Super Stat Ego');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Mental Endurance', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Mental Endurance', 1, 3, 'Increases the amount of Maximum Energy your Recovery grants by 33/67/100%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Force of Will', '<div class="Sprite Telepathy_TelepathicReverberation"></div>&nbsp;Force of Will', 1, 2, 'Your Secondary Super Stats now grant Defense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Insight', '<div class="Sprite Sorcery_CircleOfPrimalDominion"></div>&nbsp;Insight', 1, 3, 'Your Ego now grants a Cost Discount to your Ranged powers.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Aggression', '<div class="Sprite Might_Retaliation"></div>&nbsp;Aggression', 1, 2, 'Increases the amount of Offense you receive from items by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Follow Through', '<div class="Sprite Telekinesis_EgoBladeBreach"></div>&nbsp;Follow Through', 2, 3, 'Your Ego now increases your Critical Severity.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Exploit Opening', '<div class="Sprite Telekinesis_Telekinesis"></div>&nbsp;Exploit Opening', 2, 2, 'Whenever you Critically Strike a foe, your next non-Critical Strike deals additional Damage equal to 15/30% of your Critical Severity.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Sixth Sense', '<div class="Sprite SuperStat_Ego"></div>&nbsp;Sixth Sense', 2, 3, 'Your Secondary Super Stats now increase your Critical Chance.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Mind over Matter', '<div class="Sprite Telekinesis_Telekinesis"></div>&nbsp;Mind over Matter', 2, 2, 'Your Ego now grants Knock bonuses to your Melee Knock powers, equal to 25/50% the bonus it grants your Ranged powers. However, this Specialization causes your Strength to no longer affect the Knock Strength of your Melee powers.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Ego Mastery', '<div class="Sprite SuperStat_Ego"></div>&nbsp;Ego Mastery', 3, 1, 'Increases your Secondary Super Stats by 20.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Presence', 'Presence', 'Presence', 'Primary Super Stat Presence');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Repurpose', '<div class="Sprite MartialArts_BountifulChiResurgence"></div>&nbsp;Repurpose', 1, 3, 'Your Offense from items now grants 0.1/0.2/0.3% Bonus Healing for each point of Offense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Selfless Ally', '<div class="Sprite Celestial_Ascension"></div>&nbsp;Selfless Ally', 1, 2, 'Healing a friendly target heals you for 5/10% of that amount.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Dominion', '<div class="Sprite Sorcery_BindingOfAratron"></div>&nbsp;Dominion', 1, 2, 'Increases the amount of Hold Strength your Presence grants by 25/50%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Grandeur', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Grandeur', 1, 3, 'You gain 1/2/3 Offense for every 10 Presence you have.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Brilliance', '<div class="Sprite Celestial_Illumination"></div>&nbsp;Brilliance', 2, 3, 'Your Critical Heals now increase the healing you do to that target by 1/2/3% for 10 seconds. This effect stacks up to 3 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Moment of Glory', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Moment of Glory', 2, 3, 'Your Secondary Super Stats now increase your Critical Chance.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Force of Will', '<div class="Sprite Telepathy_TelepathicReverberation"></div>&nbsp;Force of Will', 2, 2, 'Your Secondary Super Stats now grant Defense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Vulnerability', '<div class="Sprite Supernatural_DevourEssence"></div>&nbsp;Vulnerability', 2, 2, 'Your Paralyze and Sleep effects now decrease the target\\\'s Resistances by 5/10% for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Presence Mastery', '<div class="Sprite SuperStat_Recovery"></div>&nbsp;Presence Mastery', 3, 1, 'Your direct Heals also Shield your target for 10% of the amount Healed, and your direct Shields also grant the target 10% additional Healing received. Both of these effects last 6 seconds.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Recovery', 'Recovery', 'Recovery', 'Primary Super Stat Recovery');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Gear Utilization', '<div class="Sprite Specialization_GearUtilization"></div>&nbsp;Gear Utilization', 1, 3, 'Increases the amount of Offense and Defense you receive from items by 6/12/18%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Withstand', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Withstand', 1, 2, 'You gain 1/2 Crowd Control Resistance Rating for every 20 points you have in your Secondary Super Stats.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Rapid Recovery', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Rapid Recovery', 1, 3, 'Your Recovery increases your Health Regeneration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Staying Power', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Staying Power', 1, 2, 'Increases the amount of Maximum Energy your Recovery grants by 50/100%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Super Charged', '<div class="Sprite Specialization_SuperCharged"></div>&nbsp;Super Charged', 2, 3, 'When your Energy level is above 90%, your chance to Critically Strike is increased 5/10/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Efficient', '<div class="Sprite Electricity_IonicReverberation"></div>&nbsp;Efficient', 2, 3, 'Increases the amount of Energy gained from Energy Unlock powers by 5/10/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Well Rounded', '<div class="Sprite Sorcery_AuraOfPrimalMajesty"></div>&nbsp;Well Rounded', 2, 2, 'Your non-Super Stats increase your Maximum Health by 1/2 and Maximum Energy by 0.1/0.2.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Second Wind', '<div class="Sprite Wind_Stormbringer"></div>&nbsp;Second Wind', 2, 2, 'Your Secondary Super Stats increase your Power Recharge Speed.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Recovery Mastery', '<div class="Sprite SuperStat_Recovery"></div>&nbsp;Recovery Mastery', 3, 1, 'Increases all of your Super Stats by 10.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Endurance', 'Endurance', 'Endurance', 'Primary Super Stat Endurance');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Readiness', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Readiness', 1, 3, 'Your Endurance increases your Equilibrium.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Withstand', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Withstand', 1, 2, 'You gain 1 Crowd Control Resistance Rating for every 20 points you have in your Secondary Super Stats.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Gear Utilization', '<div class="Sprite Specialization_GearUtilization"></div>&nbsp;Gear Utilization', 1, 3, 'Increases the amount of Offense and Defense you receive from items by 6/12/18%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Kickback', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Kickback', 1, 2, 'Your Energy Builder causes your next non-Energy Builder attack to grant 5/10% of your Maximum Energy.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Quick Recovery', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Quick Recovery', 1, 2, 'Your Recovery increases your Health Regeneration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Outburst', '<div class="Sprite Specialization_SuperCharged"></div>&nbsp;Outburst', 2, 3, 'When your Energy is above 90%, the Damage, Healing, and Energy Costs of your powers are increased by 5/10/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Power Overwhelming', '<div class="Sprite Fire_ThermalReverberation"></div>&nbsp;Power Overwhelming', 2, 3, 'Your Secondary Super Stats now grant Offense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Hardened', '<div class="Sprite SuperStat_Constitution"></div>&nbsp;Hardened', 2, 2, 'Your Endurance now provides an additional 2/4 Maximum Health Points.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Endurance Mastery', '<div class="Sprite SuperStat_Endurance"></div>&nbsp;Endurance Mastery', 3, 1, 'You gain 3% of your Maximum Energy when certain criteria are met, dependent on your Role:<br /><br />Tank Role: Whenever you take Damage. This effect can only occur once every 3 seconds.<br /><br />Melee Damage or Ranged Damage Roles: Whenever you deal Damage. This effect can only occur once every 3 seconds.<br /><br />Support Role: Whenever you Heal a target. This effect can only occur once every 3 seconds.<br /><br />Hybrid Role: Every 5 seconds you are in combat.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Protector', 'Protector', null, 'Pure Tank');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Fortified Gear', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Fortified Gear', 1, 3, 'Increases the amount of Defense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Beacon of Hope', '<div class="Sprite Celestial_Illumination"></div>&nbsp;Beacon of Hope', 1, 3, 'Increase healing received from others by 3/6/9%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Unrelenting', '<div class="Sprite Specialization_Unrelenting"></div>&nbsp;Unrelenting', 1, 2, 'Snares no longer reduce your Movement Speed, and your Run Speed is increased by 10/20%. These effects do not apply when your travel powers are active.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Bulwark', '<div class="Sprite Might_Retaliation"></div>&nbsp;Bulwark', 1, 2, 'Increases your Maximum Health by 5/10% when not in the Hybrid role. When in the Hybrid role, this Specialization instead causes your Super Stats to increase your Threat Generation.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Debilitating Challenge', '<div class="Sprite Specialization_DebilitatingChallenge"></div>&nbsp;Debilitating Challenge', 2, 2, 'Your Crippling Challenge now also lowers the Damage Resistance of your target by 2/4%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Exhausting Strikes', '<div class="Sprite Specialization_ExhaustingStrikes"></div>&nbsp;Exhausting Strikes', 2, 2, 'Your Energy Builder attacks now reduce your primary target\\\'s Damage dealt by 5/10% for 10 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Defensive Expertise', '<div class="Sprite Brick_Unstoppable"></div>&nbsp;Defensive Expertise', 2, 3, 'Your Active Defense powers benefit from an additional 7/14/21% Power Recharge Reduction.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Resolute', '<div class="Sprite PowerArmor_Unbreakable"></div>&nbsp;Resolute', 2, 3, 'Whenever you are Knocked or Held, you regain 2/4/6% of your Maximum Health over the next 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Protector Mastery', '<div class="Sprite blank"></div>&nbsp;Protector Mastery', 3, 1, 'Whenever a damaging attack brings you below 30% Health, the Recharge Time on your Active Defense powers is reset. This effect can only occur once every 60 seconds.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Brawler', 'Brawler', null, 'Pure Melee');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'The Glory of Battle', '<div class="Sprite FightingClaws_FormOfTheTiger"></div>&nbsp;The Glory of Battle', 1, 3, 'Your AoE attacks grant a stack of Glory for each target they hit. When you reach 30 stacks of Glory, the stack is consumed and becomes Glorious Battle, which grants you 16/33/49 Offense and Critical Strike Rating. Glorious Battle lasts for 15 seconds, and prevents you from gaining additional stacks of Glory for the duration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'No Escape', '<div class="Sprite Specialization_NoEscape"></div>&nbsp;No Escape', 1, 3, 'Your Energy Builder has a 33/67/100% chance to Daze your target for 4 seconds if they are within 10 feet of you. Dazed characters move 20% slower.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Penetrating Strikes', '<div class="Sprite FightingClaws_TigersBite"></div>&nbsp;Penetrating Strikes', 1, 2, 'Your Melee Critical Strikes Debuff your target, causing further attacks to ignore 5/10% of the target\\\'s Resistance. Lasts for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Finishing Blow', '<div class="Sprite Specialization_FinishingBlow"></div>&nbsp;Finishing Blow', 2, 3, 'Your Single Target attacks now do an additional 3.3/6.7/10% Base Damage to targets under 35% Health.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Setup', '<div class="Sprite DualBlades_RainOfSteel"></div>&nbsp;Setup', 2, 2, 'Your Melee Combo attacks have an increasing chance to cause your next non-Combo Melee attack to deal an additional 10/20% Base Damage.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Flanking', '<div class="Sprite FightingClaws_DragonsClaws"></div>&nbsp;Flanking', 2, 3, 'Increases the Melee Damage you deal from behind your target by 3.3/6.7/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Offensive Expertise', '<div class="Sprite MartialArts_Intensity"></div>&nbsp;Offensive Expertise', 2, 2, 'Your Active Offense powers benefit from an additional 7/14% Power Recharge Reduction.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Brawler Mastery', '<div class="Sprite blank"></div>&nbsp;Brawler Mastery', 3, 1, 'Whenever you lunge, the Base Damage of your next Melee attack is increased by % [unknown value]. This effect can only occur once every 10 seconds.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Avenger', 'Avenger', null, 'Pure Range');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Can\'t Touch This', '<div class="Sprite Specialization_CantTouchThis"></div>&nbsp;Can\'t Touch This', 1, 3, 'When your Energy Builder deals Damage it has a 33/67/100% chance to Daze your target for 4 seconds if they are more than 10 feet away from you. Dazed characters move 20% slower.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Anguish', '<div class="Sprite Specialization_Anguish"></div>&nbsp;Anguish', 1, 2, 'Whenever you Critically Strike with a Ranged attack, you deal an additional N Penetrating Damage every 2 seconds for 6 seconds. (Penetrating Damage is only resisted by Resistance to all damage, and ignores half of that Resistance. Penetrating Damage also ignores half of the absorption provided by Shields.)'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Round \'em Up', '<div class="Sprite Might_IronCyclone"></div>&nbsp;Round \'em Up', 1, 3, 'Your AoE attacks cause your targets to take 1/2/3% more Damage from further AoE attacks you make. Stacks up to 3 times and lasts 10 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Surprise Attack', '<div class="Sprite Electricity_Electrocute"></div>&nbsp;Surprise Attack', 2, 2, 'Your Single Target attacks now have an additional 10/20% Critical Chance on targets above 90% Health.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Relentless Assault', '<div class="Sprite Supernatural_AspectOfTheInfernal"></div>&nbsp;Relentless Assault', 2, 3, 'Your Maintained attacks increase your Offense by 10/20/30 for 8 seconds. Stacks up to 5 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Offensive Expertise', '<div class="Sprite MartialArts_Intensity"></div>&nbsp;Offensive Expertise', 2, 2, 'Your Active Offense powers benefit from an additional 7/14% Power Recharge Reduction.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Preemptive Strike', '<div class="Sprite Fire_ThrowFire"></div>&nbsp;Preemptive Strike', 2, 3, 'Your Ranged Blast attacks cause your next non-Blast Ranged attack to deal an additional 5/10/15% Base Damage.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Avenger Mastery', '<div class="Sprite blank"></div>&nbsp;Avenger Mastery', 3, 1, 'Whenever you get 2 Critical attacks within 5 seconds, your next Blast power has its Charge Time reduced by 50%.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Sentinel', 'Sentinel', null, 'Pure Support');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Torment', '<div class="Sprite Specialization_Torment"></div>&nbsp;Torment', 1, 2, 'Increases the duration of your Hold powers by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Eternal Spring', '<div class="Sprite Telepathy_EmpathicHealing"></div>&nbsp;Eternal Spring', 1, 2, 'Your Critical Heals heal for an additional 10/20% over 6 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Caregiver', '<div class="Sprite Specialization_Caregiver"></div>&nbsp;Caregiver', 1, 3, 'The strength of your Heals and Shields on other players is increased by 4/8/12%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Sentinel Aura', '<div class="Sprite Specialization_SentinelAura"></div>&nbsp;Sentinel Aura', 1, 3, 'You and your teammates regain N Health every 3 seconds. This number is based on your level, and is affected by your Bonus Healing.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Moment of Need', '<div class="Sprite Specialization_MomentOfNeed"></div>&nbsp;Moment of Need', 2, 3, 'Increase your chance to get a Critical Heal effect by 3/6/9%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Rejuvenated', '<div class="Sprite Telepathy_TelepathicReverberation"></div>&nbsp;Rejuvenated', 2, 3, 'Your Active Heal over Time (HoT) ticks have a 33/67/100% chance to grant you 5.9 Energy. This effect can only occur once every 2 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Wither', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Wither', 2, 2, 'Your Hold effects (Paralyze, Stun, Sleep) now also cause your target to take an additional 5/10% Damage.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Genesis', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Genesis', 2, 2, 'Reduces the Energy Cost of your Heals, Shields, Confuses, Incapacitates, Paralyzes, and Placates by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Sentinel Mastery', '<div class="Sprite blank"></div>&nbsp;Sentinel Mastery', 3, 1, 'Your Paralyze, Incapacitate, Stun, and Sleep effects cause allies who strike the affected target to be Healed for 2% of their Maximum Health. A target can only be affected by this Heal once every second. The duration of this effect lasts up to 8 seconds, but is dependent on the Rank of your target.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Commander', 'Commander', null, 'Pure Pet');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Evasive Action', '<div class="Sprite Archery_EvasiveManeuvers"></div>&nbsp;Evasive Action', 1, 2, 'Grants your pet an additional 25/50% Resistance to all damage against AoE attacks.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Rapid Response', '<div class="Sprite Specialization_RapidResponse"></div>&nbsp;Rapid Response', 1, 2, 'Decrease the summon time of your pet powers by 0.5/1 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Create An Opening', '<div class="Sprite Specialization_CreateAnOpening"></div>&nbsp;Create An Opening', 1, 2, 'Whenever you Critically Strike, your pets Critical Strike Chance is increased by 10/20% for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Multitasker', '<div class="Sprite Gadgeteering_SupportDrones"></div>&nbsp;Multitasker', 1, 3, 'Reduces the Energy penalty caused by having pets out by 17/33/50%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Well Trained', '<div class="Sprite Supernatural_Lash"></div>&nbsp;Well Trained', 2, 2, 'The recharge time of all of your pet\\\'s abilities is reduced by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Durable', '<div class="Sprite LaserSword_LightspeedStrike"></div>&nbsp;Durable', 2, 3, 'Your Secondary Super Stats now further increase the pet Health and the amount of healing pets receive.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Relief', '<div class="Sprite Gadgeteering_ResurrectionSerum"></div>&nbsp;Relief', 2, 3, 'Your Secondary Super Stats now further increase the healing done by your pets.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Savage', '<div class="Sprite Supernatural_Bite"></div>&nbsp;Savage', 2, 3, 'Your Secondary Super Stats now further increase the Damage dealt by your pets.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Commander Mastery', '<div class="Sprite blank"></div>&nbsp;Commander Mastery', 3, 1, 'Increases the Base Damage of your pets by 10%.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Warden', 'Warden', null, 'Melee / Tank');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Fortified Gear', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Fortified Gear', 1, 3, 'Increases the amount of Defense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Slaughter', '<div class="Sprite HeavyWeapon_Skullcrusher"></div>&nbsp;Slaughter', 1, 3, 'Increases the Critical Strike chance of your Melee Combo attacks by 3/6/9%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Elusive', '<div class="Sprite MartialArts_LightningReflexes"></div>&nbsp;Elusive', 1, 2, 'Increases your Resistance to AoE attacks by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Reactive Strikes', '<div class="Sprite HeavyWeapon_Guard"></div>&nbsp;Reactive Strikes', 2, 2, 'Single Target attacks made against you have a 10% chance to deal 10/20% of that Damage back to the attacker as Penetrating Damage. (Penetrating Damage is only resisted by Resistance to all damage, and ignores half of that Resistance. Penetrating Damage also ignores half of the absorption provided by Shields.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Tenacious', '<div class="Sprite Might_Clobber"></div>&nbsp;Tenacious', 2, 2, 'Whenever you take Damage, you gain 5/10 Offense. This effect lasts 15 seconds, stacks up to 5 times, and can only occur once per second.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Upper Hand', '<div class="Sprite HeavyWeapon_Bludgeon"></div>&nbsp;Upper Hand', 2, 3, 'Increases Melee Damage you deal to targets affected by Disorient, Bleed, Shredded, Ego Leech, and Stagger by 2/4/6%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'The Best Defense', '<div class="Sprite Munitions_KillerInstinct"></div>&nbsp;The Best Defense', 2, 3, 'You gain 33/67/100% of your Defense as Offense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Warden Mastery', '<div class="Sprite blank"></div>&nbsp;Warden Mastery', 3, 1, 'Increases the Damage of your Combo powers by 10%, and whenever you finish a Combo you gain a stack of Grit. Grit increases your Damage Resistance by 3%, and stacks up to 3 times.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Guardian', 'Guardian', null, 'Range / Tank');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Fortified Gear', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Fortified Gear', 1, 3, 'Increases the amount of Defense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Locus', '<div class="Sprite Fire_Pyre"></div>&nbsp;Locus', 1, 2, 'When you strike with or are struck by an AoE, you gain a stack of Locus. When you reach 30 stacks of Locus, the stack is consumed and becomes Locus Eruption, which grants you 25/49 Offense and Defense. Locus Eruption lasts for 15 seconds, and prevents you from gaining additional stacks of Locus for the duration.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Make It Count', '<div class="Sprite Electricity_LightningArc"></div>&nbsp;Make It Count', 1, 3, 'Increases the Damage and decreases the cost of your Blast attacks by 2/4/6%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Retribution', '<div class="Sprite Specialization_Retribution"></div>&nbsp;Retribution', 2, 2, 'Single Target attacks made against you have a 10% chance to trigger Retribution on you for 6 seconds, which grants you 5/10% all Damage Strength and 30 Health Points every 2 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Tenacious', '<div class="Sprite Might_Clobber"></div>&nbsp;Tenacious', 2, 2, 'Whenever you take Damage, you gain 5/10 Offense. This effect lasts 15 seconds, stacks up to 5 times, and can only occur once per second.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Find the Mark', '<div class="Sprite Archery_SnapShot"></div>&nbsp;Find the Mark', 2, 3, 'Your Ranged attacks have a 10/20/30% chance to Expose your target. Expose increases your chance to Critically Strike that target with Ranged attacks by 3% for 10 seconds and stacks up to 3 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'The Best Defense', '<div class="Sprite Munitions_KillerInstinct"></div>&nbsp;The Best Defense', 2, 3, 'You gain 33/67/100% of your Defense as Offense.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Guardian Mastery', '<div class="Sprite blank"></div>&nbsp;Guardian Mastery', 3, 1, 'Your Blast powers give you a stack of Alacrity, which reduces the charge time of Blast powers by 3% and grants you 9 Dodge Chance Rating. Alacrity stacks up to 3 times.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Sentry', 'Sentry', null, 'Support / Tank');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Fortified Gear', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Fortified Gear', 1, 3, 'Increases the amount of Defense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Twist Fate', '<div class="Sprite Specialization_TwistFate"></div>&nbsp;Twist Fate', 1, 2, 'Your Energy Builder grants stacks of Twist Fate for 5 seconds. Each stack increases your Dodge and Crit Chance by 1.5/3%. Stacks up to 3 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Precise', '<div class="Sprite Specialization_Caregiver"></div>&nbsp;Precise', 1, 3, 'The strength of your Single Target attacks and your Heals and Shields on other players is increased by 3/6/9%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Sentry Aura', '<div class="Sprite Specialization_SentryAura"></div>&nbsp;Sentry Aura', 1, 3, 'You and your teammates gain an additional 2/4/6% Resistance to all damage.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Fortify', '<div class="Sprite Telekinesis_TelekineticMaelstrom"></div>&nbsp;Fortify', 2, 2, 'Whenever you get a Critical Effect (from Damage or Healing powers) you gain Fortify, which lasts 10 seconds and stacks up to 3 times. Each stack increases your Healing Strength and Damage Resistance by 1/2%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Stalling Tactics', '<div class="Sprite Specialization_StallingTactics"></div>&nbsp;Stalling Tactics', 2, 3, 'Increases the duration of your Stun, Sleep, and Snare effects by 5/10/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Persevere', '<div class="Sprite Specialization_Persevere"></div>&nbsp;Persevere', 2, 2, 'Single Target attacks made against you have a 10% chance to Heal you and your nearby teammates for 10/20% of the Damage dealt.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Reinforce', '<div class="Sprite Telekinesis_TelekineticShield"></div>&nbsp;Reinforce', 2, 2, 'Whenever you Critically Heal, your target gains 5/10% Resistance to all damage for 5 seconds. Whenever you Critically Strike with a Single Target attack, you gain 5/10% Resistance to all damage for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Sentry Mastery', '<div class="Sprite blank"></div>&nbsp;Sentry Mastery', 3, 1, 'Whenever a damaging attack brings you below 50% Health, the attacker is Stunned and you Heal nearby allies for 10% of your Maximum Health. This Stun lasts 3 seconds and is twice as powerful as normal Stuns, and can affect enemies that are not normally affected by Stuns. This effect can only occur once every 60 seconds.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Arbiter', 'Arbiter', null, 'Melee / Support');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Enforcer', '<div class="Sprite Celestial_Palliate"></div>&nbsp;Enforcer', 1, 3, 'The strength of your Combo attacks, Heals, and Shields is increased by 2/4/6%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Arbiter Aura', '<div class="Sprite Specialization_ArbiterAura"></div>&nbsp;Arbiter Aura', 1, 3, 'You and your teammates gain an additional 1/3/5% Melee Damage Strength.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Rend', '<div class="Sprite Supernatural_Massacre"></div>&nbsp;Rend', 1, 2, 'Whenever you Critically Strike an enemy, you reduce their Damage Resistance by 2/4% for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Honor', '<div class="Sprite Sorcery_RitualOfRadiantSummoning"></div>&nbsp;Honor', 2, 2, 'Whenever you Heal or Shield an ally, your next attack gains 5/10% Damage Strength. This effect lasts 10s and stacks up to 3 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Concussion', '<div class="Sprite Gadgeteering_SonicDevice"></div>&nbsp;Concussion', 2, 3, 'Whenever you Stun a target you now also reduce the Damage the target deals by 5/10/15%. The duration of this effect lasts up to 8 seconds, but is dependent on the Rank of your target.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Preservation', '<div class="Sprite Celestial_Imbue"></div>&nbsp;Preservation', 2, 2, 'Reduces the Energy Cost of your Heals, Holds, and Single Target Melee attacks by 7.5/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Enhanced Gear', '<div class="Sprite PowerArmor_PowerGauntlet"></div>&nbsp;Enhanced Gear', 2, 3, 'Increases the amount of Offense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Arbiter Mastery', '<div class="Sprite blank"></div>&nbsp;Arbiter Mastery', 3, 1, 'Your Combo finishers heal yourself for 1% of your Maximum Health, and heal nearby allies for 3 times that amount.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Overseer', 'Overseer', null, 'Range / Support');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Administer', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Administer', 1, 3, 'The strength of your Blast attacks, Heals, and Shields is increased by 3/6/9%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Ruthless', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Ruthless', 1, 2, 'Increases your Critical Severity by 5/10%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Overseer Aura', '<div class="Sprite Specialization_OverseerAura"></div>&nbsp;Overseer Aura', 1, 3, 'You and your teammates gain an additional 1/3/5% Ranged Damage Strength.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'Impact', '<div class="Sprite Technology_ImplosionEngine"></div>&nbsp;Impact', 1, 2, 'Whenever you Critically Strike an enemy, you reduce the Damage they deal by 4/8% for 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Honor', '<div class="Sprite Sorcery_RitualOfRadiantSummoning"></div>&nbsp;Honor', 2, 2, 'Whenever you Heal or Shield an ally, your next attack gains 5/10% Damage Strength. This effect lasts 10 seconds and stacks up to 3 times.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Trapped', '<div class="Sprite Gadgeteering_TanglecoilLauncher"></div>&nbsp;Trapped', 2, 3, 'Whenever you Paralyze, Incapacitate, or Root a target they now also take 3/6/9% more Damage. The duration of this effect lasts up to 8 seconds, but is dependent on the Rank of your target.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Conservation', '<div class="Sprite Force_IntertialDampeningField"></div>&nbsp;Conservation', 2, 2, 'Reduces the Energy Cost of your Heals, Paralyzes, Incapacitates, Confuses, Placates, and Single Target Ranged attacks by 7.5/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Enhanced Gear', '<div class="Sprite PowerArmor_PowerGauntlet"></div>&nbsp;Enhanced Gear', 2, 3, 'Increases the amount of Offense you receive from items by 10/20/30%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Overseer Mastery', '<div class="Sprite blank"></div>&nbsp;Overseer Mastery', 3, 1, 'Increases the Base Damage of healing done to targets at or below 20% health by 10%.'));

dataSpecializationTree[dataSpecializationTree.length] = new SpecializationTree(dataSpecializationTree.length, 'Vindicator', 'Vindicator', null, 'Melee / Range');
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(0, 'Aggressive Stance', '<div class="Sprite Specialization_AggressiveStance"></div>&nbsp;Aggressive Stance', 1, 2, 'Increases your Defense by 10/20% of your Offense value.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(1, 'Merciless', '<div class="Sprite Specialization_Merciless"></div>&nbsp;Merciless', 1, 3, 'Increases your Critical Severity by 5/10/15%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(2, 'Initiative', '<div class="Sprite Specialization_Initiative"></div>&nbsp;Initiative', 1, 2, 'Your Energy Builder attacks now reduce your primary target\\\'s Damage Resistance to your attacks by 2/4% for 12 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(3, 'The Rush of Battle', '<div class="Sprite Specialization_TheRushOfBattle"></div>&nbsp;The Rush of Battle', 1, 3, 'When you defeat an enemy, you regain %5/10/15 of your Maximum Health over the next 5 seconds.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(4, 'Focused Strikes', '<div class="Sprite Celestial_CelestialCleansing"></div>&nbsp;Focused Strikes', 2, 3, 'Increases the Critical Strike Chance of your Single Target attacks by 2/4/6%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Modified Gear', '<div class="Sprite PowerArmor_PowerGauntlet"></div>&nbsp;Modified Gear', 2, 2, 'Increases the amount of Offense you receive from items by 10/20%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(6, 'Offensive Expertise', '<div class="Sprite FightingClaws_FormOfTheTiger"></div>&nbsp;Offensive Expertise', 2, 2, 'Your Active Offense powers benefit from an additional 7/14% Power Recharge Reduction.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(7, 'Mass Destruction', '<div class="Sprite Specialization_MassDestruction"></div>&nbsp;Mass Destruction', 2, 3, 'Increases the Critical Strike Chance of your AoE attacks by 2/4/6%.'));
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(8, 'Vindicator Mastery', '<div class="Sprite blank"></div>&nbsp;Vindicator Mastery', 3, 1, 'Grants bonus Ranged Damage equal to 1/3 the bonus Strength gives to Melee Damage, and grants bonus Melee Damage equal to 1/3 the bonus Ego gives to Ranged Damage.'));

//==============================================================================
// Archetype Groups
//==============================================================================

// archetype group
/**@constructor*/
ArchetypeGroup = function(id, name, desc, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.tip = tip;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', tip=\'' + this.tip + '\', code=' + this.code() + ']';
    }
}

// archetype group data
var dataArchetypeGroup = [];
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, null, null, null);
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Freeform', 'Freeform', 'Choose this option to mix and match your starting powers from any archetype. Tailor your hero\\\'s characteristics by choosing an Innate Talent. Archetypes are built and balanced to provide everything a hero needs, but those who want complete control can use a custom champion.');
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Ranged', 'Ranged', 'You deal good damage from a distance, but are weak in Melee combat and can take less damage than other roles can.');
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Tank', 'Tank', 'You are built to take damage and are good at grabbing your foes\\\' attention in combat, but you generate less Energy than other roles.');
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Melee', 'Melee', 'You excel at dealing Melee damage, but aren\\\'t much use at range. When the rush of combat leaves you, your Energy drops faster than most.');
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Hybrid', 'Hybrid', 'You are the basis to which other champions are compared, neither excelling nor falling behind in any area of combat.');
dataArchetypeGroup[dataArchetypeGroup.length] = new ArchetypeGroup(dataArchetypeGroup.length, 'Support', 'Support', 'You are adept at supporting others, but are also capable of standing on your own. You generate more Energy than other roles, but also deal less damage and have less Health.');

//==============================================================================
// Archetypes
//==============================================================================

// helper lookup functions
var dataArchetypeGroupIdFromName = [];
for (var i = 0; i < dataArchetypeGroup.length; i++) {
    dataArchetypeGroupIdFromName[dataArchetypeGroup[i].name] = dataArchetypeGroup[i].id;
}
var dataSuperStatIdFromName = [];
for (var i = 0; i < dataSuperStat.length; i++) {
    dataSuperStatIdFromName[dataSuperStat[i].name] = dataSuperStat[i].id;
}
var dataInnateTalentIdFromName = [];
for (var i = 0; i < dataInnateTalent.length; i++) {
    dataInnateTalentIdFromName[dataInnateTalent[i].name] = dataInnateTalent[i].id;
}
var dataPowerIdFromName = [];
for (var i = 0; i < dataPower.length; i++) {
    dataPowerIdFromName[dataPower[i].name] = dataPower[i].id;
}
var dataSpecializationTreeIdFromName = [];
for (var i = 0; i < dataSpecializationTree.length; i++) {
    dataSpecializationTreeIdFromName[dataSpecializationTree[i].name] = dataSpecializationTree[i].id;
}

// archetype class
/**@constructor*/
Archetype = function(id, name, desc, group, superStatList, innateTalent, powerList, specializationTreeList, tip) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.group = dataArchetypeGroupIdFromName[group];
    this.superStatList = [];
    if (superStatList != null) {
        for (var i = 0; i < superStatList.length; i++) {
            this.superStatList[i + 1] = dataSuperStatIdFromName[superStatList[i]];
        }
    }
    this.innateTalent = dataInnateTalentIdFromName[innateTalent];
    this.powerList = [];
    if (powerList != null) {
        for (var i = 0; i < powerList.length; i++) {
            if (powerList[i] instanceof Array) {
                this.powerList[i + 1] = [];
                for (var j = 0; j < powerList[i].length; j++) {
                    this.powerList[i + 1][j + 1] = dataPowerIdFromName[powerList[i][j]];
                }
            } else {
                this.powerList[i + 1] = dataPowerIdFromName[powerList[i]];
            }
        }
    }
    this.specializationTreeList = [];
    if (specializationTreeList != null) {
        for (var i = 0; i < specializationTreeList.length; i++) {
            this.specializationTreeList[i + 1] = dataSpecializationTreeIdFromName[specializationTreeList[i]];
        }
    }
    this.tip = tip;
    this.code = function() {
        return numToUrlCode(this.id);
    }
    this.equals = function(obj) {
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    this.toString = function() {
        var superStatList = '[';
        for (var i = 1; i < this.superStatList.length; i++) {
            if (i > 1) superStatList = superStatList + ', ';
            superStatList = superStatList + this.superStatList[i] + ' (' + dataSuperStat[this.superStatList[i]].name + ')';
        }
        superStatList = superStatList + ']';
        powerList = '[';
        for (var i = 1; i < this.powerList.length; i++) {
            if (i > 1) powerList = powerList + ', ';
            if (this.powerList[i] instanceof Array) {
                powerList = powerList + '[';
                for (var j = 1; j < this.powerList[i].length; j++) {
                    if (j > 1) powerList = powerList + ', ';
                    powerList = powerList + this.powerList[i][j] + ' (' + dataPower[this.powerList[i][j]].name + ')';
                }
                powerList = powerList + ']';
            } else {
                powerList = powerList + this.powerList[i] + ' (' + dataPower[this.powerList[i]].name + ')';
            }
        }
        powerList = powerList + ']';
        var specializationTreeList = '[';
        for (var i = 1; i < this.specializationTreeList.length; i++) {
            if (i > 1) specializationTreeList = specializationTreeList + ', ';
            specializationTreeList = specializationTreeList + this.specializationTreeList[i] + ' (' + dataSpecializationTree[this.specializationTreeList[i]].name + ')';
        }
        specializationTreeList = specializationTreeList + ']';
        return '[id=' + this.id + ', name=\'' + this.name + '\', desc=\'' + this.desc + '\', group=' + this.group + ' (' + dataArchetypeGroup[this.group].name + '), superStatList=' + superStatList + ', innateTalent=' + this.innateTalent + ' (' + dataInnateTalent[this.innateTalent].name + '), powerList=' + powerList + ', specializationTreeList=' + specializationTreeList + ', tip=\'' + this.tip + '\', code=' + this.code() + ']';
    }
}

// archetype data
var sGoldUnlock = '<br /><br /><b>This archetype can be unlocked in the C-Store or by becoming a current subscriber (gold) or lifetime member.</b>';
var aRoles = ['Hybrid', 'Tank', 'Melee Damage', 'Ranged Damage', 'Support'];
var dataArchetype = [];
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, null, null, null, null, null, null, null, null);
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'Freeform', '<div class="Sprite Archetype_Freeform"></div>', 'Freeform', null, null, null, null, 'Combat Role:  Any<br /><br />Choose this option to mix and match your starting powers from any archetype. Tailor your hero\\\'s characteristics by choosing an Innate Talent. Archetypes are built and balanced to provide everything a hero needs, but those who want complete control can use a custom champion.<br /><br /><b>You must be a current subscriber (gold) or lifetime member to access Freeform characters.</b>');
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Inferno', '<div class="Sprite Archetype_Inferno"></div>', 'Ranged', ['Recovery', 'Endurance', 'Ego'], 'The Inferno', ['Throw Fire', 'Fire Strike', 'Fireball', 'Fiery Form', ['Fire Breath', 'Pyre'], 'Concentration', 'Conflagration', 'Fire Shield', 'Thermal Reverberation', 'Immolation', ['Heat Wave', 'Fire Snake'], 'Flashfire'], ['Recovery', 'Avenger', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You control the devastating element of fire, creating and shaping it to your will. Whether hurling flaming projectiles or erupting into a deadly firestorm, you leave a blazing swath of destruction in your wake.<br /><br />Concepts: Fire Mutation, Flame Mage, Magma Creature, Plasma Control Suit, Pyrokinetic<br /><br />You have Ranged area attacks that cause Damage over Time. You can\\\'t take a lot of damage though, so be sure to hit your targets hard enough to take them down or recruit a tough ally who can take the damage for you. You can also absorb Energy from fire around you, so you become most powerful when you set things on fire. Light things up and feel the burn!' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Tempest', '<div class="Sprite Archetype_Tempest"></div>', 'Ranged', ['Endurance', 'Ego', 'Recovery'], 'The Tempest', ['Electric Bolt', 'Lightning Arc', 'Sparkstorm', 'Electric Form', 'Thunderstrike', 'Concentration', ['Electrocute', 'Ball Lightning'], 'Electric Shield', 'Ionic Reverberation', 'Electric Sheath', ['Lightning Storm', 'Storm Summoner'], 'Gigabolt'], ['Endurance', 'Avenger', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You are able to control and create electrical currents, generating electricity on your own or even directly affecting the weather itself. With a bolt of lightning from the sky or a continuous barrage of electricity, you are able to devastate your foes.<br /><br />Concepts: Tesla Coil Suit, Air Elemental, Electric Mutation, Lightning Wizard, Weather Control Artifact<br /><br />You have a variety of Ranged attacks, many of which are capable of hitting multiple foes. Many of your powers leave your targets electrically charged, setting you up for future attacks against them. You aren\\\'t so great at taking a beating yourself, so take them down quickly before they overwhelm you.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Marksman', '<div class="Sprite Archetype_Marksman"></div>', 'Ranged', ['Dexterity', 'Intelligence', 'Ego'], 'The Marksman', ['Strafe', 'Straight Shot', 'Sonic Arrow', 'Quarry', 'Torrent of Arrows', 'Concentration', ['Snap Shot', 'Focused Shot'], 'Retaliation', 'Hunter\'s Instinct', 'Evasive Maneuvers', ['Storm of Arrows', 'Gas Arrow'], 'Explosive Arrow'], ['Dexterity', 'Avenger', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You are an expert with the bow, and your precision and finesse allow you to take foes down from long range. Your arsenal of arrows provides you with the tools for many situations.<br /><br />Concepts: Arcane Hunter, Master Archer, Ancient Deity, Expert Tracker, Dimensional Nomad<br /><br />You have a versatile set of Ranged attacks, always trying to have the right arrow for any situation. You focus on a target\\\'s weak spots, dealing many critical hits to your foes.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Scourge', '<div class="Sprite Archetype_Scourge"></div>', 'Ranged', ['Recovery', 'Constitution', 'Ego'], 'The Scourge', ['Infernal Bolts', 'Infernal Blast', 'Condemn', 'Pestilence', ['Venomous Breath', 'Vicious Cyclone'], 'Aspect of the Infernal', ['Locust Swarm', 'Crippling Coils'], 'Ebon Void', 'Supernatural Power', 'Resurgence', 'Epidemic', 'Defile'], ['Recovery', 'Overseer', 'Avenger'], 'Combat Role:  ' + aRoles[3] + '<br /><br />Your power comes from somewhere beyond this mortal realm, allowing you to infest your foes with toxic energy. You use these infernal powers as you see fit, leaving your foes gasping through an onslaught of poison.<br /><br />Concepts: Toxic Mutant, Demonic Gift, Ancient Curse, Nightmare Creature, Remorseful Demon<br /><br />Many of your powers poison your foes, and your strength increases as your poisons wither them away. Your pestilent clouds will weaken your foes as you press the attack, and you\\\'ll have some ability to hinder your opponents\\\' mobility.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Icicle', '<div class="Sprite Archetype_Tempest"></div>', 'Ranged', ['Dexterity', 'Endurance', 'Constitution'], 'The Chiller', ['Ice Shards', 'Ice Blast', 'Shatter', 'Ice Form', ['Wall of Ice', 'Ice Cage'], 'Chilled Form', 'Icicle Spear', 'Ice Shield', 'Icy Embrace', 'Ice Sheath', ['Ice Burst', 'Frost Breath'], 'Rimefire Burst'], ['Dexterity', 'Vindicator', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You have the power to create ice and shape it at will. Hurl frozen shards at your enemies, chill them to the bone, then shatter them for devastating effect!<br /><br />Concepts: Cold Mutation, Freeze Device, Ice Wizard, Tundra Creature<br /><br />You have ranged attacks that cause your enemies to become chilled. You cause more damage the more you chill your foes, so be sure to make them as frosty as possible! You can\\\'t take a lot of damage though, so be sure to hit your targets hard enough to take them down or recruit a tough ally who can take the damage for you.' + ArchetypeUnlock(true, 'Winter'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Squall', '<div class="Sprite Archetype_Squall"></div>', 'Ranged', ['Ego', 'Recovery', 'Endurance'], 'The Squall', ['Wind Lash', 'Gust', 'Hurricane', 'Stormbringer', ['Wind Breath', 'Frost Breath'], 'Concentration', ['Updraft', 'Twister'], 'Wind Barrier', 'Wind Reverberation', ['Electric Sheath', 'Ice Sheath'], 'Dust Devil', 'Typhoon'], ['Ego', 'Vindicator', 'Avenger'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You can control the wind and weather currents around you, creating raging hurricanes, powerful twisters, and huge gusts of wind to knock down and disorient your foes.<br /><br />Concepts: Storm Spirit, Atmospheric Manipulation, Weather Mutation, Air Wizard, Portable Wind Generator<br /><br />You possess a multitude of mid and long range attacks, many of which can Repel and Disorient your enemies, allowing you to direct movement on battlefield. You don\\\'t last long when enemies focus on you, so keep them off their feet while you take them down.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Soldier', '<div class="Sprite Archetype_Soldier"></div>', 'Ranged', ['Ego', 'Dexterity', 'Recovery'], 'The Soldier', ['Steady Shot', 'Submachinegun Burst', ['Holdout Shot', 'Rifle Butt'], 'Targeting Computer', 'Concentration', ['Shotgun Blast', 'Gatling Gun'], 'Retaliation', 'Assault Rifle', 'Killer Instinct', ['Lock N Load', 'Smoke Grenade'], ['Frag Grenade', 'Concussion Grenade'], ['Sniper Rifle', 'Rocket']], ['Ego', 'Vindicator', 'Avenger'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You possess a formidable arsenal of military weapons and know how to use them. From heavy pistols and assault rifles to rockets and sniper rifles, you are the ultimate one-man army.<br /><br />Concepts: Android Mercenary, Ex-Special Forces, Gun-Toting Vigilante, Special Agent, Super-Soldier<br /><br />Your strength lies in your Ranged attacks. You have a number of single-target and area effect attacks that inflict heavy damage to your target. Be careful though, all those weapons don\\\'t leave much room for body armor, so you either need to take down your opponent quickly or find someone who can draw incoming fire!' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Glacier', '<div class="Sprite Archetype_Glacier"></div>', 'Tank', ['Constitution', 'Endurance', 'Ego'], 'The Glacier', ['Ice Shards', 'Ice Blast', 'Ice Cage', 'Invulnerability', ['Snow Storm', 'Frost Breath'], 'Concentration', 'Ice Sheath', 'Ice Shield', ['Shatter', 'Icy Embrace'], 'Unbreakable', ['Ice Barrier', 'Ice Burst'], 'Avalanche'], ['Constitution', 'Guardian', 'Protector'], 'Combat Role:  ' + aRoles[1] + '<br /><br />You are able to create ice and cold out of thin air and manipulate it various ways. You blast your foes with ice shards, trap them in solid blocks of ice, then shatter them with only a thought.<br /><br />Concepts: Cold Mutation, Cryo-Suit, Frost Warrior, Ice Elemental, Winter Spirit<br /><br />You have a number of powers used to lock down your opponents, holding them in place so your allies can finish them off. You eventually gain the ability to shatter your ice constructs, causing damage to any opponent in their icy embrace.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Mountain', '<div class="Sprite Archetype_Mountain"></div>', 'Tank', ['Constitution', 'Ego', 'Endurance'], 'The Mountain', ['Wield Earth', 'Stone Shot', 'Tremor', 'Defiance', ['Cave In', 'Upheaval'], 'Concentration', ['Land Slide', 'Seismic Smash'], 'Stone Shroud', 'Quicksand', 'Unbreakable', 'Fault Line', 'Fissure'], ['Constitution', 'Protector', 'Guardian'], 'Combat Role:  ' + aRoles[1] + '<br /><br />You are an embodiment of the rocks and earth that surround us, standing firm in the face of your foes. You manipulate the stone and soil to assault and harass those that would stand against you and your allies.<br /><br />Concepts: Rock Golem, Nature\\\'s Guardian, Earth Elemental, Druidic Enchantment, Primordial Entity<br /><br />You have multiple powers that can knock down and weaken your foes, allowing you to gain control of the fight and the attention of your enemies. Your assault enables your allies to attack unhindered, so focus on keeping your enemies attacking you instead of them!' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Master', '<div class="Sprite Archetype_Master"></div>', 'Tank', ['Constitution', 'Dexterity', 'Strength'], 'The Master', ['Vicious Strikes', 'Thundering Kicks', 'Thunderbolt Lunge', 'Lightning Reflexes', ['Elbow Slam', 'Inexorable Tides'], 'Form of the Master', 'Shuriken Storm', 'Parry', 'Masterful Dodge', 'Bountiful Chi Resurgence', 'Dragon Kick', ['Burning Chi Fist', 'Open Palm Strike']], ['Constitution', 'Warden', 'Protector'], 'Combat Role:  ' + aRoles[1] + '<br /><br />Your ability to sense and avoid incoming danger is unparalleled, making you a difficult adversary to defeat. Your skill with unarmed martial arts allows you to pummel your foes, all while avoiding their assault against you.<br /><br />Concepts: Blind Monk, Time-Shifted Foot Soldier, Venerable Sensei, Sixth Sense Mutation<br /><br />You are adept at prolonged fights due to your abilities to avoid and dodge your attackers. In team fights, you work to keep foes focused on you with your martial arts powers, leaving your allies free to attack them unhindered.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Invincible', '<div class="Sprite Archetype_Invincible"></div>', 'Tank', ['Intelligence', 'Constitution', 'Endurance'], 'The Invincible', ['Power Bolts', ['Dual Wrist Rocket Barrage', 'Concussor Beam'], ['Mini Gun', 'Eye Beam'], 'Invulnerability', ['Micro Munitions', 'Chest Laser'], 'Concentration', ['Reconstruction Circuits', 'Energy Wave'], ['Energy Shield', 'Force Shield'], 'Overdrive', 'Unbreakable', ['Shoulder Launcher', 'Hand Cannon'], ['Fire All Weapons', 'Chest Beam']], ['Intelligence', 'Protector', 'Guardian'], 'Combat Role:  ' + aRoles[1] + '<br /><br />Who said you need superpowers to be a superhero? Using the latest in cutting-edge technology, your suit of armor offers near-invincible levels of protection while remaining light and flexible enough for maneuverability. And with its arsenals of guns, lasers, and missiles, you can dish out as much as you can take.<br /><br />Concepts: Powered Armor, Future Soldier, Genius Industrialist, Billionaire Scientist, Discovered Alien Technology<br /><br />Your suit is equipped with the latest in damage dealing technology. It is even capable of using multiple powers at once, allowing you to deal massive Area of Effect Damage.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Behemoth', '<div class="Sprite Archetype_Behemoth"></div>', 'Tank', ['Constitution', 'Strength', 'Recovery'], 'The Behemoth', ['Clobber', 'Defensive Combo', 'Mighty Leap', 'Defiance', ['Roomsweeper', 'Thunderclap'], 'Enrage', 'Demolish', 'Retaliation', 'Aggressor', 'Unbreakable', ['Uppercut', 'Haymaker'], 'Shockwave'], ['Constitution', 'Protector', 'Warden'], 'Combat Role:  ' + aRoles[1] + '<br /><br />You are an unstoppable juggernaut of raw strength who can take a lot of punishment. Your crushing blows send enemies flying or can Stun them into submission.<br /><br />Concepts: Exo-Skeleton, Golem, Radioactive Boost, Secret Formula, Strength Mutation<br /><br />You\\\'ve got some strong close combat powers designed to damage and knock down your opponents. You can take a lot of damage which you can turn around and use against your enemies. When you\\\'re teamed up with other heroes, a lot of them will be depending on you to soak up enemy fire so charge in and start attacking!' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Disciple', '<div class="Sprite Archetype_Disciple"></div>', 'Melee', ['Ego', 'Recovery', 'Dexterity'], 'The Disciple', ['Ego Blade', 'Ego Weaponry', 'Ego Blade Frenzy', 'Id Mastery', 'Ego Blade Dash', 'Mental Discipline', ['Ego Blade Breach', 'Ego Choke'], 'Telekinetic Shield', 'Ego Reverberation', 'Ego Surge', ['Telekinetic Maelstrom', 'Telekinetic Eruption'], 'Ego Blade Annihilation'], ['Ego', 'Vindicator', 'Brawler'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You are a master of manipulating kinetic Energy. These powers primarily manifest themselves as your kinetic weaponry, but you can also summon even greater telekinetic power to shield yourself or destroy foes.<br /><br />Concepts: Telekinetic Warrior, Psychic Ninja, Psi-Assassin, Mental Mastermind, Technological Energy Blades<br /><br />You have many powerful Melee attacks, as well as close range group attacks. You have the ability to dish out tons of damage immediately around you, and can use your mental prowess to gain energy while defeating foes in combat.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Unleashed', '<div class="Sprite Archetype_Unleashed"></div>', 'Melee', ['Dexterity', 'Recovery', 'Strength'], 'The Unleashed', ['Rain of Steel', 'Blade Tempest', 'Form of the Tempest', 'Way of the Warrior', ['Force Snap', 'Strike Down'], ['Force Eruption', 'Eye of the Storm'], ['Bountiful Chi Resurgence', 'Mind Wipe'], 'Dragon\'s Wrath', 'Force Shield', 'Relentless', ['Intensity', 'Field Surge'], ['Containment Field', 'Force Geyser']], ['Dexterity', 'Warden', 'Vindicator'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You are in tune with the universe in ways few can understand. This understanding has enhanced your formidable swordsmanship with powers beyond, enabling you to knock and control your foes from a distance, allowing you to close the gap and finish them.<br /><br />Concepts: Cosmic Knight, Militant Monk, Dark Inquisitor, Eldritch Warrior, Mysterious Visitor<br /><br />You are a fearsome opponent at close range, capable of quickly dispatching multiple foes with your dual blades. You will learn to enhance your combat style with ways to knock your foes around the battle field, bringing them to you with a flick of your wrist.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Blade', '<div class="Sprite Archetype_Blade"></div>', 'Melee', ['Dexterity', 'Strength', 'Recovery'], 'The Blade', ['Reaper\'s Touch', 'Reaper\'s Caress', ['Thunderbolt Lunge', 'Cut Down'], 'Way of the Warrior', 'Scything Blade', 'Form of the Swordsman', ['Reaper\'s Embrace', 'Dragon\'s Bite'], 'Parry', 'Relentless', ['Smoke Bomb', 'Bountiful Chi Resurgence'], ['Intensity', 'Masterful Dodge'], ['Shuriken Throw', 'Chained Kunai']], ['Dexterity', 'Brawler', 'Warden'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You are trained in the ancient arts of martial combat and have mastered the way of the sword. You are deadly in close combat, your focused strikes swiftly cutting down any who dares stand against you.<br /><br />Concepts: Alien Gladiator, Blade Master, Mystic Knight, Ninja Warrior, Robot Assassin<br /><br />You are the master of close combat, specialized in swiftly taking down single targets. Finish your enemies before they get a chance to retaliate, as you cannot sustain a great deal of injuries yourself.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Devastator', '<div class="Sprite Archetype_Devastator"></div>', 'Melee', ['Strength', 'Recovery', 'Constitution'], 'The Devastator', ['Bludgeon', 'Cleave', 'Unstoppable', 'Arc of Ruin', ['Vicious Descent', 'Decimate'], 'Enrage', ['Skewer', 'Skullcrusher'], 'Guard', 'Thermal Reverberation', ['Earth Splitter', 'Eruption'], 'Aggressor', 'Brimstone'], ['Strength', 'Brawler', 'Warden'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You\\\'ve got a really big weapon, and you aren\\\'t afraid to use it. Whether it\\\'s a huge axes, sword, or hammer, you use it to crush your foes, knocking them aside if they think about giving you trouble.<br /><br />Concepts: Runic Weapon, Planar Emissary, Ancient Deity, Transdimensional Soldier, Primal Warrior<br /><br />With your strong, heavy swings you are able to take on many foes at once, utilizing the weight of your weapon to Knock your foes down and Disorient them. Striking at one foe or many, you\\\'ll make them regret getting close to you.' + ArchetypeUnlock(true, 'Forum Malvanum'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Fist', '<div class="Sprite Archetype_Fist"></div>', 'Melee', ['Dexterity', 'Strength', 'Recovery'], 'The Fist', ['Vicious Strikes', 'One Hundred Hands', 'Thunderbolt Lunge', 'Way of the Warrior', ['Crashing Wave Kick', 'Backhand Chop'], 'Form of the Tempest', 'Dragon Kick', 'Parry', 'Rising Knee', 'Intensity', ['Burning Chi Fist', 'Open Palm Strike'], 'Dragon Uppercut'], ['Dexterity', 'Brawler', 'Vindicator'], 'Combat Role:  ' + aRoles[2] + '<br /><br />Your expertise in unarmed combat is formidable, allowing you to catch enemies off guard with your powerful strikes. Your rapid strikes make you highly dangerous up close, quickly dispatching any foe in your way.<br /><br />Concepts: Street Brawler, Mixed Martial Artist, Reflect Enhancement Experiment, Warrior Monk<br /><br />You are an up close combatant, with powers that are effective in single and multiple target situations. You have several ways to hinder your enemies during a fight, by Stunning or Knocking them down, but you won\\\'t last long with too many enemies attacking you.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Void', '<div class="Sprite Archetype_Void"></div>', 'Hybrid', ['Ego', 'Constitution', 'Presence'], 'The Void', ['Shadow Bolt', 'Shadow Blast', 'Shadow Embrace', ['Shadow Form', 'Aura of Ebon Destruction'], ['Grasping Shadows', 'Soul Vortex'], 'Concentration', 'Ebon Void', 'Ebon Ruin', 'Spirit Reverberation', ['Shadow Shroud', 'Dark Transfusion'], ['Lifedrain', 'Summon Shadows'], ['Ebon Rift', 'Void Horror']], ['Endurance', 'Guardian', 'Avenger'], 'Combat Role:  ' + aRoles[0] + '<br /><br />You are connected to a realm of shadows and darkness. This connection allows you to channel dimensional energy to assault your foes, drawing out their fears and draining them of their essence.<br /><br />Concepts: Shadow Entity, Dark Magician, Soul Vampire, Demonic Blood, Multi-Dimensional Being<br /><br />You have a good range of mid and long range attacks, both single target and group attacks. You have the ability to lock down and weaken your foes, and can learn to summon creatures of pure shadow to assist you in combat.' + ArchetypeUnlock(true, 'Nightmare Invasion'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Grimoire', '<div class="Sprite Archetype_Grimoire"></div>', 'Hybrid', ['Intelligence', 'Ego', 'Presence'], 'The Grimoire', ['Eldritch Bolts', 'Eldritch Blast', 'Pillar of Poz', 'Aura of Primal Majesty', ['Skarn\'s Bane', 'Invocation of Storm Calling'], ['Concentration', 'Compassion'], ['Arcane Vitality', 'Vala\'s Light'], 'Eldritch Shield', ['Circle of Arcane Power', 'Conjuring'], ['Sigils of Destruction', 'Sigils of Radiant Sanctuary'], ['Sigils of Arcane Runes', 'Sigils of Ebon Weakness'], ['Hex of Suffering', 'Divine Renewal']], ['Intelligence', 'Guardian', 'Overseer'], 'Combat Role:  ' + aRoles[0] + '<br /><br />You have unlocked mysterious arcane secrets. You use this knowledge to weave powerful magic into auras, sigils, and spells designed to confound your enemies and protect your allies.<br /><br />Concepts: Dimensional Sorcerer, Master Mage, Rune Witch, Shaman, Street Wizard<br /><br />You have a good range of abilities that allow you to set up areas of control to focus your mystic powers. This allows you to heal your allies, debilitate your foes, and deal decent area effect damage.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Impulse', '<div class="Sprite Archetype_Impulse"></div>', 'Hybrid', ['Endurance', 'Ego', 'Intelligence'], 'The Impulse', ['Force Bolts', 'Force Blast', 'Force Eruption', ['Personal Force Field', 'Kinetic Manipulation'], 'Crushing Wave', 'Inertial Dampening Field', ['Protection Field', 'Containment Field'], 'Force Shield', 'Field Surge', 'Force Snap', ['Force Detonation', 'Force Geyser'], 'Force Cascade'], ['Endurance', 'Guardian', 'Overseer'], 'Combat Role:  ' + aRoles[0] + '<br /><br />You can create powerful blasts, eruptions, and protective bubbles out of pure energy. You use these forces to knock your foes around, keeping them off balance while you pummel them from afar.<br /><br />Concepts: Force Fields, Master of Gravity, Energy Manipulation, Technological Shields, Force of Will<br /><br />Many of your powers allow you to knock foes back, keeping them away from you and preventing them from attacking while they fly through the air. You will gain the ability to shield yourself and allies, while also being able to dish out serious damage.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Specialist', '<div class="Sprite Archetype_Specialist"></div>', 'Hybrid', ['Dexterity', 'Constitution', 'Recovery'], 'The Specialist', ['Gunslinger', ['Burst Shot', 'Blade Tempest'], ['Holdout Shot', 'Trip Wire'], ['Lightning Reflexes', 'Way of the Warrior'], 'Form of the Tempest', 'Eye of the Storm', ['Breakaway Shot', 'Strike Down'], ['Two-Gun Mojo', 'Dragon\'s Wrath'], 'Relentless', 'Parry', ['Lock N Load', 'Masterful Dodge'], ['Lead Tempest', 'Sword Cyclone']], ['Dexterity', 'Vindicator', 'Guardian'], 'Combat Role:  ' + aRoles[0] + '<br /><br />You are an expert at taking down your target with whatever means necessary. You are well trained with pistols and swords, alternating between them in combat with deadly quickness.<br /><br />Concepts: Bounty Hunter, Cybernetic Mercenary, Techno-Ninja, Covert Ops, Military Specialist<br /><br />You excel at short and mid-range combat, whether with your swords or your pistols. Your quick reflexes allow you to avoid incoming attacks, all the while whittling away at your foes with your rapid strikes.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Savage', '<div class="Sprite Archetype_Savage"></div>', 'Hybrid', ['Strength', 'Constitution', 'Recovery'], 'The Savage', ['Bestial Fury', 'Shred', 'Frenzy', 'Regeneration', 'Pounce', 'Aspect of the Bestial', 'Massacre', ['Antagonize', 'Parry'], 'Supernatural Power', ['Howl', 'Bite'], ['Resurgence', 'Aggressor'], ['Devour Essence', 'Thrash']], ['Strength', 'Warden', 'Brawler'], 'Combat Role:  ' + aRoles[0] + '<br /><br />You are a vicious hybrid of man and beast with powers far greater than either. You rip apart enemies with your razor-sharp claws and teeth while rapidly healing your own injuries.<br /><br />Concepts: Animal Mutation, Lab Experiment, Man-Animal Hybrid, Mechanical Beast, Supernatural Creature<br /><br />You\\\'ve got a good mix of close combat attack powers, and can take a fair amount of damage due to your self-healing abilities. While you don\\\'t have the same offensive or defensive capabilities as dedicated archetypes, you\\\'re a good balance of both.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Night Avenger', '<div class="Sprite Archetype_NightAvenger"></div>', 'Hybrid', ['Dexterity', 'Strength', 'Ego'], 'The Night Avenger', ['Hawk\'s Talons', 'Viper\'s Fangs', 'Smoke Bomb Lunge', 'Night Warrior', ['Ricochet Throw', 'Rend and Tear'], ['Form of the Tiger', 'Concentration'], 'Throwing Blades', 'Parry', 'Grapple Gun Pull', ['Dragon\'s Claws', 'Tiger\'s Bite'], ['Gas Pellets', 'Bolas'], 'Strafing Run'], ['Dexterity', 'Guardian', 'Vindicator'], 'Combat Role:  ' + aRoles[0] + '<br /><br />Your personal training and skills with advanced gadgets makes you a precise force for justice. You reach out from the shadows and stop villainy in its tracks, and serve as a symbol to any who need your help.<br /><br />Concepts: Vigilante, Eccentric Billionaire, Technical Genius, Vengeful Orphan, Street Warrior<br /><br />You strike from the shadows and deal heavy damage with claws and versatile gadgets. You strike swiftly and with brutal precision, prowling the night to bring justice.' + ArchetypeUnlock(true, 'Nighthawk'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Radiant', '<div class="Sprite Archetype_Radiant"></div>', 'Support', ['Presence', 'Ego', 'Intelligence'], 'The Radiant', ['Eldritch Bolts', 'Rebuke', 'Vengeance', 'Seraphim', 'Expulse',  'Compassion', ['Circle of Radiant Glory', 'Sigils of Radiant Sanctuary'], 'Eldritch Shield', 'Arcane Vitality', ['Binding of Aratron', 'Soul Mesmerism'], 'Divine Renewal', 'Planar Fracture'], ['Presence', 'Sentry', 'Sentinel'], 'Combat Role:  ' + aRoles[4] + '<br /><br />You have been blessed with the powers of light. You inflict damage on your opponents while healing the wounds of those who fight alongside you. You possess the power to revive your fallen allies, making you an invaluable asset.<br /><br />Concepts: Radiant Sorcerer, Solar Guardian, Archangel, Luminescent Warrior, Disciple of the Dawn<br /><br />Your wide array of light based powers allow you to heal your allies in addition to damaging your enemies. In times of need you can paralyze your foes and even revive your fallen allies.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Mind', '<div class="Sprite Archetype_Mind"></div>', 'Support', ['Presence', 'Endurance', 'Ego'], 'The Mind', ['Psi Lash', 'Ego Blast', ['Ego Sprites', 'Mental Leech'], 'Aura of Radiant Protection', ['Psionic Healing', 'Empathic Healing'], 'Compassion', 'Ego Sleep', 'Telekinetic Shield', 'Telepathic Reverberation', 'Ego Hold', ['Ego Storm', 'Summon Nightmare'], 'Mindful Reinforcement'], ['Presence', 'Sentinel', 'Sentry'], 'Combat Role:  ' + aRoles[4] + '<br /><br />You have tapped into powerful psychic energies. You use your mental might to lash out at opponents and reach into their psyches to make their darkest nightmares real.<br /><br />Concepts: Alien Overmind, Mental Mutation, Mind-Control Ray, Psionic Projector, Telepath<br /><br />You have limited Ranged attack abilities, but have a number of powers designed to lock down enemies and boost allies. You are most powerful when supporting other heroes.' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Inventor', '<div class="Sprite Archetype_Inventor"></div>', 'Support', ['Intelligence', 'Presence', 'Ego'], 'The Inventor', ['Sonic Blaster', 'Experimental Blaster', 'Experimental Burst Ray', 'Medical Nanites', ['Attack Toys', 'Munitions Bots'], 'Concentration', 'Bionic Shielding', 'Energy Shield', 'Support Drones', ['Miniaturization Drive', 'Resurrection Serum'], ['Sonic Device', 'Toxic Nanites'], 'Orbital Cannon'], ['Intelligence', 'Overseer', 'Commander'], 'Combat Role:  ' + aRoles[4] + '<br /><br />You are an incredibly gifted creator of advanced technology, using unconventional ideas that the average person would think impossible. Your quirky designs get the job done, with only the occasional unintended side effect.<br /><br />Concepts: Scientific Entrepreneur, Prototype Cyber Soldier, Technopath, Kid Genius, Mad Scientist<br /><br />Your set of wacky gadgets provides you with a good variety of abilities. You will learn to create personal robots to aid you in combat, and several of your gizmos will be valuable assets in assisting other heroes.' + ArchetypeUnlock(true, 'Foxbatcon'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Cursed', '<div class="Sprite Archetype_Cursed"></div>', 'Ranged', ['Recovery', 'Constitution', 'Ego'], 'The Scourge', ['Infernal Bolts', 'Infernal Blast', 'Condemn', 'Pestilence', ['Venomous Breath', 'Vicious Cyclone'], 'Aspect of the Infernal', ['Locust Swarm', 'Crippling Coils'], 'Ebon Void', 'Supernatural Power', 'Resurgence', 'Epidemic', 'Defile'], ['Recovery', 'Overseer', 'Avenger'], 'Combat Role:  ' + aRoles[2] + '<br /><br />Your power comes from somewhere beyond this mortal realm, allowing you to infest your foes with toxic energy. You use these infernal powers as you see fit, leaving your foes gasping through an onslaught of poison.<br /><br />Concepts: Toxic Mutant, Demonic Gift, Ancient Curse, Nightmare Creature, Remorseful Demon<br /><br />Many of your powers poison your foes, and your strength increases as your poisons wither them away. Your pestilent clouds will weaken your foes as you press the attack, and you\\\'ll have some ability to hinder your opponents\\\' mobility.' + ArchetypeUnlock(false, 'Blood Moon'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Automaton', '<div class="Sprite Archetype_Automaton"></div>', 'Ranged', ['Ego', 'Intelligence', 'Constitution'], 'The Automaton', ['Wrist Bolter', ['Power Gauntlet', 'Tactical Missiles'], 'Targeting Computer', ['Rocket Punch', 'Binding Shot'], 'Concentration', ['Particle Mine', 'Mini Mines'], 'Chest Beam', ['Energy Wave', 'Cybernetic Tether'], 'Molecular Self-Assembly', ['Energy Shield', 'Force Shield'], ['Nanobot Swarm', 'Unbreakable'], ['Implosion Engine', 'Orbital Cannon']], ['Ego', 'Overseer', 'Vindicator'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You are the most technologically advanced machine known to man. You assess targets and terminate them without hesitation.<br /><br />Concepts: Advanced Robot, Tactical Mastermind, Supercomputer Processing, Mechanized Brawler, Perfect Targeting<br /><br />You are a sentient offensive weapons platform with a shoot-first attitude. While proficient at ranged combat, you possess options for melee engagements and in-combat recovery.' + ArchetypeUnlock(false, null, 'Leveling another character to 40'));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Rockstar', '<div class="Sprite Archetype_Rockstar"></div>', 'Tank', ['Strength', 'Endurance', 'Constitution'], 'The Rockstar', ['Bludgeon', 'Cleave', 'Defiance', ['Vicious Descent', 'Decimate'], 'Enrage', ['Arc of Ruin', 'Hyper Voice'], 'Annihilate', ['Absorb Heat', 'Resurgence'], 'Thermal Reverberation', 'Guard', ['Aggressor', 'Brimstone'], 'Unleashed Rage'], ['Strength', 'Warden', 'Protector'], 'Combat Role:  ' + aRoles[1] + '<br /><br />You wield a mighty weapon befitting a Rockstar.  While you can use any heavy weapon, you like the axes and preferrably that of the musical variety.  Combined with your pyrotechnic powers of Rock and Roll, you are a force with whom to be reckoned with.<br /><br />Concepts:  Rock\\\'n\\\'Roll Warrior, God of Rock, Heavy Metal Mercenary, Battle Bard, Rockabilly Rebel.<br /><br />With your wild, heavy swings and pyrotechnic powers, you are able to take on many foes at once, causing them damage and disorientation.  Rock on!' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Predator', '<div class="Sprite Archetype_Predator"></div>', 'Melee', ['Dexterity', 'Strength', 'Recovery'], 'The Predator', ['Bestial Fury', 'Shred', ['Frenzy', 'Venomous Breath'], 'Pestilence', 'Pounce', 'Aspect of the Bestial', 'Massacre', ['Antagonize', 'Retaliation'], 'Supernatural Power', ['Bite', 'Thrash'], ['Masterful Dodge', 'Intensity'], 'Eviscerate'], ['Dexterity', 'Vindicator', 'Warden'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You are the ultimate hunter.  Once you engage your target in close combat, few can survive the fury of your assault.  You have a number of offensive attacks to wear down your enemies, all the while healing your own injuries.<br /><br />Concepts:  Savage Mutation, Evolved Insect, Genetically Enhanced, Clockwork Assassin, Arcane Hunter<br /><br />You\\\'re a close-combat offensive powerhouse.  You can cause bleeding on targets, which you can use to your advantage.  You\\\'re not as tough as other archetypes, but you can fall back on your self-healing abilities.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Penitent', '<div class="Sprite Archetype_Penitent"></div>', 'Melee', ['Strength', 'Dexterity', 'Endurance'], 'The Penitent', ['Reaper\'s Touch', ['Slash', 'Barbed Chain'], ['Thunderbolt Lunge', 'Cut Down'], ['Unstoppable', 'Way of the Warrior'], ['Aspect of the Bestial', 'Form of the Swordsman'], ['Lacerating Cyclone', 'Throwing Blades'], 'Gauntlet Chainsaw', ['Antagonize', 'Retaliation'], 'Wild Thing', ['Barbed Lariat', 'Holdout Shot'], ['Masterful Dodge', 'Aggressor'], ['Breakaway Shot', 'Evasive Maneuvers']], ['Strength', 'Warden', 'Brawler'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You have many destructive devices at your disposal.  From chains to chainsaws, your mix of short-range and close-range combat weapons give you a strong offense.  While you can\\\'t take a lot of damage, you can use your self-healing capabilities to stay in the fight.<br /><br />Concepts:  Reformed Convict, Escaped Madman, controlled Prisoner, Crazed Gadgeteer, Government Special Agent<br /><br />You\\\'ve got close-combat and short-range offensive capabilities.  You can cause bleeding on targets, which you can use to your advantage.  You\\\'re not as tough as other archetypes, but you can fall back on your self-healing abilities.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Hexslinger', '<div class="Sprite Archetype_Hexslinger"></div>', 'Ranged', ['Intelligence', 'Dexterity', 'Ego'], 'The Hexslinger', ['Eldritch Bolts', 'Eldritch Blast', 'Enchanter', ['Star Barrage', 'Skarn\'s Bane'], 'Magician\'s Dust', 'Spellcaster', 'Soul Beam', 'Eldritch Shield', ['Circle of Arcane Power', 'Conjuring'], ['Hex of Suffering', 'Warlock\'s Blades'], ['Imbue', 'Resurgence'], ['Planar Fracture', 'Sigils of Destruction']], ['Intelligence', 'Guardian', 'Avenger'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You have a number of offensive spells at your disposal, as well as a few defensive abilities to keep yourself safe.  You can use your Curses to weaken your enemies, and Enchantments to enhance your own abilities.  You have access to a power that increases your damage when you have both conditions in effect.<br /><br />Concepts:  Occult Master, Superhuman Hunter, Dimensional Arcanist, Being of Magic, Mystic Conduit, Specialization_SuperCharged Avenger<br /><br />You excel at ranged offensive capabilities.  You can cast Curses on targets, weakening your enemies in various ways.  You can also cast Enchantments to buff yourself.  You\\\'re not as tough as other archetypes, but you have some limited self-healing abilities.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Witch', '<div class="Sprite Archetype_Witch"></div>', 'Support', ['Presence', 'Constitution', 'Recovery'], 'The Witch', ['Infernal Bolts', 'Condemn', 'Life Essence', 'Aura of Arcane Clarity', ['Sigils of Ebon Weakness', 'Venomous Breath'], ['Compassion', 'Manipulator'], ['Grasping Shadows', 'Crippling Coils'], 'Voodoo Doll', ['Supernatural Power', 'Mephitic'], ['Curse', 'Will-o\'-the-Wisp'], ['Death\'s Embrace', 'Imbue'], ['Rebirth', 'Resurgence']], ['Presence', 'Sentinel', 'Overseer'], 'Combat Role:  ' + aRoles[4] + '<br /><br />You have a few ranged attacks, and a number of support abilities.  Your main attribute is Constitution, so focusing on that will make you more powerful and give you more hit points.  Cursing your enemies will increase the power of your support abilities, allowing you to heal yourself and others more effectively.<br /><br />Concepts:  Witch, Warlock, Voodoo Master, Poison Elemental, Dark Soul, Corrupted Spirit<br /><br />You excel with support powers and work best on a team.  You can cast Curses on targets, poisoning or stunning your enemies.  You also can heal yourself and others, with the healing increased by the amount of active Poisons.  You don\\\'t have damage reduction capabilities, but your hit points are typically higher.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Cybernetic Warrior', '<div class="Sprite Archetype_CyberneticWarrior"></div>', 'Melee', ['Intelligence', 'Constitution', 'Endurance'], 'The Cybernetic Warrior', ['Laser Edge', 'Lightspeed Strike', 'Lightspeed Dash', 'Quantum Stabilizer', ['Lightwave Slash', 'Cybernetic Tether'], 'Particle Accelerator', 'Luminescent Slash', ['Particle Wave', 'Energy Wave'], 'Unified Theory', 'Laser Deflection', ['Electric Sheath', 'Masterful Dodge'], ['Particle Smash', 'Plasma Cutter']], ['Intelligence', 'Vindicator', 'Brawler'], 'Combat Role:  ' + aRoles[2] + '<br /><br />Your main weapon is your laser sword, a high-damage close-combat weapon capable of a number of attacks.  You also have Cybernetic energy weapons and other devices at your disposal to make you a deadly adversary.<br /><br />Concepts:  Digital Daemon, High-Tech Mercenary, Robotic Hunter, Electronic Entity, Future Soldier<br /><br />You\\\'ve got close-combat and short range offensive capabilities.  You can cause plasma burns on targets you can use to your advantage.  While you\\\'re not a tank you can hold your own in a fight, and have some self-healing capabilities.' + ArchetypeUnlock(true));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Gunslinger', '<div class="Sprite Archetype_Gunslinger"></div>', 'Ranged', ['Dexterity', 'Recovery', 'Constitution'], 'The Gunslinger', ['Gunslinger', 'Bullet Hail', ['Holdout Shot', 'Pistol Whip'], 'Composure', ['Parting Shot', 'Breakaway Shot'], 'Sharp Shooter', ['Two-Gun Mojo', 'Bullet Ballet'], ['Antagonize', 'Retaliation'], 'Killer Instinct', 'Lead Tempest', ['Masterful Dodge', 'Lock N Load'], ['Sniper Rifle', 'Execution Shot']], ['Dexterity', 'Vindicator', 'Warden'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You excel at short and mid-range combat with your pistols.  You can put out a lot of single target and area effect damage.<br /><br />Concepts:  Robot Gunslinger, Old West Shootist, Law Enforcer, Post-Apocalyptic Survivor, Heroic Street Vigilante<br /><br />The Gunslinger has short to mid-range attacks.  You can build up stacks of Furious which can be used to temporarily increase your critical chance and recover some health when hit.  Your intimidating presence can also put fear in their enemies.' + ArchetypeUnlock(true, "High Noon at Snake Gulch"));

//==============================================================================
// Get Methods
//==============================================================================

// get data methods
getDataSuperStat = function() { return dataSuperStat; }
getDataInnateTalent = function() { return dataInnateTalent; }
getDataTalent = function() { return dataTalent; }
getDataTravelPower = function() { return dataTravelPower; }
getDataPowerSet = function() { return dataPowerSet; }
getDataFramework = function() { return dataFramework; }
getDataPower = function() { return dataPower; }
getDataEnergyUnlockPower = function() { return dataEnergyUnlockPower; }
getDataRequireGroup = function() { return dataRequireGroup; }
getDataSpecializationTree = function() { return dataSpecializationTree; }
getDataArchetypeGroup = function() { return dataArchetypeGroup; }
getDataArchetype = function() { return dataArchetype; }

//==============================================================================
// powerhouse-data.js ends here
//==============================================================================
