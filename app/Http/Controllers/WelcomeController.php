<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        return Inertia::render('mypage', compact('colors'));
    }
}
