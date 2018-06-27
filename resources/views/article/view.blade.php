@extends('layouts.app')

@section('content')
<section class="section site-content">
    <div class="container">
        <div class="blog-container m-t-md">
            <h1 class="title is-1">{{ $article->title }}</h1>
            <p class="blog-post-meta">
                <i class="fa fa-user"></i> <a href="/profile/{{ $article->user->slug }}">{{ $article->user->name }}</a>
                <i class="fa fa-calendar"></i> <span>{{ $article->nice_created_at }}</span>
            </p>
            <hr>
            @foreach($article->pages as $page)
                <div class="m-b-md">
                    <h3 class="subtitle">{{ $page->subtitle }}</h3>
                    <div class="blog-post">
                        {{ $page->body }}
                    </div>
                </div>
            @endforeach
        </div>

        <h2 class="subtitle">Add a new comment</h2>
        @auth
        <form action="/article/{{ $article->slug }}/comments" method="post">
            {{ csrf_field() }}
            <div class="field">
                <div class="control">
                    <textarea rows="10" cols="50" class="textarea" name="body">{{ old('body') }}</textarea>
                </div>
            </div>
            
            <div class="field">
                <div class="control">
                    <button type="submit" class="button is-info">
                        <i class="fas fa-btn fa-edit m-r-xs"></i> Submit Comment!
                    </button>
                </div>
            </div>
        </form>
        @else
            <div class="notification is-info m-b-md">
                You need to be <a href="/login">logged in</a> to comment on these articles!
            </div>
        @endauth

        @includeWhen($featuredComment, 'article.partials.featured-comment')

        <h2 class="subtitle">Comments</h2>
        @if (! $comments->count())
            <div class="notification is-info">
                Nobody has commented here yet!
            </div>
        @endif

        @foreach ($comments as $comment)
            <div class="columns">
                <div class="column is-narrow">
                    <img src="{{ $comment->authorsAvatar() }}" class="image is-64x64 avatar">
                </div>
                <div class="column">
                    <p class="blog-post-meta is-inline">
                        <a href="/profile/{{ $comment->authorsSlug() }}">{{ $comment->authorsName() }}</a>
                        <i class="fa fa-calendar"></i> <span>{{ $comment->nice_created_at }}</span>
                    </p>
                    <div class="is-inline">
                        @if (Bouncer::can('feature-a-comment') && ! $comment->featured)
                        <form action="/api/v1/comment/{{ $comment->id }}/feature" method="post" class="is-inline">
                            {{ csrf_field() }}
                            <button class="button is-text">
                                <i class="fa m-r-xs fa-thumbs-up"></i>
                                Feature?
                            </button>
                        </form>
                        @endif
                        @if ($comment->featured)
                        <span class="has-text-primary m-l-md">
                            <i class="fas m-r-xxs fa-thumbs-up"></i>
                            Featured!
                        </span>
                        @endif
                    </div>
                    <div>{{ $comment->body }}</div>
                </div>
            </div>
        @endforeach
    </div>
</section>
@endsection
