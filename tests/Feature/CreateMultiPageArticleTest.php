<?php

namespace Tests\Feature;

use App\User;
use App\Article;
use Tests\TestCase;
use App\ArticlePage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateMultiPageArticleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function can_create_a_multiple_page_article()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->post('/admin/article', [
            'title' => 'Example Title',
            'pages' => [
                [
                    'subtitle'  =>  'Example Title Sub',
                    'body'      =>  'Some body here',
                ],
                [
                    'subtitle'  =>  'A second subtitle',
                    'body'      =>  'Another set of stuff',
                ],
            ]
        ]);

        $response->assertRedirect('/admin/article/example-title/edit');

        $this->assertDatabaseHas('articles', [
            'title' => 'Example Title',
        ]);

        $this->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'Example Title Sub',
        ])->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'A second subtitle',
        ]);

    }

    /** @test */
    function can_add_a_page_to_an_existing_article()
    {   
        $user   =   factory(User::class)->create();
        $article=   factory(Article::class)->create([
            'title' =>  'Example Title',
        ]);
        $page = factory(ArticlePage::class)->create(
            ['subtitle' =>  'Example Title Sub', 'article_id' => $article->id]
        );

        $data = [
            'pages'     =>  [$page->only('subtitle', 'body')],
            'article_id'=>  $article->id,
        ] + $article->toArray();

        $data['pages'][]=   [
            'subtitle'  =>  'A second subtitle',
            'body'      =>  'Anything of interest here?',
        ];

        $response   =   $this->actingAs($user)->put('/admin/article/example-title', $data);

        $response->assertRedirect('/admin/article/example-title/edit');

        $this->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'Example Title Sub',
        ])->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'A second subtitle',
        ]);
   
    }

    /** @test */
    function can_update_pages_attached_to_an_article()
    {
        $user   =   factory(User::class)->create();
        $article=   factory(Article::class)->create([
            'title' =>  'Example Title',
        ]);
        $page   =   factory(ArticlePage::class)->create(
            ['subtitle' =>  'Example Title Sub', 'article_id' => $article->id],
            ['subtitle' =>  'A great page, but not meant to last', 'article_id' => $article->id]
        );

        $response=  $this->actingAs($user)->put('/admin/article/example-title', array_merge($article->toArray(), [
            'pages' =>  [
                [
                    'subtitle'  =>  'A brand new title',
                    'body'      =>  'Anybody',
                ],
                [
                    'subtitle'  =>  'Amazing',
                    'body'      =>  'Yes, these are amazing!',
                ]
            ]
        ]));

        $response->assertRedirect('/admin/article/example-title/edit');

        $this->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'A brand new title',
            'article_id'=>  $article->id,
        ])->assertDatabaseHas('article_pages', [
            'subtitle'  =>  'Amazing',
            'article_id'=>  $article->id,
        ]);
    }
}
