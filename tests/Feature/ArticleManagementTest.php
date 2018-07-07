<?php

namespace Tests\Feature;

use Bouncer;
use App\User;
use App\Article;
use Tests\TestCase;
use App\ArticlePage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdminRole()
    {
        Bouncer::allow('admin')->to('manage-articles');
        Bouncer::allow('admin')->to('manage-users');
    }

    protected function createAdminUser()
    {
        $this->createAdminRole();

        factory(User::class)->create()->each(function ($user) {
            Bouncer::assign(['admin', 'subscriber'])->to($user);
        });

        return User::first();
    }

    protected function createAStandardUser()
    {
        return factory(User::class)->create();
    }

    /** @test */
    function can_create_an_article_while_authorised()
    {
        $user = $this->createAdminUser();

        $response = $this->actingAs($user)->post('/admin/article', [
            'title' => 'Example Title',
            'pages' =>  [[
                'body'      => 'Some text',
                'subtitle'  =>  'Subtitle Text',
            ]]
        ]);

        $response->assertRedirect('/admin/article/example-title/edit');
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title'
        ]);
        $this->assertDatabaseHas('article_pages', [
            'body'  =>  'Some text',
            'subtitle'  =>  'Subtitle Text',
        ]);
    }

    /** @test */
    function cannot_create_articles_unauthorised()
    {
        $response = $this->post('/admin/article', [
            'title' => 'Example Title',
            'pages' =>  [[
                'body'      => 'Some text',
                'subtitle'  =>  'Subtitle Text',
            ]]
        ]);

        $response->assertRedirect('/login');

        $this->assertDatabaseMissing('articles', [
            'title' => 'Example Title',
        ]);
    }

    /** @test */
    function can_delete_an_article_while_authorised()
    {
        $user = $this->createAdminUser();
        $article = factory(Article::class)->create(['title' => 'Example Title']);

        $response = $this->actingAs($user)->delete('/admin/article/example-title');

        $response->assertRedirect('/admin/article');
        $this->assertDatabaseMissing('articles', ['title' => 'Example Title']);
    }

    /** @test */
    function cannot_delete_articles_unauthorised()
    {
        factory(Article::class)->create([
            'title' => 'Example Title',
        ])->each(function ($article) {
            factory(ArticlePage::class)->create([
                'article_id'    =>  $article->id
            ]);
        });

        $response = $this->delete('/admin/article/example-title');

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
        ]);
    }

    /** @test */
    function can_edit_an_article_while_authorised()
    {
        $user = $this->createAdminUser();
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
        ])->each(function ($article) {
            factory(ArticlePage::class)->create([
                'article_id'    =>  $article->id,
            ]);
        });

        $response = $this->actingAs($user)->put('/admin/article/example-title', [
            'title' => 'Some New Title',
            'pages' =>  [[
                'body'      => 'Some text',
                'subtitle'  =>  'Subtitle Text',
            ]]
        ]);

        $this->assertDatabaseHas('articles', [
            'title' => 'Some New Title',
        ]);
    }

    /** @test */
    function cannot_edit_article_while_unauthorised()
    {
        $article = factory(Article::class)->create([
            'title' => 'Example Title',
        ]);

        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
        ]);

        $response = $this->put('admin/article/example-title', [
            'title' => 'Some New Title',
            'pages' =>  [[
                'body'      => 'Some text',
                'subtitle'  =>  'Subtitle Text',
            ]],
        ]);

        $response->assertRedirect('/login');
        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
        ]);
    }
}
