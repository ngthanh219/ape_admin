import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const miningParams = {
    limit: 0,
    offset: 0,
    totalPage: 0,
    email: null,
    started_at: null,
    status_update: 5
}

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit').val(limit);

    miningParams.limit = limit;
    miningParams.offset = offset;

    getMiningData();
});

$('#filter-action').click(function () {
    miningParams.limit = $('#limit').val();
    miningParams.offset = $('#offset').val();
    miningParams.email = $('#email').val();
    miningParams.started_at = $('#started-at').val();
    miningParams.status_update = $('#status-update').val();

    getMiningData();
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (miningParams.offset > 1) {
        miningParams.offset = parseInt(miningParams.offset) - 1;
        getMiningData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (miningParams.offset < miningParams.totalPage) {
        miningParams.offset = parseInt(miningParams.offset) + 1;
        getMiningData();
    }
})

function btnPaginate() {
    if (miningParams.offset == miningParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (miningParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

function getMiningData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: miningParams.limit,
        offset: miningParams.offset,
        status_update: miningParams.status_update
    }

    if (miningParams.email != null) {
        requestData.email = miningParams.email;
    }

    if (miningParams.started_at != null) {
        requestData.started_at = miningParams.started_at;
    }

    $.ajax({
        url: apiUrl + 'mining-data',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var responseData = res.data;
                var html = "";
                var i = 1;

                if (responseData.list.length == 0) {
                    html += `
                        <tr>
                            <td colspan="8">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.list, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["email"]}</b></td>
                                <td><b>${data["tool_id"]}</b></td>
                                <td>${data["box_id"]}</td>
                                <td>
                                    ${
                                        (data["status_update"] == 0) ? '<span class="badge bg-primary">Created</span>'
                                            : (data["status_update"] == 3) ? '<span class="badge bg-info">Cooldown</span>'
                                            : (data["status_update"] == 1) ? '<span class="badge bg-danger">Starting</span>'
                                            : '<span class="badge bg-success">Finished</span>'
                                    }
                                </td>
                                <td>${data["earned_number"]}</td>
                                <td>
                                    <a class="text-primary">${data["started_at"] ? data["started_at"] : ''}</a>
                                </td>
                                <td>
                                    <a class="text-primary">${data["finished_at"] ? data["finished_at"] : ''}</a>
                                </td>
                                <td>
                                    <a class="text-primary">${data["updated_log_at"] ? data["updated_log_at"] : ''}</a>
                                </td>
                            </tr>
                        `;

                        i++;
                    });
                }

                miningParams.totalPage = responseData.total_page;
                var totalData = miningParams.limit * miningParams.offset;

                if (totalData > responseData.total_record) {
                    totalData = responseData.total_record;
                }

                $('.offset').val(miningParams.offset);
                $('.offset').attr("placeholder", "Total: " + miningParams.totalPage);
                $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
                $('.table-data').append(html);
            } else {
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="8">No data</td>
                    </tr>
                `;

                miningParams.totalPage = 1;
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

                miningParams.totalPage = 1;
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
