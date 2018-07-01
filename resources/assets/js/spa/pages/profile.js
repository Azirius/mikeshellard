import ProfileTemplate from './profile.vue.html';
import Page from './../components/Page.js';
import ArticlePost from './../components/ArticlePost.js';

Vue.component('ArticlePost', ArticlePost)

export default Page.extend({
    props: ['on-load'],

    data() {
        return {
            view: {
                name: 'user',
                title: 'User'
            },
            user: null,
            posts: null,
            abilities: null
        };
    },

    template: ProfileTemplate,

    created() {
        this.onLoad(this);
    },

    methods: {
        launch(slug) {
            this.fetchUser(slug);
            this.fetchUserAbilities(slug);
        },

        setUserData(response) {
            this.user = response.data;
            this.posts = response.data.articles;
        },

        loadUser(slug) {
            return axios.get('/api/v1/user/' + slug);
        },

        fetchUser(slug) {
            this.loadUser(slug)
                .then(this.setUserData, response => this.$root.error(response.error));
        },

        setUserAbilities(response) {
            var abilities = response.data.map(abilitiy => {
                return abilitiy.name;
            });

            this.abilities = abilities;
        },

        loadUserAbilities(slug) {
            return axios.get('/api/v1/user/' + slug + '/abilities');
        },

        fetchUserAbilities(slug) {
            this.loadUserAbilities(slug)
                .then(this.setUserAbilities, response => this.$root.error(response.error));
        },

        can(abilitiy) {
            var canUser = false;

            this.abilities.forEach(currentAbility => {
                if (abilitiy === currentAbility) {
                    canUser = true;
                }
            });

            return canUser;
        }
    }
});
