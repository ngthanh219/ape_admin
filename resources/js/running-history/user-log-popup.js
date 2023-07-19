import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const userRunningHistoryParams = {
    limit: 0,
    offset: 0,
    totalPage: 0,
    runningHistoryId: null,
    userId: null
}

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit-popup').val(limit);
    userRunningHistoryParams.limit = limit;
    userRunningHistoryParams.offset = offset;
    userRunningHistoryParams.userId = $('#wrapper-popup').attr('data-userlog');

    $('.popup').addClass('show-popup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#body').css('overflow', 'hidden');

    getUserRunningHistoryData();
});

$('#hidden-popup').click(function (e) {
    e.preventDefault();

    $('.popup').removeClass('show-popup');

    setTimeout(() => {
        $('.wrapper-popup').html('');
        $('#wrapper-popup').attr('data-userlog', 0);
        $('#body').css('overflow', '');
    }, 350);
})

$('#paginate-left-popup').click(function (e) {
    e.preventDefault();

    if (userRunningHistoryParams.offset > 1) {
        userRunningHistoryParams.offset = parseInt(userRunningHistoryParams.offset) - 1;
        getUserRunningHistoryData();
    }
})

$('#paginate-right-popup').click(function (e) {
    e.preventDefault();

    if (userRunningHistoryParams.offset < userRunningHistoryParams.totalPage) {
        userRunningHistoryParams.offset = parseInt(userRunningHistoryParams.offset) + 1;
        getUserRunningHistoryData();
    }
})

function btnPaginate() {
    if (userRunningHistoryParams.offset == userRunningHistoryParams.totalPage)
        $('#paginate-right-popup').addClass('disabled')
    else
        $('#paginate-right-popup').removeClass('disabled')

    if (userRunningHistoryParams.offset == 1)
        $('#paginate-left-popup').addClass('disabled')
    else
        $('#paginate-left-popup').removeClass('disabled')
}

$('#filter-action-popup').click(function () {
    userRunningHistoryParams.limit = $('#limit-popup').val();
    userRunningHistoryParams.offset = $('#offset-popup').val();
    userRunningHistoryParams.runningHistoryId = $('#running_history_id').val();

    getUserRunningHistoryData();
})

function getUserRunningHistoryData() {
    onLoading();

    $('.offset-popup').html('');
    $('.limit-offset-popup').html('');
    $('.table-data-popup').html('');

    var requestData = {
        limit: userRunningHistoryParams.limit,
        offset: userRunningHistoryParams.offset
    }

    if (userRunningHistoryParams.runningHistoryId) {
        requestData.running_history_id = userRunningHistoryParams.runningHistoryId;
    }

    $.ajax({
        url: apiUrl + 'running-history-data/' + userRunningHistoryParams.userId,
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
                            <td colspan="14">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>${data["gear_id"]}</td>
                                <td>${Math.round(data["distance_km"] / 1000 * 100) / 100}</td>
                                <td>${data["time"]}</td>
                                <td>${data["real_time"]}</td>
                                <td>${data["steps"]}</td>
                                <td>${data["nft_steps"]}</td>
                                <td>
                                    ${
                                        (data["road_map_image"] == null) ?
                                            '<a><i class="icon fas fa-ban"></i></a>'
                                        :
                                            '<a href="' + data["road_map_image"] + '" target="_blank"><i class="nav-icon far fa-image"></i></a>'
                                    }
                                </td>

                                <td>${data["stamina_decrease"]}</td>
                                <td>${Math.round(data["earned"] * 100) / 100}</td>
                                <td>${Math.round(data["earned_bape"] * 100) / 100}</td>
                                <td>
                                    ${
                                        (data["status_update"] == 0) ?
                                            '<span class="badge bg-primary">Started</span>'
                                        :
                                            (data["status_update"] == 1) ?
                                                '<span class="badge bg-success">Updated</span>'
                                            :
                                                '<span class="badge bg-danger">Deleted</span>'
                                    }
                                </td>
                                <td>
                                    <a href="${baseUrl + '/running-history-log/' + data["id"]}" target="_blank">${data["created_at"]}</a>
                                </td>
                                <td>
                                    <a href="${baseUrl + '/running-history-log/' + data["id"]}" target="_blank">${data["updated_at"]}</a>
                                </td>
                            </tr>
                        `;
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
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="14">No data</td>
                    </tr>
                `;

                userRunningHistoryParams.totalPage = 1;
                $('.limit-offset-popup').append("Total 0/0");
                $('.table-data-popup').append(html);
            }

            btnPaginate();
            offLoading();
        },
        error: function (XHR, status, error) {
            if (XHR.responseJSON.success == 0) {
                responseNotifcation(XHR.responseJSON, false);
                var html = `
                    <tr>
                        <td colspan="14">No data</td>
                    </tr>
                `;

                userRunningHistoryParams.totalPage = 1;
                $('.limit-offset-popup').append("Total 0/0");
                $('.table-data-popup').append(html);
            }

            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
}

