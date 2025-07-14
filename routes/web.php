<?php
use Illuminate\Support\Facades\Route;

// Route dùng cho mọi trang frontend của Vue
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
