/*==============================================================================
 * powerhouse.js
 *
 * PowerHouse Javascript
 *
 * Original Author: Kyle W T Sherman
 * http://nullware.com
 * 
 * Current Author & Maintainer:  Aesica
 * http://aesica.net/co
 *============================================================================*/

// system config data
const app = 
{
	"version":3.26,
	"releaseDate":"11/28/2018",
	"system":
	{
		"siteName":"HeroCreator",
		"siteLogo":"img/hc-logo.png",
		"siteUrl":window.location.href.split("?")[0],
		"clickableClasses":["selection", "link"],
		"font":{"maxColumns":7, "perColumn":25, "familyList":["serif", "sans-serif", "Arial", "Comic Sans MS", "Courier New", "Franklin Gothic", "Georgia", "Lucida Console", "Segoe Print", "Segoe UI", "Times New Roman", "Trebuchet MS", "Verdana"]},
		"popupTipList":["Mobile/Touch (beta)", "Disabled", "PC/Mouseover"],
		"maxSaveSlots":100,
		"noteLimit":140,
		"buttonText":{"clear":"Clear", "insert":"Insert", "delete":"Delete"},
		"defaultIcon":{"power":"Any_Generic", "archetype":"Any_Generic"},
		"specialization":{"none":0, "stat":1, "role":[2, 3], "mastery":4},
		"settingsLabel":"HeroCreatorSettings",
		"defaultSettings":{"iconWidth":24, "iconHeight":32, "iconWidthAT":58, "iconHeightAT":50, "popupTips":2, "confirmSelection":false, "forumExportType":"phpbbs", "fontFamily":"sans-serif", "fontSize":100, "analytics":false, "debug":0},
		"export":{"type":{"none":0, "html":1, "htmlForum":2, "bbcode":3, "markdown":4}, "tip":["Plain text contains no special formatting.", "HTML is the markup language used by websites.  This option assigns classes to elements for use with CSS.", "This is basic HTML with line breaks omitted.<br /><br /><span class='redText'>This format is no longer used by the official CO forums and has been deprecated.</span>", "BBCode is a formatting system used by many forums based on Invision, phpBB, vBulletin, etc.<br /><br /><span class='greenText'>The official Champions Online forums use this for post formatting.</span>", "Markdown is a basic text formatting system used by Reddit, Discord, etc."]},
		"columnCount":{"power":2, "travelPower":3},
		"archetypeRowSize":7,
		"specPointMax":10,
		"analytics":{"pref":"Preference", "set":"Set", "build":"Build"} // maintained, but no longer relevant
	}
}

// mouse tracking & preferences
var mouseX = 0;
var mouseY = 0;
var prefs = app.system.defaultSettings;

function getQueryString()
{
	var oReturn = {};
	var rxQueryString = /[?&]([^?&=\t\n\r]+=[^?&=\t\n\r]*)/gi;
	var aSegments = rxQueryString.exec(window.location.href);
	var i, iLength, aTemp;
	if (aSegments)
	{
		iLength = aSegments.length
		for (i = 1; i < iLength; i++)
		{
			aTemp = aSegments[i].split("=");
			oReturn[aTemp[0]] = aTemp[1];
		}
	}
	return oReturn;
}

// escape quotes
function escapeQuotes(str)
{
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

// set and get cookies
/*
function setCookie(name, value, expireDays)
{
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + expireDays);
	var cookieValue = escape(value) + ((expireDays == null) ? '' : '; expires=' + expireDate.toUTCString());
	document.cookie = name + '=' + cookieValue;
}
window['setCookie'] = setCookie;

function getCookie(name)
{
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++)
	{
		var x = cookies[i].substr(0, cookies[i].indexOf('='));
		var y = cookies[i].substr(cookies[i].indexOf('=') + 1);
		x = x.replace(/^\s + |\s + $/g, '');
		if (x == name) return unescape(y);
	}
	return undefined;
}
window['getCookie'] = getCookie;
*/
// encode number to url code
// valid number range is 0-61 (invalid numbers default to 0)
function numToUrlCode(num)
{
	var charCode = 0;
	if (num >= 0 && num <= 9) charCode = num + 48; // 0-9
	else if (num >= 10 && num <= 35) charCode = num + 55; // A-Z
	else if (num >= 36 && num <= 61) charCode = num + 61; // a-z
	else throw 'numToUrlCode: num is out of valid range: ' + num;
	return String.fromCharCode(charCode);
}
window['numToUrlCode'] = numToUrlCode;

// encode number to two digit url code
// valid number range is 0-3721 (invalid numbers default to 0)
function numToUrlCode2(num)
{
	return numToUrlCode(Math.floor(num / 61)) + numToUrlCode(num % 61);
}
window['numToUrlCode2'] = numToUrlCode2;

// encode number to four digit url code
// valid number range is 0-13845841 (invalid numbers default to 0)
function numToUrlCode4(num)
{
	var result = '';
	var tmp = num;
	for (var i = 3; i >= 0; i--)
	{
		result += numToUrlCode(Math.floor(tmp / Math.pow(61, i)));
		tmp = tmp % Math.pow(61, i);
	}
	return result;
}
window['numToUrlCode4'] = numToUrlCode4;

// decode url code to number
// invalid codes default to 0
function urlCodeToNum(code)
{
	var num = 0;
	var charCode = code.charCodeAt(0);
	if (charCode >= 48 && charCode <= 57) num = charCode - 48;
	else if (charCode >= 65 && charCode <= 90) num = charCode - 55;
	else if (charCode >= 97 && charCode <= 122) num = charCode - 61;
	else throw 'urlCodeToNum: code is out of valid range: ' + code + ' (' + charCode + ')';
	return num;
}
window['urlCodeToNum'] = urlCodeToNum;

// decode two character url code to number
// invalid codes default to 0
function urlCodeToNum2(code)
{
	return urlCodeToNum(code[0]) * 61 + urlCodeToNum(code[1]);
}
window['urlCodeToNum2'] = urlCodeToNum2;

// decode four character url code to number
// invalid codes default to 0
function urlCodeToNum4(code)
{
	return urlCodeToNum(code[0]) * 226981 + urlCodeToNum(code[1]) * 3721 + urlCodeToNum(code[2]) * 61 + urlCodeToNum(code[3]);
}
window['urlCodeToNum4'] = urlCodeToNum4;

// submit google analytics
// ** REMOVED **
function submitAnalytics(catagory, action, label, value)
{
/*
   if (prefs.analytics) {
   if (debug) {
   console.log(['_trackEvent', catagory, action, label, value]);
   } else {
   _gaq.push(['_trackEvent', catagory, action, label, value]);
   }
   }
 */
}
window['submitAnalytics'] = submitAnalytics;
// queue google analytics for background submission
var analyticsTimeout = 2000;
var analyticsQueue = [];
var analyticsQueueServiceRunning = false;

function queueAnalytics(catagory, action, label, value)
{
/*
   if (prefs.analytics) {
   analyticsQueue.push([catagory, action, label, value]);
   // start google analytics queue submission service
   if (!analyticsQueueServiceRunning) analyticsQueueService();
   }
 */
}
window['queueAnalytics'] = queueAnalytics;

// pop submissions off of queue and submit them
function analyticsQueueService()
{
	if (analyticsQueue.length > 0)
	{
		analyticsQueueServiceRunning = true;
		var event = analyticsQueue.shift();
		//submitAnalytics(event[0], event[1], event[2], event[3]);
		setTimeout(analyticsQueueService, analyticsTimeout);
	}
	else
	{
		analyticsQueueServiceRunning = false;
	}
}
window['analyticsQueueService'] = analyticsQueueService;

// get data sets (from powerhouse-data.js)
//var dataSuperStat = getDataSuperStat();
//var dataInnateTalent = getDataInnateTalent();
//var dataTalent = getDataTalent();
var dataTravelPower = getDataTravelPower();
var dataPowerSet = getDataPowerSet();
var dataFramework = getDataFramework();
var dataPower = getDataPower();
var dataEnergyUnlockPower = getDataEnergyUnlockPower();
//var dataArchetypeGroup = getDataArchetypeGroup();
//var dataArchetype = getDataArchetype();
//var dataSpecializationTree = getDataSpecializationTree();
var dataVersionUpdate = getDataVersionUpdate();

// power code lookup
var dataPowerIdFromCode = [];
for (var i = 0; i < dataPower.length; i++)
{
	dataPowerIdFromCode[dataPower[i].code()] = parseInt(i);
}

// power set lookup
var dataPowerIdFromPowerSet = [];
for (var i = 0; i < dataPower.length; i++)
{
	var powerSet = dataPower[i].powerSet;
	if (powerSet != null)
	{
		if (dataPowerIdFromPowerSet[powerSet] == undefined)
		{
			dataPowerIdFromPowerSet[powerSet] = [];
		}
		dataPowerIdFromPowerSet[powerSet].push(parseInt(i));
	}
}

// power framework lookup
var dataPowerIdFromFramework = [];
for (var i = 0; i < dataPower.length; i++)
{
	var framework = dataPower[i].framework;
	if (framework != null)
	{
		if (dataPowerIdFromFramework[framework] == undefined)
		{
			dataPowerIdFromFramework[framework] = [];
		}
		dataPowerIdFromFramework[framework].push(parseInt(i));
	}
}

// active character info
var PH = {};
PH.version = HCData.version;
PH.name = "";
PH.archetype = HCData.archetype[1];
PH.role = HCData.archetypeGroup[1];
PH.buildNote = "";
PH.device = [];
for (var i = 1; i <= 5; i++)
{
	PH.device[i] = HCData.device[0];
}
PH.superStat = [];
for (var i = 1; i <= 3; i++)
{
	PH.superStat[i] = HCData.superStat[0];
}
PH.innateTalent = [];
for (var i = 1; i <= 1; i++)
{
	PH.innateTalent[i] = HCData.innateTalent[0];
}
PH.talent = [];
for (var i = 1; i <= 6; i++)
{
	PH.talent[i] = HCData.talent[0];
}
PH.travelPower = [];
for (var i = 1; i <= 2; i++)
{
	PH.travelPower[i] = dataTravelPower[0];
}
PH.travelPowerAdvantage = [];
for (var i = 1; i <= 2; i++)
{
	PH.travelPowerAdvantage[i] = 0;
}
PH.power = [];
for (var i = 1; i <= 14; i++)
{
	PH.power[i] = dataPower[0];
}
PH.powerAdvantage = [];
for (var i = 1; i <= 14; i++)
{
	PH.powerAdvantage[i] = 0;
}
PH.specializationTree = [];
for (var i = 1; i <= 4; i++)
{
	PH.specializationTree[i] = HCData.specializationTree[0];
}
PH.specialization = [];
for (var i = 1; i <= 4; i++)
{
	PH.specialization[i] = 0;
}
PH.buildLink = "";
PH.buildLinkRef = "";
var statFrameworkCount = [];
for (var i = 1; i <= dataFramework.length; i++)
{
	statFrameworkCount[i] = 0;
}
var statPowerSetCount = [];
for (var i = 0; i < dataPowerSet.length; i++)
{
	statPowerSetCount[i] = 0;
}
var statEnergyBuilder = 0;
var statEnergyUnlock = 0;
var statTier4 = 0;
var statAdvantagePoints = 0;
var maxAdvantagePointsTotal = 36;
var maxAdvantagePointsPerPower = 5;
var selectedNum = 0;
var selectedFieldId = null;
var selectedFieldClass = null;
var prevSelectedFramework = 0;
var prevSelectedSpecializationSuperStat = 0;

// event functions
function catchEvent(eventObj, event, eventHandler)
{
	if (eventObj.addEventListener)
	{
		eventObj.addEventListener(event, eventHandler, false);
	}
	else if (eventObj.attachEvent)
	{
		event = 'on' + event;
		eventObj.attachEvent(event, eventHandler);
	}
}
window['catchEvent'] = catchEvent;

function setupEvents(evnt)
{
	// disable enter key in forms
	catchEvent(document, 'keypress', noEnter);
	// mouseX and mouseY
	catchEvent(document, 'mousemove', setMouseXY);
	// change name
	catchEvent(document.getElementById('editName'), 'change', changeName);
	// close popups when main document is clicked, but not when the popup divs are clicked
	catchEvent(document, 'mouseup', selectClearMaybe);
}
window['setupEvents'] = setupEvents;
catchEvent(window, 'load', setupEvents);

// disable enter key (used in form fields)
function noEnter(evnt)
{
	//return !(window.event && window.event.keyCode == 13);
	var evnt = (evnt) ? evnt : ((event) ? event : null);
	var node = (evnt.target) ? evnt.target : ((evnt.srcElement) ? evnt.srcElement : null);
	if ((evnt.keyCode == 13) && (node.type == 'text'))
	{
		changeName();
	}
}
window['noEnter'] = noEnter;

// document.onkeypress = noEnter;

// set mouseX and mouseY globals
function setMouseXY(evnt)
{
	var x, y;
	try
	{
		x = evnt.pageX;
		y = evnt.pageY;
	} // firefox
	catch (e)
	{
		x = event.x;
		y = event.y;
	} // internet explorer
	mouseX = x;
	mouseY = y;
}
window['setMouseXY'] = setMouseXY;

// get document width and height
function getDocumentBounds()
{
	var width = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth);
	var height = (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight);
	return {width: width, height: height}
}
window['getDocumentBounds'] = getDocumentBounds;

// popup (tool tip)
function popup(text)
{
	var xoffset = 20;
	var yoffset = 10;
	var margin = 20;
	var bounds = getDocumentBounds();
	var width = bounds.width;
	var height = bounds.height;
	var x = mouseX;
	var y = mouseY;
	var tip = document.getElementById('popup');
	tip.innerHTML = text;
	tip.style.display = 'block';
	x += xoffset;
	y += yoffset;
	if (x > width - tip.offsetWidth - margin) x = width - tip.offsetWidth - margin;
	if (x < 0) x = 0;
	if (y > height - tip.offsetHeight - margin) y = height - tip.offsetHeight - margin;
	if (y < 0) y = 0;
	if (x < mouseX)
	{
		var nx = mouseX - xoffset - tip.offsetWidth;
		if (nx < margin) nx = margin;
		if (nx + tip.offsetWidth - mouseX < mouseX - x) x = nx;
	}
	if (y < mouseY)
	{
		var ny = mouseY - yoffset - tip.offsetHeight;
		if (ny < margin) ny = margin;
		if (ny + tip.offsetHeight - mouseY < mouseY - y) y = ny;
	}
	tip.style.left = x + 'px';
	tip.style.top = y + 'px';
}
window['popup'] = popup;

function popupL1(text)
{
	if (prefs.popupTips == 2)
	{
		popup(text);
	}
}
window['popupL1'] = popupL1;

function popupL2(text)
{
	if (prefs.popupTips == 2)
	{
		popup(text);
	}
}
window['popupL2'] = popupL2;

function popout()
{
	var tip = document.getElementById('popup');
	tip.style.display = 'none';
}
window['popout'] = popout;

function setOnmouseoverPopupL1(field, text)
{
	clearOnmouseoverPopup(field);
	if (text != null)
	{
		field.customPopupL1 = function(){popupL1(text)};
		field.customPopout = function(){popout()};
		field.addEventListener("mouseover", field.customPopupL1);
		field.addEventListener("mouseout", field.customPopout);
	}
}
window['setOnmouseoverPopupL1'] = setOnmouseoverPopupL1;

function setOnmouseoverPopupL2(field, text)
{
	clearOnmouseoverPopup(field);
	if (text != null)
	{
		field.customPopupL2 = function(){popupL2(text)};
		field.customPopout = function(){popout()};
		field.addEventListener("mouseover", field.customPopupL2);
		field.addEventListener("mouseout", field.customPopout);
	}
}
window['setOnmouseoverPopupL2'] = setOnmouseoverPopupL2;

function clearOnmouseoverPopup(field)
{
	field.removeEventListener("mouseover", field.customPopupL1);
	field.removeEventListener("mouseover", field.customPopupL2);
	field.removeEventListener("mouseout", field.customPopout);
}
window['clearOnmouseoverPopup'] = clearOnmouseoverPopup;

// hide/show section
function hideSection(id)
{
	document.getElementById(id).style.display = "none";
}
window['hideSection'] = hideSection;

function showSection(id)
{
	document.getElementById(id).style.display = "";
}
window['showSection'] = showSection;

// show and position section
// if right is true, then orientation is to the right
// if right is false, then orientation is to the left
function showPositionSection(id, right)
{
	var xoffset = ((right) ? 20 : -20);
	var yoffset = 10;
	var margin = 50;
	var bounds = getDocumentBounds();
	var width = bounds.width;
	var height = bounds.height;
	var section = document.getElementById(id);
	var x = mouseX;
	var y = mouseY;
	showSection(section.id);
	x += xoffset;
	y += yoffset;
	if (!right) x = x - section.offsetWidth;
	if (x > width - section.offsetWidth - margin) x = width - section.offsetWidth - margin;
	if (y > height - section.offsetHeight - margin) y = height - section.offsetHeight - margin;
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	section.style.left = x + 'px';
	section.style.top = y + 'px';
}
window['showPositionSection'] = showPositionSection;

// update section position
function updatePositionSection(id)
{
	var margin = 50;
	var bounds = getDocumentBounds();
	var width = bounds.width;
	var height = bounds.height;
	var section = document.getElementById(id);
	var x = section.style.left.substring(0, section.style.left.length - 2);
	var y = section.style.top.substring(0, section.style.top.length - 2);
	if (x > width - section.offsetWidth - margin) x = width - section.offsetWidth - margin;
	if (y > height - section.offsetHeight - margin) y = height - section.offsetHeight - margin;
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (section.style.top && section.style.left)
	{
		section.style.left = x + 'px';
		section.style.top = y + 'px';
	}
}
window['updatePositionSection'] = updatePositionSection;

// name functions
function editName()
{
	var field = document.getElementById('editName');
	field.value = PH.name;
	hideSection('sectionDisplayName');
	showSection('sectionEditName');
	field.focus();
}
window['editName'] = editName;

function cancelName()
{
	hideSection('sectionEditName');
	showSection('sectionDisplayName');
}
window['cancelName'] = cancelName;

function changeName(evnt)
{
	//var evnt = evnt ? evnt : window.event;
	//var target = evnt.target ? evnt.target : evnt.srcElement;
	PH.name = document.getElementById('editName').value;
	hideSection('sectionEditName');
	document.getElementById('fieldName').firstChild.data = PH.name;
	showSection('sectionDisplayName');
	changeUpdate();
	//submitAnalytics(app.system.anayltics.set, 'Name', PH.namee);
}
window['changeName'] = changeName;

// enter key also changes name
// function changeNameEnter() {
//     var test = (window.event && window.event.keyCode == 13);
//     if (test) changeName(window.event);
//     return !test;
// }

// clear selections
function selectClear()
{
	if (selectedFieldId && selectedFieldClass)
	{
		var field = document.getElementById(selectedFieldId);
		field.setAttribute('class', selectedFieldClass);
	}
	selectedNum = 0;
	selectedFieldId = null;
	selectedFieldClass = null;
	selectClearHideSections();
	changeUpdate();
}
window['selectClear'] = selectClear;

function selectClearHideSections()
{
	//hideSection('selectionSuperStat');
	//hideSection('selectionInnateTalent');
	//hideSection('selectionTalent');
	//hideSection('selectionTravelPower');
	//hideSection('selectionPower');
	//hideSection('selectionArchetype');
	//hideSection('selectionPref');
	//hideSection('selectionSpecialization');
	//hideSection('selectionArchetypePower');
	//hideSection('selectionTravelPowerAdvantage');
	//hideSection('selectionPowerAdvantage');
	//hideSection("selectionConfirmation");
	hideSection("selectionWindow");
	popout();
}
window['selectClearHideSections'] = selectClearHideSections;

// clear selections on mouse click outside of div
// note: any clickable items must be in the inner if statement in order to work
function selectClearMaybe(evnt)
{
	var node = (evnt.target) ? evnt.target : ((evnt.srcElement) ? evnt.srcElement : null);
	if (!checkParent(node)) selectClear();
	// check if any parent is a selection class
	function checkParent(node)
	{
		while (node.parentNode)
		{
			var test = false;
			for (var i = 0; i < app.system.clickableClasses.length; i++)
			{
				if (node.className == app.system.clickableClasses[i]) test = true;
			}
			if (test) return true;
			node = node.parentNode;
		}
		return false;
	}
}
window['selectClearMaybe'] = selectClearMaybe;

// confirm selection
// if prefConfirmSelections is true then prompt user for confirmation before setting things
function selectConfirmation(fFunction, sName, sDesc, sConfirmText="Confirm", bForceConfirm=false)
{
	var mConfirmButton, mContent;
	if (prefs.confirmSelections || bForceConfirm)
	{
		/*
		AES.resetDialogBox();
		AES.setDialogBoxHeader(sName);
		mConfirmButton = AES.createButton(sConfirmText, "", "selectConfirmButton", sFunction + "; hideSection('selectionWindow');");
		mContent = document.createElement("div");
		mContent.innerHTML = sDesc;
		mContent.setAttribute("class", "selectConfirmContent");
		AES.addItemToDialogBoxMenu(mContent);
		AES.addItemToDialogBox(mConfirmButton);
		popout();
		showPositionSection("selectionWindow", true);
		*/
		Aesica.HCEngine.quickConfirmationBox(sName, sDesc, sConfirmText, fFunction);
	}
	else
	{
		if (typeof fFunction == "function") fFunction();
		else if (typeof fFunction == "string") eval(fFunction); // <-- RAGE.  This will be going away soon.
	}
}
window['selectConfirmation'] = selectConfirmation;

// super stat functions
function setupSuperStats()
{
	Aesica.HCEngine.resetDialogBox(2);

	Aesica.HCEngine.setDialogBoxHeader("Superstats");

	var i;
	var iLength = HCData.superStat.length;
	// clear button
	var mCurrent = Aesica.HCEngine.createButton(app.system.buttonText.clear, "selectSuperStat" + i, null, (function(){ setSuperStat(0); }));
	var iColumn;
	Aesica.HCEngine.addItemToDialogBoxMenu(mCurrent);
	// superstat buttons
	for (i = 1; i < iLength; i++)
	{
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		(function(i)
		{
			mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("Stat_" + HCData.superStat[i].name, HCData.superStat[i].name), "selectSuperStat" + i, null, (function(){ selectConfirmation((function(){ setSuperStat(i); }), HCData.superStat[i].name, Aesica.dataHarness.SuperStat.tip(HCData.superStat[i])); })); // xxx
			mCurrent.setAttribute("style", "display: block;");
		})(i);
		setOnmouseoverPopupL1(mCurrent, Aesica.dataHarness.SuperStat.tip(HCData.superStat[i]));
		Aesica.HCEngine.addItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupSuperStats'] = setupSuperStats;

function selectSuperStat(num)
{
	var fieldId = 'fieldSuperStat' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId || field.className == "lockedButton")
	{
		selectClear();
	}
	else
	{
		selectClear();
		selectedNum = num;
		selectedFieldId = fieldId;
		selectedFieldClass = field.getAttribute('class');
		field.setAttribute('class', 'selectedButton');
		setupSuperStats();
		showPositionSection('selectionWindow', true);
	}
}
window['selectSuperStat'] = selectSuperStat;

function setSuperStat(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldSuperStat' + num);
	var selectField = document.getElementById('selectSuperStat' + id);
	var oldId = PH.superStat[num].id;
	var oldSelectField = document.getElementById('selectSuperStat' + oldId);
	var swapNum = 0;
	var swapField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < PH.superStat.length; i++)
			{
				if (i != num && PH.superStat[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldSuperStat' + i);
				}
			}
		}
		PH.superStat[num] = HCData.superStat[id];
		if (id == 0)
		{
			Aesica.HCEngine.setNodeContents(field, getSuperStatDefault(num));
			clearOnmouseoverPopup(field);
		}
		else
		{
			Aesica.HCEngine.setNodeContents(field, getSuperStatDesc(id, num))
			setOnmouseoverPopupL2(field, Aesica.dataHarness.SuperStat.tip(HCData.superStat[id]));
			selectField.setAttribute('class', 'takenButton');
		}
		if (swapNum > 0)
		{
			PH.superStat[swapNum] = HCData.superStat[oldId];
			if (oldId != 0)
			{
				Aesica.HCEngine.setNodeContents(swapField, getSuperStatDesc(oldId, swapNum));
				setOnmouseoverPopupL2(swapField, Aesica.dataHarness.SuperStat.tip(HCData.superStat[oldId]));
			}
			else
			{
				Aesica.HCEngine.setNodeContents(swapField, getSuperStatDefault(swapNum));
				clearOnmouseoverPopup(swapField);
			}
		}
		else if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'button');
		}
			//submitAnalytics(app.system.anayltics.set, 'SuperStat', PH.superStat[num].name);
	}
	//setupInnateTalents();
	//setupTalents();
	setupSpecializations();
	selectClear();
}
window['setSuperStat'] = setSuperStat;

function getSuperStatDefault(num)
{
	var sReturn;
	if (num == 1)
	{
		sReturn = Aesica.HCEngine.getDescNode("blank", "Primary Super Stat");
	}
	else
	{
		sReturn = Aesica.HCEngine.getDescNode("blank", "Secondary Super Stat " + (num - 1));
	}
	return sReturn;
}
window['getSuperStatDefault'] = getSuperStatDefault;

function getSuperStatDesc(id, num)
{
	//return dataSuperStat[id].desc + ' <span class="spec">' + ((num == 1) ? '(Primary)' : '(Secondary)') + '</span>';
	return Aesica.HCEngine.getDescNode(Aesica.dataHarness.SuperStat.icon(HCData.superStat[id]), HCData.superStat[id].name + " <span class='spec'>" + ((num == 1) ? "(Primary)" : "(Secondary)") + "</span>");
}
window['getSuperStatDesc'] = getSuperStatDesc;

function highlightSuperStats(str)
{
	for (var i = 1; i < PH.superStat.length; i++)
	{
		if (PH.superStat[i].id > 0)
		{
			var regex = new RegExp('(' + Aesica.dataHarness.SuperStat.abbrev(PH.superStat[i]) + ': \\d+)');
			if (regex != null)
			{
				str = str.replace(regex, '<span class="specHighlight">$1</span>');
			}
		}
	}
	return str;
}
window['highlightSuperStats'] = highlightSuperStats;

// innate talent functions
function setupInnateTalents()
{
	Aesica.HCEngine.resetDialogBox(2);
	Aesica.HCEngine.setDialogBoxHeader("Innate Talents");

	var i;
	var iLength = HCData.innateTalent.length;
	var iColumn;
	// clear button
	var mCurrent = Aesica.HCEngine.createButton("Clear", "selectInnateTalent0", null, (function(){ setInnateTalent(0); }));
	Aesica.HCEngine.addItemToDialogBoxMenu(mCurrent);
	// innates
	for (i = 1; i < iLength; i++)
	{
		(function(i)
		{
			mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("Innate_Talent", HCData.innateTalent[i].name + ((Aesica.dataHarness.InnateTalent.extra(HCData.innateTalent[i]) != null) ? " <span class='selectSpec'>(" + highlightSuperStats(Aesica.dataHarness.InnateTalent.extra(dataInnateTalent[i])) + ")</span>" : "")), "selectInnateTalent" + i, null, (function(){ selectConfirmation((function(){ setInnateTalent(i); }), HCData.innateTalent[i].name, Aesica.dataHarness.InnateTalent.tip(HCData.innateTalent[i])); }));
		})(i);

		setOnmouseoverPopupL1(mCurrent, Aesica.dataHarness.InnateTalent.tip(HCData.innateTalent[i]));

		// 1st half in column 1, 2nd half in column 2
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		Aesica.HCEngine.addItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupInnateTalents'] = setupInnateTalents;

function selectInnateTalent(num)
{
	var fieldId = 'fieldInnateTalent' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId || field.className == "lockedButton")
	{
		selectClear();
	}
	else
	{
		selectClear();
		selectedNum = num;
		selectedFieldId = fieldId;
		selectedFieldClass = field.getAttribute('class');
		field.setAttribute('class', 'selectedButton');
		setupInnateTalents();
		showPositionSection('selectionWindow', true);
	}
}
window['selectInnateTalent'] = selectInnateTalent;

function setInnateTalent(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldInnateTalent' + num);
	var selectField = document.getElementById('selectInnateTalent' + id);
	var oldId = PH.innateTalent[num].id;
	var oldSelectField = document.getElementById('selectInnateTalent' + oldId);
	if (id != oldId)
	{
		PH.innateTalent[num] = HCData.innateTalent[id];
		if (id == 0)
		{
			Aesica.HCEngine.setNodeContents(field, getInnateTalentDefault(num));
			clearOnmouseoverPopup(field);
		}
		else
		{
			Aesica.HCEngine.setNodeContents(field, getInnateTalentDesc(id, num));
			setOnmouseoverPopupL2(field, Aesica.dataHarness.InnateTalent.tip(HCData.innateTalent[id]));
			selectField.setAttribute('class', 'takenButton');
		}
		if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'selectButton');
		}
			//submitAnalytics(app.system.anayltics.set, 'InnateTalent', PH.innateTalent[num].name);
	}
	selectClear();
}
window['setInnateTalent'] = setInnateTalent;

function getInnateTalentDefault(num)
{
	//return '<span><div class="Sprite blank"></div>&nbsp;Innate Talent</span>';
	return Aesica.HCEngine.getDescNode("blank", "Innate Talent");
}
window['getInnateTalentDefault'] = getInnateTalentDefault;

function getInnateTalentDesc(id, num)
{
	return Aesica.HCEngine.getDescNode("Innate_Talent", HCData.innateTalent[id].name + ((Aesica.dataHarness.InnateTalent.extra(HCData.innateTalent[id]) != null) ? " <span class='spec'>(" + Aesica.dataHarness.InnateTalent.extra(HCData.innateTalent[id]) + ")</span>" : ""));
}
window['getInnateTalentDesc'] = getInnateTalentDesc;

// talent functions
function setupTalents()
{
	Aesica.HCEngine.resetDialogBox(2);
	Aesica.HCEngine.setDialogBoxHeader("Talents");

	var i;
	var iColumn;
	var iLength = HCData.talent.length;
	var mCurrent = Aesica.HCEngine.createButton("Clear", "selectTalent0", null, (function(){ setTalent(0); }));
	Aesica.HCEngine.addItemToDialogBoxMenu(mCurrent);

	for (i = 1; i < iLength; i++)
	{
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		(function(i)
		{
			mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("Talent", HCData.talent[i].name + ((Aesica.dataHarness.Talent.extra(HCData.talent[i]) != null) ? " <span class='selectSpec'>(" + highlightSuperStats(Aesica.dataHarness.Talent.extra(HCData.talent[i])) + ")</span>" : "")), "selectTalent" + i, null, (function(){ selectConfirmation((function(){ setTalent(i); }), HCData.talent[i].name, Aesica.dataHarness.Talent.extra(HCData.talent[i])); }));
		})(i)

		mCurrent.setAttribute("style", "display: block;");
		setOnmouseoverPopupL1(mCurrent, "<b>" + HCData.talent[i].name + "</b><br /><br />" + Aesica.dataHarness.Talent.extra(HCData.talent[i]));
		Aesica.HCEngine.addItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupTalents'] = setupTalents;

function selectTalent(num)
{
	var fieldId = 'fieldTalent' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId || field.className == "lockedButton")
	{
		selectClear();
	}
	else
	{
		selectClear();
		selectedNum = num;
		selectedFieldId = fieldId;
		selectedFieldClass = field.getAttribute('class');
		field.setAttribute('class', 'selectedButton');
		setupTalents()
		showPositionSection('selectionWindow', true);
	}
}
window['selectTalent'] = selectTalent;

function setTalent(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldTalent' + num);
	var selectField = document.getElementById('selectTalent' + id);
	var oldId = PH.talent[num].id;
	var oldSelectField = document.getElementById('selectTalent' + oldId);
	var swapNum = 0;
	var swapField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < PH.talent.length; i++)
			{
				if (i != num && PH.talent[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldTalent' + i);
				}
			}
		}
		PH.talent[num] = HCData.talent[id];
		if (id == 0)
		{
			Aesica.HCEngine.setNodeContents(field, getTalentDefault(num));
			clearOnmouseoverPopup(field);
		}
		else
		{
			Aesica.HCEngine.setNodeContents(field, getTalentDesc(id));
			setOnmouseoverPopupL2(field, Aesica.dataHarness.Talent.tip(HCData.talent[id]));
			selectField.setAttribute('class', 'takenButton');
		}
		if (swapNum > 0)
		{
			PH.talent[swapNum] = HCData.talent[oldId];
			if (oldId != 0)
			{
				Aesica.HCEngine.setNodeContents(swapField, getTalentDesc(oldId));
				setOnmouseoverPopupL2(swapField, Aesica.dataHarness.Talent.tip(HCData.talent[oldId]));
			}
			else
			{
				Aesica.HCEngine.setNodeContents(swapField, getTalentDefault(swapNum));
				clearOnmouseoverPopup(swapField);
			}
		}
		else if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'button');
		}
			//submitAnalytics(app.system.anayltics.set, 'Talent', PH.talent[num].name);
	}
	selectClear();
}
window['setTalent'] = setTalent;

function getTalentDefault(num)
{
	return Aesica.HCEngine.getDescNode("blank", "Talent " + num);
}
window['getTalentDefault'] = getTalentDefault;

function getTalentDesc(id)
{
	return Aesica.HCEngine.getDescNode("Talent", HCData.talent[id].name + ((Aesica.dataHarness.Talent.extra(HCData.talent[id]) != null) ? " <span class='spec'>(" + Aesica.dataHarness.Talent.extra(HCData.talent[id]) + ")</span>" : ""));
}
window['getTalentDesc'] = getTalentDesc;

// travel power functions
function setupTravelPowers(currentType=0)
{
	Aesica.HCEngine.resetDialogBox(app.system.columnCount.travelPower);
	Aesica.HCEngine.setDialogBoxHeader("Travel Powers");
	var i;
	var iColumn;
	var iLength
	var mCurrent = Aesica.HCEngine.createButton(app.system.buttonText.clear, "selectTravelPower0", null, (function(){ setTravelPower(0) }));
	Aesica.HCEngine.addItemToDialogBoxMenu(mCurrent);
	var aTravelPowerList = [];
	iLength = HCData.travelPowerType.length;
	for (i = 1; i < iLength; i++)
	{
		mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(HCData.travelPowerType[i].icon, "", false, true));
		(function(i)
		{
			mCurrent.addEventListener("click", (function(){ setupTravelPowers(i); updatePositionSection("selectionWindow"); }));
		})(i);
		if (i == currentType) mCurrent.className = "frameworkSelected";
		else mCurrent.className = "frameworkUnselected";
		setOnmouseoverPopupL2(mCurrent, HCData.travelPowerType[i].name);
		Aesica.HCEngine.addItemToDialogBox(mCurrent);
	}
	Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
	iLength = dataTravelPower.length;
	for (i = 1; i < iLength; i++)
	{
		if (dataTravelPower[i].type == currentType) aTravelPowerList.push(dataTravelPower[i]);
	}
	iLength = aTravelPowerList.length;
	if (iLength > 0) Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
	for (i = 0; i < iLength; i++)
	{
		iColumn = Math.floor((i) / (iLength / app.system.columnCount.travelPower));
		(function(i)
		{
			mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(aTravelPowerList[i].icon, aTravelPowerList[i].name), "selectTravelPower" + aTravelPowerList[i].id, null, (function(){ selectConfirmation((function(){ setTravelPower(aTravelPowerList[i].id); }), dataTravelPower[i].name, dataTravelPower[i].tip); }));
		})(i);
		mCurrent.setAttribute("style", "display: block;");
		setOnmouseoverPopupL1(mCurrent, aTravelPowerList[i].tip);
		Aesica.HCEngine.addItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupTravelPowers'] = setupTravelPowers;

function selectTravelPower(num)
{
	var fieldId = 'fieldTravelPower' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId || field.className == "lockedButton")
	{
		selectClear();
	}
	else
	{
		selectClear();
		selectedNum = num;
		selectedFieldId = fieldId;
		selectedFieldClass = field.getAttribute('class');
		field.setAttribute('class', 'selectedButton');
		setupTravelPowers(PH.travelPower[num].type);
		showPositionSection('selectionWindow', true);
	}
}
window['selectTravelPower'] = selectTravelPower;

function setTravelPower(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldTravelPower' + num);
	var advantageField = document.getElementById('fieldTravelPowerAdvantage' + num);
	var selectField = document.getElementById('selectTravelPower' + id);
	var oldId = PH.travelPower[num].id;
	var oldAdvantage = PH.travelPowerAdvantage[num];
	var oldSelectField = document.getElementById('selectTravelPower' + oldId);
	var swapNum = 0;
	var swapField;
	var swapAdvantageField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < PH.travelPower.length; i++)
			{
				if (i != num && PH.travelPower[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldTravelPower' + i);
					swapAdvantageField = document.getElementById('fieldTravelPowerAdvantage' + i);
				}
			}
		}
		if (swapNum > 0)
		{
			PH.travelPower[num] = PH.travelPower[swapNum];
			PH.travelPowerAdvantage[num] = PH.travelPowerAdvantage[swapNum];
			Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataTravelPower[id].icon, dataTravelPower[id].name, false, true));
			setOnmouseoverPopupL2(field, dataTravelPower[id].tip);
			advantageField.style.display = '';
			setAdvantage(2, num, PH.travelPowerAdvantage[num]);
			PH.travelPower[swapNum] = dataTravelPower[oldId];
			PH.travelPowerAdvantage[swapNum] = oldAdvantage;
			if (oldId != 0)
			{
				Aesica.HCEngine.setNodeContents(swapField, Aesica.HCEngine.getDescNode(dataTravelPower[oldId].icon, dataTravelPower[oldId].name, false, true));
				setOnmouseoverPopupL2(swapField, dataTravelPower[oldId].tip);
				setAdvantage(2, swapNum, PH.travelPowerAdvantage[swapNum]);
			}
			else
			{
				Aesica.HCEngine.setNodeContents(swapField, getTravelPowerDefault(swapNum));
				clearOnmouseoverPopup(swapField);
				swapAdvantageField.style.display = 'none';
				setAdvantage(2, swapNum, 0);
			}
		}
		else
		{
			if (PH.travelPower[num].id != 0)
			{
				setAdvantage(2, num, 0);
			}
			PH.travelPower[num] = dataTravelPower[id];
			PH.travelPowerAdvantage[num] = 0;
			if (id == 0)
			{
				Aesica.HCEngine.setNodeContents(field, getTravelPowerDefault(num));
				clearOnmouseoverPopup(field);
				advantageField.style.display = 'none';
			}
			else
			{
				Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataTravelPower[id].icon, dataTravelPower[id].name, false, true));
				setOnmouseoverPopupL2(field, dataTravelPower[id].tip);
				advantageField.innerHTML = advantageTextSpan(2, num, 0);
				advantageField.style.display = '';
				if (selectField)
				{
					selectField.setAttribute('class', 'takenButton');
					if (oldId != 0)
					{
						oldSelectField.setAttribute('class', 'button');
					}
				}
			}
			if (oldId != 0)
			{
				oldSelectField.setAttribute('class', 'button');
			}
		}
			//submitAnalytics(app.system.anayltics.set, 'TravelPower', PH.travelPower[num].name);
	}
	selectClear();
}
window['setTravelPower'] = setTravelPower;

function getTravelPowerDefault(num)
{
	return Aesica.HCEngine.getDescNode("blank", "Travel Power " + num, false, true);
}
window['getTravelPowerDefault'] = getTravelPowerDefault;

// power functions
function setupFrameworks()
{
	var mContainer = document.getElementById("frameworkSelectionContainer");
	var i;
	var iLength = dataFramework.length;
	var mNode;
	var iNextLineID = Math.floor(iLength / 2);
	var iGroup = -1;
	var mPowersetGroup;
	var mButtonlabel;
	for (i = 1; i < iLength; i++)
	{
		if (iGroup < dataFramework[i].powerset)
		{
			mPowersetGroup = document.createElement("div");
			mPowersetGroup.setAttribute("class", "frameworkSelectionGroup");
			mContainer.appendChild(mPowersetGroup);
			iGroup++;
		}

		(function(i)
		{
			mNode = Aesica.HCEngine.createButton("", "selectFramework" + i, "", (function(){ selectFramework(i); }));
			mButtonlabel = Aesica.HCEngine.getDescNode(dataFramework[i].icon, "");
			mNode.appendChild(mButtonlabel);
			mPowersetGroup.appendChild(mNode);
			setOnmouseoverPopupL1(mNode, dataFramework[i].tip);
		})(i);
		
		// reduce brightness for nonselected frameworks
		if (dataFramework[i].id != prevSelectedFramework) mNode.setAttribute("class", "frameworkUnselected");
		else mNode.setAttribute("class", "frameworkSelected");
		// newline for second row
		if (i == iNextLineID) mContainer.appendChild(document.createElement("br"));
	}
}
window['setupFrameworks'] = setupFrameworks;

function selectFramework(framework)
{
	Aesica.HCEngine.resetDialogBox(app.system.columnCount.power);
	var sHeader = "Select Framework";

	if (framework > 0 && framework < dataFramework.length) sHeader = "Framework > " + dataPowerSet[dataFramework[framework].powerset].name + " > " + dataFramework[framework].name;

	Aesica.HCEngine.setDialogBoxHeader(sHeader);

	var aFrameworkPowers = dataPowerIdFromFramework[framework];
	var i;
	var iLength = aFrameworkPowers.length;
	var iColumn;
	// framework selection container
	var mFrameworkContainer = document.createElement("div");
	mFrameworkContainer.setAttribute("id", "frameworkSelectionContainer");
	Aesica.HCEngine.addItemToDialogBox(mFrameworkContainer);
	// clear button
	var mClear = Aesica.HCEngine.createButton(app.system.buttonText.clear, "selectPower0", "", (function(){ setPower(0); }));
	Aesica.HCEngine.addItemToDialogBoxMenu(mClear);
	// insert button
	var mInsert = Aesica.HCEngine.createButton(app.system.buttonText.insert, "selectPowerInsert", "", (function(){ selectPowerInsert(selectedNum); }));
	mInsert.setAttribute("style", "margin-left: 1.5rem; margin-right: 1.5rem;");
	Aesica.HCEngine.addItemToDialogBoxMenu(mInsert);
	// delete button
	var mDelete = Aesica.HCEngine.createButton(app.system.buttonText.delete, "selectPowerDelete", "", (function(){ selectPowerDelete(selectedNum); }));
	Aesica.HCEngine.addItemToDialogBoxMenu(mDelete);
	// framework powers
	var mNode;
	var iPowerID;
	var oPower;
	var iColumn;
	var iColumnSize = Math.ceil(iLength / app.system.columnCount.power);
	for (i = 0; i < iLength && framework > 0; i++)
	{
		iPowerID = aFrameworkPowers[i];
		oPower = dataPower[iPowerID];
		mNode = document.createElement("a");
		mNode.setAttribute("id", "selectPower" + iPowerID);

		switch (selectPowerAllowed(selectedNum, iPowerID))
		{
		case 0:
			mNode.setAttribute("class", "disabledButton");
			break;
		case 1:
			(function(iPowerID){ mNode.addEventListener("click", function(){ selectConfirmation((function(){ setPower(iPowerID); }), dataPower[iPowerID].desc, dataPower[iPowerID].tip);})}(iPowerID));
			mNode.setAttribute("class", "button");
			break;
		case 2:
			(function(iPowerID){ mNode.addEventListener("click", function(){ selectConfirmation((function(){ setPower(iPowerID); }), dataPower[iPowerID].desc, dataPower[iPowerID].tip);})}(iPowerID));mNode.setAttribute("class", "takenButton");
			break;
		}
		Aesica.HCEngine.setNodeContents(mNode, Aesica.HCEngine.getDescNode(dataPower[iPowerID].icon, dataPower[iPowerID].name));
		setOnmouseoverPopupL1(mNode, dataPower[iPowerID].tip);
		// add to dialog box
		iColumn = Math.floor(i / iColumnSize);
		Aesica.HCEngine.addItemToDialogBox(mNode, iColumn);
	}

	prevSelectedFramework = framework;
	setupFrameworks();
	updatePositionSection("selectionWindow");
	popout();
}
window['selectFramework'] = selectFramework;

function selectPower(num)
{
	var fieldId = "fieldPower" + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId || field.className == "lockedButton")
	{
		selectClear();
	}
	else if (PH.archetype.id > 1)
	{
		selectArchetypePower(num);
	}
	else
	{
		selectClear();
		selectedNum = num;
		selectedFieldId = fieldId;
		selectedFieldClass = field.className;
		field.className = "selectedButton";
		if (PH.power[num].id != 0)
		{
			selectFramework(PH.power[num].framework);
		}
		else if (prevSelectedFramework != 0)
		{
			selectFramework(prevSelectedFramework);
		}
		else
		{
			selectFramework(0);
		}
		showPositionSection("selectionWindow", false);
	}
}
window['selectPower'] = selectPower;

function setPower(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldPower' + num);
	var advantageField = document.getElementById('fieldPowerAdvantage' + num);
	var oldId = PH.power[num].id;
	var oldAdvantage = PH.powerAdvantage[num];
	var swapNum = 0;
	var swapField;
	var swapAdvantageField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < PH.power.length; i++)
			{
				if (i != num && PH.power[i].name == dataPower[id].name)
				{
					swapNum = i;
					swapField = document.getElementById('fieldPower' + i);
					swapAdvantageField = document.getElementById('fieldPowerAdvantage' + i);
				}
			}
		}
		if (swapNum > 0)
		{
			PH.power[num] = PH.power[swapNum];
			PH.powerAdvantage[num] = PH.powerAdvantage[swapNum];
			Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataPower[id].icon, dataPower[id].name, false, true));
			setOnmouseoverPopupL2(field, dataPower[id].tip);
			advantageField.style.display = '';
			setAdvantage(1, num, PH.powerAdvantage[num]);
			PH.power[swapNum] = dataPower[oldId];
			PH.powerAdvantage[swapNum] = oldAdvantage;
			if (oldId != 0)
			{
				Aesica.HCEngine.setNodeContents(swapField, Aesica.HCEngine.getDescNode(dataPower[oldId].icon, dataPower[oldId].name, false, true));
				setOnmouseoverPopupL2(swapField, dataPower[oldId].tip);
				swapAdvantageField.style.display = '';
				setAdvantage(1, swapNum, PH.powerAdvantage[swapNum]);
			}
			else
			{
				Aesica.HCEngine.setNodeContents(swapField, getPowerDefault(swapNum));
				clearOnmouseoverPopup(swapField);
				swapAdvantageField.style.display = 'none';
				setAdvantage(1, swapNum, 0);
			}
		}
		else
		{
			if (PH.power[num].id != 0)
			{
				setAdvantage(1, num, 0);
			}
			PH.power[num] = dataPower[id];
			PH.powerAdvantage[num] = 0;
			if (id == 0)
			{
				Aesica.HCEngine.setNodeContents(field, getPowerDefault(num));
				clearOnmouseoverPopup(field);
				advantageField.style.display = 'none';
			}
			else
			{
				Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataPower[id].icon, dataPower[id].name, false, true));
				setOnmouseoverPopupL2(field, dataPower[id].tip);
				advantageField.innerHTML = advantageTextSpan(1, num, 0);
				advantageField.style.display = '';
			}
		}
			//submitAnalytics(app.system.anayltics.set, 'Power', PH.power[num].name);
	}
	selectClear();
	validatePowers();
}
window['setPower'] = setPower;

function getPowerDefault(num)
{
	return Aesica.HCEngine.getDescNode("blank", "Power " + num, false, true);
}
window['getPowerDefault'] = getPowerDefault;

function selectPowerAllowed(num, id)
{
	// returns: 0=no, 1=yes, 2=taken
	var result = 0;
	var power = dataPower[id];
	var oldTier = (num > 0) ? PH.power[num].tier : -1;
	var powerCount = 0;
	var powerSetCount = 0;
	var frameworkCount = 0;
	var groupCount = 0;
	var otherCount = 0;
	var energyBuilderId = 0;
	var energyUnlockId = 0;
	var tier4Id = 0;
	for (var i = 1; i < PH.power.length; i++)
	{
		var p = PH.power[i];
		// some framework powers act like they belong to a specific power set for the purposes of calculating counts
		if (dataReplacePower[p.id] != undefined) p = dataPower[dataReplacePower[p.id]];
		if (i < num)
		{
			if (p.tier == -1)
			{
				// eb counts for framework, but not powerSet or otherCount
				if (p.framework == power.framework) frameworkCount++;
					// } else if (p.tier != 4) {
					//     // tier 4 does not count for powerSet or framework
			}
			else
			{
				if (p.powerSet == power.powerSet) powerSetCount++;
				if (p.framework == power.framework) frameworkCount++;
				otherCount++;
			}
			if (p.tier != 4)
			{
				// all powers except for tier 4's count for power group
				if (dataRequireGroupPower[power.id] != undefined)
				{
					var group = dataRequireGroupPower[power.id];
					for (var j = 0; j < dataRequireGroup[group].length; j++)
					{
						if (p.framework == dataRequireGroup[group][j]) groupCount++;
					}
				}
			}
			powerCount++;
		}
		// power types you may only have one of
		if (p.tier == -1) energyBuilderId = p.id;
		if (p.tier == 4) tier4Id = p.id;
		if (dataEnergyUnlockPower[p.id] != undefined) energyUnlockId = p.id;
	}
	switch (power.tier)
	{
	case -1:
		if (energyBuilderId == 0) result = 1;
		else if (oldTier == -1) result = 2;
		break;
	case 0:
		result = 1;
		break;
	case 1:
		if (frameworkCount >= 1 || groupCount >= 1 || otherCount >= 2) result = 1;
		break;
	case 2:
		//if (frameworkCount >= 3 || groupCount >= 3 || otherCount >= 5) result = 1;
		if (frameworkCount >= 3 || groupCount >= 3 || otherCount >= 4) result = 1;
		break;
	case 3:
		//if (frameworkCount >= 5 || groupCount >= 5 || otherCount >= 8) result = 1;
		if (frameworkCount >= 5 || groupCount >= 5 || otherCount >= 6) result = 1;
		break;
	case 4:
		//if (powerSetCount >= 10) result = 1;
		//if (powerCount >= 12 && tier4Id == 0) result = 1;
		//if (PH.archetype > 1 || num >= 13) { }
		if (tier4Id == 0) result = 1;
		else if (oldTier == 4) result = 2;
		break;
	}
	if (result > 0 && energyUnlockId != 0 && dataEnergyUnlockPower[id] != undefined)
	{
		if (dataEnergyUnlockPower[PH.power[num].id] != undefined) result = 2;
		else result = 0;
	}
	for (var i = 1; i < PH.power.length; i++)
	{
		if (PH.power[i].name == power.name && (num != i || result == 1)) result = 2;
	}
	return result;
}
window['selectPowerAllowed'] = selectPowerAllowed;

function validatePower(num, id)
{
	var field = document.getElementById('fieldPower' + num);
	if (id == 0 || selectPowerAllowed(num, id) > 0)
	{
		field.setAttribute('class', 'button');
	}
	else
	{
		field.setAttribute('class', 'disabledButton');
	}
}
window['validatePower'] = validatePower;

function validatePowers()
{
	for (var i = 1; i < PH.power.length; i++)
	{
		validatePower(i, PH.power[i].id);
	}
}
window['validatePowers'] = validatePowers;

function selectPowerInsert(num)
{
	for (var i = PH.power.length - 1; i > num; i--)
	{
		movePower(i - 1, i);
	}
	selectedNum = num;
	setPower(0);
	selectClear();
	validatePowers();
}
window['selectPowerInsert'] = selectPowerInsert;

function selectPowerDelete(num)
{
	for (var i = num + 1; i < PH.power.length; i++)
	{
		movePower(i, i - 1);
	}
	selectedNum = PH.power.length - 1;
	setPower(0);
	selectClear();
	validatePowers();
}
window['selectPowerDelete'] = selectPowerDelete;

function movePower(fromNum, toNum)
{
	var power = PH.power[fromNum];
	var mask = PH.powerAdvantage[fromNum];
	selectedNum = toNum;
	setPower(power.id);
	setAdvantage(1, toNum, mask);
}
window['movePower'] = movePower;

// role selection functions
function selectRole()
{
	var fieldId = "fieldRole";
	var field = document.getElementById(fieldId);
	if (field.className != "lockedButton")
	{
		selectClear();
		selectedFieldId = fieldId;
		selectedFieldClass = field.className;
		field.className = "selectedButton";
		setupRoles();
		showPositionSection("selectionWindow", true);
	};
}

function setupRoles()
{
	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Roles");
	var i, iLength = HCData.archetypeGroup.length;
	var mRole;
	for (i = 1; i < iLength; i++)
	{
		mRole = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(HCData.archetypeGroup[i].icon, HCData.archetypeGroup[i].name), null, "button", setRole);
		mRole.setAttribute("roleID", i);
		Aesica.HCEngine.addItemToDialogBox(mRole);
		setOnmouseoverPopupL1(mRole, Aesica.dataHarness.ArchetypeGroup.tip(HCData.archetypeGroup[i]));
	}
}

function setRole(e)
{
	var iRole = parseInt((e instanceof MouseEvent) ? e.currentTarget.getAttribute("roleID") : e);
	var field = document.getElementById("fieldRole");
	PH.role = HCData.archetypeGroup[iRole];
	Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(HCData.archetypeGroup[iRole].icon, HCData.archetypeGroup[iRole].name));
	setOnmouseoverPopupL1(field, Aesica.dataHarness.ArchetypeGroup.tip(HCData.archetypeGroup[iRole]));
	selectClear();
}

// device functions
function selectDevice(e)
{
	var mField = e.currentTarget;
	if (mField.className != "lockedButton")
	{
		selectClear();
		selectedNum = parseInt(mField.getAttribute("deviceSlot"));
		selectedFieldId = mField.id;
		selectedFieldClass = mField.className;
		mField.className = "selectedButton";
		setupDevice(PH.device[selectedNum].type);
		showPositionSection("selectionWindow", true);
	}
}

function setupDevice(currentCategory=0)
{
	Aesica.HCEngine.resetDialogBox(3);
	Aesica.HCEngine.setDialogBoxHeader("Devices" + (currentCategory > 0 ? " > " + HCData.deviceType[currentCategory].name : ""));
	var aDeviceList = [];
	var i, iLength;
	var mCategorySelector;
	var mCategoryGroup = document.createElement("div");
	mCategoryGroup.className = "frameworkSelectionGroup";
	iLength = HCData.deviceType.length;
	for (i = 1; i < iLength; i++)
	{
		mCategorySelector = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(HCData.deviceType[i].icon, "", false, true));
		(function(i)
		{
			mCategorySelector.addEventListener("click", (function(){ setupDevice(i); updatePositionSection("selectionWindow"); }));
		})(i);
		if (i == currentCategory) mCategorySelector.className = "frameworkSelected";
		else mCategorySelector.className = "frameworkUnselected";
		setOnmouseoverPopupL2(mCategorySelector, "<b>" + HCData.deviceType[i].name + "</b><br /><br />" + HCData.deviceType[i].tip);
		mCategoryGroup.appendChild(mCategorySelector);
	}
	Aesica.HCEngine.addItemToDialogBox(mCategoryGroup);
	Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
	var mClear = Aesica.HCEngine.createButton(app.system.buttonText.clear, null, "button", setDevice);
	mClear.setAttribute("deviceID", 0);
	Aesica.HCEngine.addItemToDialogBoxMenu(mClear);
	var mDevice, oDevice;
	iLength = HCData.device.length;
	for (i = 1; i < iLength; i++)
	{
		oDevice = HCData.device[i];
		if (oDevice.type == currentCategory) aDeviceList.push(oDevice);
	}
	iLength = aDeviceList.length
	if (iLength > 0) Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
	var iColumn;
	for (i = 0; i < iLength; i++)
	{
		iColumn = Math.floor(i / (iLength / 3));
		mDevice = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(aDeviceList[i].icon, aDeviceList[i].name), null, "button " + HCData.rarity[aDeviceList[i].rarity].className, setDevice);
		mDevice.setAttribute("deviceID", aDeviceList[i].id);
		setOnmouseoverPopupL1(mDevice, Aesica.dataHarness.Device.tip(aDeviceList[i]));
		if (!aDeviceList[i].hidden) Aesica.HCEngine.addItemToDialogBox(mDevice, iColumn);
	}
}

// e = MouseEvent or field ID.  If MouseEvent, iDeviceID is not required because this information should be in the calling
// button's "deviceID" attribute.
function setDevice(e, iDeviceID=null)
{
	if (e instanceof MouseEvent) iDeviceID = parseInt(e.currentTarget.getAttribute("deviceID"));
	else
	{
		selectedNum = e;
		selectedFieldId = "fieldDevice" + e;
	}
	if (isNaN(iDeviceID)) iDeviceID = 0;
	var oDevice = HCData.device[iDeviceID];
	var mDevice = document.getElementById(selectedFieldId);
	var mDevicePowers = document.getElementById(selectedFieldId + "Powers");
	PH.device[selectedNum] = HCData.device[iDeviceID];
	if (iDeviceID > 0)
	{
		Aesica.HCEngine.setNodeContents(mDevice, Aesica.HCEngine.getDescNode(oDevice.icon, oDevice.name, false, true));
		mDevice.className = "button " + HCData.rarity[oDevice.rarity].className;
		setOnmouseoverPopupL1(mDevice, Aesica.dataHarness.Device.tip(oDevice));
		if (Array.isArray(oDevice.powers)) mDevicePowers.style.display = "inline-block";
		else mDevicePowers.style.display = "none";
	}
	else
	{
		Aesica.HCEngine.setNodeContents(mDevice, Aesica.HCEngine.getDescNode("blank", "Device " + selectedNum, false, true));
		mDevice.className = "button";
		setOnmouseoverPopupL1(mDevice, null);
		mDevicePowers.style.display = "none";
	}
	selectedFieldId = null;
	selectClear();
}

function selectDevicePowerPreview(e)
{
	var oDevice = PH.device[e.currentTarget.getAttribute("deviceSlot")];
	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader(oDevice.name + " > Power List");
	var i, mPower, iLength = oDevice.powers.length;
	var oCurrent;
	for (i = 0; i < iLength; i++)
	{
		mPower = document.createElement("a");
		mPower.className = "button";
		if (oDevice.powers[i].powerRef)
		{
			oCurrent = dataPower[HCLookup.power[oDevice.powers[i].powerRef]];
			mPower.appendChild(Aesica.HCEngine.getDescNode(oCurrent.icon, oCurrent.name));
			setOnmouseoverPopupL2(mPower, oCurrent.tip);
		}
		else if (oDevice.powers[i].travelPowerRef)
		{
			oCurrent = dataTravelPower[HCLookup.travelPower[oDevice.powers[i].travelPowerRef]];
			mPower.appendChild(Aesica.HCEngine.getDescNode(oCurrent.icon, oCurrent.name));
			setOnmouseoverPopupL2(mPower, oCurrent.tip);
		}
		else
		{
			mPower.appendChild(Aesica.HCEngine.getDescNode(oDevice.powers[i].icon, oDevice.powers[i].name));
			//setOnmouseoverPopupL2(mPower, "<b>" + oDevice.powers[i].name + "</b><br /><br />" + oDevice.powers[i].toolTip);
			setOnmouseoverPopupL2(mPower, Aesica.dataHarness.Device.powerTip(oDevice.powers[i]));
		}
		Aesica.HCEngine.addItemToDialogBox(mPower);
	}
	showPositionSection("selectionWindow", true);
}

// build note edit functions
function selectBuildNote()
{
	var txtEditor = document.createElement("textarea");
	var mSave = Aesica.HCEngine.createButton("Save", null, "button", setBuildNote);
	var mCancel = Aesica.HCEngine.createButton("Cancel", null, "button", selectClear);
	var lblCount = document.createElement("div");
	var lblCounter = document.createElement("span");
	lblCounter.id = "buildNoteCharCounter";
	lblCounter.innerHTML = PH.buildNote.length;
	lblCount.id = "buildNoteCharCount";
	lblCount.className = "note";
	lblCount.innerHTML = "Character count: " + lblCounter.outerHTML + "/" + app.system.noteLimit;
	txtEditor.id = "buildNoteEditor";
	txtEditor.addEventListener("input", updateBuildNoteCharCount);
	txtEditor.value = PH.buildNote;
	mCancel.style = "margin-right: 1.5rem;";

	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Additional Notes");

	Aesica.HCEngine.addItemToDialogBox(txtEditor);
	Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
	Aesica.HCEngine.addItemToDialogBox(lblCount);
	Aesica.HCEngine.addItemToDialogBox(mCancel);
	Aesica.HCEngine.addItemToDialogBox(mSave);
	showPositionSection("selectionWindow", true);
	txtEditor.focus();
}

function updateBuildNoteCharCount()
{
	var mCharCount = document.getElementById("buildNoteCharCounter");
	var iCount = document.getElementById("buildNoteEditor").value.length;
	mCharCount.innerHTML = document.getElementById("buildNoteEditor").value.length;
	if (iCount > app.system.noteLimit) mCharCount.className = "redText";
	else mCharCount.className = "";
}

function setBuildNote()
{
	var sNote = document.getElementById("buildNoteEditor").value;
	var iNoteLength = sNote.length;
	if (iNoteLength > app.system.noteLimit) sNote = sNote.substr(0, app.system.noteLimit);
	PH.buildNote = sNote;
	updateBuildNote(sNote);
	selectClear();
}

function updateBuildNote(sNote)
{
	var rxLt = /\</g;
	var rxGt = /\>/g;
	var rxAmp = /\&/g;
	document.getElementById("buildNote").innerHTML = sNote.replace(rxAmp, "&amp;").replace(rxLt, "&lt;").replace(rxGt, "&gt;");
}

// archetype power functions
function selectArchetypePower(iPowerNumber)
{
	var sFieldID = "fieldPower" + iPowerNumber;
	var mField = document.getElementById(sFieldID);
	var mText;
	var mOption, i, iLength, iCurrentPowerID, oPower, aPowerList, mLabel;
	if (selectedFieldId == sFieldID)
	{
		selectClear();
	}
	else
	{
		selectClear();
		selectedNum = iPowerNumber;
		selectedFieldId = sFieldID;
		selectedFieldClass = mField.className;
		mField.className = "selectedButton";

		Aesica.HCEngine.resetDialogBox();
		Aesica.HCEngine.setDialogBoxHeader(PH.power[iPowerNumber].name);
		mText = document.createElement("span");
		mText.innerHTML = "Replace with...";
		Aesica.HCEngine.addItemToDialogBoxMenu(mText);
		aPowerList = PH.archetype.powerList[iPowerNumber - 1];
		if (!Array.isArray(aPowerList)) aPowerList = [aPowerList];
		iLength = (aPowerList[0]) ? aPowerList.length : 0;
		for (i = 0; i < iLength; i++)
		{
			iCurrentPowerID = HCLookup.power[aPowerList[i]];
			oPower = dataPower[iCurrentPowerID];

			if (oPower != PH.power[iPowerNumber])
			{
				mOption = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(oPower.icon, oPower.name, false, true), "selectPower" + iCurrentPowerID);
				//mOption.setAttribute("onclick", "selectConfirmation('setArchetypePower(" + iCurrentPowerID + ")', '" + escapeQuotes(dataPower[iCurrentPowerID].desc) + "', '" + dataPower[iCurrentPowerID].tip + "')");
				(function(iCurrentPowerID){ mOption.addEventListener("click", function(){ selectConfirmation((function(){  setArchetypePower(iCurrentPowerID); }), dataPower[iCurrentPowerID].desc, dataPower[iCurrentPowerID].tip); }) }(iCurrentPowerID));
				mOption.className = "button";
				setOnmouseoverPopupL1(mOption, oPower.tip);
				Aesica.HCEngine.addItemToDialogBox(mOption);
				Aesica.HCEngine.addItemToDialogBox(document.createElement("br"));
			}
			else
			{
				//mOption.setAttribute("class", "disabledButton");
			}
		}
		showPositionSection("selectionWindow", true);
	}
}
window['selectArchetypePower'] = selectArchetypePower;

function setArchetypePower(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldPower' + num);
	var advantageField = document.getElementById('fieldPowerAdvantage' + num);
	var oldId = PH.power[num].id;
	if (id != oldId)
	{
		setAdvantage(1, num, 0);
		PH.power[num] = dataPower[id];
		PH.powerAdvantage[num] = 0;
		Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataPower[id].icon, dataPower[id].name, false, true));
		advantageField.innerHTML = advantageTextSpan(1, num, 0);
		setOnmouseoverPopupL2(advantageField, advantageTip(1, num, 0));
		setOnmouseoverPopupL2(field, dataPower[id].tip);
		advantageField.style.display = '';
		//submitAnalytics(app.system.anayltics.set, 'ArchetypePower', PH.power[num].name);
	}
	selectClear();
}
window['setArchetypePower'] = setArchetypePower;

// power advantage functions
function checkAdvantageDependancyId(type, num, id)
{
	var result = true;
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var mask = (type == 1) ? PH.powerAdvantage[num] : PH.travelPowerAdvantage[num];
	var dependency = power.advantageList[id].dependency;
	if (dependency != null && !power.hasAdvantage(mask, dependency)) result = false;
	return result;
}
window['checkAdvantageDependancyId'] = checkAdvantageDependancyId;

function checkAdvantageDependancyMask(type, num, mask)
{
	var result = true;
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var advantageList = (type == 1) ? PH.power[num].advantageList : PH.travelPower[num].advantageList;
	for (var i = 1; i < advantageList.length; i++)
	{
		var advantage = advantageList[i];
		if (advantage.dependency != null && power.hasAdvantage(mask, advantage.id) && !power.hasAdvantage(mask, advantage.dependency)) result = false;
	}
	return result;
}
window['checkAdvantageDependancyMask'] = checkAdvantageDependancyMask;

function selectTravelPowerAdvantage(num)
{
	selectAdvantage(2, num);
}
window['selectTravelPowerAdvantage'] = selectTravelPowerAdvantage;

function selectPowerAdvantage(num)
{
	selectAdvantage(1, num);
}
window['selectPowerAdvantage'] = selectPowerAdvantage;

function updateAdvantageDisplay(iType, iPowerID, bUpdateAdvantageText=true)
{
	var mTable = document.getElementById("advantageTable");
	var oPower = (iType == 1) ? PH.power[iPowerID] : PH.travelPower[iPowerID];
	var iMask = (iType == 1) ? PH.powerAdvantage[iPowerID] : PH.travelPowerAdvantage[iPowerID];
	var iPoints = oPower.getPoints(iMask);
	var aAdvantageList = oPower.advantageList;
	var iLength = aAdvantageList.length;
	var i, mCheckmark, mAdvantage, mPoints, mRow;
	mTable.innerHTML = "";
	for (i = 1; i < iLength; i++)
	{
		oAdvantage = aAdvantageList[i];
		mCheckmark = document.createElement("div");
		mCheckmark.innerHTML = "✓";
		mPoints = document.createElement("div");
		mPoints.innerHTML = oAdvantage.points;
		mPoints.className = "note";
		(function(i)
		{
			mAdvantage = Aesica.HCEngine.createButton(oAdvantage.name, null, null, (function(){ selectAdvantageToggle(iType, iPowerID, i); }));
		})(i);
		mRow = Aesica.HCEngine.createTableRow(mCheckmark, mAdvantage, mPoints);
		mRow.className = (iMask > 0 && oPower.hasAdvantage(iMask, i)) ? "advantageRowSelected" : "advantageRow";
		mAdvantage.className = (mRow.className == "advantageRowSelected" || (statAdvantagePoints + oAdvantage.points <= maxAdvantagePointsTotal && iPoints + oAdvantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(iType, iPowerID, oAdvantage.id))) ? "button" : "disabledButton";
		setOnmouseoverPopupL1(mAdvantage, oAdvantage.tip);
		if (mTable) mTable.appendChild(mRow);
	}
	if (bUpdateAdvantageText) document.getElementById(selectedFieldId).innerHTML = advantageTextSpan(iType, iPowerID, iMask);
}

function selectAdvantage(iType, iPowerID)
{
	var sFieldID = ((iType == 1) ? "fieldPowerAdvantage" : "fieldTravelPowerAdvantage") + iPowerID;
	var mField = document.getElementById(sFieldID);
	var mClear = Aesica.HCEngine.createButton(app.system.buttonText.clear, "selectAdvantageClear", null, (function(){ selectAdvantageClear(iType, iPowerID); }));
	var mTable = document.createElement("table");

	selectClear();

	mTable.id = "advantageTable";
	selectedNum = iPowerID;
	selectedFieldId = sFieldID;
	selectedFieldClass = mField.className;
	mField.className = "selectedButtonNote";

	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader(PH.power[iPowerID].name);
	Aesica.HCEngine.addItemToDialogBoxMenu(mClear);
	Aesica.HCEngine.addItemToDialogBox(mTable);
	updateAdvantageDisplay(iType, iPowerID, false);
	showPositionSection("selectionWindow", (iType == 1) ? false : true); // power : tpower
}

// TODO:  nasty evals rooted pretty deep in this function via selectConfirmation().  The future of
// selectConfirmation and how useful it actually is will need to be considered.  In the meantime,
// double-escaping apostrophes (\\\') in advantage tooltips will need to be a thing.
/*
function selectAdvantage_OLD(iType, iPowerID)
{
	var aFormIDs = ['formPowerAdvantage', 'formTravelPowerAdvantage'];
	var sFieldID = ((iType == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + iPowerID;
	var mField = document.getElementById(sFieldID);
	var oPower = (iType == 1) ? PH.power[iPowerID] : PH.travelPower[iPowerID];
	var iMask = (iType == 1) ? PH.powerAdvantage[iPowerID] : PH.travelPowerAdvantage[iPowerID];
	var iPoints = oPower.getPoints(iMask);
	var mClear, mTable, mRow, mCell, i, oAdvantage, mCheckBox, mLabel, mPoints;
	var aAdvantageList = oPower.advantageList;
	var iLength = aAdvantageList.length;

	selectClear();
	if (selectedFieldId != sFieldID)
	{
		selectedNum = iPowerID;
		selectedFieldId = sFieldID;
		selectedFieldClass = mField.className;
		mField.className = "selectedButtonNote";

		// clear button
		mClear = AES.createButton(app.system.buttonText.clear, "selectAdvantageClear", null, (function(){ selectAdvantageClear(iType, iPowerID); }));
		mTable = document.createElement("table");
		mTable.style.width = "100%";
		for (i = 1; i < iLength; i++)
		{
			oAdvantage = aAdvantageList[i];
			// build table
			mRow = document.createElement("tr");
			mTable.appendChild(mRow);
			mCell = document.createElement("td");
			mRow.appendChild(mCell);
			// checkbox
			mCheckBox = document.createElement("input"); // xxx
			mCheckBox.setAttribute("id", "checkboxAdvantage" + i);
			mCheckBox.setAttribute("type", "checkbox");
			mCheckBox.setAttribute("name", oAdvantage.name);
			mCheckBox.setAttribute("value", oAdvantage.id);
			if (iMask > 0 && oPower.hasAdvantage(iMask, i)) mCheckBox.checked = true;
			if (mCheckBox.checked || (statAdvantagePoints + oAdvantage.points <= maxAdvantagePointsTotal && iPoints + oAdvantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(iType, iPowerID, oAdvantage.id)))
			{
				(function(i, oAdvantage)
				{
					if (mCheckBox.checked)	mCheckBox.addEventListener("click", (function(){ selectAdvantageToggle(iType, iPowerID, i); }));
					else mCheckBox.addEventListener("click", (function(){ selectConfirmation((function(){ selectAdvantageToggle(iType, iPowerID, i) }) , oAdvantage.name, oAdvantage.tip); }));
					//old if// mCheckBox.setAttribute("onclick", "selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")");
					//old else// mCheckBox.setAttribute("onclick", "selectConfirmation('selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")', '" + escapeQuotes(oAdvantage.desc) + "', '" + oAdvantage.tip + "')");

				})(i, oAdvantage);
			}
			mCell.appendChild(mCheckBox);

			// advantage label/button
			mCell = document.createElement("td");
			mCell.setAttribute("style", sAdvantageNameCellStyle);
			mRow.appendChild(mCell);
			mLabel = document.createElement("a");
			mLabel.setAttribute("id", "selectAdvantage" + i);
			if (mCheckBox.checked || (statAdvantagePoints + oAdvantage.points <= maxAdvantagePointsTotal && iPoints + oAdvantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(iType, iPowerID, oAdvantage.id)))
			{
				(function(i, oAdvantage)
				{
					if (mCheckBox.checked)	mLabel.addEventListener("click", (function(){ selectAdvantageToggle(iType, iPowerID, i); }));
					else mLabel.addEventListener("click", (function(){ selectConfirmation((function(){ selectAdvantageToggle(iType, iPowerID, i) }) , oAdvantage.name, oAdvantage.tip); }));
				})(i, oAdvantage);
				/*
				if (mCheckBox.checked)
				{
					mLabel.setAttribute("onclick", "selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")");
				}
				else
				{
					mLabel.setAttribute("onclick", "selectConfirmation('selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")', '" + escapeQuotes(oAdvantage.desc) + "', '" + oAdvantage.tip + "')");
				}
				*/
				/*
				mLabel.className = "selectButton";
			}
			else
			{
				//mLabel.setAttribute("onclick", "return false");
				mLabel.className = "disabledButton";
			}
			mLabel.style.display = "block";
			mLabel.innerHTML = oAdvantage.desc;
			setOnmouseoverPopupL1(mLabel, oAdvantage.tip);
			mCell.appendChild(mLabel);

			// adv point cost
			mCell = document.createElement("td");
			mRow.appendChild(mCell);
			mPoints = document.createElement("span");
			mPoints.className = "note";
			//mPoints.setAttribute("style", "margin-left: 1.5em;");
			mPoints.style.marginLeft = "1.5em";
			mPoints.innerHTML = oAdvantage.points;
			mCell.appendChild(mPoints);
		}

		AES.resetDialogBox();
		AES.setDialogBoxHeader(oPower.name);
		AES.addItemToDialogBoxMenu(mClear);
		AES.addItemToDialogBox(mTable);

		if (iType == 1)
		{
			showPositionSection("selectionWindow", false); // power adv
		}
		else
		{
			showPositionSection("selectionWindow", true); // tpower adv
		}
	}
}
window['selectAdvantage'] = selectAdvantage;
*/
/*
function selectAdvantageUpdate(type, num)
{
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var mask = (type == 1) ? PH.powerAdvantage[num] : PH.travelPowerAdvantage[num];
	var advantageList = power.advantageList;
	var advantagePoints = power.getPoints(mask);
	for (var i = 1; i < advantageList.length; i++)
	{
		var advantage = advantageList[i];
		var checkboxAdvantage = document.getElementById('checkboxAdvantage' + i);
		var selectAdvantage = document.getElementById('selectAdvantage' + i);
		if (checkboxAdvantage)
		{
			if (checkboxAdvantage.checked || (statAdvantagePoints + advantage.points <= maxAdvantagePointsTotal && advantagePoints + advantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(type, num, advantage.id)))
			{
				if (checkboxAdvantage.checked)
				{
					checkboxAdvantage.setAttribute('onclick', 'selectAdvantageToggle(' + type + ', ' + num + ', ' + i + ')');
					selectAdvantage.setAttribute('onclick', 'selectAdvantageToggle(' + type + ', ' + num + ', ' + i + ')');
				}
				else
				{
					checkboxAdvantage.setAttribute('onclick', 'selectConfirmation(\'selectAdvantageToggle(' + type + ', ' + num + ', ' + i + ')\', \'' + escapeQuotes(advantage.desc) + '\', \'' + advantage.tip + '\')');
					selectAdvantage.setAttribute('onclick', 'selectConfirmation(\'selectAdvantageToggle(' + type + ', ' + num + ', ' + i + ')\', \'' + escapeQuotes(advantage.desc) + '\', \'' + advantage.tip + '\')');
				}
			selectAdvantage.setAttribute('class', 'selectButton');
			}
			else
			{
				checkboxAdvantage.setAttribute('onclick', 'return false');
				selectAdvantage.setAttribute('onclick', 'return false');
				selectAdvantage.setAttribute('class', 'disabledButton');
			}
		}
		changeUpdate();
	}
}
window['selectAdvantageUpdate'] = selectAdvantageUpdate;
*/
function selectAdvantageClear(iType, iPowerID)
{
	setAdvantage(iType, iPowerID, 0);
	updateAdvantageDisplay(iType, iPowerID);
}

/*
function selectAdvantageClear_OLD(type, num)
{
	var mask = 0;
	setAdvantage(type, num, mask);
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var advantageList = power.advantageList;
	for (var i = 1; i < advantageList.length; i++)
	{
		var advantage = advantageList[i];
		var checkboxAdvantage = document.getElementById('checkboxAdvantage' + i);
		var selectAdvantage = document.getElementById('selectAdvantage' + i);
		checkboxAdvantage.checked = false;
		if (statAdvantagePoints + advantage.points <= maxAdvantagePointsTotal && checkAdvantageDependancyId(type, num, advantage.id))
		{
			selectAdvantage.setAttribute('onclick', 'selectConfirmation(\'selectAdvantageToggle(' + type + ', ' + num + ', ' + i + ')\', \'' + escapeQuotes(advantage.desc) + '\', \'' + advantage.tip + '\')');
			selectAdvantage.setAttribute('class', 'selectButton');
		}
		else
		{
			selectAdvantage.setAttribute('onclick', 'return false');
			selectAdvantage.setAttribute('class', 'disabledButton');
		}
	}
	field.innerHTML = advantageTextSpan(type, num, mask);
	setOnmouseoverPopupL1(field, advantageTip(type, num, mask));
}
window['selectAdvantageClear'] = selectAdvantageClear;
*/

function selectAdvantageCancel(type, num, mask)
{
	var field = document.getElementById(((type == 1) ? "fieldPowerAdvantage" : "fieldTravelPowerAdvantage") + num);
	field.innerHTML = advantageTextSpan(type, num, mask);
	setOnmouseoverPopupL1(field, advantageTip(type, num, mask));
	setAdvantage(type, num, mask);
	selectClear();
}
window['selectAdvantageCancel'] = selectAdvantageCancel;

function selectAdvantageToggle(iType, iPowerID, iAdvantageID)
{
	var mField = document.getElementById('checkboxAdvantage' + iAdvantageID);
	var oPower = (iType == 1) ? PH.power[iPowerID] : PH.travelPower[iPowerID];
	var iMask = (iType == 1) ? PH.powerAdvantage[iPowerID] : PH.travelPowerAdvantage[iPowerID];
	var i, oAdvantage, iAdvantagePoints, iLength = oPower.advantageList.length;
	if (oPower.hasAdvantage(iMask, iAdvantageID))
	{
		iMask = oPower.delAdvantage(iMask, iAdvantageID);
		for (i = 0; i < iLength; i++)
		{
			oAdvantage = oPower.advantageList[i];
			if (oAdvantage.dependency != null && oAdvantage.dependency == iAdvantageID) iMask = oPower.delAdvantage(iMask, oAdvantage.id);
		}
		setAdvantage(iType, iPowerID, iMask);
	}
	else
	{
		oAdvantage = oPower.advantageList[iAdvantageID];
		iAdvantagePoints = oPower.getPoints(iMask);
		if (statAdvantagePoints +oAdvantage.points <= maxAdvantagePointsTotal && iAdvantagePoints + oAdvantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(iType, iPowerID, iAdvantageID))
		{
			iMask = oPower.addAdvantage(iMask, iAdvantageID);
			setAdvantage(iType, iPowerID, iMask);
		}
	}
	updateAdvantageDisplay(iType, iPowerID);
}

/*
function selectAdvantageToggle_OLD(iType, iPowerID, iAdvantageID)
{
	var mask = (iType == 1) ? PH.powerAdvantage[iPowerID] : PH.travelPowerAdvantage[iPowerID];
	var field = document.getElementById('checkboxAdvantage' + iAdvantageID);
	var power = (iType == 1) ? PH.power[iPowerID] : PH.travelPower[iPowerID];
	if (power.hasAdvantage(mask, iAdvantageID))
	{
		mask = power.delAdvantage(mask, iAdvantageID);
		var advantageList = power.advantageList;
		for (var i = 1; i < advantageList.length; i++)
		{
			var advantage = advantageList[i];
			if (advantage.dependency != null && advantage.dependency == iAdvantageID)
			{
				mask = power.delAdvantage(mask, advantage.id);
				document.getElementById('checkboxAdvantage' + advantage.id).checked = false;
			}
		}
		field.checked = false;
		setAdvantage(iType, iPowerID, mask);
	}
	else
	{
		var advantage = power.advantageList[id];
		var advantagePoints = power.getPoints(mask);
		if (statAdvantagePoints + advantage.points <= maxAdvantagePointsTotal && advantagePoints + advantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(type, num, id))
		{
			mask = power.addAdvantage(mask, id);
			if (field) field.checked = true;
			setAdvantage(type, num, mask);
				//submitAnalytics(app.system.anayltics.set, 'Advantage', power.name + ': ' + advantage.name);
		}
	}
	selectAdvantageUpdate(type, num);
}
window['selectAdvantageToggle'] = selectAdvantageToggle;
*/

function setAdvantage(type, num, mask)
{
	var oldStatAdvantagePoints = statAdvantagePoints;
	var field = document.getElementById(((type == 1) ? "fieldPowerAdvantage" : "fieldTravelPowerAdvantage") + num);
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var phMask = (type == 1) ? PH.powerAdvantage[num] : PH.travelPowerAdvantage[num];
	var advantageList = power.getAdvantageList(phMask);
	var advantagePoints = power.getPoints(mask);
	for (var i = 0; i < advantageList.length; i++)
	{
		statAdvantagePoints -= advantageList[i].points;
	}
	var advantageList = power.getAdvantageList(mask);
	for (var i = 0; i < advantageList.length; i++)
	{
		statAdvantagePoints += advantageList[i].points;
	}
	if (statAdvantagePoints <= maxAdvantagePointsTotal && advantagePoints <= maxAdvantagePointsPerPower && checkAdvantageDependancyMask(type, num, mask))
	{
		(type == 1) ? PH.powerAdvantage[num] = mask : PH.travelPowerAdvantage[num] = mask;
		field.innerHTML = advantageTextSpan(type, num, mask);
		setOnmouseoverPopupL2(field, advantageTip(type, num, mask));
	}
	else
	{
		statAdvantagePoints = oldStatAdvantagePoints;
	}
}
window['setAdvantage'] = setAdvantage;

function advantageText(type, num, mask)
{
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var advantageList = power.advantageList;
	var result = '';
	if (advantageList.length > 0)
	{
		if (mask == 0)
		{
			result = "(advantages)";
		}
		else
		{
			result = "("
			for (var i = 1; i < advantageList.length; i++)
			{
				if (power.hasAdvantage(mask, i))
				{
					result += ((result.length > 2) ? ", " : "") + advantageList[i].desc;
				}
			}
			result += ")";
		}
	}
	return result;
}
window['advantageText'] = advantageText;

function advantageTextSpan(type, num, mask)
{
	return ' <span class="advantage">' + advantageText(type, num, mask) + '</span>';
}
window['advantageTextSpan'] = advantageTextSpan;

function advantageTip(type, num, mask)
{
	var power = (type == 1) ? PH.power[num] : PH.travelPower[num];
	var advantageList = power.advantageList;
	var result = "";
	if (advantageList.length > 0 && mask != 0)
	{
		for (var i = 1; i < advantageList.length; i++)
		{
			if (power.hasAdvantage(mask, i))
			{
				var tip = advantageList[i].tip;
				if (tip != null && tip.length > 0)
				{
					if (result.length > 0) result += "<hr />";
					result += tip;
				}
			}
		}
	}
	if (result.length == 0) return null;
	else return result;
}
window['advantageTip'] = advantageTip;

// specialization functions
function setupSpecializations()
{
	if (prevSelectedSpecializationSuperStat != PH.superStat[1].id)
	{
		PH.specializationTree[1] = HCData.specializationTree[PH.superStat[1].id];
		PH.specialization[1] = 0;
		prevSelectedSpecializationSuperStat = PH.superStat[1].id;
		PH.specializationTree[4] = HCData.specializationTree[0];
	}
	for (var i = 1; i <= 4; i++)
	{
		var tableSpecialization = document.getElementById('tableSpecialization' + i);
		var children = tableSpecialization.getElementsByTagName('*');
		while (children.length > 0)
		{
			tableSpecialization.removeChild(children[0]);
		}
	}
	for (var i = 1; i <= 4; i++)
	{
		var specializationTree = PH.specializationTree[i];
		var mask = PH.specialization[i];
		var specializationList = specializationTree.specializationList;
		var specializationPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(specializationTree, mask);
		var totalPoints = Aesica.dataHarness.SpecializationTree.getPoints(specializationTree, mask);
		var header = document.getElementById('headerSpecialization' + i);
		var table = document.getElementById('tableSpecialization' + i);
		switch (i)
		{
		case 1:
			if (specializationTree.id == 0)
			{
				header.setAttribute('class', 'disabledButton');
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Stat Tree <span class="spec">(0/10)</span></span>';
				header.innerHTML = '<span>Stat Tree <span class="spec">(0/10)</span></span>';
			}
			else
			{
				header.setAttribute('class', 'button');
				header.setAttribute('onclick', 'selectSpecialization(' + i + ')');
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;' + specializationTree.desc + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
				header.innerHTML = '<span>' + specializationTree.name + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
			}
			break;
		case 2:
		case 3:
			if (specializationTree.id == 0)
			{
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Role Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
				header.innerHTML = '<span>Role Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
			}
			else
			{
				header.innerHTML = '<span>' + specializationTree.name + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
			}
			break;
		case 4:
			if (specializationTree.id == 0)
			{
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Mastery <span class="spec">(0/1)</span></span>';
				header.innerHTML = '<span>Mastery <span class="spec">(0/1)</span></span>';
				setOnmouseoverPopupL1(header, null);
			}
			else
			{
				// var specialization = specializationList[8];
				// header.innerHTML = '<span>' + specialization.desc + ' <span class="spec">(1/1)</span></span>';
				header.innerHTML = '<span>' + specializationTree.name + ' Mastery <span class="spec">(1/1)</span></span>';
				setOnmouseoverPopupL1(header, specializationTree.specializationList[8].tip);
			}
			break;
		}
		if (i != 4)
		{
			table.setAttribute('onclick', 'selectSpecialization(' + i + ')');
			for (var j = 0; j < specializationList.length - 1; j++)
			{
				if (specializationPointList[j] > 0)
				{
					var specialization = specializationList[j];
					var tr = document.createElement('tr');
					table.appendChild(tr);
					var td = document.createElement('td');
					tr.appendChild(td);
					var span = document.createElement('span');
					//span.innerHTML = specialization.desc;
					Aesica.HCEngine.setNodeContents(span, Aesica.HCEngine.getDescNode(specialization.icon, specialization.name));
					setOnmouseoverPopupL2(span, specialization.tip);
					td.appendChild(span);
					var td = document.createElement('td');
					tr.appendChild(td);
					td.setAttribute('class', 'specializationPoints');
					var span = document.createElement('span');
					span.setAttribute('class', 'spec');
					span.innerHTML = '(' + specializationPointList[j] + '/' + specialization.maxPoints + ')';
					td.appendChild(span);
				}
			}
				// } else {
				//     if (specializationTree.id != 0) {
				//         var tr = document.createElement('tr');
				//         table.appendChild(tr);
				//         var td = document.createElement('td');
				//         tr.appendChild(td);
				//         var span = document.createElement('span');
				//         // var specialization = specializationList[8];
				//         // span.innerHTML = '<span>' + specialization.desc + '</span>';
				//         span.innerHTML = '<span>' + specializationTree.desc + ' Mastery</span>';
				//         td.appendChild(span);
				//         var td = document.createElement('td');
				//         tr.appendChild(td);
				//         td.setAttribute('class', 'specializationPoints');
				//         var span = document.createElement('span');
				//         span.setAttribute('class', 'spec');
				//         span.innerHTML = '(1/1)';
				//         td.appendChild(span);
				//     }
		}
	}
}
window['setupSpecializations'] = setupSpecializations;

function selectSpecialization(num)
{
	var fieldId = 'headerSpecialization' + num;
	var field = document.getElementById(fieldId);
	selectClear();
	selectedFieldId = fieldId;
	selectedFieldClass = field.getAttribute('class');
	field.setAttribute('class', 'selectedButton');
	selectSpecializationRefresh(num);
	showPositionSection('selectionWindow', true);
}
window['selectSpecialization'] = selectSpecialization;

function selectSpecializationRefresh(num)
{
	// gird your loins, kids!
	Aesica.HCEngine.resetDialogBox(1);
	var i, iLength;
	var oSpecTree = PH.specializationTree[num];
	var iMask = PH.specialization[num];
	var aSpecList = oSpecTree.specializationList;
	var oSpecialization;
	var aSpecPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(oSpecTree, iMask);
	var iTotalPoints = Aesica.dataHarness.SpecializationTree.getPoints(oSpecTree, iMask);
	var iTier1Points = Aesica.dataHarness.SpecializationTree.getTierPoints(oSpecTree, iMask, 1);
	var mElement, mButton, mTable, mTr, mTd;
	// stat tree
	if (num == app.system.specialization.stat)
	{
		mElement = document.createElement("span");
		mElement.setAttribute("id", "selectSpecialization1");
		if (oSpecTree.id == 0)
		{
			//span.innerHTML = '<div class="Sprite blank"></div>&nbsp;Stat Tree (0/10)';
			mElement.innerHTML = "Stat Tree (0/" + app.system.specPointMax + ")";
		}
		else
		{
			//span.innerHTML = '<div class="Sprite blank"></div>&nbsp;' + specializationTree.desc + ' (' + totalPoints + '/10)';
			mElement.innerHTML = oSpecTree.desc + " Tree (" + iTotalPoints + "/" + app.system.specPointMax + ")";
		}
		Aesica.HCEngine.setDialogBoxHeader("Stat Specialization > " + oSpecTree.name);
		Aesica.HCEngine.addItemToDialogBox(mElement, 0);

	}
	// role tree 1 and 2
	else if (num == app.system.specialization.role[0] || num == app.system.specialization.role[1])
	{
		// if freeform
		// warning - magic numbers: 9, 15
		if (PH.archetype.id == 1)
		{
			iLength = HCData.specializationTree.length;
			mTable = document.createElement("table");
			mTable.setAttribute("style", "border-collapse: collapse; margin-bottom: 0.5em;")
			mTr = document.createElement("tr");
			mTable.appendChild(mTr);
			for (i = 9; i < iLength; i++)
			{
				mTd = document.createElement("td");
				if (i == 15)
				{
					//AES.addItemToDialogBox(document.createElement("br"), 0);
					mTr = document.createElement("tr");
					mTable.appendChild(mTr);
				}
				(function(i)
				{
					if (oSpecTree.id == i)
					{
						mButton = Aesica.HCEngine.createButton(HCData.specializationTree[i].name, "", "takenButton", (function(){ setSpecializationTree(num, i); }));
					}
					else if ((num == 2 && PH.specializationTree[3].id == i) || (num == 3 && PH.specializationTree[2].id == i))
					{	
						mButton = Aesica.HCEngine.createButton(HCData.specializationTree[i].name, "", "takenButton", (function(){ setSpecializationTree(num, i); }));
					}	
					else
					{
						mButton = Aesica.HCEngine.createButton(HCData.specializationTree[i].name, "", "button", (function(){ setSpecializationTree(num, i); }));
					}
				}
				)(i);
				mButton.setAttribute("style", "padding-right: 1.2em; display: block;");
				setOnmouseoverPopupL1(mButton, HCData.specializationTree[i].tip);
				mTd.appendChild(mButton);
				mTr.appendChild(mTd);
			}
			Aesica.HCEngine.addItemToDialogBoxMenu(mTable);
		}
		if (oSpecTree.id != 0)
		{
			mElement = document.createElement("span");
			mElement.setAttribute("id", "selectSpecialization" + num);
			mElement.innerHTML = oSpecTree.name + " Tree (" + iTotalPoints + "/" + app.system.specPointMax + ")";
			Aesica.HCEngine.addItemToDialogBox(mElement, 0);
			Aesica.HCEngine.addItemToDialogBox(document.createElement("br"), 0);
		}
		if (oSpecTree.name) Aesica.HCEngine.setDialogBoxHeader("Role Specialization > " + oSpecTree.name);
		else Aesica.HCEngine.setDialogBoxHeader("Role Specialization");
	}
	// mastery 'tree'
	else if (num == app.system.specialization.mastery)
	{
		mElement = document.createElement("span");
		mElement.setAttribute("id", "selectSpecialization4");
		mElement.innerHTML = "<span>Mastery (0/1)</span>";
		if (oSpecTree.id == 0) Aesica.HCEngine.setDialogBoxHeader("Mastery");
		else Aesica.HCEngine.setDialogBoxHeader("Mastery > " + oSpecTree.name);
		Aesica.HCEngine.addItemToDialogBox(mElement, 0);
	}

	if (num == 1 || num == 4 || aSpecList.length > 0)
	{
		mButton = Aesica.HCEngine.createButton(app.system.buttonText.clear, "selectSpecializationClear", "", (function(){ selectSpecializationClear(num); }));
		mButton.setAttribute("style", "margin-right: 1.5em;");
		Aesica.HCEngine.addItemToDialogBoxMenu(mButton);
	}

	if (num != app.system.specialization.mastery)
	{
		mTable = document.createElement("table");
		iLength = aSpecList.length;
		for (i = 0; i < iLength - 1; i++)
		{
			oSpecialization = aSpecList[i];
			// spec icon/name
			mTr = document.createElement("tr");
			mTable.appendChild(mTr);
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			mElement = document.createElement("span");
			mElement.setAttribute("id", "selectSpecializationDescription" + i);
			Aesica.HCEngine.setNodeContents(mElement, Aesica.HCEngine.getDescNode(oSpecialization.icon, oSpecialization.name));
			setOnmouseoverPopupL1(mElement, oSpecialization.tip);
			if (iTotalPoints < app.system.specPointMax || aSpecList[i] > 0)
			{
				mElement.setAttribute("class", "buttonText");
			}
			else
			{
				mElement.setAttribute("class", "disabledButtonText");
			}
			mTd.appendChild(mElement);

			// spec decrement arrow
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			(function(i)
			{
				if (aSpecPointList[i] > 0)
				{
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("minus"), "selectSpecializationDecrement" + i, "selectButton", (function(){ selectSpecializationDecrement(num, i); }));
				}
				else
				{
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("minus"), "selectSpecializationDecrement" + i, "disabledButton");
				}
			})(i);
			mTd.appendChild(mButton);

			// spec points invested
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			mElement = document.createElement("span");
			mElement.setAttribute("id", "selectSpecializationPoints" + i);
			mElement.innerHTML = "(" + aSpecPointList[i] + "/" + oSpecialization.maxPoints + ")";
			if (iTotalPoints < app.system.specPointMax || aSpecPointList[i] > 0)
			{
				mElement.setAttribute("class", "note");
			}
			else
			{
				mElement.setAttribute("class", "disabledNote");
			}
			mTd.appendChild(mElement);

			// spec increment arrow
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			var a = document.createElement('a');
			a.setAttribute('id', 'selectSpecializationIncrement' + i);
			(function(oSpecialization, i)
			{
				if (iTotalPoints < app.system.specPointMax && aSpecPointList[i] < oSpecialization.maxPoints && (i < 4 || iTier1Points >= 5))
				{
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("plus"), "selectSpecializationIncrement" + i, "selectButton", (function(){ selectSpecializationIncrement(num, i); })); // TODO:  Something strange is going on here.  may resolve itself as you continue updating...
				}
				else
				{
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("plus"), "selectSpecializationIncrement" + i, "disabledButton");
				}
			})(oSpecialization, i);
			mTd.appendChild(mButton);
		}
	}
	else
	{
		mTable = document.createElement("table");
		mTr = document.createElement("tr");
		mTable.appendChild(mTr);
		mTd = document.createElement("td");
		mTr.appendChild(mTd);
		if (PH.specializationTree[1].id == 0)
		{
			mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("blank", "Stat Mastery"), "", "disabledButton");
		}
		else
		{
			oSpecialization = PH.specializationTree[1].specializationList[8]; // magic number - what's 8?
			mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(oSpecialization.icon, oSpecialization.name), "", "selectButton", (function(){ setSpecializationMastery(1); }));
			setOnmouseoverPopupL1(mButton, oSpecialization.tip);
		}
		mTd.appendChild(mButton);
		for (i = 2; i <= 3; i++)
		{
			mTr = document.createElement("tr");
			mTable.appendChild(mTr);
			mTd = document.createElement("td");
			mTr.appendChild(mTd);

			(function(i, oSpecialization)
			{
				if (PH.specializationTree[i].id == 0)
				{
					//mButton = AES.createButton("<span><div class='Sprite blank'></div>&nbsp;Role Mastery</span>", "", "disabledButton");
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode("blank", "Role Mastery"), "", "disabledButton");
				}
				else
				{
					oSpecialization = PH.specializationTree[i].specializationList[8]; // magic number - what's 8?
					//mButton = AES.createButton("<span>" + oSpecialization.desc + "</span>", "", "selectButton", (function(){ setSpecializationMastery(i); }));
					mButton = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(oSpecialization.icon, oSpecialization.name), "", "selectButton", (function(){ setSpecializationMastery(i); }));
					setOnmouseoverPopupL1(mButton, oSpecialization.tip);
				}
			})(i, oSpecialization);
			mTd.appendChild(mButton);
		}
	}

	Aesica.HCEngine.addItemToDialogBox(mTable);
	updatePositionSection("selectionWindow");
}
window['selectSpecializationRefresh'] = selectSpecializationRefresh;

/*
// This whole function might actually be completely unnecessary? :o
function selectSpecializationUpdate(num)
{
	var specializationTree = PH.specializationTree[num];
	var mask = PH.specialization[num];
	var specializationList = specializationTree.specializationList;
	var specializationPointList = specializationTree.getSpecializationList(mask);
	var totalPoints = specializationTree.getPoints(mask);
	var tier1Points = specializationTree.getTierPoints(mask, 1);
	if (num != 4)
	{
		var selectSpecialization = document.getElementById('selectSpecialization' + num);
		//selectSpecialization.innerHTML = '<div class="Sprite blank"></div>&nbsp;' + specializationTree.desc + ' Tree (' + totalPoints + '/10)';
		selectSpecialization.innerHTML = specializationTree.desc + ' Tree (' + totalPoints + '/10)';
	}
	for (var i = 0; i < specializationList.length - 1; i++)
	{
		var selectSpecializationDescription = document.getElementById('selectSpecializationDescription' + i);
		var selectSpecializationDecrement = document.getElementById('selectSpecializationDecrement' + i);
		var selectSpecializationPoints = document.getElementById('selectSpecializationPoints' + i);
		var selectSpecializationIncrement = document.getElementById('selectSpecializationIncrement' + i);
		var specialization = specializationList[i];
		selectSpecializationPoints.innerHTML = '(' + specializationPointList[i] + '/' + specialization.maxPoints + ')';
		if (totalPoints < 10 || specializationPointList[i] > 0)
		{
			selectSpecializationDescription.setAttribute('class', 'buttonText');
			selectSpecializationPoints.setAttribute('class', 'note');
		}
		else
		{
			selectSpecializationDescription.setAttribute('class', 'disabledButtonText');
			selectSpecializationPoints.setAttribute('class', 'disabledNote');
		}
		if (specializationPointList[i] > 0)
		{
			selectSpecializationDecrement.setAttribute('onclick', 'selectSpecializationDecrement(' + num + ',' + i + ')');
			selectSpecializationDecrement.setAttribute('class', 'selectButton');
		}
		else
		{
			selectSpecializationDecrement.setAttribute('onclick', 'return false');
			selectSpecializationDecrement.setAttribute('class', 'disabledButton');
		}
		if (totalPoints < 10 && specializationPointList[i] < specialization.maxPoints && (i < 4 || tier1Points >= 5))
		{
			if (specializationPointList[i] == 0)
			{
				selectSpecializationIncrement.setAttribute('onclick', 'selectConfirmation(\'selectSpecializationIncrement(' + num + ', ' + i + ')\', \'' + escapeQuotes(specialization.desc) + '\', \'' + specialization.tip + '\')');
			}
			else
			{
				selectSpecializationIncrement.setAttribute('onclick', 'selectSpecializationIncrement(' + num + ',' + i + ')');
			}
			selectSpecializationIncrement.setAttribute('class', 'selectButton');
		}
		else
		{
			selectSpecializationIncrement.setAttribute('onclick', 'return false');
			selectSpecializationIncrement.setAttribute('class', 'disabledButton');
		}
	}
}
window['selectSpecializationUpdate'] = selectSpecializationUpdate;
*/

function selectSpecializationClear(num)
{
	if (PH.archetype.id == 1 || num == 4)
	{
		PH.specializationTree[num] = HCData.specializationTree[0];
	}

	PH.specialization[num] = 0;
	if (num == 1) prevSelectedSpecializationSuperStat = 0; // force super stat specialization to reset properly
	setupSpecializations();
	selectClear();
}
window['selectSpecializationClear'] = selectSpecializationClear;

function selectSpecializationCancel(num, mask)
{
	setSpecialization(num, mask);
	selectClear();
}
window['selectSpecializationCancel'] = selectSpecializationCancel;

function selectSpecializationIncrement(num, id)
{
	var specializationTree = PH.specializationTree[num];
	var mask = PH.specialization[num];
	var totalPoints = Aesica.dataHarness.SpecializationTree.getPoints(specializationTree, mask);
	var tier1Points = Aesica.dataHarness.SpecializationTree.getTierPoints(specializationTree, mask, 1);
	var specializationList = specializationTree.specializationList;
	var specializationPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(specializationTree, mask);
	var specialization = specializationList[id];
	if (totalPoints < 10 && specializationPointList[id] < specialization.maxPoints && (id < 4 || tier1Points >= 5))
	{
		var newMask = Aesica.dataHarness.SpecializationTree.incrSpecialization(specializationTree, mask, id);
		setSpecialization(num, newMask);
		selectSpecializationRefresh(num);
		//selectSpecializationUpdate(num);
		//submitAnalytics(app.system.anayltics.set, 'Specialization', specializationTree.name + ': ' + specialization.name, specializationPointList[id]);
	}
}
window['selectSpecializationIncrement'] = selectSpecializationIncrement;

function selectSpecializationDecrement(num, id)
{
	var specializationTree = PH.specializationTree[num];
	var mask = PH.specialization[num];
	var totalPoints = Aesica.dataHarness.SpecializationTree.getPoints(specializationTree, mask);
	var specializationList = specializationTree.specializationList;
	var specializationPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(specializationTree, mask);
	var specialization = specializationList[id];
	if (specializationPointList[id] > 0)
	{
		var newMask = Aesica.dataHarness.SpecializationTree.decrSpecialization(specializationTree, mask, id);
		setSpecialization(num, newMask);
		selectSpecializationRefresh(num);
		//selectSpecializationUpdate(num);
		//submitAnalytics(app.system.anayltics.set, 'Specialization', specializationTree.name + ': ' + specialization.name, specializationPointList[id]);
	}
}
window['selectSpecializationDecrement'] = selectSpecializationDecrement;

function setSpecialization(num, mask)
{
	if (Aesica.dataHarness.SpecializationTree.getPoints(HCData.specializationTree[num], mask) <= 10)
	{
		PH.specialization[num] = mask;
		setupSpecializations();
	}
}
window['setSpecialization'] = setSpecialization;

function setSpecializationTree(num, id)
{
	var currentTree = PH.specializationTree[num];
	if (currentTree.id != id)
	{
		if ((num == 2 && PH.specializationTree[3].id == id) || (num == 3 && PH.specializationTree[2].id == id))
		{
			var otherNum = ((num == 2) ? 3 : 2);
			var otherTree = PH.specializationTree[otherNum];
			var otherSpec = PH.specialization[otherNum];
			PH.specializationTree[otherNum] = PH.specializationTree[num];
			PH.specialization[otherNum] = PH.specialization[num];
			PH.specializationTree[num] = otherTree;
			PH.specialization[num] = otherSpec;
		}
		else
		{
			if (PH.specializationTree[num].id == PH.specializationTree[4].id) PH.specializationTree[4] = HCData.specializationTree[0];
			PH.specializationTree[num] = HCData.specializationTree[id];
			PH.specialization[num] = 0;
		}
		selectSpecializationRefresh(num);
		setupSpecializations();
			//submitAnalytics(app.system.anayltics.set, 'SpecializationTree', PH.specializationTree[num].name);
	}
}
window['setSpecializationTree'] = setSpecializationTree;

function setSpecializationMastery(id)
{
	if (id == 0) PH.specializationTree[4] = HCData.specializationTree[0];
	else PH.specializationTree[4] = PH.specializationTree[id];
	setupSpecializations();
	selectClear();
	//if (id > 0) submitAnalytics(app.system.anayltics.set, 'SpecializationMastery', PH.specializationTree[4].name);
}
window['setSpecializationMastery'] = setSpecializationMastery;

function getSpecializationMasteryId(id)
{
	for (var i = 1; i < PH.specializationTree.length - 1; i++)
	{
		if (PH.specializationTree[i].id == id) return i;
	}
	return 0;
}
window['getSpecializationMasteryId'] = getSpecializationMasteryId;

// archetype functions
function setupArchtypes()
{
	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Archetypes");

	var i;
	var iArchetypeCount = HCData.archetype.length;
	var mCurrent;
	var iLength = HCData.archetypeGroup.length;
	var aContainers = [null];
	var mContainer, mLabel;
	for (i = 1; i < iLength; i++)
	{
		if (i > 1) Aesica.HCEngine.addItemToDialogBox(document.createElement("hr"));
		mContainer = document.createElement("div");
		mLabel = document.createElement("div");
		mLabel.innerHTML = HCData.archetypeGroup[i].name;
		mContainer.appendChild(mLabel);
		aContainers[i] = mContainer;
		Aesica.HCEngine.addItemToDialogBox(aContainers[i]);
	}

	// add new archetypes
	for (i = 1; i < iArchetypeCount; i++)
	{
		mContainer = aContainers[HCData.archetype[i].group];
		if (mContainer.childNodes.length % (app.system.archetypeRowSize + 1) == 0) mContainer.appendChild(document.createElement("br"));
		(function(i)
		{
			mCurrent = Aesica.HCEngine.createButton(Aesica.HCEngine.getDescNode(HCData.archetype[i].icon, null, true, true), "selectArchetype" + i, "", (function(){ setArchetype(i); }));
		})(i);
		setOnmouseoverPopupL1(mCurrent, "<b>" + HCData.archetype[i].name + "</b><br /><br />" + Aesica.dataHarness.Archetype.tip(HCData.archetype[i]));
		mContainer.appendChild(mCurrent);
	}

	Aesica.HCEngine.setVisibility("selectionWindow", true);
}
window['setupArchtypes'] = setupArchtypes;

function selectArchetype()
{
	var fieldId = 'archetype';
	var field = document.getElementById(fieldId);
	selectClear();
	selectedFieldId = fieldId;
	selectedFieldClass = field.getAttribute('class');
	field.setAttribute('class', 'selectedButton');
	setupArchtypes();
	showPositionSection('selectionWindow', true);
}
window['selectArchetype'] = selectArchetype;

function setArchetype(id)
{
	var archetype = HCData.archetype[id];
	if (id == 1)
	{
		for (var i = 1; i < PH.superStat.length; i++)
		{
			var field = document.getElementById("fieldSuperStat" + i);
			//field.setAttribute('onclick', 'selectSuperStat(' + i + ')');
			field.className = "button";
		}
		for (var i = 1; i < PH.innateTalent.length; i++)
		{
			var field = document.getElementById("fieldInnateTalent" + i);
			//field.setAttribute('onclick', 'selectInnateTalent(' + i + ')');
			field.className = "button";
		}
		for (var i = 1; i < PH.power.length; i++)
		{
			var ield = document.getElementById("fieldPower" + i);
			//field.setAttribute('onclick', 'selectPower(' + i + ')');
			field.className = "button";
		}
		document.getElementById("fieldTalentNote1").innerHTML = "6";
		document.getElementById("fieldTalentNote2").innerHTML = "9";
		document.getElementById("fieldTalentNote3").innerHTML = "12";
		document.getElementById("fieldTalentNote4").innerHTML = "15";
		document.getElementById("fieldTalentNote5").innerHTML = "18";
		document.getElementById("fieldTalentNote6").innerHTML = "21";
		document.getElementById("fieldPowerNote8").innerHTML = "20";
		document.getElementById("fieldPowerNote9").innerHTML = "23";
		document.getElementById("fieldPowerNote10").innerHTML = "26";
		document.getElementById("fieldPowerNote11").innerHTML = "29";
		document.getElementById("fieldPowerNote12").innerHTML = "32";
		document.getElementById("rowPower13").style.display = "";
		document.getElementById("rowPower14").style.display = "";
		
		for (var i = 1; i < PH.power.length; i++)
		{
			document.getElementById("fieldPower" + i).className = "button";
		}

		document.getElementById("fieldRole").className = "button";
	}
	else
	{
		for (var i = 1; i < PH.superStat.length; i++)
		{
			var id = archetype.superStatList[i - 1];
			var field = document.getElementById("fieldSuperStat" + i);
			if (id != PH.superStat[i].id)
			{
				PH.superStat[i] = HCData.superStat[id];
				Aesica.HCEngine.setNodeContents(field, getSuperStatDesc(id, i));
				setOnmouseoverPopupL2(field, Aesica.dataHarness.SuperStat.tip(HCData.superStat[id]));
			}
			field.className = "lockedButton";
		}
		for (var i = 1; i < PH.innateTalent.length; i++)
		{
			var id = archetype.innateTalent;
			var field = document.getElementById("fieldInnateTalent" + i);
			if (id != PH.innateTalent[i].id)
			{
				PH.innateTalent[i] = HCData.innateTalent[id];
				Aesica.HCEngine.setNodeContents(field, getInnateTalentDesc(id, i));
				setOnmouseoverPopupL2(field, Aesica.dataHarness.InnateTalent.tip(HCData.innateTalent[id]));
			}
			field.className = "lockedButton";
		}
		for (var i = 1; i < PH.power.length; i++)
		{
			var field = document.getElementById("fieldPower" + i);
			var advantageField = document.getElementById("fieldPowerAdvantage" + i);
			var id = archetype.powerList[i - 1];
			if (id != undefined)
			{
				var multiplePowers = false;
				if (id instanceof Array)
				{
					multiplePowers = true;
					var powers = id;
					var oldId = PH.power[i].id;
					for (var j = 1; j < powers.length; j++)
					{
						if (HCLookup.power[powers[j]] == oldId) id = HCLookup.power[powers[j]];
					}
					if (id instanceof Array) id = powers[0];
				}
				if (typeof id == "string") id = HCLookup.power[id];
				if (id != PH.power[i].id)
				{
					setAdvantage(1, i, 0);
					PH.power[i] = dataPower[id];
					//field.innerHTML = dataPower[id].desc;
					Aesica.HCEngine.setNodeContents(field, Aesica.HCEngine.getDescNode(dataPower[id].icon, dataPower[id].name, false, true));
					setOnmouseoverPopupL2(field, dataPower[id].tip);
					advantageField.innerHTML = advantageTextSpan(1, i, 0);
					setOnmouseoverPopupL2(advantageField, advantageTip(1, i, 0));
				}
				if (multiplePowers) field.className = "button";
				else field.className = "lockedButton";
				advantageField.style.display = '';
			}
			else
			{
				setAdvantage(1, i, 0);
				PH.power[i] = dataPower[0];
				Aesica.HCEngine.setNodeContents(field, getPowerDefault(i));
				setOnmouseoverPopupL2(field, dataPower[i].tip);
				advantageField.innerHTML = advantageTextSpan(1, i, 0);
				setOnmouseoverPopupL2(advantageField, advantageTip(1, i, 0));
			}
		}
		for (var i = 1; i <= 3; i++)
		{
			setSpecializationTree(i, archetype.specializationTreeList[i - 1]);
		}
		document.getElementById("fieldTalentNote1").innerHTML = "7";
		document.getElementById("fieldTalentNote2").innerHTML = "12";
		document.getElementById("fieldTalentNote3").innerHTML = "15";
		document.getElementById("fieldTalentNote4").innerHTML = "20";
		document.getElementById("fieldTalentNote5").innerHTML = "25";
		document.getElementById("fieldTalentNote6").innerHTML = "30";
		document.getElementById("fieldPowerNote8").innerHTML = "21";
		document.getElementById("fieldPowerNote9").innerHTML = "25";
		document.getElementById("fieldPowerNote10").innerHTML = "30";
		document.getElementById("fieldPowerNote11").innerHTML = "35";
		document.getElementById("fieldPowerNote12").innerHTML = "40";
		document.getElementById("rowPower13").style.display = "none";
		document.getElementById("rowPower14").style.display = "none";

		setRole(archetype.group);
		var fieldRole = document.getElementById("fieldRole");
		fieldRole.className = "lockedButton";
	}

	PH.archetype = archetype;
	var mArchetypeDisplay = document.getElementById("fieldArchetype");
	mArchetypeDisplay.innerHTML = "";//archetype.desc + "&nbsp;" + archetype.name;
	mArchetypeDisplay.appendChild(Aesica.HCEngine.getDescNode(archetype.icon, archetype.name, true));
	setOnmouseoverPopupL1(mArchetypeDisplay, "<b>" + archetype.name + "</b><br /><br />" + Aesica.dataHarness.Archetype.tip(archetype));
	selectClear();
	//submitAnalytics(app.system.anayltics.set, 'Archetype', archetype.name);
}
window['setArchetype'] = setArchetype;

// apply version update
function applyVersionUpdate(version, thing, value)
{
	var result = value[thing];
	var orig = result;
	if (version < PH.version && version < dataVersionUpdate.length)
	{
		var funct = dataVersionUpdate[version].funct;
		result = funct(thing, value);
		value[thing] = result;
	}
	if (prefs.debug && result != orig && thing != 'inc')
	{
		console.log("applyVersionUpdate: version=" + HCData.version + ", thing=" + thing + ", value=" + orig + ", result=" + result);
	}
	return result;
}
window['applyVersionUpdate'] = applyVersionUpdate;

// parse url for parameters
function parseUrlParams(url)
{
	Aesica.HCEngine.writeMessage("Parsing build...");
	var version = HCData.version;
	var data = [];
	var parts = url.split("?");
	if (parts[1] != undefined)
	{
		var params = parts[1].split("&");
		for (var i = 0; i < params.length; i++)
		{
			var pair = params[i].split("=");
			switch (pair[0])
			{
			case "v":
				version = parseInt(pair[1]);
				break;
			case "n":
				PH.name = decodeURIComponent(pair[1]);
				document.getElementById("fieldName").firstChild.data = PH.name;
				break;
			case "a":
				// note: deprecated, but needed for backwards compatibility with version 1
				PH.archetype = HCData.archetype[parseInt(pair[1])];
				//document.getElementById('fieldArchetype').firstChild.data = PH.archetype.name;
				break;
			case "d": // deprecated, but required for data versions older than 20 (power IDs are 1 digit)
				data = pair[1].split("");
				break;
			case "debug": // for toggling debug mode
				setPrefDebugMode(pair[1]);
				break;
			case "e": // for build note
				PH.buildNote = Aesica.HCEngine.urlSafeAtob(pair[1]);
				updateBuildNote(PH.buildNote);
			}
		}
	}
	while (version <= HCData.version)
	{
		var finalVersion = (version == HCData.version);
		var pos = 0;
		var i = 0;
		var inc = 1;
		var archetype = (PH.archetype && PH.archetype.id) || 1;
		var specializationMasteryId = 0;
		if (prefs.debug)
		{
			console.log("parseUrlParams: version=" + HCData.version + ", name=" + name + ", data=" + data);
		}
		data = applyVersionUpdate(version, 'data', {'type': 'init', 'data': data, 'pos': pos, 'i': i, 'inc': inc, 'archetype': archetype});
		while (i < data.length)
		{
			//var codeNum = urlCodeToNum(data[i]);
			pos = applyVersionUpdate(version, 'pos', {'type': 'start', 'pos': pos, 'i': i, 'inc': inc, 'archetype': archetype});
			i = applyVersionUpdate(version, 'i', {'type': 'start', 'pos': pos, 'i': i, 'inc': inc, 'archetype': archetype});
			//codeNum = applyVersionUpdate(version, 'codeNum', {'type': 'start', 'pos': pos, 'i': i, 'inc': inc, 'codeNum': codeNum, 'archetype': archetype});
			switch (pos)
			{
			case 0:
				// archetype
				var code1 = applyVersionUpdate(version, 'code1', {'type': 'archetype', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'archetype': archetype});
				archetype = urlCodeToNum(code1);
				archetype = applyVersionUpdate(version, 'archetype', {'type': 'archetype', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype});
				data[i] = numToUrlCode(archetype);
				if (finalVersion)
				{
					PH.archetype = HCData.archetype[archetype];
				}
				inc = 1;
				inc = applyVersionUpdate(version, 'inc', {'type': 'archetype', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype});
				break;
			case 1:
			case 2:
			case 3:
				// super stats
				var code1 = applyVersionUpdate(version, 'code1', {'type': 'superStat', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'archetype': archetype});
				var superStat = urlCodeToNum(code1);
				superStat = applyVersionUpdate(version, 'superStat', {'type': 'superStat', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'superStat': superStat});
				data[i] = numToUrlCode(superStat);
				if (finalVersion)
				{
					selectSuperStat(pos);
					setSuperStat(superStat);
				}
				inc = 1;
				inc = applyVersionUpdate(version, 'inc', {'type': 'superStat', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'superStat': superStat});
				break;
			case 4:
				// innate talent
				var code1;
				var code2;
				if (version < 20) // data version 19 or lower: single digit url code
				{
					code1 = applyVersionUpdate(version, 'code1', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'archetype': archetype});
					var innateTalent = urlCodeToNum(code1);
					innateTalent = applyVersionUpdate(version, 'innateTalent', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'innateTalent': innateTalent});
					if (version < 19)
					{
						data[i] = numToUrlCode(innateTalent);
						inc = 1;
					}
					else // bump size for data version 20+
					{
						var travelPowerCode = numToUrlCode2(innateTalent);
						data[i] = travelPowerCode[0];
						data.splice(i + 1, 0, travelPowerCode[1]);
						inc = 2;
					}
					
				}
				else // data version 20 or higher: double digit url code
				{
					code1 = applyVersionUpdate(version, 'code1', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'archetype': archetype});
					code2 = applyVersionUpdate(version, 'code2', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'archetype': archetype});
					var innateTalent = urlCodeToNum2(code1 + code2);
					innateTalent = applyVersionUpdate(version, 'innateTalent', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'archetype': archetype, 'innateTalent': innateTalent});
					var innateTalentCode = numToUrlCode2(innateTalent);
					data[i] = innateTalentCode[0];
					data[i + 1] = innateTalentCode[1];
					inc = 2;
				}
				if (finalVersion)
				{
					selectInnateTalent(pos - 3);
					setInnateTalent(innateTalent);
				}
				inc = applyVersionUpdate(version, 'inc', {'type': 'innateTalent', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'innateTalent': innateTalent});
				break;
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
				// talents
				var code1 = applyVersionUpdate(version, 'code1', {'type': 'talent', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'archetype': archetype});
				var talent = urlCodeToNum(code1);
				talent = applyVersionUpdate(version, 'talent', {'type': 'talent', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'talent': talent});
				data[i] = numToUrlCode(talent);
				if (finalVersion)
				{
					selectTalent(pos - 4);
					setTalent(talent);
				}
				inc = 1;
				inc = applyVersionUpdate(version, 'inc', {'type': 'talent', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'archetype': archetype, 'talent': talent});
				break;
			case 11:
			case 12:
				// travel powers
				var code1;
				var code2;
				var code3;
				var travelPower;
				if (version < 20) // 1-digit code for travel power ids, pre-data version 20
				{
					code1 = applyVersionUpdate(version, 'code1', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'archetype': archetype});
					code2 = applyVersionUpdate(version, 'code2', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'archetype': archetype});
					travelPower = urlCodeToNum(code1);
					travelPower = applyVersionUpdate(version, 'travelPower', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'archetype': archetype, 'travelPower': travelPower});
					var mask = urlCodeToNum(code2) << 1;
					mask = applyVersionUpdate(version, 'mask', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'archetype': archetype, 'travelPower': travelPower, 'mask': mask});
					if (version < 19)
					{
						data[i] = numToUrlCode(travelPower);
						data[i + 1] = numToUrlCode(mask >> 1);
						inc = 2;
					}
					else // bump size for 20
					{
						var travelPowerCode = numToUrlCode2(travelPower);
						data[i] = travelPowerCode[0];
						data[i + 1] = travelPowerCode[1];
						data.splice(i + 2, 0, numToUrlCode(mask >> 1));
						inc = 3;
					}
				}
				else // 2-digit code for travel power ids, version 20 and later
				{
					code1 = applyVersionUpdate(version, 'code1', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'archetype': archetype});
					code2 = applyVersionUpdate(version, 'code2', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'archetype': archetype});
					code3 = applyVersionUpdate(version, 'code3', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'archetype': archetype});
					travelPower = urlCodeToNum2(code1 + code2);
					travelPower = applyVersionUpdate(version, 'travelPower', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'archetype': archetype, 'travelPower': travelPower});
					var mask = urlCodeToNum(code3) << 1;
					mask = applyVersionUpdate(version, 'mask', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'archetype': archetype, 'travelPower': travelPower, 'mask': mask});
					var travelPowerCode = numToUrlCode2(travelPower);
					data[i] = travelPowerCode[0];
					data[i + 1] = travelPowerCode[1];
					data[i + 2] = numToUrlCode(mask >> 1);
					inc = 3;
				}
				
				if (finalVersion)
				{
					var num = pos - 10;
					selectTravelPower(num);
					setTravelPower(travelPower);
					setAdvantage(2, num, mask);
				}
				inc = applyVersionUpdate(version, 'inc', {'type': 'travelPower', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'archetype': archetype, 'travelPower': travelPower, 'mask': mask});
				break;
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
				// powers
				var code1 = applyVersionUpdate(version, 'code1', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code2 = applyVersionUpdate(version, 'code2', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code3 = applyVersionUpdate(version, 'code3', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code4 = applyVersionUpdate(version, 'code4', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var framework = applyVersionUpdate(version, 'framework', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'framework': parseInt(urlCodeToNum(code1)), 'power': parseInt(urlCodeToNum(code2)), 'mask': urlCodeToNum2(code3 + code4) << 1});
				var power = applyVersionUpdate(version, 'power', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'framework': parseInt(urlCodeToNum(code1)), 'power': parseInt(urlCodeToNum(code2)), 'mask': urlCodeToNum2(code3 + code4) << 1});
				var mask = applyVersionUpdate(version, 'mask', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'framework': parseInt(urlCodeToNum(code1)), 'power': parseInt(urlCodeToNum(code2)), 'mask': urlCodeToNum2(code3 + code4) << 1});
				var powerCode = numToUrlCode(framework) + numToUrlCode(power);
				var powerId = dataPowerIdFromCode[powerCode];
				var num = pos - 12;
				data[i] = numToUrlCode(framework);
				data[i + 1] = numToUrlCode(power);
				var maskCode = numToUrlCode2(mask >> 1);
				data[i + 2] = maskCode[0];
				data[i + 3] = maskCode[1];
				if (finalVersion)
				{
					selectFramework(framework);
					selectPower(num);
					setPower(powerId);
					//validatePower(num, powerId);
					setAdvantage(1, num, mask);
				}
				inc = 4;
				inc = applyVersionUpdate(version, 'inc', {'type': 'power', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'framework': framework, 'power': power, 'mask': mask});
				break;
			case 27:
			case 28:
			case 29:
				// specializations
				var code1 = applyVersionUpdate(version, 'code1', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code2 = applyVersionUpdate(version, 'code2', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code3 = applyVersionUpdate(version, 'code3', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var code4 = applyVersionUpdate(version, 'code4', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': data[i], 'code2': data[i + 1], 'code3': data[i + 2], 'code4': data[i + 3], 'archetype': archetype});
				var codeNum = parseInt(urlCodeToNum4(code1 + code2 + code3 + code4));
				var specialization = codeNum >> 4;
				var specializationTree = codeNum & ~(specialization << 4);
				specializationTree = applyVersionUpdate(version, 'specializationTree', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'specializationTree': specializationTree, 'specialization': specialization});
				specialization = applyVersionUpdate(version, 'specialization', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'specializationTree': specializationTree, 'specialization': specialization});
				var specializationCode = numToUrlCode4((specialization << 4) + specializationTree);
				data[i] = specializationCode[0];
				data[i + 1] = specializationCode[1];
				data[i + 2] = specializationCode[2];
				data[i + 3] = specializationCode[3];
				if (finalVersion)
				{
					var num = pos - 26;
					if (num == 1)
					{
						specializationMasteryId = specializationTree;
					}
					else
					{
						setSpecializationTree(num, (specializationTree == 0) ? 0 : specializationTree + 8);
					}
					setSpecialization(num, specialization);
				}
				inc = 4;
				inc = applyVersionUpdate(version, 'inc', {'type': 'specialization', 'pos': pos, 'i': i, 'inc': inc, 'code1': code1, 'code2': code2, 'code3': code3, 'code4': code4, 'archetype': archetype, 'specializationTree': specializationTree, 'specialization': specialization});
				break;
			case 30: // role - not going to bother adding this to the version updater
				if (finalVersion)
				{
					setRole(urlCodeToNum(data[i]));
				}
				inc = 1;
				break;
			case 31: // devices.  not bothering with the version updater here because it won't be necessary
			case 32:
			case 33:
			case 34:
			case 35:
				if (finalVersion)
				{
					var num = pos - 30;
					setDevice(num, urlCodeToNum2(data[i] + data[i + 1]));
				}
				inc = 2;
				break;
			}
			i += inc;
			pos++;
		}
		if (finalVersion)
		{
			setSpecializationMastery(specializationMasteryId);
			validatePowers();
			if (PH.archetype.id > 1) setArchetype(PH.archetype.id);
		}
		// loop until all version updates have been applied
		version++;
	}
}
window['parseUrlParams'] = parseUrlParams;

// change updates
function changeUpdate()
{
	setTitle();
	updateAdvantagePoints();
	buildLink(false);
}
window['changeUpdate'] = changeUpdate;

// set page title
function setTitle()
{
	//var title = siteName + ': ' + PH.namee;
	//if (PH.namee == "") title = siteName;
	var title = app.system.siteName + (PH.name != "" ? ": " + PH.name : "");
	if (document.title != title) document.title = title;
}
window['setTitle'] = setTitle;

// update advantage points used
function updateAdvantagePoints()
{
	var field = document.getElementById('advantagePoints');
	field.innerHTML = statAdvantagePoints + ' / ' + maxAdvantagePointsTotal;
}
window['updateAdvantagePoints'] = updateAdvantagePoints;

// // add bookmark
// function addBookmark(name, url) {
//     if (window.sidebar) window.sidebar.addPanel(name, url, '');
//     else if (window.external && ('AddFavorite' in window.external)) window.external.AddFavorite(url, name);
// }
// window['addBookmark'] = addBookmark;

// update build url
var prevBuildLink;

function buildLink(submit)
{
	var field = document.getElementById('buildLink');
	//var fieldBookmark = document.getElementById('buildLinkBookmark');
	var fieldRef = document.getElementById('buildLinkRef');
	var base = window.location.href.replace(/\?.*$/, '');
	//var link = '?v=' + PH.version + '&n=' + encodeURIComponent(PH.name) + '&a=' + PH.archetype.id + '&d=';
	var link = '?v=' + PH.version + '&n=' + encodeURIComponent(PH.name) + '&d=';
	if (submit) queueAnalytics(app.system.analytics.build, 'Version', PH.version);
	if (submit && PH.name != '') queueAnalytics(app.system.analytics.build, 'Name', PH.name);
	var params = [];
	params.push(Aesica.dataHarness.Archetype.code(PH.archetype));
	if (submit && PH.archetype.id > 0) queueAnalytics(app.system.analytics.build, 'Archtype', PH.archetype.name);
	for (var i = 1; i < PH.superStat.length; i++)
	{
		params.push(Aesica.dataHarness.SuperStat.code(PH.superStat[i]));
		if (submit && PH.superStat[i].id > 0) queueAnalytics(app.system.analytics.build, 'SuperStat', PH.superStat[i].name);
	}
	for (var i = 1; i < PH.innateTalent.length; i++)
	{
		params.push(Aesica.dataHarness.InnateTalent.code(PH.innateTalent[i]));
		if (submit && PH.innateTalent[i].id > 0) queueAnalytics(app.system.analytics.build, 'InnateTalent', PH.innateTalent[i].name);
	}
	for (var i = 1; i < PH.talent.length; i++)
	{
		params.push(Aesica.dataHarness.Talent.code(PH.talent[i]));
		if (submit && PH.talent[i].id > 0) queueAnalytics(app.system.analytics.build, 'Talent', PH.talent[i].name);
	}
	for (var i = 1; i < PH.travelPower.length; i++)
	{
		params.push(PH.travelPower[i].code());
		params.push(numToUrlCode(PH.travelPowerAdvantage[i] >> 1));
		if (submit && PH.travelPower[i].id > 0)
		{
			queueAnalytics(app.system.analytics.build, 'TravelPower', PH.travelPower[i].name);
			var advantageList = PH.travelPower[i].getAdvantageList(PH.travelPowerAdvantage[i]);
			for (var j = 0; j < advantageList.length; j++)
			{
				queueAnalytics(app.system.analytics.build, 'TravelPowerAdvantage', PH.travelPower[i].name + ': ' + advantageList[j].name);
			}
		}
	}
	for (var i = 1; i < PH.power.length; i++)
	{
		params.push(PH.power[i].code());
		params.push(numToUrlCode2(PH.powerAdvantage[i] >> 1));
		if (submit && PH.power[i].id > 0)
		{
			queueAnalytics(app.system.analytics.build, 'Power', PH.power[i].name);
			var advantageList = PH.power[i].getAdvantageList(PH.powerAdvantage[i]);
			for (var j = 0; j < advantageList.length; j++)
			{
				queueAnalytics(app.system.analytics.build, 'PowerAdvantage', PH.power[i].name + ': ' + advantageList[j].name);
			}
		}
	}
	for (var i = 1; i < PH.specializationTree.length - 1; i++)
	{
		if (i == 1)
		{
			var specializationMasteryId = getSpecializationMasteryId(PH.specializationTree[4].id);
			params.push(numToUrlCode4(specializationMasteryId | (PH.specialization[1] << 4)));
			if (submit && specializationMasteryId > 0 && PH.specializationTree[specializationMasteryId].id > 0)
				queueAnalytics(app.system.analytics.build, 'SpecializationMastery', PH.specializationTree[specializationMasteryId].name);
		}
		else
		{
			params.push(numToUrlCode4(((PH.specializationTree[i].id == 0) ? 0 : PH.specializationTree[i].id - 8) | (PH.specialization[i] << 4)));
		}
		if (submit)
		{
			var specializationList = PH.specializationTree[i].specializationList;
			var specializationPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(PH.specializationTree[i], PH.specialization[i]);
			for (var j = 0; j < specializationList.length; j++)
			{
				if (specializationPointList[j] > 0)
					queueAnalytics(app.system.analytics.build, 'Specialization', PH.specializationTree[i].name + ': ' + specializationList[j].name, specializationPointList[j]);
			}
		}
	}

	var i, iLength = PH.device.length;
	params.push(Aesica.dataHarness.ArchetypeGroup.code(PH.role));
	for (i = 1; i < iLength; i++)// xxxx
	{
		params.push(Aesica.dataHarness.Device.code(PH.device[i]));
	}
	var data = params.join('');
	if (submit) submitAnalytics(app.system.analytics.build, 'Data', data);
	link += data;
	link += "&e=" + Aesica.HCEngine.urlSafeBtoa(PH.buildNote);
	PH.buildLinkRef = link;
	PH.buildLink = app.system.siteUrl + link;
	//var name = PH.name;
	//if (name == '') name = 'Hero';
	//name = siteName + ': ' + name;
	var url = base + link;
	field.href = url;
	//field.setAttribute('onclick', 'return submitBuild()');
	//field.innerHTML = name;
	////fieldBookmark.setAttribute('onclick', 'addBookmark(\'' + name + '\',\'' + url + '\')');
	//fieldRef.innerHTML = url;
	fieldRef.value = url;

	// restore previous build--I don't think this ever worked properly, so I'm just removing it.
/*
   if (prevBuildLink != undefined) AES.saveData("buildLink", prevBuildLink);
   prevBuildLink = url;
   var restore = document.getElementById('restorePrevBuild');
   if (AES.loadData("buildLink") == undefined) restore.style.display = "none";
   else restore.style.display = "";
 */
}
window['buildLink'] = buildLink;

// auto-highlight link in textfield if clicked
function autoHighlight(elementID)
{
	document.getElementById(elementID).focus();
	document.getElementById(elementID).select();
}

//window['autoHighlight'] = autoHighlight;

// restore previous build (if saved to cookie)
function restorePrevBuild()
{
	var url = Aesica.HCEngine.loadData("buildLink");
	if (url != undefined) window.open(url, '_self');
}
window['restorePrevBuild'] = restorePrevBuild;

// submit build to google analytics
function submitBuild()
{
	buildLink(true);
	return true;
}
window['submitBuild'] = submitBuild;

// generate forum newlines
function forumNewline(type)
{
	var result = "\n";
	switch (type)
	{
		case 0:
			break;
		case 1:
			result = "<br />" + result;
			break;
		case 2:
		case 3:
		case 4:
			break;
	}
	return result;
}

function forumHeader(type, text, isBold = true)
{
	var result = '';

	switch (type)
	{
		case 0: 
			result += text;
			break;
		case 1:
			result += '<span class="forumHeader">' + text + '</span>';
			break;
		case 2:
			result += (isBold ? '<b><u>' : '') + text + (isBold ? '</u></b>' : '');
			break;
		case 3:
			result += (isBold ? '[b][u]' : '') + text + (isBold ? '[/u][/b]' : '');
			break;
		case 4:
			result += (isBold ? '__**' : '') + text + (isBold ? '**__' : '');
			break;
	}
	result += forumNewline(type);
	return result;
}

// generate forum entries
function forumEntry(type, first, second, third)
{
	var result = '';
	switch (type)
	{
		case 0:
			result += first;
			if (second)
			{
				result += ' ' + second;
				if (third)
				{
					result += ' ' + third;
				}
			}
			break;
		case 1:
			result += '<span class="forumFirst">' + first + '</span>';
			if (second)
			{
				result += ' <span class="forumSecond">' + second + '</span>';
				if (third)
				{
					result += ' <span class="forumThird">' + third + '</span>';
				}
			}
			break;
		case 2:
			result += first;
			if (second)
			{
				result += ' <b>' + second + '</b>';
				if (third)
				{
					result += ' <font size="-1"><i>' + third + '</i></font>';
				}
			}
			break;
		case 3:
			result += first;
			if (second)
			{
				result += ' [b]' + second + '[/b]';
				if (third)
				{
					result += ' [i]' + third + '[/i]';
				}
			}
			break;
		case 4:
			result += first;
			if (second)
			{
				result += ' **' + second + '**';
				if (third)
				{
					result += ' *' + third + '*';
				}
			}
			break;
	}
	result += forumNewline(type);
	return result;
}
window['forumEntry'] = forumEntry;

function forumAdvantageText(type, num, mask)
{
	var result = advantageText(type, num, mask);
	if (result == '(advantages)') result = '';
	return result;
}
window['forumAdvantageText'] = forumAdvantageText;

function forumName(name)
{
	var result = name;
	if (result == 'Clear') result = '';
	return result;
}
window['forumName'] = forumName;

function forumTalentStatText(statText)
{
	var sReturn = statText;
	if (sReturn != '' && sReturn != 'Clear') sReturn = '(' + sReturn + ')';
	return sReturn;
}

// forum preview
function forumPreview()
{
	document.getElementById("forumPreview").innerHTML = getExportString(1);
}
window['forumPreview'] = forumPreview;

// forum export
function setForumExportType(forumType)
{
	prefs.forumExportType = forumType;
	saveSettings();
}
window['setForumExportType'] = setForumExportType;

function selectForumExportType(forumType)
{
	document.getElementById('exportType_' + prefs.forumExportType).setAttribute('class', 'button');
	setForumExportType(forumType);
	document.getElementById('exportType_' + prefs.forumExportType).setAttribute('class', 'selectedButton');
	showView('Export');
}
window['selectForumExportType'] = selectForumExportType;

function getExportString(forumTypeNum)
{
	var result = [];
	var buildName = (PH.name == "") ? "(Unnamed Build)" : PH.name;

	switch (forumTypeNum)
	{
		case 0: 
			result.push(buildName + " - " + PH.archetype.name + " (" + PH.role.name + ")" + forumNewline(forumTypeNum) + forumNewline(forumTypeNum));
			result.push("Link to this build: " + PH.buildLink + forumNewline(forumTypeNum));
			break;
		case 1:
			result.push("<a class='forumLink' href='" + PH.buildLink + "'>" + buildName + " - " + PH.archetype.name + "</a> <span class='forumThird'>(" + PH.role.name + ")</span>"  + forumNewline(forumTypeNum));
			break;
		case 2:
			result.push("<b><u><a href='" + PH.buildLink + "'>" + buildName + " - " + PH.archetype.name + "</a></u></b> <i>(" + PH.role.name + ")</i>"  + forumNewline(forumTypeNum));
			break;
		case 3:
			result.push("[b][u][url=" + PH.buildLink + "]" + PH.name + "[/url][/u][/b] [i]" + PH.role.name + "[/i]" + forumNewline(forumTypeNum));
			break;
		case 4:
			result.push("__**" + buildName + " - " + PH.archetype.name + "**__ *(" + PH.role.name +")*" + forumNewline(forumTypeNum) + forumNewline(forumTypeNum));
			result.push("Link to this build: __" + PH.buildLink + "__" + forumNewline(forumTypeNum));
			break;
	}
	result.push("v" + app.version + ":" + HCData.version + forumNewline(forumTypeNum));
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, "Super Stats"));
	result.push(forumEntry(forumTypeNum, "Level 6:", forumName(PH.superStat[1].name), "(Primary)"));
	result.push(forumEntry(forumTypeNum, "Level 10:", forumName(PH.superStat[2].name), "(Secondary)"));
	result.push(forumEntry(forumTypeNum, "Level 15:", forumName(PH.superStat[3].name), "(Secondary)"));
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, "Talents"));
	result.push(forumEntry(forumTypeNum, "Level 1:", forumName(PH.innateTalent[1].name), forumTalentStatText(Aesica.dataHarness.InnateTalent.extra(PH.innateTalent[1]))));
	if (PH.archetype.id > 1)
	{
		result.push(forumEntry(forumTypeNum, "Level 7:", forumName(PH.talent[1].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[1]))));
		result.push(forumEntry(forumTypeNum, "Level 12:", forumName(PH.talent[2].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[2]))));
		result.push(forumEntry(forumTypeNum, "Level 15:", forumName(PH.talent[3].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[3]))));
		result.push(forumEntry(forumTypeNum, "Level 20:", forumName(PH.talent[4].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[4]))));
		result.push(forumEntry(forumTypeNum, "Level 25:", forumName(PH.talent[5].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[5]))));
		result.push(forumEntry(forumTypeNum, "Level 30:", forumName(PH.talent[6].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[6]))));
		result.push(forumNewline(forumTypeNum));
	}
	else
	{
		result.push(forumEntry(forumTypeNum, "Level 6:", forumName(PH.talent[1].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[1]))));
		result.push(forumEntry(forumTypeNum, "Level 9:", forumName(PH.talent[2].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[2]))));
		result.push(forumEntry(forumTypeNum, "Level 12:", forumName(PH.talent[3].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[3]))));
		result.push(forumEntry(forumTypeNum, "Level 15:", forumName(PH.talent[4].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[4]))));
		result.push(forumEntry(forumTypeNum, "Level 18:", forumName(PH.talent[5].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[5]))));
		result.push(forumEntry(forumTypeNum, "Level 21:", forumName(PH.talent[6].name), forumTalentStatText(Aesica.dataHarness.Talent.extra(PH.talent[6]))));
		result.push(forumNewline(forumTypeNum));
	}
	result.push(forumHeader(forumTypeNum, "Powers"));
	result.push(forumEntry(forumTypeNum, "Level 1:", forumName(PH.power[1].name), forumAdvantageText(1, 1, PH.powerAdvantage[1])));
	result.push(forumEntry(forumTypeNum, "Level 1:", forumName(PH.power[2].name), forumAdvantageText(1, 2, PH.powerAdvantage[2])));
	result.push(forumEntry(forumTypeNum, "Level 6:", forumName(PH.power[3].name), forumAdvantageText(1, 3, PH.powerAdvantage[3])));
	result.push(forumEntry(forumTypeNum, "Level 8:", forumName(PH.power[4].name), forumAdvantageText(1, 4, PH.powerAdvantage[4])));
	result.push(forumEntry(forumTypeNum, "Level 11:", forumName(PH.power[5].name), forumAdvantageText(1, 5, PH.powerAdvantage[5])));
	result.push(forumEntry(forumTypeNum, "Level 14:", forumName(PH.power[6].name), forumAdvantageText(1, 6, PH.powerAdvantage[6])));
	result.push(forumEntry(forumTypeNum, "Level 17:", forumName(PH.power[7].name), forumAdvantageText(1, 7, PH.powerAdvantage[7])));
	if (PH.archetype.id > 1)
	{
		result.push(forumEntry(forumTypeNum, "Level 21:", forumName(PH.power[8].name), forumAdvantageText(1, 8, PH.powerAdvantage[8])));
		result.push(forumEntry(forumTypeNum, "Level 25:", forumName(PH.power[9].name), forumAdvantageText(1, 9, PH.powerAdvantage[9])));
		result.push(forumEntry(forumTypeNum, "Level 30:", forumName(PH.power[10].name), forumAdvantageText(1, 10, PH.powerAdvantage[10])));
		result.push(forumEntry(forumTypeNum, "Level 35:", forumName(PH.power[11].name), forumAdvantageText(1, 11, PH.powerAdvantage[11])));
		result.push(forumEntry(forumTypeNum, "Level 40:", forumName(PH.power[12].name), forumAdvantageText(1, 12, PH.powerAdvantage[12])));
	}
	else
	{
		result.push(forumEntry(forumTypeNum, "Level 20:", forumName(PH.power[8].name), forumAdvantageText(1, 8, PH.powerAdvantage[8])));
		result.push(forumEntry(forumTypeNum, "Level 23:", forumName(PH.power[9].name), forumAdvantageText(1, 9, PH.powerAdvantage[9])));
		result.push(forumEntry(forumTypeNum, "Level 26:", forumName(PH.power[10].name), forumAdvantageText(1, 10, PH.powerAdvantage[10])));
		result.push(forumEntry(forumTypeNum, "Level 29:", forumName(PH.power[11].name), forumAdvantageText(1, 11, PH.powerAdvantage[11])));
		result.push(forumEntry(forumTypeNum, "Level 32:", forumName(PH.power[12].name), forumAdvantageText(1, 12, PH.powerAdvantage[12])));
		result.push(forumEntry(forumTypeNum, "Level 35:", forumName(PH.power[13].name), forumAdvantageText(1, 13, PH.powerAdvantage[13])));
		result.push(forumEntry(forumTypeNum, "Level 38:", forumName(PH.power[14].name), forumAdvantageText(1, 14, PH.powerAdvantage[14])));
	}

	result.push(forumEntry(forumTypeNum, "Adv. Points:", statAdvantagePoints + "/" + maxAdvantagePointsTotal));
	result.push(forumNewline(forumTypeNum));

	result.push(forumHeader(forumTypeNum, "Travel Powers"));
	result.push(forumEntry(forumTypeNum, "Level 6:", forumName(PH.travelPower[1].name), forumAdvantageText(2, 1, PH.travelPowerAdvantage[1])));
	result.push(forumEntry(forumTypeNum, "Level 35:", forumName(PH.travelPower[2].name), forumAdvantageText(2, 2, PH.travelPowerAdvantage[2])));
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, "Specializations"));
	for (var i = 1; i <= 3; i++)
	{
		var specializationTree = PH.specializationTree[i];
		var mask = PH.specialization[i];
		var specializationList = specializationTree.specializationList;
		var specializationPointList = Aesica.dataHarness.SpecializationTree.getSpecializationList(specializationTree, mask);
		for (var j = 0; j < specializationList.length - 1; j++)
		{
			if (specializationPointList[j] > 0)
			{
				result.push(forumEntry(forumTypeNum, specializationTree.name + ":", forumName(specializationList[j].name), "(" + specializationPointList[j] + "/" + specializationList[j].maxPoints + ")"));
			}
		}
	}
	if (PH.specializationTree[4].id != 0)
	{
		result.push(forumEntry(forumTypeNum, "Mastery:", forumName(PH.specializationTree[4].name) + " Mastery", "(1/1)"));
	}
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, "Devices"));
	for (var i = 1; i < PH.device.length; i++)
	{
		if (PH.device[i].id > 0) result.push(forumEntry(forumTypeNum, "Slot " + i + ": ", forumName(PH.device[i].name)));
	}
	if (PH.buildNote != "" && PH.buildNote)
	{
		result.push(forumNewline(forumTypeNum));
		result.push(forumHeader(forumTypeNum, "Additional Notes:"));
		result.push(PH.buildNote);
	}
	
	return result.join("");
}

function forumExport()
{
	var forumType = Aesica.HCEngine.loadData("forumType");
	var forumTypeNum;
	if (forumType == undefined) forumType = prefs.forumExportType;
	if (forumType == "co") forumType = "phpbbs";										// patch for deprecated CO forums formatting
	if (forumType == "codeprecated") forumTypeNum = app.system.export.type.htmlForum;	// html <b><font color="#ff0000">Bold Red</font></b> no linebreaks
	else if (forumType == "txt") forumTypeNum = app.system.export.type.none;			// plain text
	else if (forumType == "phpbbs") forumTypeNum = app.system.export.type.bbcode;		// phpbb [b][color=#ff0000]Bold Red[/color][/b]
	else if (forumType == "markdown") forumTypeNum = app.system.export.type.markdown;	// markdown **bold**
	else if (forumType == "html") forumTypeNum = app.system.export.type.html;			// html with line breaks <b><font color="#ff0000">Bold Red</font></b><br />
	else forumTypeNum = app.system.export.type.none;
	document.getElementById("exportType_" + forumType).className = "selectedButton";
	var forumText = document.getElementById("forumText");
	setForumExportType(forumType);

	forumText.innerHTML = getExportString(forumTypeNum);
}
window['forumExport'] = forumExport;

// preferences
function setPrefFontFamily(fontFamily)
{
	prefs.fontFamily = fontFamily;
	selectClearHideSections();
	saveSettings();
	updateSettingsDisplay();
	//submitAnalytics(app.system.analytics.pref, 'PrefFontFamily', fontFamily);
}
window['setPrefFontFamily'] = setPrefFontFamily;

function selectPrefFontFamily()
{
	var i, mFont, mTable, mTr, mTd
	var aTRList = [];
	var iCurrentColumn = 0;
	var iColumnCount = Math.floor(app.system.font.familyList.length / app.system.font.perColumn) + 1;
	if (iColumnCount > app.system.font.maxColumns) iColumnCount = app.system.font.maxColumns;
	var iLength = app.system.font.familyList.length;
	if (iLength > app.system.font.maxColumns * app.system.font.perColumn) iLength = app.system.font.maxColumns * app.system.font.perColumn;

	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Select Preset");

	mTable = document.createElement("table");
	Aesica.HCEngine.addItemToDialogBox(mTable);

	for (i = 0; i < iLength; i++)
	{
		iCurrentColumn = Math.floor(i / app.system.font.perColumn);
		mFont = document.createElement("a");
		mFont.setAttribute("id", "selectPrefFontFamily" + i);
		//mFont.setAttribute("onclick", "setPrefFontFamily('" + app.system.font.familyList[i] + "')");
		mFont.setAttribute("style", "display: block; margin-right: 1em; font-family: " + app.system.font.familyList[i]);
		mFont.innerHTML = app.system.font.familyList[i];
		(function(i){ mFont.addEventListener("click", (function(){ setPrefFontFamily(app.system.font.familyList[i]); })); })(i);
		

		if (iCurrentColumn == 0)
		{
			mTr = document.createElement("tr");
			aTRList.push(mTr);
			mTable.appendChild(mTr);
		}

		mTr = aTRList[i % app.system.font.perColumn];
		mTd = document.createElement("td");
		mTr.appendChild(mTd);
		mTd.appendChild(mFont);
	}
	showPositionSection("selectionWindow", true);
}
window['selectPrefFontFamily'] = selectPrefFontFamily;

function setPrefFontSize(fontSize)
{
	if (fontSize > 0)
	{
		prefs.fontSize = fontSize;
		saveSettings();
		updateSettingsDisplay();
	}
	else
	{
		console.log("Font size cannot be set to 0 or below.")
	}
	//submitAnalytics(analyticsPrefCatagory, 'PrefFontSize', fontSize);
}
window['setPrefFontSize'] = setPrefFontSize;

function selectPrefFontSize(change)
{
	setPrefFontSize(prefs.fontSize + change * 10);
}
window['selectPrefFontSize'] = selectPrefFontSize;

function setPrefPopupTips(popupTips)
{
	prefs.popupTips = popupTips;
	prefs.confirmSelections = (popupTips == 0) ? true : false;
	saveSettings();
	updateSettingsDisplay();
	//submitAnalytics(analyticsPrefCatagory, 'PrefPopupTips', app.system.popupTipList[popupTips]);
}
window['setPrefPopupTips'] = setPrefPopupTips;

function selectPrefPopupTips()
{
	setPrefPopupTips((prefs.popupTips + 1) % app.system.popupTipList.length);
}
window['selectPrefPopupTips'] = selectPrefPopupTips;

function selectPrefIconSize()
{
	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Icon Size");
	Aesica.HCEngine.addItemToDialogBoxMenu(document.createElement("br"));
	var mLabel = document.createElement("span");
	mLabel.innerHTML = "Icon Size: ";
	Aesica.HCEngine.addItemToDialogBoxMenu(mLabel);
	var mWidth = document.createElement("input");
	mWidth.placeholder = "width";
	mWidth.maxLength = 3;
	mWidth.id = "prefIconWidth";
	mWidth.size = 3;
	mWidth.value = prefs.iconWidth;
	Aesica.HCEngine.addItemToDialogBoxMenu(mWidth);
	var mSpan = document.createElement("span");
	mSpan.innerHTML = " x ";
	Aesica.HCEngine.addItemToDialogBoxMenu(mSpan);
	var mHeight = document.createElement("input");
	mHeight.placeholder = "width";
	mHeight.maxLength = 3;
	mHeight.id = "prefIconHeight";
	mHeight.size = 3;
	mHeight.value = prefs.iconHeight;
	Aesica.HCEngine.addItemToDialogBoxMenu(mHeight);
	var mText = document.createElement("p");
	mText.className = "note";
	mText.innerHTML = "* A page refresh is required before this setting can be properly applied.";
	Aesica.HCEngine.addItemToDialogBoxMenu(mText);
	var mConfirm = Aesica.HCEngine.createButton("Apply & Refresh", null, "selectConfirmButton", (function()
	{
		var iNewWidth = parseInt(document.getElementById("prefIconWidth").value);
		var iNewHeight = parseInt(document.getElementById("prefIconHeight").value);
		if (!isNaN(iNewWidth) && iNewWidth > 0) prefs.iconWidth = iNewWidth;
		if (!isNaN(iNewHeight) && iNewHeight > 0) prefs.iconHeight = iNewHeight;
		saveSettings();
		window.location.href = PH.buildLink;
	}));
	Aesica.HCEngine.addItemToDialogBox(mConfirm);
	showPositionSection("selectionWindow", true);
}

function selectPrefIconSizeAT()
{
	Aesica.HCEngine.resetDialogBox();
	Aesica.HCEngine.setDialogBoxHeader("Archetype Icon Size");
	Aesica.HCEngine.addItemToDialogBoxMenu(document.createElement("br"));
	var mLabel = document.createElement("span");
	mLabel.innerHTML = "Icon Size: ";
	Aesica.HCEngine.addItemToDialogBoxMenu(mLabel);
	var mWidth = document.createElement("input");
	mWidth.placeholder = "width";
	mWidth.maxLength = 3;
	mWidth.id = "prefIconWidthAT";
	mWidth.size = 3;
	mWidth.value = prefs.iconWidthAT;
	Aesica.HCEngine.addItemToDialogBoxMenu(mWidth);
	var mSpan = document.createElement("span");
	mSpan.innerHTML = " x ";
	Aesica.HCEngine.addItemToDialogBoxMenu(mSpan);
	var mHeight = document.createElement("input");
	mHeight.placeholder = "width";
	mHeight.maxLength = 3;
	mHeight.id = "prefIconHeightAT";
	mHeight.size = 3;
	mHeight.value = prefs.iconHeightAT;
	Aesica.HCEngine.addItemToDialogBoxMenu(mHeight);
	var mText = document.createElement("p");
	mText.className = "note";
	mText.innerHTML = "* A page refresh is required before this setting can be properly applied.";
	Aesica.HCEngine.addItemToDialogBoxMenu(mText);
	var mConfirm = Aesica.HCEngine.createButton("Apply & Refresh", null, "selectConfirmButton", (function()
	{
		var iNewWidth = parseInt(document.getElementById("prefIconWidthAT").value);
		var iNewHeight = parseInt(document.getElementById("prefIconHeightAT").value);
		if (!isNaN(iNewWidth) && iNewWidth > 0) prefs.iconWidthAT = iNewWidth;
		if (!isNaN(iNewHeight) && iNewHeight > 0) prefs.iconHeightAT = iNewHeight;
		saveSettings();
		window.location.href = PH.buildLink;
	}));
	Aesica.HCEngine.addItemToDialogBox(mConfirm);
	showPositionSection("selectionWindow", true);
}

function setPrefIconSize(width, height)
{
	prefIconWidth = width;
	prefIconHeight = height;
	saveSettings();
	updateSettingsDisplay();
}

function setPrefIconSizeAT(width, height)
{
	prefIconWidthAT = width;
	prefIconHeightAT = height;
	saveSettings();
	updateSettingsDisplay();
}

function selectResetPrefDefaults()
{
	prefs = app.system.defaultSettings;
	saveSettings();
	window.location.href = PH.buildLink;
}

function saveSettings()
{
	Aesica.HCEngine.saveData(app.system.settingsLabel, JSON.stringify(prefs));
}

function updateSettingsDisplay()
{
	document.body.style.fontFamily = prefs.fontFamily;
	document.body.style.fontSize = prefs.fontSize + '%';
	document.getElementById("prefFontFamilyName").innerHTML = prefs.fontFamily;
	document.getElementById("prefFontSize").innerHTML = prefs.fontSize + "%";
	document.getElementById("prefPopupTipsValue").innerHTML = app.system.popupTipList[prefs.popupTips];
	document.getElementById("prefIconSize").innerHTML = prefs.iconWidth + " x " + prefs.iconHeight;
	document.getElementById("prefIconSizeAT").innerHTML = prefs.iconWidthAT + " x " + prefs.iconHeightAT;
}
/*
function setPrefConfirmSelections(confirmSelections)
{
	
	prefConfirmSelections = confirmSelections;
	AES.saveData("prefConfirmSelections", confirmSelections);
	document.getElementById('prefConfirmSelectionsValue').innerHTML = (confirmSelections ? 'On' : 'Off');
	//submitAnalytics(analyticsPrefCatagory, 'PrefConfirmSelections', (confirmSelections ? 'On' : 'Off'));
}
window['setPrefConfirmSelections'] = setPrefConfirmSelections;

function selectPrefConfirmSelections()
{
	setPrefConfirmSelections(!prefConfirmSelections);
}
window['selectPrefConfirmSelections'] = selectPrefConfirmSelections;
*/

function setPrefDebugMode(confirmDebug)
{
	prefs.debug = confirmDebug > 0;
	saveSettings();
}

function setPrefAnalytics(analytics)
{
	/*
	if (prefs.analytics && !analytics) submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', 'Off');
	prefs.analytics = analytics;
	AES.saveData("prefAnalytics", analytics);
	document.getElementById('prefAnalyticsValue').innerHTML = (analytics ? 'On' : 'Off');
	submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', (analytics ? 'On' : 'Off'));
	if (prefs.analytics && analytics) submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', 'On');
	*/
}
window['setPrefAnalytics'] = setPrefAnalytics;

function selectPrefAnalytics()
{
	setPrefAnalytics(!prefs.analytics);
}
window['selectPrefAnalytics'] = selectPrefAnalytics;

// show views
function showView(view)
{
	var section = document.getElementById('view' + view);
	document.getElementById('viewEdit').style.display = 'none';
	document.getElementById('viewData').style.display = 'none';
	document.getElementById('viewReference').style.display = 'none';
	document.getElementById('viewPreview').style.display = 'none';
	document.getElementById('viewExport').style.display = 'none';
	document.getElementById('viewPrefs').style.display = 'none';
	document.getElementById('viewHelp').style.display = 'none';
	document.getElementById('viewAbout').style.display = 'none';
	document.getElementById('viewDebug').style.display = 'none';
	section.style.display = '';
	var showLink = document.getElementById('showView' + view);
	document.getElementById('showViewEdit').href.onclick = '';
	document.getElementById('showViewEdit').setAttribute('class', 'button');
	document.getElementById('showViewData').href.onclick = '';
	document.getElementById('showViewData').setAttribute('class', 'button');
	document.getElementById('showViewReference').href.onclick = '';
	document.getElementById('showViewReference').setAttribute('class', 'button');
	document.getElementById('showViewPreview').href.onclick = '';
	document.getElementById('showViewPreview').setAttribute('class', 'button');
	document.getElementById('showViewExport').href.onclick = '';
	document.getElementById('showViewExport').setAttribute('class', 'button');
	document.getElementById('showViewPrefs').href.onclick = '';
	document.getElementById('showViewPrefs').setAttribute('class', 'button');
	document.getElementById('showViewHelp').href.onclick = '';
	document.getElementById('showViewHelp').setAttribute('class', 'button');
	document.getElementById('showViewAbout').href.onclick = '';
	document.getElementById('showViewAbout').setAttribute('class', 'button');
	document.getElementById('showViewDebug').href.onclick = '';
	document.getElementById('showViewDebug').setAttribute('class', 'button');
	showLink.setAttribute('class', 'selectedButton');
	showLink.href.onclick = 'return false;';
	if (view == 'Preview')
	{
		forumPreview();
	}
	if (view == 'Export')
	{
		forumExport();
	}
}
window['showView'] = showView;

// data dump
/* nope, goodbye~
function dataDump()
{
	var win = window.open('', 'Data Dump');
	win.document.write('<h3><a onclick="document.getElementById(\'super-stat\').scrollIntoView();">Super Stat Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'innate-talent\').scrollIntoView();">Innate Talent Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'talent\').scrollIntoView();">Talent Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'travel-power\').scrollIntoView();">Travel Power Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'power-set\').scrollIntoView();">Power Set Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'framework\').scrollIntoView();">Framework Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'power\').scrollIntoView();">Power Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'archetype-group\').scrollIntoView();">Archetype Group Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'archetype\').scrollIntoView();">Archetype Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'specialization-tree\').scrollIntoView();">Specialization Tree Data</a></h3>');
	win.document.write('<h3><a onclick="document.getElementById(\'version-update\').scrollIntoView();">Version Update Data</a></h3>');
	win.document.write('<hr>');
	win.document.write('<h2 id="super-stat">Super Stat Data</h3>');
	for (var i = 0; i < HCData.superStat.length; i++)
	{
		win.document.write('<b>dataSuperStat[' + i + ']</b> = ' + JSON.stringify(HCData.superStat[i]) + '<br />');
	}
	win.document.write('</table><hr>');
	win.document.write('<h2 id="innate-talent">Innate Talent Data</h3>');
	for (var i = 0; i < HCData.innateTalent.length; i++)
	{
		win.document.write('<b>dataInnateTalent[' + i + ']</b> = ' + JSON.stringify(HCData.innateTalent) + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="talent">Talent Data</h3>');
	for (var i = 0; i < HCData.talent.length; i++)
	{
		win.document.write('<b>dataTalent[' + i + ']</b> = ' + JSON.stringify(HCData.talent) + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="travel-power">Travel Power Data</h3>');
	for (var i = 0; i < dataTravelPower.length; i++)
	{
		win.document.write('<b>dataTravelPower[' + i + ']</b> = ' + dataTravelPower[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="power-set">Power Set Data</h3>');
	for (var i = 0; i < dataPowerSet.length; i++)
	{
		win.document.write('<b>dataPowerSet[' + i + ']</b> = ' + dataPowerSet[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="framework">Framework Data</h3>');
	for (var i = 0; i < dataFramework.length; i++)
	{
		win.document.write('<b>dataFramework[' + i + ']</b> = ' + dataFramework[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="power">Power Data</h3>');
	for (var i = 0; i < dataPower.length; i++)
	{
		win.document.write('<b>dataPower[' + i + ']</b> = ' + dataPower[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="archetype-group">Archetype Group Data</h3>');
	for (var i = 0; i < HCData.archetypeGroup.length; i++)
	{
		win.document.write('<b>dataArchetypeGroup[' + i + ']</b> = ' + dataArchetypeGroup[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="archetype">Archetype Data</h3>');
	for (var i = 0; i < dataArchetype.length; i++)
	{
		win.document.write('<b>dataArchetype[' + i + ']</b> = ' + dataArchetype[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="specialization-tree">Specialization Tree Data</h3>');
	for (var i = 0; i < HCData.specializationTree.length; i++)
	{
		win.document.write('<b>dataSpecializationTree[' + i + ']</b> = ' + JSON.stringify(HCData.specializationTree[i]) + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="version-update">Version Update Data</h3>');
	for (var i = 0; i < dataVersionUpdate.length; i++)
	{
		win.document.write('<b>dataVersionUpdate[' + i + ']</b> = ' + dataVersionUpdate[i].toString() + '<br />');
	}
	win.focus();
}
window['dataDump'] = dataDump;*/

// coerce value to boolean
function coerceToBoolean(value, defaultBoolean)
{
	if (value === 'true' || value === 1) return true;
	if (value === 'false' || value === 0) return false;
	return defaultBoolean;
}

// setup preferences
function setupPrefs()
{
	var loadedPrefs;
	try
	{
		loadedPrefs = JSON.parse(Aesica.HCEngine.loadData(app.system.settingsLabel));
	}
	catch(e)
	{
		console.log("Settings not found.  Loading defaults.");
	}
	if (!loadedPrefs) prefs = app.system.defaultSettings;
	else prefs = loadedPrefs;
	saveSettings();
	updateSettingsDisplay();

	/*
	// font family
	var fontFamily = AES.loadData("prefFontFamily");
	if (fontFamily == undefined) fontFamily = prefs.fontFamily;
	setPrefFontFamily(fontFamily);
	// font size
	var fontSize = AES.loadData("prefFontSize");
	if (fontSize == undefined || isNaN(fontSize)) fontSize = prefs.fontSize;
	setPrefFontSize(parseInt(fontSize));
	// popup tips
	var popupTips = AES.loadData("prefPopupTips");
	if (popupTips == undefined || isNaN(popupTips)) popupTips = prefs.popupTips;
	else popupTips = parseInt(popupTips);
	setPrefPopupTips(popupTips);
	// confirm selections
	var confirmSelections = AES.loadData("prefConfirmSelections");
	if (confirmSelections == undefined) confirmSelections = prefs.confirmSelections;
	else confirmSelections = coerceToBoolean(confirmSelections, prefs.confirmSelections);
	// icon size
	var iconWidth = AES.loadData("prefIconWidth");
	var iconHeight = AES.loadData("prefIconHeight");
	if (iconWidth == undefined || isNaN(iconWidth)) iconWidth = prefIconWidth;
	else iconWidth = parseInt(iconWidth);
	if (iconHeight == undefined || isNaN(iconHeight)) iconHeight = prefIconHeight;
	else iconHeight = parseInt(iconHeight);
	setPrefIconSize(iconWidth, iconHeight);
	// at icon size
	var iconWidthAT = AES.loadData("prefIconWidthAT");// xxx
	var iconHeightAT = AES.loadData("prefIconHeightAT");
	if (iconWidthAT == undefined || isNaN(iconWidthAT)) iconWidthAT = prefIconWidthAT;
	else iconWidthAT = parseInt(iconWidthAT);
	if (iconHeightAT == undefined || isNaN(iconHeightAT)) iconHeightAT = prefIconHeightAT;
	else iconHeightAT = parseInt(iconHeightAT);
	setPrefIconSizeAT(iconWidthAT, iconHeightAT);
	//setPrefConfirmSelections(confirmSelections);
	// debug mode
	var debugMode = AES.loadData("prefDebugMode");
	if (debugMode == undefined) debugMode = debug;
	else debugMode = coerceToBoolean(debugMode, debug);
	setPrefDebugMode(debugMode);
*/
	// analytics - removed
/*
   var analytics = AES.loadData("prefAnalytics");
   if (analytics == undefined) analytics = prefs.analytics;
   else analytics = coerceToBoolean(analytics, prefs.analytics);
   setPrefAnalytics(analytics);
 */
}
window['setupPrefs'] = setupPrefs;

// alert message
function showAlertMessage()
{
	var alertMessageBox = document.getElementById("alertMessage");
	if (alertMessageBox)
	{
		if (HCData.alert)
		{
			alertMessageBox.innerHTML = (HCData.alert.message) ? HCData.alert.message : "";
			alertMessageBox.className = alertMessageBox.innerHTML != "" ? "alertMessage" : "hidden";
		}
		else alertMessageBox.className = "hidden";
	}
}

// start
function start()
{
	// setup preferences
	setupPrefs();

	// setup edit view
	Aesica.HCEngine.setupEditor();

	// setup header/footer
	document.getElementById('header').style.display = '';
	document.getElementById('footer').style.display = '';

	// show edit view
	showView('Edit');

	// setup version
	document.getElementById("releaseDate").innerHTML = app.releaseDate;
	document.getElementById("appVersion").innerHTML = app.version;
	document.getElementById("dataVersion").innerHTML = HCData.version;

	// setup name
	document.getElementById('fieldName').firstChild.data = PH.name;
	document.getElementById('sectionDisplayName').style.display = '';
	document.getElementById('editName').value = PH.name;
	document.getElementById('sectionEditName').style.display = 'none';
	setTitle();

	// setup archetype and role;
	setArchetype(1);
	setRole(1);

	// build lookup name tables
	Aesica.dataHarness.buildLookupTables();

	// parse url
	parseUrlParams(window.location.href);

	// change updates
	changeUpdate();

	// submit build to google analytics
	submitBuild();
	
	// setup saved data
	Aesica.HCEngine.refreshSaveList();
	if (Aesica.HCEngine.localStorageSupported()) Aesica.HCEngine.setUpSaveTools();

	// setup data reference stuffs
	Aesica.HCEngine.initReferenceSheet();

	// build lookup tables
	Aesica.HCEngine.buildLookupTables()

	// show debug stuff
	if (prefs.debug)
	{
		document.getElementById("showViewDebug").style.visibility = "visible";
		document.getElementById("titleDebugMode").innerHTML = "(Debug Mode)";
	}

	// show alert message if exists
	showAlertMessage(true)

	// all ready! <3
	Aesica.HCEngine.writeMessage("Ready", true);

}
window['start'] = start;

window.addEventListener("load", start);

//==============================================================================
// powerhouse.js ends here
//==============================================================================
