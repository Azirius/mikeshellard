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

mix.webpackConfig(webpack => {
    return {
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'imports-loader?window.Quill=quill',
                include: path.resolve('./node_modules/quill-image-resize-module')
            }]
        }
    };
});

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
        'node_modules/jquery/dist/jquery.js',
        'node_modules/summernote/dist/summernote-lite.js',
    ],
    'public/js/vendor.js'
);
mix.styles('node_modules/summernote/dist/summernote-lite.css', 'public/css/summernote-lite.css');
mix.copy('node_modules/summernote/dist/font', 'public/css/font');
mix.styles('node_modules/mikeshellard-theme/dist/login.css', 'public/css/login.css');
mix.js('resources/assets/js/app.js', 'public/js/app.js');

mix.version();
