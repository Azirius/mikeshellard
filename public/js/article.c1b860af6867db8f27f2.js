/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/helpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export trimmer */
/* unused harmony export ltrim */
/* unused harmony export rtrim */
/* harmony export (immutable) */ __webpack_exports__["e"] = getURI;
/* harmony export (immutable) */ __webpack_exports__["c"] = removeActiveClassFromParentListItems;
/* harmony export (immutable) */ __webpack_exports__["d"] = addActiveClassToParentListItem;
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
/* harmony export (immutable) */ __webpack_exports__["b"] = createSummernote;
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
    $('#app-navbar-collapse ul').children('li.active').removeClass('active');
}

function addActiveClassToParentListItem(element) {
    $(element).parent().filter('li').addClass('active');
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

/***/ "./resources/assets/js/modals/DeleteArticleModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html__ = __webpack_require__("./resources/assets/js/modals/delete-article-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    template: __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html___default.a,

    props: ['show'],

    data: function data() {
        return {
            title: '',
            slug: '',
            article: null
        };
    },

    methods: {
        close: function close() {
            this.show = false;
            this.title = '';
            this.slug = '';
            this.article = null;
        },
        deletePost: function deletePost() {
            this.$dispatch('article:deleted', this.article);
            axios.delete('/api/v1/article/' + this.slug).then(this.handle, this.handle).catch(function () {
                return null;
            });
        },
        handle: function handle(response) {
            if (response.ok) {
                this.close();
            } else {
                this.errors = response.data;
            }
        }
    },

    events: {
        'delete-modal:open': function deleteModalOpen(article) {
            this.title = article.title;
            this.slug = article.slug;
            this.article = article;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/modals/EditArticleModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_article_modal_vue_html__ = __webpack_require__("./resources/assets/js/modals/edit-article-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_article_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__edit_article_modal_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__("./resources/assets/js/helpers.js");



/* harmony default export */ __webpack_exports__["a"] = ({
    template: __WEBPACK_IMPORTED_MODULE_0__edit_article_modal_vue_html___default.a,

    props: ['show'],

    data: function data() {
        return {
            title: '',
            body: '',
            slug: '',
            score: '',
            errors: {},
            editor: null,
            article: null
        };
    },
    methods: {
        close: function close() {
            this.show = false;
            this.title = '';
            this.body = '';
            this.slug = '';
            this.score = '';
            this.article = null;

            this.editor.summernote('code', '');
            this.editor.summernote('destroy');
            this.editor = null;
        },
        savePost: function savePost() {
            var request = {
                body: this.editor.summernote('code'),
                title: this.title,
                score: this.score
            };

            axios.put('/api/v1/article/' + this.slug, request).then(this.handle, this.handle).catch(function () {
                return null;
            });
        },
        handle: function handle(response) {
            if (response.ok) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* extend */])(this.article, response.data.article);
                this.$dispatch('article:updated');
                this.close();
            } else {
                this.errors = response.data;
            }
        }
    },

    events: {
        'edit-modal:open': function editModalOpen(article) {
            this.body = article.body;
            this.title = article.title;
            this.slug = article.slug;
            this.score = article.score;
            this.article = article;

            this.editor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* createSummernote */])('summernote-edit');
            this.editor.summernote('code', this.body);

            $('.dropdown-toggle').dropdown();
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/modals/NewArticleModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__new_article_modal_vue_html__ = __webpack_require__("./resources/assets/js/modals/new-article-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__new_article_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__new_article_modal_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__("./resources/assets/js/helpers.js");



/* harmony default export */ __webpack_exports__["a"] = ({
    template: __WEBPACK_IMPORTED_MODULE_0__new_article_modal_vue_html___default.a,

    props: ['show'],

    data: function data() {
        return {
            title: '',
            body: '',
            score: '',
            errors: {},
            editor: null
        };
    },

    methods: {
        close: function close() {
            this.show = false;
            this.title = '';
            this.body = '';
            this.score = '';
            this.errors = {};

            this.editor.summernote('code', '');
            this.editor.summernote('destroy');
        },
        savePost: function savePost() {
            var request = {
                body: this.editor.summernote('code'),
                title: this.title,
                score: this.score
            };

            axios.post('/api/v1/article', request).then(this.handle, this.handle).catch(function () {
                return null;
            });
        },
        handle: function handle(response) {
            if (response.ok) {
                this.$dispatch('article:created', response.data);
                this.close();
            } else {
                console.log(response);
                this.errors = response.data;
            }
        }
    },

    events: {
        'new-modal:open': function newModalOpen(article) {
            this.editor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* createSummernote */])('summernote-new');
            $('.dropdown-toggle').dropdown();
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/modals/article.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NewArticleModal_js__ = __webpack_require__("./resources/assets/js/modals/NewArticleModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditArticleModal_js__ = __webpack_require__("./resources/assets/js/modals/EditArticleModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DeleteArticleModal_js__ = __webpack_require__("./resources/assets/js/modals/DeleteArticleModal.js");




Vue.component('NewArticleModal', __WEBPACK_IMPORTED_MODULE_0__NewArticleModal_js__["a" /* default */]);

Vue.component('EditArticleModal', __WEBPACK_IMPORTED_MODULE_1__EditArticleModal_js__["a" /* default */]);

Vue.component('DeleteArticleModal', __WEBPACK_IMPORTED_MODULE_2__DeleteArticleModal_js__["a" /* default */]);

var articles = new Vue({
    el: '#articles',

    data: {
        articles: {},
        displayNewArticleModal: false,
        displayEditArticleModal: false,
        displayDeleteArticleModal: false,
        articleMessage: false
    },

    methods: {
        getArticles: function getArticles() {
            this.$http.get('/api/v1/article').then(this.setArticles);
        },
        setArticles: function setArticles(response) {
            this.articles = response.data;
        },
        showEditArticleModal: function showEditArticleModal(article) {
            this.$broadcast('edit-modal:open', article);
            this.displayEditArticleModal = true;
        },
        showDeleteArticleModal: function showDeleteArticleModal(article) {
            this.$broadcast('delete-modal:open', article);
            this.displayDeleteArticleModal = true;
        },
        showNewArticleModal: function showNewArticleModal() {
            this.$broadcast('new-modal:open');
            this.displayNewArticleModal = true;
        },
        message: function message(text) {
            var _this = this;

            this.articleMessage = text;
            setTimeout(function () {
                return _this.articleMessage = false;
            }, 2500);
        }
    },

    ready: function ready() {
        this.getArticles();
    },


    events: {
        'article:updated': function articleUpdated() {
            this.message('Article successfully updated!');
        },
        'article:created': function articleCreated(response) {
            this.articles.push(response.article);
            this.message('Article successfully created!');
        },
        'article:deleted': function articleDeleted(article) {
            this.articles.$remove(article);
            this.message('Article successfully deleted!');
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/modals/delete-article-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show.sync=\"show\" :on-close=\"close\">\n    <div class=\"modal-header\">\n        <h3>Delete Article</h3>\n        <h5>{{ title }}</h5>\n    </div>\n\n    <div class=\"modal-body\">\n        Are you sure you want to delete this article?\n    </div>\n\n    <div class=\"modal-footer text-right\">\n        <button class=\"modal-default-button btn btn-primary btn-lg\" @click=\"deletePost()\">\n            Yes\n        </button>\n\n        <button class=\"modal-default-button btn btn-danger btn-lg\" @click=\"close()\">\n            No\n        </button>\n    </div>\n</modal>";

/***/ }),

/***/ "./resources/assets/js/modals/edit-article-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show.sync=\"show\" :on-close=\"close\">\n    <div class=\"modal-header\">\n        <h3>Edit Article</h3>\n        <h5>{{ title }}</h5>\n    </div>\n\n    <div class=\"modal-body\">\n        <div class=\"form-group\" :class=\"[errors.title ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Title\n            </label>\n            <input v-model=\"title\" class=\"form-control\" name=\"title\">\n            <span class=\"help-block\" v-if=\"errors.title\">{{ errors.title }}</span>\n        </div>\n        <div class=\"form-group\" :class=\"[errors.score ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Score\n            </label>\n            <select name=\"score\" v-model=\"score\" class=\"form-control\">\n                <option value=\"\">Choose a score</option>\n                <option :value=\"$index\" v-for=\"range in ([].length = 11)\">{{ $index }}</option>\n            </select>\n            <span class=\"help-block\" v-if=\"errors.score\">{{ errors.score }}</span>\n        </div>\n        <div class=\"form-group\" :class=\"[errors.body ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Body\n            </label>\n            <textarea v-model=\"body\" rows=\"5\" class=\"form-control\" id=\"summernote-edit\" name=\"body\"></textarea>\n            <span class=\"help-block\" v-if=\"errors.body\">{{ errors.body }}</span>\n        </div>\n    </div>\n\n    <div class=\"modal-footer text-right\">\n        <button class=\"modal-default-button btn btn-primary btn-lg\" @click=\"savePost()\">\n            Save\n        </button>\n\n        <button class=\"modal-default-button btn btn-danger btn-lg\" @click=\"close()\">\n            Cancel\n        </button>\n    </div>\n</modal>\n";

/***/ }),

/***/ "./resources/assets/js/modals/new-article-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show.sync=\"show\" :on-close=\"close\">\n    <div class=\"modal-header\">\n        <h3>New Article</h3>\n    </div>\n\n    <div class=\"modal-body\" >\n        <div class=\"form-group\" :class=\"[errors.title ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Title\n            </label>\n            <input v-model=\"title\" class=\"form-control\" name=\"title\">\n            <span class=\"help-block\" v-if=\"errors.title\">{{ errors.title }}</span>\n        </div>\n        <div class=\"form-group\" :class=\"[errors.score ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Score\n            </label>\n            <select name=\"score\" v-model=\"score\" class=\"form-control\">\n                <option value=\"\">Choose a score</option>\n                <option :value=\"$index\" v-for=\"range in ([].length = 11)\">{{ $index }}</option>\n            </select>\n            <span class=\"help-block\" v-if=\"errors.score\">{{ errors.score }}</span>\n        </div>\n        <div class=\"form-group\" :class=\"[errors.body ? 'has-error' : '']\">\n            <label class=\"form-label\">\n                Body\n            </label>\n            <textarea v-model=\"body\" rows=\"5\" class=\"form-control\" id=\"summernote-new\" name=\"body\"></textarea>\n            <span class=\"help-block\" v-if=\"errors.body\">{{ errors.body }}</span>\n        </div>\n\n    </div>\n\n    <div class=\"modal-footer text-right\">\n        <button class=\"modal-default-button btn btn-primary btn-lg\" @click=\"savePost()\">\n            Save\n        </button>\n\n        <button class=\"modal-default-button btn btn-danger btn-lg\" @click=\"close()\">\n            Cancel\n        </button>\n    </div>\n</modal>\n";

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/modals/article.js");


/***/ })

/******/ });