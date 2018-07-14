<template>
<div>
    <div v-if="user">
        <section class="hero is-medium is-info has-hero-background">
            <div class="hero-body">
                <div class="container">
                    <h1 class="is-1 title">
                        {{ user.name }}'s Profile
                    </h1>
                </div>
            </div>
        </section>
        <section class="section site-content">
            <avatar :user="user" size="large" avatar-class="is-hidden-mobile avatar-has-profile"></avatar>
            <br>
            <div class="container container-into-hero">
                <div class="card">
                    <div class="card-content">
                        <div class="m-b-lg">
                            <h1 class="title is-2 has-bottom-highlight">{{ user.name }}'s Posts!</h1>
                            <div v-if="posts">
                                <div v-if="0 === posts.length">
                                    {{ user.name }} currently has no posts!
                                </div>
                                <pagination :items="posts" :per-page="5" class="m-b-md">
                                    <template slot="pagination-item" slot-scope="{item}">
                                        <article-post :user="user" :post="item">
                                            <template slot="post-body">
                                                <div class="m-b-xs is-clearfix" v-html="item.body_trimmed"></div>
                                                <a :href="'/article/' + item.slug" class="has-text-grey">Click to read on...</a>
                                            </template>
                                        </article-post>
                                    </template>
                                </pagination>
                                <!-- <div class="blog-container" v-for="(post, index) in posts">
                                </div> -->
                            </div>
                            <div v-else>
                                <div class="has-text-centered m-t-xxl m-b-xxl" style="z-index: 4">
                                    <div class="is-loading"></div>
                                    <br>
                                    <div class="m-xl has-text-info has-text-weight-bold">Profile is loading!</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 class="title is-2 has-bottom-highlight">{{ user.name }}'s 10 most recent comments</h1>
                            <div v-if="comments">
                                <div v-if="0 === comments.length" class="notification is-info">
                                    {{ user.name }} has not actually commented on anything!
                                </div>
                                <div v-for="(comment, index) in comments" class="m-t-lg" :class="[1 === (index % 2) ? 'has-text-left' : 'has-text-right']">
                                    <p class="blog-post-meta">
                                        <i class="fa fa-calendar"></i> Comment Published <span v-text="comment.nice_created_at"></span>
                                    </p>
                                    <p class="m-t-md">
                                        {{ comment.body }}
                                    </p>
                                    <small class="is-muted m-t-md">
                                        Posted on <a :href="'/article/' + comment.article.slug">{{ comment.article.title }}</a>
                                    </small>
                                </div>
                            </div>
                            <div v-else>
                                <div class="has-text-centered m-t-xxl m-b-xxl" style="z-index: 4">
                                    <div class="is-loading"></div>
                                    <br>
                                    <div class="m-xl has-text-info has-text-weight-bold">Comments are loading!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import Page from './../components/Page.js';
import Pagination from './../components/Pagination.vue';

export default Page.extend({
    data() {
        return {
            view: {
                name: 'User',
                title: 'User'
            },
            user: null,
            posts: null,
            comments: null,
        };
    },

    components: {
        Pagination
    },

    methods: {
        launch(slug) {
            this.fetchUser(slug);
            this.$root.fetchUserAbilities(slug);
            this.fetchUserPosts(slug);
            this.fetchUserComments(slug);
        },

        setUserData(response) {
            this.user = response.data;
            this.isLoading(false);
        },

        loadUser(slug) {
            return axios.get('/api/v1/user/' + slug);
        },

        setPostData(response) {
            this.posts = response.data;
        },

        loadUserPosts(slug) {
            return axios.get('/api/v1/user/' + slug + '/posts');
        },

        setCommentData(response) {
            this.comments = response.data;
        },

        loadUserComments(slug) {
            return axios.get('/api/v1/user/' + slug + '/comments');
        },

        fetchUser(slug) {
            this.loadUser(slug)
                .then(this.setUserData, response => this.error(response.error));

        },

        fetchUserPosts(slug) {
            this.loadUserPosts(slug)
                .then(this.setPostData, response => this.error(response.error));
        },

        fetchUserComments(slug) {
            this.loadUserComments(slug)
                .then(this.setCommentData, response => this.error(response.error));
        }
    }
});
</script>
