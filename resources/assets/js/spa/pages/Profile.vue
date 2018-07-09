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
                                <div class="blog-container" v-for="(post, index) in posts">
                                    <article-post :user="user" :post="post">
                                        <template slot="post-body">
                                            <div class="m-b-xs is-clearfix" v-html="post.body_trimmed"></div>
                                            <a :href="'/article/' + post.slug" class="has-text-grey">Click to read on...</a>
                                        </template>
                                    </article-post>
                                    <hr v-if="index + 1 < posts.length" />
                                </div>
                            </div>
                            <div v-else class="is-loading">
                                Posts are loading...
                            </div>
                        </div>

                        <div>
                            <h1 class="title is-2 has-bottom-highlight">{{ user.name }}'s 10 most recent comments</h1>
                            <div v-if="0 === user.comments.length" class="notification is-info">
                                {{ user.name }} has not actually commented on anything!
                            </div>
                            <div v-for="(comment, index) in user.comments" class="m-t-lg" :class="[1 === (index % 2) ? 'has-text-left' : 'has-text-right']">
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
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="is-loading has-text-centered" v-else>
        Profile is loading...
    </div>
</div>
</template>

<script>
import Page from './../components/Page.js';

export default Page.extend({
    data() {
        return {
            view: {
                name: 'user',
                title: 'User'
            },
            user: null,
            posts: null,
        };
    },

    methods: {
        launch(slug) {
            this.fetchUser(slug);
            this.$root.fetchUserAbilities(slug);
            this.fetchUserPosts(slug);
        },

        setUserData(response) {
            this.user = response.data;
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

        fetchUser(slug) {
            this.loadUser(slug)
                .then(this.setUserData, response => this.error(response.error));

        },

        fetchUserPosts(slug) {
            this.loadUserPosts(slug)
                .then(this.setPostData, response => this.error(response.error));
        }
    }
});
</script>
