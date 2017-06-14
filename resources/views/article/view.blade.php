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

<div class="container">

    @if ($featuredComment)
    <h2>Featured Comment</h2>
    <div>
        <h3>Featured comment by {{ $featuredComment->authorsName() }}</h3>
        <p class="blog-post-meta">
            <i class="fa fa-user"></i> <a href="/profile/{{ $featuredComment->authorsSlug() }}">{{ $featuredComment->authorsName() }}</a>
            <i class="fa fa-calendar"></i> <span>{{ $featuredComment->nice_created_at }}</span>
        </p>
        <div><blockquote>{{ $featuredComment->body }}</blockquote></div>
    </div>
    <hr>
    @endif

    <h2>Your Comments</h2>
    @if (! $comments->count())
        <div class="alert alert-info">
            Nobody has commented here yet!
        </div>
    @endif

    @foreach ($comments as $comment)
        <div class="panel">
            <p class="blog-post-meta">
                <i class="fa fa-user"></i> <a href="/profile/{{ $comment->authorsSlug() }}">{{ $comment->authorsName() }}</a>
                <i class="fa fa-calendar"></i> <span>{{ $comment->nice_created_at }}</span>
            </p>
            <div>{{ $comment->body }}</div>
        </div>
    @endforeach

    <h2>Add a new comment</h2>
    @if (Auth::check())
    {!! BootForm::open()->action('/article/' . $article->slug . '/comments') !!}
        {!! BootForm::textarea(null, 'body')->id('summernote') !!}

        {!! BootForm::submit("<i class=\"fa fa-btn fa-pencil\"></i> Submit Comment!")->addClass('btn-primary btn-small') !!}
    {!! BootForm::close() !!}
    @else
        <div class="panel panel-info">
            <div class="panel-body">You need to be <a href="/login">logged in</a> to comment on these articles!</div>
        </div>
    @endif
</div>
@endsection
