<?php

namespace Tests\Unit;

use App\Item;
use App\User;
use App\Basket;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BasketTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_get_total_item_quantity()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($item);

        $this->assertEquals(1, $basket->totalItems());
    }

    /** @test */
    function can_quantify_one_item()
    {
        $user = factory(User::class)->create();
        $itemA = factory(Item::class)->create();
        $itemB = factory(Item::class)->create();
        $itemC = factory(Item::class)->create();
        $itemD = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($itemA, 1);
        $basket->addItem($itemB, 5);
        $basket->addItem($itemC, 10);

        $this->assertEquals(1, $basket->quantityForItem($itemA));
        $this->assertEquals(5, $basket->quantityForItem($itemB));
        $this->assertEquals(10, $basket->quantityForItem($itemC));
        $this->assertEquals(0, $basket->quantityForItem($itemD));
    }
}
