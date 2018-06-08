const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.browserSync({
    proxy: 'mikeshellard.test',
    browser: "google chrome canary"
});

// mix.copy('resources/assets/less/font-awesome-4.6.3/fonts', 'public/css/font');
mix.copy('resources/assets/bower/summernote/dist/font', 'public/css/font');
// mix.copy('resources/assets/bower/bootstrap/fonts', 'public/css/font');

mix.sass('resources/assets/less/app.scss', 'public/css');
mix.scripts(
    [
        'resources/assets/bower/jquery/dist/jquery.js',
        'resources/assets/bower/summernote/dist/summernote.js',
        'resources/assets/bower/tether/dist/js/tether.js',
        'resources/assets/bower/bootstrap/dist/js/bootstrap.js'
    ],
    'public/js/vendor.js'
);
mix.styles('resources/assets/bower/summernote/dist/summernote.css', 'public/css/vendor.css');
mix.styles('node_modules/mikeshellard-theme/dist/login.css', 'public/css/login.css');
mix.js('resources/assets/js/app.js', 'public/js/app.js');
mix.js('resources/assets/js/spa-loader.js', 'public/js/spa-loader.js');

mix.version();
