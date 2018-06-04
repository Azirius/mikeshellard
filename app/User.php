<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['slug', 'name', 'email'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['remember_token'];

    protected $appends = ['gravatar'];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public static function boot()
    {
        parent::boot();

        static::saving(function ($user) {
            $user->slug = str_slug($user->name);
        });
    }

    public function getGravatarAttribute()
    {
        $size       =   100;
        return ['medium' => 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($this->email))) . '?s=' . $size];
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public static function byEmail($email)
    {
        return static::whereEmail($email)->firstOrFail();
    }
}
