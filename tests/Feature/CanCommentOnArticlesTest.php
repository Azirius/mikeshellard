<?php

namespace Tests\Feature;

use App\User;
use App\Article;
use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CanCommentOnArticlesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function can_comment_while_authenticated()
    {
        $this->disableExceptionHandling();
        $user = factory(User::class)->create();
        factory(Article::class)->create(['title' => 'Example Title']);
        $commentBody = 'Some body has commented here!';

        $response = $this->actingAs($user, 'api')->post('/api/v1/article/example-title/comments', [
            'body' => $commentBody,
        ]);

        $response = $this->get('/article/example-title')
            ->assertSee($commentBody);
        $this->assertDatabaseHas('comments', ['body' => $commentBody]);
    }

    /** @test */
    function cannot_comment_while_unauthenticated()
    {
        factory(Article::class)->create(['title' => 'Example Title']);

        $response = $this->post('/api/v1/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseMissing('comments', ['body' => 'Some body has commented here!']);
    }

    /** @test */
    function comment_only_visable_on_correct_article()
    {
        $user = factory(User::class)->create();
        factory(Article::class)->create(['title' => 'Example Title']);
        factory(Article::class)->create(['title' => 'The one without comments']);

        $this->actingAs($user)->post('/api/v1/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response = $this->get('/article/the-one-without-comments');

        $response->assertDontSee('Some body has commented here!');
    }

    /** @test */
    function can_feature_a_comment()
    {
        $user = factory(User::class)->create();
        factory(Article::class)->create(['title' => 'Example Title']);
        factory(Comment::class)->create(['body' => 'Some body has commented here!']);
        
        $response = $this->actingAs($user, 'api')
            ->post('/api/v1/comment/1/feature');

        $response->assertRedirect('/article/example-title');

        $this->assertDatabaseHas('comments', [
            'article_id' => 1,
            'id' => 1,
            'user_id' => 1,
            'featured' => 1,
        ]);

        $this->get('/article/example-title')
            ->assertSee('Featured comment by ' . Comment::find(1)->user->name);
    }

    /** @test */
    function hide_featured_area_if_no_featured_comment()
    {
        factory(Article::class)->create(['title' => 'Example Title']);
        
        $this->get('/article/example-title')
            ->assertDontSee('Featured comment by')
            ->assertDontSee('Featured Comment');
    }

    /** @test */
    function cannot_leave_empty_comment()
    {   
        $user = factory(User::class)->create();
        factory(Article::class)->create(['title' => 'Example Title']);

        $r = $this->actingAs($user, 'api')->post('/api/v1/article/example-title/comments', [
            'body' => null,
        ]);

        $this->assertDatabaseMissing('comments', ['body' => null]);
    }
}
