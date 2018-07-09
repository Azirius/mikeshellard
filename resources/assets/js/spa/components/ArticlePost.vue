<template>
    <div>
        <h3 class="blog-post-title">
            <a :href="'/article/' + post.slug " v-html="post.title"></a>
        </h3>
        <p class="blog-post-meta m-b-sm">
            <i class="fa fa-user"></i> <a :href="'/profile/' + user.slug" v-text="user.name"></a>
            <i class="fa fa-calendar"></i> Published <span v-text="post.nice_created_at"></span>
            <i class="fas fa-comments m-l-xs"></i> <span v-text="post.comment_count"></span> Comment{{ post.comment_count === 0 || post.comment_count > 1 ? 's' : '' }}
            <span v-if="can('manage-articles')"><i class="fa fa-pen-square"></i> <a :href="'/admin/article/' + post.slug + '/edit'">Edit</a></span>
        </p>
        <slot name="post-body"></slot>
    </div>
</template>

<script>
export default {
    props: ['user', 'post'],

    name: 'ArticlePost',

    methods: {
        can(abilitiy, userSlug) {
            return this.$root.can(abilitiy, userSlug);
        }
    }
}
</script>
