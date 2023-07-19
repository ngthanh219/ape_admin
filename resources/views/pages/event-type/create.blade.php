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
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 offset-sm-3">
                    <form action="{{ route('event-type.store') }}" method="POST">
                        @csrf
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">New event type information</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>ID</label>
                                    <input type="number" class="form-control form-control-border" name="id" id="id" placeholder="Name...">
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Event type</label>
                                    <input type="text" class="form-control form-control-border" name="name" id="name"  placeholder="Name...">
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-danger">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
