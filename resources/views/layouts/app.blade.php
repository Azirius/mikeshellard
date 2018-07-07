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
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" 
        integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" 
        crossorigin="anonymous">

    <script>
        window.mikeshellard = {
            user: {!! collect(auth()->user())->only('name', 'id', 'email', 'gravatar')->toJson() !!},
            api_token: '{!! collect(auth()->user())->get('api_token') !!}',
            csrf_token: '{{ csrf_token() }}'
        };
    </script>
</head>

<body class="site">
    <div id="app-container" class="site-container" v-cloak>
        @include('layouts._nav')
        
        <div id="non-spa" class="site-container">
        @yield('content')
        </div>
        
        <transition name="fade" mode="out-in">
            <div id="notify-message" v-if="!!alert" transition="fade">
              <div class="notification"
                   v-html="notification"
                   :class="[alert ? ('is-' + alert) : '']"
              ></div>
            </div>
        </transition>
        
        <transition name="fade" mode="out-in">
            <component :is="view"
                     ref="spa"
                     :on-load="onChildLoad"
                     class="site-container"
            ></component>
        </transition>
        
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
@stack('loaded-scripts')
<script>
@stack('page-scripts')
@if (session('status'))
    app.success("{{ session('status') }}");
@endif
</script>
</html>
