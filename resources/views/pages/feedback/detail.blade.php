@extends('index')

@section('index')
<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">{{ $pageName }}</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item active">{{ $pageName }}</li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <a href="{{ route('feedback') }}" class="btn btn-primary">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <form action="{{ route('reply-feedback', $feedback['id']) }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <p>
                                <b>Full name: </b><span class="underline">{{ (($feedback['first_name'] . $feedback['last_name']) == '') ? 'No name' : ($feedback['first_name'] . ' ' . $feedback['last_name']) }}</span>&nbsp;&nbsp;
                                <b>Email: </b><span class="underline">{{ $feedback['email'] }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <p><b>Feedback at: </b><span class="underline">{{ $feedback['created_at'] }}</span></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <p><b>Feedback content: </b><span class="underline">{{ $feedback['content'] }}</span></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <p><b>App version: </b><span class="underline">{{ $feedback['data']['app_version'] }}</span></p>
                            <p><b>Os version: </b><span class="underline">{{ $feedback['data']['os_version'] }}</span></p>
                            <p><b>Current gear: </b><span class="underline">{{ $feedback['data']['current_gear'] }}</span></p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <p>
                                <b>Status: </b>
                                <span class="underline">
                                    @if ($feedback['status'] == 0)
                                       New
                                    @elseif ($feedback['status'] == 1)
                                        Seen
                                    @elseif ($feedback['status'] == 2)
                                        Replied
                                    @else
                                        Blocked
                                    @endif
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Reply: </label>
                            <textarea cols="30" rows="10" class="form-control" name="content">{{ $feedback['reply'] }}</textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-danger">Send</button>
            </form>
        </div>
    </div>
</div>
@endsection
