@extends('layouts.app')

@section('content')
<section class="section site-content">
    <div class="container">
        <div class="card">
            <header class="card-header">
                <h1 class="card-header-title">Dashboard</h1>
            </header>

            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="{{ Auth::user()->gravatar['medium'] }}" alt="Avatar">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Welcome to your dashboard, {{ Auth::user()->name }}!</p>
                    </div>
                </div>

                <div class="content">
                    <ul>
                        <li><a href="#">Change email</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
