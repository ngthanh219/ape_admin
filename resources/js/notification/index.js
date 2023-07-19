import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const notificationParams = {
    limit: 0,
    offset: 0,
    totalPage: 0
}

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit').val(limit);

    notificationParams.limit = limit;
    notificationParams.offset = offset;

    getNotificationData();
});

$('#filter-action').click(function () {
    notificationParams.limit = $('#limit').val();
    notificationParams.offset = $('#offset').val();

    getNotificationData();
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (notificationParams.offset > 1) {
        notificationParams.offset = parseInt(notificationParams.offset) - 1;
        getNotificationData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (notificationParams.offset < notificationParams.totalPage) {
        notificationParams.offset = parseInt(notificationParams.offset) + 1;
        getNotificationData();
    }
})

function btnPaginate() {
    if (notificationParams.offset == notificationParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (notificationParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

function getNotificationData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit : notificationParams.limit,
        offset : notificationParams.offset
    }

    $.ajax({
        url: apiUrl + 'notification',
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
                            <td colspan="6">No data</td>
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
                                            ${data["message"]}
                                        </div>
                                        <div class="child c-1 text-left">
                                            ${data["message"].replace(/\n/g, "<br />")}
                                        </div>
                                    </div>
                                </td>`;
                        for (let [key, value] of Object.entries(responseData.type_message)) {
                            if (data['type'] == value) {
                                html += `<td class="text-capitalize">${key.replace('_', ' ')}</td>`;
                            }
                        }
                        html += `<td>${data["start_time"]}</td>
                                <td>${data["finish_time"]}</td>
                                <td>
                                    ${
                                        (data["status"]) ?
                                            '<span class="badge bg-primary">On</span>'
                                        :
                                            '<span class="badge bg-danger">Off</span>'
                                    }
                                </td>
                                <td class="d-flex justify-content-between">
                                    <a href="${baseUrl}/notification/${data["id"]}" class="btn btn-outline-primary btn-sm mr-2">
                                        <i class="nav-icon fas fa-edit ml-1"></i>
                                    </a>
                                </td>
                            </tr>
                        `;

                        i++;
                    });
                }

                notificationParams.totalPage = responseData.total_page;
                var totalData = notificationParams.limit * notificationParams.offset;

                if (totalData > responseData.total_record) {
                    totalData = responseData.total_record;
                }

                $('.offset').val(notificationParams.offset);
                $('.offset').attr("placeholder", "Total: " + notificationParams.totalPage);
                $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
                $('.table-data').append(html);
            } else {
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="6">No data</td>
                    </tr>
                `;

                notificationParams.totalPage = 1;
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
                        <td colspan="6">No data</td>
                    </tr>
                `;

                notificationParams.totalPage = 1;
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
