<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>My Site</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poiret One:100,300,400,700">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli:100,300,400,700">

    <!-- Styles -->
    <link href="{{ mix('css/vendor.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <script>
        window.mikeshellard = {
            user: {!! collect(auth()->user())->only('name', 'id', 'email')->toJson() !!},
            api_token: '{!! collect(auth()->user())->get('api_token') !!}'
        };
    </script>

    <style>
        .jumbotron {
            font-family: 'Poiret One';
        }

        body {
            font-family: 'Muli';
            margin-bottom: 50px;
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body id="app-container" v-cloak>
    <nav class="navbar navbar-default navbar-static-top navbar-inverse">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="/">
                    My Site
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li><a href="/">Home</a></li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::check())
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle prevent" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ auth()->user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/profile', [auth()->user()->slug]) }}"><i class="fa fa-btn fa-user"></i>My Profile</a></li>
                                <li><a href="{{ url(route('admin.article.index')) }}"><i class="fa fa-btn fa-archive"></i>Article Management</a></li>
                                <li><a href="{{ url(route('admin.article.create')) }}"><i class="fa fa-btn fa-pencil"></i>Add Article</a></li>
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

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
</body>
</html>
