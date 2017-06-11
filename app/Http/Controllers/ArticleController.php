<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Article;
use App\User;
use Auth;

class ArticleController extends Controller
{
    public function index(Article $article)
    {
        $articles = $article->newest();
        return view('article.index', compact('articles'));
    }

    public function show(Article $article)
    {
        return view('article.view', compact('article'));
    }

    public function create()
    {
        return view('article.create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|unique:articles',
            'body'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ]);

        $article = Auth::user()->articles()->create($request->all());

        return redirect(route('admin.article.edit', $article))
            ->with('status', 'Article Added!');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect(route('admin.article.index'))
            ->with('status', 'Article destroyed!');
    }

    public function edit(Article $article)
    {
        return view('article.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $this->validate($request, [
            'title' => 'required|unique:articles,title,' . $article->id,
            'body'  => 'required|not_empty',
            'score' => 'nullable|numeric|digits_between:0,10',
        ]);

        $article->update($request->all());

        return redirect(route('admin.article.edit', $article))
            ->with('status', 'Article updated');
    }
}
