<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        
        <title>Mike Shellard</title>

        <!-- Theme CSS -->
        <link href="{{ mix('css/summernote-lite.css') }}" rel="stylesheet">
        <link href="{{ mix('css/fontawesome-free-all.css') }}" rel="stylesheet">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        <script>
            window.mikeshellard = {
                user: {!! collect(auth()->user())->only('name', 'id', 'email', 'gravatar', 'slug')->toJson() !!},
                api_token: '{!! collect(auth()->user())->get('api_token') !!}',
                csrf_token: '{{ csrf_token() }}'
            };
        </script>
    </head>

    <body class="site">
        <div id="app-container" class="site-container">
            @include('layouts._nav')
            
            <fade-transition>
                <div id="notify-message">
                    {{-- <article class="m-md p-md message is-small" v-if="!! alert" :class="[alert ? ('is-' + alert) : '']">
                        <div class="message-body" v-html="notification"></div>
                    </article> --}}
                    <div class="notification m-md p-md"
                    v-html="notification"
                    v-if="!!alert"
                    :class="[alert ? ('is-' + alert) : '']"
                    ></div>
                </div>
            </fade-transition>

            <fade-transition>
                <component :is="view"
                         ref="spa"
                         :on-load="onChildLoad"
                         class="site-container"
                ></component>
            </fade-transition>
            
            <fade-transition>
                <div class="has-text-centered m-t-xxl m-b-xxl" v-if="loading" style="z-index: 4">
                    <div class="is-loading"></div>
                    <br>
                    <div class="m-xl has-text-info has-text-weight-bold">The page is loading!</div>
                </div>
            </fade-transition>

            
            <footer class="footer">
                <div class="container">
                    <div class="content has-text-centered is-info">
                        <p>
                            <span class="icon is-medium">
                                <a href="https://twitter.com/Azirius" class="prevent">
                                    <span class="fa-stack">
                                        <i class="fab fa-twitter fa-stack-1x"></i>
                                    </span>
                                </a>
                            </span>
                            <span class="icon is-medium">
                                <a href="https://www.facebook.com/Azirius" class="prevent">
                                    <span class="fa-stack">
                                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                                    </span>
                                </a>
                            </span>
                            <span class="icon is-medium">
                                <a href="https://github.com/Azirius" class="prevent">
                                    <span class="fa-stack">
                                        <i class="fab fa-github fa-stack-1x"></i>
                                    </span>
                                </a>
                            </span>
                        </p>
                        
                        <p class="copyright text-muted">Copyright &copy; Mike Shellard 2018</p>
                    </div>
                </div>
            </footer>
        </div>
    </body>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
    <script>
    @if (session('status'))
        app.success("{{ session('status') }}");
    @endif
    </script>
</html>
