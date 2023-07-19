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
                        <label>User ID or email</label>
                        <input type="text" class="form-control" id="user_information" placeholder="ID, email, wallet address">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>status</label>
                        <select class="form-control status" id="status" style="width: 100%;">
                            <option value="4">All</option>
                            <option value="0">Active</option>
                            <option value="1">Lock</option>
                            <option value="2">Black list</option>
                        </select>
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
                                        <th style="width: 25px">
                                            <a href="" id="order-by-id">
                                                User ID
                                                <i class="id-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th style="width: 250px">Full name</th>
                                        <th style="width: 250px">Email</th>
                                        <th class="d-none user-agent">User agent</th>
                                        <th style="width: 250px">Wallet address</th>
                                        <th style="width: 250px">Stamina</th>
                                        <th style="width: 250px">
                                            <a href="" id="order-by-bape-coin">
                                                Bape coin
                                                <i class="bape-coin-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th style="width: 250px">
                                            <a href="" id="order-by-ape-coin">
                                                Ape coin
                                                <i class="ape-coin-icon fas fa-arrow-down"></i>
                                            </a>
                                        </th>
                                        <th style="width: 250px">
                                            <a href="" id="order-by-earn">
                                                Earned
                                                <i class="earn-icon fas fa-arrow-down"></i>
                                            </a>

                                        </th>
                                        <th>Status</th>
                                        <th style="width: 250px">Action</th>
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
    <script src="{{ asset('js/ape/user/index.js?' . strtotime("now")) }}"></script>
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        })
    </script>
@endsection
