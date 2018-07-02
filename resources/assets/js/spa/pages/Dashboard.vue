<template>
    <div>
        <section class="hero is-medium is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Dashboard
                    </h1>
                </div>
            </div>
        </section>
        <section class="section site-content">
            <change-email-modal :user="currentUser" :show="showChangeEmailModalState" @close="hideChangeEmailModel()"></change-email-modal>
            <gravatar-modal :show="showChangeAvatarModalState" @close="hideGravatarModal()"></gravatar-modal>
            <avatar :user="currentUser" size="large" avatar-class="is-hidden-mobile avatar-has-profile"></avatar>
            <div class="container container-into-hero">
                <div class="card">
                    <div class="card-content">    
                        <p class="title is-4 has-bottom-highlight">Welcome to your dashboard, {{ currentUser.name }}!</p>
                        <ul>
                            <li><i class="fas fa-at"></i> <a @click="showChangeEmailModal">Change email</a></li>
                            <li><i class="fas fa-image"></i> <a @click="showGravatarModal">Change avatar</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ChangeEmailModal from '../modals/ChangeEmailModal.vue';
import GravatarModal from '../modals/GravatarModal.vue';
import Page from './../components/Page.js';

export default Page.extend({
    components: {
        ChangeEmailModal,
        GravatarModal
    },

    data() {
        return {
            view: {
                name: 'dashboard',
                title: 'Dashboard'
            },
            showChangeEmailModalState: false,
            showChangeAvatarModalState: false,
        };
    },

    destroyed() {
        eventHub.$off('change-email-modal:updated');
    },

    methods: {
        childSetUp() {
            eventHub.$on('change-email-modal:updated', () => {this.$root.success('Your email was successfully updated!')});
        },

        showChangeEmailModal() {
            this.showChangeEmailModalState = true;
        },

        hideChangeEmailModel() {
            this.showChangeEmailModalState = false
        },

        showGravatarModal() {
            this.showChangeAvatarModalState = true;
        },

        hideGravatarModal() {
            this.showChangeAvatarModalState = false;
        }
    }
});
</script>
