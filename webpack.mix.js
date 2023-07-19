const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sass('resources/sass/app.scss', 'public/css/ape')
    .js('resources/js/base.js', 'public/js/ape')
    .js('resources/js/running-history/index.js', 'public/js/ape/running-history')
    .js('resources/js/running-history/user-log-popup.js', 'public/js/ape/running-history')
    .js('resources/js/running-history/log-detail.js', 'public/js/ape/running-history')
    .js('resources/js/user/index.js', 'public/js/ape/user')
    .js('resources/js/user/index-anonymos-user.js', 'public/js/ape/user')
    .js('resources/js/system-config/index.js', 'public/js/ape/system-config')
    .js('resources/js/system-config/update.js', 'public/js/ape/system-config')
    .js('resources/js/dashboard/dashboard-data.js', 'public/js/ape/dashboard')
    .js('resources/js/system-mode/index.js', 'public/js/ape/system-mode')
    .js('resources/js/gear/index.js', 'public/js/ape/gear')
    .js('resources/js/gear/detail-popup.js', 'public/js/ape/gear')
    .js('resources/js/feedback/index.js', 'public/js/ape/feedback')
    .js('resources/js/event-type/index.js', 'public/js/ape/event-type')
    .js('resources/js/event-type/update.js', 'public/js/ape/event-type')
    .js('resources/js/event/index.js', 'public/js/ape/event')
    .js('resources/js/event/update.js', 'public/js/ape/event')
    .js('resources/js/point-claim-history/index.js', 'public/js/ape/point-claim-history')
    .js('resources/js/notification/index.js', 'public/js/ape/notification')
    .js('resources/js/notification/update.js', 'public/js/ape/notification')
    .js('resources/js/notification/create.js', 'public/js/ape/notification')
    .js('resources/js/mining/index.js', 'public/js/ape/mining');
