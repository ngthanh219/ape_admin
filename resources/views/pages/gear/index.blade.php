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
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Param</label>
                        <select class="form-control select2" id="param-filter" style="width: 100%;">
                            <option value="0">All</option>
                            <option value="1">ID</option>
                            <option value="2">Token ID</option>
                            <option value="3">Owner address</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Value</label>
                        <input type="text" class="form-control" id="param-value" placeholder="ID, token id or owner address">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Level</label>
                        <input type="number" class="form-control" id="param-level" placeholder="Level of gear">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <a id="filter-action" class="btn btn-primary">Filter</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card card-primary card-outline card-outline-tabs">
                        <div class="card-header p-0 border-bottom-0">
                            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="custom-tabs-gear-normal-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="true">Gear Normal</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-lock-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear's User Lock</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-ban-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear's User Ban</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-free-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear No User</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-for-sale-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear's Sale</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-for-kol-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear's KOL</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-gear-milestone-tab" data-toggle="pill" href="#custom-tabs-gear-normal" role="tab" aria-controls="custom-tabs-gear-normal" aria-selected="false">Gear Milestone</a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body p-0">
                            <div class="tab-content p-0 w-auto" id="custom-tabs-four-tabContent">
                                <div class="tab-pane fade show active" id="custom-tabs-gear-normal" role="tabpanel"
                                     aria-labelledby="custom-tabs-gear-normal-tab">
                                    <div class="col-md-12 p-0">
                                        <div class="card">
                                            <div class="px-3 py-2">
                                                <h3 class="card-title limit-offset"></h3>
                                                <div class="text-right">
                                                    <a href="" class="btn btn-outline-dark btn-sm paginate-left">
                                                        <i class="fas fa-angle-left left"></i>
                                                    </a>
                                                    <a href="" class="btn btn-outline-dark btn-sm paginate-right">
                                                        <i class="fas fa-angle-right right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="card-body table-responsive p-0" style="height: 680px">
                                                <table class="table text-center table-head-fixed text-nowrap">
                                                    <thead>
                                                    <tr>
                                                        <th style="width: 25px">ID</th>
                                                        <th style="width: 100px">Token ID</th>
                                                        <th style="width: 250px">Owner address</th>
                                                        <th style="width: 250px">User ID</th>
                                                        <th style="width: 250px">
                                                            <a href="" id="order-by-level">
                                                                Level
                                                                <i class="level-icon fas fa-arrow-down"></i>
                                                            </a>
                                                        </th>
                                                        <th style="width: 250px">Other attribute</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody class="table-data"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="wrapper-popup" id="wrapper-popup"></div>
</div>
@endsection

@section('script')
    <script src="{{ asset('js/ape/gear/index.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
