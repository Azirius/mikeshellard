<?php

Route::group(['prefix' => 'v1'], function () {
    Route::resource('user', 'Api\UserController', ['only' => ['show']]);
    Route::put('user/update-email', 'Api\UserController@updateEmail');
    
    Route::resource('article', 'Api\ArticleController', ['only' => ['index', 'show']]);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::resource('article', 'Api\ArticleController', ['except' => ['index', 'show']]);
        Route::post('article/{article}/comments', 'Api\CommentController@store');
        Route::post('comment/{comment}/feature', 'Api\CommentController@feature')
            ->name('comment.feature');
    });
});
