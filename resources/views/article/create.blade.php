@extends('layouts.app')

@section('content')
<div>
    <div class="field is-hidden" id="clonable-textarea">
        <div class="control m-b-md">
            <label class="label">Subtitle</label>
            <input type="text" 
                name="" 
                class="input"
                placeholder="Subtitle"
            >
        </div>
        <div class="control">
            <textarea type="text" class="textarea" name="" placeholder="Post content"></textarea>
        </div>
    </div>
    <section class="hero is-medium is-info">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">
                    Create a new article
                </h1>
            </div>
        </div>
    </section>
    <section class="section site-content">
        <div class="container container-into-hero">
            <div class="card">
                <div class="card-content">
                    <div class="notification notification-info">
                        This page relies on JavaScript
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
