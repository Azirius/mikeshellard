<?php

Route::get('/', 'HomeController@index');

Route::resource('article', 'ArticleController', ['only' => ['index', 'show']]);
Route::resource('reviews', 'ReviewController', ['only' => ['index', 'show']]);
Route::get('profile/{user}', 'ProfileController@show');

Route::post('comment/{comment}/feature', 'CommentController@feature');

Route::group(['middleware' => 'auth'], function () {
    Route::post('article/{article}/comments', 'CommentController@store');
    
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('article', 'ArticleController');
    });

    Route::get('logout', 'Auth\SessionController@logout');

    Route::get('dashboard', function () {
        return view('pages.dashboard');
    });
});


Route::group(['middleware' => 'guest'], function () {
    Route::get('login', 'Auth\SessionController@login')->name('login');
    Route::post('login', 'Auth\SessionController@doLogin');
    Route::get('login/invited', 'Auth\SessionController@postLogin');
    Route::get('auth/token/{token}', 'Auth\SessionController@validateToken');
});
