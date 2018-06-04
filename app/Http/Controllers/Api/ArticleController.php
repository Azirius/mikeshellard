<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\Article;
use App\Http\Requests;
use App\ArticleFilters;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;

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
    public function store(ArticleRequest $request)
    {
        $success = true;
        $article = $request->persist(Auth::guard('api')->user());

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
    public function update(ArticleRequest $request, Article $article)
    {
        $article = $request->persist(Auth::guard('api')->user(), $article);
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
