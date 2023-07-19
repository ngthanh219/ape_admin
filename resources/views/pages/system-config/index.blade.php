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
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Per page</label>
                        <input type="number" class="form-control" id="limit" min="15" placeholder="Example: 15">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Page</label>
                        <input type="number" class="form-control offset" id="offset" min="1">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <a href="{{ route('system-config.create') }}" class="btn btn-primary">New config</a>
                        <a id="filter-action" class="btn btn-primary">Filter</a>
                    </div>
                    <div class="form-group d-flex">
                        <form action="{{ route('system-config.export') }}" method="POST" class="mr-1">
                            @csrf
                            <button class="btn btn-info">Export</button>
                        </form>
                        <a href="{{ route('system-config.import') }}" class="btn btn-danger">Import</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title limit-offset"></h3>
                            <div class="text-right">
                                <a href="" class="btn btn-outline-dark btn-sm" id="paginate-left">
                                    <i class="fas fa-angle-left left"></i>
                                </a>
                                <a href="" class="btn btn-outline-dark btn-sm" id="paginate-right">
                                    <i class="fas fa-angle-right right"></i>
                                </a>
                            </div>
                        </div>

                        <div class="card-body table-responsive p-0" style="height: 680px">
                            <table class="table text-center table-head-fixed text-nowrap">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">ID</th>
                                        <th>Key name</th>
                                        <th style="width: 20px">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-data"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@section('script')
    <script src="{{ asset('js/ape/system-config/index.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
