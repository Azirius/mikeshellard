<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PeopleCanRegister extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function only_guests_can_see_registration_page()
    {
        $this->disableExceptionHandling();

        $user = factory(User::class)->create();

        $responseAsGuest = $this->get('/register');

        $responseAsGuest->assertOk();

        $response = $this->actingAs($user)->get('/register');

        $response->assertRedirect('/dashboard');

    }

    /** @test */
    function can_create_an_account()
    {
        $this->disableExceptionHandling();

        $response = $this->post('/register', [
            'name'  =>  'John',
            'email' =>  'john@example.com',
        ]);

        $response->assertRedirect('/created');

        $this->assertDatabaseHas('users', [
            'name' => 'John',
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    function email_is_required()
    {
        $this->disableExceptionHandling();
        $this->expectException(ValidationException::class);

        $response = $this->post('/register', [
            'name'  =>  'John',
            'email' =>  null,
        ]);

        $response->assertRedirect('/register');

        $this->assertDatabaseMissing('users', [
            'name'  =>  'John',
        ]);
    }

    /** @test */
    function email_is_a_valid_email()
    {
        $this->disableExceptionHandling();
        $this->expectException(ValidationException::class);

        $response = $this->post('/register', [
            'name'  =>  'John',
            'email' =>  'not an email',
        ]);

        $response->assertRedirect('/register');

        $this->assertDatabaseMissing('users', [
            'name'  =>  'John',
        ]);
    }

    
}
