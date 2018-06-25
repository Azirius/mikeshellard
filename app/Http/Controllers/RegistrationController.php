<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        User::create([
            'email' =>  $request->email,
            'name'  =>  $request->name,
        ]);

        return redirect('/created');
    }
}
