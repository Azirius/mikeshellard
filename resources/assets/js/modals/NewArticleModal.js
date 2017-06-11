import NewArticleModalTemplate from './new-article-modal.vue.html';
import { createSummernote } from '../helpers.js';

export default {
    template: NewArticleModalTemplate,

    props: ['show'],

    data: () => {
        return {
            title: '',
            body: '',
            score: '',
            errors: {},
            editor: null
        };
    },

    methods: {

        close() {
            this.show = false;
            this.title = '';
            this.body = '';
            this.score = '';
            this.errors = {};

            this.editor.summernote('code', '');
            this.editor.summernote('destroy');
        },

        savePost() {
            var request = {
                body: this.editor.summernote('code'),
                title: this.title,
                score: this.score
            };

            this.$http.post(`/api/v1/article?api_token=${mikeshellard.api_token}`, request)
                .then(this.handle, this.handle)
                .catch(() => null);
        },

        handle(response) {
            if (response.ok) {
                this.$dispatch('article:created', response.data);
                this.close();
            } else {
                console.log(response);
                this.errors = response.data;
            }
        }

    },

    events: {
        'new-modal:open': function (article) {
            this.editor = createSummernote('summernote-new');
            $('.dropdown-toggle').dropdown();
        }
    }
}
