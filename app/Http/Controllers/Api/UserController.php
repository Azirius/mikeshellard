<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show user
     * @param  User   $user user instance
     * @return User
     */
    public function show(User $user)
    {
        return $user->with('articles')->first();
    }
}
