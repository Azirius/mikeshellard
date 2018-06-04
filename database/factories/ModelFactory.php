<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->state(App\User::class, 'myself', function (Faker\Generator $faker) {
    return [
        'name' => 'Mike',
        'email' => 'contact@mikeshellard.me',
        'api_token' => str_random(60),
    ];
});

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        // 'password' => bcrypt(str_random(10)),
        'api_token' => str_random(60),
    ];
});

$factory->define(App\Article::class, function (Faker\Generator $faker) {
    $title = $faker->sentence;
    $user = App\User::first() ?: factory(App\User::class)->create();

    return [
        'title' => $title,
        'slug'  => str_slug($title),
        'user_id' => $user->id,
    ];
});

$factory->define(App\ArticlePage::class, function (Faker\Generator $faker) {
    return [
        'subtitle'  =>  $faker->sentence,
        'body'      =>  $faker->paragraph,
        'article_id'=>  function () {
            return factory(App\Article::class)->create()->id;
        }
    ];
});

$factory->define(App\Comment::class, function (Faker\Generator $faker) {
    $user = App\User::first() ?: factory(App\User::class)->create();
    $article = App\Article::first() ?: factory(App\Article::class)->create();

    return [
        'body' => $faker->paragraph,
        'user_id' => $user->id,
        'article_id' => $article->id,
    ];
});

$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
        'price' => 1000,
        'currency' => 'GBP',
        'name' => 'A Really Fancy Thing',
        'short_description' => 'This is a really fancy object!',
        'long_description' => 'With something this awesome, you would expect this item to be more ubiquitous!',
        'max_quantity' => null,
    ];
});
