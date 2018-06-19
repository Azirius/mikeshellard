<div class="field">
    <div class="control m-b-md">
        <label class="label">Subtitle</label>
        <input type="text" 
            name="subtitle[]" 
            class="input{{ $errors->first('subtitle.' . $index, ' is-danger') }}"
            placeholder="Subtitle" 
            value="{{ old('subtitle.' . $index, $page->subtitle) }}"
        >
        @if ($errors->first('subtitle.' . $index))
        <div class="help is-danger">
            {{ $errors->first('subtitle.' . $index, 'You need to provide a subtitle') }}
        </div>
        @endif
    </div>
    <div class="control">
        <label class="label">Page Content</label>
        @if ($errors->first('body.' . $index))
        <div class="help is-danger has-text-left">{{ $errors->first('body.' . $index, 'You need to provide a body for this page.') }}</div>
        @endif
        <textarea type="text" 
            class="summernote textarea" 
            name="body[]" 
            placeholder="Post content"
        >
            {{ old('body.' . $index, $page->body) }}
        </textarea>
    </div>
</div>
