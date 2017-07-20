import NewArticleModal from './NewArticleModal.js';
import EditArticleModal from './EditArticleModal.js';
import DeleteArticleModal from './DeleteArticleModal.js';

Vue.component('NewArticleModal', NewArticleModal);

Vue.component('EditArticleModal', EditArticleModal);

Vue.component('DeleteArticleModal', DeleteArticleModal);

var articles = new Vue({
    el: '#articles',

    data: {
        articles: {},
        displayNewArticleModal: false,
        displayEditArticleModal: false,
        displayDeleteArticleModal: false,
        articleMessage: false,
    },

    methods: {
        getArticles() {
            axios.get('/api/v1/article')
                .then(this.setArticles);
        },

        setArticles(response) {
            this.articles = response.data;
        },

        showEditArticleModal(article) {
            this.$broadcast('edit-modal:open', article);
            this.displayEditArticleModal = true;
        },

        showDeleteArticleModal(article) {
            this.$broadcast('delete-modal:open', article);
            this.displayDeleteArticleModal = true;
        },

        showNewArticleModal() {
            this.$broadcast('new-modal:open');
            this.displayNewArticleModal = true;
        },

        message(text) {
            this.articleMessage = text;
            setTimeout(() => this.articleMessage = false, 2500);
        }
    },

    ready() {
        this.getArticles();
    },

    events: {
        'article:updated': function () {
            this.message('Article successfully updated!');
        },
        'article:created': function (response) {
            this.articles.push(response.article);
            this.message('Article successfully created!');
        },
        'article:deleted': function (article) {
            this.articles.$remove(article);
            this.message('Article successfully deleted!');
        }
    }
});
