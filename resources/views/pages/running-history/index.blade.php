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
                <div class="col-md-2">
                    <div class="form-group">
                        <label>User ID or email</label>
                        <input type="text" class="form-control" id="user_information" placeholder="ID, email">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Distance from</label>
                        <input type="number" class="form-control" id="distance_from" placeholder="1.1" min="0">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Distance to</label>
                        <input type="number" class="form-control" id="distance_to" placeholder="100..." min="0">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Date from</label>
                        <input type="date" class="form-control" id="date_from">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Date to</label>
                        <input type="date" class="form-control" id="date_to">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <a id="filter-action" class="btn btn-primary">Filter</a>
                        {{-- <a id="export-action" class="btn btn-danger">Export data</a> --}}
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <div class="form-group">
                        <a id="delete-action" class="btn btn-danger">Delete all logs detail</a>
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

                        <div class="card-body table-responsive p-0"" style="height: 680px">
                            <table class="table text-center table-head-fixed text-nowrap">
                                <thead>
                                    <tr>
                                        <th style="width: 25px">User ID</th>
                                        <th style="width: 250px">Full name</th>
                                        <th style="width: 250px">Email</th>
                                        <th>
                                            <a href="" id="order-by-distance">
                                                Total distances
                                                <i class="distance-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-time">
                                                Total times
                                                <i class="time-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-step">
                                                Total steps
                                                <i class="step-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-nft-step">
                                                Total nft steps
                                                <i class="nft-step-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-earn">
                                                Total earned APE
                                                <i class="earn-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-earn-bape">
                                                Total earned BAPE
                                                <i class="earn-bape-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th style="width: 40px"></th>
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

    <div class="wrapper-popup" id="wrapper-popup"></div>
</div>
@endsection

@section('script')
    <script src="{{ asset('js/ape/running-history/index.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
