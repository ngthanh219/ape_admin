<div class="popup">
    <div class="row overlay">
        <div class="col-sm-12">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label>Per page</label>
                                <input type="number" class="form-control" id="limit-popup" min="15" placeholder="Example: 15">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label>Page</label>
                                <input type="number" class="form-control offset-popup" id="offset-popup" min="1">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label>ID</label>
                                <input type="text" class="form-control" id="running_history_id" placeholder="ID">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <a href="" class="btn btn-danger" id="hidden-popup">Back</a>
                                <a id="filter-action-popup" class="btn btn-primary">Filter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title limit-offset-popup"></h3>
                    <div class="text-right">
                        <a href="" class="btn btn-outline-dark btn-sm" id="paginate-left-popup">
                            <i class="fas fa-angle-left left"></i>
                        </a>
                        <a href="" class="btn btn-outline-dark btn-sm" id="paginate-right-popup">
                            <i class="fas fa-angle-right right"></i>
                        </a>
                    </div>
                </div>

                <div class="card-body table-responsive p-0" style="height: 580px">
                    <table class="table text-center table-head-fixed text-nowrap">
                        <thead>
                            <tr>
                                <th style="width: 25px">ID</th>
                                <th style="width: 25px">Gear ID</th>
                                <th style="width: 250px">Distance</th>
                                <th style="width: 250px">Time</th>
                                <th style="width: 250px">Real time</th>
                                <th style="width: 250px">Steps</th>
                                <th style="width: 250px">Nft steps</th>
                                <th style="width: 250px">Map</th>
                                <th style="width: 250px">Stamina decrease</th>
                                <th style="width: 250px">Earned APE</th>
                                <th style="width: 250px">Earned BAPE</th>
                                <th style="width: 250px">Status</th>
                                <th style="width: 250px">Created</th>
                                <th style="width: 250px">Updated</th>
                            </tr>
                        </thead>
                        <tbody class="table-data-popup"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/ape/running-history/user-log-popup.js?' . strtotime("now")) }}"></script>
<script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
<script>
    $(function () {
        $('.select2').select2()
    })
</script>
