import DashboardTemplate from './dashboard.vue.html';
import ChangeEmailModal from '../modals/ChangeEmailModal.js';
import GravatarModal from '../modals/GravatarModal.js';
import Page from './../components/Page.js';

Vue.component('ChangeEmailModal', ChangeEmailModal);
Vue.component('GravatarModal', GravatarModal);

export default Page.extend({
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

    template: DashboardTemplate,

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
