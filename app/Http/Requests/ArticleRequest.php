<?php

namespace App\Http\Requests;

use App\Article;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title' => 'required|unique:articles',
            'body'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ];

        $article = $this->route()->parameter('article');

        if ($article && $article->exists()) {
            $rules['title'] = 'required|unique:articles,title,' . $article->id;
        }

        return $rules;
    }

    public function persist(Article $article = null)
    {
        if ($article && $article->exists()) {
            $article->update($this->all());
            return $article;
        }

        return Auth::user()->articles()->create($this->all());
    }
}
