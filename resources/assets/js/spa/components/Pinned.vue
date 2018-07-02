<template>
    <div><slot></slot></div>
</template>

<script>
import { throttle } from 'lodash';

export default {
    methods: {
        getOffset(el) {
            var _x = 0;
            var _y = 0;
            
            while (el && ! isNaN(el.offsetLeft) && ! isNaN(el.offsetTop)) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }

            return { top: _y, left: _x };
        }
    },

    mounted() {
        let el = this.$el;
        const originalOffsetTop = this.getOffset(el).top;

        window.addEventListener(
            'scroll',
            throttle(function() {
                el.classList.toggle('sticky', window.scrollY >= originalOffsetTop);
            }, 300)
        );
    }
}
</script>
