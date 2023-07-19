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
                        <a href="{{ route('event-type.index') }}" class="btn btn-primary">Back</a>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <div class="form-group">
                        <form action="{{ route('event-type.destroy', $eventType["id"]) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-{{ ($eventType["deleted"] == 0) ? "danger" : "primary" }}  " onClick="return confirm('Do you definitely want to {{ ($eventType["deleted"] == 0) ? "delete" : "restore" }} this event?')">
                                {{ ($eventType["deleted"] == 0) ? "Delete this event type" : "Restore this event type" }}
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
                <div class="col-md-6 offset-sm-3">
                    <form action="{{ route('event-type.update', $eventType["id"]) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Information</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>ID</label>
                                    <input type="text" class="form-control form-control-border" name="id" id="id" value="{{ $eventType["id"] }}" placeholder="Name...">
                                </div>
                                <div class="form-group">
                                    <label>Event type</label>
                                    <input type="text" class="form-control form-control-border" name="name" id="name" value="{{ $eventType["name"] }}" placeholder="Name...">
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-danger">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
