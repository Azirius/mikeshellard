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
    <link rel="stylesheet" href="dist/login.css">
    <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
</head>

<body>
    <section class="hero is-fullheight is-login-page has-text-centered">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <form action="/">
                        <div class="is-login-header">
                            <h3 class="title has-text-grey">Login</h3>
                            <p class="subtitle has-text-grey">Login to access more stuff</p>
                        </div>
                        <div class="is-boxed-form">
                                    
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input type="email" class="input is-m" name="email" placeholder="Your Email">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <div class="is-login-footer">
                                <div class="field is-grouped has-flex-end">
                                    <div class="control">
                                        <button class="button is-link is-submit">Submit</button>
                                    </div>
                                    <div class="control">
                                        <a href="/" class="button is-text is-cancel">Cancel</a>
                                    </div>
                                </div>
                            </div>    
                        </div>

                        <div class="has-text-centered is-fullwidth is-form-footer">
                            <a href="/sign-up">Sign Up</a>
                            &nbsp; &bull; &nbsp;
                            <a href="/sign-up/help-no-password">No Password?</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
</body>
