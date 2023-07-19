import {url as baseUrl, apiUrl, onLoading, offLoading} from '../base.js';

$('.json-format').click(function (e) {
    e.preventDefault();

    var value = $('#data').val();
    value = JSON.parse(value);
    value = JSON.stringify(value, null, '\t')

    $('#value-json').val(value);
});

$('.string-format').click(function (e) {
    e.preventDefault();

    var value = $('#value-json').val();
    value = JSON.stringify(JSON.parse(value))

    $('#data').val(value);
});

var startTime = $("input[name='start_time']").val(),
    finishTime = $("input[name='finish_time']").val();

$('#reservation').daterangepicker({
    timePicker: true,
    startDate: moment(startTime),
    endDate: moment(finishTime),
    locale: {
        format: 'M/DD hh:mm A'
    }
}, function(start, end) {
    $("input[name='start_time']").val(start.format('YYYY-MM-DD HH:mm:ss'));
    $("input[name='finish_time']").val(end.format('YYYY-MM-DD HH:mm:ss'));
});

var valueJson = {
    'start_time' : startTime,
    'finish_time' : finishTime
}

valueJson = $('#data').val() ? JSON.parse($('#data').val()) : valueJson;

$("#value-json").val(JSON.stringify(valueJson, null, '\t'));
$('#reservation-convert').daterangepicker({
    timePicker: true,
    startDate: moment(valueJson.start_time),
    endDate: moment(valueJson.finish_time),
    locale: {
        format: 'M/DD hh:mm A'
    }
}, function(start, end) {
    valueJson = {
        'start_time' : start.format('YYYY-MM-DD HH:mm:ss'),
        'finish_time' : end.format('YYYY-MM-DD HH:mm:ss')
    }
    $("#value-json").val(JSON.stringify(valueJson, null, '\t'));
});


