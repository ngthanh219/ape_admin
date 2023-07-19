@extends('index')

@section('index')
<div class="content-wrapper">
    <div class="content-header">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">
                    {{ $pageName }}: <span id="running-history-id">{{ $runningHistoryId }}</span>
                </h1>
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
                    <a id="export" class="btn btn-danger">Export</a>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body table-responsive p-0" id="table-data" style="height: 700px">
                            <table class="table text-center table-head-fixed text-nowrap" id="table">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">ID</th>
                                        <th style="">Latitude</th>
                                        <th style="">Longitude</th>
                                        <th style="">Distances</th>
                                        <th style="">Steps</th>
                                        <th style="">Times</th>
                                        <th style="">Average speed</th>
                                        <th style="">Status</th>
                                        <th style="">GPS accuracy</th>
                                        <th style="">Device type</th>
                                        <th style="">Step status</th>
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
<script src="{{ asset('js/ape/running-history/log-detail.js?' . strtotime("now")) }}"></script>
@endsection
