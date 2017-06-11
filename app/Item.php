<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function basket()
    {
        return $this->belongsToMany(Basket::class)->withPivot('quantity');
    }
}
