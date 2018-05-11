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
            (function() {
                // Allows the Modal to close before destroying the editor instance
                this.editor.summernote('destroy');
            }).debounce(1000);
        },

        savePost() {
            var request = {
                body: this.editor.summernote('code'),
                title: this.title,
                score: this.score
            };

            axios.post(`/api/v1/article`, request)
                .then(this.handle, this.handle)
                .catch(() => null);
        },

        handle(response) {
            if ('OK' === response.statusText) {
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
