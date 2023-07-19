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
/*!***********************************************!*\
  !*** ./resources/js/running-history/index.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var runningHistoryParams = {
  limit: 0,
  offset: 0,
  totalPage: 0,
  userInformation: null,
  distanceFrom: null,
  distanceTo: null,
  dateFrom: null,
  dateTo: null,
  orderByDistance: null,
  orderByTime: null,
  orderByStep: null,
  orderByNftStep: null,
  orderByEarn: null,
  orderByEarnBAPE: null
};
$(document).ready(function () {
  var limit = 15;
  var offset = 1;
  $('#limit').val(limit);
  runningHistoryParams.limit = limit;
  runningHistoryParams.offset = offset;
  getRunningHistoryData();
});
$('#filter-action').click(function () {
  runningHistoryParams.limit = $('#limit').val();
  runningHistoryParams.offset = $('#offset').val();
  runningHistoryParams.userInformation = $('#user_information').val();
  runningHistoryParams.distanceFrom = $('#distance_from').val();
  runningHistoryParams.distanceTo = $('#distance_to').val();
  runningHistoryParams.dateFrom = $('#date_from').val();
  runningHistoryParams.dateTo = $('#date_to').val();
  getRunningHistoryData();
});
$('#paginate-left').click(function (e) {
  e.preventDefault();

  if (runningHistoryParams.offset > 1) {
    runningHistoryParams.offset = parseInt(runningHistoryParams.offset) - 1;
    getRunningHistoryData();
  }
});
$('#paginate-right').click(function (e) {
  e.preventDefault();

  if (runningHistoryParams.offset < runningHistoryParams.totalPage) {
    runningHistoryParams.offset = parseInt(runningHistoryParams.offset) + 1;
    getRunningHistoryData();
  }
});

function btnPaginate() {
  if (runningHistoryParams.offset == runningHistoryParams.totalPage) $('#paginate-right').addClass('disabled');else $('#paginate-right').removeClass('disabled');
  if (runningHistoryParams.offset == 1) $('#paginate-left').addClass('disabled');else $('#paginate-left').removeClass('disabled');
}

$('#order-by-distance').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByTime = null;
  runningHistoryParams.orderByStep = null;
  runningHistoryParams.orderByNftStep = null;
  runningHistoryParams.orderByEarn = null;
  runningHistoryParams.orderByEarnBAPE = null;

  if (runningHistoryParams.orderByDistance == null) {
    runningHistoryParams.orderByDistance = 1;
  }

  if (runningHistoryParams.orderByDistance == 0) {
    runningHistoryParams.orderByDistance = 1;
  } else {
    runningHistoryParams.orderByDistance = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByDistance === 0) {
    $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-up text-red');
  } else {
    $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down text-red');
  }

  $('.time-icon').attr('class', 'time-icon fas fa-arrow-down');
  $('.step-icon').attr('class', 'step-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
  $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down');
});
$('#order-by-time').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByDistance = null;
  runningHistoryParams.orderByStep = null;
  runningHistoryParams.orderByNftStep = null;
  runningHistoryParams.orderByEarn = null;
  runningHistoryParams.orderByEarnBAPE = null;

  if (runningHistoryParams.orderByTime == null) {
    runningHistoryParams.orderByTime = 1;
  }

  if (runningHistoryParams.orderByTime == 0) {
    runningHistoryParams.orderByTime = 1;
  } else {
    runningHistoryParams.orderByTime = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByTime === 0) {
    $('.time-icon').attr('class', 'time-icon fas fa-arrow-up text-red');
  } else {
    $('.time-icon').attr('class', 'time-icon fas fa-arrow-down text-red');
  }

  $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down');
  $('.step-icon').attr('class', 'step-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
  $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down');
});
$('#order-by-step').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByDistance = null;
  runningHistoryParams.orderByTime = null;
  runningHistoryParams.orderByNftStep = null;
  runningHistoryParams.orderByEarn = null;
  runningHistoryParams.orderByEarnBAPE = null;

  if (runningHistoryParams.orderByStep == null) {
    runningHistoryParams.orderByStep = 1;
  }

  if (runningHistoryParams.orderByStep == 0) {
    runningHistoryParams.orderByStep = 1;
  } else {
    runningHistoryParams.orderByStep = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByStep === 0) {
    $('.step-icon').attr('class', 'step-icon fas fa-arrow-up text-red');
  } else {
    $('.step-icon').attr('class', 'step-icon fas fa-arrow-down text-red');
  }

  $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down');
  $('.time-icon').attr('class', 'time-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
  $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down');
});
$('#order-by-nft-step').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByDistance = null;
  runningHistoryParams.orderByTime = null;
  runningHistoryParams.orderByStep = null;
  runningHistoryParams.orderByEarn = null;
  runningHistoryParams.orderByEarnBAPE = null;

  if (runningHistoryParams.orderByNftStep == null) {
    runningHistoryParams.orderByNftStep = 1;
  }

  if (runningHistoryParams.orderByNftStep == 0) {
    runningHistoryParams.orderByNftStep = 1;
  } else {
    runningHistoryParams.orderByNftStep = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByNftStep === 0) {
    $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-up text-red');
  } else {
    $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down text-red');
  }

  $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down');
  $('.time-icon').attr('class', 'time-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
  $('.step-icon').attr('class', 'step-icon fas fa-arrow-down');
});
$('#order-by-earn').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByDistance = null;
  runningHistoryParams.orderByTime = null;
  runningHistoryParams.orderByNftStep = null;
  runningHistoryParams.orderByStep = null;
  runningHistoryParams.orderByEarnBAPE = null;

  if (runningHistoryParams.orderByEarn == null) {
    runningHistoryParams.orderByEarn = 1;
  }

  if (runningHistoryParams.orderByEarn == 0) {
    runningHistoryParams.orderByEarn = 1;
  } else {
    runningHistoryParams.orderByEarn = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByEarn === 0) {
    $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-up text-red');
  } else {
    $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down text-red');
  }

  $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down');
  $('.time-icon').attr('class', 'time-icon fas fa-arrow-down');
  $('.step-icon').attr('class', 'step-icon fas fa-arrow-down');
  $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down');
});
$('#order-by-earn-bape').click(function (e) {
  e.preventDefault();
  runningHistoryParams.orderByDistance = null;
  runningHistoryParams.orderByTime = null;
  runningHistoryParams.orderByNftStep = null;
  runningHistoryParams.orderByStep = null;
  runningHistoryParams.orderByEarn = null;

  if (runningHistoryParams.orderByEarnBAPE == null) {
    runningHistoryParams.orderByEarnBAPE = 1;
  }

  if (runningHistoryParams.orderByEarnBAPE == 0) {
    runningHistoryParams.orderByEarnBAPE = 1;
  } else {
    runningHistoryParams.orderByEarnBAPE = 0;
  }

  getRunningHistoryData();

  if (runningHistoryParams.orderByEarnBAPE === 0) {
    $('.earn-bape-icon').attr('class', 'earn-bape-icon fas fa-arrow-up text-red');
  } else {
    $('.earn-bape-icon').attr('class', 'earn-bape-icon fas fa-arrow-down text-red');
  }

  $('.distance-icon').attr('class', 'distance-icon fas fa-arrow-down');
  $('.time-icon').attr('class', 'time-icon fas fa-arrow-down');
  $('.step-icon').attr('class', 'step-icon fas fa-arrow-down');
  $('.nft-step-icon').attr('class', 'nft-step-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
});
$('#delete-action').click(function (e) {
  e.preventDefault();

  if (confirm("Do you definitely want to delete all logs detail, which have be updated?")) {
    deleteRunningHistoryLog();
  }
});
$(document).on('click', '.table-data .show-popup', function (e) {
  e.preventDefault();
  var userId = $(this).attr('href');
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'user-running-history-data-popup',
    type: 'GET',
    dataType: 'json',
    success: function success(res) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    complete: function complete(res) {
      $('#wrapper-popup').attr('data-userlog', userId);
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

function getRunningHistoryData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset').html('');
  $('.limit-offset').html('');
  $('.table-data').html('');
  var requestData = {
    limit: runningHistoryParams.limit,
    offset: runningHistoryParams.offset
  };

  if (runningHistoryParams.userInformation) {
    requestData.user_information = runningHistoryParams.userInformation;
  }

  if (runningHistoryParams.distanceFrom) {
    requestData.distance_from = runningHistoryParams.distanceFrom;
  }

  if (runningHistoryParams.distanceTo) {
    requestData.distance_to = runningHistoryParams.distanceTo;
  }

  if (runningHistoryParams.dateFrom) {
    requestData.date_from = runningHistoryParams.dateFrom;
  }

  if (runningHistoryParams.dateTo) {
    requestData.date_to = runningHistoryParams.dateTo;
  }

  if (runningHistoryParams.orderByDistance != null) {
    requestData.order_by_distance = runningHistoryParams.orderByDistance;
  }

  if (runningHistoryParams.orderByTime != null) {
    requestData.order_by_time = runningHistoryParams.orderByTime;
  }

  if (runningHistoryParams.orderByStep != null) {
    requestData.order_by_step = runningHistoryParams.orderByStep;
  }

  if (runningHistoryParams.orderByNftStep != null) {
    requestData.order_by_nft_step = runningHistoryParams.orderByNftStep;
  }

  if (runningHistoryParams.orderByEarn != null) {
    requestData.order_by_earn = runningHistoryParams.orderByEarn;
  }

  if (runningHistoryParams.orderByEarnBAPE != null) {
    requestData.order_by_earn_bape = runningHistoryParams.orderByEarnBAPE;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'running-history-data',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";
        $('#date_from').val(responseData.date_from);
        $('#date_to').val(responseData.date_to);

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"10\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            html += "\n                            <tr>\n                                <td><b>".concat(data["id"], "</b></td>\n                                <td>").concat(data["first_name"] ? data["first_name"] : "", " ").concat(data["last_name"] ? data["last_name"] : "", "</td>\n                                <td>").concat(data["email"], "</td>\n                                <td>").concat(data["total_distances"] ? Math.round(data["total_distances"] / 1000 * 100) / 100 : 0, "</td>\n                                <td>").concat(data["total_times"] ? data["total_times"] : 0, "</td>\n                                <td>").concat(data["total_steps"] ? data["total_steps"] : 0, "</td>\n                                <td>").concat(data["total_nft_steps"] ? data["total_nft_steps"] : 0, "</td>\n                                <td>").concat(data["total_earned"] ? Math.round(data["total_earned"] * 100) / 100 : 0, "</td>\n                                <td>").concat(data["total_earned_bape"] ? Math.round(data["total_earned_bape"] * 100) / 100 : 0, "</td>\n                                <td>\n                                    <a href=\"").concat(data["id"], "\" class=\"text-decoration-underline show-popup\">\n                                        Detail\n                                    </a>\n                                </td>\n                            </tr>\n                        ");
          });
        }

        runningHistoryParams.totalPage = responseData.total_page;
        var totalData = runningHistoryParams.limit * runningHistoryParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset').val(runningHistoryParams.offset);
        $('.offset').attr("placeholder", "Total: " + runningHistoryParams.totalPage);
        $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
        $('.table-data').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"10\">No data</td>\n                    </tr>\n                ";
        runningHistoryParams.totalPage = 1;
        $('.limit-offset').append("Total 0/0");
        $('.table-data').append(html);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error2) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
        var html = "\n                    <tr>\n                        <td colspan=\"10\">No data</td>\n                    </tr>\n                ";
        runningHistoryParams.totalPage = 1;
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

function deleteRunningHistoryLog() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  var url = _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'running-history-data/logs';
  $.ajax({
    url: url,
    type: 'DELETE',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType: 'json',
    success: function success(res) {
      if (res.success === 1) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, true);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error3) {
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