<?php

namespace App;

use Illuminate\Support\Collection;
use Reflex\QueryFiltering\Filterable;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use Filterable;

    protected $fillable = [
        'title', 'slug', 'body', 'user_id', 'score'
    ];

    protected $with = ['user'];

    protected $appends = ['nice_created_at', 'nice_updated_at', 'body_trimmed'];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($article) {
            $article->slug = str_slug($article->title);
        });
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

    // public function getScoreAttribute()
    // {
    //     return new Score($this->score);
    // }

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
        return str_limit($this->body, 100);
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
