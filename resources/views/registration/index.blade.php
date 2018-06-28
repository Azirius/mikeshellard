<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title>Mike Shellard &dash; Register</title>

    <!-- Theme CSS -->
    
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/login.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

    <script>
        window.mikeshellard = {
            user: {!! collect(auth()->user())->only('name', 'id', 'email')->toJson() !!},
            api_token: '{!! collect(auth()->user())->get('api_token') !!}',
            csrf_token: '{{ csrf_token() }}'
        };
    </script>
</head>

<body>
    <section class="hero is-fullheight is-login-page has-text-centered">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <form action="/register" method="POST">
                        {{ csrf_field() }}
                        <div class="is-login-header">
                            <h3 class="title has-text-grey">Register</h3>
                            <p class="subtitle has-text-grey">Register to access more stuff</p>
                        </div>
                        <div class="is-boxed-form">
                                    
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input type="text" class="input is-m{{ $errors->first('name') ? ' is-danger':'' }}" name="name" placeholder="Your Name" value="{{ old('name') }}" required>
                                    <span class="icon is-small is-left">
                                        <i class="far fa-id-card"></i>
                                    </span>
                                </div>
                                @if ($errors->first('name'))
                                <div class="help is-danger has-text-left">{{ $errors->first('name') }}</div>
                                @endif
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <input type="email" class="input is-m{{ $errors->first('email') ? ' is-danger':'' }}" name="email" placeholder="Your Email" value="{{ old('email') }}" required>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                                @if ($errors->first('email'))
                                <div class="help is-danger has-text-left">{{ $errors->first('email') }}</div>
                                @endif
                            </div>
                            
                            <div class="is-login-footer">
                                <div class="field is-grouped has-flex-end">
                                    <div class="control">
                                        <button class="button is-link is-submit">Register</button>
                                    </div>
                                    <div class="control">
                                        <a href="/" class="button is-text is-cancel">Cancel</a>
                                    </div>
                                </div>
                            </div>    
                        </div>

                        <div class="has-text-centered is-fullwidth is-form-footer">
                            <a href="/login">Or Login</a>
                            &nbsp; &bull; &nbsp;
                            <a href="/help/no-password">No Password?</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
</body>
