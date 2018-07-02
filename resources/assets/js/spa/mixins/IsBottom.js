import { throttle } from 'lodash';

export default {
    data() {
        return {
            bottom: false
        }
    },

    created() {
        this.setUpScroll();
    },

    watch: {
        bottom(bottom) {
            if (bottom) {
                this.bottomAction();
            }
        }
    },

    methods: {
        bottomAction() {
            console.log('No bottom action set');
        },

        customBottomCondition() {
            return false;
        },

        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            
            return this.customBottomCondition() || bottomOfPage || pageHeight < visible
        },

        setUpScroll() {
            window.addEventListener('scroll', throttle(() => {
                this.bottom = this.bottomVisible();
            }, 300));
        }
    }
}
