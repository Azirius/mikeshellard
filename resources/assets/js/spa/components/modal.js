import ModalTemplate from './modal.vue.html';

export default {
    props: ['show', 'onClose'],

    methods: {
        close() {
            this.onClose();
        }
    },

    template: ModalTemplate,
}