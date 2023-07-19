import {apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const runningHistoryParams = {
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
    orderByEarnBAPE: null,
}

$(document).ready(function() {
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
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (runningHistoryParams.offset > 1) {
        runningHistoryParams.offset = parseInt(runningHistoryParams.offset) - 1;
        getRunningHistoryData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (runningHistoryParams.offset < runningHistoryParams.totalPage) {
        runningHistoryParams.offset = parseInt(runningHistoryParams.offset) + 1;
        getRunningHistoryData();
    }
})

function btnPaginate() {
    if (runningHistoryParams.offset == runningHistoryParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (runningHistoryParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
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
})

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
})

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
})

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
})

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
})

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
})

$('#delete-action').click(function (e) {
    e.preventDefault();

    if (confirm("Do you definitely want to delete all logs detail, which have be updated?")) {
        deleteRunningHistoryLog();
    }
});

$(document).on('click', '.table-data .show-popup', function(e) {
    e.preventDefault();
    var userId = $(this).attr('href');

    $.ajax({
        url: apiUrl + 'user-running-history-data-popup',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            offLoading();
        },
        error: function (XHR, status, error) {
            offLoading();
        },
        complete: function (res) {
            $('#wrapper-popup').attr('data-userlog', userId);
            $('.wrapper-popup').append(res.responseText);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            $('#body').css('overflow', 'hidden');

            offLoading();
        }
    });
});

function getRunningHistoryData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: runningHistoryParams.limit,
        offset: runningHistoryParams.offset
    }

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
        url: apiUrl + 'running-history-data',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data;
                var html = "";

                $('#date_from').val(responseData.date_from);
                $('#date_to').val(responseData.date_to);

                if (responseData.data.length == 0) {
                    html += `
                        <tr>
                            <td colspan="10">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>${(data["first_name"]) ? data["first_name"] : ""} ${(data["last_name"]) ? data["last_name"] : ""}</td>
                                <td>${data["email"]}</td>
                                <td>${(data["total_distances"]) ? (Math.round(data["total_distances"] / 1000 * 100) / 100) : 0}</td>
                                <td>${data["total_times"] ? data["total_times"] : 0}</td>
                                <td>${data["total_steps"] ? data["total_steps"] : 0}</td>
                                <td>${data["total_nft_steps"] ? data["total_nft_steps"] : 0}</td>
                                <td>${data["total_earned"] ? (Math.round(data["total_earned"] * 100) / 100) : 0}</td>
                                <td>${data["total_earned_bape"] ? (Math.round(data["total_earned_bape"] * 100) / 100) : 0}</td>
                                <td>
                                    <a href="${data["id"]}" class="text-decoration-underline show-popup">
                                        Detail
                                    </a>
                                </td>
                            </tr>
                        `;
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
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="10">No data</td>
                    </tr>
                `;

                runningHistoryParams.totalPage = 1;
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
                        <td colspan="10">No data</td>
                    </tr>
                `;

                runningHistoryParams.totalPage = 1;
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

function deleteRunningHistoryLog() {
    onLoading();
    var url = apiUrl + 'running-history-data/logs';

    $.ajax({
        url: url,
        type: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function (res) {
            if (res.success === 1) {
                responseNotifcation(res, true);
            } else {
                responseNotifcation(res, false);
            }

            btnPaginate();
            offLoading();
        },
        error: function (XHR, status, error) {
            if (XHR.responseJSON.success == 0) {
                responseNotifcation(XHR.responseJSON, false);
            }

            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
}
