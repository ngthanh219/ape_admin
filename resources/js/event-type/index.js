import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const eventTypeParams = {
    limit: 0,
    offset: 0,
    totalPage: 0
}

$(document).ready(function() {
    var limit = 15;
    var offset = 1;

    $('#limit').val(limit);

    eventTypeParams.limit = limit;
    eventTypeParams.offset = offset;

    getEventTypeData();
});

$('#filter-action').click(function () {
    eventTypeParams.limit = $('#limit').val();
    eventTypeParams.offset = $('#offset').val();

    getEventTypeData();
})

$('#paginate-left').click(function (e) {
    e.preventDefault();

    if (eventTypeParams.offset > 1) {
        eventTypeParams.offset = parseInt(eventTypeParams.offset) - 1;
        getEventTypeData();
    }
})

$('#paginate-right').click(function (e) {
    e.preventDefault();

    if (eventTypeParams.offset < eventTypeParams.totalPage) {
        eventTypeParams.offset = parseInt(eventTypeParams.offset) + 1;
        getEventTypeData();
    }
})

function btnPaginate() {
    if (eventTypeParams.offset == eventTypeParams.totalPage)
        $('#paginate-right').addClass('disabled')
    else
        $('#paginate-right').removeClass('disabled')

    if (eventTypeParams.offset == 1)
        $('#paginate-left').addClass('disabled')
    else
        $('#paginate-left').removeClass('disabled')
}

function getEventTypeData() {
    onLoading();

    $('.offset').html('');
    $('.limit-offset').html('');
    $('.table-data').html('');

    var requestData = {
        limit: eventTypeParams.limit,
        offset: eventTypeParams.offset
    }

    $.ajax({
        url: apiUrl + 'event-type-data',
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
                            <td colspan="4">No data</td>
                        </tr>
                    `;
                } else {
                    $.each(responseData.data, function(index, data) {
                        html += `
                            <tr>
                                <td><b>${data["id"]}</b></td>
                                <td>${data["name"]}</td>
                                <td>
                                    ${
                                        (data["deleted"] == 0) ?
                                            '<span class="badge bg-primary">Using</span>'
                                        :
                                            '<span class="badge bg-danger">Deleted</span>'
                                    }
                                </td>
                                <td class="d-flex justify-content-between">
                                    <a href="${baseUrl}/event-type/${data["id"]}" class="btn btn-outline-primary btn-sm mr-2">
                                        <i class="nav-icon fas fa-edit ml-1"></i>
                                    </a>
                                </td>
                            </tr>
                        `;

                        i++;
                    });
                }

                eventTypeParams.totalPage = responseData.total_page;
                var totalData = eventTypeParams.limit * eventTypeParams.offset;

                if (totalData > responseData.total_record) {
                    totalData = responseData.total_record;
                }

                $('.offset').val(eventTypeParams.offset);
                $('.offset').attr("placeholder", "Total: " + eventTypeParams.totalPage);
                $('.limit-offset').append("Total " + totalData + "/" + responseData.total_record);
                $('.table-data').append(html);
            } else {
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="4">No data</td>
                    </tr>
                `;

                eventTypeParams.totalPage = 1;
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
                        <td colspan="4">No data</td>
                    </tr>
                `;

                eventTypeParams.totalPage = 1;
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
