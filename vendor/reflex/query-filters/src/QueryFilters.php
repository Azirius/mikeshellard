<?php

namespace Reflex\QueryFiltering;

use ReflectionClass;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

abstract class QueryFilters
{
    /**
     * The request object.
     *
     * @var Request
     */
    protected $request;

    /**
     * The builder instance.
     *
     * @var Builder
     */
    protected $builder;

    /**
     * The reflection instance.
     *
     * @var ReflectionClass
     */
    protected $reflector;

    /**
     * Create a new QueryFilters instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Apply the filters to the builder.
     *
     * @param  Builder $builder
     * @return Builder
     */
    public function apply(Builder $builder)
    {
        $this->builder   = $builder;
        $this->reflector = new ReflectionClass($this);

        $this->filters()->map(function ($value, $key) {
            $methodName = $this->buildMethodName($key);

            if (! $this->isFilterableMethod($methodName)) {
                return;
            }

            if (strlen($value)) {
                call_user_func([$this, $methodName], $value);
                return;
            }

            call_user_func([$this, $methodName]);
        });

        return $this->builder;
    }

    /**
     * Is method filterable?
     *
     * @var string $methodName
     * @return boolean
     */
    protected function isFilterableMethod($methodName)
    {
        try {
            return $this->reflector->getMethod($methodName)->isPublic();
        } catch (\ReflectionException $e) {
            return false;
        }
    }

    /**
     * Create method name from key
     *
     * @var string $key
     * @return string
     */
    protected function buildMethodName($key)
    {
        return 'filtersOn' . studly_case($key);
    }

    /**
     * Get all request filters data.
     *
     * @return array
     */
    public function filters()
    {
        return collect($this->request->all());
    }
}
