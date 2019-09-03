/*==============================================================================
 * hc-data-harness.js
 * 
 * Current Author & Maintainer:  Aesica
 * http://aesica.net/co
 ==============================================================================*/
 
//==============================================================================
// Static classes for manipulating the newer JSON data format
//==============================================================================

var Aesica = Aesica || {};
Aesica.dataHarness = Aesica.dataHarness || {};
(function($$)
{
	class Utils
	{
		static formattedArrayList(sTitle, aList=[])
		{
			var sReturn = "<hr />" + sTitle + "<ul>";
			var i, iLength = aList.length;
			for (i = 0; i < iLength; i++)
			{
				sReturn += "<li>" + aList[i] + "</li>";
			}
			return sReturn + "</ul>";
		}
		static equals(objA, objB)
		{
			return (typeof objA === typeof objB && objA.id === objB.id);
		}
		static clone(obj)
		{
			return JSON.parse(JSON.stringify(obj));
		}
		static toString(obj)
		{
			return JSON.stringify(obj);
		}
	}
	$$.Utils = Utils;

	class ArchetypeGroup
	{
		static tip(archetypeGroup)
		{
			var sReturn = archetypeGroup ? "<b>" + archetypeGroup.name + "</b><br /><br />" + archetypeGroup.toolTip : null;
			var aExtra, i, iLength;
			var rxUpFilter = /([A-Za-z0-9 :]*) [+]([0-9%]*)/;
			var rxDownFilter = /([A-Za-z0-9 :]*) [-]([0-9%]*)/;
			if (archetypeGroup.extra)
			{
				aExtra = archetypeGroup.extra.split("/");
				iLength = aExtra.length;
				if (iLength == 1)
				{
					sReturn += "<br /><br />" + archetypeGroup.extra;
				}
				else
				{
					sReturn += "<ul>";
					for (i = 0; i < iLength; i++)
					{
						sReturn += "<li>" + aExtra[i].replace(rxUpFilter, "$1 <span class='greenText'>$2</span>").replace(rxDownFilter, "$1  <span class='redText'>$2</span>") + "</li>";
					}
					sReturn += "</ul>";
				}
			}
			return sReturn;
		}

		static code(archetypeGroup)
		{
			return numToUrlCode(archetypeGroup.id);
		}
	}
	$$.ArchetypeGroup = ArchetypeGroup;

	class Archetype
	{
		static tip(archetype)
		{
			var sReturn = "";
			if (archetype.overview) sReturn += archetype.overview + "<br /><br />";
			if (archetype.concepts) sReturn += archetype.concepts + "<br /><br />";
			if (archetype.extra) sReturn += archetype.extra + "<br /><br />";
			var i, iLength;
			sReturn += "How to unlock: ";
			if (Array.isArray(archetype.unlockType))
			{
				iLength = archetype.unlockType.length;
				sReturn += "<ul>";
				for (i = 0; i < iLength; i++)
				{
					sReturn += "<li>" + HCData.archetypeUnlock[archetype.unlockType[i]].info + "</li>";
				}
				sReturn += "</ul>";
			}
			else
			{
				sReturn += HCData.archetypeUnlock[archetype.unlockType].info;
			}
			return sReturn;
		}

		static code(archetype)
		{
			return numToUrlCode(archetype.id);
		}
	}
	$$.Archetype = Archetype;

	class Device
	{
		static tip(device)
		{
			var sReturn = "<b>" + device.name + "</b>";
			var i, iLength, sCost;
			var sPowerList = "";
			var mStats = document.createElement("table");
			if (device.bound) sReturn += "<br /><span class='" + HCData.binding[device.bound].id + "'>" + HCData.binding[device.bound].name + "</span><br />";
			if (device.toolTip) sReturn += "<br />" + Device.applyAlias(device.toolTip) + "<br />";
			if (device.uniqueEquipped) sReturn += "<br />You cannot have more than 1 of this device equipped.";
			if (device.noCooldownReduction) sReturn += "<br />This device is unaffected by cooldown reduction.";
			if (device.requiredLevel) sReturn += "<br />Must be at least level " + device.requiredLevel + " to use";
			if (device.powers)
			{
				if (Array.isArray(device.powers))
				{
					sReturn += "<hr />This device replaces your stats and powers with the following:";
					iLength = device.powers.length;
					sPowerList += "<ul>";
					for (i = 0; i < iLength; i++)
					{
						if (device.powers[i].powerRef)
						{
							console.log(device.powers[i].powerRef)
							sPowerList += "<li>" + dataPower[HCLookup.power[device.powers[i].powerRef]].name + "</li>";
						}
						else if (device.powers[i].travelPowerRef)
						{
							console.log(device.powers[i].travelPowerRef)
							sPowerList += "<li>" + dataTravelPower[HCLookup.travelPower[device.powers[i].travelPowerRef]].name + "</li>";
						}
						else sPowerList += "<li>" + device.powers[i].name + "</li>";
					}
					sPowerList += "</ul>";

					if (device.stats)
					{
						mStats.className = "becomeDeviceTipStats";
						mStats.appendChild(Aesica.HCEngine.createTableRow("Str:", device.stats.str));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Dex:", device.stats.dex));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Con:", device.stats.con));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Int:", device.stats.int));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Ego:", device.stats.ego));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Pre:", device.stats.pre));
						mStats.appendChild(Aesica.HCEngine.createTableRow("Rec:", device.stats.rec));
						mStats.appendChild(Aesica.HCEngine.createTableRow("End:", device.stats.end));
					}
					sReturn += "<table class='becomeDeviceTip'><tr><td><br />" + mStats.outerHTML + "</td><td>" + sPowerList + "</td></tr></table><hr />";

				}
				else if (typeof device.powers === "object")
				{
					sReturn += "<hr />" + Device.powerTip(device.powers) + "<hr />";
				}
			}
			if (device.source)
			{
				sReturn += "Source: " + HCData.deviceSource[device.source].name;
				if (Array.isArray(device.cost))
				{
					iLength = device.cost.length;
					sCost = "";
					for (i = 0; i < iLength; i++)
					{
						if (device.cost[i] > 0)
						{
							if (sCost == "") sCost += " (";
							else sCost += ", ";
							sCost += device.cost[i] + " " + HCData.deviceSource[device.source].currency[i];
						}
					}
					if (sCost != "") sCost += ")";
					sReturn += sCost;
				}
				else if (device.cost)
				{
					if (Array.isArray(HCData.deviceSource[device.source].currency))
					{
						sReturn += " (" + device.cost + " " + HCData.deviceSource[device.source].currency[0] + ")";
					}
					else
					{
						sReturn += " (" + device.cost + " " + HCData.deviceSource[device.source].currency + ")";
					}
				}
				if (device.requiredPower) sReturn += "<br />'" + device.requiredPower + "' must be unlocked to purchase.";
				if (device.requiredPerk) sReturn += "<br />Requires Perk: " + device.requiredPerk;
				if (device.requiredMission) sReturn += "<br />Must Complete Mission: " + device.requiredMission;
			}
			return sReturn;
		}

		static powerTip(power)
		{
			var sReturn = "<span class='deviceName'>" + power.name + "</span><br /><br /><span class='deviceStats'>";
			if (power.cost) sReturn += (Array.isArray(power.cost) ? power.cost.join("/") : power.cost) + " energy cost" + (power.chargeMin ? " (" + power.chargeMin + " min)" : "") + "<br />";
			if (power.charge) sReturn += power.charge + " sec charge" + (power.chargeMin ? " (" + power.chargeMin + " min)" : "") + "<br />";
			if (power.activate) sReturn += (Array.isArray(power.activate) ? power.activate.join("/") : power.activate) + " sec activate time" + (power.maintain ? " (" + power.maintain + " max)" : "")  + "<br />";
			if (!power.activate && power.maintain) sReturn += "(" + power.maintain + " max)<br />";
			if (power.range) sReturn += power.range.split("/").join("<br />") + "<br />";
			if (power.cooldown) sReturn += power.cooldown + " sec cooldown" + "<br />";
			sReturn += "<br /></span>" + Device.applyAlias(power.toolTip);
			return sReturn;
		}

		static applyAlias(testString)
		{
			var rxTest = /%([A-Za-z0-9]+)%/g;
			var i, iLength, aMatchList;
			if (testString)
			{
				if (testString.search(rxTest) > -1)
				{
					aMatchList = testString.match(rxTest);
					iLength = aMatchList.length;
					for (i = 0; i < iLength; i++)
					{
						//testString = testString.replace(aMatchList[i], EFFECT_ALIAS[aMatchList[i].substr(1, aMatchList[i].length - 2)]);
						testString = testString.replace(aMatchList[i], HCData.alias[aMatchList[i].substr(1, aMatchList[i].length - 2)]);
					}
				}
			}
			return testString;
		}			

		static code(device)
		{
			return numToUrlCode2(device.id);
		}
	}
	$$.Device = Device;

	class SuperStat
	{
		static code(superStat)
		{
			return numToUrlCode(superStat.id);
		}
		static abbrev(superStat, letterCount=3)
		{
			return superStat.name.substr(0, letterCount);
		}
		static icon(superStat)
		{
			return "Stat_" + superStat.name;
		}
		static tip(superStat)
		{
			var sReturn;
			var i, iLength;
			if (superStat)
			{ 
				sReturn = "<b>" + superStat.name + "</b><br /><br />" + superStat.info;
				if (superStat.forms) sReturn += Utils.formattedArrayList("Forms", superStat.forms);
				if (superStat.primaryEUs) sReturn += Utils.formattedArrayList("Energy Unlocks (Main Bonus)", superStat.primaryEUs);
				if (superStat.secondaryEUs) sReturn += Utils.formattedArrayList("Energy Unlocks (Lesser Bonus)", superStat.secondaryEUs);
			}
			return sReturn;
		}
	}
	$$.SuperStat = SuperStat;

	class InnateTalent
	{
		static extra(innateTalent)
		{
			var sReturn = "";
			if (innateTalent)
			{
				if (innateTalent.stats.str > 5) sReturn += "Str: " + innateTalent.stats.str + ", ";
				if (innateTalent.stats.dex > 5) sReturn += "Dex: " + innateTalent.stats.dex + ", ";
				if (innateTalent.stats.con > 5) sReturn += "Con: " + innateTalent.stats.con + ", ";
				if (innateTalent.stats.int > 5) sReturn += "Int: " + innateTalent.stats.int + ", ";
				if (innateTalent.stats.ego > 5) sReturn += "Ego: " + innateTalent.stats.ego + ", ";
				if (innateTalent.stats.pre > 5) sReturn += "Pre: " + innateTalent.stats.pre + ", ";
				if (innateTalent.stats.rec > 5) sReturn += "Rec: " + innateTalent.stats.rec + ", ";
				if (innateTalent.stats.end > 5) sReturn += "End: " + innateTalent.stats.end + ", ";
				if (sReturn.length > 2) sReturn = sReturn.substr(0, sReturn.length - 2);
			}
			return sReturn;
		}
		static tip(innateTalent)
		{
			var sReturn = "<b>" + innateTalent.name + "</b><br /><br />" + (innateTalent.overrideTip ? innateTalent.overrideTip : "This is the innate talent for " + innateTalent.name + ".")  + "<br /><br /><table>";
			sReturn += "<tr><td>Str:</td><td>" + innateTalent.stats.str + "</td></tr>";
			sReturn += "<tr><td>Dex:</td><td>" + innateTalent.stats.dex + "</td></tr>";
			sReturn += "<tr><td>Con:</td><td>" + innateTalent.stats.con + "</td></tr>";
			sReturn += "<tr><td>Int:</td><td>" + innateTalent.stats.int + "</td></tr>";
			sReturn += "<tr><td>Ego:</td><td>" + innateTalent.stats.ego + "</td></tr>";
			sReturn += "<tr><td>Pre:</td><td>" + innateTalent.stats.pre + "</td></tr>";
			sReturn += "<tr><td>Rec:</td><td>" + innateTalent.stats.rec + "</td></tr>";
			sReturn += "<tr><td>End:</td><td>" + innateTalent.stats.end + "</td></tr>";
			sReturn += "</table>";
			return sReturn;
		}
		static code(innateTalent)
		{
			return numToUrlCode2(innateTalent.id);
		}
	}
	$$.InnateTalent = InnateTalent;

	class Talent
	{
		static extra(talent)
		{
			var sReturn = "";
			if (talent)
			{
				if (talent.stats.str > 0) sReturn += "Str: " + talent.stats.str + ", ";
				if (talent.stats.dex > 0) sReturn += "Dex: " + talent.stats.dex + ", ";
				if (talent.stats.con > 0) sReturn += "Con: " + talent.stats.con + ", ";
				if (talent.stats.int > 0) sReturn += "Int: " + talent.stats.int + ", ";
				if (talent.stats.ego > 0) sReturn += "Ego: " + talent.stats.ego + ", ";
				if (talent.stats.pre > 0) sReturn += "Pre: " + talent.stats.pre + ", ";
				if (talent.stats.rec > 0) sReturn += "Rec: " + talent.stats.rec + ", ";
				if (talent.stats.end > 0) sReturn += "End: " + talent.stats.end + ", ";
				if (sReturn != "") sReturn = sReturn.substr(0, sReturn.length - 2);
			}
			return sReturn;
		}
		static tip(talent)
		{
			return Talent.extra(talent);
		}
		static code(talent)
		{
			return numToUrlCode(talent.id);
		}
	}
	$$.Talent = Talent;

	class Specialization
	{
		static code(specialization)
		{
			return numToUrlCode(specialization.id);
		}
		static getPoints(specialization, mask)
		{
			var test1, test2, points = 0;
			if (mask > 0)
			{
				test1 = Math.pow(2, specialization.id * 2);
				test2 = Math.pow(2, specialization.id * 2 + 1);
				if ((mask & test1) == test1) points += 1;
				if ((mask & test2) == test2) points += 2;
			}
			return points;		
		}
	}
	$$.Specialization = Specialization;

	class SpecializationTree
	{
		static code(specTree)
		{
			return numToUrlCode(specTree.id);
		}
		static getSpecializationList(specTree, mask)
		{
			var specializationList = [];
			for (var i = 0; i < specTree.specializationList.length; i++)
			{
				if (mask > 0)
				{
					var test1 = Math.pow(2, i*2);
					var test2 = Math.pow(2, i*2 + 1);
					var num = 0;
					if ((mask & test1) == test1) num += 1;
					if ((mask & test2) == test2) num += 2;
					specializationList[i] = num;
				}
				else
				{
					specializationList[i] = 0;
				}
			}
			return specializationList;
		}
		static getPoints(specTree, mask)
		{
			var points = 0;
			if (mask > 0)
			{
				var specializationList = SpecializationTree.getSpecializationList(specTree, mask);
				for (var i = 0; i < specializationList.length; i++)
				{
					points += specializationList[i];
				}
			}
			return points;
		}
		static getTierPoints(specTree, mask, tier)
		{
			var points = 0;
			if (mask > 0)
			{
				var specializationList = SpecializationTree.getSpecializationList(specTree, mask);
				for (var i = 0; i < specializationList.length; i++)
				{
					if (specTree.specializationList[i].tier == tier) points += specializationList[i];
				}
			}
			return points;
		}
		static hasSpecialization(specTree, mask, id)
		{
			var test1 = Math.pow(2, id * 2);
			var test2 = Math.pow(2, id * 2 + 1);
			return (mask > 0 && ((mask & test1) == test1) || ((mask & test2) == test2));
		}
		static incrSpecialization(specTree, mask, id)
		{
			var points = Specialization.getPoints(specTree.specializationList[id], mask);
			if (points < specTree.specializationList[id].maxPoints)
			{
				points++;
				var base = mask & ~Math.pow(2, id * 2) & ~Math.pow(2, id * 2 + 1);
				switch (points)
				{
					case 0: return base; break;
					case 1: return base | Math.pow(2, id * 2); break;
					case 2: return base | Math.pow(2, id * 2 + 1); break;
					case 3: return base | Math.pow(2, id * 2) | Math.pow(2, id * 2 + 1); break;
				}
			}
			else
			{
				return mask;
			}
		}
		static decrSpecialization(specTree, mask, id)
		{
			var points = Specialization.getPoints(specTree.specializationList[id], mask);
			if (points > 0)
			{
				points--;
				var base = mask & ~Math.pow(2, id * 2) & ~Math.pow(2, id * 2 + 1);
				switch (points)
				{
					case 0: return base; break;
					case 1: return base | Math.pow(2, id * 2); break;
					case 2: return base | Math.pow(2, id * 2 + 1); break;
					case 3: return base | Math.pow(2, id * 2) | Math.pow(2, id * 2 + 1); break;
				}
			}
			else
			{
				return mask;
			}
		}
	}
	$$.SpecializationTree = SpecializationTree;

	class TravelPower
	{
		static icon(id)
		{
			var sReturn;
			var oTP = HCData.travelPower[id];
			if (oTP.altIcon) sReturn = oTP.altIcon;
			else sReturn = "TravelPower_" + oTP.name.replace(/[^A-Za-z0-9_]+/g, "");
			return sReturn;			
		}
		static tip(id)
		{
			var sReturn = "";
			var oTP = HCData.travelPower[id];
			if (this.type)
			{
				if (!oTP.overrideTip) sReturn = dataPowerAlias[TRAVEL_POWER_TYPES[oTP.type]].tip;
				else sReturn = oTP.overrideTip;
				if (this.extra) sReturn += "<br /><br />" + this.extra;
				
				sReturn = "<div class=\"popupRight\">Travel Power - " + TRAVEL_POWER_TYPES[this.type] + (this.isVariant ? " (Variant)" : "") + "</div><b>" + this.name + "</b><br /><br />" + sReturn;
		
				sReturn += "<br />";
				var i, iLength;
				if (this.unlockType && this.unlockType > 0) sReturn += "<br /><b>" + TP_UNLOCKTYPES[this.unlockType] + (this.ingameCost ? " for " + this.ingameCost : "") + "</b>";
				if (this.otherSources)
				{
					iLength = this.otherSources.length;
					for (i = 0; i < iLength; i++)
					{
						sReturn += "<br /><b>" + this.otherSources[i] + "</b>";
					}
				}
			}
			return sReturn;			
		}

		static code(travelPower)
		{
			return numToUrlCode2(travelPower.id);
		}

		static getAdvantageList(travelPower, mask)
		{
			var advantageList = [];
			if (mask > 0) {
				for (var i = 1; i < travelPower.advantageList.length; i++)
				{
					var test = Math.pow(2, i);
					if ((mask & test) == test) advantageList.push(travelPower.advantageList[i]);
				}
			}
			return advantageList;
		}

		static getPoints(travelPower, mask)
		{
			var points = 0;
			if (mask > 0)
			{
				for (var i = 1; i < travelPower.advantageList.length; i++)
				{
					var test = Math.pow(2, i);
					if ((mask & test) == test) points += travelPower.advantageList[i].points;
				}
			}
			return points;
		}

		static hasAdvantage(mask, id)
		{
			var test = Math.pow(2, id);
			return (mask > 0 && (mask & test) == test);
		}
		
		static addAdvantage(mask, id)
		{
			return mask | Math.pow(2, id);
		}
		
		static delAdvantage(mask, id)
		{
			return mask & ~Math.pow(2, id);
		}		
	}
	$$.TravelPower = TravelPower;

	function buildLookupTables()
	{
		Aesica.HCEngine.writeMessage("Building lookup tables...");
		var i, iLength, oCurrent;
		HCLookup.power = {};
		iLength = HCData.power.length;
		for (i = 0; i < iLength; i++)
		{
			HCLookup.power[HCData.power[i].name] = i;
			if (HCData.power[i].id != i) console.log("Warning: Power ID mismatch for " + HCData.power[i].name + " (id:" + HCData.power[i].id + ", i:" + i + ")");
		}
		if (prefs.debug) console.log("Lookup tables: Processed " + i + " powers.");
	}
	$$.buildLookupTables = buildLookupTables;


})(Aesica.dataHarness);