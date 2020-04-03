/*==============================================================================
 * hc-extender.js
 * 
 * Current Author & Maintainer:  Aesica
 * http://aesica.net/co
 ==============================================================================*/

//==============================================================================
// Additional functionality without adding more functions/etc to powerhouse.js
//==============================================================================
var Aesica = Aesica || {};
Aesica.HCEngine = Aesica.HCEngine || {};
(function($$)
{
	$$.assets = [];
	class Preloader
	{
		/**
		 * Don't call this manually
		 * @param {*} e 
		 */
		static preloaderInit(e)
		{
			// run image preloader
			var i, iLength, oAsset;
			if (Preloader.assetURLs)
			{
				iLength = Preloader.assetURLs.length;
				for (i = 0; i < iLength; i++)
				{
					oAsset = new Image();
					oAsset.src = Preloader.assetURLs[i] + "?v=" + app.version + "." + HCData.version;
					Preloader.assets[i] = oAsset;
					console.log((i + 1) + "/" + iLength + ": " + Preloader.assetURLs[i]);
					writeMessage("Loading assets: " + (i + 1) + "/" + iLength + ": " + Preloader.assetURLs[i]);
				}
				$$.assets = Preloader.assets;
			}
		}
		/**
		 * Don't call this manually either
		 * @param {*} e 
		 */
		static postloaderInit(e)
		{
			console.log("Load complete");
			writeMessage("Load complete.  Initializing...");
		}
		/**
		 * Specify urls of image assets to preload. Should be called before DOMContentLoaded fires
		 * @param {String} preloadAssetURLs image URLs to preload
		 */
		static preloadImages(...preloadAssetURLs)
		{
			Preloader.assetURLs = preloadAssetURLs;
		}
	}
	$$.Preloader = Preloader;
	Preloader.assets = []; // array of loaded assets
	Preloader.assetURLs; // array of urls for all image assets to preload
	window.addEventListener("DOMContentLoaded", Preloader.preloaderInit);
	window.addEventListener("load", Preloader.postloaderInit);	

	var aTiers = [0, 1, 3, 5];

	function setupEditor()
	{
		var sDesc, mSection, mTable, mTr, mItem1, mItem2, mItem3, aListEnumeration;
		var i, iLength = 3;
		// superstats
		mTable = document.createElement("table");
		aListEnumeration = [6, 10, 15];
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "fieldSuperStatNote" + (i + 1);
			mItem1.className = "note";
			mItem1.innerHTML = aListEnumeration[i];
			mItem2 = document.createElement("a");
			mItem2.id = "fieldSuperStat" + (i + 1);
			mItem2.className = "button";
			(function(i)
			{
				mItem2.addEventListener("click", (function(){ selectSuperStat(i + 1); }));
			})(i);
			sDesc = (i > 0) ? app.system.editor.default.superStat[1] + " " + i : app.system.editor.default.superStat[0];
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, mItem2);
			mTable.appendChild(mTr);
		}
		document.getElementById("sectionSuperStat").appendChild(mTable);

		// innate talent
		mTable = document.createElement("table");
		iLength = 1;
		aListEnumeration = [1];
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "fieldInnateTalentNote" + (i + 1);
			mItem1.className = "note";
			mItem1.innerHTML = aListEnumeration[i];
			mItem2 = document.createElement("a");
			mItem2.id = "fieldInnateTalent" + (i + 1);
			mItem2.className = "button";
			(function(i)
			{
				mItem2.addEventListener("click", (function(){ selectInnateTalent(i + 1); }));
			})(i);
			sDesc = app.system.editor.default.innateTalent;
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, mItem2);
			mTable.appendChild(mTr);
		}
		document.getElementById("sectionInnateTalent").appendChild(mTable);

		// talents
		mTable = document.createElement("table");
		iLength = 6;
		aListEnumeration = [6, 9, 12, 15, 18, 21];
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "fieldTalentNote" + (i + 1);
			mItem1.className = "note";
			mItem1.innerHTML = aListEnumeration[i];
			mItem2 = document.createElement("a");
			mItem2.id = "fieldTalent" + (i + 1);
			mItem2.className = "button";
			(function(i)
			{
				mItem2.addEventListener("click", (function(){ selectTalent(i + 1); }));
			})(i);
			sDesc = app.system.editor.default.talent + " " + (i + 1);
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, mItem2);
			mTable.appendChild(mTr);
		}
		document.getElementById("sectionTalent").appendChild(mTable);
		
		// travel powers
		mTable = document.createElement("table");
		iLength = 2;
		aListEnumeration = [6, 35];
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "fieldTravelPowerNote" + (i + 1);
			mItem1.className = "note";
			mItem1.innerHTML = aListEnumeration[i];
			mItem2 = document.createElement("a");
			mItem2.id = "fieldTravelPower" + (i + 1);
			mItem2.className = "button";
			mItem3 = document.createElement("a");
			mItem3.id = "fieldTravelPowerAdvantage" + (i + 1);
			mItem3.className = "buttonNote";
			mItem3.style.display = "none";
			(function(i)
			{
				mItem2.addEventListener("click", (function(){ selectTravelPower(i + 1); }));
				mItem3.addEventListener("click", (function(){ selectTravelPowerAdvantage(i + 1); }));
			})(i);
			sDesc = app.system.editor.default.travelPower + " " + (i + 1);
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, [mItem2, mItem3]);
			mTable.appendChild(mTr);
		}
		document.getElementById("sectionTravelPower").appendChild(mTable);

		// device
		mSection = document.getElementById("sectionDevice");
		iLength = 5;
		mTable = document.createElement("table");
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.className = "note";
			mItem2 = document.createElement("a");
			mItem2.id = "fieldDevice" + (i + 1);
			mItem2.className = "button";
			mItem2.setAttribute("deviceSlot", i + 1);
			mItem3 = document.createElement("a");
			mItem3.id = "fieldDevice" + (i + 1) + "Powers";
			mItem3.className = "buttonNote";
			mItem3.style.display = "none";
			mItem3.setAttribute("deviceSlot", i + 1);
			mItem3.innerHTML = "<span class='advantage'>&nbsp;(Power List)</span>";
			(function (i)
			{
				mItem2.addEventListener("click", selectDevice);
				mItem3.addEventListener("click", selectDevicePowerPreview);
			})(i);
			sDesc = app.system.editor.default.device + " " + (i + 1);
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, [mItem2, mItem3]);
			mTable.appendChild(mTr);
		}
		mSection.appendChild(mTable);
		
		// role
		mSection = document.getElementById("sectionRole");
		mItem1 = document.createElement("div");
		mItem1.className = "note";
		mItem2 = document.createElement("a");
		mItem2.id = "fieldRole";
		mItem2.className = "button";
		mItem2.addEventListener("click", selectRole);
		mItem2.appendChild(getDescNode("blank", "Select Role"));
		mTable = document.createElement("table");
		mTr = createTableRow(mItem1, mItem2);
		mTable.appendChild(mTr);
		mSection.appendChild(mTable);

		// powers
		mTable = document.createElement("table");
		iLength = 14;
		aListEnumeration = [1, 1, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38];
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "fieldPowerNote" + (i + 1);
			mItem1.className = "note";
			mItem1.innerHTML = aListEnumeration[i];
			mItem2 = document.createElement("a");
			mItem2.id = "fieldPower" + (i + 1);
			mItem2.className = "button";
			mItem3 = document.createElement("a");
			mItem3.id = "fieldPowerAdvantage" + (i + 1);
			mItem3.className = "buttonNote";
			mItem3.style.display = "none";
			(function(i)
			{
				mItem2.addEventListener("click", (function(){ selectPower(i + 1); }));
				mItem3.addEventListener("click", (function(){ selectPowerAdvantage(i + 1); }));
			})(i);
			sDesc = app.system.editor.default.power + " " + (i + 1);
			mItem2.appendChild(getDescNode("blank", sDesc, false, true));
			mTr = createTableRow(mItem1, [mItem2, mItem3]);
			mTr.id = "rowPower" + (i + 1);
			mTable.appendChild(mTr);
		}
		document.getElementById("sectionPower").appendChild(mTable);

		// specializations
		iLength = 4;
		aListEnumeration = app.system.editor.default.specialization;
		mSection = document.getElementById("sectionSpecializations");
		for (i = 0; i < iLength; i++)
		{
			mItem1 = document.createElement("div");
			mItem1.id = "specialization" + (i + 1);
			mItem1.className = "leftSelection";
			mItem2 = document.createElement("div");
			mItem2.id = "sectionSpecialization" + (i + 1);
			mItem2.className = "section";
			mItem3 = document.createElement("a");
			mItem3.id = "headerSpecialization" + (i + 1);
			mItem3.className = (i > 0) ? "button" : "disabledButton";
			mItem3.appendChild(getDescNode("blank", aListEnumeration[i], false, true));
			mTable = document.createElement("table");
			mTable.id = "tableSpecialization" + (i + 1);
			mTable.className = "specialization";
			(function(i)
			{
				mItem3.addEventListener("click", (function(){ selectSpecialization(i + 1); }));
			})(i);
			mItem2.appendChild(mItem3);
			mItem2.appendChild(mTable);
			mItem1.appendChild(mItem2);
			mSection.appendChild(mItem1);
		}
		mTr = document.createElement("div");
		mTr.style.clear = "both";
		mSection.appendChild(mTr);

		// archetype
		mSection = document.getElementById("sectionArchetype");
		mItem1 = document.createElement("a");
		mItem1.id = "archetype";
		mItem1.className = "button";
		mItem1.addEventListener("click", selectArchetype);
		mItem2 = document.createElement("span");
		mItem2.id = "fieldArchetype";
		mItem2.className = "buttonText";
		mItem1.appendChild(mItem2);
		mSection.appendChild(mItem1);

		// build note
		mSection = document.getElementById("sectionBuildNote");
		mItem1 = Aesica.HCEngine.createButton(app.system.editor.default.notes, "buildNoteButton", "button", selectBuildNote);
		mItem2 = document.createElement("span");
		mItem2.id = "buildNote";
		mItem2.className = "buttonText";
		mItem1.addEventListener("click", selectBuildNote);
		mItem1.appendChild(document.createElement("br"));
		mItem1.appendChild(mItem2);
		mSection.appendChild(mItem1);

		// settings
		document.getElementById("fontPlus").appendChild(getDescNode("plus", null, false, true));
		document.getElementById("fontMinus").appendChild(getDescNode("minus", null, false, true));
	}
	$$.setupEditor = setupEditor;

	function writeMessage(sMessage, bGreenLit=false)
	{
		var messageNode = document.getElementById("titleMessage");
		messageNode.innerHTML = sMessage;
		if (bGreenLit) messageNode.className = "titleMessageReady";
		else messageNode.className = "titleMessageWorking";
	}
	$$.writeMessage = writeMessage;

	/**
	 * Create a table row containing the specified nodes, returning the row/tr.
	 * @param {*} nodesOrText HTML nodes/elements.  Can add multiple elements to a data cell by passing them in an array:  createTableRow(node1, node2, [node3a, node3b], node4) etc
	 */
	function createTableRow(...nodesOrText)
	{
		var mTd, mReturn = document.createElement("tr");
		var i, j, jLength, iLength = nodesOrText.length;
		for (i = 0; i < iLength; i++)
		{
			mTd = document.createElement("td");
			if (Array.isArray(nodesOrText[i]))
			{
				jLength = nodesOrText[i].length;
				for (j = 0; j < jLength; j++)
				{
					if (nodesOrText[i][j] instanceof HTMLElement)
						mTd.appendChild(nodesOrText[i][j]);
					else
						mTd.innerHTML += nodesOrText[i][j];
				}
			}
			else
			{
				if (nodesOrText[i] instanceof HTMLElement)
					mTd.appendChild(nodesOrText[i]);
				else
					mTd.innerHTML = nodesOrText[i];
			}
			mReturn.appendChild(mTd);
		}
		return mReturn;
	}
	$$.createTableRow = createTableRow;

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

	function buildLookupTables()
	{
		delete HCLookup.note;
		var i, iLength;
		iLength = dataPower.length;
		HCLookup.power = {};
		for (i = 0; i < iLength; i++)
		{
			HCLookup.power[dataPower[i].name] = i;
		}
		iLength = dataTravelPower.length;
		HCLookup.travelPower = {};
		for (i = 0; i < iLength; i++)
		{
			HCLookup.travelPower[dataTravelPower[i].name] = i;
		}
	}
	$$.buildLookupTables = buildLookupTables;

	function petTip(petName, rank1desc, rank2desc, rank3desc, other=null)
	{
		var sReturn = petName + "<br /><br />+ R1:  " + rank1desc + "<br />+ R2:  " + rank2desc + "<br /> + R3:  " + rank3desc;
		if (other != null)
		{
			sReturn += "<br />+ Custom Ability:  " + other;
		}
		return sReturn;
	}
	$$.petTip = petTip;

	function getDescNode(icon="Any_Generic", name=null, isATIcon=false, inLine=false)
	{
		var mReturn = document.createElement("div");
		var mText = document.createElement("span");
		var mCanvas = document.createElement("canvas");
		var iWidth = (isATIcon) ? prefs.iconWidthAT : prefs.iconWidth;
		var iHeight = (isATIcon) ? prefs.iconHeightAT : prefs.iconHeight;
		var oSpriteData;
		if (!spriteData.frames[icon]) icon = isATIcon ? app.system.defaultIcon.archetype : app.system.defaultIcon.power;
		oSpriteData = spriteData.frames[icon].frame;
		mCanvas.width = iWidth;
		mCanvas.height = iHeight;
		mCanvas.className = "icon";
		mCanvas.getContext("2d").drawImage($$.assets[0], oSpriteData.x, oSpriteData.y, oSpriteData.w, oSpriteData.h, 0, 0, iWidth, iHeight);
		if (name) mText.innerHTML = name;
		mReturn.appendChild(mCanvas);
		mReturn.appendChild(mText);
		if (inLine) mReturn.style.display = "inline-block";
		return mReturn;
	}
	$$.getDescNode = getDescNode;

	function archetypeUnlock(bGoldUnlock=false, sSpecialEvent=null, ...aOtherMethods)
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
	$$.archetypeUnlock = archetypeUnlock;

	function debugOutputFromInput(fFunction)
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
				alert(e.name + ": " + e.message + " :: " + e.constructor);
			}
		}
	}
	$$.debugOutputFromInput = debugOutputFromInput;

	function powerUnlocksFrom(sUnlockSource, sCost=null, sCurrencyName=null)
	{
		var sReturn = "<br /><br /><b>Unlock via:  " + sUnlockSource;
		if (sCost) sReturn += " for " + sCost + ((sCurrencyName) ? " " + sCurrencyName : "");
		sReturn += "</b>";
		return sReturn;
	}
	$$.powerUnlocksFrom = powerUnlocksFrom;

	function debugOutput(sText)
	{
		var txtOutput = document.getElementById("debugoutput");
		txtOutput.value = sText;
	}
	$$.debugOutput = debugOutput;

	// TODO:  document click close--see selectClearMaybe and related functions
	function setVisibility(sID, bVisible)
	{
		document.getElementById(sID).style.display = (bVisible) ? "" : "none";
		popout();
	}
	$$.setVisibility = setVisibility;

	function setNodeContents(mNode, mContents)
	{
		mNode.innerHTML = "";
		mNode.appendChild(mContents);
	}
	$$.setNodeContents = setNodeContents;

	function quickConfirmationBox(sTitle, sContents, sButtonText, fOnClick)
	{
		resetDialogBox();
		setDialogBoxHeader(sTitle);
		var mContents = document.createElement("div");
		mContents.innerHTML = sContents;
		var mButton = createButton(sButtonText, "", "selectConfirmButton", fOnClick);
		addItemToDialogBoxMenu(mContents);
		addItemToDialogBox(mButton);
		showPositionSection("selectionWindow", true);
	}
	$$.quickConfirmationBox = quickConfirmationBox;

	function resetDialogBox(iNewColumnCount=1, sColumnPadding="2em")
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
	$$.resetDialogBox = resetDialogBox;

	function setDialogBoxHeader(sNewHeader="")
	{
		var mHeader = document.getElementById("selectionWindowHeader");
		mHeader.innerHTML = sNewHeader;
	}
	$$.setDialogBoxHeader = setDialogBoxHeader;

	function addItemToDialogBoxMenu(mNode)
	{
		var mMenu = document.getElementById("selectionWindowMenu");
		if (mMenu)
		{
			mMenu.appendChild(mNode);
			mMenu.setAttribute("style", "display: block;")
		}
		else AddItemToDialogBox(mNode);
	}
	$$.addItemToDialogBoxMenu = addItemToDialogBoxMenu;

	function addItemToDialogBox(mNode, iColumnID=-1)
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
	$$.addItemToDialogBox = addItemToDialogBox;

	function createButton(nodeOrText, sID=null, sClass=null, fFunction=null)
	{
		var mReturn = document.createElement("a");
		if (sID) mReturn.setAttribute("id", sID);
		if (sClass) mReturn.setAttribute("class", sClass);
		if (typeof fFunction === "function") mReturn.addEventListener("click", fFunction);
		else if (typeof fFunction === "string") mReturn.setAttribute("onclick", fFunction); // TODO:  finish phasing this shit out then delete this line.  with fire.
		else if (fFunction != null) debugOutput("Invalid function parameter: " + typeof fFunction + " => " + fFunction + "::" + nodeOrText);
		if (typeof nodeOrText === "string") mReturn.innerHTML = nodeOrText;
		else if (typeof nodeOrText === "object") mReturn.appendChild(nodeOrText);
		else mReturn.innerHTML = "[Invalid Type]:" + (typeof nodeOrText) + " " + nodeOrText;
		return mReturn;
	}
	$$.createButton = createButton;

	function urlSafeBtoa(sData)
	{
		var sReturn = btoa(sanitize(sData));
		var rxPlus = /\+/g; // convert to -
		var rxSlash = /\//g; // convert to _
		var rxEqual = /\=/g; // convert to ~
		sReturn = sReturn.replace(rxPlus, "-").replace(rxSlash, "_").replace(rxEqual, "~");
		return sReturn;
	}
	$$.urlSafeBtoa = urlSafeBtoa

	function urlSafeAtob(sData)
	{
		var sReturn = "";
		var rxPlus = /\-/g;
		var rxSlash = /\_/g;
		var rxEqual = /\~/g;
		sReturn = sData.replace(rxPlus, "+").replace(rxSlash, "/").replace(rxEqual, "=");
		try 
		{
			sReturn = atob(sReturn);
		}
		catch(e)
		{
			console.log("Invalid base64: " + sData);
		}
		return sReturn;
	}
	$$.urlSafeAtob = urlSafeAtob

	////////////////// Custom Font stuff////////////////////////////

	// name functions
	function editFont()
	{
		var mField = document.getElementById("editFont");
		mField.value = prefs.fontFamily;
		hideSection("sectionDisplayFont");
		showSection("sectionEditFont");
		mField.focus();
	}
	$$.editFont = editFont;

	function cancelFont()
	{
		hideSection("sectionEditFont");
		showSection("sectionDisplayFont");
	}
	$$.cancelFont = cancelFont;
	function changeFont(e)
	{
		prefs.fontFamily = document.getElementById("editFont").value;
		hideSection("sectionEditFont");
		document.getElementById("prefFontFamilyName").firstChild.data = prefs.fontFamily;
		showSection("sectionDisplayFont");
		setPrefFontFamily(prefs.fontFamily);
	}
	$$.changeFont = changeFont;
	/////////////////////// Reference sheet /////////////////////

	function initReferenceSheet()
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
	$$.initReferenceSheet = initReferenceSheet;

	////////////////////////// Local storage & data load/save functions ///////////////

	/**
	 * Tests to see if local storage is supported
	 */
	function localStorageSupported()
	{
		var bTest = "localStorage" in window && window["localStorage"] !== null;
		return bTest;
	}
	$$.localStorageSupported = localStorageSupported;

	/** Saves data
	 * sKey Local storage identifier
	 * value Data to save
	 * bRequireLocalStorage If true, won't save anything if local storage isn't supported
	 * sFailureMessage message to show if local storage isn't supported, but required via bRequireLocalStorage
	 */
	function saveData(sKey, value, bRequireLocalStorage=false, sFailureMessage="")
	{
		// save to local storage is supported
		if (localStorageSupported())
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
	$$.saveData = saveData;
	/** Loads data
	 * sKey Local storage identifier
	 * bRequireLocalStorage If true, won't save anything if local storage isn't supported
	 * sFailureMessage message to show if local storage isn't supported, but required via bRequireLocalStorage
	 */
	function loadData(sKey, bRequireLocalStorage=false, sFailureMessage="")
	{
		var oReturn = undefined;

		// load from local storage if supported
		if (localStorageSupported())
		{
			oReturn = localStorage[sKey];
		}
		// cookie fallback
		else if (!bRequireLocalStorage)
		{
			oReturn = getCookie(sKey);
		}
		// show failure message if cookie fallback isn't allowed and local storage isn't supported
		// beware, can be spammy if invoked frequently
		else if (sFailureMessage != "")
		{
			alert(sFailureMessage);
		}

		return oReturn;
	}
	$$.loadData = loadData;
	///////////////// Save Builds //////////////////////////////
	// savedObject = name:String, url:String, desc:String
	function LoadBuildArray()
	{
		var aReturn = [];
		var sData = loadData("savedData", true);
		if (!sData)
		{
			saveData("savedData", JSON.stringify(aReturn), true);
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
		saveData("savedData", JSON.stringify(aSave), true);
	}

	function setUpSaveTools()
	{
		var mContainer = document.getElementById("viewData");
		var mDiv, mButton, mTextArea;
		if (mContainer)
		{
			// master tools
			mDiv = document.createElement("div");
			mDiv.setAttribute("class", "pageSection");
			mButton = createButton("Backup", "", "dataButton", saveExportData);
			setOnmouseoverPopupL1(mButton, "Allows you to create backups of your saved data as a single chunk of text.  This text can then be pasted into a text file and saved on your computer.<br /><br /><b>Making periodic backups is highly recommended.</b>");
			mDiv.appendChild(mButton);
			mButton = new FileLoader("Restore", "loaderButton", "text/plain", setImportData);
			setOnmouseoverPopupL1(mButton.button, "Allows you to import backup data.<br /><br /><b>This operation will overwrite all existing saved data!</b>");
			mDiv.appendChild(mButton.button);
			mButton = createButton("Delete", "", "dataButton", setupDelete);
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
	$$.setUpSaveTools = setUpSaveTools;

	function getCheckedSlots()
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
	$$.getCheckedSlots = getCheckedSlots;

	function importData(data)
	{
		var aData;
		if (localStorageSupported())
		{
			try
			{
				aData = JSON.parse(atob(data));
				if (aData)
				{
					SaveBuildArray(aData);
					selectClearHideSections();
					refreshSaveList();
				}
			}
			catch(e)
			{
				selectConfirmation("", "Invalid Backup Data", "The data you have entered is not valid. :(", "OK", true);
			}
		}
	}
	$$.importData = importData;

	function sanitize(value)
	{
		return value.replace(/[^\x20-\x7E]+/g, "");
	}

	function setImportData(e)
	{
		importData(e);
	}

	function FileLoader(buttonContents, buttonClass, mimeType="", fCallback=null)
	{
		this.button = document.createElement("div");
		this.button.className = "fileLoader";
		this.button.classList.add(buttonClass);
		this.reader = new FileReader();
		this.callback = fCallback;
		this.result = null;
		var mLoaderButton = document.createElement("input");
		mLoaderButton.type = "file";
		mLoaderButton.id = "fileLoader" + FileLoader.indexer++;
		mLoaderButton.name = mLoaderButton.id;
		mLoaderButton.accept = mimeType;
		mLoaderButton.style = "width: 0.1px; height: 0.1px; opacity: 0; position: absolute;";
		var mStyledButton = document.createElement("label");
		mStyledButton.setAttribute("for", mLoaderButton.id);
		if (buttonContents instanceof HTMLElement) mStyledButton.appendChild(buttonContents);
		else mStyledButton.innerHTML = buttonContents || "⚠ Load " + mimeType + " File";
		this.button.appendChild(mLoaderButton);
		this.button.appendChild(mStyledButton);
		(function(reader, result, mimeType)
		{
			reader.addEventListener("load", function(e)
			{
				if (mimeType.includes("image"))
				{
					result = new Image();
					result.src = e.target.result;
				}
				else
				{
					result = e.target.result;
				}
				fCallback(result);
			});
			mLoaderButton.addEventListener("change", function(e)
			{
				var mTarget = e.target;
				if (this.accept.includes("image")) reader.readAsDataURL(mTarget.files[0]);
				else if (this.accept.includes("text")) reader.readAsText(mTarget.files[0]);
				else reader.readAsBinaryString(mTarget.files[0]);
			});
		})(this.reader, this.result, mimeType);
	}
	FileLoader.indexer = 0;
	$$.FileLoader = FileLoader;

	function FileSaver(fileName, data, type)
	{
		var file = new Blob([data], {"type":type});
		var saver = document.createElement("a");
		saver.href = URL.createObjectURL(file);
		saver.download = fileName;
		document.body.appendChild(saver);
		saver.click();
		setTimeout(function()
		{
			document.body.removeChild(saver);
			window.URL.revokeObjectURL(saver.href);  
		}, 0);
	}
	$$.FileSaver = FileSaver;

	function saveExportData()
	{
		$$.FileSaver("hc-export-" + new Date().getTime() + ".txt", btoa(sanitize(JSON.stringify(LoadBuildArray()))), "text/plain");
	}

	function setupDelete()
	{
		resetDialogBox();
		setDialogBoxHeader("Delete Data");
		var mContents = document.createElement("div");
		mContents.innerHTML = "<b>**WARNING**</b><br /><br />You are about to PERMANENTLY delete the selected character data! :o <br /><br />This cannot be undone.";
		var mButton = createButton("Yes, Delete This Data", null, "dataButton", (function()
		{
			deleteData(getCheckedSlots());
			hideSection("selectionWindow");
			refreshSaveList();
		}));
		addItemToDialogBoxMenu(mContents);
		addItemToDialogBox(mButton);
		showPositionSection("selectionWindow", true);
	}

	function refreshSaveList()
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
		if (localStorageSupported())
		{
			aSaveData = LoadBuildArray();
			iLength = aSaveData.length;
			
			// refresh counter/label
			mTr = document.createElement("tr");
			mTd = document.createElement("td");
			mNode = document.createElement("input");
			mNode.setAttribute("type", "checkbox");
			mNode.addEventListener("click", checkAllSaveSlots);
			mNode.setAttribute("id", "selectAllSaves");
			mTd.appendChild(mNode);
			mNode = document.createElement("span");
			mNode.setAttribute("id", "saveCounterLabel");
			mNode.setAttribute("class", "saveLoadButton");
			mNode.innerHTML = "Saved Data (" + iLength + "/" + app.system.maxSaveSlots + ")";
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
				mNode = document.createElement("input");
				mNode.setAttribute("type", "checkbox");
				mNode.setAttribute("id", "deleteDataBox" + i);
				mNode.value = i;
				mTd.appendChild(mNode);
				(function(i)
				{
					mNode = createButton("💾", "", "saveReplaceButton", (function(){ quickConfirmationBox("Overwrite Data", "Are you sure you want to overwrite this data?  It cannot be undone!<br /><br /><table class='saveReplaceTable'><tr><td>This Data...</td><td>...Will Overwrite This Data</td></tr><tr><td>" + BuildToString() + "</td><td>" + aSaveData[i].desc + "</td></tr></table>", "Overwrite", (function(){ saveBuildData(i); hideSection("selectionWindow"); }));
					}));
					setOnmouseoverPopupL1(mNode, "Overwrite the data in this slot with the current data.");
					mTd.appendChild(mNode);
				})(i);
				mNode = createButton((i + 1) + ": " + (oSave.name == "" ? "(No Name)" : oSave.name), "", "saveLoadButton", null);
				mNode.setAttribute("href", app.system.siteUrl + aSaveData[i].url);
				setOnmouseoverPopupL1(mNode, aSaveData[i].desc);
				mTd.appendChild(mNode);
			}
			
			if (iLength < app.system.maxSaveSlots)
			{
				mTr = document.createElement("tr");
				mTd = document.createElement("td");
				mNode = createButton("New Save Slot", "", "", (function(){ saveBuildData(iLength); }));
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
	$$.refreshSaveList = refreshSaveList;

	function checkAllSaveSlots()
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
	$$.checkAllSaveSlots = checkAllSaveSlots;

	function DeleteBuildData(iSlot, bRefresh=true)
	{
		var aSaveData = LoadBuildArray();
		aSaveData.splice(iSlot, 1);
		SaveBuildArray(aSaveData);
		if (bRefresh) refreshSaveList();
	}

	function deleteData(aDeleteList)
	{
		var i;
		var iLength = aDeleteList.length;
		for (i = iLength - 1; i > -1; i--)
		{
			DeleteBuildData(aDeleteList[i], false);
		}
		refreshSaveList();
	}
	$$.deleteData = deleteData;

	function saveBuildData(iSlot)
	{
		var aSaveData = LoadBuildArray();
		var oSave = {};
		oSave.name = PH.name;
		oSave.url = PH.buildLinkRef;
		oSave.desc = BuildToString();
		if (iSlot < 0 && iSlot > aSaveData.length) iSlot = aSaveData.length;
		
		aSaveData[iSlot] = oSave;
		SaveBuildArray(aSaveData);
		refreshSaveList();
	}
	$$.saveBuildData = saveBuildData;
	/////////// Build import/export ////////////////////////////////////
	function BuildToString()
	{
		var sReturn = "<b><u>" + PH.name + "</u></b><br />" + PH.archetype.name + "<br /><br /><b>SuperStats:</b>  ";
		var i, iLength;
		var aFFLevels = [0, 1, 1, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38];
		var aATLevels = [0, 1, 1, 6, 8, 11, 14, 17, 21, 25, 30, 35, 40];
		var aLevels;
		var rxQuoteFix = /'/g;
		if (PH.archetype != HCData.archetype[1])
		{
			aLevels = aATLevels;
		}
		else
		{
			aLevels = aFFLevels;
		}
		
		iLength = PH.superStat.length;
		for (i = 1; i < iLength; i++)
		{
			if (i > 1) sReturn += ", ";
			sReturn += NullFix(Aesica.dataHarness.SuperStat.abbrev(PH.superStat[i]), "???");
		}
		sReturn += "<br /><b>Specs:</b>  ";
		sReturn += NullFix(PH.specializationTree[app.system.specialization.role[0]].name, "???") + ", ";
		sReturn += NullFix(PH.specializationTree[app.system.specialization.role[1]].name, "???") + "<br /><b>Mastery:</b>  ";
		sReturn += NullFix(PH.specializationTree[app.system.specialization.mastery].name, "???") + "<br /><br />";
		iLength = aLevels.length;;
		for (i = 1; i < iLength; i++)
		{
			if (i > 1) sReturn += "<br />";
			sReturn += aLevels[i] + ": <b>" + (PH.power[i].name ? PH.power[i].name.replace(rxQuoteFix, "\\\'") : "???") + "</b> <i>" + forumAdvantageText(1, i, PH.powerAdvantage[i]) + "</i>";
		}
		return sReturn;
	}

	function NullFix(sText, sReplaceNullWith="")
	{
		var sReturn = (sText) ? sText : sReplaceNullWith;
		return sReturn;
	}

	function showResetDataOptions()
	{
		resetDialogBox();
		setDialogBoxHeader("Reset Options");
		var mLabel = document.createElement("div");
		mLabel.innerHTML = "I want to reset...";
		addItemToDialogBoxMenu(mLabel);
		
		var mAll = createCheckbox("<b>Everything</b>", "resetAll", "resetAll", "radioButton", "resetGroup", true, "▶");
		var mSelective = createCheckbox("<b>Selective</b>", "resetSome", "resetSome", "radioButton", "resetGroup", false, "▶");
		mAll.addEventListener("click", function(){ResetAllClicked(true)});
		mSelective.addEventListener("click", function(){ResetAllClicked(false)});
		setOnmouseoverPopupL1(mAll, "This option will clear all selected fields.  If working with an archetype, it will be reset back to freeform as well.");
		setOnmouseoverPopupL1(mSelective, "Allows you to pick and choose which fields to reset.  Note that archetypes cannot reset certain things.");
		
		var mStats = createCheckbox("Super Stats", null, "resetBox0", "checkBox");
		var mTalents = createCheckbox("Innate Talent & Talents", null, "resetBox1", "checkBox");
		var mTravelPowers = createCheckbox("Travel Powers", null, "resetBox2", "checkBox");
		var mSpecs = createCheckbox("Specializations", null, "resetBox3", "checkBox");
		var mPowers = createCheckbox("Powers", null, "resetBox4", "checkBox");
		var mResetButton = createButton("Proceed", "", "selectConfirmButton", ResetBuild);
		addItemToDialogBoxMenu(document.createElement("br"));
		addItemToDialogBoxMenu(mAll);
		addItemToDialogBoxMenu(mSelective);
		addItemToDialogBoxMenu(document.createElement("br"));
		addItemToDialogBoxMenu(document.createElement("br"));
		addItemToDialogBoxMenu(mStats);
		addItemToDialogBoxMenu(mTalents);
		addItemToDialogBoxMenu(mTravelPowers);
		addItemToDialogBoxMenu(mSpecs);
		addItemToDialogBoxMenu(mPowers);
		addItemToDialogBoxMenu(document.createElement("br"));
		addItemToDialogBoxMenu(mResetButton);
		
		ResetAllClicked();
		
		showPositionSection("selectionWindow");
	}
	$$.showResetDataOptions = showResetDataOptions;

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
			if (PH.archetype.id != 1 && (i == 0 || i == 3 || i == 4)) // no resetting superstats, specs, or powers as non-freeform
				bHide = true;
			
			mElement.disabled = bHide;
			mElement.setAttribute("class", bHide ? "disabledCheckBox" : "checkBox");
		}
	}

	function quickMessage(sHeader, sMessage)
	{
		resetDialogBox();
		setDialogBoxHeader(sHeader);
		var mMessage = document.createElement("div");
		mMessage.innerHTML = sMessage;
		addItemToDialogBox(mMessage);
		showPositionSection("selectionWindow", true);
	}
	$$.quickMessage = quickMessage;

	function createCheckbox(sLabel, sValue, sID, sClass=null, sRadioGroup=null, bChecked=false, sCheckIcon="✔")
	{
		var mReturn = document.createElement("label");
		var mBox = document.createElement("input");
		var mNewBox = document.createElement("span");
		var mLabel = document.createElement("span");
		mLabel.innerHTML = sLabel;
		mNewBox.innerHTML = sCheckIcon;
		mBox.setAttribute("type", ((sRadioGroup) ? "radio" : "checkbox"));
		if (sValue) mBox.setAttribute("value", sValue);
		if (sID)
		{
			mReturn.setAttribute("id", sID);
			mBox.setAttribute("id", sID + "Input");
			mNewBox.setAttribute("id", sID + "Box");
		}
		if (sClass)
		{
			mReturn.setAttribute("class", sClass);
			mBox.setAttribute("class", sClass + "Input");
			mNewBox.setAttribute("class", sClass + "Box");
		}
		if (sRadioGroup) mBox.setAttribute("name", sRadioGroup);
		mBox.checked = bChecked;
		mReturn.appendChild(mBox);
		mReturn.appendChild(mNewBox);
		mReturn.appendChild(mLabel);

		return mReturn;
	}

	function ResetBuild()
	{
		var bEverything = document.getElementById("resetAllInput").checked;
		var bStats = document.getElementById("resetBox0Input").checked;
		var bTalents = document.getElementById("resetBox1Input").checked;
		var bTravelPowers = document.getElementById("resetBox2Input").checked;
		var bSpecs = document.getElementById("resetBox3Input").checked;
		var bPowers = document.getElementById("resetBox4Input").checked;
		var i;
		var iLength;
		if (bEverything)
		{
			window.location.href = window.location.href.split("?")[0];
		}
		else
		{
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
				if (PH.archetype.id == 1)
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
	}

	///////////////// Data functions /////////////////////////////

	function EchoVersion()
	{
		return "Version: " + app.version + ":" + HCData.version;
	}

	function listPowersFromFramework(iFramework)
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
	$$.listPowersFromFramework = listPowersFromFramework;

	function listSpecializations(iSpec)
	{
		var i, iStart, iLength, j, iTreeLength, iCurrentSpec, oTree, sReturn;
		sReturn = EchoVersion();
		sReturn += "id tier ranks name";
		iSpec = parseInt(iSpec);
		if (isNaN(iSpec))
		{
			iStart = 0;
			iLength = HCData.specializationTree.length;
		}
		else
		{
			iStart = iSpec;
			iLength = iSpec + 1;
		}
		for (i = iStart; i < iLength; i++)
		{
			oTree = HCData.specializationTree[i];
			sReturn += "\n" + oTree.name + " [" + i + "]";
			iTreeLength = oTree.specializationList.length;
			for (j = 0; j < iTreeLength; j++)
			{
				sReturn += "\n[" + oTree.specializationList[j].id + "][" + oTree.specializationList[j].tier + "][" + oTree.specializationList[j].maxPoints + "] " + oTree.specializationList[j].name;
			}
		}
		return sReturn;
	}
	$$.listSpecializations = listSpecializations;

	function listTravelPowers(iType)
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
	$$.listTravelPowers = listTravelPowers;

	// magic numbers are fine because debug function:  0 = innate talent, else = talent
	function listTalents(iType=0)
	{
		var aList = (iType == 0) ? HCData.innateTalent : HCData.talent;
		var i;
		var iLength = aList.length;
		var sReturn = EchoVersion() + "\n" + (iType == 0 ? "Innate " : "") + "Talents\nid code name extra";
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\n[" + aList[i].id + "][" + aList[i].code() + "] " + aList[i].name + " (" + aList[i].extra + ")";
		}
		return sReturn;
	}
	$$.listTalents = listTalents;

	function listPowerIDsFromNames(sNameList)
	{
		var sReturn = "id name";
		var aNames = sNameList.split("/");
		var i, iLength = aNames.length;
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\n[" + dataPowerIdFromName[aNames[i]] + "] " + aNames[i];
		}
		return sReturn;
	}
	$$.listPowerIDsFromNames = listPowerIDsFromNames;

	function listTravelPowerIDsFromNames(sNameList)
	{
		var sReturn = "id name";
		var aNames = sNameList.split("/");
		var i, iLength = aNames.length;
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\n[" + dataTravelPowerIdFromName[aNames[i]] + "] " + aNames[i];
		}
		return sReturn;
	}
	$$.listTravelPowerIDsFromNames = listTravelPowerIDsFromNames;

	function listArchetypes()
	{
		var i;
		var iLength = HCData.archetype.length;
		var sReturn = EchoVersion() + "\nArchetypes\nid code name";
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\n[" + HCData.archetype[i].id + "][" + HCData.archetype[i].code() + "] " + HCData.archetype[i].name;
		}
		return sReturn;
	}
	$$.listArchetypes = listArchetypes;

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

	function superStatsToJSON()
	{
		return JSON.stringify(HCData.superStat);
	}
	$$.superStatsToJSON = superStatsToJSON;

	function archetypesToJSON()
	{
		return JSON.stringify(HCData.archetype);
	}
	$$.archetypesToJSON = archetypesToJSON;

	function specializationsToJSON()
	{
		//var sReturn = "Manual entry required. :(\n\n"
		//sReturn += "Suggested Format:\n\tTree(name, specializationlist[], desc)\n\t\tSpecialization(name, tier, points, desc)";
		return JSON.stringify(HCData.specializationTree);
	}
	$$.specializationsToJSON = specializationsToJSON;

	function talentsToJSON()
	{
		/*
		var i;
		var iLength = HCData.talent.length;
		var sReturn = "\t\"talents\":\n\t[\n";
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\t\t{" + JSONize("name", HCData.talent[i].name) + "," + JSONize("desc", HCData.talent[i].extra) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
		}
		sReturn += "\t]";
		*/
		return JSON.stringify(HCData.talent);
	}
	$$.talentsToJSON = talentsToJSON;

	function travelPowersToJSON()
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
	$$.travelPowersToJSON = travelPowersToJSON;

	function innateTalentsToJSON()
	{
		/*
		var i;
		var iLength = HCData.innateTalent.length;
		var sReturn = "\t\"innatetalents\":\n\t[\n";
		for (i = 0; i < iLength; i++)
		{
			sReturn += "\t\t{" + JSONize("name", HCData.innateTalent[i].name) + "," + JSONize("desc", HCData.innateTalent[i].tip) + "}" + ((i < iLength - 1) ? "," : "") + "\n";
		}
		sReturn += "\t]";
		*/
		return JSON.stringify(HCData.innateTalent);
	}
	$$.innateTalentsToJSON = innateTalentsToJSON;

	function powerDataToJSON()
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
	$$.powerDataToJSON = powerDataToJSON;

	function exportArchetypes()
	{
		var i, iLength = HCData.archetype.length;
		var sReturn = "Processing " + iLength + " archetypes...\n";
		var aResults = [];
		for (i = 0; i < iLength; i++)
		{
			aResults.push(HCData.archetype[i]);
		}
		sReturn += aResults.join(",\n");
		return sReturn;
	}
	$$.exportArchetypes = exportArchetypes;

	function exportPowers(adv=false)
	{
		Aesica.exportCounter = {};
		Aesica.powerList = [];
		Aesica.advantageList = [];
		Aesica.dupeCounter = {};
		var i, iLength = dataPower.length;
		var j, jLength, oAdvantageBlob = {};
		var oPower, aOldAdvantageList;
		var sReturn = "Processing " + iLength + " powers...\n";
		for (i = 0; i < iLength; i++)
		{
			oPower = dataPower[i];
			aOldAdvantageList = oPower.advantageList;
			jLength = aOldAdvantageList.length;
			for (j = 0; j < jLength; j++)
			{
				if (Aesica.dupeCounter[aOldAdvantageList[j].name])
				{
					Aesica.dupeCounter[aOldAdvantageList[j].name]++;
				}
				else
				{
					Aesica.dupeCounter[aOldAdvantageList[j].name] = 1;
					Aesica.advantageList.push(aOldAdvantageList[j]);
					Aesica.advantageList[Aesica.advantageList.length - 1].id = Aesica.advantageList.length - 1;
				}
			}
			Aesica.powerList.push(oPower);
		}
		sReturn += "Done.\n\nListing advantage duplicates/clashes:\n";
		iLength = Object.keys(Aesica.dupeCounter).length;
		var sKey;
		for (i = 0; i < iLength; i++)
		{
			sKey = Object.keys(Aesica.dupeCounter)[i];
			if (Aesica.dupeCounter[sKey] > 1) sKey + ": " + Aesica.dupeCounter[sKey] + "\n";
		}
		sReturn += "Done.\n\nResults to be stored in HCData.power and HCData.advantage.\n"
		sReturn += adv ? "Dumping power advantages:\n\n" : "Dumping powers:\n\n";
		sReturn += adv ? Aesica.advantageList.join(",\n") : Aesica.powerList.join(",\n");
		return sReturn;
	}
	$$.exportPowers = exportPowers;

	function exportTPowers(adv=false)
	{
		Aesica.exportCounter = {};
		Aesica.powerList = [];
		Aesica.advantageList = [];
		Aesica.dupeCounter = {};
		var i, iLength = dataTravelPower.length;
		var j, jLength, oAdvantageBlob = {};
		var oPower, aOldAdvantageList;
		var sReturn = "Processing " + iLength + " travel powers...\n";
		for (i = 0; i < iLength; i++)
		{
			oPower = dataTravelPower[i];
			aOldAdvantageList = oPower.advantageList;
			jLength = aOldAdvantageList.length;
			for (j = 0; j < jLength; j++)
			{
				if (Aesica.dupeCounter[aOldAdvantageList[j].name])
				{
					Aesica.dupeCounter[aOldAdvantageList[j].name]++;
				}
				else
				{
					Aesica.dupeCounter[aOldAdvantageList[j].name] = 1;
					Aesica.advantageList.push(aOldAdvantageList[j]);
					Aesica.advantageList[Aesica.advantageList.length - 1].id = Aesica.advantageList.length - 1;
				}
			}
			Aesica.powerList.push(oPower);
		}
		sReturn += "Done.\n\nListing advantage duplicates/clashes:\n";
		iLength = Object.keys(Aesica.dupeCounter).length;
		var sKey;
		for (i = 0; i < iLength; i++)
		{
			sKey = Object.keys(Aesica.dupeCounter)[i];
			if (Aesica.dupeCounter[sKey] > 1) sKey + ": " + Aesica.dupeCounter[sKey] + "\n";
		}
		sReturn += "Done.\n\nResults to be stored in HCData.power and HCData.advantage.\n"
		sReturn += adv ? "Dumping travel power advantages:\n\n" : "Dumping travel powers:\n\n";
		sReturn += adv ? Aesica.advantageList.join(",\n") : Aesica.powerList.join(",\n");
		return sReturn;
	}
	$$.exportTPowers = exportTPowers;

})(Aesica.HCEngine);
Aesica.HCEngine.Preloader.preloadImages("img/spritesheet.png");

//==============================================================================
// End
//==============================================================================
