/*==============================================================================
 * powerhouse-aes-extender.js
 *
 * PowerHouse Extender
 *
 * Author: Aesica
 *
 * Time-stamp: <2016-08-01 (Aesica)>
 *============================================================================*/

//==============================================================================
// Additional functionality to make adding data to the powerhouse easier
//==============================================================================

var aFrameworks = ["", "Electrical", "Fire", "Force", "Wind", "Ice", "Archery", "Gadgeteering", "Munitions", "Power Armor", "Dual Blades", "Fighting Claws", "Single Blade", "Unarmed", "Telekinesis", "Telepathy", "Heavy Weapons", "Earth", "Might", "Celestial", "Darkness", "Sorcery", "Bestial Supernatural", "Infernal Supernatural"];
var aTiers = [0, 1, 3, 5];

/** Alternate way to create commonly-repeated parts of power tooltips
* iFramework		Framework ID (I should make consts for these at some point to make this more coder-friendly)
* iTier				Power tier
* sTargetingEtc		This is the brief target/range/basic description
* sDesc				This is the actual power description
*/
function PowerTip(iFramework, iTier, sTargetingEtc, sDesc)
{
	var sReturn = aFrameworks[iFramework];
	
	if (iTier == -1) sReturn += ", Energy Builder";
	
	sReturn += ", " + sTargetingEtc + "<br /><br />";
	
	if (iTier > 0 && iTier < 4) // tiered powers with requirements
	{
		sReturn += "Requires " + aTiers[iTier] + " powers from " + aFrameworks[iFramework] + " or " + (aTiers[iTier] + 1) + " non-Energy Building powers from any framework.<br /><br />";
	}
	else if (iTier == 4) // ultimate -- note that this isn't useful at the moment
	{
		sReturn += "Requires level 35<br /><br />You may only own 1 ultimate Power.<br /><br />";
	}
	
	sReturn += sDesc;
	
	return sReturn;
}

// 
/** Shorter way to parse an advantage created via PowerAlias
* id			ID of power
* alias			Power alias object
* points		Number of advantage points required
* dependency	Dependency advantage, if any.  Currently only used by Rank-based advantages
*/
function QuickPower(id, alias, points=2, dependency=null)
{
	return new PowerAdvantage(id, alias.name, alias.desc, points, dependency, alias.tip);
}

function PetTip(petName, rank1desc, rank2desc, rank3desc, other=null)
{
	var sReturn = petName + "<br /><br />+ R1:  " + rank1desc + "<br />+ R2:  " + rank2desc + "<br /> + R3:  " + rank3desc;
	
	if (other != null)
	{
		sReturn += "<br />+ Custom Ability:  " + other;
	}
	
	return sReturn;
}

function ArchetypeUnlock(bGoldUnlock=false, sSpecialEvent=null, ...aOtherMethods)
{
	var sReturn = "<br /><br />";
	var iLength = aOtherMethods.length;
	var i;
	
	if (!bGoldUnlock && sSpecialEvent == null && iLength == 0)
	{
		sReturn += "This archetype is freely accessible to all players.";
	}
	else
	{
		sReturn += "This archetype can be unlocked the following ways:<ul>";
		
		if (bGoldUnlock) sReturn += "<li>Gold/Lifetime subscription</li>";
		
		if (sSpecialEvent) sReturn += "<li>" + sSpecialEvent + " event reward</li>";
		
		for (i = 0; i < iLength; i++)
		{
			sReturn += "<li>" + aOtherMethods[i] + "</li>";
		}
	}
	return sReturn;
}

//==============================================================================
// powerhouse-version.js ends here
//==============================================================================
