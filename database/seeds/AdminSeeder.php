<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bouncer::allow('admin')->to('manage-articles');
        Bouncer::allow('admin')->to('manage-users');
        Bouncer::assign('admin')->to(App\User::find(1));

        Bouncer::allow('subscriber')->to('comment-on-articles');
        Bouncer::allow('subscriber')->to('feature-a-comment');
        Bouncer::assign('subscriber')->to(App\User::find(1));
    }
}
