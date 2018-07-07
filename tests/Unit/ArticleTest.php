<?php

namespace Tests\Unit;

use App\User;
use App\Article;
use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function can_get_featured_comment()
    {
        $article = factory(Article::class)->create();
        $comment = factory(Comment::class)->create(['article_id' => $article->id]);
        $comment->feature();

        $this->assertEquals(1, $article->featuredComment()->id);
    }
}
