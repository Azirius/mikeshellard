<?php

namespace App;

class QuillTransformer
{
    protected $json;

    protected $styleMap = ['color' => 'color', 'background' => 'background-color'];
    
    public function __construct($json)
    {
        $this->json = $json;
    }

    protected function mapAttributeToStyle($attribute, $attributeKey)
    {
        if (isset($this->styleMap[$attributeKey])) {
            return "{$this->styleMap[$attributeKey]}: $attribute; ";
        }

        return false;
    }

    protected function operate($text, $operation = null, $attribute = null)
    {
        if (method_exists($this, $method = 'transformTo' . ucwords(strtolower($operation)))) {
            return $this->{$method}($text, $attribute);
        }

        var_dump($operation);
        if (! is_array($attribute)) {
            $attribute = [$operation => $attribute];
        }

        return "<span" . rtrim($this->toAttributeString($attribute)) . ">{$text}</span>";
    }

    protected function format()
    {
        $previousInsert = '';
        $i = 0;
        $pulls = [];
        $isList = false;

        $collection = collect(json_decode($this->json, true)['ops']);
        $formatted = $collection->map(function($element, $key) use (&$previousInsert, &$i, &$pulls, &$isList, $collection) {
                $insert = $element['insert'];
                $nextElement = isset($collection[$i + 1]) ? $collection[ $i + 1 ] : false;
                $previousElement = isset($collection[$i - 1]) ? $collection[ $i - 1 ] : false;

                if (empty($element['attributes'])) {
                    // if (!! $isList) {
                    //     $insert .= "</{$isList}>";
                    //     $isList = false;
                    // }
                    $insert = $insert;
                } else if (! empty($element['attributes']['header'])) {
                    // Previous element was supposed to be a header...
                    // if (!! $isList) {
                    //     $insert .= "</{$isList}>";
                    //     $isList = false;
                    // }
                    $insert = $this->transformToHeader($previousInsert, $element['attributes']['header']);
                    $pulls[] = $i-1;
                } else if (! empty($element['attributes']['list'])) {
                    // Previous element is a list item
                    $insert = $this->transformToListItem($previousInsert, $element['attributes']['list'], $isList);
                    $pulls[] = $i-1;
                } else if (! empty($insert['image'])) {
                    // if (!! $isList) {
                    //     $insert .= "</{$isList}>";
                    //     $isList = false;
                    // }
                    $insert = $this->operate($insert['image'], 'image', $element['attributes']);
                } else if (! empty($element['attributes'])) {
                    $element['attributes']['style'] = '';
                    
                    // if (!! $isList) {
                    //     $insert .= "</{$isList}>";
                    //     $isList = false;
                    // }

                    collect($element['attributes'])
                        ->each(function ($attributes, $operation) use (&$element) {
                            if ($operation !== 'style' && false !== ($style = $this->mapAttributeToStyle($attributes, $operation))) {
                                $element['attributes']['style'] .= $style;
                            }
                        });
                    collect($element['attributes'])
                        ->each(function ($attributes, $operation) use (&$insert, $element) {
                            if (! $this->mapAttributeToStyle($attributes, $operation)) {
                                $insert = $this->operate($insert, $operation, $attributes);
                            }
                        });

                }

                if ($isList 
                    && isset($nextElement['attributes']) 
                    && ! collect($nextElement['attributes'])->has('list')
                    && ! collect($previousElement['attributes'])->has('list')
                ) {
                    $insert .= "</{$isList}>";
                    $isList = false;
                }

                $i++;

                return $previousInsert = $insert;
            });


        collect($pulls)->each(function($key) use ($formatted) {
            $formatted->pull($key);
        });

        return nl2br($formatted->implode(''));
    }

    protected function transformToListItem($text, $attributes, &$listType)
    {
        $start = '';
        if (! $listType) {
            $listType = 'ordered' === $attributes ? 'ol' : 'ul';
            $start = "<{$listType}>";
        }

        return $start . "<li>{$text}</li>";
    }

    protected function transformToScript($text, $attributes) {
        return "<{$attributes}>{$text}</{$attributes}>";
    }

    protected function toAttributeString($attributes) {
        $string = '';

        foreach ($attributes as $attributeName => $attributeValue) {
            $string .= " {$attributeName}=\"$attributeValue\"";
        }

        return $string;
    }

    protected function transformToImage($src, $attributes)
    {
        $attributeString = $this->toAttributeString($attributes);

        return "<img src=\"{$src}\"{$attributeString}>";
    }

    protected function transformToHeader($text, $attribute)
    {
        return "<h{$attribute}>$text</h{$attribute}>";
    }

    protected function transformToBold($text)
    {
        return "<strong>{$text}</strong>";
    }

    protected function transformToItalic($text)
    {
        return "<em>{$text}</em>";
    }

    protected function transformToStrike($text)
    {
        return "<s>{$text}</s>";
    }

    protected function transformToUnderline($text)
    {
        return "<u>{$text}</u>";
    }

    protected function transformToLink($text, $attribute)
    {
        return "<a href=\"$attribute\">{$text}</a>";
    }

    public function transformToHtml()
    {
        return $this->format();
    }

    public function original()
    {
        return $this->json;
    }

    public function __toString()
    {
        return $this->transformToHtml();
    }
}
