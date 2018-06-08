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

/***/ "./resources/assets/js/helpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export trimmer */
/* unused harmony export ltrim */
/* unused harmony export rtrim */
/* harmony export (immutable) */ __webpack_exports__["c"] = getURI;
/* harmony export (immutable) */ __webpack_exports__["a"] = removeActiveClassFromParentListItems;
/* harmony export (immutable) */ __webpack_exports__["b"] = addActiveClassToParentListItem;
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
    // #app-container > nav > div > div.navbar-start > a.navbar-item.is-active
    // $('#app-navbar-collapse ul').children('li.active').removeClass('active');
    // console.log($('#app-container > nav > div > div.navbar-start > a.navbar-item.is-active'));
    $('a.navbar-item.is-active').removeClass('is-active');
}

function addActiveClassToParentListItem(element) {
    // $(element).parent().filter('li').addClass('is-active');
    // console.log($(element).filter('li').text());
    console.log($(element));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spa_app_js__ = __webpack_require__("./resources/assets/js/spa/app.js");


var app = new Vue(__WEBPACK_IMPORTED_MODULE_0__spa_app_js__["a" /* default */]);

window.app = app;

/***/ }),

/***/ "./resources/assets/js/spa/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_js__ = __webpack_require__("./resources/assets/js/spa/components/home.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_post_js__ = __webpack_require__("./resources/assets/js/spa/components/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_profile_js__ = __webpack_require__("./resources/assets/js/spa/components/profile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_article_management_js__ = __webpack_require__("./resources/assets/js/spa/components/article-management.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_js__ = __webpack_require__("./resources/assets/js/helpers.js");






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

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers_js__["a" /* removeActiveClassFromParentListItems */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers_js__["b" /* addActiveClassToParentListItem */])('li > a[href="' + uri + '"]');

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
        home: __WEBPACK_IMPORTED_MODULE_0__components_home_js__["a" /* default */],
        post: __WEBPACK_IMPORTED_MODULE_1__components_post_js__["a" /* default */],
        profile: __WEBPACK_IMPORTED_MODULE_2__components_profile_js__["a" /* default */],
        articleManagement: __WEBPACK_IMPORTED_MODULE_3__components_article_management_js__["a" /* default */]
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
         * Handle an error, hands axios exceptions off to handleAxiosExceptions
         * @param  {object} error Error response
         * @return {void}       
         */
        handleError: function handleError(error) {
            if (error.response.data) {
                var errors = error.response.data.errors.body;
                var errorLength = errors.length;
                var errorMessage = '';
                for (var i = 0; i < errorLength; i++) {
                    errorMessage += errors[i];
                    if (i < errorLength - 1) {
                        errorMessage += '<br>';
                    }
                }
                this.error(errorMessage);
                return;
            }

            this.handleAxiosException(error);
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
            return this.router.route(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers_js__["c" /* getURI */])());
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

/***/ "./resources/assets/js/spa/components/article-management.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_js__ = __webpack_require__("./resources/assets/js/spa/modals/DeleteArticleModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/article-management.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__article_management_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");





Vue.component('DeleteArticleModal', __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3__Page_js__["a" /* default */].extend({
    props: ['on-load'],

    data: function data() {
        return {
            view: {
                name: 'article-management',
                title: 'Article Management'
            },
            displayDeleteArticleModal: false,
            posts: [],
            field: 'created',
            reverse: true,
            columns: {
                published: 'created',
                title: 'title',
                author: 'name'
            },
            queryParams: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false
        };
    },


    template: __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html___default.a,

    attached: function attached() {
        this.onLoad(this);

        var $window = $(window);
        var $stickyEl = $('#admin-article-search');
        var elTop = $stickyEl.offset().top;

        $window.scroll(function () {
            return $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });
    },
    detached: function detached() {
        this.removeScroll();
        this.resetPostData();
    },


    methods: {
        launch: function launch() {
            this.fetchNextPostSet();
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
            this.$broadcast('delete-modal:open', article);
            this.displayDeleteArticleModal = true;
        }
    },

    events: {
        'article:deleted': function articleDeleted(article) {
            this.posts.$remove(article);
            this.$root.success('Article successfully deleted!');
        }
    }
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/article-management.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <delete-article-modal :show.sync=\"displayDeleteArticleModal\"></delete-article-modal>\n\n    <div id=\"admin-article-search\" class=\"clearfix container\">\n        <div class=\"pull-left col-sm-4\">\n            <ul class=\"nav nav-pills order-box\">\n                <li v-for=\"column in columns\" class=\"nav-item\" :class=\"[field == column ? 'active' : '']\">\n                    <a class=\"nav-link\" @click=\"sortBy(column)\">\n                        {{ $key | capitalize }}\n                        <i class=\"fa fa-arrow-circle-up\" v-show=\"field == column && reverse == false\"></i>\n                        <i class=\"fa fa-arrow-circle-down\" v-show=\"field == column && reverse == true\"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <div class=\"pull-left col-sm-1\">\n            <div class=\"input-group input-group-lg\">\n                <select class=\"form-control\" v-model=\"queryParams.paginate\" @change=\"rePaginate\">\n                    <option :value=\"5\">5</option>\n                    <option :value=\"10\">10</option>\n                    <option :value=\"20\">20</option>\n                    <option :value=\"100\">100</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"pull-right col-sm-7\">\n            <div class=\"input-group input-group-lg\">\n                <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-search\"></i></span>\n                <input type=\"text\"\n                    name=\"search\"\n                    class=\"form-control\"\n                    v-model=\"queryParams.search\"\n                    @keyup.enter=\"search\">\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-9 article-admin-column\">\n                <div class=\"alert alert-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                    There are no posts. <a href=\"/admin/article/create\">Make one!</a>\n                </div>\n                <div v-for=\"post in posts\" :transition=\"fade\" style=\"margin: 20px\">\n                    <h1><a href=\"/article/{{ post.slug }}\" v-text=\"post.title\"></a></h1>\n                    <div v-html=\"post.body\"></div>\n                    <div style=\"background-color: #ededed; padding: 5px; margin-bottom: 10px; text-align: right\">\n                        <a href=\"/admin/article/{{ post.slug }}/edit\" class=\"btn btn-default\">Edit</a>\n                        <button class=\"btn btn-link\" @click.stop.prevent=\"showDeleteArticleModal(post)\">Delete</button>\n                    </div>\n                </div>\n                <div class=\"loading-articles text-center\" v-if=\"loading_posts\" transition=\"fade\">\n                    <i class=\"fa fa-refresh fa-spin fa-4x\"></i>\n                    <br>\n                    <p class=\"text text-info\">Loading Posts....</p>\n                </div>\n                <div id=\"admin-article-bottom\"></div>\n            </div>\n            <div class=\"col-sm-3\">\n                <h2>Options</h2>\n                <ul style=\"list-style-type: none;\">\n                    <li>\n                        <a href=\"/admin/article/create\">\n                            <i class=\"fa fa-pencil\"></i>\n                            Create new Article    \n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/components/home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/home.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__home_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");




/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2__Page_js__["a" /* default */].extend({
    props: ['on-load'],

    data: function data() {
        return {
            view: {
                name: 'home',
                title: 'Home'
            },
            posts: [],
            loading_posts: false,
            field: 'created',
            reverse: true,
            columns: {
                published: 'created',
                title: 'title',
                author: 'name'
            },
            params: {
                page: 1,
                search: '',
                paginate: 5
            },
            last_page: false
        };
    },


    template: __WEBPACK_IMPORTED_MODULE_1__home_vue_html___default.a,

    attached: function attached() {
        this.onLoad(this);

        var $window = $(window);
        var $stickyEl = $('#search');
        var elTop = $stickyEl.offset().top;

        $window.scroll(function () {
            return $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });
    },
    detached: function detached() {
        this.removeScroll();
        this.resetPostData();
    },


    methods: {
        launch: function launch() {
            this.fetchNextPostSet();
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
        fetchNextPostSet: function fetchNextPostSet() {
            var _this3 = this;

            if (this.loading_posts) {
                return;
            }

            this.loading_posts = true;

            var urlParameters = this.params;

            urlParameters[this.field] = this.reverse ? 'desc' : 'asc';

            var queryStringCompiled = __WEBPACK_IMPORTED_MODULE_0_query_string___default.a.stringify(urlParameters);

            axios.get('/api/v1/article?' + queryStringCompiled).then(this.addPostsToArray, function (response) {
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

/***/ "./resources/assets/js/spa/components/home.vue.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"section site-content\">\n    <div class=\"container\">\n        <div id=\"search\" class=\"clearfix tabs is-toggle\">\n            <div class=\"pull-left col-sm-4\">\n                <ul class=\"nav nav-pills order-box\">\n                    <li v-for=\"column in columns\" :class=\"[field == column ? 'is-active' : '']\">\n                        <a @click=\"sortBy(column)\">\n                            {{ $key | capitalize }}\n                            <span class=\"icon is-small\" v-show=\"field == column\">\n                                <i class=\"fas fa-arrow-circle-up\" v-show=\"field == column && reverse == false\"></i>\n                                <i class=\"fas fa-arrow-circle-down\" v-show=\"field == column && reverse == true\"></i>\n                            </span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n\n            <div class=\"pull-right\">\n                <div class=\"field has-addons\">\n                    <div class=\"control\">\n                        <span class=\"select\">\n                            <select v-model=\"params.paginate\" @change=\"rePaginate\">\n                                <option :value=\"5\">5</option>\n                                <option :value=\"10\">10</option>\n                                <option :value=\"20\">20</option>\n                                <option :value=\"100\">100</option>\n                            </select>\n                        </span>\n                    </div>\n                    <div class=\"control\">\n                        <input name=\"search\"\n                            class=\"input\"\n                            v-model=\"params.search\"\n                            @keyup.enter=\"search\"\n                            placeholder=\"Find an article\">\n                    </div>\n                    <div class=\"control\">\n                        <a class=\"button is-info\">\n                            <i class=\"fa fa-search\"></i>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"container\">\n            <hr/>\n            <div class=\"alert alert-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                There are no posts\n            </div>\n            <div class=\"blog-container\" v-for=\"post in posts\" :transition=\"fade\">\n                <h1 class=\"title\">\n                    <a href=\"/article/{{ post.slug }}\" v-html=\"post.title\"></a>\n                </h1>\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a>\n                    <i class=\"fa fa-calendar\"></i> <span v-text=\"post.nice_created_at\"></span>\n                </p>\n                <hr>\n                <p class=\"blog-post\" v-html=\"post.pages[0].body\"></p>\n            </div>\n            <div class=\"loading-articles has-text-centered\" v-if=\"loading_posts\" transition=\"fade\">\n                <i class=\"fas fa-spinner fa-spin fa-4x\"></i>\n                <br>\n                <div class=\"is-info\">Loading Posts....</div>\n            </div>\n            <div id=\"bottom\"></div>\n        </div>\n    </div>\n</section>\n";

/***/ }),

/***/ "./resources/assets/js/spa/components/post.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/post.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__post_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__Page_js__["a" /* default */].extend({
    props: ['on-load'],

    data: function data() {
        return {
            view: {
                name: 'post',
                title: 'Post'
            },
            post: {},
            author: {},
            comments: {},
            featured_comment: null,
            comment: ''
        };
    },


    template: __WEBPACK_IMPORTED_MODULE_0__post_vue_html___default.a,

    attached: function attached() {
        this.onLoad(this);
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
            return comment.id === this.featured_comment.id;
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

/***/ "./resources/assets/js/spa/components/post.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"container\">\n        <div class=\"blog-container m-t-md\">\n            <h1 class=\"title\">\n                <a href=\"/article/{{ post.slug }}\" v-html=\"post.title\"></a>\n            </h1>\n            <p class=\"blog-post-meta\">\n                <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ author.slug }}\" v-text=\"author.name\"></a>\n                <i class=\"fa fa-calendar\"></i> <span v-text=\"post.nice_created_at\"></span>\n            </p>\n            <hr>\n            <div v-for=\"page in post.pages\">\n                <p class=\"blog-post\" v-html=\"page.body\"></p>\n            </div>\n        </div>\n\n        <div v-if=\"!! featured_comment\">\n            <h2 class=\"subtitle\">Featured Comment</h2>\n            <p class=\"blog-post-meta\">\n                <!-- <i class=\"fa fa-user\"></i> -->\n                <img :src=\"featured_comment.user.gravatar.medium\" class=\"image is-64x64 m-r-md is-pulled-left\" style=\"border-radius: 50px;\">\n                <a href=\"/profile/{{ featured_comment.authors_slug }}\">{{ featured_comment.authors_name }}</a>\n                <i class=\"fa fa-calendar\"></i> <span>{{ featured_comment.nice_created_at }}</span>\n            </p>\n            <div>{{ featured_comment.body }}</div>\n            <hr class=\"m-b-m\">\n        </div>\n        \n        <h2 class=\"subtitle\">Add a new comment</h2>\n\n        <div v-if=\"currentUser\" class=\"m-b-md\">\n            <div class=\"field\">\n                <div class=\"control\">\n                    <textarea rows=\"10\" cols=\"50\" class=\"textarea\" v-model=\"comment\"></textarea>\n                </div>\n            </div>\n            \n            <div class=\"field\">\n                <div class=\"control\">\n                    <button type=\"submit\" class=\"button is-info\" @click=\"addComment\">\n                        <i class=\"fas fa-btn fa-edit m-r-xs\"></i> Submit Comment!\n                    </button>\n                </div>\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"panel panel-info\">\n                <div class=\"panel-body\">You need to be <a href=\"/login\">logged in</a> to comment on these articles!</div>\n            </div>\n        </div>\n\n        <h2 class=\"subtitle\">Comments</h2>\n        <div v-if=\"comments.length === 0\">\n            <div class=\"alert alert-info\">\n                Nobody has commented here yet!\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"panel m-b-md\" v-for=\"comment in comments\">\n                <p class=\"blog-post-meta\">\n                    <!-- <i class=\"fa fa-user\"></i> -->\n                    <img :src=\"comment.user.gravatar.medium\" class=\"image is-64x64 m-r-md is-pulled-left\" style=\"border-radius: 50px;\">\n                    <a href=\"/profile/{{ comment.authors_slug }}\" v-text=\"comment.authors_name\"></a>\n                    <i class=\"fa fa-calendar\"></i> <span>{{ comment.nice_created_at }}</span>\n                    <button class=\"button is-text\" @click.prevent=\"featureComment(comment)\" v-if=\"currentUser && ! isFeaturedComment(comment)\">\n                        <i class=\"fa fa-thumbs-up\"></i>\n                        Feature?\n                    </button>\n                </p>\n                <div>{{ comment.body }}</div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/components/profile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/profile.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__profile_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__Page_js__["a" /* default */].extend({
    props: ['on-load'],

    data: function data() {
        return {
            view: {
                name: 'user',
                title: 'User'
            },
            user: {},
            posts: {}
        };
    },


    template: __WEBPACK_IMPORTED_MODULE_0__profile_vue_html___default.a,

    attached: function attached() {
        this.onLoad(this);
    },


    methods: {
        launch: function launch(slug) {
            this.fetchUser(slug);
        },
        setUserData: function setUserData(response) {
            this.user = response.data;
            this.posts = response.data.articles;
        },
        fetchUser: function fetchUser(slug) {
            var _this = this;

            axios.get('/api/v1/user/' + slug).then(this.setUserData, function (response) {
                return _this.$root.error(response.error);
            });
        }
    }
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/profile.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <h1><span v-if=\"user.gravatar\"><img :src=\"user.gravatar.medium\" :alt=\"user.name\" class=\"img-circle\"></span> {{ user.name }}</h1>\n        </div>\n    </div>\n    \n    <div class=\"container\">\n        <div class=\"alert alert-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                There are no posts\n            </div>\n            <div class=\"blog-container\" v-for=\"post in posts\" transition=\"fade\">\n                <h2 class=\"blog-post-title\">\n                    <a href=\"/article/{{ post.slug }}\" v-html=\"post.title\"></a>\n                </h2>\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a>\n                    <i class=\"fa fa-calendar\"></i> <span v-text=\"post.nice_created_at\"></span>\n                </p>\n                <article class=\"blog-post clearfix\" v-html=\"post.body\"></article>\n                <hr v-if=\"$index + 1 < posts.length\" />\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/modals/DeleteArticleModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html__ = __webpack_require__("./resources/assets/js/spa/modals/delete-article-modal.vue.html");
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
            if ('OK' === response.statusText) {
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

/***/ "./resources/assets/js/spa/modals/delete-article-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show.sync=\"show\" :on-close=\"close\">\n    <div class=\"modal-header\">\n        <h3>Delete Article</h3>\n        <h5>{{ title }}</h5>\n    </div>\n\n    <div class=\"modal-body\">\n        Are you sure you want to delete this article?\n    </div>\n\n    <div class=\"modal-footer text-right\">\n        <button class=\"modal-default-button btn-lg\" @click=\"deletePost()\">\n            Yes\n        </button>\n\n        <button class=\"modal-default-button btn btn-link btn-lg\" @click=\"close()\">\n            No\n        </button>\n    </div>\n</modal>\n";

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/spa-loader.js");


/***/ })

/******/ });