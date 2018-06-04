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
    <link rel="stylesheet" href="dist/app.css">
    <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
</head>

<body class="site">
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
                <a href="/" class="navbar-item is-active">
                    Home
                </a>

                <a href="/about-me" class="navbar-item">
                    About Me
                </a>

                <a href="/about-me/audio-gear" class="navbar-item">
                    Audio Gear
                </a>
            </div>

            <div class="navbar-end" aria-label="dropdown navigation">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        <img src="https://www.gravatar.com/avatar/9c98a2270587529643b0b3c0f18df548?s=100" class="image is-32x32">
                        &nbsp;
                        Mike
                    </a>

                    <div class="navbar-dropdown is-right">
                        <a href="/profile/mike" class="navbar-item">
                            <i class="fa fa-btn fa-user"></i>
                            &nbsp;
                            My Profile
                        </a>
                        <a href="/admin/article" class="navbar-item">
                            <i class="fa fa-btn fa-archive"></i>
                            &nbsp;
                            Article Management
                        </a>
                        <a href="/admin/article/create" class="navbar-item">
                            <i class="fa fa-btn fa-edit"></i>
                            &nbsp;
                            Add Article
                        </a>
                        <hr class="navbar-divider">
                        <a href="/logout" class="navbar-item">
                            <i class="fa fa-btn fa-sign-out-alt"></i>
                            &nbsp;
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <section class="section site-content">
        <div class="container">
            <h1 class="title">Hello World</h1>
            <h2 class="subtitle">Posted Today!</h2>
            <hr>
            <p class="subtitle">Hello World</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, minus laboriosam recusandae quis fugiat atque doloribus temporibus alias officiis! Animi, culpa, molestias. Hic non magnam eum laborum, id, nulla eveniet?
                <figure class="image is-16by9">
                    <img src="/images/stock.jpg" style="-webkit-transform: rotate(-180deg)" alt="">
                </figure>
            </p>
        </div>
    </section>


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

<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
            // Add a click event on each of them
            $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {
                    // Get the target from the "data-target" attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);

                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }

        });
</script>
