        <nav class="navbar is-info highlight-top-bar" role="navigation">
            <div class="navbar-brand">
                <a href="/" class="navbar-item is-size-4">
                    Mike Shellard
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
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
                                <img src="{{ auth()->user()->gravatar['medium'] }}" class="image is-24x24 avatar">
                                &nbsp;
                                {{ auth()->user()->name }} 
                            </a>
        
                            <div class="navbar-dropdown is-right">
                                <a href="{{ url('/dashboard') }}" class="navbar-item">
                                    <i class="fa fa-btn fa-user-cog"></i>
                                    &nbsp;
                                    My Dashboard
                                </a>
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
