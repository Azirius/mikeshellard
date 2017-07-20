import PostTemplate from './post.vue.html';
import Page from './Page.js';

export default Page.extend({
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: {},
            comments: {},
            featured_comment: null,
            comment: ''
        };
    },

    template: PostTemplate,

    attached() {
        this.onLoad(this);
    },

    methods: {
        launch(params) {
            this.fetchPost(params.slug);
        },

        setPostData(response) {
            this.post = response.data;
            this.comments = this.post.comments;
            this.featured_comment = this.post.featured_comment;
        },

        pushComment(response) {
            this.comments.push(response.data);

            this.comment = '';
        },

        addComment() {
            axios.post('/api/v1/article/' + this.post.slug + '/comments', {body: this.comment})
                .then(this.pushComment, response => this.$root.error(response.error));
        },

        fetchPost(slug) {
            axios.get('/api/v1/article/' + slug)
                .then(this.setPostData, response => this.$root.error(response.error));
        }
    }
});
