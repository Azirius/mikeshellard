import PostTemplate from './post.vue.html';

export default {
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: {}
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
        },

        fetchPost(slug) {
            this.$http.get('/api/v1/article/' + slug)
                .then(this.setPostData, response => this.$root.error(response.error));
        }
    }
}
