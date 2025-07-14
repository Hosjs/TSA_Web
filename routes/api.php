<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:Admin')->get('/admin-only', function () {
        return response()->json(['message' => 'Welcome admin!']);
    });

    Route::middleware('role:Student')->get('/student-only', function () {
        return response()->json(['message' => 'Welcome student!']);
    });
});

