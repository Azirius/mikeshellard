let Vue = require('vue/dist/vue.common.js');

export default Vue.extend({
    props: ['on-load'],

    name: 'Page',

    mounted: function () {
        this.onLoad(this);
    },

    methods: {
        launch() {
            this.isLoading(false);
        },

        can(abilitiy, slug) {
            return this.$root.can(abilitiy, slug);
        },

        route(uri) {
            history.pushState(null, null, uri);
            return this.$root.router.route(uri);
        },

        /**
         * Fires an error message, proxies to base App Vue instance
         * @param  {string} notification Error notification
         * @return {Vue}
         */
        error(notification) {
            return this.$root.error(notification);
        },

        /**
         * Fires an info message, proxies to base App Vue instance
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        info(notification) {
            return this.$root.info(notification);
        },

        /**
         * Fires an info message, proxies to base App Vue instance
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        success(notification) {
            return this.$root.success(notification);
        },

        isLoading(loading) {
            this.$root.loading = loading;
        }
    },

    computed: {
        /**
         * Return the cuurent application user
         * @return {Object|null} User object, or null if no user
         */
        currentUser() {
            return this.$root.user();
        },

        /**
         * Current application users API token
         * @return {string} API Token
         */
        apiToken() {
            return mikeshellard.api_token;
        },

        /**
         * CSRF Token
         * @return {string} CSRF Token
         */
        csrfToken() {
            return mikeshellard.csrf_token;
        }
    },
});
