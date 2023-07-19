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
            <div class="col-sm-8">
                <div class="row d-flex">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label>Date range:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="far fa-calendar-alt"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control float-right" id="reservation">
                            </div>
                            <!-- /.input group -->
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label>Status:</label>
                            <div class="input-group">
                                <select class="form-control select2" id="status-claim" style="width: 100%;" multiple>
                                    <option value="0" selected>Claimed</option>
                                    <option value="1">Pending</option>
                                    <option value="2">Refund</option>
                                    <option value="3">Deposit</option>
                                    <option value="4">Deposit Pending</option>
                                </select>
                            </div>
                            <!-- /.input group -->
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="invisible">Status:</label>
                            <div class="input-group">
                                <a id="btn-apply" class="btn btn-primary">Apply</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header border-0">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Chart deposit coin</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <p class="d-flex flex-column">
                                <span class="text-bold">Coin</span>
                            </p>
                        </div>

                        <div class="wrap-box-load black" id="chart-claim-loading">
                            <div class="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="position-relative mb-4 invisible" id="chart-claim">
                            <canvas id="coin-chart" height="500px"></canvas>
                        </div>
                    </div>
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
                        <label>Date range:</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="far fa-calendar-alt"></i>
                                    </span>
                            </div>
                            <input type="text" class="form-control float-right" id="reservation-table">
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Status:</label>
                        <div class="input-group">
                            <select class="form-control select2" id="status-table" style="width: 100%;">
                                <option value="5" selected>All</option>
                                <option value="0">Claimed</option>
                                <option value="1">Pending</option>
                                <option value="2">Refund</option>
                                <option value="3">Deposit</option>
                                <option value="4">Deposit Pending</option>
                            </select>
                        </div>
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
                                        <th style="width: 10px">
                                            <a href="" id="order-by-id">
                                                ID
                                                <i class="id-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th style="width: 100px">Transaction ID</th>
                                        <th>Wallet address</th>
                                        <th>Email</th>
                                        <th>
                                            <a href="" id="order-by-point">
                                                Coin
                                                <i class="point-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="" id="order-by-amount">
                                                Amount
                                                <i class="amount-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th>Status</th>
                                        <th>Created at</th>
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
    <script src="{{ asset('js/ape/point-claim-history/index.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
