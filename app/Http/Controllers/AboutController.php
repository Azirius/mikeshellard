<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        return view('pages.about-me');
    }

    public function audioPage()
    {
        return view('pages.audio-gear');
    }
}
