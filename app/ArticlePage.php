<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticlePage extends Model
{
    protected $fillable = ['subtitle', 'body'];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
