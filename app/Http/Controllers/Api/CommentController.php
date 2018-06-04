<?php

namespace App\Http\Controllers\Api;

use App\Article;
use App\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Article $article)
    {
        $comment = $request->persist(Auth::user());

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
