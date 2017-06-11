<?php

namespace App;

class Score
{
    protected $number;

    public function __construct($number)
    {
        $this->number = $number;
    }
    
    public function asPercentageOf($maximumNumber)
    {
        return floor((100 / $maximumNumber) * $this->number);
    }

    public function __toString()
    {
        return $this->number;
    }
}
