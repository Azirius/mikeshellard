<?php

namespace App;

use Reflex\QueryFiltering\QueryFilters;
use Illuminate\Database\Eloquent\Builder;

class ArticleFilters extends QueryFilters
{
    /**
     * Order by user name.
     *
     * @param  string $order
     * @return Builder
     */
    public function filtersOnName($order = 'desc')
    {
        $user = function ($query) use ($order) {
            $query->orderBy('users.name', $order);
        };

        return $this->builder->with(compact('user'));
    }

    /**
     * Search by title.
     *
     * @param  string $string
     * @return Builder
     */
    public function filtersOnSearch($string = null)
    {
        return $this->builder->where('title', 'like', "{$string}%")
            ->orWhere('body', 'like', "%{$string}%");
    }

    /**
     * Order by title
     *
     * @param string $order
     * @return Builder
     */
    public function filtersOnTitle($order = 'asc')
    {
        return $this->builder->orderBy('title', $order);
    }

    /**
     * Order by created date.
     *
     * @param  string $order
     * @return Builder
     */
    public function filtersOnCreated($order = 'asc')
    {
        return $this->builder->orderBy('created_at', $order);
    }
}
