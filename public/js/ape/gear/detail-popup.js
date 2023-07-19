/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/base.js":
/*!******************************!*\
  !*** ./resources/js/base.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiUrl": () => (/* binding */ apiUrl),
/* harmony export */   "getFilterMonths": () => (/* binding */ getFilterMonths),
/* harmony export */   "offLoading": () => (/* binding */ offLoading),
/* harmony export */   "onLoading": () => (/* binding */ onLoading),
/* harmony export */   "responseNotifcation": () => (/* binding */ responseNotifcation),
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
var url = window.location.origin;
var apiUrl = url + '/api/v1/';

function onLoading() {
  clearLoading(); // bootstrap loading
  // $('.loading').append(`
  //     <div class="preloader flex-column justify-content-center align-items-center" id="preloader">
  //         <img class="animation__shake" id="animation__shake" src="${url}/bower_components/AdminLTE/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
  //     </div>
  // `);

  $('.loading').append("\n        <div class=\"wrap-load\">\n            <div class=\"loading-animation\">\n                <div></div><div></div><div></div><div></div>\n            </div>\n        </div>\n    ");
}

function offLoading() {
  // bootstrap loading
  // $('#animation__shake').css('display', 'none');
  // $('#preloader').css('height', '0px');
  clearLoading();
}

function clearLoading() {
  $('.loading').html('');
}

function responseNotifcation(res, status) {
  $('.box-notification').html('');
  var type = "danger";
  var icon = "ban";

  if (status) {
    type = "success";
    icon = "check";
    res = res.message;
  } else {
    res = res.error.error_message;
  }

  $('.box-notification').append("\n        <div class=\"card-body notification-custom\">\n            <div class=\"alert alert-".concat(type, " alert-dismissible\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">\xD7</button>\n                <h5><i class=\"icon fas fa-").concat(icon, "\"></i> Notification</h5>\n                ").concat(res, "\n            </div>\n        </div>\n    "));
  setTimeout(function () {
    $('.notification-custom').delay(100).slideUp();
  }, 3000);
}

function getFilterMonths() {
  var today = new Date();
  var currentDate = today;
  currentDate.setMonth(currentDate.getMonth() + 1);
  currentDate.setDate(currentDate.getDate() + 1);
  var dd = currentDate.getDate();
  var mm = String(currentDate.getMonth()).padStart(2, '0');
  var yyyy = currentDate.getFullYear();
  var currentDateFormat = yyyy + '-' + mm + '-' + dd;
  var prevDate = today;
  currentDate.setMonth(currentDate.getMonth() - 1);
  currentDate.setDate(currentDate.getDate() - 1);
  var dd1 = prevDate.getDate();
  var mm1 = String(prevDate.getMonth()).padStart(2, '0');
  var yyyy1 = prevDate.getFullYear();
  var prevDateFormat = yyyy1 + '-' + mm1 + '-' + dd1;
  return [prevDateFormat, currentDateFormat];
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./resources/js/gear/detail-popup.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var gearParams = {
  gearId: null
};
$(document).ready(function () {
  gearParams.gearId = $('#wrapper-popup').attr('data-gearid');
  $('.popup').addClass('show-popup');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  $('#body').css('overflow', 'hidden');
  getGearDetail();
});
$('#hidden-popup').click(function (e) {
  e.preventDefault();
  $('.popup').removeClass('show-popup');
  setTimeout(function () {
    $('.wrapper-popup').html('');
    $('#body').css('overflow', '');
  }, 350);
});

function getGearDetail() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'gear-data-detail/' + gearParams.gearId,
    type: 'GET',
    dataType: 'json',
    success: function success(res) {
      if (res.success === 1) {
        var data = res.data;
        var power = (data['base_power'] ? data['base_power'] * 1 : 0 * 1) + (data['add_power'] ? data['add_power'] * 1 : 0 * 1) + (data['gem_power'] ? data['gem_power'] * 1 : 0 * 1);
        var luck = (data['base_luck'] ? data['base_luck'] * 1 : 0 * 1) + (data['add_luck'] ? data['add_luck'] * 1 : 0 * 1) + (data['gem_luck'] ? data['gem_luck'] * 1 : 0 * 1);
        var agility = (data['base_agility'] ? data['base_agility'] * 1 : 0 * 1) + (data['add_agility'] ? data['add_agility'] * 1 : 0 * 1) + (data['gem_agility'] ? data['gem_agility'] * 1 : 0 * 1);
        var armor = (data['base_armor'] ? data['base_armor'] * 1 : 0 * 1) + (data['add_armor'] ? data['add_armor'] * 1 : 0 * 1) + (data['gem_armor'] ? data['gem_armor'] * 1 : 0 * 1);
        $('.data-detail').append("\n                    <div class=\"popup-box-content\">\n                        <div class=\"box-information\">\n                            <div class=\"information\">\n                                <p>\n                                    <b>ID:</b> ".concat(data['id'], "\n                                </p>\n                                <p>\n                                    <b>Token ID:</b> ").concat(data['token_id'], "\n                                </p>\n                                <p>\n                                    <b>Owner address:</b> ").concat(data['owner_address'] ? data['owner_address'] : 'No owned', "\n                                </p>\n                                <p>\n                                    <b>User ID:</b> ").concat(data['user_id'] ? data['user_id'] : 'No user', "\n                                </p>\n                            </div>\n                            <div class=\"image\">\n                                <img src=\"").concat(data['image'], "\" alt=\"\">\n                            </div>\n                        </div>\n                        <div class=\"box-attribute\">\n                            <div class=\"child-wrap left border-right\">\n                                <div class=\"title\">Status</div>\n                                <p>\n                                    <b>Status:</b> ").concat(data['status'], "\n                                </p>\n                                <p>\n                                    <b>Event:</b> ").concat(data['event'], "\n                                </p>\n                                <p>\n                                    <b>Cooldown flag:</b> ").concat(data['cooldown_flag'], "\n                                </p>\n                                <p>\n                                    <b>Time cooldown:</b> ").concat(data['time_cooldown'] ? data['time_cooldown'] : 'No time', "\n                                </p>\n                                <p>\n                                    <b>Start cooldown at:</b> ").concat(data['start_cooldown_at'] ? data['start_cooldown_at'] : 'No time', "\n                                </p>\n                                <p>\n                                    <b>Favorite:</b> ").concat(data['is_favorite'], "\n                                </p>\n                                <p>\n                                    <b>Breed:</b> ").concat(data['breed'] ? data['breed'] : 0, "\n                                </p>\n                            </div>\n                            <div class=\"child-wrap right\">\n                                <div class=\"title\">Attribute</div>\n                                <p>\n                                    <b>Is box:</b> ").concat(data['is_box'], "\n                                </p>\n                                <p>\n                                    <b>Rank:</b> ").concat(data['rank'] ? data['rank']['name'] : 0, "\n                                </p>\n                                <p>\n                                    <b>Type:</b> ").concat(data['type'] ? data['type']['name'] : '', "\n                                </p>\n                                <p>\n                                    <b>Slot:</b> ").concat(data['slots'] ? data['slots'].length : 0, "\n                                </p>\n                                <p>\n                                    <b>Level:</b> ").concat(data['level'], "\n                                </p>\n                                <p>\n                                    <b>Durability:</b> ").concat(data['durability'] ? data['durability'] : 0, "\n                                </p>\n                                <p>\n                                    <b>Point:</b> ").concat(data['add_point'] ? data['add_point'] : 0, "\n                                </p>\n                                <p>\n                                    <b>Power:</b> ").concat(power, "\n                                </p>\n                                <p>\n                                    <b>Luck:</b> ").concat(luck, "\n                                </p>\n                                <p>\n                                    <b>Agility:</b> ").concat(agility, "\n                                </p>\n                                <p>\n                                    <b>Armor:</b> ").concat(armor, "\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                "));
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }

      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
      }

      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    complete: function complete(res) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    }
  });
}
})();

/******/ })()
;