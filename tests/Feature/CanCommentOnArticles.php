<?php

namespace Tests\Feature;

use App\Article;
use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CanCommentOnArticles extends TestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->disableExceptionHandling();
    }

    /** @test */
    function can_comment_while_authenticated()
    {
        $this->signIn();
        factory(Article::class)->create(['title' => 'Example Title']);

        $response = $this->post('/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response->assertRedirect('/article/example-title');
        $this->get('/article/example-title')
            ->assertSee('Some body has commented here!');
        $this->assertDatabaseHas('comments', ['body' => 'Some body has commented here!']);
    }

    /** @test */
    function cannot_comment_while_unauthenticated()
    {
        factory(Article::class)->create(['title' => 'Example Title']);

        $response = $this->post('/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseMissing('comments', ['body' => 'Some body has commented here!']);
    }

    /** @test */
    function comment_only_visable_on_correct_article()
    {
        $this->signIn();
        factory(Article::class)->create(['title' => 'Example Title']);
        factory(Article::class)->create(['title' => 'The one without comments']);

        $this->post('/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response = $this->get('/article/the-one-without-comments');

        $response->assertDontSee('Some body has commented here!');
    }

    /** @test */
    function can_feature_a_comment()
    {
        $this->signIn();
        factory(Article::class)->create(['title' => 'Example Title']);
        $this->post('/article/example-title/comments', [
            'body' => 'Some body has commented here!',
        ]);

        $response = $this->post('/comment/1/feature');

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
}
