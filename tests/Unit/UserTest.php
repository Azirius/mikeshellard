<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_find_a_user_by_email()
    {
        factory(User::class)->create([
            'email' => 'someone@example.com',
        ]);

        $user = User::byEmail('someone@example.com');

        $this->assertEquals(1, $user->id);
    }
}
