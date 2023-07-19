var url = window.location.origin;
var apiUrl = url + '/api/v1/';

function onLoading() {
    clearLoading();
    
    // bootstrap loading
    // $('.loading').append(`
    //     <div class="preloader flex-column justify-content-center align-items-center" id="preloader">
    //         <img class="animation__shake" id="animation__shake" src="${url}/bower_components/AdminLTE/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
    //     </div>
    // `);

    $('.loading').append(`
        <div class="wrap-load">
            <div class="loading-animation">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    `);
}

function offLoading() {
    // bootstrap loading
    // $('#animation__shake').css('display', 'none');
    // $('#preloader').css('height', '0px');
    
    clearLoading();
}

function clearLoading() {
    $('.loading').html('');
}

function responseNotifcation(res, status) {
    $('.box-notification').html('');

    var type = "danger";
    var icon = "ban";

    if (status) {
        type = "success";
        icon = "check";
        res = res.message;
    } else {
        res = res.error.error_message;
    }
    
    $('.box-notification').append(`
        <div class="card-body notification-custom">
            <div class="alert alert-${type} alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-${icon}"></i> Notification</h5>
                ${res}
            </div>
        </div>
    `);
    
    setTimeout(() => {
        $('.notification-custom').delay(100).slideUp();
    }, 3000);
}

function getFilterMonths() {
    var today = new Date();

    var currentDate = today;
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(currentDate.getDate() + 1);
    var dd = currentDate.getDate();
    var mm = String(currentDate.getMonth()).padStart(2, '0');
    var yyyy = currentDate.getFullYear();
    var currentDateFormat = yyyy + '-' + mm + '-' + dd;

    var prevDate = today;
    currentDate.setMonth(currentDate.getMonth() - 1);
    currentDate.setDate(currentDate.getDate() - 1);
    var dd1 = prevDate.getDate();
    var mm1 = String(prevDate.getMonth()).padStart(2, '0');
    var yyyy1 = prevDate.getFullYear();
    var prevDateFormat = yyyy1 + '-' + mm1 + '-' + dd1;

    return [
        prevDateFormat,
        currentDateFormat
    ];
}

export {
    url,
    apiUrl,
    onLoading,
    offLoading,
    responseNotifcation,
    getFilterMonths
}