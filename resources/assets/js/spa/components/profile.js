import ProfileTemplate from './profile.vue.html';
import Page from './Page.js';

export default Page.extend({
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'user',
                title: 'User'
            },
            user: {},
            posts: {}
        };
    },

    template: ProfileTemplate,

    attached() {
        this.onLoad(this);
    },

    methods: {
        launch(slug) {
            this.fetchUser(slug);
        },

        setUserData(response) {
            this.user = response.data;
            this.posts = response.data.articles;
        },

        fetchUser(slug) {
            axios.get('/api/v1/user/' + slug)
                .then(this.setUserData, response => this.$root.error(response.error));
        }
    }
});
