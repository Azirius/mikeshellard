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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_post_js__ = __webpack_require__("./resources/assets/js/spa/components/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_profile_js__ = __webpack_require__("./resources/assets/js/spa/components/profile.js");
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
        home: __WEBPACK_IMPORTED_MODULE_0__components_home_js__["a" /* default */],
        post: __WEBPACK_IMPORTED_MODULE_1__components_post_js__["a" /* default */],
        profile: __WEBPACK_IMPORTED_MODULE_2__components_profile_js__["a" /* default */]
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
    methods: {
        user: function user() {
            return this.$root.user();
        }
    }
}));

/***/ }),

/***/ "./resources/assets/js/spa/components/home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/home.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__home_vue_html__);



/* harmony default export */ __webpack_exports__["a"] = ({
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

        if (this.$root.user().id == 1) {
            var $window = $(window);
            var $stickyEl = $('#search');
            var elTop = $stickyEl.offset().top;

            $window.scroll(function () {
                return $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
            });
        }
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

            this.$http.get('/api/v1/article?' + queryStringCompiled).then(this.addPostsToArray, function (response) {
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
});

/***/ }),

/***/ "./resources/assets/js/spa/components/home.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <h1>Most recent articles!</h1>\n        </div>\n    </div>\n\n    <div id=\"search\" class=\"clearfix container\" v-if=\"$root.user().id == 1\">\n        <div class=\"pull-left col-sm-4\">\n            <ul class=\"nav nav-pills order-box\">\n                <li v-for=\"column in columns\" class=\"nav-item\" :class=\"[field == column ? 'active' : '']\">\n                    <a class=\"nav-link\" @click=\"sortBy(column)\">\n                        {{ $key | capitalize }}\n                        <i class=\"fa fa-arrow-circle-up\" v-show=\"field == column && reverse == false\"></i>\n                        <i class=\"fa fa-arrow-circle-down\" v-show=\"field == column && reverse == true\"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <div class=\"pull-left col-sm-1\">\n            <div class=\"input-group input-group-lg\">\n                <select class=\"form-control\" v-model=\"params.paginate\" @change=\"rePaginate\">\n                    <option :value=\"5\">5</option>\n                    <option :value=\"10\">10</option>\n                    <option :value=\"20\">20</option>\n                    <option :value=\"100\">100</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"pull-right col-sm-7\">\n            <div class=\"input-group input-group-lg\">\n                <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-search\"></i></span>\n                <input type=\"text\"\n                    name=\"search\"\n                    id=\"search\"\n                    class=\"form-control\"\n                    v-model=\"params.search\"\n                    @keyup.enter=\"search\">\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <hr/>\n        <div class=\"alert alert-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n            There are no posts\n        </div>\n        <div class=\"blog-container\" v-for=\"post in posts\" :transition=\"fade\">\n            <h2 class=\"blog-post-title\">\n                <a href=\"/article/{{ post.slug }}\" v-html=\"post.title\"></a>\n            </h2>\n            <p class=\"blog-post-meta\">\n                <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a>\n                <i class=\"fa fa-calendar\"></i> <span v-text=\"post.nice_created_at\"></span>\n            </p>\n            <article class=\"blog-post clearfix\" v-html=\"post.body\"></article>\n            <hr v-if=\"$index + 1 < posts.length\" />\n        </div>\n        <div class=\"loading-articles text-center\" v-if=\"loading_posts\" transition=\"fade\">\n            <i class=\"fa fa-refresh fa-spin fa-4x\"></i>\n            <br>\n            <p class=\"text text-info\">Loading Posts....</p>\n        </div>\n        <div id=\"bottom\"></div>\n    </div>\n</div>";

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

module.exports = "<div>\n    <div>\n        <div class=\"jumbotron\">\n            <div class=\"container\">\n                <h1 v-html=\"post.title\"></h1>\n            </div>\n        </div>\n        <div class=\"container\">\n            <div class=\"blog-container\">\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i>\n                    <span v-if=\"post.user\"><a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a></span>\n                    <i class=\"fa fa-calendar\"></i><span v-text=\"post.nice_created_at\"></span>\n                </p>\n                <article class=\"blog-post clearfix\" v-html=\"post.body\"></article>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"container\">\n        <div v-if=\"!! featured_comment\">\n            <h2>Featured Comment</h2>\n            <div>\n                <h3>Featured comment by {{ featured_comment.authors_name }}</h3>\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ featured_comment.authors_slug }}\">{{ featured_comment.authors_name }}</a>\n                    <i class=\"fa fa-calendar\"></i> <span>{{ featured_comment.nice_created_at }}</span>\n                </p>\n                <div><blockquote>{{ featured_comment.body }}</blockquote></div>\n            </div>\n            <hr>\n        </div>\n        \n        <h2>Your Comments</h2>\n        <div v-if=\"comments.length === 0\">\n            <div class=\"alert alert-info\">\n                Nobody has commented here yet!\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"panel\" v-for=\"comment in comments\">\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ comment.authors_slug }}\">{{ comment.authors_name }}</a>\n                    <i class=\"fa fa-calendar\"></i> <span>{{ comment.nice_created_at }}</span>\n                </p>\n                <div>{{ comment.body }}</div>\n            </div>\n        </div>\n        \n        <h2>Add a new comment</h2>\n\n        <div v-if=\"user()\">\n            <div class=\"form-group\">\n                <label class=\"control-label\"></label>\n                <textarea rows=\"10\" cols=\"50\" class=\"form-control\" v-model=\"comment\"></textarea>\n            </div>\n            \n            <button type=\"submit\" class=\"btn btn-default btn-primary btn-small\" @click=\"addComment\">\n                <i class=\"fa fa-btn fa-pencil\"></i> Submit Comment!\n            </button>\n        </div>\n        <div v-else>\n            <div class=\"panel panel-info\">\n                <div class=\"panel-body\">You need to be <a href=\"/login\">logged in</a> to comment on these articles!</div>\n            </div>\n        </div>\n        <br>\n    </div>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/components/profile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/profile.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__profile_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
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

            this.$http.get('/api/v1/user/' + slug).then(this.setUserData, function (response) {
                return _this.$root.error(response.error);
            });
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/spa/components/profile.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <h1><span v-if=\"user.gravatar\">{{{ user.gravatar.medium }}}</span> {{ user.name }}</h1>\n        </div>\n    </div>\n    \n    <div class=\"container\">\n        <div class=\"alert alert-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                There are no posts\n            </div>\n            <div class=\"blog-container\" v-for=\"post in posts\" transition=\"fade\">\n                <h2 class=\"blog-post-title\">\n                    <a href=\"/article/{{ post.slug }}\" v-html=\"post.title\"></a>\n                </h2>\n                <p class=\"blog-post-meta\">\n                    <i class=\"fa fa-user\"></i> <a href=\"/profile/{{ post.user.slug }}\" v-text=\"post.user.name\"></a>\n                    <i class=\"fa fa-calendar\"></i> <span v-text=\"post.nice_created_at\"></span>\n                </p>\n                <article class=\"blog-post clearfix\" v-html=\"post.body\"></article>\n                <hr v-if=\"$index + 1 < posts.length\" />\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/spa-loader.js");


/***/ })

/******/ });