<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Auth;
use App\Article;
use App\Http\Requests;
use App\ArticleFilters;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Article $article, ArticleFilters $filters)
    {
        if (request()->paginate) {
            return $article->filter($filters)->paginate(request()->paginate);
        }

        return $article->filter($filters)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|unique:articles',
            'body'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ]);

        $success = true;
        $article = Auth::guard('api')->user()->articles()->create($request->all());

        return json_encode(compact('article', 'success'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        return $article;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Article $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        $this->validate($request, [
            'title' => 'required|unique:articles,title,' . $article->id,
            'body'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ]);

        $article->update($request->all());
        $success = true;

        return json_encode(compact('article', 'success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return json_encode(['success' => true]);
    }
}
