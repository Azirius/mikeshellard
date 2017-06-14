<?php

namespace App\Http\Controllers;

use App\Article;
use App\Comment;
use Illuminate\Http\Request;
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

    public function feature(Comment $comment)
    {
        $comment->feature();

        return redirect('/article/' . $comment->article->slug);
    }
}
