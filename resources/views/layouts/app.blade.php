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
    <link href="{{ mix('css/vendor.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

    <script>
        window.mikeshellard = {
            user: {!! collect(auth()->user())->only('name', 'id', 'email')->toJson() !!},
            api_token: '{!! collect(auth()->user())->get('api_token') !!}',
            csrf_token: '{{ csrf_token() }}'
        };
    </script>
</head>

<body class="site" id="app-container" v-cloak>
    <nav class="navbar is-info highlight-top-bar" role="navigation">
        <a href="/" class="navbar-brand">
            <h2 class="navbar-item is-size-4">Mike Shellard</h2>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </a>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a href="/" class="navbar-item{{ Request::path() == '/' ? ' is-active' : '' }}">
                    Home
                </a>

                <a href="/about-me" class="navbar-item{{ Request::path() == 'about-me' ? ' is-active' : '' }}">
                    About Me
                </a>

                <a href="/about-me/audio-gear" class="navbar-item{{ Request::path() == 'about-me/audio-gear' ? ' is-active' : '' }}">
                    Audio Gear
                </a>
            </div>
            
            @auth
                <div class="navbar-end" aria-label="dropdown navigation">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            <img src="{{ auth()->user()->gravatar['medium'] }}" class="image is-24x24">
                            &nbsp;
                            {{ auth()->user()->name }} 
                        </a>

                        <div class="navbar-dropdown is-right">
                            <a href="{{ url('/profile', [auth()->user()->slug]) }}" class="navbar-item">
                                <i class="fa fa-btn fa-user"></i>
                                &nbsp;
                                My Profile
                            </a>
                            <a href="{{ url(route('admin.article.index')) }}" class="navbar-item">
                                <i class="fa fa-btn fa-archive"></i>
                                &nbsp;
                                Article Management
                            </a>
                            <a href="{{ url(route('admin.article.create')) }}" class="navbar-item">
                                <i class="fa fa-btn fa-edit"></i>
                                &nbsp;
                                Add Article
                            </a>
                            <hr class="navbar-divider">
                            <a href="{{ url('/logout') }}" class="navbar-item">
                                <i class="fa fa-btn fa-sign-out-alt"></i>
                                &nbsp;
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            @else
                <div class="navbar-end">
                    <a href="/login" class="navbar-item">
                        <i class="fa fa-btn fa-sign-in-alt"></i>
                        &nbsp;
                        Login
                    </a>
                </div>
            @endauth
        </div>
    </nav>

    {{-- <section class="section site-content">
        <div class="container">
            
        </div>
    </section> --}}
    <div id="non-spa">
    @yield('content')
    </div>

    <div id="notify-message" v-if="!!alert" :transition="fade">
      <div class="alert"
           v-text="notification"
           :class="[alert ? ('alert-' + alert) : '']"
      ></div>
    </div>
    
    <component :is="view"
             v-ref:spa
             :on-load="onChildLoad"
             transition="fade"
             transition-mode="out-in"
    ></component>

    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
    @stack('loaded-scripts')
    <script src="{{ mix('js/spa-loader.js') }}"></script>
    
    <script>
    @stack('page-scripts')
    @if (session('status'))
        app.success("{{ session('status') }}");
    @endif
    </script>


    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered is-info">
                <p>
                    <span class="icon is-medium">
                        <a href="https://twitter.com/Azirius" target="_blank">
                            <span class="fa-stack">
                                <i class="fab fa-twitter fa-stack-1x"></i>
                            </span>
                        </a>
                    </span>
                    <span class="icon is-medium">
                        <a href="https://www.facebook.com/Azirius" target="_blank">
                            <span class="fa-stack">
                                <i class="fab fa-facebook-f fa-stack-1x"></i>
                            </span>
                        </a>
                    </span>
                    <span class="icon is-medium">
                        <a href="https://github.com/Azirius" target="_blank">
                            <span class="fa-stack">
                                <i class="fab fa-github fa-stack-1x"></i>
                            </span>
                        </a>
                    </span>
                </p>
                
                <p class="copyright text-muted">Copyright &copy; Mike Shellard THIS YEAR</p>
            </div>
        </div>
    </footer>
</body>
