import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const systemConfigParams = {
    limit: 0,
    offset: 0,
    totalPage: 0
}

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit').val(limit);

    systemConfigParams.limit = limit;
    systemConfigParams.offset = offset;

    getSystemConfigData();
});

$('#filter-action').click(function () {
    systemConfigParams.limit = $('#limit').val();
    systemConfigParams.offset = $('#offset').val();

    getSystemConfigData();
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (systemConfigParams.offset > 1) {
        systemConfigParams.offset = parseInt(systemConfigParams.offset) - 1;
        getSystemConfigData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (systemConfigParams.offset < systemConfigParams.totalPage) {
        systemConfigParams.offset = parseInt(systemConfigParams.offset) + 1;
        getSystemConfigData();
    }
})

function btnPaginate() {
    if (systemConfigParams.offset == systemConfigParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (systemConfigParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

function getSystemConfigData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: systemConfigParams.limit,
        offset: systemConfigParams.offset
    }

    $.ajax({
        url: apiUrl + 'system-config-data',
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
                            <td colspan="3">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td>${data["id"]}</td>
                                <td><b>${data["key"]}</b></td>
                                <td class="d-flex justify-content-between">
                                    <a href="${baseUrl}/system-config/${data["id"]}" class="btn btn-outline-primary btn-sm mr-2">
                                        <i class="nav-icon fas fa-edit ml-1"></i>
                                    </a>
                                </td>
                            </tr>
                        `;
                    });
                }

                systemConfigParams.totalPage = responseData.total_page;

                var totalData = systemConfigParams.limit * systemConfigParams.offset;

                if (totalData > responseData.total_record) {
                    totalData = responseData.total_record;
                }

                $('.offset').val(systemConfigParams.offset);
                $('.offset').attr("placeholder", "Total: " + systemConfigParams.totalPage);
                $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
                $('.table-data').append(html);
            } else {
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="3">No data</td>
                    </tr>
                `;

                systemConfigParams.totalPage = 1;
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
                        <td colspan="3">No data</td>
                    </tr>
                `;

                systemConfigParams.totalPage = 1;
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
