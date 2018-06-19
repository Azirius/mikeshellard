import DeleteArticleModalTemplate from './delete-article-modal.vue.html';

export default {
    props: ['show'],

    template: DeleteArticleModalTemplate,

    data: () => {
        return {
            title: '',
            slug: '',
            article: null,
        };
    },

    mounted() {
        eventHub.$on('delete-modal:open', article => {
            this.title = article.title;
            this.slug = article.slug;
            this.article = article;
        });
    },

    destroyed() {
        eventHub.$off('delete-modal:open');
    },

    methods: {
        close() {
            this.$emit('close');
            this.title = '';
            this.slug = '';
            this.article = null;
        },

        deletePost() {
            eventHub.$emit('article:deleted', this.article);
            axios.delete(`/api/v1/article/${this.slug}`)
                .then(this.handle, this.$root.handleError)
                .catch(this.$root.handleError);
        },

        handle(response) {
            if ('OK' === response.statusText && 200 === response.status) {
                this.close();
            }
        }
    }
}
