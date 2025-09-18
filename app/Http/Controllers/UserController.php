<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        //all users
        $users = User::all();
        $current = Auth::user();
        return Inertia::render('user', compact('users', 'current'));
    }

    public function create()
    {
        return Inertia::render('user.create');
    }

    public function store(Request $request)
    {
        $request = Request::all();
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
    }

}
