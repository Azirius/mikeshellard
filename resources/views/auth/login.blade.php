@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    {!! BootForm::open()->action('/login')->post() !!}
                        {!! BootForm::text('Email', 'email') !!}

                        {!! BootForm::submit("<i class=\"fa fa-btn fa-user\"></i> Login")->addClass('btn-primary') !!}

                        <a href="/" class="btn btn-danger">Cancel</a>
                    {!! BootForm::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
