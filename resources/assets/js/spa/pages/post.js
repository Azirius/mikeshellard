import PostTemplate from './post.vue.html';
import Page from './../components/Page.js';
import ArticlePost from './../components/ArticlePost.js';
import Pagination from './../components/Pagination.js';

Vue.component('ArticlePost', ArticlePost)
Vue.component('Pagination', Pagination);

export default Page.extend({
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: null,
            author: {},
            comments: {},
            featured_comment: null,
            comment: ''
        };
    },

    template: PostTemplate,

    created() {
        this.onLoad(this);
    },

    methods: {
        launch(params) {
            this.fetchPost(params.slug);
        },

        setPostData(response) {
            this.post = response.data;
            this.author = this.post.user;
            this.comments = this.post.comments;
            this.featured_comment = this.post.featured_comment;
        },

        pushComment(response) {
            this.comments.push(response.data);
            this.comment = '';
            this.$root.success('Your comment was successfully added!');
        },

        addComment() {
            axios.post('/api/v1/article/' + this.post.slug + '/comments', {body: this.comment})
                .then(this.pushComment)
                .catch(this.$root.handleError);
        },

        featureComment(comment) {
            if (this.isFeaturedComment(comment)) {
                this.$root.error('This comment has already been featured here!');
                return;
            }

            axios.post('/api/v1/comment/' + comment.id + '/feature')
                .then(() => {this.featured_comment = comment; this.$root.success('Comment featured successfully!')})
                .catch(this.$root.handleError);
        },

        isFeaturedComment(comment) {
            return comment.id === (this.featured_comment && this.featured_comment.id);
        },

        fetchPost(slug) {
            axios.get('/api/v1/article/' + slug)
                .then(this.setPostData, response => this.$root.error(response.error));
        }
    }
});
