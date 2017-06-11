                    {!! BootForm::text('Title', 'title') !!}
                    
                    {!! BootForm::select('Score', 'score', ['' => 'Choose a score'] + range(0,10)) !!}
                        
                    {!! BootForm::textarea('Body', 'body')->id('summernote') !!}

                    {!! BootForm::submit("<i class=\"fa fa-btn fa-pencil\"></i> $tense Article")->addClass('btn-primary') !!}

                    <a href="{{ route('admin.article.index') }}" class="btn btn-danger">
                        <i class="fa fa-ban"></i>
                        Cancel
                    </a>
@push('page-scripts')
    $(function() {
            var actual = $('textarea[name="body"]');

            actual.attr('required', false)
                .hide();

            var editor = $('#summernote').summernote({
                height: 500,
                defaultFontName: 'Tahoma',
                codemirror: {
                    theme: 'monokai'
                }
            });

            editor.summernote('code', actual.val());

            actual.parents('form:first').on('submit', function(e) {
                actual.val(editor.summernote('code'));
            });

            focus_caret($('input[name="title"]'));
        });
@endpush
