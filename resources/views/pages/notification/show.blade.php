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
                        <a href="{{ route('notification.index') }}" class="btn btn-primary">Back</a>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <div class="form-group">
                        <form action="{{ route('notification.destroy', $notification["id"]) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onClick="return confirm('Do you definitely want to delete this notification?')">
                                Delete this notification
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <form action="{{ route('notification.update', $notification["id"]) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Notification information</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>ID</label>
                                    <input type="text" class="form-control form-control-border" name="id" id="id" value="{{ $notification["id"] }}" placeholder="Name..." readonly>
                                </div>
                                <div class="form-group">
                                    <label>Message</label>
                                    <textarea class="form-control" rows="4" name="message" id="message" placeholder="Message content ...">{{ $notification["message"] }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label class="d-block">Action</label>
                                    <input type="checkbox" name="status" {{ $notification["status"] ? 'checked':'' }} data-bootstrap-switch>
                                </div>
                                <div class="form-group">
                                    <label>Notification Type</label>
                                    <select class="form-control select2" name="type" id="type" style="width: 100%;">
                                        @foreach($systemConfig as $key => $item)
                                            <option class="text-capitalize" value="{{ $item }}" {{ $notification["type"] == $item ? 'selected':'' }}>{{ $key }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Action message time</label>
                                    <input type="text" class="form-control float-right" id="reservation">
                                </div>
                                <div class="form-group">
                                    <label>Data</label>
                                    <textarea class="form-control" rows="10" name="data" id="data" placeholder="Data ...">{{ $notification["data"] }}</textarea>
                                </div>
                                <input type="hidden" name="start_time" value="{{ $notification["start_time"] }}">
                                <input type="hidden" name="finish_time" value="{{ $notification["finish_time"] }}">
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-danger">Update</button>
                                <a class="btn btn-dark json-format">Convert to json</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <div class="card card-success">
                        <div class="card-header">
                            <h3 class="card-title">Value json</h3>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label>Convert Time</label>
                                <input type="text" class="form-control float-right" id="reservation-convert">
                            </div>
                            <div class="form-group">
                                <label>Value</label>
                                <textarea class="form-control" rows="20" id="value-json" placeholder="Json ..."></textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <a class="btn btn-dark string-format">Convert to string</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
    <script src="{{ asset('js/ape/notification/update.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/bootstrap-switch/js/bootstrap-switch.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2({
                placeholder: "Select a state",
                containerCssClass: "text-capitalize",
                dropdownCssClass: "text-capitalize"
            })
        })

        $("input[data-bootstrap-switch]").each(function(){
            $(this).bootstrapSwitch('state', $(this).prop('checked'));
        })
    </script>

@endsection
