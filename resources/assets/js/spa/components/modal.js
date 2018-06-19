import ModalTemplate from './modal.vue.html';

export default {
    props: ['show'],

    name: 'Modal',

    methods: {
        close() {
            this.$emit('close');
        }
    },

    template: ModalTemplate,
}
