<?php

Route::group(['middleware' => 'auth'], function () {
    
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('article', 'ArticleController');
        Route::delete('article/{article}/delete-page/{article_page}', 'ArticleController@destroyPage');
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

Route::get('/', 'HomeController@index');
Route::resource('article', 'ArticleController', ['only' => ['index', 'show']]);
Route::resource('reviews', 'ReviewController', ['only' => ['index', 'show']]);
Route::get('about-me', 'AboutController@index');
Route::get('about-me/audio-gear', 'AboutController@audioPage');
Route::get('profile/{user}', 'ProfileController@show');
