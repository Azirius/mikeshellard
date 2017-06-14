<?php

namespace Tests\Unit;

use App\User;
use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CommentTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_get_authors_name()
    {
        $user = factory(User::class)->create(['name' => 'John Smith']);
        $comment = factory(Comment::class)->create(['user_id' => $user->id]);

        $this->assertEquals('John Smith', $comment->authorsName());
    }

    /** @test */
    function can_get_authors_slug()
    {
        $user = factory(User::class)->create(['name' => 'John Smith', 'slug' => 'john-smith']);
        $comment = factory(Comment::class)->create(['user_id' => $user->id]);

        $this->assertEquals('john-smith', $comment->authorsSlug());
    }
}
