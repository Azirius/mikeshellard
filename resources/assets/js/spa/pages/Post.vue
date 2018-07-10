<template>
    <section class="section site-content" v-if="post">
        <div class="container">
            <div class="blog-container m-t-md">
                <article-post :user="author" :post="post">
                    <template slot="post-body">
                        <pagination :items="post.pages" :per-page="1" class="m-b-md">
                                <template slot="pagination-item" slot-scope="{item}">
                                    <h3 class="subtitle" v-text="item.subtitle"></h3>
                                    <p class="blog-post is-clearfix" v-html="item.body"></p>
                                </template>
                        </pagination>
                    </template>
                </article-post>
                <hr>
            </div>

            <h2 class="subtitle">Add a new comment</h2>

            <div v-if="currentUser" class="m-b-md">
                <div class="field">
                    <div class="control">
                        <textarea rows="10" cols="50" class="textarea" v-model="comment"></textarea>
                    </div>
                </div>
                
                <div class="field">
                    <div class="control">
                        <button type="submit" class="button is-info" @click="addComment">
                            <i class="fas fa-btn fa-edit m-r-xs"></i> Submit Comment!
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="m-b-md">
                    <div class="panel-body">You need to be <a href="/login">logged in</a> to comment on these articles!</div>
                </div>
            </div>

            <div v-if="!! featured_comment" class="featured-comment">
                <h2 class="subtitle">Featured Comment by {{ featured_comment.authors_name }}</h2>
                <p class="blog-post-meta">
                    <img :src="featured_comment.user.gravatar.medium" class="image is-64x64 m-r-md is-pulled-left avatar">
                    <a :href="'/profile/' + featured_comment.authors_slug">{{ featured_comment.authors_name }}</a>
                    <i class="fa fa-calendar"></i> <span>{{ featured_comment.nice_created_at }}</span>
                </p>
                <div>{{ featured_comment.body }}</div>
            </div>
            
            <h2 class="subtitle">Comments</h2>
            <div v-if="0 === comments.length">
                <div class="notification is-info">
                    Nobody has commented here yet!
                </div>
            </div>
            <div v-else>
                <div class="panel m-b-md" v-for="comment in comments">
                    <div class="columns">
                        <div class="column is-narrow">
                            <img :src="comment.user.gravatar.large" class="image is-64x64 avatar">
                        </div>
                        <div class="column">
                            <p class="blog-post-meta">
                                <a :href="'/profile/' + comment.authors_slug" v-text="comment.authors_name"></a>
                                <i class="fa fa-calendar"></i> <span v-text="comment.nice_created_at"></span>
                                <button class="button is-text" @click.prevent="featureComment(comment)" v-if="currentUser && ! isFeaturedComment(comment)">
                                    <i class="fa m-r-xs fa-thumbs-up"></i>
                                    Feature?
                                </button>
                                <span class="has-text-primary m-l-md" v-else-if="isFeaturedComment(comment)">
                                    <i class="fas m-r-xxs fa-thumbs-up"></i>
                                    Featured!
                                </span>
                            </p>
                            <div v-text="comment.body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
import Page from './../components/Page.js';
import Pagination from './../components/Pagination.vue';

export default Page.extend({
    data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: null,
            author: {},
            comments: {},
            featured_comment: null,
            comment: ''
        };
    },

    components: {
        Pagination
    },

    methods: {
        launch(slug) {
            this.fetchPost(slug);
        },

        setPostData(response) {
            this.post = response.data;
            this.author = this.post.user;
            this.comments = this.post.comments;
            this.featured_comment = this.post.featured_comment;
            this.isLoading(false);
        },

        pushComment(response) {
            this.comments.push(response.data);
            this.comment = '';
            this.$root.success('Your comment was successfully added!');
        },

        addComment() {
            axios.post('/api/v1/article/' + this.post.slug + '/comments', {body: this.comment})
                .then(this.pushComment)
                .catch(this.$root.handleError);
        },

        featureComment(comment) {
            if (this.isFeaturedComment(comment)) {
                this.$root.error('This comment has already been featured here!');
                return;
            }

            axios.post('/api/v1/comment/' + comment.id + '/feature')
                .then(() => {this.featured_comment = comment; this.$root.success('Comment featured successfully!')})
                .catch(this.$root.handleError);
        },

        isFeaturedComment(comment) {
            return comment.id === (this.featured_comment && this.featured_comment.id);
        },

        fetchPost(slug) {
            axios.get('/api/v1/article/' + slug)
                .then(this.setPostData)
                .catch(this.$root.handleError);
        }
    }
});
</script>
