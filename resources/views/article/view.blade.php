@extends('layouts.app')

@section('content')
<div class="jumbotron">
    <div class="container">
        <h1>{{ $article->title }}</h1>        
    </div>
</div>
<div class="container">
        <p class="blog-post-meta">
            <i class="fa fa-user"></i> <a href="/profile/{{ $article->user->slug }}">{{ $article->user->name }}</a>
            <i class="fa fa-calendar"></i> <span>{{ $article->nice_created_at }}</span>
        </p>
    <div>{!! $article->body !!}</div>
</div>
@endsection