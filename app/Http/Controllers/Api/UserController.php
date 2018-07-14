<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Show user
     * @param  User   $user user instance
     * @return User
     */
    public function show(User $user)
    {
        return $user;
    }

    public function getUsersAbilities(User $user)
    {
        return $user->getAbilities();
    }

    public function getUsersPosts(User $user)
    {
        return $user->articles;
    }

    public function getUsersComments(User $user)
    {
        return $user->comments()->with('article:id,title,slug,created_at')->limit(10)->get();
    }

    public function updateEmail()
    {
        $this->validate(request(), [
            'email' => [
                'email',
                'required',
                Rule::unique('users')->ignore(auth('api')->user()->id)
            ]
        ]);

        if (request('email') == auth('api')->user()->email) {
            return response()->json(['errors' => ['email' => 'You already have this email!']], 422);
        }

        auth('api')->user()->update(['email' => request('email')]);

        return json_encode(['success' => true]);
    }
}
