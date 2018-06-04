var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less')
        .scripts([
            '../bower/jquery/dist/jquery.js',
            '../bower/summernote/dist/summernote.js',
            '../bower/tether/dist/js/tether.js',
            '../bower/bootstrap/dist/js/bootstrap.js'
        ], 'public/js/vendor.js')
        .styles(['../bower/summernote/dist/summernote.css'], 'public/css/vendor.css')
       .browserify(['app.js'])
       .browserify(['spa-loader.js'], 'public/js/spa-loader.js')
       .version(['css/app.css', 'css/vendor.css', 'js/bundle.js', 'js/vendor.js', 'js/spa-loader.js'])
       .copy('resources/assets/bower/summernote/dist/font', 'public/build/css/font')
       .copy('resources/assets/less/font-awesome-4.6.3/fonts', 'public/build/css/font');
});
