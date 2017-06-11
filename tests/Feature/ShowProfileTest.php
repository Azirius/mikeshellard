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
        $user = factory(User::class)->create([
            'name' => 'TestUser',
            'email' => 'someone@example.com',
        ]);

        $response = $this->get('/profile/testuser');

        $response->assertStatus(200);

        $response->assertSee('TestUser');
    }

    /** @test */
    function can_view_a_users_articles()
    {
        $user = factory(User::class)->create([
            'name' => 'TestUser',
            'email' => 'someone@example.com',
        ]);

        factory(Article::class)->create([
            'title' => 'Some Title',
            'body' => 'Some body',
            'user_id' => $user->id,
        ]);

        $response = $this->get('/profile/testuser');
        $response->assertStatus(200);
        $response->assertSee('Some Title');
        $response->assertSee('Some body');
    }
}
