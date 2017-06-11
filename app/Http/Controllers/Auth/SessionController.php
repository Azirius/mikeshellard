<?php

namespace App\Http\Controllers\Auth;

use App\LoginToken;
use App\Http\Requests;
use App\PasswordlessLogin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    protected $auth;

    public function __construct(PasswordlessLogin $auth)
    {
        $this->auth = $auth;
    }

    public function login()
    {
        return view('auth.login');
    }

    public function doLogin()
    {
        $this->auth->invite();

        return redirect('/login/invited')
            ->with('status', 'Okay, we have sent you your login token! Go check your emails!');
    }
    
    public function postLogin()
    {
        return view('auth.invited');
    }

    public function validateToken(LoginToken $token)
    {
        $this->auth->login($token);
        return redirect('/dashboard')
            ->with('status', 'You have successfully logged in to your account!');
    }

    public function logout()
    {
        auth()->logout();

        return redirect('/login')
            ->with('status', 'You have successfully logged out! Goodbye for now!');
    }
}
