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
            'subtitle.*'  => 'required',
            'body.*'  => 'required|not_empty',
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
        $pages = Article::preparePages($this);

        if ($article && $article->exists()) {
            $article->updatePages($pages);
            $article->update($this->except(['body', 'subtitle']));
            return $article;
        }

        $article = $user->articles()->create($this->except(['body', 'subtitle']));

        $article->addPages($pages);

        return $article;
    }
}
