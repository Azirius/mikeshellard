<?php

namespace App;

use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Model;

class LoginToken extends Model
{
    protected $fillable = ['user_id', 'token'];

    /**
     * Generate a new token for the given user.
     *
     * @param  User $user
     * @return $this
     */
    public static function generateFor(User $user)
    {
        return static::create([
            'user_id' => $user->id,
            'token'   => str_random(50)
        ]);
    }

    /**
     * Get the route key for implicit model binding.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'token';
    }

    /**
     * Send the token to the user.
     */
    public function send()
    {
        $url = url('/auth/token', $this->token);
        Mail::send(['html' => 'emails.login'], compact('url'), function ($message) {
            $message->to($this->user->email, $this->user->name)
              ->subject('Login to My Site');
        });
    }

    /**
     * A token belongs to a registered user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
