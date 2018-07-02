<template>
    <section class="section site-content">
        <div class="container">
            <delete-article-modal :show="showDeleteArticleModalState" @close="hideDeleteArticleModel()"></delete-article-modal>
            
            <pinned id="sk">
                <div class="is-hidden-touch tabs is-toggle">
                    <div class="pull-left">
                        <ul>
                            <li v-for="column in columns" :class="[field == column ? 'is-active' : '']">
                                <a @click="sortBy(column)">
                                    {{ column }}
                                    <span class="icon is-small" v-show="field == column">
                                        <i class="fas fa-arrow-circle-up" v-show="field == column && reverse == false"></i>
                                        <i class="fas fa-arrow-circle-down" v-show="field == column && reverse == true"></i>
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
                                    <div class="m-b-xs">{{ post.body_trimmed }}</div>
                                    <a :href="'/article/' + post.slug" class="has-text-grey">Click to read on...</a>
                                </template>
                            </article-post>
                            <div class="m-b-md" style="background-color: #ededed; padding: 5px; text-align: right">
                                <a :href="'/admin/article/' + post.slug + '/edit'" class="button is-primary">Edit</a>
                                <button class="button is-text" @click.stop.prevent="showDeleteArticleModal(post)">Delete</button>
                            </div>
                        </div>
                        <div class="loading-articles has-text-centered" v-if="loading_posts">
                            <i class="fas fa-spinner fa-spin fa-4x"></i>
                            <br>
                            <div class="has-text-info">Loading Posts....</div>
                        </div>
                        <div id="admin-article-bottom"></div>
                    </div>
                    <div class="column">
                        <h2 class="title">Options</h2>
                        <ul>
                            <li>
                                <a href="/admin/article/create">
                                    <i class="fas fa-edit"></i>
                                    Create new Article    
                                </a>
                            </li>
                        </ul>
                    </div>
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
                name: 'article-management',
                title: 'Article Management'
            },
            showDeleteArticleModalState: false,
            posts: [],
            loading_posts: false,
            field: 'Created',
            reverse: true,
            columns: {
                published: 'Created',
                title: 'Title',
                author: 'Name'
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
            this.fetchNextPostSet();
        },

        customBottomCondition() {
            return this.last_page;
        },

        bottomAction() {
            this.fetchNextPostSet();
        },

        childSetUp() {
            eventHub.$on('article:deleted', this.removeArticle);
        },

        addPostsToArray(response) {
            let posts = response.data.data;

            if (! posts || 0 === posts.length) {
                this.$root.info('You have reached the last page!');
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

            let queryStringCompiled = queryString.stringify(urlParameters);

            axios.get('/api/v1/article?' + queryStringCompiled)
                .then(this.addPostsToArray, response => this.$root.error(response.error));

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
            this.$root.success('Article successfully deleted!');
        },
    }
});
</script>
