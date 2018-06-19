export default Vue.extend({
    computed: {
        currentUser() {
            if (0 === this.$root.user().length) {
                return null;
            }

            return this.$root.user();
        },

        apiToken() {
            return mikeshellard.api_token;
        },

        csrfToken() {
            return mikeshellard.crsf_token;
        }
    },
});
