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
/*!**************************************************!*\
  !*** ./resources/js/user/index-anonymos-user.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var userParams = {
  limit: 0,
  offset: 0,
  totalPage: 0,
  userInformation: null,
  orderByID: null,
  orderByBapecoin: null,
  orderByApecoin: null,
  orderByEarn: null,
  status: null
};
$(document).ready(function () {
  var limit = 15;
  var offset = 1;
  $('#limit').val(limit);
  userParams.limit = limit;
  userParams.offset = offset;
  userParams.status = $('#status').val();
  getUserData();
});
$('#filter-action').click(function () {
  userParams.limit = $('#limit').val();
  userParams.offset = $('#offset').val();
  userParams.userInformation = $('#user_information').val();
  userParams.status = $('#status').val();
  getUserData();
});
$('#paginate-left').click(function (e) {
  e.preventDefault();

  if (userParams.offset > 1) {
    userParams.offset = parseInt(userParams.offset) - 1;
    getUserData();
  }
});
$('#paginate-right').click(function (e) {
  e.preventDefault();

  if (userParams.offset < userParams.totalPage) {
    userParams.offset = parseInt(userParams.offset) + 1;
    getUserData();
  }
});

function btnPaginate() {
  if (userParams.offset == userParams.totalPage) $('#paginate-right').addClass('disabled');else $('#paginate-right').removeClass('disabled');
  if (userParams.offset == 1) $('#paginate-left').addClass('disabled');else $('#paginate-left').removeClass('disabled');
}

$('#order-by-id').click(function (e) {
  e.preventDefault();
  userParams.orderByApecoin = null;
  userParams.orderByBapecoin = null;
  userParams.orderByEarn = null;

  if (userParams.orderByID == null) {
    userParams.orderByID = 1;
  }

  if (userParams.orderByID == 0) {
    userParams.orderByID = 1;
  } else {
    userParams.orderByID = 0;
  }

  getUserData();

  if (userParams.orderByID === 0) {
    $('.id-icon').attr('class', 'id-icon fas fa-arrow-up text-red');
  } else {
    $('.id-icon').attr('class', 'id-icon fas fa-arrow-down text-red');
  }

  $('.bape-coin-icon').attr('class', 'bape-coin-icon fas fa-arrow-down');
  $('.ape-coin-icon').attr('class', 'ape-coin-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
});
$('#order-by-bape-coin').click(function (e) {
  e.preventDefault();
  userParams.orderByApecoin = null;
  userParams.orderByID = null;
  userParams.orderByEarn = null;

  if (userParams.orderByBapecoin == null) {
    userParams.orderByBapecoin = 1;
  }

  if (userParams.orderByBapecoin == 0) {
    userParams.orderByBapecoin = 1;
  } else {
    userParams.orderByBapecoin = 0;
  }

  getUserData();

  if (userParams.orderByBapecoin === 0) {
    $('.bape-coin-icon').attr('class', 'bape-coin-icon fas fa-arrow-up text-red');
  } else {
    $('.bape-coin-icon').attr('class', 'bape-coin-icon fas fa-arrow-down text-red');
  }

  $('.id-icon').attr('class', 'id-icon fas fa-arrow-down');
  $('.ape-coin-icon').attr('class', 'ape-coin-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
});
$('#order-by-ape-coin').click(function (e) {
  e.preventDefault();
  userParams.orderByBapecoin = null;
  userParams.orderByID = null;
  userParams.orderByEarn = null;

  if (userParams.orderByApecoin == null) {
    userParams.orderByApecoin = 1;
  }

  if (userParams.orderByApecoin == 0) {
    userParams.orderByApecoin = 1;
  } else {
    userParams.orderByApecoin = 0;
  }

  getUserData();

  if (userParams.orderByApecoin === 0) {
    $('.ape-coin-icon').attr('class', 'ape-coin-icon fas fa-arrow-up text-red');
  } else {
    $('.ape-coin-icon').attr('class', 'ape-coin-icon fas fa-arrow-down text-red');
  }

  $('.id-icon').attr('class', 'id-icon fas fa-arrow-down');
  $('.bape-coin-icon').attr('class', 'bape-coin-icon fas fa-arrow-down');
  $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down');
});
$('#order-by-earn').click(function (e) {
  e.preventDefault();
  userParams.orderByBapecoin = null;
  userParams.orderByID = null;
  userParams.orderByApecoin = null;

  if (userParams.orderByEarn == null) {
    userParams.orderByEarn = 1;
  }

  if (userParams.orderByEarn == 0) {
    userParams.orderByEarn = 1;
  } else {
    userParams.orderByEarn = 0;
  }

  getUserData();

  if (userParams.orderByEarn === 0) {
    $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-up text-red');
  } else {
    $('.earn-icon').attr('class', 'earn-icon fas fa-arrow-down text-red');
  }

  $('.id-icon').attr('class', 'id-icon fas fa-arrow-down');
  $('.bape-coin-icon').attr('class', 'bape-coin-icon fas fa-arrow-down');
  $('.ape-coin-icon').attr('class', 'ape-coin-icon fas fa-arrow-down');
});
$(document).on('click', '.table-data .update-status', function (e) {
  e.preventDefault();
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  var userId = $(this).attr('href');
  var status = $(this).attr('data-status');
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'anonymos-user-data/' + userId,
    type: 'PUT',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType: 'json',
    data: {
      status: status
    },
    success: function success(res) {
      if (res.success == 1) {
        var resStatus = res.data.status;
        var btnDanger = 'btn-outline-danger';
        var btnPrimary = 'btn-outline-primary';
        var faBan = 'fa-ban';
        var faRestore = 'fa-window-restore';
        var faLock = 'fa-lock';
        var faUnlock = 'fa-lock-open';
        $('#status-' + userId).removeClass('bg-secondary bg-success bg-danger');

        if (resStatus == 1) {
          $('#status-item-lock-' + userId).removeClass(btnDanger);
          $('#status-item-lock-' + userId).addClass(btnPrimary);
          $('#icon-status-item-lock-' + userId).removeClass(faLock);
          $('#icon-status-item-lock-' + userId).addClass(faUnlock);
          $('#status-item-ban-' + userId).removeClass(btnPrimary);
          $('#status-item-ban-' + userId).addClass(btnDanger);
          $('#icon-status-item-ban-' + userId).removeClass(faRestore);
          $('#icon-status-item-ban-' + userId).addClass(faBan);
          $('#status-' + userId).addClass('bg-secondary');
          $('#status-' + userId).html('Lock');
        } else if (resStatus == 2) {
          $('#status-item-lock-' + userId).removeClass(btnPrimary);
          $('#status-item-lock-' + userId).addClass(btnDanger);
          $('#icon-status-item-lock-' + userId).removeClass(faUnlock);
          $('#icon-status-item-lock-' + userId).addClass(faLock);
          $('#status-item-ban-' + userId).removeClass(btnDanger);
          $('#status-item-ban-' + userId).addClass(btnPrimary);
          $('#icon-status-item-ban-' + userId).removeClass(faBan);
          $('#icon-status-item-ban-' + userId).addClass(faRestore);
          $('#status-' + userId).addClass('bg-danger');
          $('#status-' + userId).html('Black list');
        } else {
          $('#status-item-lock-' + userId).removeClass(btnPrimary);
          $('#status-item-lock-' + userId).addClass(btnDanger);
          $('#icon-status-item-lock-' + userId).removeClass(faUnlock);
          $('#icon-status-item-lock-' + userId).addClass(faLock);
          $('#status-item-ban-' + userId).removeClass(btnPrimary);
          $('#status-item-ban-' + userId).addClass(btnDanger);
          $('#icon-status-item-ban-' + userId).removeClass(faRestore);
          $('#icon-status-item-ban-' + userId).addClass(faBan);
          $('#status-' + userId).addClass('bg-success');
          $('#status-' + userId).html('Activing');
        }

        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
      }
    },
    error: function error(XHR, status, _error) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    complete: function complete(res) {
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    }
  });
});

function getUserData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset').html('');
  $('.limit-offset').html('');
  $('.table-data').html('');
  var requestData = {
    limit: userParams.limit,
    offset: userParams.offset
  };

  if (userParams.userInformation != null) {
    requestData.user_information = userParams.userInformation;
  }

  if (userParams.status != null && userParams.status != 4) {
    requestData.user_status = userParams.status;
  }

  if (userParams.orderByID != null) {
    requestData.order_by_id = userParams.orderByID;
  }

  if (userParams.orderByBapecoin != null) {
    requestData.order_by_bape_coin = userParams.orderByBapecoin;
  }

  if (userParams.orderByApecoin != null) {
    requestData.order_by_ape_coin = userParams.orderByApecoin;
  }

  if (userParams.orderByEarn != null) {
    requestData.order_by_current_coin = userParams.orderByEarn;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'anonymos-user-data',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"10\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            html += "\n                            <tr>\n                                <td><b>".concat(data["id"], "</b></td>\n                                <td>").concat(data["wallet_address"] ? data["wallet_address"] : 'No wallet address', "</td>\n                                <td>\n                                    <a class=\"text-danger\">").concat(Math.round(data["bape_coin"] * 100) / 100, "</a>\n                                </td>\n                                <td>\n                                    <a class=\"text-primary\">").concat(Math.round(data["ape_coin"] * 100) / 100, "</a>\n                                </td>\n                                <td>\n                                    ").concat(data["status"] == 0 ? '<span class="badge bg-success" id="status-' + data["id"] + '">Activing</span>' : data["status"] == 1 ? '<span class="badge bg-secondary" id="status-' + data["id"] + '">Lock</span>' : '<span class="badge bg-danger" id="status-' + data["id"] + '">Black list</span>', "\n                                </td>\n                                <td>\n                                    <a href=\"").concat(data["id"], "\" class=\"btn btn-outline-").concat(data["status"] == 1 ? 'primary' : 'danger', " btn-sm update-status\" data-status=\"1\" id=\"status-item-lock-").concat(data["id"], "\" title=\"").concat(data["status"] == 1 ? 'Unlock' : 'Lock', "\">\n                                        <i id=\"icon-status-item-lock-").concat(data["id"], "\" class=\"fas fa-").concat(data["status"] == 1 ? 'lock-open' : 'lock', " fa-fw\"></i>\n                                    </a>\n                                    <a href=\"").concat(data["id"], "\" class=\"btn btn-outline-").concat(data["status"] == 2 ? 'primary' : 'danger', " btn-sm update-status\" data-status=\"2\" id=\"status-item-ban-").concat(data["id"], "\" title=\"").concat(data["status"] == 2 ? 'Unban' : 'Ban', "\">\n                                        <i id=\"icon-status-item-ban-").concat(data["id"], "\" class=\"fas fa-").concat(data["status"] == 2 ? 'window-restore' : 'ban', " fa-fw\"></i>\n                                    </a>\n                                </td>\n                            </tr>\n                        ");
          });
        }

        userParams.totalPage = responseData.total_page;
        var totalData = userParams.limit * userParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset').val(userParams.offset);
        $('.offset').attr("placeholder", "Total: " + userParams.totalPage);
        $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
        $('.table-data').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"10\">No data</td>\n                    </tr>\n                ";
        userParams.totalPage = 1;
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
        userParams.totalPage = 1;
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