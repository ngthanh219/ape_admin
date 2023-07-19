<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a class="brand-link">
        <img src="{{ asset('bower_components/AdminLTE/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">APE Manager</span>
    </a>
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                @if (config('admin.environment') != "product")
                    <li class="nav-header">
                        <p></p><b>{{ config('admin.environment') }}</b></p>
                        <p><b>{{ config('admin.ape_url') }}</b></p>
                    </li>
                @endif
                <li class="nav-item">
                    <a href="{{ route('system-mode') }}" class="nav-link {{ request()->is([
                        "system-mode*"
                    ]) ? "active" : "" }}">
                        <i class="fas fa-toggle-on fa-fw custome-space"></i>
                        <p>System mode</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('system-config') }}" class="nav-link {{ request()->is([
                        "system-config*",
                        "create-system-config"
                    ]) ? "active" : "" }}">
                        <i class="nav-icon fas fa-braille"></i>
                        <p>System config</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('dashboard') }}" class="nav-link {{ request()->is("dashboard") ? "active" : "" }}">
                        <i class="nav-icon fas fa-chart-line"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('user') }}" class="nav-link {{ request()->is("user") ? "active" : "" }}">
                        <i class="nav-icon far fa-user"></i>
                        <p>Users</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('anonymos-user') }}" class="nav-link {{ request()->is("anonymos-user") ? "active" : "" }}">
                        <i class="nav-icon far fa-user"></i>
                        <p>Anonymos Users</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('point-claim.index') }}" class="nav-link {{ request()->is([
                    "point-claim-history*"
                ]) ? "active" : "" }}">
                        <i class="fas fa-coins fa-fw custome-space"></i>
                        <p>Point Claim History</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('running-history') }}" class="nav-link {{ request()->is("running-history") ? "active" : "" }}">
                        <i class="nav-icon fas fa-bolt"></i>
                        <p>Running history</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('gear') }}" class="nav-link {{ request()->is([
                        "gear*"
                    ]) ? "active" : "" }}">
                        <i class="fas fa-shoe-prints fa-fw custome-space"></i>
                        <p>Gear</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('notification.index') }}" class="nav-link {{ request()->is([
                    "notification*",
                    "notification/create"
                ]) ? "active" : "" }}">
                        <i class="nav-icon fas fa-bell"></i>
                        <p>Notification</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('event-type.index') }}" class="nav-link {{ request()->is([
                        "event-type*",
                        "event-type/create"
                    ]) ? "active" : "" }}">
                        <i class="nav-icon fas fa-calendar-check"></i>
                        <p>Event type</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('event.index') }}" class="nav-link {{ request()->is([
                        "event",
                        "event/create",
                        "event/*"
                    ]) ? "active" : "" }}">
                        <i class="nav-icon fas fa-calendar-check"></i>
                        <p>Event</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('feedback') }}" class="nav-link {{ request()->is([
                        "feedback*"
                    ]) ? "active" : "" }}">
                        <i class="fas fa-comment fa-fw custome-space"></i>
                        <p>Feedback</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('quiz.index') }}" class="nav-link {{ request()->is([
                        "quiz*",
                        "create-quiz"
                    ]) ? "active" : "" }}">
                        <i class="fas fa-question fa-fw custome-space"></i>
                        <p>Quiz</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('mining.index') }}" class="nav-link {{ request()->is([
                        "mining*"
                    ]) ? "active" : "" }}">
                        <i class="fas fa-box-open fa-fw custome-space"></i>
                        <p>Mining</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
