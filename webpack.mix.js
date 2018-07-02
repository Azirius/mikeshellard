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
    proxy: 'http://mikeshellard.test/',
    host: 'mikeshellard.test',
    open: 'external',
    browser: 'google chrome canary',
    notify: false
});

mix.sass('resources/assets/less/app.scss', 'public/css');
mix.scripts(
    [
        'node_modules/jquery/dist/jquery.js'
    ],
    'public/js/vendor.js'
);

mix.styles('node_modules/mikeshellard-theme/dist/login.css', 'public/css/login.css');
mix.js('resources/assets/js/app.js', 'public/js/app.js');
mix.js('resources/assets/js/spa-loader.js', 'public/js/spa-loader.js');

mix.version();
