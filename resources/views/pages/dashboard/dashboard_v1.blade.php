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
            </div>
        </div>

        <div class="content">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-lg-12">
                        <div class="card-custom">
                            <div class="wrap-box-load white" id="total-data-loading">
                                <div class="lds-ripple">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div class="row total-data d-none" id="total-data">
                                <div class="mb-1 row col-12 border-bottom">
                                    <div class="col-sm-3 col-6">
                                        <div class="description-block border-right">
                                            <h5 class="description-header" id="total-users">0</h5>
                                            <span class="description-text">TOTAL USERS</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 col-6">
                                        <div class="description-block border-right">
                                            <h5 class="description-header" id="total-boxes">0</h5>
                                            <span class="description-text">TOTAL BOXES</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 col-6">
                                        <div class="description-block border-right">
                                            <h5 class="description-header" id="total-shoes">0</h5>
                                            <span class="description-text">TOTAL SHOES</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 col-6">
                                        <div class="description-block">
                                            <h5 class="description-header" id="total-breed">0</h5>
                                            <span class="description-text">TOTAL BREED</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row col-12">
                                    <div class="col-sm-4 col-6">
                                        <div class="description-block border-right">
                                            <h5 class="description-header" id="total-earned">0</h5>
                                            <span class="description-text">TOTAL EARNED</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-6">
                                        <div class="description-block border-right">
                                            <h5 class="description-header" id="total-ape">0</h5>
                                            <span class="description-text">TOTAL APE</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-6">
                                        <div class="description-block">
                                            <h5 class="description-header" id="total-bape">0</h5>
                                            <span class="description-text">TOTAL BAPE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 mb-4">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">Total shoes in app</h3>
                                    <div class="d-flex">
                                        <button id="btn-type" class="btn btn-primary mr-2 btn-gear-chart" disabled>Type</button>
                                        <button id="btn-rank" class="btn btn-primary mr-2 btn-gear-chart">Rank</button>
                                        <button id="btn-level" class="btn btn-primary btn-gear-chart">Level</button>
                                    </div>
                                </div>
                            </div>
                            <div id="range_level" class="col-12 d-flex align-items-center invisible">
                                <div class="col-1 text-center">
                                    <button id="btn-apply" class="btn btn-success py-1 btn-gear-chart">Apply</button>
                                </div>
                                <div class="col-3 text-center">
                                    <label class="mb-0" for="level">Level:</label>
                                    <input type="text" id="level" readonly style="border:0; color:#f6931f; font-weight:bold;">
                                </div>
                                <div class="col-5" id="slider-range"></div>
                            </div>
                            <div class="card-body">
                                <div class="wrap-box-load black" id="gear-data-loading">
                                    <div class="lds-ripple">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="position-relative mb-4 invisible" id="gear-data">
                                    <canvas id="gears-chart" height="500px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="row d-flex">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Start Time</label>
                                    <input type="date" class="form-control" name="start_time" id="start-time" placeholder="Date ..."/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Finish Time</label>
                                    <input type="date" class="form-control" name="finish_time" id="finish-time" placeholder="Date ..."/>
                                </div>
                            </div>
                            <div class="col-sm-1 d-flex align-items-end">
                                <div class="form-group">
                                    <a id="filter-earned-burned" class="btn btn-primary">Filter</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">Total Earned</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex">
                                    <p class="d-flex flex-column">
                                        <span class="text-bold">Earned/km</span>
                                    </p>
                                </div>

                                <div class="wrap-box-load black" id="earned-dashboard-loading">
                                    <div class="lds-ripple">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="position-relative mb-4 invisible" id="earned-dashboard">
                                    <canvas id="visitors-chart" height="500px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">
                                        Tracking burn
                                    </h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex">
                                    <p class="d-flex flex-column">
                                        <span class="text-bold">Values</span>
                                        <p class="ml-auto d-flex flex-column text-right">
                                            <span class="text-success">
                                                Total bape burned: <span id="total-bape-burn">0</span>
                                            </span>
                                            <span class="text-success">
                                                Total ape burned: <span id="total-ape-burn">0</span>
                                            </span>
                                        </p>
                                    </p>
                                </div>

                                <div class="wrap-box-load black" id="trucking-burn-dashboard-loading">
                                    <div class="lds-ripple">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="position-relative mb-4 invisible" id="trucking-burn-dashboard">
                                    <canvas id="trucking-burn-chart" height="500px"></canvas>
                                </div>

                                <div class="d-flex flex-row justify-content-end">
                                    <span class="mr-2">
                                        <i class="fas fa-square text-danger"></i> Earned / APE
                                    </span>
                                    <span class="mr-2">
                                        <i class="fas fa-square text-warning"></i> BAPE
                                    </span>
                                    <span class="mr-2">
                                        <i class="fas fa-square text-primary"></i> APE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ asset('js/ape/dashboard/dashboard-data.js?' . strtotime("now")) }}"></script>
    <script>
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 30,
            values: [ 0, 10 ],
            slide: function( event, ui ) {
                $( "#level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
        });
        $( "#level" ).val($( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ));
    </script>
@endsection
