<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Article;
use App\ArticlePage;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;

class ArticleController extends Controller
{
    public function index(Article $article)
    {
        return view('article.index');
    }

    public function show(Article $article)
    {
        $comments = $article->comments;
        $featuredComment = $article->featuredComment();

        return view('article.view', compact('article', 'comments', 'featuredComment'));
    }

    public function create()
    {   
        $pages = Article::preparePages(collect(['body' => old('body'), 'subtitle' => old('subtitle')]));

        // print_r(old('subtitle')) . '<br>';
        // print_r(old('body')) . '<br>';
        // print_r($pages);

        return view('article.create', compact('pages'));
    }

    public function store(ArticleRequest $request)
    {
        $article = $request->persist(Auth::user());

        return redirect(route('admin.article.edit', $article))
            ->with('status', 'Your new article has been created!');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect(route('admin.article.index'))
            ->with('status', 'The article has been wiped from the system!');
    }

    public function edit(Article $article)
    {
        return view('article.edit', compact('article'));
    }

    public function update(ArticleRequest $request, Article $article)
    {
        return redirect(route('admin.article.edit', $request->persist(Auth::user(), $article)))
            ->with('status', 'Article has been successfully updated!');
    }
}
