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
  !*** ./resources/js/dashboard/dashboard-data.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.js */ "./resources/js/base.js");

var url = _base_js__WEBPACK_IMPORTED_MODULE_0__.apiUrl + 'dashboard-';
var dashboardParams = {
  start_time: null,
  finish_time: null,
  levelStart: 0,
  levelEnd: 10,
  typeChart: 1,
  totalUsers: 0,
  totalBoxes: 0,
  totalShoes: 0,
  totalEarned: 0,
  totalApe: 0,
  totalBape: 0,
  totalShoesType: 0,
  totalShoesRank: 0,
  totalShoesBreed: 0
};
var loadingHTML = "\n    <div class=\"lds-ripple\">\n        <div></div>\n        <div></div>\n    </div>\n";
var visitorsChart = null;
var gearsChart = null;
var trackingBurnChart = null;
$(document).ready(function () {
  getDashboardTotalData();
  getDashboardGearData();
  getDashboardEarnedData();
});
$('#filter-earned-burned').click(function () {
  dashboardParams.start_time = $('#start-time').val();
  dashboardParams.finish_time = $('#finish-time').val();
  $('#earned-dashboard-loading').html(loadingHTML);
  $('#earned-dashboard').addClass('invisible');
  $('#trucking-burn-dashboard-loading').html(loadingHTML);
  $('#trucking-burn-dashboard').addClass('invisible');
  getDashboardEarnedData();
});
$('#btn-type').click(function () {
  dashboardParams.typeChart = 1;
  $('#gear-data-loading').html(loadingHTML);
  $('#gear-data').addClass('invisible');
  $('#range_level').addClass('invisible');
  getDashboardGearData();
});
$('#btn-rank').click(function () {
  dashboardParams.typeChart = 2;
  $('#gear-data-loading').html(loadingHTML);
  $('#gear-data').addClass('invisible');
  $('#range_level').addClass('invisible');
  getDashboardGearData();
});
$('#btn-level').click(function () {
  dashboardParams.typeChart = 3;
  $('#gear-data-loading').html(loadingHTML);
  $('#gear-data').addClass('invisible');
  $('#range_level').removeClass('invisible');
  getDashboardGearData();
});
$('#btn-apply').click(function () {
  dashboardParams.typeChart = 3;
  var level = $('#level').val().split("-");
  dashboardParams.levelStart = level[0];
  dashboardParams.levelEnd = level[1];
  $('#gear-data-loading').html(loadingHTML);
  $('#gear-data').addClass('invisible');
  getDashboardGearData();
});

function setTotalData() {
  $('#total-users').html(dashboardParams.totalUsers);
  $('#total-boxes').html(dashboardParams.totalBoxes);
  $('#total-shoes').html(dashboardParams.totalShoes);
  $('#total-breed').html(dashboardParams.totalShoesBreed);
  $('#total-earned').html(dashboardParams.totalEarned);
  $('#total-ape').html(dashboardParams.totalApe);
  $('#total-bape').html(dashboardParams.totalBape);
  $('#total-data-loading').remove();
  $('#total-data').removeClass('d-none');
}

function setGearData(dashboardData) {
  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  };

  if (gearsChart) {
    gearsChart.destroy();
  }

  var mode = 'index';
  var intersect = true;
  var $gearsChart = $('#gears-chart');
  var dataChart = [];
  var labelsChart = [];

  if (dashboardParams.typeChart == 1) {
    $('#btn-rank').prop('disabled', false);
    $('#btn-level').prop('disabled', false);
  } else if (dashboardParams.typeChart == 2) {
    $('#btn-type').prop('disabled', false);
    $('#btn-level').prop('disabled', false);
  } else {
    $('#btn-rank').prop('disabled', false);
    $('#btn-type').prop('disabled', false);
    $('#btn-apply').prop('disabled', false);
  }

  dashboardData.total_shoes_by_type_chart.forEach(function (item) {
    var str = String(item.total);
    dataChart.push(str.replace(".", ""));
    labelsChart.push(item.name);
  });
  gearsChart = new Chart($gearsChart, {
    type: 'bar',
    data: {
      labels: labelsChart,
      datasets: [{
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        data: dataChart,
        barPercentage: 0.2
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
      legend: {
        display: false
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
            beginAtZero: true
          }, ticksStyle)
        }],
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
    }
  });
  $('#gear-data-loading').html('');
  $('#gear-data').removeClass('invisible');
}

function setDashboardEarned(dashboardData) {
  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  };

  if (visitorsChart) {
    visitorsChart.destroy();
  }

  var mode = 'index';
  var intersect = true;
  var $visitorsChart = $('#visitors-chart');
  var dataEarnChart = [];
  var dataDistanceChart = [];
  var labelsChart = [];
  dashboardData.data.forEach(function (item) {
    dataEarnChart.push(Math.round(item.total_earned * 100) / 100);
    dataDistanceChart.push(Math.round(item.total_distance / 1000 * 100) / 100);

    if (item.day) {
      labelsChart.push(item.day);
    } else {
      labelsChart.push(item.hour + 'h');
    }
  });
  visitorsChart = new Chart($visitorsChart, {
    data: {
      labels: labelsChart,
      datasets: [{
        label: 'Coin Earn',
        type: 'line',
        data: dataEarnChart,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }, {
        label: 'Distance',
        type: 'bar',
        data: dataDistanceChart,
        backgroundColor: '#ff0000',
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
  $('#earned-dashboard-loading').html('');
  $('#earned-dashboard').removeClass('invisible');
}

function setDashboardTrackingBurn(earnedData, burnedData) {
  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  };

  if (trackingBurnChart) {
    trackingBurnChart.destroy();
  }

  var mode = 'index';
  var intersect = true;
  var $burnChart = $('#trucking-burn-chart');
  var timeChart = [];
  var apeEarnChart = [];
  var apeChart = [];
  var bapeChart = [];
  var totalBape = 0;
  var totalApe = 0;
  burnedData.forEach(function (item, index) {
    if (item.day) {
      timeChart.push(item.day);
    } else {
      timeChart.push(item.hour + 'h');
    }

    if (item.ape == 0) {
      apeEarnChart.push(0);
    } else {
      apeEarnChart.push(Math.round(earnedData[index].total_earned / item.ape * 100) / 100);
    }

    apeChart.push(Math.round(item.ape * 100) / 100);
    bapeChart.push(Math.round(item.bape * 100) / 100);
    totalBape += item.bape;
    totalApe += item.ape;
  });
  $('#total-bape-burn').html(Math.round(totalBape * 100) / 100 + ' coin');
  $('#total-ape-burn').html(Math.round(totalApe * 100) / 100 + ' coin');
  trackingBurnChart = new Chart($burnChart, {
    data: {
      labels: timeChart,
      datasets: [{
        type: 'line',
        data: apeEarnChart,
        backgroundColor: 'transparent',
        borderColor: 'red',
        pointBorderColor: 'red',
        pointBackgroundColor: 'red',
        fill: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }, {
        type: 'line',
        data: apeChart,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      }, {
        type: 'line',
        data: bapeChart,
        backgroundColor: 'transparent',
        borderColor: '#ffc107',
        pointBorderColor: '#ffc107',
        pointBackgroundColor: '#ffc107',
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
      legend: {
        display: false
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
      }
    }
  });
  $('#trucking-burn-dashboard-loading').html('');
  $('#trucking-burn-dashboard').removeClass('invisible');
}

function getDashboardTotalData() {
  $.ajax({
    url: url + 'total',
    type: 'GET',
    dataType: 'json',
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        dashboardParams.totalUsers = responseData.total_users;
        dashboardParams.totalBoxes = responseData.total_boxes;
        dashboardParams.totalShoes = responseData.total_shoes;
        dashboardParams.totalEarned = Math.round(responseData.total_earned * 100) / 100;
        dashboardParams.totalApe = Math.round(responseData.total_ape * 100) / 100;
        dashboardParams.totalBape = Math.round(responseData.total_bape * 100) / 100;
        dashboardParams.totalShoesBreed = responseData.total_breed;
        setTotalData();
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }
    },
    error: function error(XHR, status, _error) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
      }
    },
    complete: function complete(res) {}
  });
}

function getDashboardGearData() {
  var requestData = {
    type_chart: dashboardParams.typeChart,
    level_start: dashboardParams.levelStart,
    level_end: dashboardParams.levelEnd
  };
  $('.btn-gear-chart').prop('disabled', true);
  $.ajax({
    url: url + 'gear',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        dashboardParams.gearChart = responseData;
        setGearData(responseData);
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

function getDashboardEarnedData() {
  var requestData = {};
  requestData.type_search_date = 0;

  if (dashboardParams.start_time && dashboardParams.finish_time) {
    requestData.start_time = dashboardParams.start_time;
    requestData.finish_time = dashboardParams.finish_time;
    requestData.type_search_date = 1;
  }

  $.ajax({
    url: url + 'earned',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        var responseData = res.data;
        var dashboardData = responseData.dashboard_earned;
        $('#start-time').val(dashboardData.start_time);
        $('#finish-time').val(dashboardData.finish_time);
        setDashboardEarned(dashboardData);
        getDashboardTrackingBurnData(dashboardData.data);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }
    },
    error: function error(XHR, status, _error3) {
      if (XHR.responseJSON.success == 0) {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(XHR.responseJSON, false);
      }
    },
    complete: function complete(res) {}
  });
}

function getDashboardTrackingBurnData(earnedData) {
  var requestData = {};

  if (dashboardParams.start_time && dashboardParams.finish_time) {
    requestData.start_time = dashboardParams.start_time;
    requestData.finish_time = dashboardParams.finish_time;
  }

  $.ajax({
    url: url + 'tracking-burn',
    type: 'GET',
    dataType: 'json',
    data: requestData,
    success: function success(res) {
      if (res.success === 1) {
        setDashboardTrackingBurn(earnedData, res.data);
      } else {
        (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.responseNotifcation)(res, false);
      }
    },
    error: function error(XHR, status, _error4) {
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