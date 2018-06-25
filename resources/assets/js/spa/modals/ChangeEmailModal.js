import ChangeEmailModalTemplate from './change-email-modal.vue.html';

export default {
    props: ['user', 'show'],

    template: ChangeEmailModalTemplate,

    data: function () {
        return {
            email: this.user.email,
            errors: []
        };
    },

    methods: {
        close() {
            this.$emit('close');
        },

        validate() {
            if (this.email === this.user.email) {
                this.$root.error('You already have this email!');
                return false;
            }

            return true;
        },

        updateEmail() {
            if (! this.validate()) {
                return;
            }

            axios.put(`/api/v1/user/update-email`, {email: this.email})
                .then(this.handle, this.$root.handleError)
                .catch(this.$root.handleError);
        },

        handle(response) {
            if ('OK' === response.statusText && 200 === response.status) {
                this.user.email = this.email;
                eventHub.$emit('change-email-modal:updated');
                this.close();
            }
        }
    }
}
