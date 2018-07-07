<template>
    <textarea :name="name"><slot></slot></textarea>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },

        height: {
            type: [String,Number],
            default: 200
        },

        model: {
            required: false
        }
    },

    name: 'Editor',

    methods: {
        getSlotContent() {
            return (this.$slots.default && this.$slots.default[0].text) || null;
        }
    },

    mounted() {
        let value = this.model || this.getSlotContent();
        let config = {
            minHeight: this.height,
            callbacks: {
                onInit: () => $(this.$el).summernote('code', value),
                onChange: () => this.$emit('change', $(this.$el).summernote('code')),
                onBlur: () => this.$emit('change', $(this.$el).summernote('code'))
            },
        };

        $(this.$el).summernote(config);
    }
}
</script>
