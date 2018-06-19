import GravatarModalTemplate from './gravatar-modal.vue.html';

export default {
    props: ['show'],

    template: GravatarModalTemplate,

    methods: {
        close() {
            this.$emit('close');
        }
    }
}
