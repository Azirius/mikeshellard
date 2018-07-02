<template>
    <modal :show="show" @close="close">
        <div class="modal-card">
            <div class="modal-card-head">
                <h1 class="modal-card-title">Change email</h1>
                <button class="delete" aria-label="close" @click="close()"></button>
            </div>

            <div class="modal-card-body">
                Change your email:
                <div class="field">
                    <div class="control has-icons-left">
                        <input type="email" @keyup.enter="updateEmail()" class="input is-m" name="email" placeholder="Your Email" v-model="email" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                    <p class="help">
                        Changing your email will change the email you use to login. The email must be unique - as in you can not
                        use another persons email address.
                    </p>
                </div>
            </div>

            <div class="modal-card-foot">
                <button class="button is-success" @click="updateEmail()">
                    Update
                </button>

                <button class="button" @click="close()">
                    No
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['user', 'show'],

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
</script>
