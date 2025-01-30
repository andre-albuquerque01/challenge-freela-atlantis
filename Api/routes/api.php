<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('register', [UserController::class, 'store']);
    Route::post('login', [UserController::class, 'login']);
    Route::get('produtoss', [ProductController::class, 'index']);

    Route::middleware('auth:api')->group(function () {
        Route::apiResource('produtos', ProductController::class);
        Route::post('/logout', [UserController::class, 'logout']);
    });
});
