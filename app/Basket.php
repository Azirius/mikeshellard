<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    /**
     * Fillable attributes
     * @var array
     */
    protected $fillable = ['user_id'];

    /**
     * Create a basket for the user
     * @param  integer $user_id User ID to create instance
     * @return Basket
     */
    public static function forUser($user_id)
    {
        return self::firstOrCreate(['user_id' => $user_id]);
    }

    /**
     * Add an item to the basket
     * @param integer|Item    $item     Item being added to basket
     * @param integer         $quantity How many of the item to add to the basket
     * @return Basket
     */
    public function addItem($item_id, $quantity = 1)
    {
        $this->items()->attach($this->normalizeId($item_id), compact('quantity'));

        return $this;
    }

    /**
     * Remove an item from the basket
     * @param  integer|Item  $item_id  ID of item or an instance of Item model
     * @param  integer $quantity Quantity to remove
     * @return Basket
     */
    public function removeItem($item_id, $quantity = 1)
    {
        $item_id = $this->normalizeId($item_id);

        \DB::table('basket_item')->where('item_id', $item_id)
            ->where('basket_id', $this->id)
            ->decrement('quantity', $quantity);

        if (1 > $this->quantityForItem($item_id)) {
            $this->items()->detach(Item::find($item_id));
        }

        return $this;
    }

    /**
     * Remove all items from the basket
     * @return Basket
     */
    public function removeAllItems()
    {
        $this->items()->sync([]);

        return $this;
    }

    /**
     * Get the total quantity of items
     * @return integer
     */
    public function totalItems()
    {
        return $this->items()->sum('quantity');
    }

    /**
     * Get the quantity for a given item
     * @param  integer|Item $item_id ID of item or an instance of Item model
     * @return integer
     */
    public function quantityForItem($item_id)
    {
        return $this->items()->where('item_id', $this->normalizeId($item_id))->sum('quantity');
    }

    /**
     * Get all the current items
     * @return collection
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * Normalize an ID, if an Item model is passed retrieve the ID off of the model
     * @param  integer|Item $item_id Item ID to normalize
     * @return integer
     */
    protected function normalizeId($item_id)
    {
        return $item_id instanceof Item ? $item_id->id : $item_id;
    }

    /**
     * Item relationships
     * @return BelongsToMany
     */
    public function items()
    {
        return $this->belongsToMany(Item::class)->withPivot('quantity');
    }
}
