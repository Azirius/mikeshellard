<?php

Route::group(['prefix' => 'v1'], function () {
    Route::resource('user', 'Api\UserController', ['only' => ['show']]);
    
    Route::resource('article', 'Api\ArticleController', ['only' => ['index', 'show']]);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::resource('article', 'Api\ArticleController', ['except' => ['index', 'show']]);
    });
});
