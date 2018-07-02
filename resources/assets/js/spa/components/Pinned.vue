<template>
    <div><slot></slot></div>
</template>

<script>
import { throttle } from 'lodash';

export default {
    mounted() {
        let el = this.$el;
        let originalOffsetTop = el.getBoundingClientRect().top;

        window.addEventListener(
            'scroll',
            throttle(function() {
                el.classList.toggle('sticky', window.scrollY >= originalOffsetTop);
            }, 300)
        );
    }
}
</script>
