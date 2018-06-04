<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;

class PasswordlessLogin
{
    use ValidatesRequests;

    protected $request;

    /**
     * Create a new PasswordlessLogin instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Send a sign in invitation to the user.
     */
    public function invite()
    {
        $this->validateRequest()
            ->createToken()
            ->send();
    }

    /**
     * Log in the user associated with a token.
     *
     * @param  LoginToken $token
     * @return void
     */
    public function login(LoginToken $token)
    {
        Auth::login($token->user, true);
        $token->delete();
    }
    /**
     * Validate the request data.
     *
     * @return $this
     */
    protected function validateRequest()
    {
        return tap($this, function ($instance) {
            $instance->validate($this->request, [
                'email' => 'required|email|exists:users'
            ]);
        });
    }
    /**
     * Prepare a log in token for the user.
     *
     * @return LoginToken
     */
    protected function createToken()
    {
        $user = User::byEmail($this->request->email);
        return LoginToken::generateFor($user);
    }
}
