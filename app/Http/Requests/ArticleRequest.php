<?php

namespace App\Http\Requests;

use App\User;
use App\Article;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Purify\Facades\Purify;

class ArticleRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title'             => 'required|unique:articles',
            'pages'             => 'min:1',
            'pages.*.subtitle'  => 'required',
            'pages.*.body'      => 'required|not_empty',
        ];

        $article = $this->route()->parameter('article');

        if ($article && $article->exists()) {
            $rules['title'] = 'required|unique:articles,title,' . $article->id;
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'pages.min' => 'There must be a minimum of one page',
            'pages.*.subtitle.*'  =>  'Each and every page needs a subtitle.',
            'pages.*.body.*'      =>  'The body cannot be empty!',
        ];
    }

    public function persist(User $user, Article $article = null)
    {
        $pages = collect($this->pages)->map(function ($page)
        {
            $page['body'] = Purify::clean($page['body']);
            return $page;
        })->toArray();

        if ($article && $article->exists()) {
            $article->updatePages($pages);
            $article->update($this->except(['pages']));
            return $article->fresh();
        }

        $article = $user->articles()->create($this->except(['pages']));
        $article->addPages($pages);

        return $article;
    }
}
