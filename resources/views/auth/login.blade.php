<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>APE Admin</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link rel="stylesheet" href="{{ asset('bower_components/AdminLTE/plugins/fontawesome-free/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('bower_components/AdminLTE/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('bower_components/AdminLTE/dist/css/adminlte.min.css') }}">
</head>
<body class="hold-transition login-page">
    <div class="login-box">
        <div class="login-logo">
            <a href="#"><b>APE</b> Admin</a>
        </div>
        
        <div class="card">
            <div class="card-body login-card-body">
                @if (session('message'))
                    <p class="login-box-msg text-danger">{{ session('message') }}</p>
                @else
                    <p class="login-box-msg">Sign in to start</p>
                @endif

                <form action="{{ route('login') }}" method="post">
                    @csrf
                    
                    @error('email')
                        <div class="error text-danger text-bold">{{ $message }}</div>
                    @enderror
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email" name="email" value="{{ old('email') }}">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>

                    @error('email')
                        <div class="error text-danger text-bold">{{ $message }}</div>
                    @enderror
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Password" name="password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="{{ asset('bower_components/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/dist/js/adminlte.min.js') }}"></script>
</body>
</html>
