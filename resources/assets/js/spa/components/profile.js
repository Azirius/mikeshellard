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
            user: null,
            posts: {}
        };
    },

    template: ProfileTemplate,

    created() {
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

        loadUser(slug) {
            return axios.get('/api/v1/user/' + slug);
        },

        fetchUser(slug) {
            this.loadUser(slug).then(this.setUserData, response => this.$root.error(response.error));
        }
    }
});
