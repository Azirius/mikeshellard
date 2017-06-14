import PostTemplate from './post.vue.html';

export default {
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

        addComment(response) {
            this.comments.push(response.data);

            this.body = '';
        },

        addComment() {
            this.$http.post('/article/' + this.post.slug + '/comments', {body: this.comment})
                .then(this.addComment);
        },

        fetchPost(slug) {
            this.$http.get('/api/v1/article/' + slug)
                .then(this.setPostData, response => this.$root.error(response.error));
        }
    }
}
