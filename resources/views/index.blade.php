<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>APE Manager {{ ($pageName) ? " - " . $pageName : ""}}</title>
    @include('layout.link')
</head>
<body class="sidebar-mini layout-fixed layout-navbar-fixed" id="body">
    <div class="wrapper">
        @include('layout.header')
        @yield('link')

        @include('layout.aside')

        @yield('index')
        
        @include('layout.footer')

        <div class="box-notification">
            @if (session()->has('notification')))
                <div class="card-body notification-custom">
                    <div class="alert alert-{{ session()->get('notification')["type"] }} alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i class="icon fas fa-{{ session()->get('notification')["icon"] }}"></i> Notification</h5>
                        {{ session()->get('notification')["message"] }}
                    </div>
                </div>
                <script>
                    setTimeout(() => {
                        $('.notification-custom').delay(100).slideUp();
                    }, 3000);
                </script>
            @endif
        </div>
    </div>

    @include('layout.script')
    @yield('script')
</body>
</html>
