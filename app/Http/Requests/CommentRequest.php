<?php

namespace App\Http\Requests;

use App\User;
use App\Comment;
use Illuminate\Support\Facades\Auth;

class CommentRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'body'  => 'required|not_empty',
        ];
    }

    public function messages()
    {
        return [
            'body'  =>  'You cannot leave an empty comment!',
        ];
    }

    public function persist(User $user, Comment $comment = null)
    {
        if ($comment && $comment->exists()) {
            $comment->update($this->all());
            return $comment;
        }
        
        return $user->comments()->create(
            $this->all() + 
            ['article_id' => $this->route()->parameter('article')->id]
        );
    }
}
