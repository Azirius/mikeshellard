<template>
    <section class="section site-content">
        <div class="container">
            <delete-article-modal :show="showDeleteArticleModalState" @close="hideDeleteArticleModel()"></delete-article-modal>
            
            <pinned>
                <div class="is-hidden-touch tabs is-toggle">
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
                                    <select v-model="queryParams.paginate" @change="rePaginate">
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
                                    v-model="queryParams.search"
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
                <div class="columns">
                    <div class="column is-two-thirds article-admin-column">
                        <div class="notification is-info" v-if="0 === posts.length && false === loading_posts">
                            There are no posts. <a href="/admin/article/create">Make one!</a>
                        </div>
                        <div v-for="post in posts">
                            <article-post :user="post.user" :post="post" class="m-b-md">
                                <template slot="post-body">
                                    <div class="m-b-xs is-clearfix" v-html="post.body_trimmed"></div>
                                    <a :href="'/article/' + post.slug" class="has-text-grey">Click to read on...</a>
                                </template>
                            </article-post>
                            <div class="m-b-md" style="background-color: #ededed; padding: 5px; text-align: right">
                                <a :href="'/admin/article/' + post.slug + '/edit'" class="button is-primary">Edit</a>
                                <button class="button is-text" @click.stop.prevent="showDeleteArticleModal(post)">Delete</button>
                            </div>
                        </div>
                        <div class="loading-articles has-text-centered" v-if="loading_posts">
                            <span class="is-loading"></span>
                            <br>
                            <div class="has-text-info m-xl">Loading Posts....</div>
                        </div>
                    </div>
                    <aside class="menu column">
                        <p class="menu-label">
                            General
                        </p>
                        <ul class="menu-list">
                            <li><a href="/admin/dashboard">Dashboard</a></li>
                        </ul>

                        <p class="menu-label">
                            Article Management
                        </p>
                        <ul class="menu-list">
                            <li><a href="/admin/article">Overview</a></li>
                            <li><a href="/admin/article/create">Publish New Article</a></li>
                        </ul>

                        <p class="menu-label">
                            User Management
                        </p>
                        <ul class="menu-list">
                            <li><a href="/admin/user">Overview</a></li>
                            <li><a href="/admin/user/create">Create a New User</a></li>
                        </ul>

                        <p class="menu-label">
                            Role &amp; Permission Managment
                        </p>
                        <ul class="menu-list">
                            <li><a href="/admin/authorisation">Overview</a></li>
                            <li><a href="/admin/authorisation/permission/create">Create New Permission</a></li>
                            <li><a href="/admin/authorisation/role/create">Create New Permission</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
import queryString from 'query-string';
import DeleteArticleModal from '../modals/DeleteArticleModal.vue';
import Page from './../components/Page.js';
import IsBottom from './../mixins/IsBottom.js';

export default Page.extend({
    mixins: [IsBottom],

    components: {
        DeleteArticleModal
    },

    data() {
        return {
            view: {
                name: 'ArticleManagement',
                title: 'Article Management'
            },
            showDeleteArticleModalState: false,
            posts: [],
            loading_posts: false,
            field: 'Created',
            reverse: true,
            columns: {
                Created: 'Created',
                Title: 'Title',
                Name: 'Author Name'
            },
            queryParams: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false,
        };
    },

    destroyed() {
        this.resetPostData();
        eventHub.$off('article:deleted');
    },

    methods: {
        launch() {
            eventHub.$on('article:deleted', this.removeArticle);
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
                this.queryParams.page++;
            }

            this.loading_posts = false;
        },

        fetchNextPostSet() {
            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            let urlParameters = this.queryParams;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            axios.get('/api/v1/article?' + queryString.stringify(urlParameters))
                .then(this.addPostsToArray, response => this.error(response.error));

            if (this.bottomVisible()) {
                this.fetchNextPostSet();
            }
        },

        resetPostData() {
            this.posts = [];
            this.queryParams.page = 1;
            this.last_page = false;
        },

        sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.queryParams[this.field];
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
        },

        showDeleteArticleModal(article) {
            eventHub.$emit('delete-modal:open', article);
            this.showDeleteArticleModalState = true;
        },

        hideDeleteArticleModel() {
            this.showDeleteArticleModalState = false;
        },

        removeArticle(article) {
            var index = this.posts.indexOf(article);
            this.posts.splice(index, 1);
            this.success('Article successfully deleted!');
        },
    }
});
</script>
