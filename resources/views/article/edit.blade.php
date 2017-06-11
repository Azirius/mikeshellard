@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-11 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Edit Article</div>
                <div class="panel-body">
                    {!! BootForm::open()->action(route('admin.article.update', $article))->put() !!}
                        {{ BootForm::bind($article) }}
                        @include('article.partials.article-form', ['tense' => 'Update'])
                    {!! BootForm::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
