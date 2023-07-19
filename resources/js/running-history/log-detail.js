import {apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

const runningHistoryParams = {
    limit: 30,
    offset: 1,
    loadMore: true,
    data: []
}

$(document).ready(function() {
    $('.table-data').html('');
    getLogs();
    
    $('#table-data').on('scroll', function() {
        let div = $(this).get(0);

        if(div.scrollTop + div.clientHeight >= div.scrollHeight) {
            if (runningHistoryParams.loadMore) {
                runningHistoryParams.offset += 1;
                getLogs();
            }
        }
    });
});

$('#export').click(function () {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('table');
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    var filename = 'log-' + $('#running-history-id').html() + '.xls';
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
    }
})

function getLogs() {
    onLoading();

    var requestData = {
        limit: runningHistoryParams.limit,
        offset: runningHistoryParams.offset
    }

    $.ajax({
        url: apiUrl + 'running-history-log-data/' + $('#running-history-id').html(),
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (res) {
            if (res.success === 1) {
                var html = "";

                if (res.data.total_page === runningHistoryParams.offset) {
                    runningHistoryParams.loadMore = false;
                }

                if (res.data.data.length != 0) {
                    $.each(res.data.data, function(index, log) {
                        runningHistoryParams.data.push(log);
                        html += `
                            <tr>
                                <td>${log['id']}</td>
                                <td>${Math.round(log['latitude'] * 100) / 100}</td>
                                <td>${Math.round(log['longitude'] * 100) / 100}</td>
                                <td>${Math.round(log['distance_km'] * 100) / 100}</td>
                                <td>${log['steps']}</td>
                                <td>${log['time']}</td>
                                <td>${Math.round(log['average_speed'] * 100) / 100}</td>
                                <td>
                                    ${
                                        (log['status'] == 1) ?
                                            '<span class="badge bg-primary">Running</span>'
                                        : 
                                            (log["status"] == 2) ?
                                                '<span class="badge bg-warning">Walking</span>'
                                            :
                                                '<span class="badge bg-danger">Space walking</span>'
                                    }
                                </td>
                                <td>${(log['gps_accuracy']) ? Math.round(log['gps_accuracy'] * 100) / 100 : ""}</td>
                                <td>${(log['device_type']) ? log['device_type'] : ""}</td>
                                <td>${(log['step_status']) ? log['step_status'] : ""}</td>
                            </tr>
                        `;
                    });
                }

                $('.table-data').append(html);
            } else {
                responseNotifcation(res, false);
                html += `
                    <tr>
                        <td colspan="9">No data</td>
                    </tr>
                `;

                $('.table-data').append(html);
            }

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

                $('.table-data').append(html);
            }

            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
}
