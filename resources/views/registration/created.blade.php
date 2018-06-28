@extends('layouts.app')

@section('content')
<section class="section site-content">
    <div class="container">
        <div class="card">
            <header class="card-header">
                <h1 class="card-header-title">Registration Successful!</h1>
            </header>

            <div class="card-content">
                Your account was successfully created! To login <a href="/login">click here</a> and simply provide your email,
                and we will send you an email with a link inside that'll get you going!
            </div>
        </div>
    </div>
</section>
@endsection
