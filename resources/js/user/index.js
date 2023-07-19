import {apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const userParams = {
    limit: 0,
    offset: 0,
    totalPage: 0,
    userInformation: null,
    orderByID: null,
    orderByBapecoin: null,
    orderByApecoin: null,
    orderByEarn: null,
    status: null
}

$(document).ready(function() {
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
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (userParams.offset > 1) {
        userParams.offset = parseInt(userParams.offset) - 1;
        getUserData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (userParams.offset < userParams.totalPage) {
        userParams.offset = parseInt(userParams.offset) + 1;
        getUserData();
    }
})

function btnPaginate() {
    if (userParams.offset == userParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (userParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
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
})

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
})

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
})

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

$(document).on('click', '.table-data .update-status', function(e) {
    e.preventDefault();
    onLoading();
    var userId = $(this).attr('href');
    var status = $(this).attr('data-status');

    $.ajax({
        url: apiUrl + 'user-data/' + userId,
        type: 'PUT',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        data: {
            status: status
        },
        success: function (res) {
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

                offLoading();
            } else {
                responseNotifcation(res, false);
                offLoading();
            }
        },
        error: function (XHR, status, error) {
            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
});

function getUserData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: userParams.limit,
        offset: userParams.offset
    }

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
        url: apiUrl + 'user-data',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data;
                var html = "";
                var userAgent = "";

                if (responseData.data.length == 0) {
                    html += `
                        <tr>
                            <td colspan="10">No data</td>
                        </tr>
                    `;
                } else {
                    if (responseData.user_agent != null) {
                        $('.user-agent').removeClass('d-none');
                        userAgent += `<td class="text-left">
                                         <span>App version: ${responseData.user_agent["app_version"]}</span></br>
                                         <span>Os version: ${responseData.user_agent["os_version"]}</span>
                                     </td>`;
                    } else {
                        $('.user-agent').addClass('d-none');
                    }
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>${(data["first_name"]) ? data["first_name"] : ""} ${(data["last_name"]) ? data["last_name"] : ""}</td>
                                <td>${data["email"]}</td>`;
                        if (responseData.user_agent != null && data["id"] == responseData.user_agent["id"]){
                            html += userAgent;
                        }
                        html += `
                                <td>${ (data["wallet_address"]) ? data["wallet_address"] : 'No wallet address' }</td>
                                <td>
                                    <a class="text-danger">${data["current_stamina"]}</a>
                                    /<a class="text-primary">${data["maximum_stamina"]}</a>
                                </td>
                                <td>
                                    <a class="text-danger">${Math.round(data["bape_coin"] * 100) / 100}</a>
                                </td>
                                <td>
                                    <a class="text-primary">${Math.round(data["ape_coin"] * 100) / 100}</a>
                                </td>
                                <td>
                                    <a class="text-danger">${Math.round(data["current_coin"] * 100) / 100}</a>
                                    /<a class="text-primary">${data["maximum_coin"]}</a>
                                </td>
                                <td>
                                    ${
                                        (data["deleted"] == 0) ? (
                                            (data["status"] == 0) ? '<span class="badge bg-success" id="status-' + data["id"] + '">Activing</span>'
                                                : (data["status"] == 1) ? '<span class="badge bg-secondary" id="status-' + data["id"] + '">Lock</span>'
                                                    : '<span class="badge bg-danger" id="status-' + data["id"] + '">Black list</span>') :
                                            '<span class="badge bg-danger">Deleted</span>'
                                    }
                                </td>
                                <td>
                                    <a href="${data["id"]}" class="btn btn-outline-${(data["status"] == 1) ? 'primary' : 'danger'} btn-sm update-status" data-status="1" id="status-item-lock-${data["id"]}" title="${(data["status"] == 1) ? 'Unlock' : 'Lock'}">
                                        <i id="icon-status-item-lock-${data["id"]}" class="fas fa-${(data["status"] == 1) ? 'lock-open' : 'lock'} fa-fw"></i>
                                    </a>
                                    <a href="${data["id"]}" class="btn btn-outline-${(data["status"] == 2) ? 'primary' : 'danger'} btn-sm update-status" data-status="2" id="status-item-ban-${data["id"]}" title="${(data["status"] == 2) ? 'Unban' : 'Ban'}">
                                        <i id="icon-status-item-ban-${data["id"]}" class="fas fa-${(data["status"] == 2) ? 'window-restore' : 'ban'} fa-fw"></i>
                                    </a>
                                </td>
                            </tr>
                        `;
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
                responseNotifcation(res, false);

                html += `
                    <tr>
                        <td colspan="10">No data</td>
                    </tr>
                `;

                userParams.totalPage = 1;
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

                userParams.totalPage = 1;
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
