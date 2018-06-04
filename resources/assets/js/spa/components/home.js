import queryString from 'query-string';
import HomeTemplate from './home.vue.html';
import Page from './Page.js';

export default Page.extend({
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'home',
                title: 'Home'
            },
            posts: [],
            loading_posts: false,
            field: 'created',
            reverse: true,
            columns: {
                published: 'created',
                title: 'title',
                author: 'name'
            },
            params: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false
        };
    },

    template: HomeTemplate,

    attached() {
        this.onLoad(this);

        let $window = $(window);
        let $stickyEl = $('#search');
        let elTop = $stickyEl.offset().top;

        $window.scroll(() => $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop));
    },

    detached() {
        this.removeScroll();
        this.resetPostData();
    },

    methods: {
        launch() {
            this.fetchNextPostSet();
            this.setUpScroll();
        },

        removeScroll() {
            $(window).off('scroll');
        },

        setUpScroll() {
            if ($('#bottom').isOnScreen()) {
                this.fetchNextPostSet();
            }

            $(window).scroll((() => {
                if (this.last_page) {
                    return;
                }

                if ($('#bottom').isOnScreen()) {
                    this.fetchNextPostSet();
                }
            }).debounce(1000))
        },

        addPostsToArray(response) {
            let posts = response.data.data;

            if (! posts || 0 === posts.length) {
                this.$root.info('You have reached the last page!');
                this.last_page = true;
            } else {
                posts.forEach(post => this.posts.push(post));
                this.params.page++;
            }

            this.loading_posts = false;
        },

        fetchNextPostSet() {
            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            let urlParameters = this.params;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            let queryStringCompiled = queryString.stringify(urlParameters);

            axios.get('/api/v1/article?' + queryStringCompiled)
                .then(this.addPostsToArray, response => this.$root.error(response.error));
        },

        resetPostData() {
            this.posts = [];
            this.params.page = 1;
            this.last_page = false;
        },

        sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.params[this.field];
            this.field = field;
            this.fetchNextPostSet();
        },

        search() {
            this.resetPostData();
            this.fetchNextPostSet();
        },

        rePaginate() {
            this.resetPostData();
            this.fetchNextPostSet();
        }
    }
});
