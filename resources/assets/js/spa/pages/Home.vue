<template>
    <section class="section site-content">
        <div class="container">
            <pinned>
                <div class="tabs is-toggle is-hidden-touch">
                    <div class="pull-left">
                        <ul>
                            <li v-for="(column, index) in columns" :class="[field == index ? 'is-active' : '']">
                                <a @click="sortBy(index)">
                                    {{ column }}
                                    <span class="icon is-small" v-show="field == index">
                                        <i class="fas fa-arrow-circle-up" v-show="field == index && reverse == false"></i>
                                        <i class="fas fa-arrow-circle-down" v-show="field == index && reverse == true"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="pull-right">
                        <div class="field has-addons">
                            <div class="control">
                                <span class="select">
                                    <select v-model="params.paginate" @change="rePaginate">
                                        <option :value="5">5</option>
                                        <option :value="10">10</option>
                                        <option :value="20">20</option>
                                        <option :value="100">100</option>
                                    </select>
                                </span>
                            </div>
                            <div class="control">
                                <input name="search"
                                    class="input"
                                    v-model="params.search"
                                    @keyup.enter="search"
                                    placeholder="Find an article">
                            </div>
                            <div class="control">
                                <a class="button is-info">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </pinned>
            
            <div class="container">
                <hr/>
                <div class="notification is-info" v-if="0 === posts.length && false === loading_posts">
                    There are no posts
                </div>
                <div class="blog-container" v-for="(post, index) in posts">
                    <article-post :user="post.user" :post="post" class="m-b-lg">
                        <template slot="post-body">
                            <div class="m-b-xs is-clearfix" v-html="post.body_trimmed"></div>
                            <a :href="'/article/' + post.slug" class="has-text-grey">Click to read on...</a>
                        </template>
                    </article-post>
                </div>
                <div class="loading-articles has-text-centered" v-if="loading_posts">
                    <span class="is-loading"></span>
                    <br>
                    <div class="has-text-info m-xl">Loading Posts....</div>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
import queryString from 'query-string';
import Page from './../components/Page.js';
import IsBottom from './../mixins/IsBottom.js';

export default Page.extend({
    mixins: [IsBottom],

    data() {
        return {
            view: {
                name: 'HomePage',
                title: 'Home'
            },
            posts: [],
            loading_posts: false,
            field: 'Created',
            reverse: true,
            columns: {
                Created: 'Created',
                Title: 'Title',
                Name: 'Author Name'
            },
            params: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false,
        };
    },

    destroyed() {
        this.resetPostData();
    },

    methods: {
        launch() {
            this.fetchNextPostSet();
            this.isLoading(false);
        },

        customBottomCondition() {
            return this.last_page;
        },

        bottomAction() {
            this.fetchNextPostSet();
        },

        addPostsToArray(response) {
            let posts = response.data.data;

            if (! posts || 0 === posts.length) {
                this.info('You have reached the last page!');
                this.last_page = true;
            } else {
                posts.forEach(post => this.posts.push(post));
                this.params.page++;
            }

            this.loading_posts = false;
        },

        loadPosts(queryString) {
            return axios.get('/api/v1/article?' + queryString);
        },

        fetchNextPostSet() {
            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            let urlParameters = this.params;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            this.loadPosts(queryString.stringify(urlParameters))
                .then(this.addPostsToArray, response => this.error(response.error));

            if (this.bottomVisible()) {
                this.fetchNextPostSet();
            }
        },

        resetPostData() {
            this.posts = [];
            this.params.page = 1;
            this.last_page = false;
        },

        sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.params[this.field];
            this.field = field;
            this.fetchNextPostSet();
        },

        search() {
            this.resetPostData();
            this.fetchNextPostSet();
        },

        rePaginate() {
            this.resetPostData();
            this.fetchNextPostSet();
        }
    }
});
</script>
