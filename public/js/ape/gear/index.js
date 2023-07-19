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
/*!************************************!*\
  !*** ./resources/js/gear/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var gearParams = {
  limit: 0,
  offset: 0,
  orderByLevel: null,
  paramFilter: 0,
  paramValue: null,
  paramLevel: null,
  userStatus: 0,
  upgradeFlagEvent: 0
};
$(document).ready(function () {
  var limit = 5;
  var offset = 1;
  var level = 30;
  $('#limit').val(limit);
  $('#param-level').val(level);
  gearParams.limit = limit;
  gearParams.offset = offset;
  gearParams.paramLevel = level;
  getGearData();
});
$('#filter-action').click(function () {
  gearParams.limit = $('#limit').val();
  gearParams.offset = $('#offset').val();
  gearParams.orderByLevel = null;
  gearParams.paramFilter = $('#param-filter').val();
  gearParams.paramValue = $('#param-value').val();
  gearParams.paramLevel = $('#param-level').val();
  getGearData();
});
$('.paginate-left').click(function (e) {
  e.preventDefault();

  if (gearParams.offset > 1) {
    gearParams.offset = parseInt(gearParams.offset) - 1;
    getGearData();
  }
});
$('.paginate-right').click(function (e) {
  e.preventDefault();

  if (gearParams.offset < gearParams.totalPage) {
    gearParams.offset = parseInt(gearParams.offset) + 1;
    getGearData();
  }
});

function btnPaginate() {
  if (gearParams.offset == gearParams.totalPage) $('.paginate-right').addClass('disabled');else $('.paginate-right').removeClass('disabled');
  if (gearParams.offset == 1) $('.paginate-left').addClass('disabled');else $('.paginate-left').removeClass('disabled');
}

$('#order-by-level').click(function (e) {
  e.preventDefault();

  if (gearParams.orderByLevel == null) {
    gearParams.orderByLevel = 1;
  }

  if (gearParams.orderByLevel == 0) {
    gearParams.orderByLevel = 1;
  } else {
    gearParams.orderByLevel = 0;
  }

  if (gearParams.orderByLevel == 0) {
    $('.level-icon').attr('class', 'level-icon fas fa-arrow-up text-red');
  } else {
    $('.level-icon').attr('class', 'level-icon fas fa-arrow-down text-red');
  }

  getGearData();
});
$(document).on('click', '.table-data .popup-box', function (e) {
  e.preventDefault();
  var gearId = $(this).attr('href');
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'gear-detail-popup',
    type: 'GET',
    dataType: 'json',
    success: function success(res) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    complete: function complete(res) {
      $('#wrapper-popup').attr('data-gearid', gearId);
      $('.wrapper-popup').append(res.responseText);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      $('#body').css('overflow', 'hidden');
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    }
  });
});
$('#custom-tabs-gear-normal-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.userStatus != 0) {
    gearParams.userStatus = 0;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = null;
    getGearData();
  }
});
$('#custom-tabs-gear-lock-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.userStatus != 1) {
    gearParams.userStatus = 1;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = null;
    getGearData();
  }
});
$('#custom-tabs-gear-ban-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.userStatus != 2) {
    gearParams.userStatus = 2;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = null;
    getGearData();
  }
});
$('#custom-tabs-gear-free-tab').click(function (e) {
  e.preventDefault();
  gearParams.userStatus = null;
  gearParams.offset = 1;
  gearParams.upgradeFlagEvent = null;
  getGearData();
});
$('#custom-tabs-gear-for-sale-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.upgradeFlagEvent != 2) {
    gearParams.userStatus = null;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = 2;
    getGearData();
  }
});
$('#custom-tabs-gear-for-kol-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.upgradeFlagEvent != 3) {
    gearParams.userStatus = null;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = 3;
    getGearData();
  }
});
$('#custom-tabs-gear-milestone-tab').click(function (e) {
  e.preventDefault();

  if (gearParams.upgradeFlagEvent != 4) {
    gearParams.userStatus = null;
    gearParams.offset = 1;
    gearParams.upgradeFlagEvent = 4;
    getGearData();
  }
});

function getGearData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset').html('');
  $('.limit-offset').html('');
  $('.table-data').html('');
  var requestData = {
    limit: gearParams.limit,
    offset: gearParams.offset,
    user_status: gearParams.userStatus
  };

  if (gearParams.orderByLevel != (null && 0)) {
    requestData.order_by_level = gearParams.orderByLevel;
  }

  if (gearParams.paramFilter != 0) {
    requestData.param_filter = gearParams.paramFilter;
    requestData.param_value = gearParams.paramValue;
  }

  if (gearParams.paramLevel != (null && 0)) {
    requestData.level = gearParams.paramLevel;
  }

  if (gearParams.upgradeFlagEvent != (null && 0)) {
    requestData.upgrade_flag_event = gearParams.upgradeFlagEvent;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'gear-data',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"9\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            html += "\n                            <tr>\n                                <td><b>".concat(data["id"], "</b></td>\n                                <td>\n                                    <div class=\"touch-box\">\n                                        <div class=\"box\">\n                                            ").concat(data["token_id"], "\n                                        </div>\n                                        <div class=\"child c-1\">\n                                            ").concat(data["token_id"], "\n                                        </div>\n                                    </div>\n                                </td>\n                                <td>").concat(data["owner_address"] ? data["owner_address"] : 'No owner address', "</td>\n                                <td>").concat(data["user_id"] ? data["user_id"] : 'No owner', "</td>\n                                <td>").concat(data["value"], "</td>\n                                <td>\n                                    <a href=\"").concat(data["id"], "\" class=\"text-decoration-underline popup-box\">\n                                        Show\n                                    </a>\n                                </td>\n                            </tr>\n                        ");
          });
        }

        gearParams.totalPage = responseData.total_page;
        var totalData = gearParams.limit * gearParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset').val(gearParams.offset);
        $('.offset').attr("placeholder", "Total: " + gearParams.totalPage);
        $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
        $('.table-data').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"9\">No data</td>\n                    </tr>\n                ";
        gearParams.totalPage = 1;
        $('.limit-offset').append("Total 0/0");
        $('.table-data').append(html);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error2) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
        var html = "\n                    <tr>\n                        <td colspan=\"9\">No data</td>\n                    </tr>\n                ";
        gearParams.totalPage = 1;
        $('.limit-offset').append("Total 0/0");
        $('.table-data').append(html);
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