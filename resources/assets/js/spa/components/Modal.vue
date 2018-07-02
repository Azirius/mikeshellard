<template>
    <transition name="modal-fade">
        <div class="modal is-active" v-show="show">
            <div class="modal-background" @click="close" transition="modal"></div>
            <div class="modal-container" @click.stop>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['show'],

    name: 'Modal',

    methods: {
        close() {
            this.$emit('close');
        }
    },
}
</script>
