<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home'); */

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/mypage', [WelcomeController::class, 'mypage'])->name('mypage');
Route::get('/users', [UserController::class, 'index'])->name('users');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
