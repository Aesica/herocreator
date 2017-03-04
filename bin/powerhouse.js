/*==============================================================================
 * powerhouse.js
 *
 * PowerHouse Javascript
 *
 * Author: Kyle W T Sherman
 *
 * Time-stamp: <2016-02-17 22:55:12 (kyle)>
 *============================================================================*/

const EXPORT_TYPE_NONE = 0;
const EXPORT_TYPE_HTML = 1;
const EXPORT_TYPE_BBCODE = 2;
const EXPORT_TYPE_MARKDOWN = 3;

const SPECIALIZATION_NONE = 0;
const SPECIALIZATION_STAT = 1;
const SPECIALIZATION_ROLE1 = 2;
const SPECIALIZATION_ROLE2 = 3;
const SPECIALIZATION_MASTERY = 4;

var debug = false;
var appVersion = "2.1.0";
var releaseDate = "12/10/2016";
var buildVersion = 20;

var siteName = "HeroCreator 2";
var siteUrl = window.location.href.split("?")[0];
var mouseX = 0;
var mouseY = 0;
var clickableClasses = ["selection", "link"];

var analyticsPrefCatagory = 'Preference';
var analyticsSetCatagory = 'Set';
var analyticsBuildCatagory = 'Build';

// cookie variables with default values and other saved data parameters
var cookieExpireDays = 365;
var forumExportType = 'co';
var prefFontFamilyList = ["serif", "sans-serif", "Arial", "Comic Sans MS", "Courier New", "Franklin Gothic", "Georgia", "Lexia", "Lucida Console", "Segoe Print", "Segoe UI", "Times New Roman", "Trebuchet MS", "Verdana"];
var prefFontFamily = "Lexia";
var prefFontSize = 100;
var prefPopupTipsList = ["Off", "When Selecting", "On"];
var prefPopupTips = parseInt(2);
var prefConfirmSelections = false;
var prefAnalytics = false;
var iMaxSaveSlots = 100;

// Browser detection and browser specific things
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isFirefox = typeof InstallTrigger !== 'undefined';
// chromesucks and can't currently handle td 'width: 100%' for shit
var sAdvantageNameCellStyle = (isChrome) ? "min-width: 10em;" : "width: 100%;";

// colors and appearances
var titleColor = "#8844dd";
var linkColor = "#aaccee";
var previewEntryFontColor = "#88aaff";
var previewPowerFontColor = "#aaddff";
var previewAdvantageFontColor = "#8888bb";
var closeButtonColor = "#f33";
var exportTips = ["Plain text contains no special formatting.", "HTML is the formatting used by websites and some forums.<br /><br /><b>The official Champions Online forums use this for post formatting if you don't have the forum extension installed.</b>", "BBCode is a formatting system used by many forums based on Invision, phpBB, vBulletin, etc.<br /><br />If you're using the forum extension for Arc's Vanilla forums, use this instead of HTML.", "Markdown is a basic text formatting system used by Reddit, Discord, etc."];
var sClearButton = "Clear";
var sInsertButton = "Insert";
var sDeleteButton = "Delete";
var iPowerColumnCount = 2;
var iTravelPowerColumnCount = 3;
var iFontsPerColumn = 25;
var iMaxFontColumns = 5;
var iArchetypeRowSize = 7;

// other
var iSpecPointMax = 10;
var sMinusArrow = "<div class='Sprite minus' style='margin-left: 2em; margin-right: 0.7em;'></div>";
var sPlusArrow = "<div class='Sprite plus' style='margin-left: 0.7em; margin-right: 0.7em;'></div>";

// escape quotes
function escapeQuotes(str)
{
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

// set and get cookies
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

// encode number to url code
// valid number range is 0-61 (invalid numbers default to 0)
function numToUrlCode(num)
{
	var charCode = 0;
	if (num >= 0 && num <= 9) charCode = num + 48;
	else if (num >= 10 && num <= 35) charCode = num + 55;
	else if (num >= 36 && num <= 61) charCode = num + 61;
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
   if (prefAnalytics) {
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
   if (prefAnalytics) {
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
var dataSuperStat = getDataSuperStat();
var dataInnateTalent = getDataInnateTalent();
var dataTalent = getDataTalent();
var dataTravelPower = getDataTravelPower();
var dataPowerSet = getDataPowerSet();
var dataFramework = getDataFramework();
var dataPower = getDataPower();
var dataEnergyUnlockPower = getDataEnergyUnlockPower();
var dataArchetypeGroup = getDataArchetypeGroup();
var dataArchetype = getDataArchetype();
var dataSpecializationTree = getDataSpecializationTree();
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

// current power house character info
var phVersion = buildVersion;
var phName = '';
var phArchetype = dataArchetype[1];
var phSuperStat = [];
for (var i = 1; i <= 3; i++)
{
	phSuperStat[i] = dataSuperStat[0];
}
var phInnateTalent = Array();
for (var i = 1; i <= 1; i++)
{
	phInnateTalent[i] = dataInnateTalent[0];
}
var phTalent = [];
for (var i = 1; i <= 6; i++)
{
	phTalent[i] = dataTalent[0];
}
var phTravelPower = [];
for (var i = 1; i <= 2; i++)
{
	phTravelPower[i] = dataTravelPower[0];
}
var phTravelPowerAdvantage = [];
for (var i = 1; i <= 2; i++)
{
	phTravelPowerAdvantage[i] = 0;
}
var phPower = [];
for (var i = 1; i <= 14; i++)
{
	phPower[i] = dataPower[0];
}
var phPowerAdvantage = [];
for (var i = 1; i <= 14; i++)
{
	phPowerAdvantage[i] = 0;
}
var phSpecializationTree = [];
for (var i = 1; i <= 4; i++)
{
	phSpecializationTree[i] = dataSpecializationTree[0];
}
var phSpecialization = [];
for (var i = 1; i <= 4; i++)
{
	phSpecialization[i] = 0;
}
var phBuildLink = "";
var phBuildLinkRef = "";
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
	if (prefPopupTips >= 1)
	{
		popup(text);
	}
}
window['popupL1'] = popupL1;

function popupL2(text)
{
	if (prefPopupTips >= 2)
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

// function delayedPopup(text) {
//     return function() {
//         var field = this;
//         var delay = setTimeout(popup(text), 1000);
//         field.onmouseout = function() {
//             clearTimeout(delay);
//             popout();
//         };
//     }
// }
// window['delayedPopup'] = delayedPopup;
function setOnmouseoverPopupL1(field, text)
{
	if (text != null)
	{
		field.setAttribute('onmouseover', 'popupL1(\'' + text + '\')');
		field.setAttribute('onmouseout', 'popout()');
	}
	else
	{
		clearOnmouseoverPopup(field);
	}
}
window['setOnmouseoverPopupL1'] = setOnmouseoverPopupL1;

function setOnmouseoverPopupL2(field, text)
{
	if (text != null)
	{
		field.setAttribute('onmouseover', 'popupL2(\'' + text + '\')');
		field.setAttribute('onmouseout', 'popout()');
	}
	else
	{
		clearOnmouseoverPopup(field);
	}
}
window['setOnmouseoverPopupL2'] = setOnmouseoverPopupL2;

function clearOnmouseoverPopup(field)
{
	field.removeAttribute('onmouseover');
	field.removeAttribute('onmouseout');
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
	field.value = phName;
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
	phName = document.getElementById('editName').value;
	hideSection('sectionEditName');
	document.getElementById('fieldName').firstChild.data = phName;
	showSection('sectionDisplayName');
	changeUpdate();
	//submitAnalytics(analyticsSetCatagory, 'Name', phName);
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
			for (var i = 0; i < clickableClasses.length; i++)
			{
				if (node.className == clickableClasses[i]) test = true;
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
function selectConfirmation(sFunction, sName, sDesc, sConfirmText="Confirm", bForceConfirm=false)
{
	var mConfirmButton, mContent;
	if (prefConfirmSelections || bForceConfirm)
	{
		ResetDialogBox();
		SetDialogBoxHeader(sName);
		mConfirmButton = CreateButton(sConfirmText, "", "selectConfirmButton", sFunction + "; hideSection('selectionWindow');");
		mContent = document.createElement("div");
		mContent.innerHTML = sDesc;
		mContent.setAttribute("class", "selectConfirmContent");
		AddItemToDialogBoxMenu(mContent);
		AddItemToDialogBox(mConfirmButton);
		popout();
		showPositionSection("selectionWindow", true);
	}
	else
	{
		eval(sFunction);
	}
}
window['selectConfirmation'] = selectConfirmation;

// super stat functions
function setupSuperStats()
{
	ResetDialogBox(2);

	SetDialogBoxHeader("Superstats");

	var i;
	var iLength = dataSuperStat.length;
	// clear button
	var mCurrent = document.createElement("a");
	var iColumn;
	mCurrent.setAttribute("id", "selectSuperStat" + i);
	mCurrent.setAttribute("onclick", "selectConfirmation('setSuperStat(0)', 'Clear', '')");
	mCurrent.innerHTML = sClearButton;
	AddItemToDialogBoxMenu(mCurrent);
	// superstat buttons
	for (i = 1; i < iLength; i++)
	{
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		mCurrent = document.createElement("a");
		mCurrent.setAttribute("id", "selectSuperStat" + i);
		mCurrent.setAttribute("onclick", "selectConfirmation('setSuperStat(" + i + ")', '" + escapeQuotes(dataSuperStat[i].desc) + "', '" + dataSuperStat[i].tip + "')");
		mCurrent.setAttribute("style", "display: block;");
		mCurrent.innerHTML = "<div class='Sprite Stat_" + dataSuperStat[i].name + "'></div> " + dataSuperStat[i].name;
		setOnmouseoverPopupL1(mCurrent, "<b>" + dataSuperStat[i].name + "</b><br /><br />" + dataSuperStat[i].tip);
		AddItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupSuperStats'] = setupSuperStats;

function selectSuperStat(num)
{
	var fieldId = 'fieldSuperStat' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId)
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
	var oldId = phSuperStat[num].id;
	var oldSelectField = document.getElementById('selectSuperStat' + oldId);
	var swapNum = 0;
	var swapField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < phSuperStat.length; i++)
			{
				if (i != num && phSuperStat[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldSuperStat' + i);
				}
			}
		}
		phSuperStat[num] = dataSuperStat[id];
		if (id == 0)
		{
			field.innerHTML = getSuperStatDefault(num);
			clearOnmouseoverPopup(field);
		}
		else
		{
			field.innerHTML = getSuperStatDesc(id, num);
			setOnmouseoverPopupL2(field, dataSuperStat[id].tip);
			selectField.setAttribute('class', 'takenButton');
		}
		if (swapNum > 0)
		{
			phSuperStat[swapNum] = dataSuperStat[oldId];
			if (oldId != 0)
			{
				swapField.innerHTML = getSuperStatDesc(oldId, swapNum);
				setOnmouseoverPopupL2(swapField, dataSuperStat[oldId].tip);
			}
			else
			{
				swapField.innerHTML = getSuperStatDefault(swapNum);
				clearOnmouseoverPopup(swapField);
			}
		}
		else if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'button');
		}
			//submitAnalytics(analyticsSetCatagory, 'SuperStat', phSuperStat[num].name);
	}
	//setupInnateTalents();
	//setupTalents();
	setupSpecializations();
	selectClear();
}
window['setSuperStat'] = setSuperStat;

function getSuperStatDefault(num)
{
	if (num == 1)
	{
		return '<span><div class="Sprite blank"></div>&nbsp;Primary Super Stat</span>';
	}
	else
	{
		return '<span><div class="Sprite blank"></div>&nbsp;Secondary Super Stat ' + (num - 1) + '</span>';
	}
}
window['getSuperStatDefault'] = getSuperStatDefault;

function getSuperStatDesc(id, num)
{
	return dataSuperStat[id].desc + ' <span class="spec">' + ((num == 1) ? '(Primary)' : '(Secondary)') + '</span>';
}
window['getSuperStatDesc'] = getSuperStatDesc;

function highlightSuperStats(str)
{
	for (var i = 1; i < phSuperStat.length; i++)
	{
		var regex = new RegExp('(' + phSuperStat[i].abbrev + ': \\d+)');
		if (regex != null)
		{
			str = str.replace(regex, '<span class="specHighlight">$1</span>');
		}
	}
	return str;
}
window['highlightSuperStats'] = highlightSuperStats;

// innate talent functions
function setupInnateTalents()
{
	ResetDialogBox(2);
	SetDialogBoxHeader("Innate Talents");

	var i;
	var iLength = dataInnateTalent.length;
	var iColumn;
	var mCurrent = document.createElement("a");
	// clear button
	mCurrent.setAttribute("id", "selectInnateTalent0");
	mCurrent.setAttribute("onclick", "selectConfirmation('setInnateTalent(0)', 'Clear', '')");
	mCurrent.innerHTML = sClearButton;
	AddItemToDialogBoxMenu(mCurrent);
	// innates
	for (i = 1; i < iLength; i++)
	{
		mCurrent = document.createElement("a");
		mCurrent.setAttribute("id", "selectInnateTalent" + i);
		mCurrent.setAttribute("onclick", "selectConfirmation('setInnateTalent(" + i + ")', '" + escapeQuotes(dataInnateTalent[i].desc) + "', '" + dataInnateTalent[i].tip + "')");
		mCurrent.setAttribute("style", "display: block;");
		mCurrent.innerHTML = "<div class='Sprite Innate_Talent'></div>&nbsp;" + dataInnateTalent[i].desc + ((dataInnateTalent[i].extra != null) ? " <span class='selectSpec'>(" + highlightSuperStats(dataInnateTalent[i].extra) + ")</span>" : "");
		setOnmouseoverPopupL1(mCurrent, "<b>" + dataInnateTalent[i].name + "</b><br /><br />" + dataInnateTalent[i].tip);

		// 1st half in column 1, 2nd half in column 2
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		AddItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupInnateTalents'] = setupInnateTalents;

function selectInnateTalent(num)
{
	var fieldId = 'fieldInnateTalent' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId)
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
	var oldId = phInnateTalent[num].id;
	var oldSelectField = document.getElementById('selectInnateTalent' + oldId);
	if (id != oldId)
	{
		phInnateTalent[num] = dataInnateTalent[id];
		if (id == 0)
		{
			field.innerHTML = getInnateTalentDefault(num);
			clearOnmouseoverPopup(field);
		}
		else
		{
			field.innerHTML = getInnateTalentDesc(id, num);
			setOnmouseoverPopupL2(field, dataInnateTalent[id].tip);
			selectField.setAttribute('class', 'takenButton');
		}
		if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'selectButton');
		}
			//submitAnalytics(analyticsSetCatagory, 'InnateTalent', phInnateTalent[num].name);
	}
	selectClear();
}
window['setInnateTalent'] = setInnateTalent;

function getInnateTalentDefault(num)
{
	return '<span><div class="Sprite blank"></div>&nbsp;Innate Talent</span>';
}
window['getInnateTalentDefault'] = getInnateTalentDefault;

function getInnateTalentDesc(id, num)
{
	return '<div class="Sprite Innate_Talent"></div>&nbsp;' + dataInnateTalent[id].desc + ((dataInnateTalent[id].extra != null) ? ' <span class="spec">(' + dataInnateTalent[id].extra + ')</span>' : '');
}
window['getInnateTalentDesc'] = getInnateTalentDesc;

// talent functions
function setupTalents()
{
	ResetDialogBox(2);
	SetDialogBoxHeader("Talents");

	var i;
	var iColumn;
	var iLength = dataTalent.length;
	var mCurrent = document.createElement("a");
	mCurrent.setAttribute("id", "selectTalent0");
	mCurrent.setAttribute("onclick", "selectConfirmation('setTalent(0)', 'Clear', '')");
	mCurrent.innerHTML = sClearButton;
	AddItemToDialogBoxMenu(mCurrent);

	for (i = 1; i < iLength; i++)
	{
		iColumn = Math.floor((i - 1) / (iLength - 1) * 2);
		mCurrent = document.createElement("a");
		mCurrent.setAttribute("id", "selectTalent" + i);
		mCurrent.setAttribute("onclick", "selectConfirmation('setTalent(" + i + ")', '" + escapeQuotes(dataTalent[i].desc) + "', '')");
		mCurrent.setAttribute("style", "display: block;");
		mCurrent.innerHTML = "<div class='Sprite Talent'></div>&nbsp;" + dataTalent[i].desc + ((dataTalent[i].extra != null) ? " <span class='selectSpec'>(" + highlightSuperStats(dataTalent[i].extra) + ")</span>" : "");
		setOnmouseoverPopupL1(mCurrent, "<b>" + dataTalent[i].name + "</b><br /><br />" + dataTalent[i].extra);
		AddItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupTalents'] = setupTalents;

function selectTalent(num)
{
	var fieldId = 'fieldTalent' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId)
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
	var oldId = phTalent[num].id;
	var oldSelectField = document.getElementById('selectTalent' + oldId);
	var swapNum = 0;
	var swapField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < phTalent.length; i++)
			{
				if (i != num && phTalent[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldTalent' + i);
				}
			}
		}
		phTalent[num] = dataTalent[id];
		if (id == 0)
		{
			field.innerHTML = getTalentDefault(num);
			clearOnmouseoverPopup(field);
		}
		else
		{
			field.innerHTML = getTalentDesc(id);
			setOnmouseoverPopupL2(field, dataTalent[id].tip);
			selectField.setAttribute('class', 'takenButton');
		}
		if (swapNum > 0)
		{
			phTalent[swapNum] = dataTalent[oldId];
			if (oldId != 0)
			{
				swapField.innerHTML = getTalentDesc(oldId);
				setOnmouseoverPopupL2(swapField, dataTalent[oldId].tip);
			}
			else
			{
				swapField.innerHTML = getTalentDefault(swapNum);
				clearOnmouseoverPopup(swapField);
			}
		}
		else if (oldId != 0)
		{
			oldSelectField.setAttribute('class', 'button');
		}
			//submitAnalytics(analyticsSetCatagory, 'Talent', phTalent[num].name);
	}
	selectClear();
}
window['setTalent'] = setTalent;

function getTalentDefault(num)
{
	return '<span><div class="Sprite blank"></div>&nbsp;Talent ' + num + '</span>';
}
window['getTalentDefault'] = getTalentDefault;

function getTalentDesc(id)
{
	return '<div class="Sprite Talent"></div>&nbsp;' + dataTalent[id].desc + ((dataTalent[id].extra != null) ? ' <span class="spec">(' + dataTalent[id].extra + ')</span>' : '');
}
window['getTalentDesc'] = getTalentDesc;

// travel power functions
function setupTravelPowers()
{
	ResetDialogBox(iTravelPowerColumnCount);
	SetDialogBoxHeader("Travel Powers");

	var i;
	var iColumn;
	var iLength = dataTravelPower.length;
	var mCurrent = document.createElement("a");
	mCurrent.setAttribute("id", "selectTravelPower0");
	mCurrent.setAttribute("onclick", "selectConfirmation('setTravelPower(0)', 'Clear', '')");
	mCurrent.innerHTML = sClearButton;
	AddItemToDialogBoxMenu(mCurrent);

	for (i = 1; i < iLength; i++)
	{
		iColumn = Math.floor((i - 1) / (iLength - 1) * iTravelPowerColumnCount);
		mCurrent = document.createElement("a");
		mCurrent.setAttribute("id", "selectTravelPower" + i);
		mCurrent.setAttribute("onclick", "selectConfirmation('setTravelPower(" + i + ")', '" + escapeQuotes(dataTravelPower[i].desc) + "', '" + dataTravelPower[i].tip + "')");
		mCurrent.setAttribute("style", "display: block;");
		mCurrent.innerHTML = dataTravelPower[i].desc;
		setOnmouseoverPopupL1(mCurrent, dataTravelPower[i].tip);
		AddItemToDialogBox(mCurrent, iColumn);
	}
}
window['setupTravelPowers'] = setupTravelPowers;

function selectTravelPower(num)
{
	var fieldId = 'fieldTravelPower' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId)
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
		setupTravelPowers();
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
	var oldId = phTravelPower[num].id;
	var oldAdvantage = phTravelPowerAdvantage[num];
	var oldSelectField = document.getElementById('selectTravelPower' + oldId);
	var swapNum = 0;
	var swapField;
	var swapAdvantageField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < phTravelPower.length; i++)
			{
				if (i != num && phTravelPower[i].id == id)
				{
					swapNum = i;
					swapField = document.getElementById('fieldTravelPower' + i);
					swapAdvantageField = document.getElementById('fieldTravelPowerAdvantage' + i);
				}
			}
		}
		if (swapNum > 0)
		{
			phTravelPower[num] = phTravelPower[swapNum];
			phTravelPowerAdvantage[num] = phTravelPowerAdvantage[swapNum];
			field.innerHTML = dataTravelPower[id].desc;
			setOnmouseoverPopupL2(field, dataTravelPower[id].tip);
			advantageField.style.display = '';
			setAdvantage(2, num, phTravelPowerAdvantage[num]);
			phTravelPower[swapNum] = dataTravelPower[oldId];
			phTravelPowerAdvantage[swapNum] = oldAdvantage;
			if (oldId != 0)
			{
				swapField.innerHTML = dataTravelPower[oldId].desc;
				setOnmouseoverPopupL2(swapField, dataTravelPower[oldId].tip);
				setAdvantage(2, swapNum, phTravelPowerAdvantage[swapNum]);
			}
			else
			{
				swapField.innerHTML = getTravelPowerDefault(swapNum);
				clearOnmouseoverPopup(swapField);
				swapAdvantageField.style.display = 'none';
				setAdvantage(2, swapNum, 0);
			}
		}
		else
		{
			if (phTravelPower[num].id != 0)
			{
				setAdvantage(2, num, 0);
			}
			phTravelPower[num] = dataTravelPower[id];
			phTravelPowerAdvantage[num] = 0;
			if (id == 0)
			{
				field.innerHTML = getTravelPowerDefault(num);
				clearOnmouseoverPopup(field);
				advantageField.style.display = 'none';
			}
			else
			{
				field.innerHTML = dataTravelPower[id].desc;
				setOnmouseoverPopupL2(field, dataTravelPower[id].tip);
				advantageField.innerHTML = advantageTextSpan(2, num, 0);
				advantageField.style.display = '';
				selectField.setAttribute('class', 'takenButton');
				if (oldId != 0)
				{
					oldSelectField.setAttribute('class', 'button');
				}
			}
			if (oldId != 0)
			{
				oldSelectField.setAttribute('class', 'button');
			}
		}
			//submitAnalytics(analyticsSetCatagory, 'TravelPower', phTravelPower[num].name);
	}
	selectClear();
}
window['setTravelPower'] = setTravelPower;

function getTravelPowerDefault(num)
{
	return '<span><div class="Sprite blank"></div>&nbsp;Travel Power ' + num + '</span>';
}
window['getTravelPowerDefault'] = getTravelPowerDefault;

// power functions
function setupFrameworks() // xxx
{
	var mContainer = document.getElementById("frameworkSelectionContainer");
	var i;
	var iLength = dataFramework.length;
	var mNode;
	var iNextLineID = Math.floor(iLength / 2);
	var iGroup = -1;
	var mPowersetGroup;
	for (i = 1; i < iLength; i++)
	{
		if (iGroup < dataFramework[i].powerset)
		{
			mPowersetGroup = document.createElement("div");
			mPowersetGroup.setAttribute("class", "frameworkSelectionGroup");
			mContainer.appendChild(mPowersetGroup);
			iGroup++;
		}
		mNode = CreateButton(dataFramework[i].desc, "selectFramework" + i, "", "selectFramework(" + i + ")");
		mPowersetGroup.appendChild(mNode);
		setOnmouseoverPopupL1(mNode, dataFramework[i].tip);
		// reduce brightness for nonselected frameworks
		if (dataFramework[i].id != prevSelectedFramework) mNode.setAttribute("class", "frameworkUnselected");
		else mNode.setAttribute("class", "frameworkSelected");
		// newline for second row
		if (i == iNextLineID) mContainer.appendChild(document.createElement("br"));
	}
}
window['setupFrameworks'] = setupFrameworks;

function selectFramework(framework) // xxx
{
	ResetDialogBox(iPowerColumnCount);
	var sHeader = "Select Framework";

	if (framework > 0 && framework < dataFramework.length) sHeader = "Framework > " + dataPowerSet[dataFramework[framework].powerset].name + " > " + dataFramework[framework].name;

	SetDialogBoxHeader(sHeader);

	var aFrameworkPowers = dataPowerIdFromFramework[framework];
	var i;
	var iLength = aFrameworkPowers.length;
	var iColumn;
	// framework selection container
	var mFrameworkContainer = document.createElement("div");
	mFrameworkContainer.setAttribute("id", "frameworkSelectionContainer");
	AddItemToDialogBox(mFrameworkContainer);
	// break
	//AddItemToDialogBox(document.createElement("hr"));
	// clear button
	var mClear = CreateButton(sClearButton, "selectPower0", "", "selectConfirmation('setPower(0)', 'Clear', '')");
	AddItemToDialogBoxMenu(mClear);
	// insert button
	var mInsert = CreateButton(sInsertButton, "selectPowerInsert", "", "selectPowerInsert(" + selectedNum + ")");
	mInsert.setAttribute("style", "margin-left: 1.5em; margin-right: 1.5em;");
	AddItemToDialogBoxMenu(mInsert);
	// delete button
	var mDelete = CreateButton(sDeleteButton, "selectPowerDelete", "", "selectPowerDelete(" + selectedNum + ")")
	AddItemToDialogBoxMenu(mDelete);
	// framework powers
	var mNode;
	var iPowerID;
	var oPower;
	var iColumn;
	var iColumnSize = Math.ceil(iLength / iPowerColumnCount);
	for (i = 0; i < iLength; i++)
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
			mNode.setAttribute("onclick", "selectConfirmation('setPower(" + iPowerID + ")', '" + escapeQuotes(dataPower[iPowerID].desc) + "', '" + dataPower[iPowerID].tip + "')");
			mNode.setAttribute("class", "button");
			break;
		case 2:
			mNode.setAttribute("onclick", "selectConfirmation('setPower(" + iPowerID + ")', '" + escapeQuotes(dataPower[iPowerID].desc) + "', '" + dataPower[iPowerID].tip + "')");
			mNode.setAttribute("class", "takenButton");
			break;
		}
		mNode.innerHTML = dataPower[iPowerID].desc;
		mNode.setAttribute("style", "display: block;");
		setOnmouseoverPopupL1(mNode, dataPower[iPowerID].tip);
		// add to dialog box
		iColumn = Math.floor(i / iColumnSize);
		AddItemToDialogBox(mNode, iColumn);
	}

	prevSelectedFramework = framework;
	setupFrameworks();
	updatePositionSection("selectionWindow");
	popout();
}
window['selectFramework'] = selectFramework;

function selectPower(num)
{
	var fieldId = 'fieldPower' + num;
	var field = document.getElementById(fieldId);
	if (selectedFieldId == fieldId)
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
		if (phPower[num].id != 0)
		{
			selectFramework(phPower[num].framework);
		}
		else if (prevSelectedFramework != 0)
		{
			selectFramework(prevSelectedFramework);
		}
		else
		{
			selectFramework(0);
		}
		showPositionSection('selectionWindow', false);
	}
}
window['selectPower'] = selectPower;

function setPower(id)
{
	var num = selectedNum;
	var field = document.getElementById('fieldPower' + num);
	var advantageField = document.getElementById('fieldPowerAdvantage' + num);
	var oldId = phPower[num].id;
	var oldAdvantage = phPowerAdvantage[num];
	var swapNum = 0;
	var swapField;
	var swapAdvantageField;
	if (id != oldId)
	{
		if (id > 0)
		{
			for (var i = 1; i < phPower.length; i++)
			{
				if (i != num && phPower[i].name == dataPower[id].name)
				{
					swapNum = i;
					swapField = document.getElementById('fieldPower' + i);
					swapAdvantageField = document.getElementById('fieldPowerAdvantage' + i);
				}
			}
		}
		if (swapNum > 0)
		{
			phPower[num] = phPower[swapNum];
			phPowerAdvantage[num] = phPowerAdvantage[swapNum];
			field.innerHTML = dataPower[id].desc;
			setOnmouseoverPopupL2(field, dataPower[id].tip);
			advantageField.style.display = '';
			setAdvantage(1, num, phPowerAdvantage[num]);
			phPower[swapNum] = dataPower[oldId];
			phPowerAdvantage[swapNum] = oldAdvantage;
			if (oldId != 0)
			{
				swapField.innerHTML = dataPower[oldId].desc;
				setOnmouseoverPopupL2(swapField, dataPower[oldId].tip);
				swapAdvantageField.style.display = '';
				setAdvantage(1, swapNum, phPowerAdvantage[swapNum]);
			}
			else
			{
				swapField.innerHTML = getPowerDefault(swapNum);
				clearOnmouseoverPopup(swapField);
				swapAdvantageField.style.display = 'none';
				setAdvantage(1, swapNum, 0);
			}
		}
		else
		{
			if (phPower[num].id != 0)
			{
				setAdvantage(1, num, 0);
			}
			phPower[num] = dataPower[id];
			phPowerAdvantage[num] = 0;
			if (id == 0)
			{
				field.innerHTML = getPowerDefault(num);
				clearOnmouseoverPopup(field);
				advantageField.style.display = 'none';
			}
			else
			{
				field.innerHTML = dataPower[id].desc;
				setOnmouseoverPopupL2(field, dataPower[id].tip);
				advantageField.innerHTML = advantageTextSpan(1, num, 0);
				advantageField.style.display = '';
			}
		}
			//submitAnalytics(analyticsSetCatagory, 'Power', phPower[num].name);
	}
	selectClear();
	validatePowers();
}
window['setPower'] = setPower;

function getPowerDefault(num)
{
	return '<span><div class="Sprite blank"></div>&nbsp;Power ' + num + '</span>';
}
window['getPowerDefault'] = getPowerDefault;

function selectPowerAllowed(num, id)
{
	// returns: 0=no, 1=yes, 2=taken
	var result = 0;
	var power = dataPower[id];
	var oldTier = (num > 0) ? phPower[num].tier : -1;
	var powerCount = 0;
	var powerSetCount = 0;
	var frameworkCount = 0;
	var groupCount = 0;
	var otherCount = 0;
	var energyBuilderId = 0;
	var energyUnlockId = 0;
	var tier4Id = 0;
	for (var i = 1; i < phPower.length; i++)
	{
		var p = phPower[i];
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
		//if (phArchetype > 1 || num >= 13) { }
		if (tier4Id == 0) result = 1;
		else if (oldTier == 4) result = 2;
		break;
	}
	if (result > 0 && energyUnlockId != 0 && dataEnergyUnlockPower[id] != undefined)
	{
		if (dataEnergyUnlockPower[phPower[num].id] != undefined) result = 2;
		else result = 0;
	}
	for (var i = 1; i < phPower.length; i++)
	{
		if (phPower[i].name == power.name && (num != i || result == 1)) result = 2;
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
	for (var i = 1; i < phPower.length; i++)
	{
		validatePower(i, phPower[i].id);
	}
}
window['validatePowers'] = validatePowers;

function selectPowerInsert(num)
{
	for (var i = phPower.length - 1; i > num; i--)
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
	for (var i = num + 1; i < phPower.length; i++)
	{
		movePower(i, i - 1);
	}
	selectedNum = phPower.length - 1;
	setPower(0);
	selectClear();
	validatePowers();
}
window['selectPowerDelete'] = selectPowerDelete;

function movePower(fromNum, toNum)
{
	var power = phPower[fromNum];
	var mask = phPowerAdvantage[fromNum];
	selectedNum = toNum;
	setPower(power.id);
	setAdvantage(1, toNum, mask);
}
window['movePower'] = movePower;

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
		selectedFieldClass = mField.getAttribute("class");
		mField.setAttribute("class", "selectedButton");

		ResetDialogBox();
		SetDialogBoxHeader(phPower[iPowerNumber].name);
		mText = document.createElement("span");
		mText.innerHTML = "Replace with...";
		AddItemToDialogBoxMenu(mText);
		aPowerList = phArchetype.powerList[iPowerNumber];
		iLength = aPowerList.length;
		for (i = 1; i < iLength; i++)
		{
			iCurrentPowerID = aPowerList[i];
			oPower = dataPower[iCurrentPowerID];

			if (oPower != phPower[iPowerNumber])
			{
				mOption = CreateButton(oPower.desc, "selectPower" + iCurrentPowerID);
				mOption.setAttribute("onclick", "selectConfirmation('setArchetypePower(" + iCurrentPowerID + ")', '" + escapeQuotes(dataPower[iCurrentPowerID].desc) + "', '" + dataPower[iCurrentPowerID].tip + "')");
				mOption.setAttribute("class", "button");
				setOnmouseoverPopupL1(mOption, oPower.tip);
				AddItemToDialogBox(mOption);
				AddItemToDialogBox(document.createElement("br"));
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
	var oldId = phPower[num].id;
	if (id != oldId)
	{
		setAdvantage(1, num, 0);
		phPower[num] = dataPower[id];
		phPowerAdvantage[num] = 0;
		field.innerHTML = dataPower[id].desc;
		advantageField.innerHTML = advantageTextSpan(1, num, 0);
		setOnmouseoverPopupL2(advantageField, advantageTip(1, num, 0));
		setOnmouseoverPopupL2(field, dataPower[id].tip);
		advantageField.style.display = '';
		//submitAnalytics(analyticsSetCatagory, 'ArchetypePower', phPower[num].name);
	}
	selectClear();
}
window['setArchetypePower'] = setArchetypePower;

// power advantage functions
function checkAdvantageDependancyId(type, num, id)
{
	var result = true;
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var mask = (type == 1) ? phPowerAdvantage[num] : phTravelPowerAdvantage[num];
	var dependency = power.advantageList[id].dependency;
	if (dependency != null && !power.hasAdvantage(mask, dependency)) result = false;
	return result;
}
window['checkAdvantageDependancyId'] = checkAdvantageDependancyId;

function checkAdvantageDependancyMask(type, num, mask)
{
	var result = true;
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var advantageList = (type == 1) ? phPower[num].advantageList : phTravelPower[num].advantageList;
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

function selectAdvantage(iType, iPowerID)
{
	var aFormIDs = ['formPowerAdvantage', 'formTravelPowerAdvantage'];
	var sFieldID = ((iType == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + iPowerID;
	var mField = document.getElementById(sFieldID);
	var oPower = (iType == 1) ? phPower[iPowerID] : phTravelPower[iPowerID];
	var oMask = (iType == 1) ? phPowerAdvantage[iPowerID] : phTravelPowerAdvantage[iPowerID];
	var iPoints = oPower.getPoints(oMask);
	var mClear, mTable, mRow, mCell, i, oAdvantage, mCheckBox, mLabel, mPoints;
	var aAdvantageList = oPower.advantageList;
	var iLength = aAdvantageList.length;

	selectClear();
	if (selectedFieldId != sFieldID)
	{
		selectedNum = iPowerID;
		selectedFieldId = sFieldID;
		selectedFieldClass = mField.getAttribute("class");
		mField.setAttribute("class", "selectedButtonNote");

		// clear button
		mClear = document.createElement("a");
		mClear.setAttribute("id", "selectAdvantageClear");
		mClear.setAttribute('onclick', "selectAdvantageClear(" + iType + ", " + iPowerID + ")");
		mClear.innerHTML = "Clear";
		mTable = document.createElement("table");
		mTable.setAttribute("style", "width: 100%;");
		for (i = 1; i < iLength; i++)
		{
			oAdvantage = aAdvantageList[i];
			// build table
			mRow = document.createElement("tr");
			mTable.appendChild(mRow);
			mCell = document.createElement("td");
			mRow.appendChild(mCell);
			// checkbox
			mCheckBox = document.createElement("input");
			mCheckBox.setAttribute("id", "checkboxAdvantage" + i);
			mCheckBox.setAttribute("type", "checkbox");
			mCheckBox.setAttribute("name", oAdvantage.name);
			mCheckBox.setAttribute("value", oAdvantage.id);
			if (oMask > 0 && oPower.hasAdvantage(oMask, i)) mCheckBox.checked = true;
			if (mCheckBox.checked || (statAdvantagePoints + oAdvantage.points <= maxAdvantagePointsTotal && iPoints + oAdvantage.points <= maxAdvantagePointsPerPower && checkAdvantageDependancyId(iType, iPowerID, oAdvantage.id)))
			{
				if (mCheckBox.checked)
					mCheckBox.setAttribute("onclick", "selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")");
				else mCheckBox.setAttribute("onclick", "selectConfirmation('selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")', '" + escapeQuotes(oAdvantage.desc) + "', '" + oAdvantage.tip + "')");
			}
			else
			{
				mCheckBox.setAttribute('onclick', 'return false');
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
				if (mCheckBox.checked)
				{
					mLabel.setAttribute("onclick", "selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")");
				}
				else
				{
					mLabel.setAttribute("onclick", "selectConfirmation('selectAdvantageToggle(" + iType + ", " + iPowerID + ", " + i + ")', '" + escapeQuotes(oAdvantage.desc) + "', '" + oAdvantage.tip + "')");
				}
				mLabel.setAttribute("class", "selectButton");
			}
			else
			{
				mLabel.setAttribute("onclick", "return false");
				mLabel.setAttribute("class", "disabledButton");
			}
			mLabel.setAttribute("style", "display: block;");
			mLabel.innerHTML = oAdvantage.desc;
			setOnmouseoverPopupL1(mLabel, oAdvantage.tip);
			mCell.appendChild(mLabel);

			// adv point cost
			mCell = document.createElement("td");
			mRow.appendChild(mCell);
			mPoints = document.createElement("span");
			mPoints.setAttribute("class", "note");
			mPoints.setAttribute("style", "margin-left: 1.5em;");
			mPoints.innerHTML = oAdvantage.points;
			mCell.appendChild(mPoints);
		}

		ResetDialogBox();
		SetDialogBoxHeader(oPower.name);
		AddItemToDialogBoxMenu(mClear);
		AddItemToDialogBox(mTable);

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

function selectAdvantageUpdate(type, num)
{
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var mask = (type == 1) ? phPowerAdvantage[num] : phTravelPowerAdvantage[num];
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
		// xxx
		changeUpdate();
	}
}
window['selectAdvantageUpdate'] = selectAdvantageUpdate;

function selectAdvantageClear(type, num)
{
	var mask = 0;
	setAdvantage(type, num, mask);
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
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

function selectAdvantageCancel(type, num, mask)
{
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	field.innerHTML = advantageTextSpan(type, num, mask);
	setOnmouseoverPopupL1(field, advantageTip(type, num, mask));
	setAdvantage(type, num, mask);
	selectClear();
}
window['selectAdvantageCancel'] = selectAdvantageCancel;

function selectAdvantageToggle(type, num, id)
{
	var mask = (type == 1) ? phPowerAdvantage[num] : phTravelPowerAdvantage[num];
	var field = document.getElementById('checkboxAdvantage' + id);
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	if (power.hasAdvantage(mask, id))
	{
		mask = power.delAdvantage(mask, id);
		var advantageList = power.advantageList;
		for (var i = 1; i < advantageList.length; i++)
		{
			var advantage = advantageList[i];
			if (advantage.dependency != null && advantage.dependency == id)
			{
				mask = power.delAdvantage(mask, advantage.id);
				document.getElementById('checkboxAdvantage' + advantage.id).checked = false;
			}
		}
		field.checked = false;
		setAdvantage(type, num, mask);
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
				//submitAnalytics(analyticsSetCatagory, 'Advantage', power.name + ': ' + advantage.name);
		}
	}
	selectAdvantageUpdate(type, num);
}
window['selectAdvantageToggle'] = selectAdvantageToggle;

function setAdvantage(type, num, mask)
{
	var oldStatAdvantagePoints = statAdvantagePoints;
	var field = document.getElementById(((type == 1) ? 'fieldPowerAdvantage' : 'fieldTravelPowerAdvantage') + num);
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var phMask = (type == 1) ? phPowerAdvantage[num] : phTravelPowerAdvantage[num];
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
		(type == 1) ? phPowerAdvantage[num] = mask : phTravelPowerAdvantage[num] = mask;
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
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var advantageList = power.advantageList;
	var result = '';
	if (advantageList.length > 0)
	{
		if (mask == 0)
		{
			result = '(advantages)';
		}
		else
		{
			for (var i = 1; i < advantageList.length; i++)
			{
				if (power.hasAdvantage(mask, i))
				{
					if (result.length == 0)
					{
						result = '(' + advantageList[i].desc;
					}
					else
					{
						result += ', ' + advantageList[i].desc;
					}
				}
			}
			result += ')';
		}
	}
	return result;
}
window['advantageText'] = advantageText;

function advantageTextSpan(type, num, mask)
{
	return '<span class="advantage">' + advantageText(type, num, mask) + '</span>';
}
window['advantageTextSpan'] = advantageTextSpan;

function advantageTip(type, num, mask)
{
	var power = (type == 1) ? phPower[num] : phTravelPower[num];
	var advantageList = power.advantageList;
	var result = '';
	if (advantageList.length > 0 && mask != 0)
	{
		for (var i = 1; i < advantageList.length; i++)
		{
			if (power.hasAdvantage(mask, i))
			{
				var tip = advantageList[i].tip;
				if (tip != null && tip.length > 0)
				{
					if (result.length == 0)
					{
						result = tip;
					}
					else
					{
						result += '<br /><br />' + tip;
					}
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
	if (prevSelectedSpecializationSuperStat != phSuperStat[1].id)
	{
		phSpecializationTree[1] = dataSpecializationTree[phSuperStat[1].id];
		phSpecialization[1] = 0;
		prevSelectedSpecializationSuperStat = phSuperStat[1].id;
		phSpecializationTree[4] = dataSpecializationTree[0];
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
		var specializationTree = phSpecializationTree[i];
		var mask = phSpecialization[i];
		var specializationList = specializationTree.specializationList;
		var specializationPointList = specializationTree.getSpecializationList(mask);
		var totalPoints = specializationTree.getPoints(mask);
		var header = document.getElementById('headerSpecialization' + i);
		var table = document.getElementById('tableSpecialization' + i);
		switch (i)
		{
		case 1:
			if (specializationTree.id == 0)
			{
				header.setAttribute('class', 'disabledButton');
				header.setAttribute('onclick', 'return false');
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Stat Tree <span class="spec">(0/10)</span></span>';
				header.innerHTML = '<span>Stat Tree <span class="spec">(0/10)</span></span>';
			}
			else
			{
				header.setAttribute('class', 'button');
				header.setAttribute('onclick', 'selectSpecialization(' + i + ')');
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;' + specializationTree.desc + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
				header.innerHTML = '<span>' + specializationTree.desc + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
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
				header.innerHTML = '<span>' + specializationTree.desc + ' Tree <span class="spec">(' + totalPoints + '/10)</span></span>';
			}
			break;
		case 4:
			if (specializationTree.id == 0)
			{
				//header.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Mastery <span class="spec">(0/1)</span></span>';
				header.innerHTML = '<span>Mastery <span class="spec">(0/1)</span></span>';
			}
			else
			{
				// var specialization = specializationList[8];
				// header.innerHTML = '<span>' + specialization.desc + ' <span class="spec">(1/1)</span></span>';
				header.innerHTML = '<span>' + specializationTree.desc + ' Mastery <span class="spec">(1/1)</span></span>';
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
					span.innerHTML = specialization.desc;
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
	ResetDialogBox(1);
	var i, iLength;
	var oSpecTree = phSpecializationTree[num];
	var oMask = phSpecialization[num];
	var aSpecList = oSpecTree.specializationList;
	var oSpecialization;
	var aSpecPointList = oSpecTree.getSpecializationList(oMask);
	var iTotalPoints = oSpecTree.getPoints(oMask);
	var iTier1Points = oSpecTree.getTierPoints(oMask, 1);
	var mElement, mButton, mTable, mTr, mTd;
	// stat tree
	if (num == SPECIALIZATION_STAT)
	{
		mElement = document.createElement("span");
		mElement.setAttribute("id", "selectSpecialization1");
		if (oSpecTree.id == 0)
		{
			//span.innerHTML = '<div class="Sprite blank"></div>&nbsp;Stat Tree (0/10)';
			mElement.innerHTML = "Stat Tree (0/" + iSpecPointMax + ")";
		}
		else
		{
			//span.innerHTML = '<div class="Sprite blank"></div>&nbsp;' + specializationTree.desc + ' (' + totalPoints + '/10)';
			mElement.innerHTML = oSpecTree.desc + " Tree (" + iTotalPoints + "/" + iSpecPointMax + ")";
		}
		SetDialogBoxHeader("Stat Specialization > " + oSpecTree.desc);
		AddItemToDialogBox(mElement, 0);

	}
	// role tree 1 and 2
	else if (num == SPECIALIZATION_ROLE1 || num == SPECIALIZATION_ROLE2)
	{
		// if freeform
		// warning - magic numbers: 9, 15
		if (phArchetype.id == 1)
		{
			iLength = dataSpecializationTree.length;
			mTable = document.createElement("table");
			mTable.setAttribute("style", "border-collapse: collapse; margin-bottom: 0.5em;")
			mTr = document.createElement("tr");
			mTable.appendChild(mTr);
			for (i = 9; i < iLength; i++)
			{
				mTd = document.createElement("td");
				if (i == 15)
				{
					//AddItemToDialogBox(document.createElement("br"), 0);
					mTr = document.createElement("tr");
					mTable.appendChild(mTr);
				}
				if (oSpecTree.id == i)
				{
					mButton = CreateButton(dataSpecializationTree[i].desc, "", "takenButton", "setSpecializationTree(" + num + ", " + i + ")");
				}
				else if ((num == 2 && phSpecializationTree[3].id == i) || (num == 3 && phSpecializationTree[2].id == i))
				{
					mButton = CreateButton(dataSpecializationTree[i].desc, "", "takenButton", "setSpecializationTree(" + num + ", " + i + ")");
				}
				else
				{
					mButton = CreateButton(dataSpecializationTree[i].desc, "", "button", "setSpecializationTree(" + num + ", " + i + ")");
				}
				mButton.setAttribute("style", "padding-right: 1.2em; display: block;");
				setOnmouseoverPopupL1(mButton, dataSpecializationTree[i].tip);
				mTd.appendChild(mButton);
				mTr.appendChild(mTd);
			}
			AddItemToDialogBoxMenu(mTable);
		}
		if (oSpecTree.id != 0)
		{
			mElement = document.createElement("span");
			mElement.setAttribute("id", "selectSpecialization" + num);
			mElement.innerHTML = oSpecTree.desc + " Tree (" + iTotalPoints + "/" + iSpecPointMax + ")";
			AddItemToDialogBox(mElement, 0);
			AddItemToDialogBox(document.createElement("br"), 0);
		}
		if (oSpecTree.desc) SetDialogBoxHeader("Role Specialization > " + oSpecTree.desc);
		else SetDialogBoxHeader("Role Specialization");
	}
	// mastery 'tree'
	else if (num == SPECIALIZATION_MASTERY)
	{
		mElement = document.createElement("span");
		mElement.setAttribute("id", "selectSpecialization4");
		if (oSpecTree.id == 0)
		{
			//span.innerHTML = '<span><div class="Sprite blank"></div>&nbsp;Mastery (0/1)</span>';
			mElement.innerHTML = "<span>Mastery (0/1)</span>";
		}
		else
		{
			// var specialization = specializationList[8];
			// span.innerHTML = '<span>' + specialization.desc + ' (1/1)</span>';
			mElement.innerHTML = "<span>" + oSpecTree.desc + " Mastery (1/1)</span>";
		}
		AddItemToDialogBox(mElement, 0);
		if (oSpecTree.desc) SetDialogBoxHeader("Mastery > " + oSpecTree.desc);
		else  SetDialogBoxHeader("Mastery");
	}

	if (num == 1 || num == 4 || aSpecList.length > 0)
	{
		mButton = CreateButton(sClearButton, "selectSpecializationClear", "", "selectSpecializationClear(" + num + ")");
		mButton.setAttribute("style", "margin-right: 1.5em;");
		AddItemToDialogBoxMenu(mButton);
	}

	if (num != SPECIALIZATION_MASTERY)
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
			mElement.innerHTML = oSpecialization.desc;
			setOnmouseoverPopupL1(mElement, oSpecialization.tip);
			if (iTotalPoints < iSpecPointMax || aSpecList[i] > 0)
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
			if (aSpecPointList[i] > 0)
			{
				mButton = CreateButton(sMinusArrow, "selectSpecializationDecrement" + i, "selectButton", "selectSpecializationDecrement(" + num + "," + i + ")");
			}
			else
			{
				mButton = CreateButton(sMinusArrow, "selectSpecializationDecrement" + i, "disabledButton", "return false;");
				mButton
			}
			mTd.appendChild(mButton);

			// spec points invested
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			mElement = document.createElement("span");
			mElement.setAttribute("id", "selectSpecializationPoints" + i);
			mElement.innerHTML = "(" + aSpecPointList[i] + "/" + oSpecialization.maxPoints + ")";
			if (iTotalPoints < iSpecPointMax || aSpecPointList[i] > 0)
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
			if (iTotalPoints < iSpecPointMax && aSpecPointList[i] < oSpecialization.maxPoints && (i < 4 || iTier1Points >= 5))
			{
				if (aSpecPointList[i] == 0)
				{
					mButton = CreateButton(sPlusArrow, "selectSpecializationIncrement" + i, "selectButton", "selectConfirmation('selectSpecializationIncrement(" + num + ", " + i + ")', '" + escapeQuotes(oSpecialization.desc) + "', '" + oSpecialization.tip + "')");
				}
				else
				{
					mButton = CreateButton(sPlusArrow, "selectSpecializationIncrement" + i, "selectButton", "selectSpecializationIncrement(" + num + "," + i + ")");
				}
			}
			else
			{
				mButton = CreateButton(sPlusArrow, "selectSpecializationIncrement" + i, "disabledButton", "return false;");
			}
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
		if (phSpecializationTree[1].id == 0)
		{
			mButton = CreateButton("<span><div class='Sprite blank'></div>&nbsp;Stat Mastery</span>", "", "disabledButton", "return false;");
		}
		else
		{
			oSpecialization = phSpecializationTree[1].specializationList[8]; // magic number - what's 8?
			mButton = CreateButton("<span>" + oSpecialization.desc + "</span>", "", "selectButton", "setSpecializationMastery(1);");
			setOnmouseoverPopupL1(mButton, oSpecialization.tip);
		}
		mTd.appendChild(mButton);
		for (i = 2; i <= 3; i++)
		{
			mTr = document.createElement("tr");
			mTable.appendChild(mTr);
			mTd = document.createElement("td");
			mTr.appendChild(mTd);
			if (phSpecializationTree[i].id == 0)
			{
				mButton = CreateButton("<span><div class='Sprite blank'></div>&nbsp;Role Mastery</span>", "", "disabledButton", "return false;");
			}
			else
			{
				oSpecialization = phSpecializationTree[i].specializationList[8]; // magic number - what's 8?
				mButton = CreateButton("<span>" + oSpecialization.desc + "</span>", "", "selectButton", "setSpecializationMastery(" + i + ")");
				setOnmouseoverPopupL1(mButton, oSpecialization.tip);
					//a.innerHTML = '<span>' + phSpecializationTree[i].desc + ' Mastery</span>';
			}
			mTd.appendChild(mButton);
		}
	}

	AddItemToDialogBox(mTable);
	updatePositionSection("selectionWindow");
}
window['selectSpecializationRefresh'] = selectSpecializationRefresh;

function selectSpecializationUpdate(num)
{
	var specializationTree = phSpecializationTree[num];
	var mask = phSpecialization[num];
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

function selectSpecializationClear(num)
{
	if (phArchetype.id == 1 || num == 4)
	{
		phSpecializationTree[num] = dataSpecializationTree[0];
	}
	phSpecialization[num] = 0;
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
	var specializationTree = phSpecializationTree[num];
	var mask = phSpecialization[num];
	var totalPoints = specializationTree.getPoints(mask);
	var tier1Points = specializationTree.getTierPoints(mask, 1);
	var specializationList = specializationTree.specializationList;
	var specializationPointList = specializationTree.getSpecializationList(mask);
	var specialization = specializationList[id];
	if (totalPoints < 10 && specializationPointList[id] < specialization.maxPoints && (id < 4 || tier1Points >= 5))
	{
		var newMask = specializationTree.incrSpecialization(mask, id);
		setSpecialization(num, newMask);
		selectSpecializationUpdate(num);
			//submitAnalytics(analyticsSetCatagory, 'Specialization', specializationTree.name + ': ' + specialization.name, specializationPointList[id]);
	}
}
window['selectSpecializationIncrement'] = selectSpecializationIncrement;

function selectSpecializationDecrement(num, id)
{
	var specializationTree = phSpecializationTree[num];
	var mask = phSpecialization[num];
	var totalPoints = specializationTree.getPoints(mask);
	var specializationList = specializationTree.specializationList;
	var specializationPointList = specializationTree.getSpecializationList(mask);
	var specialization = specializationList[id];
	if (specializationPointList[id] > 0)
	{
		var newMask = specializationTree.decrSpecialization(mask, id);
		setSpecialization(num, newMask);
		selectSpecializationUpdate(num);
			//submitAnalytics(analyticsSetCatagory, 'Specialization', specializationTree.name + ': ' + specialization.name, specializationPointList[id]);
	}
}
window['selectSpecializationDecrement'] = selectSpecializationDecrement;

function setSpecialization(num, mask)
{
	if (dataSpecializationTree[num].getPoints(mask) <= 10)
	{
		phSpecialization[num] = mask;
		setupSpecializations();
	}
}
window['setSpecialization'] = setSpecialization;

function setSpecializationTree(num, id)
{
	var currentTree = phSpecializationTree[num];
	if (currentTree.id != id)
	{
		if ((num == 2 && phSpecializationTree[3].id == id) || (num == 3 && phSpecializationTree[2].id == id))
		{
			var otherNum = ((num == 2) ? 3 : 2);
			var otherTree = phSpecializationTree[otherNum];
			var otherSpec = phSpecialization[otherNum];
			phSpecializationTree[otherNum] = phSpecializationTree[num];
			phSpecialization[otherNum] = phSpecialization[num];
			phSpecializationTree[num] = otherTree;
			phSpecialization[num] = otherSpec;
		}
		else
		{
			if (phSpecializationTree[num].id == phSpecializationTree[4].id) phSpecializationTree[4] = dataSpecializationTree[0];
			phSpecializationTree[num] = dataSpecializationTree[id];
			phSpecialization[num] = 0;
		}
		selectSpecializationRefresh(num);
		setupSpecializations();
			//submitAnalytics(analyticsSetCatagory, 'SpecializationTree', phSpecializationTree[num].name);
	}
}
window['setSpecializationTree'] = setSpecializationTree;

function setSpecializationMastery(id)
{
	if (id == 0) phSpecializationTree[4] = dataSpecializationTree[0];
	else phSpecializationTree[4] = phSpecializationTree[id];
	setupSpecializations();
	selectClear();
	//if (id > 0) submitAnalytics(analyticsSetCatagory, 'SpecializationMastery', phSpecializationTree[4].name);
}
window['setSpecializationMastery'] = setSpecializationMastery;

function getSpecializationMasteryId(id)
{
	for (var i = 1; i < phSpecializationTree.length - 1; i++)
	{
		if (phSpecializationTree[i].id == id) return i;
	}
	return 0;
}
window['getSpecializationMasteryId'] = getSpecializationMasteryId;

// archetype functions
function setupArchtypes()
{
	ResetDialogBox();
	SetDialogBoxHeader("Archetypes");

	var i;
	var iArchetypeCount = dataArchetype.length;
	var mCurrent;
	var iLength = dataArchetypeGroup.length;
	var aContainers = [null];
	var mContainer, mLabel;
	for (i = 1; i < iLength; i++)
	{
		if (i > 1) AddItemToDialogBox(document.createElement("hr"));
		mContainer = document.createElement("div");
		mLabel = document.createElement("div");
		mLabel.innerHTML = dataArchetypeGroup[i].name;
		mContainer.appendChild(mLabel);
		aContainers[i] = mContainer;
		AddItemToDialogBox(aContainers[i]);
	}

	// add new archetypes
	for (i = 1; i < iArchetypeCount; i++)
	{
		mContainer = aContainers[dataArchetype[i].group];
		if (mContainer.childNodes.length % (iArchetypeRowSize + 1) == 0) mContainer.appendChild(document.createElement("br"));
		mCurrent = CreateButton(dataArchetype[i].desc, "selectArchetype" + i, "", "setArchetype(" + i + ")");
		setOnmouseoverPopupL1(mCurrent, "<b>" + dataArchetype[i].name + "</b><br /><br />" + dataArchetype[i].tip);
		//alert(i + ": " + dataArchetype[i].group + " - " + dataArchetype[i].name);
		mContainer.appendChild(mCurrent);
	}

	SetVisibility("selectionWindow", true);
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

// xxx
function setArchetype(id)
{
	var archetype = dataArchetype[id];
	if (id == 1)
	{
		for (var i = 1; i < phSuperStat.length; i++)
		{
			var field = document.getElementById('fieldSuperStat' + i);
			field.setAttribute('onclick', 'selectSuperStat(' + i + ')');
			field.setAttribute('class', 'button');
		}
		for (var i = 1; i < phInnateTalent.length; i++)
		{
			var field = document.getElementById('fieldInnateTalent' + i);
			field.setAttribute('onclick', 'selectInnateTalent(' + i + ')');
			field.setAttribute('class', 'button');
		}
		for (var i = 1; i < phPower.length; i++)
		{
			var field = document.getElementById('fieldPower' + i);
			field.setAttribute('onclick', 'selectPower(' + i + ')');
			field.setAttribute('class', 'button');
		}
		document.getElementById('fieldTalentNote1').innerHTML = '6&nbsp;';
		document.getElementById('fieldTalentNote2').innerHTML = '9&nbsp;';
		document.getElementById('fieldTalentNote3').innerHTML = '12&nbsp;';
		document.getElementById('fieldTalentNote4').innerHTML = '15&nbsp;';
		document.getElementById('fieldTalentNote5').innerHTML = '18&nbsp;';
		document.getElementById('fieldTalentNote6').innerHTML = '21&nbsp;';
		document.getElementById('fieldPowerNote8').innerHTML = '20&nbsp;';
		document.getElementById('fieldPowerNote9').innerHTML = '23&nbsp;';
		document.getElementById('fieldPowerNote10').innerHTML = '26&nbsp;';
		document.getElementById('fieldPowerNote11').innerHTML = '29&nbsp;';
		document.getElementById('fieldPowerNote12').innerHTML = '32&nbsp;';
		document.getElementById('rowPower13').style.display = '';
		document.getElementById('rowPower14').style.display = '';
	}
	else
	{
		for (var i = 1; i < phSuperStat.length; i++)
		{
			var id = archetype.superStatList[i];
			var field = document.getElementById('fieldSuperStat' + i);
			//var selectField = document.getElementById('selectSuperStat' + id);
			if (id != phSuperStat[i].id)
			{
				phSuperStat[i] = dataSuperStat[id];
				field.innerHTML = getSuperStatDesc(id, i);
				setOnmouseoverPopupL2(field, dataSuperStat[id].tip);
			}
			field.setAttribute('onclick', 'return false');
			field.setAttribute('class', 'lockedButton');
				//selectField.setAttribute('class', 'takenButton');
		}
		for (var i = 1; i < phInnateTalent.length; i++)
		{
			var id = archetype.innateTalent;
			var field = document.getElementById('fieldInnateTalent' + i);
			//var selectField = document.getElementById('selectInnateTalent' + id);
			if (id != phInnateTalent[i].id)
			{
				phInnateTalent[i] = dataInnateTalent[id];
				field.innerHTML = getInnateTalentDesc(id, i);
				setOnmouseoverPopupL2(field, dataInnateTalent[id].tip);
			}
			field.setAttribute('onclick', 'return false');
			field.setAttribute('class', 'lockedButton');
				//selectField.setAttribute('class', 'takenButton');
		}
		for (var i = 1; i < phPower.length; i++)
		{
			var field = document.getElementById('fieldPower' + i);
			var advantageField = document.getElementById('fieldPowerAdvantage' + i);
			var id = archetype.powerList[i];
			if (id != undefined)
			{
				var multiplePowers = false;
				if (id instanceof Array)
				{
					multiplePowers = true;
					var powers = id;
					var oldId = phPower[i].id;
					for (var j = 1; j < powers.length; j++)
					{
						if (powers[j] == oldId) id = powers[j];
					}
					if (id instanceof Array) id = powers[1];
				}
				if (id != phPower[i].id)
				{
					setAdvantage(1, i, 0);
					phPower[i] = dataPower[id];
					field.innerHTML = dataPower[id].desc;
					setOnmouseoverPopupL2(field, dataPower[id].tip);
					advantageField.innerHTML = advantageTextSpan(1, i, 0);
					setOnmouseoverPopupL2(advantageField, advantageTip(1, i, 0));
				}
				if (multiplePowers)
				{
					field.setAttribute('onclick', 'selectArchetypePower(' + i + ')');
					field.setAttribute('class', 'button');
				}
				else
				{
					field.setAttribute('onclick', 'return false');
					field.setAttribute('class', 'lockedButton');
				}
				advantageField.style.display = '';
			}
			else
			{
				setAdvantage(1, i, 0);
				phPower[i] = dataPower[0];
				field.innerHTML = getPowerDefault(i);
				setOnmouseoverPopupL2(field, dataPower[i].tip);
				advantageField.innerHTML = advantageTextSpan(1, i, 0);
				setOnmouseoverPopupL2(advantageField, advantageTip(1, i, 0));
			}
		}
		for (var i = 1; i <= 3; i++)
		{
			setSpecializationTree(i, archetype.specializationTreeList[i]);
		}
		document.getElementById('fieldTalentNote1').innerHTML = '7&nbsp;';
		document.getElementById('fieldTalentNote2').innerHTML = '12&nbsp;';
		document.getElementById('fieldTalentNote3').innerHTML = '15&nbsp;';
		document.getElementById('fieldTalentNote4').innerHTML = '20&nbsp;';
		document.getElementById('fieldTalentNote5').innerHTML = '25&nbsp;';
		document.getElementById('fieldTalentNote6').innerHTML = '30&nbsp;';
		document.getElementById('fieldPowerNote8').innerHTML = '21&nbsp;';
		document.getElementById('fieldPowerNote9').innerHTML = '25&nbsp;';
		document.getElementById('fieldPowerNote10').innerHTML = '30&nbsp;';
		document.getElementById('fieldPowerNote11').innerHTML = '35&nbsp;';
		document.getElementById('fieldPowerNote12').innerHTML = '40&nbsp;';
		document.getElementById('rowPower13').style.display = 'none';
		document.getElementById('rowPower14').style.display = 'none';
	}
	// update talent highlights when selecting an AT
	//setupTalents();
	//setupInnateTalents();

	phArchetype = archetype;

	var mArchetypeDisplay = document.getElementById('fieldArchetype');
	mArchetypeDisplay.innerHTML = archetype.desc + "&nbsp;" + archetype.name;
	setOnmouseoverPopupL1(mArchetypeDisplay, "<b>" + archetype.name + "</b><br /><br />" + archetype.tip);

	selectClear();

	//submitAnalytics(analyticsSetCatagory, 'Archetype', archetype.name);
}
window['setArchetype'] = setArchetype;

// apply version update
function applyVersionUpdate(version, thing, value)
{
	var result = value[thing];
	var orig = result;
	if (version < phVersion && version < dataVersionUpdate.length)
	{
		var funct = dataVersionUpdate[version].funct;
		result = funct(thing, value);
		value[thing] = result;
	}
	if (debug && result != orig && thing != 'inc')
	{
		console.log("applyVersionUpdate: version=" + appVersion + ", thing=" + thing + ", value=" + orig + ", result=" + result);
	}
	return result;
}
window['applyVersionUpdate'] = applyVersionUpdate;

// parse url for parameters
function parseUrlParams(url)
{
	var version = buildVersion;
	var data = [];
	var parts = url.split('?');
	if (parts[1] != undefined)
	{
		var params = parts[1].split('&');
		for (var i = 0; i < params.length; i++)
		{
			var pair = params[i].split('=');
			switch (pair[0])
			{
			case 'v':
				version = parseInt(pair[1]);
				break;
			case 'n':
				phName = decodeURIComponent(pair[1]);
				document.getElementById('fieldName').firstChild.data = phName;
				break;
			case 'a':
				// note: deprecated, but needed for backwards compatibility with version 1
				phArchetype = dataArchetype[parseInt(pair[1])];
				//document.getElementById('fieldArchetype').firstChild.data = phArchetype.name;
				break;
			case 'd': // deprecated, but required for data versions older than 20 (power IDs are 1 digit)
				data = pair[1].split('');
				break;
			}
		}
	}
	while (version <= buildVersion)
	{
		var finalVersion = (version == buildVersion);
		var pos = 0;
		var i = 0;
		var inc = 1;
		var archetype = (phArchetype && phArchetype.id) || 1;
		var specializationMasteryId = 0;
		if (debug)
		{
			console.log("parseUrlParams: version=" + appVersion + ", name=" + name + ", data=" + data);
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
					phArchetype = dataArchetype[archetype];
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
					data[i + 1] = travelPowerCode[1]; // xxxx
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
			}
			i += inc;
			pos++;
		}
		if (finalVersion)
		{
			setSpecializationMastery(specializationMasteryId);
			validatePowers();
			if (phArchetype.id > 1) setArchetype(phArchetype.id);
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
	var title = siteName + ': ' + phName;
	if (phName == '') title = siteName;
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
	//var link = '?v=' + phVersion + '&n=' + encodeURIComponent(phName) + '&a=' + phArchetype.id + '&d=';
	var link = '?v=' + phVersion + '&n=' + encodeURIComponent(phName) + '&d=';
	if (submit) queueAnalytics(analyticsBuildCatagory, 'Version', phVersion);
	if (submit && phName != '') queueAnalytics(analyticsBuildCatagory, 'Name', phName);
	var params = [];
	params.push(phArchetype.code());
	if (submit && phArchetype.id > 0) queueAnalytics(analyticsBuildCatagory, 'Archtype', phArchetype.name);
	for (var i = 1; i < phSuperStat.length; i++)
	{
		params.push(phSuperStat[i].code());
		if (submit && phSuperStat[i].id > 0) queueAnalytics(analyticsBuildCatagory, 'SuperStat', phSuperStat[i].name);
	}
	for (var i = 1; i < phInnateTalent.length; i++)
	{
		params.push(phInnateTalent[i].code());
		if (submit && phInnateTalent[i].id > 0) queueAnalytics(analyticsBuildCatagory, 'InnateTalent', phInnateTalent[i].name);
	}
	for (var i = 1; i < phTalent.length; i++)
	{
		params.push(phTalent[i].code());
		if (submit && phTalent[i].id > 0) queueAnalytics(analyticsBuildCatagory, 'Talent', phTalent[i].name);
	}
	for (var i = 1; i < phTravelPower.length; i++)
	{
		params.push(phTravelPower[i].code());
		params.push(numToUrlCode(phTravelPowerAdvantage[i] >> 1));
		if (submit && phTravelPower[i].id > 0)
		{
			queueAnalytics(analyticsBuildCatagory, 'TravelPower', phTravelPower[i].name);
			var advantageList = phTravelPower[i].getAdvantageList(phTravelPowerAdvantage[i]);
			for (var j = 0; j < advantageList.length; j++)
			{
				queueAnalytics(analyticsBuildCatagory, 'TravelPowerAdvantage', phTravelPower[i].name + ': ' + advantageList[j].name);
			}
		}
	}
	for (var i = 1; i < phPower.length; i++)
	{
		params.push(phPower[i].code());
		params.push(numToUrlCode2(phPowerAdvantage[i] >> 1));
		if (submit && phPower[i].id > 0)
		{
			queueAnalytics(analyticsBuildCatagory, 'Power', phPower[i].name);
			var advantageList = phPower[i].getAdvantageList(phPowerAdvantage[i]);
			for (var j = 0; j < advantageList.length; j++)
			{
				queueAnalytics(analyticsBuildCatagory, 'PowerAdvantage', phPower[i].name + ': ' + advantageList[j].name);
			}
		}
	}
	for (var i = 1; i < phSpecializationTree.length - 1; i++)
	{
		if (i == 1)
		{
			var specializationMasteryId = getSpecializationMasteryId(phSpecializationTree[4].id);
			params.push(numToUrlCode4(specializationMasteryId | (phSpecialization[1] << 4)));
			if (submit && specializationMasteryId > 0 && phSpecializationTree[specializationMasteryId].id > 0)
				queueAnalytics(analyticsBuildCatagory, 'SpecializationMastery', phSpecializationTree[specializationMasteryId].name);
		}
		else
		{
			params.push(numToUrlCode4(((phSpecializationTree[i].id == 0) ? 0 : phSpecializationTree[i].id - 8) | (phSpecialization[i] << 4)));
		}
		if (submit)
		{
			var specializationList = phSpecializationTree[i].specializationList;
			var specializationPointList = phSpecializationTree[i].getSpecializationList(phSpecialization[i]);
			for (var j = 0; j < specializationList.length; j++)
			{
				if (specializationPointList[j] > 0)
					queueAnalytics(analyticsBuildCatagory, 'Specialization', phSpecializationTree[i].name + ': ' + specializationList[j].name, specializationPointList[j]);
			}
		}
	}
	var data = params.join('');
	if (submit) submitAnalytics(analyticsBuildCatagory, 'Data', data);
	link += data;
	phBuildLinkRef = link;
	phBuildLink = siteUrl + link;
	//var name = phName;
	//if (name == '') name = 'Hero';
	//name = siteName + ': ' + name;
	var url = base + link; // xxx
	field.href = url;
	//field.setAttribute('onclick', 'return submitBuild()');
	//field.innerHTML = name;
	////fieldBookmark.setAttribute('onclick', 'addBookmark(\'' + name + '\',\'' + url + '\')');
	//fieldRef.innerHTML = url;
	fieldRef.value = url;

	// restore previous build--I don't think this ever worked properly, so I'm just removing it.
/*
   if (prevBuildLink != undefined) SaveData("buildLink", prevBuildLink);
   prevBuildLink = url;
   var restore = document.getElementById('restorePrevBuild');
   if (LoadData("buildLink") == undefined) restore.style.display = "none";
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
	var url = LoadData("buildLink");
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
	var result = '';
	switch (type)
	{
	case 1:
		result += '<br />\n';
		break;
	case 2:
	case 3:
	case 4:
	case 5:
		result += '\n';
		break;
	}
	return result;
}

function forumHeader(type, text, isBold = true)
{
	var result = '';

	switch (type)
	{
	case 1:
		result += (isBold ? '<b><u>' : '') + '<span class="forumFirst">' + text + '</font></span>' + (isBold ? '</u></b>' : '');
		break;
	case 2:
		result += (isBold ? '<b><u>' : '') + text + (isBold ? '</u></b>' : '');
		break;
	case 3:
		result += text;
		break;
	case 4:
		result += (isBold ? '[b][u]' : '') + text + (isBold ? '[/u][/b]' : '');
		break;
	case 5:
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
	case 1:
		result += '<span class="forumFirst">' + first + '</span>';
		if (second)
		{
			result += ' <span class="forumSecond"><b>' + second + '</b></span>';
			if (third)
			{
				result += ' <span class="forumThird"><font size="-1"><i>' + third + '</i></font></span>';
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
			result += ' ' + second;
			if (third)
			{
				result += ' ' + third;
			}
		}
		break;
	case 4:
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
	case 5:
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
	var forumPreview = document.getElementById('forumPreview');
	var result = [];
	var buildName = (phName == "") ? "(Unnamed Build)" : phName;

	result.push('<b><u><a href="' + phBuildLink + '"><span class="forumLink">' + buildName + ' - ' + phArchetype.name + '</span></a></u></b>' + forumNewline(1));
	result.push(forumNewline(1));
	result.push(forumHeader(1, 'Super Stats'));
	result.push(forumEntry(1, 'Level 6:', forumName(phSuperStat[1].name), '(Primary)'));
	result.push(forumEntry(1, 'Level 10:', forumName(phSuperStat[2].name), '(Secondary)'));
	result.push(forumEntry(1, 'Level 15:', forumName(phSuperStat[3].name), '(Secondary)'));
	result.push(forumNewline(1));
	result.push(forumHeader(1, 'Talents'));
	result.push(forumEntry(1, 'Level 1:', forumName(phInnateTalent[1].name), forumTalentStatText(phInnateTalent[1].extra)));
	if (phArchetype.id > 1)
	{
		result.push(forumEntry(1, 'Level 7:', forumName(phTalent[1].name), forumTalentStatText(phTalent[1].extra)));
		result.push(forumEntry(1, 'Level 12:', forumName(phTalent[2].name), forumTalentStatText(phTalent[2].extra)));
		result.push(forumEntry(1, 'Level 15:', forumName(phTalent[3].name), forumTalentStatText(phTalent[3].extra)));
		result.push(forumEntry(1, 'Level 20:', forumName(phTalent[4].name), forumTalentStatText(phTalent[4].extra)));
		result.push(forumEntry(1, 'Level 25:', forumName(phTalent[5].name), forumTalentStatText(phTalent[5].extra)));
		result.push(forumEntry(1, 'Level 30:', forumName(phTalent[6].name), forumTalentStatText(phTalent[6].extra)));
		result.push(forumNewline(1));
	}
	else
	{
		result.push(forumEntry(1, 'Level 6:', forumName(phTalent[1].name), forumTalentStatText(phTalent[1].extra)));
		result.push(forumEntry(1, 'Level 9:', forumName(phTalent[2].name), forumTalentStatText(phTalent[2].extra)));
		result.push(forumEntry(1, 'Level 12:', forumName(phTalent[3].name), forumTalentStatText(phTalent[3].extra)));
		result.push(forumEntry(1, 'Level 15:', forumName(phTalent[4].name), forumTalentStatText(phTalent[4].extra)));
		result.push(forumEntry(1, 'Level 18:', forumName(phTalent[5].name), forumTalentStatText(phTalent[5].extra)));
		result.push(forumEntry(1, 'Level 21:', forumName(phTalent[6].name), forumTalentStatText(phTalent[6].extra)));
		result.push(forumNewline(1));
	}
	result.push(forumHeader(1, 'Powers'));
	result.push(forumEntry(1, 'Level 1:', forumName(phPower[1].name), forumAdvantageText(1, 1, phPowerAdvantage[1])));
	result.push(forumEntry(1, 'Level 1:', forumName(phPower[2].name), forumAdvantageText(1, 2, phPowerAdvantage[2])));
	result.push(forumEntry(1, 'Level 6:', forumName(phPower[3].name), forumAdvantageText(1, 3, phPowerAdvantage[3])));
	result.push(forumEntry(1, 'Level 8:', forumName(phPower[4].name), forumAdvantageText(1, 4, phPowerAdvantage[4])));
	result.push(forumEntry(1, 'Level 11:', forumName(phPower[5].name), forumAdvantageText(1, 5, phPowerAdvantage[5])));
	result.push(forumEntry(1, 'Level 14:', forumName(phPower[6].name), forumAdvantageText(1, 6, phPowerAdvantage[6])));
	result.push(forumEntry(1, 'Level 17:', forumName(phPower[7].name), forumAdvantageText(1, 7, phPowerAdvantage[7])));
	if (phArchetype.id > 1)
	{
		result.push(forumEntry(1, 'Level 21:', forumName(phPower[8].name), forumAdvantageText(1, 8, phPowerAdvantage[8])));
		result.push(forumEntry(1, 'Level 25:', forumName(phPower[9].name), forumAdvantageText(1, 9, phPowerAdvantage[9])));
		result.push(forumEntry(1, 'Level 30:', forumName(phPower[10].name), forumAdvantageText(1, 10, phPowerAdvantage[10])));
		result.push(forumEntry(1, 'Level 35:', forumName(phPower[11].name), forumAdvantageText(1, 11, phPowerAdvantage[11])));
		result.push(forumEntry(1, 'Level 40:', forumName(phPower[12].name), forumAdvantageText(1, 12, phPowerAdvantage[12])));
		result.push(forumNewline(1));
	}
	else
	{
		result.push(forumEntry(1, 'Level 20:', forumName(phPower[8].name), forumAdvantageText(1, 8, phPowerAdvantage[8])));
		result.push(forumEntry(1, 'Level 23:', forumName(phPower[9].name), forumAdvantageText(1, 9, phPowerAdvantage[9])));
		result.push(forumEntry(1, 'Level 26:', forumName(phPower[10].name), forumAdvantageText(1, 10, phPowerAdvantage[10])));
		result.push(forumEntry(1, 'Level 29:', forumName(phPower[11].name), forumAdvantageText(1, 11, phPowerAdvantage[11])));
		result.push(forumEntry(1, 'Level 32:', forumName(phPower[12].name), forumAdvantageText(1, 12, phPowerAdvantage[12])));
		result.push(forumEntry(1, 'Level 35:', forumName(phPower[13].name), forumAdvantageText(1, 13, phPowerAdvantage[13])));
		result.push(forumEntry(1, 'Level 38:', forumName(phPower[14].name), forumAdvantageText(1, 14, phPowerAdvantage[14])));
		result.push(forumEntry(1, 'Adv. Points:', statAdvantagePoints + '/' + maxAdvantagePointsTotal));
		result.push(forumNewline(1));
	}
	result.push(forumHeader(1, 'Travel Powers'));
	result.push(forumEntry(1, 'Level 6:', forumName(phTravelPower[1].name), forumAdvantageText(2, 1, phTravelPowerAdvantage[1])));
	result.push(forumEntry(1, 'Level 35:', forumName(phTravelPower[2].name), forumAdvantageText(2, 2, phTravelPowerAdvantage[2])));
	result.push(forumNewline(1));
	result.push(forumHeader(1, 'Specializations'));
	for (var i = 1; i <= 3; i++)
	{
		var specializationTree = phSpecializationTree[i];
		var mask = phSpecialization[i];
		var specializationList = specializationTree.specializationList;
		var specializationPointList = specializationTree.getSpecializationList(mask);
		for (var j = 0; j < specializationList.length - 1; j++)
		{
			if (specializationPointList[j] > 0)
			{
				result.push(forumEntry(1, specializationTree.name + ':', forumName(specializationList[j].name), '(' + specializationPointList[j] + '/' + specializationList[j].maxPoints + ')'));
			}
		}
	}
	if (phSpecializationTree[4].id != 0)
	{
		result.push(forumEntry(1, 'Mastery:', forumName(phSpecializationTree[4].name) + ' Mastery', '(1/1)'));
	}
	forumPreview.innerHTML = result.join('');
}
window['forumPreview'] = forumPreview;

// forum export
function setForumExportType(forumType)
{
	forumExportType = forumType;
	SaveData("forumType", forumType);
}
window['setForumExportType'] = setForumExportType;

function selectForumExportType(forumType)
{
	document.getElementById('exportType_' + forumExportType).setAttribute('class', 'button');
	setForumExportType(forumType);
	document.getElementById('exportType_' + forumExportType).setAttribute('class', 'selectedButton');
	showView('Export');
}
window['selectForumExportType'] = selectForumExportType;

function forumExport()
{
	var forumType = LoadData("forumType");
	var forumTypeNum;
	if (forumType == undefined) forumType = forumExportType;
	setForumExportType(forumType);
	if (forumType == 'co') forumTypeNum = 2;			// html <b><font color="#ff0000">Bold Red</font></b>
	else if (forumType == 'txt') forumTypeNum = 3;		// plain text
	else if (forumType == 'phpbbs') forumTypeNum = 4;	// phpbb [b][color=#ff0000]Bold Red[/color][/b]
	else if (forumType == 'markdown') forumTypeNum = 5;	// markdown **bold**
	else forumTypeNum = 3;
	document.getElementById('exportType_' + forumType).setAttribute('class', 'selectedButton');
	var forumText = document.getElementById('forumText');
	var result = [];
	var buildName = (phName == "") ? "(Unnamed Build)" : phName;

	switch (forumTypeNum)
	{
	case 2:
		result.push('<b><u><a href="' + phBuildLink + '">' + buildName + ' - ' + phArchetype.name + '</a></u></b>' + forumNewline(forumTypeNum));
		break;
	case 3:
		result.push(buildName + ' - ' + phArchetype.name + forumNewline(forumTypeNum) + forumNewline(forumTypeNum));
		result.push('Link to this build: ' + phBuildLink + forumNewline(forumTypeNum));
		break;
	case 4:
		result.push('[b][u][url=' + phBuildLink + ']' + phName + '[/url][/u][/b]' + forumNewline(forumTypeNum));
		break;
	case 5:
		result.push('__**' + buildName + ' - ' + phArchetype.name + '**__' + forumNewline(forumTypeNum) + forumNewline(forumTypeNum));
		result.push('Link to this build: __' + phBuildLink + '__' + forumNewline(forumTypeNum));
		break;
	}
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, 'Super Stats'));
	result.push(forumEntry(forumTypeNum, 'Level 6:', forumName(phSuperStat[1].name), '(Primary)'));
	result.push(forumEntry(forumTypeNum, 'Level 10:', forumName(phSuperStat[2].name), '(Secondary)'));
	result.push(forumEntry(forumTypeNum, 'Level 15:', forumName(phSuperStat[3].name), '(Secondary)'));
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, 'Talents'));
	result.push(forumEntry(forumTypeNum, 'Level 1:', forumName(phInnateTalent[1].name), forumTalentStatText(phInnateTalent[1].extra)));
	if (phArchetype.id > 1)
	{
		result.push(forumEntry(forumTypeNum, 'Level 7:', forumName(phTalent[1].name), forumTalentStatText(phTalent[1].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 12:', forumName(phTalent[2].name), forumTalentStatText(phTalent[2].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 15:', forumName(phTalent[3].name), forumTalentStatText(phTalent[3].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 20:', forumName(phTalent[4].name), forumTalentStatText(phTalent[4].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 25:', forumName(phTalent[5].name), forumTalentStatText(phTalent[5].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 30:', forumName(phTalent[6].name), forumTalentStatText(phTalent[6].extra)));
		result.push(forumNewline(forumTypeNum));
	}
	else
	{
		result.push(forumEntry(forumTypeNum, 'Level 6:', forumName(phTalent[1].name), forumTalentStatText(phTalent[1].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 9:', forumName(phTalent[2].name), forumTalentStatText(phTalent[2].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 12:', forumName(phTalent[3].name), forumTalentStatText(phTalent[3].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 15:', forumName(phTalent[4].name), forumTalentStatText(phTalent[4].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 18:', forumName(phTalent[5].name), forumTalentStatText(phTalent[5].extra)));
		result.push(forumEntry(forumTypeNum, 'Level 21:', forumName(phTalent[6].name), forumTalentStatText(phTalent[6].extra)));
		result.push(forumNewline(forumTypeNum));
	}
	result.push(forumHeader(forumTypeNum, 'Powers'));
	result.push(forumEntry(forumTypeNum, 'Level 1:', forumName(phPower[1].name), forumAdvantageText(1, 1, phPowerAdvantage[1])));
	result.push(forumEntry(forumTypeNum, 'Level 1:', forumName(phPower[2].name), forumAdvantageText(1, 2, phPowerAdvantage[2])));
	result.push(forumEntry(forumTypeNum, 'Level 6:', forumName(phPower[3].name), forumAdvantageText(1, 3, phPowerAdvantage[3])));
	result.push(forumEntry(forumTypeNum, 'Level 8:', forumName(phPower[4].name), forumAdvantageText(1, 4, phPowerAdvantage[4])));
	result.push(forumEntry(forumTypeNum, 'Level 11:', forumName(phPower[5].name), forumAdvantageText(1, 5, phPowerAdvantage[5])));
	result.push(forumEntry(forumTypeNum, 'Level 14:', forumName(phPower[6].name), forumAdvantageText(1, 6, phPowerAdvantage[6])));
	result.push(forumEntry(forumTypeNum, 'Level 17:', forumName(phPower[7].name), forumAdvantageText(1, 7, phPowerAdvantage[7])));
	if (phArchetype.id > 1)
	{
		result.push(forumEntry(forumTypeNum, 'Level 21:', forumName(phPower[8].name), forumAdvantageText(1, 8, phPowerAdvantage[8])));
		result.push(forumEntry(forumTypeNum, 'Level 25:', forumName(phPower[9].name), forumAdvantageText(1, 9, phPowerAdvantage[9])));
		result.push(forumEntry(forumTypeNum, 'Level 30:', forumName(phPower[10].name), forumAdvantageText(1, 10, phPowerAdvantage[10])));
		result.push(forumEntry(forumTypeNum, 'Level 35:', forumName(phPower[11].name), forumAdvantageText(1, 11, phPowerAdvantage[11])));
		result.push(forumEntry(forumTypeNum, 'Level 40:', forumName(phPower[12].name), forumAdvantageText(1, 12, phPowerAdvantage[12])));
	}
	else
	{
		result.push(forumEntry(forumTypeNum, 'Level 20:', forumName(phPower[8].name), forumAdvantageText(1, 8, phPowerAdvantage[8])));
		result.push(forumEntry(forumTypeNum, 'Level 23:', forumName(phPower[9].name), forumAdvantageText(1, 9, phPowerAdvantage[9])));
		result.push(forumEntry(forumTypeNum, 'Level 26:', forumName(phPower[10].name), forumAdvantageText(1, 10, phPowerAdvantage[10])));
		result.push(forumEntry(forumTypeNum, 'Level 29:', forumName(phPower[11].name), forumAdvantageText(1, 11, phPowerAdvantage[11])));
		result.push(forumEntry(forumTypeNum, 'Level 32:', forumName(phPower[12].name), forumAdvantageText(1, 12, phPowerAdvantage[12])));
		result.push(forumEntry(forumTypeNum, 'Level 35:', forumName(phPower[13].name), forumAdvantageText(1, 13, phPowerAdvantage[13])));
		result.push(forumEntry(forumTypeNum, 'Level 38:', forumName(phPower[14].name), forumAdvantageText(1, 14, phPowerAdvantage[14])));
	}

	result.push(forumEntry(forumTypeNum, 'Adv. Points:', statAdvantagePoints + '/' + maxAdvantagePointsTotal));
	result.push(forumNewline(forumTypeNum));

	result.push(forumHeader(forumTypeNum, 'Travel Powers'));
	result.push(forumEntry(forumTypeNum, 'Level 6:', forumName(phTravelPower[1].name), forumAdvantageText(2, 1, phTravelPowerAdvantage[1])));
	result.push(forumEntry(forumTypeNum, 'Level 35:', forumName(phTravelPower[2].name), forumAdvantageText(2, 2, phTravelPowerAdvantage[2])));
	result.push(forumNewline(forumTypeNum));
	result.push(forumHeader(forumTypeNum, 'Specializations'));
	for (var i = 1; i <= 3; i++)
	{
		var specializationTree = phSpecializationTree[i];
		var mask = phSpecialization[i];
		var specializationList = specializationTree.specializationList;
		var specializationPointList = specializationTree.getSpecializationList(mask);
		for (var j = 0; j < specializationList.length - 1; j++)
		{
			if (specializationPointList[j] > 0)
			{
				result.push(forumEntry(forumTypeNum, specializationTree.name + ':', forumName(specializationList[j].name), '(' + specializationPointList[j] + '/' + specializationList[j].maxPoints + ')'));
			}
		}
	}
	if (phSpecializationTree[4].id != 0)
	{
		result.push(forumEntry(forumTypeNum, 'Mastery:', forumName(phSpecializationTree[4].name) + ' Mastery', '(1/1)'));
	}

	forumText.innerHTML = result.join('');
}
window['forumExport'] = forumExport;

// preferences
function setPrefFontFamily(fontFamily)
{
	prefFontFamily = fontFamily;
	SaveData("prefFontFamily", fontFamily);
	document.getElementById('body').style.fontFamily = fontFamily + ', sans-serif';
	document.getElementById('prefFontFamilyName').innerHTML = fontFamily;
	selectClearHideSections();
	//submitAnalytics(analyticsPrefCatagory, 'PrefFontFamily', fontFamily);
}
window['setPrefFontFamily'] = setPrefFontFamily;

function selectPrefFontFamily()
{
	var i, mFont, mTable, mTr, mTd
	var aTRList = [];
	var iCurrentColumn = 0;
	var iColumnCount = Math.floor(prefFontFamilyList.length / iFontsPerColumn) + 1;
	if (iColumnCount > iMaxFontColumns) iColumnCount = iMaxFontColumns;
	var iLength = prefFontFamilyList.length;
	if (iLength > iMaxFontColumns * iFontsPerColumn) iLength = iMaxFontColumns * iFontsPerColumn;

	ResetDialogBox();
	SetDialogBoxHeader("Select Preset");

	mTable = document.createElement("table");
	AddItemToDialogBox(mTable);

	for (i = 0; i < iLength; i++)
	{
		iCurrentColumn = Math.floor(i / iFontsPerColumn);
		mFont = document.createElement("a");
		mFont.setAttribute("id", "selectPrefFontFamily" + i);
		mFont.setAttribute("onclick", "setPrefFontFamily('" + prefFontFamilyList[i] + "')");
		mFont.setAttribute("style", "display: block; margin-right: 1em; font-family: " + prefFontFamilyList[i]);
		mFont.innerHTML = prefFontFamilyList[i];

		if (iCurrentColumn == 0)
		{
			mTr = document.createElement("tr");
			aTRList.push(mTr);
			mTable.appendChild(mTr);
		}

		mTr = aTRList[i % iFontsPerColumn];
		mTd = document.createElement("td");
		mTr.appendChild(mTd);
		mTd.appendChild(mFont);
	}
	showPositionSection("selectionWindow", true);
}
window['selectPrefFontFamily'] = selectPrefFontFamily;

function setPrefFontSize(fontSize)
{
	prefFontSize = fontSize;
	SaveData("prefFontSize", fontSize);
	document.getElementById('body').style.fontSize = fontSize + '%';
	document.getElementById('prefFontSize').innerHTML = fontSize + '%';
	//submitAnalytics(analyticsPrefCatagory, 'PrefFontSize', fontSize);
}
window['setPrefFontSize'] = setPrefFontSize;

function selectPrefFontSize(change)
{
	setPrefFontSize(prefFontSize + change * 10);
}
window['selectPrefFontSize'] = selectPrefFontSize;

// function populateFontList(fontList) {
//     prefFontFamilyList = [];
//     for (var key in fontList) {
//         var fontName = fontList[key];
//         fontName = fontName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//         if (!(fontName.match(/[_\-\s]Italic$/)
//               || fontName.match(/[_\-\s](Demi)?[Bb]old$/)
//               || fontName.match(/[_\-\s]Medium$/)
//               || fontName.match(/[_\-\s](Ultra)?[Ll]ight$/)
//               || fontName.match(/[_\-\s]Condensed$/))) {
//             fontName = fontName.replace(/\s*Regular$/, '');
//             prefFontFamilyList.add(fontName);
//         }
//     }
// }
// window['populateFontList'] = populateFontList;
function setPrefPopupTips(popupTips)
{
	prefPopupTips = popupTips;
	SaveData("prefPopupTips", popupTips);
	document.getElementById('prefPopupTipsValue').innerHTML = prefPopupTipsList[popupTips];
	//submitAnalytics(analyticsPrefCatagory, 'PrefPopupTips', prefPopupTipsList[popupTips]);
}
window['setPrefPopupTips'] = setPrefPopupTips;

function selectPrefPopupTips()
{
	setPrefPopupTips((prefPopupTips + 1) % 3);
}
window['selectPrefPopupTips'] = selectPrefPopupTips;

function setPrefConfirmSelections(confirmSelections)
{
	prefConfirmSelections = confirmSelections;
	SaveData("prefConfirmSelections", confirmSelections);
	document.getElementById('prefConfirmSelectionsValue').innerHTML = (confirmSelections ? 'On' : 'Off');
	//submitAnalytics(analyticsPrefCatagory, 'PrefConfirmSelections', (confirmSelections ? 'On' : 'Off'));
}
window['setPrefConfirmSelections'] = setPrefConfirmSelections;

function selectPrefConfirmSelections()
{
	setPrefConfirmSelections(!prefConfirmSelections);
}
window['selectPrefConfirmSelections'] = selectPrefConfirmSelections;

function setPrefAnalytics(analytics)
{
	/*
	if (prefAnalytics && !analytics) submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', 'Off');
	prefAnalytics = analytics;
	SaveData("prefAnalytics", analytics);
	document.getElementById('prefAnalyticsValue').innerHTML = (analytics ? 'On' : 'Off');
	submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', (analytics ? 'On' : 'Off'));
	if (prefAnalytics && analytics) submitAnalytics(analyticsPrefCatagory, 'PrefAnalytics', 'On');
	*/
}
window['setPrefAnalytics'] = setPrefAnalytics;

function selectPrefAnalytics()
{
	setPrefAnalytics(!prefAnalytics);
}
window['selectPrefAnalytics'] = selectPrefAnalytics;

// show views
function showView(view)
{
	var section = document.getElementById('view' + view);
	document.getElementById('viewEdit').style.display = 'none';
	document.getElementById('viewData').style.display = 'none';
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
	for (var i = 1; i < dataSuperStat.length; i++)
	{
		win.document.write('dataSuperStat[' + i + '] = ' + dataSuperStat[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="innate-talent">Innate Talent Data</h3>');
	for (var i = 1; i < dataInnateTalent.length; i++)
	{
		win.document.write('dataInnateTalent[' + i + '] = ' + dataInnateTalent[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="talent">Talent Data</h3>');
	for (var i = 1; i < dataTalent.length; i++)
	{
		win.document.write('dataTalent[' + i + '] = ' + dataTalent[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="travel-power">Travel Power Data</h3>');
	for (var i = 1; i < dataTravelPower.length; i++)
	{
		win.document.write('dataTravelPower[' + i + '] = ' + dataTravelPower[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="power-set">Power Set Data</h3>');
	for (var i = 1; i < dataPowerSet.length; i++)
	{
		win.document.write('dataPowerSet[' + i + '] = ' + dataPowerSet[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="framework">Framework Data</h3>');
	for (var i = 1; i < dataFramework.length; i++)
	{
		win.document.write('dataFramework[' + i + '] = ' + dataFramework[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="power">Power Data</h3>');
	for (var i = 1; i < dataPower.length; i++)
	{
		win.document.write('dataPower[' + i + '] = ' + dataPower[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="archetype-group">Archetype Group Data</h3>');
	for (var i = 1; i < dataArchetypeGroup.length; i++)
	{
		win.document.write('dataArchetypeGroup[' + i + '] = ' + dataArchetypeGroup[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="archetype">Archetype Data</h3>');
	for (var i = 1; i < dataArchetype.length; i++)
	{
		win.document.write('dataArchetype[' + i + '] = ' + dataArchetype[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="specialization-tree">Specialization Tree Data</h3>');
	for (var i = 1; i < dataSpecializationTree.length; i++)
	{
		win.document.write('dataSpecializationTree[' + i + '] = ' + dataSpecializationTree[i].toString() + '<br />');
	}
	win.document.write('<hr>');
	win.document.write('<h2 id="version-update">Version Update Data</h3>');
	for (var i = 1; i < dataVersionUpdate.length; i++)
	{
		win.document.write('dataVersionUpdate[' + i + '] = ' + dataVersionUpdate[i].toString() + '<br />');
	}
	win.focus();
}
window['dataDump'] = dataDump;

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
	// font family
	var fontFamily = LoadData("prefFontFamily");
	if (fontFamily == undefined) fontFamily = prefFontFamily;
	setPrefFontFamily(fontFamily);
	// font size
	var fontSize = LoadData("prefFontSize");
	if (fontSize == undefined || isNaN(fontSize)) fontSize = prefFontSize;
	setPrefFontSize(parseInt(fontSize));
	// popup tips
	var popupTips = LoadData("prefPopupTips");
	if (popupTips == undefined || isNaN(popupTips)) popupTips = prefPopupTips;
	else popupTips = parseInt(popupTips);
	setPrefPopupTips(popupTips);
	// confirm selections
	var confirmSelections = LoadData("prefConfirmSelections");
	if (confirmSelections == undefined) confirmSelections = prefConfirmSelections;
	else confirmSelections = coerceToBoolean(confirmSelections, prefConfirmSelections);
	setPrefConfirmSelections(confirmSelections);
	// analytics - removed
/*
   var analytics = LoadData("prefAnalytics");
   if (analytics == undefined) analytics = prefAnalytics;
   else analytics = coerceToBoolean(analytics, prefAnalytics);
   setPrefAnalytics(analytics);
 */
}
window['setupPrefs'] = setupPrefs;

// start
function start()
{
	// setup preferences
	setupPrefs();

	// setup header/footer
	document.getElementById('header').style.display = '';
	document.getElementById('footer').style.display = '';

	// show edit view
	showView('Edit');

	// setup version
	document.getElementById("releaseDate").innerHTML = releaseDate;
	document.getElementById("appVersion").innerHTML = appVersion;
	document.getElementById("dataVersion").innerHTML = buildVersion;

	// setup name
	document.getElementById('fieldName').firstChild.data = phName;
	document.getElementById('sectionDisplayName').style.display = '';
	document.getElementById('editName').value = phName;
	document.getElementById('sectionEditName').style.display = 'none';
	setTitle();

	// setup archetype
	var mArchetypeDisplay = document.getElementById('fieldArchetype');
	mArchetypeDisplay.innerHTML = phArchetype.desc + "&nbsp;" + phArchetype.name;
	setOnmouseoverPopupL1(mArchetypeDisplay, "<b>" + phArchetype.name + "</b><br /><br />" + phArchetype.tip);

	/*
	   // setup super stats
	   setupSuperStats();

	   // setup innate talents
	   setupInnateTalents();

	   // setup talents
	   setupTalents();

	   // setup travel powers
	   setupTravelPowers();

	   // setup frameworks
	   setupFrameworks();
	 */
	// setup powers
	// powers are setup when a framework is selected with the `selectFramework' function
	//hideSection('selectionPower');
	//hideSection('selectionPowerAdvantage');

	// setup archetypes
	//setupArchtypes();

	// parse url
	parseUrlParams(window.location.href);

	// change updates
	changeUpdate();

	// submit build to google analytics
	submitBuild();
	
	// setup saved data
	RefreshSaveList();
	if (LocalStorageSupported()) SetUpSaveTools();

	// show debug tab if debug mode is true
	if (debug)
	{
		document.getElementById("showViewDebug").style.visibility = "visible";
		document.getElementById("title").innerHTML = siteName + " Beta " + appVersion + "-" + buildVersion;
	}
}
window['start'] = start;

window.onload = start;

//==============================================================================
// powerhouse.js ends here
//==============================================================================
