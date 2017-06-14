<?php

namespace Tests\Unit;

use App\User;
use App\Article;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ArticleTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function do_we_correctly_trim_a_long_article_summary()
    {
        factory(User::class)->create();
        factory(Article::class)->create([
            'title' => 'A Wonderful Title',
            'body' => 'A Wonderful long body about some stuff that makes less sense than your usual story but since we are here',
            'slug' => 'a-wonderful-title',
        ]);

        $article = Article::first();
        $this->assertEquals(
            'A Wonderful long body about some stuff that makes less sense than your usual story but since we are...',
            $article->body_trimmed
        );
    }
}