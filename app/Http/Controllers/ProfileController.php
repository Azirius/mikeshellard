<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        $userArticles = $user->articles;
        return view('pages.profile', compact('user', 'userArticles'));
    }
}
