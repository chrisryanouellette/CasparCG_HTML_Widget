/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/widget.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/widget.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat:400&display=swap);"]);
// Module
exports.push([module.i, ".DEV-WIDGET-OPEN {\n  height: 17vw;\n  width: 17vw; }\n  .DEV-WIDGET-OPEN .DEV-WIDGET-PLAYOUT-CONTROLS {\n    flex-wrap: wrap; }\n    .DEV-WIDGET-OPEN .DEV-WIDGET-PLAYOUT-CONTROLS button {\n      flex-basis: 30%;\n      font-size: 1.25em;\n      margin: .5vh 0; }\n    .DEV-WIDGET-OPEN .DEV-WIDGET-PLAYOUT-CONTROLS button.DEV-WIDGET-UPDATE {\n      flex-basis: 100%; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-HIDE::after {\n    content: 'Hide'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-SHRINK::after {\n    content: 'Shrink'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-INVIS::after {\n    content: 'Invis'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-PLAY::after {\n    content: 'Play'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-NEXT::after {\n    content: 'Next'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-STOP::after {\n    content: 'Stop'; }\n  .DEV-WIDGET-OPEN button.DEV-WIDGET-UPDATE::after {\n    content: 'Update'; }\n\n.DEV-WIDGET-SHRUNKEN .DEV-WIDGET-SECTION {\n  flex-direction: column; }\n  .DEV-WIDGET-SHRUNKEN .DEV-WIDGET-SECTION button {\n    margin: .5vh 0; }\n\n.DEV-WIDGET-SHRUNKEN div.DEV-WIDGET-STYLE-CONTROLS, .DEV-WIDGET-SHRUNKEN div.DEV-WIDGET-SETTINGS, .DEV-WIDGET-SHRUNKEN div.DEV-WIDGET-LOGGER {\n  display: none; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-HIDE::after {\n  content: 'H'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-SHRINK::after {\n  content: 'S'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-INVIS::after {\n  content: 'I'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-PLAY::after {\n  content: 'P'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-NEXT::after {\n  content: 'N'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-STOP::after {\n  content: 'S'; }\n\n.DEV-WIDGET-SHRUNKEN button.DEV-WIDGET-UPDATE::after {\n  content: 'U'; }\n\n.DEV-WIDGET-HIDDEN div.DEV-WIDGET-CONTROLS .DEV-WIDGET-STYLE-CONTROLS,\n.DEV-WIDGET-HIDDEN div.DEV-WIDGET-DISPLAY-CONTROLS button:not(.DEV-WIDGET-HIDE),\n.DEV-WIDGET-HIDDEN div.DEV-WIDGET-PLAYOUT-CONTROLS,\n.DEV-WIDGET-HIDDEN div.DEV-WIDGET-LOGGER,\n.DEV-WIDGET-HIDDEN div.DEV-WIDGET-SETTINGS {\n  display: none; }\n\n.DEV-WIDGET-HIDDEN button.DEV-WIDGET-HIDE::after {\n  content: 'H'; }\n\n.DEV-WIDGET .DEV-WIDGET-GITHUB-ICON, .DEV-WIDGET .DEV-WIDGET-SETTINGS-ICON {\n  fill: white; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP-ICON circle {\n  fill: none;\n  stroke: white;\n  stroke-width: .3vw; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP-ICON path {\n  fill: white; }\n\n.DEV-WIDGET .DEV-WIDGET-CONVERT-TO-JSON,\n.DEV-WIDGET .DEV-WIDGET-PLUS-ICON,\n.DEV-WIDGET .DEV-WIDGET-MINUS-ICON,\n.DEV-WIDGET .DEV-WIDGET-CLOSE-ICON,\n.DEV-WIDGET .DEV-WIDGET-TRASH-ICON {\n  stroke: white; }\n  .DEV-WIDGET .DEV-WIDGET-CONVERT-TO-JSON circle,\n  .DEV-WIDGET .DEV-WIDGET-PLUS-ICON circle,\n  .DEV-WIDGET .DEV-WIDGET-MINUS-ICON circle,\n  .DEV-WIDGET .DEV-WIDGET-CLOSE-ICON circle,\n  .DEV-WIDGET .DEV-WIDGET-TRASH-ICON circle {\n    fill: none;\n    stroke-width: .3vw; }\n  .DEV-WIDGET .DEV-WIDGET-CONVERT-TO-JSON line,\n  .DEV-WIDGET .DEV-WIDGET-PLUS-ICON line,\n  .DEV-WIDGET .DEV-WIDGET-MINUS-ICON line,\n  .DEV-WIDGET .DEV-WIDGET-CLOSE-ICON line,\n  .DEV-WIDGET .DEV-WIDGET-TRASH-ICON line {\n    stroke-width: .2vw; }\n\n.DEV-WIDGET .DEV-WIDGET-TRASH-ICON path:first-of-type {\n  fill: white; }\n\n.DEV-WIDGET .DEV-WIDGET-TRASH-ICON g line {\n  stroke: #282828;\n  stroke-width: .20vw; }\n\n.DEV-WIDGET .DEV-WIDGET-CLOSE-ICON {\n  transform: rotate(45deg); }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON > path:first-of-type {\n  fill: #282828;\n  stroke: white;\n  stroke-width: .4vw;\n  transition: stroke .5s; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON > rect:first-of-type {\n  fill: white;\n  transition: fill .5s; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON rect:nth-of-type(2) {\n  fill: #282828; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON > rect:last-of-type {\n  fill: white;\n  transition: fill .5s; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON line {\n  stroke: #282828;\n  stroke-width: .2vw; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVE-ICON g path, .DEV-WIDGET .DEV-WIDGET-SAVE-ICON g rect {\n  fill: white;\n  stroke: #282828;\n  stroke-width: .05vw; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVED > path:first-of-type {\n  stroke: #29AF1D; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVED > rect:first-of-type {\n  fill: #29AF1D; }\n\n.DEV-WIDGET .DEV-WIDGET-SAVED > rect:last-of-type {\n  fill: #29AF1D; }\n\n.DEV-WIDGET .DEV-WIDGET-CONVERT-TO-JSON path {\n  fill: none;\n  stroke: white;\n  stroke-width: .15vw;\n  stroke-linecap: round;\n  stroke-linejoin: round; }\n\n.DEV-WIDGET {\n  background-color: #282828;\n  border: .2vw solid transparent;\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  padding: .5vw;\n  position: absolute;\n  z-index: 5; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT .DEV-WIDGET-SELECTED {\n    align-items: center;\n    border: .1vw solid white;\n    border-radius: .3vw;\n    display: flex;\n    text-align: center; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT label {\n    user-select: none;\n    margin: 0 auto; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT ul {\n    background-color: #282828;\n    border: .1vw solid black;\n    display: none;\n    position: absolute;\n    margin: -.15rem 0 0 0;\n    padding: .25em .5em;\n    width: max-content;\n    z-index: -1; }\n    .DEV-WIDGET .DEV-WIDGET-SELECT ul li {\n      color: white;\n      list-style: none;\n      padding: 10px 5px;\n      user-select: none; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT svg {\n    height: 1.5vw;\n    width: 1.5vw; }\n    .DEV-WIDGET .DEV-WIDGET-SELECT svg path:first-of-type {\n      fill: white; }\n    .DEV-WIDGET .DEV-WIDGET-SELECT svg path {\n      fill: #282828; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT-OPEN ul {\n    display: block;\n    z-index: 10; }\n  .DEV-WIDGET .DEV-WIDGET-SELECT-OPEN svg {\n    transform: rotate(180deg); }\n  .DEV-WIDGET .DEV-WIDGET-CHECKBOX {\n    border: .15vw solid white;\n    color: white;\n    font-size: 1.25em;\n    margin: 0 auto;\n    height: 1.5vw;\n    width: 1.5vw; }\n  .DEV-WIDGET .DEV-WIDGET-CHECKED::after {\n    display: block;\n    content: \"\\2713\";\n    margin: -.25vw auto 0 auto;\n    text-align: center; }\n  .DEV-WIDGET * {\n    font-weight: 400;\n    font-size: 1vw;\n    font-family: \"Montserrat\", sans-serif; }\n  .DEV-WIDGET button {\n    background-color: transparent;\n    border: none;\n    border-radius: 5px;\n    color: white; }\n    .DEV-WIDGET button.DEV-WIDGET-DANGER-BUTTON {\n      background-color: #EB261F; }\n    .DEV-WIDGET button.DEV-WIDGET-BUTTON-INACTIVE {\n      color: #B5B5B5; }\n  .DEV-WIDGET input {\n    background-color: white;\n    border: .1vw solid transparent;\n    border-radius: 5px;\n    margin: .25em 0;\n    padding: .15em; }\n  .DEV-WIDGET svg {\n    width: 50%; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA > div {\n  min-width: 55vw; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA h2 {\n  align-items: center;\n  display: flex;\n  white-space: nowrap; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA h2 svg {\n    padding-left: 1vw;\n    width: 1.5vw; }\n    .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA h2 svg:first-of-type {\n      margin-left: auto; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND {\n  display: grid;\n  grid-template-columns: min-content 1fr; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div {\n    display: flex;\n    flex-direction: column;\n    height: 50vh;\n    overflow: hidden;\n    padding: 0 1.5vw; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND {\n  grid-auto-flow: column; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type {\n  border-right: 2px solid white; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type div {\n    display: flex;\n    flex-direction: column;\n    min-height: 15vh;\n    max-height: 18vh;\n    overflow-y: auto; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type label {\n    border-bottom: 1.5px solid transparent;\n    margin-bottom: .5vw; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type svg {\n    stroke: white;\n    stroke-width: .5vw;\n    margin-right: .25vw;\n    width: .7vw; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type .DEV-WIDGET-SELECTED {\n    border-bottom: 1.5px solid white; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND > div:first-of-type h2:last-of-type {\n    cursor: pointer; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON {\n  border: 0.15vw solid #1177B7;\n  margin: 0 auto;\n  width: -webkit-fill-available; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON .DEV-WIDGET-TEMPLATE-DATA-CON {\n    width: 95%;\n    margin: .5vh auto; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON .DEV-WIDGET-SELECT {\n    flex-basis: 100%; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON:first-of-type, .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA textarea {\n  height: inherit;\n  overflow-y: auto;\n  overflow-x: hidden; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-POPUP-BACKGROUND {\n  height: 100%;\n  min-width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED {\n  border: 0.15vw solid #EB261F; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED .DEV-WIDGET-TEMPLATE-DATA-CON {\n    border: 0.15vw solid #EB261F; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM {\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  justify-content: unset;\n  padding: .25em .5em; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM > *:not(button) {\n    margin: 0 .5em; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM input {\n    width: 100%; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM button {\n    display: flex; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM button[style] {\n    margin-left: auto; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM .DEV-WIDGET-CHECKBOX {\n    flex: 1;\n    min-width: 3vw; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-DATA-ITEM svg {\n    width: 1.5vw; }\n\n.DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME {\n  align-items: center;\n  display: inherit;\n  justify-content: space-between;\n  height: 5vh; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME input {\n    width: 100%; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME button {\n    margin-left: 1vw;\n    padding: 0; }\n    .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME button:focus {\n      outline: none; }\n  .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME button, .DEV-WIDGET .DEV-WIDGET-TEMPLATE-DATA .DEV-WIDGET-TEMPLATE-NAME svg {\n    height: 2vw; }\n\n.DEV-WIDGET .DEV-WIDGET-USER-SETTINGS button:not(.DEV-WIDGET-CLOSE-BUTTON) {\n  margin: 1vh 0; }\n\n.DEV-WIDGET .DEV-WIDGET-USER-SETTINGS input {\n  margin: 0 auto;\n  text-align: center;\n  width: 3vw; }\n\n.DEV-WIDGET .DEV-WIDGET-USER-SETTINGS .DEV-WIDGET-POPUP-BACKGROUND {\n  display: inherit; }\n\n.DEV-WIDGET .DEV-WIDGET-USER-SETTINGS .DEV-WIDGET-POPUP-FORM {\n  border-bottom: 2px solid white;\n  display: grid;\n  grid-template-columns: 3fr 1fr;\n  grid-row-gap: .25em;\n  padding-bottom: 1em; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP .DEV-WIDGET-POPUP-BACKGROUND {\n  display: grid;\n  grid-template-columns: min-content 1fr;\n  grid-row-gap: .5em;\n  max-width: 40vw;\n  padding: .5em; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP label {\n  white-space: nowrap;\n  margin-right: 1em; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP label:not(:last-of-type) {\n  margin-bottom: 2.5em; }\n\n.DEV-WIDGET .DEV-WIDGET-HELP p {\n  grid-column: 2; }\n\n.DEV-WIDGET .DEV-WIDGET-POPUP {\n  display: none;\n  position: absolute;\n  height: 98vh;\n  width: 98vw;\n  top: 0;\n  left: 0; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP > div {\n    display: inherit;\n    flex-direction: inherit; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP h2, .DEV-WIDGET .DEV-WIDGET-POPUP p {\n    color: white;\n    margin: 0; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP h2 {\n    font-size: 1.5em;\n    grid-column: span 2;\n    margin: .25em 0 .5em 0; }\n    .DEV-WIDGET .DEV-WIDGET-POPUP h2 button {\n      font-size: .75em;\n      float: right; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP label {\n    color: white; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP svg {\n    width: 2vw; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP button {\n    font-size: 1.5em; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP .DEV-WIDGET-CLOSE-BUTTON {\n    margin-left: auto;\n    width: min-content; }\n  .DEV-WIDGET .DEV-WIDGET-POPUP .DEV-WIDGET-POPUP-BACKGROUND {\n    background-color: #282828;\n    border-radius: 10px;\n    flex-direction: inherit;\n    min-width: 25vw;\n    padding: .5vh .5vw; }\n    .DEV-WIDGET .DEV-WIDGET-POPUP .DEV-WIDGET-POPUP-BACKGROUND .DEV-WIDGET-TEMPLATE-DATA-CONTROLLER {\n      flex: 1;\n      display: inherit;\n      justify-content: space-around;\n      margin: 1vh 0; }\n\n.DEV-WIDGET .DEV-WIDGET-POPUP-OPEN {\n  align-items: center;\n  display: inherit;\n  flex-direction: column;\n  justify-content: center; }\n\n.DEV-WIDGET .DEV-WIDGET-SECTION {\n  display: inherit;\n  justify-content: space-between; }\n\n.DEV-WIDGET .DEV-WIDGET-CONTROLS {\n  flex-direction: column; }\n\n.DEV-WIDGET .DEV-WIDGET-STYLE-CONTROLS {\n  flex-wrap: wrap; }\n  .DEV-WIDGET .DEV-WIDGET-STYLE-CONTROLS button {\n    margin: 0 auto;\n    text-align: center; }\n  .DEV-WIDGET .DEV-WIDGET-STYLE-CONTROLS input {\n    flex-basis: 100%;\n    width: 100%; }\n  .DEV-WIDGET .DEV-WIDGET-STYLE-CONTROLS input:first-of-type, .DEV-WIDGET .DEV-WIDGET-STYLE-CONTROLS input:last-of-type {\n    flex-basis: 58%; }\n\n.DEV-WIDGET .DEV-WIDGET-PLAY {\n  background-color: #29AF1D; }\n\n.DEV-WIDGET .DEV-WIDGET-NEXT {\n  background-color: #F7B92B; }\n\n.DEV-WIDGET .DEV-WIDGET-STOP {\n  background-color: #EB261F; }\n\n.DEV-WIDGET .DEV-WIDGET-UPDATE {\n  background-color: #1177B7; }\n\n.DEV-WIDGET .DEV-WIDGET-DATA {\n  background-color: white;\n  color: black; }\n\n.DEV-WIDGET .DEV-WIDGET-SETTINGS {\n  flex-wrap: wrap;\n  margin-top: auto; }\n  .DEV-WIDGET .DEV-WIDGET-SETTINGS .DEV-WIDGET-SELECT {\n    color: white;\n    flex-basis: 65%; }\n  .DEV-WIDGET .DEV-WIDGET-SETTINGS > button {\n    width: 5vw; }\n    .DEV-WIDGET .DEV-WIDGET-SETTINGS > button:not(:first-of-type) {\n      margin-top: .5vh; }\n\n.DEV-WIDGET .DEV-WIDGET-LOGGER {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  opacity: 0;\n  z-index: -10;\n  transition-property: bottom, opacity;\n  transition-duration: 1s, 1s;\n  text-align: center;\n  width: 100%; }\n  .DEV-WIDGET .DEV-WIDGET-LOGGER p {\n    margin: 0;\n    word-break: break-all; }\n\n.DEV-WIDGET .DEV-WIDGET-SLIDE-DOWN {\n  bottom: -3em;\n  opacity: 1; }\n\n.DEV-WIDGET .DEV-WIDGET-LABEL, .DEV-WIDGET button {\n  user-select: none; }\n\n.DEV-WIDGET:not(.DEV-WIDGET-OPEN) {\n  border-radius: 5px;\n  padding: .5vw;\n  height: min-content;\n  width: min-content; }\n\n.DEV-WIDGET-INVIS {\n  background-color: transparent;\n  border: 0.2vw solid #282828; }\n  .DEV-WIDGET-INVIS input {\n    border: .1vw solid black; }\n  .DEV-WIDGET-INVIS .DEV-WIDGET-PLAYOUT-CONTROLS button, .DEV-WIDGET-INVIS .DEV-WIDGET-SETTINGS > button {\n    background-color: transparent; }\n\n.DEV-WIDGET-TITLE-SAFE {\n  border: 2px solid black;\n  position: absolute;\n  top: 5vh;\n  right: 5vw;\n  height: 90vh;\n  width: 90vw; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/components/Controls.ts":
/*!************************************!*\
  !*** ./src/components/Controls.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ./ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Button_1 = __webpack_require__(/*! ./ui/form/Button */ "./src/components/ui/form/Button.ts");
const Input_1 = __webpack_require__(/*! ./ui/form/Input */ "./src/components/ui/form/Input.ts");
// Helper Functions
const ColorFunctions_1 = __webpack_require__(/*! ./helpers/ColorFunctions */ "./src/components/helpers/ColorFunctions.ts");
// The position, background color, and cosutom command controls for the widget
class Controls {
    constructor(props) {
        this.dragging = false;
        this.mouseDown = false;
        // The widget's size relative to the current viewport
        this.widgetSize = { x: 0, y: 0 };
        this.display = 'open';
        this.position = { x: 0, y: 0 };
        // Hides the widget
        this.HideWidget = () => {
            const widget = document.querySelector('.DEV-WIDGET');
            if (widget.classList.contains('DEV-WIDGET-SHRUNKEN')) {
                widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
                widget.classList.toggle('DEV-WIDGET-HIDDEN');
            }
            else {
                widget.classList.toggle('DEV-WIDGET-OPEN');
                widget.classList.toggle('DEV-WIDGET-HIDDEN');
            }
            this.GetWidgetDisplay();
        };
        // Shrinks the widget
        this.ShrinkWiget = () => {
            const widget = document.querySelector('.DEV-WIDGET');
            if (widget.classList.contains('DEV-WIDGET-HIDDEN')) {
                widget.classList.toggle('DEV-WIDGET-HIDDEN');
                widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
            }
            else {
                widget.classList.toggle('DEV-WIDGET-OPEN');
                widget.classList.toggle('DEV-WIDGET-SHRUNKEN');
            }
            this.GetWidgetDisplay();
        };
        // Toggle the widget's invisible look
        this.InvisWidget = () => {
            const widget = document.querySelector('.DEV-WIDGET');
            widget.classList.toggle('DEV-WIDGET-INVIS');
            if (widget.classList.contains('DEV-WIDGET-INVIS')) {
                this.SetWidgetSetting('invis', true);
                let color = document.querySelector('body').style.backgroundColor;
                const rgb = ColorFunctions_1.ClampRGB(ColorFunctions_1.InvertColor(ColorFunctions_1.CheckRGBValue(color)));
                const invert = 'rgb(' + rgb.join(',') + ')';
                this.ChangeWidgetColor(invert);
            }
            else {
                this.SetWidgetSetting('invis', false);
                this.ChangeWidgetColor('');
            }
        };
        this.elem = ElementFactory_1.default('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-CONTROLS']);
        const displayControlContainer = ElementFactory_1.default('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-DISPLAY-CONTROLS']);
        const styleControlContainer = ElementFactory_1.default('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-STYLE-CONTROLS']);
        // Create buttons that control the widget's display
        const hideButton = Button_1.default({ classes: 'DEV-WIDGET-HIDE' });
        hideButton.addEventListener('click', this.HideWidget);
        const shrinkButton = Button_1.default({ classes: 'DEV-WIDGET-SHRINK' });
        shrinkButton.addEventListener('click', this.ShrinkWiget);
        const invisButton = Button_1.default({ classes: 'DEV-WIDGET-INVIS' });
        invisButton.addEventListener('click', this.InvisWidget);
        // Create elements to control the widget's style
        const dragButton = Button_1.default({ text: 'Drag Me', classes: 'DEV-WIDGET-DRAG-BUTTON' });
        const positionInput = Input_1.default({ placeholder: 'Position ( y, x )', class: 'DEV-WIDGET-POSITION' });
        const backgroundColorInput = Input_1.default({ placeholder: 'Bkg Color as Hex / RGB', class: 'DEV-WIDGET-BKG-COLOR' });
        const customCommandInput = Input_1.default({ placeholder: 'Custom Cmd', class: 'DEV-WIDGET-CUSTOM-COMMAND' });
        const runCustomCommandButton = Button_1.default({ text: 'Run' });
        // Start dragging event listener
        props.widget.addEventListener('mousedown', () => this.BeginDragginWidget());
        // End dragging event listener
        window.addEventListener('mouseup', () => this.ToggleDraggingWidget(false));
        // Dragging event listener
        window.addEventListener('mousemove', (event) => this.HandleDragWidget(event));
        // Blur event listener to set the widget's position on screen
        positionInput.addEventListener('blur', (event) => this.HandleMoveWidget(event.currentTarget));
        // Blur event listener to update the background color
        backgroundColorInput.addEventListener('blur', (event) => this.HandleBackgroundColor(event.target));
        // Blur event listener to update set and save the custom command
        customCommandInput.addEventListener('blur', event => this.HandleSetCustomCommand(event.target));
        // Click event listener for running the custom command
        runCustomCommandButton.addEventListener('click', event => this.HandleCustomCommand(event.target));
        displayControlContainer.appendChild(hideButton);
        displayControlContainer.appendChild(shrinkButton);
        displayControlContainer.appendChild(invisButton);
        this.elem.appendChild(displayControlContainer);
        // Append componenets
        styleControlContainer.appendChild(dragButton);
        styleControlContainer.appendChild(positionInput);
        styleControlContainer.appendChild(backgroundColorInput);
        styleControlContainer.appendChild(customCommandInput);
        styleControlContainer.appendChild(runCustomCommandButton);
        this.elem.appendChild(styleControlContainer);
        // Save references to required function
        this.logMessage = props.logger;
        this.ExecutePlayOutCommand = props.playOutCommandFn;
        this.SetWidgetSetting = props.setWidgetSetting;
        window.addEventListener('resize', () => this.GetWidgetDisplay());
        this.SetWidgetSize();
    }
    // Determines and set's the widget's display mode
    GetWidgetDisplay() {
        const widget = document.querySelector('.DEV-WIDGET');
        if (widget.classList.contains('DEV-WIDGET-HIDDEN')) {
            this.display = 'hide';
        }
        else if (widget.classList.contains('DEV-WIDGET-SHRUNKEN')) {
            this.display = 'shrink';
        }
        else {
            this.display = 'open';
        }
        this.SetWidgetSetting('display', this.display);
        this.SetWidgetSize(this.display);
        this.MoveWidget(this.position);
    }
    // Sets the widget's size based on the current screen size
    // @param {string} display - What display mode the widget is in
    SetWidgetSize(display) {
        switch (display) {
            case 'shrink':
                this.widgetSize.x = window.screen.width * .03;
                this.widgetSize.y = window.screen.width * .15;
                break;
            case 'hide':
                this.widgetSize.x = window.screen.width * .03;
                this.widgetSize.y = window.screen.width * .03;
                break;
            default:
                this.widgetSize.x = Math.ceil(window.screen.width * .17);
                this.widgetSize.y = Math.ceil(window.screen.width * .17);
                break;
        }
    }
    // Ensures the widget is on the screen
    // @param {number} pos - The value to be checked
    // @param {number} inner - The screen value being checked
    // @param {number} size - the widget's size to compansate
    // @returns {number} - A validated position
    ValidatePosition(pos, inner, size) {
        if (pos <= 0) {
            return 10;
        }
        else if (pos >= inner - size - (size * .15)) {
            return inner - size - (size * .15);
        }
        else {
            return pos;
        }
    }
    // Convert's the position from a keyword or string to a number
    // @param {string} pos - The position entered by the user
    ConvertPosition(pos) {
        if (pos.indexOf('px') > -1)
            pos = pos.replace(/[px]/g, '');
        if (isNaN(Number(pos))) {
            pos = pos.toLowerCase();
            switch (pos) {
                case 'top':
                case 'left':
                    return 5;
                case 'bottom':
                    return Math.floor(window.innerHeight - this.widgetSize.y - 10);
                case 'right':
                    return Math.floor(window.innerWidth - this.widgetSize.x - 20);
                default:
                    this.logMessage(pos + ' is an invalid position');
                    return 10;
            }
        }
        else {
            return Number(pos);
        }
    }
    // Sets the required properties to drag the widget around on the screen
    BeginDragginWidget() {
        // Start dragging logic
        const target = event.target;
        const widget = this.elem.parentElement;
        this.mouseDown = true;
        if (target.classList.contains('DEV-WIDGET-DRAG-BUTTON')) {
            this.ToggleDraggingWidget(true);
        }
        else if (!widget.classList.contains('DEV-WIDGET-OPEN')) {
            setTimeout(() => {
                if (this.mouseDown)
                    this.ToggleDraggingWidget(true);
            }, 100);
        }
    }
    // Begins or stops dragging the widget
    ToggleDraggingWidget(val) {
        if (!val)
            this.mouseDown = false;
        this.dragging = val;
        if (!this.dragging)
            this.SetWidgetSetting('position', { x: this.position.x, y: this.position.y });
    }
    // Method to apply the new position to the widget
    // @param {MouseEvent} event - The mouses position for dragging the widget
    HandleDragWidget(event) {
        if (this.dragging) {
            const input = document.querySelector('.DEV-WIDGET-CONTROLS input:first-of-type');
            const position = {
                x: event.clientX,
                y: event.clientY
            };
            this.MoveWidget(position);
            input.value = this.position.y + ', ' + this.position.x;
        }
    }
    // Method to handle user input and set the widget's position
    // @param {EventTarget} event - The input element containing the user entered position
    HandleMoveWidget(event) {
        // Cast the input event target to an HTML Input Type
        const input = event;
        const value = input.value.replace(/,/g, ' ');
        let values;
        const raw = value.split(' ').map(i => i.trim()).filter(i => i.length);
        if (!raw.length) {
            this.logMessage('Invalid position');
            input.value = '';
            return;
        }
        else if (raw.length === 1) {
            raw[1] = raw[0];
        }
        values = [this.ConvertPosition(raw[0]), this.ConvertPosition(raw[1])];
        this.MoveWidget({ y: values[0], x: values[1] });
    }
    // Changes the color of the widget and it's components
    //@param {string} color - The color being set, typically the inverse of the body's color
    ChangeWidgetColor(color) {
        const widget = this.elem.parentElement;
        const logger = widget.querySelectorAll('.DEV-WIDGET-LOGGER');
        const elements = Array.from(widget.querySelectorAll('.DEV-WIDGET-SECTION > button, .DEV-WIDGET-CONTROLS input, .DEV-WIDGET-SETTINGS .DEV-WIDGET-SELECT'));
        elements.forEach(e => {
            // Has an SVG as a child
            if (e.childNodes.length && e.childNodes[0].nodeName === 'svg') {
                let SVGNodes = e.childNodes[0].childNodes;
                SVGNodes.forEach(elem => {
                    if (elem.nodeName !== '#text') {
                        elem.nodeName === 'path'
                            ? elem.style.fill = color
                            : elem.style.stroke = color;
                    }
                });
                // Is a normal text button or input
            }
            else {
                if (e.nodeName === 'INPUT') {
                    e.style.borderColor = color;
                }
                else if (e.classList.contains('DEV-WIDGET-SELECT')) {
                    const container = e.childNodes[0];
                    const label = container.childNodes[0];
                    const arrow = container.querySelectorAll('path')[1];
                    const arrowBKG = container.querySelectorAll('path')[0];
                    const invert = 'rgb(' + ColorFunctions_1.InvertColor(ColorFunctions_1.CheckRGBValue(color)).join(',') + ')';
                    container.style.borderColor = color;
                    label.style.color = color;
                    arrow.style.fill = color;
                    arrowBKG.style.fill = invert;
                }
                else {
                    e.style.color = color;
                }
            }
        });
        widget.style.borderColor = color;
        logger.forEach(l => { l.style.color = color; });
    }
    // Handles a user entered background color
    // @param {EventTarget} event - The input containing the background color set by the user
    HandleBackgroundColor(event) {
        const input = event;
        let value = input.value.length ? input.value : '255,255,255';
        let raw;
        let final;
        if (value.indexOf('http') !== -1) {
            final = value;
        }
        else {
            if (value.indexOf(' ') !== -1 || value.indexOf(',') !== -1) {
                raw = ColorFunctions_1.CheckRGBValue(value);
            }
            else {
                raw = ColorFunctions_1.ConvertHEXtoRGB(value);
            }
            if (!raw.length) {
                this.logMessage('Invalid Background Color');
                input.value = '';
                return;
            }
            final = 'rgba(' + raw.join(',') + ')';
        }
        this.ChangeBackgroundColor(final);
    }
    // Attempts to execute a custom command
    // @param {EventTarget} event - The button clicked to run the custom command
    HandleCustomCommand(event) {
        const button = event;
        const input = button.previousElementSibling;
        if (input.value.length) {
            this.ExecutePlayOutCommand(input.value);
        }
        else {
            this.logMessage('Invalid Custom Command');
        }
    }
    // Handles the blur event from the custom command input
    // @param {EventTarget} event - The input containing the custom command name
    HandleSetCustomCommand(event) {
        const input = event;
        this.SetCustomCommand(input.value);
    }
    // Changes the wigdet's display type
    // @param {string} dsp - The display being applied to the widget
    ChangeWidgetDisplay(dsp) {
        switch (dsp) {
            case 'hide':
                this.HideWidget();
                break;
            case 'shrink':
                this.ShrinkWiget();
                break;
            case 'invis':
                this.InvisWidget();
                break;
        }
    }
    // Moves the widget somewhere on screen
    // @param {object} position - The x and y coordinates for where the widget will move to
    MoveWidget(position) {
        const widget = document.querySelector('.DEV-WIDGET');
        const positionInput = this.elem.querySelector('.DEV-WIDGET-POSITION');
        this.position.x = this.ValidatePosition(position.x, window.innerWidth, this.widgetSize.x);
        this.position.y = this.ValidatePosition(position.y, window.innerHeight, this.widgetSize.y);
        widget.style.left = this.position.x + 'px';
        widget.style.top = this.position.y + 'px';
        positionInput.value = this.position.y + ', ' + this.position.x;
        if (!this.dragging)
            this.SetWidgetSetting('position', { x: this.position.x, y: this.position.y });
    }
    // Changes the background color and adjust the widget's color
    // @param {string} color - The color to set the body to
    ChangeBackgroundColor(color) {
        const body = document.querySelector('body');
        const widget = document.querySelector('.DEV-WIDGET');
        const bkgInput = this.elem.querySelector('.DEV-WIDGET-BKG-COLOR');
        this.backgroundColor = color;
        if (color.indexOf('http') !== -1) {
            body.style.backgroundImage = 'url(' + this.backgroundColor + ')';
            body.style.backgroundSize = 'cover';
        }
        else {
            const invert = 'rgb(' + ColorFunctions_1.ClampRGB(ColorFunctions_1.InvertColor(ColorFunctions_1.CheckRGBValue(color))).join(',') + ')';
            const titleSafe = document.querySelector('.DEV-WIDGET-TITLE-SAFE');
            titleSafe.style.borderColor = invert;
            body.style.backgroundImage = '';
            body.style.backgroundColor = this.backgroundColor;
            if (widget.classList.contains('DEV-WIDGET-INVIS'))
                this.ChangeWidgetColor(invert);
        }
        bkgInput.value = color;
        this.SetWidgetSetting('backgroundColor', this.backgroundColor);
    }
    // Set's the custom command current being used
    // @param {string} cmd - The name of the custom command that will be ran
    SetCustomCommand(cmd) {
        const cc = this.elem.querySelector('.DEV-WIDGET-CUSTOM-COMMAND');
        this.customCommand = cmd;
        cc.value = this.customCommand;
        this.SetWidgetSetting('customCommand', this.customCommand);
    }
}
exports.default = Controls;


/***/ }),

/***/ "./src/components/Logger.ts":
/*!**********************************!*\
  !*** ./src/components/Logger.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* Handles logging the main errors for the widget */
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ./ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
// Class that logs a message for the User
class Logger {
    constructor() {
        // Timeout to determine how long to display the message for
        this.messageTimeout = null;
        this.elem = ElementFactory_1.default('div', 'DEV-WIDGET-LOGGER');
        // Create a paragraph element to hold the message
        this.message = ElementFactory_1.default('p');
        this.message.textContent = '.';
        this.elem.appendChild(this.message);
        this.displayMessage = this.displayMessage.bind(this);
    }
    // Clears the current timeout and sets this.messageTimeout to null
    clearTimer() {
        clearTimeout(this.messageTimeout);
        this.messageTimeout = null;
    }
    // Displays a message
    displayMessage(msg) {
        if (msg) {
            if (this.messageTimeout)
                this.clearTimer(); // Restart the timeout
            this.messageTimeout = setTimeout(this.displayMessage, 5000);
            this.message.textContent = msg;
            // Only toggle the class if it is not present
            if (!this.elem.classList.contains('DEV-WIDGET-SLIDE-DOWN'))
                this.elem.classList.add('DEV-WIDGET-SLIDE-DOWN');
        }
        else {
            this.clearTimer();
            this.elem.classList.remove('DEV-WIDGET-SLIDE-DOWN');
        }
    }
}
exports.default = Logger;


/***/ }),

/***/ "./src/components/PlayOutControls.ts":
/*!*******************************************!*\
  !*** ./src/components/PlayOutControls.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* All of the play out controls (AMCP commands) for the widget */
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ./ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Button_1 = __webpack_require__(/*! ./ui/form/Button */ "./src/components/ui/form/Button.ts");
// Class that plays global casparcg commands
class PlayoutControls {
    constructor(props) {
        this.elem = ElementFactory_1.default('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-PLAYOUT-CONTROLS']);
        this.ExecutePlayOutCommand = this.ExecutePlayOutCommand.bind(this);
        // Create the playout controls
        const playButton = Button_1.default({ classes: 'DEV-WIDGET-PLAY' });
        playButton.addEventListener('click', () => this.ExecutePlayOutCommand('play'));
        const nextButton = Button_1.default({ classes: 'DEV-WIDGET-NEXT' });
        nextButton.addEventListener('click', () => this.ExecutePlayOutCommand('next'));
        const stopButton = Button_1.default({ classes: 'DEV-WIDGET-STOP' });
        stopButton.addEventListener('click', () => this.ExecutePlayOutCommand('stop'));
        const updateButton = Button_1.default({ classes: 'DEV-WIDGET-UPDATE' });
        updateButton.addEventListener('click', () => this.ExecutePlayOutCommand('update'));
        this.elem.appendChild(playButton);
        this.elem.appendChild(nextButton);
        this.elem.appendChild(stopButton);
        this.elem.appendChild(updateButton);
        this.getSelectedTemplateData = props.getSelectedTemplateData;
        // Set the logger function
        this.logMessage = props.logger;
    }
    // Attempt to execute a playout command
    ExecutePlayOutCommand(cmd) {
        if (typeof window[cmd] !== 'function'
            || (/\{\s*\[native code\]\s*\}/).test('' + window[cmd])) {
            // Display an error message for undefined commands
            this.logMessage(cmd + ' is not defined');
        }
        else {
            if (cmd === 'update') {
                // Gets the template data from the Settings Component
                const data = this.getSelectedTemplateData();
                window[cmd](JSON.stringify(data.data));
            }
            else {
                window[cmd]();
            }
        }
    }
}
exports.default = PlayoutControls;


/***/ }),

/***/ "./src/components/Settings.ts":
/*!************************************!*\
  !*** ./src/components/Settings.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* The Widget's settings and Template Data */
// Factory Imports
const Select_1 = __webpack_require__(/*! ./ui/form/Select */ "./src/components/ui/form/Select.ts");
const ElementFactory_1 = __webpack_require__(/*! ./ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Button_1 = __webpack_require__(/*! ./ui/form/Button */ "./src/components/ui/form/Button.ts");
const GitHubIcon_1 = __webpack_require__(/*! ./icons/GitHubIcon */ "./src/components/icons/GitHubIcon.ts");
const SettingsIcon_1 = __webpack_require__(/*! ./icons/SettingsIcon */ "./src/components/icons/SettingsIcon.ts");
const HelpIcon_1 = __webpack_require__(/*! ./icons/HelpIcon */ "./src/components/icons/HelpIcon.ts");
// Component Imports
const TemplateData_1 = __webpack_require__(/*! ./popups/TemplateData */ "./src/components/popups/TemplateData.ts");
const UserSettings_1 = __webpack_require__(/*! ./popups/UserSettings */ "./src/components/popups/UserSettings.ts");
const HelpWindow_1 = __webpack_require__(/*! ./popups/HelpWindow */ "./src/components/popups/HelpWindow.ts");
// On screen settings and template data for widget
class Settings {
    constructor(props) {
        // Creates a new list of data sets when a data set is added or removed
        // @param {array} options - An array of strings that will be the selectable options
        this.UpdateDataOptions = (options) => {
            if (!options.length)
                options.push(['no-data', 'No Data']);
            const optionsList = Select_1.default({ options, offsetOnly: true }).childNodes[1];
            const current = this.elem.querySelector('.DEV-WIDGET-SELECT');
            const label = current.childNodes[0].childNodes[0];
            [...current.childNodes[1].childNodes].forEach(c => current.childNodes[1].removeChild(c));
            [...optionsList.childNodes].forEach(c => current.childNodes[1].appendChild(c));
            label.textContent = options[0][1];
        };
        this.SelectWidgetDataSet = this.SelectWidgetDataSet.bind(this);
        this.UpdateDataOptions = this.UpdateDataOptions.bind(this);
        this.elem = ElementFactory_1.default('div', ['DEV-WIDGET-SECTION', 'DEV-WIDGET-SETTINGS']);
        // Set the logger function
        this.logMessage = props.logger;
        const templateData = new TemplateData_1.default({
            selected: props.widgetSettings.selectedData,
            associations: props.widgetSettings.associations,
            selectWidgetDataSet: this.SelectWidgetDataSet,
            updateWidgetDataOptions: this.UpdateDataOptions,
            setWidgetSetting: props.setWidgetSetting
        });
        this.GetTemplateData = templateData.GetTemplateData;
        this.GetDataOptions = templateData.GetDataOptions;
        this.SelectTemplateData = templateData.SelectTemplateData;
        this.SetTemplateData = templateData.SetSelectedTemplateData;
        this.AssociateData = templateData.AssociateTemplateData;
        const help = new HelpWindow_1.default();
        const userSettings = new UserSettings_1.default({
            userSettings: props.widgetSettings.user,
            setWidgetSetting: props.setWidgetSetting,
            resetWidgetSetting: props.resetAllWidgetData
        });
        const options = templateData.GetDataOptions();
        if (!options.length)
            options.push(['no-data', 'No Data']);
        // Create data selection an edit button
        const select = Select_1.default({ options, offsetOnly: true });
        select.style.position = 'relative';
        select.addEventListener('change', () => templateData.ChangeDataSet(select.getAttribute('value')));
        const dataButton = Button_1.default({ text: 'Data', classes: 'DEV-WIDGET-DATA' });
        dataButton.addEventListener('click', templateData.Open);
        // Create setting buttons
        const githubButton = Button_1.default();
        const settingsButton = Button_1.default();
        const helpButton = Button_1.default();
        // Append the icons
        githubButton.appendChild(GitHubIcon_1.default());
        settingsButton.appendChild(SettingsIcon_1.default());
        helpButton.appendChild(HelpIcon_1.default());
        githubButton.addEventListener('click', () => this.logMessage('github.com/chrisryanouellette/CasparCG_HTML_Widget'));
        settingsButton.addEventListener('click', userSettings.Open);
        helpButton.addEventListener('click', help.Open);
        this.elem.appendChild(select);
        this.elem.appendChild(dataButton);
        this.elem.appendChild(githubButton);
        this.elem.appendChild(settingsButton);
        this.elem.appendChild(helpButton);
        this.elem.appendChild(templateData.elem);
        this.elem.appendChild(userSettings.elem);
        this.elem.appendChild(help.elem);
    }
    // Selects the template data option in the settings select element
    // @param {string} name - The data set's name
    SelectWidgetDataSet(name) {
        const select = this.elem.querySelector('.DEV-WIDGET-SELECT');
        const label = select.childNodes[0].childNodes[0];
        label.setAttribute('value', name);
        label.textContent = name.replace(/-/g, ' ');
    }
}
exports.default = Settings;


/***/ }),

/***/ "./src/components/Widget.ts":
/*!**********************************!*\
  !*** ./src/components/Widget.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*  Main widget component */
// Component Imports
const WidgetStorage_1 = __webpack_require__(/*! ./storage/WidgetStorage */ "./src/components/storage/WidgetStorage.ts");
const Controls_1 = __webpack_require__(/*! ./Controls */ "./src/components/Controls.ts");
const PlayOutControls_1 = __webpack_require__(/*! ./PlayOutControls */ "./src/components/PlayOutControls.ts");
const Settings_1 = __webpack_require__(/*! ./Settings */ "./src/components/Settings.ts");
const Logger_1 = __webpack_require__(/*! ./Logger */ "./src/components/Logger.ts");
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ./ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
// SCSS Improts
__webpack_require__(/*! ../scss/widget.scss */ "./src/scss/widget.scss");
// Widget class that controls most action of the widget
class Widget {
    constructor() {
        // If the widget should effect the html page
        this.env = false;
        // Widget's log class to log message to the user
        this.Logger = new Logger_1.default();
        // Widget's Storage
        this.Storage = new WidgetStorage_1.WidgetStorage();
        // Sets the standard settings for the widget
        // @param {object} - A deconstructed object with the minumum requrired properties to set the widget
        this.ApplyWidgetSettings = ({ display, invis, position, backgroundColor, customCommand }) => {
            this.Controls.ChangeBackgroundColor(backgroundColor);
            this.Controls.SetCustomCommand(customCommand);
            this.Controls.ChangeWidgetDisplay(display);
            this.Controls.MoveWidget(position);
            if (invis)
                this.Controls.ChangeWidgetDisplay('invis');
            if (this.Storage.widgetSettings.user.runUpdate)
                this.PlayoutControls.ExecutePlayOutCommand('update');
        };
        // Create the main widget container
        this.elem = ElementFactory_1.default('div', ['DEV-WIDGET', 'DEV-WIDGET-OPEN']);
        this.SetWidgetEnv = this.SetWidgetEnv.bind(this);
        // Check we are in debug mode
        if (window.location.search.indexOf('debug=true') !== -1)
            this.env = true;
        // Create the settings for the widget
        this.Settings = new Settings_1.default({
            logger: this.Logger.displayMessage,
            widgetSettings: this.Storage.widgetSettings,
            setWidgetSetting: this.Storage.SetWidgetSetting,
            resetAllWidgetData: () => {
                this.Storage.ResetWidgetData();
                this.AssociateData();
                this.ApplyWidgetSettings(this.Storage.widgetSettings);
            }
        });
        // Create the play out controls ( AMCP Comamnds ) for the widget
        this.PlayoutControls = new PlayOutControls_1.default({
            logger: this.Logger.displayMessage,
            getSelectedTemplateData: this.Settings.GetTemplateData
        });
        // Create the controls for the widget itself. Dispaly, position, and custom commands
        this.Controls = new Controls_1.default({
            logger: this.Logger.displayMessage,
            playOutCommandFn: this.PlayoutControls.ExecutePlayOutCommand,
            setWidgetSetting: this.Storage.SetWidgetSetting,
            widget: this.elem
        });
        // Append Widget Components to this Widget div element
        this.elem.appendChild(this.Controls.elem);
        this.elem.appendChild(this.PlayoutControls.elem);
        this.elem.appendChild(this.Settings.elem);
        this.elem.appendChild(this.Logger.elem);
        this.GetTemplateData = this.Settings.GetTemplateData;
        this.GetDataOptions = this.Settings.GetDataOptions;
        this.SelectTemplateData = this.Settings.SelectTemplateData;
        this.SetTemplateData = this.Settings.SetTemplateData;
        this.AssociateData = this.Settings.AssociateData;
        this.ExecutePlayOutCommand = this.PlayoutControls.ExecutePlayOutCommand;
        // Append the widget to the DOM
        document.querySelector('body').appendChild(this.elem);
        // Apply the widget's setting if the env is development
        if (this.env) {
            this.ApplyWidgetSettings(this.Storage.widgetSettings);
            // Else hide the widget
        }
        else {
            this.elem.style.display = 'none';
        }
    }
    // Toggles the widgets ability to effect the HTML page
    SetWidgetEnv(state) {
        this.env = state;
        if (this.env) {
            this.elem.style.display = 'flex';
            this.ApplyWidgetSettings(this.Storage.widgetSettings);
        }
        else {
            const body = document.querySelector('body');
            body.style.backgroundColor = '';
            this.elem.style.display = 'none';
        }
    }
}
exports.default = Widget;


/***/ }),

/***/ "./src/components/helpers/ChangeDataRow.ts":
/*!*************************************************!*\
  !*** ./src/components/helpers/ChangeDataRow.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Changes a data row from one data type to another
// @param {DOM Node} select - The select element that staerted the change
function ChangeDataSection(select) {
    const type = select.getAttribute('value');
    const row = select.parentElement;
    const children = [...row.childNodes];
    // Reset elements for change
    children.slice(2, -1).map(e => e.style.display = 'none');
    children[2].value = '';
    // Hide / Show the components used in a Array and Object
    if (type === 'arr' || type === 'obj') {
        const nextRow = row.nextElementSibling;
        if (nextRow && nextRow.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')) {
            const children = [...nextRow.childNodes];
            if (type === 'arr') {
                children.forEach((c, i) => {
                    const key = c.childNodes[1];
                    key.style.display = 'none';
                    key.value = i.toString();
                });
            }
            else {
                children.forEach(c => {
                    const key = c.childNodes[1];
                    key.style.display = '';
                });
            }
        }
    }
    // Handle displaying required elements
    switch (type) {
        case 'obj':
        case 'arr':
            children[4].style.display = 'flex';
            break;
        case 'bool':
            children[3].style.display = 'flex';
            break;
        default:
            children[2].style.display = 'block';
            break;
    }
}
exports.default = ChangeDataSection;


/***/ }),

/***/ "./src/components/helpers/ColorFunctions.ts":
/*!**************************************************!*\
  !*** ./src/components/helpers/ColorFunctions.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Converts a color to either white or black depnding on which color is closer
// @param {number[]} rgb - The R, G, and B values
// @returns {number[]} The RGB values clamped to either white or black
function ClampRGB(rgb) {
    if (rgb.length > 3)
        rgb = [rgb[0], rgb[1], rgb[2]];
    const sum = rgb.reduce((acc, i) => {
        acc += (255 - i) > (255 / 2) ? 0 : 255;
        return acc;
    }, 0);
    return sum < (255 * 3) / 2 ? [0, 0, 0] : [255, 255, 255];
}
exports.ClampRGB = ClampRGB;
// Checks that a string input is a valid RGB value
// @param {string} value - The value entered by the user
// @returns {number[]} - An array representing the R, G, and B color values
function CheckRGBValue(value) {
    const seperator = value.indexOf(',') !== -1 ? ',' : ' ';
    const raw = value.replace(/[rgb]|a|[\(\)]/gi, '')
        .split(seperator)
        .map(i => i.trim())
        .map(i => Number(i))
        .filter(i => !isNaN(i));
    if (raw.length < 3) {
        return [];
    }
    else if (raw.length === 3) {
        raw[3] = 1;
    }
    return raw;
}
exports.CheckRGBValue = CheckRGBValue;
// Converts an HEX value to RGB
// @param {string} value - The HEX value
// @returns {number[]} - An array representing the R, G, and B color values
function ConvertHEXtoRGB(value) {
    let raw;
    if (value.indexOf('#') === 0)
        value = value.substring(1);
    if (value.length === 3) {
        raw = value.split('').map(i => i + i).map(i => parseInt(i, 16));
    }
    else if (value.length === 6) {
        raw = value.match(/.{1,2}/g).map(i => parseInt(i, 16));
    }
    else {
        return [];
    }
    raw[3] = 1;
    return raw;
}
exports.ConvertHEXtoRGB = ConvertHEXtoRGB;
// Inverts a color
// @param {number[]} color - An array representing the R, G, and B color values
// @returns {number[]} - The same array but with the color values inverted
function InvertColor(color) {
    if (color.length > 3) {
        if (color[3] < .5)
            return [0, 0, 0];
        color = [color[0], color[1], color[2]];
    }
    let rgb = color.map(i => 255 - Number(i));
    if (!rgb.length)
        rgb = [255, 255, 255];
    return rgb;
}
exports.InvertColor = InvertColor;


/***/ }),

/***/ "./src/components/helpers/CreateDataRow.ts":
/*!*************************************************!*\
  !*** ./src/components/helpers/CreateDataRow.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ../ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Select_1 = __webpack_require__(/*! ../ui/form/Select */ "./src/components/ui/form/Select.ts");
const Input_1 = __webpack_require__(/*! ../ui/form/Input */ "./src/components/ui/form/Input.ts");
const Checkbox_1 = __webpack_require__(/*! ../ui/form/Checkbox */ "./src/components/ui/form/Checkbox.ts");
const Button_1 = __webpack_require__(/*! ../ui/form/Button */ "./src/components/ui/form/Button.ts");
const PlusIcon_1 = __webpack_require__(/*! ../icons/PlusIcon */ "./src/components/icons/PlusIcon.ts");
const MinusIcon_1 = __webpack_require__(/*! ../icons/MinusIcon */ "./src/components/icons/MinusIcon.ts");
// Helper Functions
const ChangeDataRow_1 = __webpack_require__(/*! ./ChangeDataRow */ "./src/components/helpers/ChangeDataRow.ts");
const RemoveDataRow_1 = __webpack_require__(/*! ./RemoveDataRow */ "./src/components/helpers/RemoveDataRow.ts");
// Creates a new data row for the Template data popup
// @param {string} type - The type of row being created
// @param {string?} k - The key value to be set
// @param {string?} v - The value to be set
// @returns {DOM Node} - The data row as a Div element
function CreateDataRow(type, k, v) {
    const container = ElementFactory_1.default('div', 'DEV-WIDGET-TEMPLATE-DATA-ITEM');
    const options = [
        ['text', 'Text'],
        ['num', 'Number'],
        ['bool', 'True/False'],
        ['arr', 'Array'],
        ['obj', 'Object']
    ];
    // Create the row's data type selector
    const selected = options.find(o => o[0] === type);
    const select = Select_1.default({ options: options, defaultValue: selected });
    select.addEventListener('change', (e) => ChangeDataRow_1.default(select));
    // Create the rows data key's and values
    const key = Input_1.default({ placeholder: 'Key' });
    const value = Input_1.default({ placeholder: 'Value' });
    const checkbox = Checkbox_1.default();
    // Create the blus button and icon
    const addButton = Button_1.default();
    addButton.appendChild(PlusIcon_1.default());
    addButton.addEventListener('click', () => {
        const parent = container.parentElement;
        let newCon;
        if (container.nextElementSibling) {
            newCon = container.nextElementSibling.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON')
                ? container.nextElementSibling
                : ElementFactory_1.default('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        }
        else {
            newCon = ElementFactory_1.default('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        }
        newCon.appendChild(CreateDataRow('text'));
        if (select.getAttribute('value') === 'arr') {
            const key = newCon.lastElementChild.childNodes[1];
            key.style.display = 'none';
            key.value = newCon.childElementCount.toString();
        }
        container.nextElementSibling
            ? parent.insertBefore(newCon, container.nextElementSibling)
            : parent.appendChild(newCon);
    });
    // Create remove button and icon
    const removeButton = Button_1.default();
    removeButton.appendChild(MinusIcon_1.default());
    removeButton.addEventListener('click', (e) => RemoveDataRow_1.default(container));
    // Show / Hide elements based on row type
    switch (type) {
        case 'bool':
            value.style.display = 'none';
            addButton.style.display = 'none';
            if (v === 'true')
                checkbox.classList.add('DEV-WIDGET-CHECKED');
            break;
        case 'arr':
        case 'obj':
            checkbox.style.display = 'none';
            value.style.display = 'none';
            break;
        default:
            checkbox.style.display = 'none';
            addButton.style.display = 'none';
            break;
    }
    // When a value is added, check the type and make sure the value matches it
    value.addEventListener('blur', (e) => {
        if (select.getAttribute('value') !== 'num')
            return;
        const target = e.target;
        if (isNaN(Number(target.value))) {
            target.value = '';
        }
    });
    // Set the optional key and value for the row
    if (k !== undefined)
        key.value = k;
    if (v !== undefined)
        value.value = v;
    container.appendChild(select);
    container.appendChild(key);
    container.appendChild(value);
    container.appendChild(checkbox);
    container.appendChild(addButton);
    container.appendChild(removeButton);
    return container;
}
exports.default = CreateDataRow;


/***/ }),

/***/ "./src/components/helpers/DecodeDataFromDom.ts":
/*!*****************************************************!*\
  !*** ./src/components/helpers/DecodeDataFromDom.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Takes in a set of DOM node representing an object 
// and converts them into a JS object
// @param {any} obj - The starting object
// @param {DOM Node} con - The container with the elements to be converted
// @returns {object} - The JS object
function DecodeData(obj, con) {
    con.childNodes.forEach(node => {
        const child = node;
        const nodes = child.childNodes;
        const type = nodes[0].getAttribute('value');
        // Return (Skip) the container if a sub container is found
        if (child.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON'))
            return obj;
        // Arrays and object are broken down further
        if (type === 'arr' || type === 'obj') {
            const section = child.nextElementSibling;
            const parent = type === 'arr' ? [] : {};
            const key = nodes[1].value;
            if (section) {
                Array.isArray(obj)
                    ? obj.push(DecodeData(parent, section))
                    : obj[key] = DecodeData(parent, section);
            }
            else {
                Array.isArray(obj) ? obj.push(parent) : obj[key] = parent;
            }
            // Booleans, numbers, and text are added to the current object
        }
        else {
            let val;
            // True / false value
            if (type === 'bool') {
                val = nodes[3].classList.contains('DEV-WIDGET-CHECKED') ? true : false;
                // Text or number value
            }
            else {
                type === 'num' ? val = Number(nodes[2].value) : val = nodes[2].value;
                if (val.toString().length === 0)
                    return;
            }
            Array.isArray(obj) ? obj.push(val) : obj[nodes[1].value] = val;
        }
    });
    return obj;
}
exports.default = DecodeData;


/***/ }),

/***/ "./src/components/helpers/EncodeDataToDom.ts":
/*!***************************************************!*\
  !*** ./src/components/helpers/EncodeDataToDom.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const CreateDataRow_1 = __webpack_require__(/*! ./CreateDataRow */ "./src/components/helpers/CreateDataRow.ts");
// Takes an object and converts it to a DOM representation
// @param {object} obj - The data to be converted
// @returns {DOM Node} - The data represneted as DOM Nodes
function EncodeData(obj) {
    const container = ElementFactory_1.default('div');
    container.classList.add('DEV-WIDGET-TEMPLATE-DATA-CON');
    Object.entries(obj).forEach(([key, val]) => {
        let elem;
        let children;
        // Handle Array
        if (Array.isArray(val)) {
            elem = CreateDataRow_1.default('arr', key);
            children = EncodeData(val);
            children.childNodes.forEach(c => {
                const con = c;
                if (con.classList.contains('DEV-WIDGET-TEMPLATE-DATA-ITEM')) {
                    const input = con.childNodes[1];
                    input.style.display = 'none';
                }
            });
            // Handle Object
        }
        else if (typeof val === 'object') {
            elem = CreateDataRow_1.default('obj', key);
            children = EncodeData(val);
        }
        else {
            if (typeof val === 'boolean') { // Handle Booleans
                elem = CreateDataRow_1.default('bool', key, String(val));
            }
            else { // Handle Text and Numbers
                elem = typeof val === 'string'
                    ? CreateDataRow_1.default('text', key, val)
                    : CreateDataRow_1.default('num', key, String(val));
            }
        }
        container.appendChild(elem);
        if (children)
            container.appendChild(children);
    });
    return container;
}
exports.default = EncodeData;


/***/ }),

/***/ "./src/components/helpers/RemoveDataRow.ts":
/*!*************************************************!*\
  !*** ./src/components/helpers/RemoveDataRow.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Removes a row from the template data popup
// @param {DOM Node} row - The row to be removed
function RemoveDataRow(row) {
    const parent = row.parentElement;
    const select = row.childNodes[0];
    const type = select.getAttribute('value');
    if (type === 'obj' || type === 'arr') {
        const next = row.nextElementSibling;
        if (next && next.classList.contains('DEV-WIDGET-TEMPLATE-DATA-CON'))
            parent.removeChild(next);
    }
    parent.removeChild(row);
}
exports.default = RemoveDataRow;


/***/ }),

/***/ "./src/components/icons/ArrowIcon.ts":
/*!*******************************************!*\
  !*** ./src/components/icons/ArrowIcon.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateArrowIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-ARROW-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 H90 Q100 0, 100 10 V90 Q100 100, 90 100 H0 Z" />
    <path d="M25 25 H75 L50 75 Z" />
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateArrowIcon;


/***/ }),

/***/ "./src/components/icons/ConvertToJSON.ts":
/*!***********************************************!*\
  !*** ./src/components/icons/ConvertToJSON.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateConvertToJSONIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-CONVERT-TO-JSON" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">
    <!-- Outer Circle -->
    <circle cx="50" cy="50" r="45" fill="none"/>
    <path d="M37.2404 44.8505V30.1656C37.2404 27.3374 38.5458 25.7601 41.374 25.7601H42.9513V23.4214H41.2108C36.8053 23.4214 34.521 25.5425 34.521 29.948V44.9049C34.521 46.8629 33.5964 47.6787 32.0735 47.6787H30.1699V50.0175H32.0735C33.5964 50.0175 34.521 50.8877 34.521 52.8457V67.8026C34.521 72.208 36.8053 74.3292 41.2108 74.3292H42.9513V71.9905H41.374C38.5458 71.9905 37.2404 70.4132 37.2404 67.585V52.9001C37.2404 50.4526 36.479 49.4192 35.0105 48.8753C36.479 48.3314 37.2404 47.298 37.2404 44.8505Z"/>
    <path d="M67.9267 47.6787C66.4038 47.6787 65.5336 46.8629 65.5336 44.9049V29.948C65.5336 25.5425 63.1949 23.4214 58.7894 23.4214H57.049V25.7601H58.6262C61.5088 25.7601 62.8142 27.3374 62.8142 30.1656V44.8505C62.8142 47.298 63.5212 48.3314 65.0441 48.8753C63.5212 49.4192 62.8142 50.4526 62.8142 52.9001V67.585C62.8142 70.4132 61.5088 71.9905 58.6262 71.9905H57.049V74.3292H58.7894C63.1949 74.3292 65.5336 72.208 65.5336 67.8026V52.8457C65.5336 50.8877 66.4038 50.0175 67.9267 50.0175H69.8303V47.6787H67.9267Z"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateConvertToJSONIcon;


/***/ }),

/***/ "./src/components/icons/DraggableIcon.ts":
/*!***********************************************!*\
  !*** ./src/components/icons/DraggableIcon.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateDraggableIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-DRAGABLE-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="25" x2="85" y2="25" stroke-linecap="round"/>
    <line x1="15" y1="50" x2="85" y2="50" stroke-linecap="round"/>
    <line x1="15" y1="75" x2="85" y2="75" stroke-linecap="round"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateDraggableIcon;


/***/ }),

/***/ "./src/components/icons/GitHubIcon.ts":
/*!********************************************!*\
  !*** ./src/components/icons/GitHubIcon.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateGitHubIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-GITHUB-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M49.9998 7.88391C26.142 7.88391 6.81836 27.2076 6.81836 51.0653C6.81836 70.1731 19.179 86.3122 36.3437 92.0337C38.5027 92.4115 39.3124 91.1161 39.3124 89.9826C39.3124 88.957 39.2584 85.5565 39.2584 81.94C28.4091 83.9372 25.6023 79.2952 24.7386 76.8662C24.2529 75.6248 22.1478 71.7924 20.3126 70.7669C18.8012 69.9572 16.6421 67.9601 20.2586 67.9061C23.6591 67.8521 26.0881 71.0367 26.8977 72.3322C30.784 78.8634 36.9914 77.0282 39.4743 75.8946C39.8521 73.0879 40.9857 71.1987 42.2271 70.1191C32.6193 69.0396 22.5796 65.3152 22.5796 48.7983C22.5796 44.1023 24.2529 40.216 27.0057 37.1933C26.5739 36.1138 25.0625 31.6877 27.4375 25.7502C27.4375 25.7502 31.0539 24.6167 39.3124 30.1763C42.7669 29.2047 46.4373 28.7189 50.1077 28.7189C53.7782 28.7189 57.4486 29.2047 60.9031 30.1763C69.1615 24.5627 72.778 25.7502 72.778 25.7502C75.153 31.6877 73.6416 36.1138 73.2098 37.1933C75.9626 40.216 77.6359 44.0483 77.6359 48.7983C77.6359 65.3692 67.5422 69.0396 57.9344 70.1191C59.4997 71.4685 60.8491 74.0594 60.8491 78.1077C60.8491 83.8832 60.7951 88.5252 60.7951 89.9826C60.7951 91.1161 61.6048 92.4655 63.7639 92.0337C80.8205 86.3122 93.1812 70.1191 93.1812 51.0653C93.1812 27.2076 73.8575 7.88391 49.9998 7.88391Z"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateGitHubIcon;


/***/ }),

/***/ "./src/components/icons/HelpIcon.ts":
/*!******************************************!*\
  !*** ./src/components/icons/HelpIcon.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateHelpIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-HELP-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<circle r="45" cx="50" cy="50"/>
<path d="M45.547 60.4363C45.5939 57.6466 45.9104 55.4429 46.4965 53.8252C47.0826 52.2076 48.2782 50.4142 50.0834 48.4449L54.6901 43.6976C56.6593 41.4704 57.644 39.0792 57.644 36.5238C57.644 34.0622 56.9993 32.1399 55.7099 30.7567C54.4205 29.3501 52.545 28.6468 50.0834 28.6468C47.6921 28.6468 45.7698 29.2797 44.3162 30.5457C42.8627 31.8117 42.136 33.5113 42.136 35.6447H35.6304C35.6773 31.8468 37.0253 28.7874 39.6744 26.4665C42.347 24.1221 45.8166 22.95 50.0834 22.95C54.5142 22.95 57.9605 24.1456 60.422 26.5368C62.9071 28.9046 64.1496 32.1633 64.1496 36.3128C64.1496 40.4155 62.2506 44.4595 58.4528 48.4449L54.6197 52.2428C52.9083 54.1417 52.0526 56.8729 52.0526 60.4363H45.547ZM45.2657 71.5838C45.2657 70.5288 45.5822 69.6497 46.2152 68.9464C46.8716 68.2196 47.8328 67.8563 49.0987 67.8563C50.3647 67.8563 51.3259 68.2196 51.9823 68.9464C52.6387 69.6497 52.967 70.5288 52.967 71.5838C52.967 72.6388 52.6387 73.5179 51.9823 74.2212C51.3259 74.9011 50.3647 75.241 49.0987 75.241C47.8328 75.241 46.8716 74.9011 46.2152 74.2212C45.5822 73.5179 45.2657 72.6388 45.2657 71.5838Z"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateHelpIcon;


/***/ }),

/***/ "./src/components/icons/MinusIcon.ts":
/*!*******************************************!*\
  !*** ./src/components/icons/MinusIcon.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateMinusIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-MINUS-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45"/>
    <line x1="25" y1="50" x2="75" y2="50"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateMinusIcon;


/***/ }),

/***/ "./src/components/icons/PlusIcon.ts":
/*!******************************************!*\
  !*** ./src/components/icons/PlusIcon.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreatePlusIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-PLUS-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45"/>
    <line x1="50" y1="25" x2="50" y2="75"/>
    <line x1="25" y1="50" x2="75" y2="50"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreatePlusIcon;


/***/ }),

/***/ "./src/components/icons/SaveIcon.ts":
/*!******************************************!*\
  !*** ./src/components/icons/SaveIcon.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateSaveIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-SAVE-ICON" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Floppy Disk Cover -->
    <path d="M50,0 H80 L100 20 V80 Q100 100, 80 100 H20 Q0 100, 0 80 V20 Q0 0, 20 0 Z" />
    <!-- Floppy Disk Shutter -->
    <rect x="27.5%" y="0" width="45%" height="20%"/>
    <!-- Cover Hole -->
    <rect x="53%" y="0" width="12%" height="15%" />
    <!-- Body Background -->
    <rect x="20%" y="40%" width="60%" height="40%"/>
    <!-- Lines -->
    <g>
        <line x1="25%" y1="50%" x2="75%" y2="50%" stroke-width=".25vw"/>
        <line x1="25%" y1="57%" x2="75%" y2="57%" stroke-width=".25vw"/>
        <line x1="25%" y1="63%" x2="75%" y2="63%" stroke-width=".25vw"/>
        <line x1="25%" y1="70%" x2="75%" y2="70%" stroke-width=".25vw"/>
    </g>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateSaveIcon;


/***/ }),

/***/ "./src/components/icons/SettingsIcon.ts":
/*!**********************************************!*\
  !*** ./src/components/icons/SettingsIcon.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateSettingsIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-SETTINGS-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M57.5606 39.5256L58.2225 33.1978C58.2392 33.0407 58.2247 32.8818 58.1799 32.7302C58.1352 32.5786 58.0609 32.4374 57.9615 32.3145C57.862 32.1917 57.7393 32.0897 57.6004 32.0144C57.4615 31.939 57.309 31.8918 57.1518 31.8755L53.4805 31.4861C53.2211 31.4593 52.9775 31.3486 52.7867 31.1709C52.5958 30.9932 52.4681 30.758 52.4229 30.5012C52.1682 29.0534 51.7471 27.6399 51.168 26.2887C51.0647 26.0487 51.0427 25.7815 51.1052 25.5278C51.1678 25.2741 51.3115 25.0478 51.5145 24.8833L54.3838 22.5578C54.6304 22.3571 54.7874 22.0669 54.8205 21.7507C54.8536 21.4345 54.76 21.1181 54.5603 20.8707L50.5568 15.9225C50.3563 15.6757 50.0662 15.5184 49.75 15.4851C49.4338 15.4517 49.1172 15.5451 48.8697 15.7447L45.9952 18.0702C45.7925 18.2347 45.5418 18.3286 45.2809 18.3377C45.02 18.3469 44.7633 18.2707 44.5496 18.1208C43.3444 17.2727 42.0449 16.5672 40.6771 16.0185C40.4353 15.9208 40.2318 15.747 40.0974 15.5234C39.9631 15.2998 39.9051 15.0386 39.9322 14.7792L40.3216 11.1079C40.3546 10.7905 40.2602 10.4731 40.0592 10.2253C39.8582 9.97759 39.567 9.81984 39.2496 9.78679L32.918 9.12365C32.6003 9.09062 32.2826 9.18513 32.0346 9.3864C31.7866 9.58766 31.6287 9.8792 31.5956 10.1969L31.2063 13.8682C31.1796 14.1258 31.0702 14.3679 30.8946 14.5583C30.7189 14.7487 30.4864 14.8772 30.2317 14.9245C28.7793 15.1775 27.3613 15.5987 26.0063 16.1794C25.7661 16.2816 25.4991 16.3029 25.2458 16.2399C24.9925 16.1769 24.7665 16.0331 24.6022 15.8303L22.2727 12.9597C22.0717 12.7137 21.7815 12.5571 21.4656 12.5241C21.1496 12.491 20.8333 12.5842 20.5857 12.7832L15.6374 16.7893C15.3908 16.99 15.2338 17.2802 15.2007 17.5964C15.1676 17.9126 15.2612 18.229 15.4609 18.4764L17.7865 21.3574C17.9508 21.5601 18.0445 21.8109 18.0537 22.0717C18.0628 22.3325 17.9868 22.5892 17.8371 22.803C16.9878 24.0082 16.2818 25.3082 15.7335 26.6767C15.6359 26.9186 15.4621 27.1221 15.2384 27.2562C15.0148 27.3904 14.7535 27.448 14.4941 27.4203L10.8229 27.031C10.6655 27.0145 10.5064 27.0292 10.3548 27.0743C10.2031 27.1194 10.0619 27.1941 9.93914 27.2939C9.81639 27.3937 9.71457 27.5168 9.63952 27.6561C9.56446 27.7954 9.51765 27.9481 9.50177 28.1055L8.83863 34.4333C8.82209 34.5905 8.83671 34.7495 8.88164 34.901C8.92657 35.0526 9.00094 35.1938 9.1005 35.3167C9.20005 35.4395 9.32283 35.5415 9.46183 35.6168C9.60083 35.6921 9.75331 35.7393 9.91056 35.7557L13.5818 36.145C13.8413 36.1718 14.0849 36.2825 14.2757 36.4602C14.4666 36.638 14.5943 36.8731 14.6395 37.13C14.8936 38.5779 15.3147 39.9915 15.8944 41.3424C15.997 41.5825 16.0185 41.8496 15.9555 42.1031C15.8925 42.3565 15.7485 42.5824 15.5453 42.7465L12.676 45.0721C12.4295 45.2727 12.2725 45.5628 12.2391 45.8789C12.2058 46.195 12.299 46.5115 12.4982 46.7591L16.5043 51.7022C16.705 51.9487 16.9951 52.1057 17.3112 52.1391C17.6273 52.1724 17.9437 52.0792 18.1914 51.88L21.0607 49.5544C21.2634 49.39 21.5141 49.296 21.775 49.2869C22.0359 49.2778 22.2926 49.3539 22.5063 49.5038C23.712 50.3519 25.0119 51.0574 26.3801 51.6061C26.6218 51.7039 26.8251 51.8778 26.9593 52.1014C27.0934 52.325 27.1511 52.5862 27.1237 52.8455L26.7343 56.5168C26.7178 56.6738 26.7324 56.8326 26.7772 56.984C26.8221 57.1354 26.8964 57.2765 26.9958 57.3992C27.0952 57.5219 27.2179 57.6238 27.3567 57.6991C27.4956 57.7743 27.6479 57.8215 27.805 57.8378L34.134 58.501C34.2916 58.519 34.4511 58.5057 34.6035 58.4617C34.7559 58.4177 34.8981 58.3441 35.0219 58.2449C35.1456 58.1457 35.2486 58.0231 35.3247 57.8839C35.4008 57.7448 35.4487 57.592 35.4655 57.4343L35.8548 53.763C35.8812 53.5034 35.9917 53.2596 36.1695 53.0686C36.3474 52.8777 36.5827 52.7501 36.8398 52.7053C38.292 52.4513 39.71 52.0297 41.0652 51.4491C41.3054 51.3469 41.5723 51.3257 41.8257 51.3887C42.079 51.4516 42.3049 51.5954 42.4693 51.7982L44.7948 54.6688C44.9957 54.9151 45.2859 55.0719 45.602 55.105C45.9181 55.138 46.2344 55.0447 46.4819 54.8453L51.4262 50.8392C51.6723 50.6381 51.8288 50.348 51.8619 50.032C51.895 49.716 51.8018 49.3998 51.6027 49.1521L49.2772 46.2829C49.1127 46.0802 49.0188 45.8294 49.0097 45.5685C49.0005 45.3076 49.0767 45.0509 49.2266 44.8372C50.0749 43.6314 50.7808 42.3315 51.3302 40.9635C51.4276 40.7217 51.6011 40.5183 51.8246 40.3841C52.048 40.2499 52.3091 40.1922 52.5682 40.2199L56.2395 40.6092C56.3975 40.6255 56.5572 40.6103 56.7094 40.5646C56.8615 40.5188 57.003 40.4434 57.1259 40.3427C57.2487 40.2419 57.3503 40.1178 57.425 39.9776C57.4996 39.8374 57.5457 39.6837 57.5606 39.5256V39.5256ZM32.6974 41.82C31.115 41.6538 29.6173 41.0221 28.3938 40.0049C27.1703 38.9876 26.2759 37.6305 25.8237 36.105C25.3714 34.5794 25.3816 32.9541 25.853 31.4344C26.3244 29.9146 27.2358 28.5688 28.472 27.567C29.7082 26.5652 31.2136 25.9525 32.798 25.8062C34.3824 25.6599 35.9746 25.9867 37.3733 26.7452C38.7721 27.5037 39.9145 28.6599 40.6561 30.0676C41.3978 31.4753 41.7054 33.0714 41.5401 34.6539C41.4303 35.7052 41.1145 36.7245 40.6106 37.6536C40.1067 38.5828 39.4247 39.4036 38.6035 40.069C37.7823 40.7345 36.838 41.2317 35.8247 41.5321C34.8113 41.8325 33.7486 41.9304 32.6974 41.82V41.82Z"/>
    <path d="M91.1339 50.3487L89.4469 44.8151C89.4168 44.7159 89.3674 44.6236 89.3016 44.5435C89.2358 44.4634 89.1548 44.397 89.0633 44.3482C88.9719 44.2994 88.8717 44.2691 88.7685 44.259C88.6653 44.249 88.5611 44.2593 88.4619 44.2896L85.1254 45.3057C84.9596 45.3556 84.782 45.3498 84.6198 45.2891C84.4575 45.2284 84.3197 45.1161 84.2274 44.9696C83.5121 43.8362 82.6571 42.7972 81.6826 41.8771C81.5561 41.7585 81.4722 41.6017 81.4438 41.4307C81.4154 41.2597 81.4442 41.0841 81.5255 40.931L83.1672 37.8515C83.216 37.7599 83.2463 37.6596 83.2564 37.5563C83.2665 37.453 83.2561 37.3487 83.2258 37.2494C83.1956 37.1501 83.1461 37.0577 83.0801 36.9776C83.0141 36.8974 82.9331 36.831 82.8414 36.7822L77.7375 34.057C77.5524 33.9587 77.3359 33.9378 77.1355 33.9988C76.935 34.0599 76.767 34.1979 76.6681 34.3827L75.0265 37.4622C74.9448 37.6152 74.815 37.737 74.6571 37.8088C74.4992 37.8805 74.3221 37.8983 74.1531 37.8593C72.8461 37.5638 71.5073 37.433 70.1678 37.47C69.9948 37.4753 69.8248 37.4235 69.6841 37.3227C69.5434 37.2218 69.4398 37.0775 69.3892 36.912L68.373 33.5755C68.3119 33.375 68.1737 33.207 67.9887 33.1085C67.8038 33.0099 67.5873 32.9889 67.3868 33.0499L61.8532 34.737C61.6528 34.7981 61.4848 34.9363 61.3862 35.1213C61.2877 35.3062 61.2666 35.5228 61.3277 35.7232L62.3438 39.0597C62.3942 39.2255 62.3885 39.4033 62.3278 39.5656C62.267 39.728 62.1545 39.8657 62.0077 39.9577C60.8728 40.6756 59.8325 41.5332 58.9113 42.5104C58.7925 42.6369 58.6354 42.7209 58.4642 42.7493C58.293 42.7776 58.1172 42.7489 57.9639 42.6674L54.8883 41.0193C54.7968 40.9705 54.6966 40.9402 54.5934 40.9301C54.4902 40.9201 54.386 40.9305 54.2868 40.9607C54.1876 40.991 54.0953 41.0405 54.0153 41.1064C53.9352 41.1724 53.869 41.2534 53.8203 41.345L51.0951 46.4503C51.0462 46.5418 51.016 46.642 51.0059 46.7452C50.9959 46.8484 51.0063 46.9526 51.0365 47.0518C51.0668 47.151 51.1163 47.2433 51.1822 47.3233C51.2482 47.4034 51.3292 47.4696 51.4208 47.5183L54.499 49.1599C54.6535 49.2412 54.7768 49.3713 54.8496 49.53C54.9224 49.6887 54.9406 49.8671 54.9013 50.0372C54.6052 51.3446 54.4744 52.6839 54.512 54.0238C54.5175 54.1969 54.4658 54.367 54.3649 54.5077C54.2641 54.6485 54.1196 54.7521 53.954 54.8025L50.6175 55.8186C50.417 55.8797 50.249 56.0179 50.1505 56.2029C50.0519 56.3879 50.0308 56.6044 50.0919 56.8049L51.779 62.3384C51.8091 62.4376 51.8585 62.5299 51.9243 62.61C51.9901 62.6902 52.071 62.7565 52.1625 62.8053C52.254 62.8541 52.3542 62.8845 52.4574 62.8945C52.5606 62.9046 52.6648 62.8942 52.7639 62.864L56.0978 61.8466C56.2638 61.7965 56.4417 61.8023 56.6041 61.863C56.7666 61.9237 56.9046 62.036 56.9971 62.1827C57.7122 63.3159 58.5672 64.3545 59.542 65.2739C59.6684 65.3927 59.7522 65.5498 59.7805 65.721C59.8089 65.8922 59.7803 66.0679 59.699 66.2212L58.0574 69.3007C58.0085 69.3923 57.9782 69.4926 57.9682 69.596C57.9581 69.6993 57.9685 69.8036 57.9987 69.9029C58.029 70.0022 58.0785 70.0945 58.1445 70.1747C58.2104 70.2549 58.2915 70.3212 58.3831 70.37L63.4871 73.0953C63.6719 73.194 63.8884 73.2153 64.0889 73.1545C64.2895 73.0936 64.4576 72.9556 64.5564 72.7709L66.198 69.6913C66.2799 69.5384 66.4097 69.4166 66.5675 69.3446C66.7252 69.2727 66.9023 69.2545 67.0714 69.2929C68.3783 69.5891 69.7172 69.7199 71.0568 69.6823C71.2298 69.677 71.3997 69.7287 71.5404 69.8296C71.6812 69.9304 71.7848 70.0747 71.8354 70.2403L72.8515 73.5767C72.9137 73.7759 73.0522 73.9424 73.2368 74.0396C73.4214 74.1369 73.637 74.1571 73.8365 74.0958L79.3713 72.4088C79.5706 72.3463 79.737 72.2075 79.8343 72.0227C79.9316 71.8379 79.9517 71.6221 79.8904 71.4225L78.8743 68.086C78.8241 67.9202 78.8298 67.7425 78.8906 67.5802C78.9513 67.418 79.0637 67.2802 79.2104 67.188C80.3438 66.4721 81.3827 65.6167 82.3029 64.6419C82.4218 64.5155 82.5789 64.4317 82.75 64.4033C82.9212 64.3749 83.0969 64.4036 83.2502 64.4848L86.3362 66.1291C86.4276 66.1779 86.5278 66.2083 86.631 66.2184C86.7341 66.2286 86.8383 66.2183 86.9375 66.1882C87.0366 66.158 87.1289 66.1086 87.209 66.0428C87.2891 65.977 87.3555 65.8961 87.4043 65.8046L90.1295 60.6994C90.1783 60.6079 90.2086 60.5076 90.2186 60.4044C90.2287 60.3012 90.2183 60.197 90.188 60.0978C90.1578 59.9986 90.1083 59.9064 90.0423 59.8263C89.9764 59.7463 89.8953 59.68 89.8038 59.6313L86.7242 57.9897C86.5713 57.908 86.4495 57.7782 86.3777 57.6203C86.3059 57.4624 86.2881 57.2853 86.3271 57.1163C86.6239 55.8091 86.7547 54.4697 86.7165 53.1297C86.7121 52.9567 86.7644 52.787 86.8654 52.6465C86.9663 52.5059 87.1105 52.4022 87.2758 52.3511L90.6084 51.3349C90.8088 51.2738 90.9768 51.1356 91.0754 50.9506C91.1739 50.7657 91.195 50.5492 91.1339 50.3487V50.3487ZM72.797 59.9726C71.5139 60.4096 70.129 60.4507 68.8222 60.0904C67.5155 59.7302 66.3472 58.9854 65.4692 57.9527C64.5912 56.92 64.044 55.6472 63.8986 54.2995C63.7533 52.9518 64.0166 51.5916 64.6542 50.3954C65.2919 49.1993 66.2745 48.2225 67.4744 47.592C68.6743 46.9615 70.0361 46.7063 71.3829 46.8597C72.7297 47.013 73.9993 47.5678 75.0267 48.452C76.0541 49.3361 76.792 50.5088 77.1444 51.8177C77.5903 53.4749 77.3892 55.2397 76.5818 56.7541C75.7745 58.2685 74.4214 59.4191 72.797 59.9726V59.9726Z"/>
    <path d="M59.8618 78.6547L60.3082 74.393C60.3275 74.2092 60.2729 74.0253 60.1566 73.8817C60.0403 73.7381 59.8717 73.6466 59.6879 73.6273L57.1651 73.3678C57.0138 73.3517 56.8718 73.2866 56.761 73.1823C56.6502 73.078 56.5765 72.9403 56.5513 72.7903C56.3856 71.8128 56.1023 70.859 55.7078 69.9495C55.6469 69.8101 55.6334 69.6546 55.6693 69.5067C55.7051 69.3588 55.7884 69.2268 55.9063 69.1307L57.8737 67.528C58.0174 67.4116 58.1091 67.2428 58.1285 67.0589C58.148 66.875 58.0937 66.6908 57.9775 66.5469L55.2782 63.2182C55.2207 63.147 55.1497 63.0879 55.0693 63.0442C54.9889 63.0005 54.9006 62.9731 54.8096 62.9636C54.7186 62.9541 54.6266 62.9626 54.5389 62.9887C54.4511 63.0148 54.3694 63.058 54.2984 63.1157L52.3272 64.7132C52.2086 64.809 52.0619 64.8633 51.9096 64.8677C51.7572 64.8722 51.6076 64.8266 51.4836 64.7379C50.6761 64.1632 49.802 63.6882 48.8804 63.3233C48.7386 63.2681 48.6189 63.1679 48.5396 63.038C48.4604 62.9081 48.426 62.7557 48.4418 62.6044L48.7013 60.0816C48.7202 59.8977 48.6653 59.7138 48.5488 59.5702C48.4323 59.4267 48.2636 59.3352 48.0797 59.3159L43.8179 58.8695C43.6342 58.8503 43.4503 58.9048 43.3067 59.0211C43.1631 59.1375 43.0716 59.306 43.0523 59.4898L42.7927 62.0126C42.7767 62.164 42.7116 62.3059 42.6073 62.4167C42.503 62.5276 42.3653 62.6012 42.2153 62.6264C41.2382 62.792 40.2848 63.0752 39.3758 63.47C39.2361 63.531 39.0802 63.5445 38.932 63.5084C38.7839 63.4723 38.6517 63.3886 38.5557 63.2701L36.9581 61.2989C36.8416 61.1557 36.673 61.0645 36.4894 61.0453C36.3058 61.0261 36.122 61.0804 35.9784 61.1963L32.6484 63.8956C32.5772 63.9531 32.5181 64.0241 32.4744 64.1046C32.4307 64.185 32.4033 64.2732 32.3938 64.3642C32.3843 64.4553 32.3928 64.5473 32.4189 64.635C32.445 64.7227 32.4881 64.8044 32.5459 64.8754L34.1434 66.8467C34.2392 66.9652 34.2934 67.1119 34.2979 67.2643C34.3023 67.4166 34.2567 67.5662 34.168 67.6902C33.5938 68.4981 33.1189 69.3721 32.7535 70.2934C32.6981 70.4351 32.5978 70.5547 32.468 70.6339C32.3381 70.7131 32.1859 70.7476 32.0346 70.7321L29.5118 70.4725C29.328 70.4533 29.1441 70.5078 29.0005 70.6241C28.8569 70.7405 28.7654 70.9091 28.7461 71.0928L28.2997 75.3559C28.2804 75.5397 28.335 75.7236 28.4513 75.8672C28.5676 76.0107 28.7362 76.1022 28.92 76.1215L31.4428 76.3811C31.5942 76.3976 31.736 76.4631 31.8468 76.5675C31.9576 76.672 32.0312 76.8097 32.0566 76.9599C32.2223 77.9369 32.5056 78.8903 32.9001 79.7993C32.9611 79.939 32.9746 80.0947 32.9388 80.2428C32.9029 80.3909 32.8196 80.5232 32.7016 80.6195L30.7342 82.2209C30.5906 82.3371 30.4989 82.5055 30.4795 82.6893C30.46 82.873 30.5143 83.0569 30.6304 83.2007L33.3297 86.5306C33.4461 86.6741 33.6146 86.7655 33.7984 86.7847C33.9821 86.8039 34.1659 86.7494 34.3095 86.6332L36.2807 85.0357C36.3993 84.9399 36.546 84.8856 36.6983 84.8811C36.8507 84.8767 37.0003 84.9223 37.1243 85.011C37.9319 85.5853 38.806 86.0598 39.7275 86.4242C39.8691 86.48 39.9887 86.5806 40.0678 86.7106C40.147 86.8407 40.1815 86.993 40.1661 87.1445L39.9066 89.6673C39.8873 89.851 39.9419 90.0349 40.0582 90.1785C40.1745 90.3221 40.3431 90.4136 40.5269 90.4329L44.7899 90.8793C44.9739 90.8982 45.1578 90.8434 45.3013 90.7268C45.4448 90.6103 45.5363 90.4416 45.5556 90.2577L45.8152 87.7362C45.831 87.5848 45.896 87.4428 46.0004 87.3319C46.1047 87.221 46.2425 87.1474 46.3926 87.1224C47.3696 86.9563 48.3229 86.673 49.2321 86.2789C49.3717 86.218 49.5275 86.2044 49.6756 86.2402C49.8236 86.2761 49.9559 86.3594 50.0522 86.4774L51.6446 88.45C51.7021 88.5212 51.7731 88.5803 51.8535 88.624C51.9339 88.6677 52.0222 88.6951 52.1132 88.7046C52.2042 88.7141 52.2962 88.7056 52.3839 88.6795C52.4716 88.6534 52.5533 88.6102 52.6243 88.5525L55.9595 85.8545C56.0307 85.797 56.0898 85.726 56.1335 85.6456C56.1772 85.5652 56.2046 85.4769 56.2141 85.3859C56.2236 85.2949 56.2151 85.2029 56.189 85.1152C56.1629 85.0274 56.1198 84.9457 56.062 84.8747L54.4645 82.9035C54.3687 82.7849 54.3145 82.6382 54.31 82.4859C54.3056 82.3335 54.3512 82.1839 54.4399 82.06C55.0139 81.2522 55.4884 80.3781 55.8531 79.4567C55.9087 79.3149 56.0093 79.1953 56.1393 79.1161C56.2694 79.0369 56.4219 79.0024 56.5733 79.0181L59.0961 79.2776C59.1873 79.2871 59.2795 79.2786 59.3674 79.2524C59.4553 79.2262 59.5371 79.183 59.6082 79.1251C59.6794 79.0672 59.7384 78.9959 59.7819 78.9152C59.8254 78.8344 59.8526 78.7459 59.8618 78.6547ZM44.0295 80.0822C42.9768 80.0271 41.9655 79.6541 41.1291 79.0125C40.2927 78.3709 39.6705 77.4909 39.3445 76.4884C39.0186 75.4859 39.0042 74.4082 39.3032 73.3973C39.6023 72.3865 40.2008 71.4901 41.0198 70.8264C41.8387 70.1627 42.8397 69.7629 43.8905 69.6796C44.9414 69.5964 45.9928 69.8338 46.906 70.3603C47.8192 70.8869 48.5513 71.6779 49.0057 72.6291C49.4601 73.5802 49.6155 74.6468 49.4514 75.6881C49.2496 76.9596 48.5845 78.1114 47.5842 78.9217C46.5838 79.732 45.319 80.1436 44.0334 80.077L44.0295 80.0822Z"/>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateSettingsIcon;


/***/ }),

/***/ "./src/components/icons/TrashIcon.ts":
/*!*******************************************!*\
  !*** ./src/components/icons/TrashIcon.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateTrashIcon() {
    const parser = new DOMParser();
    return parser.parseFromString(`<svg class="DEV-WIDGET-TRASH-ICON" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer Circle -->
    <circle cx="50" cy="50" r="45" fill="none"/>
    <!-- Main Can -->
    <path d="M30,30 V70 Q30 75, 35 75 H65 Q70 75, 70 70 V30" height="55" />
    <!-- Lid -->
    <line x1="25" y1="30" x2="75" y2="30" stroke-linecap="round" />
    <!-- Handle -->
    <path d="M40 30 V25 Q40 20, 45 20 H55 Q60 20, 60 25 V30" fill="none" />
    <!-- Lines -->
    <g>
        <line x1="40" y1="40" x2="40" y2="65" stroke-linecap="round" />
        <line x1="50" y1="38" x2="50" y2="68" stroke-linecap="round" />
        <line x1="60" y1="40" x2="60" y2="65" stroke-linecap="round" />
    </g>
</svg>`, 'text/html').querySelector('svg');
}
exports.default = CreateTrashIcon;


/***/ }),

/***/ "./src/components/popups/HelpWindow.ts":
/*!*********************************************!*\
  !*** ./src/components/popups/HelpWindow.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Popup_1 = __webpack_require__(/*! ../ui/Popup */ "./src/components/ui/Popup.ts");
const Paragraph_1 = __webpack_require__(/*! ../ui/Paragraph */ "./src/components/ui/Paragraph.ts");
const Label_1 = __webpack_require__(/*! ../ui/form/Label */ "./src/components/ui/form/Label.ts");
class Help extends Popup_1.default {
    constructor() {
        super();
        this.elem.classList.add('DEV-WIDGET-HELP');
        this.body.appendChild(Label_1.default({ text: 'Position:' }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Can be a Keyword (Top, Bottom, Left, Right) or a pixel value (200px 200px)'
        }));
        this.body.appendChild(Label_1.default({ text: 'Background Color:' }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Can be either a rgb value (0,0,0), rgba value (0,0,0,1), or a 3 or 6 digit hex value (#123 or #123123)'
        }));
        this.body.appendChild(Label_1.default({ text: 'Custom Command:' }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Any function defined on the window object (global function)'
        }));
        this.body.appendChild(Label_1.default({ text: 'Custom Data:' }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Use the Plus, Minus, and Trash icons to add to, remove from, and delete entire data sets.'
        }));
        this.body.appendChild(Paragraph_1.default({
            text: 'The select menus on the left side of each row will modify the data type.'
        }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Only rows with a value for the key and value inputs will be saved. Arrays are auto indexed.'
        }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Give the data set a name with the input at the bottom and click the save icon.'
        }));
        this.body.appendChild(Paragraph_1.default({
            text: 'Data from other tamplates can be loaded under the assocations panel (Right hand side).'
        }));
    }
}
exports.default = Help;


/***/ }),

/***/ "./src/components/popups/TemplateData.ts":
/*!***********************************************!*\
  !*** ./src/components/popups/TemplateData.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Popup_1 = __webpack_require__(/*! ../ui/Popup */ "./src/components/ui/Popup.ts");
const Logger_1 = __webpack_require__(/*! ../Logger */ "./src/components/Logger.ts");
const Dragable_1 = __webpack_require__(/*! ../ui/Dragable */ "./src/components/ui/Dragable.ts");
// Import Factory Function
const ElementFactory_1 = __webpack_require__(/*! ../ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Label_1 = __webpack_require__(/*! ../ui/form/Label */ "./src/components/ui/form/Label.ts");
const Button_1 = __webpack_require__(/*! ../ui/form/Button */ "./src/components/ui/form/Button.ts");
const Input_1 = __webpack_require__(/*! ../ui/form/Input */ "./src/components/ui/form/Input.ts");
const PlusIcon_1 = __webpack_require__(/*! ../icons/PlusIcon */ "./src/components/icons/PlusIcon.ts");
const MinusIcon_1 = __webpack_require__(/*! ../icons/MinusIcon */ "./src/components/icons/MinusIcon.ts");
const TrashIcon_1 = __webpack_require__(/*! ../icons/TrashIcon */ "./src/components/icons/TrashIcon.ts");
const SaveIcon_1 = __webpack_require__(/*! ../icons/SaveIcon */ "./src/components/icons/SaveIcon.ts");
const DraggableIcon_1 = __webpack_require__(/*! ../icons/DraggableIcon */ "./src/components/icons/DraggableIcon.ts");
const ConvertToJSON_1 = __webpack_require__(/*! ../icons/ConvertToJSON */ "./src/components/icons/ConvertToJSON.ts");
// Storage Functons / Components
const TemplateStorage_1 = __webpack_require__(/*! ../storage/TemplateStorage */ "./src/components/storage/TemplateStorage.ts");
// Helper Functions
const CreateDataRow_1 = __webpack_require__(/*! ../helpers/CreateDataRow */ "./src/components/helpers/CreateDataRow.ts");
const EncodeDataToDom_1 = __webpack_require__(/*! ../helpers/EncodeDataToDom */ "./src/components/helpers/EncodeDataToDom.ts");
const DecodeDataFromDom_1 = __webpack_require__(/*! ../helpers/DecodeDataFromDom */ "./src/components/helpers/DecodeDataFromDom.ts");
// A popup that controls the creation, deletion, and updating template data
class TemplateData extends Popup_1.default {
    constructor(props) {
        super();
        this.elem.classList.add('DEV-WIDGET-TEMPLATE-DATA');
        this.TemplateStorage = new TemplateStorage_1.TemplateStorage();
        this.associations = props.associations;
        this.GetDataOptions = this.GetDataOptions.bind(this);
        this.SetWidgetSetting = props.setWidgetSetting;
        this.SelectWidgetDataSet = props.selectWidgetDataSet;
        this.UpdateWidgetOptions = props.updateWidgetDataOptions;
        this.GetTemplateData = this.GetTemplateData.bind(this);
        this.SelectTemplateData = this.SelectTemplateData.bind(this);
        this.ChangeDataSet = this.ChangeDataSet.bind(this);
        this.SetSelectedTemplateData = this.SetSelectedTemplateData.bind(this);
        this.HandleDrop = this.HandleDrop.bind(this);
        this.HandleDragEnd = this.HandleDragEnd.bind(this);
        this.AssociateTemplateData = this.AssociateTemplateData.bind(this);
        // Template data assocation and validattion
        const associated = this.TemplateStorage.ModifyAssociation();
        const validAssociation = this.associations.findIndex(a => a === associated) > -1 ? true : false;
        const logger = new Logger_1.default(); // Logger
        // Check data still excists and if so, use it
        if (validAssociation) {
            this.associated = true;
            this.templateData = typeof associated === 'string'
                ? this.TemplateStorage.GetTemplateData(associated)
                : this.TemplateStorage.GetTemplateData();
        }
        else {
            this.associated = false;
            this.TemplateStorage.ModifyAssociation(null);
            this.templateData = this.TemplateStorage.GetTemplateData();
        }
        this.LogMessage = logger.displayMessage;
        logger.elem.style.position = 'relative';
        // Create Main Containers
        const leftCon = ElementFactory_1.default('div');
        const rightCon = ElementFactory_1.default('div');
        // Create Template Data Sets & Associations
        const dataSetsTitle = ElementFactory_1.default('h2');
        const associationsTitle = ElementFactory_1.default('h2');
        const setsCon = ElementFactory_1.default('div', 'DEV-WIDGET-DATA-SETS');
        const associationsCon = ElementFactory_1.default('div', 'DEV-WIDGET-ASSOCIATIONS');
        const options = this.GetDataOptions();
        const labelOptions = options
            .filter(data => data[1] !== 'No Data')
            .map(data => this.CreateDataLabel(data, !this.associated));
        const labelAssociations = this.CreateAssociationLabels(this.associations);
        const convertToJSON = ConvertToJSON_1.default();
        const plusIcon = PlusIcon_1.default();
        const minusIcon = MinusIcon_1.default();
        const trashIcon = TrashIcon_1.default();
        // Create Template Data Componenets
        const dataTitle = ElementFactory_1.default('h2');
        const dataCon = ElementFactory_1.default('div', 'DEV-WIDGET-TEMPLATE-DATA-CON');
        const textArea = ElementFactory_1.default('textarea');
        // Create Template Data Controls
        const nameContainer = ElementFactory_1.default('div', 'DEV-WIDGET-TEMPLATE-NAME');
        const dataNameInput = Input_1.default({ placeholder: 'Name for Data Set' });
        const saveButton = Button_1.default();
        saveButton.appendChild(SaveIcon_1.default());
        saveButton.addEventListener('click', () => this.HandleSaveDataSet());
        // Modify Data Set Elements
        dataSetsTitle.textContent = 'Data Sets';
        if (labelOptions.length)
            labelOptions[0].classList.add('DEV-WIDGET-SELECTED');
        Dragable_1.CreateDropable(setsCon, {
            drop: this.HandleDrop,
            dragOver: (e) => e.preventDefault()
        });
        // Modify Assocaition Elements
        associationsTitle.textContent = 'Associations';
        associationsTitle.setAttribute('value', this.TemplateStorage.templateName[0]);
        associationsTitle.addEventListener('click', (e) => {
            const target = e.target;
            this.HandleSelectAssocation(target.getAttribute('value'));
        });
        labelAssociations.forEach((l, i) => {
            if (this.associated) {
                if (this.associations[i] === associated)
                    l.classList.add('DEV-WIDGET-SELECTED');
            }
            else if (this.associations[i] === this.TemplateStorage.templateName[0]) {
                l.classList.add('DEV-WIDGET-SELECTED');
            }
            associationsCon.appendChild(l);
        });
        // Modify Template Data Elements
        dataTitle.innerHTML = 'Template Data';
        textArea.style.display = 'none';
        convertToJSON.addEventListener('click', () => this.HandleDisplayJSON(textArea));
        plusIcon.addEventListener('click', () => {
            if (this.associated) {
                this.LogMessage('Associated data can not be added to');
                return;
            }
            dataCon.appendChild(CreateDataRow_1.default('text'));
        });
        minusIcon.addEventListener('click', () => {
            if (this.associated) {
                this.LogMessage('Associated data can not be removed');
                return;
            }
            const container = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
            [...container.childNodes].forEach(c => container.removeChild(c));
        });
        trashIcon.addEventListener('click', () => {
            if (this.selected === null)
                return;
            if (this.associated) {
                this.LogMessage('Associated data can not be deleted');
                return;
            }
            const container = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
            [...container.childNodes].forEach(c => container.removeChild(c));
            this.HandleSaveDataSet();
        });
        // Append Data Set Elements
        leftCon.appendChild(dataSetsTitle);
        labelOptions.forEach(o => setsCon.appendChild(o));
        leftCon.appendChild(setsCon);
        leftCon.appendChild(associationsTitle);
        leftCon.appendChild(associationsCon);
        this.body.appendChild(leftCon);
        // Append Template Data Elements
        dataTitle.append(convertToJSON);
        dataTitle.appendChild(plusIcon);
        dataTitle.appendChild(minusIcon);
        dataTitle.appendChild(trashIcon);
        // Append Template Data Elements
        rightCon.appendChild(dataTitle);
        rightCon.appendChild(dataCon);
        rightCon.appendChild(textArea);
        nameContainer.appendChild(dataNameInput);
        nameContainer.appendChild(saveButton);
        rightCon.appendChild(nameContainer);
        this.body.appendChild(rightCon);
        this.elem.firstElementChild.appendChild(logger.elem);
        if (this.templateData.length) {
            this.selected = props.selected
                ? props.selected
                : this.templateData[0].name;
            this.ChangeDataSet(this.selected);
        }
        else {
            this.selected = null;
        }
    }
    // Creates a label representing a data set
    // @param {[string, string]} data - The raw and parsed name for the data
    // @param {boolean} draggable - If the data can be re-ordered in the parent container
    // @returns {DOM Node} - The Label Element
    CreateDataLabel(data, draggable) {
        const label = Label_1.default({ text: data[1] });
        label.setAttribute('value', data[0]);
        label.prepend(DraggableIcon_1.default());
        label.addEventListener('click', () => {
            this.ChangeDataSet(data[0]);
            this.SelectWidgetDataSet(this.selected);
            this.HandleLoadDataSet();
        });
        if (draggable !== false)
            Dragable_1.CreateDraggable(label, {
                dragStart: this.HandleDragStart,
                dragEnter: this.HandleDragEnter,
                dragLeave: this.HandleDragLeave,
                dragEnd: this.HandleDragEnd
            });
        return label;
    }
    // Stores the data related to the draggable data set
    // @param {DragEvent} e - The event tied to the start of the drag
    HandleDragStart(e) {
        const target = e.target;
        // Find the selected data set's index within the parent
        const i = Array.prototype.indexOf.call(target.parentElement.children, target);
        e.dataTransfer.setData('text/plain', i); // Set which data set we are working with
        e.dataTransfer.dropEffect = 'move';
        target.style.opacity = '.5';
        target.style.borderBottom = '.15vw solid transparent';
    }
    // Handle a drag object entering a valid drop zone
    // @param {Drag Event} e -  The event attached to the drop zone that 
    //                          has had the element dragged into it
    HandleDragEnter(e) {
        e.preventDefault();
        const target = e.target;
        if (target.nodeName === 'LABEL')
            target.style.borderTop = '0.15vw solid #1177B7';
    }
    // Handles a drag element leaving a valid drop zone
    // @param {Drag Event} e - The event attached to the drag zone
    HandleDragLeave(e) {
        e.preventDefault();
        const target = e.target;
        if (target.nodeName === 'LABEL')
            target.style.borderTop = '';
    }
    // Handles dropping the element into a valid drag zone
    // @param {Drag Event} e - The event attached to the drop zone being dropped into.
    HandleDrop(e) {
        e.preventDefault();
        const dropZone = e.currentTarget;
        const target = e.target;
        const index = Number(e.dataTransfer.getData('text/plain'));
        const child = dropZone.childNodes[index];
        const label = this.CreateDataLabel([child.getAttribute('value'), child.textContent]);
        if (target !== child) { // We are not dropping the item on itself
            const data = this.templateData.splice(index, 1)[0];
            if (target.nodeName === 'LABEL') {
                // Find the target's index in the drop zone's children
                const i = Array.prototype.indexOf.call(dropZone.children, target);
                dropZone.removeChild(child);
                // Insert the new label before the target label
                target.insertAdjacentElement('beforebegin', label);
                this.templateData.splice(i, 0, data);
            }
            else {
                dropZone.removeChild(child);
                dropZone.appendChild(label);
                this.templateData.push(data);
            }
        }
        if (child.getAttribute('value') === this.selected) // Select the dropped value
            label.classList.add('DEV-WIDGET-SELECTED');
        target.style.borderTop = '';
        this.TemplateStorage.SaveTemplateData(this.templateData); // Store the new order
    }
    // Handles a canceled / invalid drag 
    // @param {Drag Event} e - The event attached to the element who's drag was canceled
    HandleDragEnd(e) {
        e.preventDefault();
        const target = e.target;
        target.style.borderBottom = '';
        if (Number(target.style.opacity) < 1) {
            target.style.opacity = '1';
        }
        if (target.getAttribute('value') === this.selected)
            target.classList.add('DEV-WIDGET-SELECTED');
    }
    // Creates all the association labels for some template data
    // @param {string[]} associations - A list of templates that have data that can be assocaited to
    // @returns {DOM Node} - The label element
    CreateAssociationLabels(associations) {
        return associations.map(a => [a, a.substring(17).replace(/(.html)|-|\./g, ' ').trim()])
            .map(a => {
            a[1] = !a[1].length ? 'Index' : a[1];
            return a;
        }).map(a => {
            const label = ElementFactory_1.default('label');
            label.textContent = a[1];
            label.setAttribute('value', a[0]);
            label.addEventListener('click', (e) => {
                const target = e.target;
                this.HandleSelectAssocation(target.getAttribute('value'));
            });
            return label;
        });
    }
    // Selects the data from another template and loads it in the current template
    // @param {string} association - The new template data to be loaded
    HandleSelectAssocation(association) {
        const dataSetsCon = document.querySelector('.DEV-WIDGET-DATA-SETS');
        const associations = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS').childNodes;
        const newAssociationElem = [...associations].find(a => a.getAttribute('value') === association);
        const currentlySelected = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS .DEV-WIDGET-SELECTED');
        if (currentlySelected)
            currentlySelected.classList.remove('DEV-WIDGET-SELECTED');
        if (newAssociationElem)
            newAssociationElem.classList.add('DEV-WIDGET-SELECTED');
        // Get the new data from the local storage
        this.templateData = this.TemplateStorage.GetTemplateData(association);
        // If we are viewing the current template's data
        if (association === this.TemplateStorage.templateName[0]) {
            this.associated = false;
            this.TemplateStorage.ModifyAssociation(null);
        }
        else {
            this.associated = true;
            this.TemplateStorage.ModifyAssociation(association);
        }
        // Re-Create the sata sets
        const options = this.GetDataOptions();
        const labelOptions = options
            .map(data => this.CreateDataLabel(data, !this.associated));
        [...dataSetsCon.childNodes].forEach(c => dataSetsCon.removeChild(c));
        labelOptions.forEach(l => dataSetsCon.appendChild(l));
        // If there is data, select it
        if (this.templateData.length) {
            this.ChangeDataSet(this.templateData[0].name);
            this.HandleLoadDataSet();
        }
        else {
            this.HandleLoadDataSet({});
        }
        this.UpdateWidgetOptions(this.GetDataOptions()); // Updates the widget's selectable data sets
    }
    // Loads a data set into the template data popup
    // @param {object} inputData - optional data to load instead of the selected data
    HandleLoadDataSet(inputData) {
        if (!this.templateData.length && !inputData)
            return; // Data is required
        const textArea = this.elem.querySelector('textarea');
        const templateData = this.templateData.find(d => d.name === this.selected);
        const parent = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const data = inputData !== undefined ? inputData : templateData.data;
        if (textArea.style.display === 'none') { // If we are in the GUI mode
            const dataCon = EncodeDataToDom_1.default(data);
            [...parent.childNodes].forEach(c => parent.removeChild(c));
            [...dataCon.childNodes].forEach(c => parent.appendChild(c));
            this.associated
                ? parent.classList.add('DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED')
                : parent.classList.remove('DEV-WIDGET-TEMPLATE-DATA-CON-ASSOCIATED');
        }
        else { // We are in JSON (textarea) mode
            textArea.value = JSON.stringify(data, null, 4);
        }
    }
    // Saves the current data set to the browser's local storage
    HandleSaveDataSet() {
        if (this.associated) {
            this.LogMessage('Data can not be saved when being associated from another template');
            return;
        }
        const textArea = this.elem.querySelector('textarea');
        if (textArea.style.display === 'flex') { // If we are in JSON mode, convert and save it
            this.HandleDisplayJSON(textArea);
            return;
        }
        const associationsCon = this.elem.querySelector('.DEV-WIDGET-ASSOCIATIONS');
        const association = this.associations.findIndex(a => this.TemplateStorage.templateName[0] === a);
        const saveContainer = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME');
        const dataCon = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const dataSetCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const saveIcon = this.elem.querySelector('.DEV-WIDGET-SAVE-ICON');
        const input = saveContainer.childNodes[0];
        const name = input.value.replace(/ /g, '-');
        if (!name) {
            this.LogMessage('Please enter a name for the data set');
            return;
        }
        let data = DecodeDataFromDom_1.default({}, dataCon); // Decode the data from the DOM
        let found = this.templateData.findIndex(data => data.name === name);
        // Remove the data
        if (!Object.keys(data).length) {
            this.HandleRemoveDataSet();
            // Add the data as a new data set (save as)
        }
        else if (found === -1) {
            this.templateData.push({ name, data });
            const label = this.CreateDataLabel([name, input.value]);
            dataSetCon.appendChild(label);
            this.ChangeDataSet(name);
            this.UpdateWidgetOptions(this.GetDataOptions());
            this.SelectWidgetDataSet(this.selected);
            // Update the current data set
        }
        else {
            this.templateData[found].data = data;
        }
        if (!saveIcon.classList.contains('DEV-WIDGET-SAVED')) {
            saveIcon.classList.add('DEV-WIDGET-SAVED');
            setTimeout(() => saveIcon.classList.remove('DEV-WIDGET-SAVED'), 5000);
        }
        // If this template is not availible for assocacation and there is data
        if (association === -1 && this.templateData.length) {
            const associationLabel = this.CreateAssociationLabels([this.TemplateStorage.templateName[0]])[0];
            associationLabel.classList.add('DEV-WIDGET-SELECTED');
            this.associations.push(this.TemplateStorage.templateName[0]); // Make the current template assocaitable
            this.SetWidgetSetting('associations', this.associations); // Save the new association
            associationsCon.appendChild(associationLabel);
        }
        else if (!this.templateData.length) { // We are assocaited and there is no data
            const i = this.associations.findIndex(a => a === this.TemplateStorage.templateName[0]);
            this.associations.splice(i, 1); // Remove the current templates ability to be associated to
            associationsCon.removeChild(associationsCon.childNodes[i]);
            this.SetWidgetSetting('associations', this.associations);
        }
        this.TemplateStorage.SaveTemplateData(this.templateData);
        this.LogMessage(name.replace(/-/g, ' ') + ' has been updated successfully');
    }
    // Removes a data set from the current template
    HandleRemoveDataSet() {
        const dataSetCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const found = this.templateData.findIndex(data => data.name === this.selected);
        const children = dataSetCon.childNodes;
        // Remove the data set label
        children.forEach(c => c.getAttribute('value') === this.selected ? dataSetCon.removeChild(c) : null);
        this.templateData.splice(found, 1); // Remove the data
        this.UpdateWidgetOptions(this.GetDataOptions()); // Update the widget options
        if (this.templateData.length) { // Select a new data set
            this.selected = found === 0 ? this.templateData[0].name : this.templateData[found - 1].name;
            this.HandleLoadDataSet();
            this.ChangeDataSet(this.selected);
        }
        else {
            this.selected = null;
        }
    }
    // Toogles the template data popup between GUI and JSON mode
    // @param {DOM Node} textArea - The text area used in the JSON mode
    HandleDisplayJSON(textArea) {
        const dataCon = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-DATA-CON');
        const display = textArea.style.display === 'none' ? false : true;
        if (display) { // We are currently in JSON mode
            // The data set's name
            const input = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME input');
            textArea.style.display = 'none';
            dataCon.style.display = '';
            try {
                if (this.associated) {
                    this.HandleLoadDataSet(JSON.parse(textArea.value)); // Loads the inout data
                }
                else {
                    this.SetSelectedTemplateData(textArea.value);
                }
            }
            catch (error) {
                textArea.style.display = 'flex';
                dataCon.style.display = 'none';
                if (error.message.includes('JSON'))
                    this.LogMessage(error.message);
                return;
            }
        }
        else { // We are currently in GUI mode
            const found = this.templateData.findIndex(t => this.selected === t.name);
            textArea.value = found > -1 ? JSON.stringify(this.templateData[found].data, null, 4) : "{\n\r}";
            textArea.style.display = 'flex';
            dataCon.style.display = 'none';
        }
    }
    // Loads a data set before running the popup parent classes Open function
    Open() {
        this.HandleLoadDataSet();
        super.Open();
    }
    // Gets all the avaible data sets
    // @returns {[string, string][]} - An array of raw and parsed data set names
    GetDataOptions() {
        return this.templateData.map(data => {
            return [data.name, data.name.replace(/-/g, ' ')];
        });
    }
    // Changes the currently selected data set
    // @param {string} val - The name of the data set to be selected
    ChangeDataSet(val) {
        if (val === 'no-data')
            return;
        const dataSetsCon = this.elem.querySelector('.DEV-WIDGET-DATA-SETS');
        const leftCon = dataSetsCon.parentElement;
        const dataCon = leftCon.nextElementSibling;
        const nameInput = dataCon.lastElementChild.childNodes[0];
        const selected = dataSetsCon.querySelector('.DEV-WIDGET-SELECTED');
        // Remove the old selection class
        if (selected)
            selected.classList.remove('DEV-WIDGET-SELECTED');
        const labels = leftCon.childNodes[1].childNodes;
        // Find the element we clicked on or want to select
        const elem = [...labels].find(l => l.getAttribute('value') === val);
        if (!elem)
            throw new Error('Invalid data set selection');
        elem.classList.add('DEV-WIDGET-SELECTED');
        // Update the input, selected name, and load the data
        nameInput.value = val.replace(/-/g, ' ');
        this.selected = val;
    }
    // Gets the currently selected tempalte data
    // @returns {object} - The selected template data
    GetTemplateData() {
        if (this.selected === null)
            return { name: '', data: {} };
        return this.templateData.find(data => data.name === this.selected);
    }
    // Selects a data set from any external script
    // @param {string} name - The data set's name
    SelectTemplateData(name) {
        if (name.includes(' '))
            name = name.replace(/ /g, '-');
        try {
            this.ChangeDataSet(name);
            this.SelectWidgetDataSet(this.selected);
            this.HandleLoadDataSet();
        }
        catch (error) {
            this.LogMessage('There was an error when selecting the data set ' + name);
            console.error(error);
        }
    }
    // Set's the currently selected tempalte data
    // @param {string} data - A stringifed version of the data to be set
    // @param {string} name - An optional name to use when saving the data
    SetSelectedTemplateData(data, name) {
        if (this.associated) { // Can't overwrite assocaited data
            this.LogMessage('Data can not be set when being associated from another template');
            return;
        }
        let parsed;
        try { // Attempt to parse the data string
            parsed = JSON.parse(data);
        }
        catch (error) {
            this.LogMessage('Error parsing JSON data');
            return;
        }
        const select = name ? name : this.selected;
        let current = this.templateData.findIndex(d => d.name === select);
        if (current === -1) { // We could not find the data by name
            const input = this.elem.querySelector('.DEV-WIDGET-TEMPLATE-NAME input');
            if (!input.value.length) {
                input.value = select ? select : 'New Data';
            }
            else if (name) {
                input.value = name;
            }
        }
        else { // The data does excist
            this.templateData[current].data = parsed;
        }
        this.HandleLoadDataSet(parsed); // Loads the inout data
        if (Object.keys(parsed).length)
            this.HandleSaveDataSet(); // Saves / updates the template data
    }
    // Assocaited this template to another template's data
    // @param {string} association - The name of the template being associated to
    AssociateTemplateData(association) {
        association = association !== undefined
            ? 'DEV-TEMPLATE-DATA-' + association
            : this.TemplateStorage.templateName[0];
        if (this.associations.findIndex(a => a === association) > -1) {
            this.HandleSelectAssocation(association);
        }
        else {
            this.LogMessage('Cannot associate ' + association);
        }
    }
}
exports.default = TemplateData;


/***/ }),

/***/ "./src/components/popups/UserSettings.ts":
/*!***********************************************!*\
  !*** ./src/components/popups/UserSettings.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Popup_1 = __webpack_require__(/*! ../ui/Popup */ "./src/components/ui/Popup.ts");
// Factory Functions
const ElementFactory_1 = __webpack_require__(/*! ../ui/ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Label_1 = __webpack_require__(/*! ../ui/form/Label */ "./src/components/ui/form/Label.ts");
const Input_1 = __webpack_require__(/*! ../ui/form/Input */ "./src/components/ui/form/Input.ts");
const Checkbox_1 = __webpack_require__(/*! ../ui/form/Checkbox */ "./src/components/ui/form/Checkbox.ts");
const Button_1 = __webpack_require__(/*! ../ui/form/Button */ "./src/components/ui/form/Button.ts");
// Popup to edit the user settings
class UserSettings extends Popup_1.default {
    constructor(props) {
        super();
        // Applies a valid title safe percentage to the title safe element
        // @param {number} percentage - Percentage to consider "safe" on the screen
        this.AdjustTitleSafe = (percentage) => {
            const border = window.innerWidth * .002;
            const height = window.innerHeight - (window.innerHeight * percentage) - (border / 2);
            const topPadding = (window.innerHeight - height) / 2 - (border / 2);
            const width = window.innerWidth - (window.innerWidth * percentage) - (border / 2);
            const rightPadding = (window.innerWidth - width) / 2 - (border / 2);
            const style = this.TitleSafe.style;
            if (percentage <= 0) {
                style.display = 'none';
            }
            else {
                style.display = 'block';
                style.height = height + 'px';
                style.width = width + 'px';
                style.top = topPadding + 'px';
                style.right = rightPadding + 'px';
            }
            style.borderWidth = border + 'px';
            this.titleSafe = percentage;
        };
        // Resets the widget's user data
        this.ResetWidgetData = () => {
            const checkboxes = this.elem.querySelectorAll('.DEV-WIDGET-CHECKBOX');
            const input = this.body.querySelector('input');
            const logger = document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
            checkboxes.forEach(e => e.classList.remove('DEV-WIDGET-CHECKED'));
            input.value = '0%';
            logger.style.display = '';
            this.runUpdate = false;
            this.AdjustTitleSafe(0);
            this.ResetWidgetSetting();
            this.Close(false);
        };
        this.runUpdate = props.userSettings.runUpdate;
        this.titleSafe = props.userSettings.titleSafe;
        this.SetWidgetSetting = props.setWidgetSetting;
        this.ResetWidgetSetting = props.resetWidgetSetting;
        this.elem.classList.add('DEV-WIDGET-USER-SETTINGS');
        // Create elements
        const header = ElementFactory_1.default('h2');
        const form = ElementFactory_1.default('form', 'DEV-WIDGET-POPUP-FORM');
        const runUpdateButton = Checkbox_1.default();
        const runUpdateLabel = Label_1.default({
            text: 'Run Update Command on Page Load',
        });
        const titleSafeInput = Input_1.default({ defaultValue: this.titleSafe * 100 + '%' });
        const titleSafeLabel = Label_1.default({
            text: 'Title Safe Area',
            customElement: titleSafeInput
        });
        const optionsContainer = ElementFactory_1.default('div');
        const saveButton = Button_1.default({ text: 'Save' });
        const doNotSaveButton = Button_1.default({ text: 'Do Not Save' });
        const clearDataButton = Button_1.default({ text: 'Reset Widget Settings', classes: 'DEV-WIDGET-DANGER-BUTTON' });
        // Modify elements
        header.textContent = 'Widget Settings';
        runUpdateButton.addEventListener('click', (e) => {
            const target = e.target;
            target.classList.contains('DEV-WIDGET-CHECKED')
                ? this.runUpdate = true
                : this.runUpdate = false;
        });
        if (this.runUpdate)
            runUpdateButton.classList.add('DEV-WIDGET-CHECKED');
        titleSafeInput.addEventListener('input', (e) => this.CheckTitleSafe(e.target));
        titleSafeInput.addEventListener('blur', (e) => this.CheckTitleSafe(e.target));
        this.TitleSafe = ElementFactory_1.default('div');
        this.TitleSafe.classList.add('DEV-WIDGET-TITLE-SAFE');
        if (this.titleSafe === 0 || !window.location.search.includes('debug=true')) {
            this.TitleSafe.style.display = 'none';
        }
        else {
            this.AdjustTitleSafe(this.titleSafe);
        }
        optionsContainer.classList.add('DEV-WIDGET-TEMPLATE-DATA-CONTROLLER');
        saveButton.addEventListener('click', () => this.HandleSaveData());
        doNotSaveButton.addEventListener('click', () => this.Close());
        clearDataButton.addEventListener('click', () => this.ResetWidgetData());
        // Append elements
        this.body.appendChild(header);
        this.body.appendChild(form);
        form.append(runUpdateLabel);
        form.append(runUpdateButton);
        form.append(titleSafeLabel);
        form.append(titleSafeInput);
        this.body.appendChild(optionsContainer);
        optionsContainer.append(saveButton);
        optionsContainer.append(doNotSaveButton);
        this.elem.firstElementChild.appendChild(clearDataButton);
        document.querySelector('body').appendChild(this.TitleSafe);
        window.addEventListener('resize', () => this.AdjustTitleSafe(this.titleSafe));
    }
    // Checks the value for the title safe element
    // @param {DOM Node} e - The input used to set the title safe percentage
    CheckTitleSafe(e) {
        const target = e;
        let val = target.value;
        if (val.indexOf('%') !== 1)
            val = val.split('').filter(v => v !== "%").join('');
        if (isNaN(Number(val)))
            target.value = '';
        let percentage = Number(val) / 100;
        if (percentage >= 1) {
            target.value = '100%';
            percentage = .99;
        }
        this.AdjustTitleSafe(percentage);
    }
    // Saves the user's current data
    HandleSaveData() {
        this.SetWidgetSetting('user', {
            runUpdate: this.runUpdate,
            titleSafe: this.titleSafe
        });
        this.Close();
    }
}
exports.default = UserSettings;


/***/ }),

/***/ "./src/components/storage/Storage.ts":
/*!*******************************************!*\
  !*** ./src/components/storage/Storage.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor() {
        // Saves the widget data to the browser's local storage
        // @param {string} name - The ID to save the data with
        // @param {object} data - The data to be saved
        this.SaveData = (name, data) => {
            localStorage.setItem(name, JSON.stringify(data));
        };
    }
    // Get's data by name from localstorage
    GetData(i) {
        return localStorage.getItem(i);
    }
}
exports.default = Storage;


/***/ }),

/***/ "./src/components/storage/TemplateStorage.ts":
/*!***************************************************!*\
  !*** ./src/components/storage/TemplateStorage.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Storage_1 = __webpack_require__(/*! ./Storage */ "./src/components/storage/Storage.ts");
;
// The widget's template data for the currently loaded template (html page)
class TemplateStorage extends Storage_1.default {
    constructor() {
        super();
        this.templateName = [
            'DEV-TEMPLATE-DATA' + window.location.pathname.replace(/\//g, '-'),
            window.location.pathname.replace(/\//g, ' ')
        ];
        // Attempt to load the storage data
        try {
            this.templateData = JSON.parse(this.GetData(this.templateName[0]));
            if (!this.templateData)
                throw new Error();
            if (!Array.isArray(this.templateData.data))
                throw new Error();
        }
        catch (error) {
            this.templateData = { association: null, data: [] };
            this.SaveData(this.templateName[0], this.templateData);
        }
    }
    // Returns the requirested or currently selected template data
    // @param {string?} cal - The raw name of the template data to retrieve
    // @returns {object} - All the the data sets returned
    GetTemplateData(val) {
        if (!val)
            val = this.templateName[0];
        return JSON.parse(localStorage.getItem(val)).data;
    }
    // Saves the current templates data
    // @param {array} data - All the data sets to save to this templates local storage
    SaveTemplateData(data) {
        this.templateData.data = data;
        this.SaveData(this.templateName[0], this.templateData);
    }
    // Associates this template to another, removes an asscociation or return the current association
    // @param {string? | null?} val - The value to be set, removed, or requested
    // @returns {string | void} - If the assocation was requirested, it will be returned
    ModifyAssociation(val) {
        if (val === undefined)
            return this.templateData.association;
        if (val) { // Set the value
            this.templateData.association = val;
        }
        else if (val === null) { // Remove the value
            this.templateData.association = null;
        }
        // Return the value
        this.SaveData(this.templateName[0], this.templateData);
    }
}
exports.TemplateStorage = TemplateStorage;


/***/ }),

/***/ "./src/components/storage/WidgetStorage.ts":
/*!*************************************************!*\
  !*** ./src/components/storage/WidgetStorage.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Component Imports
const Storage_1 = __webpack_require__(/*! ./Storage */ "./src/components/storage/Storage.ts");
class WidgetStorage extends Storage_1.default {
    constructor() {
        super();
        this.defaultData = {
            display: 'open',
            invis: false,
            position: { x: 10, y: 10 },
            backgroundColor: 'rgba(255,255,255,1)',
            customCommand: '',
            user: { runUpdate: false, titleSafe: 0 },
            associations: []
        };
        // Saves a change to the widget's settings
        this.SetWidgetSetting = (key, value) => {
            if (this.widgetSettings[key] === undefined) {
                return;
            }
            this.widgetSettings[key] = value;
            this.SaveWidgetData();
        };
        // Resets all widget data except for template data
        this.ResetWidgetData = () => {
            this.widgetSettings = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(this.defaultData))), { associations: this.widgetSettings.associations });
            this.SaveWidgetData();
        };
        // Attempt to load the settings from the browsers local storage
        try {
            this.widgetSettings = JSON.parse(this.GetData('DEV-WIDGET-SETTINGS'));
            if (!this.widgetSettings)
                throw new Error();
            const currentKeys = Object.keys(this.widgetSettings).join(',');
            const requiredKeys = Object.keys(this.defaultData).join(',');
            if (currentKeys !== requiredKeys)
                throw new Error();
        }
        catch (error) {
            this.widgetSettings = JSON.parse(JSON.stringify(this.defaultData));
            this.SaveWidgetData();
        }
    }
    // Saves data to localstorage
    SaveWidgetData() {
        this.SaveData('DEV-WIDGET-SETTINGS', this.widgetSettings);
    }
}
exports.WidgetStorage = WidgetStorage;


/***/ }),

/***/ "./src/components/ui/Dragable.ts":
/*!***************************************!*\
  !*** ./src/components/ui/Dragable.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Creates an element that can be dragged
// @param {DOM Node} elem - The element that can be dragged
// @param {Event[]} events - The events that need to be used in the drag process
function CreateDraggable(elem, events) {
    elem.setAttribute('draggable', 'true');
    elem.addEventListener('dragstart', events.dragStart);
    if (events.dragEnter)
        elem.addEventListener('dragenter', events.dragEnter);
    if (events.dragLeave)
        elem.addEventListener('dragleave', events.dragLeave);
    if (events.dragEnd)
        elem.addEventListener('dragend', events.dragEnd);
}
exports.CreateDraggable = CreateDraggable;
// Creates an area that can draggable items dropped in it
// @param {DOM Node} elem - The element that is going to be a drop zone
// @param {Event[]} events - The drop zone events used in the drap process
function CreateDropable(elem, events) {
    elem.addEventListener('drop', events.drop);
    if (events.dragEnter)
        elem.addEventListener('dragenter', events.dragEnter);
    if (events.dragLeave)
        elem.addEventListener('dragleave', events.dragLeave);
    if (events.dragOver)
        elem.addEventListener('dragover', events.dragOver);
}
exports.CreateDropable = CreateDropable;


/***/ }),

/***/ "./src/components/ui/ElementFactory.ts":
/*!*********************************************!*\
  !*** ./src/components/ui/ElementFactory.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CreateElement(type, classes) {
    const elem = document.createElement(type);
    if (classes !== undefined) {
        if (Array.isArray(classes)) {
            classes.forEach(c => elem.classList.add(c));
        }
        else {
            elem.classList.add(classes);
        }
    }
    return elem;
}
exports.default = CreateElement;


/***/ }),

/***/ "./src/components/ui/Paragraph.ts":
/*!****************************************!*\
  !*** ./src/components/ui/Paragraph.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ./ElementFactory */ "./src/components/ui/ElementFactory.ts");
function CreateParagraph(props) {
    const elem = ElementFactory_1.default('p', props.classes);
    elem.textContent = props.text;
    return elem;
}
exports.default = CreateParagraph;


/***/ }),

/***/ "./src/components/ui/Popup.ts":
/*!************************************!*\
  !*** ./src/components/ui/Popup.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Factory Imports
const ElementFactory_1 = __webpack_require__(/*! ./ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Button_1 = __webpack_require__(/*! ./form/Button */ "./src/components/ui/form/Button.ts");
const PlusIcon_1 = __webpack_require__(/*! ../icons/PlusIcon */ "./src/components/icons/PlusIcon.ts");
// Color functions
const ColorFunctions_1 = __webpack_require__(/*! ../helpers/ColorFunctions */ "./src/components/helpers/ColorFunctions.ts");
// Base popp class
class Popup {
    constructor() {
        this.elem = ElementFactory_1.default('div', 'DEV-WIDGET-POPUP');
        // Elements to handle closing the popup
        const minusIcon = PlusIcon_1.default();
        const closeButton = Button_1.default({ classes: 'DEV-WIDGET-CLOSE-BUTTON' });
        minusIcon.classList.remove('DEV-WIDGET-PLUS-ICON');
        minusIcon.classList.add('DEV-WIDGET-CLOSE-ICON');
        closeButton.appendChild(minusIcon);
        closeButton.addEventListener('click', () => this.Close());
        this.body = ElementFactory_1.default('div', 'DEV-WIDGET-POPUP-BACKGROUND');
        const wrapper = ElementFactory_1.default('div');
        this.elem.appendChild(wrapper);
        wrapper.appendChild(closeButton);
        wrapper.appendChild(this.body);
        this.Open = this.Open.bind(this);
        this.Close = this.Close.bind(this);
    }
    // Opens the popup
    Open() {
        this.elem.classList.add('DEV-WIDGET-POPUP-OPEN');
        const widget = document.querySelector('.DEV-WIDGET');
        // Bodies background color
        const color = document.querySelector('body').style.backgroundColor;
        // Inverted background color
        const bkgColor = 'rgb(' + ColorFunctions_1.ClampRGB(ColorFunctions_1.InvertColor(ColorFunctions_1.CheckRGBValue(color))).join(',') + ')';
        // Main logger
        const logger = document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
        // Elements to adjust the color of
        const elems = this.elem.querySelectorAll('.DEV-WIDGET-CLOSE-ICON circle, .DEV-WIDGET-CLOSE-ICON line');
        const popUplogger = this.elem.querySelector('.DEV-WIDGET-LOGGER p');
        this.oldPosition = { x: widget.style.left, y: widget.style.top };
        widget.style.top = '0';
        widget.style.left = '0';
        logger.style.display = 'none';
        if (popUplogger)
            popUplogger.style.color = bkgColor;
        elems.forEach(e => e.style.stroke = bkgColor);
    }
    // Closes the popup
    Close(resetWidget) {
        this.elem.classList.remove('DEV-WIDGET-POPUP-OPEN');
        const widget = document.querySelector('.DEV-WIDGET');
        const logger = document.querySelector('.DEV-WIDGET > .DEV-WIDGET-LOGGER p');
        // Reset widget position
        if (resetWidget !== false) {
            widget.style.top = this.oldPosition.y;
            widget.style.left = this.oldPosition.x;
        }
        logger.style.display = '';
    }
}
exports.default = Popup;


/***/ }),

/***/ "./src/components/ui/form/Button.ts":
/*!******************************************!*\
  !*** ./src/components/ui/form/Button.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ElementFactory */ "./src/components/ui/ElementFactory.ts");
// Creates a button element 
// @param {object} props - Some values for creating the button
// @returns {DOM Node} - The button element
function CreateButton(props) {
    const button = ElementFactory_1.default('button', props ? props.classes : undefined);
    if (props)
        button.textContent = props.text;
    return button;
}
exports.default = CreateButton;


/***/ }),

/***/ "./src/components/ui/form/Checkbox.ts":
/*!********************************************!*\
  !*** ./src/components/ui/form/Checkbox.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ElementFactory */ "./src/components/ui/ElementFactory.ts");
// Creates a div element that is styled and coded to act like a checkbox
// @param {object} props - Some values for creating the custom checkbox
// @returns {DOM Node} - The div element
function CreateCheckbox() {
    const elem = ElementFactory_1.default('div', 'DEV-WIDGET-CHECKBOX');
    elem.addEventListener('click', () => {
        elem.classList.contains('DEV-WIDGET-CHECKED')
            ? elem.classList.remove('DEV-WIDGET-CHECKED')
            : elem.classList.add('DEV-WIDGET-CHECKED');
    });
    return elem;
}
exports.default = CreateCheckbox;


/***/ }),

/***/ "./src/components/ui/form/Input.ts":
/*!*****************************************!*\
  !*** ./src/components/ui/form/Input.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ElementFactory */ "./src/components/ui/ElementFactory.ts");
// Creates a input element
// @param {object} props - Some values for creating the input
// @returns {DOM Node} - The input element
function CreateInput(props) {
    const elem = ElementFactory_1.default('input', props ? props.class : '');
    if (props !== undefined) {
        if (props.placeholder)
            elem.setAttribute('placeholder', props.placeholder);
        if (props.defaultValue)
            elem.value = props.defaultValue;
        if (props.id)
            elem.id = props.id;
    }
    return elem;
}
exports.default = CreateInput;


/***/ }),

/***/ "./src/components/ui/form/Label.ts":
/*!*****************************************!*\
  !*** ./src/components/ui/form/Label.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ElementFactory */ "./src/components/ui/ElementFactory.ts");
// Creates a label element that has a custom click handler for selecting any element
// @param {object} props - Some values for creating the custom label
// @returns {DOM Node} - The label element
function CreateLabel(props) {
    const elem = ElementFactory_1.default('label', 'DEV-WIDGET-LABEL');
    elem.textContent = props.text;
    if (props.htmlFor)
        elem.htmlFor = props.htmlFor;
    // Clicks a non stadard element
    if (props.customElement)
        elem.addEventListener('click', () => props.customElement.click());
    return elem;
}
exports.default = CreateLabel;


/***/ }),

/***/ "./src/components/ui/form/Select.ts":
/*!******************************************!*\
  !*** ./src/components/ui/form/Select.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = __webpack_require__(/*! ../ElementFactory */ "./src/components/ui/ElementFactory.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/ui/form/Label.ts");
const ArrowIcon_1 = __webpack_require__(/*! ../../icons/ArrowIcon */ "./src/components/icons/ArrowIcon.ts");
// Creates a custom select element
// @param {object} props -  An object defining the select's options and optional default value 
//                          and if the selections options should be offset via the page or parent element
// @returns {DOM Node} - A div element that is styled and coded to act like a select element
function CreateSelect(props) {
    // Create main container
    const elem = ElementFactory_1.default('div', 'DEV-WIDGET-SELECT');
    // Create Selected Text
    const selectedContainer = ElementFactory_1.default('div', 'DEV-WIDGET-SELECTED');
    const selectedText = props.defaultValue ? props.defaultValue : props.options[0];
    const selected = Label_1.default({ text: selectedText[1] });
    elem.setAttribute('value', selectedText[0]);
    selectedContainer.appendChild(selected);
    selectedContainer.appendChild(ArrowIcon_1.default());
    const event = new CustomEvent('change');
    // Create options container
    const options = ElementFactory_1.default('ul');
    options.addEventListener('click', (e) => {
        const target = e.target;
        const selected = elem.childNodes[0].childNodes[0];
        const opt = [target.getAttribute('value'), target.textContent];
        // Click was not an option
        if (target.nodeName !== 'LI') {
            e.stopPropagation();
            return;
        }
        // Set the label displaying the selected option
        elem.setAttribute('value', opt[0]);
        selected.textContent = opt[1];
        // Dispack the change event
        elem.dispatchEvent(event);
    });
    // Create options
    props.options.map(o => {
        const opt = ElementFactory_1.default('li');
        opt.setAttribute('value', o[0]);
        opt.textContent = o[1];
        options.appendChild(opt);
    });
    elem.appendChild(selectedContainer);
    elem.appendChild(options);
    // Open or close the select
    elem.addEventListener('click', function (e) {
        elem.classList.contains('DEV-WIDGET-SELECT-OPEN')
            ? elem.classList.remove('DEV-WIDGET-SELECT-OPEN')
            : elem.classList.add('DEV-WIDGET-SELECT-OPEN');
        options.style.top = props.offsetOnly
            ? '1.5vw' : e.pageY + 'px';
    });
    elem.addEventListener('mouseleave', () => elem.classList.remove('DEV-WIDGET-SELECT-OPEN'));
    return elem;
}
exports.default = CreateSelect;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = __webpack_require__(/*! ./components/Widget */ "./src/components/Widget.ts");
// Main Widget Object to be used in external scripts
const _widget = (function () {
    const widget = new Widget_1.default();
    return {
        changeBackgroundColor: (color) => widget.ChangeBackgroundColor(color),
        getTemplateData: () => JSON.stringify(widget.GetTemplateData().data),
        getDataOptions: () => widget.GetDataOptions().map(opt => opt[1]),
        selectTemplateData: (name) => widget.SelectTemplateData(name),
        setTemplateData: (data, name) => widget.SetTemplateData(data, name),
        setAssociation: (association) => widget.AssociateData(association),
        enableWidget: () => widget.SetWidgetEnv(true),
        disableWidget: () => widget.SetWidgetEnv(false),
        executePlayOutCommand: (cmd) => widget.ExecutePlayOutCommand(cmd),
        help: `Help for the CasparCG HTML Widget
- _widget.changeBackgroundColor() = function => (color: string) => void;
    Can be a color keyword, HEX, RGB, or RGBA value
- _widget.getTemplateData() = function => () => string;
    Returns the selected template data as a string
- _widget.getDataOptions() = function => () => [string, string][];
    Returns the data options for the template
- _widget.selectTemplateData() = function => (name: string) => void;
    Selects a data set for the widget
- _widget.setTemplateData() = function => (name: string, name?: string) => void;
    Parsed and sets the template data for the widget to use. Optionally, a name for the data set can be passed
- _widget.setAssociation() = function => (name: string) => void;
    Associated the current tempalte to another
- _widget.enableWidget() = function => () => void;
    Allows the widget to effect the page and template
- _widget.disableWidget() = function => () => void;
    Stops the widget from interacting with the page and template
- _widget.executePlayOutCommand: (cmd: string) => void;
    Runs one of the widget's play ou commands`
    };
})();
window._widget = _widget;


/***/ }),

/***/ "./src/scss/widget.scss":
/*!******************************!*\
  !*** ./src/scss/widget.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./widget.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/widget.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ })

/******/ });
//# sourceMappingURL=dev.js.map