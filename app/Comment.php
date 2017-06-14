<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['body', 'user_id', 'article_id'];

    protected $appends = ['nice_created_at', 'nice_updated_at', 'authors_name', 'authors_slug'];

    public function feature()
    {
        $this->article->comments->each->featured = false;
        $this->featured = true;
        $this->save();
        return $this;
    }

    public function authorsName()
    {
        return $this->user->name;
    }

    public function authorsSlug()
    {
        return $this->user->slug;
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAuthorsNameAttribute()
    {
        return $this->authorsName();
    }

    public function getAuthorsSlugAttribute()
    {
        return $this->authorsSlug();
    }

    public function getNiceCreatedAtAttribute()
    {
        return $this->created_at->toFormattedDateString();
    }

    public function getNiceUpdatedAtAttribute()
    {
        return $this->updated_at->toFormattedDateString();
    }
}
