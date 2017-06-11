import DeleteArticleModalTemplate from './delete-article-modal.vue.html';

export default {
    template: DeleteArticleModalTemplate,
    
    props: ['show'],

    data: () => {
        return {
            title: '',
            slug: '',
            article: null,
        };
    },

    methods: {
        close() {
            this.show = false;
            this.title = '';
            this.slug = '';
            this.article = null;
        },

        deletePost() {
            this.$dispatch('article:deleted', this.article);
            this.$http.delete(`/api/v1/article/${this.slug}?api_token=${mikeshellard.api_token}`)
                .then(this.handle, this.handle)
                .catch(() => null);
        },

        handle(response) {
            if (response.ok) {
                this.close();
            } else {
                this.errors = response.data;   
            }
        }
    },

    events: {
        'delete-modal:open': function (article) {
            this.title = article.title;
            this.slug = article.slug;
            this.article = article;
        }
    }
}
