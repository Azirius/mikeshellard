<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserDashboard extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function can_update_their_email()
    {
        $user = factory(User::class)->create([
            'email' => 'john@example.com'
        ]);

        $response = $this->actingAs($user, 'api')->json('put', '/api/v1/user/update-email', [
            'email' => 'jane@example.org',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'jane@example.org']);
    }

    /** @test */
    function can_only_use_a_unique_email()
    {
        $userWeAreUpdating = factory(User::class)->create([
            'email' =>  'john@example.com',
        ]);
        $userWeAreNotUpdating = factory(User::class)->create([
            'email' =>  'jane@example.org',
        ]);

        $response   =   $this->actingAs($userWeAreUpdating, 'api')->json('put', '/api/v1/user/update-email', [
            'email' =>  'jane@example.org',
        ]);

        $response->assertJsonValidationErrors(['email']);
        $this->assertDatabaseHas('users', [
            'id'    =>  $userWeAreUpdating->id,
            'email' =>  'john@example.com',
        ]);
    }

    /** @test */
    function that_email_is_required()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user, 'api')->json('put', '/api/v1/user/update-email', [
            'email' =>  null,
        ]);

        $response->assertJsonValidationErrors('email');
        $this->assertDatabaseHas('users', [
            'id'    =>  $user->id,
            'email' =>  $user->email,
        ]);
    }

    /** @test */
    function test_that_we_require_an_email()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user, 'api')->json('put', '/api/v1/user/update-email', [
            'email' => 'not an email',
        ]);

        $response->assertJsonValidationErrors('email');
        $this->assertDatabaseHas('users',  [
            'id'    =>  $user->id,
            'email' =>  $user->email,
        ]);
    }

    /** @test */
    function that_we_receive_an_error_when_trying_to_update_to_current_email()
    {
        // $this->withoutExceptionHandling();
        $user = factory(User::class)->create([
            'email' =>  'john@example.com',
        ]);

        $response = $this->actingAs($user, 'api')->put('/api/v1/user/update-email', [
            'email' =>  'john@example.com',
        ]);

        $response->assertJsonValidationErrors('email');
        $this->assertDatabaseHas('users', [
            'id'    =>  $user->id,
            'email' =>  $user->email,
        ]);
    }
}
