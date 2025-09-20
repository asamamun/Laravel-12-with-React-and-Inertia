<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome');
    }

    public function mypage()
    {
        
        $colors = ['red', 'green', 'blue'];
        // $loggedInUser = auth()->user()->only(['id', 'name', 'email']);
        $loggedInUser = Auth::user()->toArray();
        // dd($loggedInUser);
        return Inertia::render('mypage', compact('colors', 'loggedInUser'));
    }
}
