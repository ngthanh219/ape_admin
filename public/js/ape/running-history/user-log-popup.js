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
/*!********************************************************!*\
  !*** ./resources/js/running-history/user-log-popup.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var userRunningHistoryParams = {
  limit: 0,
  offset: 0,
  totalPage: 0,
  runningHistoryId: null,
  userId: null
};
$(document).ready(function () {
  var limit = 15;
  var offset = 1;
  $('#limit-popup').val(limit);
  userRunningHistoryParams.limit = limit;
  userRunningHistoryParams.offset = offset;
  userRunningHistoryParams.userId = $('#wrapper-popup').attr('data-userlog');
  $('.popup').addClass('show-popup');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  $('#body').css('overflow', 'hidden');
  getUserRunningHistoryData();
});
$('#hidden-popup').click(function (e) {
  e.preventDefault();
  $('.popup').removeClass('show-popup');
  setTimeout(function () {
    $('.wrapper-popup').html('');
    $('#wrapper-popup').attr('data-userlog', 0);
    $('#body').css('overflow', '');
  }, 350);
});
$('#paginate-left-popup').click(function (e) {
  e.preventDefault();

  if (userRunningHistoryParams.offset > 1) {
    userRunningHistoryParams.offset = parseInt(userRunningHistoryParams.offset) - 1;
    getUserRunningHistoryData();
  }
});
$('#paginate-right-popup').click(function (e) {
  e.preventDefault();

  if (userRunningHistoryParams.offset < userRunningHistoryParams.totalPage) {
    userRunningHistoryParams.offset = parseInt(userRunningHistoryParams.offset) + 1;
    getUserRunningHistoryData();
  }
});

function btnPaginate() {
  if (userRunningHistoryParams.offset == userRunningHistoryParams.totalPage) $('#paginate-right-popup').addClass('disabled');else $('#paginate-right-popup').removeClass('disabled');
  if (userRunningHistoryParams.offset == 1) $('#paginate-left-popup').addClass('disabled');else $('#paginate-left-popup').removeClass('disabled');
}

$('#filter-action-popup').click(function () {
  userRunningHistoryParams.limit = $('#limit-popup').val();
  userRunningHistoryParams.offset = $('#offset-popup').val();
  userRunningHistoryParams.runningHistoryId = $('#running_history_id').val();
  getUserRunningHistoryData();
});

function getUserRunningHistoryData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset-popup').html('');
  $('.limit-offset-popup').html('');
  $('.table-data-popup').html('');
  var requestData = {
    limit: userRunningHistoryParams.limit,
    offset: userRunningHistoryParams.offset
  };

  if (userRunningHistoryParams.runningHistoryId) {
    requestData.running_history_id = userRunningHistoryParams.runningHistoryId;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'running-history-data/' + userRunningHistoryParams.userId,
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"14\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            html += "\n                            <tr>\n                                <td><b>".concat(data["id"], "</b></td>\n                                <td>").concat(data["gear_id"], "</td>\n                                <td>").concat(Math.round(data["distance_km"] / 1000 * 100) / 100, "</td>\n                                <td>").concat(data["time"], "</td>\n                                <td>").concat(data["real_time"], "</td>\n                                <td>").concat(data["steps"], "</td>\n                                <td>").concat(data["nft_steps"], "</td>\n                                <td>\n                                    ").concat(data["road_map_image"] == null ? '<a><i class="icon fas fa-ban"></i></a>' : '<a href="' + data["road_map_image"] + '" target="_blank"><i class="nav-icon far fa-image"></i></a>', "\n                                </td>\n\n                                <td>").concat(data["stamina_decrease"], "</td>\n                                <td>").concat(Math.round(data["earned"] * 100) / 100, "</td>\n                                <td>").concat(Math.round(data["earned_bape"] * 100) / 100, "</td>\n                                <td>\n                                    ").concat(data["status_update"] == 0 ? '<span class="badge bg-primary">Started</span>' : data["status_update"] == 1 ? '<span class="badge bg-success">Updated</span>' : '<span class="badge bg-danger">Deleted</span>', "\n                                </td>\n                                <td>\n                                    <a href=\"").concat(_base_js__WEBPACK_IMPORTED_MODULE_0__.url + '/running-history-log/' + data["id"], "\" target=\"_blank\">").concat(data["created_at"], "</a>\n                                </td>\n                                <td>\n                                    <a href=\"").concat(_base_js__WEBPACK_IMPORTED_MODULE_0__.url + '/running-history-log/' + data["id"], "\" target=\"_blank\">").concat(data["updated_at"], "</a>\n                                </td>\n                            </tr>\n                        ");
          });
        }

        userRunningHistoryParams.totalPage = responseData.total_page;
        var totalData = userRunningHistoryParams.limit * userRunningHistoryParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset-popup').val(userRunningHistoryParams.offset);
        $('.offset-popup').attr("placeholder", "Total: " + userRunningHistoryParams.totalPage);
        $('.limit-offset-popup').append("Total " + totalData + "/" + responseData.total_record);
        $('.table-data-popup').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"14\">No data</td>\n                    </tr>\n                ";
        userRunningHistoryParams.totalPage = 1;
        $('.limit-offset-popup').append("Total 0/0");
        $('.table-data-popup').append(html);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
        var html = "\n                    <tr>\n                        <td colspan=\"14\">No data</td>\n                    </tr>\n                ";
        userRunningHistoryParams.totalPage = 1;
        $('.limit-offset-popup').append("Total 0/0");
        $('.table-data-popup').append(html);
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