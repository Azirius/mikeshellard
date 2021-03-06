@extends('layouts.app')

@section('content')
<div>
    <div class="field is-hidden" id="clonable-textarea">
        <div class="control m-b-md">
            <label class="label">Subtitle</label>
            <input type="text" 
                name="subtitle[]" 
                class="input"
                placeholder="Subtitle"
            >
        </div>
        <div class="control">
            <editor name="body[]"></editor>
        </div>
    </div>
    <section class="hero is-medium is-info">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">
                    Editing '{{ $article->title }}'
                </h1>
            </div>
        </div>
    </section>
    <section class="section site-content">
        <div class="container container-into-hero">
            <div class="card">
                <div class="card-content">
                    {{ json_encode(request()->old()) }}
                    <form action="/admin/article/{{ $article->slug }}" method="post">
                        {{ csrf_field() }}
                        {{ method_field('PUT') }}

                        <div class="field">
                            <div class="control">
                                <label class="label" for="title">Title</label>
                                <input type="text" 
                                    class="input is-l{{ $errors->first('title', ' is-danger') }}" 
                                    value="{{ old('title', $article->title) }}" 
                                    name="title" 
                                    placeholder="Title"
                                >
                                @if ($errors->first('title'))
                                <div class="help is-danger">
                                    {{ $errors->first('title') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        
                        <div id="pages-container">
                            @if (0 === count($article->pages))
                                @include('article._form_page_partial', ['index' => 0, 'page' => new App\ArticlePage])
                            @else
                                @foreach($article->pages as $index => $page)
                                    @include('article._form_page_partial', ['index' => $index, 'page' => $page])
                                @endforeach
                            @endif
                        </div>

                        <div class="field has-hero-background m-t-md">
                            <div class="control">
                                <button class="button is-info" id="addPage">Add Page</button>
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link is-submit">Update Article</button>
                            </div>
                            <div class="control">
                                <a href="/admin/article" class="button is-text is-cancel">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@push('page-scripts')
    $(function() {
        var clonableTextarea = $('#clonable-textarea');

        $('#addPage').click(function (e) {
            e.preventDefault();
            var elementBeingAdded = clonableTextarea.clone();
            elementBeingAdded.removeClass('is-hidden')
                .removeAttr('id');
            $('#pages-container .field:last-child').after(elementBeingAdded);
            
            {{-- elementBeingAdded.find('textarea').attr('name', 'body[]'); --}}

            var inputBeingAdded = elementBeingAdded.find('.input');
            {{-- inputBeingAdded.attr('name', 'subtitle[]'); --}}
        });

        $(window).on('submit', function(e) {
        });
    });
@endpush
