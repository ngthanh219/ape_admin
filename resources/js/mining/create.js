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

var startDate = moment().startOf('hour'),
    endDate = moment().startOf('hour').add(24, 'hour');

$("input[name='start_time']").val(startDate.format('YYYY-MM-DD HH:mm:ss'));
$("input[name='finish_time']").val(endDate.format('YYYY-MM-DD HH:mm:ss'));
$('#reservation').daterangepicker({
    timePicker: true,
    startDate: startDate,
    endDate: endDate,
    locale: {
        format: 'M/DD hh:mm A'
    }
}, function(start, end) {
    $("input[name='start_time']").val(start.format('YYYY-MM-DD HH:mm:ss'));
    $("input[name='finish_time']").val(end.format('YYYY-MM-DD HH:mm:ss'));
});

var valueJson = {
    'start_time' : endDate.format('YYYY-MM-DD HH:mm:ss'),
    'finish_time' : endDate.add(4, 'hour').format('YYYY-MM-DD HH:mm:ss')
}
$("#value-json").val(JSON.stringify(valueJson, null, '\t'));
$('#reservation-convert').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour').add(24, 'hour'),
    endDate: moment().startOf('hour').add(28, 'hour'),
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
