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
                            <a href="{{ route('feedback') }}" class="btn btn-primary">Back</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="container-fluid">
                <form action="{{ route('send-custom-email') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Choose Users</label>
                                <select class="form-control select2" name="user_ids[]" id="user_ids" style="width: 100%;" multiple>
                                    @foreach($users as $user)
                                        <option value="{{ $user["id"] }}">{{ $user["email"] }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Subject</label>
                                <input type="text" class="form-control form-control-border" name="subject" id="subject" placeholder="subject...">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <textarea id="summernote" name="content">
                                Place <em>some</em> <u>text</u> <strong>here</strong>
                            </textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-danger">Send</button>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ asset('bower_components/AdminLTE/plugins/select2/js/select2.full.min.js') }}"></script>
    <script>
        $(function () {
            $('.select2').select2()
        });

        $(function () {
            // Summernote
            $('#summernote').summernote()
        })
    </script>
@endsection
