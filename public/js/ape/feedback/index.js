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
/*!****************************************!*\
  !*** ./resources/js/feedback/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var feedbackParams = {
  limit: 0,
  offset: 0,
  totalPage: 0,
  totalRecord: 0,
  userInformation: null,
  status: null
};
$(document).ready(function () {
  var limit = 15;
  var offset = 1;
  $('#limit').val(limit);
  feedbackParams.limit = limit;
  feedbackParams.offset = offset;
  getFeedbackData();
});
$('#filter-action').click(function () {
  feedbackParams.limit = $('#limit').val();
  feedbackParams.offset = $('#offset').val();
  feedbackParams.userInformation = $('#user_information').val();
  feedbackParams.status = $('#status').val();
  feedbackParams.dateFrom = $('#date_from').val();
  feedbackParams.dateTo = $('#date_to').val();
  getFeedbackData();
});
$('#paginate-left').click(function (e) {
  e.preventDefault();

  if (feedbackParams.offset > 1) {
    feedbackParams.offset = parseInt(feedbackParams.offset) - 1;
    getFeedbackData();
  }
});
$('#paginate-right').click(function (e) {
  e.preventDefault();

  if (feedbackParams.offset < feedbackParams.totalPage) {
    feedbackParams.offset = parseInt(feedbackParams.offset) + 1;
    getFeedbackData();
  }
});

function btnPaginate() {
  if (feedbackParams.offset == feedbackParams.totalPage) $('#paginate-right').addClass('disabled');else $('#paginate-right').removeClass('disabled');
  if (feedbackParams.offset == 1) $('#paginate-left').addClass('disabled');else $('#paginate-left').removeClass('disabled');
}

$(document).on('click', '.table-data .update-status', function (e) {
  e.preventDefault();
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  var feedbackId = $(this).attr('href');
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'feedback-data/' + feedbackId,
    type: 'PUT',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType: 'json',
    data: {
      status: 3
    },
    success: function success(res) {
      var resStatus = res.data.status;
      var btnDanger = 'btn-outline-danger';
      var btnPrimary = 'btn-outline-primary';
      var faBan = 'fa-ban';
      var faRestore = 'fa-window-restore';
      var currentClassStatus = $('#status-' + feedbackId).attr('class');
      currentClassStatus = currentClassStatus.slice(6);
      $('#status-' + feedbackId).removeClass(currentClassStatus);

      if (resStatus == 3) {
        $('#status-item-' + feedbackId).removeClass(btnDanger);
        $('#status-item-' + feedbackId).addClass(btnPrimary);
        $('#icon-status-item-' + feedbackId).removeClass(faBan);
        $('#icon-status-item-' + feedbackId).addClass(faRestore);
        $('#status-' + feedbackId).addClass('bg-danger');
        $('#status-' + feedbackId).html('Blocked');
      } else {
        $('#status-item-' + feedbackId).removeClass(btnPrimary);
        $('#status-item-' + feedbackId).addClass(btnDanger);
        $('#icon-status-item-' + feedbackId).removeClass(faRestore);
        $('#icon-status-item-' + feedbackId).addClass(faBan);

        if (resStatus == 1) {
          $('#status-' + feedbackId).addClass('bg-info');
          $('#status-' + feedbackId).html('Seen');
        }

        if (resStatus == 2) {
          $('#status-' + feedbackId).addClass('bg-primary');
          $('#status-' + feedbackId).html('Replied');
        }
      }

      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    complete: function complete(res) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    }
  });
});
$(document).on('click', '.table-data .delete', function (e) {
  e.preventDefault();

  if (confirm('Do you definitely want to delete this feedback?')) {
    (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
    var feedbackId = $(this).attr('href');
    $.ajax({
      url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'feedback-data/' + feedbackId,
      type: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType: 'json',
      success: function success(res) {
        if (res.success == 1) {
          $('#feedback-' + feedbackId).remove();
          feedbackParams.offset -= 1;
          getFeedbackData();
        } else {
          (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
          (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
        }
      },
      error: function error(XHR, status, _error2) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
      },
      complete: function complete(res) {// offLoading();
      }
    });
  }
});

function getFeedbackData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset').html('');
  $('.limit-offset').html('');
  $('.table-data').html('');
  var requestData = {
    limit: feedbackParams.limit,
    offset: feedbackParams.offset
  };

  if (feedbackParams.userInformation != (null && 0)) {
    requestData.user_information = feedbackParams.userInformation;
  }

  if (feedbackParams.status != (null && 0)) {
    requestData.status = feedbackParams.status;
  }

  if (feedbackParams.dateFrom != (null && 0)) {
    requestData.date_from = feedbackParams.dateFrom;
  }

  if (feedbackParams.dateTo != (null && 0)) {
    requestData.date_to = feedbackParams.dateTo;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'feedback-data',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"7\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            html += "\n                            <tr id=\"feedback-".concat(data["id"], "\">\n                                <td><b>").concat(data["id"], "</b></td>\n                                <td>").concat(data["first_name"] ? data["first_name"] : "", " ").concat(data["last_name"] ? data["last_name"] : "", "</td>\n                                <td>").concat(data["email"], "</td>\n                                <td>\n                                    <div class=\"short-text m-auto\" style=\"width: 200px\">").concat(data["content"], "</div>\n                                </td>\n                                <td>\n                                    ").concat(data["status"] == 0 ? '<span class="badge bg-success" id="status-' + data["id"] + '">New</span>' : data["status"] == 1 ? '<span class="badge bg-info" id="status-' + data["id"] + '">Seen</span>' : data["status"] == 2 ? '<span class="badge bg-primary" id="status-' + data["id"] + '">Replied</span>' : '<span class="badge bg-danger" id="status-' + data["id"] + '">Blocked</span>', "\n                                </td>\n                                <td>\n                                    <a class=\"text-primary\">").concat(data["created_at"], "</a>\n                                </td>\n                                <td>\n                                    <a href=\"").concat(_base_js__WEBPACK_IMPORTED_MODULE_0__.url + '/show-feedback/' + data["id"], "\" class=\"btn btn-outline-primary btn-sm show-popup\" title=\"View\">\n                                        <i class=\"fas fa-eye fa-fw\"></i>\n                                    </a>\n                                    <a href=\"").concat(data["id"], "\" class=\"btn btn-outline-").concat(data["status"] == 3 ? 'primary' : 'danger', " btn-sm update-status\" id=\"status-item-").concat(data["id"], "\" title=\"").concat(data["status"] == 3 ? 'Unblock' : 'Block', "\">\n                                        <i id=\"icon-status-item-").concat(data["id"], "\" class=\"fas fa-").concat(data["status"] == 3 ? 'window-restore' : 'ban', " fa-fw\"></i>\n                                    </a>\n                                    <a href=\"").concat(data["id"], "\" class=\"btn btn-outline-danger btn-sm delete\" title=\"Delete\">\n                                        <i class=\"fas fa-trash fa-fw\"></i>\n                                    </a>\n                                </td>\n                            </tr>\n                        ");
          });
        }

        feedbackParams.totalPage = responseData.total_page;
        var totalData = feedbackParams.limit * feedbackParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset').val(feedbackParams.offset);
        $('.offset').attr("placeholder", "Total: " + feedbackParams.totalPage);
        $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
        feedbackParams.totalRecord = responseData.total_record;
        $('.table-data').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"7\">No data</td>\n                    </tr>\n                ";
        feedbackParams.totalPage = 1;
        $('.limit-offset').append("Total 0/0");
        $('.table-data').append(html);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error3) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
        var html = "\n                    <tr>\n                        <td colspan=\"7\">No data</td>\n                    </tr>\n                ";
        feedbackParams.totalPage = 1;
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