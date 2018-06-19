<html>
    <head>
        <title>Pagination</title>

        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    </head>
    <body>
        <div class="container m-t-m" id="app-container">
            <h1 class="title">Pagination Stuff</h1>
            <pagination :items="['one', 'two', 'three', 'four', 'five', 'six', 'seven']" :per-page="2">
                <template slot="pagination-item" slot-scope="props">
                    <div class="is-info">@{{ props.item }}</div>
                </template>
            </pagination>
        </div>
    </body>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/pagination-page-only.js') }}"></script>
</html>
