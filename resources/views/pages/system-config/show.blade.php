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
                        <a href="{{ route('system-config') }}" class="btn btn-primary">Back</a>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <div class="form-group">
                        <form action="{{ route('system-config.delete', $systemConfig["id"]) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-{{ ($systemConfig["deleted"] == 0) ? "danger" : "primary" }}  " onClick="return confirm('Do you definitely want to {{ ($systemConfig["deleted"] == 0) ? "delete" : "restore" }} this config?')">
                                {{ ($systemConfig["deleted"] == 0) ? "Delete this config" : "Restore this config" }}    
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
                    <form action="{{ route('system-config.update', $systemConfig["id"]) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Config information</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Key</label>
                                    <input type="text" class="form-control form-control-border" name="key" id="key" value="{{ $systemConfig["key"] }}" placeholder="key...">
                                </div>
                                <div class="form-group">
                                    <label>Value</label>
                                    <textarea class="form-control" rows="10" name="value" id="value" placeholder="Config content ...">{{ $systemConfig['value'] }}</textarea>
                                </div>
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
    <script src="{{ asset('js/ape/system-config/update.js?' . strtotime("now")) }}"></script>
@endsection