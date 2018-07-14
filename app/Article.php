<?php

namespace App;

use Illuminate\Support\Collection;
use Reflex\QueryFiltering\Filterable;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use Filterable;

    protected $fillable = [
        'title', 'slug', 'body', 'user_id', 'score'
    ];

    protected $with = ['user', 'comments', 'pages'];

    protected $appends = ['body_trimmed', 'featured_comment', 'comment_count', 'nice_created_at'];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($article) {
            $article->slug = str_slug($article->title);
        });
    }

    public function getCommentCountAttribute()
    {
        return $this->comments()->count();
    }

    public function featuredComment()
    {
        return $this->comments()->whereFeatured(true)->first();
    }

    public function getFeaturedCommentAttribute()
    {
        return $this->featuredComment();
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function pages()
    {
        return $this->hasMany(ArticlePage::class);
    }

    public function addPages($pages)
    {
        return $this->pages()->createMany($pages);
    }

    public function updatePages($pages)
    {
        $this->pages()->delete();
        $this->addPages($pages);

        return $this;
    }

    public function getNiceCreatedAtAttribute()
    {
        return $this->created_at->toFormattedDateString();
    }

    public function getNiceUpdatedAtAttribute()
    {
        return $this->updated_at->toFormattedDateString();
    }

    public function getBodyTrimmedAttribute()
    {
        return count($this->pages) ? Purify::clean($this->pages[0]->body) : 'No body here...';
    }

    public function scopeNewest($builder)
    {
        return $builder->orderBy('created_at', 'desc')->get();
    }

    public function scopeOldest($builder)
    {
        return $builder->orderBy('created_at', 'asc')->get();
    }
}
