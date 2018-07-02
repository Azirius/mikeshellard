<?php

Route::group(['middleware' => 'can:manage-articles'], function () {
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('article', 'ArticleController');
        Route::delete('article/{article}/delete-page/{article_page}', 'ArticleController@destroyPage');
    });
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('logout', 'Auth\SessionController@logout');

    Route::get('dashboard', function () {
        return view('pages.dashboard');
    });
});

Route::get('/emails/login', function ()
{
    return view('emails.login', ['url' => '/']);
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

Route::get('/', 'HomeController@index');
Route::resource('article', 'ArticleController', ['only' => ['index', 'show']]);
Route::get('about-me', 'AboutController@index');
Route::get('about-me/audio-gear', 'AboutController@audioPage');
Route::get('profile/{user}', 'ProfileController@show');
Route::get('pagination.html', function () {
    return view('pagination');
});

Route::get('test-fuck', function () {
    $request = collect(
        [
            'subtitle' => ['one', 'two', 'three'],
            'body' => ['body 1', 'body 2', 'body 3']
        ]
    );

    $pages = collect($request->get('subtitle'))->map(function ($currentReq, $index) use ($request) {
        return ['subtitle' => $currentReq, 'body' => $request->get('body')[$index]];
    });

    dd($pages);

    // var_dump($subtitleArray);
    // var_dump($subtitleBody);
});
