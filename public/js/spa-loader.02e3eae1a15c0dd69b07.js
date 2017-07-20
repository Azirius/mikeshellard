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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

/***/ "./resources/assets/js/spa-loader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spa_app_js__ = __webpack_require__("./resources/assets/js/spa/app.js");


var app = new Vue(__WEBPACK_IMPORTED_MODULE_0__spa_app_js__["a" /* default */]);

window.app = app;

/***/ }),

/***/ "./resources/assets/js/spa/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_js__ = __webpack_require__("./resources/assets/js/spa/components/home.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_home_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_post_js__ = __webpack_require__("./resources/assets/js/spa/components/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_profile_js__ = __webpack_require__("./resources/assets/js/spa/components/profile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_profile_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_profile_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__("./resources/assets/js/helpers.js");





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
                }
            },

            router: null
        };
    },
    attached: function attached() {
        this.router = new Router(this.routes);

        this.router.after(function (router, route, uri, response) {
            if (!router.isInitial && null == router.current) {
                document.location = uri;
                return response;
            }

            if (!router.isInitial || null != router.current) {
                $('#non-spa').hide();
            }

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["c" /* removeActiveClassFromParentListItems */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["d" /* addActiveClassToParentListItem */])('li > a[href="' + uri + '"]');

            return response;
        });

        $(window).on('popstate', function () {
            return app.route();
        });

        $('#app-container').on('click', 'a:not(.prevent)', function (e) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            app.route();
        });

        history.replaceState(null, document.title, document.location.href);

        this.route();
    },


    components: {
        home: __WEBPACK_IMPORTED_MODULE_0__components_home_js__["default"],
        post: __WEBPACK_IMPORTED_MODULE_1__components_post_js__["a" /* default */],
        profile: __WEBPACK_IMPORTED_MODULE_2__components_profile_js__["default"]
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
            this.notification = notification || '';
            this.setAlert(type);

            (function () {
                this.setAlert();
                this.notification = null;
            }).bind(this).debounce(2000)();

            return this;
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
            return this.router.route(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_js__["e" /* getURI */])());
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

/***/ "./resources/assets/js/spa/components/Page.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (Vue.extend({
    computed: {
        user: function user() {
            if (0 === this.$root.user().length) {
                return null;
            }

            return this.$root.user();
        }
    }
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/home.js":
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (133:1)\n\n\u001b[0m \u001b[90m 131 | \u001b[39m        }\n \u001b[90m 132 | \u001b[39m    }\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 133 | \u001b[39m}\u001b[33m;\u001b[39m\n \u001b[90m     | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 134 | \u001b[39m\u001b[0m\n");

/***/ }),

/***/ "./resources/assets/js/spa/components/post.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/post.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__post_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__Page_js__["a" /* default */].extend({
    props: ['on-load'],

    data: function data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: {},
            comments: {},
            featured_comment: null,
            comment: ''
        };
    },


    template: __WEBPACK_IMPORTED_MODULE_0__post_vue_html___default.a,

    attached: function attached() {
        this.onLoad(this);
    },


    methods: (_methods = {
        launch: function launch(params) {
            this.fetchPost(params.slug);
        },
        setPostData: function setPostData(response) {
            this.post = response.data;
            this.comments = this.post.comments;
            this.featured_comment = this.post.featured_comment;
        },
        addComment: function addComment(response) {
            this.comments.push(response.data);

            this.body = '';
        }
    }, _defineProperty(_methods, 'addComment', function addComment() {
        var _this = this;

        this.$http.post('/api/v1/article/' + this.post.slug + '/comments', { body: this.comment }).then(this.addComment, function (response) {
            return _this.$root.error(response.error);
        });
    }), _defineProperty(_methods, 'fetchPost', function fetchPost(slug) {
        var _this2 = this;

        this.$http.get('/api/v1/article/' + slug).then(this.setPostData, function (response) {
            return _this2.$root.error(response.error);
        });
    }), _methods)
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/post.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div>\n        <div class=\"jumbotron\">\n            <div class=\"container\">\n                <h1 v-html=\"post.title\"></h1>\n            </div>\n        </div>\n        <div class=\"container\">\n            <div class=\"blog-container\">\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i>\n                    <span v-if=\"post.user\"><a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a></span>\n                    <i class=\"fa fa-calendar\"></i><span v-text=\"post.nice_created_at\"></span>\n                </p>\n                <article class=\"blog-post clearfix\" v-html=\"post.body\"></article>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"container\">\n        <div v-if=\"!! featured_comment\">\n            <h2>Featured Comment</h2>\n            <div>\n                <h3>Featured comment by {{ featured_comment.authors_name }}</h3>\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ featured_comment.authors_slug }}\">{{ featured_comment.authors_name }}</a>\n                    <i class=\"fa fa-calendar\"></i> <span>{{ featured_comment.nice_created_at }}</span>\n                </p>\n                <div><blockquote>{{ featured_comment.body }}</blockquote></div>\n            </div>\n            <hr>\n        </div>\n        \n        <h2>Your Comments</h2>\n        <div v-if=\"comments.length === 0\">\n            <div class=\"alert alert-info\">\n                Nobody has commented here yet!\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"panel\" v-for=\"comment in comments\">\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ comment.authors_slug }}\">{{ comment.authors_name }}</a>\n                    <i class=\"fa fa-calendar\"></i> <span>{{ comment.nice_created_at }}</span>\n                </p>\n                <div>{{ comment.body }}</div>\n            </div>\n        </div>\n        \n        <h2>Add a new comment</h2>\n    \n        {{ user }}\n        <div v-if=\"user\">\n            <div class=\"form-group\">\n                <label class=\"control-label\"></label>\n                <textarea rows=\"10\" cols=\"50\" class=\"form-control\" v-model=\"comment\"></textarea>\n            </div>\n            \n            <button type=\"submit\" class=\"btn btn-default btn-primary btn-small\" @click=\"addComment\">\n                <i class=\"fa fa-btn fa-pencil\"></i> Submit Comment!\n            </button>\n        </div>\n        <div v-else>\n            <div class=\"panel panel-info\">\n                <div class=\"panel-body\">You need to be <a href=\"/login\">logged in</a> to comment on these articles!</div>\n            </div>\n        </div>\n        <br>\n    </div>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/components/profile.js":
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (40:0)\n\n\u001b[0m \u001b[90m 38 | \u001b[39m    }\n \u001b[90m 39 | \u001b[39m}\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 40 | \u001b[39m\n \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n");

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/spa-loader.js");


/***/ })

/******/ });