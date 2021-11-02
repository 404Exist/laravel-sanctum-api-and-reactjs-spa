<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::namespace('App\Http\Controllers')->group(function () {
    //  Public Routes
    Route::group(['middleware' => 'guest:sanctum'], function () {
        Route::post('/register', 'AuthController@register');
        Route::post('/login', 'AuthController@login');
    });
    Route::get('/products', 'ProductController@index');
    Route::get('/product/{id}', 'ProductController@show');
    Route::get('/product/search/{name}', 'ProductController@search');


    // Authenticated Routes
    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::post('/logout', 'AuthController@logout');
        Route::post('/product', 'ProductController@store');
        Route::put('/product/{id}', 'ProductController@update');
        Route::patch('/product/{id}', 'ProductController@update');
        Route::delete('/product/{id}', 'ProductController@destroy');
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
    });
});

