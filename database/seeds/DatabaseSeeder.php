<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        
        App\User::truncate();
        App\Article::truncate();
        App\ArticlePage::truncate();
        App\Comment::truncate();

        factory(App\User::class)->states('myself')->create();
        factory(App\ArticlePage::class, 20)->create();
        
        $this->call(AdminSeeder::class);
    }
}
