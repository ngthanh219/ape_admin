import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';

$(document).ready(function() {
    getSystemConfigData();
});

$(document).on('click', '#system-mode-data button', function(e) {
    e.preventDefault();

    if (confirm('Do you definitely want to change mode of system?')) {
        var buttonId = $(this).attr('id');
        var modeId = $(this).attr('data-mode');
        var everyChild = document.querySelectorAll("#system-mode-data button");

        for (var i = 0; i < everyChild.length; i++) {
            if (everyChild[i].id != buttonId) {
                $('#' + everyChild[i].id).removeClass('bg-danger');
            }
        }
        
        if (modeId != '') {
            switchMode(modeId);
            $('#' + buttonId).addClass('bg-danger');
        }
    }
});

function getSystemConfigData() {
    onLoading();

    var url = apiUrl + 'system-mode-data';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            if (res.success === 1) {
                $.each(res.data, function(index, data) {
                    $("#system-mode-data").append(`
                        <button data-mode="${data["id"]}" id="switch-mode-${data["id"]}" class="btn btn-outline-danger${(data.status == 1) ? ' bg-danger' : ''}">${data.name}</button>
                    `);
                });
            } else {
                responseNotifcation(res, false);
            }

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

function switchMode(modeId) {
    onLoading();

    $.ajax({
        url: apiUrl + 'system-mode-data/' + modeId,
        type: 'PUT',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function (res) {
            if (res.success == 1) {
                responseNotifcation(res, true);
            } else {
                responseNotifcation(res, false)
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
}