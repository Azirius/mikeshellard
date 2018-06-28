<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        return view('registration.index');
    }

    public function created()
    {
        return view('registration.created');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users,email,' . $request->email,
            'name'  =>  'required|min:4',
        ]);

        User::create([
            'email' =>  $request->email,
            'name'  =>  $request->name,
        ])->assign('subscriber');

        return redirect('/registration/created');
    }
}
