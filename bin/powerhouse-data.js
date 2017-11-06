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
// Classes
//==============================================================================

class DamageType
{
	constructor(name="", group="", frameworks=[])
	{
		this.name = name;
		this.group = group;
		this.frameworks = frameworks;
	}

	get frameworkList()
	{
		var sReturn = "";
		var i, iLength = this.frameworks.length;
		for (i = 0; i < iLength; i++)
		{
			if (i > 0) sReturn += ", ";
			sReturn += dataFramework[this.frameworks[i]].name;
		}
		return sReturn;
	}

	toString()
	{
		return JSON.stringify(this);
	}
}

class SuperStat
{
	constructor(id=0, name="", info="", forms=null, primaryEUs=null, secondaryEUs=null)
	{
	    this.id = id;
	    this.name = name;
		this.info = info;
		this.forms = forms;
		this.primaryEUs = primaryEUs;
		this.secondaryEUs = secondaryEUs;
    }
	code()
	{
		return numToUrlCode(this.id);
	}

	get abbrev()
	{
		return this.name.substr(0, 3);
	}
	get desc()
	{
		return "<div class='Sprite Stat_" + this.name + "'></div>&nbsp;" + this.name;
	}
	get tip()
	{
		var sReturn = "<b>" + this.name + "</b><br /><br />" + this.info;
		var i, iLength;
		if (this.forms) sReturn += SuperStat.formattedArrayList("Forms", this.forms);
		if (this.primaryEUs) sReturn += SuperStat.formattedArrayList("Energy Unlocks (Main Bonus)", this.primaryEUs);
		if (this.secondaryEUs) sReturn += SuperStat.formattedArrayList("Energy Unlocks (Lesser Bonus)", this.secondaryEUs);
		return sReturn;
	}
    equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    toString()
	{
		return "{code:" + this.code() + "}" + JSON.stringify(this);
    }
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
}

class InnateTalent
{

	constructor(id=0, name="", stats={}, overrideTip=null)
	{
	    this.id = id;
	    this.name = name;
		this.overrideTip = overrideTip;
		this.stats = {};
		this.stats.str = (typeof stats.str == "number") ? stats.str : 5;
		this.stats.dex = (typeof stats.dex == "number") ? stats.dex : 5;
		this.stats.con = (typeof stats.con == "number") ? stats.con : 5;
		this.stats.int = (typeof stats.int == "number") ? stats.int : 5;
		this.stats.ego = (typeof stats.ego == "number") ? stats.ego : 5;
		this.stats.pre = (typeof stats.pre == "number") ? stats.pre : 5;
		this.stats.rec = (typeof stats.rec == "number") ? stats.rec : 5;
		this.stats.end = (typeof stats.end == "number") ? stats.end : 5;
//'Sureshot', 'Sureshot', 'Dex: 12, Int: 12', 'This is the innate talent for Archery.<br />Con: 5, End: 5, Str: 5, Dex: 12, Int: 12, Ego: 5, Pre: 5, Rec: 5');

	}
	get desc()
	{
		return this.name;
	}
	get extra()
	{
		var sReturn = "";
		if (this.stats.str > 5) sReturn += "Str: " + this.stats.str + ", ";
		if (this.stats.dex > 5) sReturn += "Dex: " + this.stats.dex + ", ";
		if (this.stats.con > 5) sReturn += "Con: " + this.stats.con + ", ";
		if (this.stats.int > 5) sReturn += "Int: " + this.stats.int + ", ";
		if (this.stats.ego > 5) sReturn += "Ego: " + this.stats.ego + ", ";
		if (this.stats.pre > 5) sReturn += "Pre: " + this.stats.pre + ", ";
		if (this.stats.rec > 5) sReturn += "Rec: " + this.stats.rec + ", ";
		if (this.stats.end > 5) sReturn += "End: " + this.stats.end + ", ";
		if (sReturn != "") sReturn = sReturn.substr(0, sReturn.length - 2);
		return sReturn;
	}
	get tip()
	{
		var sReturn = "<b>" + this.name + "</b><br /><br />" + (this.overrideTip ? this.overrideTip : "This is the innate talent for " + this.name + ".")  + "<br /><br /><table>";
		sReturn += "<tr><td>Str:</td><td>" + this.stats.str + "</td></tr>";
		sReturn += "<tr><td>Dex:</td><td>" + this.stats.dex + "</td></tr>";
		sReturn += "<tr><td>Con:</td><td>" + this.stats.con + "</td></tr>";
		sReturn += "<tr><td>Int:</td><td>" + this.stats.int + "</td></tr>";
		sReturn += "<tr><td>Ego:</td><td>" + this.stats.ego + "</td></tr>";
		sReturn += "<tr><td>Pre:</td><td>" + this.stats.pre + "</td></tr>";
		sReturn += "<tr><td>Rec:</td><td>" + this.stats.rec + "</td></tr>";
		sReturn += "<tr><td>End:</td><td>" + this.stats.end + "</td></tr>";
		sReturn += "</table>";
		return sReturn;
	}
    code()
	{
        return numToUrlCode2(this.id);
   	}
    equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    toString()
	{
		return "{code:" + this.code() + "}" + JSON.stringify(this);
    }
}

class Talent
{
	constructor(id=0, name="", stats={})
	{
    	this.id = id;
    	this.name = name;
		this.stats = {};
		this.stats.str = (typeof stats.str == "number") ? stats.str : 0;
		this.stats.dex = (typeof stats.dex == "number") ? stats.dex : 0;
		this.stats.con = (typeof stats.con == "number") ? stats.con : 0;
		this.stats.int = (typeof stats.int == "number") ? stats.int : 0;
		this.stats.ego = (typeof stats.ego == "number") ? stats.ego : 0;
		this.stats.pre = (typeof stats.pre == "number") ? stats.pre : 0;
		this.stats.rec = (typeof stats.rec == "number") ? stats.rec : 0;
		this.stats.end = (typeof stats.end == "number") ? stats.end : 0;		
	}
	get desc()
	{
		return this.name;
	}
	get extra()
	{
		var sReturn = "";
		if (this.stats.str > 0) sReturn += "Str: " + this.stats.str + ", ";
		if (this.stats.dex > 0) sReturn += "Dex: " + this.stats.dex + ", ";
		if (this.stats.con > 0) sReturn += "Con: " + this.stats.con + ", ";
		if (this.stats.int > 0) sReturn += "Int: " + this.stats.int + ", ";
		if (this.stats.ego > 0) sReturn += "Ego: " + this.stats.ego + ", ";
		if (this.stats.pre > 0) sReturn += "Pre: " + this.stats.pre + ", ";
		if (this.stats.rec > 0) sReturn += "Rec: " + this.stats.rec + ", ";
		if (this.stats.end > 0) sReturn += "End: " + this.stats.end + ", ";
		if (sReturn != "") sReturn = sReturn.substr(0, sReturn.length - 2);
		return sReturn;
	}
	code()
	{
        return numToUrlCode(this.id);
    }
    equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
    toString()
	{
        return "{code:" + this.code() + "}" + JSON.stringify(this);
    }
}

// power advantage class
class PowerAdvantage
{
	//constructor(id, name, desc, points, dependency, tip)
	constructor(name=null, points=null, dependency=null, toolTip=null)
	{
		this.id = PowerAdvantage.getNextEnumeration(name === null)
	    this.name = name;
	    this.points = points;
	    this.dependency = dependency;
		this.toolTip = toolTip;
	}
	get desc()
	{
		return this.name;
	}
	get tip()
	{
		return "<div class=\"popupRight\">Points: " + this.points + " </div><b>" + this.name + "</b><br /><br />" + this.toolTip;
	}
	clone()
	{
		return new PowerAdvantage(this.name, this.points, this.dependency, this.toolTip);
	}
	toString()
	{
        return JSON.stringify(this);
	}
	static getNextEnumeration(bReset=false)
	{
		if (bReset) PowerAdvantage.enumerator = 0;
		var iReturn = PowerAdvantage.enumerator;
		PowerAdvantage.enumerator++;
		return iReturn;		
	}
	static legacyConstructor(id, name, desc, points, dependency, tip)
	{
		return new PowerAdvantage(name, points, dependency, tip);
	}
}
PowerAdvantage.enumerator = 0;

// power alias class
class PowerAlias
{
	constructor(power)
	{
		this.power = power;

	}
	get id()
	{
		return this.power.id;
	}
	get name()
	{
		return this.power.name;
	}
	get desc()
	{
		return this.power.name;
	}
	get tip()
	{
		return (this.power.toolTip) ? this.power.toolTip : this.power.tip;
	}
	get type()
	{
		return (this.power) ? this.power.constructor.name : "";
	}
	replicate(newPowerSet=null, newFramework=null)
	{
		var oReturn = null;
		if (this.type === "Power" || this.type === "PowerAdvantage")
		{
			oReturn = this.power.clone(newPowerSet, newFramework);
		}
		return oReturn;
	}
	equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
	toString()
	{
        return JSON.stringify(this);
	}
	static textOnly(name, tip)
	{
		return PowerAlias.legacyConstructor(name, name, name, tip);
	}
	static legacyConstructor(id, name, desc, tip)
	{
		return new PowerAlias({"id":id, "name":name, "desc":desc, "tip":tip, "isLegacy":true}); //name, "[Legacy: Range NYI]", "[Legacy: Tags NYI]", tip);
	}
}

class TravelPower
{
	constructor(iTravelPowerType=null, iUnlockType=null, sName=null, sAltIcon=null, sExtra=null, sOverrideTip=null, aOtherSources=[])
	{
	    this.id = dataTravelPower.length;
		this.name = sName;
		this.altIcon = sAltIcon;		
		this.isVariant = (sOverrideTip !== null || sExtra !== null);
		this.type = iTravelPowerType;
		this.overrideTip = sOverrideTip;
		this.extra = sExtra;
		this.unlockType = iUnlockType;
		this.ingameCost = null;
		this.advantageList = [];
		this.otherSources = aOtherSources;
		this.ingameCost = TP_PRICETAG[iUnlockType];
		if (this.type)
		{
			this.advantageList.push(new PowerAdvantage());
			this.advantageList.push(new PowerAdvantage("Rank 2", 1, null, "Increases the speed of this travel power."));
			this.advantageList.push(new PowerAdvantage("Rank 3", 1, 1, "Further increases the speed of this travel power."));
		}
	}

	get desc()
	{
		var sReturn;
		if (this.name)
		{
			if (this.altIcon) sReturn = "<div class=\"Sprite TravelPower_" + this.altIcon + "\"></div>&nbsp;" + this.name;
			else sReturn = "<div class=\"Sprite TravelPower_" + this.name.replace(/[^A-Za-z0-9_]+/g, "") + "\"></div>&nbsp;" + this.name;
		}
		return sReturn;
	}

	get tip()
	{
		var sReturn = "";
		if (this.type)
		{
			if (!this.overrideTip) sReturn = dataPowerAlias[TRAVEL_POWER_TYPES[this.type]].tip;
			else sReturn = this.overrideTip;
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
	
	insertAdvantage(sName, iCost, sTip, iDependency=null)
	{
		this.advantageList.push(PowerAdvantage.legacyConstructor(this.advantageList.length, sName, sName, iCost, iDependency, sTip));
	}
	
    code()
	{
        return numToUrlCode2(this.id);
	}
	
    getAdvantageList(mask)
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
	
    getPoints(mask)
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
	
    hasAdvantage(mask, id)
	{
        var test = Math.pow(2, id);
        return (mask > 0 && (mask & test) == test);
	}
	
    addAdvantage(mask, id)
	{
        return mask | Math.pow(2, id);
	}
	
    delAdvantage(mask, id)
	{
        return mask & ~Math.pow(2, id);
	}
	
    equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
	}
	
    toString()
	{
        var advantageList = "[";
        for (var i = 1; i < this.advantageList.length; i++)
		{
            if (i > 1) advantageList = advantageList + ",";
            advantageList = advantageList + "<br /> &nbsp;&nbsp;&nbsp;&nbsp; " + this.advantageList[i].toString();
        }
        advantageList = advantageList + "<br />]";
        return JSON.stringify(this) + "{advantageList:" + advantageList + ", {code:" + this.code() + "]";
    }
}


/*
class PowerSet
{

}

class Framework
{

}

*/
// power class
class Power
{
	//		...(id, name, desc, powerSet, framework, power, tier, toolTip)
	constructor(powerSet, framework, tier, name, activationDelay, castTime, tickRate, minCharge, cost, cooldown, range, tags, toolTip, powerType=1, isMultiFrameworkPower=false, resetPowerID=false)
	{
	    this.id = Power.getNextPowerID();
	    this.power = Power.getNextFrameworkPowerID(resetPowerID);
	    this.powerSet = powerSet - 1; // TODO:  This is a stopgap fix. don't leave it in
    	this.framework = framework;
		this.tier = tier;
    	this.name = name;
		this.range = range;
		this.tags = tags;
		this.castTime = castTime;
		this.activationDelay = activationDelay;
		this.tickRate = tickRate;
		this.minCharge = minCharge;
		this.cost = cost;
		this.cooldown = cooldown;
		this.toolTip = toolTip;
		this.powerType = powerType;
		this.isMultiFrameworkPower = isMultiFrameworkPower;
		this.iconOverride = null;
		this.advantageList = [];

		if (powerType !== Power.TYPE_ENERGY_UNLOCK && powerType !== Power.TYPE_LEGACY)
		{
			if (this.powerType === Power.TYPE_NORMAL)
			{
				this.advantageList.push(new PowerAdvantage(null, null, null, null));
				this.advantageList.push(new PowerAdvantage("Rank 2", 2, null, "Increases the strength of the power by 20%."));
				this.advantageList.push(new PowerAdvantage("Rank 3", 2, 1, "Increases the strength of the power by an additional 20%.  This bonus is cumulative with Rank 2."));
			}
			else if (this.powerType === Power.TYPE_ENERGY_BUILDER)
			{
				this.advantageList.push(new PowerAdvantage(null, null, null, null));
				this.advantageList.push(new PowerAdvantage("Rank 2", 2, null, "Increases the strength of the power by 20% and its energy building strength by ~10%."));
				this.advantageList.push(new PowerAdvantage("Rank 3", 2, 1, "R3EB', 'Rank 3', 'Rank 3', 'Increases the strength of the power by an additional 20% and its energy building strength by an additional ~10%.  These bonuses are cumulative with Rank 2."));
			}
			else if (this.powerType === Power.TYPE_FORM)
			{
				this.advantageList.push(new PowerAdvantage(null, null, null, null));
				this.advantageList.push(new PowerAdvantage("Rank 2", 2, null, "Grants 2 stacks by default."));
				this.advantageList.push(new PowerAdvantage("Rank 3", 2, 1, "Grants 3 stacks by default."));
			}
		}
	}
	get desc()
	{
		var rxNameFilter = /[^A-Za-z0-9]*/g;
		var sFrameworkLabel
		var sReturn = "";
		if (this.iconOverride)
		{
			sReturn = '<div class="Sprite ' + this.iconOverride + '"></div>&nbsp;' + this.name;
		}
		else if (this.id > 0)
		{
			sFrameworkLabel = this.isMultiFrameworkPower ? dataPowerSet[this.powerSet].name : dataFramework[this.framework].name;
			sReturn = '<div class="Sprite ' + sFrameworkLabel.replace(rxNameFilter, "") + '_' + this.name.replace(rxNameFilter, "") + '"></div>&nbsp;' + this.name;
		}
		return sReturn;
	}
	get tip()
	{
		var sFrameworkLabel = this.isMultiFrameworkPower ? dataPowerSet[this.powerSet].name : dataFramework[this.framework].name;
		var sRequirements = "";
		var rxRangeFormat = /\//g;
		// cost
		var sCost = "";
		if (this.cost > 0 || Array.isArray(this.cost)) sCost = (Array.isArray(this.cost) ? this.cost.join("-") : this.cost ) + " energy<br />";
		var sActivate = (Array.isArray(this.activationDelay) ? this.activationDelay.join("/") : this.activationDelay) + " sec activate time";
		// charge time
		if (this.castTime > 0 && this.tickRate == 0) sActivate = (Array.isArray(this.castTime) ? this.castTime.join("/") : this.castTime) + " sec charge time" + (this.minCharge > 0 ? " (" + this.minCharge + " min)" : "") + "<br />" + sActivate;
		// maintain time - requires array for cost as well: [initial, perTick] - overwrites sCost readout
		else if (this.castTime > 0 && this.tickRate > 0)
		{
			sCost = this.cost[0] + " + " + this.cost[1] + " energy per " + this.tickRate + " sec";
			//sActivate = (Array.isArray(this.tickRate) ? this.tickRate.join("/") : this.tickRate) + " sec maintain (" + (Array.isArray(this.castTime) ? this.castTime.join("/") : this.castTime) + " sec max)<br />" + sActivate;
			sActivate = " (" + this.castTime + " sec max)<br />" + sActivate;
		}
		// default/legacy/empty value
		else if (this.activationDelay == 0) sActivate = "";
		var sRange = this.range ? this.range.replace(rxRangeFormat, "<br />") : "";
		var sEU = this.powerType === Power.TYPE_ENERGY_UNLOCK ? "You can only have 1 energy unlock<br /><br />" : "";
		var sCooldown = "";
		if (this.cooldown > 0) sCooldown = ((this.cooldown > 59) ? Math.floor(this.cooldown / 60) + " min " + ((this.cooldown % 60 > 0) ? (this.cooldown % 60) + " sec " : "") : this.cooldown + " sec ") + "cooldown";
		if (this.tier == -1) sRequirements = "You can only have 1 energy builder<br /><br />";
		else if (this.tier > 3) sRequirements = "Requires level 35<br />You may only own 1 Ultimate Power<br /><br />";
		else if (this.tier != 0) sRequirements = "Requires " + (this.tier * 2 - 1) + " power" + (this.tier == 1 ? "" : "s") + " from " + sFrameworkLabel + " or " + (this.tier * 2) + " non-energy-building powers from any framework.<br /><br />";
		var sReturn = "<div class='popupRight'>" + sFrameworkLabel + " - " + this.tierName + "<br /><br />" + sRange + "<br />" + sCooldown + "</div><b>" + this.desc + "</b><br />" + sCost + (sActivate == "" ? "" : sActivate + "<br /><br />") + sRequirements + sEU + Power.parseTags(this.tags) + "<br /><br />" + this.toolTip;
		return sReturn;
	}
	get tierName()
	{
		var sReturn;
		if (this.tier == 4) sReturn = "Ultimate";
		else if (this.tier == -1) sReturn = "Energy Builder";
		else sReturn = "Tier " + this.tier;
		return sReturn;
	}
	code()
	{
        return numToUrlCode(this.framework) + numToUrlCode(this.power);
    }
	getAdvantageList(mask)
	{
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
	getPoints(mask)
	{
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
	hasAdvantage(mask, id)
	{
        var test = Math.pow(2, id);
        return (mask > 0 && (mask & test) == test);
    }
	addAdvantage(mask, id)
	{
        return mask | Math.pow(2, id);
    }
	delAdvantage(mask, id)
	{
        return mask & ~Math.pow(2, id);
	}
	insertAdvantage(name, points, dependency, tip)
	{
		this.advantageList.push(new PowerAdvantage(name, points, dependency, tip));
	}
	insertStockAdvantages(...advantages)
	{
		var i, iLength = advantages.length;
		for (i = 0; i < iLength; i++)
		{
			this.advantageList.push(dataPowerAlias[advantages[i]].replicate());
		}
	}
	clone(newPowerSet, newFramework)
	{
		var i, iLength = this.advantageList.length;
		var oReturn = new Power(newPowerSet, newFramework, this.tier, this.name, this.activationDelay, this.castTime, this.tickRate, this.minCharge, this.cost, this.cooldown, this.range, this.tags, this.toolTip, this.powerType, this.isMultiFrameworkPower)
		oReturn.iconOverride = this.iconOverride;
		for (i = 0; i < iLength; i++)
		{
			oReturn.advantageList[i] = this.advantageList[i].clone();
		}
		return oReturn;
	}
	equals(obj)
	{
        return (typeof(this) == typeof(obj) && this.id == obj.id);
    }
	toString()
	{
        var advantageList = '[';
        for (var i = 1; i < this.advantageList.length; i++) {
            if (i > 1) advantageList = advantageList + ',';
            advantageList = advantageList + '<br /> &nbsp;&nbsp;&nbsp;&nbsp; ' + this.advantageList[i].toString();
        }
        advantageList = advantageList + '<br />]';
        return "{code:" + this.code() + "} " + JSON.stringify(this) + "<br />" + advantageList + "<br />"
	}
	
	static getNextPowerID()
	{
		return Power.id++;
	}
	static getNextFrameworkPowerID(bReset=false)
	{
		if (bReset) Power.frameworkID = 0;
		var iReturn = Power.frameworkID;
		Power.frameworkID++;
		return iReturn;
	}
	static legacyConstructor(id, name, desc, powerSet, framework, power, tier, toolTip)
	{
		if (toolTip)
		{
			var aTemp = toolTip.split("<br /><br />");
			var sRangeTags = aTemp[0].split(", ")[1];
			if (tier > 0) aTemp.splice(0, 2);
			else aTemp.splice(0, 1);
			toolTip = aTemp.join("<br /><br />");
		}
		return new Power(powerSet, framework, tier, name, 0, 0, 0, 0, 0, 0, "[Legacy Data]", sRangeTags, toolTip, false, false, (power == 0));
	}
	static parseTags(sTags)
	{
		return sTags ? sTags.replace(/\//g, " - ") : "";
	}
}
Power.id = 0;
Power.frameworkID = 0;
Power.TYPE_LEGACY = 0; // apply no advantages since legacy entries apply these manually
Power.TYPE_NORMAL = 1; // apply null/r2/r3 advantages automatically
Power.TYPE_ENERGY_BUILDER = 2; // apply null/ebr2/ebr3 advantages automatically
Power.TYPE_ENERGY_UNLOCK = 3; // apply no advantages
Power.TYPE_FORM = 4; // apply null/fr2/fr3 advantages automatically
/*
class Specialization
{

}

class SpecializationTree
{

}

class Archetype
{

}
*/

const UNLOCK_COLLECTOR = "Collectors Store";
const UNLOCK_PURPLE_FOIL = "Purple Foil Special Item Voucher";
const UNLOCK_RECOGNITION = "Recognition Vendor";
const UNLOCK_ONSLAUGHT = "Onslaught Vendor";

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
const TP_UNLOCK_COLLECTOR = 6;
const TP_UNLOCKTYPES = ["", "Freely available", "C-Store", "Free for Gold/LTS<br />C-Store", "Questionite Store", "Legacy crafting - no longer available", "Collector Store"];
const TP_PRICETAG = [null, null, "525 Zen", "525 Zen", "250,000 Questionite", null, "1 Purple Foil Special Item Voucher"];

//==============================================================================
// Damage Types
//==============================================================================
var dataDamageType = [];
dataDamageType.push(new DamageType("Slashing", "Physical", [7, 11, 12, 13, 23]));
dataDamageType.push(new DamageType("Piercing", "Physical", [6, 8]));
dataDamageType.push(new DamageType("Crushing", "Physical", [3, 4, 8, 9, 14, 17, 18, 19]));
dataDamageType.push(new DamageType("Fire", "Elemental", [2, 6, 8, 17]));
dataDamageType.push(new DamageType("Ice", "Elemental", [4, 5]));
dataDamageType.push(new DamageType("Toxic", "Elemental", [6, 7, 23, 24]));
dataDamageType.push(new DamageType("Electrical", "Energy", [1, 4, 6]));
dataDamageType.push(new DamageType("Particle", "Energy", [7, 9, 10]));
dataDamageType.push(new DamageType("Sonic", "Energy", [6, 7, 19]));
dataDamageType.push(new DamageType("Ego", "Paranormal", [15, 16]));
dataDamageType.push(new DamageType("Dimensional", "Paranormal", [14, 20, 21]));
dataDamageType.push(new DamageType("Magic", "Paranormal", [22]));


//==============================================================================
// Super Stats
//==============================================================================
// super stat data
var dataSuperStat = [];
dataSuperStat[dataSuperStat.length] = new SuperStat();
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Strength", "Improves Melee Damage, Melee Knocks, Knock Resistance, and the pick-up and throw ability.", ["Aspect of the Machine", "Enrage", "Aspect of the Bestial"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Dexterity", "Improves a hero\\\'s Critical Hit Chance and effectiveness of Stealth granting powers.", ["Chilled Form", "Sharp Shooter", "Form of the Tempest", "Form of the Tiger", "Form of the Swordsman", "Form of the Master", "Mental Discipline", "Mental Precision"], ["Steadfast"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Constitution", "Improves a hero\\\'s Hit Points.", null, ["Spirit Reverberation"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Intelligence", "Affects the hero\\\'s power cooldown length, Stealth Detection, and the Energy Cost of their powers.", ["Concentration", "Particle Accelerator", "Manipulator", "Spellcaster"], ["Molecular Self-Assembly", "Conjuring"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Ego", "Improves Ranged Damage, Ranged Knocks, and Hold Resistance.", ["Chilled Form", "Concentration"], ["Hunter\\\'s Instinct"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Presence", "Improves Healing Strength, Hold Duration, and Crowd Control Resistance.", ["Manipulator", "Compassion"], ["Telepathic Reverberation"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Recovery", "Sets the hero\\\'s Equilibrium, increases rate of Energy generated from Energy building attacks, and grants a small increase to Maximum Energy.", ["Compassion"], ["Ionic Reverberation", "Killer Instinct", "Overdrive", "Relentless", "Telekinetic Reverberation", "Supernatural Power"], ["Thermal Reverberation", "Wind Reverberation", "Icy Embrace", "Hunter\\\'s Instinct", "Molecular Self-Assembly", "Unified Theory", "Steadfast", "Telepathic Reverberation", "Spirit Reverberation", "Conjuring", "Wild Thing", "Mephitic"]);
dataSuperStat[dataSuperStat.length] = new SuperStat(dataSuperStat.length, "Endurance", "Affects a hero\\\'s Maximum Energy and rate of energy generated from fighting attacks.", ["Power Source"], ["Ionic Reverberation", "Thermal Reverberation", "Wind Reverberation", "Icy Embrace", "Unified Theory", "Wild Thing", "Mephitic"], ["Overdrive", "Relentless", "Telekinetic Reverberation"]);

//==============================================================================
// Innate Talents
//==============================================================================
// innate talent data
var dataInnateTalent = [];
dataInnateTalent[dataInnateTalent.length] = new InnateTalent();
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Sureshot", {dex:12, int:12}, "This is the innate talent for Archery.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Abyssal", {con:12, end:12}, "This is the innate talent for Darkness.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Energized", {rec:12, end:12}, "This is the innate talent for Electricity.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Incandescent", {pre:12, rec:12}, "This is the innate talent for Fire.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Impetus", {ego:12, end:12}, "This is the innate talent for Force.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Tech Savvy", {int:12, end:12}, "This is the innate talent for Gadgeteering.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Absolute Zero", {dex:12, rec:12}, "This is the innate talent for Ice.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "One of Mind and Body", {str:12, dex:12}, "This is the innate talent for Martial Arts.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Superhuman", {str:12, con:12}, "This is the innate talent for Might.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Quick Trigger", {dex:12, ego:12}, "This is the innate talent for Munitions.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Mechanized", {str:12, int:12}, "This is the innate talent for Power Armor.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Arcanus", {int:12, pre:12}, "This is the innate talent for Sorcery.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Inhuman", {con:12, rec:12}, "This is the innate talent for Infernal Supernatural.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Matter Manipulator", {con:12, ego:12}, "This is the innate talent for Telekinesis.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Mind Over Matter", {ego:12, pre:12}, "This is the innate talent for Telepathy.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Hero", {str:8, dex:8, con:8, int:8, ego:8, pre:8, end:6, rec:6});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Divinity", {con:12, pre:12}, "This is the innate talent for Celestial.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "Feral", {str:12, rec:12}, "This is the innate talent for Bestial Supernatural.");
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Inferno", {end:10, dex:10, ego:8, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Soldier", {dex:10, int:8, ego:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Blade", {end:8, str:10, dex:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Savage", {con:10, str:10, dex:8, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Behemoth", {con:10, end:8, str:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Glacier", {con:10, end:10, dex:8, int:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Mind", {end:10, int:8, ego:10, pre:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Grimoire", {int:10, ego:10, pre:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Assassin", {str:10, dex:10, int:8, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Marksman", {end:8, dex:10, int:10, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Void", {con:10, end:10, dex:8, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Inventor", {end:8, int:10, ego:10, pre:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Tempest", {end:10, dex:8, ego:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Devastator", {con:10, end:8, str:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Disciple", {dex:10, int:8, ego:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Impulse", {end:10, int:10, ego:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Fist", {str:10, dex:10, int:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Master", {con:10, str:10, dex:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Scourge", {con:10, end:8, ego:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Squall", {end:10, dex:8, ego:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Mountain", {con:10, end:10, str:8, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Unleashed", {str:10, dex:10, int:8, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Radiant", {int:10, ego:10, pre:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Invincible", {con:10, end:10, int:10, ego:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Night Avenger", {end:8, str:10, dex:10, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Chiller", {con:10, end:10, dex:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Rockstar", {str:10, con:10, end:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Predator", {str:10, con:8, dex:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Penitent", {str:10, end:10, dex:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Hexslinger", {dex:10, int:10, ego:10, pre:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Witch", {con:10, int:8, pre:10, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Cybernetic Warrior", {con:10, end:10, int:10, rec:8});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Automaton", {con:10, end:8, int:10, ego:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Specialist", {con:10, dex:10, int:8, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Gunslinger", {con:10, dex:10, ego:8, rec:10});
dataInnateTalent[dataInnateTalent.length] = new InnateTalent(dataInnateTalent.length, "The Psychokinetic", {end:8, dex:10, ego:10, rec:10});

//==============================================================================
// Talents
//==============================================================================
// talent data
var dataTalent = [];
dataTalent[dataTalent.length] = new Talent();
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Mighty", {str:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Agile", {dex:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Enduring", {con:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Brilliant", {int:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Indomintable", {ego:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Intimidating", {pre:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Tireless", {rec:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Energetic", {end:8});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Martial Focus", {str:5, dex:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Physical Conditioning", {str:5, con:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Body and Mind", {str:5, int:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Professional Athlete", {str:5, ego:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Impressive Physique", {str:5, pre:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Relentless", {str:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Bodybuilder", {str:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Acrobat", {dex:5, con:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Coordinated", {dex:5, int:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Shooter", {dex:5, ego:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Finesse", {dex:5, pre:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Impresario", {dex:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Accurate", {dex:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Healthy Mind", {con:5, int:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Ascetic", {con:5, ego:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Shrug It Off", {con:5, pre:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Quick Recovery", {con:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Boundless Reserves", {con:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Academics", {int:5, ego:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Diplomatic", {int:5, pre:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Negotiator", {int:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Investigator", {int:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Showmanship", {ego:5, pre:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Worldly", {ego:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Daredevil", {ego:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Lasting Impression", {pre:5, rec:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Prodigy", {pre:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Amazing Stamina", {rec:5, end:5});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Covert Ops Training", {str:3, dex:3, con:3, int:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Martial Training", {str:3, dex:3, ego:3, rec:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Paramilitary Training", {str:3, con:3, rec:3, end:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Discipline Training", {str:3, int:3, pre:3, end:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Sniper Training", {dex:3, ego:3, pre:3, end:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Command Training", {int:3, ego:3, pre:3, rec:3});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Survival Training", {dex:3, con:3, pre:3, rec:2, end:2});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Field Ops Training", {con:3, int:3, ego:3, rec:2, end:2});
dataTalent[dataTalent.length] = new Talent(dataTalent.length, "Jack of All Trades", {str:2, dex:2, con:2, int:2, ego:2, pre:2, rec:2, end:2});

//==============================================================================
// Power Aliases (set with their powers)
//==============================================================================

// power alias data
var dataPowerAlias = [];

//==============================================================================
// Power Advantages (set with their powers)
//==============================================================================

//==============================================================================
// Travel Powers
//==============================================================================
// travel power data
var dataTravelPower = [];

//------------------------------------------------------------------------------
// Travel Power Aliases
//------------------------------------------------------------------------------

dataPowerAlias['Flight'] = PowerAlias.legacyConstructor('Flight', 'Flight', '<div class="Sprite TravelPower_Flight"></div>Flight', 'Grants +20 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +17 Flight Speed.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Jump'] = PowerAlias.legacyConstructor('Jump', 'Superjump', '<div class="Sprite TravelPower_Superjump"></div>Superjump', 'Grants +35 Jump Speed and +60 Jump Height while active.  Outside of combat, you build up speed and height over time.  After 4 seconds, you gain +30 Jump Speed and +34 Jump Height.  After 10 seconds, you gain an additional +17 Jump Speed and +34 Jump Height.<br /><br />While active, you suffer a -6.2% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Speed'] = PowerAlias.legacyConstructor('Speed', 'Superspeed', '<div class="Sprite TravelPower_Superspeed"></div>Superspeed', 'Grants 100% Run Speed while active.  Outside of Combat, you build up speed over time.  After 4 seconds, you gain +85% Run Speed.  After 10 seconds, you gain an additional +85% Run Speed.<br /><br />While moving quickly, your jump speed is slightly increases and foes are less likely to notice you.<br /><br />While active, you suffer a -9.4% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Athletics'] = PowerAlias.legacyConstructor('Athletics', 'Athletics', '<div class="Sprite TravelPower_Athletics"></div>Athletics', 'Grants +75% Run Speed, +10 Jump Speed, and +10 Jump Height while active.  Outside of combat, you build up speed and height over time.  After 4 seconds, you gain +50% Run Speed, +8.5 Jump Speed, and +8.5 Jump Height.  After 10 seconds, you gain an additional +50% Run Speed, +8.5 Jump Speed, and +8.5 Jump Height.<br /><br />While active, you suffer a -3.1% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');
dataPowerAlias['Swinging'] = PowerAlias.legacyConstructor('Swinging', 'Swinging', '<div class="Sprite TravelPower_Swinging"></div>Swinging', 'Grants +50 Jump Height, +25 Jump Speed, and 45 Swing Speed while active.  Out of combat, you build up jump speed over time.  After 4 seconds, you gain +8.5 Jump Speed and 13 Swing Speed.  After 10 seconds, you gain an additional +8.5 Jump Speed and 13 Swing Speed.');
dataPowerAlias['Tunneling'] = PowerAlias.legacyConstructor('Tunneling', 'Tunneling', '<div class="Sprite TravelPower_Tunneling"></div>Tunneling', 'While active, you burrow underground, allowing you to move around beneath the surface, undetected by foes.  While active, you gain +30 Run Speed.');
dataPowerAlias['Teleport'] = PowerAlias.legacyConstructor('Teleport', 'Teleportation', '<div class="Sprite TravelPower_Teleportation"></div>Teleportation', 'Phase out for a short period of time.  While out of phase, you gain +60 Flight Speed and it becomes incredibly difficult for foes to notice you, however you cannot use any powers and healing against you is greatly reduced.  The duration of Teleport is reduced while in combat, and if you strike a foe shortly after phasing back in, Teleport activates a short cooldown.');
dataPowerAlias['Impact'] = PowerAlias.legacyConstructor('Impact', 'Impact', 'Impact', 'While this travel power is active, you gain a damage bonus which scales with your current speed. This bonus persists for a short time upon losing speed or stopping.');
dataPowerAlias['Versatility'] = PowerAlias.legacyConstructor('Versatility', 'Versatility', 'Versatility', 'While this travel power is active, if you take damage you will receive a stack of Versatility, up to 5 stacks. Versatility increases your movement speed for a short time.');
dataPowerAlias['Flippin'] = PowerAlias.legacyConstructor('Flippin\\\'', 'Flippin\\\'', 'Flippin\\\'', 'While Swinging is active, you gain a bonus to your ability to dodge attacks.');
dataPowerAlias['Earthen Embrace'] = PowerAlias.legacyConstructor('Earthen Embrace', 'Earthen Embrace', 'Earthen Embrace', 'While tunneling, you will gain a stack of Earthen Embrace every 3 seconds, up to 6 stacks. Earthen Embrace increases your resistance to all types of damage. These stacks will persist for a short time after you stop tunneling.');

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

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Ice Slide', null, 'This power is less maneuverable than standard Flight.', 'Grants +20 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +21 Flight Speed.<br /><br />While active, you suffer a -9.4% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_CSTORE_GOLD, dataPowerAlias['Swinging'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TUNNELING, TP_UNLOCK_CSTORE_GOLD, dataPowerAlias['Tunneling'].name);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Earthen Embrace'].name, 2, dataPowerAlias['Earthen Embrace'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Jet Boots', null, 'Somewhat less maneuverable than standard Flight, but faster.', 'Grants +30 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +17 Flight Speed.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, TP_UNLOCK_CSTORE_GOLD, 'Rocket Jump');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Fire Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Hover Disk', null, 'Somewhat less maneuverable than standard Flight.', 'Grants +20 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +21 Flight Speed.<br /><br />While active, you suffer a -11% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE_GOLD, 'Earth Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE_GOLD, 'Lightspeed');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Rainbow Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Rainbow Flight: Cloud');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Phoenix Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tornado Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Magic Carpet');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Jet Pack', null, 'Somewhat less maneuverable than standard Flight, but faster.', 'Grants +30 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +17 Flight Speed.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

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

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, TP_UNLOCK_CSTORE, 'Energy Slide', null, null, 'Grants +20 Run Speed and +3 Jump Height while active.  Outside of combat, you build up speed and height over time.  After 4 seconds, you gain 17 Run Speed and +2.6 Jump Height.  After 10 seconds, you gain an additional 21 Run Speed and +2.6 Jump Height.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, null, 'Flag Speed', null, null, null, ["Patriot event unlock"]);
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Impact'].name, 2, dataPowerAlias['Impact'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, null, 'Millennial Flight', null, null, null, ["LTS reward"]);

// TODO: get proper image
dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Ninja Vanish', 'Teleportation');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Cape Glide', null, 'You may only only use powers which target yourself while this is active.', 'Grants +30 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +26 Flight Speed.  After 10 seconds, you gain an additional +26 Flight Speed.<br /><br />While active, you suffer a -12% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE,  'Shadow Wings');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_QSTORE, 'Shadow Skull Flight', null, 'Cannot use abilities while active.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Ninja Leaves');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Flag Flight', 'Flight', null, null, ['Patriot event reward']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Canadian Flag Flight', 'Flight', null, null, ['Patriot event reward']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Hoverboard', null, 'This power is less maneuverable than standard Flight.', 'Grants +20 Flight Speed while active.  Outside of combat, you build up speed over time.  After 4 seconds, you gain +17 Flight Speed.  After 10 seconds, you gain an additional +21 Flight Speed.<br /><br />While active, you suffer a -9.4% penalty to Power Cost Discount and your Energy Building strength is reduced by 15%.');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tricolor Flight (Vertical)', 'Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_CSTORE, 'Tricolor Flight (Horizontal)', 'Flight');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_FLIGHT, TP_UNLOCK_COLLECTOR, 'Arcane Flight', 'Flight', null, null, ['Arcane Lockbox']);

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

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, TP_UNLOCK_CSTORE, 'Phase Out', 'Teleportation');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Upload', 'Teleportation', null, null, ['Cybernetic Lockbox']);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SPEED, TP_UNLOCK_CSTORE, 'Fireball Roll', 'MachSpeed');

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, null, 'Flag Acrobatics', 'Acrobatics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, null, 'Flag Athletics', 'Athletics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, null, 'Canadian Acrobatics', 'Acrobatics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_ATHLETICS, null, 'Canadian Athletics', 'Athletics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, null, 'Flag Jump', 'Acrobatics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_JUMP, null, 'Canadian Flag Jump', 'Athletics', null, null, ["Patriot event unlock"]);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_QSTORE, 'Fire Swinging', 'Swinging');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_SWINGING, TP_UNLOCK_QSTORE, 'Flaming Chain Swinging', 'Swinging');
dataTravelPower[dataTravelPower.length-1].insertAdvantage(dataPowerAlias['Flippin'].name, 2, dataPowerAlias['Flippin'].tip);

dataTravelPower[dataTravelPower.length] = new TravelPower(TRAVEL_POWER_TELEPORT, null, 'Mind Blink', 'Teleportation', null, null, ['Alien Invader Lockbox']);


//==============================================================================
// Power Sets
//==============================================================================

// power set class
// note: the data associated with this set may be bugged, and if so, has been for a long time.
// each powerset appears to be offset by -1.  Example:
// Energy projector frameworks reference 1, but the energy projector powerset appears here in index 0
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

// power data
var dataPower = [];
dataPower[0] = Power.legacyConstructor(dataPower.length, null, null, null, 0, 0, null, null);

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
// Power Global Aliases - Common Effects
//------------------------------------------------------------------------------

dataPowerAlias['Shredded'] = PowerAlias.textOnly("Shredded", "Shredded causes affected targets to suffer -12% to Slashing resistance and 6% to Physical resistance for 12 seconds.");
dataPowerAlias['Trauma'] = PowerAlias.textOnly("Trauma", "+ Applies or refreshes Trauma on your target.<br />+ Trauma ends any healing over time effects on your target and causes them to receive only 50% benefit from any other incoming heals.");
dataPowerAlias['Furious'] = PowerAlias.textOnly("Furious", "+ Furious adds a 1% critical hit chance, lasts for 12 seconds, and can stack up to 3 times.<br />+ When struck by an attack while Furious, you gain a stack of Willpower, causing further attacks against you to heal you for a small amount.");
dataPowerAlias['TWST'] = PowerAlias.textOnly("Threat Wipe Single", "Wipes your threat on the target and places you in stealth for 3/4/5 seconds, based on rank.  Puts all other threat wipe abilities on a 30 second cooldown.");
dataPowerAlias['TWAoE'] = PowerAlias.textOnly("Threat Wipe AoE", "+ Wipes all of your Threat from nearby foes.<br />+ Placates the target, making them unable to attack you.  Placate only works on weaker foes, such as Henchmen, Villains, and Enforcers.<br />+ briefly puts you in Stealth.<br />+ Puts all Threat Wipe abilities on a 30 second cooldown.");
dataPowerAlias['Illuminated'] = PowerAlias.textOnly("Illuminated", "Attacking Illuminated foes gives allies a 15% chance to be affected by Mend.  Mend heals a small amount of health every 2 seconds for 8 seconds.  Illuminated is a type of Curse.");
dataPowerAlias['Illumination'] = PowerAlias.textOnly("Illumination", "Illumination increases direct healing the target receives by 3% for 20 seconds.  Illumination is a type of Enchantment.");
dataPowerAlias['Light Everlasting'] = PowerAlias.textOnly("Light Everlasting", "Light Everlasting is a heal over time which restores health every 2 seconds for 10 seconds.  Light Everlasting is a type of Enchantment.");
dataPowerAlias['Dependency'] = PowerAlias.textOnly("Dependency", "Dependency causes the affected target to heal you or one of your nearby allies for a small amount over 20 seconds.  Can stack up to 3 times.");
dataPowerAlias['Disorient'] = PowerAlias.textOnly("Disorient", "Disorient reduces the target\\\'s damage by 10% and their movement speed by 15%, lasting 12 seconds.");
dataPowerAlias['Stagger'] = PowerAlias.textOnly("Stagger", "Stagger reduces damage resistance by 2% and movement speed by 25% for 12 seconds, stacking up to 3 times.");
dataPowerAlias["SP"] = PowerAlias.textOnly("Stim Pack", "+ Grants you a short heal over time. <br />+ Heals for an additional amount if your health is low.<br />+ Shares a short internal cooldown with other similar advantages.");
dataPowerAlias["CF"] = PowerAlias.textOnly("Clinging Flames", "Clinging Flames deals Fire damage every 2 seconds for 12 seconds, with a chance to leap to other nearby targets.");
dataPowerAlias["NQ"] = PowerAlias.textOnly("No Quarter", "No Quarter causes affected targets to suffer -15% to Fire and Crushing resistance for 12 seconds.");
dataPowerAlias["AP"] = PowerAlias.textOnly("Armor Piercing", "Armor Piercing causes affected targets to suffer -15% to Piercing and Crushing resistance for 12 seconds.");
dataPowerAlias["Bleed"] = PowerAlias.textOnly("Bleed", "Bleed deals Slashing damage every second for 16 sec and can stack up to 5 times.");
dataPowerAlias["ADCD"] = PowerAlias.textOnly("AD Cooldown", "<br /><br />Activates a shared cooldown of 30 seconds with other Active Defense powers.");
dataPowerAlias["AOCD"] = PowerAlias.textOnly("OD Cooldown", "<br /><br />Activates a shared cooldown of 30 seconds with other Active Offense powers.");
dataPowerAlias["AUCD"] = PowerAlias.textOnly("AU Cooldown", "<br /><br />Activates a shared cooldown of 30 seconds with other Active Defense and Active Offense powers.");
dataPowerAlias["Rush"] = PowerAlias.textOnly("Rush", "Rush reduces your melee energy cost by 15% and grants you energy every second, lasting 1 second for every stack of Focus you have.");

//------------------------------------------------------------------------------
// Power Global Aliases - Common Advantages
//------------------------------------------------------------------------------

dataPowerAlias["R2"] = new PowerAlias(new PowerAdvantage("Rank 2", 2, null, "Increases the strength of the power by 20%."));
dataPowerAlias["R3"] = new PowerAlias(new PowerAdvantage("Rank 3", 2, 1, "Increases the strength of the power by an additional 20%.  This bonus is cumulative with Rank 2."));
dataPowerAlias["FR2"] = new PowerAlias(new PowerAdvantage("Rank 2", 2, null, "Grants 2 stacks by default."));
dataPowerAlias["FR3"] = new PowerAlias(new PowerAdvantage("Rank 3", 2, 1, "Grants 3 stacks by default."));
dataPowerAlias['R2EB'] = new PowerAlias(new PowerAdvantage("Rank 2", 2, null, "Increases the strength of the power by 20% and its energy building strength by ~10%."));
dataPowerAlias['R3EB'] = new PowerAlias(new PowerAdvantage("Rank 3", 2, 1, "Increases the strength of the power by an additional 20% and its energy building strength by an additional ~10%.  These bonuses are cumulative with Rank 2."));
dataPowerAlias["AM"] = new PowerAlias(new PowerAdvantage("Accelerated Metabolism", 1, null, "Every time you use this ability you have a 20% chance to return 10% of your maximum energy.  This effect may only occur once every 15 seconds, even if you have this advantage on multiple powers."));
dataPowerAlias["CC"] = new PowerAlias(new PowerAdvantage("Break Through", 3, null, "+ When the target is blocking, hitting them with this power disables their block for 10 seconds.<br />+ Applies Provoked to the target if they were blocking.  Provoked lowers their damage resistance, healing, and dodge for 10 seconds.<br />+ Your target can removed Provoked by damaging you.<br />+ Provoked cannot be stacked by any target and cannot be refreshed.<br />+ After 10 seconds, your target will gain Unwavering for 10 seconds.  Unwavering prevents their block from being disabled for the duration.<br />+ If used against a target that isnt blocking, they will gain instead gain Unwavering."));
dataPowerAlias["CS"] = new PowerAlias(new PowerAdvantage("Challenge!", 1, null, "This advantage causes this attack to generate additional threat against all affected targets, making them more likely to attack you.<br /><br />+ Primary targets receive a large amount of threat every 2 seconds for 4 seconds and a 10% damage debuff for up to 10 seconds which degrades as you take damage from them.<br />+ Secondary targets suffer half as much threat every 2 seconds for 10 seconds and have their damage debuffed by 5% for up to 10 seconds.<br />+ Effect cannot be refreshed or stacked more than once from any of your abilities.<br />+ Some powers lack primary or secondary targets and may only apply the primary or secondary effect."));
dataPowerAlias["NG"] = new PowerAlias(new PowerAdvantage("Nailed to the Ground", 2, null, "Cancels and locks out Travel Powers for 5 seconds."));
dataPowerAlias["Mystic Transference"] = new PowerAlias(new PowerAdvantage("Mystic Transference", 1, null, "You now only summon two of these Sigils, but they can be summoned alongside your other Sigils. This also lowers the base recharge time for these Sigils to 10 seconds, and reduces the charge time and cost of these Sigils."));
dataPowerAlias["Open Wound"] = new PowerAlias(new PowerAdvantage("Open Wound", 2, null, "+ Has a 25% chance to apply a stack of Bleed to the target every 2 seconds for 10 seconds." + dataPowerAlias["Bleed"].tip));

//------------------------------------------------------------------------------
// Power Set: Energy Projector
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'] = [];

dataPowerAlias['Arc'] = PowerAlias.legacyConstructor('Arc', 'Arc', 'Arc', 'Arcing attacks deal a small amount of Electrical damage to a target within 25 feet.');
dataPowerAlias['Charged Up'] = PowerAlias.legacyConstructor('Charged Up', 'Charged Up', 'Charged Up', 'Charged Up increases running speed by 60%, jump height by 6%, and flight speed by 6% for 10 seconds.');
dataPowerAlias['Superconductor'] = PowerAlias.legacyConstructor('Superconductor', 'Superconductor', 'Superconductor', 'Superconductor reduces the target\\\'s resistance to Electrical damage by -18% for 12 seconds.');

//------------------------------------------------------------------------------
// Power Framework: Electricity
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(1);

var pow = 0;

//			...(id, name, desc, powerSet, framework, power, tier, toolTip)
//	constructor(powerSet, framework, tier, name, range, tags, toolTip, isMultiFrameworkPower=false, resetPowerID=false)


dataPower[dataPower.length] = new Power(1, 1, -1, "Electric Bolt", [0.55, 0.35], 0, 0, 0, 0, 0, "Targets foe/50 feet", "Energy Builder/Ranged Damage", "Deals a small amount of Electrical damage to the target and generates energy.  Each hit also has a 25% chance to apply Negative Ions to the target.", Power.TYPE_ENERGY_BUILDER, false, true);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Lightning Overload', 'Lightning Overload', 1, null, 'Grants Electric Bolt a chance to jump to another target on every attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Ionic Infusion', 'Ionic Infusion', 2, null, 'Doubles the chance to apply Negative Ions to your target on every attack.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM");

dataPower[dataPower.length] = new Power(1, 1, 0, "Chain Lightning", 0.67, 1.33, 0, 0, [18,37], 0, "Targets foe/100 feet", "Ranged Damage/Blast/Arc", "Deals Electrical damage to an enemy target.<br /><br />Has a 44-100% chance to apply Negative Ions to the target based on charge time.  If your maximum energy is above 90%, this power always applies Negative Ions regardless of charge time.<br /><br />Fully charging this power will cause it to arc to a secondary target within 50 feet, dealing Electrical damage to them equal this power's tap damage.<br /><br />Hitting targets affected by Negative Ions will increase the number of targets this power can chain to.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Lightning Helix', 'Lightning Helix', 1, null, 'Adds an additional, random arc to your Chain Lightning. This arc may go to the same target that another arc goes to, hitting that target twice, or may go to another nearby target. The additional arc also benefits from additional chainging via consuming Negative Ions.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Superconductor', 'Superconductor', 2, null, '+ Applies Superconductor to targets affected by Negative Ions.<br />+ ' + dataPowerAlias['Superconductor'].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS", "CC");

dataPower[dataPower.length] = new Power(1, 1, 1, "Sigils of the Storm", 0.67, 0.83, 0, 0.83, 23, 10, "Targets Self", "Sigils/Ranged Damage", "Summons 5 sigils around you to deal Electrical damage to foes within 15 feet of them every 2 seconds.  Each hit has a 10% chance to hit an additional target for slightly less damage.  Only one set of sigils may be active at a time.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));

dataPower[dataPower.length] = new Power(1, 1, 1, "Sparkstorm", 0.5, 4, 0.5, 0, [26,13], 0, "Affects foe (5 max)/15 foot Sphere", "Ranged AoE Damage/Arc", "Deals Electrical damage to nearby targets.  Each hit has a 10% chance to Arc.  " + dataPowerAlias["Arc"].tip + "<br /><br />Each hit has a 10% chance to apply Negative Ions.<br /><br />Knocks Down targets affected by your Negative Ions.  This completes a Circuit and consumes your Negative Ions.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Electric Personality', 'Electric Personality', 3, null, 'Changes Sparkstorm to a toggle. The toggle has a max duration equal to the maintain limit of Sparkstorm and retains the same Energy Costs.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Electric Jolt', 'Electric Jolt', 2, null, 'Targets affected by your Negative Ions are Knocked Back instead of being Knocked Down.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 1, "Electrical Current", 0.5, 5, 0.5, 0, [19,14], 0, "Targets foe (5 max)/50 feet/45 degree Cone", "Ranged AoE Damage/Arc", "Deals Electrical damage to all targets.  Each hit has a 15% chance to apply Negative Ions to targets.<br /><br />When hitting targets affected by Negative Ions, has a 15% chance to Arc.  Arcing attacks deal a small amount of Electrical damage to a target within 25 feet.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bad Wiring', 'Bad Wiring', 2, null, 'Adds a 20% chance to briefly Stun targets.  This chance is increased to 100% against targets affected by Negative Ions.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Unlimited Power!', 'Unlimited Power!', 3, null, 'Each hit applies and then immediately consumes Negative Ions.  This counts as completing a Circuit.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 1, "Lightning Strike", 0.35, 0, 0, 0, 9.2, 3, "Targets foe/60 foot lunge", "Lunge/Snare/Stun", "Lunge to the target, dealing Electrical damage and Snaring them for 13 sec.<br /><br />If used from more than 20 feet away and the target isn't currently controlled, the target is also Stunned briefly.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Charged Up', 'Charged Up', 2, null, '+ If the target is affected by Negative Ions, consumes Negative Ions to apply or refresh Charged Up.<br />+ ' + dataPowerAlias["Charged Up"].tip));
dataPower[dataPower.length-1].insertStockAdvantages("NG", "AM", "CC", "CS");

dataPower[dataPower.length] = new Power(1, 1, 1, "Electric Sheath", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Offense/Energy Form", "+ Increases the damage strength of your attacks.<br />+ Whenever you take damage, you gain energy and have a 25% chance of applying Negative Ions to your attacker.<br />+ Can be used while Held or Confused.<br />+ Assists with breaking out of Holds.<br />+ Increases your Energy equilibrium and generation.<br />+ Reduces your Energy decay.<br />+ Removes the Electric Surge debuff if present and prevents it from being reapplied for the duration of Electric Sheath.<br />+ Counts as an Energy Form." + dataPowerAlias["AOCD"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Matter – Energy Union', 'Matter – Energy Union', 2, null, 'Electric Sheath also grants you an absorption shield when activated.'));

dataPower[dataPower.length] = new Power(1, 1, 1, "Electric Form", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Slotted Offensive Passive/Energy Form", "+ Increases your Energy damage.<br />+ Increases your Electrical resistance.<br />+ Increases your Energy damage resistance by a lesser amount.<br />+ Recovers Energy when you take Electrical damage.<br />+ Increases base energy equilibrium and energy recovery.<br />+ Heals you for a small amount every time you damage a target affected by your Negative Ions.  This heal can occur up to 3 times every 5 seconds.");

dataPower[dataPower.length] = new Power(1, 1, 1, "Power Source", 1, 2.5, 0, 2.5, 20, 0, "Form (Endurance)", "Buff/Form/Untapped Power", "Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time your attacks Arc, whenever you apply Negative Ions, and whenever you complete a Circuit by consuming Negative Ions.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_FORM);

dataPower[dataPower.length] = new Power(1, 1, 1, "Electric Shield", 1, 0, 0, 0, 0, 0, "Affects Foe/10 foot Sphere", "Block", "While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Deals periodic Electrical damage to nearby foes as long as you maintain this power.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Electric Vengeance', 'Electric Vengeance', 3, null, 'If your Energy is high enough, your Electric Shield will automatically retaliate against any aggressors that are within 50 feet. Each retaliatory strike consumes an amount of Energy.'));

dataPower[dataPower.length] = new Power(1, 1, 1, "Ionic Reverberation", 0, 0, 0, 0, 0, 0, "Energy Unlock", "Innate Passive/Endurance/Recovery", "+ Gives you energy every time one of your abilities consumes Negative Ions.<br />+ generates 1/5 as much energy every time an ability interacts with Negative Ions without consuming it.<br />+ This effect can only occur up to 3 times per second.<br />+ The energy gained scales with your Endurance and Recovery.", Power.TYPE_ENERGY_UNLOCK);
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(1, 1, 2, "Storm Summoner", 1, 3, 1, 0, [31,28], 0, "Affects foe (5 max)/25 foot Sphere", "Ranged AoE Damage", "Deals periodic Electrical damage to enemies within 25 yards of you.  Each hit has a 25% chance to apply Negative Ions.<br /><br />Upon being fully maintained, foes within 25 feet of you are hit by a bolt of lightning, dealing additional lightning damage to any enemies within 10 feet of them.  Targets affected by Negative Ions are also affected by Superconductor.  " + dataPowerAlias["Superconductor"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Magnetic', 'Magnetic', 2, null, '+ Draws enemies toward you while maintained.<br />+ The chance to apply Negative Ions to targets within 5 feet of you is increased to 100%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Squall', 'Squall', 2, null, '+ After 1 second, all targets are Snared for 16 seconds.<br />+ When fully maintained, targets affected by Negative Ions are Knocked Up.  This consumes the Negative Ions and counts as completing a circuit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Particle Storm', 'Particle Storm', 2, null, '+ Each tick has a 25% chance to apply Plasma Burn to targets.  Plasma Burn is a stacking Particle damage over time effect that lasts 16 seconds and counts as a Radiation effect.<br />+ This chance is doubled if the target is affected by Negative Ions.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 2, "Thunderstrike", 0.67, 1.33, 0, 0, [36,81], 10, "Targets foe (5 max)/100 feet/10 foot Sphere", "Ranged AoE Damage/Arc/Circuit", "Deals Electrical damage to your primary target, and 2/3 of that damage to secondary targets.<br /><br /When hitting a target affected by Negative Ions, consumes the Negative Ions and Arcs.  " + dataPowerAlias["Arc"].tip + "<br /><br />After 2 seconds, applies Negative Ions to the primary target and has a 33-100% chance to apply it to secondary targets, based on charge time.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ionic Compression', 'Ionic Compression', 2, null, 'Affected targets are Rooted for 16 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Strike Down', 'Strike Down', 2, null, '+ Your primary target is Knocked Down.<br />+ Refreshes the duration of Superconductor.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Never Strikes TWice', 'Never Strikes TWice', 2, null, 'Increases the base damage of Thunderstrike against Held targets by 50%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Recharge', 'Recharge', 2, null, dataPowerAlias["SP"].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 2, "Ball Lightning", 0.83, 0, 0, 0, 46, 10, "Targets foe/100 feet", "Ranged AoE Damage/Arc", "Summons a Ball Lightning that will hover near your target, dealing Electrical damage to foes within 10 feet.<br /><br />Has a 25% chance to apply Negative Ions to the target.<br /><br />When hitting a target affected by Negative Ions, has a 33% chance to Arc to a target within 10 feet, dealing minor Electrical damage.<br /><br />Detonates after 10 seconds, dealing Electrical damage to targets within 15 feet.<br />This power cannot critically hit, however its damage scales with both your Critical Chance and Critical Severity.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Triplicity', 'Triplicity', 2, null, 'Ball Lightning now summons three Ball Lightnings instead of one, but the periodic damage each one deals is reduced by 60%. All three deal AoE damage, but only the primary one will explode.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Supercharged', 'Supercharged', 1, null, 'The first and last hit of your Ball Lightning refreshes the duration of your Superconductor debuff by 8 seconds.'));

dataPower[dataPower.length] = new Power(1, 1, 2, "Electrical Siphon", 0.67, 0, 0, 0, 66, 10, "Affects foe (5 max)/25 foot Sphere", "Team Heal/Circuit", "Consumes all of your Negative Ions on targets, healing you and nearby allies for each Negative Ions consumed.");
dataPower[dataPower.length-1].iconOverride = "PowerArmor_ChestLaser";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Charged Up', 'Charged Up', 2, null, '+ If this power consumes any Negative Ions, it applies Charged Up to you and affected allies.<br />+ ' + dataPowerAlias["Charged Up"].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 2, "Electrocute", 0.67, 2.33, 0, 2.33, 90, 15, "Targets non-object foe (5 max)/50 feet/15 foot Sphere", "Hold/Arc", "Paralyzes targets for 12 seconds.<br /><br />Has a 100% chance to apply Negative Ions to the primary target and a 25% chance to apply it to each secondary target.<br /><br />Arcs to 2 additional targets, and will continue to Arc if those targets are affected by Negative Ions.  " + dataPowerAlias["Arc"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Superconductor', 'Superconductor', 2, null, '+ Fully charging this power applies Superconductor to the target.<br />+ ' + dataPowerAlias["Superconductor"].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 2, "Neuroelectric Pulse", 0.5, 0, 0, 0, 34, 15, "Affects foe (5 max)/15 foot Sphere", "AoE Damage/Energy Gain/Root", "Deals Electrical damage to all targets, Roots them for 16 seconds, and summons a Static Field for 12 seconds.<br /><br />Restores energy over time and reduces energy decay for you or any ally standing in the field.  Foes standing in the field lose energy over time.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 2, "Blinding Light", 1, 0, 0, 0, 18, 45, "Targets non-object foe/100 feet", "Threat Wipe/Stealth", "Wipes your threat from the target and places you in Stealth for 3 seconds.<br /><br />Shares a 30 second cooldown with other Threat Wipe abilities.");

dataPower[dataPower.length] = new Power(1, 1, 3, "Lightning Arc", 0.5, 4, 0.5, 0, [29,21], 0, "Targets foe/100 feet", "Ranged Damage/Arc", "Deals Electrical damage to an enemy target.<br /><br />Has a 10% chance to Arc to a nearby target with each hit.  " + dataPowerAlias["Arc"].tip + "<br /><br />If your target is affected by Negative Ions,the chance to Arc increases to 20%.<br /><br />Deals 20% additional damage to targets affected by Negative Ions.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Blindside', 'Blindside', 2, null, 'Reduces your target\\\'s movement speed by 15% while maintained.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 3, "Gigabolt", 0.67, 2.33, 0, 0, [54,177], 0, "Targets foe (5 max)/100 feet/10 foot Cylinder", "Ranged AoE Damage/Arc/Circuit", "Deals Electrical damage to all targets, with a 34-100% chance to apply Negative Ions based on charge time.<br /><br />Has a 50% chance to Arc. " + dataPowerAlias["Arc"].tip + "  Hitting a target affected by Negative Ions increases the chance of Arcing to 75%.<br /><br />Charging Gigabolt applies Power Surge to you, preventing you from charging Gigabolt again for 8 seconds.  Hitting a target affected by Negative Ions with a charged Gigabolt will consume the Negative Ions and cause it to Arc to a nearby target.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Death Arc', 'Death Arc', 2, null, 'Any enemies killed by Gigabolt will unleash area effect damage to nearby targets.'));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 3, "Lightning Storm", 0.5, 5, 0.5, 0, [29,21], 0, "Targets foe (5 max)/50 feet/15 foot Sphere", "Ranged AoE Damage/Arc", "Deals Electrical damage to all targets, with a 15% chance to apply Negative Ions each time it deals damage.<br /><br />When hitting a target affected by Negative Ions, has a 25% chance to Arc.  " + dataPowerAlias["Arc"].tip)
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Stolen Thunder', 'Stolen Thunder', 2, null, 'The initial strike Knocks Down all targets, and each additional strike has a 15% chance to cause them to be Knocked Down again.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Panic and Run', 'Panic and Run', 2, null, '+ Each hit has a 15% chance to Stagger targets.<br />+ ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "NG", "CS");

dataPower[dataPower.length] = new Power(1, 1, 3, "Thundering Return", 2, 0, 0, 0, 0, 300, "Targets Self", "Self Resurrection/Heal", "Can be used while dead to resurrect with 50% of your maximum health and grants you the following:<br /><br />+ For the next 20 seconds, killing foes will restore additional health<br />+ For the next 20 seconds, you apply Negative Ions to any foe that attacks you.<br />+ For the next 20 seconds, whenever you take damage, you gain 100% of your energy.<br />- Shares a cooldown with similar powers.");
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 1, 4, "Energy Storm", 0.5, 1.5, 0.5, 0, [20,10], 0, "Targets foe/50 foot/45 degree Cone", "Ranged Damage - Ultimate Potato", "Absorb power from your enemies and send it back at them with cataclysmic fury.<br /><br />Consume Energy<br />MAINTAIN<br />+ All enemies in a forward arc are slowed.<br />+ For each enemy slowed, you will gain a stack of the Infused Energy Buff, which increases all damage you deal for a short duration.<br />+ While you are affect by Infused Energy, this power becomes Unleashed Tempest.<br />+ If an affected enemy is under the effect of Clinging Flames, Negative Ions, or Chill, that effect will be consumed, and grant you an appropriate type of Energy Charge.<br />+ If an affected enemy is protected by a force field type effect, such as Containment Field, that effect will be significantly degraded, and you will be granted Energy Charge - Force.<br />- This power has a 30 second cooldown that begins when the Infused Energy buffs expire.<br /><br />Unleashed Tempest<br />CLICK<br />+ Extremely powerful single target Particle attack.<br />+ If enhanced by Energy Charge - Fire, this attack will detonate in an area of effect on contact with the target.<br />+ If enhanced by Energy Charge - Ice, this attack gains a significant bonus to critical severity.<br />+ If enhanced by Energy Charge - Electricity, this attack will chain to a second target.<br />+ If enhanced by Energy Charge - Force, this attack will significantly reduce the target\\\'s damage for a short duration.<br />+ In addition, each type of Energy Charge increases the damage done by your Unleashed Tempest, and reduces its energy cost.<br />- Activating Unleashed Tempest consumes all instances of the Infused Energy buff and triggers the cooldown on Consume Energy.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Weather the Storm", 2, null, "Secondary Energy Effects, such as Clinging Flames, have a chance to not be consumed when you use Energy Storm.");
dataPowerAlias["Energy Storm"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(1, 1, 4, "Gravity Driver", 0.5, 2.5, 0, 2.5, 142, 90, "Targets foe (10 max)/80 feet/40 foot Sphere", "Ranged AoE Damage/Damage Resistance Debuff", "Gravity Driver causes a mass of force to form, and brings it crashing down on your foes with nuclear levels of destructive power.<br /><br />CHARGE<br />+ Deals Crushing damage to targets caught in the blast radius as well as knocking nearby foes prone.<br />+ Foes further than 20\\\' from the impact point take half damage and are not knocked prone." + PowerUnlocksFrom("Ravenswood Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPowerAlias["Gravity Driver"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(1, 1, 4, "Fractal Aegis", 0.5, 0, 0, 0, 40, 90, "Affects foe (8 max)/20 foot Sphere", "AoE Damage/Knock/Defense Buff", "Forces ice spikes to erupt beneath your opponents, then coalesces the icy bits around you for additional protection.<br /><br />CHARGE<br />+ Damage and Knockup surrounding targets.<br />+ Gain a Defense Buff based on number of targets hit." + PowerUnlocksFrom("Frozen Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Chilling Reminder", 1, null, "+ Applies a large Threat over time to your target.<br />+ This stacks with the Challenge! effect.");
dataPowerAlias["Fractal Aegis"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(1, 1, 4, "Storm Strike", 0.5, 1.5, 0, 0, 119, 90, "Affects foe (10 max)/25 foot Sphere", "Ultimate/Ranged AoE Damage", "Deals Electrical damage to all targets and they are Knocked Down.<br /><br />Deals additional damage to all targets affected by Negative Ions, consuming them in the process.<br /><br />After 2 seconds, applies Negative Ions to affected targets." + PowerUnlocksFrom("Rave Lockbox"), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Commanding Presence", 1, null, "+ Applies a large Threat over time to your target.<br />+ This stacks with the Challenge! effect.");
dataPowerAlias["Storm Strike"] = new PowerAlias(dataPower[dataPower.length-1]);

//------------------------------------------------------------------------------
// Power Framework: Fire
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(2);

var pow = 0;

dataPower[dataPower.length] = new Power(1, 2, -1, "Throw Fire", [0.47,0.3], 0, 0, 0, 0, 0, "Targets foe/50 feet", "Energy Builder/Ranged/Clinging Flames", "Deals Fire damage to the target and generates energy.  The first hit has a 20% chance to apply Clinging Flames. " + dataPowerAlias["CF"].tip, Power.TYPE_ENERGY_BUILDER, false, true);
dataPower[dataPower.length-1].insertAdvantage("Burning Desire", 1, null, "Gives your Throw Fire power a 35% chance to chain to an additional target. This second shot does not generate Energy, but has a chance to apply Clinging Flames.");
dataPower[dataPower.length-1].insertAdvantage("Fuel My Fire", 1, null, "Grants Throw Fire a 25% chance to apply Clinging Flames to your target on every attack instead of just the initial hit.");
dataPower[dataPower.length-1].insertStockAdvantages("AM");

dataPower[dataPower.length] = new Power(1, 2, 0, "Fire Strike", 0.5, 0, 0, 0, 17, 0, "Targets foe/100 feet", "Ranged Damage/Buff/Blast/Clinging Flames", "Deals Fire damage and has a 25% chance to apply Clinging Flames to the target. " + dataPowerAlias["CF"].tip + "<br /><br />In addition, each hit with Fire Strike increases the damage of your next Fire Strike by 25%, stacking up to 4 times.  This effect lasts 6 seconds.");
dataPower[dataPower.length-1].insertAdvantage("Wild Fire", 2, null, "If your target is affected by the Clinging Flames condition, your Fire Strike attack will refresh the Clinging Flames effect, and will deal a small mount of Fire damage to up to 5 targets in a 15 foot area of effect.");
dataPower[dataPower.length-1].insertAdvantage("Kindling", 2, null, "Your Fiery Escalation Buff now also increases the damage of your next Fire Power by 10% per stack. However, Fiery Escalation is now consumed by powers that trigger this effect.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(1, 2, 1, "Heat Wave", 0.67, 5, 1, 0, [26,18], 10, "Targets foe/50 feet", "Ranged Damage/Burning/Incapacitate", "Deals Fire damage and has a 10% chance to apply Clinging Flames to the target. " + dataPowerAlias["CF"].tip + "<br /><br />After maintaining this power for 1 second, it Incapacitates the target.  Each tick refreshes the duration and strength of the Incapacitate.");
dataPower[dataPower.length-1].insertAdvantage("Engulfing Flames", 2, null, "Reduces the damage of your Heatwave by 40%, but now, each tick reduces the target\\\'s resistance to your Fire damage by 10%.  This effect stacks up to 6 times and lasts 8 seconds.");
dataPower[dataPower.length-1].insertStockAdvantages("CS");

dataPower[dataPower.length] = new Power(1, 2, 1, "Fire Breath", 0.67, 5, 0.5, 0, [18,14], 0, "Targets foe (5 max)/50 feet/45 degree Cone", "Ranged AoE Damage/Burning/Clinging Flames", "Deals Fire damage to all targets and has a 10% chance to apply Clinging Flames. " + dataPowerAlias["CF"].tip);
dataPower[dataPower.length-1].insertAdvantage("Spitfire", 2, null, "Increases the chance to apply Clinging Flames from 10% to 20%. Also guarantees the application of Clinging Flames to all targets hit by your Fire Breath when it is fully maintained.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 2, 1, "Fireball", 0.67, 2.33, 0, 0, [28,85], 0, "Targets foe (5 max)/50 feet/10 foot Sphere", "Ranged AoE Damage/Clinging Flames", "Deals Fire damage to the primary target and 40% of that amount to secondary targets.  Has a 10-45% chance to apply Clinging Flames to each target. " + dataPowerAlias["CF"].tip);
dataPower[dataPower.length-1].insertAdvantage("Unstable Accelerant", 2, null, "Your Fireball now Debuffs the affects targets, causing them to take increased damage from Burning effects. Burning effects include:<br />- Clinging Flames<br />- Conflagration<br />- Fire Snake<br />- Heatwave<br />- Flashfire<br />- Pyre Burn (the patch left by Pyre)<br />- Wildfire (the AoE proc for the Fire Strike advantage)");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 2, 1, "Living Fire", 0.67, 1.33, 0, 1.33, 52, 30, "Targets Self", "Sigils/AoE Damage", "Summons 5 Living Fire near your location.<br /><br />When an enemy comes within 15 feet of one, it explodes and deals Fire damage to up to 5 targets within range.");
dataPower[dataPower.length-1].insertStockAdvantages("Mystic Transference");
dataPower[dataPower.length-1].insertAdvantage("Inner Peace", 2, null, dataPowerAlias['SP'].tip);

dataPower[dataPower.length] = new Power(1, 2, 1, "Immolation", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Offense/Energy Form", "Grants a 42% increase to all damage and discounts your energy costs by 33% for 12 seconds.<br /><br />Applies Break Free damage to any Holds, Roots, or Disables affecting you." + dataPowerAlias["AOCD"].tip);
dataPower[dataPower.length-1].insertAdvantage("Blazing Body", 1, null, "Adds periodic PBAoE damage while active.");

dataPower[dataPower.length] = new Power(1, 2, 1, "Fiery Form", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Slotted Offensive Passive/Energy Form/Clinging Flames", "+ Increaes your Elemental damage.<br />+ Increases your Fire damage resistance.<br />+ Increases your Elemental damage resistance by a lesser amount.<br />+ Deals Fire damage to nearby foes.<br />+ 20% chance to apply Clinging Flames to foes that attack you in melee range. " + dataPowerAlias['CF'].tip);

dataPower[dataPower.length] = new Power(1, 2, 1, "Fire Shield", 1, 0, 0, 0, 0, 0, "Targets Self", "Block/Clinging Flames", "While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Has a 25% chance to apply Clinging Flames to foes that attack you in melee range.  " + dataPowerAlias['CF'].tip);

dataPower[dataPower.length] = new Power(1, 2, 1, "Thermal Reverberation", 0, 0, 0, 0, 0, 0, "Energy Unlock", "Innate Passive/Endurance/Recovery", "+ Being near targets affected by your Clinging Flames gives you energy.<br />+ This effect can only occur once every 3 seconds per target.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.", Power.TYPE_ENERGY_UNLOCK);
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = new Power(1, 2, 2, "Rimefire Burst", 0.67, 0, 0, 0, 49, 35, "Targets foe/50 feet", "Ranged Damage/Clinging Flames/Chilled", "Deals Fire and Cold damage to the target.<br /><br />If the target is not affected by Clinging Flames, applies Chilled.<br /><br />If the target is not affected by Chilled, applies Clinging Flames.<br /><br />If the target is affected by both, this power deals damage in a 30 foot Sphere and recharges instantly, consuming both debuffs.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "NG", "CS");

dataPower[dataPower.length] = new Power(1, 2, 2, "Pyre", 0.67, 1.83, 0, 0, [39,122], 0, "Affects foe (5 max)/25 foot Sphere", "Ranged AoE Damage/Burning/DoT/Clinging Flames", "Deals Fire damage to nearby foes and has a 10-38% chance to apply Clinging Flames. " + dataPowerAlias["CF"].tip + "<br /><br />When fully charged, creates a patch of fire around you with a 10 foot radius which lasts 10 seconds.  The fire patch deals Fire damage every second and has a 15% chance to apply Clinging Flames.");
dataPower[dataPower.length-1].insertAdvantage("Backdraft", 2, null, "Causes your Pyre to Knock Down all affected foes. Cannot occur more than once every 5 seconds.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 2, 2, "Conflagration", 0.5, 5, 0.5, 0, [38,25], 0, "Targets foe (5 max)/50 feet/15 foot Sphere", "Ranged AoE Damage/Burning/Clinging Flames", "Deals Fire damage to foes and has a 10% chance to apply Clinging Flames to them. " + dataPowerAlias["CF"].tip);
dataPower[dataPower.length-1].insertAdvantage("Burning Rain", 2, null, "With this advantage, your Conflagration leaves a fire patch when fully maintained.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "NG", "CS");

dataPower[dataPower.length] = new Power(1, 2, 2, "Absorb Heat", 0.5, 0, 0, 0, 67, 10, "Affects foe (5 max)/25 foot Sphere", "Team Heal", "Deals fire damage in an area around you.<br /><br />Consumes all of your Clinging Flames, healing you and your team for each Clinging Flames consumed.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(1, 2, 2, "Pyromancer's Blades", 0.67, 1, 0, 1, 41, 20, "Targets Self", "Uncontrolled Pet", "Summons a pair of blazing scimitars to attack up to 3 foes at a time, dealing Fire damage with each hit.");

dataPower[dataPower.length] = new Power(1, 2, 3, "Flashfire", 0.5, 0, 0, 0, 45, 15, "Targets foe (5 max)/50 feet/10 foot Sphere", "Ranged AoE Damage/Burning/Clinging Flames", "Creates a Flashfire Patch on the target and applies Clinging Flames to nearby foes. " + dataPowerAlias["CF"].tip + "<br /><br />The Flashfire Patch lasts for 16 seconds, deals fire damage every second, and has a 10% chance to apply Clinging Flames to targets.");
dataPower[dataPower.length-1].insertAdvantage("Sweltering Heat", 2, null, "Enemies affected by the Pyre created by this power will have their movement speed reduced.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(1, 2, 3, "Fire Snake", 0.67, 0, 0, 0, 51, 25, "Targets foe/100 feet", "AoE Damage/Burning/DoT/Clinging Flames", "Sends a Fire Snake after your target for 16 seconds, dealing Fire damage every second to foes within 10 feet.<br /><br />Applies Serpenting Fire, reducing the target's Fire resistance by 5% and Elemental resistance by 3%.  This effect stacks up to 3 times and lasts 6 seconds.<br /><br />Has a 10% chance to apply Clinging Flames. " + dataPowerAlias["CF"].tip);
dataPower[dataPower.length-1].insertAdvantage("Trail Blazer", 2, null, "Increases the movement speed of your Fire Snake.");

dataPower[dataPower.length] = new Power(1, 2, 3, "Hydra", 1, 0, 0, 0, 46, 30, "Targets non-object foe/50 feet", "AoE Damage", "Summons a Lava Pit and 2 Hydra heads for 20 seconds.  The Hydras deal Fire damage to up to 3 foes within 50 feet, and the Lava Pit deals Fire damage to foes within range and has a 10% chance to apply Clinging Flames. " + dataPowerAlias["CF"].tip + PowerUnlocksFrom(UNLOCK_RECOGNITION, "500/250", "SCR/GCR"));

dataPower[dataPower.length] = dataPowerAlias["Energy Storm"].replicate(1, 2);
dataPower[dataPower.length] = dataPowerAlias["Gravity Driver"].replicate(1, 2);
dataPower[dataPower.length] = dataPowerAlias["Fractal Aegis"].replicate(1, 2);
dataPower[dataPower.length] = dataPowerAlias["Storm Strike"].replicate(1, 2);

//------------------------------------------------------------------------------
// Power Framework: Force
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(3);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Bolts', '<div class="Sprite Force_ForceBolts"></div>&nbsp;Force Bolts', 1, 3, pow++, -1, 'Force, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Force Bolts fires darts of solid energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Energy Refraction', 'Energy Refraction', 2, null, 'Your Force Bolt attacks have a chance to create a shield around you which last for a few seconds and absorbs a modest amount of damage. This shield counts as an Energy Form.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Blast', '<div class="Sprite Force_ForceBlast"></div>&nbsp;Force Blast', 1, 3, pow++, 0, 'Force, 100 foot Ranged Single Target Damage and Knock Back (Blast)<br /><br />Emits a blast of crushing energy that may well Knock your foe out of your face.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Field Inversion', 'Field Inversion', 2, null, 'This advantage causes your force blast to briefly invert the harmonics of any force field affecting your target, causing it to emit a pulse of kinetic energy, dealing damage to and around your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Snap', '<div class="Sprite Force_ForceSnap"></div>&nbsp;Force Snap', 1, 3, pow++, 1, 'Force, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage and Knocks your target toward you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Entropic Collapse', 'Entropic Collapse', 2, null, 'Your Force Snap now causes a collapse of energy around your target, Knocking Down other nearby foes.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Eruption', '<div class="Sprite Force_ForceEruption"></div>&nbsp;Force Eruption', 1, 3, pow++, 1, 'Force, 10 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Force Eruption is an explosive blast of energy which can fling your foes away from you. We all need our personal space, and you know how to get yours.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Gravitational Polarity', 'Gravitational Polarity', 2, null, 'When Force Eruption is fully charged, this creates a "hot spot" where the eruption occurred. The spot increases all damage by 15% while the caster stands in it.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Personal Force Field', '<div class="Sprite Force_PersonalForceField"></div>&nbsp;Personal Force Field', 1, 3, pow++, 1, 'Force, Defensive Passive<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />+ Applies a regenerating damage absorption shield to you.<br />- The speed at which this shield regenerates is reduced as you take damage.<br />+ While in combat, blocking increases the shield regeneration rate.<br />+ Defense (yellow) and energy (blue) boosts will restore a portion of the shield.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Kinetic Manipulation', '<div class="Sprite Force_KineticManipulation"></div>&nbsp;Kinetic Manipulation', 1, 3, pow++, 1, 'Force, Offensive Passive - Energy Form<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your ranged Physical damage.<br />+ Increases your ranged Physical damage resistance.<br />+ Increases your Physical damage resistance by a lesser amount.<br />+ Recovers Energy when you take Crushing damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Protection Field', '<div class="Sprite Force_ProtectionField"></div>&nbsp;Protection Field', 1, 3, pow++, 1, 'Force, 50 foot Ranged Single Friend Shield<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />Protection Field allows you to place a field of protective energy around an ally taking the brunt of damage from attacks against them.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Expel Impurity', 'Expel Impurity', 2, null, 'Allows your Protection Field to remove the Burn or Bleed with the most duration left when applied.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Shield', '<div class="Sprite Force_ForceShield"></div>&nbsp;Force Shield', 1, 3, pow++, 1, 'Force, Block<br /><br />Requires 1 power from Force or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Getting hit while blocking restores more energy than other blocks.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Force Sheathe', 'Force Sheathe', 1, null, 'The Force Shield effect persists for a few seconds after you stop blocking, and it will continue to feed you Energy from all incoming attacks, as well as providing a small defensive benefit.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Geyser', '<div class="Sprite Force_ForceGeyser"></div>&nbsp;Force Geyser', 1, 3, pow++, 2, 'Force, 100 foot Ranged Single Target Damage and Knock Up<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />You cause a localized geyser of force energy underneath your target, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Hard Landing', 'Hard Landing', 2, null, 'When your targets hit the ground, they always seem to land in the worst possible way. They suffer a Snare from the attack, temporarily reducing their movement speed.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Crushing Wave', '<div class="Sprite Force_CrushingWave"></div>&nbsp;Crushing Wave', 1, 3, pow++, 2, 'Force, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />Crushing Wave releases continuous waves of powerful force energy upon your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Disruptive Force', 'Disruptive Force', 1, null, 'Adds a Knock Down effect to the final pulse of your Crushing Wave.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Containment Field', '<div class="Sprite Force_ContainmentField"></div>&nbsp;Containment Field', 1, 3, pow++, 2, 'Force, 50 foot Ranged Single Target Hold<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />Containment Field allows you to imprison a foe in a sphere of solid energy, preventing them from making a move.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Grinding Halt', 'Grinding Halt', 2, null, 'Causes your Containment Field power to remove Travel Powers from affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(1, 3, 2, "Field Surge", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Defense", "Absorbs a moderate amount of damage for up to 15 seconds.  If using Personal Force Field, it also restores a portion of its shield strength." + dataPowerAlias["ADCD"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Power Swell', 'Power Swell', 2, null, 'Your Field Surge fills you with force energy, increasing your damage dealt by 15% for the duration.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Redirected Force', '<div class="Sprite Force_RedirectedForce"></div>&nbsp;Redirected Force', 1, 3, pow++, 2, 'Force, 40 foot Sphere PBAoE Ally Defense Buff<br /><br />Requires 3 powers from Force or 4 non-Energy Building powers from any framework.<br /><br />You protect your allies and bend that force to your will.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gravitic Ripple', '<div class="Sprite Force_FieldSurge"></div>&nbsp;Gravitic Ripple', 1, 3, pow++, 3, 'Force, 25 foot Sphere PBAoE Damage and Gravity Control<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />You distort the local gravity, causing nearby foes to become nexuses of gravitic force.<br /><br />MAINTAIN<br />+ Deals Crushing damage to targets around you.<br />+ Applies Gravity Well to all targets, causing them to pull all their nearby allies in.' + PowerUnlocksFrom(UNLOCK_ONSLAUGHT, 10000, "Villain Tokens"));
dataPower[dataPower.length-1].iconOverride = "Force_FieldSurge";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Cascade', '<div class="Sprite Force_ForceCascade"></div>&nbsp;Force Cascade', 1, 3, pow++, 3, 'Force, 100 foot Ranged 5 foot Cylinder AoE Damage and Knock Back<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Force Cascade unleashes a titanic blast of crushing energy flinging aside any enemies in its path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Containment Blast', 'Containment Blast', 2, null, 'Applies a Paralyze, which functions like Containment Field, to all targets on a full charge.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Force Detonation', '<div class="Sprite Force_ForceDetonation"></div>&nbsp;Force Detonation', 1, 3, pow++, 3, 'Force, 50 foot Ranged 10 foot Sphere AoE Damage and Knock Back<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Force Detonation causes an explosion of energy anywhere you desire, sending nearby enemies flying.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Force Spate', 'Force Spate', 2, null, 'Causes your Force Detonation to temporarily invert any nearby force fields, such as Containment Field. Inverted fields cause an additional burst of damage around the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Inertial Dampening Field', '<div class="Sprite Force_IntertialDampeningField"></div>&nbsp;Inertial Dampening Field', 1, 3, pow++, 3, 'Force, Form (Superstats), 100 foot Team Aura (20 max)<br /><br />Requires 5 powers from Force or 6 non-Energy Building powers from any framework.<br /><br />Grants you and nearby teammates flat damage reduction that scales with your super stats.<br /><br />- Increases energy costs by 10%.<br />- Counts as a Form and thus cannot be used with other Forms.<br />- Does not have an energy return mechanic.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Energy Storm"].replicate(1, 3);
dataPower[dataPower.length] = dataPowerAlias["Gravity Driver"].replicate(1, 3);
dataPower[dataPower.length] = dataPowerAlias["Fractal Aegis"].replicate(1, 3);
dataPower[dataPower.length] = dataPowerAlias["Storm Strike"].replicate(1, 3);

//------------------------------------------------------------------------------
// Power Framework: Wind
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(4);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wind Lash', '<div class="Sprite Wind_WindLash"></div>&nbsp;Wind Lash', 1, 4, pow++, -1, 'Wind, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Wind Lash assaults your foe with powerful bolts of wind.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Stiff Breeze', 'Stiff Breeze', 2, null, 'Extends the chance to Disorient and Repel to every attack, instead of just the first.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gust', '<div class="Sprite Wind_Gust"></div>&nbsp;Gust', 1, 4, pow++, 0, 'Wind, 100 foot Ranged Single Target Damage (Blast)<br /><br />Emits a strong blast of wind that damages your foe and may Knock them away.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Toppling Winds', 'Toppling Winds', 2, null, '+ Grants a 45-100% chance (based on charge time) to stagger your target.<br />+ ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wind Breath', '<div class="Sprite Wind_WindBreath"></div>&nbsp;Wind Breath', 1, 4, pow++, 1, 'Wind, 50 foot Ranged 45 degree Cone AoE Damage and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />Wind Breath causes your character to exhale a cone of fast moving wind, pummeling and chilling your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Unstable Footing', 'Unstable Footing', 2, null, '+ Adds a chance to Knock Down affected targets. Targets Knocked Down by your Wind Breath will also be Staggered.<br />+ ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Hurricane', '<div class="Sprite Wind_Hurricane"></div>&nbsp;Hurricane', 1, 4, pow++, 1, 'Wind, 25 foot Sphere PBAoE Ranged Damage and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />You create a powerful storm all around you, dealing damage to your foes and Repelling them away from you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Perfect Storm', 'Perfect Storm', 3, null, 'Your Hurricane now also deals some Electrical damage, and has a chance to apply Chill and Negative Ions to your targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Stormbringer', '<div class="Sprite Wind_Stormbringer"></div>&nbsp;Stormbringer', 1, 4, pow++, 1, 'Wind, Offensive Passive - Energy Form<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Crushing, Cold, and Electrical damage.<br />+ Increases your Crushing, Cold, and Electrical damage resistance.<br />+ Recovers Energy when you take Crushing, Cold, or Electrical damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wind Barrier', '<div class="Sprite Wind_WindBarrier"></div>&nbsp;Wind Barrier', 1, 4, pow++, 1, 'Wind, Block and Repel<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Repels foes in front of you, as well as foes that attack you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wind Reverberation', '<div class="Sprite Wind_WindReverberation"></div>&nbsp;Wind Reverberation', 1, 4, pow++, 1, 'Wind, Energy Unlock (Endurance, <i>Recovery</i>)<br /><br />Requires 1 power from Wind or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ generates energy every time you attempt to Repel an enemy.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Updraft', '<div class="Sprite Wind_Updraft"></div>&nbsp;Updraft', 1, 4, pow++, 2, 'Wind, 50 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />A sudden rush of air rises from underneath your target, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Dispersal', 'Dispersal', 3, null, 'Causes your Updraft to deal 50% damage to targets withing 10 feet, and they are Knocked Up and Repelled away from your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Whirlwind', '<div class="Sprite Wind_Whirlwind"></div>&nbsp;Whirlwind', 1, 4, pow++, 2, 'Wind, 50 foot Ranged 15 foot Sphere AoE DoT and Snare<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You summon a powerful Whirlwind on top of your target, causing damage and making it difficult for your foes to move.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Vortex', 'Vortex', 2, null, 'Causes the main target of your Whirlwind to become the focus of a vortex, pulling other nearby foes toward that target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dust Devil', '<div class="Sprite Wind_DustDevil"></div>&nbsp;Dust Devil', 1, 4, pow++, 2, 'Wind, 100 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You conjure up a Dust Devil to fight your foe. It will chase them down, and deal damage to other nearby enemies as well.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Triple Threat', 'Triple Threat', 2, null, 'Your Dust Devil becomes empowered with Cold and Electric energy, causing it to now deal 40% of normal damage as Crushing damage, an additional 40% of normal damage as Cold damage, and an additional 40% of normal damage as Electrical damage.<br /><br />The Cold damage is increased by 30% against targets affected by Chill, and the Electric damage is increased by 30% against targets affected by Negative Ions.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Twister', '<div class="Sprite Wind_Twister"></div>&nbsp;Twister', 1, 4, pow++, 2, 'Wind, 50 foot Single Target Hold<br /><br />Requires 3 powers from Wind or 4 non-Energy Building powers from any framework.<br /><br />You encompass your foe in a fast moving prison of wind. The Twister will keep your target in place, though they may try to break free.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Typhoon', '<div class="Sprite Wind_Typhoon"></div>&nbsp;Typhoon', 1, 4, pow++, 3, 'Wind, 100 foot Ranged 5 foot Cylinder AoE Damage and Repel<br /><br />Requires 5 powers from Wind or 6 non-Energy Building powers from any framework.<br /><br />You create a massive and powerful tunnel of wind, damaging your foes and Knocking them off their feet.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cold Front', 'Cold Front', 1, null, 'Adds a chance (based on charge time) for your Typhoon to Chill your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Ionic Discharge', 'Ionic Discharge', 1, null, 'If your Typhoon hits a target affected by Negative Ions, it has a chance (based on charge time) to cause an Electric Arc to a nearby target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Air Elemental', '<div class="Sprite Wind_AirElemental"></div>&nbsp;Air Elemental', 1, 4, pow++, 3, 'Wind, Controllable Pet<br /><br />Requires 5 powers from Wind or 6 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful entity made of wind to attack your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Energy Storm"].replicate(1, 4);
dataPower[dataPower.length] = dataPowerAlias["Gravity Driver"].replicate(1, 4);
dataPower[dataPower.length] = dataPowerAlias["Fractal Aegis"].replicate(1, 4);
dataPower[dataPower.length] = dataPowerAlias["Storm Strike"].replicate(1, 4);

//------------------------------------------------------------------------------
// Power Framework: Ice
//------------------------------------------------------------------------------

dataRequireGroup['energy projector'].push(5);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Shards', '<div class="Sprite Ice_IceShards"></div>&nbsp;Ice Shards', 1, 5, pow++, -1, 'Ice, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Ice Shards gives you the ability to throw razor sharp shards of ice at your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ice Impaler', 'Ice Impaler', 2, null, 'Ice Shards has a significantly increased Critical Hit Chance.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Blast', '<div class="Sprite Ice_IceBlast"></div>&nbsp;Ice Blast', 1, 5, pow++, 0, 'Ice, 100 foot Ranged Single Target Damage and Chill (Blast)<br /><br />Ice Blast allows you to hurl a concentrated bolt of frost at your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Hard Frost', 'Hard Frost', 2, null, 'Ice Blast applies a cold resistance Debuff to targets that are Chilled.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Frost Bite', 'Frost Bite', 2, null, 'Ice Blast now refreshes the Chilled Debuff on targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shatter', '<div class="Sprite Ice_Shatter"></div>&nbsp;Shatter', 1, 5, pow++, 1, 'Ice, 50 foot Ranged 180 degree Cone AoE Damage<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Shatter allows you to throw a fan of ice shards in front of you, slicing into anyone unfortunate enough to be in their path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Crushed Ice', 'Crushed Ice', 2, null, 'Gives Shatter a 50% chance to not consume the Chilled state from targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Frost Breath', '<div class="Sprite Ice_FrostBreath"></div>&nbsp;Frost Breath', 1, 5, pow++, 1, 'Ice, 50 foot Ranged 45 degree Cone AoE Damage and Chill<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Frost Breath causes your character to exhale a cone of frost, freezing your enemies in their tracks.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Frost Bite', 'Frost Bite', 2, null, 'Frost Breath is guaranteed to add the Chill effect on those it hits.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wall of Ice', '<div class="Sprite Ice_WallOfIce"></div>&nbsp;Wall of Ice', 1, 5, pow++, 1, 'Ice, 100 foot Ranged AoE Damage and Root<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Wall of Ice calls chunks of ice from the ground in front of you to freeze anything that touches them and then explode violently, sending shards of ice in all directions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Frozen Footsteps', 'Frozen Footsteps', 2, null, 'Causes the Wall of Ice to form in your path as you move.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Cage', '<div class="Sprite Ice_IceCage"></div>&nbsp;Ice Cage', 1, 5, pow++, 1, 'Ice, 50 foot Ranged Single Target Damage and Root and DoT<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Ice Cage temporarily immobilizes a target in an icy prison.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sub-Zero Cellblock', 'Sub-Zero Cellblock', 2, null, 'Causes Ice Cage to interrupt any attacks being charged or maintained when it is initially applied.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Sheath', '<div class="Sprite Ice_IceSheath"></div>&nbsp;Ice Sheath', 1, 5, pow++, 1, 'Ice, Active Offense and Energy Form<br /><br />Requires 1 power from Iceity or 2 non-Energy Building powers from any framework.<br /><br />Ice Sheath coats you in a layer of ice focusing your power into a concentrated form which increases your combat effectiveness with all Elemental attacks.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Supercooled', 'Supercooled', 2, null, 'Guarantees those that attack you will have the Chill effect applied to them.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Form', '<div class="Sprite Ice_IceForm"></div>&nbsp;Ice Form', 1, 5, pow++, 1, 'Ice, Offensive Passive - Energy Form<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Elemental damage.<br />+ Increases your Cold damage resistance.<br />+ Increases your Elemental damage resistance by a lesser amount.<br />+ Foes attacking you have a 20% chance to be affected by Chill, reducing their movement speed by 50% for 16 seconds and occasionally trapping them in an Ice Cage.<br />+ Landing a critical hit while Ice Form is active grants you Cold Snap for 10 seconds.<br />+ Recovers Energy when you take Cold damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

// TODO: get correct description
dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Chilled Form', '<div class="Sprite Ice_ChilledForm"></div>&nbsp;Chilled Form', 1, 5, pow++, 1, 'Ice, Form (Dexterity or Ego)<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you maintain or charge a ranged power at least halfway, or when you hit a target at least 25 feet away.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Shield', '<div class="Sprite Ice_IceShield"></div>&nbsp;Ice Shield', 1, 5, pow++, 1, 'Ice, Block<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Has a 25% chance to Chill foes that attack you in melee range, reducing their movement speed by 50% for 16 sec and occasionally trapping them in an Ice Cage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Frigid Air', 'Frigid Air', 2, null, 'Allows the Chill effect from Ice Shield to be applied up to a 50 foot range, instead of just in Melee range.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Icy Embrace', '<div class="Sprite Ice_IcyEmbrace"></div>&nbsp;Icy Embrace', 1, 5, pow++, 1, 'Ice, Energy Unlock (Endurance, <i>Recovery</i>)<br /><br />Requires 1 power from Ice or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you apply Chilled to a target.<br />+ This effect can only occur once every 3 seconds and can stack up to 2 times per target.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ice Burst', '<div class="Sprite Ice_IceBurst"></div>&nbsp;Ice Burst', 1, 5, pow++, 2, 'Ice, 50 foot Ranged 25 foot Sphere AoE Damage and Knock Back<br /><br />Requires 3 powers from Ice or 4 non-Energy Building powers from any framework.<br /><br />Ice Burst creates a spire of ice under your target, lifting them into the air. The column can be destroyed, causing it to detonate violently dealing damage to any enemies around it.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Freeze, Dirtbag', 'Freeze, Dirtbag', 2, null, 'Causes Ice Burst to Paralyze the primary target, instead of Knocking them away.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Snow Storm', '<div class="Sprite Ice_SnowStorm"></div>&nbsp;Snow Storm', 1, 5, pow++, 2, 'Ice, 50 foot Ranged 15 foot Sphere AoE DoT and Chill<br /><br />Requires 3 powers from Ice or 4 non-Energy Building powers from any framework.<br /><br />Snow Storm allows you to summon a swirling blizzard to tear at your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Eye of the Storm', 'Eye of the Storm', 2, null, 'Causes Snow Storm to deal additional damage to targets that attack while affected by the storm.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = new Power(1, 5, 2, 'Ice Barrier', 0, 0, 0, 0, 0, 90, "Targets Self", "Active Defense", "Creates 3 Ice Objects near you that each grant you +15% Resistance to all damage, 100% Knock Resistance, and restore a small amount of health every 0.5 seconds.  Roots you in place for a short time." + dataPowerAlias["ADCD"].tip);
dataPower[dataPower.length-1].insertAdvantage("Frigid Freedom", 1, null, "Ice Barrier no longer Roots you.");

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Icicle Spear', '<div class="Sprite Ice_IcicleSpear"></div>&nbsp;Icicle Spear', 1, 5, pow++, 3, 'Ice, 100 foot Ranged Single Target Damage<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Icicle Spear deals increased damage against Chilled targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Freezer Burn', 'Freezer Burn', 1, null, 'Gives Icicle Spear a 20% chance to apply Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Avalanche', '<div class="Sprite Ice_Avalanche"></div>&nbsp;Avalanche', 1, 5, pow++, 3, 'Ice, 50 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />You rapidly freeze the air above your targets, creating large chunks of ice which rain down on your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Serrated Shards', 'Serrated Shards', 2, null, 'Avalanche has an increased Critical Hit Chance and increased Critical Severity.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vapor Form', '<div class="Sprite Ice_VaporForm"></div>&nbsp;Vapor Form', 1, 5, pow++, 3, 'Ice, Self Transformation PBAoE Damage and Chill<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Vapor Form transforms you into a flying cloud of mist.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Invigorating Chill', 'Invigorating Chill', 2, null, 'Adds an Energy gain effect when you deal damage in Vapor Form.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Arctic Beast', '<div class="Sprite Ice_ArcticBeast"></div>&nbsp;Arctic Beast', 1, 5, pow++, 3, 'Ice, Controllable Pet<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful Arctic Beast.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aurora', '<div class="Sprite Ice_Aurora"></div>&nbsp;Aurora', 1, 5, pow++, 3, 'Ice, Self-Resurrect and Heal<br /><br />Requires 5 powers from Ice or 6 non-Energy Building powers from any framework.<br /><br />Can be used while dead to resurrect with 50% of your maximum health and grants you the following:<br /><br />+ For the next 20 seconds, killing foes will restore additional health<br />+ For the next 20 seconds, you apply Chill to any foe that attacks you, which slows their movement by 50% for 16 seconds and occasionall traps them in an Ice Cage.<br />+ For the next 10 seconds, you are affected by Cold Snap.<br />- Shares a cooldown with similar powers.' + PowerUnlocksFrom(UNLOCK_RECOGNITION, 350, "SCR"));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Energy Storm"].replicate(1, 5);
dataPower[dataPower.length] = dataPowerAlias["Gravity Driver"].replicate(1, 5);
dataPower[dataPower.length] = dataPowerAlias["Fractal Aegis"].replicate(1, 5);
dataPower[dataPower.length] = dataPowerAlias["Storm Strike"].replicate(1, 5);

//------------------------------------------------------------------------------
// Power Set: Technology
//------------------------------------------------------------------------------
// xxx
dataRequireGroup['technology'] = [];
dataPowerAlias['Burn Through'] = PowerAlias.legacyConstructor('Burn Through', 'Burn Through', 'Burn Through', '+ Burn Through reduces your target\\\'s resistance to Crushing and Particle damage by -15% for 12 seconds.<br />+ Burn Through is a type of Radiation.');
dataPowerAlias['Melta Cannon'] = PowerAlias.legacyConstructor('Melta Cannon', 'Melta Cannon', 'Melta Cannon', '+ This power gains a 10% chance to apply Plasma Burn, which deals Particle damage every second for 16 seconds per stack.<br />+ Plasma Burn is a type of Radiation.');
dataPowerAlias['Extra Bullets'] = PowerAlias.legacyConstructor('Extra Bullets', 'Extra Bullets', 'Extra Bullets', '+ Increases the maximum number of targets you can hit with this power by 5, up from 3.<br />+ 15% additional damage agaisnt Feared targets.');

//------------------------------------------------------------------------------
// Power Framework: Archery
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(6);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Strafe', '<div class="Sprite Archery_Strafe"></div>&nbsp;Strafe', 2, 6, pow++, -1, 'Archery, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Strafe fires off a series of arrows at your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aversion', 'Aversion', 2, null, 'Scoring a Critical Hit with Strafe grants you Aversion, adding 20% of your intellect to your Dodge and Avoidance rating for 10 seconds. This can occur at most once every 20 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Straight Shot', '<div class="Sprite Archery_StraightShot"></div>&nbsp;Straight Shot', 2, 6, pow++, 0, 'Archery, 100 foot Ranged Single Target Damage (Blast)<br /><br />You fire a single arrow with deadly precision.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Split the Arrow', 'Split the Arrow', 2, null, 'Your pinpoint accuracy allows you to target the exact location you strike with this arrow, increasing the damage resistance reduction your target suffers, and causing it to affect your next 4 non-energy building direct damage Archery attacks.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Taser Arrow', '<div class="Sprite Archery_TaserArrow"></div>&nbsp;Taser Arrow', 2, 6, pow++, 1, 'Archery, 100 foot Ranged Single Target Damage and Hold<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Taser Arrow fits your arrow with an electrically charged tip delivering a powerful jolt when it strikes your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aftershock', 'Aftershock', 2, null, 'Causes your target to lose Energy and suffer additional Electrical Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sonic Arrow', '<div class="Sprite Archery_SonicArrow"></div>&nbsp;Sonic Arrow', 2, 6, pow++, 1, 'Archery, 100 foot Ranged 10 foot Sphere AoE Damage and Stun<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Sonic Arrow fires a specialized arrow at your target emitting a concentrated blast of noise when it strikes the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Deadly Dissonance', 'Deadly Dissonance', 2, null, 'Increases the Sonic AoE damage dealt by Sonic Arrow by 50% and will now Stun all targets on a full charge instead of just the selected target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Quarry', '<div class="Sprite Archery_Quarry"></div>&nbsp;Quarry', 2, 6, pow++, 1, 'Archery, Slotted Offensive Passive<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Nothing escapes your notice and once you target something, running it down is only a matter of time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Fair Game', 'Fair Game', 2, null, 'When the target of your Quarry dies, you gain a small amount of Health. The amount of Health you gain scales with your Constitution.'));

//dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Concentration'].name, dataPowerAlias['Concentration'].desc, 2, 6, pow++, 1, dataPowerAlias['Concentration'].tip);
dataPower[dataPower.length] = new Power(2, 6, 1, "Concentration", 1, 2.5, 0, 2.5, 20, 0, "Form (Intelligence or Ego)", "Buff/Form/Concentration", "Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you maintain or charge a ranged power at least halfway, or when you hit a target at least 25 feet away.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_FORM, true);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPowerAlias["Concentration"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'technology';
//dataReplacePower[dataPower.length-1] = DATAREPLACEPOWER_CONCENTRATION;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Evasive Maneuvers', '<div class="Sprite Archery_EvasiveManeuvers"></div>&nbsp;Evasive Maneuvers', 2, 6, pow++, 1, 'Archery, Self Buff<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />Evasive Maneuvers causes you to lunge backwards to put distance between you and your foe.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sleight of Mind', 'Sleight of Mind', 2, null, 'Evasive Maneuvers has a 50% chance to wipe all threat from you and places you in Stealth for 3 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Hunter\'s Instinct', '<div class="Sprite Archery_HuntersInstinct"></div>&nbsp;Hunter\'s Instinct', 2, 6, pow++, 1, 'Archery, Energy Unlock (Ego, <i>Recovery</i>)<br /><br />Requires 1 power from Archery or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you deal damage with a non-energy-building Archery power.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Ego, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Snap Shot', '<div class="Sprite Archery_SnapShot"></div>&nbsp;Snap Shot', 2, 6, pow++, 2, 'Archery, 100 foot Ranged Single Target Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />A quick shot designed to take advantage of any opening your target gives you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Finish Him', 'Finish Him', 2, null, 'Your ability to finish off a weakened foe is increased, and Snap Shot now has an additional 35% damage bonus on targets below 25% Health.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Storm of Arrows', '<div class="Sprite Archery_StormOfArrows"></div>&nbsp;Storm of Arrows', 2, 6, pow++, 2, 'Archery, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />Storm of Arrows fires a continuous volley of arrows at your target, striking them and any other targets around them.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Achilles\' Heel', 'Achilles\' Heel', 2, null, 'Storm of Arrows pins all enemies in the area under attack to the ground, Rooting them in place and repairing the duration of your Roots on the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Torrent of Arrows', '<div class="Sprite Archery_TorrentOfArrows"></div>&nbsp;Torrent of Arrows', 2, 6, pow++, 2, 'Archery, 100 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 3 powers from Archery or 4 non-Energy Building powers from any framework.<br /><br />Torrent of Arrows uses your archery skills to fire off multiple arrows in a cone in front of you in a single shot.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Relentless Recurve', 'Relentless Recurve', 2, null, 'Torrent of Arrows Knocks Back all opponents hit by it.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Focused Shot', '<div class="Sprite Archery_FocusedShot"></div>&nbsp;Focused Shot', 2, 6, pow++, 3, 'Archery, 120 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />Focused Shot allows you to carefully aim your next shot and land your attack precisely where you intend.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ballista Bolt', 'Ballista Bolt', 2, null, 'Focused Shot will pierce through enemies hitting any additional enemies in line with your initial target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Explosive Arrow', '<div class="Sprite Archery_ExplosiveArrow"></div>&nbsp;Explosive Arrow', 2, 6, pow++, 3, 'Archery, 100 foot Ranged 10 foot Sphere AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />Explosive Arrow fits one of your arrows with an explosive tip, causing the arrow to explode when it strikes your target. ');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Where\\\'s the Kaboom?', 'Where\\\'s the Kaboom?', 2, null, 'Explosive Arrow deals an initial amount of Piercing damage and delays the explosive effect for several seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gas Arrow', '<div class="Sprite Archery_GasArrow"></div>&nbsp;Gas Arrow', 2, 6, pow++, 3, 'Archery, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Archery or 6 non-Energy Building powers from any framework.<br /><br />You launch an arrow filled with a dangerous mixture of toxins.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Noxious Fumes', 'Noxious Fumes', 2, null, 'You focus the chemical mixture of your Gas Arrow to overwhelm the senses of your targets. This causes them to be Snared while inside the cloud, and they also have a 10% chance every second they are in the cloud to become Stunned for a short time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(2, 6, 4, "Implosion Engine", 1, 0, 0, 0, 117, 90, "Targets foe/100 feet", "Ultimate/Ranged AoE Damage/Reverse Repel/Snare", "You throw an Implosion Engine, a device that generates a massive gravitational vortex in a very small area, sucking in nearby matter, and dealing significant Dimensional damage.<br /><br />CLICK<br />+ Create and throw an Implosion Engine at your target, dealing Crushing damage from the massive gravity waves, pulling them toward the Engine.<br />- This power is incapable of getting a Critical Hit.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Inverse Polarization Field", 2, null, "Just before self-destructing, the polarity of the gravitational field created by Implosion Engine will reverse, sending all affected enemies flying.");
dataPowerAlias["Implosion Engine"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(2, 6, 4, "Mechanical Monstrosity", 0.67, 1, 0, 1, 66, 90, "Targets Self", "Ultimate/Uncontrolled Pet", "Summons a Mechanical Spider.<br /><br />+ Deals heavy Slashing, Electrical, and Poison damage.<br />+ Attacks have increased threat.<br />+ Can apply Debilitating Poison to foes." + PowerUnlocksFrom("Spider Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPowerAlias["Mechanical Monstrosity"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(2, 6, 4, "Fire All Weapons", 0.5, 5, 0.5, 0, [68,49], 90, "Targets foe (10 max)/50 feet/120 degree Cone", "Ultimate", "Hand Slot - Shoulder Slot - Chest Slot<br /><br />Deals Particle damage to all targets.", Power.TYPE_NORMAL, true);
dataPowerAlias["Fire All Weapons"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(2, 6, 4, "Meltdown", 0.67, 0.83, 0, 0.83, 160, 60, "Affects foe (10 max)/15 foot Sphere", "Ultimate/Melee AoE Damage", "Deals Particle damage to nearby targets and knocks them down.  The initial strike applies Plasma Burn immediately, with additional stacks being applied over 5 seconds." + PowerUnlocksFrom("Toybox"), Power.TYPE_NORMAL, true);
dataPowerAlias["Meltdown"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(2, 6, 4, "Showdown", 0.5, 5, 0.5, 0, [56,37], 90, "Affects foe (10 max)/50 feet/180 degree Cone", "Ultimate/Ranged AoE Damage/Root", "Deals Piercing damage and Roots targets for 8 seconds.  Each hit refreshes the Root duration." + PowerUnlocksFrom("Western Lockbox"), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("You Clean, We'll Sweep", 1, null, "+ Applies a large threat over time effect to your target.<br />+ This effect stacks with the Challenge! effect.");
dataPowerAlias["Showdown"] = new PowerAlias(dataPower[dataPower.length-1]);

//------------------------------------------------------------------------------
// Power Framework: Gadgeteering
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(7);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sonic Blaster', '<div class="Sprite Gadgeteering_SonicBlaster"></div>&nbsp;Sonic Blaster', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Sonic Blaster emits a painfully concentrated beam of sound to rip through your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Refraction of Sound', 'Refraction of Sound', 2, null, 'Changes the Sonic Blaster power to deal damage in a cone instead of only to a single target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Particle Rifle', '<div class="Sprite Gadgeteering_ParticleRifle"></div>&nbsp;Particle Rifle', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Particle Rifle discharges concentrated bursts of Particle energy to assault your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Boomerang Toss', '<div class="Sprite Gadgeteering_BoomerangToss"></div>&nbsp;Boomerang Toss', 2, 7, pow++, -1, 'Gadgeteering, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Use Boomerang Toss to throw a small projectile at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Experimental Blaster', '<div class="Sprite Gadgeteering_ExperimentalBlaster"></div>&nbsp;Experimental Blaster', 2, 7, pow++, 0, 'Gadgeteering, 100 foot Ranged Single Target Damage and Random Effects (Blast)<br /><br />Experimental Blaster is a weapon of your own invention that fires a beam at your target, dealing damage and sometimes having other more... unpredictable effects.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Death Ray', 'Death Ray', 1, null, 'Doubles the chance that your Experimental Blaster deals additional damage when charged less than 1 second, and adds a very very small chance to auto-kill targets it effects. The auto-kill does not work on Master Villains and higher; instead, it deals an additional hit of damage from your blaster.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Pulse Beam Rifle', '<div class="Sprite Gadgeteering_PulseBeamRifle"></div>&nbsp;Pulse Beam Rifle', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Target Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />The Pulse Beam Rifle is designed to target your enemies weak points. While it is one of your most stable creations, it still produces somewhat unpredictable results.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Finite Improbability Engine', 'Finite Improbability Engine', 2, null, 'A reasonable attempt at changing the outcome of random events by evaluating a finite number of improbable outcomes and altering them to your advantage, this device slightly increase the Critical Hit Chance and Critical Severity provided per tick by 1% each, and causes random effects to affect your target when you Critically Hit them.<br /><br />These effects include, but are not limited to: Disorientation, spontaneous Bleeding, indescribable Fear, Slowness of movement ("The Snares"), toxic infusion, temporal displacement, dimensional displacement, important object displacement, other types of displacement, and potentially unknown side effects.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ricochet Throw', '<div class="Sprite Gadgeteering_RicochetThrow"></div>&nbsp;Ricochet Throw', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Target Damage (Blast)<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />You throw a well aimed boomerang at your foes that can bounce to several, striking them for Crushing Damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Microelectronic Controllers', 'Microelectronic Controllers', 2, null, 'Your boomerangs now deal increased damage for each subsequent target they hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Grapple Gun Pull', '<div class="Sprite Gadgeteering_GrappleGunPull"></div>&nbsp;Grapple Gun Pull', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Yank your foe to you using your trusty Grapple Gun.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gauntlet Chainsaw', '<div class="Sprite Gadgeteering_GauntletChainsaw"></div>&nbsp;Gauntlet Chainsaw', 2, 7, pow++, 1, 'Gadgeteering, 10 foot Melee 2.5 foot Cylinder AoE Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Gauntlet Chainsaw uses a glove mounted chainsaw to slash through any targets in your path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ripsaw', 'Ripsaw', 2, null, 'Increases the damage your Gauntlet Chainsaw deals when the target is below 30% Health.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Particle Mine', '<div class="Sprite Gadgeteering_ParticleMine"></div>&nbsp;Particle Mine', 2, 7, pow++, 1, 'Gadgeteering, Placed AoE Ranged Damage<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Particle Mine places a mine on the ground that will explode, dealing heavy Particle damage, when an enemy comes within range.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ejector Module', 'Ejector Module', 2, null, 'Enemies hit by Particle Mine will be Knocked Back in addition to taking damage.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Experimental Burst Ray', '<div class="Sprite Gadgeteering_ExperimentalBurstRay"></div>&nbsp;Experimental Burst Ray', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged 30 degree Cone AoE Damage and Random Effects<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Making tweaks to a basic Experimental Blaster has allowed you to generate a wide-spectrum Particle beam attack with it. You still haven\\\'t worked out all of the kinks, but it\\\'s probably ready for field testing. Probably.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Arcturus Cooling System', 'Arcturus Cooling System', 2, null, 'Increases the chance of getting secondary effects and halves the chance and duration of overheating your Experimental Burst Ray by temporarily creating a portal to an alternate reality, dissipating the immense heat generated from overcharging into that alternate reality instead of our own. The likelihood of that reality being populated is astronomically low, so it\\\'s probably fine.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Entangling Mesh', '<div class="Sprite Gadgeteering_EntanglingMesh"></div>&nbsp;Entangling Mesh', 2, 7, pow++, 1, 'Gadgeteering, 50 foot Ranged 15 foot Sphere AoE Root<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Entangling Mesh adds a web-like explosion to your arsenal. Any enemies caught in the explosion become tangled in the mesh Rooting them in place.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sapping Solution', 'Sapping Solution', 2, null, '5 seconds after being hit by the Entangling Mesh, targets become Snared by the debilitating chemicals of the mesh, causing them to move slowly for a time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bionic Shielding', '<div class="Sprite Gadgeteering_BionicShielding"></div>&nbsp;Bionic Shielding', 2, 7, pow++, 1, 'Gadgeteering, 100 foot Ranged Single Friend Buff and Heal<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Bionic Shielding places a shield of healing energy around your target, causing them to be healed any time they take damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Overloaded Circuits', 'Overloaded Circuits', 2, null, 'Places an active defense system in your bionic shielding, dealing Electrical damage to anyone who triggers your shield. Damage dealt is based on incoming damage.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Medical Nanites', '<div class="Sprite Gadgeteering_MedicalNanites"></div>&nbsp;Medical Nanites', 2, 7, pow++, 1, 'Gadgeteering, Support Passive, 100 foot PBAoE Friend HoT<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />+ Heals you and allies within 100 feet every 3 seconds.<br />+ Affected allies also gain a small amount of damage resistance.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sonic Device', '<div class="Sprite Gadgeteering_SonicDevice"></div>&nbsp;Sonic Device', 2, 7, pow++, 1, 'Gadgeteering, Self On-Next-Hit Damage and Stun<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Sonic Device adds a focused Sonic pulse to your next attack, increasing the damage of the attack and adding the potential to Stun your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Deafening Dissolution', 'Deafening Dissolution', 2, null, 'Your Sonic Device now deals 20% less damage with single target attacks, but deals 80% additional damage with AoE attacks.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Nanobot Swarm', '<div class="Sprite Gadgeteering_NanobotSwarm"></div>&nbsp;Nanobot Swarm', 2, 7, pow++, 1, 'Gadgeteering, Self Recharge Reduction<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />Using millions of tiny robots you refresh yourself and continue fighting as though the fight just started.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Rejuvinating Injectors', 'Rejuvinating Injectors', 2, null, 'Causes the activation of Nanobot Swarm to grant you a Heal over Time Buff for several seconds.'));

dataPower[dataPower.length] = dataPowerAlias["Concentration"].replicate(2, 7);
dataRequireGroupPower[dataPower.length-1] = 'technology';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Molecular Self-Assembly', '<div class="Sprite Gadgeteering_MolecularSelfAssembly"></div>&nbsp;Molecular Self-Assembly', 2, 7, pow++, 1, 'Gadgeteering, Energy Unlock (Intelligence, <i>Recovery</i>)<br /><br />Requires 1 power from Gadgeteering or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time one of your powers comes off cooldown.<br />+ Restores energy every 3 seconds over 6 seconds.<br />+ This ability does not stack, but additional applications will refresh the duration.<br />+ The energy gained scales with your Intelligence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Tractor Beam', '<div class="Sprite Gadgeteering_TractorBeam"></div>&nbsp;Tractor Beam', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged Single Target Reverse Repel<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Tractor Beam latches on to your target and pulls them towards you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Final Delivery', 'Final Delivery', 2, null, 'Targets that are beamed into Melee range will be damaged and Knocked Back.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sonic Boom Generator', '<div class="Sprite Gadgeteering_SonicBoomGenerator"></div>&nbsp;Sonic Boom Generator', 2, 7, pow++, 2, 'Gadgeteering, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />With this enhanced Sonic Blaster, you can generate a highly concentrated pulse of Sonic energy, which erupts into near deafening levels on your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sonic Suppression Enhancer', 'Sonic Suppression Enhancer', 2, null, 'This modification allows your Sonic Boom Generator to focus the frequency of your Sonic attack such that your targets will be unable to focus and will be more susceptible to Sonic damage for a short period of time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Throwing Blades', '<div class="Sprite Gadgeteering_ThrowingBlades"></div>&nbsp;Throwing Blades', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged 120 degree Cone AoE Damage<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />You throw a flurry of boomerangs at all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Aggression', 'Aggression', 2, null, '+ On a full charge, applies Bleed to a non-Bleeding target.<br />+ Applies Bleed to a non-Bleeding target on tap if used in melee range.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gas Pellets', '<div class="Sprite Gadgeteering_GasPellets"></div>&nbsp;Gas Pellets', 2, 7, pow++, 2, 'Gadgeteering, Ranged AoE Damage and Snare<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />Gas Pellets throws 4 pellets that release a choking fume that damages and slows all enemies caught in its radius.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Oversized Pellet Bag', 'Oversized Pellet Bag', 2, null, 'Your Gas Pellets now have a chance to apply poison.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Tanglecoil Launcher', '<div class="Sprite Gadgeteering_TanglecoilLauncher"></div>&nbsp;Tanglecoil Launcher', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Single Target Hold<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Tanglecoil fires a projectile thats binds your foe, crushing them and preventing any actions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Constricting Coils', 'Constricting Coils', 2, null, 'Reinforced Tanglecoil wires double the damage dealt by your Tanglecoil Launcher.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bolas', '<div class="Sprite Gadgeteering_Bolas"></div>&nbsp;Bolas', 2, 7, pow++, 2, 'Gadgeteering, 50 foot Ranged Single Target Damage and Hold<br /><br />Requires 3 powers from Gadgeteering or 4 non-energy building powers from any framework.<br /><br />Bolas throws a projectile that binds your foe, crushing them and preventing any actions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Toxic Nanites', '<div class="Sprite Gadgeteering_ToxicNanites"></div>&nbsp;Toxic Nanites', 2, 7, pow++, 2, 'Gadgeteering, Self On-Next-Hit DoT<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Toxic Nanites laces your next attack with deadly nanites, infecting your target and dealing Toxic Damage over Time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Nerve Damage', 'Nerve Damage', 2, null, 'Adds a Snare to the Toxic Nanite effect, reducing the movement speed of the target for the duration of the DoT effect. When using an AoE attack with Toxic Nanites, the duration of the Snare is reduced.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Miniaturization Drive', '<div class="Sprite Gadgeteering_MiniaturizationDrive"></div>&nbsp;Miniaturization Drive', 2, 7, pow++, 2, 'Gadgeteering, Self On-Next-Hit Debuff<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />Miniaturization Drive charges your next attack with a miniaturization field, causing the target of the attack to shrink in size and strength.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Reciprocating Gizmo', 'Reciprocating Gizmo', 2, null, 'Causes you to grow in size as your target shrinks, increasing your movement speed and damage.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Munitions Bots', '<div class="Sprite Gadgeteering_MunitionsBots"></div>&nbsp;Munitions Bots', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon Munitions Bots that can transform back and forth between a minigun armed robot and a powerful but stationary rapid-fire turret.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Support Drones', '<div class="Sprite Gadgeteering_SupportDrones"></div>&nbsp;Support Drones', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />This power summons 2 hovering Support Drones that can toggle between a healing mode, and a light high-tech energy weapon platform.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Attack Toys', '<div class="Sprite Gadgeteering_AttackToys"></div>&nbsp;Attack Toys', 2, 7, pow++, 2, 'Gadgeteering, Controllable Pet<br /><br />Requires 3 powers from Gadgeteering or 4 non-Energy Building powers from any framework.<br /><br />This power summons automated Attack Toys that can periodically self replicate.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Orbital Cannon', '<div class="Sprite Gadgeteering_OrbitalCannon"></div>&nbsp;Orbital Cannon', 2, 7, pow++, 3, 'Gadgeteering, 100 foot Ranged AoE Damage<br /><br />Requires 5 powers from Gadgeteering or 6 non-Energy Building powers from any framework.<br /><br />Orbital Cannon calls down a Particle blast to destroy your enemies from a weapon platform orbiting high overhead.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Anvil of Dawn', 'Anvil of Dawn', 2, null, 'Orbital Cannon continues firing a steady beam after the initial blast. It will also chase targets, but moves slowly.<br /><br />In this mode the continuing damaging power of the cannon is effective only at the ground level.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Strafing Run', '<div class="Sprite Gadgeteering_StrafingRun"></div>&nbsp;Strafing Run', 2, 7, pow++, 3, 'Gadgeteering, Ranged AoE Damage<br /><br />Requires 5 powers from Gadgeteering or 6 non-energy building powers from any framework.<br /><br />You call in support from your high tech jet which then drops explosives in a targeted area.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Resurrection Serum', '<div class="Sprite Gadgeteering_ResurrectionSerum"></div>&nbsp;Resurrection Serum', 2, 7, pow++, 3, 'Gadgeteering, 15 foot Sphere PBAoE Revive<br /><br />Requires 5 powers from Gadgeteering or 6 non-Energy Building powers from any framework.<br /><br />Resurrection Serum is a carefully crafted concoction administered to fallen allies to return them to action.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Reanimator', 'Reanimator', 2, null, 'Modifies the function of Resurrection Serum to allow its use on enemies who will then fight by your side as a zombie for a time. The duration increases for each rank of Resurrection Serum you purchase.<br /><br />Taking this advantage replaces the original functionality of the power.'));

dataPower[dataPower.length] = dataPowerAlias["Implosion Engine"].replicate(2, 7);
dataPower[dataPower.length] = dataPowerAlias["Mechanical Monstrosity"].replicate(2, 7);
dataPower[dataPower.length] = dataPowerAlias["Fire All Weapons"].replicate(2, 7);
dataPower[dataPower.length] = dataPowerAlias["Meltdown"].replicate(2, 7);
dataPower[dataPower.length] = dataPowerAlias["Showdown"].replicate(2, 7);

//------------------------------------------------------------------------------
// Power Framework: Munitions
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(8);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gunslinger', '<div class="Sprite Munitions_Gunslinger"></div>&nbsp;Gunslinger', 2, 8, pow++, -1, 'Munitions, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Gunslinger pulls out a pair of pistols to put down your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Trick Shot', 'Trick Shot', 2, null, '50% (100% while Concentrated) chance to hit an additional target within 12 feet. The additional target takes double damage if they are Feared.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Steady Shot', '<div class="Sprite Munitions_SteadyShot"></div>&nbsp;Steady Shot', 2, 8, pow++, -1, 'Munitions, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />You take aim with a single pistol to shoot your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Paint the Target', 'Paint the Target', 2, null, 'Each shot focuses your aim, increasing your chance to Critically Hit and your Critical Severity. This effect stacks up to 5 times, and is consumed when you perform a Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Burst Shot', '<div class="Sprite Munitions_BurstShot"></div>&nbsp;Burst Shot', 2, 8, pow++, 0, 'Potato<br /><br />Deals Piercing damage to targets and applies Armor Piercing.<br />+ ' + dataPowerAlias['AP'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Taking Names', 'Taking Names', 2, null, 'Burst Shot now refreshes the Furious buff on you.  If you are not affected by Furious, it will apply one stack.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Off Your Feet', 'Off Your Feet', 2, null, 'Enemies will now be knocked back by Burst Shot.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Pistol Whip', '<div class="Sprite Munitions_PistolWhip"></div>&nbsp;Pistol Whip', 2, 8, pow++, 1, 'Potato<br /><br />Potato<br /><br />Deals Crushing damage and briefly Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'They Never Go Easy', 'They Never Go Easy', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Rifle Butt', '<div class="Sprite Munitions_RifleButt"></div>&nbsp;Rifle Butt', 2, 8, pow++, 1, 'Potato<br /><br />Potato<br /><br />Deals single target Crushing damage to the target, briefly stunning them.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Holdout Shot', '<div class="Sprite Munitions_HoldoutShot"></div>&nbsp;Holdout Shot', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged Single Target Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />When you\\\'ve thrown everything at them and they\\\'re still coming Holdout Shot can be your saving grace.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Open Wound'].name, dataPowerAlias['Open Wound'].desc, 2, null, dataPowerAlias["Open Wound"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Trip Wire', '<div class="Sprite Munitions_TripWire"></div>&nbsp;Trip Wire', 2, 8, pow++, 1, 'Munitions, 50 foot Damage and Knock To<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Your target is Knocked to you.<br /><br />Has a 46-100% chance to apply Disorient to your target.  Disoriented targets have their damage reduced by 10% and their movement speed reduced by 15%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Open Wound'].name, dataPowerAlias["Open Wound"].desc, 2, null, dataPowerAlias["Open Wound"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shotgun Blast', '<div class="Sprite Munitions_ShotgunBlast"></div>&nbsp;Shotgun Blast', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Shotgun Blast unloads a powerful blast into any enemies in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Breaching Round', 'Breaching Round', 2, null, '+ 100% chance to knock your primary target back.<br />+ 100% chance to knock secondary targets back if they are affected by Armor Piercing.<br />+ Refreshes all stacks of Furious on you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Mind the Uniform', 'Mind the Uniform', 2, null, 'Applies Fear to all affected targets, reducing their damage for a short time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AP'].name, dataPowerAlias['AP'].desc, 2, null, '+ Applies Armor Piercing to your primary target and has a 20% chance to apply it to secondary targets.<br />+ ' + dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Flamethrower', '<div class="Sprite Munitions_Flamethrower"></div>&nbsp;Flamethrower', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 30 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals fire damage to up affected targets and has a 10% chance to apply Clinging Flames.  ' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Panic', 'Panic', 2, null, '+ 20% chance to stun targets for 2 seconds.<br />+ If the target is affected by Fear, this chance is increased to 100%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Spitfire', 'Spitfire', 2, null, '+ Increases the chance to apply Clinging Flames to 20%.<br />+ If you ar affected by Furious, this chance increases to 100%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bullet Hail', '<div class="Sprite Munitions_BulletHail"></div>&nbsp;Bullet Hail', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage every 0.5 sec to up to 3 targets.<br /><br />+ Has a 20% per hit to apply Furious to you.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aggression', 'Aggression', 2, null, '15% chance per tick per target to apply Bleeding to a non-Bleeding target. 100% chance vs non-Bleeding targets in Melee range.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Assault', 'Assault', 2, null, 'Refreshes the Armor Piercing debuff on your targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Wall of Bullets', 'Wall of Bullets', 3, null, 'Maintaining this power grants you an absorption shield that scales up over time, ending when you stop maintaining the power.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['Extra Bullets'].name, dataPowerAlias['Extra Bullets'].desc, 1, null, dataPowerAlias['Extra Bullets'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Submachinegun Burst', '<div class="Sprite Munitions_SubmachinegunBurst"></div>&nbsp;Submachinegun Burst', 2, 8, pow++, 1, 'Munitions, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage every 0.5 sec to up to 3 targets.<br /><br />+ Has a 20% per hit to apply Furious to you.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aggression', 'Aggression', 2, null, '15% chance per tick per target to apply Bleeding to a non-Bleeding target. 100% chance vs non-Bleeding targets in Melee range.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Assault', 'Assault', 2, null, 'Refreshes the Armor Piercing debuff on your targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Wall of Bullets', 'Wall of Bullets', 3, null, 'Maintaining this power grants you an absorption shield that scales up over time, ending when you stop maintaining the power.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['Extra Bullets'].name, dataPowerAlias['Extra Bullets'].desc, 1, null, dataPowerAlias['Extra Bullets'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Composure', '<div class="Sprite Munitions_Composure"></div>&nbsp;Composure', 2, 8, pow++, 1, 'Munitions Offensive Passive<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />+ Increases the damage of your Technology powers, scaling with your super stats.<br />+ Increases your Dodge and Avoidance rating, scaling with your super stats.<br />+ Increases your Knock resistance, scaling with your super stats.<br />+ Generates energy when you dodge an attack, scaling with your Recovery.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sharp Shooter', '<div class="Sprite Munitions_SharpShooter"></div>&nbsp;Sharp Shooter', 2, 8, pow++, 1, 'Munitions, Form (Dexterity)<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you gain a stack of Furious or deal a critical hit while Furious.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Concentration"].replicate(2, 8);
dataRequireGroupPower[dataPower.length-1] = 'technology';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Killer Instinct', '<div class="Sprite Munitions_KillerInstinct"></div>&nbsp;Killer Instinct', 2, 8, pow++, 1, 'Munitions, Energy Unlock (Recovery)<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />+ Generates energy every time you deal a critical hit with a non-energy-building Munitions power.<br />+ Restores eenrgy every 3 seconds over 6 seconds.<br />+ The energy gained scales with your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Execution Shot', '<div class="Sprite Munitions_ExecutionShot"></div>&nbsp;Execution Shot', 2, 8, pow++, 2, 'Munitions, 10 foot Melee Finisher<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage.  If the target is below 25% health, the damage is doubled.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Is It Not Just Mayhem?', 'Is It Not Just Mayhem?', 2, null, 'Applies Fear to the target, reducing their damage by 10% for 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'I Pay It Gladly', 'I Pay It Gladly', 2, null, '+ If you kill a target with Execution Shot, you gain 3 stacks of Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bullet Ballet', '<div class="Sprite Munitions_BulletBeatdown"></div>&nbsp;Bullet Ballet', 2, 8, pow++, 2, 'Munitions, 10 foot Melee/Ranged Combo<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />This gun kata uses all the resources at your disposal to take care of your enemy.  Tutu not included.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Not Without Incident', 'Not Without Incident', 2, null, '30% (100% while Furious) chance to inflict AoE damage (10ft range, max of 5 targets) around your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mini Mines', '<div class="Sprite Munitions_MiniMines"></div>&nbsp;Mini Mines', 2, 8, pow++, 2, 'Munitions, Placed AoE Melee Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Places several mines that last for 12 seconds.  Targets that get too close suffer Crushing damage and are Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Wall of Fire', 'Wall of Fire', 2, null, 'You now create two sets of Mini Mines, allowing them to cover a larger area, but each set does 40% less damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['SP'].name, dataPowerAlias['SP'].desc, 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Rocket', '<div class="Sprite Munitions_Rocket"></div>&nbsp;Rocket', 2, 8, pow++, 2, 'Munitions, 100 foot Ranged 20 foot Sphere AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Fire and Crushing damage to your primary target and half as much to secondary targets within 20 feet.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Concussive Rocket', 'Concussive Rocket', 2, null, 'Your rockets now Knock Back foes.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Frag Grenade', '<div class="Sprite Munitions_FragGrenade"></div>&nbsp;Frag Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE DoT<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Snares and deals Piercing damage every second for 10 seconds to affected targets.<br /><br />This power cannot critically hit, however its damage scales with both your Critical Chance and Critical Severity..');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cuts and Scrapes', 'Cuts and Scrapes', 2, null, '+ Applies Armor Piercing to your primary target.<br /> +' + dataPowerAlias['AP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias["Open Wound"].name, dataPowerAlias["Open Wound"].desc, 2, null, dataPowerAlias["Open Wound"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Gatling Gun', '<div class="Sprite Munitions_GatlingGun"></div>&nbsp;Gatling Gun', 2, 8, pow++, 2, 'Munitions, 100 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to targets and has a 10% with every hit and 100% on a full maintain to apply Armor Piercing.  ' + dataPowerAlias['AP'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Listen to Reason', 'Listen to Reason', 2, null, '+ 15% chance to apply Fear to target.<br />+ Refreshes all stacks of Furious.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Sheer Force', 'Sheer Force', 2, null, '+ Repels targets away from you.<br />+ Has a chance to Knock Down targets near you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Concussion Grenade', '<div class="Sprite Munitions_ConcussionGrenade"></div>&nbsp;Concussion Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE Damage + Knockback<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to all targets and knocks them back.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Stun Grenade', 'Stun Grenade', 2, null, 'Targets are Stunned instead of Knocked Back.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Incendiary Grenade', '<div class="Sprite Munitions_IncendiaryGrenade"></div>&nbsp;Incendiary Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Deals Fire damage to targets.  The primary target is affected by Clinging Flames, while secondary targets have a 25% chance to be affected.<br /><br />' + dataPowerAlias['CF'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NQ'].name, dataPowerAlias['NQ'].desc, 2, null, dataPowerAlias['NQ'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Smoke Grenade', '<div class="Sprite Munitions_SmokeGrenade"></div>&nbsp;Smoke Grenade', 2, 8, pow++, 2, 'Munitions, 50 foot AoE Threat Wipe and Stealth<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Greatly reduces the perception of affected targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Escape Artist', 'Escape Artist', 2, null, '+ Wipes all threat from affected targets.<br />+ Greatly increases the cooldown of this ability.<br />+ Places you in stealth briefly.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lock N Load', '<div class="Sprite Munitions_LockNLoad"></div>&nbsp;Lock N Load', 2, 8, pow++, 2, 'Munitions, Active Offense<br /><br />Requires 3 powers from Munitions or 4 non-Energy Building powers from any framework.<br /><br />Lock and Load prepares you for the upcoming fight.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Two Smoking Barrels', 'Two Smoking Barrels', 2, null, 'Whenever you hit with a Melee attack, the cooldown on Lock N Load is reduced by 2 seconds. However, your Lock N Load no longer grants bonus damage to your Melee attacks.'));

dataPower[dataPower.length] = new Power(2, 8, 2, "Breakaway Shot", 0.5, 0, 0, 0, 58, 6, "Targets foe (5 max)/50 feet/40 foot lunge/60 degree Cone", "Ranged AoE Damage/Reverse Lunge/Buff", "Lunge away from your target, dealing Piercing damage targets in front of you.  Knocks Down your primary target and has a 25% chance to also Knock Down secondary targets.");
dataPower[dataPower.length-1].insertAdvantage("Microfilament Wire", 2, null, "If used within Melee range of a target, the primary target will be Knocked Towards you and the secondary targets will be knocked down after you land.");
dataPower[dataPower.length-1].insertAdvantage(dataPowerAlias["AP"].name, 2, null, dataPowerAlias["AP"].tip);
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(2, 8, 2, "Parting Shot", 0.67, 0, 0, 0, 45, 6, "Targets foe/50 feet/40 foot lunge/60 degree Cone", "Ranged Damage/Reverse Lunge/Knock Back", "Lunge away from your target, dealing Piercing damage to them and Knocking them back.");
dataPower[dataPower.length-1].insertAdvantage("Predictable", 2, null, "+ Wipes all threat from your primary target.<br />+ Places you in Stealth briefly.<br />+ Increases the cooldown of Parting Shot to 45 seconds.");
dataPower[dataPower.length-1].insertAdvantage(dataPowerAlias["AP"].name, 2, null, dataPowerAlias["AP"].tip);
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Assault Rifle', '<div class="Sprite Munitions_AssaultRifle"></div>&nbsp;Assault Rifle', 2, 8, pow++, 3, 'Munitions, 100 foot Ranged Single Target Damage<br /><br />Requires 1 power from Munitions or 2 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mow \'em Down', 'Mow \'em Down', 2, null, 'Assault Rifle becomes an AoE power capable of hitting up to 3 targets in a 2 foot cylinder.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Uncompromising', 'Uncompromising', 2, null, 'Deals 10% additional base damage for every stack of Furious you have.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Two-Gun Mojo', '<div class="Sprite Munitions_TwoGunMojo"></div>&nbsp;Two-Gun Mojo', 2, 8, pow++, 3, 'Munitions, 50 foot Ranged Single Target Damage and Buff<br /><br />Deals Piercing damage and has a 15% chance per hit to apply Furious.<br /><br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Close the Gap', 'Close the Gap', 2, null, 'Two-Gun Mojo deals increased damage if you are closer to your target.  This bonus caps out at 30% in melee range.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Bullet Spray', 'Bullet Spray', 2, null, 'Two-Gun Mojo becomes an AoE power capable of hitting up to 3 targets in a 2 foot cylinder.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sniper Rifle', '<div class="Sprite Munitions_SniperRifle"></div>&nbsp;Sniper Rifle', 2, 8, pow++, 3, 'Munitions, 120 foot Ranged Damage and Stun<br /><br />Requires 5 powers from Munitions or 6 non-Energy Building powers from any framework.<br /><br />The pinpoint accuracy of the Sniper Rifle is the culmination of years of marksmanship training. This rifle attack must be completely charged to fire. It does heavy damage to the target and has a chance to Stun. Purchasing additional ranks of this power increases the chance to Stun and the amount of damage done.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Tungsten Rounds', 'Tungsten Rounds', 2, null, 'Allows your Sniper Rifle shots to hit up to 3 targets in a line.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lead Tempest', '<div class="Sprite Munitions_LeadTempest"></div>&nbsp;Lead Tempest', 2, 8, pow++, 3, 'Munitions, 50 foot Sphere PBAoE Ranged Damage<br /><br />Requires 5 powers from Munitions or 6 non-Energy Building powers from any framework.<br /><br />Deals Piercing damage to enemies.  Has a 10% chance to miss enemies within 30 feet of you and a 25% chance to miss enemies further than 30 feet.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Tread Softly', 'Tread Softly', 2, null, 'Grants a significant bonus to Dodge and Avoidance while maintained. This bonus is doubled if you are currently Concentrated.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Maybe I\'m Just Better', 'Maybe I\'m Just Better', 2, null, '+ Lead Tempest now has a chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = dataPowerAlias["Implosion Engine"].replicate(2, 8);
dataPower[dataPower.length] = dataPowerAlias["Mechanical Monstrosity"].replicate(2, 8);
dataPower[dataPower.length] = dataPowerAlias["Fire All Weapons"].replicate(2, 8);
dataPower[dataPower.length] = dataPowerAlias["Meltdown"].replicate(2, 8);
dataPower[dataPower.length] = dataPowerAlias["Showdown"].replicate(2, 8);

//------------------------------------------------------------------------------
// Power Framework: Power Armor
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(9);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wrist Bolter', '<div class="Sprite PowerArmor_WristBolter"></div>&nbsp;Wrist Bolter', 2, 9, pow++, -1, 'Power Armor, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Wrist Bolter uses wrist mounted Particle cannons to rain destruction down on your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Automated Assault', 'Automated Assault', 1, null, 'Changes the Wrist Bolter to function as a hand slot. Wrist Bolter does not generate Energy while other powers are in use.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Power Bolts', '<div class="Sprite PowerArmor_PowerBolts"></div>&nbsp;Power Bolts', 2, 9, pow++, -1, 'Power Armor, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Power Bolts fires pure Kinetic Energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'It Burns', 'It Burns', 2, null, 'All Power Bolts attacks now have a chance to apply Plasma Burn instead of just the opening attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Power Gauntlet', '<div class="Sprite PowerArmor_PowerGauntlet"></div>&nbsp;Power Gauntlet', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage (Blast)<br /><br />Power Gauntlet uses your gloves as a point to focus Particle energy before using it to blast away any foes in your path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Downrange Disaster', 'Downrange Disaster', 2, null, 'Causes Power Gauntlet to deal less damage when you are close to the target and more damage the further you are from the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Tactical Missiles', '<div class="Sprite PowerArmor_TacticalMissiles"></div>&nbsp;Tactical Missiles', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage (Blast)<br /><br />Tactical Missiles fire from your wrist to obliterate your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Blast Radius', 'Blast Radius', 2, null, 'Tactical Missiles now deals its base damage in a 10 foot radius.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Concussor Beam', '<div class="Sprite PowerArmor_ConcussorBeam"></div>&nbsp;Concussor Beam', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage and Repel<br /><br />Hand Slot<br /><br />Deals Particle damage and Repels targets up to 45 feet.  The strength of this Repel increases with each pulse.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Frenetic Blast', 'Frenetic Blast', 2, null, 'Reduces the movement speed of the target of Concussor Beam for the maintained time of the power.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dual Wrist Rocket Barrage', '<div class="Sprite PowerArmor_DualWristRocketBarrage"></div>&nbsp;Dual Wrist Rocket Barrage', 2, 9, pow++, 0, 'Power Armor, 100 foot Ranged Single Target Damage and Repel<br /><br />Hand Slot<br /><br />Deals Crushing damage and Repels targets up to 45 feet.  The strength of this Repel increases with each pulse.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Frenetic Blast', 'Frenetic Blast', 2, null, 'Reduces the movement speed of the target of Concussor Beam for the maintained time of the power.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Eye Beam', '<div class="Sprite PowerArmor_EyeBeam"></div>&nbsp;Eye Beam', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 2 foot cyllinder AoE Damage<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />Deals Particle damage to all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, '20/20 Fission', '20/20 Fission', 2, null, '+ Maintaining this power for at least half of its duration applies Burn Through.<br />' + dataPowerAlias['Burn Through'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mini Gun', '<div class="Sprite PowerArmor_MiniGun"></div>&nbsp;Mini Gun', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 2 foot cyllinder AoE Damage<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />Deals Crushing damage to all targets in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'U-238 Rounds', 'U-238 Rounds', 2, null, '+ Maintaining this power for at least half of its duration applies Burn Through.<br />' + dataPowerAlias['Burn Through'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Infrared Guidance System', 'Infrared Guidance System', 1, null, 'Increases the radius of this power to 5 feet.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Rocket Punch', '<div class="Sprite PowerArmor_RocketPunch"></div>&nbsp;Rocket Punch', 2, 9, pow++, 1, 'Power Armor, 100 foot Ranged 10 foot Sphere AoE Damage - Blast<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to targets.  Has a 12-50% (based on charge time) chance to Knock Back targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Grasping Hand', 'Grasping Hand', 2, null, 'Rocket Punch now Roots targets instead of knocking them back.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Targeting Computer', '<div class="Sprite PowerArmor_TargetingComputer"></div>&nbsp;Targeting Computer', 2, 9, pow++, 1, 'Power Armor, Offensive Passive - Energy Form<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />+ Increaes your ranged Technology damage.<br />+ After 3 seconds, foes damaged by ranged Technology powers give you 5% critical chance, 10% critical severity, and a smalla mount of damage resistance against them.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Invulnerability', '<div class="Sprite PowerArmor_Invulnerability"></div>&nbsp;Invulnerability', 2, 9, pow++, 1, 'Power Armor, Defensive Passive<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Grants you a combination of percent-based and flat damage reduction.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aspect of the Machine', '<div class="Sprite PowerArmor_AspectOfTheMachine"></div>&nbsp;Aspect of the Machine', 2, 9, pow++, 1, 'Power Armor, Form (Strength or Ego)<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged and melee damage.<br /><br />+ You gain a stack each time you kill something.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 5 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.<br />- Killing targets to generate stacks may not always be practical, so investing in ranks is recommended.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Concentration"].replicate(2, 9);
dataRequireGroupPower[dataPower.length-1] = 'technology';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Energy Shield', '<div class="Sprite PowerArmor_EnergyShield"></div>&nbsp;Energy Shield', 2, 9, pow++, 1, 'Power Armor, Block<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 270% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Laser Knight', 'Laser Knight', 3, null, 'If you have the Energy Shield power slotted, this advantage will cause it to activate when you make a Melee attack, increasing your defense for a few seconds, but slightly lowering the attack\\\'s damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Phalanx Defense System', 'Phalanx Defense System', 3, null, 'If you have the Energy Shield power slotted, this advantage will cause it to activate when you make a Power Armor Slot (Chest, Hand, or Shoulder) attack, increasing your defense for a few seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Overdrive', '<div class="Sprite PowerArmor_Overdrive"></div>&nbsp;Overdrive', 2, 9, pow++, 1, 'Power Armor, Energy Unlock (Recovery, <i>Endurance</i>)<br /><br />Requires 1 power from Power Armor or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every 3 seconds over 9 seconds every time you use a toggle or maintain power for at least half of its duration.<br />+ This effect stacks up to 3 times.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Micro Munitions', '<div class="Sprite PowerArmor_MicroMunitions"></div>&nbsp;Micro Munitions', 2, 9, pow++, 2, 'Power Armor, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Deals Crushing damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Alpha Strike', 'Alpha Strike', 2, null, '+ Damage is increased when attacking fewer targets.<br />+ The maximum bonus is applied against 1 target, but attacking 5 targets offers no bonus at all.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Chest Beam', '<div class="Sprite PowerArmor_ChestBeam"></div>&nbsp;Chest Beam', 2, 9, pow++, 2, 'Power Armor, 50 foot Ranged 2 foot Cylinder AoE Damage and Debuff<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Particle damage to targets.  In addition, targets are Knocked Back and are affected by Burn Through.<br />' + dataPowerAlias['Burn Through'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Point Blank Blast', 'Point Blank Blast', 2, null, 'Deals increased damage to targets the closer they are to you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Chest Laser', '<div class="Sprite PowerArmor_ChestLaser"></div>&nbsp;Chest Laser', 2, 9, pow++, 2, 'Power Armor, 100 foot Ranged 2 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Deals Particle damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Melta Cannon'].name, dataPowerAlias['Melta Cannon'].desc, 2, null, dataPowerAlias['Melta Cannon'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Plasma Beam', '<div class="Sprite PowerArmor_PlasmaBeam"></div>&nbsp;Plasma Beam', 2, 9, pow++, 2, 'Power Armor, 50 foot Ranged 3 foot Cylinder AoE Damage<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Hand Slot<br /><br />Deals Particle damage to all targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Melta Cannon'].name, dataPowerAlias['Melta Cannon'].desc, 2, null, dataPowerAlias['Melta Cannon'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Binding Shot', '<div class="Sprite Gadgeteering_TanglecoilLauncher"></div>&nbsp;Binding Shot', 2, 9, pow++, 2, 'Power Armor, 50 foot Single Target Hold<br /><br />Requires 3 powers from Power Armor or 4 non-Energy Building powers from any framework.<br /><br />Deals Crushing damage to the target and Paralyzes them.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(2, 9, 2, "Unbreakable", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Defense", "Absorbs a fair amount of damage.  Each attack against you restores a portion of the absorption, but each time you deal damage, the amount restored is reduced slightly." + dataPowerAlias["ADCD"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Better You Than Me', 'Better You Than Me', 2, null, 'Attacks against you while you have Unbreakable active have a chance to grant 1 stack of the Enrage Buff, and to refresh all instances of that Buff on yourself. This can happen at most once every 3 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Energy Wave', '<div class="Sprite PowerArmor_EnergyWave"></div>&nbsp;Energy Wave', 2, 9, pow++, 3, 'Power Armor, 25 foot Sphere PBAoE Ranged Damage - Repel - Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to all nearby targets and repels them.  If charged for at least 50%, each target is also Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Hardened Particle Matrix', 'Hardened Particle Matrix', 3, null, 'Your Energy Wave attack will redirect the enrgy around you into a short duration Shield which absorbs damage based on the number of targets caught in your blast.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Reverse Polarity', 'Reverse Polarity', 2, null, 'Energy Wave will now Knock Towards you instead of away from you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shoulder Launcher', '<div class="Sprite PowerArmor_ShoulderLauncher"></div>&nbsp;Shoulder Launcher', 2, 9, pow++, 3, 'Power Armor, 100 foot Ranged 10 foot Sphere AoE Damage and Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Shoulder Slot<br /><br />After 4 seconds, deals Crushing and Particle damage the target and half of that to all foes near the target.  Each target has a 20% chance of being Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bunker Buster', 'Bunker Buster', 2, null, 'Shoulder Launcher deals additional damage to targets using Block.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Hand Cannon', '<div class="Sprite PowerArmor_HandCannon"></div>&nbsp;Hand Cannon', 2, 9, pow++, 3, 'Power Armor, 100 foot Ranged 2 foot Cylinder AoE Damage and Knock Back<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Hand Slot<br /><br />After 4 seconds, deals Particle damage the target and half of that to all foes near the target.  Each target has a 20% chance of being Knocked Back.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Reconstruction Circuits', '<div class="Sprite PowerArmor_ReconstructionCircuits"></div>&nbsp;Reconstruction Circuits', 2, 9, pow++, 3, 'Power Armor, Self Heal Over Time<br /><br />Requires 5 powers from Power Armor or 6 non-Energy Building powers from any framework.<br /><br />Chest Slot<br /><br />Heals you as long as it is toggled on.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Implosion Engine"].replicate(2, 9);
dataPower[dataPower.length] = dataPowerAlias["Mechanical Monstrosity"].replicate(2, 9);
dataPower[dataPower.length] = dataPowerAlias["Fire All Weapons"].replicate(2, 9);
dataPower[dataPower.length] = dataPowerAlias["Meltdown"].replicate(2, 9);
dataPower[dataPower.length] = dataPowerAlias["Showdown"].replicate(2, 9);

//------------------------------------------------------------------------------
// Power Framework: Laser Sword
//------------------------------------------------------------------------------

dataRequireGroup['technology'].push(10);

var pow = 0;

dataPowerAlias['Download'] = PowerAlias.legacyConstructor('Download', 'Download', 'Download', 'Applies Download to you, reducing the cost of all Technology powers by 20% for 8 seconds.');
dataPowerAlias['Plasma Burn'] = PowerAlias.legacyConstructor('Plasma Burn', 'Plasma Burn', 'Plasma Burn', '+ Plasma Burn is a type of Radiation that deals Particle damage every second for 16 seconds.');
dataPowerAlias['Burn Bright'] = PowerAlias.legacyConstructor('Burn Bright', 'Burn Bright', 'Burn Bright', 'Adds 10 seconds to the duration of your Plasma Burn stacks.  This cannot increase their duration above the initial value.');
dataPowerAlias['Radiate'] = PowerAlias.legacyConstructor('Radiate', 'Radiate', 'Radiate', '+ Has a 25% chance to apply a stack of Plasma Burn to the target every 2 seconds for 10 seconds.' + dataPowerAlias['Plasma Burn'].tip);

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Laser Edge', '<div class="Sprite LaserSword_LaserEdge"></div>&nbsp;Laser Edge', 2, 10, pow++, -1, 'Laser Sword, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Laser Edge uses your laser sword to rapidly slice apart your enemies.  The first hit has a chance to apply Plasma Burn.' + dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'It Burns', 'It Burns', 2, null, 'All Laser Edge attacks now have a chance to apply Plasma Burn instead of just the opening attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lightspeed Strike', '<div class="Sprite LaserSword_LightspeedStrike"></div>&nbsp;Lightspeed Strike', 2, 10, pow++, 0, 'Power Armor, 10 foot Frontal Arc Damage (Combo)<br /><br />Deals Particle damage to foes within a 120/120/30 degree arc with a 15/15/50% chance to apply Plasma Burn.<br />' + dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Particle Acceleration', 'Particle Acceleration', 2, null, '+ Finishing the Lightspeed Strike combo applies Disintegrate.<br />+Disintegrate increases the Particle and Energy damage affected foes take for a short while.<br />+ Disintegrate is a type of Radiation'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Legacy Code', 'Legacy Code', 2, null, 'Finishing the Lightspeed Strike combo Knocks Down your foes.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Glance', '<div class="Sprite LaserSword_Glance"></div>&nbsp;Glance', 2, 10, pow++, 1, 'Laser Sword, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Particle damage and briefly Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lightwave Slash', '<div class="Sprite LaserSword_LightwaveSlash"></div>&nbsp;Lightwave Slash', 2, 10, pow++, 1, 'Laser Sword, 10 foot Sphere PBAoE Damage<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals particle damage to all targets within 10 feet of you.  On a full charge, affected targets Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Light Mend', 'Light Mend', 2, null, 'Adds 10 seconds to the duration of your Disintegrate effect.  This cannot increase its duration above the initial value.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Burn Bright'].name, dataPowerAlias['Burn Bright'].desc, 2, null, dataPowerAlias['Burn Bright'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Cybernetic Tether', '<div class="Sprite LaserSword_CyberneticTether"></div>&nbsp;Cybernetic Tether', 2, 10, pow++, 1, 'Laser Sword, Melee Damage - Knock To - Plasma Burn<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Deals Particle damage and knocks your target to you.  Has a 46-100% (based on charge) chance to apply Plasma Burn to the target.' + dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Recharge', 'Recharge', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Burn Bright'].name, dataPowerAlias['Burn Bright'].desc, 2, null, dataPowerAlias['Burn Bright'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['Radiate'].name, dataPowerAlias['Radiate'].desc, 2, null, dataPowerAlias['Radiate'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lightspeed Dash', '<div class="Sprite LaserSword_LightspeedDash"></div>&nbsp;Lightspeed Dash', 2, 10, pow++, 1, 'Laser Sword, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Particle damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 17 seconds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Quantum Stabilizer', '<div class="Sprite LaserSword_QuantumStabilizer"></div>&nbsp;Quantum Stabilizer', 2, 10, pow++, 1, 'Laser Sword, Offensive Passive<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Energy Damage strength, scaling with your Super Stats.<br />+ Increases your resistance to All damage by a small amount and your resistance to Particle damage by a larger amount, scaling with your Super Stats.<br />+ You gain energy over 3 seconds when you take Energy damage, scaling with your Recovery.<br />+ Increases your Knock resistance slightly, scaling with Super Stats.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Particle Accelerator', '<div class="Sprite LaserSword_ParticleAccelerator"></div>&nbsp;Particle Accelerator', 2, 10, pow++, 1, 'Laser Sword, Form (Intelligence)<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Radiation effect.<br />+ Radiation effects include Plasma Burn, Disintegrate, Burn Through, and Overheat.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Concentration"].replicate(2, 10);
dataRequireGroupPower[dataPower.length-1] = 'technology';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Laser Deflection', '<div class="Sprite LaserSword_LaserDeflection"></div>&nbsp;Laser Deflection', 2, 10, pow++, 1, 'Laser Sword, Block<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ For 2 seconds after you begin blocking, you return a portion of one incoming attack to the attacker.  This effect can only activate once every 5 seconds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Data Conversion', 'Data Conversion', 3, null, '+ When you use a melee attack, you gain Data Conversion for 2 seconds.<br />+ Data Conversion gives you 33% resistance to all damage, 33% resistance to Knock effects, and reduces your damage by 10%.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Unified Theory', '<div class="Sprite LaserSword_UnifiedTheory"></div>&nbsp;Unified Theory', 2, 10, pow++, 1, 'Laser Sword, Energy Unlock (Endurance, <i>Recovery</i>)<br /><br />Requires 1 power from Laser Sword or 2 non-Energy Building powers from any framework.<br /><br />+ does not need to be slotted in Order to function.<br />+ Generates Energy every 3 seconds for 6 seconds whenever you apply a Radiation effect.  This effect does not stack, but can be refreshed.<br />+ Radiation effects include Plasma Burn, Burn Through, overheat, and Disintegrate.<br />+ scales with you Endurance and, to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Plasma Cutter', '<div class="Sprite LaserSword_PlasmaCutter"></div>&nbsp;Plasma Cutter', 2, 10, pow++, 2, 'Laser Sword, 10 foot Melee Single Target Damage<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to the target and consumes all of their Plasma Burn stacks.  After 6 seconds, applies Overheat which deals Particle Damage in a 10 foot radius.  Overheat\\\'s damage is increased by the number of stacks consumed.  during this time, you cannot apply stacks of Plasma Burn.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Encryption', 'Encryption', 2, null, 'Fully charging this power Roots the target for 13 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Download'].name, dataPowerAlias['Download'].desc, 2, null, dataPowerAlias['Download'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Particle Smash', '<div class="Sprite LaserSword_ParticleSmash"></div>&nbsp;Particle Smash', 2, 10, pow++, 2, 'Laser Sword, 25 foot Melee 15 foot Sphere AoE Damage<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to the target and nearby foes.  Targets affected by Plasma Burn are affected by Disintegrate, reducing their resistance to Particle damage by -12% and resistance to Energy damage by -6%, Lasting 16 seconds.<br /><br />Consumes all stacks of Plasma Burn, dealing additional Particle damage for every stack consumed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Null Value', 'Null value', 2, null, 'Particle Smash now Stuns your main target and Knocks Down secondary targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Particle Wave', '<div class="Sprite LaserSword_ParticleWave"></div>&nbsp;Particle Wave', 2, 10, pow++, 2, 'Laser Sword, 50 foot Ranged 60 degree Cone AoE Knock To - Plasma Burn<br /><br />Requires 3 powers from Laser Sword or 4 non-Energy Building powers from any framework.<br /><br />Deals Particle damage and knocks all affected targets toward you and applies a stack of Plasma Burn if they aren\\\'t already affected by it.<br />' + dataPowerAlias['Plasma Burn'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Illuminate', 'Illuminate', 2, null, dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Bad Footing', 'Bad Footing', 2, null, 'Disorients your targets.  Disoriented targets have reduced damage and movement speed.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Luminescent Slash', '<div class="Sprite LaserSword_LuminescentSlash"></div>&nbsp;Luminescent Slash', 2, 10, pow++, 3, 'Laser Sword, Melee Single Target Damage<br /><br />Requires 5 powers from Laser Sword or 6 non-Energy Building powers from any framework.<br /><br />Deals Particle damage to your target.  On a full charge, your target is Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'End of the Line', 'End of the Line', 2, null, '+ If your energy is above 90%, Luminescent Slash deals 35% additional damage.<br />+ If your energy is above 70%, Luminescent Slash deals 30% additional damage.<br />+ These bonuses do not stack with each other.<br />+ Fully charging this power refreshes your Download effect.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Radiate'].name, dataPowerAlias['Radiate'].desc, 2, null, dataPowerAlias['Radiate'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Implosion Engine"].replicate(2, 10);
dataPower[dataPower.length] = dataPowerAlias["Mechanical Monstrosity"].replicate(2, 10);
dataPower[dataPower.length] = dataPowerAlias["Fire All Weapons"].replicate(2, 10);
dataPower[dataPower.length] = dataPowerAlias["Meltdown"].replicate(2, 10);
dataPower[dataPower.length] = dataPowerAlias["Showdown"].replicate(2, 10);

//------------------------------------------------------------------------------
// Power Set: Martial Arts
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'] = [];

dataPowerAlias['Fury of the Dragon'] = PowerAlias.legacyConstructor('Fury of the Dragon', 'Fury of the Dragon', '<div class="Sprite MartialArts_FuryOfTheDragon"></div>&nbsp;Fury of the Dragon', 'Martial Arts, 25 foot Melee 60 degree Cone AoE Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />Fury of the Dragon causes a chaotic attack of claws and fire, dealing damage to nearby foes.<br /><br />MAINTAINED<br />+ Deals Slashing and Fire damage to targets in front of you.<br />+ The damage dealt by this power is considered melee damage for effects such as the Brawler Role. Note that the damage is not modified by Strength, however.<br />+ If you are affected by Focus, this attack also Snares your foes.<br />+ Deals additional damage for each stack of Focus you have.<br />+ You are immune to Control effects while channeling this power.');
dataPowerAlias['Vorpal Blade'] = PowerAlias.legacyConstructor('Vorpal Blade', 'Vorpal Blade', '<div class="Sprite MartialArts_VorpalBlade"></div>&nbsp;Vorpal Blade', 'Martial Arts, 25 foot Melee 60 degree Cone AoE Damage<br /><br />Requires level 35<br />You may only own 1 Ultimate Power<br /><br />+ AoE Slashing damage.<br />+ Hits multiple times, each strike inflicting Bleed on foes over time.<br />+ Damage is increased by the number of Focus stacks you have.' + PowerUnlocksFrom("Mayhem Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL));
dataPowerAlias['Real Ultimate Power'] = PowerAlias.legacyConstructor('Real Ultimate Power', 'Real Ultimate Power', 'Real Ultimate Power', "");
dataPowerAlias['Shuriken Throw'] = PowerAlias.legacyConstructor('Shuriken Throw', 'Shuriken Throw', '<div class="Sprite MartialArts_ShurikenThrow"></div>&nbsp;Shuriken Throw', 'Martial Arts, 100 foot Ranged Single Target Damage and Knock Down<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Shuriken Throw allows you to throw shuriken with deadly precision.');
dataPowerAlias['Chained Kunai'] = PowerAlias.legacyConstructor('Chained Kunai', 'Chained Kunai', '<div class="Sprite MartialArts_ChainedKunai"></div>&nbsp;Chained Kunai', '+ Single target Slashing damage.<br />+ Knocks the target toward you.<br />+ Has a 28%-100% (based on charge) chance to apply Bleed to your target.');
dataPowerAlias['Inexorable Tides'] = PowerAlias.legacyConstructor('Inexorable Tides', 'Inexorable Tides', '<div class="Sprite MartialArts_InexorableTides"></div>&nbsp;Inexorable Tides', 'Martial Arts, 10 foot Melee 120 degree Cone AoE Damage and Knock Up<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />A powerful kick at the legs of your opponents, Knocking them into the air.');
dataPowerAlias['Instep Crush'] = PowerAlias.legacyConstructor('Instep Crush', 'Instep Crush', 'Instep Crush', 'Adds a Root to the primary target of your Inexorable Tides strikes.');
dataPowerAlias['Smoke Bomb'] = PowerAlias.legacyConstructor('Smoke Bomb', 'Smoke Bomb', '<div class="Sprite MartialArts_SmokeBomb"></div>&nbsp;Smoke Bomb', 'Martial Arts, 150 foot Sphere PBAoE Threat Wipe and temporary Stealth<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Smoke Bomb drops a cloud of obscuring smoke at your feet allowing you to execute a strategic retreat when necessary.');
dataPowerAlias['Concussive Escape'] = PowerAlias.legacyConstructor('Concussive Escape', 'Concussive Escape', 'Concussive Escape', 'Smoke Bomb Knocks Down affected targets within 15 feet of where the Smoke Bomb lands.');
dataPowerAlias['Lightning Reflexes'] = PowerAlias.legacyConstructor('Lightning Reflexes', 'Lightning Reflexes', '<div class="Sprite MartialArts_LightningReflexes"></div>&nbsp;Lightning Reflexes', 'Martial Arts, Defensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increaes your Dodge and Avoidance.<br />+ When hit, your Dodge increases slightly each time until you dodge, resetting the bonus.<br />+ Greatly increaes your resistance to damage over time effects.');
dataPowerAlias['Way of the Warrior'] = PowerAlias.legacyConstructor('Way of the Warrior', 'Way of the Warrior', '<div class="Sprite MartialArts_WayOfTheWarrior"></div>&nbsp;Way of the Warrior', 'Martial Arts, Offensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your melee and Bleed damage, plus your other damage by a lesser amount.<br />+ Increases Dodge and Avoidance ratings.<br />+ Recovers Energy when an enemy dodges one of your attacks.  This amount scales with your Recovery.');
dataPowerAlias['Intensity'] = PowerAlias.legacyConstructor('Intensity', 'Intensity', '<div class="Sprite MartialArts_Intensity"></div>&nbsp;Intensity', 'Martial Arts, Active Offense<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You focus all of your attention on the upcoming battle, harnessing your inner strength to bolster your abilities.');
dataPowerAlias['Night Warrior'] = PowerAlias.legacyConstructor('Night Warrior', 'Night Warrior', '<div class="Sprite MartialArts_Sneak"></div>&nbsp;Night Warrior', 'Martial Arts, Slotted Offensive Passive<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your damage from all sources.<br />+ Bypasses a portion of enemy damage resistance.<br />+ Increases power Charge Speed, Dodge, and Avoidance.<br />+ Unlocks the Sneak power which allows you to move around in stealth.  Some powers deal additional damage when used from Stealth.');
dataPowerAlias['Silent Running'] = PowerAlias.legacyConstructor('Silent Running', 'Silent Running', 'Silent Running', 'Increases your movement speed while sneaking.');
dataPowerAlias['Parry'] = PowerAlias.legacyConstructor('Parry', 'Parry', '<div class="Sprite MartialArts_Parry"></div>&nbsp;Parry', 'Martial Arts, Block<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ For 2 seconds after blocking, you will return a portion of one incoming attack back to the attacker.  This effect can only be activated once every 5 seconds.');
dataPowerAlias['The Elusive Monk'] = PowerAlias.legacyConstructor('The Elusive Monk', 'The Elusive Monk', 'The Elusive Monk', 'If you have the Parry power slotted, this advantage will cause it to activate when you make a Melee attack, increasing your Dodge Rating, Avoidance Rating, and Knock Resistance for a few seconds, but slightly lowering the attack\\\'s damage.');
dataPowerAlias['Fluidity'] = PowerAlias.legacyConstructor('Fluidity', 'Fluidity', '<div class="Sprite MartialArts_Fluidity"></div>&nbsp;Fluidity', 'Martial Arts, Block<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Grants 20% Dodge and +300 Avoidance while blocking, your resistance to Knocks and Stuns is increased, and your movement speed is decreased.');
dataPowerAlias['Flowing Like the River'] = PowerAlias.legacyConstructor('Flowing Like the River', 'Flowing Like the River', 'Flowing Like the River', 'If you maintain Fluidity for at least 2 seconds, its bonuses will decay over 10 seconds after you stop maintaining it.');
dataPowerAlias['Thunderbolt Lunge'] = PowerAlias.legacyConstructor('Thunderbolt Lunge', 'Thunderbolt Lunge', '<div class="Sprite MartialArts_ThunderboltLunge"></div>&nbsp;Thunderbolt Lunge', 'Martial Arts, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 17 seconds.');
dataPowerAlias['Essence Assault'] = PowerAlias.legacyConstructor('Essence Assault', 'Essence Assault', 'Essence Assault', 'Thunderbolt Lunge will also Stun your target for a few seconds if you lunge more than 20 feet and they aren\\\'t already controlled.');
dataPowerAlias['Smoke Bomb Lunge'] = PowerAlias.legacyConstructor('Smoke Bomb Lunge', 'Smoke Bomb Lunge', '<div class="Sprite MartialArts_SmokeBomb"></div>&nbsp;Smoke Bomb Lunge', 'Martial Arts, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Stunned briefly.');
dataPowerAlias['Strike Down'] = PowerAlias.legacyConstructor('Strike Down', 'Strike Down', '<div class="Sprite DualBlades_StrikeDown"></div>&nbsp;Strike Down', 'Martial Arts, 60 foot Lunge, Snare, and Knock Down<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Slashing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Knocked Down if they aren\\\'t already under a control effect.');
dataPowerAlias['Cut Down'] = PowerAlias.legacyConstructor('Cut Down', 'Cut Down', '<div class="Sprite SingleBlade_CutDown"></div>&nbsp;Cut Down', 'Martial Arts, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Slashing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 17 seconds.');
dataPowerAlias['Sudden Strike'] = PowerAlias.legacyConstructor('Sudden Strike', 'Sudden Strike', 'Sudden Strike', 'If you lunge from more than 50 feet away your next single target Melee Critical has 15% more severity.');
dataPowerAlias['Rising Knee'] = PowerAlias.legacyConstructor('Rising Knee', 'Rising Knee', '<div class="Sprite MartialArts_RisingKnee"></div>&nbsp;Rising Knee', 'Martial Arts, 10 foot Melee Single Target Damage and Knock Down<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />You quickly bring your knee up, slamming your target hard.');
dataPowerAlias['Flowing Strikes'] = PowerAlias.legacyConstructor('Flowing Strikes', 'Flowing Strikes', 'Flowing Strikes', 'Your mastery of unarmed combat allows you to make more effective blows as part of a combo, reducing the target\\\'s Damage Resistance to your next 2 non-energy building Melee Crushing attacks.');
dataPowerAlias['Bountiful Chi Resurgence'] = PowerAlias.legacyConstructor('Bountiful Chi Resurgence', 'Bountiful Chi Resurgence', '<div class="Sprite MartialArts_BountifulChiResurgence"></div>&nbsp;Bountiful Chi Resurgence', 'Martial Arts, Self HoT and Debuff<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />Bountiful Chi Resurgence focuses your Chi into healing energy to help you recover from battle.');
dataPowerAlias['Resurgent Reiki'] = PowerAlias.legacyConstructor('Resurgent Reiki', 'Resurgent Reiki', 'Resurgent Reiki', 'You gain additional ticks of healing whenever you Dodge an attack while Bountiful Chi Resurgence is active. This effect can only occur once every 0.5 seconds.');
dataPowerAlias['Masterful Dodge'] = PowerAlias.legacyConstructor('Masterful Dodge', 'Masterful Dodge', '<div class="Sprite MartialArts_MasterfulDodge"></div>&nbsp;Masterful Dodge', 'Martial Arts, Active Defense<br /><br />Requires 3 powers from Martial Arts or 4 non-Energy Building powers from any framework.<br /><br />In moments of need you are able to focus your attention on avoiding the attacks of your foes.');
dataPowerAlias['Unfettered Strikes'] = PowerAlias.legacyConstructor('Unfettered Strikes', 'Unfettered Strikes', 'Unfettered Strikes', 'Each time you Dodge an attack while Masterful Dodge is active, you gain an Opportunity Strike Buff, increasing your damage for a short time.');
dataPowerAlias['Shuriken Storm'] = PowerAlias.legacyConstructor('Shuriken Storm', 'Shuriken Storm', '<div class="Sprite MartialArts_ShurikenStorm"></div>&nbsp;Shuriken Storm', 'Martial Arts, 30 foot Sphere PBAoE Ranged Damage<br /><br />Requires 5 powers from Martial Arts or 6 non-Energy Building powers from any framework.<br /><br />You unleash a hail of shuriken all around you, attempting to hit as many targets as you can.');
dataPowerAlias['Floating Butterfly'] = PowerAlias.legacyConstructor('Floating Butterfly', 'Floating Butterfly', 'Floating Butterfly', 'Your rapid movements while maintaining this power make you difficult to land a blow on, granting you a bonus to Dodge and Avoidance.');
dataPowerAlias['Strong Arm'] = PowerAlias.legacyConstructor('Strong Arm', 'Strong Arm', 'Strong Arm', 'Causes this power to gain bonus damage from your Strength, instead of your Ego.');
dataPowerAlias['Steadfast'] = PowerAlias.legacyConstructor('Steadfast', 'Steadfast', '<div class="Sprite MartialArts_Steadfast"></div>&nbsp;Steadfast', 'Martial Arts, Energy Unlock (Dexterity, <i>Recovery</i>)<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you land a critical hit with a non-energy-building Martial Arts power.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Dexterity, and to a lesser degree, your Recovery.');
dataPowerAlias['Relentless'] = PowerAlias.legacyConstructor('Relentless', 'Relentless', '<div class="Sprite MartialArts_Relentless"></div>&nbsp;Relentless', 'Martial Arts, Energy Unlock (Recovery, <i>Endurance</i>)<br /><br />Requires 1 power from Martial Arts or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you land a critical hit against a target you have Wounded.<br />+ Some Wound effects are Bleed, Shredded, Open Wound, and Deep Wound.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.');
dataPowerAlias["Rush"] = PowerAlias.textOnly("Rush", "Rush reduces your melee energy costs by 15% and grants you energy over time, scaling with your Dexterity.  Rush lasts for 1 second for every stack of Focus you have.");

//------------------------------------------------------------------------------
// Power Framework: Dual Blades
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(11);

var pow = 0;

dataPower[dataPower.length] = new Power(3, 11, -1, "Rain of Steel", [0.47,0.47,0.34,0.47], 0, 0, 0, 0, 0, "Targets Foe/10 feet/120 degree Cone", "Energy Builder - Melee AoE Damage", "Deals Slashing damage (based on number of targets) and generates energy.", Power.TYPE_ENERGY_BUILDER, false, true);
dataPower[dataPower.length-1].insertAdvantage("Grinning Ghost", 2, null, "Each attack gains a 10% chance to apply Focus.<br />+ If using a Martial Arts form, you gain an additional stack of Focus.<br />+ If not using a Martial Arts form, you can only gain a stack of Focus if not already affected by it.");
dataPower[dataPower.length-1].insertStockAdvantages("AM");

dataPower[dataPower.length] = new Power(3, 11, 0, "Blade Tempest", [0.67,0.67,0.83], 0, 0, 0, [25,22,20], 0, "Targets Foe/10 feet/200 degree Cone", "Melee AoE Damage/Combo/Debuff", "Deals Slashing damage to all targets.  The final hit of the combo also applies Shredded. " + dataPowerAlias["Shredded"].tip);
dataPower[dataPower.length-1].insertAdvantage("Crashing Crescendo", 2, null, "Each hit with Blade Tempest gives you a +2.5% chance to Critically Hit. This bonus resets upon scoring a successful Critical Hit.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(3, 11, 1, "Storm's Harvest", 0.67, 0.83, 0, 0, [30,47], 0, "Targets Foe/10 feet", "Melee Damage/Root/Disorient", "Deals Slashing damage and your target is Rooted for 13 sec.<br /><br />If fully charged, Disorients your target for 12 sec. " + dataPowerAlias["Disorient"].tip);
dataPower[dataPower.length-1].insertAdvantage("Red-Eyed Dragon", 2, null, "Storm\\\'s Harvest will always be a Critical Hit, however, after each use you will not be able to Critically Hit with any power for 5 seconds.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(3, 11, 1, "Shuriken Throw", 0.5, 0, 0, 0, 15, 0, "Targets Foe/100 feet", "Ranged Damage/Knock Down", "Deals Slashing damage and the target is Kocked Down.  This Knock Down can only occur once every 5 seconds.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Chained Kunai", 2, null, "+ Allows you to use a Chained Kunai once every 5 seconds.<br />+ This will knock the target toward you instead of down.<br />+ The cost is increased and the range is reduced to 50 feet.<br />+ prevents your regular Shuriken attacks from knocking your target down.");
dataPower[dataPower.length-1].insertAdvantage("Poison Shuriken", 2, null, "Gives your Shuriken a 10% chance to apply Deadly Poison to the target.");
dataPower[dataPower.length-1].insertAdvantage("Serrated Edges", 2, null, "Gives your Shuriken a 10% chance to apply Bleed to the target.");
dataPower[dataPower.length-1].insertAdvantage("Strong Arm", 2, null, "Causes this power to gain bonus damage from your Strength instead of your Ego.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");
dataPowerAlias["Shuriken Throw"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Inexorable Tides", 0.5, 0, 0, 0, 22, 0, "Targets Foe (5 max)/10 feet/120 degree Cone", "Melee AoE Damage/Knock Up", "Deals Crushing damage to all targets and they are Knocked Up.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Instep Crush", 2, null, "The primary target is Rooted for 16 sec.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");
dataPowerAlias["Inexorable Tides"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Chained Kunai", 0.5, 1.5, 0, 0, [27,41], 10, "Targets foe/25 feet", "Melee Damage/Knock To", "Deals Slashing damage and your target is Knocked To you.<br /><br />Has a 28-100% chance to apply a stack of Bleed to your target. " + dataPowerAlias["Bleed"].tip, Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].advantageList.push(dataPowerAlias["Open Wound"].replicate());
dataPower[dataPower.length-1].insertAdvantage("Fine Cuts", 2, null, "Fully charging Chained Kunai refreshes your Shredded debuff.");
dataPower[dataPower.length-1].insertAdvantage("Weak Points", 2, null, "Fully charging Chained Kunai refreshes the duration of Bleeds on your target.");
dataPower[dataPower.length-1].insertAdvantage("Inner Peace", 2, null, dataPowerAlias["SP"].tip);
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");
dataPowerAlias["Chained Kunai"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Smoke Bomb", 1, 0, 0, 0, 34, 120, "Affects non-object foe (10 max)/50 foot Sphere", "Threat Wipe/Stealth", "Wipes your threat from nearby targets and places you in Stealth for 3/4/5 seconds, based on Rank.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Concussive Escape", 2, null, "Smoke Bomb also Knocks Back any targets within 15 feet.");
dataPowerAlias["Smoke Bomb"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Form of the Tempest", 1, 2.5, 0, 2.5, 20, 0, "Form (Dexterity)", "Buff/Form/Focus", "Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you land a critical hit.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_FORM);
dataPower[dataPower.length-1].insertAdvantage("Gifts of the Storm", 3, null, "While Form of the Tempest is active, grants 20% of any healing you receive to allies wihtin 20 feet.  This effect can only occur once every 8 seconds.");

dataPower[dataPower.length] = new Power(3, 11, 1, "Lightning Reflexes", 0, 0, 0, 0, 0, 0, "Passive (Defensive)", "Sloted Defensive Passive", "+ Increaes your Dodge and Avoidance.<br />+ When hit, your Dodge increases slightly each time until you dodge, resetting the bonus.<br />+ Greatly increaes your resistance to damage over time effects.", Power.TYPE_NORMAL, true);
dataPowerAlias["Lightning Reflexes"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Way of the Warrior", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Sloted Offensive Passive", "+ Increases your melee and Bleed damage, plus your other damage by a lesser amount.<br />+ Increases Dodge and Avoidance ratings.<br />+ Recovers Energy when an enemy dodges one of your attacks.  This amount scales with your Recovery.", Power.TYPE_NORMAL, true);
dataPowerAlias["Way of the Warrior"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Intensity", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Offense", "Grants a bonus to all damage strength, Strength, and Dexterity for 12 seconds.<br /><br />Applies Break Free damage to any Holds, Roots, or Disables affecting you." + dataPowerAlias["AOCD"].tip, Power.TYPE_NORMAL, true);
dataPowerAlias["Intensity"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Night Warrior", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Slotted Offensive Passive", "+ Increases your damage from all sources.<br />+ Bypasses a portion of enemy damage resistance.<br />+ Increases power Charge Speed, Dodge, and Avoidance.<br />+ Unlocks the Sneak power which allows you to move around in stealth.  Some powers deal additional damage when used from Stealth.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Silent Running", 1, null, "Increases your movement speed while sneaking.");
dataPowerAlias["Night Warrior"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Parry", 1, 0, 0, 0, 0, 0, "Targets Self", "Block", "While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ For 2 seconds after blocking, you will return a portion of one incoming attack back to the attacker.  This effect can only be activated once every 5 seconds.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("The Elusive Monk", 3, null, "If Parry is slotted and you make a melee attack, you gain the following bonuses for 2 seconds:<br />+ ?? Dodge Chance, scaling with your Dexterity.<br />+ ?? Avoidance Rating, scaling with your Dexterity.<br />+ 33% resistance to Knock effects.");
dataPowerAlias["Parry"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Fluidity", 1, 0, 0, 0, 0, 0, "Targets Self", "Block", "Grants 20% Dodge and +300 Avoidance while blocking, your resistance to Knocks and Stuns is increased, and your movement speed is decreased.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Flowing Like the River", 3, null, "If you maintain Fluidity for at least 2 seconds, its bonuses will decay over 10 seconds after you stop maintaining it.");
dataPowerAlias["Fluidity"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Thunderbolt Lunge", 0.67, 0, 0, 0, 13, 3, "Targets foe/60 foot lunge", "Lunge/Snare/Root", "Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 17 seconds.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Essence Assault", 2, null, "Stuns the target briefly if used from further than 20 feet away and they aren\\\'t already being controlled.");
dataPower[dataPower.length-1].insertStockAdvantages("NG", "AM", "CC", "CS");
dataPowerAlias["Thunderbolt Lunge"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Smoke Bomb Lunge", 0.67, 0, 0, 0, 13, 3, "Targets foe/60 foot lunge", "Lunge/Melee Damage/Stun", "Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Stunned briefly.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Sudden Strike", 2, null, "If you lunge from more than 50 feet away your next single target Melee Critical has 15% more severity.");
dataPower[dataPower.length-1].insertStockAdvantages("NG", "AM", "CC", "CS");
dataPowerAlias["Smoke Bomb Lunge"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Strike Down", 0.67, 0, 0, 0, 13, 3, "Targets foe/60 foot lunge", "Lunge/Snare/Knock Down", "Lunges to the target, dealing Slashing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Knocked Down if they aren't already under a control effect.");
dataPower[dataPower.length-1].insertStockAdvantages("NG", "AM", "CC", "CS");

dataPower[dataPower.length] = new Power(3, 11, 1, "Steadfast", 0, 0, 0, 0, 0, 0, "Energy Unlock", "Innate Passive/Dexterity/Recovery", "+ Generates energy every time you land a critical hit with a non-energy-building Martial Arts power.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Dexterity, and to a lesser degree, your Recovery.", Power.TYPE_ENERGY_UNLOCK, true);
dataPowerAlias["Steadfast"] = new PowerAlias(dataPower[dataPower.length-1]);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 1, "Relentless", 0, 0, 0, 0, 0, 0, "Energy Unlock", "Innate Passive/Recovery/Endurance", "+ Generates energy every time you land a critical hit against a target you have Wounded.<br />+ Some Wound effects are Bleed, Shredded, Open Wound, and Deep Wound.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.", Power.TYPE_ENERGY_UNLOCK, true);
dataPowerAlias["Relentless"] = new PowerAlias(dataPower[dataPower.length-1]);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 2, "Dragon's Wrath", 0.67, 0.83, 0, 0, [36,61], 0, "Targets foe/10 feet", "Melee Damage/Rush", "Deals Slashing damage.<br /><br />When fully charged, grants you Rush. " + dataPowerAlias["Rush"].tip);
dataPower[dataPower.length-1].insertAdvantage("Tiger\\\'s Courage", 2, null, "Dragon\\\'s Wrath has its damage increased by a factor of your current chance to land a Critical Hit.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(3, 11, 2, "Rising Knee", 0.67, 0, 0, 0, 20, 3, "Targets foe/10 feet", "Melee Damage/Knock Down", "Deals Crushing damage and Knocks Down the target.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Flowing Strikes", 2, null, "Your mastery of unarmed combat allows you to make more effective blows as part of a combo, reducing the target\\\'s Damage Resistance to your next 2 non-energy building Melee Crushing attacks.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");
dataPowerAlias["Rising Knee"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 2, "Eye of the Storm", 0.5, 5.5, 0.5, 0, [9.3, 6.3], 0, "Affects foes (5 max)/10 foot Sphere", "Melee AoE Damage/Damage Shield", "Deals Slashing damage to all targets, scaling down over time.<br /><br />Absorbs incoming damage, scaling up over time.");
dataPower[dataPower.length-1].insertAdvantage("Blade Beyond the Veil", 2, null, "Eye of the Storm deals damage to enemies attacking you in Melee range for the duration of the maintain.");
dataPower[dataPower.length-1].insertAdvantage("Cut To Shreds", 2, null, "Has a 10% chance to apply Shredded to targets.<br />+ Is guaranteed to apply Shredded to targets on a full maintain.  " + dataPowerAlias["Shredded"].tip);
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(3, 11, 2, "Bountiful Chi Resurgence", 0, 0, 0, 0, 20, 15, "Targets Self", "Self HoT/Self Debuff", "Heals you every 2 seconds over 16 seconds.  While active, your damage is reduced by 10%.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Resurgent Reiki", 2, null, "You gain additional ticks of healing whenever you Dodge an attack while Bountiful Chi Resurgence is active. This effect can only occur once every 0.5 seconds.");
dataPowerAlias["Bountiful Chi Resurgence"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 2, "Masterful Dodge", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Defense", "For 15 seconds, greatly increases your Dodge Chance and Avoidance Rating, and reduces the damage you take from Damage over Time effects." + dataPowerAlias["ADCD"].tip, Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Unfettered Strikes", 2, null, "Each time you Dodge an attack while Masterful Dodge is active, you gain an Opportunity Strike Buff, increasing your Damage Strength by +7.5% for a short time.");
dataPowerAlias["Masterful Dodge"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 3, "Sword Cyclone", 0.5, 5.5, 0.5, 0, [21,5], 0, "Affects foe (5 max)/10 foot Sphere", "Melee AoE Damage", "Deals Slashing damage to all targets.");
dataPower[dataPower.length-1].insertAdvantage("Butcher\\\'s Blades", 2, null, "Sword Cyclone becomes a charge power instead of maintain:<br /><br />2 sec charge time<br />0.5 sec activate time<br />31-155 energy cost");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = new Power(3, 11, 3, "Shuriken Storm", 0.5, 3.5, 0.5, 0, [12,9.4], 0, "Affects foe (5 max)/30 foot Sphere", "Ranged AoE Damage", "Deals Piercing damage to all targets.  Has a 50% chance to miss targets further than 15 feet away.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Floating Butterfly", 2, null, "Grants +10% Dodge Chance and +50% Avoidance Rating while maintaining this power.");
dataPower[dataPower.length-1].insertAdvantage("Strong Arm", 1, null, "Causes this power to gain bonus damage from your Strength instead of your Ego.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");
dataPowerAlias["Shuriken Storm"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 11, 4, "Fury of the Dragon", 0.5, 4, 0.5, 0, [37,15], 60, "Targets foe (10 max)/25 feet/60 degree Cone", "Ultimate/Melee AoE Damage", "Deals Slashing and Fire damage to all targets in front of you, Snaring them, and applying Clinging Flames to them.<br /><br />The damage this power deals is based on the number of Focus stacks you have.<br /><br />You are immune to Control effects while channeling this power.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Real Ultimate Power", 2, null, "50% chance to apply Bleed to targets.");
dataPowerAlias["Fury of the Dragon"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(3, 11, 4, "Vorpal Blade", 1, 0, 0, 0, 92, 60, "Targets foe (10 max)/15 feet/15 foot Sphere", "Ultimate/Melee AoE Damage", "Deals Slashing damage to all targets and causes them to Bleed.<br /><br />The damage this power deals is based on the number of Focus stacks you have.", Power.TYPE_NORMAL, true);
dataPowerAlias["Vorpal Blade"] = new PowerAlias(dataPower[dataPower.length-1]);


//------------------------------------------------------------------------------
// Power Framework: Fighting Claws
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(12);

var pow = 0;

dataPower[dataPower.length] = new Power(3, 12, -1, "Hawk's Talons", [0.44, 0.47, 0.47], 0, 0, 0, 0, 0, "Targets foe/10 feet", "Energy Builder/Melee Damage", "Deals Slashing damage and generates energy.  The first hit generates the least amount, the second hit generates the most, and each hit after that generates slightly more than the first.", Power.TYPE_ENERGY_BUILDER, false, true);
dataPower[dataPower.length-1].insertAdvantage("Peerless Predation", 2, null, "Each attack gains a 10% chance to apply Focus.<br />+ If using a Martial Arts form, you gain an additional stack of Focus.<br />+ If not using a Martial Arts form, you can only gain a stack of Focus if not already affected by it.");
dataPower[dataPower.length-1].insertStockAdvantages("AM");

dataPower[dataPower.length] = new Power(3, 12, 0, "Viper's Fangs", [0.4,0.4,0.7], 0, 0, 0, [23,26,20], 0, "Targets foe (5 max)/10 feet/220 degree Cone", "Melee Damage/Debuff/Combo", "Deals Slashing damage to the target.  The final atttack also applies Shredded. " + dataPowerAlias["Shredded"].tip);
dataPower[dataPower.length-1].insertAdvantage("Spitting Cobra", 2, null, "Grants each attack with Viper\\\'s Fangs a chance to apply Deadly Poison, which stacks up to 10 times and causes your target to suffer Toxic Damage over Time.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = new Power(3, 12, 1, "Rend and Tear", 0.67, 0.83, 0, 0, [28,52], 0, "Targets foe/10 feet", "Melee Damage/Knock Up", "Deals Slashing damage, the target is Knocked Up, and the duration of Shredded is refreshed.");
dataPower[dataPower.length-1].insertAdvantage("Drake\'s Deliverance", 2, null, "Rend and Tear does 30% bonus damage, but does the Damage over Time after the initial hit.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CC", "CS");

dataPower[dataPower.length] = dataPowerAlias["Shuriken Throw"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Inexorable Tides"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Chained Kunai"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 12, 1, "Form of the Tiger", 1, 2.5, 0, 2.5, 20, 0, "Form (Dexterity)", "Buff/Form/Focus", "Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you charge a melee power at least halfway.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_FORM);
dataPower[dataPower.length-1].insertAdvantage("Rage of the Beast", 3, null, "When you are affected by a Hold or Root, you gain a stack of Enraged and your running and jumping speed are both doubled for 12 seconds.  These effects won't help you escape the hold or root, though.");

dataPower[dataPower.length] = dataPowerAlias["Lightning Reflexes"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Way of the Warrior"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Intensity"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Night Warrior"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Parry"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fluidity"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Thunderbolt Lunge"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb Lunge"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Steadfast"].replicate(3, 12);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Relentless"].replicate(3, 12);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 12, 2, "Dragon's Claws", 0.67, 0.83, 0, 0, [43-73], 0, "Targets foe/10 feet", "Melee Damage/Rush", "Deals Slashing damage.  This power gains +50% Critical Severity.<br /><br />When fully charged, grants you Rush. " + dataPowerAlias["Rush"].tip);
dataPower[dataPower.length-1].insertAdvantage("Vertebreak", 2, null, "Dragon\\\'s Claws will Knock Down the target 3 times over the 3 seconds following the attack. The Knock Down cannot occur more than once every 60 seconds.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");

dataPower[dataPower.length] = dataPowerAlias["Rising Knee"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Bountiful Chi Resurgence"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Masterful Dodge"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = new Power(3, 12, 3, "Tiger's Bite", 0.67, 0.83, 0, 0, [47,75], 0, "Targets foe/10 feet", "Melee Damage", "Deals Slashing damage, consuming Shredded if available to deal additional damage.");
dataPower[dataPower.length-1].insertAdvantage("Mouth of Madness", 2, null, "Tiger\\\'s Bite has a chance to not consume the Shredded effect.");
dataPower[dataPower.length-1].insertStockAdvantages("AM");

dataPower[dataPower.length] = dataPowerAlias["Shuriken Storm"].replicate(3, 12);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fury of the Dragon"].replicate(3, 12);
dataPower[dataPower.length] = dataPowerAlias["Vorpal Blade"].replicate(3, 12);

//------------------------------------------------------------------------------
// Power Framework: Single Blade
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(13);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Reaper\'s Touch', '<div class="Sprite SingleBlade_ReapersTouch"></div>&nbsp;Reaper\'s Touch', 3, 13, pow++, -1, 'Single Blade, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Reaper\\\'s touch uses your blade to rapidly slice apart your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Three Edged Blade', 'Three Edged Blade', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Reaper\'s Caress', '<div class="Sprite SingleBlade_ReapersCaress"></div>&nbsp;Reaper\'s Caress', 3, 13, pow++, 0, 'Single Blade, Melee AoE Damage (Combo) and Focus-based Bleed<br /><br />Reaper\\\'s Caress is a rapid series of attacks capable of leaving the enemy with multiple bleeding wounds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cleaving Strikes', 'Cleaving Strikes', 2, null, 'Finishing the combo applies Shredded, increasing physical damage taken by a small amount, and Slashing damage taken by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Slash', '<div class="Sprite SingleBlade_Slash"></div>&nbsp;Slash', 3, 13, pow++, 0, 'Single Blade, Melee Single Target Damage (Combo) and Bleed<br /><br />Reaper\\\'s Caress is a rapid series of attacks capable of leaving the enemy with multiple bleeding wounds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Serrated Blade', 'Serrated Blade', 2, null, 'Finishing the combo applies Shredded, increasing physical damage taken by a small amount, and Slashing damage taken by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Swift Strike', '<div class="Sprite SingleBlade_SwiftSlash"></div>&nbsp;Swift Slash', 3, 13, pow++, 1, 'Single Blade, Melee Single Target Damage and Stun<br /><br />Deals Slashing damage to the target and stuns it briefly.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));

dataPower[dataPower.length] = dataPowerAlias["Shuriken Throw"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Scything Blade', '<div class="Sprite SingleBlade_ScythingBlade"></div>&nbsp;Scything Blade', 3, 13, pow++, 1, 'Single Blade, 10 foot Melee 120 degree Cone AoE Damage and Bleed<br /><br />Requires 1 power from Single Blade or 2 non-Energy Building powers from any framework.<br /><br />Deals Slashing damage to targets.  Has a 50-100% chance to apply Bleed to targets not currently Bleeding, based on charge time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Swallowtail Cut', 'Swallowtail Cut', 2, null, '+ Scything Blade now applies Swallowtail Cut instead of a standard Bleed.<br />+ Swallowtail Cut deals damage over time based on the maximum hit points of a target.<br />+ Targets of rank supervillain or higher are instead affected by a standard Bleed if not already affected by one.  This application is 100%, regardless of charge time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Heavy Blade', 'Heavy Blade', 2, null, 'Knocks down targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Inexorable Tides"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Chained Kunai"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Form of the Swordsman', '<div class="Sprite SingleBlade_FormOfTheSwordsman"></div>&nbsp;Form of the Swordsman', 3, 13, pow++, 1, 'Single Blade, Form (Dexterity)<br /><br />Requires 1 power from Single Blade or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Bleed effect.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cut Where it Counts', 'Cut Where it Counts', 2, null, 'The cuts of a master of the Form of the Swordsman strike the most vital areas of their targets, resulting in wounds that are frighteningly difficult to heal.'));

dataPower[dataPower.length] = dataPowerAlias["Lightning Reflexes"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Way of the Warrior"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Intensity"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Night Warrior"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Parry"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fluidity"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Thunderbolt Lunge"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Cut Down'].name, dataPowerAlias['Cut Down'].desc, 3, 13, pow++, 1, dataPowerAlias['Cut Down'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb Lunge"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Steadfast"].replicate(3, 13);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Relentless"].replicate(3, 13);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dragon\'s Bite', '<div class="Sprite SingleBlade_DragonsBite"></div>&nbsp;Dragon\'s Bite', 3, 13, pow++, 2, 'Single Blade, 10 foot Melee Single Target Damage and Rush<br /><br />Requires 3 powers from Single Blade or 4 non-Energy Building powers from any framework.<br /><br />Dragon\\\'s Bite is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cull the Weak', 'Cull the Weak', 2, null, 'This advantage allows your Dragon\\\'s Bite attack to inflict massive damage on enemies at 25% or lower Health. If your target is another Hero or an enemy of Super Villain or higher rank, your damage will be increased by 30%, and Henchmen and Villains are defeated outright.'));

dataPower[dataPower.length] = dataPowerAlias["Rising Knee"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Bountiful Chi Resurgence"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Masterful Dodge"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Reaper\'s Embrace', '<div class="Sprite SingleBlade_ReapersEmbrace"></div>&nbsp;Reaper\'s Embrace', 3, 13, pow++, 3, 'Single Blade, 10 foot Melee Single Target Damage and Bleed Consume<br /><br />Requires 5 powers from Single Blade or 6 non-Energy Building powers from any framework.<br /><br />Reaper\\\'s Embrace is a powerful slashing attack capable of taking advantage of any bleeding wounds the enemy may have.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'No Mercy', 'No Mercy', 2, null, '5-50% chance (based on charge time) to cause 2 Bleeds to your target.'));

dataPower[dataPower.length] = dataPowerAlias["Shuriken Storm"].replicate(3, 13);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fury of the Dragon"].replicate(3, 13);
dataPower[dataPower.length] = dataPowerAlias["Vorpal Blade"].replicate(3, 13);

//------------------------------------------------------------------------------
// Power Framework: Unarmed
//------------------------------------------------------------------------------

dataRequireGroup['martial arts'].push(14);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Righteous Fists', '<div class="Sprite Unarmed_RighteousFists"></div>&nbsp;Righteous Fists', 3, 14, pow++, -1, 'Unarmed, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Righteous Fists is a fighting technique to deliver a series of rapid punches to your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Drunken Master', 'Drunken Master', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vicious Strikes', '<div class="Sprite Unarmed_ViciousStrikes"></div>&nbsp;Vicious Strikes', 3, 14, pow++, -1, 'Unarmed, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Vicious Strikes is a fighting technique to deliver a series of rapid punches to your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Drunken Master', 'Drunken Master', 2, null, 'With this advantage, this technique exposes weaknesses in your opponent, and sharpens your own form. Every attack has a chance to grant you a single instance of a Focus Buff if you are not already affected by it or if you are affected by a Martial Arts form.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Thundering Kicks', '<div class="Sprite Unarmed_ThunderingKicks"></div>&nbsp;Thundering Kicks', 3, 14, pow++, 0, 'Unarmed, 10 foot Melee Single Target Damage and Dodge Buff (Combo)<br /><br />Thundering Kicks unleashes a flurry of pounding kicks on your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Floating Lotus Blossom', 'Floating Lotus Blossom', 2, null, 'Each successful hit with Thundering Kicks adds a stacking Dodge Buff to you. All stacks of the Buff are removed upon a successful Dodge.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Crashing Wave Kick', '<div class="Sprite Unarmed_CrashingWaveKick"></div>&nbsp;Crashing Wave Kick', 3, 14, pow++, 1, 'Unarmed, 10 foot Melee Single Target Damage<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Crashing Wave Kick delivers a kick powerful enough to Stun an enemy for a short time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Subtlety of the Tides', 'Subtlety of the Tides', 2, null, 'For 8 seconds after using Crashing Wave Kick, all of your Melee attacks have a 50% chance to grant a stack of Ebb and Flow which is a small Dodge and Avoidance Buff. The amount of Dodge and Avoidance granted is increased slightly as you level.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Shuriken Throw"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'One Hundred Hands', '<div class="Sprite Unarmed_OneHundredHands"></div>&nbsp;One Hundred Hands', 3, 14, pow++, 1, 'Unarmed, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Your fists move with lightning speed, rapidly striking foes in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Ghostly Strikes', 'Ghostly Strikes', 1, null, 'You unleash Chi energy while using this power, causing every other tick of damage this power deals to instead be dealt as Dimensional damage. These Ghostly Strikes do 10% more damage than normal strikes, and penetrate through half of your targets resistance.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Inexorable Tides"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Chained Kunai"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Form of the Master', '<div class="Sprite Unarmed_FormOfTheMaster"></div>&nbsp;Form of the Master', 3, 14, pow++, 1, 'Unarmed, Form (Dexterity)<br /><br />Requires 1 power from Unarmed or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you dodge an attack.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Storm\'s Eye Prana', 'Storm\'s Eye Prana', 3, null, 'A dedicated practitioner of the Form of the Master style gains strength among enemies, and is serene in the eye of the storm.'));

dataPower[dataPower.length] = dataPowerAlias["Lightning Reflexes"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Way of the Warrior"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Intensity"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Night Warrior"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Parry"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fluidity"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Thunderbolt Lunge"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Smoke Bomb Lunge"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Steadfast"].replicate(3, 14);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Relentless"].replicate(3, 14);
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Backhand Chop', '<div class="Sprite Unarmed_BackhandChop"></div>&nbsp;Backhand Chop', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee Single Target Damage and Interrupt<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />You quickly spin, delivering a backhanded strike to your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Stinging Bee', 'Stinging Bee', 2, null, 'Sets you up for additional attacks, granting you a stack of Focus.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Elbow Slam', '<div class="Sprite Unarmed_ElbowSlam"></div>&nbsp;Elbow Slam', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee Single Target Damage and Disorient<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />You leap into the air and perform a downward strike with your elbow, attempting to Disorient your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Falling Hammer', 'Falling Hammer', 2, null, 'You deal an additional 30% damage with this power when your target is Knocked or Stunned.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = dataPowerAlias["Rising Knee"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dragon Kick', '<div class="Sprite Unarmed_DragonKick"></div>&nbsp;Dragon Kick', 3, 14, pow++, 2, 'Unarmed, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 3 powers from Unarmed or 4 non-Energy Building powers from any framework.<br /><br />Dragon Kick is a technique that is highly effective in both attacking the enemy and in setting yourself up to efficiently press your attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Lashing Dragon Tail', 'Lashing Dragon Tail', 2, null, 'Dragon Kick increases the amount of damage you are able to Dodge from attacks.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = dataPowerAlias["Bountiful Chi Resurgence"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Masterful Dodge"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Burning Chi Fist', '<div class="Sprite Unarmed_BurningChiFist"></div>&nbsp;Burning Chi Fist', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and DoT<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />Burning Chi Fist uses your Chi to increase the force of your blow and can even leave behind focused points of burning energy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Fists of Righteous Flame', 'Fists of Righteous Flame', 2, null, 'If fully charged, Burning Chi Fist grants a short duration Buff with each use which grants a chance to add Dimensional damage to each Melee attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dragon Uppercut', '<div class="Sprite Unarmed_DragonUppercut"></div>&nbsp;Dragon Uppercut', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />You leap upward with great force, and land an uppercut attack on your foe, knocking them up into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Chi Flame', 'Chi Flame', 2, null, 'Causes your Dragon Uppercut to burn your target with Chi energy, dealing an additional 10% damage as Dimensional damage. Fully charging your Dragon Uppercut will cause the target to suffer additional Dimensional Damage over Time for 3 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Open Palm Strike', '<div class="Sprite Unarmed_OpenPalmStrike"></div>&nbsp;Open Palm Strike', 3, 14, pow++, 3, 'Unarmed, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Unarmed or 6 non-Energy Building powers from any framework.<br /><br />You perform a focused double palm strike that can send your enemy flying.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Focused Chi Blast', 'Focused Chi Blast', 2, null, 'Causes your Open Plan Strike to unleash a powerful blast of Chi energy in a line in front of you. This advantage causes your attack to now deal half damage as Physical damage to your primary target, and the other half as Dimensional damage to all affected targets in a 25 foot line in front of you, including the primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = dataPowerAlias["Shuriken Storm"].replicate(3, 14);
dataRequireGroupPower[dataPower.length-1] = 'martial arts';

dataPower[dataPower.length] = dataPowerAlias["Fury of the Dragon"].replicate(3, 14);
dataPower[dataPower.length] = dataPowerAlias["Vorpal Blade"].replicate(3, 14);

//------------------------------------------------------------------------------
// Power Set: Mentalist
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'] = [];

dataPowerAlias["Ego Leech"] = PowerAlias.textOnly("Ego Leech", "Ego Leech decreases the cost of your Mentalist powers by 5% for 15 seconds.  Stacks up to 5 times.");
dataPowerAlias["Id Surge"] = PowerAlias.textOnly("Id Surge", "Increases your Ego damage strength by +15% and your Ego by +13 for 15 seconds.");
dataPowerAlias["Id Blades"] = new PowerAlias(new PowerAdvantage("Id Blades", 0, null, "Causes your Ego Blade powers to manifest Dual Id Blades instead of a single Ego Blade."));

//------------------------------------------------------------------------------
// Power Framework: Telekinesis
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'].push(15);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Kinetic Darts', '<div class="Sprite Telekinesis_KineticDarts"></div>&nbsp;Kinetic Darts', 4, 15, pow++, -1, 'Telekinesis, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Use your mind to launch Kinetic Darts at your enemies, gathering energy as you focus your will in this basic attack mode.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Leeching Strikes', 'Leeching Strikes', 2, null, 'All attacks of this combo gain a 15% chance to grant you a stack of Ego Leech, instead of just the initial attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Incisive Wit', 'Incisive Wit', 2, null, '+ Gives this power a 15% chance to activate an Id Surge.<br />+ ' + dataPowerAlias['Id Surge'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade', '<div class="Sprite Telekinesis_EgoBlade"></div>&nbsp;Ego Blade', 4, 15, pow++, -1, 'Telekinesis, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Creates a weapon from your force of will, enabling you to assault your enemies at close range.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Leeching Strikes', 'Leeching Strikes', 2, null, 'All attacks of this combo gain a 15% chance to grant you a stack of Ego Leech, instead of just the initial attack.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Incisive Wit', 'Incisive Wit', 2, null, '+ Gives this power a 15% chance to apply Id Surge.<br />+ ' + dataPowerAlias['Id Surge'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Weaponry', '<div class="Sprite Telekinesis_EgoWeaponary"></div>&nbsp;Ego Weaponry', 4, 15, pow++, 0, 'Telekinesis, 10 foot Melee 180/180/360 degree Cone Damage - Combo<br /><br />Deals Ego damage to the targets.  Your chance to critically strike with this power increases by 5% per stack of Ego Leech.  You have a 25/25/50% (based on combo hit) chance to gain a stack of Ego Leech, or 100% per hit if affected by Ego Infusion.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Thought Sever', 'Thought Sever', 1, null, 'Ego Weaponry will reduce the Energy of the target with each hit in addition to dealing damage normally. Also causes your Ego Weaponry to deal an additional 20% damage to targets with less than 50% Energy.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Stressed Out', 'Stressed Out', 2, null, '+ Gives this power a 20/20/50% chance (based on combo hit) to apply Stressed.<br />+ The chance to apply Stressed is doubled if you are affected by Ego Infusion.<br />+ Stress increases Ego damage that the target receives by 8% for 20 sec and can stack up to 3 times.<br />+ Stress is a type of Mental State.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Siphoning Strikes', 'Siphoning Strikes', 3, null, 'Your Ego Weaponry attacks no longer deal additional damage when you perform a critical strike with them. Instead, you heal yourself for the amount of additional damage you would have done when performing a critical strike.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Strike', '<div class="Sprite Telekinesis_TelekineticStrike"></div>&nbsp;Telekinetic Strike', 4, 15, pow++, 0, 'Telekinesis, 100 foot Ranged Single Target Combo<br /><br />Deals Ego damage to the target.  Your chance to critically strike with this power increases by 5% per stack of Ego Leech.  You have a 25/25/50% (based on combo hit) chance to gain a stack of Ego Leech, or 100% per hit if affected by Ego Infusion.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Stressed Out', 'Stressed Out', 2, null, '+ Gives this power a 15/15/50% chance (based on combo hit) to apply Stressed.<br />+ The chance to apply Stressed is doubled if you are affected by Ego Infusion.<br />+ Stress increases Ego damage that the target receives by 8% for 20 sec and can stack up to 3 times.<br />+ Stress is a type of Mental State.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Siphoning Strikes', 'Siphoning Strikes', 3, null, '+ When this power deals a critical strike, it heals the user for the critical strike amount instead of adding it as extra damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade Astonish', '<div class="Sprite Telekinesis_EgoBladeAstonish"></div>&nbsp;Ego Blade Astonish', 4, 15, pow++, 1, 'Telekinesis, 10 foot Melee Single Target Damage - Stun<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Deals Ego damage and briefly Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade Frenzy', '<div class="Sprite Telekinesis_EgoBladeFrenzy"></div>&nbsp;Ego Blade Frenzy', 4, 15, pow++, 1, 'Telekinesis, 10 foot PBAoE Melee Sphere - Damage<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to targets.  Your chance to critically strike with this power is increased by 5% per stack of Ego Leech.  Has a 15% chance per hit to apply a stack of Ego Leech.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Unnerving Rage', 'Unnerving Rage', 2, null, 'Roots targets for 16 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Instill Doubt', 'Instill Doubt', 2, null, '+ Gives you a 25% chance to apply Dependency per hit.<br />+ ' + dataPowerAlias['Dependency'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Mental Block', 'Mental Block', 3, null, 'Grants a damage absorption shield that scales up over time.  Lasts as long as you maintain this power.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinesis', '<div class="Sprite Telekinesis_Telekinesis"></div>&nbsp;Telekinesis', 4, 15, pow++, 1, 'Telekinesis, 100 foot Ranged Single Target - Pick Up and Throw Damage<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Levitate a nearby object and hurl it at your target, dealing Crushing damage based on the size of the object.  Also deals Crushing damage to enemies near your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Lariat', '<div class="Sprite Telekinesis_TelekineticLariat"></div>&nbsp;Telekinetic Lariat', 4, 15, pow++, 1, 'Telekinesis, 50 foot Ranged Single Target - Knock To Damage<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Deals Ego damage and Knocks your target to you.  Grants a stack of Ego Leech.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Burst', '<div class="Sprite Telekinesis_TelekineticBurst"></div>&nbsp;Telekinetic Burst', 4, 15, pow++, 1, 'Telekinesis, 50 foot Ranged 15 foot Sphere - AoE Damage and Disorient<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to targets.<br /><br />Has a 34-100% chance (based on charge time) to Disorient targets.  ' + dataPowerAlias['Disorient'].tip + '<br /><br />Has a 34-100% chance (based on charge time) to apply Ego Leech for every target you hit.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sudden Impact', 'Sudden Impact', 2, null, 'Your Telekinetic Burst hits with such strength that affected targets are Knocked Down.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(4, 15, 1, "Ego Form", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Slotted Offensive Passive/Energy Form", "+ Increases your Paranormal damage.<br />+ Increases your Physical damage by a lesser amount.<Br />+ Increases your Ego damage resistance.<br />+ Increases your resistance to all damage by a lesser amount.<br />+ Grants a small power cost discount to Mentalist powers.<br />+ Recovers Energy when you take Ego damage, scaling with your Equilibrium.<br />+ Counts as an Energy Form.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].advantageList.push(dataPowerAlias["Id Blades"].replicate());
dataPowerAlias["Ego Form"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Id Mastery', '<div class="Sprite Telekinesis_IdMastery"></div>&nbsp;Id Mastery', 4, 15, pow++, 1, 'Telekinesis, Offensive Passive<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />+ Can be slotted in an Offensive or Balanced passive power slot.<br />+ Increases all of your Paranormal Melee damage (Dimensional, Ego, Magic), and increases all other Paranormal damage to a lesser degree. These increases scale with your Super Stats.<br />+ Provides a small amount of damage resistance. This effect scales with your Super Stats.<br />+ Provides a cost reduction for all Mentalist (Telekinesis, Telepathy) powers. This effect scales with your Recovery.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Id Blades'].name, dataPowerAlias['Id Blades'].desc, 0, null, dataPowerAlias['Id Blades'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mental Discipline', '<div class="Sprite Telekinesis_MentalDiscipline"></div>&nbsp;Mental Discipline', 4, 15, pow++, 1, 'Telekinesis, Form (Dexterity)<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Gives you stacks of Focus, increasing your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Mental State.<br />+ Mental State effects include Ego Leech, Stress, Dependency, and Fear.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Id Blades'].name, dataPowerAlias['Id Blades'].desc, 0, null, dataPowerAlias['Id Blades'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mental Precision', '<div class="Sprite Telekinesis_MentalPrecision"></div>&nbsp;Mental Precision', 4, 15, pow++, 1, 'Telekinesis, Form (Dexterity)<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Gives you stacks of Precision, increasing your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Mental State.<br />+ Mental State effects include Ego Leech, Stress, Dependency, and Fear.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = new Power(4, 15, 1, "Manipulator", 1, 2.5, 0, 2.5, 20, 0, "Form (Intelligence or Presence)", "Buff/Form/Manipulator", "Gives you a stacking buff that increases the magnitude of Stuns, Incapacitates, Paralyzes, Roots, Sleeps, and Confuses.  It also increases your ranged and melee damage by a lesser amount.<br /><br />+ You gain a stack each time you Stun, Incapacitate, Paralyze, Root, Sleep, or Confuse a target.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_NORMAL, true);
dataPowerAlias["Manipulator"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Shield', '<div class="Sprite Telekinesis_TelekineticShield"></div>&nbsp;Telekinetic Shield', 4, 15, pow++, 1, 'Telekinesis, Block<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 300% resistance to all Physical damage and 250% resistance to all Non-Physical damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Telekinetic Reinforcement', 'Telekinetic Reinforcement', 1, null, 'Telekinetic Shield will continue to provide a defensive benefit against all damage for a short time after blocking.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade Dash', '<div class="Sprite Telekinesis_EgoBladeDash"></div>&nbsp;Ego Blade Dash', 4, 15, pow++, 1, 'Telekinesis, 60 foot Lunge, Snare, and Root<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Ego damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Rooted for 17 seconds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Head Shot', 'Head Shot', 2, null, 'Ego Blade Dash will also Disorient your target if you lunge more than 20 feet.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Reverberation', '<div class="Sprite Telekinesis_EgoReverberation"></div>&nbsp;Telekinetic Reverberation', 4, 15, pow++, 1, 'Telekinesis, Energy Unlock (Recovery, <i>Endurance</i>)<br /><br />Requires 1 power from Telekinesis or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Geenrates energy every 3 seconds for 6 seconds every time you apply a stack of Ego Leech.<br />+ The energy gained scales with your Recovery, and to a lesser degree, your Endurance.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade Breach', '<div class="Sprite Telekinesis_EgoBladeBreach"></div>&nbsp;Ego Blade Breach', 4, 15, pow++, 2, 'Telekinesis, 10 foot Melee Single Target - Damage and Refresh<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage and refreshes your stacks of Ego Leech.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Domineering Will', 'Domineering Will', 2, null, '+ Snares the target, reducing their movement speed by 100% for 4.8 seconds.<br />+ On a full charge, Knocks Down your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Stressful', 'Stressful', 2, null, 'Adds 12 seconds to the duration of your Stress debuffs.  This cannot exceed the original duration of Stress.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Eruption', '<div class="Sprite Telekinesis_TelekineticEruption"></div>&nbsp;Telekinetic Eruption', 4, 15, pow++, 2, 'Telekinesis, 25 foot Sphere PBAoE - Ranged Damage<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to nearby targets.<br /><br />If charged less than a second, Knocks Down targets.<br /><br />If charged for more than a second, Knocks Back targets based on charge time.<br /><br />Charging this power for at least 1 second applies Id Surge to the user.  ' + dataPowerAlias['Id Surge'].tip + '<br /><br />Each target hit gives you a 30-100% chance (based on charge time) to gain a stack of Ego Leech.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Enhanced Form', 'Enhanced Form', 2, null, 'Grants you Aegis, increasing your Resistance to all damage by +15% for 15 sec.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Wave', '<div class="Sprite Telekinesis_TelekineticWave"></div>&nbsp;Telekinetic Wave', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged 60 degree Cone AoE Damage<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to targets and knocks them back based on charge time.<br /><br />Has a 34-100% chance (based on charge time) to apply a stack of Ego Leech per target hit.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Psychic Tides', 'Psychic Tides', 2, null, '+ Sets the Energy Equilibrium of targets to 1 for 16 seconds.<br />+ Snares targets for 16 sec, reducing their movement speed by 100%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Mental Instability', 'Mental Instability', 2, null, 'Targets are Knocked To you instead of away.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Shards', '<div class="Sprite Telekinesis_TelekineticShards"></div>&nbsp;Telekinetic Shards', 4, 15, pow++, 2, 'Telekinesis, 100 foot 10 foot Sphere - AoE Damage and Refresh<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage and refreshes your stacks of Ego Leech.  Your primary target is Knocked Down.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Impaled', 'Impaled', 2, null, 'Adds 12 seconds to the duration of your Stress debuffs.  This cannot exceed the original duration of Stress.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Barrage', '<div class="Sprite Telekinesis_TelekineticBarrage"></div>&nbsp;Telekinetic Barrage', 4, 15, pow++, 2, 'Telekinesis, 100 foot Ranged 10 foot Sphere - AoE Damage<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to targets.  Your chance to critically strike with this power is increased by 5% per stack of Ego Leech.<br /><br />You have a 20% chance per hit to gain a stack of Ego Leech.  ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Dazzle', 'Dazzle', 2, null, '+ Each hit has a 20% chance to stun the target.<br />+ If you are affected by Ego Leech, the chance to stun each target becomes 20% chance per stack of Ego Leech.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Instill Doubt', 'Instill Doubt', 2, null, 'Gives you a 15% chance per hit to apply Dependencey to targets.  ' + dataPowerAlias['Dependency'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Choke', '<div class="Sprite Telekinesis_EgoChoke"></div>&nbsp;Ego Choke', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged Single Target Damage and Incapacitate<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target (increasing with each pulse).  After 1 second, Incapacitates the target, with each additional pulse refreshing a portion of the duration and durability of the Incapacitate effect.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Garroting Grip', 'Garroting Grip', 2, null, 'Applies Fear to your target.  Fear is a type of Mental State.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Hold', '<div class="Sprite Telekinesis_EgoHold"></div>&nbsp;Ego Hold', 4, 15, pow++, 2, 'Telekinesis, 50 foot Ranged Single Target Hold<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Paralyzes the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mass Effect', 'Mass Effect', 2, null, 'Mass Effect causes the target of your Ego Hold and enemies near your Ego Hold target to become Snared, reducing their movement speed for a time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Surge', '<div class="Sprite Telekinesis_EgoSurge"></div>&nbsp;Ego Surge', 4, 15, pow++, 2, 'Telekinesis, Active Offense and Energy Form<br /><br />Requires 3 powers from Telekinesis or 4 non-Energy Building powers from any framework.<br /><br />Increases your damage strength as well as your Ego stat.<br /><br />Applies Break Free damage to any Holds, Roots, or Disables affecting you.' + dataPowerAlias["AOCD"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Nimble Mind', 'Nimble Mind', 2, null, 'Increases your critical strike chance by 2% for every stack of Ego Leech you have while Ego Surge is active.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blade Annihilation', '<div class="Sprite Telekinesis_EgoBladeAnnihilation"></div>&nbsp;Ego Blade Annihilation', 4, 15, pow++, 3, 'Telekinesis, 10 foot Melee Single Target Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target.  When fully charged, this power consumes all stacks of Ego Leech to deal additional damage to your primary target and 25% of that damage to targets within 10 feet of that target.<br /><br />Grants Ego Infusion for 2 seconds per stack consumed.  Ego Infusion gives you a stack of Ego Leech every 2 seconds.<br /><br />Applies Ego Annihilation to the target for 2 sec.  This duration is increased by 2 seconds for every stack of Ego Leech consumed.  Ego Annihilation deals Ego damage every 2 seconds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mental Acuity', 'Mental Acuity', 2, null, '+ Increases the damage of the Ego Leech consumption portion of this power by 100%.<br />+ Increases the damage of the Ego Annihilation DoT by 50%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Lance', '<div class="Sprite Telekinesis_TelekineticLance"></div>&nbsp;Telekinetic Lance', 4, 15, pow++, 3, 'Telekinesis, 100 foot - Ranged Single Target Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target.  When fully charged, this power consumes all stacks of Ego Leech to deal additional damage to your primary target and 25% of that damage to targets within 10 feet of that target.<br /><br />Grants Ego Infusion for 2 seconds per stack consumed.  Ego Infusion gives you a stack of Ego Leech every 2 seconds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Maelstrom', '<div class="Sprite Telekinesis_TelekineticMaelstrom"></div>&nbsp;Telekinetic Maelstrom', 4, 15, pow++, 3, 'Telekinesis, 25 foot Sphere - PBAoE Ranged Damage and Stun<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to affected targets and Stuns them for 2 seconds.  Each target hit grants you a stack of Ego Leech. ' + dataPowerAlias['Ego Leech'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Expansive Intellect', 'Expansive Intellect', 2, null, 'Increases the radius of the Telekinetic Maelstrom AoE by 10 feet.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telekinetic Assault', '<div class="Sprite Telekinesis_TelekineticAssault"></div>&nbsp;Telekinetic Assault', 4, 15, pow++, 3, 'Telekinesis, 100 foot Ranged Single Target Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target.  This damage is increased by 4% per stack of Ego Leech.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Explosive Potential', 'Explosive Potential', 2, null, 'Deals a lesser amount of damage to targets naer your primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lance Rain', '<div class="Sprite Telekinesis_TelekineticLance"></div>&nbsp;Lance Rain', 4, 15, pow++, 3, 'Telekinesis, 100 foot Ranged 15 foot Sphere AoE Damage<br /><br />Requires 5 powers from Telekinesis or 6 non-Energy Building powers from any framework.<br /><br />TAP<br />+ Single target Ego damage.<br /><br />CHARGE<br />+ Increases the damage and Energy cost of the Tap action.<br />+ This power strikes all targets in a 15 foot radius around your primary targets, and each of the following effects is duplicated on each target in range.<br />+ When fully charged, this power consumes all of your stacks of Ego Leech, causing an eruption of Telekinetic Energy that deals additional damage to your target and AoE splash damage in a 10 foot radius around your target.<br />+ When consuming Ego Leech, this power grants you the Ego Infusion Buff. The length of the Buff is increased for each stack consumed. Ego Infusion grants you stacks of Ego Leech over time.' + PowerUnlocksFrom(UNLOCK_ONSLAUGHT, 10000, "Villain Tokens"));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(4, 15, 4, "Mind Link", 0.5, 8, 0.5, 0, [30,23], 60, "Targets non-object foe (7 max)/50 foot Sphere", "Ultimate/AoE Damage/Triggered Damage", "This telepathic link allows you to share pain amongst the enemies around you by forging a psychic bond that forces them to feel the pain of others.<br /><br />MAINTAIN<br />+ A portion of any damage dealt to you or nearby foes while you maintain this power is immediately dealt as Ego damage to all targets in range, up to a maximum of your Ego x 4.<br />+ Damage from this effect causes very little threat.<br />- This effect only occurs once every half second.<br />Increasing the rank of this power increases the maximum damage dealt.<br />+ At Rank 2, this power deals a maximum of Ego x 5 damage.<br />+ At Rank 3, this power deals a maximum of Ego x 6 damage.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Aggression Inhibitor", 2, null, "All damage you take while maintaining this power is reduced by 20%.");
dataPowerAlias["Mind Link"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(4, 15, 4, "Mental Impact", 0.67, 1.83, 0, 1.83, 138, 90, "Targets foe (10 max)/100 feet/20 foot Sphere", "Ultimate/Ranged AoE Damage/Damage Resistance Debuff/Knock Down", "Deals Ego damage to foes.  Any foe damaged by this attack is Knocked Down and suffers 20% reduced damage resistance against all damage types for 12 seconds.  Gives you a atack of Ego Leech for every foe hit.  This power must be fully charged." + PowerUnlocksFrom("Cybernetic Lockbox"), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Leave a Mark", 1, null, "+ Applies a large threat over time effect to your target.<br />+ This effect stacks with the Challenge! effect.");
dataPowerAlias["Mental Impact"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(4, 15, 4, "Ego Blade Pandemonium", 1, 8, 1, 0, [34,22], 60, "Affects foe (10 max)/10 foot Sphere", "Ultimate/Melee AoE Damage", "Deals Ego damage to targets every 1 sec.  Your chance to critically hit with this power is increased by 5% per stack of Ego Leech." + PowerUnlocksFrom("Alien Invader Lockbox"), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Leave a Mark", 1, null, "+ Applies a large threat over time effect to your target.<br />+ This effect stacks with the Challenge! effect.");
dataPower[dataPower.length-1].insertAdvantage("Buzzsaw", 1, null, "Snares your targets, reducing their movement speed by 100% for 16 sec.");
dataPowerAlias["Ego Blade Pandemonium"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(4, 15, 4, "Master of the Mind", 1, 0, 0, 0, 0, 150, "Targets Self", "Active Ultimate", "Applies Break Free damage to any Holds, Roots, or Disables affecting you and applies the following effects for 15 seconds:<br /><br />+ 125% increased resistance to Hold and Knock effects.<br />+ 125% increased resistance to all damage.<br />+ Increased critical strike chance for each stack of Ego Leech.<br />+ 1 stack of Ego Leech every sec." + dataPowerAlias["AUCD"].tip, Power.TYPE_NORMAL, true);
dataPowerAlias["Master of the Mind"] = new PowerAlias(dataPower[dataPower.length-1]);

//------------------------------------------------------------------------------
// Power Framework: Telepathy
//------------------------------------------------------------------------------

dataRequireGroup['mentalist'].push(16);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Psi Lash', '<div class="Sprite Telepathy_PsiLash"></div>&nbsp;Psi Lash', 4, 16, pow++, -1, 'Telepathy, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Assault your foe with this psychic attack, damaging their body as you ready yourself for greater attacks.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Psychic Reverberations', 'Psychic Reverberations', 2, null, 'Psi Lash has a chance to Buff your Ego damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Blast', '<div class="Sprite Telepathy_EgoBlast"></div>&nbsp;Ego Blast', 4, 16, pow++, 0, 'Telepathy, 100 foot Ranged Single Target Damage and Disorient (Blast)<br /><br />Ego Blast assaults your foe\\\'s mind.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mind Opener', 'Mind Opener', 2, null, 'Damage dealt by Ego Blast is increased 30% while you are affected by Telepathic Reverberation.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Rude Awakening', 'Rude Awakening', 1, null, 'Your mental assault is easier to perform on Sleeping targets, causing Ego Blast to deal 15% more damage to them.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mind Break', '<div class="Sprite Telepathy_MindBreak"></div>&nbsp;Mind Break', 4, 16, pow++, 0, 'Telepathy, 100 foot Ranged Single Target Damage and Detonate (Blast)<br /><br />You shatter your foe\\\'s psyche.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow of Doubt', '<div class="Sprite Telepathy_ShadowOfDoubt"></div>&nbsp;Shadow of Doubt', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 10 foot Sphere AoE DoT and Debuff<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You plant doubts in your target\\\'s mind, weakening its mental state.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Malaise', 'Malaise', 2, null, 'Target suffers -15% to their power recharge speed for 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Sprites', '<div class="Sprite Telepathy_EgoSprites"></div>&nbsp;Ego Sprites', 4, 16, pow++, 1, 'Telepathy, 25 foot Sphere PBAoE DoT<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />This ability unleashes sprites composed of psychic energy to assault and harass your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Slave Mentality', 'Slave Mentality', 2, null, 'Ego Sprites will return to you after damaging the enemy and heal you for a short time. This only occurs if the sprites dealt their full amount of damage. You can only have a maximum of 5 stacks of this heal at one time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mental Leech', '<div class="Sprite Telepathy_MentalLeech"></div>&nbsp;Mental Leech', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 20 foot Sphere AoE DoT and Debuff<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You place a heavy burden on your foe\\\'s mind, draining them of willpower.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mental Weakness', 'Mental Weakness', 2, null, 'Increases the time it takes for foes to charge powers by 15%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Placate', '<div class="Sprite Telepathy_EgoPlacate"></div>&nbsp;Ego Placate', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged Single Target Placate<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You are able to subtly convince the target that you are not a threat, never mind that you just beat up a nearby group of their friends.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Svengali\'s Guile', 'Svengali\'s Guile', 2, null, 'Partially refreshes the duration of your Stress, Dependency, and Regret.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Sleep', '<div class="Sprite Telepathy_EgoSleep"></div>&nbsp;Ego Sleep', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged 0-15 foot Sphere AoE Sleep<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />The strength of your mind forces slumber over your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Plagued by Nightmares', 'Plagued by Nightmares', 2, null, 'Ego Sleep plagues the target with terrifying nightmares while asleep, affecting them with Fear when they wake up.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Empathic Healing', '<div class="Sprite Telepathy_EmpathicHealing"></div>&nbsp;Empathic Healing', 4, 16, pow++, 1, 'Telepathy, 50 foot Ranged Single Target Heal<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />Using the power of your trained mind you are able to speed the healing of wounds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Empathic Amplification', 'Empathic Amplification', 2, null, 'When you heal someone else with Empathic Healing, you transfer the pain to yourself. You can then redirect this pain through your own attacks for a short period of time. Failing to redirect the pain quickly enough will cause you to take damage.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Congress of Selves', '<div class="Sprite Telepathy_CongressOfSelves"></div>&nbsp;Congress of Selves', 4, 16, pow++, 1, 'Telepathy, Slotted Hybrid Passive - Energy Form<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />+ Can be used in any passive slot.<br />+ Your Ego damage over time effects deal increased damage and ignore 10% damage resistance.<br />+ Increases your Ego damage resistance and restores energy whenever you take Ego damage.<br />+ Grants a power cost discount to all Mentalist powers.<br />+ Increases your Aggression Stealth and reduces your Threat Generation.<br />+ Counts as an Energy Form.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Conditioning', 'Conditioning', 2, null, 'Congress of Selves allows control powers to apply Trauma.' + dataPowerAlias['Trauma'].tip));

dataPower[dataPower.length] = dataPowerAlias["Ego Form"].replicate(4, 16);
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = dataPowerAlias["Manipulator"].replicate(4, 16);
dataRequireGroupPower[dataPower.length-1] = 'mentalist';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Telepathic Reverberation', '<div class="Sprite Telepathy_TelepathicReverberation"></div>&nbsp;Telepathic Reverberation', 4, 16, pow++, 1, 'Telepathy, Energy Unlock (Presence, <i>Recovery</i>)<br /><br />Requires 1 power from Telepathy or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you Hold with a Telepathy power or whenever you damage a Held, Confused, or Disoriented target with your Telepathy attacks.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Presence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mind Lock', '<div class="Sprite Telepathy_MindLock"></div>&nbsp;Mind Lock', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Confuse and Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Flashing lights, spooky voices, a barrage of twisting images -- one of your mental assaults will certainly confuse your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Befuddling Rage', 'Befuddling Rage', 2, null, 'Confused enemies have their combat stats increased for the duration of the confuse effect.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Psychic Vortex', '<div class="Sprite Telepathy_PsychicVortex"></div>&nbsp;Psychic Vortex', 4, 16, pow++, 2, 'Telepathy, 50 foot Ranged Single Target Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Creates a feedback loop in the minds of your enemies, causing them to take damage whenever they attempt to harm another.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Single Minded', 'Single Minded', 2, null, 'Targets who are close to the Psychic Vortex have a chance to be Stunned.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mind Control', '<div class="Sprite Telepathy_MindControl"></div>&nbsp;Mind Control', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Debuff<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You are able to bend weak minded individuals to server you.<br /><br /><b>This power can be unlocked by purchasing the Psionic Hair and Mind Control Power item from the Zen Store.</b>');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bewilder', 'Bewilder', 2, null, 'Mind Control now Disorients high ranking foes.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Summon Nightmare', '<div class="Sprite Telepathy_SummonNightmare"></div>&nbsp;Summon Nightmare', 4, 16, pow++, 2, 'Telepathy, Uncontrolled Pet<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You manifest a psychokinetic nightmare that assaults your target with haunting and brutal attacks.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Night Terror', 'Night Terror', 2, null, 'Nightmare entities have their life span increased. They will now attack the target until it is defeated instead of disappearing partway through the fight.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Psionic Healing', '<div class="Sprite Telepathy_PsionicHealing"></div>&nbsp;Psionic Healing', 4, 16, pow++, 2, 'Telepathy, 100 foot Ranged Single Target Heal<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />You are able to use your mental training to heal yourself and your allies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Psionic Emanation', 'Psionic Emanation', 2, null, 'Grants your Psionic Healing a chance to perform an AoE heal around the target.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mind Drain', '<div class="Sprite Telepathy_MindDrain"></div>&nbsp;Mind Drain', 4, 16, pow++, 2, 'Telepathy, 50 foot Ranged Single Target Damage and Self Heal<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />Deals Ego damage to the target, healing you as you deal damage.' + PowerUnlocksFrom(UNLOCK_RECOGNITION, 350, "SCR"));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Deplete', 'Deplete', 2, null, 'The heal component of your Mind Drain becomes an AoE (15 foot radius, max of 5 targets) centered on you that heals nearby friends for half as much as it heals you. When using Mind Drain on a target affected by Dependency, the AoE heals for as much as it heals you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mind Wipe', '<div class="Sprite Telepathy_MindWipe"></div>&nbsp;Mind Wipe', 4, 16, pow++, 2, 'Telepathy, 50 foot Single Target Threat Wipe<br /><br />Requires 3 powers from Telepathy or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Free Your Mind!', 'Free Your Mind!', 2, null, 'Helps allies within 15 feet of your primary target break free from holds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mental Storm', '<div class="Sprite Telepathy_MentalStorm"></div>&nbsp;Mental Storm', 4, 16, pow++, 3, 'Telepathy, 50 foot Ranged 10 foot Sphere AoE DoT and Paralyze<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />You rend your target\\\'s mind with a storm of mental energy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ego Storm', '<div class="Sprite Telepathy_EgoStorm"></div>&nbsp;Ego Storm', 4, 16, pow++, 3, 'Telepathy, 25 foot Sphere PBAoE Ranged Damage and Hold<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />Summon a storm of mental energy and press it into action, damaging the foes daring enough to come close to you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Malevolent Manifestation', 'Malevolent Manifestation', 2, null, 'Your Ego Storm becomes its own entity and will blast your enemies without your assistance after being created. This advantage increases the cost of Ego Storm by 20%, and will cause Ego Storm to be incapable of getting a Critical Hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Collective Will', '<div class="Sprite Telepathy_CollectiveWill"></div>&nbsp;Collective Will', 4, 16, pow++, 3, 'Telepathy, 50 foot Sphere AoE Summon Damage<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />You draw on the will of the universe to summon entities which will wear down your enemy\\\'s resistance to your power.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Consume Will', 'Consume Will', 2, null, 'Causes the entities summoned by Collective Will to Debuff their targets, lowering their resistance to Ego damage by 10%.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mindful Reinforcement', '<div class="Sprite Telepathy_MindfulReinforcement"></div>&nbsp;Mindful Reinforcement', 4, 16, pow++, 3, 'Telepathy, 50 foot Ranged Single Friend Shield and Heal<br /><br />Requires 5 powers from Telepathy or 6 non-Energy Building powers from any framework.<br /><br />Activating this power is a true statement of mind over matter, granting your target a damage absorbing shield, which can heal your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Revitalizing Boost', 'Revitalizing Boost', 2, null, 'If your Mindful Reinforcement shield absorbs the full amount it restores Energy to you.'));

dataPower[dataPower.length] = dataPowerAlias["Mind Link"].replicate(4, 16);
dataPower[dataPower.length] = dataPowerAlias["Mental Impact"].replicate(4, 16);
dataPower[dataPower.length] = dataPowerAlias["Ego Blade Pandemonium"].replicate(4, 16);
dataPower[dataPower.length] = dataPowerAlias["Master of the Mind"].replicate(4, 16);

//------------------------------------------------------------------------------
// Power Set: Brick
//------------------------------------------------------------------------------

dataRequireGroup['brick'] = [];

dataPowerAlias['Rampant'] = new PowerAlias(new PowerAdvantage("Rampant", 2, null, "This power now applies Reckless, which gives you bonus Offense and Knock resistance.  Reckless can stack up to 3 times and each stack lasts 12 seconds."));
dataPowerAlias['Vortex Technique'] = new PowerAlias(new PowerAdvantage("Vortex Technique", 2, null, "+ This power becomes a knock toward instead of a knock away.<br />+ Fully maintaining this power applies or refreshes Furious."));
dataPowerAlias['Giant Growth'] = new PowerAlias(new PowerAdvantage("Giant Growth", 0, null, "Purchasing this advantage adds a growth effect to Enraged."));

//------------------------------------------------------------------------------
// Power Framework: Heavy Weapon
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(17);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bludgeon', '<div class="Sprite HeavyWeapon_Bludgeon"></div>&nbsp;Bludgeon', 5, 17, pow++, -1, 'Heavy Weapon, Energy Builder, 10 foot Melee Single Target Damage<br /><br />You swing your mighty weapon in an overhand arc, crushing foes in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Until Morale Improves', 'Until Morale Improves', 2, null, 'All attacks of this combo gain a 15% chance to Disorient the primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Cleave', '<div class="Sprite HeavyWeapon_Cleave"></div>&nbsp;Cleave', 5, 17, pow++, 0, 'Heavy Weapon, 10 foot Melee 120 degree Cone AoE Damage and Enrage (Combo)<br /><br />You assault your foes with a series of powerful horizontal strikes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Defensive Stance', 'Defensive Stance', 2, null, 'Finishing this combo against a Disoriented target will apply/refresh Defiance on yourself.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Rampant'].name, dataPowerAlias['Rampant'].desc, 2, null, dataPowerAlias['Rampant'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Eruption', '<div class="Sprite HeavyWeapon_Eruption"></div>&nbsp;Eruption', 5, 17, pow++, 1, 'Heavy Weapon, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />A strong underhanded swing that Knocks your foe into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Magma Burst', 'Magma Burst', 2, null, 'Causes a burst of magma to explode on your target, dealing Fire damage and applying Clinging Flames to all enemies within 10 feet of your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Brute Strike', '<div class="Sprite HeavyWeapon_BruteStrike"></div>&nbsp;Brute Strike', 5, 17, pow++, 1, 'Heavy Weapon, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />A deceptive swing that quickly brings the butt of your weapon up to catch your opponent off-guard.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(5, 17, 1, "Defiance", 0, 0, 0, 0, 0, 0, "Passive (Defense)", "Slotted Defensive Passive", "Allows you to build stacks of Defiant! when hit.<br /><br />+ Each stack of Defiant! increases your damage resistance.<br />+ Each time you take damage, you recover energy.<br />+ Stacks up to 6 times and lasts 20 seconds.<br />- Scales specifically with Constitution instead of super stats in general.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Force of Will", 2, null, "Adds increasing Knock Back and Stun resistance as your Health gets lower.");
dataPowerAlias["Defiance"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = new Power(5, 17, 1, "Unstoppable", 0, 0, 0, 0, 0, 0, "Passive (Offense)", "Slotted Offensive Passive", "+ Increases your Melee and Bleed damage.<br />+ Increases other damage by a lesser amount.<br />+ Increases your Knock resistance.<br />+ Each time you take damage, a small, flat amount is absorbed.<br />+ Generates energy each time you Knock a target.  This energy scales with Recovery.", Power.TYPE_NORMAL, true);
dataPowerAlias["Unstoppable"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Guard', '<div class="Sprite HeavyWeapon_Guard"></div>&nbsp;Guard', 5, 17, pow++, 1, 'Heavy Weapon, Block<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Damage taken while blocking applies Retaliation.  Retaliation increases the damage of your next attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Punitive Pummeling', 'Punitive Pummeling', 2, null, 'Attacks against you have a chance of reflecting their energy outwards. Every incoming attack that you block with Guard has a 20% change of Knocking Back all nearby enemies. This effect can occur at most once every 10 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Decimate', '<div class="Sprite HeavyWeapon_Decimate"></div>&nbsp;Decimate', 5, 17, pow++, 1, 'Heavy Weapon, 60 foot Lunge, Snare, and Disorient<br /><br />Requires 1 power from Heavy Weapon or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Disoriented.<br /><br />' + dataPowerAlias["Disorient"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Restraining Order', 'Restraining Order', 2, null, 'When lunging from more than 20 feet away, you temporarily cripple the target\\\'s legs, Rooting them in place for a short time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(5, 17, 1, "Enrage", 1, 2.5, 0, 2.5, 20, 0, "Form (Strength)", "Buff/Form/Enraged!", "Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you Knock an enemy.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Endorphin Rush", 2, null, "Activating Enrage will heal you over time. The duration of this heal is based on the number of stacks of Defiant on you. The amount healed is based on your Constitution.");
dataPower[dataPower.length-1].advantageList.push(dataPowerAlias["Giant Growth"].replicate());
dataPowerAlias["Enrage"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Arc of Ruin', '<div class="Sprite HeavyWeapon_ArcOfRuin"></div>&nbsp;Arc of Ruin', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 120 degree Cone AoE Damage and Disorient<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />You wind up for a massive swing, capable of setting your targets off-balance.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'No Quarter', 'No Quarter', 2, null, 'Your strike temporarily reduces your target\\\'s resistance to all Physical damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Wildfire', 'Wildfire', 2, null, '+ Refreshes all Clinging Flames on your targets.<br />+ Knocks Down all targets.  This can only occur once every 3 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Skullcrusher', '<div class="Sprite HeavyWeapon_Skullcrusher"></div>&nbsp;Skullcrusher', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 3 foot Cylinder AoE Damage and Knock Down<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />You raise your weapon up behind your back, devoting all of your strength to a fierce overhead attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Put Them Down', 'Put Them Down', 1, null, 'You are able to take advantage of your foe\\\'s weakened state, allowing your Skullcrusher to deal an additional 15% damage to Disoriented targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Earth Splitter', '<div class="Sprite HeavyWeapon_EarthSplitter"></div>&nbsp;Earth Splitter', 5, 17, pow++, 2, 'Heavy Weapon, 10 foot Melee 5 foot Cylinder AoE Damage and Knock Up<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />A powerful blow that channels energy toward your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bend the Earth', 'Bend the Earth', 2, null, 'Targets further than 25 feet from you are Knocked Towards you instead of up.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(5, 17, 2, "Aggressor", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Offense", "Grants a bonus to damage strength, Strength, and Constitution for 12 sec as well as 1 stack of Enraged! if you have Enrage active.<br /><br />Applies Break Free damage to any Holds, Roots, and Disables affecting you." + dataPowerAlias["AOCD"].tip, Power.TYPE_NORMAL, true);
dataPowerAlias["Aggressor"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vicious Descent', '<div class="Sprite HeavyWeapon_ViciousDescent"></div>&nbsp;Vicious Descent', 5, 17, pow++, 2, 'Heavy Weapon, 60 foot Lunge 10 foot Sphere PBAoE Melee Damage<br /><br />Requires 3 powers from Heavy Weapon or 4 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing and Fire damage and Snaring nearby foes for 13 seconds.  Applies Reckless to you, giving you +15 Offense and +33% Knock Resistance for 12 sec, stacking up to 3 times.<br /><br />Has a much longer cooldown than other lunge powers.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Relentless', 'Relentless', 2, null, 'Affected targets are Knocked Down.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Annihilate', '<div class="Sprite HeavyWeapon_Annihilate"></div>&nbsp;Annihilate', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />A heavy backhanded strike that will send your foe flying away from you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Scorching Blade', 'Scorching Blade', 2, null, 'Your Annihilate deals 30% increased damage against targets affected by Clinging Flames.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Skewer', '<div class="Sprite HeavyWeapon_Skewer"></div>&nbsp;Skewer', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Melee 3 foot Cylinder AoE Damage and Enrage<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />You step back and put all of your weight into a powerful forward thrust.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Follow Through', 'Follow Through', 1, null, 'You plant your feet firmly on the ground, bracing yourself for the attack, increasing the Charge damage of Skewer by 25%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Initiative', 'Initiative', 1, null, 'You let loose with a quick burst of strength, increasing the Tap (and base) damage of Skewer by 15%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Brimstone', '<div class="Sprite HeavyWeapon_Brimstone"></div>&nbsp;Brimstone', 5, 17, pow++, 3, 'Heavy Weapon, 10 foot Sphere PBAoE Melee Damage and Knock Down<br /><br />Requires 5 powers from Heavy Weapon or 6 non-Energy Building powers from any framework.<br /><br />You raise your weapon to the sky, charging it with energy that you strike down with, damaging nearby foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aftershock', 'Aftershock', 2, null, 'Fully charing Brimstone will now leave a patch of fire on the ground, burning nearby foes. Only 1 patch may exist at a time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(5, 17, 4, "Unleashed Rage", 1, 0, 0, 0, 112, 60, "Affects foe (10 max)/15 foot Sphere", "Ultimate/Melee AoE Damage/Knock Down/Fear", "Unleashed Rage lets forth a deafening shout, terrifying and damaging nearby foes.<br /><br />CLICK<br />+ Deals Sonic damage to nearby targets.<br />+ The damage dealt by this power is considered melee damage for effects such as the Brawler Role. Note that the damage is not modified by Strength, however.<br />+ Knocks Down affected targets.<br />+ Fears affected targets, causing the enemy to cower in your presence and reducing the damage they deal.<br />+ Deals additional damage for each stack of Enrage you have.", Power.TYPE_NORMAL, true);
dataPowerAlias["Unleashed Rage"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(5, 17, 4, "Power Chord", 0.5, 3, 0.3, 0, [19,19], 90, "Affects non-object foe (10 max)/25 foot Sphere", "Ultimate/Ranged AoE Damage/Knock Back/Disorient", "Blow your enemies away with the awesome power of music!<br />+ Deals Sonic damage to nearby foes.<br />+ As you maintain this power, you gain a damage boost.<br />+ After you stop maintaining, affected targets are Knocked Back.<br />+ Disorients affected targets, causing them to move slower and deal less damage." + PowerUnlocksFrom("The Rockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Rock Concert", 2, null, "Power Chord no longer gives you the Rocking Out buff.  Instead, Power Chord now applied Exhilarate to nearby allies.  Exhilarate increases their damage by a lesser amount and can stack up to 10 times.  It also gives them energy.");
dataPowerAlias["Power Chord"] = new PowerAlias(dataPower[dataPower.length-1]);

//------------------------------------------------------------------------------
// Power Framework: Earth
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(18);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wield Earth', '<div class="Sprite Earth_WieldEarth"></div>&nbsp;Wield Earth', 5, 18, pow++, -1, 'Earth, Energy Builder, 10 foot Melee 50 foot Ranged Single Target Damage<br /><br />Bend the nearby stone to assault foes at both close and long range by smashing them with shards of rock.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Faltering Strikes', 'Faltering Strikes', 2, null, 'All Wield Earth attacks now have a chance to Stagger your foe, instead of just the opening attack. ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Stone Shot', '<div class="Sprite Earth_StoneShot"></div>&nbsp;Stone Shot', 5, 18, pow++, 0, 'Earth, 100 foot Ranged 0-10 foot Sphere AoE Damage and Stagger (Blast)<br /><br />After pressing nearby earth into a dense ball you launch it at your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Shard Burst', 'Shard Burst', 2, null, 'Increases the Crushing AoE damage dealt by Stone Shot by 50% and will now Stagger all targets on a full charge instead of just the selected target. ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Onslaught', '<div class="Sprite Earth_Onslaught"></div>&nbsp;Onslaught', 5, 18, pow++, 1, 'Earth, 10 foot Melee 120 degree Cone AoE Damage<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />You unleash a hail of stones to crush your foes in a flurry of shale and earth.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Excessive Force', 'Excessive Force', 2, null, 'When your Onslaught applies Stagger, it now deals double damage and Knocks your foe down.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Tremor', '<div class="Sprite Earth_Tremor"></div>&nbsp;Tremor', 5, 18, pow++, 1, 'Earth, 50 foot Ranged 15 foot Sphere AoE Damage and Knock<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />Cause a burst of earth to erupt under enemy targets, launching them into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Rupture', 'Rupture', 2, null, 'If fully charged and your primary target is Staggered, Tremor applies a stack of Stagger to all targets hit. ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Earth Form', '<div class="Sprite Earth_EarthForm"></div>&nbsp;Earth Form', 5, 18, pow++, 1, 'Earth, Offensive Passive - Energy Form<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Physical damage.<br />+ Increases your Crushing damage resistance.<br />+ Increases your Physical damage resistance by a lesser amount.<br />+ Reduces the movement speed of foes within 10/20/30 feet of you by 30/20/10%, based on distance.<br />+ Recovers Energy when you take Crushing damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Defiance"].replicate(5, 18);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = dataPowerAlias["Unstoppable"].replicate(5, 18);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Stone Shroud', '<div class="Sprite Earth_StoneShroud"></div>&nbsp;Stone Shroud', 5, 18, pow++, 1, 'Earth, Block<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Literally the worst block enhancer in the game by itself.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Enrage"].replicate(5, 18);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Land Slide', '<div class="Sprite Earth_LandSlide"></div>&nbsp;Land Slide', 5, 18, pow++, 1, 'Earth, 60 foot Lunge, Snare, and Disorient<br /><br />Requires 1 power from Earth or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Staggered. ' + dataPowerAlias["Stagger"].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Rock Solid', 'Rock Solid', 2, null, 'If used against a Staggered target, deals damage to foes within 10 feet of your target and all foes hit are Knocked Up. This consumes your stacks of Stagger on your target. Damage dealt and Knock severity are based on the number of stacks consumed.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Upheaval', '<div class="Sprite Earth_Upheaval"></div>&nbsp;Upheaval', 5, 18, pow++, 2, 'Earth, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />You swing with the weight of the earth behind you, launching your foe into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Expansive Terrain', 'Expansive Terrain', 2, null, 'Increases the range of this power to 50 feet. Hitting a Staggered target more than 10 feet away from you will Knock them to you instead of away from you. Upheaval becoming a Ranged power causes it to lose its Melee Strength damage bonus and increases its Energy Cost.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Cave In', '<div class="Sprite Earth_CaveIn"></div>&nbsp;Cave In', 5, 18, pow++, 2, 'Earth, 50 foot Ranged Single Target Damage and Stun<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Summon massive rocks to crush your enemy in a deluge of stone.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Aggressive Gravitation', 'Aggressive Gravitation', 2, null, 'If fully charged and used against a Staggered target, your stacks of Stagger on the target are consumed and turned into stacks of Enraged on you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Quicksand', '<div class="Sprite Earth_Quicksand"></div>&nbsp;Quicksand', 5, 18, pow++, 2, 'Earth, 10-25 foot Sphere PBAoE Ranged Damage and Slow<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Cause the earth around you to become a quagmire that damages foes as it slowly seeps outward.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Repulsing Waves', 'Repulsing Waves', 2, null, 'Quicksand will now Repel foes away from you instead of pulling them towards you. (Will not push them out of maximum range of the power.) Quicksand also gains a chance to Stagger for all foes hit. ' + dataPowerAlias["Stagger"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Seismic Smash', '<div class="Sprite Earth_SeismicSmash"></div>&nbsp;Seismic Smash', 5, 18, pow++, 2, 'Earth, 25 foot Lunge 15 foot Sphere PBAoE Ranged Damage<br /><br />Requires 3 powers from Earth or 4 non-Energy Building powers from any framework.<br /><br />Crush your enemy between a rock and a hard place as you blast them through a stone wall.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Massive Attack', 'Massive Attack', 2, null, 'Removes AoE component of the power, causing it to deal 60% more damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Aggressor"].replicate(5, 18);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Fissure', '<div class="Sprite Earth_Fissure"></div>&nbsp;Fissure', 5, 18, pow++, 3, 'Earth, 50 foot Ranged 15 foot Sphere AoE Damage and DoT<br /><br />Requires 5 powers from Earth or 6 non-Energy Building powers from any framework.<br /><br />Cause a Fissure in the earth to form below your targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Reconstruct', 'Reconstruct', 2, null, 'Standing in your Fissure will heal you over time. If you are actively using Stone Shroud, this effect is doubled.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Fault Line', '<div class="Sprite Earth_FaultLine"></div>&nbsp;Fault Line', 5, 18, pow++, 3, 'Earth, 50 foot Ranged 5 foot Cylinder AoE Damage and Knock Up<br /><br />Requires 5 powers from Earth or 6 non-Energy Building powers from any framework.<br /><br />Strike the earth with a mighty blow, causing a rupture that launches enemies into the air.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Compound Fracture', 'Compound Fracture', 2, null, 'If fully charged, targets will become Rooted instead of Knocked Up. When the Root expires, the target will be Knocked Up.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Unleashed Rage"].replicate(5, 18);
dataPower[dataPower.length] = dataPowerAlias["Power Chord"].replicate(5, 18);

//------------------------------------------------------------------------------
// Power Framework: Might
//------------------------------------------------------------------------------

dataRequireGroup['brick'].push(19);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Clobber', '<div class="Sprite Might_Clobber"></div>&nbsp;Clobber', 5, 19, pow++, -1, 'Might, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Clobber lashes out with your fists landing punishing blows on your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Onslaught', 'Onslaught', 2, null, 'Adds a 15% chance to grant you a stack of Enrage if you are not already Enraged. If you are Enraged it will instead refresh your stacks of Enrage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'It\'s That Time', 'It\'s That Time', 2, null, 'All attacks of this combo gain a 15% chance to Disorient the primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Beatdown', '<div class="Sprite Might_Beatdown"></div>&nbsp;Beatdown', 5, 19, pow++, 0, 'Might, 10 foot Melee Single Target Damage and Stagger (Combo)<br /><br />Beatdown delivers blows powerful enough to unbalance anyone on the receiving end.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Blindside Blow', 'Blindside Blow', 3, null, 'Causes your Beatdown attack to deal 50% additional damage to Snared or Rooted enemies.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Defensive Combo', '<div class="Sprite Might_DefensiveCombo"></div>&nbsp;Defensive Combo', 5, 19, pow++, 1, 'Might, 10 foot Melee Single Target Damage and Threat and Buff<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Defensive Combo allows you to deliver swift blows to your enemy without lowering your guard.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Surge of Strength', 'Surge of Strength', 2, null, 'Defensive Combo attacks now apply or refresh the Defiant Buff on each attack. Defensive Combo will never apply more than 1 stack of Defiant, but it will refresh any number of existing applications of Defiant.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mighty Kick', '<div class="Sprite Might_MightyKick"></div>&nbsp;Mighty Kick', 5, 19, pow++, 1, 'Might, 10 foot Melee Single Target Damage<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />A powerful kick that knocks your foe away.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Madness?!', 'Madness?!', 2, null, 'Hitting a foe with fully charged Mighty Kick will now add or refresh the Defiant Buff.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Head Butt', '<div class="Sprite Might_HeadButt"></div>&nbsp;Head Butt', 5, 19, pow++, 1, 'Might, Melee Single Target Damage and Stun<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Crushing damage and Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Concussion', 'Concussion', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Hurl', '<div class="Sprite Might_Hurl"></div>&nbsp;Hurl', 5, 19, pow++, 1, 'Might, 100 foot Ranged Single Target Damage and Snare<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Hurl allows you to tear a chunk out of the ground and fling it at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Rubble Trouble', 'Rubble Trouble', 2, null, 'Causes your Hurl attack to hit additional targets around your primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Strong Arm'].name, dataPowerAlias['Strong Arm'].desc, 1, null, dataPowerAlias['Strong Arm'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Iron Chain', '<div class="Sprite Might_IronChain"></div>&nbsp;Iron Chain', 5, 19, pow++, 1, 'Might, 50 foot Ranged Single Target Damage<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Chain whips a length of heavy chain at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Demolishion', 'Demolishion', 2, null, 'Finishing the Iron Chain combo applies Demolish to your primary target.  Demolish increases all Physical damage they receive by a small amount and all Crushing damage they receive by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Rampant'].name, dataPowerAlias['Rampant'].desc, 2, null, dataPowerAlias['Rampant'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Iron Lariat', '<div class="Sprite Might_IronLariat"></div>&nbsp;Iron Lariat', 5, 19, pow++, 1, 'Might, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Lariat lashes out at your enemy using a heavy chain as a whip.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Intimidate', 'Intimidate', 2, null, 'Iron Lariat now applies Fear to your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Red Hot', 'Red Hot', 2, null, 'Iron Lariat now applies Clinging Flames to the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Roomsweeper', '<div class="Sprite Might_Roomsweeper"></div>&nbsp;Roomsweeper', 5, 19, pow++, 1, 'Might, 10 foot Melee 120 degree Cone AoE Damage and Knock<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Roomsweeper swings your fist in a powerful arc Knocking Away any enemies in its path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Concussive Blow', 'Concussive Blow', 2, null, 'Adds a short Stun to your Roomsweeper. This cannot occur more than once every 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Iron Cyclone', '<div class="Sprite Might_IronCyclone"></div>&nbsp;Iron Cyclone', 5, 19, pow++, 1, 'Might, 25 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Iron Cyclone swings a heavy chain around you, lashing out at any enemies that come within its path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Defiance"].replicate(5, 19);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = dataPowerAlias["Unstoppable"].replicate(5, 19);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Retaliation', '<div class="Sprite Might_Retaliation"></div>&nbsp;Retaliation', 5, 19, pow++, 1, 'Might, Block<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Featurse:<br />+ Damage taken while blocking applies Retaliation.  Retaliation increases the damage of your next attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Punitive Pummeling', 'Punitive Pummeling', 2, null, 'Attacks against you have a chance of reflecting their energy outwards. Every incoming attack that you block with retaliation has a 20% chance of Knocking Back all nearby enemies. This effect can occur at most once every 10 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mighty Leap', '<div class="Sprite Might_MightyLeap"></div>&nbsp;Mighty Leap', 5, 19, pow++, 1, 'Might, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Might or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Crushing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Stunned briefly.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bull Rush', 'Bull Rush', 2, null, 'Adds a Knock Back and Snare effect to your Mighty Leap attack that affects any enemies near your primary target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Enrage"].replicate(5, 19);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Uppercut', '<div class="Sprite Might_Uppercut"></div>&nbsp;Uppercut', 5, 19, pow++, 2, 'Might, 10 foot Melee Single Target Damage and Knock Up<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Uppercut lands a blow under the chin of your enemy with enough power to launch them into the sky.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Head Trauma', 'Head Trauma', 2, null, 'Uppercut leaves the target Disoriented, and makes focusing painful. If the target charges up powers while Disoriented, they will be Stunned. Can only occur once every 20 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Demolish', '<div class="Sprite Might_Demolish"></div>&nbsp;Demolish', 5, 19, pow++, 2, 'Might, 10 foot Melee Single Target Damage and Debuff<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Demolish is a two handed strike delivered with enough force that the enemy is still recovering when you execute your next attack.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Below the Belt', 'Below the Belt', 2, null, 'Demolish now Knocks Down and Snares foes.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Thunderclap', '<div class="Sprite Might_Thunderclap"></div>&nbsp;Thunderclap', 5, 19, pow++, 2, 'Might, 10 foot Sphere PBAoE Melee Damage and Stun<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Thunderclap slams your hands together to generate a Stunning shockwave.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Collateral Damage', 'Collateral Damage', 2, null, 'Increases the range of Thunderclap to 15 feet. The damage within 10 feet remains Melee Crushing damage. The damage on the outer 5 feet is Ranged Sonic damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Hyper Voice', '<div class="Sprite Might_HyperVoice"></div>&nbsp;Hyper Voice', 5, 19, pow++, 2, 'Might, 50 foot 60 degree Cone - Maintain<br /><br />Requires 3 powers from Might or 4 non-Energy Building powers from any framework.<br /><br />Your deafening scream deals Sonic damage, repels foes away, and Knocks Down foes on a full maintain.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Deafening', 'Deafening', 2, null, 'Fully maintaining Hyper voices Deafens your foes, causing them to take 18% increased Sonic damage for the next 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Rattle', 'Rattle', 2, null, 'Hyper voices now has a 20% chance to Disorient foes.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Aggressor"].replicate(5, 19);
dataRequireGroupPower[dataPower.length-1] = 'brick';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Haymaker', '<div class="Sprite Might_Haymaker"></div>&nbsp;Haymaker', 5, 19, pow++, 3, 'Might, 10 foot Melee Single Target Damage and Knock Back<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Haymaker is a vicious windup punch that sends your enemy flying.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Nullifying Punch', 'Nullifying Punch', 2, null, 'Applies or refreshes Trama on your target. Trama ends any healing over time effects on your target, and causes them to receive only 50% benefit from any other incoming heals.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Havoc Stomp', '<div class="Sprite Might_HavocStomp"></div>&nbsp;Havoc Stomp', 5, 19, pow++, 3, 'Might, 10 foot Sphere PBAoE Melee Damage and Knock<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Havoc Stomp slams your feet into the ground sending a shockwave surging out around you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Cry Havoc', 'Cry Havoc', 2, null, 'Targets Knocked Back by Havoc Stomp are also affected by Fear.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shockwave', '<div class="Sprite Might_Shockwave"></div>&nbsp;Shockwave', 5, 19, pow++, 3, 'Might, 50 foot Ranged 90 degree Cone AoE Damage and Snare<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />Shockwave causes you to repeatedly pound your fists on the ground sending a shockwave into any enemies in front of you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Leg Rumbler', 'Leg Rumbler', 1, null, 'Removes travel powers from targets hit by Shockwave.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Nuclear Shockwave', '<div class="Sprite Might_Shockwave"></div>&nbsp;Nuclear Shockwave', 5, 19, pow++, 3, 'Might, 75 foot Ranged 20 foot Cylinder AoE Damage<br /><br />Requires 5 powers from Might or 6 non-Energy Building powers from any framework.<br /><br />You unleash a wave of nuclear energy, decimating foes in front of you.<br /><br />CHARGE<br />+ Deals heavy Crushing and Particle damage to targets in front of you.' + PowerUnlocksFrom(UNLOCK_ONSLAUGHT, 10000, "Villain Tokens"));
dataPower[dataPower.length-1].iconOverride = "Might_Shockwave";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Unleashed Rage"].replicate(5, 19);
dataPower[dataPower.length] = dataPowerAlias["Power Chord"].replicate(5, 19);

//------------------------------------------------------------------------------
// Power Set: Mystic
//------------------------------------------------------------------------------

dataRequireGroup['mystic'] = [];

//------------------------------------------------------------------------------
// Power Framework: Celestial
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(20);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Radiance', '<div class="Sprite Celestial_Radiance"></div>&nbsp;Radiance', 6, 20, pow++, -1, 'Celestial, Energy Builder, 50 foot Ranged Single Target Damage and Heal<br /><br />Radiance fires bolts of dimensional energy at your target, healing your friends and destroying your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Convergence', 'Convergence', 2, null, 'Radiance gains a 20% chance to chain to a secondary target. The chain will have the opposite effect: An attack will chain a heal to a nearby friend; a heal will chain an attack to a nearby enemy.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Rebuke', '<div class="Sprite Celestial_Rebuke"></div>&nbsp;Rebuke', 6, 20, pow++, 0, 'Celestial, 100 foot Ranged Single Target Damage and Heal (Blast)<br /><br />Call upon dimensional forces to judge your target, healing your friends and destroying your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Admonish', 'Admonish', 2, null, 'When fully charged, Rebuke now Stuns foes within 10 feet of the primary target (the primary target is not Stunned). This effect is active for both healing and damage forms.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Celestial Conduit', '<div class="Sprite Celestial_CelestialConduit"></div>&nbsp;Celestial Conduit', 6, 20, pow++, 1, 'Celestial, 50 foot Ranged Single Target Damage and Heal<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Deals Dimensional damage to an enemy target or heals a friendly target every 0.5 sec.  If used on a target affected by Illuminated or Illumination, it will chain up to 3 times to additional targets.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Serenity', 'Serenity', 2, null, 'A portion of the energy you use to cast Celestial Conduit is returned if your target is affected by the heal component of Mend. The energy returned scales slightly with your Constitution.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vengeance', '<div class="Sprite Celestial_Vengeance"></div>&nbsp;Vengeance', 6, 20, pow++, 1, 'Celestial, 50 foot Ranged 8-15 foot Sphere AoE Damage<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Vengeance causes a concentrated burst of dimensional energy to slam into your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Redemption Denied', 'Redemption Denied', 2, null, 'On a full charge, Vengeance now Paralyzes your primary target and Stuns any other affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Iniquity', '<div class="Sprite Celestial_Iniquity"></div>&nbsp;Iniquity', 6, 20, pow++, 1, 'Celestial, 100 foot Ranged Single Friend Heal (Health Trasfer)<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You are the ultimate healer, transferring Health from yourself to your target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Justice', 'Justice', 2, null, 'Inquity can now target up to 5 friends in a cone in front of you. Iniquity is less effective (per target) for each target hit beyond the first.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Conviction', '<div class="Sprite Celestial_Conviction"></div>&nbsp;Conviction', 6, 20, pow++, 1, 'Celestial, Self Heal and Buff<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You are able to temporarily increase your Maximum Health.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Reverence', 'Reverence', 2, null, 'Adds a small AoE (15 foot radius, max of 5 targets) heal component to Conviction.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Imbue', '<div class="Sprite Celestial_Imbue"></div>&nbsp;Imbue', 6, 20, pow++, 1, 'Celestial, Active Offense Self Critical Chance Buff<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />You imbue your attacks with increased vigor.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Illusive', 'Illusive', 2, null, 'Activating Imbue will cause you to generate less threat for 10 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Seraphim', '<div class="Sprite Celestial_Seraphim"></div>&nbsp;Seraphim', 6, 20, pow++, 1, 'Celestial, Support Passive - Energy Form and 100 foot PBAoE Friend HoT<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Paranormal damage.<br />+ Increases your Dimensional damage resistance.<br />+ Increases your Paranormal damage by a lesser amount.<br />+ Increases the strength of your healing.<br />+ Heals you and nearby friends every 3 seconds.<br />+ Recovers Energy when you take Dimensional damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Balance', 'Balance', 2, null, 'This advantage improves the healing aura effect of your Seraphim power. While you are in combat and Seraphim is active, up to 5 enemy targets within 25 feet of you will take a small amount of Damage over Time.'));

dataPower[dataPower.length] = new Power(6, 20, 1, "Compassion", 1, 2.5, 0, 2.5, 20, 0, "Form (Presence or Recovery)", "Buff/Form/Compassion", "Gives you a stacking buff that increases your healing, as well as your ranged and melee damage to a lesser degree.<br /><br />+ You gain a stack each time you heal a target.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.", Power.TYPE_NORMAL, true);
dataPowerAlias["Compassion"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Illumination', '<div class="Sprite Celestial_Illumination"></div>&nbsp;Illumination', 6, 20, pow++, 1, 'Celestial, 15 foot sphere AoE - Heal, Enchantment, and Curse<br /><br />Requires 1 power from Celestial or 2 non-Energy Building powers from any framework.<br /><br />Illumination places healing energies around your target and those nearby, aiding your allies in their fight.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Brilliance', 'Brilliance', 2, null, 'Illumination now enhances the Perception of the targeted ally:<br />+60 Minimap Radius perception for 10 seconds.<br />+100% Perception for 10 seconds.<br />+15% Stealth Sight for 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Expulse', '<div class="Sprite Celestial_Expulse"></div>&nbsp;Expulse', 6, 20, pow++, 2, 'Celestial, 15 foot Sphere PBAoE Ranged Damage<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Dimensional damage to nearby foes.<br />+ Leaves behind a Healing Rune which heals nearby allies every second for 10 seconds.<br />+ You cannot have more than one Healing Rune active at once.<br />+ Summoning this Rune counts as applying an Enchantment.<br />- Must be fully charged.<br />');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Impose', 'Impose', 2, null, 'All targets hit by Expulse are Snared after 2 seconds, reducing their movement speed for a time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Expel', 'Expel', 2, null, 'Expulse now knocks back affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Redemption', '<div class="Sprite Celestial_Redemption"></div>&nbsp;Redemption', 6, 20, pow++, 2, 'Celestial, 25 foot Sphere PBAoE Revive<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />Your powers allow you to call other heroes back from the brink of defeat.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Salvation', 'Salvation', 2, null, 'Redemption can now resurrect up to 4 teammates within 50 feet of you. Healing received is divided amongst targets resurrected.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Palliate', '<div class="Sprite Celestial_Palliate"></div>&nbsp;Palliate', 6, 20, pow++, 2, 'Celestial, 100 foot Ranged Single Friend Heal and Buff<br /><br />Requires 3 powers from Celestial or 4 non-Energy Building powers from any framework.<br /><br />Calling upon dimensional energies you are able to heal your allies and imbue them with Presence.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Absolve', 'Absolve', 2, null, 'The target of Palliate has their threat wiped and gains stealth for 10 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Holy Water', '<div class="Sprite Celestial_HolyWater"></div>&nbsp;Holy Water', 6, 20, pow++, 3, 'Celestial, 25 foot 90 Degree Cone Damage or Heal<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />+ If Targeting foes, deals Dimensional damage to affected targets every 1 sec for 10 sec.  Illuminated foes will also become Disoriented.<br />+ If Targeting allies, heals affected targets once every 2 sec for 10 sec.' + PowerUnlocksFrom('Nightmare Invasion Store', 650, 'Elysium Coins'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Heavenly Mana', 'Heavenly Mana', 2, null, 'Holy Weather now gives allies energy over time or siphons energy from foes.  This effect scales with your Recovery.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Impure Waters', 'Impure Waters', 2, null, 'Causes Illuminated targets to be affected by Deadly Poison instead of Disorient.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Celestial Cleansing', '<div class="Sprite Celestial_CelestialCleansing"></div>&nbsp;Celestial Cleansing', 6, 20, pow++, 3, 'Celestial, 100 foot Ranged Single Friend Cleanse<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />Purge a target, banishing an undesirable effect to far off dimensions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Deliverance', 'Deliverance', 2, null, 'Celestial Cleansing now helps friendly targets around your primary target break free of holds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ascension', '<div class="Sprite Celestial_Ascension"></div>&nbsp;Ascension', 6, 20, pow++, 3, 'Celestial, Active Offense and Energy Form<br /><br />Requires 5 powers from Celestial or 6 non-Energy Building powers from any framework.<br /><br />You are able to temporarily draw massive energy from other dimensions, increasing your damage and healing and granting you flight for a short time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Judgment', 'Judgment', 2, null, 'All Illuminations within 100 feet are consumed. Friendly targets who were Illuminated are healed. Enemy targets who were Illuminated take damage.'));

dataPower[dataPower.length] = new Power(6, 20, 1, "Planar Fracture", 0.67, 2, 0, 2, 77, 90, "Targets foe/50 feet", "Ultimate/Ranged AoE Damage/DoT/Debuff", "Planar Fracture creates a tear in time and space, linking this plane with another. Chaotic energy pours forth from the fracture, causing random damage and status effects on your foes.<br /><br />CHARGE<br />+ Creates a Planar Fracture near your target.<br />+ Planar Fracture deals Dimensional damage to targets close to it.<br />+ The chaotic energies flowing from the Planar Fracture create random status effects on nearby enemies.<br />- Must be fully charged.<br />- This power is incapable of getting a Critical Hit.", Power.TYPE_NORMAL, true);
dataPower[dataPower.length-1].insertAdvantage("Double Vortex", 2, null, "Your Planar Fracture now causes 2 random Debuffs on each target instead of 1.");
dataPowerAlias["Planar Fracture"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(6, 20, 1, "Endbringer's Grasp", 0.67, 2, 0, 2, 76, 90, "Targets foe/50 feet", "Ultimate/Ranged AoE Damage/Corruption/Curse", "Open a Qliphotic portal, its horrifying power eating away at the sanity of your foes.<br /><br />CHARGE<br />+ Open a portal that deals dimensional damage to foes.<br />+ Foes are periodically afflicted with Fear.<br />+ Foes who are afflicted by Fear are periodically corrupted and forced to fight for you." + PowerUnlocksFrom("Villain Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPowerAlias["Endbringers Grasp"] = new PowerAlias(dataPower[dataPower.length-1]);

dataPower[dataPower.length] = new Power(6, 20, 1, "Crashing Incantation", 0.67, 1.83, 0, 1.83, 138, 90, "Targets foe (10 max)/50 feet/20 foot Sphere", "Ultimate/Ranged AoE Damage/Corruption/Curse", "+ Deals Magic damage to targets within a 20 foot radius.<br />+ Applies Jinx to the target, reducing their movement by 15% for 8 seconds.  When the effect expires, affected foes are Knocked Down.<br />+ Jinx is a type of Curse.<br />+ Applies Overpower to affected foes, which reduces their damage resistance by 20% for 12 seconds." + PowerUnlocksFrom("Arcane Lockbox or " + UNLOCK_COLLECTOR, 1, UNLOCK_PURPLE_FOIL), Power.TYPE_NORMAL, true);
dataPowerAlias["Crashing Incantation"] = new PowerAlias(dataPower[dataPower.length-1]);



//------------------------------------------------------------------------------
// Power Framework: Darkness
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(21);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Bolt', '<div class="Sprite Darkness_ShadowBolt"></div>&nbsp;Shadow Bolt', 6, 21, pow++, -1, 'Darkness, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Shadow Bolt fires balls of dimensional energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Despondency', 'Despondency', 2, null, 'Decreases target\\\'s Dodge chance. Additionally, all Shadow Bolt attacks now have a chance to apply Fear (instead of only the opening attack).'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Blast', '<div class="Sprite Darkness_ShadowBlast"></div>&nbsp;Shadow Blast', 6, 21, pow++, 0, 'Darkness, 100 foot Ranged Single Target Damage and Fear (Blast)<br /><br />Shadow Blast is a highly focused bolt of dimensional energies. Few enemies can stand in its path and survive.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Psychotic Break', 'Psychotic Break', 2, null, 'Full charge vs Feared target pushes them into full on psychosis, Stunning the target and dealing additional Dimensional Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dark Tether', '<div class="Sprite Any_Generic"></div>&nbsp;Dark Tether', 6, 21, pow++, 1, 'Darkness, 50 foot - Ranged Damage, Knock To, and Fear<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Deals Dimensional damage and Knocks the target to you.  Has a 46-100% chance (based on charge time) to apply Fear to the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Devoid', 'Devoid', 2, null, 'On a full charge, applies Devoid to the target, reducing their Dimensional damage resistance by -18% for 12 sec.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Embrace', '<div class="Sprite Darkness_ShadowEmbrace"></div>&nbsp;Shadow Embrace', 6, 21, pow++, 1, 'Darkness, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Shadow Embrace assaults enemies in front of you with relentless dark energy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Dark Displacement', 'Dark Displacement', 2, null, 'Adds a chance to Knock Down your targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Fatal Allure', 'Fatal Allure', 1, null, 'Feared targets are Knocked Toward you with great force, potentially pulling them clear over your head.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Grasping Shadows', '<div class="Sprite Darkness_GraspingShadows"></div>&nbsp;Grasping Shadows', 6, 21, pow++, 1, 'Darkness, 50 foot Ranged 15 foot Sphere AoE Damage and Hold and Fear<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Grasping Shadows calls on dark dimensional energies to bind your enemies in place.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Unyielding Agony', 'Unyielding Agony', 2, null, 'Grasping Shadows now deals Damage over Time. This damage does not reduce the durability of the Paralyze Hold applied by Grasping Shadows.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Devouring Darkness', 'Devouring Darkness', 2, null, 'Devouring Darkness will now heal you and nearby allies for every enemy you hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Void', 'Void', 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Shroud', '<div class="Sprite Darkness_ShadowShroud"></div>&nbsp;Shadow Shroud', 6, 21, pow++, 1, 'Darkness, Active Offense and Energy Form<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Shadow Shroud wraps you in darkness and dimensional energies; this connection to the nether forces improves your combat abilities for a short period of time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Terrifying Visage', 'Terrifying Visage', 2, null, 'Your visage in Shadow Shroud becomes terrifying. Nearby enemies may be Feared, and Feared enemies may be driven to a state of Psychotic Break, Stunning them and dealing Dimensional Damage over Time.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Form', '<div class="Sprite Darkness_ShadowForm"></div>&nbsp;Shadow Form', 6, 21, pow++, 1, 'Darkness, Offensive Passive - Energy Form<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Paranormal damage.<br />+ Increases your Dimensional damage resistance.<br />+ Increases your Paranormal damage resistance by a lesser amount.<br />+ Increases your Aggression Stealth and Perception Stealth.<br />+ Reduces your threat slightly.<br />+ When you attack a foe, you have a chance to recover a small percentage of your health.  This can only happen once every 3 seconds.<br />+ Recovers Energy when you take Dimensional damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Compassion"].replicate(6, 21);
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ebon Void', '<div class="Sprite Darkness_EbonVoid"></div>&nbsp;Ebon Void', 6, 21, pow++, 1, 'Darkness, Block<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Deals damage to attackers and heals you each time you take damage while blocking.  This effect can only occur once every second.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Voracious Darkness', 'Voracious Darkness', 3, null, 'When taking damage, applies Voracious Darkness, giving you 10% bonus resistance to all damage for 10 seconds.  This effect can stack up to 5 times.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Void Shift', '<div class="Sprite Darkness_VoidShift"></div>&nbsp;Void Shift', 6, 21, pow++, 1, 'Darkness, 60 foot Lunge, Snare, and Stun<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Dimensional damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Stunned briefly.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Emerging Nightmares', 'Emerging Nightmares', 2, null, 'Applies Fear to your target and other foes within 10 feet, reducing their damage by 10% for 12 sec.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Spirit Reverberation', '<div class="Sprite Darkness_SpiritReverberation"></div>&nbsp;Spirit Reverberation', 6, 21, pow++, 1, 'Darkness, Energy Unlock (Constitution, <i>Recovery</i>)<br /><br />Requires 1 power from Darkness or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Generates energy every time you attack a Feared target with Dimensional damage.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Constitution, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lifedrain', '<div class="Sprite Darkness_Lifedrain"></div>&nbsp;Lifedrain', 6, 21, pow++, 2, 'Darkness, 50 foot Ranged Single Target Damage and Self Heal<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Lifedrain utilizes dark energy to transfer life energy from your enemy to you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Vampiric Sympathy', 'Vampiric Sympathy', 2, null, 'The heal component of your Lifedrain becomes an AoE (15 foot radius, max of 5 targets) centered on you that heals nearby friends for half as much as it heals you. When using Lifedrain on a Feared target, the AoE heals for as much as it heals you.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Soul Vortex', '<div class="Sprite Darkness_SoulVortex"></div>&nbsp;Soul Vortex', 6, 21, pow++, 2, 'Darkness, 50 foot Ranged AoE DoT<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Creates a Rift near your target, dealing Dimensional damage over time and slowly pulling them toward the centered.  Affected foes have a 15/25/35% chance to be Feared each tick, based on rank.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Soul Drain', 'Soul Drain', 2, null, 'Soul Vortex now applies and refreshes Dependency on affected foes after the vortex expires.  ' + dataPowerAlias['Dependency'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Dark Transfusion', '<div class="Sprite Darkness_DarkTransfusion"></div>&nbsp;Dark Transfusion', 6, 21, pow++, 2, 'Darkness, Self Energy Gain and Self Damage (Endurance, Recovery)<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />Lose 400 health points in exchange for a large initial energy boost that scales with the maximum size of your energy pool as well as your Recovery, as well as the following effects that last for 15 seconds:<br /><br />+ Sets your energy equilibrium to the maximum.<br />+ Increases your energy regeneration.<br />- You lose 75 health every second.<br />- Reduces the effectiveness of healing effects used on you.  Healing from Life Drain and percent-of-max-health effects are not affected by this reduction.<br /><br />Life Drain effects include:  Life Drain, Mind Drain, Life Essence, Dependency (Soul Vortex, Mental Leech), Devouring Darkness (Summon Shadows), Consumption (Grasping Shadows), Devour Essence, Siphoning Strikes (Ego Weaponry), Back to the Darkness (Ebon Ruin), Void Feast (Shade Storm), etc');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Blood Sacrifice', 'Blood Sacrifice', 2, null, 'Activating Dark Transfusion with the Blood Sacrifice advantage increases the damage of all of your attacks, up to a specific amount of total damage (approximately equal to a Shadow Blast at your level).'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Void Horror', '<div class="Sprite Darkness_VoidHorror"></div>&nbsp;Void Horror', 6, 21, pow++, 2, 'Darkness, Controllable Pet<br /><br />Requires 3 powers from Darkness or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful incarnation of shadow to assault your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ebon Ruin', '<div class="Sprite Darkness_EbonRuin"></div>&nbsp;Ebon Ruin', 6, 21, pow++, 3, 'Darkness, 100 foot Ranged Single Target Damage and DoT and Debuff<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals Dimensional damage to the target.  On a full charge, applies and refreshes Despair, a damage over time effect that stacks up to 3 times.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Nyctophobia', 'Nyctophobia', 1, null, 'Increases the damage of Ebon Ruin by 15% against Feared targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Paranormal Paranoia', 'Paranormal Paranoia', 2, null, 'Ebon Ruin now has a 30-100% chance to apply Fear to the target, based on charge time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Back to the Darkness', 'Back to the Darkness', 2, null, 'Ebon Ruin consumes all of your Shadows pets in a 25 foot radius, healing you for each one consumed.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ebon Rift', '<div class="Sprite Darkness_EbonRift"></div>&nbsp;Ebon Rift', 6, 21, pow++, 3, 'Darkness, 50 foot Ranged 15 foot Sphere AoE Damage and Snare<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals Dimensional Damage every 0.5 sec to all targets.  Foes within 20 feet are pulled toward the center of the rift.  Has a 10% chance to apply Fear to affected targets.<br /><br />The longer you maintain this power, the longer the rift will linger afterward.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Vengeful Shadows', 'Vengeful Shadows', 2, null, 'Targets that get too close to the Rift will take massive Dimensional damage and be Knocked Back. Targets that are immune to Knock Back will instead take some additional damage if they are too close.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shade Storm', '<div class="Sprite Darkness_ShadeStorm"></div>&nbsp;Shade Storm', 6, 21, pow++, 3, 'Darkness, 50 foot Ranged 15 foot Sphere AoE Damage - Fear - Knockdown<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals Dimensional Damage every 0.5 sec to all targets.  Has a 10% chance to apply Fear to targets and a 10% chance to Knock Down targets already affected by Fear.' + PowerUnlocksFrom(UNLOCK_RECOGNITION, "350/175", "SCR/GCR"));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Horrifying Shadows', 'Horrifying Shadows', 2, null, 'When fully maintained, Stuns all affected targets for 2 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Splatter', 'Splatter', 2, null, 'Instead of Knocking Down targets, has a 25% chance to Knock Up targets affected by Fear.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Void Feast', 'Void Feast', 2, null, 'Consumes all Fear effects on affected targets, healing you for each effect consumed.  This heal counts as a Life Drain.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shadow Eruption', '<div class="Sprite Darkness_ShadowEruption"></div>&nbsp;Shadow Eruption', 6, 21, pow++, 3, 'Darkness, 25 foot PbAoE Damage and Knockback<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Deals shadow damage and knocks all affected enemies away from you.' + PowerUnlocksFrom(UNLOCK_RECOGNITION, "500/250", "SCR/GCR"));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Blot', 'Blot', 2, null, 'Stuns affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Drag Back', 'Drag Back', 2, null, 'Shadow Eruption becomes a Knock Towards rather than Knock Away.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Envelope In Shadows', 'Envelope In Shadows', 2, null, 'upon a full charge, Shadow Eruption applied Devoid to targets.  Devoid reduces Dimensional damage resistance.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, 'Consume Fear', 'Consume Fear', 2, null, 'On a full charge, Shadow Eruption consumes all of your Fear effects on affected targets.  Each stack consumed will deal additional Shadow damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Summon Shadows', '<div class="Sprite Darkness_SummonShadows"></div>&nbsp;Summon Shadows', 6, 21, pow++, 3, 'Darkness, Uncontrolled Pet<br /><br />Requires 5 powers from Darkness or 6 non-Energy Building powers from any framework.<br /><br />Summon Shadows calls forth beings of pure shadow to attack your foes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Devouring Darkness', 'Devouring Darkness', 2, null, 'Causes the damage your Shadows deal to heal you for 20% of the damage they deal.'));

dataPower[dataPower.length] = dataPowerAlias["Planar Fracture"].replicate(6, 21);
dataPower[dataPower.length] = dataPowerAlias["Endbringers Grasp"].replicate(6, 21);
dataPower[dataPower.length] = dataPowerAlias["Crashing Incantation"].replicate(6, 21);

//------------------------------------------------------------------------------
// Power Group: Sorcery
//------------------------------------------------------------------------------

dataRequireGroup['sorcery'] = [];

// Enchantments/Curses
dataPowerAlias['Mystified'] = PowerAlias.legacyConstructor('Mystified', 'Mystified', 'Mystified', 'Mystified reduces the cost of your Sorcery, Celestial, Darkness, and Infernal abilities by 3% for 15 seconds.  Mystified can stack up to 3 times.  Mystified is a type of Enchantment.');
dataPowerAlias['Jinxed'] = PowerAlias.legacyConstructor('Jinxed', 'Jinxed', 'Jinxed', 'Jinxed reduces the target\\\'s damage by 10% and movement speed by 15% for 8 seconds.  Upon expiring, the target is Knocked Down.  Jinxed is a type of Curse.');
dataPowerAlias['Hexed'] = PowerAlias.legacyConstructor('Hexed', 'Hexed', 'Hexed', 'Hexed causes affected targets to suffer -18% to Magic resistance for 12 seconds.   Hexed is a type of Curse.');

dataPowerAlias['Unbound Ritual'] = PowerAlias.legacyConstructor('Unbound Ritual', 'Unbound Ritual', 'Unbound Ritual', 'Causes the pet summoned by this Ritual to no longer be bound to the circle. This allows the summon to follow you around wherever you may go, and your pet no longer goes away when another Ritual pet is summoned. This advantage also adds an Energy Cost to this summon power.');
dataPowerAlias['Eldritch Bolts'] = PowerAlias.legacyConstructor('Eldritch Bolts', 'Eldritch Bolts', '<div class="Sprite Sorcery_EldritchBolts"></div>&nbsp;Eldritch Bolts', 'Sorcery, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Eldritch Bolts fires balls of eldritch energy to blast your enemy.');
dataPowerAlias['Wizards Discretion'] = PowerAlias.legacyConstructor('Wizards Discretion', 'Wizard\'s Discretion', 'Wizard\'s Discretion', 'Grants your Eldritch Bolts a 20% chance to Stun your target for a few seconds.');
dataPowerAlias['Eldritch Blast'] = PowerAlias.legacyConstructor('Eldritch Blast', 'Eldritch Blast', '<div class="Sprite Sorcery_EldritchBlast"></div>&nbsp;Eldritch Blast', 'Sorcery, 100 foot Ranged Single Target Damage and Root (Blast)<br /><br />Eldritch Blast fires a concentrated blast of eldritch energy at your enemy.<br />+ Single target Magic damage.<br />+ 12-50% chance to apply Mystified to you.');
dataPowerAlias['Sorcerers Whim'] = PowerAlias.legacyConstructor('Sorcerers Whim', 'Sorcerer\'s Whim', 'Sorcerer\'s Whim', 'Eldritch Blast deals extra damage to held targets.');
dataPowerAlias['Pillar of Poz'] = PowerAlias.legacyConstructor('Pillar of Poz', 'Pillar of Poz', '<div class="Sprite Sorcery_PillarOfPoz"></div>&nbsp;Pillar of Poz', 'Sorcery, 15 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Deals Magic damage to nearby foes, leaving behind a Healing Rune.  The Healing Rune heals nearby allies every 0.5 seconds for 10 seconds.');
dataPowerAlias['Dizzying Impact'] = PowerAlias.legacyConstructor('Dizzying Impact', 'Dizzying Impact', 'Dizzying Impact', 'Disorients targets for 12 seconds.  Disoriented targets have 10% reduced damage and a 15% movement speed penalty.');
dataPowerAlias['Binding of Aratron'] = PowerAlias.legacyConstructor('Binding of Aratron', 'Binding of Aratron', '<div class="Sprite Sorcery_BindingOfAratron"></div>&nbsp;Binding of Aratron', 'Sorcery, 50 foot Single Target Incapacitate<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Binding of Aratron channels eldritch energy to lock your enemy to the ground.');
dataPowerAlias['Tenable Bonds'] = PowerAlias.legacyConstructor('Tenable Bonds', 'Tenable Bonds', 'Tenable Bonds', 'While Binding of Aratron is maintained on your target it will drain the target\\\'s Energy and return Health to you.');
dataPowerAlias['Tyrannons Familiar'] = PowerAlias.legacyConstructor('Tyrannons Familiar', 'Tyrannon\'s Familiar', '<div class="Sprite Sorcery_TyrannonsFamiliar"></div>&nbsp;Tyrannon\'s Familiar', 'Sorcery, Controllable Pet<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />With this power you may summon a powerful sorcerous Golem Familiar to battle your enemies and empower your magic.<br /><br />' + PetTip('Golem Familiar', 'Can punch, lunge, and throw rocks at enemies.  Its attacks generates additional threat and it can store up to 2 power charges.', 'Gains 10% damage resistance and can store up to 3 power charges.', 'Damage resistance to 20% and can store up to 4 power charges.', 'Power Siphon - When activated, consumes all power charges to give you energy and a damage bonus, based on the number of power charges consumed.'));
dataPowerAlias['Eldritch Shield'] = PowerAlias.legacyConstructor('Eldritch Shield', 'Eldritch Shield', '<div class="Sprite Sorcery_EldritchShield"></div>&nbsp;Eldritch Shield', 'Sorcery, Block<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 300% resistance to all Non-Physical damage and 250% resistance to all Physical damage, increases your resistance to Holds and Knocks, and reduces your movement speed.');
dataPowerAlias['Imbue With Power'] = PowerAlias.legacyConstructor('Imbue With Power', 'Imbue With Power', 'Imbue With Power', 'Adds a different effect to your shield based on which Aura you have active:<br />+ Aura of Arcane Clarity: Your shield now returns more Energy during a block, scaling with your Intelligence.<br />+ Aura of Primal Majesty: Your shield now has a chance to strike your attacker with a bolt of lightning.<br />+ Aura of Ebon Destruction: Your shield now has a chance to Fear your attackers.<br />+ Aura of Radiant Protection: Your shield now has a chance to place a Heal over Time on you.');
dataPowerAlias['Warlocks Blades'] = PowerAlias.legacyConstructor('Warlocks Blades', 'Warlock\'s Blades', '<div class="Sprite Sorcery_WarlocksBlades"></div>&nbsp;Warlock\'s Blades', 'Potato<br /><br />Sorcery, Uncontrolled Pet', 'Summons a pair of magical scimitars to attack your foes.  The blades hit up to 3 targets per attack for Magic damage.');
dataPowerAlias['Skarns Bane'] = PowerAlias.legacyConstructor('Skarns Bane', 'Skarn\'s Bane', '<div class="Sprite Sorcery_SkarnsBane"></div>&nbsp;Skarn\'s Bane', 'Sorcery, 50 foot Ranged 45 degree Cone AoE Damage and Debuff<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Deals Magic damage to targets.  If fully maintained, applies Hexed.<br /><br />' + dataPowerAlias['Hexed'].tip);
dataPowerAlias['Warlocks Malice'] = PowerAlias.legacyConstructor('Warlocks Malice', 'Warlock\'s Malice', 'Warlock\'s Malice', 'Gives each pulse of Skarn\\\'s Bane a chance to Root the target.');
dataPowerAlias['Hex of Suffering'] = PowerAlias.legacyConstructor('Hex of Suffering', 'Hex of Suffering', '<div class="Sprite Sorcery_HexOfSuffering"></div>&nbsp;Hex of Suffering', 'Sorcery, 50 foot Ranged 10 foot Sphere AoE Damage and DoT<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Your target becomes a bearer of a mark of pain, emanating damage.');
dataPowerAlias['Rune of Lethargy'] = PowerAlias.legacyConstructor('Rune of Lethargy', 'Rune of Lethargy', 'Rune of Lethargy', 'Targets affected by your Hex of Suffering are Rooted in place for a short duration.');
dataPowerAlias['Urthonas Charm'] = PowerAlias.legacyConstructor('Urthonas Charm', 'Urthona\'s Charm', '<div class="Sprite Sorcery_UrthonasCharm"></div>&nbsp;Urthona\'s Charm', 'Sorcery, 100 foot Ranged Single Target Confuse and Debuff<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />Urthona\\\'s Charm attacks the mind of your target, causing them to become temporarily confused.');
dataPowerAlias['Ephemeral Endowment'] = PowerAlias.legacyConstructor('Ephemeral Endowment', 'Ephemeral Endowment', 'Ephemeral Endowment', 'Increases the damage, defense, and speed of the target of Urthona\\\'s Charm for a short duration.');
dataPowerAlias['Valas Light'] = PowerAlias.legacyConstructor('Valas Light', 'Vala\'s Light', '<div class="Sprite Sorcery_ValasLight"></div>&nbsp;Vala\'s Light', 'Sorcery, 50 foot Ranged 10 foot Sphere AoE Friend Heal<br /><br />Requires 5 powers from Sorcery or 6 non-Energy Building powers from any framework.<br /><br />You channel your magic into life restoring energy, healing multiple allies.');

//------------------------------------------------------------------------------
// Power Framework: Sorcery (Formerly Arcane Sorcery)
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(22);
dataRequireGroup['sorcery'].push(22);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Eldritch Bolts'].name, dataPowerAlias['Eldritch Bolts'].desc, 6, 22, pow++, -1, dataPowerAlias['Eldritch Bolts'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Wizards Discretion'].name, dataPowerAlias['Wizards Discretion'].desc, 2, null, dataPowerAlias['Wizards Discretion'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Eldritch Blast'].name, dataPowerAlias['Eldritch Blast'].desc, 6, 22, pow++, 0, dataPowerAlias['Eldritch Blast'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Sorcerers Whim'].name, dataPowerAlias['Sorcerers Whim'].desc, 2, null, dataPowerAlias['Sorcerers Whim'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Chant', 'Chant', 2, null, 'Eldritch Blast now refreshes the duration of Hexed on the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Blinding Light', 'Blinding Light', 2, null, '+ Fully charging Eldritch Blast now applies Illumination to you and nearby allies as well as Illuminated to your target.<br />+ ' + dataPowerAlias['Illumination'].tip + '<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Bad Luck', 'Bad Luck', 2, null, '+ Gives Eldritch Blast a 25-100% chance to apply Jinxed to the target.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(9, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Pillar of Poz'].name, dataPowerAlias['Pillar of Poz'].desc, 6, 22, pow++, 1, dataPowerAlias['Pillar of Poz'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Dizzying Impact'].name, dataPowerAlias['Dizzying Impact'].desc, 2, null, dataPowerAlias['Dizzying Impact'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Immense Power', 'Immense Power', 2, null, 'All affected targets are knocked back.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Dilemma', 'Dilemma', 2, null, '+ Applies Jinxed to affected targets.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Mystical', 'Mystical', 2, null, '+ Applies Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sigils of Arcane Runes', '<div class="Sprite Sorcery_SigilsOfArcaneRunes"></div>&nbsp;Sigils of Arcane Runes', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Damage<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 unstable sigils around you that explode whenever an enemy comes near.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sigils of Destruction', '<div class="Sprite Sorcery_SigilsOfDestruction"></div>&nbsp;Sigils of Destruction', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - Damage<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you that deal Magic damage to a nearby target every 2 seconds.  Each attack these sigils make has a 10% chance of Arcing to a secondary target.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sigils of Ebon Weakness', '<div class="Sprite Sorcery_SigilsOfEbonWeakness"></div>&nbsp;Sigils of Ebon Weakness', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Debuff and Curse<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you that reduce the movement speed and damage dealt by nearby foes, scaling with your Presence.  The effect of these sigils counts as a type of Curse.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Sigils of Radiant Sanctuary', '<div class="Sprite Sorcery_SigilsOfRadiantSanctuary"></div>&nbsp;Sigils of Radiant Sanctuary', 6, 22, pow++, 1, 'Sorcery, Summon Sigils - AoE Stealth Buff and Heal<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Summons 5 sigils around you, granting any nearby allies increased Aggression Stealth, Perception Stealth.  Nearby allies also receive a small amount of Damage Reduction, Knockback Resistance, Hold Resistance, and a small amount of healing every 2 seconds.<br /><br />Only one set of sigils may be active at a time.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Mystic Transference'].name, dataPowerAlias['Mystic Transference'].desc, 1, null, dataPowerAlias['Mystic Transference'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Inner Peace', 'Inner Peace', 2, null, dataPowerAlias['SP'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Binding of Aratron'].name, dataPowerAlias['Binding of Aratron'].desc, 6, 22, pow++, 1, dataPowerAlias['Binding of Aratron'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Tenable Bonds'].name, dataPowerAlias['Tenable Bonds'].desc, 2, null, dataPowerAlias['Tenable Bonds'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Tyrannons Familiar'].name, dataPowerAlias['Tyrannons Familiar'].desc, 6, 22, pow++, 1, dataPowerAlias['Tyrannons Familiar'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aura of Arcane Clarity', '<div class="Sprite Sorcery_AuraOfArcaneClarity"></div>&nbsp;Aura of Arcane Clarity', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Grants you and up to 20 allies within 100 feet a bonus to Power Cost Discount, Power Recharge Speed, Charge Speed, Perception, and Stealth Sight.<br />+ The bonuses you gain scales with your Superstats.<br />+ The bonuses your allies gain scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aura of Ebon Destruction', '<div class="Sprite Sorcery_AuraOfEbonDestruction"></div>&nbsp;Aura of Ebon Destruction', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Increases the damage dealt by both you and up to 20 allies within 100 feet.<br />+ The damage bonus you gain scales with your Superstats.<br />+ The damage bonus your allies gain scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aura of Primal Majesty', '<div class="Sprite Sorcery_AuraOfPrimalMajesty"></div>&nbsp;Aura of Primal Majesty', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />+ Increases all stats for both you and up to 20 allies within 100 feet.<br />+ The amount of stats you receive scales with your Superstats.<br />+ The stat bonus your allies receive scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aura of Radiant Protection', '<div class="Sprite Sorcery_AuraOfRadiantProtection"></div>&nbsp;Aura of Radiant Protection', 6, 22, pow++, 1, 'Sorcery, Support Passive, 100 foot PBAoE Friend Aura<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />+ Increases the Damage Resistance of both you and up to 20 allies within 100 feet.<br />+ The amount of Damage Resistance you receive scales with your Superstats.<br />+ The amount of Damage Resistance your allies receive scales with your Presence.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Enchanter', '<div class="Sprite Sorcery_Enchanter"></div>&nbsp;Enchanter', 6, 22, pow++, 1, 'Sorcery, Offensive Passive<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Increases your Magic, Dimensional, and Toxic damage while granting a small amount of resistance to Magic, Dimensional, and Toxic damage.  You also gain a small amount of energy when struck by any of those damage types.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Spellcaster', '<div class="Sprite Sorcery_Spellcaster"></div>&nbsp;Spellcaster', 2, 22, pow++, 1, 'Sorcery, Form (Intelligence)<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you apply or refresh an Enchantment or Curse.  (Does not apply to pets, circles, or sigils)<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = dataPowerAlias["Compassion"].replicate(6, 22);
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Eldritch Shield'].name, dataPowerAlias['Eldritch Shield'].desc, 6, 22, pow++, 1, dataPowerAlias['Eldritch Shield'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Imbue With Power'].name, dataPowerAlias['Imbue With Power'].desc, 2, null, dataPowerAlias['Imbue With Power'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Conjuring', '<div class="Sprite Sorcery_Conjuring"></div>&nbsp;Conjuring', 6, 22, pow++, 1, 'Sorcery, Energy Unlock (Intelligence, <i>Recovery</i>)<br /><br />Requires 1 power from Sorcery or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Being near targets affected by your Curses gives you energy.<br />+ This effect can only occur once every 3 seconds.<br />+ The energy gained scales with your Intelligence, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Invocation of Storm Calling', '<div class="Sprite Sorcery_InvocationOfStormCalling"></div>&nbsp;Invocation of Storm Calling', 6, 22, pow++, 2, 'Potato<br /><br />Potato<br /><br />25 foot PbAoE Maintain', 'Deals Magic damage to enemies within 25 yards of you every second.  upon being fully maintained, foes within 25 feet of you are hit by a blast of magic, dealing additional Magic damage to any enemies within 10 feet of them.<br />+ Upon being fully maintained, applies Jinxed to affected targets.<br />+ ' + dataPowerAlias['Jinxed'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Strong Winds', 'Strong Winds', 2, null, 'Your storm now repels targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Electrify', 'Electrify', 2, null, 'Your storm now has a chance to apply Negative Ions to affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Light Up the Sky', 'Light Up the Sky', 2, null, '+ Upon a full maintain, your storm applies Illuminated to affected targets.<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Mystical', 'Mystical', 2, null, '+ Upon a full maintain, your storm applies Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Skarns Bane'].name, dataPowerAlias['Skarns Bane'].desc, 6, 22, pow++, 2, dataPowerAlias['Skarns Bane'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Warlocks Malice'].name, dataPowerAlias['Warlocks Malice'].desc, 2, null, dataPowerAlias['Warlocks Malice'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Chaos Magic', 'Chaos Magic', 2, null, 'Skarn\\\'s Bane has a 20% chance per tick to apply Bane to the affected targets, afflicting them with one of the following at random:  Fear, Confuse, Disorient, Lethargy, Bleed, Deadly Poison, Clinging Flames, Stun, or Stagger.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Mystical', 'Mystical', 2, null, '+ Skarn\\\'s Bane has a 20% chance to apply Mystified to you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Tranced', 'Tranced', 2, null, '+ Skarn\\\'s Bane has a 20% chance to Stun the target for 2 seconds.<br />+ This chance increases to 100% if the target is affected by Jinxed.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Soul Beam', '<div class="Sprite Sorcery_SoulBeam"></div>&nbsp;Soul Beam', 6, 22, pow++, 2, 'Potato<br /><br />Potato<br /><br />Deals Magic damage every 0.5 second for up to 4 seconds.<br />+ Deals 10% additional damage if the target is affected by a Curse.<br />+ Deals 10% additional damage if you are affected by an Enchantment.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Mystical', 'Mystical', 2, null, '+ Gives Soul Beam a chance to apply and refresh Mystical on you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Star Barrage', '<div class="Sprite Sorcery_StarBarrage"></div>&nbsp;Star Barrage', 6, 22, pow++, 2, 'Potato<br /><br />Potato<br /><br />100 foot Ranged - 10 foot Sphere AoE Damage - Maintain', 'Deals Magic damage every 0.5 second for up to 4 seconds.<br />+ Has a 20% chance to apply Illuminated to the target.<br />+ ' + dataPowerAlias['Illuminated'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, '+ Fully maintaining Star Barrage applies Light Everlasting to allies near the target.<br />+ ' + dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Mystical', 'Mystical', 2, null, '+ Gives Star Barrage a chance to apply and refresh Mystical on you.<br />+ ' + dataPowerAlias['Mystified'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Arcane Vitality', '<div class="Sprite Sorcery_ArcaneVitality"></div>&nbsp;Arcane Vitality', 6, 22, pow++, 2, 'Sorcery, 50 foot Ranged 45 degree Cone AoE Friend Heal<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />Arcane Vitality creates a focused surge of mystical healing energy that affects you or multiple allies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Impart Freedom', 'Impart Freedom', 2, null, 'Your Arcane Vitality will now remove all control effects at the end of a full maintain.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Mystical', 'Mystical', 2, null, '+ Gives your Arcane Vitality a chance to apply and refresh Mystified on you.<br />+ ' + dataPowerAlias['Mystified'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Divine Renewal', '<div class="Sprite Sorcery_DivineRenewal"></div>&nbsp;Divine Renewal', 6, 22, pow++, 2, 'Sorcery, 25 foot Sphere - Resurrection<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />Revives a nearby hero, bringing them back from the dead with 33/66/100% of their health.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Radiant Renewal', 'Radiant Renewal', 3, null, 'Allows you to resurrect up to 4 allies at a time within 50 feet, but the charge time is increased.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Banish', '<div class="Sprite Sorcery_Banish"></div>&nbsp;Banish', 6, 22, pow++, 2, 'Sorcery, 50 foot Hold<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Paralyzes the target.<br />+ All damage taken by the target is reduced by 50%, but the Paralyze is more difficult to break because of this.<br />+ The Banishment Field portion has no effect on Cosmic enemies or Onslaught Villains.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, 1, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Magician\'s Dust', '<div class="Sprite Sorcery_MagiciansDust"></div>&nbsp;Magician\'s Dust', 6, 22, pow++, 2, 'Sorcery, 50 Threat Wipe and Stealth<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, 1, dataPowerAlias['NG'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Circle of Arcane Power', '<div class="Sprite Sorcery_CircleOfArcanePower"></div>&nbsp;Circle of Arcane Power', 6, 22, pow++, 2, 'Sorcery, Circle - Self Energy Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in this circle greatly reduces your Energy decay and restores your energy every second as long as long as you stand in it.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Circle of Ebon Wrath', '<div class="Sprite Sorcery_CircleOfEbonWrath"></div>&nbsp;Circle of Ebon Wrath', 6, 22, pow++, 2, 'Sorcery, Circle - Self Damage Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in the circle increaes your damage and reduces your threat generation.<br />- Standing in the circle greatly reduces the effectiveness of healing effects used on you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Circle of Primal Dominion', '<div class="Sprite Sorcery_CircleOfPrimalDominion"></div>&nbsp;Circle of Primal Dominion', 6, 22, pow++, 2, 'Sorcery, Circle - Self Energy Buff<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ Standing in the circle greatly increases your resistance to Knocks, increases your damage resistance, restores a small amount of health to you every second, and grants you increased stealth Sight.<br />+In the Healer role, the damage resistance and health restored is higher.<br />+ In the Tank role, you gain bonus threat generation in addition to the other bonuses.<br />- Standing in the circle reduces your resistance to Hold effects.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Circle of Radiant Glory', '<div class="Sprite Sorcery_CircleOfRadiantGlory"></div>&nbsp;Circle of Radiant Glory', 6, 22, pow++, 2, 'Sorcery, Circle - Self Resurrection and AoE Heal<br /><br />Requires 3 powers from Arcane Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a circle which disappears if you leave it for more than a few seconds.<br />+ While summoned, you can tap this pwoer to move the circle to your current location.<br />+ moving the circle causes it to heal allies at the source location as well as the destination location.<br />+ If you die within your circle, you can resurrect yourself.  Doing so destroys the circle and it cannot be summoned again for 2 minutes.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = new Power(6, 22, 2, "March of the Dead", 0.67, 1, 0, 1, 41, 20, "Targets Self", "Uncontrolled Pet", "Summons 3 Walking Dead to attack your foes for a duration of at least 20 seconds, modified by your Inteliigence.  Using this power decreases your Equilibrium for a short period of time.");
dataPower[dataPower.length-1].insertAdvantage("Forced March", 2, null, "Increaes the duration your zombies are summoned for.");

dataPower[dataPower.length] = new Power(6, 22, 2, "Warlock's Blades", 0.67, 1, 0, 1, 41, 20, "Targets Self", "Uncontrolled Pet", "Summons a pair of magical blades to attack up to 3 foes at a time, dealing Magic damage with each hit.");

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ritual of Ebon Summoning', '<div class="Sprite Sorcery_RitualOfEbonSummoning"></div>&nbsp;Ritual of Ebon Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Daemon', 'Uses long-range, rapid bolts and explosive blasts.', 'Wields a melee-range burning sword with periodic self-buff to increase damage', 'Wields cleaving axes and can ignite the ground beneath it.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ritual of Radiant Summoning', '<div class="Sprite Sorcery_RitualOfRadiantSummoning"></div>&nbsp;Ritual of Radiant Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Radiant Entity', 'Uses Radiant light to heal your allies and attack your enemies.  Can also utilize a blade of light if forced into melee.', 'Can Condemn enemies, damaging foes in a moderate area.', 'Gains a healing aura.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ritual of Primal Summoning', '<div class="Sprite Sorcery_RitualOfPrimalSummoning"></div>&nbsp;Ritual of Primal Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Primal Incarnation', 'Can call down lightning and uses a Bite attack.  Can also howl to buff the damage of both itself and its allies.', 'Can adapt its resistance to attacks as it takes damage.', 'When its health is low, it will grow larger and deal additional damage.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Ritual of Arcane Summoning', '<div class="Sprite Sorcery_RitualOfArcaneSummoning"></div>&nbsp;Ritual of Arcane Summoning', 6, 22, pow++, 2, 'Sorcery, Controllable Pet<br /><br />Requires 3 powers from Sorcery or 4 non-Energy Building powers from any framework.<br /><br />+ Creates a Ritual Circle at your location.<br />+ Only one Ritual may be active at a time.<br />maintaining control of pets reduces your energy gains and increase the energy cost of your powers.<br />- Leaving the circle will cause the pet to unsummon shortly afterward.<br /><br />' + PetTip('Arcane Construct', 'Pummels foes with its fists and can unleash a PBAoE.', 'Gains eye beams.', 'Gains increased durability, but moves a bit more slowly as well.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Unbound Ritual'].name, dataPowerAlias['Unbound Ritual'].desc, 2, null, dataPowerAlias['Unbound Ritual'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Hex of Suffering'].name, dataPowerAlias['Hex of Suffering'].desc, 6, 22, pow++, 3, dataPowerAlias['Hex of Suffering'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Rune of Lethargy'].name, dataPowerAlias['Rune of Lethargy'].desc, 2, null, dataPowerAlias['Rune of Lethargy'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Rune of Dismay', 'Rune of Dismay', 2, null, 'Targets affected by your Hex of Suffering are Stunned for a short duration.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Rune of Terror', 'Rune of Terror', 2, null, 'Targets affected by your Hex of Suffering are Feared.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Valas Light'].name, dataPowerAlias['Valas Light'].desc, 6, 22, pow++, 3, dataPowerAlias['Valas Light'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Light Everlasting'].name, dataPowerAlias['Light Everlasting'].desc, 2, null, dataPowerAlias['Light Everlasting'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Urthonas Charm'].name, dataPowerAlias['Urthonas Charm'].desc, 6, 22, pow++, 3, dataPowerAlias['Urthonas Charm'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Ephemeral Endowment'].name, dataPowerAlias['Ephemeral Endowment'].desc, 2, null, dataPowerAlias['Ephemeral Endowment'].tip));
dataRequireGroupPower[dataPower.length-1] = 'sorcery';

dataPower[dataPower.length] = dataPowerAlias["Planar Fracture"].replicate(6, 22);
dataPower[dataPower.length] = dataPowerAlias["Endbringers Grasp"].replicate(6, 22);
dataPower[dataPower.length] = dataPowerAlias["Crashing Incantation"].replicate(6, 22);

//------------------------------------------------------------------------------
// Power Group: Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['supernatural'] = [];

dataPowerAlias['Venomous Breath'] = PowerAlias.legacyConstructor('Venomous Breath', 'Venomous Breath', '<div class="Sprite Supernatural_VenomousBreath"></div>&nbsp;Venomous Breath', 'Supernatural, 50 foot Ranged 45 degree Cone AoE Damage<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Venomous Breath causes you to exhale a deadly mist of poison to choke and torment your enemies.');
dataPowerAlias['Paralytic Bile'] = PowerAlias.legacyConstructor('Paralytic Bile', 'Paralytic Bile', 'Paralytic Bile', 'Targets hit with Venemous Breath have a chance to suffer from an Infection that Stuns them for a short time. Targets that are Bleeding have a 100% chance to be Infected.');
dataPowerAlias['Infectious Bile'] = PowerAlias.legacyConstructor('Infectious Bile', 'Infectious Bile', 'Infectious Bile', 'Increases the chance to Poison targets that are Bleeding to 50%.');
dataPowerAlias['Locust Breath'] = PowerAlias.legacyConstructor('Locust Breath', 'Locust Breath', 'Locust Breath', 'Venomous Breath becomes Locust Breath.');
dataPowerAlias['Regeneration'] = PowerAlias.legacyConstructor('Regeneration', 'Regeneration', '<div class="Sprite Supernatural_Regeneration"></div>&nbsp;Regeneration', 'Supernatural, Slotted Defensive Passive, Self Heal over Time<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Heals you every 3 seconds, increasing as you take damage.<br />+ Increases damage resistance by 20%.  This value decreases as you take damage.');
dataPowerAlias['Pestilence'] = PowerAlias.legacyConstructor('Pestilence', 'Pestilence', '<div class="Sprite Supernatural_Pestilence"></div>&nbsp;Pestilence', 'Supernatural, Offensive Passive, PBAoE DoT<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Increases your Toxic and Slashing damage.<br />+ Deals Toxic damage to nearby foes and foes that attack you every 2 seconds.<br />+ Reduces the Toxic resistance of foes for each stack of Poison they have.<br />+ Reduces the Slashing resistance of foes for each stack of Bleed they have.<br />+ Reduces the strength of healing effects on affected targets.');
dataPowerAlias['Supernatural Power'] = PowerAlias.legacyConstructor('Supernatural Power', 'Supernatural Power', '<div class="Sprite Supernatural_SupernaturalPower"></div>&nbsp;Supernatural Power', 'Supernatural, Energy Unlock (Recovery)<br /><br />Requires 1 power from Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />Recovers energy every time a Supernatural power reduces your energy below 15% of your maximum.  Scales with your Rercovery better than most other energy unlocks.');
dataPowerAlias['Soul Mesmerism'] = PowerAlias.legacyConstructor('Soul Mesmerism', 'Soul Mesmerism', '<div class="Sprite Supernatural_SoulMesmerism"></div>&nbsp;Soul Mesmerism', 'Supernatural, 50 foot Single Target Hold<br /><br />Requires 3 powers from Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Soul Mesmerism attempts to hypnotize your enemy, preventing them from taking any actions.');
dataPowerAlias['Glossolalia'] = PowerAlias.legacyConstructor('Glossolalia', 'Glossolalia', 'Glossolalia', 'Your target begins speaking in tongues. Nearby foes take Sonic Damage over Time and have a chance to join in the chant. 20% chance per tick to apply a secondary Soul Mesmerism effect to nearby targets.');
dataPowerAlias['Resurgence'] = PowerAlias.legacyConstructor('Resurgence', 'Resurgence', '<div class="Sprite Supernatural_Resurgence"></div>&nbsp;Resurgence', 'Supernatural, Active Defense Self Heal<br /><br />Requires 3 powers from Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Heals you for 50/75/100% (based on rank) of your health and temporarily increases your maximum hit points.');
dataPowerAlias['Evanescent Emergence'] = PowerAlias.legacyConstructor('Evanescent Emergence', 'Evanescent Emergence', 'Evanescent Emergence', '+ Applies a stack of Furious and refreshes all existing stacks.<br />+ Using Resurgence while held will help break you out of the hold.');

//------------------------------------------------------------------------------
// Power Framework: Bestial Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(23);
dataRequireGroup['supernatural'].push(23);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bestial Fury', '<div class="Sprite Supernatural_BeastialFury"></div>&nbsp;Bestial Fury', 6, 23, pow++, -1, 'Bestial Supernatural, Energy Builder, 10 foot Melee Single Target Damage<br /><br />Bestial Fury uses your hands as deadly claws to slash apart your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Rip and Tear', 'Rip and Tear', 2, null, 'Tear and rip! Bestial Fury attacks now have a 15% (30% while Enraged) chance to cause the enemy to begin Bleeding.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Barbed Chain', '<div class="Sprite Supernatural_BarbedChain"></div>&nbsp;Barbed Chain', 6, 23, pow++, 0, 'Bestial Supernatural, 25 foot Melee Damage and Bleed (Combo)<br /><br />Deals Slashing damage and has a 25/25/50% (based on combo hit) chance to apply Bleed to the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Sever', 'Sever', 2, null, 'Finishing the combo applies Shredded to the primary target, increasing all physical daamge they take by a small amount, and Slashing damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Wild Slashes', 'Wild Slashes', 2, null, 'Gives the first 2 hits a 25% chance and the final hit a 100% chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Shred', '<div class="Sprite Supernatural_Shred"></div>&nbsp;Shred', 6, 23, pow++, 0, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed (Combo)<br /><br />Shred uses your claws to slash at your enemies, frequently causing them to start bleeding.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Penetrating Strikes', 'Penetrating Strikes', 2, null, 'Finishing the combo applies Shredded to the primary target, increasing all physical daamge they take by a small amount, and Slashing damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Bite', '<div class="Sprite Supernatural_Bite"></div>&nbsp;Bite', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Deals Slashing damage and has a 20% chance to apply Bleed.<br />+ When fully charged, consumes all of your Bleed effects and heals you based on the amount consumed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Furor Venenum', 'Furor Venenum', 2, null, '20% chance to Stun foes.  This chance is increased to 100% if the target is Bleeding or Poisoned.  Biting a Bleeding or Poisoned foe also applies Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Rabies', 'Rabies', 2, null, '+ Fully charging this power on a Poisoned target will spread the affliction to another nearby target.<br />+ This can occur for each type of poison.<br />+ Gives your Bite a 20% chance to apply Poison.<br />+ Refreshes the duration of all Poisons on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Scent of Blood', 'Scent of Blood', 2, null, '+ Charging this power at least halfway on a Bleeding target will spread the affliction to another nearby target.<br />+ Refreshes the duration of all Bleeds on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Feint', '<div class="Sprite Supernatural_Feint"></div>&nbsp;Feint', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Stun<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Deals single target Slashing damage and Stuns the target.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Trauma'].name, dataPowerAlias['Trauma'].desc, 2, null, dataPowerAlias['Trauma'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Barbed Lariat', '<div class="Sprite Supernatural_BarbedLariat"></div>&nbsp;Barbed Lariat', 6, 23, pow++, 1, 'Bestial Supernatural, 25 foot Melee Single Target Damage and Knock To<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Deals single target Slashing damage and Knocks the target toward you.<br />+ Has a 46-100% chance to apply Bleed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias["Open Wound"].name, dataPowerAlias["Open Wound"].desc, 2, null, dataPowerAlias["Open Wound"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Messy', 'Messy', 2, null, 'Fully charging Barbed Lariat refreshes Shredded on your target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Slice and Dice', 'Slice and Dice', 2, null, 'Fully charging Barbed Lariat refreshes Bleeds on the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Frenzy', '<div class="Sprite Supernatural_Frenzy"></div>&nbsp;Frenzy', 6, 23, pow++, 1, 'Bestial Supernatural, 10 foot Melee (Combo) Cone AoE Damage and Bleed<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You make wide, swiping attacks with your claws, hitting targets in front of you with a 15/15/50% chance to apply Bleed.  This chance is doubled if you are Enraged.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Fear Sense', 'Fear Sense', 2, null, 'Give Frenzy a 25% chance to apply Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Poison Tipped Claws', 'Poison Tipped Claws', 2, null, 'Each attack with Frenzy has a 10/10/25% chance (based on combo hit) to apply Deadly Poison to the target.  This chance is doubled if you are Enraged.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Venomous Breath'].name, dataPowerAlias['Venomous Breath'].desc, 6, 23, pow++, 1, dataPowerAlias['Venomous Breath'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_VenomousBreath";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Paralytic Bile'].name, dataPowerAlias['Paralytic Bile'].desc, 2, null, dataPowerAlias['Paralytic Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Infectious Bile'].name, dataPowerAlias['Infectious Bile'].desc, 2, null, dataPowerAlias['Infectious Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['Locust Breath'].name, dataPowerAlias['Locust Breath'].desc, 0, null, dataPowerAlias['Locust Breath'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aspect of the Bestial', '<div class="Sprite Supernatural_AspectOfTheBestial"></div>&nbsp;Aspect of the Bestial', 6, 23, pow++, 1, 'Bestial Supernatural, Form (Strength)<br /><br />Requires 1 power1 from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your melee damage, as well as your ranged damage to a lesser degree.<br /><br />+ You gain a stack each time you apply, refresh, or consume a Bleed or Deadly Poison.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Giant Growth'].name, dataPowerAlias['Giant Growth'].desc, 0, null, dataPowerAlias['Giant Growth'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Regeneration'].name, dataPowerAlias['Regeneration'].desc, 6, 23, pow++, 1, dataPowerAlias['Regeneration'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Pestilence'].name, dataPowerAlias['Pestilence'].desc, 6, 23, pow++, 1, dataPowerAlias['Pestilence'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_Pestilence";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = dataPowerAlias["Compassion"].replicate(6, 23);
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Antagonize', '<div class="Sprite Supernatural_Antagonize"></div>&nbsp;Antagonize', 6, 23, pow++, 1, 'Bestial Supernatural, Block<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Blocking damage from more than 20 feet away applies or refreshes Antagonized, increasing knock resistance by 25%, Speed by 25%, and Jump Height by 2.5%.  Lasts 10 secondes and stacks up to 3 times.<br />+ Blocking an attack from less than 20 feet away applies or refreshes Cornered.  Cornered increases your resistance by 5% and Knock resistance by 25%.  Lasts 10 seconds and stacks up to 3 times.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Quills', 'Quills', 2, null, 'Adds a 10% chance to apply Poison or Bleed to nearby targets while blocking.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Pounce', '<div class="Sprite Supernatural_Pounce"></div>&nbsp;Pounce', 6, 23, pow++, 1, 'Bestial Supernatural, 60 foot Lunge, Snare, and Knock Down<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Lunges to the target, dealing Slashing damage and Snaring them for 13 seconds.  If the target is further than 20 feet away, they are also Knocked Down if not already affected by a control power.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Furious Rush', 'Furious Rush', 2, null, 'Refreshes and applies 1 stack of Furious.<br />' + dataPowerAlias['Furious'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Wild Thing', '<div class="Sprite Supernatural_WildThing"></div>&nbsp;Wild Thing', 6, 23, pow++, 1, 'Bestial Supernatural, Energy Unlock (Endurance, <i>Recovery</i>)<br /><br />Requires 1 power from Bestial Supernatural or 2 non-Energy Building powers from any framework.<br /><br />+ Generates energy every 3 seconds for 6 seconds every time you apply, refresh, or consume a Bleed.<br />+ This effect does not stack, but triggering it again will refresh the duration.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Supernatural Power'].name, dataPowerAlias['Supernatural Power'].desc, 6, 23, pow++, 1, dataPowerAlias['Supernatural Power'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_SupernaturalPower";
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Thrash', '<div class="Sprite Supernatural_Thrash"></div>&nbsp;Thrash', 6, 23, pow++, 2, 'Bestial Supernatural, Maintained Melee Slashing Damage, Heal, and Snare<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Single target melee Slashing damage.<br />+ Snares the affected target.<br />+ The damage dealt by this power heals you for every one of your Bleeds or Deep wounds on the target.<br />+ Bleeds or Deep wounds from other sources do not count toward the heal.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Fester', 'Fester', 2, null, 'Debuffs your target by -5% damage strength over 12 seconds for every one of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lacerating Cyclone', '<div class="Sprite Supernatural_LaceratingCyclone"></div>&nbsp;Lacerating Cyclone', 6, 23, pow++, 2, 'Bestial Supernatural, 25 foot Sphere PBAoE Maintained Damage, Bleed, and Knockback<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Slashing damage to nearby targets.<br />+ Chance per hit to Knock Back targets.  This Knockback effect receives half of the bonus from your Strength and the other half from your Ego.<br />+ Each hit has a 10% chance to apply Bleed.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Cower', '<div class="Sprite Supernatural_Cower"></div>&nbsp;Cower', 6, 23, pow++, 2, 'Bestial Supernatural, AoE Threat Wipe and Stealth<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWAoE'].tip + '<br />- Applies Fear to you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Run Away!', 'Run Away!', 2, null, 'Grants you a temporary 60% bonus to run speed, +6 to Flight, and +6 to Jump height.  These effects last 6 for seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Soul Mesmerism'].name, dataPowerAlias['Soul Mesmerism'].desc, 6, 23, pow++, 2, dataPowerAlias['Soul Mesmerism'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_SoulMesmerism";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Glossolalia'].name, dataPowerAlias['Glossolalia'].desc, 2, null, dataPowerAlias['Glossolalia'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = new Power(6, 23, 2, "Resurgence", 0, 0, 0, 0, 0, 90, "Targets Self", "Active Defense/Self Heal/Increased Health", "Heals you for 50/75/100% of your Mmaximum Health and increases your Maximum Health by a moderate amount for 15 seconds.<br /><br />Also causes Regeneration to heal for more if using it." + dataPowerAlias["ADCD"].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_Resurgence";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Evanescent Emergence'].name, dataPowerAlias['Evanescent Emergence'].desc, 2, null, dataPowerAlias['Evanescent Emergence'].tip));
dataPowerAlias["Resurgence"] = new PowerAlias(dataPower[dataPower.length-1]);
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Howl', '<div class="Sprite Supernatural_Howl"></div>&nbsp;Howl', 6, 23, pow++, 2, 'Bestial Supernatural, 25 foot Sphere PBAoE Friend Buff and Fear<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You let loose a fierce howl, inspiring your allies and frightening your foes.<br />+ Applies Fear to nearby foes.<br />+ Applies or refreshes Furious on nearby allies.<br />' + dataPowerAlias['Furious'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Make them Tremble', 'Make them Tremble', 1, null, 'The enemies who hear your Howl are so terrified they have a difficult time moving, becoming Snared and Rooted for a short while.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Intimidating Force', 'Intimidating Force', 2, null, 'Howl now Knocks Down targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = new Power(6, 23, 2, "Moonstruck", 1, 0, 0, 0, 0, 10, "Affects non-object foe (5 max)/15 foot Sphere", "Heal/Rune/Enchantment/Knock Down", "Knocks Down nearby targets and drops a healing rune, healing nearby allies every second for 10 seconds.");
dataPower[dataPower.length-1].iconOverride = "Any_Generic";
dataPower[dataPower.length-1].insertAdvantage("Moonlight", 2, null, "While standing in the area of effect, the damage resistance granted by Regeneration is increased by 5% and doesn\\\'t diminish as you lose health.");
dataPower[dataPower.length-1].insertAdvantage("Lunar Force", 2, null, "Standing in the area of effect increases Knock resistance by 25%, or 50% if affected by Furious.");
dataPower[dataPower.length-1].insertAdvantage("Midnight Frenzy", 2, null, "Each time Moonstruck heals you, the cooldown on Howl is reduced by 1 second.");
dataPower[dataPower.length-1].insertStockAdvantages("AM", "CS");



dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Command Animals', '<div class="Sprite Supernatural_CommandAnimals"></div>&nbsp;Command Animals', 6, 23, pow++, 2, 'Bestial Supernatural, Controllable Pet<br /><br />Requires 3 powers from Bestial Supernatural or 4 non-Energy Building powers from any framework.<br /><br />With this power you may summon powerful animal companions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Massacre', '<div class="Sprite Supernatural_Massacre"></div>&nbsp;Massacre', 6, 23, pow++, 3, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Knock Down<br /><br />Requires 5 powers from Bestial Supernatural or 6 non-Energy Building powers from any framework.<br /><br />You assault your foe with a powerful slash.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Bloody Mess', 'Bloody Mess', 2, null, 'Your Massacre deals additional damage to Bleeding targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias["Open Wound"].name, dataPowerAlias["Open Wound"].desc, 2, null, dataPowerAlias["Open Wound"].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Eviscerate', '<div class="Sprite Supernatural_Eviscerate"></div>&nbsp;Eviscerate', 6, 23, pow++, 3, 'Bestial Supernatural, 10 foot Melee Single Target Damage and Bleed Consume<br /><br />Requires 5 powers from Bestial Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Tap<br />+ Deals Slashing damage to your target, refreshing any Bleeds currently active.<br /><br />Charge<br />+ Increases the power and cost of the tap effect.<br />+ If fully charged, replaces all of your Bleeds with Deep wounds.  Deep Wounds deals heavy Slashing damage over time, with the amount of damage scaling with the number of Bleeds consumed.  Damage from Deep wounds ignores dodge, Shields, and partially ignores resistance.<br />+ While Deep wounds is active, you cannot apply any new Bleeds.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Messy', 'Messy', 2, null, 'Eviscerate now refreshes your Shredded debuff by 10 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = dataPowerAlias["Planar Fracture"].replicate(6, 23);
dataPower[dataPower.length] = dataPowerAlias["Endbringers Grasp"].replicate(6, 23);
dataPower[dataPower.length] = dataPowerAlias["Crashing Incantation"].replicate(6, 23);

//------------------------------------------------------------------------------
// Power Framework: Infernal Supernatural
//------------------------------------------------------------------------------

dataRequireGroup['mystic'].push(24);
dataRequireGroup['supernatural'].push(24);

var pow = 0;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Infernal Bolts', '<div class="Sprite Supernatural_InfernalBolts"></div>&nbsp;Infernal Bolts', 6, 24, pow++, -1, 'Infernal Supernatural, Energy Builder, 50 foot Ranged Single Target Damage<br /><br />Infernal Bolts fires shards of toxic energy at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2EB'].name, dataPowerAlias['R2EB'].desc, 2, null, dataPowerAlias['R2EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3EB'].name, dataPowerAlias['R3EB'].desc, 2, 1, dataPowerAlias['R3EB'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Toxin Overload', 'Toxin Overload', 2, null, 'Infernal Bolts has a 15% chance to apply Deadly Poison on each shot instead of just the first.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Lash', '<div class="Sprite Supernatural_Lash"></div>&nbsp;Lash', 6, 24, pow++, 0, 'Infernal Supernatural, 50 foot Ranged (Combo) Single Target Damage<br /><br />Lash swings a length of infernal chain at your enemy.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Decay', 'Decay', 2, null, 'Finishing the combo applies Debilitating Poison to the target, increasing all Elemental damage they receive by a small amount and all Toxic damage by an additional amount.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Infernal Blast', '<div class="Sprite Supernatural_InfernalBlast"></div>&nbsp;Infernal Blast', 6, 24, pow++, 0, 'Infernal Supernatural, 100 foot Ranged Single Target Damage and Poison (Blast)<br /><br />Infernal Blast is a highly focused bolt of Toxic power. Your foes will lose this war of attrition.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Virulent Propagation', 'Virulent Propagation', 2, null, 'Fully charging this power on a Poisoned target will spread the affliction to a nearby foe. This can occur for each type of Poison on the target. Refreshes the duration of all Poisons on all targets hit.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Devour Essence', '<div class="Sprite Supernatural_DevourEssence"></div>&nbsp;Devour Essence', 6, 24, pow++, 1, 'Infernal Supernatural, 10 foot Melee Single Target Damage and Self Heal<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Devour Essence is a parasitic attack that drains Health from your enemy and transfers it to you.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Phlebotomist', 'Phlebotomist', 2, null, 'Causes Devour Essence to Root its target for the duration of the attack, and Devour Essence will gain 150% healing from Bleeding or Poisoned targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vile Lariat', '<div class="Sprite Supernatural_VileLariat"></div>&nbsp;Vile Lariat', 6, 24, pow++, 1, 'Infernal Supernatural, 50 foot Ranged Single Target Damage and Knock To<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Vile Lariat lashes out at your enemy using an infernal chain as a whip.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Fester', 'Fester', 2, null, 'Fully charging Vile Lariat debuffs your target by -5% damage strength over 12 seconds for every one of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Work Up', 'Work Up', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Viral', 'Viral', 2, null, 'Applies Viral to the target for 10 seconds.  Every 2 seconds, Viral has a 25% chance to apply a stack of Deadly Poison.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Corrupt', 'Corrupt', 2, null, 'Fully charging Vile Lariat refreshes your Poison on the target.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Vicious Cyclone', '<div class="Sprite Supernatural_ViciousCyclone"></div>&nbsp;Vicious Cyclone', 6, 24, pow++, 1, 'Infernal Supernatural, 25 foot Sphere PBAoE Ranged Damage and Knock Back<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Vicious Cyclone swings an infernal chain around you, lashing out at any enemies that come within its path.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Vortex Technique'].name, dataPowerAlias['Vortex Technique'].desc, 2, null, dataPowerAlias['Vortex Technique'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Venomous Breath'].name, dataPowerAlias['Venomous Breath'].desc, 6, 24, pow++, 1, dataPowerAlias['Venomous Breath'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_VenomousBreath";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Paralytic Bile'].name, dataPowerAlias['Paralytic Bile'].desc, 2, null, dataPowerAlias['Paralytic Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['Infectious Bile'].name, dataPowerAlias['Infectious Bile'].desc, 2, null, dataPowerAlias['Infectious Bile'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['Locust Breath'].name, dataPowerAlias['Locust Breath'].desc, 0, null, dataPowerAlias['Locust Breath'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Condemn', '<div class="Sprite Supernatural_Condemn"></div>&nbsp;Condemn', 6, 24, pow++, 1, 'Infernal Supernatural, 50 foot Ranged 8-15 foot Sphere AoE Damage<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Condemn causes a concentrated burst of Toxic energy to slam into your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Redemption Denied', 'Redemption Denied', 2, null, 'On a full charge, Condemn now Paralyzes your primary target and Stuns any other affected targets.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Corrupting Force', 'Corrupting Force', 2, null, 'On a full charge, Condemn applies Debilitating Poison to the target, reducing their Toxic resistance by 12% and all Elemental resistance by 8% for 16 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Dark Rune', 'Dark Rune', 2, null, '+ On a full charge, creates a Healing Rune at the primary target\\\'s location.  This rune heals all allies within it every second for 10 seconds.<br />+ You cannot have more than 1 Healing Rune active at any time.<br />+ Summoning the Healing Rune counts as an Enchantment'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Life Essence', '<div class="Sprite Supernatural_LifeEssence"></div>&nbsp;Life Essence', 6, 24, pow++, 1, 'Infernal Supernatural, 20 foot PBAoE Heal<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />Heals you once per tick for an amount, and any allies within 20 feet are healed for half of that amount.  If the target is affected by any Poison, the ally healing is doubled.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Infernal Bond', 'Infernal Bond', 2, null, 'Life Essence now deals Toxic damage to the target in addition to its normal effects.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aspect of the Infernal', '<div class="Sprite Supernatural_AspectOfTheInfernal"></div>&nbsp;Aspect of the Infernal', 6, 24, pow++, 1, 'Infernal Supernatural, Form (Intelligence or Ego)<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Gives you a stacking buff that increases your ranged damage, as well as your melee damage to a lesser degree.<br /><br />+ You gain a stack each time you apply or refresh a Poison.<br />+ Each time you gain a stack, existing stacks are refreshed and you gain energy.<br />+ Stacks up to 8 times, lasts 20 seconds, and can only gain 1 stack every 4 seconds.<br />- Increases energy costs by 10%.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['FR2'].name, dataPowerAlias['FR2'].desc, 2, null, dataPowerAlias['FR2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['FR3'].name, dataPowerAlias['FR3'].desc, 2, 1, dataPowerAlias['FR3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Regeneration'].name, dataPowerAlias['Regeneration'].desc, 6, 24, pow++, 1, dataPowerAlias['Regeneration'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_Regeneration";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Pestilence'].name, dataPowerAlias['Pestilence'].desc, 6, 24, pow++, 1, dataPowerAlias['Pestilence'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_Pestilence";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = dataPowerAlias["Compassion"].replicate(6, 24);
dataRequireGroupPower[dataPower.length-1] = 'mystic';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Voodoo Doll', '<div class="Sprite Supernatural_VoodooDoll"></div>&nbsp;Voodoo Doll', 6, 24, pow++, 1, 'Infernal Supernatural, Block<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />While blocking, grants 250% resistance to all damage, increases your resistance to Holds and Knocks, and reduces your movement speed. <br /><br />Features:<br />+ Blocking an attack deals Toxic damage to the attacker.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Voodoo Curse', 'Voodoo Curse', 2, null, '+ Incoming attacks also have a small chance to Stun nearby enemies.<br />+ This effect can only occur once every 10 seconds.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Mephitic', '<div class="Sprite Supernatural_Mephitic"></div>&nbsp;Mephitic', 6, 24, pow++, 1, 'Infernal Supernatural, Energy Unlock (Endurance, <i>Recovery</i>)<br /><br />Requires 1 power from Infernal Supernatural or 2 non-Energy Building powers from any framework.<br /><br />You may only have 1 Energy Unlock power.<br /><br />+ Geenrates energy every 3 seconds for 6 seconds every time you apply or refresh a Poison.<br />+ Additional applications will refresh the effect.<br />+ The energy gained scales with your Endurance, and to a lesser degree, your Recovery.');
dataEnergyUnlockPower[dataPower.length-1] = true;

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Supernatural Power'].name, dataPowerAlias['Supernatural Power'].desc, 6, 24, pow++, 1, dataPowerAlias['Supernatural Power'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_SupernaturalPower";
dataEnergyUnlockPower[dataPower.length-1] = true;
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Epidemic', '<div class="Sprite Supernatural_Epidemic"></div>&nbsp;Epidemic', 6, 24, pow++, 2, 'Infernal Supernatural, 25 foot Sphere PBAoE Ranged Damage and Poison<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Unleash a great plague upon your enemies.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Outbreak', 'Outbreak', 2, null, 'Reduces the maximum maintain time of this power by one second. Also increases the chance to apply Deadly Poison to 25%.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Death\'s Embrace', '<div class="Sprite Supernatural_DeathsEmbrace"></div>&nbsp;Death\'s Embrace', 6, 24, pow++, 2, 'Infernal Supernatural, Resurrection<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Brings a dead player back to life with 33/66/100% (based on rank) of their maximum health.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Pact', 'Pact', 2, null, '+ Can now bring up to 4 dead players back to life.<br />+ Healing received is divided among the number of players resurrected.'));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Will-o\'-the-Wisp', '<div class="Sprite Supernatural_WillOTheWisp"></div>&nbsp;Will-o\'-the-Wisp', 6, 24, pow++, 2, 'Infernal Supernatural, 100 feet, 10 foot Sphere Poison and Debuff<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Applies Debilitating Poison to your primary target.<br />+ Debilitating Poison is a type of Poison and Curse.<br />+ Applies Deadly Poison to nearby secondary targets.<br />+ Deadly Poison is a type of Poison.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Guide', 'Guide', 2, null, '+ Applies Illumination to you and nearby allies as well as Illuminated to your targets.<br /> + ' + dataPowerAlias['Illumination'].tip + '<br />+ ' + dataPowerAlias['Illuminated'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Cursed', 'Cursed', 2, null, 'Applies Hexed to your primary target, reducing their resistance to Magic damage by 18% for 12 seconds.  Hexed is a type of Curse'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Ghost Fire', 'Ghost Fire', 2, null, '+ Applies Clinging Flames to your primary target.  Clinging Flames is a type of Burning effect that deals Fire damage every 2 seconds for 12 seconds.<br />+ Applies Fear to your primary target.  Fear is a type of Mental state that reduces their damage strength by 10% for 12 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Harbinger', 'Harbinger', 2, null, 'Stuns the target for 2 seconds.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Crippling Coils', '<div class="Sprite Supernatural_CripplingCoils"></div>&nbsp;Crippling Coils', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Ranged Single Target Incapacitate<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />Crippling Coils sends chains through the ground to latch on to your foe, preventing them from attacking or even moving.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Barbed Chains', 'Barbed Chains', 2, null, 'Any time an opponent breaks free from a Hold while affected by Crippling Coils they take a moderate amount of Slashing damage and begin Bleeding.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Light Everlasting', 'Light Everlasting', 2, null, '+ If Crippling Coils is maintained for more than 1 second, applies Light Everlasting to allies near you.<br />+ ' + dataPowerAlias['Light Everlasting'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['NG'].name, dataPowerAlias['NG'].desc, 2, null, dataPowerAlias['NG'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Curse', '<div class="Sprite Supernatural_Curse"></div>&nbsp;Curse', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Ranged 15 foot AoE Target Damage Stun<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />+ Deals Toxic Damage.<br />+ Briefly Stuns the primary target.<br />+ briefly Stuns any secondary targets affected by any Poison.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Jinxed', 'Jinxed', 2, null, '+ Applies Jinxed to your targets.<br />+ ' + dataPowerAlias['Jinxed'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, 'Needles', 'Needles', 2, null, '+ Applies Bleeding to your target if they aren\\\'t already Bleeding.<br />+ Bleeding is a type of Wound.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, 'Covet', 'Covet', 2, null, dataPowerAlias['SP'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, 'Corrosion', 'Corrosion', 2, null, 'Refreshes all of your Poison stacks.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(7, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(8, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Locust Swarm', '<div class="Sprite Supernatural_LocustSwarm"></div>&nbsp;Locust Swarm', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Single Target Hold<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You call a swarm of locusts on your foe, preventing them from taking any actions.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Festering Bites', 'Festering Bites', 2, null, 'Each time your Locust Swarm deals damage, it has a 15% chance to apply Deadly Poison, which stacks up to 5 times and causes your target to suffer Toxic Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CC'].name, dataPowerAlias['CC'].desc, 3, null, dataPowerAlias['CC'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(6, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, dataPowerAlias['Soul Mesmerism'].name, dataPowerAlias['Soul Mesmerism'].desc, 6, 24, pow++, 2, dataPowerAlias['Soul Mesmerism'].tip);
dataPower[dataPower.length-1].iconOverride = "Supernatural_SoulMesmerism";
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, dataPowerAlias['Glossolalia'].name, dataPowerAlias['Glossolalia'].desc, 2, null, dataPowerAlias['Glossolalia'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = dataPowerAlias["Resurgence"].replicate(6, 24);
dataRequireGroupPower[dataPower.length-1] = 'supernatural';

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Entrancing', '<div class="Sprite Supernatural_Entrancing"></div>&nbsp;Entrancing', 6, 24, pow++, 2, 'Infernal Supernatural, 50 foot Single Target Threat Wipe<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />' + dataPowerAlias['TWST'].tip);
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

// removed from game
// dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Aspect of the Ethereal', '<div class="Sprite Supernatural_AspectOfTheEthereal"></div>&nbsp;Aspect of the Ethereal', 6, 24, pow++, 2, 'Infernal Supernatural, Self Buff Form<br /><br />Requires 3 powers from Infernal Supernatural or 4 non-Energy Building powers from any framework.<br /><br />You focus on your connection with your Infernal powers, increasing their effect.');
// dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
// dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
// dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Defile', '<div class="Sprite Supernatural_Defile"></div>&nbsp;Defile', 6, 24, pow++, 3, 'Infernal Supernatural, 100 foot Ranged Single Target Damage and Debuff<br /><br />Requires 5 powers from Infernal Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Defile greatly damages your target and weakens their resistance to toxic damage.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Plague Bearer', 'Plague Bearer', 2, null, 'Fully charging Defile places an AoE Toxic DoT on your target. The target and other foes within 10 feet take Toxic Damage over Time.'));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(4, dataPowerAlias['AM'].name, dataPowerAlias['AM'].desc, 1, null, dataPowerAlias['AM'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(5, dataPowerAlias['CS'].name, dataPowerAlias['CS'].desc, 1, null, dataPowerAlias['CS'].tip));

dataPower[dataPower.length] = Power.legacyConstructor(dataPower.length, 'Rebirth', '<div class="Sprite Supernatural_Rebirth"></div>&nbsp;Rebirth', 6, 24, pow++, 3, 'Infernal Supernatural, Self Resurrection and Heal<br /><br />Requires 5 powers from Infernal Supernatural or 6 non-Energy Building powers from any framework.<br /><br />Can be used while dead to resurrect with 100% of your maximum health and grants you the following for 20 seconds:<br /><br />+ 100% to damage strength.<br />+ 100% resistance to all damage.<br />+ Killing foes restores a portion of your health.<br />- Lose health equal to 5% of your maximum health every second.<br />- Shares a cooldown with similar powers.');
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(0, null, null, null, null, null));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(1, dataPowerAlias['R2'].name, dataPowerAlias['R2'].desc, 2, null, dataPowerAlias['R2'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(2, dataPowerAlias['R3'].name, dataPowerAlias['R3'].desc, 2, 1, dataPowerAlias['R3'].tip));
dataPower[dataPower.length-1].advantageList.push(PowerAdvantage.legacyConstructor(3, 'Grave Consequences', 'Grave Consequences', 2, null, 'Summons three Zombies to help your return to the land of the living succeed.'));

dataPower[dataPower.length] = dataPowerAlias["Planar Fracture"].replicate(6, 24);
dataPower[dataPower.length] = dataPowerAlias["Endbringers Grasp"].replicate(6, 24);
dataPower[dataPower.length] = dataPowerAlias["Crashing Incantation"].replicate(6, 24);

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
dataSpecializationTree[dataSpecializationTree.length-1].specializationList.push(new Specialization(5, 'Outburst', '<div class="Sprite Specialization_SuperCharged"></div>&nbsp;Outburst', 2, 3, 'When your Energy is above 90%:<br />+ The base damage of your attacks is increased by 5/10/15%.<br />+ The healing portion of your powers is increased by 5/10/15%.<br />+ Your power costs are reduced by 5/10/15%.'));
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
		return "{code:" + this.code() + "}" + JSON.stringify(this);
		/*
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
	*/
	}
}

// archetype data
var sGoldUnlock = '<br /><br /><b>This archetype can be unlocked in the C-Store or by becoming a current subscriber (gold) or lifetime member.</b>';
var aRoles = ['Hybrid', 'Tank', 'Melee Damage', 'Ranged Damage', 'Support'];
var dataArchetype = [];
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, null, null, null, null, null, null, null, null);
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'Freeform', '<div class="Sprite Archetype_Freeform"></div>', 'Freeform', null, null, null, null, 'Combat Role:  Any<br /><br />Choose this option to mix and match your starting powers from any archetype. Tailor your hero\\\'s characteristics by choosing an Innate Talent. Archetypes are built and balanced to provide everything a hero needs, but those who want complete control can use a custom champion.<br /><br /><b>You must be a current subscriber (gold) or lifetime member to access Freeform characters.</b>');
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Inferno', '<div class="Sprite Archetype_Inferno"></div>', 'Ranged', ['Recovery', 'Endurance', 'Ego'], 'The Inferno', ['Throw Fire', 'Fire Strike', 'Fireball', 'Fiery Form', ['Fire Breath', 'Pyre'], 'Concentration', 'Conflagration', 'Fire Shield', 'Thermal Reverberation', 'Immolation', ['Heat Wave', 'Fire Snake'], 'Flashfire'], ['Recovery', 'Avenger', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You control the devastating element of fire, creating and shaping it to your will. Whether hurling flaming projectiles or erupting into a deadly firestorm, you leave a blazing swath of destruction in your wake.<br /><br />Concepts: Fire Mutation, Flame Mage, Magma Creature, Plasma Control Suit, Pyrokinetic<br /><br />You have Ranged area attacks that cause Damage over Time. You can\\\'t take a lot of damage though, so be sure to hit your targets hard enough to take them down or recruit a tough ally who can take the damage for you. You can also absorb Energy from fire around you, so you become most powerful when you set things on fire. Light things up and feel the burn!' + ArchetypeUnlock(false));
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Tempest', '<div class="Sprite Archetype_Tempest"></div>', 'Ranged', ['Endurance', 'Ego', 'Recovery'], 'The Tempest', ['Electric Bolt', 'Chain Lightning', 'Electrical Current', 'Electric Form', ['Thunderstrike', 'Ball Lightning'], 'Power Source', 'Lightning Arc', 'Electric Shield', 'Ionic Reverberation', ['Gigabolt', 'Lightning Storm'], 'Electric Sheath', ['Electrocute', 'Blinding Light']], ['Endurance', 'Avenger', 'Guardian'], 'Combat Role:  ' + aRoles[3] + '<br /><br />You are able to control and create electrical currents, generating electricity on your own or even directly affecting the weather itself. With a bolt of lightning from the sky or a continuous barrage of electricity, you are able to devastate your foes.<br /><br />Concepts: Tesla Coil Suit, Air Elemental, Electric Mutation, Lightning Wizard, Weather Control Artifact<br /><br />You have a variety of Ranged attacks, many of which are capable of hitting multiple foes. Many of your powers leave your targets electrically charged, setting you up for future attacks against them. You aren\\\'t so great at taking a beating yourself, so take them down quickly before they overwhelm you.' + ArchetypeUnlock(true));
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
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Disciple', '<div class="Sprite Archetype_Disciple"></div>', 'Melee', ['Ego', 'Recovery', 'Dexterity'], 'The Disciple', ['Ego Blade', 'Ego Weaponry', 'Id Mastery', ['Ego Blade Frenzy', 'Telekinetic Wave'], 'Ego Blade Dash', 'Mental Discipline', 'Ego Blade Annihilation', 'Telekinetic Shield', 'Telekinetic Reverberation', ['Ego Blade Breach', 'Telekinetic Shards'], ['Telekinetic Maelstrom', 'Telekinetic Eruption'], ['Master of the Mind', 'Ego Surge']], ['Ego', 'Vindicator', 'Brawler'], 'Combat Role:  ' + aRoles[2] + '<br /><br />You are a master of manipulating kinetic Energy. These powers primarily manifest themselves as your kinetic weaponry, but you can also summon even greater telekinetic power to shield yourself or destroy foes.<br /><br />Concepts: Telekinetic Warrior, Psychic Ninja, Psi-Assassin, Mental Mastermind, Technological Energy Blades<br /><br />You have many powerful Melee attacks, as well as close range group attacks. You have the ability to dish out tons of damage immediately around you, and can use your mental prowess to gain energy while defeating foes in combat.' + ArchetypeUnlock(true));
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
dataArchetype[dataArchetype.length] = new Archetype(dataArchetype.length, 'The Psychokinetic', '<div class="Sprite Archetype_Psychokinetic"></div>', 'Ranged', ['Ego', 'Recovery', 'Dexterity'], 'The Psychokinetic', ['Kinetic Darts', 'Telekinetic Strike', 'Ego Form', ['Telekinetic Burst', 'Telekinetic Barrage'], 'Telekinetic Shards', 'Mental Precision', ['Telekinetic Lance', 'Telekinetic Assault'], 'Telekinetic Shield', 'Telekinetic Reverberation', ['Telekinetic Maelstrom', 'Telekinetic Eruption'], ['Ego Choke', 'Ego Hold'], ['Master of the Mind', 'Ego Surge']], ['Ego', 'Vindicator', 'Avenger'], 'Combat Role:  ' + aRoles[3] + '<br /><br />While others may rush headlong into the fray, you\\\'ve mastered the ability to bring the fray to your opponent.  Use the power of your mind to send the enemy flying with kinetic blasts and devastating critical hits.<br /><br />Concepts: Telekinetic Warrior, Mental Mastermind, Mental Attacker, Frontline Psychic Artillery<br /><br />There\\\'s no faster weapon than your mind.  You don\\\'t have to get near the enemy when you can simply reach out with your blast them with just a thought.  Put your mind over matter to heal some of the damage that may get to you, but don\\\'t let it stack up.[sic]' + ArchetypeUnlock(true));

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
