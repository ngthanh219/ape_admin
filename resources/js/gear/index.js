import {apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const gearParams = {
    limit: 0,
    offset: 0,
    orderByLevel: null,
    paramFilter: 0,
    paramValue: null,
    paramLevel: null,
    userStatus: 0,
    upgradeFlagEvent: 0,
}

$(document).ready(function() {
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
})

$('.paginate-left').click(function (e) {
    e.preventDefault();

    if (gearParams.offset > 1) {
        gearParams.offset = parseInt(gearParams.offset) - 1;
        getGearData();
    }
})

$('.paginate-right').click(function (e) {
    e.preventDefault();

    if (gearParams.offset < gearParams.totalPage) {
        gearParams.offset = parseInt(gearParams.offset) + 1;
        getGearData();
    }
})

function btnPaginate() {
    if (gearParams.offset == gearParams.totalPage)
        $('.paginate-right').addClass('disabled')
    else
        $('.paginate-right').removeClass('disabled')

    if (gearParams.offset == 1)
        $('.paginate-left').addClass('disabled')
    else
        $('.paginate-left').removeClass('disabled')
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
})

$(document).on('click', '.table-data .popup-box', function(e) {
    e.preventDefault();
    var gearId = $(this).attr('href');

    $.ajax({
        url: apiUrl + 'gear-detail-popup',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            offLoading();
        },
        error: function (XHR, status, error) {
            offLoading();
        },
        complete: function (res) {
            $('#wrapper-popup').attr('data-gearid', gearId);
            $('.wrapper-popup').append(res.responseText);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            $('#body').css('overflow', 'hidden');

            offLoading();
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
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: gearParams.limit,
        offset: gearParams.offset,
        user_status: gearParams.userStatus
    }

    if (gearParams.orderByLevel != (null && '')) {
        requestData.order_by_level = gearParams.orderByLevel;
    }

    if (gearParams.paramFilter != 0) {
        requestData.param_filter = gearParams.paramFilter;
        requestData.param_value = gearParams.paramValue;
    }

    if (gearParams.paramLevel != (null && '')) {
        requestData.level = gearParams.paramLevel;
    }

    if (gearParams.upgradeFlagEvent != (null && '')) {
        requestData.upgrade_flag_event = gearParams.upgradeFlagEvent;
    }

    $.ajax({
        url: apiUrl + 'gear-data',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data;
                var html = "";

                if (responseData.data.length == 0) {
                    html += `
                        <tr>
                            <td colspan="9">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>
                                    <div class="touch-box">
                                        <div class="box">
                                            ${data["token_id"]}
                                        </div>
                                        <div class="child c-1">
                                            ${data["token_id"]}
                                        </div>
                                    </div>
                                </td>
                                <td>${ (data["owner_address"]) ? data["owner_address"] : 'No owner address' }</td>
                                <td>${ (data["user_id"]) ? data["user_id"] : 'No owner' }</td>
                                <td>${data["value"]}</td>
                                <td>
                                    <a href="${data["id"]}" class="text-decoration-underline popup-box">
                                        Show
                                    </a>
                                </td>
                            </tr>
                        `;
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
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="9">No data</td>
                    </tr>
                `;

                gearParams.totalPage = 1;
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
                        <td colspan="9">No data</td>
                    </tr>
                `;

                gearParams.totalPage = 1;
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
