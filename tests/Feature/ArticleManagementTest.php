<?php

namespace Tests\Features;

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

        $response = $this->actingAs($user)->post('/admin/article', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response->assertRedirect('/admin/article/example-title/edit');
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text'
        ]);
    }

    /** @test */
    function cannot_create_articles_unauthorised()
    {
        $response = $this->post('/admin/article', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response->assertRedirect('/login');

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

        $response = $this->actingAs($user)->delete('/admin/article/example-title');

        $response->assertRedirect('/admin/article');
        $this->assertDatabaseMissing('articles', ['title' => 'Example Title']);
    }

    /** @test */
    function cannot_delete_articles_unauthorised()
    {
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response = $this->delete('/admin/article/example-title');

        $response->assertRedirect('/login');
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

        $response = $this->actingAs($user)->put('/admin/article/example-title', [
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

        $response = $this->put('admin/article/example-title', [
            'title' => 'Some New Title',
            'body' => 'Hello, World',
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);
    }

    /** @test */
    function can_make_an_article_into_a_review()
    {
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
            'body' => 'Some text',
        ]);

        $response = $this->get('/reviews/example-title');

        $response->assertStatus(404);

        $article->update(['score' => 5]);

        $response = $this->get('/reviews/example-title');

        $response->assertStatus(200);
    }
}
