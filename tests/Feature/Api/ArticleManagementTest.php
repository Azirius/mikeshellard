<?php

namespace Tests\Features\Api;

use App\User;
use App\Article;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ArticleManagementTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_create_an_article_while_authorised()
    {
        $user = factory(User::class)->create();
        $this->disableExceptionHandling();

        $response = $this->actingAs($user, 'api')->json('POST', '/api/v1/article', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response->assertSee('Example Title');

        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text'
        ]);
    }

    /** @test */
    function cannot_create_articles_unauthorised()
    {
        $response = $this->json('POST', '/api/v1/article', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response->assertStatus(401);

        $this->assertDatabaseMissing('articles', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);
    }

    /** @test */
    function can_delete_an_article_while_authorised()
    {
        $user = factory(User::class)->create();
        $article = factory(Article::class)->create(['title' => 'Example Title']);

        $response = $this->actingAs($user, 'api')->json('DELETE', '/api/v1/article/example-title');

        $response->assertSee('success');
        $this->assertDatabaseMissing('articles', ['title' => 'Example Title']);
    }

    /** @test */
    function cannot_delete_articles_unauthorised()
    {
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response = $this->json('DELETE', '/api/v1/article/example-title');

        $response->assertStatus(401);
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);
    }

    /** @test */
    function can_edit_an_article_while_authorised()
    {
        $user = factory(User::class)->create();
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response = $this->actingAs($user, 'api')->json('PUT', '/api/v1/article/example-title', [
            'title' => 'Some New Title',
            'body' => 'Hello, World',
        ]);

        $this->assertDatabaseHas('articles', [
            'title' => 'Some New Title',
            'body' => 'Hello, World',
        ]);
    }

    /** @test */
    function cannot_edit_article_while_unauthorised()
    {
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response = $this->json('PUT', '/api/v1/article/example-title', [
            'title' => 'Some New Title',
            'body' => 'Hello, World',
        ]);

        $response->assertStatus(401);
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);
    }
}
