<?php

namespace Tests\Unit;

use App\Score;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ScoreTest extends TestCase
{
    /** @test */
    function can_generate_a_percentage()
    {
        $scoreA = new Score(4.5);
        $scoreB = new Score(10);
        $scoreC = new Score(100);
        
        $percentageA = $scoreA->asPercentageOf(9);
        $percentageB = $scoreB->asPercentageOf(20);
        $percentageC = $scoreC->asPercentageOf(100);

        $this->assertEquals(50, $percentageA);
        $this->assertEquals(50, $percentageB);
        $this->assertEquals(100, $percentageC);
    }
    /** @test */
    public function percentages_generated_are_floor_value()
    {
        $score = new Score(3.33);

        $percentage = $score->asPercentageOf(10);

        $this->assertEquals(33, $percentage);
    }
}
