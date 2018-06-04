<?php

namespace Tests\Feature;

use App\User;
use App\Article;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ShowProfileTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_view_a_users_profile()
    {
        $user = factory(User::class)->create();

        $response = $this->get('/profile/' . $user->getRouteKey());

        $response->assertStatus(200);
        $response->assertViewIs('pages.profile');
        $this->assertTrue($response->data('user')->is($user));
    }

    /** @test */
    function can_view_a_users_articles()
    {
        $user = factory(User::class)->create();
        $article = factory(Article::class)->create(['user_id' => $user->id]);

        $response = $this->get('/profile/' . $user->getRouteKey());

        $response->assertStatus(200);
        $this->assertTrue($response->data('userArticles')->contains($article));
    }
}
