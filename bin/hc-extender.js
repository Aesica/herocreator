/*==============================================================================
 * hc-extender.js
 *
 * Author: Aesica
 *
 * Time-stamp: <2016-08-01 (Aesica)>
 *============================================================================*/

//==============================================================================
// Additional functionality without adding more functions/etc to powerhouse.js
//==============================================================================

var aTiers = [0, 1, 3, 5];

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
		if (bGoldUnlock) sReturn += "<li>Gold/Lifetime subscription</li><li>C-Store purchase</li>";
		if (sSpecialEvent) sReturn += "<li>" + sSpecialEvent + " event reward</li>";
		for (i = 0; i < iLength; i++)
		{
			sReturn += "<li>" + aOtherMethods[i] + "</li>";
		}
		sReturn += "</ul>";
	}
	return sReturn;
}

function DebugOutputFromInput(fFunction)
{
	var txtField = document.getElementById("debugoutput");
	if (txtField && fFunction)
	{
		try
		{
			txtField.value = fFunction(txtField.value);
		}
		catch(e)
		{
			alert("You're doing it wrong.");
		}
	}
}

function PowerUnlocksFrom(sUnlockSource, sCost=null, sCurrencyName=null)
{
	var sReturn = "<br /><br /><b>Unlock via:  " + sUnlockSource;
	if (sCost) sReturn += " for " + sCost + ((sCurrencyName) ? " " + sCurrencyName : "");
	sReturn += "</b>";
	return sReturn;
}

function DebugOutput(sText)
{
	var txtOutput = document.getElementById("debugoutput");
	txtOutput.value = sText;
}

// TODO:  document click close--see selectClearMaybe and related functions
function SetVisibility(sID, bVisible)
{
	document.getElementById(sID).style.display = (bVisible) ? "" : "none";
	popout();
}

function ResetDialogBox(iNewColumnCount=1, sColumnPadding="2em")
{
	// get pieces
	var mMain = document.getElementById("selectionWindow");
	var mHeader = document.getElementById("selectionWindowHeader");
	var mMenu = document.getElementById("selectionWindowMenu");
	var mContents = document.getElementById("selectionWindowContainer");
	// set header
	mHeader.innerHTML = "";
	// set menu
	mMenu.parentNode.removeChild(mMenu);
	mMenu = document.createElement("div");
	mMenu.setAttribute("style", "display: none;")
	mMenu.setAttribute("id", "selectionWindowMenu");
	// init new container
	mContents.parentNode.removeChild(mContents);
	mContents = document.createElement("div");
	mContents.setAttribute("id", "selectionWindowContainer");
	// main section
	var mMainSection = document.createElement("div");
	mMainSection.setAttribute("id", "selectionWindowContainerMain");
	mContents.appendChild(mMainSection);
	// columns below main section
	var i;
	var mColumn;
	var sStyle = "float: left; margin-bottom: 5px;";
	for (i = 0; i < iNewColumnCount; i++)
	{
		mColumn = document.createElement("span");
		mColumn.setAttribute("id", "selectionWindowContainerColumn" + i);
		if (i < iNewColumnCount - 1) mColumn.setAttribute("style", sStyle + " padding-right: " + sColumnPadding + ";");
		else mColumn.setAttribute("style", sStyle);
		mContents.appendChild(mColumn);
	}
	mMain.appendChild(mMenu);
	mMain.appendChild(mContents);
}

function SetDialogBoxHeader(sNewHeader="")
{
	var mHeader = document.getElementById("selectionWindowHeader");
	mHeader.innerHTML = sNewHeader;
}

function AddItemToDialogBoxMenu(mNode)
{
	var mMenu = document.getElementById("selectionWindowMenu");
	if (mMenu)
	{
		mMenu.appendChild(mNode);
		mMenu.setAttribute("style", "display: block;")
	}
	else AddItemToDialogBox(mNode);
}

function AddItemToDialogBox(mNode, iColumnID=-1)
{
	var mSection;
	if (iColumnID == -1)
	{
		mSection = document.getElementById("selectionWindowContainerMain");
	}
	else
	{
		mSection = document.getElementById("selectionWindowContainerColumn" + iColumnID);
	}
	if (mSection) mSection.appendChild(mNode);
}

function CreateButton(sLabel, sID="", sClass="", sOnClick="")
{
	var mReturn = document.createElement("a");
	mReturn.setAttribute("id", sID);
	mReturn.setAttribute("class", sClass);
	mReturn.setAttribute("onclick", sOnClick); // TODO:  Eval bullshit.  Allowed to live only until the dependent evals in powerhouse.js are dealt with
	mReturn.innerHTML = sLabel;
	return mReturn;
}

////////////////// Custom Font stuff////////////////////////////

// name functions
function editFont()
{
    var mField = document.getElementById("editFont");
    mField.value = prefFontFamily;
    hideSection("sectionDisplayFont");
    showSection("sectionEditFont");
    mField.focus();
}

function cancelFont()
{
    hideSection("sectionEditFont");
    showSection("sectionDisplayFont");
}

function changeFont(e)
{
    prefFontFamily = document.getElementById("editFont").value;
    hideSection("sectionEditFont");
    document.getElementById("prefFontFamilyName").firstChild.data = prefFontFamily;
    showSection("sectionDisplayFont");
	setPrefFontFamily(prefFontFamily);
}

/////////////////////// Reference sheet /////////////////////

function InitReferenceSheet()
{
	var mDamageTypeList = document.getElementById("damageTypeList");
	var i, iLength = dataDamageType.length;
	var sData = "<table>";
	//alert(JSON.stringify(dataDamageType));
	for (i = 0; i < iLength; i++)
	{
		sData += "<tr><td>" + dataDamageType[i].group + "</td><td>" + dataDamageType[i].name + "</td><td>" + dataDamageType[i].frameworkList + "</td></tr>";
	}
	sData += "</table>";
	mDamageTypeList.innerHTML = sData;
}


////////////////////////// Local storage & data load/save functions ///////////////

/**
 * Tests to see if local storage is supported
 */
function LocalStorageSupported()
{
	var bTest = "localStorage" in window && window["localStorage"] !== null;
	return bTest;
}

/** Saves data
 * sKey Local storage identifier
 * value Data to save
 * bRequireLocalStorage If true, won't save anything if local storage isn't supported
 * sFailureMessage message to show if local storage isn't supported, but required via bRequireLocalStorage
 */
function SaveData(sKey, value, bRequireLocalStorage=false, sFailureMessage="")
{
	// save to local storage is supported
	if (LocalStorageSupported())
	{
		localStorage[sKey] = value;
	}
	// cookie fallback
	else if (!bRequireLocalStorage)
	{
		setCookie(sKey, value, cookieExpireDays);
	}
	// show failure message if cookie fallback isn't allowed and local storage isn't supported
	// beware, can be spammy if invoked frequently.
	else if (sFailureMessage != "")
	{
		alert(sFailureMessage);
	}
}
/** Loads data
 * sKey Local storage identifier
 * bRequireLocalStorage If true, won't save anything if local storage isn't supported
 * sFailureMessage message to show if local storage isn't supported, but required via bRequireLocalStorage
 */
function LoadData(sKey, bRequireLocalStorage=false, sFailureMessage="")
{
	var oReturn = undefined;

	// load from local storage if supported
	if (LocalStorageSupported())
	{
		oReturn = localStorage[sKey];
	}
	// cookie fallback
	else if (!bRequireLocalStorage)
	{
		oReturn = getCookie(sKey);
	}
	// show failure message if cookie fallback isn't allowed and local storage isn't supported
	// beware, ca nbe spammy if invoked frequently
	else if (sFailureMessage != "")
	{
		alert(sFailureMessage);
	}

	return oReturn;
}
///////////////// Save Builds //////////////////////////////
// savedObject = name:String, url:String, desc:String
function LoadBuildArray()
{
	var aReturn = [];
	var sData = LoadData("savedData", true);
	if (!sData)
	{
		SaveData("savedData", JSON.stringify(aReturn), true);
	}
	else
	{
		aReturn = JSON.parse(sData);
	}
	return aReturn;
}

function SaveBuildArray(aSave)
{
	if (!Array.isArray(aSave)) aSave = [];
	SaveData("savedData", JSON.stringify(aSave), true);
}

function SetUpSaveTools()
{
	var mContainer = document.getElementById("viewData");
	var mDiv, mButton, mTextArea;
	if (mContainer)
	{
		// master tools
		mDiv = document.createElement("div");
		mDiv.setAttribute("class", "pageSection");
		mButton = CreateButton("Backup", "", "dataButton", "SetupExport();");
		setOnmouseoverPopupL1(mButton, "Allows you to create backups of your saved data as a single chunk of text.  This text can then be pasted into a text file and saved on your computer.<br /><br /><b>Making periodic backups is highly recommended.</b>");
		mDiv.appendChild(mButton);
		mButton = CreateButton("Restore", "", "dataButton", "SetupImport();");
		setOnmouseoverPopupL1(mButton, "Allows you to import backup data.<br /><br /><b>This operation will overwrite all existing saved data!</b>");
		mDiv.appendChild(mButton);
		mButton = CreateButton("Delete", "", "dataButton", "selectConfirmation('DeleteData(GetCheckedSlots()); selectClearHideSections(); RefreshSaveList();', 'Delete Data', '<b>**WARNING**</b><br /><br />You are about to PERMANENTLY delete the selected character data! :o <br /><br />This cannot be undone.', 'Delete Data', true);");
		setOnmouseoverPopupL1(mButton, "This will delete data from each of the slots you have selected.");
		mDiv.appendChild(mButton);
		mContainer.appendChild(mDiv);
	
		// clear cookies warning message
		mDiv = document.createElement("div");
		mDiv.setAttribute("class", "pageSection");
		mDiv.innerHTML = "Warning:  Deleting cookies without setting a specific expiration date or using programs that remove usage tracks, browser/website data, etc will most likely result in the loss of everything saved above.  Making periodic backups of data you want to keep is a good idea.";
		mContainer.appendChild(mDiv);
	}
}

function GetCheckedSlots()
{
	var i;
	var iLength = LoadBuildArray().length;
	var aReturn = [];
	var mBox;
	for (i = 0; i < iLength; i++)
	{
		mBox = document.getElementById("deleteDataBox" + i);
		if (mBox.checked) aReturn.push(mBox.value);
	}
	return aReturn;
}

function ImportData()
{
	var aData;
	var mImportField = document.getElementById("importTextArea");
	if (LocalStorageSupported())
	{
		try
		{
			aData = JSON.parse(atob(mImportField.value));
			if (aData)
			{
				SaveBuildArray(aData);
				selectClearHideSections();
				RefreshSaveList();
			}
		}
		catch(e)
		{
			selectConfirmation("", "Invalid Backup Data", "The data you have entered is not valid. :(", "OK", true);
		}
	}
}

function SetupImport()
{
	ResetDialogBox();
	SetDialogBoxHeader("Restore");
	var mButton = CreateButton("Yes, replace my existing saved data with this", "", "", "ImportData();");
	var mTextArea = document.createElement("textarea");
	mTextArea.setAttribute("id", "importTextArea");
	mTextArea.setAttribute("class", "importExport");
	mTextArea.setAttribute("placeholder", "Paste backup data into this window, then click the button below to continue.  Note that this will overwrite ALL currently saved data!");
	mButton.setAttribute("class", "selectConfirmButton");
	setOnmouseoverPopupL1(mButton, "<b>**WARNING**</b><br /><br />This operation will overwite ALL of the existing data!");
	AddItemToDialogBoxMenu(mTextArea);
	AddItemToDialogBox(mButton);
	showPositionSection("selectionWindow", true);
	mTextArea.focus();
}

function SetupExport()
{
	ResetDialogBox();
	SetDialogBoxHeader("Backup");
	
	var mTextArea = document.createElement("textarea");
	var mInfo = document.createElement("div");
	var aData = LoadBuildArray();
	mTextArea.setAttribute("class", "importExport");
	mTextArea.readOnly = true;
	mTextArea.innerHTML = btoa(JSON.stringify(aData));
	mInfo.innerHTML = "This gibberish can be used to back up and restore your saved character data.<br /><ul><li>Press Ctrl-C to copy this data to the clipboard</li><li>Create a new text file</li><li>Press Ctrl-V to paste it into the new text file and save it</li></ul>";
	AddItemToDialogBoxMenu(mTextArea);
	AddItemToDialogBox(mInfo);
	showPositionSection("selectionWindow", true);	
	mTextArea.focus();
	mTextArea.select();
}

function RefreshSaveList()
{
	var mContainer = document.getElementById("saveDataContainer");
	var mTable = document.getElementById("saveDataTable");
	var mTd, mTr, mNode;
	var i, iLength;
	var aSaveData, oSave;
	// empty old contents, if any
	if (mTable) mContainer.removeChild(mTable);
	mTable = document.createElement("table");
	mTable.setAttribute("id", "saveDataTable");
	mContainer.appendChild(mTable);
	// populate only if local storage exists
	if (LocalStorageSupported())
	{
		aSaveData = LoadBuildArray();
		iLength = aSaveData.length;
		
		// refresh counter/label
		mTr = document.createElement("tr");
		mTd = document.createElement("td");
		mNode = document.createElement("input");
		mNode.setAttribute("type", "checkbox");
		mNode.addEventListener("click", CheckAllSaveSlots);
		mNode.setAttribute("id", "selectAllSaves");
		mTd.appendChild(mNode);
		mNode = document.createElement("span");
		mNode.setAttribute("id", "saveCounterLabel");
		mNode.setAttribute("class", "saveLoadButton");
		mNode.innerHTML = "Saved Data (" + iLength + "/" + iMaxSaveSlots + ")";
		mTd.appendChild(mNode);
		mTr.appendChild(mTd);
		mTable.appendChild(mTr);
		
		for (i = 0; i < iLength; i++)
		{
			oSave = aSaveData[i];
			mTr = document.createElement("tr");
			mTd = document.createElement("td");
			mTable.appendChild(mTr);
			mTr.appendChild(mTd);
			//mNode = CreateButton("X", "", "saveDeleteButton", "selectConfirmation('DeleteBuildData(" + i + ");', 'Delete Data', 'Are you sure you want to delete this data?  It cannot be undone!<br /><br />" + aSaveData[i].desc + "', 'Delete', true);");
			mNode = document.createElement("input");
			mNode.setAttribute("type", "checkbox");
			mNode.setAttribute("id", "deleteDataBox" + i);
			mNode.value = i;
			mTd.appendChild(mNode);
			mNode = CreateButton("S", "", "saveReplaceButton", "selectConfirmation('SaveBuildData(" + i + ");', 'Overwrite Data', 'Are you sure you want to overwrite this data?  It cannot be undone!<br /><br /><table class=\\\'saveReplaceTable\\\'><tr><td>This Data...</td><td>...Will Overwrite This Data</td></tr><tr><td>" + BuildToString() + "</td><td>" + aSaveData[i].desc + "</td></tr></table>', 'Overwrite', true);");
			setOnmouseoverPopupL1(mNode, "Overwrite the data in this slot with the current data.");
			mTd.appendChild(mNode);
			mNode = CreateButton(((oSave.name == "") ? "(No Name)" : oSave.name), "", "saveLoadButton", "");
			mNode.setAttribute("href", siteUrl + aSaveData[i].url);
			setOnmouseoverPopupL1(mNode, aSaveData[i].desc);
			mTd.appendChild(mNode);
		}
		
		if (iLength < iMaxSaveSlots)
		{
			mTr = document.createElement("tr");
			mTd = document.createElement("td");
			mNode = CreateButton("New Save Slot", "", "", "SaveBuildData(" + iLength + ");");
			mTable.appendChild(mTr);
			mTr.appendChild(mTd);
			mTd.appendChild(mNode);
		}
		else
		{
			mTr = document.createElement("tr");
			mTd = document.createElement("td");
			mNode = document.createElement("div");
			mNode.innerHTML = "No Slots Left";
			mTable.appendChild(mTr);
			mTr.appendChild(mTd);
			mTd.appendChild(mNode);
		}
	}
	// if no local storage, say "sorry cupcake!"
	else
	{
		mTr = document.createElement("tr");
		mTd = document.createElement("td");
		mNode = document.createElement("span");
		mNode.innerHTML = "<p><b>Local Storage is not supported on this device.</b></p><p>Sorry, loading and saving builds requires Local Storage.</p>";
		mTable.appendChild(mTr);
		mTr.appendChild(mTd);
		mTd.appendChild(mNode);
	}
}

function CheckAllSaveSlots()
{
	var bChecked = document.getElementById("selectAllSaves").checked;
	var i;
	var iLength = LoadBuildArray().length;
	var mNode;
	for (i = 0; i < iLength; i++)
	{
		mNode = document.getElementById("deleteDataBox" + i);
		mNode.checked = bChecked;
	}
}

function DeleteBuildData(iSlot, bRefresh=true)
{
	var aSaveData = LoadBuildArray();
	aSaveData.splice(iSlot, 1);
	SaveBuildArray(aSaveData);
	if (bRefresh) RefreshSaveList();
}

function DeleteData(aDeleteList)
{
	var i;
	var iLength = aDeleteList.length;
	for (i = iLength - 1; i > -1; i--)
	{
		DeleteBuildData(aDeleteList[i], false);
	}
	RefreshSaveList();
}


function SaveBuildData(iSlot)
{
	var aSaveData = LoadBuildArray();
	var oSave = {};
	oSave.name = phName;
	oSave.url = phBuildLinkRef;
	oSave.desc = BuildToString();
	if (iSlot < 0 && iSlot > aSaveData.length) iSlot = aSaveData.length;
	
	aSaveData[iSlot] = oSave;
	SaveBuildArray(aSaveData);
	RefreshSaveList();
}

/////////// Build import/export ////////////////////////////////////
function BuildToString()
{
	var sReturn = "<b><u>" + phName + "</u></b><br />" + phArchetype.name + "<br /><br /><b>SuperStats:</b>  ";
	var i, iLength;
	var aFFLevels = [0, 1, 1, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38];
	var aATLevels = [0, 1, 1, 6, 8, 11, 14, 17, 21, 25, 30, 35, 40];
	var aLevels;
	var rxQuoteFix = /'/g;
	if (phArchetype != dataArchetype[1])
	{
		aLevels = aATLevels;
	}
	else
	{
		aLevels = aFFLevels;
	}
	
	iLength = phSuperStat.length;
	for (i = 1; i < iLength; i++)
	{
		if (i > 1) sReturn += ", ";
		sReturn += NullFix(phSuperStat[i].abbrev, "???");
	}
	sReturn += "<br /><b>Specs:</b>  ";
	sReturn += NullFix(phSpecializationTree[SPECIALIZATION_ROLE1].name, "???") + ", ";
	sReturn += NullFix(phSpecializationTree[SPECIALIZATION_ROLE2].name, "???") + "<br /><b>Mastery:</b>  ";
	sReturn += NullFix(phSpecializationTree[SPECIALIZATION_MASTERY].name, "???") + "<br /><br />";
	iLength = aLevels.length;;
	for (i = 1; i < iLength; i++)
	{
		if (i > 1) sReturn += "<br />";
		sReturn += aLevels[i] + ": <b>" + (phPower[i].name ? phPower[i].name.replace(rxQuoteFix, "\\\'") : "???") + "</b> <i>" + forumAdvantageText(1, i, phPowerAdvantage[i]) + "</i>";
	}
	return sReturn;
}

function NullFix(sText, sReplaceNullWith="")
{
	var sReturn = (sText) ? sText : sReplaceNullWith;
	return sReturn;
}

function ShowResetDataOptions()
{
	ResetDialogBox();
	SetDialogBoxHeader("Reset Options");
	var mLabel = document.createElement("div");
	mLabel.innerHTML = "I want to reset...";
	AddItemToDialogBoxMenu(mLabel);
	
	var mAll = CreateCheckbox("<b>Everything</b>", "resetAll", "resetGroup", false, true);
	var mSelective = CreateCheckbox("<b>Selective</b>", "resetSome", "resetGroup", false);
	mAll.addEventListener("click", function(){ResetAllClicked(true)});
	mSelective.addEventListener("click", function(){ResetAllClicked(false)});
	setOnmouseoverPopupL1(mAll, "This option will clear all selected fields.  If working with an archetype, it will be reset back to freeform as well.");
	setOnmouseoverPopupL1(mSelective, "Allows you to pick and choose which fields to reset.  Note that archetypes cannot reset certain things.");
	
	var mStats = CreateCheckbox("Super Stats", "resetBox0");
	var mTalents = CreateCheckbox("Innate Talent & Talents", "resetBox1");
	var mTravelPowers = CreateCheckbox("Travel Powers", "resetBox2");
	var mSpecs = CreateCheckbox("Specializations", "resetBox3");
	var mPowers = CreateCheckbox("Powers", "resetBox4");
	var mResetButton = CreateButton("Yes, reset all selected fields", "", "selectConfirmButton", "ResetBuild();");
	
	AddItemToDialogBoxMenu(document.createElement("br"));
	AddItemToDialogBoxMenu(mAll);
	AddItemToDialogBoxMenu(mSelective);
	AddItemToDialogBoxMenu(mStats);
	AddItemToDialogBoxMenu(mTalents);
	AddItemToDialogBoxMenu(mTravelPowers);
	AddItemToDialogBoxMenu(mSpecs);
	AddItemToDialogBoxMenu(mPowers);
	AddItemToDialogBoxMenu(document.createElement("br"));
	AddItemToDialogBoxMenu(mResetButton);
	
	ResetAllClicked();
	
	showPositionSection("selectionWindow");
}

function ResetAllClicked(bHideSelective=true)
{
	var i;
	var iLength = 5;
	var mElement;
	var bHide;
	for (i = 0; i < iLength; i++)
	{
		mElement = document.getElementById("resetBox" + i);
		bHide = bHideSelective;
		if (phArchetype.id != 1 && (i == 0 || i == 3 || i == 4)) // no resetting superstats, specs, or powers as non-freeform
			bHide = true;
		
		mElement.disabled = bHide;
		mElement.parentElement.setAttribute("class", bHide ? "disabledCheckField" : "");
	}
}

function CreateCheckbox(sLabel, sID, sRadioGroup=null, bUseLineBreak=true, bChecked=false)
{
	var mReturn = bUseLineBreak ? document.createElement("div") : document.createElement("span");
	var mLabel = document.createElement("label");
	var mBox = document.createElement("input");
	mLabel.innerHTML = sLabel;
	mLabel.setAttribute("for", sID);
	mBox.setAttribute("type", ((sRadioGroup) ? "radio" : "checkbox"));
	mBox.setAttribute("id", sID);
	mBox.checked = bChecked;
	if (sRadioGroup) mBox.setAttribute("name", sRadioGroup);
	mReturn.appendChild(mBox);
	mReturn.appendChild(mLabel);
	
	return mReturn;
}

function ResetBuild()
{
	var bEverything = document.getElementById("resetAll").checked;
	var bStats = document.getElementById("resetBox0").checked;
	var bTalents = document.getElementById("resetBox1").checked;
	var bTravelPowers = document.getElementById("resetBox2").checked;
	var bSpecs = document.getElementById("resetBox3").checked;
	var bPowers = document.getElementById("resetBox4").checked;
	var i;
	var iLength;
	if (bEverything)
	{
		selectArchetype();
		setArchetype(1);
	}
	if (bStats || bEverything)
	{
		iLength = 4;
		for (i = 1; i < iLength; i++)
		{
			selectSuperStat(i);
			setSuperStat(0);
		}
	}
	if (bTalents || bEverything)
	{
		if (phArchetype.id == 1)
		{
			selectInnateTalent(1);
			setInnateTalent(0);
		}
		iLength = 7;
		for (i = 1; i < iLength; i++)
		{
			selectTalent(i);
			setTalent(0);
		}
	}
	if (bTravelPowers || bEverything)
	{
		iLength = 3;
		for (i = 1; i < iLength; i++)
		{
			selectTravelPower(i);
			setTravelPower(0);
		}
	}
	if (bSpecs || bEverything)
	{
		iLength = 4;
		for (i = 1; i < iLength; i++)
		{
			selectSpecializationClear(i);
		}
	}
	if (bPowers || bEverything)
	{
		iLength = 15;
		for (i = 1; i < iLength; i++)
		{
			selectFramework(0);
			selectPower(i);
			setPower(0);
		}
	}
}

///////////////// Data functions /////////////////////////////

function EchoVersion()
{
	return "Version: " + appVersion + "-" + buildVersion;
}

function ListPowersFromFramework(iFramework)
{
	var i, iLength, iCurrentFramework, sReturn;
	if (isNaN(parseInt(iFramework))) iFramework = -1;
	sReturn = EchoVersion();
	sReturn += "\npower id code tier name advantageList.length";
	iLength = dataPower.length;
	iCurrentFramework = (iFramework < 0) ? 0 : iFramework;
	for (i = 0; i < iLength; i++)
	{
		if (dataPower[i].framework == iFramework || iFramework == -1)
		{
			if (dataPower[i].power == 0)
			{
				if (dataFramework[iCurrentFramework]) sReturn += "\n" + dataFramework[iCurrentFramework].name + " [" + iCurrentFramework + "]";
				else sReturn += "\n### Invalid FrameworkID: " + iCurrentFramework;
				iCurrentFramework++;
			}
			sReturn += "\n[" + dataPower[i].power + "][" + dataPower[i].id + "][" + dataPower[i].code() + "][" + dataPower[i].tier + "] " + dataPower[i].name + " (" + dataPower[i].advantageList.length + ")";
		}
	}
	return sReturn;
}

function ListTravelPowers(iType)
{
	var i, iLength, sReturn;
	if (isNaN(parseInt(iType))) iType = -1;
	sReturn = EchoVersion() + "\n";
	sReturn += "Travel Powers of type [" + ((iType > -1 && iType < TRAVEL_POWER_TYPES.length) ? TRAVEL_POWER_TYPES[iType] : "All") + "]\nid code isvar name advantageList.length";
	iLength = dataTravelPower.length;
	for (i = 0; i < iLength; i++)
	{
		if (dataTravelPower[i].type == iType || iType == -1) sReturn += "\n[" + dataTravelPower[i].id + "][" + dataTravelPower[i].code() + "][" + dataTravelPower[i].isVariant + "] " + dataTravelPower[i].name + " (" + dataTravelPower[i].advantageList.length + ")";
	}
	return sReturn;
}

// magic numbers are fine because debug function:  0 = innate talent, else = talent
function ListTalents(iType=0)
{
	var aList = (iType == 0) ? dataInnateTalent : dataTalent;
	var i;
	var iLength = aList.length;
	var sReturn = EchoVersion() + "\n" + "Innate Talents\nid code name extra";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\n[" + aList[i].id + "][" + aList[i].code() + "] " + aList[i].name + " (" + aList[i].extra + ")";
	}
	return sReturn;
}

function ListArchetypes()
{
	var i;
	var iLength = dataArchetype.length;
	var sReturn = EchoVersion() + "\nArchetypes\nid code name";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\n[" + dataArchetype[i].id + "][" + dataArchetype[i].code() + "] " + dataArchetype[i].name;
	}
	return sReturn;
}

function JSONize(sKey, value)
{
	var sReturn = "\"" + sKey + "\":"
	if (value == null) sReturn += "null";
	else if (typeof value == "string") sReturn += "\"" + value + "\"";
	else if (typeof value == "number") sReturn += value;
	else if (typeof value == "object" && Array.isArray(value)) sReturn += "[]"; // just need the declaration, not the contents
	else if (typeof value == "object") sReturn += "{}"; // again, just need the declaration
	else sReturn += value;

	return sReturn;
}

function SuperStatsToJSON()
{
	var i;
	var iLength = dataSuperStat.length;
	var sReturn = "\t\"superstats\":\n\t[\n";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\t\t{" + JSONize("shortname", dataSuperStat[i].abbrev) + ", " + JSONize("name", dataSuperStat[i].name) + ", " + JSONize("tree", 0) + "," + JSONize("desc", dataSuperStat[i].tip) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "\t]";

	return sReturn;
}

function ArchetypesToJSON()
{
	var i;
	var iLength = dataArchetype.length;
	var sReturn = "\t\"archetypes\":\n\t[\n";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\t\t{" + JSONize("name", dataArchetype[i].name) + "," + JSONize("role", 0) + "," + JSONize("superstats", []) + "," + JSONize("innate", 0) + "," + JSONize("powers", []) + "," + JSONize("specializations", []) + "," + JSONize("desc", dataArchetype[i].tip) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "\t]";

	return sReturn;
}

function SpecializationsToJSON()
{
	var sReturn = "Manual entry required. :(\n\n"
	sReturn += "Suggested Format:\n\tTree(name, specializationlist[], desc)\n\t\tSpecialization(name, tier, points, desc)";
	return sReturn;
}


function TalentsToJSON()
{
	var i;
	var iLength = dataTalent.length;
	var sReturn = "\t\"talents\":\n\t[\n";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\t\t{" + JSONize("name", dataTalent[i].name) + "," + JSONize("desc", dataTalent[i].extra) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "\t]";

	return sReturn;
}

function TravelPowersToJSON()
{
	var i;
	var iLength = dataTravelPower.length;
	var sReturn = "\t\"travelpowers\":\n\t[\n";

	var iTier;
	var iDependency;

	for (i = 0; i < iLength; i++)
	{
		iTier = dataTravelPower[i].tier;
		iDependency = dataTravelPower[i].dependency;
		if (iTier < 0) iTier = 0;
		if (iDependency == undefined) iDependency = 0;
		sReturn += "\t\t{" + JSONize("name", dataTravelPower[i].name) + "," + JSONize("hasranks", true) + "," + JSONize("advantages", []) + "," + JSONize("tags","") + "," + JSONize("desc", dataTravelPower[i].tip) + "," + JSONize("source","") + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "]";
	return sReturn;
}

function InnateTalentsToJSON()
{
	var i;
	var iLength = dataInnateTalent.length;
	var sReturn = "\t\"innatetalents\":\n\t[\n";
	for (i = 0; i < iLength; i++)
	{
		sReturn += "\t\t{" + JSONize("name", dataInnateTalent[i].name) + "," + JSONize("desc", dataInnateTalent[i].tip) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "\t]";

	return sReturn;
}

function PowerDataToJSON()
{
	var i;
	var iLength = dataPower.length;
	var sReturn = "\t\"powers\":\n\t[\n";

	var iTier;
	var iDependency;

	for (i = 0; i < iLength; i++)
	{
		iTier = dataPower[i].tier;
		iDependency = dataPower[i].dependency;
		if (iTier < 0) iTier = 0;
		if (iDependency == undefined) iDependency = 0;
		sReturn += "\t\t{" + JSONize("name", dataPower[i].name) + "," + JSONize("tier", iTier) + "," + JSONize("restrict", iDependency) + "," + JSONize("hasranks", true) + "," + JSONize("advantages", []) + "," + JSONize("tags","") + "," + JSONize("desc", dataPower[i].tip) + "," + JSONize("source","") + "}" + ((i < iLength - 1) ? "," : "") + "\n";
	}
	sReturn += "]";
	return sReturn;
}

//==============================================================================
// End
//==============================================================================
