import queryString from 'query-string';
import DeleteArticleModal from '../modals/DeleteArticleModal.js';
import ArticleManagementTemplate from './article-management.vue.html';
import Page from './../components/Page.js';

Vue.component('DeleteArticleModal', DeleteArticleModal);

export default Page.extend({
    data() {
        return {
            view: {
                name: 'article-management',
                title: 'Article Management'
            },
            showDeleteArticleModalState: false,
            posts: [],
            loading_posts: false,
            field: 'Created',
            reverse: true,
            columns: {
                published: 'Created',
                title: 'Title',
                author: 'Name'
            },
            queryParams: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false
        };
    },

    template: ArticleManagementTemplate,

    destroyed() {
        this.removeScroll();
        this.resetPostData();
        eventHub.$off('article:deleted');
    },

    methods: {
        launch() {
            this.fetchNextPostSet();
        },

        childSetUp() {
            let $window = $(window);
            let $stickyEl = $('#admin-article-search');
            let elTop = $stickyEl.offset().top;

            $window.scroll(() => $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop));

            eventHub.$on('article:deleted', this.removeArticle);

            this.setUpScroll();
        },

        removeScroll() {
            $(window).off('scroll');
        },

        setUpScroll() {
            if ($('#admin-article-bottom').isOnScreen()) {
                this.fetchNextPostSet();
            }

            $(window).scroll((() => {
                if (this.last_page) {
                    return;
                }

                if ($('#admin-article-bottom').isOnScreen()) {
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
                this.queryParams.page++;
            }

            this.loading_posts = false;
        },

        fetchNextPostSet() {
            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            let urlParameters = this.queryParams;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            let queryStringCompiled = queryString.stringify(urlParameters);

            axios.get('/api/v1/article?' + queryStringCompiled)
                .then(this.addPostsToArray, response => this.$root.error(response.error));
        },

        resetPostData() {
            this.posts = [];
            this.queryParams.page = 1;
            this.last_page = false;
        },

        sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.queryParams[this.field];
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
        },

        showDeleteArticleModal(article) {
            eventHub.$emit('delete-modal:open', article);
            this.showDeleteArticleModalState = true;
        },

        hideDeleteArticleModel() {
            this.showDeleteArticleModalState = false;
        },

        removeArticle(article) {
            var index = this.posts.indexOf(article);
            this.posts.splice(index, 1);
            this.$root.success('Article successfully deleted!');
        },
    }
});
