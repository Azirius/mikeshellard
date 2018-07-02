/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/ArticlePost.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['user', 'post'],

    name: 'ArticlePost'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/Avatar.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['user', 'avatarClass', 'size'],

    name: 'Avatar',

    data: function data() {
        return {
            sizeMap: {
                small: ' is-24x24',
                large: ''
            },
            currentUser: null
        };
    },

    mounted: function mounted() {
        this.currentUser = this.user ? this.user : this.$root.user();
    },

    methods: {
        getAvatarSource: function getAvatarSource() {
            return this.currentUser.gravatar.large;
        },
        getAvatarClass: function getAvatarClass() {
            var avatarClass = this.avatarClass;

            return avatarClass + this.sizeMap[this.size];
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/Pagination.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    inheritAttrs: false,

    props: {
        items: {
            type: [Array, Object],
            default: Array
        },
        perPage: Number
    },

    data: function data() {
        return {
            currentPage: 1
        };
    },


    computed: {
        pageItems: function pageItems() {
            var _this = this;

            var items = [];

            if (!Array.isArray(this.items)) {
                items = Object.keys(this.items).map(function (i) {
                    return _this.items[i];
                });
            } else {
                items = this.items;
            }

            if (!items) {
                items = [];
            }

            return items;
        },

        itemCount: function itemCount() {
            return this.pageItems.length;
        },

        pages: function pages() {
            return Math.ceil(this.itemCount / this.perPage);
        },

        lastPage: function lastPage() {
            return this.pages;
        },

        firstPage: function firstPage() {
            return 1;
        },

        itemsToDisplay: function itemsToDisplay() {
            var from = (this.currentPage - 1) * this.perPage;
            var to = from + this.perPage;

            return this.pageItems.slice(from, to);
        }
    },

    methods: {
        goToFirstPage: function goToFirstPage() {
            this.setPage(this.firstPage);
        },
        goToLastPage: function goToLastPage() {
            this.setPage(this.lastPage);
        },
        goToNextPage: function goToNextPage() {
            if (this.currentPage + 1 === this.lastPage) {
                return;
            }

            this.setPage(this.currentPage + 1);
        },
        goToPreviousPage: function goToPreviousPage() {
            if (this.currentPage === 1) {
                return;
            }

            this.setPage(this.currentPage - 1);
        },
        goToThisPage: function goToThisPage(page) {
            if (page < 1 || page > this.lastPage) {
                return;
            }

            this.setPage(page);
        },
        setPage: function setPage(page) {
            this.currentPage = page;
        },
        isOnFirstPage: function isOnFirstPage() {
            return this.firstPage === this.currentPage;
        },
        isOnLastPage: function isOnLastPage() {
            return this.lastPage === this.currentPage;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/ChangeEmailModal.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['user', 'show'],

    data: function data() {
        return {
            email: this.user.email,
            errors: []
        };
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        validate: function validate() {
            if (this.email === this.user.email) {
                this.$root.error('You already have this email!');
                return false;
            }

            return true;
        },
        updateEmail: function updateEmail() {
            if (!this.validate()) {
                return;
            }

            axios.put('/api/v1/user/update-email', { email: this.email }).then(this.handle, this.$root.handleError).catch(this.$root.handleError);
        },
        handle: function handle(response) {
            if ('OK' === response.statusText && 200 === response.status) {
                this.user.email = this.email;
                eventHub.$emit('change-email-modal:updated');
                this.close();
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/DeleteArticleModal.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['show'],

    data: function data() {
        return {
            title: '',
            slug: '',
            article: null
        };
    },

    mounted: function mounted() {
        var _this = this;

        eventHub.$on('delete-modal:open', function (article) {
            _this.title = article.title;
            _this.slug = article.slug;
            _this.article = article;
        });
    },
    destroyed: function destroyed() {
        eventHub.$off('delete-modal:open');
    },


    methods: {
        close: function close() {
            this.$emit('close');
            this.title = '';
            this.slug = '';
            this.article = null;
        },
        deletePost: function deletePost() {
            eventHub.$emit('article:deleted', this.article);
            axios.delete('/api/v1/article/' + this.slug).then(this.handle, this.$root.handleError).catch(this.$root.handleError);
        },
        handle: function handle(response) {
            if ('OK' === response.statusText && 200 === response.status) {
                this.close();
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/GravatarModal.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['show'],

    methods: {
        close: function close() {
            this.$emit('close');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/ArticleManagement.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_vue__ = __webpack_require__("./resources/assets/js/spa/modals/DeleteArticleModal.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





Vue.component('DeleteArticleModal', __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_vue___default.a);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2__components_Page_js__["a" /* default */].extend({
    data: function data() {
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
            last_page: false
        };
    },
    destroyed: function destroyed() {
        this.removeScroll();
        this.resetPostData();
        eventHub.$off('article:deleted');
    },


    methods: {
        launch: function launch() {
            this.fetchNextPostSet();
        },
        childSetUp: function childSetUp() {
            eventHub.$on('article:deleted', this.removeArticle);

            this.setUpScroll();
        },
        removeScroll: function removeScroll() {
            $(window).off('scroll');
        },
        setUpScroll: function setUpScroll() {
            var _this = this;

            if ($('#admin-article-bottom').isOnScreen()) {
                this.fetchNextPostSet();
            }

            $(window).scroll(function () {
                if (_this.last_page) {
                    return;
                }

                if ($('#admin-article-bottom').isOnScreen()) {
                    _this.fetchNextPostSet();
                }
            }.debounce(1000));
        },
        addPostsToArray: function addPostsToArray(response) {
            var _this2 = this;

            var posts = response.data.data;

            if (!posts || 0 === posts.length) {
                this.$root.info('You have reached the last page!');
                this.last_page = true;
            } else {
                posts.forEach(function (post) {
                    return _this2.posts.push(post);
                });
                this.queryParams.page++;
            }

            this.loading_posts = false;
        },
        fetchNextPostSet: function fetchNextPostSet() {
            var _this3 = this;

            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            var urlParameters = this.queryParams;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            var queryStringCompiled = __WEBPACK_IMPORTED_MODULE_0_query_string___default.a.stringify(urlParameters);

            axios.get('/api/v1/article?' + queryStringCompiled).then(this.addPostsToArray, function (response) {
                return _this3.$root.error(response.error);
            });
        },
        resetPostData: function resetPostData() {
            this.posts = [];
            this.queryParams.page = 1;
            this.last_page = false;
        },
        sortBy: function sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.queryParams[this.field];
            this.field = field;
            this.fetchNextPostSet();
        },
        search: function search() {
            this.resetPostData();
            this.fetchNextPostSet();
        },
        rePaginate: function rePaginate() {
            this.resetPostData();
            this.fetchNextPostSet();
        },
        showDeleteArticleModal: function showDeleteArticleModal(article) {
            eventHub.$emit('delete-modal:open', article);
            this.showDeleteArticleModalState = true;
        },
        hideDeleteArticleModel: function hideDeleteArticleModel() {
            this.showDeleteArticleModalState = false;
        },
        removeArticle: function removeArticle(article) {
            var index = this.posts.indexOf(article);
            this.posts.splice(index, 1);
            this.$root.success('Article successfully deleted!');
        }
    }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Dashboard.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modals_ChangeEmailModal_vue__ = __webpack_require__("./resources/assets/js/spa/modals/ChangeEmailModal.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modals_ChangeEmailModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modals_ChangeEmailModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_GravatarModal_vue__ = __webpack_require__("./resources/assets/js/spa/modals/GravatarModal.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_GravatarModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modals_GravatarModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





Vue.component('ChangeEmailModal', __WEBPACK_IMPORTED_MODULE_0__modals_ChangeEmailModal_vue___default.a);
Vue.component('GravatarModal', __WEBPACK_IMPORTED_MODULE_1__modals_GravatarModal_vue___default.a);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2__components_Page_js__["a" /* default */].extend({
    data: function data() {
        return {
            view: {
                name: 'dashboard',
                title: 'Dashboard'
            },
            showChangeEmailModalState: false,
            showChangeAvatarModalState: false
        };
    },
    destroyed: function destroyed() {
        eventHub.$off('change-email-modal:updated');
    },


    methods: {
        childSetUp: function childSetUp() {
            var _this = this;

            eventHub.$on('change-email-modal:updated', function () {
                _this.$root.success('Your email was successfully updated!');
            });
        },
        showChangeEmailModal: function showChangeEmailModal() {
            this.showChangeEmailModalState = true;
        },
        hideChangeEmailModel: function hideChangeEmailModel() {
            this.showChangeEmailModalState = false;
        },
        showGravatarModal: function showGravatarModal() {
            this.showChangeAvatarModalState = true;
        },
        hideGravatarModal: function hideGravatarModal() {
            this.showChangeAvatarModalState = false;
        }
    }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Home.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_Page_js__["a" /* default */].extend({
    data: function data() {
        return {
            view: {
                name: 'home',
                title: 'Home'
            },
            posts: [],
            loading_posts: false,
            field: 'Created',
            reverse: true,
            columns: {
                published: 'Created',
                title: 'Title',
                author: 'Name'
            },
            params: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false
        };
    },
    destroyed: function destroyed() {
        this.removeScroll();
        this.resetPostData();
    },


    methods: {
        launch: function launch() {
            this.fetchNextPostSet();
        },
        childSetUp: function childSetUp() {
            this.setUpScroll();
        },
        removeScroll: function removeScroll() {
            $(window).off('scroll');
        },
        setUpScroll: function setUpScroll() {
            var _this = this;

            if ($('#bottom').isOnScreen()) {
                this.fetchNextPostSet();
            }

            $(window).scroll(function () {
                if (_this.last_page) {
                    return;
                }

                if ($('#bottom').isOnScreen()) {
                    _this.fetchNextPostSet();
                }
            }.debounce(1000));
        },
        addPostsToArray: function addPostsToArray(response) {
            var _this2 = this;

            var posts = response.data.data;

            if (!posts || 0 === posts.length) {
                this.$root.info('You have reached the last page!');
                this.last_page = true;
            } else {
                posts.forEach(function (post) {
                    return _this2.posts.push(post);
                });
                this.params.page++;
            }

            this.loading_posts = false;
        },
        loadPosts: function loadPosts(queryString) {
            return axios.get('/api/v1/article?' + queryString);
        },
        fetchNextPostSet: function fetchNextPostSet() {
            var _this3 = this;

            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            var urlParameters = this.params;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            this.loadPosts(__WEBPACK_IMPORTED_MODULE_0_query_string___default.a.stringify(urlParameters)).then(this.addPostsToArray, function (response) {
                return _this3.$root.error(response.error);
            });
        },
        resetPostData: function resetPostData() {
            this.posts = [];
            this.params.page = 1;
            this.last_page = false;
        },
        sortBy: function sortBy(field) {
            this.resetPostData();
            this.reverse = this.field === field ? !this.reverse : true;
            delete this.params[this.field];
            this.field = field;
            this.fetchNextPostSet();
        },
        search: function search() {
            this.resetPostData();
            this.fetchNextPostSet();
        },
        rePaginate: function rePaginate() {
            this.resetPostData();
            this.fetchNextPostSet();
        }
    }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Post.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue__ = __webpack_require__("./resources/assets/js/spa/components/ArticlePost.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Pagination_vue__ = __webpack_require__("./resources/assets/js/spa/components/Pagination.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Pagination_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





Vue.component('ArticlePost', __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue___default.a);
Vue.component('Pagination', __WEBPACK_IMPORTED_MODULE_2__components_Pagination_vue___default.a);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Page_js__["a" /* default */].extend({
    data: function data() {
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


    methods: {
        launch: function launch(params) {
            this.fetchPost(params.slug);
        },
        setPostData: function setPostData(response) {
            this.post = response.data;
            this.author = this.post.user;
            this.comments = this.post.comments;
            this.featured_comment = this.post.featured_comment;
        },
        pushComment: function pushComment(response) {
            this.comments.push(response.data);
            this.comment = '';
            this.$root.success('Your comment was successfully added!');
        },
        addComment: function addComment() {
            axios.post('/api/v1/article/' + this.post.slug + '/comments', { body: this.comment }).then(this.pushComment).catch(this.$root.handleError);
        },
        featureComment: function featureComment(comment) {
            var _this = this;

            if (this.isFeaturedComment(comment)) {
                this.$root.error('This comment has already been featured here!');
                return;
            }

            axios.post('/api/v1/comment/' + comment.id + '/feature').then(function () {
                _this.featured_comment = comment;_this.$root.success('Comment featured successfully!');
            }).catch(this.$root.handleError);
        },
        isFeaturedComment: function isFeaturedComment(comment) {
            return comment.id === (this.featured_comment && this.featured_comment.id);
        },
        fetchPost: function fetchPost(slug) {
            var _this2 = this;

            axios.get('/api/v1/article/' + slug).then(this.setPostData, function (response) {
                return _this2.$root.error(response.error);
            });
        }
    }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Profile.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue__ = __webpack_require__("./resources/assets/js/spa/components/ArticlePost.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Avatar_vue__ = __webpack_require__("./resources/assets/js/spa/components/Avatar.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Avatar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Avatar_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





Vue.component('Avatar', __WEBPACK_IMPORTED_MODULE_2__components_Avatar_vue___default.a);
Vue.component('ArticlePost', __WEBPACK_IMPORTED_MODULE_1__components_ArticlePost_vue___default.a);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Page_js__["a" /* default */].extend({
    data: function data() {
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
        launch: function launch(slug) {
            this.fetchUser(slug);
            this.fetchUserAbilities(slug);
        },
        setUserData: function setUserData(response) {
            this.user = response.data;
            this.posts = response.data.articles;
        },
        loadUser: function loadUser(slug) {
            return axios.get('/api/v1/user/' + slug);
        },
        fetchUser: function fetchUser(slug) {
            var _this = this;

            this.loadUser(slug).then(this.setUserData, function (response) {
                return _this.$root.error(response.error);
            });
        },
        setUserAbilities: function setUserAbilities(response) {
            var abilities = response.data.map(function (abilitiy) {
                return abilitiy.name;
            });

            this.abilities = abilities;
        },
        loadUserAbilities: function loadUserAbilities(slug) {
            return axios.get('/api/v1/user/' + slug + '/abilities');
        },
        fetchUserAbilities: function fetchUserAbilities(slug) {
            var _this2 = this;

            this.loadUserAbilities(slug).then(this.setUserAbilities, function (response) {
                return _this2.$root.error(response.error);
            });
        },
        can: function can(abilitiy) {
            var canUser = false;

            this.abilities.forEach(function (currentAbility) {
                if (abilitiy === currentAbility) {
                    canUser = true;
                }
            });

            return canUser;
        }
    }
}));

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__("./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__("./node_modules/object-assign/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0aa9df3c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "section",
      { staticClass: "section site-content" },
      [
        _c("change-email-modal", {
          attrs: { user: _vm.currentUser, show: _vm.showChangeEmailModalState },
          on: {
            close: function($event) {
              _vm.hideChangeEmailModel()
            }
          }
        }),
        _vm._v(" "),
        _c("gravatar-modal", {
          attrs: { show: _vm.showChangeAvatarModalState },
          on: {
            close: function($event) {
              _vm.hideGravatarModal()
            }
          }
        }),
        _vm._v(" "),
        _c("avatar", {
          attrs: {
            user: _vm.currentUser,
            size: "large",
            "avatar-class": "is-hidden-mobile avatar-has-profile"
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "container container-into-hero" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-content" }, [
              _c("p", { staticClass: "title is-4 has-bottom-highlight" }, [
                _vm._v(
                  "Welcome to your dashboard, " +
                    _vm._s(_vm.currentUser.name) +
                    "!"
                )
              ]),
              _vm._v(" "),
              _c("ul", [
                _c("li", [
                  _c("i", { staticClass: "fas fa-at" }),
                  _vm._v(" "),
                  _c("a", { on: { click: _vm.showChangeEmailModal } }, [
                    _vm._v("Change email")
                  ])
                ]),
                _vm._v(" "),
                _c("li", [
                  _c("i", { staticClass: "fas fa-image" }),
                  _vm._v(" "),
                  _c("a", { on: { click: _vm.showGravatarModal } }, [
                    _vm._v("Change avatar")
                  ])
                ])
              ])
            ])
          ])
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "hero is-medium is-info" }, [
      _c("div", { staticClass: "hero-body" }, [
        _c("div", { staticClass: "container" }, [
          _c("h1", { staticClass: "title" }, [
            _vm._v("\n                    Dashboard\n                ")
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0aa9df3c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1209afd1\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Profile.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.user && _vm.abilities
    ? _c("div", [
        _c("section", { staticClass: "hero is-medium is-info" }, [
          _c("div", { staticClass: "hero-body" }, [
            _c("div", { staticClass: "container" }, [
              _c("h1", { staticClass: "is-1 title" }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.user.name) +
                    "'s Profile\n                "
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "section",
          { staticClass: "section site-content" },
          [
            _c("avatar", {
              attrs: {
                user: _vm.user,
                size: "large",
                "avatar-class": "is-hidden-mobile avatar-has-profile"
              }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("div", { staticClass: "container container-into-hero" }, [
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "card-content" }, [
                  _vm.can("manage-articles") && _vm.posts
                    ? _c(
                        "div",
                        { staticClass: "m-b-lg" },
                        [
                          _c(
                            "h1",
                            { staticClass: "title is-2 has-bottom-highlight" },
                            [_vm._v(_vm._s(_vm.user.name) + "'s Posts!")]
                          ),
                          _vm._v(" "),
                          0 === _vm.posts.length
                            ? _c("div", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.user.name) +
                                    " currently has no posts!\n                        "
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.posts, function(post, index) {
                            return _c(
                              "div",
                              { staticClass: "blog-container" },
                              [
                                _c(
                                  "article-post",
                                  { attrs: { user: _vm.user, post: post } },
                                  [
                                    _c("template", { slot: "post-body" }, [
                                      _c("div", { staticClass: "m-b-xs" }, [
                                        _vm._v(_vm._s(post.body_trimmed))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "a",
                                        {
                                          staticClass: "has-text-grey",
                                          attrs: {
                                            href: "/article/" + post.slug
                                          }
                                        },
                                        [_vm._v("Click to read on...")]
                                      )
                                    ])
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                index + 1 < _vm.posts.length
                                  ? _c("hr")
                                  : _vm._e()
                              ],
                              1
                            )
                          })
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c(
                        "h1",
                        { staticClass: "title is-2 has-bottom-highlight" },
                        [
                          _vm._v(
                            _vm._s(_vm.user.name) + "'s 10 most recent comments"
                          )
                        ]
                      ),
                      _vm._v(" "),
                      0 === _vm.user.comments.length
                        ? _c("div", { staticClass: "notification is-info" }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.user.name) +
                                " has not actually commented on anything!\n                        "
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.user.comments, function(comment, index) {
                        return _c(
                          "div",
                          {
                            staticClass: "m-t-lg",
                            class: [
                              1 === index % 2
                                ? "has-text-left"
                                : "has-text-right"
                            ]
                          },
                          [
                            _c("p", { staticClass: "blog-post-meta" }, [
                              _c("i", { staticClass: "fa fa-calendar" }),
                              _vm._v(" Comment Published "),
                              _c("span", {
                                domProps: {
                                  textContent: _vm._s(comment.nice_created_at)
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("p", { staticClass: "m-t-md" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(comment.body) +
                                  "\n                            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("small", { staticClass: "is-muted m-t-md" }, [
                              _vm._v(
                                "\n                                Posted on "
                              ),
                              _c(
                                "a",
                                {
                                  attrs: {
                                    href: "/article/" + comment.article.slug
                                  }
                                },
                                [_vm._v(_vm._s(comment.article.title))]
                              )
                            ])
                          ]
                        )
                      })
                    ],
                    2
                  )
                ])
              ])
            ])
          ],
          1
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1209afd1", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-226f0528\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Post.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.post
    ? _c("section", { staticClass: "section site-content" }, [
        _c("div", { staticClass: "container" }, [
          _c(
            "div",
            { staticClass: "blog-container m-t-md" },
            [
              _c(
                "article-post",
                { attrs: { user: _vm.author, post: _vm.post } },
                [
                  _c(
                    "template",
                    { slot: "post-body" },
                    [
                      _c("pagination", {
                        staticClass: "m-b-md",
                        attrs: { items: _vm.post.pages, "per-page": 1 },
                        scopedSlots: _vm._u([
                          {
                            key: "pagination-item",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("h3", {
                                  staticClass: "subtitle",
                                  domProps: {
                                    textContent: _vm._s(item.subtitle)
                                  }
                                }),
                                _vm._v(" "),
                                _c("p", {
                                  staticClass: "blog-post",
                                  domProps: { innerHTML: _vm._s(item.body) }
                                })
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c("hr")
            ],
            1
          ),
          _vm._v(" "),
          _c("h2", { staticClass: "subtitle" }, [_vm._v("Add a new comment")]),
          _vm._v(" "),
          _vm.currentUser
            ? _c("div", { staticClass: "m-b-md" }, [
                _c("div", { staticClass: "field" }, [
                  _c("div", { staticClass: "control" }, [
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.comment,
                          expression: "comment"
                        }
                      ],
                      staticClass: "textarea",
                      attrs: { rows: "10", cols: "50" },
                      domProps: { value: _vm.comment },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.comment = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "field" }, [
                  _c("div", { staticClass: "control" }, [
                    _c(
                      "button",
                      {
                        staticClass: "button is-info",
                        attrs: { type: "submit" },
                        on: { click: _vm.addComment }
                      },
                      [
                        _c("i", { staticClass: "fas fa-btn fa-edit m-r-xs" }),
                        _vm._v(" Submit Comment!\n                    ")
                      ]
                    )
                  ])
                ])
              ])
            : _c("div", [_vm._m(0)]),
          _vm._v(" "),
          !!_vm.featured_comment
            ? _c("div", { staticClass: "featured-comment" }, [
                _c("h2", { staticClass: "subtitle" }, [
                  _vm._v("Featured Comment")
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "blog-post-meta" }, [
                  _c("img", {
                    staticClass: "image is-64x64 m-r-md is-pulled-left avatar",
                    attrs: { src: _vm.featured_comment.user.gravatar.medium }
                  }),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "/profile/" + _vm.featured_comment.authors_slug
                      }
                    },
                    [_vm._v(_vm._s(_vm.featured_comment.authors_name))]
                  ),
                  _vm._v(" "),
                  _c("i", { staticClass: "fa fa-calendar" }),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(_vm._s(_vm.featured_comment.nice_created_at))
                  ])
                ]),
                _vm._v(" "),
                _c("div", [_vm._v(_vm._s(_vm.featured_comment.body))])
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("h2", { staticClass: "subtitle" }, [_vm._v("Comments")]),
          _vm._v(" "),
          0 === _vm.comments.length
            ? _c("div", [
                _c("div", { staticClass: "notification is-info" }, [
                  _vm._v(
                    "\n                Nobody has commented here yet!\n            "
                  )
                ])
              ])
            : _c(
                "div",
                _vm._l(_vm.comments, function(comment) {
                  return _c("div", { staticClass: "panel m-b-md" }, [
                    _c("div", { staticClass: "columns" }, [
                      _c("div", { staticClass: "column is-narrow" }, [
                        _c("img", {
                          staticClass: "image is-64x64 avatar",
                          attrs: { src: comment.user.gravatar.large }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "column" }, [
                        _c("p", { staticClass: "blog-post-meta" }, [
                          _c("a", {
                            attrs: { href: "/profile/" + comment.authors_slug },
                            domProps: {
                              textContent: _vm._s(comment.authors_name)
                            }
                          }),
                          _vm._v(" "),
                          _c("i", { staticClass: "fa fa-calendar" }),
                          _vm._v(" "),
                          _c("span", {
                            domProps: {
                              textContent: _vm._s(comment.nice_created_at)
                            }
                          }),
                          _vm._v(" "),
                          _vm.currentUser && !_vm.isFeaturedComment(comment)
                            ? _c(
                                "button",
                                {
                                  staticClass: "button is-text",
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.featureComment(comment)
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa m-r-xs fa-thumbs-up"
                                  }),
                                  _vm._v(
                                    "\n                                Feature?\n                            "
                                  )
                                ]
                              )
                            : _vm.isFeaturedComment(comment)
                              ? _c(
                                  "span",
                                  { staticClass: "has-text-primary m-l-md" },
                                  [
                                    _c("i", {
                                      staticClass: "fas m-r-xxs fa-thumbs-up"
                                    }),
                                    _vm._v(
                                      "\n                                Featured!\n                            "
                                    )
                                  ]
                                )
                              : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", {
                          domProps: { textContent: _vm._s(comment.body) }
                        })
                      ])
                    ])
                  ])
                })
              )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "m-b-md" }, [
      _c("div", { staticClass: "panel-body" }, [
        _vm._v("You need to be "),
        _c("a", { attrs: { href: "/login" } }, [_vm._v("logged in")]),
        _vm._v(" to comment on these articles!")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-226f0528", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-27e43f34\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/Pagination.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "pagination-focus" },
      [
        _vm._l(_vm.itemsToDisplay, function(item) {
          return _vm._t("pagination-item", null, { item: item })
        })
      ],
      2
    ),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c(
      "nav",
      {
        staticClass: "pagination",
        attrs: { role: "navigation", "aria-label": "pagination" }
      },
      [
        _c(
          "ul",
          { staticClass: "pagination-list" },
          [
            _c("li", [
              _c(
                "a",
                {
                  staticClass: "pagination-link",
                  attrs: { disabled: _vm.isOnFirstPage() },
                  on: { click: _vm.goToFirstPage }
                },
                [_vm._v("First Page")]
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.pages, function(page) {
              return _c("li", { key: page }, [
                _c("a", {
                  staticClass: "pagination-link",
                  class: { "is-current": page === _vm.currentPage },
                  domProps: { textContent: _vm._s(page) },
                  on: {
                    click: function($event) {
                      _vm.goToThisPage(page)
                    }
                  }
                })
              ])
            }),
            _vm._v(" "),
            _c("li", [
              _c(
                "a",
                {
                  staticClass: "pagination-link",
                  attrs: { disabled: _vm.isOnLastPage() },
                  on: { click: _vm.goToLastPage }
                },
                [_vm._v("Last Page")]
              )
            ])
          ],
          2
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-27e43f34", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3df02ca5\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/Avatar.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.currentUser
    ? _c("div", [
        _c("img", {
          staticClass: "image avatar",
          class: _vm.getAvatarClass(),
          attrs: { src: _vm.getAvatarSource(), alt: "avatar" }
        })
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3df02ca5", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4f55ac32\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "section site-content" }, [
    _c(
      "div",
      { staticClass: "container" },
      [
        _c("pinned", [
          _c("div", { staticClass: "tabs is-toggle is-hidden-touch" }, [
            _c("div", { staticClass: "pull-left" }, [
              _c(
                "ul",
                _vm._l(_vm.columns, function(column) {
                  return _c(
                    "li",
                    { class: [_vm.field == column ? "is-active" : ""] },
                    [
                      _c(
                        "a",
                        {
                          on: {
                            click: function($event) {
                              _vm.sortBy(column)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(column) +
                              "\n                                "
                          ),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.field == column,
                                  expression: "field == column"
                                }
                              ],
                              staticClass: "icon is-small"
                            },
                            [
                              _c("i", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.field == column &&
                                      _vm.reverse == false,
                                    expression:
                                      "field == column && reverse == false"
                                  }
                                ],
                                staticClass: "fas fa-arrow-circle-up"
                              }),
                              _vm._v(" "),
                              _c("i", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.field == column &&
                                      _vm.reverse == true,
                                    expression:
                                      "field == column && reverse == true"
                                  }
                                ],
                                staticClass: "fas fa-arrow-circle-down"
                              })
                            ]
                          )
                        ]
                      )
                    ]
                  )
                })
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "pull-right" }, [
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("span", { staticClass: "select" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.params.paginate,
                            expression: "params.paginate"
                          }
                        ],
                        on: {
                          change: [
                            function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.$set(
                                _vm.params,
                                "paginate",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.rePaginate
                          ]
                        }
                      },
                      [
                        _c("option", { domProps: { value: 5 } }, [_vm._v("5")]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 10 } }, [
                          _vm._v("10")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 20 } }, [
                          _vm._v("20")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 100 } }, [
                          _vm._v("100")
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.params.search,
                        expression: "params.search"
                      }
                    ],
                    staticClass: "input",
                    attrs: { name: "search", placeholder: "Find an article" },
                    domProps: { value: _vm.params.search },
                    on: {
                      keyup: function($event) {
                        if (
                          !("button" in $event) &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.search($event)
                      },
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.params, "search", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c("a", { staticClass: "button is-info" }, [
                    _c("i", { staticClass: "fa fa-search" })
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "container" },
          [
            _c("hr"),
            _vm._v(" "),
            0 === _vm.posts.length && false === _vm.loading_posts
              ? _c("div", { staticClass: "notification is-info" }, [
                  _vm._v("\n                There are no posts\n            ")
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.posts, function(post, index) {
              return _c(
                "div",
                { staticClass: "blog-container" },
                [
                  _c(
                    "article-post",
                    {
                      staticClass: "m-b-lg",
                      attrs: { user: post.user, post: post }
                    },
                    [
                      _c("template", { slot: "post-body" }, [
                        _c("div", { staticClass: "m-b-xs" }, [
                          _vm._v(_vm._s(post.body_trimmed))
                        ]),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            staticClass: "has-text-grey",
                            attrs: { href: "/article/" + post.slug }
                          },
                          [_vm._v("Click to read on...")]
                        )
                      ])
                    ],
                    2
                  )
                ],
                1
              )
            }),
            _vm._v(" "),
            _vm.loading_posts
              ? _c(
                  "div",
                  { staticClass: "loading-articles has-text-centered" },
                  [
                    _c("i", { staticClass: "fas fa-spinner fa-spin fa-4x" }),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("div", { staticClass: "has-text-info" }, [
                      _vm._v("Loading Posts....")
                    ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { attrs: { id: "bottom" } })
          ],
          2
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f55ac32", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-54e6a001\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/ArticleManagement.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "section site-content" }, [
    _c(
      "div",
      { staticClass: "container" },
      [
        _c("delete-article-modal", {
          attrs: { show: _vm.showDeleteArticleModalState },
          on: {
            close: function($event) {
              _vm.hideDeleteArticleModel()
            }
          }
        }),
        _vm._v(" "),
        _c("pinned", [
          _c("div", { staticClass: "is-hidden-touch tabs is-toggle" }, [
            _c("div", { staticClass: "pull-left" }, [
              _c(
                "ul",
                _vm._l(_vm.columns, function(column) {
                  return _c(
                    "li",
                    { class: [_vm.field == column ? "is-active" : ""] },
                    [
                      _c(
                        "a",
                        {
                          on: {
                            click: function($event) {
                              _vm.sortBy(column)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(column) +
                              "\n                                "
                          ),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.field == column,
                                  expression: "field == column"
                                }
                              ],
                              staticClass: "icon is-small"
                            },
                            [
                              _c("i", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.field == column &&
                                      _vm.reverse == false,
                                    expression:
                                      "field == column && reverse == false"
                                  }
                                ],
                                staticClass: "fas fa-arrow-circle-up"
                              }),
                              _vm._v(" "),
                              _c("i", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.field == column &&
                                      _vm.reverse == true,
                                    expression:
                                      "field == column && reverse == true"
                                  }
                                ],
                                staticClass: "fas fa-arrow-circle-down"
                              })
                            ]
                          )
                        ]
                      )
                    ]
                  )
                })
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "pull-right" }, [
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("span", { staticClass: "select" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.queryParams.paginate,
                            expression: "queryParams.paginate"
                          }
                        ],
                        on: {
                          change: [
                            function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.$set(
                                _vm.queryParams,
                                "paginate",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.rePaginate
                          ]
                        }
                      },
                      [
                        _c("option", { domProps: { value: 5 } }, [_vm._v("5")]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 10 } }, [
                          _vm._v("10")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 20 } }, [
                          _vm._v("20")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 100 } }, [
                          _vm._v("100")
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.queryParams.search,
                        expression: "queryParams.search"
                      }
                    ],
                    staticClass: "input",
                    attrs: { name: "search", placeholder: "Find an article" },
                    domProps: { value: _vm.queryParams.search },
                    on: {
                      keyup: function($event) {
                        if (
                          !("button" in $event) &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.search($event)
                      },
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.queryParams, "search", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c("a", { staticClass: "button is-info" }, [
                    _c("i", { staticClass: "fa fa-search" })
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "columns" }, [
            _c(
              "div",
              { staticClass: "column is-two-thirds article-admin-column" },
              [
                0 === _vm.posts.length && false === _vm.loading_posts
                  ? _c("div", { staticClass: "notification is-info" }, [
                      _vm._v("\n                        There are no posts. "),
                      _c("a", { attrs: { href: "/admin/article/create" } }, [
                        _vm._v("Make one!")
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.posts, function(post) {
                  return _c(
                    "div",
                    [
                      _c(
                        "article-post",
                        {
                          staticClass: "m-b-md",
                          attrs: { user: post.user, post: post }
                        },
                        [
                          _c("template", { slot: "post-body" }, [
                            _c("div", { staticClass: "m-b-xs" }, [
                              _vm._v(_vm._s(post.body_trimmed))
                            ]),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass: "has-text-grey",
                                attrs: { href: "/article/" + post.slug }
                              },
                              [_vm._v("Click to read on...")]
                            )
                          ])
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "m-b-md",
                          staticStyle: {
                            "background-color": "#ededed",
                            padding: "5px",
                            "text-align": "right"
                          }
                        },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "button is-primary",
                              attrs: {
                                href: "/admin/article/" + post.slug + "/edit"
                              }
                            },
                            [_vm._v("Edit")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "button is-text",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  $event.preventDefault()
                                  _vm.showDeleteArticleModal(post)
                                }
                              }
                            },
                            [_vm._v("Delete")]
                          )
                        ]
                      )
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _vm.loading_posts
                  ? _c(
                      "div",
                      { staticClass: "loading-articles has-text-centered" },
                      [
                        _c("i", {
                          staticClass: "fas fa-spinner fa-spin fa-4x"
                        }),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c("div", { staticClass: "has-text-info" }, [
                          _vm._v("Loading Posts....")
                        ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { attrs: { id: "admin-article-bottom" } })
              ],
              2
            ),
            _vm._v(" "),
            _vm._m(0)
          ])
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "column" }, [
      _c("h2", { staticClass: "title" }, [_vm._v("Options")]),
      _vm._v(" "),
      _c("ul", [
        _c("li", [
          _c("a", { attrs: { href: "/admin/article/create" } }, [
            _c("i", { staticClass: "fas fa-edit" }),
            _vm._v(
              "\n                                Create new Article    \n                            "
            )
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-54e6a001", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-59ee0c9e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/DeleteArticleModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal", { attrs: { show: _vm.show }, on: { close: _vm.close } }, [
    _c("div", { staticClass: "modal-card" }, [
      _c("div", { staticClass: "modal-card-head" }, [
        _c("p", { staticClass: "modal-card-title" }, [
          _vm._v("Delete Article: '" + _vm._s(_vm.title) + "'")
        ]),
        _vm._v(" "),
        _c("button", {
          staticClass: "delete",
          attrs: { "aria-label": "close" },
          on: {
            click: function($event) {
              _vm.close()
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-body" }, [
        _vm._v(
          "\n            Are you sure you want to delete this article?\n        "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-foot text-right" }, [
        _c(
          "button",
          {
            staticClass: "button is-success",
            on: {
              click: function($event) {
                _vm.deletePost()
              }
            }
          },
          [_vm._v("\n                Yes\n            ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button",
            on: {
              click: function($event) {
                _vm.close()
              }
            }
          },
          [_vm._v("\n                No\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-59ee0c9e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5d0db03d\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/GravatarModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal", { attrs: { show: _vm.show }, on: { close: _vm.close } }, [
    _c("div", { staticClass: "modal-card" }, [
      _c("div", { staticClass: "modal-card-head" }, [
        _c("h1", { staticClass: "modal-card-title" }, [
          _vm._v("Changing your avatar")
        ]),
        _vm._v(" "),
        _c("button", {
          staticClass: "delete",
          attrs: { "aria-label": "close" },
          on: {
            click: function($event) {
              _vm.close()
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-body" }, [
        _vm._v("\n            I use "),
        _c("p", { staticClass: "has-text-bold has-text-info is-inline" }, [
          _vm._v("Gravatar")
        ]),
        _vm._v(
          " to handle the avatars on this website, so if you don't currently\n            have an account, go make one "
        ),
        _c("a", { attrs: { href: "https://en.gravatar.com/" } }, [
          _vm._v("here")
        ]),
        _vm._v(
          ". The email used on this account will be the one we\n            use to look up your Gravatar! Otherwise, you'll be stuck with a default avatar:\n            "
        ),
        _c("p", { staticClass: "has-text-centered m-t-md" }, [
          _c("img", {
            attrs: {
              src:
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y",
              alt: "Default Avatar"
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-foot" }, [
        _c(
          "button",
          {
            staticClass: "button is-success",
            on: {
              click: function($event) {
                _vm.close()
              }
            }
          },
          [_vm._v("\n                Okay!\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d0db03d", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-826a2ccc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/ArticlePost.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h3", { staticClass: "blog-post-title" }, [
        _c("a", {
          attrs: { href: "/article/" + _vm.post.slug },
          domProps: { innerHTML: _vm._s(_vm.post.title) }
        })
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "blog-post-meta" }, [
        _c("i", { staticClass: "fa fa-user" }),
        _vm._v(" "),
        _c("a", {
          attrs: { href: "/profile/" + _vm.user.slug },
          domProps: { textContent: _vm._s(_vm.user.name) }
        }),
        _vm._v(" "),
        _c("i", { staticClass: "fa fa-calendar" }),
        _vm._v(" Published "),
        _c("span", {
          domProps: { textContent: _vm._s(_vm.post.nice_created_at) }
        }),
        _vm._v(" "),
        _c("i", { staticClass: "fas fa-comments m-l-xs" }),
        _vm._v(" "),
        _c("span", {
          domProps: { textContent: _vm._s(_vm.post.comment_count) }
        }),
        _vm._v(
          " Comment" +
            _vm._s(
              _vm.post.comment_count === 0 || _vm.post.comment_count > 1
                ? "s"
                : ""
            ) +
            "\n    "
        )
      ]),
      _vm._v(" "),
      _vm._t("post-body")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-826a2ccc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c51eec86\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/ChangeEmailModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal", { attrs: { show: _vm.show }, on: { close: _vm.close } }, [
    _c("div", { staticClass: "modal-card" }, [
      _c("div", { staticClass: "modal-card-head" }, [
        _c("h1", { staticClass: "modal-card-title" }, [_vm._v("Change email")]),
        _vm._v(" "),
        _c("button", {
          staticClass: "delete",
          attrs: { "aria-label": "close" },
          on: {
            click: function($event) {
              _vm.close()
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-body" }, [
        _vm._v("\n            Change your email:\n            "),
        _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "control has-icons-left" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.email,
                  expression: "email"
                }
              ],
              staticClass: "input is-m",
              attrs: {
                type: "email",
                name: "email",
                placeholder: "Your Email",
                required: ""
              },
              domProps: { value: _vm.email },
              on: {
                keyup: function($event) {
                  if (
                    !("button" in $event) &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  _vm.updateEmail()
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.email = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "icon is-small is-left" }, [
              _c("i", { staticClass: "fas fa-envelope" })
            ])
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "help" }, [
            _vm._v(
              "\n                    Changing your email will change the email you use to login. The email must be unique - as in you can not\n                    use another persons email address.\n                "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card-foot" }, [
        _c(
          "button",
          {
            staticClass: "button is-success",
            on: {
              click: function($event) {
                _vm.updateEmail()
              }
            }
          },
          [_vm._v("\n                Update\n            ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button",
            on: {
              click: function($event) {
                _vm.close()
              }
            }
          },
          [_vm._v("\n                No\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c51eec86", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/helpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export trimmer */
/* unused harmony export ltrim */
/* unused harmony export rtrim */
/* harmony export (immutable) */ __webpack_exports__["b"] = getURI;
/* harmony export (immutable) */ __webpack_exports__["c"] = removeActiveClassFromParentListItems;
/* harmony export (immutable) */ __webpack_exports__["a"] = addActiveClassToParentListItem;
/* unused harmony export extend */
/* unused harmony export createSummernote */
function trimmer(string, charlist) {
    string = ltrim(string, charlist);
    return rtrim(string, charlist);
};

function ltrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp('^[' + charlist + ']*'), '');
};

function rtrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp('[' + charlist + ']*$'), '');
};

function getURI() {
    return document.location.pathname;
}

function removeActiveClassFromParentListItems() {
    $('a.navbar-item.is-active').removeClass('is-active');
}

function addActiveClassToParentListItem(element) {
    $(element).addClass('is-active');
}

function extend(to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
    return to;
}

/**
 * Create an instance of summernote
 * @param  {string} id ID of textarea to transform
 * @return {object}
 */
function createSummernote(id) {
    var editor = $('#' + id).summernote({
        minHeight: 300,
        defaultFontName: 'Tahoma',
        disableResizeEditor: true,
        dialogsInBody: true
    });

    $('.note-editor').css({ 'height': '100%' });
    $('.note-editing-area').css({ 'height': 'inherit' });
    $('.note-resizebar').hide();

    return editor;
}

/**
 * Debounce
 *
 * Usage: function(){}.debounce(threshold);
 *
 * @param  {int} threshold How long to hold of on execution
 * @return {function}
 */
Function.prototype.debounce = function (threshold) {
    var callback = this;
    var timeout;
    return function () {
        var context = this;
        var params = arguments;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            callback.apply(context, params);
        }, threshold);
    };
};

/***/ }),

/***/ "./resources/assets/js/spa-loader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spa_spa_index_js__ = __webpack_require__("./resources/assets/js/spa/spa-index.js");


var app = new Vue(__WEBPACK_IMPORTED_MODULE_0__spa_spa_index_js__["a" /* default */]);

window.app = app;

/***/ }),

/***/ "./resources/assets/js/spa/components/ArticlePost.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/ArticlePost.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-826a2ccc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/ArticlePost.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/components/ArticlePost.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-826a2ccc", Component.options)
  } else {
    hotAPI.reload("data-v-826a2ccc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/components/Avatar.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/Avatar.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3df02ca5\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/Avatar.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/components/Avatar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3df02ca5", Component.options)
  } else {
    hotAPI.reload("data-v-3df02ca5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/components/Page.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (Vue.extend({
    props: ['on-load'],

    mounted: function mounted() {
        this.onLoad(this);
        this.childSetUp();
    },

    methods: {
        childSetUp: function childSetUp() {}
    },

    computed: {
        currentUser: function currentUser() {
            if (0 === this.$root.user().length) {
                return null;
            }

            return this.$root.user();
        },
        apiToken: function apiToken() {
            return mikeshellard.api_token;
        },
        csrfToken: function csrfToken() {
            return mikeshellard.crsf_token;
        }
    }
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/Pagination.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/components/Pagination.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-27e43f34\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/components/Pagination.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/components/Pagination.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27e43f34", Component.options)
  } else {
    hotAPI.reload("data-v-27e43f34", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/modals/ChangeEmailModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/ChangeEmailModal.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c51eec86\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/ChangeEmailModal.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/modals/ChangeEmailModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c51eec86", Component.options)
  } else {
    hotAPI.reload("data-v-c51eec86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/modals/DeleteArticleModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/DeleteArticleModal.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-59ee0c9e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/DeleteArticleModal.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/modals/DeleteArticleModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-59ee0c9e", Component.options)
  } else {
    hotAPI.reload("data-v-59ee0c9e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/modals/GravatarModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/modals/GravatarModal.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5d0db03d\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/modals/GravatarModal.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/modals/GravatarModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d0db03d", Component.options)
  } else {
    hotAPI.reload("data-v-5d0db03d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/pages/ArticleManagement.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/ArticleManagement.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-54e6a001\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/ArticleManagement.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/pages/ArticleManagement.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54e6a001", Component.options)
  } else {
    hotAPI.reload("data-v-54e6a001", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Dashboard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0aa9df3c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Dashboard.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0aa9df3c", Component.options)
  } else {
    hotAPI.reload("data-v-0aa9df3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/pages/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Home.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4f55ac32\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Home.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/pages/Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f55ac32", Component.options)
  } else {
    hotAPI.reload("data-v-4f55ac32", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/pages/Post.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Post.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-226f0528\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Post.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/pages/Post.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-226f0528", Component.options)
  } else {
    hotAPI.reload("data-v-226f0528", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/pages/Profile.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/spa/pages/Profile.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1209afd1\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/spa/pages/Profile.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/spa/pages/Profile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1209afd1", Component.options)
  } else {
    hotAPI.reload("data-v-1209afd1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/spa/spa-index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Home_vue__ = __webpack_require__("./resources/assets/js/spa/pages/Home.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_Post_vue__ = __webpack_require__("./resources/assets/js/spa/pages/Post.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_Post_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pages_Post_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_Profile_vue__ = __webpack_require__("./resources/assets/js/spa/pages/Profile.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_Profile_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__pages_Profile_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_ArticleManagement_vue__ = __webpack_require__("./resources/assets/js/spa/pages/ArticleManagement.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_ArticleManagement_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pages_ArticleManagement_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_Dashboard_vue__ = __webpack_require__("./resources/assets/js/spa/pages/Dashboard.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_Dashboard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__pages_Dashboard_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_js__ = __webpack_require__("./resources/assets/js/helpers.js");







/* harmony default export */ __webpack_exports__["a"] = ({
    el: '#app-container',

    data: function data() {
        var _this = this;

        return {
            view: '',

            alert: false,

            notification: null,

            routes: {
                '/': function _() {
                    return _this.setView('home');
                },

                'article/:slug': function articleSlug(slug) {
                    return _this.setView('post', { slug: slug });
                },

                'profile/:slug': function profileSlug(slug) {
                    return _this.setView('profile', slug);
                },

                'admin/article': function adminArticle() {
                    return _this.setView('articleManagement');
                },

                'dashboard': function dashboard() {
                    return _this.setView('dashboard');
                }
            },

            router: null
        };
    },
    mounted: function mounted() {
        this.router = new Router(this.routes);

        this.router.after(function (router, route, uri, response) {
            if (!router.isInitial && null == router.current) {
                document.location = uri;
                return response;
            }

            if (!router.isInitial || null != router.current) {
                $('#non-spa').hide();
            }

            Object(__WEBPACK_IMPORTED_MODULE_5__helpers_js__["c" /* removeActiveClassFromParentListItems */])();
            Object(__WEBPACK_IMPORTED_MODULE_5__helpers_js__["a" /* addActiveClassToParentListItem */])('a[href="' + uri + '"]');

            return response;
        });

        $(window).on('popstate', function () {
            return app.route();
        });

        $('#app-container').on('click', 'a:not(.prevent)', function (e) {
            // Hide navbar drop down on 'mobile'
            $('.navbar-burger').removeClass('is-active');
            $('#navMenu').removeClass('is-active');

            e.preventDefault();
            history.pushState(null, null, e.target.href);
            app.route();
        });

        history.replaceState(null, document.title, document.location.href);

        this.route();
    },


    components: {
        home: __WEBPACK_IMPORTED_MODULE_0__pages_Home_vue___default.a,
        post: __WEBPACK_IMPORTED_MODULE_1__pages_Post_vue___default.a,
        profile: __WEBPACK_IMPORTED_MODULE_2__pages_Profile_vue___default.a,
        articleManagement: __WEBPACK_IMPORTED_MODULE_3__pages_ArticleManagement_vue___default.a,
        dashboard: __WEBPACK_IMPORTED_MODULE_4__pages_Dashboard_vue___default.a
    },

    methods: {
        /**
         * Set the alert type
         * @param {string} type Alert type
         */
        setAlert: function setAlert(type) {
            this.alert = type || false;
        },


        /**
         * Fire off the actual alert
         * @param  {string}  type         Alert type
         * @param  {string}  notification Alert notification
         * @return {Vue}
         */
        makeAlert: function makeAlert(type, notification) {
            this.setAlert(type);
            this.notification = notification || '';

            (function () {
                this.setAlert();
                this.notification = null;
            }).bind(this).debounce(2000)();

            return this;
        },


        /**
         * Handle an error, hands axios exceptions off to handleAxiosExceptions
         * @param  {object} error Error response
         * @return {void}       
         */
        handleError: function handleError(error) {
            if (error.response.data) {
                return this.handleValidationError(error);
            }

            this.handleAxiosException(error);
        },
        handleValidationError: function handleValidationError(error) {
            var errors = error.response.data.errors;
            var errorMessage = '';

            for (var key in errors) {
                var currentError = errors[key];
                var errorLength = currentError.length;

                if (typeof currentError === 'string') {
                    errorMessage += '<p>' + currentError + '<p>';
                } else {
                    for (var i = 0; i < errorLength; i++) {
                        errorMessage += currentError[i];
                        if (i < errorLength - 1) {
                            errorMessage += '<br>';
                        }
                    }
                }
            }

            this.error(errorMessage);
        },


        /**
         * Handle an Axios exception
         * @param  {object} error Error thrown from Axios
         * @return {void}       
         */
        handleAxiosException: function handleAxiosException(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        },


        /**
         * Fires an error message
         * @param  {string} notification Error notification
         * @return {Vue}
         */
        error: function error(notification) {
            return this.makeAlert('danger', notification || 'Sorry, something went wrong!');
        },


        /**
         * Fires an info message
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        info: function info(notification) {
            return this.makeAlert('info', notification);
        },


        /**
         * Fires an info message
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        success: function success(notification) {
            return this.makeAlert('success', notification);
        },
        user: function user() {
            return window.mikeshellard.user;
        },


        /**
         * Fire the launcher on the root on completion of child load
         * @param  {Object} view Route to fire launch
         * @return {void}
         */
        onChildLoad: function onChildLoad(view) {
            var launcher = view.launch;

            if (launcher && typeof launcher === 'function') {
                launcher(this.params);
            }
        },
        route: function route() {
            return this.router.route(Object(__WEBPACK_IMPORTED_MODULE_5__helpers_js__["b" /* getURI */])());
        },


        /**
         * Set the view
         * @param {string} newView The view to set
         * @param {object} params Params to send to child
         */
        setView: function setView(view) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.view = view;
            this.params = params;
        },


        /**
         * Get current view
         * @return {string}
         */
        getView: function getView() {
            return this.view;
        }
    }
});

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/spa-loader.js");


/***/ })

/******/ });