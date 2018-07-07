<?php

namespace App\Http\Requests;

use App\User;
use App\Article;
use Illuminate\Support\Facades\Auth;

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
            'pages.*.subtitle.*'  =>  'Each and every page needs a subtitle.',
            'pages.*.body.*'      =>  'The body cannot be empty!',
        ];
    }

    public function persist(User $user, Article $article = null)
    {
        if ($article && $article->exists()) {
            $article->updatePages($this->pages);
            $article->update($this->except(['pages']));
            return $article->fresh();
        }

        $article = $user->articles()->create($this->except(['pages']));
        $article->addPages($this->pages);

        return $article;
    }
}
