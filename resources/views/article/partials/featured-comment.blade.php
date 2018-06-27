    <div class="featured-comment">
        <h2 class="subtitle">Featured Comment</h2>
        <p class="blog-post-meta">
            <img src="{{ $featuredComment->authorsAvatar() }}" class="image is-64x64 m-r-md is-pulled-left avatar">
            <a href="/profile/{{ $featuredComment->authorsSlug() }}">{{ $featuredComment->authorsName() }}</a>
            <i class="fa fa-calendar"></i> <span>{{ $featuredComment->nice_created_at }}</span>
        </p>
        <div>{{ $featuredComment->body }}</div>
    </div>
