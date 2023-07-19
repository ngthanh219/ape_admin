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
/*!***************************************************!*\
  !*** ./resources/js/point-claim-history/index.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var pointClaimParams = {
  limit: 0,
  offset: 0,
  totalPage: 0,
  startTime: null,
  finishTime: null,
  status: [0],
  startTimeTable: null,
  finishTimeTable: null,
  statusTable: 5,
  orderByID: null,
  orderByPoint: null,
  orderByAmount: null
};
var pointClaimChart = null;
var loadingHTML = "\n    <div class=\"lds-ripple\">\n        <div></div>\n        <div></div>\n    </div>\n";
$(document).ready(function () {
  var limit = 15;
  var offset = 1;
  $('#limit').val(limit);
  $('#reservation-table').daterangepicker({}, function (start, end) {
    pointClaimParams.startTimeTable = start.format('YYYY-MM-DD');
    pointClaimParams.finishTimeTable = end.format('YYYY-MM-DD');
  });
  pointClaimParams.limit = limit;
  pointClaimParams.offset = offset;
  getPointClaimChartData();
  getPointClaimData();
});
$('#filter-action').click(function () {
  pointClaimParams.limit = $('#limit').val();
  pointClaimParams.offset = $('#offset').val();
  pointClaimParams.statusTable = $('#status-table').val();
  getPointClaimData();
});
$('#paginate-left').click(function (e) {
  e.preventDefault();

  if (pointClaimParams.offset > 1) {
    pointClaimParams.offset = parseInt(pointClaimParams.offset) - 1;
    getPointClaimData();
  }
});
$('#paginate-right').click(function (e) {
  e.preventDefault();

  if (pointClaimParams.offset < pointClaimParams.totalPage) {
    pointClaimParams.offset = parseInt(pointClaimParams.offset) + 1;
    getPointClaimData();
  }
});

function btnPaginate() {
  if (pointClaimParams.offset == pointClaimParams.totalPage) $('#paginate-right').addClass('disabled');else $('#paginate-right').removeClass('disabled');
  if (pointClaimParams.offset == 1) $('#paginate-left').addClass('disabled');else $('#paginate-left').removeClass('disabled');
}

$('#btn-apply').click(function (e) {
  e.preventDefault();
  pointClaimParams.status = $('#status-claim').val();
  $('#chart-claim-loading').html(loadingHTML);
  $('#chart-claim').addClass('invisible');
  getPointClaimChartData();
});
$('#order-by-id').click(function (e) {
  e.preventDefault();
  pointClaimParams.orderByPoint = null;
  pointClaimParams.orderByAmount = null;

  if (pointClaimParams.orderByID == null) {
    pointClaimParams.orderByID = 1;
  }

  if (pointClaimParams.orderByID == 0) {
    pointClaimParams.orderByID = 1;
  } else {
    pointClaimParams.orderByID = 0;
  }

  getPointClaimData();

  if (pointClaimParams.orderByID === 0) {
    $('.id-icon').attr('class', 'id-icon fas fa-arrow-up text-red');
  } else {
    $('.id-icon').attr('class', 'id-icon fas fa-arrow-down text-red');
  }

  $('.point-icon').attr('class', 'point-icon fas fa-arrow-down');
  $('.amount-icon').attr('class', 'amount-icon fas fa-arrow-down');
});
$('#order-by-point').click(function (e) {
  e.preventDefault();
  pointClaimParams.orderByID = null;
  pointClaimParams.orderByAmount = null;

  if (pointClaimParams.orderByPoint == null) {
    pointClaimParams.orderByPoint = 1;
  }

  if (pointClaimParams.orderByPoint == 0) {
    pointClaimParams.orderByPoint = 1;
  } else {
    pointClaimParams.orderByPoint = 0;
  }

  getPointClaimData();

  if (pointClaimParams.orderByPoint === 0) {
    $('.point-icon').attr('class', 'point-icon fas fa-arrow-up text-red');
  } else {
    $('.point-icon').attr('class', 'point-icon fas fa-arrow-down text-red');
  }

  $('.id-icon').attr('class', 'id-icon fas fa-arrow-down');
  $('.amount-icon').attr('class', 'amount-icon fas fa-arrow-down');
});
$('#order-by-amount').click(function (e) {
  e.preventDefault();
  pointClaimParams.orderByPoint = null;
  pointClaimParams.orderByID = null;

  if (pointClaimParams.orderByAmount == null) {
    pointClaimParams.orderByAmount = 1;
  }

  if (pointClaimParams.orderByAmount == 0) {
    pointClaimParams.orderByAmount = 1;
  } else {
    pointClaimParams.orderByAmount = 0;
  }

  getPointClaimData();

  if (pointClaimParams.orderByAmount === 0) {
    $('.amount-icon').attr('class', 'amount-icon fas fa-arrow-up text-red');
  } else {
    $('.amount-icon').attr('class', 'amount-icon fas fa-arrow-down text-red');
  }

  $('.point-icon').attr('class', 'point-coin-icon fas fa-arrow-down');
  $('.id-icon').attr('class', 'id-coin-icon fas fa-arrow-down');
});

function getPointClaimData() {
  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.onLoading)();
  $('.offset').html('');
  $('.limit-offset').html('');
  $('.table-data').html('');
  var requestData = {
    limit: pointClaimParams.limit,
    offset: pointClaimParams.offset
  };

  if (pointClaimParams.startTimeTable && pointClaimParams.finishTimeTable) {
    requestData.start_time = pointClaimParams.startTimeTable;
    requestData.finish_time = pointClaimParams.finishTimeTable;
  }

  if (pointClaimParams.statusTable != 5) {
    requestData.status = pointClaimParams.statusTable;
  }

  if (pointClaimParams.orderByID != null) {
    requestData.order_by_id = pointClaimParams.orderByID;
  }

  if (pointClaimParams.orderByPoint != null) {
    requestData.order_by_point = pointClaimParams.orderByPoint;
  }

  if (pointClaimParams.orderByAmount != null) {
    requestData.order_by_amount = pointClaimParams.orderByAmount;
  }

  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'point-claim-history',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var html = "";
        var i = 1;

        if (responseData.data.length == 0) {
          html += "\n                        <tr>\n                            <td colspan=\"8\">No data</td>\n                        </tr>\n                    ";
        } else {
          $.each(responseData.data, function (index, data) {
            var _data$email;

            html += "\n                            <tr>\n                                <td><b>".concat(data["id"], "</b></td>\n                                <td>\n                                    ").concat(data["tx_id"] ? "<div class=\"touch-box\">" + "<div class=\"box\">" + data["tx_id"] + "</div>" + "<div class=\"child c-1\">" + data["tx_id"] + "</div>" + "</div>" : "", "\n                                </td>\n                                <td>").concat(data["wallet_address"], "</td>\n                                <td>").concat((_data$email = data["email"]) !== null && _data$email !== void 0 ? _data$email : "", "</td>\n                                <td>").concat(data["point"], "</td>\n                                <td>").concat(data["amount"], "</td>\n                                <td>\n                                    ").concat(data["status"] == 0 ? '<span class="badge bg-primary" id="status-' + data["id"] + '">Claimed</span>' : data["status"] == 1 ? '<span class="badge bg-info" id="status-' + data["id"] + '">Pending</span>' : data["status"] == 2 ? '<span class="badge bg-danger" id="status-' + data["id"] + '">Refund</span>' : data["status"] == 3 ? '<span class="badge bg-success" id="status-' + data["id"] + '">Deposit</span>' : '<span class="badge bg-secondary" id="status-' + data["id"] + '">Deposit Pending</span>', "\n                                </td>\n                                <td>\n                                    <a class=\"text-primary\">").concat(data["created_at"], "</a>\n                                </td>\n                            </tr>\n                        ");
            i++;
          });
        }

        pointClaimParams.totalPage = responseData.total_page;
        var totalData = pointClaimParams.limit * pointClaimParams.offset;

        if (totalData > responseData.total_record) {
          totalData = responseData.total_record;
        }

        $('.offset').val(pointClaimParams.offset);
        $('.offset').attr("placeholder", "Total: " + pointClaimParams.totalPage);
        $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
        $('.table-data').append(html);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
        html += "\n                    <tr>\n                        <td colspan=\"8\">No data</td>\n                    </tr>\n                ";
        pointClaimParams.totalPage = 1;
        $('.limit-offset').append("Total 0/0");
        $('.table-data').append(html);
      }

      btnPaginate();
      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.offLoading)();
    },
    error: function error(XHR, status, _error) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
        var html = "\n                    <tr>\n                        <td colspan=\"8\">No data</td>\n                    </tr>\n                ";
        pointClaimParams.totalPage = 1;
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

function setPointClaimChartData(pointClaimData) {
  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  };

  if (pointClaimChart) {
    pointClaimChart.destroy();
  }

  var mode = 'index';
  var intersect = true;
  var $pointClaimChartChart = $('#coin-chart');
  var dataApeChart = [];
  var dataBapeChart = [];
  var labelsChart = [];
  pointClaimData.forEach(function (item) {
    dataApeChart.push(Math.round(item.total_ape * 100) / 100);
    dataBapeChart.push(Math.round(item.total_bape * 100) / 100);

    if (item.day) {
      labelsChart.push(item.day);
    } else {
      labelsChart.push(item.hour + 'h');
    }
  });
  pointClaimChart = new Chart($pointClaimChartChart, {
    data: {
      labels: labelsChart,
      datasets: [{
        label: 'Ape',
        type: 'line',
        data: dataApeChart,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }, {
        label: 'Bape',
        type: 'line',
        data: dataBapeChart,
        backgroundColor: 'transparent',
        borderColor: '#ff0000',
        pointBorderColor: '#ff0000',
        pointBackgroundColor: '#ff0000',
        fill: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect
      },
      hover: {
        mode: mode,
        intersect: intersect
      },
      scales: {
        yAxes: [{
          // display: false,
          gridLines: {
            display: true,
            lineWidth: '4px',
            color: 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks: $.extend({
            beginAtZero: true,
            suggestedMax: 1
          }, ticksStyle)
        }],
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      },
      onClick: function onClick(event, elements) {
        console.log(event);
        console.log(elements);
      }
    }
  });
  $('#chart-claim-loading').html('');
  $('#chart-claim').removeClass('invisible');
}

function getPointClaimChartData() {
  var requestData = {};

  if (pointClaimParams.startTime && pointClaimParams.finishTime) {
    requestData.start_time = pointClaimParams.startTime;
    requestData.finish_time = pointClaimParams.finishTime;
  }

  requestData.status = pointClaimParams.status;
  $.ajax({
    url: _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'point-claim-history-chart',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data.chart_data;
        $('#reservation').daterangepicker({
          startDate: $.datepicker.formatDate('mm/dd/yy', new Date(res.data.start_time)),
          endDate: $.datepicker.formatDate('mm/dd/yy', new Date(res.data.finish_time))
        }, function (start, end) {
          pointClaimParams.startTime = start.format('YYYY-MM-DD');
          pointClaimParams.finishTime = end.format('YYYY-MM-DD');
        });
        setPointClaimChartData(responseData);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }
    },
    error: function error(XHR, status, _error2) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
      }
    },
    complete: function complete(res) {}
  });
}
})();

/******/ })()
;