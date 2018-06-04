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
