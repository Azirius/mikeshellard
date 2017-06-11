@extends('layouts.app')

@section('content')
    <div class="jumbotron">
        <div class="container">
            <h1>{{ $user->name }}</h1>
        </div>
    </div>
    
    <div class="container">
            <div class="blog-container">
            @forelse($user->articles as $article)
                <h2 class="blog-post-title">
                    <a href="/article/{{ $article->slug }}">{{ $article->title }}</a>
                </h2>
                <p class="blog-post-meta">
                    <i class="fa fa-user"></i> <a href="/profile/{{ $user->slug }}">{{ $user->name }}</a>
                    <i class="fa fa-calendar"></i> <span>{{ $article->nice_created_at }}</span>
                </p>
                <article class="blog-post clearfix">{!! $article->body !!}</article>
                <hr>
            @empty
                <div class="alert alert-info">
                        There are no posts
                </div>
            @endforelse
            </div>
    </div>
@endsection