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
            'title' => 'required|unique:articles',
            // 'body'  => 'required|not_empty',
            'pages.subtitle.*'  => 'required|not_empty',
            'pages.body.*'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ];

        $article = $this->route()->parameter('article');

        if ($article && $article->exists()) {
            $rules['title'] = 'required|unique:articles,title,' . $article->id;
        }

        return $rules;
    }

    public function persist(User $user, Article $article = null)
    {
        if ($article && $article->exists()) {
            $article->updatePages(array_flatten($this->only('pages'), 1));
            $article->update($this->all());
            return $article;
        }

        $article = $user->articles()->create($this->all());

        $article->addPages(array_flatten($this->only('pages'), 1));

        return $article;
    }
}
