<div class="loading" id="loading"></div>

<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
                {{ session('tokens.email') }}
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">
                    Change information
                </a>
                <a href="#" class="dropdown-item">
                    Change password
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-footer">
                    <form action="{{ route('refresh-token') }}" method="post">
                        @csrf
                        <input type="hidden" name="access_token" value="{{ session('tokens.access_token') }}">
                        <input type="hidden" name="refresh_token" value="{{ session('tokens.refresh_token') }}">
                        <button type="submit" class="border-0 bg-primary d-flex justify-content-center align-items-center w-100" style="border-radius: 3px">Refresh token</button>
                    </form>
                </a>
                <a href="#" class="dropdown-footer">
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button type="submit" class="border-0 bg-danger d-flex justify-content-center align-items-center w-100" style="border-radius: 3px">Logout</button>
                    </form>
                </a>
            </div>
        </li>
    </ul>
</nav>