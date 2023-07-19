import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const feedbackParams = {
    limit: 0,
    offset: 0,
    totalPage: 0,
    totalRecord: 0,
    userInformation: null,
    status: null
}

$(document).ready(function() {
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
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (feedbackParams.offset > 1) {
        feedbackParams.offset = parseInt(feedbackParams.offset) - 1;
        getFeedbackData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (feedbackParams.offset < feedbackParams.totalPage) {
        feedbackParams.offset = parseInt(feedbackParams.offset) + 1;
        getFeedbackData();
    }
})

function btnPaginate() {
    if (feedbackParams.offset == feedbackParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (feedbackParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

$(document).on('click', '.table-data .update-status', function(e) {
    e.preventDefault();
    onLoading();
    var feedbackId = $(this).attr('href');

    $.ajax({
        url: apiUrl + 'feedback-data/' + feedbackId,
        type: 'PUT',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        data: {
            status: 3
        },
        success: function (res) {
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

            offLoading();
        },
        error: function (XHR, status, error) {
            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
});

$(document).on('click', '.table-data .delete', function(e) {
    e.preventDefault();

    if (confirm('Do you definitely want to delete this feedback?')) {
        onLoading();
        var feedbackId = $(this).attr('href');

        $.ajax({
            url: apiUrl + 'feedback-data/' + feedbackId,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function (res) {
                if (res.success == 1) {
                    $('#feedback-' + feedbackId).remove();
                    feedbackParams.offset -= 1;
                    getFeedbackData();
                } else {
                    responseNotifcation(res, false);
                    offLoading();
                }
            },
            error: function (XHR, status, error) {
                offLoading();
            },
            complete: function (res) {
                // offLoading();
            }
        });
    }
});

function getFeedbackData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: feedbackParams.limit,
        offset: feedbackParams.offset
    }

    if (feedbackParams.userInformation != (null && '')) {
        requestData.user_information = feedbackParams.userInformation;
    }

    if (feedbackParams.status != (null && '')) {
        requestData.status = feedbackParams.status;
    }

    if (feedbackParams.dateFrom != (null && '')) {
        requestData.date_from = feedbackParams.dateFrom;
    }

    if (feedbackParams.dateTo != (null && '')) {
        requestData.date_to = feedbackParams.dateTo;
    }

    $.ajax({
        url: apiUrl + 'feedback-data',
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
                            <td colspan="7">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr id="feedback-${data["id"]}">
                                <td><b>${data["id"]}</b></td>
                                <td>${(data["first_name"]) ? data["first_name"] : ""} ${(data["last_name"]) ? data["last_name"] : ""}</td>
                                <td>${data["email"]}</td>
                                <td>
                                    <div class="short-text m-auto" style="width: 200px">${data["content"]}</div>
                                </td>
                                <td>
                                    ${
                                        (data["status"] == 0) ? '<span class="badge bg-success" id="status-' + data["id"] + '">New</span>'
                                            : (data["status"] == 1) ? '<span class="badge bg-info" id="status-' + data["id"] + '">Seen</span>'
                                            : (data["status"] == 2) ? '<span class="badge bg-primary" id="status-' + data["id"] + '">Replied</span>'
                                            : '<span class="badge bg-danger" id="status-' + data["id"] + '">Blocked</span>'
                                    }
                                </td>
                                <td>
                                    <a class="text-primary">${data["created_at"]}</a>
                                </td>
                                <td>
                                    <a href="${baseUrl + '/show-feedback/' + data["id"]}" class="btn btn-outline-primary btn-sm show-popup" title="View">
                                        <i class="fas fa-eye fa-fw"></i>
                                    </a>
                                    <a href="${data["id"]}" class="btn btn-outline-${(data["status"] == 3) ? 'primary' : 'danger'} btn-sm update-status" id="status-item-${data["id"]}" title="${(data["status"] == 3) ? 'Unblock' : 'Block'}">
                                        <i id="icon-status-item-${data["id"]}" class="fas fa-${(data["status"] == 3) ? 'window-restore' : 'ban'} fa-fw"></i>
                                    </a>
                                    <a href="${data["id"]}" class="btn btn-outline-danger btn-sm delete" title="Delete">
                                        <i class="fas fa-trash fa-fw"></i>
                                    </a>
                                </td>
                            </tr>
                        `;
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
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="7">No data</td>
                    </tr>
                `;

                feedbackParams.totalPage = 1;
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
                        <td colspan="7">No data</td>
                    </tr>
                `;

                feedbackParams.totalPage = 1;
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
