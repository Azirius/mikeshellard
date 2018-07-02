export default Vue.extend({
    props: ['on-load'],

    mounted: function () {
        this.onLoad(this);
        this.childSetUp();
    },

    methods: {
        childSetUp() {

        }
    },

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
