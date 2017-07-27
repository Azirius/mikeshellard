<?php

namespace Tests\Feature;

use App\Item;
use App\User;
use App\Basket;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CanActionOrderTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function can_add_an_item_to_a_basket()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($item, $quantity = 1);

        $this->assertEquals(1, $basket->totalItems());
    }

    /** @test */
    function can_remove_an_item_from_a_basket()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($item);

        $this->assertEquals(1, $basket->totalItems());

        $basket->removeItem($item);

        $this->assertEquals(0, $basket->totalItems());
    }

    /** @test */
    function can_add_multiple_of_one_product()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($item, $quantity = 5);

        $this->assertEquals(5, $basket->totalItems());
    }

    /** @test */
    function can_remove_one_item_from_multiple_quantity_items()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($item, $quantity = 5);

        $this->assertEquals(5, $basket->totalItems());
        $basket->removeItem(1);

        $this->assertEquals(4, $basket->totalItems());
    }

    /** @test */
    function can_remove_item_entirely()
    {
        $user = factory(User::class)->create();
        $item = factory(Item::class)->create();

        $basket = Basket::forUser($user)
            ->addItem($item, $quantity = 5);

        $this->assertEquals(5, $basket->totalItems());
        $basket->removeItem($item, 5);

        $this->assertEquals(0, $basket->totalItems());
        $this->assertDatabaseMissing('basket_item', ['item_id' => 1, 'basket_id' => 1]);
    }

    /** @test */
    function can_empty_whole_basket()
    {
        $user = factory(User::class)->create();
        $itemA = factory(Item::class)->create();
        $itemB = factory(Item::class)->create();
        $itemC = factory(Item::class)->create();
        $itemD = factory(Item::class)->create();

        $basket = Basket::forUser($user);
        $basket->addItem($itemA);
        $basket->addItem($itemB);
        $basket->addItem($itemC);
        $basket->addItem($itemD);

        $this->assertEquals(4, $basket->totalItems());
        
        $basket->removeAllItems();

        $this->assertEquals(0, $basket->totalItems());
    }
}
