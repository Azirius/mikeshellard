@extends('layouts.app')

@section('content')
<div id="articles" v-cloak>
    <new-article-modal :show.sync="displayNewArticleModal"></new-article-modal>
    <edit-article-modal :show.sync="displayEditArticleModal"></edit-article-modal>
    <delete-article-modal :show.sync="displayDeleteArticleModal"></delete-article-modal>

    <div class="jumbotron">
        <div class="container">
            <h1>Article Management</h1>
            <hr>
            <ul class="list-inline">
                <li>
                    <button class="btn btn-primary" @click.prevent="showNewArticleModal()">
                    <i class="fa fa-pencil"></i>
                    Create new Article    
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <div class="container">
        <div class="alert alert-info" v-if="articleMessage" transition="fade">
            @{{ articleMessage }}
        </div>

        <div class="alert alert-info" v-if="articles.length == 0">
            There are no posts
        </div>

        <div v-for="article in articles | orderBy 'created_at' -1" transition="fade" track-by="$index">
            <h1>@{{ article.title }}</h1>
            <hr>
            <div class="row">
                <div class="col-md-8">
                    @{{{ article.body }}}
                </div>
                <div class="col-md-4">
                    <div class="btn-group">
                        <button href="@{{ article.slug }}" 
                                id="edit-article-@{{ article.id }}"
                                class="btn btn-info"
                                @click="showEditArticleModal(article)"
                        >
                            <i class="fa fa-btn fa-pencil"></i>Edit
                        </button>
                        <button href="@{{ article.slug }}"
                                id="edit-article-@{{ article.id }}"
                                class="btn btn-danger"
                                @click="showDeleteArticleModal(article)"
                        >
                            <i class="fa fa-btn fa-trash"></i>Delete
                        </button>
                    </div>
                </div>
            </div>
            <hr v-if="$index < (articles.length - 1)">
        </div>
    </div>
</div>
@endsection

@push('loaded-scripts')
<script src="{{ mix('js/article.js') }}"></script>
@endpush
