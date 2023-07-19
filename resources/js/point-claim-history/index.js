import {apiUrl, getFilterMonths, offLoading, onLoading, responseNotifcation, url as baseUrl} from '../base.js';

const pointClaimParams = {
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
    orderByAmount: null,
}

var pointClaimChart = null;

const loadingHTML = `
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
`;

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit').val(limit);

    $('#reservation-table').daterangepicker({}, function(start, end) {
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
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (pointClaimParams.offset > 1) {
        pointClaimParams.offset = parseInt(pointClaimParams.offset) - 1;
        getPointClaimData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (pointClaimParams.offset < pointClaimParams.totalPage) {
        pointClaimParams.offset = parseInt(pointClaimParams.offset) + 1;
        getPointClaimData();
    }
})

function btnPaginate() {
    if (pointClaimParams.offset == pointClaimParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (pointClaimParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

$('#btn-apply').click(function (e) {
    e.preventDefault();
    pointClaimParams.status = $('#status-claim').val();
    $('#chart-claim-loading').html(loadingHTML);
    $('#chart-claim').addClass('invisible');

    getPointClaimChartData();
})

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
})

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
})

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
})

function getPointClaimData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit : pointClaimParams.limit,
        offset : pointClaimParams.offset,
    }

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
        url: apiUrl + 'point-claim-history',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data;
                var html = "";
                var i = 1;

                if (responseData.data.length == 0) {
                    html += `
                        <tr>
                            <td colspan="8">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>
                                    ${data["tx_id"] ?
                                        "<div class=\"touch-box\">" +
                                            "<div class=\"box\">" +
                                                data["tx_id"] +
                                            "</div>" +
                                            "<div class=\"child c-1\">" +
                                                data["tx_id"] +
                                            "</div>" +
                                        "</div>" : ""}
                                </td>
                                <td>${data["wallet_address"]}</td>
                                <td>${data["email"] ?? ""}</td>
                                <td>${data["point"]}</td>
                                <td>${data["amount"]}</td>
                                <td>
                                    ${
                                        (data["status"] == 0) ? '<span class="badge bg-primary" id="status-' + data["id"] + '">Claimed</span>'
                                            : (data["status"] == 1) ? '<span class="badge bg-info" id="status-' + data["id"] + '">Pending</span>'
                                            : (data["status"] == 2) ? '<span class="badge bg-danger" id="status-' + data["id"] + '">Refund</span>'
                                            : (data["status"] == 3) ? '<span class="badge bg-success" id="status-' + data["id"] + '">Deposit</span>'
                                            : '<span class="badge bg-secondary" id="status-' + data["id"] + '">Deposit Pending</span>'
                                    }
                                </td>
                                <td>
                                    <a class="text-primary">${data["created_at"]}</a>
                                </td>
                            </tr>
                        `;

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
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="8">No data</td>
                    </tr>
                `;

                pointClaimParams.totalPage = 1;
                $('.limit-offset').append("Total 0/0");
                $('.table-data').append(html);
            }

            btnPaginate();
            offLoading();
        },
        error: function (XHR, status, error) {
            if (XHR.responseJSON.success == 0) {
                responseNotifcation(XHR.responseJSON, false);
                var html = `
                    <tr>
                        <td colspan="8">No data</td>
                    </tr>
                `;

                pointClaimParams.totalPage = 1;
                $('.limit-offset').append("Total 0/0");
                $('.table-data').append(html);
            }

            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
}

function setPointClaimChartData(pointClaimData) {
    var ticksStyle = {
        fontColor: '#495057',
        fontStyle: 'bold'
    }

    if (pointClaimChart) {
        pointClaimChart.destroy();
    }

    var mode = 'index'
    var intersect = true
    var $pointClaimChartChart = $('#coin-chart')
    var dataApeChart = [];
    var dataBapeChart = [];
    var labelsChart = [];

    pointClaimData.forEach(item => {
        dataApeChart.push(Math.round(item.total_ape * 100) / 100);
        dataBapeChart.push((Math.round(item.total_bape * 100) / 100));
        if (item.day) {
            labelsChart.push(item.day);
        } else {
            labelsChart.push(item.hour + 'h');
        }

    });

    pointClaimChart = new Chart($pointClaimChartChart, {
        data: {
            labels: labelsChart,
            datasets: [
                {
                    label: 'Ape',
                    type: 'line',
                    data: dataApeChart,
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    pointBorderColor: '#007bff',
                    pointBackgroundColor: '#007bff',
                    fill: true,
                    pointHoverBackgroundColor: 'red',
                    pointHoverBorderColor    : 'red',
                },
                {
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
                }
            ]
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
            onClick: function(event, elements) {
                console.log(event);
                console.log(elements);
            }
        }
    })

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
        url: apiUrl + 'point-claim-history-chart',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data.chart_data;

                $('#reservation').daterangepicker({
                    startDate: $.datepicker.formatDate('mm/dd/yy', new Date(res.data.start_time)),
                    endDate: $.datepicker.formatDate('mm/dd/yy', new Date(res.data.finish_time)),
                }, function(start, end) {
                    pointClaimParams.startTime = start.format('YYYY-MM-DD');
                    pointClaimParams.finishTime = end.format('YYYY-MM-DD');
                });
                setPointClaimChartData(responseData);
            } else {
                responseNotifcation(res, false);
            }
        },
        error: function (XHR, status, error) {
            if (XHR.responseJSON.success == 0) {
                responseNotifcation(XHR.responseJSON, false);
            }
        },
        complete: function (res) {
        }
    });
}
