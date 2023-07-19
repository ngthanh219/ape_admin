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
