<template>
    <div v-if="user && abilities">
        <section class="hero is-medium is-info">
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
                        <div v-if="can('manage-articles') && posts" class="m-b-lg">
                            <h1 class="title is-2 has-bottom-highlight">{{ user.name }}'s Posts!</h1>
                            <div v-if="0 === posts.length">
                                {{ user.name }} currently has no posts!
                            </div>
                            <div class="blog-container" v-for="(post, index) in posts">
                                <article-post :user="user" :post="post">
                                    <template slot="post-body">
                                        <div class="m-b-xs">{{ post.body_trimmed }}</div>
                                        <a :href="'/article/' + post.slug" class="has-text-grey">Click to read on...</a>
                                    </template>
                                </article-post>
                                <hr v-if="index + 1 < posts.length" />
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
</template>

<script>
import Page from './../components/Page.js';
import ArticlePost from './../components/ArticlePost.vue';
import Avatar from './../components/Avatar.vue';

Vue.component('Avatar', Avatar)
Vue.component('ArticlePost', ArticlePost)

export default Page.extend({
    data() {
        return {
            view: {
                name: 'user',
                title: 'User'
            },
            user: null,
            posts: null,
            abilities: null
        };
    },

    methods: {
        launch(slug) {
            this.fetchUser(slug);
            this.fetchUserAbilities(slug);
        },

        setUserData(response) {
            this.user = response.data;
            this.posts = response.data.articles;
        },

        loadUser(slug) {
            return axios.get('/api/v1/user/' + slug);
        },

        fetchUser(slug) {
            this.loadUser(slug)
                .then(this.setUserData, response => this.$root.error(response.error));
        },

        setUserAbilities(response) {
            var abilities = response.data.map(abilitiy => {
                return abilitiy.name;
            });

            this.abilities = abilities;
        },

        loadUserAbilities(slug) {
            return axios.get('/api/v1/user/' + slug + '/abilities');
        },

        fetchUserAbilities(slug) {
            this.loadUserAbilities(slug)
                .then(this.setUserAbilities, response => this.$root.error(response.error));
        },

        can(abilitiy) {
            var canUser = false;

            this.abilities.forEach(currentAbility => {
                if (abilitiy === currentAbility) {
                    canUser = true;
                }
            });

            return canUser;
        }
    }
});
</script>
