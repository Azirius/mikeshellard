<template>
    <modal :show="show" @close="close">
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Delete Article: '{{ title }}'</p>
                <button class="delete" aria-label="close" @click="close()"></button>
            </div>

            <div class="modal-card-body">
                Are you sure you want to delete this article?
            </div>

            <div class="modal-card-foot text-right">
                <button class="button is-success" @click="deletePost()">
                    Yes
                </button>

                <button class="button" @click="close()">
                    No
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['show'],

    data: () => {
        return {
            title: '',
            slug: '',
            article: null,
        };
    },

    mounted() {
        eventHub.$on('delete-modal:open', article => {
            this.title = article.title;
            this.slug = article.slug;
            this.article = article;
        });
    },

    destroyed() {
        eventHub.$off('delete-modal:open');
    },

    methods: {
        close() {
            this.$emit('close');
            this.title = '';
            this.slug = '';
            this.article = null;
        },

        deletePost() {
            eventHub.$emit('article:deleted', this.article);
            axios.delete(`/api/v1/article/${this.slug}`)
                .then(this.handle, this.$root.handleError)
                .catch(this.$root.handleError);
        },

        handle(response) {
            if ('OK' === response.statusText && 200 === response.status) {
                this.close();
            }
        }
    }
}
</script>
