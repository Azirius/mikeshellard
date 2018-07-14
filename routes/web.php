<?php

Route::group(['middleware' => 'auth'], function () {
    Route::get('logout', 'Auth\SessionController@logout');
});

Route::group(['middleware' => 'guest'], function () {
    Route::get('login', 'Auth\SessionController@login')->name('login');
    Route::post('login', 'Auth\SessionController@doLogin');
    Route::get('login/invited', 'Auth\SessionController@postLogin');
    Route::get('auth/token/{token}', 'Auth\SessionController@validateToken');

    Route::get('register', 'RegistrationController@index');
    Route::post('register', 'RegistrationController@store');
    Route::get('register/created', 'RegistrationController@created');
});

Route::get('/{any}', 'HomeController@index')->where('any', '.*');
