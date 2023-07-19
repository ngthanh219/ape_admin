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
                        <a href="{{ route('event.index') }}" class="btn btn-primary">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <form action="{{ route('event.store') }}" method="POST">
                        @csrf
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">New event information</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Event Name</label>
                                    <input type="text" class="form-control form-control-border" name="name" id="name"  placeholder="Name...">
                                </div>
                                <div class="form-group">
                                    <label>Link image</label>
                                    <input type="text" class="form-control form-control-border" name="image" id="image"  placeholder="Link image...">
                                </div>
                                <div class="form-group">
                                    <label>Event Type</label>
                                    <select class="form-control select2" name="type_id" id="type_id" style="width: 100%;">
                                        @foreach($eventTypeData as $item)
                                            @if($item["deleted"] == 0)
                                                <option value="{{ $item["id"] }}">{{ $item["name"] }}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="form-control" rows="4" name="description" id="description" placeholder="Event description ..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Start Time</label>
                                    <input type="datetime-local" class="form-control" name="start_time" id="start_time" placeholder="Date ..."/>
                                </div>
                                <div class="form-group">
                                    <label>Finish Time</label>
                                    <input type="datetime-local" class="form-control" name="finish_time" id="finish_time" placeholder="Date ..."/>
                                </div>
                                <div class="form-group">
                                    <label>Data</label>
                                    <textarea class="form-control" rows="10" name="data" id="data" placeholder="Data ..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Expired at</label>
                                    <input type="datetime-local" class="form-control" name="expired_at" id="expired_at" placeholder="Date ..."/>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-danger">Create</button>
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
    <script src="{{ asset('js/ape/event/update.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
