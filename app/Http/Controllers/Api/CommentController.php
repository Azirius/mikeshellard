<?php

namespace App\Http\Controllers\Api;

use App\Article;
use App\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Article $article)
    {
        $comment = Comment::create([
            'body' => $request->body,
            'user_id' => Auth::id(),
            'article_id' => $article->id,
        ]);

        if ($request->wantsJson()) {
            return $comment;
        }
        
        return redirect('/article/' . $article->slug);
    }

    public function feature(Request $request, Comment $comment)
    {
        $comment->feature();

        if ($request->wantsJson()) {
            return $comment;
        }

        return redirect('/article/' . $comment->article->slug);
    }
}
