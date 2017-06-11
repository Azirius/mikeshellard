import EditArticleModalTemplate from './edit-article-modal.vue.html';
import { createSummernote, extend } from '../helpers.js';

export default {
    template: EditArticleModalTemplate,

    props: ['show'],

    data: () => {
        return {
            title: '',
            body: '',
            slug: '',
            score: '',
            errors: {},
            editor: null,
            article: null
        };
    },
    methods: {

        close() {
            this.show = false;
            this.title = '';
            this.body = '';
            this.slug = '';
            this.score = '';
            this.article = null;

            this.editor.summernote('code', '');
            this.editor.summernote('destroy');
            this.editor = null;
        },

        savePost() {
            var request = {
                body: this.editor.summernote('code'),
                title: this.title,
                score: this.score
            };

            this.$http.put(`/api/v1/article/${this.slug}?api_token=${mikeshellard.api_token}`, request)
                .then(this.handle, this.handle)
                .catch(() => null);
        },

        handle(response) {
            if (response.ok) {
                extend(this.article, response.data.article);
                this.$dispatch('article:updated');
                this.close();
            } else {
                this.errors = response.data;   
            }
        }

    },

    events: {
        'edit-modal:open': function (article) {
            this.body = article.body;
            this.title = article.title;
            this.slug = article.slug;
            this.score = article.score;
            this.article = article;

            this.editor = createSummernote('summernote-edit');
            this.editor.summernote('code', this.body);

            $('.dropdown-toggle').dropdown();
        }
    }
}
