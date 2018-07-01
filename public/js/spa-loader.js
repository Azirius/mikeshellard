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

/***/ "./resources/assets/js/spa/components/ArticlePost.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArticlePost_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/ArticlePost.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArticlePost_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ArticlePost_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['user', 'post'],

    name: 'ArticlePost',

    methods: {},

    template: __WEBPACK_IMPORTED_MODULE_0__ArticlePost_vue_html___default.a
});

/***/ }),

/***/ "./resources/assets/js/spa/components/ArticlePost.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <h3 class=\"blog-post-title\">\n        <a :href=\"'/article/' + post.slug \" v-html=\"post.title\"></a>\n    </h3>\n    <p class=\"blog-post-meta\">\n        <i class=\"fa fa-user\"></i> <a :href=\"'/profile/' + user.slug\" v-text=\"user.name\"></a>\n        <i class=\"fa fa-calendar\"></i> Published <span v-text=\"post.nice_created_at\"></span>\n        <i class=\"fas fa-comments m-l-xs\"></i> <span v-text=\"post.comment_count\"></span> Comment{{ post.comment_count === 0 || post.comment_count > 1 ? 's' : '' }}\n    </p>\n    <slot name=\"post-body\"></slot>\n</div>\n";

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

/***/ "./resources/assets/js/spa/components/Pagination.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination_template_vue_html__ = __webpack_require__("./resources/assets/js/spa/components/pagination-template.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination_template_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pagination_template_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    inheritAttrs: false,

    template: __WEBPACK_IMPORTED_MODULE_0__pagination_template_vue_html___default.a,

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

/***/ "./resources/assets/js/spa/components/pagination-template.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"pagination-focus\">\n        <slot v-for=\"item in itemsToDisplay\" :item=\"item\" name=\"pagination-item\"></slot>\n    </div>\n    <br>\n    <nav class=\"pagination\" role=\"navigation\" aria-label=\"pagination\">\n        <ul class=\"pagination-list\">\n            <li>\n                <a class=\"pagination-link\" @click=\"goToFirstPage\" :disabled=\"isOnFirstPage()\">First Page</a>\n            </li>\n            <li v-for=\"page in pages\" :key=\"page\">\n                <a class=\"pagination-link\" :class=\"{'is-current': (page) === currentPage}\" @click=\"goToThisPage(page)\" v-text=\"page\"></a>\n                \n            </li>\n            <li>\n                <a class=\"pagination-link\" @click=\"goToLastPage\" :disabled=\"isOnLastPage()\">Last Page</a>\n            </li>\n        </ul>\n    </nav>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/modals/ChangeEmailModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_email_modal_vue_html__ = __webpack_require__("./resources/assets/js/spa/modals/change-email-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_email_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__change_email_modal_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['user', 'show'],

    template: __WEBPACK_IMPORTED_MODULE_0__change_email_modal_vue_html___default.a,

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

/***/ "./resources/assets/js/spa/modals/DeleteArticleModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html__ = __webpack_require__("./resources/assets/js/spa/modals/delete-article-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['show'],

    template: __WEBPACK_IMPORTED_MODULE_0__delete_article_modal_vue_html___default.a,

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

/***/ "./resources/assets/js/spa/modals/GravatarModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gravatar_modal_vue_html__ = __webpack_require__("./resources/assets/js/spa/modals/gravatar-modal.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gravatar_modal_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__gravatar_modal_vue_html__);


/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['show'],

    template: __WEBPACK_IMPORTED_MODULE_0__gravatar_modal_vue_html___default.a,

    methods: {
        close: function close() {
            this.$emit('close');
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/spa/modals/change-email-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show=\"show\" @close=\"close\">\n    <div class=\"modal-card\">\n        <div class=\"modal-card-head\">\n            <h1 class=\"modal-card-title\">Change email</h1>\n            <button class=\"delete\" aria-label=\"close\" @click=\"close()\"></button>\n        </div>\n\n        <div class=\"modal-card-body\">\n            Change your email:\n            <div class=\"field\">\n                <div class=\"control has-icons-left\">\n                    <input type=\"email\" @keyup.enter=\"updateEmail()\" class=\"input is-m\" name=\"email\" placeholder=\"Your Email\" v-model=\"email\" required>\n                    <span class=\"icon is-small is-left\">\n                        <i class=\"fas fa-envelope\"></i>\n                    </span>\n                </div>\n                <p class=\"help\">\n                    Changing your email will change the email you use to login. The email must be unique - as in you can not\n                    use another persons email address.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"modal-card-foot\">\n            <button class=\"button is-success\" @click=\"updateEmail()\">\n                Update\n            </button>\n\n            <button class=\"button\" @click=\"close()\">\n                No\n            </button>\n        </div>\n    </div>\n</modal>\n";

/***/ }),

/***/ "./resources/assets/js/spa/modals/delete-article-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show=\"show\" @close=\"close\">\n    <div class=\"modal-card\">\n        <div class=\"modal-card-head\">\n            <p class=\"modal-card-title\">Delete Article: '{{ title }}'</p>\n            <button class=\"delete\" aria-label=\"close\" @click=\"close()\"></button>\n        </div>\n\n        <div class=\"modal-card-body\">\n            Are you sure you want to delete this article?\n        </div>\n\n        <div class=\"modal-card-foot text-right\">\n            <button class=\"button is-success\" @click=\"deletePost()\">\n                Yes\n            </button>\n\n            <button class=\"button\" @click=\"close()\">\n                No\n            </button>\n        </div>\n    </div>\n</modal>\n";

/***/ }),

/***/ "./resources/assets/js/spa/modals/gravatar-modal.vue.html":
/***/ (function(module, exports) {

module.exports = "<modal :show=\"show\" @close=\"close\">\n    <div class=\"modal-card\">\n        <div class=\"modal-card-head\">\n            <h1 class=\"modal-card-title\">Changing your avatar</h1>\n            <button class=\"delete\" aria-label=\"close\" @click=\"close()\"></button>\n        </div>\n\n        <div class=\"modal-card-body\">\n            I use <p class=\"has-text-bold has-text-info is-inline\">Gravatar</p> to handle the avatars on this website, so if you don't currently\n            have an account, go make one <a href=\"https://en.gravatar.com/\">here</a>. The email used on this account will be the one we\n            use to look up your Gravatar! Otherwise, you'll be stuck with a default avatar:\n            <p class=\"has-text-centered m-t-md\">\n                <img src=\"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y\" alt=\"Default Avatar\">\n            </p>\n        </div>\n\n        <div class=\"modal-card-foot\">\n            <button class=\"button is-success\" @click=\"close()\">\n                Okay!\n            </button>\n        </div>\n    </div>\n</modal>\n";

/***/ }),

/***/ "./resources/assets/js/spa/pages/article-management.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_js__ = __webpack_require__("./resources/assets/js/spa/modals/DeleteArticleModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html__ = __webpack_require__("./resources/assets/js/spa/pages/article-management.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__article_management_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");





Vue.component('DeleteArticleModal', __WEBPACK_IMPORTED_MODULE_1__modals_DeleteArticleModal_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3__components_Page_js__["a" /* default */].extend({
    props: ['on-load'],

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


    template: __WEBPACK_IMPORTED_MODULE_2__article_management_vue_html___default.a,

    mounted: function mounted() {
        this.onLoad(this);

        var $window = $(window);
        var $stickyEl = $('#admin-article-search');
        var elTop = $stickyEl.offset().top;

        $window.scroll(function () {
            return $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });

        eventHub.$on('article:deleted', this.removeArticle);
    },
    destroyed: function destroyed() {
        this.removeScroll();
        this.resetPostData();
        eventHub.$off('article:deleted');
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

/***/ "./resources/assets/js/spa/pages/article-management.vue.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"section site-content\">\n    <div class=\"container\">\n        <delete-article-modal :show=\"showDeleteArticleModalState\" @close=\"hideDeleteArticleModel()\"></delete-article-modal>\n        \n        <div id=\"admin-article-search\" class=\"is-hidden-touch tabs is-toggle\">\n            <div class=\"pull-left\">\n                <ul>\n                    <li v-for=\"column in columns\" :class=\"[field == column ? 'is-active' : '']\">\n                        <a @click=\"sortBy(column)\">\n                            {{ column }}\n                            <span class=\"icon is-small\" v-show=\"field == column\">\n                                <i class=\"fas fa-arrow-circle-up\" v-show=\"field == column && reverse == false\"></i>\n                                <i class=\"fas fa-arrow-circle-down\" v-show=\"field == column && reverse == true\"></i>\n                            </span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        \n            <div class=\"pull-right\">\n                <div class=\"field has-addons\">\n                    <div class=\"control\">\n                        <span class=\"select\">\n                            <select v-model=\"queryParams.paginate\" @change=\"rePaginate\">\n                                <option :value=\"5\">5</option>\n                                <option :value=\"10\">10</option>\n                                <option :value=\"20\">20</option>\n                                <option :value=\"100\">100</option>\n                            </select>\n                        </span>\n                    </div>\n                    <div class=\"control\">\n                        <input name=\"search\"\n                            class=\"input\"\n                            v-model=\"queryParams.search\"\n                            @keyup.enter=\"search\"\n                            placeholder=\"Find an article\">\n                    </div>\n                    <div class=\"control\">\n                        <a class=\"button is-info\">\n                            <i class=\"fa fa-search\"></i>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"container\">\n            <div class=\"columns\">\n                <div class=\"column is-two-thirds article-admin-column\">\n                    <div class=\"notification is-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                        There are no posts. <a href=\"/admin/article/create\">Make one!</a>\n                    </div>\n                    <div v-for=\"post in posts\" style=\"margin: 20px\">\n                        <article-post :user=\"post.user\" :post=\"post\" class=\"m-b-md\">\n                            <template slot=\"post-body\">\n                                {{ post.body_trimmed }}\n                                <br>\n                                <span class=\"has-text-grey m-t-md\">Click the title to read on.</span>\n                            </template>\n                        </article-post>\n                        <div class=\"m-b-m\" style=\"background-color: #ededed; padding: 5px; text-align: right\">\n                            <a :href=\"'/admin/article/' + post.slug + '/edit'\" class=\"button is-primary\">Edit</a>\n                            <button class=\"button is-text\" @click.stop.prevent=\"showDeleteArticleModal(post)\">Delete</button>\n                        </div>\n                    </div>\n                    <div class=\"loading-articles has-text-centered\" v-if=\"loading_posts\">\n                        <i class=\"fas fa-spinner fa-spin fa-4x\"></i>\n                        <br>\n                        <div class=\"text-info\">Loading Posts....</div>\n                    </div>\n                    <div id=\"admin-article-bottom\"></div>\n                </div>\n                <div class=\"column\">\n                    <h2 class=\"title\">Options</h2>\n                    <ul style=\"list-style-type: none;\">\n                        <li>\n                            <a href=\"/admin/article/create\">\n                                <i class=\"fa fa-pencil\"></i>\n                                Create new Article    \n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n";

/***/ }),

/***/ "./resources/assets/js/spa/pages/dashboard.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_vue_html__ = __webpack_require__("./resources/assets/js/spa/pages/dashboard.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dashboard_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_ChangeEmailModal_js__ = __webpack_require__("./resources/assets/js/spa/modals/ChangeEmailModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_GravatarModal_js__ = __webpack_require__("./resources/assets/js/spa/modals/GravatarModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");





Vue.component('ChangeEmailModal', __WEBPACK_IMPORTED_MODULE_1__modals_ChangeEmailModal_js__["a" /* default */]);
Vue.component('GravatarModal', __WEBPACK_IMPORTED_MODULE_2__modals_GravatarModal_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3__components_Page_js__["a" /* default */].extend({
    props: ['on-load'],

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


    template: __WEBPACK_IMPORTED_MODULE_0__dashboard_vue_html___default.a,

    mounted: function mounted() {
        var _this = this;

        this.onLoad(this);
        eventHub.$on('change-email-modal:updated', function () {
            _this.$root.success('Your email was successfully updated!');
        });
    },
    destroyed: function destroyed() {
        eventHub.$off('change-email-modal:updated');
    },


    methods: {
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

/***/ "./resources/assets/js/spa/pages/dashboard.vue.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <section class=\"hero is-medium is-info\">\n        <div class=\"hero-body\">\n            <div class=\"container\">\n                <h1 class=\"title\">\n                    Dashboard\n                </h1>\n            </div>\n        </div>\n    </section>\n    <section class=\"section site-content\">\n        <change-email-modal :user=\"currentUser\" :show=\"showChangeEmailModalState\" @close=\"hideChangeEmailModel()\"></change-email-modal>\n        <gravatar-modal :show=\"showChangeAvatarModalState\" @close=\"hideGravatarModal()\"></gravatar-modal>\n        <img :src=\"currentUser.gravatar.large\"\n            alt=\"Avatar\" \n            class=\"avatar is-hidden-mobile\" \n            style=\"position: relative; \n            z-index: 2; \n            float: left; \n            left: 75%; \n            margin-top: -260px; \n            border: 3px solid #fff\"\n        >\n        <div class=\"container container-into-hero\">\n            <div class=\"card\">\n                <div class=\"card-content\">    \n                    <p class=\"title is-4 has-bottom-highlight\">Welcome to your dashboard, {{ currentUser.name }}!</p>\n                    <ul>\n                        <li><i class=\"fas fa-at\"></i> <a @click=\"showChangeEmailModal\">Change email</a></li>\n                        <li><i class=\"fas fa-image\"></i> <a @click=\"showGravatarModal\">Change avatar</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/pages/home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string__ = __webpack_require__("./node_modules/query-string/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html__ = __webpack_require__("./resources/assets/js/spa/pages/home.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__home_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");




/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2__components_Page_js__["a" /* default */].extend({
    props: ['on-load'],

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


    template: __WEBPACK_IMPORTED_MODULE_1__home_vue_html___default.a,

    mounted: function mounted() {
        this.onLoad(this);

        var $window = $(window);
        var $stickyEl = $('#search');
        var elTop = $stickyEl.offset().top;

        $window.scroll(function () {
            return $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });
    },
    destroyed: function destroyed() {
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

/***/ "./resources/assets/js/spa/pages/home.vue.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"section site-content\">\n    <div class=\"container\">\n        <div id=\"search\" class=\"tabs is-toggle is-hidden-touch\">\n            <div class=\"pull-left\">\n                <ul>\n                    <li v-for=\"column in columns\" :class=\"[field == column ? 'is-active' : '']\">\n                        <a @click=\"sortBy(column)\">\n                            {{ column }}\n                            <span class=\"icon is-small\" v-show=\"field == column\">\n                                <i class=\"fas fa-arrow-circle-up\" v-show=\"field == column && reverse == false\"></i>\n                                <i class=\"fas fa-arrow-circle-down\" v-show=\"field == column && reverse == true\"></i>\n                            </span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n\n            <div class=\"pull-right\">\n                <div class=\"field has-addons\">\n                    <div class=\"control\">\n                        <span class=\"select\">\n                            <select v-model=\"params.paginate\" @change=\"rePaginate\">\n                                <option :value=\"5\">5</option>\n                                <option :value=\"10\">10</option>\n                                <option :value=\"20\">20</option>\n                                <option :value=\"100\">100</option>\n                            </select>\n                        </span>\n                    </div>\n                    <div class=\"control\">\n                        <input name=\"search\"\n                            class=\"input\"\n                            v-model=\"params.search\"\n                            @keyup.enter=\"search\"\n                            placeholder=\"Find an article\">\n                    </div>\n                    <div class=\"control\">\n                        <a class=\"button is-info\">\n                            <i class=\"fa fa-search\"></i>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"container\">\n            <hr/>\n            <div class=\"notification is-info\" v-if=\"posts.length == 0 && loading_posts == false\">\n                There are no posts\n            </div>\n            <div class=\"blog-container\" v-for=\"(post, index) in posts\">\n                <article-post :user=\"post.user\" :post=\"post\" class=\"m-b-lg\">\n                    <template slot=\"post-body\">\n                        {{ post.body_trimmed }}\n                        <br>\n                        <span class=\"has-text-grey m-t-md\">Click the title to read on.</span>\n                    </template>\n                </article-post>\n            </div>\n            <div class=\"loading-articles has-text-centered\" v-if=\"loading_posts\">\n                <i class=\"fas fa-spinner fa-spin fa-4x\"></i>\n                <br>\n                <div class=\"text-info\">Loading Posts....</div>\n            </div>\n            <div id=\"bottom\"></div>\n        </div>\n    </div>\n</section>\n";

/***/ }),

/***/ "./resources/assets/js/spa/pages/post.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html__ = __webpack_require__("./resources/assets/js/spa/pages/post.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__post_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ArticlePost_js__ = __webpack_require__("./resources/assets/js/spa/components/ArticlePost.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Pagination_js__ = __webpack_require__("./resources/assets/js/spa/components/Pagination.js");





Vue.component('ArticlePost', __WEBPACK_IMPORTED_MODULE_2__components_ArticlePost_js__["a" /* default */]);
Vue.component('Pagination', __WEBPACK_IMPORTED_MODULE_3__components_Pagination_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__components_Page_js__["a" /* default */].extend({
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

    created: function created() {
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

/***/ "./resources/assets/js/spa/pages/post.vue.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"section site-content\">\n    <div class=\"container\">\n        <div class=\"blog-container m-t-md\">\n            <article-post :user=\"author\" :post=\"post\">\n                <template slot=\"post-body\">\n                    <pagination :items=\"post.pages\" :per-page=\"1\" class=\"m-b-md\">\n                            <template slot=\"pagination-item\" slot-scope=\"page\">\n                                <h3 class=\"subtitle\" v-text=\"page.item.subtitle\"></h3>\n                                <p class=\"blog-post\" v-html=\"page.item.body\"></p>\n                            </template>\n                    </pagination>\n                </template>\n            </article-post>\n            <hr>\n        </div>\n\n        <h2 class=\"subtitle\">Add a new comment</h2>\n\n        <div v-if=\"currentUser\" class=\"m-b-md\">\n            <div class=\"field\">\n                <div class=\"control\">\n                    <textarea rows=\"10\" cols=\"50\" class=\"textarea\" v-model=\"comment\"></textarea>\n                </div>\n            </div>\n            \n            <div class=\"field\">\n                <div class=\"control\">\n                    <button type=\"submit\" class=\"button is-info\" @click=\"addComment\">\n                        <i class=\"fas fa-btn fa-edit m-r-xs\"></i> Submit Comment!\n                    </button>\n                </div>\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"m-b-md\">\n                <div class=\"panel-body\">You need to be <a href=\"/login\">logged in</a> to comment on these articles!</div>\n            </div>\n        </div>\n\n        <div v-if=\"!! featured_comment\" class=\"featured-comment\">\n            <h2 class=\"subtitle\">Featured Comment</h2>\n            <p class=\"blog-post-meta\">\n                <img :src=\"featured_comment.user.gravatar.medium\" class=\"image is-64x64 m-r-md is-pulled-left avatar\">\n                <a :href=\"'/profile/' + featured_comment.authors_slug\">{{ featured_comment.authors_name }}</a>\n                <i class=\"fa fa-calendar\"></i> <span>{{ featured_comment.nice_created_at }}</span>\n            </p>\n            <div>{{ featured_comment.body }}</div>\n        </div>\n        \n        <h2 class=\"subtitle\">Comments</h2>\n        <div v-if=\"0 === comments.length\">\n            <div class=\"notification is-info\">\n                Nobody has commented here yet!\n            </div>\n        </div>\n        <div v-else>\n            <div class=\"panel m-b-md\" v-for=\"comment in comments\">\n                <div class=\"columns\">\n                    <div class=\"column is-narrow\">\n                        <img :src=\"comment.user.gravatar.large\" class=\"image is-64x64 avatar\">\n                    </div>\n                    <div class=\"column\">\n                        <p class=\"blog-post-meta\">\n                            <a :href=\"'/profile/' + comment.authors_slug\" v-text=\"comment.authors_name\"></a>\n                            <i class=\"fa fa-calendar\"></i> <span v-text=\"comment.nice_created_at\"></span>\n                            <button class=\"button is-text\" @click.prevent=\"featureComment(comment)\" v-if=\"currentUser && ! isFeaturedComment(comment)\">\n                                <i class=\"fa m-r-xs fa-thumbs-up\"></i>\n                                Feature?\n                            </button>\n                            <span class=\"has-text-primary m-l-md\" v-else-if=\"isFeaturedComment(comment)\">\n                                <i class=\"fas m-r-xxs fa-thumbs-up\"></i>\n                                Featured!\n                            </span>\n                        </p>\n                        <div v-text=\"comment.body\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n";

/***/ }),

/***/ "./resources/assets/js/spa/pages/profile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html__ = __webpack_require__("./resources/assets/js/spa/pages/profile.vue.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_vue_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__profile_vue_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Page_js__ = __webpack_require__("./resources/assets/js/spa/components/Page.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ArticlePost_js__ = __webpack_require__("./resources/assets/js/spa/components/ArticlePost.js");




Vue.component('ArticlePost', __WEBPACK_IMPORTED_MODULE_2__components_ArticlePost_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__components_Page_js__["a" /* default */].extend({
    props: ['on-load'],

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


    template: __WEBPACK_IMPORTED_MODULE_0__profile_vue_html___default.a,

    created: function created() {
        this.onLoad(this);
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

/***/ "./resources/assets/js/spa/pages/profile.vue.html":
/***/ (function(module, exports) {

module.exports = "<div v-if=\"user && abilities\">\n    <section class=\"hero is-medium is-info\">\n        <div class=\"hero-body\">\n            <div class=\"container\">\n                <h1 class=\"is-1 title\">\n                    {{ user.name }}'s Profile\n                </h1>\n            </div>\n        </div>\n    </section>\n    <section class=\"section site-content\">\n        <img :src=\"user.gravatar.large\"\n            alt=\"Avatar\" \n            class=\"avatar is-hidden-mobile\" \n            style=\"position: relative; \n            z-index: 2; \n            float: left; \n            left: 75%; \n            margin-top: -260px; \n            border: 3px solid #fff\"\n        >\n        <br>\n        <div class=\"container container-into-hero\">\n            <div class=\"card\">\n                <div class=\"card-content\">\n                    <div v-if=\"can('manage-articles') && posts\" class=\"m-b-lg\">\n                        <h1 class=\"title is-2 has-bottom-highlight\">{{ user.name }}'s Posts!</h1>\n                        <div v-if=\"posts.length == 0\">\n                            {{ user.name }} currently has no posts!\n                        </div>\n                        <div class=\"blog-container\" v-for=\"(post, index) in posts\">\n                            <article-post :user=\"user\" :post=\"post\">\n                                <template slot=\"post-body\">\n                                    {{ post.body_trimmed }}\n                                    <br>\n                                    <span class=\"has-text-grey m-t-md\">Click the title to read on.</span>\n                                </template>\n                            </article-post>\n                            <hr v-if=\"index + 1 < posts.length\" />\n                        </div>\n                    </div>\n                    <div>\n                        <h1 class=\"title is-2 has-bottom-highlight\">{{ user.name }}'s 10 most recent comments</h1>\n                        <div v-if=\"0 === user.comments.length\" class=\"notification is-info\">\n                            {{ user.name }} has not actually commented on anything!\n                        </div>\n                        <div v-for=\"(comment, index) in user.comments\" class=\"m-t-lg\" :class=\"[1 === (index % 2) ? 'has-text-left' : 'has-text-right']\">\n                            <p class=\"blog-post-meta\">\n                                <i class=\"fa fa-calendar\"></i> Comment Published <span v-text=\"comment.nice_created_at\"></span>\n                            </p>\n                            <p class=\"m-t-md\">\n                                {{ comment.body }}\n                            </p>\n                            <small class=\"is-muted m-t-md\">\n                                Posted on <a :href=\"'/article/' + comment.article.slug\">{{ comment.article.title }}</a>\n                            </small>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n";

/***/ }),

/***/ "./resources/assets/js/spa/spa-index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_js__ = __webpack_require__("./resources/assets/js/spa/pages/home.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_post_js__ = __webpack_require__("./resources/assets/js/spa/pages/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_profile_js__ = __webpack_require__("./resources/assets/js/spa/pages/profile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_article_management_js__ = __webpack_require__("./resources/assets/js/spa/pages/article-management.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_js__ = __webpack_require__("./resources/assets/js/spa/pages/dashboard.js");
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
        home: __WEBPACK_IMPORTED_MODULE_0__pages_home_js__["a" /* default */],
        post: __WEBPACK_IMPORTED_MODULE_1__pages_post_js__["a" /* default */],
        profile: __WEBPACK_IMPORTED_MODULE_2__pages_profile_js__["a" /* default */],
        articleManagement: __WEBPACK_IMPORTED_MODULE_3__pages_article_management_js__["a" /* default */],
        dashboard: __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_js__["a" /* default */]
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