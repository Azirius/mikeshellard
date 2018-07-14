/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/**
 * Super simple wysiwyg editor v0.8.10
 * https://summernote.org
 *
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 *
 * Date: 2018-02-20T00:34Z
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.jQuery));
}(this, (function ($$1) { 'use strict';

$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

var Renderer = /** @class */ (function () {
    function Renderer(markup, children, options, callback) {
        this.markup = markup;
        this.children = children;
        this.options = options;
        this.callback = callback;
    }
    Renderer.prototype.render = function ($parent) {
        var $node = $$1(this.markup);
        if (this.options && this.options.contents) {
            $node.html(this.options.contents);
        }
        if (this.options && this.options.className) {
            $node.addClass(this.options.className);
        }
        if (this.options && this.options.data) {
            $$1.each(this.options.data, function (k, v) {
                $node.attr('data-' + k, v);
            });
        }
        if (this.options && this.options.click) {
            $node.on('click', this.options.click);
        }
        if (this.children) {
            var $container_1 = $node.find('.note-children-container');
            this.children.forEach(function (child) {
                child.render($container_1.length ? $container_1 : $node);
            });
        }
        if (this.callback) {
            this.callback($node, this.options);
        }
        if (this.options && this.options.callback) {
            this.options.callback($node);
        }
        if ($parent) {
            $parent.append($node);
        }
        return $node;
    };
    return Renderer;
}());
var renderer = {
    create: function (markup, callback) {
        return function () {
            var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
            var children = $$1.isArray(arguments[0]) ? arguments[0] : [];
            if (options && options.children) {
                children = options.children;
            }
            return new Renderer(markup, children, options, callback);
        };
    }
};

var TooltipUI = /** @class */ (function () {
    function TooltipUI($node, options) {
        this.$node = $node;
        this.options = $.extend({}, {
            title: '',
            target: options.container,
            trigger: 'hover focus',
            placement: 'bottom'
        }, options);
        // create tooltip node
        this.$tooltip = $([
            '<div class="note-tooltip in">',
            '  <div class="note-tooltip-arrow"/>',
            '  <div class="note-tooltip-content"/>',
            '</div>'
        ].join(''));
        // define event
        if (this.options.trigger !== 'manual') {
            var showCallback_1 = this.show.bind(this);
            var hideCallback_1 = this.hide.bind(this);
            var toggleCallback_1 = this.toggle.bind(this);
            this.options.trigger.split(' ').forEach(function (eventName) {
                if (eventName === 'hover') {
                    $node.off('mouseenter mouseleave');
                    $node.on('mouseenter', showCallback_1).on('mouseleave', hideCallback_1);
                }
                else if (eventName === 'click') {
                    $node.on('click', toggleCallback_1);
                }
                else if (eventName === 'focus') {
                    $node.on('focus', showCallback_1).on('blur', hideCallback_1);
                }
            });
        }
    }
    TooltipUI.prototype.show = function () {
        var $node = this.$node;
        var offset = $node.offset();
        var $tooltip = this.$tooltip;
        var title = this.options.title || $node.attr('title') || $node.data('title');
        var placement = this.options.placement || $node.data('placement');
        $tooltip.addClass(placement);
        $tooltip.addClass('in');
        $tooltip.find('.note-tooltip-content').text(title);
        $tooltip.appendTo(this.options.target);
        var nodeWidth = $node.outerWidth();
        var nodeHeight = $node.outerHeight();
        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();
        if (placement === 'bottom') {
            $tooltip.css({
                top: offset.top + nodeHeight,
                left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
            });
        }
        else if (placement === 'top') {
            $tooltip.css({
                top: offset.top - tooltipHeight,
                left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
            });
        }
        else if (placement === 'left') {
            $tooltip.css({
                top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                left: offset.left - tooltipWidth
            });
        }
        else if (placement === 'right') {
            $tooltip.css({
                top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                left: offset.left + nodeWidth
            });
        }
    };
    TooltipUI.prototype.hide = function () {
        this.$tooltip.removeClass('in');
        this.$tooltip.remove();
    };
    TooltipUI.prototype.toggle = function () {
        if (this.$tooltip.hasClass('in')) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    return TooltipUI;
}());

var DropdownUI = /** @class */ (function () {
    function DropdownUI($node, options) {
        this.$button = $node;
        this.options = $.extend({}, {
            target: options.container
        }, options);
        this.setEvent();
    }
    DropdownUI.prototype.setEvent = function () {
        this.$button.on('click', this.toggle.bind(this));
    };
    DropdownUI.prototype.clear = function () {
        var $parent = $('.note-btn-group.open');
        $parent.find('.note-btn.active').removeClass('active');
        $parent.removeClass('open');
    };
    DropdownUI.prototype.show = function () {
        this.$button.addClass('active');
        this.$button.parent().addClass('open');
        var $dropdown = this.$button.next();
        var offset = $dropdown.offset();
        var width = $dropdown.outerWidth();
        var windowWidth = $(window).width();
        var targetMarginRight = parseFloat($(this.options.target).css('margin-right'));
        if (offset.left + width > windowWidth - targetMarginRight) {
            $dropdown.css('margin-left', windowWidth - targetMarginRight - (offset.left + width));
        }
        else {
            $dropdown.css('margin-left', '');
        }
    };
    DropdownUI.prototype.hide = function () {
        this.$button.removeClass('active');
        this.$button.parent().removeClass('open');
    };
    DropdownUI.prototype.toggle = function () {
        var isOpened = this.$button.parent().hasClass('open');
        this.clear();
        if (isOpened) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    return DropdownUI;
}());
$(document).on('click', function (e) {
    if (!$(e.target).closest('.note-btn-group').length) {
        $('.note-btn-group.open').removeClass('open');
    }
});
$(document).on('click.note-dropdown-menu', function (e) {
    $(e.target).closest('.note-dropdown-menu').parent().removeClass('open');
});

var ModalUI = /** @class */ (function () {
    function ModalUI($node, options) {
        this.options = $.extend({}, {
            target: options.container || 'body'
        }, options);
        this.$modal = $node;
        this.$backdrop = $('<div class="note-modal-backdrop" />');
    }
    ModalUI.prototype.show = function () {
        if (this.options.target === 'body') {
            this.$backdrop.css('position', 'fixed');
            this.$modal.css('position', 'fixed');
        }
        else {
            this.$backdrop.css('position', 'absolute');
            this.$modal.css('position', 'absolute');
        }
        this.$backdrop.appendTo(this.options.target).show();
        this.$modal.appendTo(this.options.target).addClass('open').show();
        this.$modal.trigger('note.modal.show');
        this.$modal.off('click', '.close').on('click', '.close', this.hide.bind(this));
    };
    ModalUI.prototype.hide = function () {
        this.$modal.removeClass('open').hide();
        this.$backdrop.hide();
        this.$modal.trigger('note.modal.hide');
    };
    return ModalUI;
}());

var editor = renderer.create('<div class="note-editor note-frame"/>');
var toolbar = renderer.create('<div class="note-toolbar" role="toolbar"/>');
var editingArea = renderer.create('<div class="note-editing-area"/>');
var codable = renderer.create('<textarea class="note-codable" role="textbox" aria-multiline="true"/>');
var editable = renderer.create('<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>');
var statusbar = renderer.create([
    '<output class="note-status-output" role="status" aria-live="polite"/>',
    '<div class="note-statusbar" role="resize">',
    '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="resize">',
    '    <div class="note-icon-bar"/>',
    '    <div class="note-icon-bar"/>',
    '    <div class="note-icon-bar"/>',
    '  </div>',
    '</div>'
].join(''));
var airEditor = renderer.create('<div class="note-editor"/>');
var airEditable = renderer.create([
    '<output class="note-status-output" role="status" aria-live="polite"/>',
    '<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>'
].join(''));
var buttonGroup = renderer.create('<div class="note-btn-group">');
var button = renderer.create('<button type="button" class="note-btn" role="button" tabindex="-1">', function ($node, options) {
    // set button type
    if (options && options.tooltip) {
        $node.attr({
            'aria-label': options.tooltip
        });
        $node.data('_lite_tooltip', new TooltipUI($node, {
            title: options.tooltip,
            container: options.container
        }));
    }
    if (options.contents) {
        $node.html(options.contents);
    }
    if (options && options.data && options.data.toggle === 'dropdown') {
        $node.data('_lite_dropdown', new DropdownUI($node, {
            container: options.container
        }));
    }
});
var dropdown = renderer.create('<div class="note-dropdown-menu" role="list">', function ($node, options) {
    var markup = $.isArray(options.items) ? options.items.map(function (item) {
        var value = (typeof item === 'string') ? item : (item.value || '');
        var content = options.template ? options.template(item) : item;
        var $temp = $('<a class="note-dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '"></a>');
        $temp.html(content).data('item', item);
        return $temp;
    }) : options.items;
    $node.html(markup).attr({ 'aria-label': options.title });
    $node.on('click', '> .note-dropdown-item', function (e) {
        var $a = $(this);
        var item = $a.data('item');
        var value = $a.data('value');
        if (item.click) {
            item.click($a);
        }
        else if (options.itemClick) {
            options.itemClick(e, item, value);
        }
    });
});
var dropdownCheck = renderer.create('<div class="note-dropdown-menu note-check" role="list">', function ($node, options) {
    var markup = $.isArray(options.items) ? options.items.map(function (item) {
        var value = (typeof item === 'string') ? item : (item.value || '');
        var content = options.template ? options.template(item) : item;
        var $temp = $('<a class="note-dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '"></a>');
        $temp.html([icon(options.checkClassName), ' ', content]).data('item', item);
        return $temp;
    }) : options.items;
    $node.html(markup).attr({ 'aria-label': options.title });
    $node.on('click', '> .note-dropdown-item', function (e) {
        var $a = $(this);
        var item = $a.data('item');
        var value = $a.data('value');
        if (item.click) {
            item.click($a);
        }
        else if (options.itemClick) {
            options.itemClick(e, item, value);
        }
    });
});
var dropdownButtonContents = function (contents, options) {
    return contents + ' ' + icon(options.icons.caret, 'span');
};
var dropdownButton = function (opt, callback) {
    return buttonGroup([
        button({
            className: 'dropdown-toggle',
            contents: opt.title + ' ' + icon('note-icon-caret'),
            tooltip: opt.tooltip,
            data: {
                toggle: 'dropdown'
            }
        }),
        dropdown({
            className: opt.className,
            items: opt.items,
            template: opt.template,
            itemClick: opt.itemClick
        })
    ], { callback: callback }).render();
};
var dropdownCheckButton = function (opt, callback) {
    return buttonGroup([
        button({
            className: 'dropdown-toggle',
            contents: opt.title + ' ' + icon('note-icon-caret'),
            tooltip: opt.tooltip,
            data: {
                toggle: 'dropdown'
            }
        }),
        dropdownCheck({
            className: opt.className,
            checkClassName: opt.checkClassName,
            items: opt.items,
            template: opt.template,
            itemClick: opt.itemClick
        })
    ], { callback: callback }).render();
};
var paragraphDropdownButton = function (opt) {
    return buttonGroup([
        button({
            className: 'dropdown-toggle',
            contents: opt.title + ' ' + icon('note-icon-caret'),
            tooltip: opt.tooltip,
            data: {
                toggle: 'dropdown'
            }
        }),
        dropdown([
            buttonGroup({
                className: 'note-align',
                children: opt.items[0]
            }),
            buttonGroup({
                className: 'note-list',
                children: opt.items[1]
            })
        ])
    ]).render();
};
var tableMoveHandler = function (event, col, row) {
    var PX_PER_EM = 18;
    var $picker = $(event.target.parentNode); // target is mousecatcher
    var $dimensionDisplay = $picker.next();
    var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
    var $highlighted = $picker.find('.note-dimension-picker-highlighted');
    var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
    var posOffset;
    // HTML5 with jQuery - e.offsetX is undefined in Firefox
    if (event.offsetX === undefined) {
        var posCatcher = $(event.target).offset();
        posOffset = {
            x: event.pageX - posCatcher.left,
            y: event.pageY - posCatcher.top
        };
    }
    else {
        posOffset = {
            x: event.offsetX,
            y: event.offsetY
        };
    }
    var dim = {
        c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
        r: Math.ceil(posOffset.y / PX_PER_EM) || 1
    };
    $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
    $catcher.data('value', dim.c + 'x' + dim.r);
    if (dim.c > 3 && dim.c < col) {
        $unhighlighted.css({ width: dim.c + 1 + 'em' });
    }
    if (dim.r > 3 && dim.r < row) {
        $unhighlighted.css({ height: dim.r + 1 + 'em' });
    }
    $dimensionDisplay.html(dim.c + ' x ' + dim.r);
};
var tableDropdownButton = function (opt) {
    return buttonGroup([
        button({
            className: 'dropdown-toggle',
            contents: opt.title + ' ' + icon('note-icon-caret'),
            tooltip: opt.tooltip,
            data: {
                toggle: 'dropdown'
            }
        }),
        dropdown({
            className: 'note-table',
            items: [
                '<div class="note-dimension-picker">',
                '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                '  <div class="note-dimension-picker-highlighted"/>',
                '  <div class="note-dimension-picker-unhighlighted"/>',
                '</div>',
                '<div class="note-dimension-display">1 x 1</div>'
            ].join('')
        })
    ], {
        callback: function ($node) {
            var $catcher = $node.find('.note-dimension-picker-mousecatcher');
            $catcher.css({
                width: opt.col + 'em',
                height: opt.row + 'em'
            })
                .mousedown(opt.itemClick)
                .mousemove(function (e) {
                tableMoveHandler(e, opt.col, opt.row);
            });
        }
    }).render();
};
var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
    var contents = [];
    for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
        var eventName = options.eventName;
        var colors = options.colors[row];
        var colorsName = options.colorsName[row];
        var buttons = [];
        for (var col = 0, colSize = colors.length; col < colSize; col++) {
            var color = colors[col];
            var colorName = colorsName[col];
            buttons.push([
                '<button type="button" class="note-btn note-color-btn"',
                'style="background-color:', color, '" ',
                'data-event="', eventName, '" ',
                'data-value="', color, '" ',
                'title="', colorName, '" ',
                'aria-label="', colorName, '" ',
                'data-toggle="button" tabindex="-1"></button>'
            ].join(''));
        }
        contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
    }
    $node.html(contents.join(''));
    $node.find('.note-color-btn').each(function () {
        $(this).data('_lite_tooltip', new TooltipUI($(this), {
            container: options.container
        }));
    });
});
var colorDropdownButton = function (opt, type) {
    return buttonGroup({
        className: 'note-color',
        children: [
            button({
                className: 'note-current-color-button',
                contents: opt.title,
                tooltip: opt.lang.color.recent,
                click: opt.currentClick,
                callback: function ($button) {
                    var $recentColor = $button.find('.note-recent-color');
                    if (type !== 'foreColor') {
                        $recentColor.css('background-color', '#FFFF00');
                        $button.attr('data-backColor', '#FFFF00');
                    }
                }
            }),
            button({
                className: 'dropdown-toggle',
                contents: icon('note-icon-caret'),
                tooltip: opt.lang.color.more,
                data: {
                    toggle: 'dropdown'
                }
            }),
            dropdown({
                items: [
                    '<div>',
                    '<div class="note-btn-group btn-background-color">',
                    '  <div class="note-palette-title">' + opt.lang.color.background + '</div>',
                    '  <div>',
                    '<button type="button" class="note-color-reset note-btn note-btn-block" ' +
                        ' data-event="backColor" data-value="inherit">',
                    opt.lang.color.transparent,
                    '    </button>',
                    '  </div>',
                    '  <div class="note-holder" data-event="backColor"/>',
                    '</div>',
                    '<div class="note-btn-group btn-foreground-color">',
                    '  <div class="note-palette-title">' + opt.lang.color.foreground + '</div>',
                    '  <div>',
                    '<button type="button" class="note-color-reset note-btn note-btn-block" ' +
                        ' data-event="removeFormat" data-value="foreColor">',
                    opt.lang.color.resetToDefault,
                    '    </button>',
                    '  </div>',
                    '  <div class="note-holder" data-event="foreColor"/>',
                    '</div>',
                    '</div>'
                ].join(''),
                callback: function ($dropdown) {
                    $dropdown.find('.note-holder').each(function () {
                        var $holder = $(this);
                        $holder.append(palette({
                            colors: opt.colors,
                            eventName: $holder.data('event')
                        }).render());
                    });
                    if (type === 'fore') {
                        $dropdown.find('.btn-background-color').hide();
                        $dropdown.css({ 'min-width': '210px' });
                    }
                    else if (type === 'back') {
                        $dropdown.find('.btn-foreground-color').hide();
                        $dropdown.css({ 'min-width': '210px' });
                    }
                },
                click: function (event) {
                    var $button = $(event.target);
                    var eventName = $button.data('event');
                    var value = $button.data('value');
                    if (eventName && value) {
                        var key = eventName === 'backColor' ? 'background-color' : 'color';
                        var $color = $button.closest('.note-color').find('.note-recent-color');
                        var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                        $color.css(key, value);
                        $currentButton.attr('data-' + eventName, value);
                        if (type === 'fore') {
                            opt.itemClick('foreColor', value);
                        }
                        else if (type === 'back') {
                            opt.itemClick('backColor', value);
                        }
                        else {
                            opt.itemClick(eventName, value);
                        }
                    }
                }
            })
        ]
    }).render();
};
var dialog = renderer.create('<div class="note-modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
    if (options.fade) {
        $node.addClass('fade');
    }
    $node.attr({
        'aria-label': options.title
    });
    $node.html([
        '  <div class="note-modal-content">',
        (options.title
            ? '    <div class="note-modal-header">' +
                '      <button type="button" class="close" aria-label="Close" aria-hidden="true"><i class="note-icon-close"></i></button>' +
                '      <h4 class="note-modal-title">' + options.title + '</h4>' +
                '    </div>' : ''),
        '    <div class="note-modal-body">' + options.body + '</div>',
        (options.footer
            ? '    <div class="note-modal-footer">' + options.footer + '</div>' : ''),
        '  </div>'
    ].join(''));
    $node.data('modal', new ModalUI($node, options));
});
var videoDialog = function (opt) {
    var body = '<div class="note-form-group">' +
        '<label class="note-form-label">' +
        opt.lang.video.url + ' <small class="text-muted">' +
        opt.lang.video.providers + '</small>' +
        '</label>' +
        '<input class="note-video-url note-input" type="text" />' +
        '</div>';
    var footer = [
        '<button type="button" href="#" class="note-btn note-btn-primary note-video-btn disabled" disabled>',
        opt.lang.video.insert,
        '</button>'
    ].join('');
    return dialog({
        title: opt.lang.video.insert,
        fade: opt.fade,
        body: body,
        footer: footer
    }).render();
};
var imageDialog = function (opt) {
    var body = '<div class="note-form-group note-group-select-from-files">' +
        '<label class="note-form-label">' + opt.lang.image.selectFromFiles + '</label>' +
        '<input class="note-note-image-input note-input" type="file" name="files" accept="image/*" multiple="multiple" />' +
        opt.imageLimitation +
        '</div>' +
        '<div class="note-form-group" style="overflow:auto;">' +
        '<label class="note-form-label">' + opt.lang.image.url + '</label>' +
        '<input class="note-image-url note-input" type="text" />' +
        '</div>';
    var footer = [
        '<button href="#" type="button" class="note-btn note-btn-primary note-btn-large note-image-btn disabled" disabled>',
        opt.lang.image.insert,
        '</button>'
    ].join('');
    return dialog({
        title: opt.lang.image.insert,
        fade: opt.fade,
        body: body,
        footer: footer
    }).render();
};
var linkDialog = function (opt) {
    var body = '<div class="note-form-group">' +
        '<label class="note-form-label">' + opt.lang.link.textToDisplay + '</label>' +
        '<input class="note-link-text note-input" type="text" />' +
        '</div>' +
        '<div class="note-form-group">' +
        '<label class="note-form-label">' + opt.lang.link.url + '</label>' +
        '<input class="note-link-url note-input" type="text" value="http://" />' +
        '</div>' +
        (!opt.disableLinkTarget
            ? '<div class="checkbox">' +
                '<label>' + '<input type="checkbox" checked> ' + opt.lang.link.openInNewWindow + '</label>' +
                '</div>' : '');
    var footer = [
        '<button href="#" type="button" class="note-btn note-btn-primary note-link-btn disabled" disabled>',
        opt.lang.link.insert,
        '</button>'
    ].join('');
    return dialog({
        className: 'link-dialog',
        title: opt.lang.link.insert,
        fade: opt.fade,
        body: body,
        footer: footer
    }).render();
};
var popover = renderer.create([
    '<div class="note-popover bottom">',
    '  <div class="note-popover-arrow"/>',
    '  <div class="note-popover-content note-children-container"/>',
    '</div>'
].join(''), function ($node, options) {
    var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
    $node.addClass(direction).hide();
    if (options.hideArrow) {
        $node.find('.note-popover-arrow').hide();
    }
});
var checkbox = renderer.create('<div class="checkbox"></div>', function ($node, options) {
    $node.html([
        ' <label' + (options.id ? ' for="' + options.id + '"' : '') + '>',
        ' <input role="checkbox" type="checkbox"' + (options.id ? ' id="' + options.id + '"' : ''),
        (options.checked ? ' checked' : ''),
        ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>',
        (options.text ? options.text : ''),
        '</label>'
    ].join(''));
});
var icon = function (iconClassName, tagName) {
    tagName = tagName || 'i';
    return '<' + tagName + ' class="' + iconClassName + '"/>';
};
var ui = {
    editor: editor,
    toolbar: toolbar,
    editingArea: editingArea,
    codable: codable,
    editable: editable,
    statusbar: statusbar,
    airEditor: airEditor,
    airEditable: airEditable,
    buttonGroup: buttonGroup,
    button: button,
    dropdown: dropdown,
    dropdownCheck: dropdownCheck,
    dropdownButton: dropdownButton,
    dropdownButtonContents: dropdownButtonContents,
    dropdownCheckButton: dropdownCheckButton,
    paragraphDropdownButton: paragraphDropdownButton,
    tableDropdownButton: tableDropdownButton,
    colorDropdownButton: colorDropdownButton,
    palette: palette,
    dialog: dialog,
    videoDialog: videoDialog,
    imageDialog: imageDialog,
    linkDialog: linkDialog,
    popover: popover,
    checkbox: checkbox,
    icon: icon,
    toggleBtn: function ($btn, isEnable) {
        $btn.toggleClass('disabled', !isEnable);
        $btn.attr('disabled', !isEnable);
    },
    toggleBtnActive: function ($btn, isActive) {
        $btn.toggleClass('active', isActive);
    },
    check: function ($dom, value) {
        $dom.find('.checked').removeClass('checked');
        $dom.find('[data-value="' + value + '"]').addClass('checked');
    },
    onDialogShown: function ($dialog, handler) {
        $dialog.one('note.modal.show', handler);
    },
    onDialogHidden: function ($dialog, handler) {
        $dialog.one('note.modal.hide', handler);
    },
    showDialog: function ($dialog) {
        $dialog.data('modal').show();
    },
    hideDialog: function ($dialog) {
        $dialog.data('modal').hide();
    },
    /**
     * get popover content area
     *
     * @param $popover
     * @returns {*}
     */
    getPopoverContent: function ($popover) {
        return $popover.find('.note-popover-content');
    },
    /**
     * get dialog's body area
     *
     * @param $dialog
     * @returns {*}
     */
    getDialogBody: function ($dialog) {
        return $dialog.find('.note-modal-body');
    },
    createLayout: function ($note, options) {
        var $editor = (options.airMode ? ui.airEditor([
            ui.editingArea([
                ui.airEditable()
            ])
        ]) : ui.editor([
            ui.toolbar(),
            ui.editingArea([
                ui.codable(),
                ui.editable()
            ]),
            ui.statusbar()
        ])).render();
        $editor.insertAfter($note);
        return {
            note: $note,
            editor: $editor,
            toolbar: $editor.find('.note-toolbar'),
            editingArea: $editor.find('.note-editing-area'),
            editable: $editor.find('.note-editable'),
            codable: $editor.find('.note-codable'),
            statusbar: $editor.find('.note-statusbar')
        };
    },
    removeLayout: function ($note, layoutInfo) {
        $note.html(layoutInfo.editable.html());
        layoutInfo.editor.remove();
        $note.off('summernote'); // remove summernote custom event
        $note.show();
    }
};

$$1.summernote = $$1.summernote || {
    lang: {}
};
$$1.extend($$1.summernote.lang, {
    'en-US': {
        font: {
            bold: 'Bold',
            italic: 'Italic',
            underline: 'Underline',
            clear: 'Remove Font Style',
            height: 'Line Height',
            name: 'Font Family',
            strikethrough: 'Strikethrough',
            subscript: 'Subscript',
            superscript: 'Superscript',
            size: 'Font Size'
        },
        image: {
            image: 'Picture',
            insert: 'Insert Image',
            resizeFull: 'Resize Full',
            resizeHalf: 'Resize Half',
            resizeQuarter: 'Resize Quarter',
            floatLeft: 'Float Left',
            floatRight: 'Float Right',
            floatNone: 'Float None',
            shapeRounded: 'Shape: Rounded',
            shapeCircle: 'Shape: Circle',
            shapeThumbnail: 'Shape: Thumbnail',
            shapeNone: 'Shape: None',
            dragImageHere: 'Drag image or text here',
            dropImage: 'Drop image or Text',
            selectFromFiles: 'Select from files',
            maximumFileSize: 'Maximum file size',
            maximumFileSizeError: 'Maximum file size exceeded.',
            url: 'Image URL',
            remove: 'Remove Image',
            original: 'Original'
        },
        video: {
            video: 'Video',
            videoLink: 'Video Link',
            insert: 'Insert Video',
            url: 'Video URL',
            providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
        },
        link: {
            link: 'Link',
            insert: 'Insert Link',
            unlink: 'Unlink',
            edit: 'Edit',
            textToDisplay: 'Text to display',
            url: 'To what URL should this link go?',
            openInNewWindow: 'Open in new window'
        },
        table: {
            table: 'Table',
            addRowAbove: 'Add row above',
            addRowBelow: 'Add row below',
            addColLeft: 'Add column left',
            addColRight: 'Add column right',
            delRow: 'Delete row',
            delCol: 'Delete column',
            delTable: 'Delete table'
        },
        hr: {
            insert: 'Insert Horizontal Rule'
        },
        style: {
            style: 'Style',
            p: 'Normal',
            blockquote: 'Quote',
            pre: 'Code',
            h1: 'Header 1',
            h2: 'Header 2',
            h3: 'Header 3',
            h4: 'Header 4',
            h5: 'Header 5',
            h6: 'Header 6'
        },
        lists: {
            unordered: 'Unordered list',
            ordered: 'Ordered list'
        },
        options: {
            help: 'Help',
            fullscreen: 'Full Screen',
            codeview: 'Code View'
        },
        paragraph: {
            paragraph: 'Paragraph',
            outdent: 'Outdent',
            indent: 'Indent',
            left: 'Align left',
            center: 'Align center',
            right: 'Align right',
            justify: 'Justify full'
        },
        color: {
            recent: 'Recent Color',
            more: 'More Color',
            background: 'Background Color',
            foreground: 'Foreground Color',
            transparent: 'Transparent',
            setTransparent: 'Set transparent',
            reset: 'Reset',
            resetToDefault: 'Reset to default'
        },
        shortcut: {
            shortcuts: 'Keyboard shortcuts',
            close: 'Close',
            textFormatting: 'Text formatting',
            action: 'Action',
            paragraphFormatting: 'Paragraph formatting',
            documentStyle: 'Document Style',
            extraKeys: 'Extra keys'
        },
        help: {
            'insertParagraph': 'Insert Paragraph',
            'undo': 'Undoes the last command',
            'redo': 'Redoes the last command',
            'tab': 'Tab',
            'untab': 'Untab',
            'bold': 'Set a bold style',
            'italic': 'Set a italic style',
            'underline': 'Set a underline style',
            'strikethrough': 'Set a strikethrough style',
            'removeFormat': 'Clean a style',
            'justifyLeft': 'Set left align',
            'justifyCenter': 'Set center align',
            'justifyRight': 'Set right align',
            'justifyFull': 'Set full align',
            'insertUnorderedList': 'Toggle unordered list',
            'insertOrderedList': 'Toggle ordered list',
            'outdent': 'Outdent on current paragraph',
            'indent': 'Indent on current paragraph',
            'formatPara': 'Change current block\'s format as a paragraph(P tag)',
            'formatH1': 'Change current block\'s format as H1',
            'formatH2': 'Change current block\'s format as H2',
            'formatH3': 'Change current block\'s format as H3',
            'formatH4': 'Change current block\'s format as H4',
            'formatH5': 'Change current block\'s format as H5',
            'formatH6': 'Change current block\'s format as H6',
            'insertHorizontalRule': 'Insert horizontal rule',
            'linkDialog.show': 'Show Link Dialog'
        },
        history: {
            undo: 'Undo',
            redo: 'Redo'
        },
        specialChar: {
            specialChar: 'SPECIAL CHARACTERS',
            select: 'Select Special characters'
        }
    }
});

var isSupportAmd = typeof define === 'function' && define.amd; // eslint-disable-line
/**
 * returns whether font is installed or not.
 *
 * @param {String} fontName
 * @return {Boolean}
 */
function isFontInstalled(fontName) {
    var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
    var $tester = $$1('<div>').css({
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        fontSize: '200px'
    }).text('mmmmmmmmmwwwwwww').appendTo(document.body);
    var originalWidth = $tester.css('fontFamily', testFontName).width();
    var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();
    $tester.remove();
    return originalWidth !== width;
}
var userAgent = navigator.userAgent;
var isMSIE = /MSIE|Trident/i.test(userAgent);
var browserVersion;
if (isMSIE) {
    var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
    if (matches) {
        browserVersion = parseFloat(matches[1]);
    }
    matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
    if (matches) {
        browserVersion = parseFloat(matches[1]);
    }
}
var isEdge = /Edge\/\d+/.test(userAgent);
var hasCodeMirror = !!window.CodeMirror;
if (!hasCodeMirror && isSupportAmd) {
    // Webpack
    if (typeof __webpack_require__ === 'function') {
        try {
            // If CodeMirror can't be resolved, `require.resolve` will throw an
            // exception and `hasCodeMirror` won't be set to `true`.
            require.resolve('codemirror');
            hasCodeMirror = true;
        }
        catch (e) {
            // do nothing
        }
    }
    else if (typeof require !== 'undefined') {
        // Browserify
        if (typeof require.resolve !== 'undefined') {
            try {
                // If CodeMirror can't be resolved, `require.resolve` will throw an
                // exception and `hasCodeMirror` won't be set to `true`.
                require.resolve('codemirror');
                hasCodeMirror = true;
            }
            catch (e) {
                // do nothing
            }
            // Almond/Require
        }
        else if (typeof require.specified !== 'undefined') {
            hasCodeMirror = require.specified('codemirror');
        }
    }
}
var isSupportTouch = (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
// [workaround] IE doesn't have input events for contentEditable
// - see: https://goo.gl/4bfIvA
var inputEventName = (isMSIE || isEdge) ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
/**
 * @class core.env
 *
 * Object which check platform and agent
 *
 * @singleton
 * @alternateClassName env
 */
var env = {
    isMac: navigator.appVersion.indexOf('Mac') > -1,
    isMSIE: isMSIE,
    isEdge: isEdge,
    isFF: !isEdge && /firefox/i.test(userAgent),
    isPhantom: /PhantomJS/i.test(userAgent),
    isWebkit: !isEdge && /webkit/i.test(userAgent),
    isChrome: !isEdge && /chrome/i.test(userAgent),
    isSafari: !isEdge && /safari/i.test(userAgent),
    browserVersion: browserVersion,
    jqueryVersion: parseFloat($$1.fn.jquery),
    isSupportAmd: isSupportAmd,
    isSupportTouch: isSupportTouch,
    hasCodeMirror: hasCodeMirror,
    isFontInstalled: isFontInstalled,
    isW3CRangeSupport: !!document.createRange,
    inputEventName: inputEventName
};

/**
 * @class core.func
 *
 * func utils (for high-order func's arg)
 *
 * @singleton
 * @alternateClassName func
 */
function eq(itemA) {
    return function (itemB) {
        return itemA === itemB;
    };
}
function eq2(itemA, itemB) {
    return itemA === itemB;
}
function peq2(propName) {
    return function (itemA, itemB) {
        return itemA[propName] === itemB[propName];
    };
}
function ok() {
    return true;
}
function fail() {
    return false;
}
function not(f) {
    return function () {
        return !f.apply(f, arguments);
    };
}
function and(fA, fB) {
    return function (item) {
        return fA(item) && fB(item);
    };
}
function self(a) {
    return a;
}
function invoke(obj, method) {
    return function () {
        return obj[method].apply(obj, arguments);
    };
}
var idCounter = 0;
/**
 * generate a globally-unique id
 *
 * @param {String} [prefix]
 */
function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
}
/**
 * returns bnd (bounds) from rect
 *
 * - IE Compatibility Issue: http://goo.gl/sRLOAo
 * - Scroll Issue: http://goo.gl/sNjUc
 *
 * @param {Rect} rect
 * @return {Object} bounds
 * @return {Number} bounds.top
 * @return {Number} bounds.left
 * @return {Number} bounds.width
 * @return {Number} bounds.height
 */
function rect2bnd(rect) {
    var $document = $(document);
    return {
        top: rect.top + $document.scrollTop(),
        left: rect.left + $document.scrollLeft(),
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
}
/**
 * returns a copy of the object where the keys have become the values and the values the keys.
 * @param {Object} obj
 * @return {Object}
 */
function invertObject(obj) {
    var inverted = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}
/**
 * @param {String} namespace
 * @param {String} [prefix]
 * @return {String}
 */
function namespaceToCamel(namespace, prefix) {
    prefix = prefix || '';
    return prefix + namespace.split('.').map(function (name) {
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    }).join('');
}
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return {Function}
 */
function debounce(func, wait, immediate) {
    var _this = this;
    var timeout;
    return function () {
        var context = _this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
var func = {
    eq: eq,
    eq2: eq2,
    peq2: peq2,
    ok: ok,
    fail: fail,
    self: self,
    not: not,
    and: and,
    invoke: invoke,
    uniqueId: uniqueId,
    rect2bnd: rect2bnd,
    invertObject: invertObject,
    namespaceToCamel: namespaceToCamel,
    debounce: debounce
};

/**
 * returns the first item of an array.
 *
 * @param {Array} array
 */
function head(array) {
    return array[0];
}
/**
 * returns the last item of an array.
 *
 * @param {Array} array
 */
function last(array) {
    return array[array.length - 1];
}
/**
 * returns everything but the last entry of the array.
 *
 * @param {Array} array
 */
function initial(array) {
    return array.slice(0, array.length - 1);
}
/**
 * returns the rest of the items in an array.
 *
 * @param {Array} array
 */
function tail(array) {
    return array.slice(1);
}
/**
 * returns item of array
 */
function find(array, pred) {
    for (var idx = 0, len = array.length; idx < len; idx++) {
        var item = array[idx];
        if (pred(item)) {
            return item;
        }
    }
}
/**
 * returns true if all of the values in the array pass the predicate truth test.
 */
function all(array, pred) {
    for (var idx = 0, len = array.length; idx < len; idx++) {
        if (!pred(array[idx])) {
            return false;
        }
    }
    return true;
}
/**
 * returns index of item
 */
function indexOf(array, item) {
    return $$1.inArray(item, array);
}
/**
 * returns true if the value is present in the list.
 */
function contains(array, item) {
    return indexOf(array, item) !== -1;
}
/**
 * get sum from a list
 *
 * @param {Array} array - array
 * @param {Function} fn - iterator
 */
function sum(array, fn) {
    fn = fn || func.self;
    return array.reduce(function (memo, v) {
        return memo + fn(v);
    }, 0);
}
/**
 * returns a copy of the collection with array type.
 * @param {Collection} collection - collection eg) node.childNodes, ...
 */
function from(collection) {
    var result = [];
    var length = collection.length;
    var idx = -1;
    while (++idx < length) {
        result[idx] = collection[idx];
    }
    return result;
}
/**
 * returns whether list is empty or not
 */
function isEmpty(array) {
    return !array || !array.length;
}
/**
 * cluster elements by predicate function.
 *
 * @param {Array} array - array
 * @param {Function} fn - predicate function for cluster rule
 * @param {Array[]}
 */
function clusterBy(array, fn) {
    if (!array.length) {
        return [];
    }
    var aTail = tail(array);
    return aTail.reduce(function (memo, v) {
        var aLast = last(memo);
        if (fn(last(aLast), v)) {
            aLast[aLast.length] = v;
        }
        else {
            memo[memo.length] = [v];
        }
        return memo;
    }, [[head(array)]]);
}
/**
 * returns a copy of the array with all false values removed
 *
 * @param {Array} array - array
 * @param {Function} fn - predicate function for cluster rule
 */
function compact(array) {
    var aResult = [];
    for (var idx = 0, len = array.length; idx < len; idx++) {
        if (array[idx]) {
            aResult.push(array[idx]);
        }
    }
    return aResult;
}
/**
 * produces a duplicate-free version of the array
 *
 * @param {Array} array
 */
function unique(array) {
    var results = [];
    for (var idx = 0, len = array.length; idx < len; idx++) {
        if (!contains(results, array[idx])) {
            results.push(array[idx]);
        }
    }
    return results;
}
/**
 * returns next item.
 * @param {Array} array
 */
function next(array, item) {
    var idx = indexOf(array, item);
    if (idx === -1) {
        return null;
    }
    return array[idx + 1];
}
/**
 * returns prev item.
 * @param {Array} array
 */
function prev(array, item) {
    var idx = indexOf(array, item);
    if (idx === -1) {
        return null;
    }
    return array[idx - 1];
}
/**
 * @class core.list
 *
 * list utils
 *
 * @singleton
 * @alternateClassName list
 */
var lists = {
    head: head,
    last: last,
    initial: initial,
    tail: tail,
    prev: prev,
    next: next,
    find: find,
    contains: contains,
    all: all,
    sum: sum,
    from: from,
    isEmpty: isEmpty,
    clusterBy: clusterBy,
    compact: compact,
    unique: unique
};

var KEY_MAP = {
    'BACKSPACE': 8,
    'TAB': 9,
    'ENTER': 13,
    'SPACE': 32,
    'DELETE': 46,
    // Arrow
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40,
    // Number: 0-9
    'NUM0': 48,
    'NUM1': 49,
    'NUM2': 50,
    'NUM3': 51,
    'NUM4': 52,
    'NUM5': 53,
    'NUM6': 54,
    'NUM7': 55,
    'NUM8': 56,
    // Alphabet: a-z
    'B': 66,
    'E': 69,
    'I': 73,
    'J': 74,
    'K': 75,
    'L': 76,
    'R': 82,
    'S': 83,
    'U': 85,
    'V': 86,
    'Y': 89,
    'Z': 90,
    'SLASH': 191,
    'LEFTBRACKET': 219,
    'BACKSLASH': 220,
    'RIGHTBRACKET': 221
};
/**
 * @class core.key
 *
 * Object for keycodes.
 *
 * @singleton
 * @alternateClassName key
 */
var key = {
    /**
     * @method isEdit
     *
     * @param {Number} keyCode
     * @return {Boolean}
     */
    isEdit: function (keyCode) {
        return lists.contains([
            KEY_MAP.BACKSPACE,
            KEY_MAP.TAB,
            KEY_MAP.ENTER,
            KEY_MAP.SPACE,
            KEY_MAP.DELETE
        ], keyCode);
    },
    /**
     * @method isMove
     *
     * @param {Number} keyCode
     * @return {Boolean}
     */
    isMove: function (keyCode) {
        return lists.contains([
            KEY_MAP.LEFT,
            KEY_MAP.UP,
            KEY_MAP.RIGHT,
            KEY_MAP.DOWN
        ], keyCode);
    },
    /**
     * @property {Object} nameFromCode
     * @property {String} nameFromCode.8 "BACKSPACE"
     */
    nameFromCode: func.invertObject(KEY_MAP),
    code: KEY_MAP
};

var NBSP_CHAR = String.fromCharCode(160);
var ZERO_WIDTH_NBSP_CHAR = '\ufeff';
/**
 * @method isEditable
 *
 * returns whether node is `note-editable` or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isEditable(node) {
    return node && $$1(node).hasClass('note-editable');
}
/**
 * @method isControlSizing
 *
 * returns whether node is `note-control-sizing` or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isControlSizing(node) {
    return node && $$1(node).hasClass('note-control-sizing');
}
/**
 * @method makePredByNodeName
 *
 * returns predicate which judge whether nodeName is same
 *
 * @param {String} nodeName
 * @return {Function}
 */
function makePredByNodeName(nodeName) {
    nodeName = nodeName.toUpperCase();
    return function (node) {
        return node && node.nodeName.toUpperCase() === nodeName;
    };
}
/**
 * @method isText
 *
 *
 *
 * @param {Node} node
 * @return {Boolean} true if node's type is text(3)
 */
function isText(node) {
    return node && node.nodeType === 3;
}
/**
 * @method isElement
 *
 *
 *
 * @param {Node} node
 * @return {Boolean} true if node's type is element(1)
 */
function isElement(node) {
    return node && node.nodeType === 1;
}
/**
 * ex) br, col, embed, hr, img, input, ...
 * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
 */
function isVoid(node) {
    return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT/.test(node.nodeName.toUpperCase());
}
function isPara(node) {
    if (isEditable(node)) {
        return false;
    }
    // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
    return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
}
function isHeading(node) {
    return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
}
var isPre = makePredByNodeName('PRE');
var isLi = makePredByNodeName('LI');
function isPurePara(node) {
    return isPara(node) && !isLi(node);
}
var isTable = makePredByNodeName('TABLE');
var isData = makePredByNodeName('DATA');
function isInline(node) {
    return !isBodyContainer(node) &&
        !isList(node) &&
        !isHr(node) &&
        !isPara(node) &&
        !isTable(node) &&
        !isBlockquote(node) &&
        !isData(node);
}
function isList(node) {
    return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
}
var isHr = makePredByNodeName('HR');
function isCell(node) {
    return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
}
var isBlockquote = makePredByNodeName('BLOCKQUOTE');
function isBodyContainer(node) {
    return isCell(node) || isBlockquote(node) || isEditable(node);
}
var isAnchor = makePredByNodeName('A');
function isParaInline(node) {
    return isInline(node) && !!ancestor(node, isPara);
}
function isBodyInline(node) {
    return isInline(node) && !ancestor(node, isPara);
}
var isBody = makePredByNodeName('BODY');
/**
 * returns whether nodeB is closest sibling of nodeA
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @return {Boolean}
 */
function isClosestSibling(nodeA, nodeB) {
    return nodeA.nextSibling === nodeB ||
        nodeA.previousSibling === nodeB;
}
/**
 * returns array of closest siblings with node
 *
 * @param {Node} node
 * @param {function} [pred] - predicate function
 * @return {Node[]}
 */
function withClosestSiblings(node, pred) {
    pred = pred || func.ok;
    var siblings = [];
    if (node.previousSibling && pred(node.previousSibling)) {
        siblings.push(node.previousSibling);
    }
    siblings.push(node);
    if (node.nextSibling && pred(node.nextSibling)) {
        siblings.push(node.nextSibling);
    }
    return siblings;
}
/**
 * blank HTML for cursor position
 * - [workaround] old IE only works with &nbsp;
 * - [workaround] IE11 and other browser works with bogus br
 */
var blankHTML = env.isMSIE && env.browserVersion < 11 ? '&nbsp;' : '<br>';
/**
 * @method nodeLength
 *
 * returns #text's text size or element's childNodes size
 *
 * @param {Node} node
 */
function nodeLength(node) {
    if (isText(node)) {
        return node.nodeValue.length;
    }
    if (node) {
        return node.childNodes.length;
    }
    return 0;
}
/**
 * returns whether node is empty or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isEmpty$1(node) {
    var len = nodeLength(node);
    if (len === 0) {
        return true;
    }
    else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
        // ex) <p><br></p>, <span><br></span>
        return true;
    }
    else if (lists.all(node.childNodes, isText) && node.innerHTML === '') {
        // ex) <p></p>, <span></span>
        return true;
    }
    return false;
}
/**
 * padding blankHTML if node is empty (for cursor position)
 */
function paddingBlankHTML(node) {
    if (!isVoid(node) && !nodeLength(node)) {
        node.innerHTML = blankHTML;
    }
}
/**
 * find nearest ancestor predicate hit
 *
 * @param {Node} node
 * @param {Function} pred - predicate function
 */
function ancestor(node, pred) {
    while (node) {
        if (pred(node)) {
            return node;
        }
        if (isEditable(node)) {
            break;
        }
        node = node.parentNode;
    }
    return null;
}
/**
 * find nearest ancestor only single child blood line and predicate hit
 *
 * @param {Node} node
 * @param {Function} pred - predicate function
 */
function singleChildAncestor(node, pred) {
    node = node.parentNode;
    while (node) {
        if (nodeLength(node) !== 1) {
            break;
        }
        if (pred(node)) {
            return node;
        }
        if (isEditable(node)) {
            break;
        }
        node = node.parentNode;
    }
    return null;
}
/**
 * returns new array of ancestor nodes (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [optional] pred - predicate function
 */
function listAncestor(node, pred) {
    pred = pred || func.fail;
    var ancestors = [];
    ancestor(node, function (el) {
        if (!isEditable(el)) {
            ancestors.push(el);
        }
        return pred(el);
    });
    return ancestors;
}
/**
 * find farthest ancestor predicate hit
 */
function lastAncestor(node, pred) {
    var ancestors = listAncestor(node);
    return lists.last(ancestors.filter(pred));
}
/**
 * returns common ancestor node between two nodes.
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 */
function commonAncestor(nodeA, nodeB) {
    var ancestors = listAncestor(nodeA);
    for (var n = nodeB; n; n = n.parentNode) {
        if ($$1.inArray(n, ancestors) > -1) {
            return n;
        }
    }
    return null; // difference document area
}
/**
 * listing all previous siblings (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [optional] pred - predicate function
 */
function listPrev(node, pred) {
    pred = pred || func.fail;
    var nodes = [];
    while (node) {
        if (pred(node)) {
            break;
        }
        nodes.push(node);
        node = node.previousSibling;
    }
    return nodes;
}
/**
 * listing next siblings (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [pred] - predicate function
 */
function listNext(node, pred) {
    pred = pred || func.fail;
    var nodes = [];
    while (node) {
        if (pred(node)) {
            break;
        }
        nodes.push(node);
        node = node.nextSibling;
    }
    return nodes;
}
/**
 * listing descendant nodes
 *
 * @param {Node} node
 * @param {Function} [pred] - predicate function
 */
function listDescendant(node, pred) {
    var descendants = [];
    pred = pred || func.ok;
    // start DFS(depth first search) with node
    (function fnWalk(current) {
        if (node !== current && pred(current)) {
            descendants.push(current);
        }
        for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
            fnWalk(current.childNodes[idx]);
        }
    })(node);
    return descendants;
}
/**
 * wrap node with new tag.
 *
 * @param {Node} node
 * @param {Node} tagName of wrapper
 * @return {Node} - wrapper
 */
function wrap(node, wrapperName) {
    var parent = node.parentNode;
    var wrapper = $$1('<' + wrapperName + '>')[0];
    parent.insertBefore(wrapper, node);
    wrapper.appendChild(node);
    return wrapper;
}
/**
 * insert node after preceding
 *
 * @param {Node} node
 * @param {Node} preceding - predicate function
 */
function insertAfter(node, preceding) {
    var next = preceding.nextSibling;
    var parent = preceding.parentNode;
    if (next) {
        parent.insertBefore(node, next);
    }
    else {
        parent.appendChild(node);
    }
    return node;
}
/**
 * append elements.
 *
 * @param {Node} node
 * @param {Collection} aChild
 */
function appendChildNodes(node, aChild) {
    $$1.each(aChild, function (idx, child) {
        node.appendChild(child);
    });
    return node;
}
/**
 * returns whether boundaryPoint is left edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isLeftEdgePoint(point) {
    return point.offset === 0;
}
/**
 * returns whether boundaryPoint is right edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isRightEdgePoint(point) {
    return point.offset === nodeLength(point.node);
}
/**
 * returns whether boundaryPoint is edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isEdgePoint(point) {
    return isLeftEdgePoint(point) || isRightEdgePoint(point);
}
/**
 * returns whether node is left edge of ancestor or not.
 *
 * @param {Node} node
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isLeftEdgeOf(node, ancestor) {
    while (node && node !== ancestor) {
        if (position(node) !== 0) {
            return false;
        }
        node = node.parentNode;
    }
    return true;
}
/**
 * returns whether node is right edge of ancestor or not.
 *
 * @param {Node} node
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isRightEdgeOf(node, ancestor) {
    if (!ancestor) {
        return false;
    }
    while (node && node !== ancestor) {
        if (position(node) !== nodeLength(node.parentNode) - 1) {
            return false;
        }
        node = node.parentNode;
    }
    return true;
}
/**
 * returns whether point is left edge of ancestor or not.
 * @param {BoundaryPoint} point
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isLeftEdgePointOf(point, ancestor) {
    return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
}
/**
 * returns whether point is right edge of ancestor or not.
 * @param {BoundaryPoint} point
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isRightEdgePointOf(point, ancestor) {
    return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
}
/**
 * returns offset from parent.
 *
 * @param {Node} node
 */
function position(node) {
    var offset = 0;
    while ((node = node.previousSibling)) {
        offset += 1;
    }
    return offset;
}
function hasChildren(node) {
    return !!(node && node.childNodes && node.childNodes.length);
}
/**
 * returns previous boundaryPoint
 *
 * @param {BoundaryPoint} point
 * @param {Boolean} isSkipInnerOffset
 * @return {BoundaryPoint}
 */
function prevPoint(point, isSkipInnerOffset) {
    var node;
    var offset;
    if (point.offset === 0) {
        if (isEditable(point.node)) {
            return null;
        }
        node = point.node.parentNode;
        offset = position(point.node);
    }
    else if (hasChildren(point.node)) {
        node = point.node.childNodes[point.offset - 1];
        offset = nodeLength(node);
    }
    else {
        node = point.node;
        offset = isSkipInnerOffset ? 0 : point.offset - 1;
    }
    return {
        node: node,
        offset: offset
    };
}
/**
 * returns next boundaryPoint
 *
 * @param {BoundaryPoint} point
 * @param {Boolean} isSkipInnerOffset
 * @return {BoundaryPoint}
 */
function nextPoint(point, isSkipInnerOffset) {
    var node, offset;
    if (nodeLength(point.node) === point.offset) {
        if (isEditable(point.node)) {
            return null;
        }
        node = point.node.parentNode;
        offset = position(point.node) + 1;
    }
    else if (hasChildren(point.node)) {
        node = point.node.childNodes[point.offset];
        offset = 0;
    }
    else {
        node = point.node;
        offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
    }
    return {
        node: node,
        offset: offset
    };
}
/**
 * returns whether pointA and pointB is same or not.
 *
 * @param {BoundaryPoint} pointA
 * @param {BoundaryPoint} pointB
 * @return {Boolean}
 */
function isSamePoint(pointA, pointB) {
    return pointA.node === pointB.node && pointA.offset === pointB.offset;
}
/**
 * returns whether point is visible (can set cursor) or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isVisiblePoint(point) {
    if (isText(point.node) || !hasChildren(point.node) || isEmpty$1(point.node)) {
        return true;
    }
    var leftNode = point.node.childNodes[point.offset - 1];
    var rightNode = point.node.childNodes[point.offset];
    if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
        return true;
    }
    return false;
}
/**
 * @method prevPointUtil
 *
 * @param {BoundaryPoint} point
 * @param {Function} pred
 * @return {BoundaryPoint}
 */
function prevPointUntil(point, pred) {
    while (point) {
        if (pred(point)) {
            return point;
        }
        point = prevPoint(point);
    }
    return null;
}
/**
 * @method nextPointUntil
 *
 * @param {BoundaryPoint} point
 * @param {Function} pred
 * @return {BoundaryPoint}
 */
function nextPointUntil(point, pred) {
    while (point) {
        if (pred(point)) {
            return point;
        }
        point = nextPoint(point);
    }
    return null;
}
/**
 * returns whether point has character or not.
 *
 * @param {Point} point
 * @return {Boolean}
 */
function isCharPoint(point) {
    if (!isText(point.node)) {
        return false;
    }
    var ch = point.node.nodeValue.charAt(point.offset - 1);
    return ch && (ch !== ' ' && ch !== NBSP_CHAR);
}
/**
 * @method walkPoint
 *
 * @param {BoundaryPoint} startPoint
 * @param {BoundaryPoint} endPoint
 * @param {Function} handler
 * @param {Boolean} isSkipInnerOffset
 */
function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
    var point = startPoint;
    while (point) {
        handler(point);
        if (isSamePoint(point, endPoint)) {
            break;
        }
        var isSkipOffset = isSkipInnerOffset &&
            startPoint.node !== point.node &&
            endPoint.node !== point.node;
        point = nextPoint(point, isSkipOffset);
    }
}
/**
 * @method makeOffsetPath
 *
 * return offsetPath(array of offset) from ancestor
 *
 * @param {Node} ancestor - ancestor node
 * @param {Node} node
 */
function makeOffsetPath(ancestor, node) {
    var ancestors = listAncestor(node, func.eq(ancestor));
    return ancestors.map(position).reverse();
}
/**
 * @method fromOffsetPath
 *
 * return element from offsetPath(array of offset)
 *
 * @param {Node} ancestor - ancestor node
 * @param {array} offsets - offsetPath
 */
function fromOffsetPath(ancestor, offsets) {
    var current = ancestor;
    for (var i = 0, len = offsets.length; i < len; i++) {
        if (current.childNodes.length <= offsets[i]) {
            current = current.childNodes[current.childNodes.length - 1];
        }
        else {
            current = current.childNodes[offsets[i]];
        }
    }
    return current;
}
/**
 * @method splitNode
 *
 * split element or #text
 *
 * @param {BoundaryPoint} point
 * @param {Object} [options]
 * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
 * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
 * @return {Node} right node of boundaryPoint
 */
function splitNode(point, options) {
    var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
    var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
    // edge case
    if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
        if (isLeftEdgePoint(point)) {
            return point.node;
        }
        else if (isRightEdgePoint(point)) {
            return point.node.nextSibling;
        }
    }
    // split #text
    if (isText(point.node)) {
        return point.node.splitText(point.offset);
    }
    else {
        var childNode = point.node.childNodes[point.offset];
        var clone = insertAfter(point.node.cloneNode(false), point.node);
        appendChildNodes(clone, listNext(childNode));
        if (!isSkipPaddingBlankHTML) {
            paddingBlankHTML(point.node);
            paddingBlankHTML(clone);
        }
        return clone;
    }
}
/**
 * @method splitTree
 *
 * split tree by point
 *
 * @param {Node} root - split root
 * @param {BoundaryPoint} point
 * @param {Object} [options]
 * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
 * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
 * @return {Node} right node of boundaryPoint
 */
function splitTree(root, point, options) {
    // ex) [#text, <span>, <p>]
    var ancestors = listAncestor(point.node, func.eq(root));
    if (!ancestors.length) {
        return null;
    }
    else if (ancestors.length === 1) {
        return splitNode(point, options);
    }
    return ancestors.reduce(function (node, parent) {
        if (node === point.node) {
            node = splitNode(point, options);
        }
        return splitNode({
            node: parent,
            offset: node ? position(node) : nodeLength(parent)
        }, options);
    });
}
/**
 * split point
 *
 * @param {Point} point
 * @param {Boolean} isInline
 * @return {Object}
 */
function splitPoint(point, isInline) {
    // find splitRoot, container
    //  - inline: splitRoot is a child of paragraph
    //  - block: splitRoot is a child of bodyContainer
    var pred = isInline ? isPara : isBodyContainer;
    var ancestors = listAncestor(point.node, pred);
    var topAncestor = lists.last(ancestors) || point.node;
    var splitRoot, container;
    if (pred(topAncestor)) {
        splitRoot = ancestors[ancestors.length - 2];
        container = topAncestor;
    }
    else {
        splitRoot = topAncestor;
        container = splitRoot.parentNode;
    }
    // if splitRoot is exists, split with splitTree
    var pivot = splitRoot && splitTree(splitRoot, point, {
        isSkipPaddingBlankHTML: isInline,
        isNotSplitEdgePoint: isInline
    });
    // if container is point.node, find pivot with point.offset
    if (!pivot && container === point.node) {
        pivot = point.node.childNodes[point.offset];
    }
    return {
        rightNode: pivot,
        container: container
    };
}
function create(nodeName) {
    return document.createElement(nodeName);
}
function createText(text) {
    return document.createTextNode(text);
}
/**
 * @method remove
 *
 * remove node, (isRemoveChild: remove child or not)
 *
 * @param {Node} node
 * @param {Boolean} isRemoveChild
 */
function remove(node, isRemoveChild) {
    if (!node || !node.parentNode) {
        return;
    }
    if (node.removeNode) {
        return node.removeNode(isRemoveChild);
    }
    var parent = node.parentNode;
    if (!isRemoveChild) {
        var nodes = [];
        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            nodes.push(node.childNodes[i]);
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
            parent.insertBefore(nodes[i], node);
        }
    }
    parent.removeChild(node);
}
/**
 * @method removeWhile
 *
 * @param {Node} node
 * @param {Function} pred
 */
function removeWhile(node, pred) {
    while (node) {
        if (isEditable(node) || !pred(node)) {
            break;
        }
        var parent = node.parentNode;
        remove(node);
        node = parent;
    }
}
/**
 * @method replace
 *
 * replace node with provided nodeName
 *
 * @param {Node} node
 * @param {String} nodeName
 * @return {Node} - new node
 */
function replace(node, nodeName) {
    if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
        return node;
    }
    var newNode = create(nodeName);
    if (node.style.cssText) {
        newNode.style.cssText = node.style.cssText;
    }
    appendChildNodes(newNode, lists.from(node.childNodes));
    insertAfter(newNode, node);
    remove(node);
    return newNode;
}
var isTextarea = makePredByNodeName('TEXTAREA');
/**
 * @param {jQuery} $node
 * @param {Boolean} [stripLinebreaks] - default: false
 */
function value($node, stripLinebreaks) {
    var val = isTextarea($node[0]) ? $node.val() : $node.html();
    if (stripLinebreaks) {
        return val.replace(/[\n\r]/g, '');
    }
    return val;
}
/**
 * @method html
 *
 * get the HTML contents of node
 *
 * @param {jQuery} $node
 * @param {Boolean} [isNewlineOnBlock]
 */
function html($node, isNewlineOnBlock) {
    var markup = value($node);
    if (isNewlineOnBlock) {
        var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
        markup = markup.replace(regexTag, function (match, endSlash, name) {
            name = name.toUpperCase();
            var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&
                !!endSlash;
            var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
            return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');
        });
        markup = $$1.trim(markup);
    }
    return markup;
}
function posFromPlaceholder(placeholder) {
    var $placeholder = $$1(placeholder);
    var pos = $placeholder.offset();
    var height = $placeholder.outerHeight(true); // include margin
    return {
        left: pos.left,
        top: pos.top + height
    };
}
function attachEvents($node, events) {
    Object.keys(events).forEach(function (key) {
        $node.on(key, events[key]);
    });
}
function detachEvents($node, events) {
    Object.keys(events).forEach(function (key) {
        $node.off(key, events[key]);
    });
}
/**
 * @method isCustomStyleTag
 *
 * assert if a node contains a "note-styletag" class,
 * which implies that's a custom-made style tag node
 *
 * @param {Node} an HTML DOM node
 */
function isCustomStyleTag(node) {
    return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
}
var dom = {
    /** @property {String} NBSP_CHAR */
    NBSP_CHAR: NBSP_CHAR,
    /** @property {String} ZERO_WIDTH_NBSP_CHAR */
    ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
    /** @property {String} blank */
    blank: blankHTML,
    /** @property {String} emptyPara */
    emptyPara: "<p>" + blankHTML + "</p>",
    makePredByNodeName: makePredByNodeName,
    isEditable: isEditable,
    isControlSizing: isControlSizing,
    isText: isText,
    isElement: isElement,
    isVoid: isVoid,
    isPara: isPara,
    isPurePara: isPurePara,
    isHeading: isHeading,
    isInline: isInline,
    isBlock: func.not(isInline),
    isBodyInline: isBodyInline,
    isBody: isBody,
    isParaInline: isParaInline,
    isPre: isPre,
    isList: isList,
    isTable: isTable,
    isData: isData,
    isCell: isCell,
    isBlockquote: isBlockquote,
    isBodyContainer: isBodyContainer,
    isAnchor: isAnchor,
    isDiv: makePredByNodeName('DIV'),
    isLi: isLi,
    isBR: makePredByNodeName('BR'),
    isSpan: makePredByNodeName('SPAN'),
    isB: makePredByNodeName('B'),
    isU: makePredByNodeName('U'),
    isS: makePredByNodeName('S'),
    isI: makePredByNodeName('I'),
    isImg: makePredByNodeName('IMG'),
    isTextarea: isTextarea,
    isEmpty: isEmpty$1,
    isEmptyAnchor: func.and(isAnchor, isEmpty$1),
    isClosestSibling: isClosestSibling,
    withClosestSiblings: withClosestSiblings,
    nodeLength: nodeLength,
    isLeftEdgePoint: isLeftEdgePoint,
    isRightEdgePoint: isRightEdgePoint,
    isEdgePoint: isEdgePoint,
    isLeftEdgeOf: isLeftEdgeOf,
    isRightEdgeOf: isRightEdgeOf,
    isLeftEdgePointOf: isLeftEdgePointOf,
    isRightEdgePointOf: isRightEdgePointOf,
    prevPoint: prevPoint,
    nextPoint: nextPoint,
    isSamePoint: isSamePoint,
    isVisiblePoint: isVisiblePoint,
    prevPointUntil: prevPointUntil,
    nextPointUntil: nextPointUntil,
    isCharPoint: isCharPoint,
    walkPoint: walkPoint,
    ancestor: ancestor,
    singleChildAncestor: singleChildAncestor,
    listAncestor: listAncestor,
    lastAncestor: lastAncestor,
    listNext: listNext,
    listPrev: listPrev,
    listDescendant: listDescendant,
    commonAncestor: commonAncestor,
    wrap: wrap,
    insertAfter: insertAfter,
    appendChildNodes: appendChildNodes,
    position: position,
    hasChildren: hasChildren,
    makeOffsetPath: makeOffsetPath,
    fromOffsetPath: fromOffsetPath,
    splitTree: splitTree,
    splitPoint: splitPoint,
    create: create,
    createText: createText,
    remove: remove,
    removeWhile: removeWhile,
    replace: replace,
    html: html,
    value: value,
    posFromPlaceholder: posFromPlaceholder,
    attachEvents: attachEvents,
    detachEvents: detachEvents,
    isCustomStyleTag: isCustomStyleTag
};

/**
 * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
 *
 * @param {TextRange} textRange
 * @param {Boolean} isStart
 * @return {BoundaryPoint}
 *
 * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
 */
function textRangeToPoint(textRange, isStart) {
    var container = textRange.parentElement();
    var offset;
    var tester = document.body.createTextRange();
    var prevContainer;
    var childNodes = lists.from(container.childNodes);
    for (offset = 0; offset < childNodes.length; offset++) {
        if (dom.isText(childNodes[offset])) {
            continue;
        }
        tester.moveToElementText(childNodes[offset]);
        if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
            break;
        }
        prevContainer = childNodes[offset];
    }
    if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
        var textRangeStart = document.body.createTextRange();
        var curTextNode = null;
        textRangeStart.moveToElementText(prevContainer || container);
        textRangeStart.collapse(!prevContainer);
        curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
        var pointTester = textRange.duplicate();
        pointTester.setEndPoint('StartToStart', textRangeStart);
        var textCount = pointTester.text.replace(/[\r\n]/g, '').length;
        while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
            textCount -= curTextNode.nodeValue.length;
            curTextNode = curTextNode.nextSibling;
        }
        // [workaround] enforce IE to re-reference curTextNode, hack
        var dummy = curTextNode.nodeValue; // eslint-disable-line
        if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&
            textCount === curTextNode.nodeValue.length) {
            textCount -= curTextNode.nodeValue.length;
            curTextNode = curTextNode.nextSibling;
        }
        container = curTextNode;
        offset = textCount;
    }
    return {
        cont: container,
        offset: offset
    };
}
/**
 * return TextRange from boundary point (inspired by google closure-library)
 * @param {BoundaryPoint} point
 * @return {TextRange}
 */
function pointToTextRange(point) {
    var textRangeInfo = function (container, offset) {
        var node, isCollapseToStart;
        if (dom.isText(container)) {
            var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
            var prevContainer = lists.last(prevTextNodes).previousSibling;
            node = prevContainer || container.parentNode;
            offset += lists.sum(lists.tail(prevTextNodes), dom.nodeLength);
            isCollapseToStart = !prevContainer;
        }
        else {
            node = container.childNodes[offset] || container;
            if (dom.isText(node)) {
                return textRangeInfo(node, 0);
            }
            offset = 0;
            isCollapseToStart = false;
        }
        return {
            node: node,
            collapseToStart: isCollapseToStart,
            offset: offset
        };
    };
    var textRange = document.body.createTextRange();
    var info = textRangeInfo(point.node, point.offset);
    textRange.moveToElementText(info.node);
    textRange.collapse(info.collapseToStart);
    textRange.moveStart('character', info.offset);
    return textRange;
}
/**
   * Wrapped Range
   *
   * @constructor
   * @param {Node} sc - start container
   * @param {Number} so - start offset
   * @param {Node} ec - end container
   * @param {Number} eo - end offset
   */
var WrappedRange = /** @class */ (function () {
    function WrappedRange(sc, so, ec, eo) {
        this.sc = sc;
        this.so = so;
        this.ec = ec;
        this.eo = eo;
        // isOnEditable: judge whether range is on editable or not
        this.isOnEditable = this.makeIsOn(dom.isEditable);
        // isOnList: judge whether range is on list node or not
        this.isOnList = this.makeIsOn(dom.isList);
        // isOnAnchor: judge whether range is on anchor node or not
        this.isOnAnchor = this.makeIsOn(dom.isAnchor);
        // isOnCell: judge whether range is on cell node or not
        this.isOnCell = this.makeIsOn(dom.isCell);
        // isOnData: judge whether range is on data node or not
        this.isOnData = this.makeIsOn(dom.isData);
    }
    // nativeRange: get nativeRange from sc, so, ec, eo
    WrappedRange.prototype.nativeRange = function () {
        if (env.isW3CRangeSupport) {
            var w3cRange = document.createRange();
            w3cRange.setStart(this.sc, this.so);
            w3cRange.setEnd(this.ec, this.eo);
            return w3cRange;
        }
        else {
            var textRange = pointToTextRange({
                node: this.sc,
                offset: this.so
            });
            textRange.setEndPoint('EndToEnd', pointToTextRange({
                node: this.ec,
                offset: this.eo
            }));
            return textRange;
        }
    };
    WrappedRange.prototype.getPoints = function () {
        return {
            sc: this.sc,
            so: this.so,
            ec: this.ec,
            eo: this.eo
        };
    };
    WrappedRange.prototype.getStartPoint = function () {
        return {
            node: this.sc,
            offset: this.so
        };
    };
    WrappedRange.prototype.getEndPoint = function () {
        return {
            node: this.ec,
            offset: this.eo
        };
    };
    /**
     * select update visible range
     */
    WrappedRange.prototype.select = function () {
        var nativeRng = this.nativeRange();
        if (env.isW3CRangeSupport) {
            var selection = document.getSelection();
            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }
            selection.addRange(nativeRng);
        }
        else {
            nativeRng.select();
        }
        return this;
    };
    /**
     * Moves the scrollbar to start container(sc) of current range
     *
     * @return {WrappedRange}
     */
    WrappedRange.prototype.scrollIntoView = function (container) {
        var height = $$1(container).height();
        if (container.scrollTop + height < this.sc.offsetTop) {
            container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
        }
        return this;
    };
    /**
     * @return {WrappedRange}
     */
    WrappedRange.prototype.normalize = function () {
        /**
         * @param {BoundaryPoint} point
         * @param {Boolean} isLeftToRight
         * @return {BoundaryPoint}
         */
        var getVisiblePoint = function (point, isLeftToRight) {
            if ((dom.isVisiblePoint(point) && !dom.isEdgePoint(point)) ||
                (dom.isVisiblePoint(point) && dom.isRightEdgePoint(point) && !isLeftToRight) ||
                (dom.isVisiblePoint(point) && dom.isLeftEdgePoint(point) && isLeftToRight) ||
                (dom.isVisiblePoint(point) && dom.isBlock(point.node) && dom.isEmpty(point.node))) {
                return point;
            }
            // point on block's edge
            var block = dom.ancestor(point.node, dom.isBlock);
            if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||
                ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {
                // returns point already on visible point
                if (dom.isVisiblePoint(point)) {
                    return point;
                }
                // reverse direction
                isLeftToRight = !isLeftToRight;
            }
            var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint)
                : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
            return nextPoint || point;
        };
        var endPoint = getVisiblePoint(this.getEndPoint(), false);
        var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
        return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    };
    /**
     * returns matched nodes on range
     *
     * @param {Function} [pred] - predicate function
     * @param {Object} [options]
     * @param {Boolean} [options.includeAncestor]
     * @param {Boolean} [options.fullyContains]
     * @return {Node[]}
     */
    WrappedRange.prototype.nodes = function (pred, options) {
        pred = pred || func.ok;
        var includeAncestor = options && options.includeAncestor;
        var fullyContains = options && options.fullyContains;
        // TODO compare points and sort
        var startPoint = this.getStartPoint();
        var endPoint = this.getEndPoint();
        var nodes = [];
        var leftEdgeNodes = [];
        dom.walkPoint(startPoint, endPoint, function (point) {
            if (dom.isEditable(point.node)) {
                return;
            }
            var node;
            if (fullyContains) {
                if (dom.isLeftEdgePoint(point)) {
                    leftEdgeNodes.push(point.node);
                }
                if (dom.isRightEdgePoint(point) && lists.contains(leftEdgeNodes, point.node)) {
                    node = point.node;
                }
            }
            else if (includeAncestor) {
                node = dom.ancestor(point.node, pred);
            }
            else {
                node = point.node;
            }
            if (node && pred(node)) {
                nodes.push(node);
            }
        }, true);
        return lists.unique(nodes);
    };
    /**
     * returns commonAncestor of range
     * @return {Element} - commonAncestor
     */
    WrappedRange.prototype.commonAncestor = function () {
        return dom.commonAncestor(this.sc, this.ec);
    };
    /**
     * returns expanded range by pred
     *
     * @param {Function} pred - predicate function
     * @return {WrappedRange}
     */
    WrappedRange.prototype.expand = function (pred) {
        var startAncestor = dom.ancestor(this.sc, pred);
        var endAncestor = dom.ancestor(this.ec, pred);
        if (!startAncestor && !endAncestor) {
            return new WrappedRange(this.sc, this.so, this.ec, this.eo);
        }
        var boundaryPoints = this.getPoints();
        if (startAncestor) {
            boundaryPoints.sc = startAncestor;
            boundaryPoints.so = 0;
        }
        if (endAncestor) {
            boundaryPoints.ec = endAncestor;
            boundaryPoints.eo = dom.nodeLength(endAncestor);
        }
        return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
    };
    /**
     * @param {Boolean} isCollapseToStart
     * @return {WrappedRange}
     */
    WrappedRange.prototype.collapse = function (isCollapseToStart) {
        if (isCollapseToStart) {
            return new WrappedRange(this.sc, this.so, this.sc, this.so);
        }
        else {
            return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
        }
    };
    /**
     * splitText on range
     */
    WrappedRange.prototype.splitText = function () {
        var isSameContainer = this.sc === this.ec;
        var boundaryPoints = this.getPoints();
        if (dom.isText(this.ec) && !dom.isEdgePoint(this.getEndPoint())) {
            this.ec.splitText(this.eo);
        }
        if (dom.isText(this.sc) && !dom.isEdgePoint(this.getStartPoint())) {
            boundaryPoints.sc = this.sc.splitText(this.so);
            boundaryPoints.so = 0;
            if (isSameContainer) {
                boundaryPoints.ec = boundaryPoints.sc;
                boundaryPoints.eo = this.eo - this.so;
            }
        }
        return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
    };
    /**
     * delete contents on range
     * @return {WrappedRange}
     */
    WrappedRange.prototype.deleteContents = function () {
        if (this.isCollapsed()) {
            return this;
        }
        var rng = this.splitText();
        var nodes = rng.nodes(null, {
            fullyContains: true
        });
        // find new cursor point
        var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
            return !lists.contains(nodes, point.node);
        });
        var emptyParents = [];
        $$1.each(nodes, function (idx, node) {
            // find empty parents
            var parent = node.parentNode;
            if (point.node !== parent && dom.nodeLength(parent) === 1) {
                emptyParents.push(parent);
            }
            dom.remove(node, false);
        });
        // remove empty parents
        $$1.each(emptyParents, function (idx, node) {
            dom.remove(node, false);
        });
        return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
    };
    /**
     * makeIsOn: return isOn(pred) function
     */
    WrappedRange.prototype.makeIsOn = function (pred) {
        return function () {
            var ancestor = dom.ancestor(this.sc, pred);
            return !!ancestor && (ancestor === dom.ancestor(this.ec, pred));
        };
    };
    /**
     * @param {Function} pred
     * @return {Boolean}
     */
    WrappedRange.prototype.isLeftEdgeOf = function (pred) {
        if (!dom.isLeftEdgePoint(this.getStartPoint())) {
            return false;
        }
        var node = dom.ancestor(this.sc, pred);
        return node && dom.isLeftEdgeOf(this.sc, node);
    };
    /**
     * returns whether range was collapsed or not
     */
    WrappedRange.prototype.isCollapsed = function () {
        return this.sc === this.ec && this.so === this.eo;
    };
    /**
     * wrap inline nodes which children of body with paragraph
     *
     * @return {WrappedRange}
     */
    WrappedRange.prototype.wrapBodyInlineWithPara = function () {
        if (dom.isBodyContainer(this.sc) && dom.isEmpty(this.sc)) {
            this.sc.innerHTML = dom.emptyPara;
            return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
        }
        /**
         * [workaround] firefox often create range on not visible point. so normalize here.
         *  - firefox: |<p>text</p>|
         *  - chrome: <p>|text|</p>
         */
        var rng = this.normalize();
        if (dom.isParaInline(this.sc) || dom.isPara(this.sc)) {
            return rng;
        }
        // find inline top ancestor
        var topAncestor;
        if (dom.isInline(rng.sc)) {
            var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
            topAncestor = lists.last(ancestors);
            if (!dom.isInline(topAncestor)) {
                topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
            }
        }
        else {
            topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
        }
        // siblings not in paragraph
        var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
        inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));
        // wrap with paragraph
        if (inlineSiblings.length) {
            var para = dom.wrap(lists.head(inlineSiblings), 'p');
            dom.appendChildNodes(para, lists.tail(inlineSiblings));
        }
        return this.normalize();
    };
    /**
     * insert node at current cursor
     *
     * @param {Node} node
     * @return {Node}
     */
    WrappedRange.prototype.insertNode = function (node) {
        var rng = this.wrapBodyInlineWithPara().deleteContents();
        var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));
        if (info.rightNode) {
            info.rightNode.parentNode.insertBefore(node, info.rightNode);
        }
        else {
            info.container.appendChild(node);
        }
        return node;
    };
    /**
     * insert html at current cursor
     */
    WrappedRange.prototype.pasteHTML = function (markup) {
        var contentsContainer = $$1('<div></div>').html(markup)[0];
        var childNodes = lists.from(contentsContainer.childNodes);
        var rng = this.wrapBodyInlineWithPara().deleteContents();
        return childNodes.reverse().map(function (childNode) {
            return rng.insertNode(childNode);
        }).reverse();
    };
    /**
     * returns text in range
     *
     * @return {String}
     */
    WrappedRange.prototype.toString = function () {
        var nativeRng = this.nativeRange();
        return env.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
    };
    /**
     * returns range for word before cursor
     *
     * @param {Boolean} [findAfter] - find after cursor, default: false
     * @return {WrappedRange}
     */
    WrappedRange.prototype.getWordRange = function (findAfter) {
        var endPoint = this.getEndPoint();
        if (!dom.isCharPoint(endPoint)) {
            return this;
        }
        var startPoint = dom.prevPointUntil(endPoint, function (point) {
            return !dom.isCharPoint(point);
        });
        if (findAfter) {
            endPoint = dom.nextPointUntil(endPoint, function (point) {
                return !dom.isCharPoint(point);
            });
        }
        return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    };
    /**
     * create offsetPath bookmark
     *
     * @param {Node} editable
     */
    WrappedRange.prototype.bookmark = function (editable) {
        return {
            s: {
                path: dom.makeOffsetPath(editable, this.sc),
                offset: this.so
            },
            e: {
                path: dom.makeOffsetPath(editable, this.ec),
                offset: this.eo
            }
        };
    };
    /**
     * create offsetPath bookmark base on paragraph
     *
     * @param {Node[]} paras
     */
    WrappedRange.prototype.paraBookmark = function (paras) {
        return {
            s: {
                path: lists.tail(dom.makeOffsetPath(lists.head(paras), this.sc)),
                offset: this.so
            },
            e: {
                path: lists.tail(dom.makeOffsetPath(lists.last(paras), this.ec)),
                offset: this.eo
            }
        };
    };
    /**
     * getClientRects
     * @return {Rect[]}
     */
    WrappedRange.prototype.getClientRects = function () {
        var nativeRng = this.nativeRange();
        return nativeRng.getClientRects();
    };
    return WrappedRange;
}());
/**
 * Data structure
 *  * BoundaryPoint: a point of dom tree
 *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
 *
 * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
 */
var range = {
    /**
     * create Range Object From arguments or Browser Selection
     *
     * @param {Node} sc - start container
     * @param {Number} so - start offset
     * @param {Node} ec - end container
     * @param {Number} eo - end offset
     * @return {WrappedRange}
     */
    create: function (sc, so, ec, eo) {
        if (arguments.length === 4) {
            return new WrappedRange(sc, so, ec, eo);
        }
        else if (arguments.length === 2) {
            ec = sc;
            eo = so;
            return new WrappedRange(sc, so, ec, eo);
        }
        else {
            var wrappedRange = this.createFromSelection();
            if (!wrappedRange && arguments.length === 1) {
                wrappedRange = this.createFromNode(arguments[0]);
                return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);
            }
            return wrappedRange;
        }
    },
    createFromSelection: function () {
        var sc, so, ec, eo;
        if (env.isW3CRangeSupport) {
            var selection = document.getSelection();
            if (!selection || selection.rangeCount === 0) {
                return null;
            }
            else if (dom.isBody(selection.anchorNode)) {
                // Firefox: returns entire body as range on initialization.
                // We won't never need it.
                return null;
            }
            var nativeRng = selection.getRangeAt(0);
            sc = nativeRng.startContainer;
            so = nativeRng.startOffset;
            ec = nativeRng.endContainer;
            eo = nativeRng.endOffset;
        }
        else {
            var textRange = document.selection.createRange();
            var textRangeEnd = textRange.duplicate();
            textRangeEnd.collapse(false);
            var textRangeStart = textRange;
            textRangeStart.collapse(true);
            var startPoint = textRangeToPoint(textRangeStart, true);
            var endPoint = textRangeToPoint(textRangeEnd, false);
            // same visible point case: range was collapsed.
            if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&
                dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&
                endPoint.node.nextSibling === startPoint.node) {
                startPoint = endPoint;
            }
            sc = startPoint.cont;
            so = startPoint.offset;
            ec = endPoint.cont;
            eo = endPoint.offset;
        }
        return new WrappedRange(sc, so, ec, eo);
    },
    /**
     * @method
     *
     * create WrappedRange from node
     *
     * @param {Node} node
     * @return {WrappedRange}
     */
    createFromNode: function (node) {
        var sc = node;
        var so = 0;
        var ec = node;
        var eo = dom.nodeLength(ec);
        // browsers can't target a picture or void node
        if (dom.isVoid(sc)) {
            so = dom.listPrev(sc).length - 1;
            sc = sc.parentNode;
        }
        if (dom.isBR(ec)) {
            eo = dom.listPrev(ec).length - 1;
            ec = ec.parentNode;
        }
        else if (dom.isVoid(ec)) {
            eo = dom.listPrev(ec).length;
            ec = ec.parentNode;
        }
        return this.create(sc, so, ec, eo);
    },
    /**
     * create WrappedRange from node after position
     *
     * @param {Node} node
     * @return {WrappedRange}
     */
    createFromNodeBefore: function (node) {
        return this.createFromNode(node).collapse(true);
    },
    /**
     * create WrappedRange from node after position
     *
     * @param {Node} node
     * @return {WrappedRange}
     */
    createFromNodeAfter: function (node) {
        return this.createFromNode(node).collapse();
    },
    /**
     * @method
     *
     * create WrappedRange from bookmark
     *
     * @param {Node} editable
     * @param {Object} bookmark
     * @return {WrappedRange}
     */
    createFromBookmark: function (editable, bookmark) {
        var sc = dom.fromOffsetPath(editable, bookmark.s.path);
        var so = bookmark.s.offset;
        var ec = dom.fromOffsetPath(editable, bookmark.e.path);
        var eo = bookmark.e.offset;
        return new WrappedRange(sc, so, ec, eo);
    },
    /**
     * @method
     *
     * create WrappedRange from paraBookmark
     *
     * @param {Object} bookmark
     * @param {Node[]} paras
     * @return {WrappedRange}
     */
    createFromParaBookmark: function (bookmark, paras) {
        var so = bookmark.s.offset;
        var eo = bookmark.e.offset;
        var sc = dom.fromOffsetPath(lists.head(paras), bookmark.s.path);
        var ec = dom.fromOffsetPath(lists.last(paras), bookmark.e.path);
        return new WrappedRange(sc, so, ec, eo);
    }
};

/**
 * @method readFileAsDataURL
 *
 * read contents of file as representing URL
 *
 * @param {File} file
 * @return {Promise} - then: dataUrl
 */
function readFileAsDataURL(file) {
    return $$1.Deferred(function (deferred) {
        $$1.extend(new FileReader(), {
            onload: function (e) {
                var dataURL = e.target.result;
                deferred.resolve(dataURL);
            },
            onerror: function (err) {
                deferred.reject(err);
            }
        }).readAsDataURL(file);
    }).promise();
}
/**
 * @method createImage
 *
 * create `<image>` from url string
 *
 * @param {String} url
 * @return {Promise} - then: $image
 */
function createImage(url) {
    return $$1.Deferred(function (deferred) {
        var $img = $$1('<img>');
        $img.one('load', function () {
            $img.off('error abort');
            deferred.resolve($img);
        }).one('error abort', function () {
            $img.off('load').detach();
            deferred.reject($img);
        }).css({
            display: 'none'
        }).appendTo(document.body).attr('src', url);
    }).promise();
}

var History = /** @class */ (function () {
    function History($editable) {
        this.stack = [];
        this.stackOffset = -1;
        this.$editable = $editable;
        this.editable = $editable[0];
    }
    History.prototype.makeSnapshot = function () {
        var rng = range.create(this.editable);
        var emptyBookmark = { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } };
        return {
            contents: this.$editable.html(),
            bookmark: (rng ? rng.bookmark(this.editable) : emptyBookmark)
        };
    };
    History.prototype.applySnapshot = function (snapshot) {
        if (snapshot.contents !== null) {
            this.$editable.html(snapshot.contents);
        }
        if (snapshot.bookmark !== null) {
            range.createFromBookmark(this.editable, snapshot.bookmark).select();
        }
    };
    /**
    * @method rewind
    * Rewinds the history stack back to the first snapshot taken.
    * Leaves the stack intact, so that "Redo" can still be used.
    */
    History.prototype.rewind = function () {
        // Create snap shot if not yet recorded
        if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
            this.recordUndo();
        }
        // Return to the first available snapshot.
        this.stackOffset = 0;
        // Apply that snapshot.
        this.applySnapshot(this.stack[this.stackOffset]);
    };
    /**
    * @method reset
    * Resets the history stack completely; reverting to an empty editor.
    */
    History.prototype.reset = function () {
        // Clear the stack.
        this.stack = [];
        // Restore stackOffset to its original value.
        this.stackOffset = -1;
        // Clear the editable area.
        this.$editable.html('');
        // Record our first snapshot (of nothing).
        this.recordUndo();
    };
    /**
     * undo
     */
    History.prototype.undo = function () {
        // Create snap shot if not yet recorded
        if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
            this.recordUndo();
        }
        if (this.stackOffset > 0) {
            this.stackOffset--;
            this.applySnapshot(this.stack[this.stackOffset]);
        }
    };
    /**
     * redo
     */
    History.prototype.redo = function () {
        if (this.stack.length - 1 > this.stackOffset) {
            this.stackOffset++;
            this.applySnapshot(this.stack[this.stackOffset]);
        }
    };
    /**
     * recorded undo
     */
    History.prototype.recordUndo = function () {
        this.stackOffset++;
        // Wash out stack after stackOffset
        if (this.stack.length > this.stackOffset) {
            this.stack = this.stack.slice(0, this.stackOffset);
        }
        // Create new snapshot and push it to the end
        this.stack.push(this.makeSnapshot());
    };
    return History;
}());

var Style = /** @class */ (function () {
    function Style() {
    }
    /**
     * @method jQueryCSS
     *
     * [workaround] for old jQuery
     * passing an array of style properties to .css()
     * will result in an object of property-value pairs.
     * (compability with version < 1.9)
     *
     * @private
     * @param  {jQuery} $obj
     * @param  {Array} propertyNames - An array of one or more CSS properties.
     * @return {Object}
     */
    Style.prototype.jQueryCSS = function ($obj, propertyNames) {
        if (env.jqueryVersion < 1.9) {
            var result_1 = {};
            $$1.each(propertyNames, function (idx, propertyName) {
                result_1[propertyName] = $obj.css(propertyName);
            });
            return result_1;
        }
        return $obj.css(propertyNames);
    };
    /**
     * returns style object from node
     *
     * @param {jQuery} $node
     * @return {Object}
     */
    Style.prototype.fromNode = function ($node) {
        var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
        var styleInfo = this.jQueryCSS($node, properties) || {};
        styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
        return styleInfo;
    };
    /**
     * paragraph level style
     *
     * @param {WrappedRange} rng
     * @param {Object} styleInfo
     */
    Style.prototype.stylePara = function (rng, styleInfo) {
        $$1.each(rng.nodes(dom.isPara, {
            includeAncestor: true
        }), function (idx, para) {
            $$1(para).css(styleInfo);
        });
    };
    /**
     * insert and returns styleNodes on range.
     *
     * @param {WrappedRange} rng
     * @param {Object} [options] - options for styleNodes
     * @param {String} [options.nodeName] - default: `SPAN`
     * @param {Boolean} [options.expandClosestSibling] - default: `false`
     * @param {Boolean} [options.onlyPartialContains] - default: `false`
     * @return {Node[]}
     */
    Style.prototype.styleNodes = function (rng, options) {
        rng = rng.splitText();
        var nodeName = (options && options.nodeName) || 'SPAN';
        var expandClosestSibling = !!(options && options.expandClosestSibling);
        var onlyPartialContains = !!(options && options.onlyPartialContains);
        if (rng.isCollapsed()) {
            return [rng.insertNode(dom.create(nodeName))];
        }
        var pred = dom.makePredByNodeName(nodeName);
        var nodes = rng.nodes(dom.isText, {
            fullyContains: true
        }).map(function (text) {
            return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
        });
        if (expandClosestSibling) {
            if (onlyPartialContains) {
                var nodesInRange_1 = rng.nodes();
                // compose with partial contains predication
                pred = func.and(pred, function (node) {
                    return lists.contains(nodesInRange_1, node);
                });
            }
            return nodes.map(function (node) {
                var siblings = dom.withClosestSiblings(node, pred);
                var head = lists.head(siblings);
                var tails = lists.tail(siblings);
                $$1.each(tails, function (idx, elem) {
                    dom.appendChildNodes(head, elem.childNodes);
                    dom.remove(elem);
                });
                return lists.head(siblings);
            });
        }
        else {
            return nodes;
        }
    };
    /**
     * get current style on cursor
     *
     * @param {WrappedRange} rng
     * @return {Object} - object contains style properties.
     */
    Style.prototype.current = function (rng) {
        var $cont = $$1(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
        var styleInfo = this.fromNode($cont);
        // document.queryCommandState for toggle state
        // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
        try {
            styleInfo = $$1.extend(styleInfo, {
                'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
                'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
            });
        }
        catch (e) { }
        // list-style-type to list-style(unordered, ordered)
        if (!rng.isOnList()) {
            styleInfo['list-style'] = 'none';
        }
        else {
            var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
            var isUnordered = $$1.inArray(styleInfo['list-style-type'], orderedTypes) > -1;
            styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
        }
        var para = dom.ancestor(rng.sc, dom.isPara);
        if (para && para.style['line-height']) {
            styleInfo['line-height'] = para.style.lineHeight;
        }
        else {
            var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
            styleInfo['line-height'] = lineHeight.toFixed(1);
        }
        styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
        styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
        styleInfo.range = rng;
        return styleInfo;
    };
    return Style;
}());

var Bullet = /** @class */ (function () {
    function Bullet() {
    }
    /**
     * toggle ordered list
     */
    Bullet.prototype.insertOrderedList = function (editable) {
        this.toggleList('OL', editable);
    };
    /**
     * toggle unordered list
     */
    Bullet.prototype.insertUnorderedList = function (editable) {
        this.toggleList('UL', editable);
    };
    /**
     * indent
     */
    Bullet.prototype.indent = function (editable) {
        var _this = this;
        var rng = range.create(editable).wrapBodyInlineWithPara();
        var paras = rng.nodes(dom.isPara, { includeAncestor: true });
        var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
        $$1.each(clustereds, function (idx, paras) {
            var head = lists.head(paras);
            if (dom.isLi(head)) {
                _this.wrapList(paras, head.parentNode.nodeName);
            }
            else {
                $$1.each(paras, function (idx, para) {
                    $$1(para).css('marginLeft', function (idx, val) {
                        return (parseInt(val, 10) || 0) + 25;
                    });
                });
            }
        });
        rng.select();
    };
    /**
     * outdent
     */
    Bullet.prototype.outdent = function (editable) {
        var _this = this;
        var rng = range.create(editable).wrapBodyInlineWithPara();
        var paras = rng.nodes(dom.isPara, { includeAncestor: true });
        var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
        $$1.each(clustereds, function (idx, paras) {
            var head = lists.head(paras);
            if (dom.isLi(head)) {
                _this.releaseList([paras]);
            }
            else {
                $$1.each(paras, function (idx, para) {
                    $$1(para).css('marginLeft', function (idx, val) {
                        val = (parseInt(val, 10) || 0);
                        return val > 25 ? val - 25 : '';
                    });
                });
            }
        });
        rng.select();
    };
    /**
     * toggle list
     *
     * @param {String} listName - OL or UL
     */
    Bullet.prototype.toggleList = function (listName, editable) {
        var _this = this;
        var rng = range.create(editable).wrapBodyInlineWithPara();
        var paras = rng.nodes(dom.isPara, { includeAncestor: true });
        var bookmark = rng.paraBookmark(paras);
        var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
        // paragraph to list
        if (lists.find(paras, dom.isPurePara)) {
            var wrappedParas_1 = [];
            $$1.each(clustereds, function (idx, paras) {
                wrappedParas_1 = wrappedParas_1.concat(_this.wrapList(paras, listName));
            });
            paras = wrappedParas_1;
            // list to paragraph or change list style
        }
        else {
            var diffLists = rng.nodes(dom.isList, {
                includeAncestor: true
            }).filter(function (listNode) {
                return !$$1.nodeName(listNode, listName);
            });
            if (diffLists.length) {
                $$1.each(diffLists, function (idx, listNode) {
                    dom.replace(listNode, listName);
                });
            }
            else {
                paras = this.releaseList(clustereds, true);
            }
        }
        range.createFromParaBookmark(bookmark, paras).select();
    };
    /**
     * @param {Node[]} paras
     * @param {String} listName
     * @return {Node[]}
     */
    Bullet.prototype.wrapList = function (paras, listName) {
        var head = lists.head(paras);
        var last = lists.last(paras);
        var prevList = dom.isList(head.previousSibling) && head.previousSibling;
        var nextList = dom.isList(last.nextSibling) && last.nextSibling;
        var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);
        // P to LI
        paras = paras.map(function (para) {
            return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
        });
        // append to list(<ul>, <ol>)
        dom.appendChildNodes(listNode, paras);
        if (nextList) {
            dom.appendChildNodes(listNode, lists.from(nextList.childNodes));
            dom.remove(nextList);
        }
        return paras;
    };
    /**
     * @method releaseList
     *
     * @param {Array[]} clustereds
     * @param {Boolean} isEscapseToBody
     * @return {Node[]}
     */
    Bullet.prototype.releaseList = function (clustereds, isEscapseToBody) {
        var releasedParas = [];
        $$1.each(clustereds, function (idx, paras) {
            var head = lists.head(paras);
            var last = lists.last(paras);
            var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
            var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                node: last.parentNode,
                offset: dom.position(last) + 1
            }, {
                isSkipPaddingBlankHTML: true
            }) : null;
            var middleList = dom.splitTree(headList, {
                node: head.parentNode,
                offset: dom.position(head)
            }, {
                isSkipPaddingBlankHTML: true
            });
            paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi)
                : lists.from(middleList.childNodes).filter(dom.isLi);
            // LI to P
            if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                paras = paras.map(function (para) {
                    return dom.replace(para, 'P');
                });
            }
            $$1.each(lists.from(paras).reverse(), function (idx, para) {
                dom.insertAfter(para, headList);
            });
            // remove empty lists
            var rootLists = lists.compact([headList, middleList, lastList]);
            $$1.each(rootLists, function (idx, rootList) {
                var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                $$1.each(listNodes.reverse(), function (idx, listNode) {
                    if (!dom.nodeLength(listNode)) {
                        dom.remove(listNode, true);
                    }
                });
            });
            releasedParas = releasedParas.concat(paras);
        });
        return releasedParas;
    };
    return Bullet;
}());

/**
 * @class editing.Typing
 *
 * Typing
 *
 */
var Typing = /** @class */ (function () {
    function Typing() {
        // a Bullet instance to toggle lists off
        this.bullet = new Bullet();
    }
    /**
     * insert tab
     *
     * @param {WrappedRange} rng
     * @param {Number} tabsize
     */
    Typing.prototype.insertTab = function (rng, tabsize) {
        var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
        rng = rng.deleteContents();
        rng.insertNode(tab, true);
        rng = range.create(tab, tabsize);
        rng.select();
    };
    /**
     * insert paragraph
     */
    Typing.prototype.insertParagraph = function (editable) {
        var rng = range.create(editable);
        // deleteContents on range.
        rng = rng.deleteContents();
        // Wrap range if it needs to be wrapped by paragraph
        rng = rng.wrapBodyInlineWithPara();
        // finding paragraph
        var splitRoot = dom.ancestor(rng.sc, dom.isPara);
        var nextPara;
        // on paragraph: split paragraph
        if (splitRoot) {
            // if it is an empty line with li
            if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                // toogle UL/OL and escape
                this.bullet.toggleList(splitRoot.parentNode.nodeName);
                return;
                // if it is an empty line with para on blockquote
            }
            else if (dom.isEmpty(splitRoot) && dom.isPara(splitRoot) && dom.isBlockquote(splitRoot.parentNode)) {
                // escape blockquote
                dom.insertAfter(splitRoot, splitRoot.parentNode);
                nextPara = splitRoot;
                // if new line has content (not a line break)
            }
            else {
                nextPara = dom.splitTree(splitRoot, rng.getStartPoint());
                var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));
                $$1.each(emptyAnchors, function (idx, anchor) {
                    dom.remove(anchor);
                });
                // replace empty heading, pre or custom-made styleTag with P tag
                if ((dom.isHeading(nextPara) || dom.isPre(nextPara) || dom.isCustomStyleTag(nextPara)) && dom.isEmpty(nextPara)) {
                    nextPara = dom.replace(nextPara, 'p');
                }
            }
            // no paragraph: insert empty paragraph
        }
        else {
            var next = rng.sc.childNodes[rng.so];
            nextPara = $$1(dom.emptyPara)[0];
            if (next) {
                rng.sc.insertBefore(nextPara, next);
            }
            else {
                rng.sc.appendChild(nextPara);
            }
        }
        range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
    };
    return Typing;
}());

/**
 * @class Create a virtual table to create what actions to do in change.
 * @param {object} startPoint Cell selected to apply change.
 * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
 * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
 * @param {object} domTable Dom element of table to make changes.
 */
var TableResultAction = function (startPoint, where, action, domTable) {
    var _startPoint = { 'colPos': 0, 'rowPos': 0 };
    var _virtualTable = [];
    var _actionCellList = [];
    /// ///////////////////////////////////////////
    // Private functions
    /// ///////////////////////////////////////////
    /**
     * Set the startPoint of action.
     */
    function setStartPoint() {
        if (!startPoint || !startPoint.tagName || (startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th')) {
            console.error('Impossible to identify start Cell point.', startPoint);
            return;
        }
        _startPoint.colPos = startPoint.cellIndex;
        if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
            console.error('Impossible to identify start Row point.', startPoint);
            return;
        }
        _startPoint.rowPos = startPoint.parentElement.rowIndex;
    }
    /**
     * Define virtual table position info object.
     *
     * @param {int} rowIndex Index position in line of virtual table.
     * @param {int} cellIndex Index position in column of virtual table.
     * @param {object} baseRow Row affected by this position.
     * @param {object} baseCell Cell affected by this position.
     * @param {bool} isSpan Inform if it is an span cell/row.
     */
    function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
        var objPosition = {
            'baseRow': baseRow,
            'baseCell': baseCell,
            'isRowSpan': isRowSpan,
            'isColSpan': isColSpan,
            'isVirtual': isVirtualCell
        };
        if (!_virtualTable[rowIndex]) {
            _virtualTable[rowIndex] = [];
        }
        _virtualTable[rowIndex][cellIndex] = objPosition;
    }
    /**
     * Create action cell object.
     *
     * @param {object} virtualTableCellObj Object of specific position on virtual table.
     * @param {enum} resultAction Action to be applied in that item.
     */
    function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
        return {
            'baseCell': virtualTableCellObj.baseCell,
            'action': resultAction,
            'virtualTable': {
                'rowIndex': virtualRowPosition,
                'cellIndex': virtualColPosition
            }
        };
    }
    /**
     * Recover free index of row to append Cell.
     *
     * @param {int} rowIndex Index of row to find free space.
     * @param {int} cellIndex Index of cell to find free space in table.
     */
    function recoverCellIndex(rowIndex, cellIndex) {
        if (!_virtualTable[rowIndex]) {
            return cellIndex;
        }
        if (!_virtualTable[rowIndex][cellIndex]) {
            return cellIndex;
        }
        var newCellIndex = cellIndex;
        while (_virtualTable[rowIndex][newCellIndex]) {
            newCellIndex++;
            if (!_virtualTable[rowIndex][newCellIndex]) {
                return newCellIndex;
            }
        }
    }
    /**
     * Recover info about row and cell and add information to virtual table.
     *
     * @param {object} row Row to recover information.
     * @param {object} cell Cell to recover information.
     */
    function addCellInfoToVirtual(row, cell) {
        var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
        var cellHasColspan = (cell.colSpan > 1);
        var cellHasRowspan = (cell.rowSpan > 1);
        var isThisSelectedCell = (row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos);
        setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false);
        // Add span rows to virtual Table.
        var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;
        if (rowspanNumber > 1) {
            for (var rp = 1; rp < rowspanNumber; rp++) {
                var rowspanIndex = row.rowIndex + rp;
                adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
                setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
            }
        }
        // Add span cols to virtual table.
        var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;
        if (colspanNumber > 1) {
            for (var cp = 1; cp < colspanNumber; cp++) {
                var cellspanIndex = recoverCellIndex(row.rowIndex, (cellIndex + cp));
                adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
                setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
            }
        }
    }
    /**
     * Process validation and adjust of start point if needed
     *
     * @param {int} rowIndex
     * @param {int} cellIndex
     * @param {object} cell
     * @param {bool} isSelectedCell
     */
    function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
        if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
            _startPoint.colPos++;
        }
    }
    /**
     * Create virtual table of cells with all cells, including span cells.
     */
    function createVirtualTable() {
        var rows = domTable.rows;
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            var cells = rows[rowIndex].cells;
            for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
            }
        }
    }
    /**
     * Get action to be applied on the cell.
     *
     * @param {object} cell virtual table cell to apply action
     */
    function getDeleteResultActionToCell(cell) {
        switch (where) {
            case TableResultAction.where.Column:
                if (cell.isColSpan) {
                    return TableResultAction.resultAction.SubtractSpanCount;
                }
                break;
            case TableResultAction.where.Row:
                if (!cell.isVirtual && cell.isRowSpan) {
                    return TableResultAction.resultAction.AddCell;
                }
                else if (cell.isRowSpan) {
                    return TableResultAction.resultAction.SubtractSpanCount;
                }
                break;
        }
        return TableResultAction.resultAction.RemoveCell;
    }
    /**
     * Get action to be applied on the cell.
     *
     * @param {object} cell virtual table cell to apply action
     */
    function getAddResultActionToCell(cell) {
        switch (where) {
            case TableResultAction.where.Column:
                if (cell.isColSpan) {
                    return TableResultAction.resultAction.SumSpanCount;
                }
                else if (cell.isRowSpan && cell.isVirtual) {
                    return TableResultAction.resultAction.Ignore;
                }
                break;
            case TableResultAction.where.Row:
                if (cell.isRowSpan) {
                    return TableResultAction.resultAction.SumSpanCount;
                }
                else if (cell.isColSpan && cell.isVirtual) {
                    return TableResultAction.resultAction.Ignore;
                }
                break;
        }
        return TableResultAction.resultAction.AddCell;
    }
    function init() {
        setStartPoint();
        createVirtualTable();
    }
    /// ///////////////////////////////////////////
    // Public functions
    /// ///////////////////////////////////////////
    /**
     * Recover array os what to do in table.
     */
    this.getActionList = function () {
        var fixedRow = (where === TableResultAction.where.Row) ? _startPoint.rowPos : -1;
        var fixedCol = (where === TableResultAction.where.Column) ? _startPoint.colPos : -1;
        var actualPosition = 0;
        var canContinue = true;
        while (canContinue) {
            var rowPosition = (fixedRow >= 0) ? fixedRow : actualPosition;
            var colPosition = (fixedCol >= 0) ? fixedCol : actualPosition;
            var row = _virtualTable[rowPosition];
            if (!row) {
                canContinue = false;
                return _actionCellList;
            }
            var cell = row[colPosition];
            if (!cell) {
                canContinue = false;
                return _actionCellList;
            }
            // Define action to be applied in this cell
            var resultAction = TableResultAction.resultAction.Ignore;
            switch (action) {
                case TableResultAction.requestAction.Add:
                    resultAction = getAddResultActionToCell(cell);
                    break;
                case TableResultAction.requestAction.Delete:
                    resultAction = getDeleteResultActionToCell(cell);
                    break;
            }
            _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));
            actualPosition++;
        }
        return _actionCellList;
    };
    init();
};
/**
*
* Where action occours enum.
*/
TableResultAction.where = { 'Row': 0, 'Column': 1 };
/**
*
* Requested action to apply enum.
*/
TableResultAction.requestAction = { 'Add': 0, 'Delete': 1 };
/**
*
* Result action to be executed enum.
*/
TableResultAction.resultAction = { 'Ignore': 0, 'SubtractSpanCount': 1, 'RemoveCell': 2, 'AddCell': 3, 'SumSpanCount': 4 };
/**
 *
 * @class editing.Table
 *
 * Table
 *
 */
var Table = /** @class */ (function () {
    function Table() {
    }
    /**
     * handle tab key
     *
     * @param {WrappedRange} rng
     * @param {Boolean} isShift
     */
    Table.prototype.tab = function (rng, isShift) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        var table = dom.ancestor(cell, dom.isTable);
        var cells = dom.listDescendant(table, dom.isCell);
        var nextCell = lists[isShift ? 'prev' : 'next'](cells, cell);
        if (nextCell) {
            range.create(nextCell, 0).select();
        }
    };
    /**
     * Add a new row
     *
     * @param {WrappedRange} rng
     * @param {String} position (top/bottom)
     * @return {Node}
     */
    Table.prototype.addRow = function (rng, position) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        var currentTr = $$1(cell).closest('tr');
        var trAttributes = this.recoverAttributes(currentTr);
        var html = $$1('<tr' + trAttributes + '></tr>');
        var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, $$1(currentTr).closest('table')[0]);
        var actions = vTable.getActionList();
        for (var idCell = 0; idCell < actions.length; idCell++) {
            var currentCell = actions[idCell];
            var tdAttributes = this.recoverAttributes(currentCell.baseCell);
            switch (currentCell.action) {
                case TableResultAction.resultAction.AddCell:
                    html.append('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    break;
                case TableResultAction.resultAction.SumSpanCount:
                    if (position === 'top') {
                        var baseCellTr = currentCell.baseCell.parent;
                        var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;
                        if (isTopFromRowSpan) {
                            var newTd = $$1('<div></div>').append($$1('<td' + tdAttributes + '>' + dom.blank + '</td>').removeAttr('rowspan')).html();
                            html.append(newTd);
                            break;
                        }
                    }
                    var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
                    rowspanNumber++;
                    currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
                    break;
            }
        }
        if (position === 'top') {
            currentTr.before(html);
        }
        else {
            var cellHasRowspan = (cell.rowSpan > 1);
            if (cellHasRowspan) {
                var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
                $$1($$1(currentTr).parent().find('tr')[lastTrIndex]).after($$1(html));
                return;
            }
            currentTr.after(html);
        }
    };
    /**
     * Add a new col
     *
     * @param {WrappedRange} rng
     * @param {String} position (left/right)
     * @return {Node}
     */
    Table.prototype.addCol = function (rng, position) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        var row = $$1(cell).closest('tr');
        var rowsGroup = $$1(row).siblings();
        rowsGroup.push(row);
        var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, $$1(row).closest('table')[0]);
        var actions = vTable.getActionList();
        for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
            var currentCell = actions[actionIndex];
            var tdAttributes = this.recoverAttributes(currentCell.baseCell);
            switch (currentCell.action) {
                case TableResultAction.resultAction.AddCell:
                    if (position === 'right') {
                        $$1(currentCell.baseCell).after('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    }
                    else {
                        $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    }
                    break;
                case TableResultAction.resultAction.SumSpanCount:
                    if (position === 'right') {
                        var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
                        colspanNumber++;
                        currentCell.baseCell.setAttribute('colSpan', colspanNumber);
                    }
                    else {
                        $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                    }
                    break;
            }
        }
    };
    /*
    * Copy attributes from element.
    *
    * @param {object} Element to recover attributes.
    * @return {string} Copied string elements.
    */
    Table.prototype.recoverAttributes = function (el) {
        var resultStr = '';
        if (!el) {
            return resultStr;
        }
        var attrList = el.attributes || [];
        for (var i = 0; i < attrList.length; i++) {
            if (attrList[i].name.toLowerCase() === 'id') {
                continue;
            }
            if (attrList[i].specified) {
                resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
            }
        }
        return resultStr;
    };
    /**
     * Delete current row
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
    Table.prototype.deleteRow = function (rng) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        var row = $$1(cell).closest('tr');
        var cellPos = row.children('td, th').index($$1(cell));
        var rowPos = row[0].rowIndex;
        var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
        var actions = vTable.getActionList();
        for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
            if (!actions[actionIndex]) {
                continue;
            }
            var baseCell = actions[actionIndex].baseCell;
            var virtualPosition = actions[actionIndex].virtualTable;
            var hasRowspan = (baseCell.rowSpan && baseCell.rowSpan > 1);
            var rowspanNumber = (hasRowspan) ? parseInt(baseCell.rowSpan, 10) : 0;
            switch (actions[actionIndex].action) {
                case TableResultAction.resultAction.Ignore:
                    continue;
                case TableResultAction.resultAction.AddCell:
                    var nextRow = row.next('tr')[0];
                    if (!nextRow) {
                        continue;
                    }
                    var cloneRow = row[0].cells[cellPos];
                    if (hasRowspan) {
                        if (rowspanNumber > 2) {
                            rowspanNumber--;
                            nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                            nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                            nextRow.cells[cellPos].innerHTML = '';
                        }
                        else if (rowspanNumber === 2) {
                            nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                            nextRow.cells[cellPos].removeAttribute('rowSpan');
                            nextRow.cells[cellPos].innerHTML = '';
                        }
                    }
                    continue;
                case TableResultAction.resultAction.SubtractSpanCount:
                    if (hasRowspan) {
                        if (rowspanNumber > 2) {
                            rowspanNumber--;
                            baseCell.setAttribute('rowSpan', rowspanNumber);
                            if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                baseCell.innerHTML = '';
                            }
                        }
                        else if (rowspanNumber === 2) {
                            baseCell.removeAttribute('rowSpan');
                            if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                baseCell.innerHTML = '';
                            }
                        }
                    }
                    continue;
                case TableResultAction.resultAction.RemoveCell:
                    // Do not need remove cell because row will be deleted.
                    continue;
            }
        }
        row.remove();
    };
    /**
     * Delete current col
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
    Table.prototype.deleteCol = function (rng) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        var row = $$1(cell).closest('tr');
        var cellPos = row.children('td, th').index($$1(cell));
        var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
        var actions = vTable.getActionList();
        for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
            if (!actions[actionIndex]) {
                continue;
            }
            switch (actions[actionIndex].action) {
                case TableResultAction.resultAction.Ignore:
                    continue;
                case TableResultAction.resultAction.SubtractSpanCount:
                    var baseCell = actions[actionIndex].baseCell;
                    var hasColspan = (baseCell.colSpan && baseCell.colSpan > 1);
                    if (hasColspan) {
                        var colspanNumber = (baseCell.colSpan) ? parseInt(baseCell.colSpan, 10) : 0;
                        if (colspanNumber > 2) {
                            colspanNumber--;
                            baseCell.setAttribute('colSpan', colspanNumber);
                            if (baseCell.cellIndex === cellPos) {
                                baseCell.innerHTML = '';
                            }
                        }
                        else if (colspanNumber === 2) {
                            baseCell.removeAttribute('colSpan');
                            if (baseCell.cellIndex === cellPos) {
                                baseCell.innerHTML = '';
                            }
                        }
                    }
                    continue;
                case TableResultAction.resultAction.RemoveCell:
                    dom.remove(actions[actionIndex].baseCell, true);
                    continue;
            }
        }
    };
    /**
     * create empty table element
     *
     * @param {Number} rowCount
     * @param {Number} colCount
     * @return {Node}
     */
    Table.prototype.createTable = function (colCount, rowCount, options) {
        var tds = [];
        var tdHTML;
        for (var idxCol = 0; idxCol < colCount; idxCol++) {
            tds.push('<td>' + dom.blank + '</td>');
        }
        tdHTML = tds.join('');
        var trs = [];
        var trHTML;
        for (var idxRow = 0; idxRow < rowCount; idxRow++) {
            trs.push('<tr>' + tdHTML + '</tr>');
        }
        trHTML = trs.join('');
        var $table = $$1('<table>' + trHTML + '</table>');
        if (options && options.tableClassName) {
            $table.addClass(options.tableClassName);
        }
        return $table[0];
    };
    /**
     * Delete current table
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
    Table.prototype.deleteTable = function (rng) {
        var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
        $$1(cell).closest('table').remove();
    };
    return Table;
}());

var KEY_BOGUS = 'bogus';
/**
 * @class Editor
 */
var Editor = /** @class */ (function () {
    function Editor(context) {
        var _this = this;
        this.context = context;
        this.$note = context.layoutInfo.note;
        this.$editor = context.layoutInfo.editor;
        this.$editable = context.layoutInfo.editable;
        this.options = context.options;
        this.lang = this.options.langInfo;
        this.editable = this.$editable[0];
        this.lastRange = null;
        this.style = new Style();
        this.table = new Table();
        this.typing = new Typing();
        this.bullet = new Bullet();
        this.history = new History(this.$editable);
        this.context.memo('help.undo', this.lang.help.undo);
        this.context.memo('help.redo', this.lang.help.redo);
        this.context.memo('help.tab', this.lang.help.tab);
        this.context.memo('help.untab', this.lang.help.untab);
        this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
        this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
        this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
        this.context.memo('help.indent', this.lang.help.indent);
        this.context.memo('help.outdent', this.lang.help.outdent);
        this.context.memo('help.formatPara', this.lang.help.formatPara);
        this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
        this.context.memo('help.fontName', this.lang.help.fontName);
        // native commands(with execCommand), generate function for execCommand
        var commands = [
            'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
            'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
            'formatBlock', 'removeFormat', 'backColor'
        ];
        for (var idx = 0, len = commands.length; idx < len; idx++) {
            this[commands[idx]] = (function (sCmd) {
                return function (value) {
                    _this.beforeCommand();
                    document.execCommand(sCmd, false, value);
                    _this.afterCommand(true);
                };
            })(commands[idx]);
            this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
        }
        this.fontName = this.wrapCommand(function (value) {
            return _this.fontStyling('font-family', "\'" + value + "\'");
        });
        this.fontSize = this.wrapCommand(function (value) {
            return _this.fontStyling('font-size', value + 'px');
        });
        for (var idx = 1; idx <= 6; idx++) {
            this['formatH' + idx] = (function (idx) {
                return function () {
                    _this.formatBlock('H' + idx);
                };
            })(idx);
            this.context.memo('help.formatH' + idx, this.lang.help['formatH' + idx]);
        }
        
        this.insertParagraph = this.wrapCommand(function () {
            _this.typing.insertParagraph(_this.editable);
        });
        this.insertOrderedList = this.wrapCommand(function () {
            _this.bullet.insertOrderedList(_this.editable);
        });
        this.insertUnorderedList = this.wrapCommand(function () {
            _this.bullet.insertUnorderedList(_this.editable);
        });
        this.indent = this.wrapCommand(function () {
            _this.bullet.indent(_this.editable);
        });
        this.outdent = this.wrapCommand(function () {
            _this.bullet.outdent(_this.editable);
        });
        /**
         * insertNode
         * insert node
         * @param {Node} node
         */
        this.insertNode = this.wrapCommand(function (node) {
            if (_this.isLimited($$1(node).text().length)) {
                return;
            }
            var rng = _this.createRange();
            rng.insertNode(node);
            range.createFromNodeAfter(node).select();
        });
        /**
         * insert text
         * @param {String} text
         */
        this.insertText = this.wrapCommand(function (text) {
            if (_this.isLimited(text.length)) {
                return;
            }
            var rng = _this.createRange();
            var textNode = rng.insertNode(dom.createText(text));
            range.create(textNode, dom.nodeLength(textNode)).select();
        });
        /**
         * paste HTML
         * @param {String} markup
         */
        this.pasteHTML = this.wrapCommand(function (markup) {
            if (_this.isLimited(markup.length)) {
                return;
            }
            var contents = _this.createRange().pasteHTML(markup);
            range.createFromNodeAfter(lists.last(contents)).select();
        });
        /**
         * formatBlock
         *
         * @param {String} tagName
         */
        this.formatBlock = this.wrapCommand(function (tagName, $target) {
            var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;
            if (onApplyCustomStyle) {
                onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
            }
            else {
                _this.onFormatBlock(tagName, $target);
            }
        });
        /**
         * insert horizontal rule
         */
        this.insertHorizontalRule = this.wrapCommand(function () {
            var hrNode = _this.createRange().insertNode(dom.create('HR'));
            if (hrNode.nextSibling) {
                range.create(hrNode.nextSibling, 0).normalize().select();
            }
        });
        /**
         * lineHeight
         * @param {String} value
         */
        this.lineHeight = this.wrapCommand(function (value) {
            _this.style.stylePara(_this.createRange(), {
                lineHeight: value
            });
        });
        /**
         * create link (command)
         *
         * @param {Object} linkInfo
         */
        this.createLink = this.wrapCommand(function (linkInfo) {
            var linkUrl = linkInfo.url;
            var linkText = linkInfo.text;
            var isNewWindow = linkInfo.isNewWindow;
            var rng = linkInfo.range || _this.createRange();
            var isTextChanged = rng.toString() !== linkText;
            // handle spaced urls from input
            if (typeof linkUrl === 'string') {
                linkUrl = linkUrl.trim();
            }
            if (_this.options.onCreateLink) {
                linkUrl = _this.options.onCreateLink(linkUrl);
            }
            else {
                // if url doesn't match an URL schema, set http:// as default
                linkUrl = /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(linkUrl)
                    ? linkUrl : 'http://' + linkUrl;
            }
            var anchors = [];
            if (isTextChanged) {
                rng = rng.deleteContents();
                var anchor = rng.insertNode($$1('<A>' + linkText + '</A>')[0]);
                anchors.push(anchor);
            }
            else {
                anchors = _this.style.styleNodes(rng, {
                    nodeName: 'A',
                    expandClosestSibling: true,
                    onlyPartialContains: true
                });
            }
            $$1.each(anchors, function (idx, anchor) {
                $$1(anchor).attr('href', linkUrl);
                if (isNewWindow) {
                    $$1(anchor).attr('target', '_blank');
                }
                else {
                    $$1(anchor).removeAttr('target');
                }
            });
            var startRange = range.createFromNodeBefore(lists.head(anchors));
            var startPoint = startRange.getStartPoint();
            var endRange = range.createFromNodeAfter(lists.last(anchors));
            var endPoint = endRange.getEndPoint();
            range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
        });
        /**
         * setting color
         *
         * @param {Object} sObjColor  color code
         * @param {String} sObjColor.foreColor foreground color
         * @param {String} sObjColor.backColor background color
         */
        this.color = this.wrapCommand(function (colorInfo) {
            var foreColor = colorInfo.foreColor;
            var backColor = colorInfo.backColor;
            if (foreColor) {
                document.execCommand('foreColor', false, foreColor);
            }
            if (backColor) {
                document.execCommand('backColor', false, backColor);
            }
        });
        /**
         * Set foreground color
         *
         * @param {String} colorCode foreground color code
         */
        this.foreColor = this.wrapCommand(function (colorInfo) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('foreColor', false, colorInfo);
        });
        /**
         * insert Table
         *
         * @param {String} dimension of table (ex : "5x5")
         */
        this.insertTable = this.wrapCommand(function (dim) {
            var dimension = dim.split('x');
            var rng = _this.createRange().deleteContents();
            rng.insertNode(_this.table.createTable(dimension[0], dimension[1], _this.options));
        });
        /**
         * remove media object and Figure Elements if media object is img with Figure.
         */
        this.removeMedia = this.wrapCommand(function () {
            var $target = $$1(_this.restoreTarget()).parent();
            if ($target.parent('figure').length) {
                $target.parent('figure').remove();
            }
            else {
                $target = $$1(_this.restoreTarget()).detach();
            }
            _this.context.triggerEvent('media.delete', $target, _this.$editable);
        });
        /**
         * float me
         *
         * @param {String} value
         */
        this.floatMe = this.wrapCommand(function (value) {
            var $target = $$1(_this.restoreTarget());
            $target.toggleClass('note-float-left', value === 'left');
            $target.toggleClass('note-float-right', value === 'right');
            $target.css('float', value);
        });
        /**
         * resize overlay element
         * @param {String} value
         */
        this.resize = this.wrapCommand(function (value) {
            var $target = $$1(_this.restoreTarget());
            $target.css({
                width: value * 100 + '%',
                height: ''
            });
        });
    }
    Editor.prototype.initialize = function () {
        var _this = this;
        // bind custom events
        this.$editable.on('keydown', function (event) {
            if (event.keyCode === key.code.ENTER) {
                _this.context.triggerEvent('enter', event);
            }
            _this.context.triggerEvent('keydown', event);
            if (!event.isDefaultPrevented()) {
                if (_this.options.shortcuts) {
                    _this.handleKeyMap(event);
                }
                else {
                    _this.preventDefaultEditableShortCuts(event);
                }
            }
            if (_this.isLimited(1, event)) {
                return false;
            }
        }).on('keyup', function (event) {
            _this.context.triggerEvent('keyup', event);
        }).on('focus', function (event) {
            _this.context.triggerEvent('focus', event);
        }).on('blur', function (event) {
            _this.context.triggerEvent('blur', event);
        }).on('mousedown', function (event) {
            _this.context.triggerEvent('mousedown', event);
        }).on('mouseup', function (event) {
            _this.context.triggerEvent('mouseup', event);
        }).on('scroll', function (event) {
            _this.context.triggerEvent('scroll', event);
        }).on('paste', function (event) {
            _this.context.triggerEvent('paste', event);
        });
        // init content before set event
        this.$editable.html(dom.html(this.$note) || dom.emptyPara);
        this.$editable.on(env.inputEventName, func.debounce(function () {
            _this.context.triggerEvent('change', _this.$editable.html());
        }, 100));
        this.$editor.on('focusin', function (event) {
            _this.context.triggerEvent('focusin', event);
        }).on('focusout', function (event) {
            _this.context.triggerEvent('focusout', event);
        });
        if (!this.options.airMode) {
            if (this.options.width) {
                this.$editor.outerWidth(this.options.width);
            }
            if (this.options.height) {
                this.$editable.outerHeight(this.options.height);
            }
            if (this.options.maxHeight) {
                this.$editable.css('max-height', this.options.maxHeight);
            }
            if (this.options.minHeight) {
                this.$editable.css('min-height', this.options.minHeight);
            }
        }
        this.history.recordUndo();
    };
    Editor.prototype.destroy = function () {
        this.$editable.off();
    };
    Editor.prototype.handleKeyMap = function (event) {
        var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
        var keys = [];
        if (event.metaKey) {
            keys.push('CMD');
        }
        if (event.ctrlKey && !event.altKey) {
            keys.push('CTRL');
        }
        if (event.shiftKey) {
            keys.push('SHIFT');
        }
        var keyName = key.nameFromCode[event.keyCode];
        if (keyName) {
            keys.push(keyName);
        }
        var eventName = keyMap[keys.join('+')];
        if (eventName) {
            if (this.context.invoke(eventName) !== false) {
                event.preventDefault();
            }
        }
        else if (key.isEdit(event.keyCode)) {
            this.afterCommand();
        }
    };
    Editor.prototype.preventDefaultEditableShortCuts = function (event) {
        // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
        if ((event.ctrlKey || event.metaKey) &&
            lists.contains([66, 73, 85], event.keyCode)) {
            event.preventDefault();
        }
    };
    Editor.prototype.isLimited = function (pad, event) {
        pad = pad || 0;
        if (typeof event !== 'undefined') {
            if (key.isMove(event.keyCode) ||
                (event.ctrlKey || event.metaKey) ||
                lists.contains([key.code.BACKSPACE, key.code.DELETE], event.keyCode)) {
                return false;
            }
        }
        if (this.options.maxTextLength > 0) {
            if ((this.$editable.text().length + pad) >= this.options.maxTextLength) {
                return true;
            }
        }
        return false;
    };
    /**
     * create range
     * @return {WrappedRange}
     */
    Editor.prototype.createRange = function () {
        this.focus();
        return range.create(this.editable);
    };
    /**
     * saveRange
     *
     * save current range
     *
     * @param {Boolean} [thenCollapse=false]
     */
    Editor.prototype.saveRange = function (thenCollapse) {
        this.lastRange = this.createRange();
        if (thenCollapse) {
            this.lastRange.collapse().select();
        }
    };
    /**
     * restoreRange
     *
     * restore lately range
     */
    Editor.prototype.restoreRange = function () {
        if (this.lastRange) {
            this.lastRange.select();
            this.focus();
        }
    };
    Editor.prototype.saveTarget = function (node) {
        this.$editable.data('target', node);
    };
    Editor.prototype.clearTarget = function () {
        this.$editable.removeData('target');
    };
    Editor.prototype.restoreTarget = function () {
        return this.$editable.data('target');
    };
    /**
     * currentStyle
     *
     * current style
     * @return {Object|Boolean} unfocus
     */
    Editor.prototype.currentStyle = function () {
        var rng = range.create();
        if (rng) {
            rng = rng.normalize();
        }
        return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
    };
    /**
     * style from node
     *
     * @param {jQuery} $node
     * @return {Object}
     */
    Editor.prototype.styleFromNode = function ($node) {
        return this.style.fromNode($node);
    };
    /**
     * undo
     */
    Editor.prototype.undo = function () {
        this.context.triggerEvent('before.command', this.$editable.html());
        this.history.undo();
        this.context.triggerEvent('change', this.$editable.html());
    };
    /**
     * redo
     */
    Editor.prototype.redo = function () {
        this.context.triggerEvent('before.command', this.$editable.html());
        this.history.redo();
        this.context.triggerEvent('change', this.$editable.html());
    };
    /**
     * before command
     */
    Editor.prototype.beforeCommand = function () {
        this.context.triggerEvent('before.command', this.$editable.html());
        // keep focus on editable before command execution
        this.focus();
    };
    /**
     * after command
     * @param {Boolean} isPreventTrigger
     */
    Editor.prototype.afterCommand = function (isPreventTrigger) {
        this.normalizeContent();
        this.history.recordUndo();
        if (!isPreventTrigger) {
            this.context.triggerEvent('change', this.$editable.html());
        }
    };
    /**
     * handle tab key
     */
    Editor.prototype.tab = function () {
        var rng = this.createRange();
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.table.tab(rng);
        }
        else {
            if (this.options.tabSize === 0) {
                return false;
            }
            if (!this.isLimited(this.options.tabSize)) {
                this.beforeCommand();
                this.typing.insertTab(rng, this.options.tabSize);
                this.afterCommand();
            }
        }
    };
    /**
     * handle shift+tab key
     */
    Editor.prototype.untab = function () {
        var rng = this.createRange();
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.table.tab(rng, true);
        }
        else {
            if (this.options.tabSize === 0) {
                return false;
            }
        }
    };
    /**
     * run given function between beforeCommand and afterCommand
     */
    Editor.prototype.wrapCommand = function (fn) {
        var _this = this;
        return function () {
            _this.beforeCommand();
            fn.apply(_this, arguments);
            _this.afterCommand();
        };
    };
    /**
     * insert image
     *
     * @param {String} src
     * @param {String|Function} param
     * @return {Promise}
     */
    Editor.prototype.insertImage = function (src, param) {
        var _this = this;
        return createImage(src, param).then(function ($image) {
            _this.beforeCommand();
            if (typeof param === 'function') {
                param($image);
            }
            else {
                if (typeof param === 'string') {
                    $image.attr('data-filename', param);
                }
                $image.css('width', Math.min(_this.$editable.width(), $image.width()));
            }
            $image.show();
            range.create(_this.editable).insertNode($image[0]);
            range.createFromNodeAfter($image[0]).select();
            _this.afterCommand();
        }).fail(function (e) {
            _this.context.triggerEvent('image.upload.error', e);
        });
    };
    /**
     * insertImages
     * @param {File[]} files
     */
    Editor.prototype.insertImages = function (files) {
        var _this = this;
        $$1.each(files, function (idx, file) {
            var filename = file.name;
            if (_this.options.maximumImageFileSize && _this.options.maximumImageFileSize < file.size) {
                _this.context.triggerEvent('image.upload.error', _this.lang.image.maximumFileSizeError);
            }
            else {
                readFileAsDataURL(file).then(function (dataURL) {
                    return _this.insertImage(dataURL, filename);
                }).fail(function () {
                    _this.context.triggerEvent('image.upload.error');
                });
            }
        });
    };
    /**
     * insertImagesOrCallback
     * @param {File[]} files
     */
    Editor.prototype.insertImagesOrCallback = function (files) {
        var callbacks = this.options.callbacks;
        // If onImageUpload this.options setted
        if (callbacks.onImageUpload) {
            this.context.triggerEvent('image.upload', files);
            // else insert Image as dataURL
        }
        else {
            this.insertImages(files);
        }
    };
    /**
     * return selected plain text
     * @return {String} text
     */
    Editor.prototype.getSelectedText = function () {
        var rng = this.createRange();
        // if range on anchor, expand range with anchor
        if (rng.isOnAnchor()) {
            rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
        }
        return rng.toString();
    };
    Editor.prototype.onFormatBlock = function (tagName, $target) {
        // [workaround] for MSIE, IE need `<`
        tagName = env.isMSIE ? '<' + tagName + '>' : tagName;
        document.execCommand('FormatBlock', false, tagName);
        // support custom class
        if ($target && $target.length) {
            var className = $target[0].className || '';
            if (className) {
                var currentRange = this.createRange();
                var $parent = $$1([currentRange.sc, currentRange.ec]).closest(tagName);
                $parent.addClass(className);
            }
        }
    };
    Editor.prototype.formatPara = function () {
        this.formatBlock('P');
    };
    Editor.prototype.fontStyling = function (target, value) {
        var rng = this.createRange();
        if (rng) {
            var spans = this.style.styleNodes(rng);
            $$1(spans).css(target, value);
            // [workaround] added styled bogus span for style
            //  - also bogus character needed for cursor position
            if (rng.isCollapsed()) {
                var firstSpan = lists.head(spans);
                if (firstSpan && !dom.nodeLength(firstSpan)) {
                    firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                    range.createFromNodeAfter(firstSpan.firstChild).select();
                    this.$editable.data(KEY_BOGUS, firstSpan);
                }
            }
        }
    };
    /**
     * unlink
     *
     * @type command
     */
    Editor.prototype.unlink = function () {
        var rng = this.createRange();
        if (rng.isOnAnchor()) {
            var anchor = dom.ancestor(rng.sc, dom.isAnchor);
            rng = range.createFromNode(anchor);
            rng.select();
            this.beforeCommand();
            document.execCommand('unlink');
            this.afterCommand();
        }
    };
    /**
     * returns link info
     *
     * @return {Object}
     * @return {WrappedRange} return.range
     * @return {String} return.text
     * @return {Boolean} [return.isNewWindow=true]
     * @return {String} [return.url=""]
     */
    Editor.prototype.getLinkInfo = function () {
        var rng = this.createRange().expand(dom.isAnchor);
        // Get the first anchor on range(for edit).
        var $anchor = $$1(lists.head(rng.nodes(dom.isAnchor)));
        var linkInfo = {
            range: rng,
            text: rng.toString(),
            url: $anchor.length ? $anchor.attr('href') : ''
        };
        // Define isNewWindow when anchor exists.
        if ($anchor.length) {
            linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
        }
        return linkInfo;
    };
    Editor.prototype.addRow = function (position) {
        var rng = this.createRange(this.$editable);
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.beforeCommand();
            this.table.addRow(rng, position);
            this.afterCommand();
        }
    };
    Editor.prototype.addCol = function (position) {
        var rng = this.createRange(this.$editable);
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.beforeCommand();
            this.table.addCol(rng, position);
            this.afterCommand();
        }
    };
    Editor.prototype.deleteRow = function () {
        var rng = this.createRange(this.$editable);
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.beforeCommand();
            this.table.deleteRow(rng);
            this.afterCommand();
        }
    };
    Editor.prototype.deleteCol = function () {
        var rng = this.createRange(this.$editable);
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.beforeCommand();
            this.table.deleteCol(rng);
            this.afterCommand();
        }
    };
    Editor.prototype.deleteTable = function () {
        var rng = this.createRange(this.$editable);
        if (rng.isCollapsed() && rng.isOnCell()) {
            this.beforeCommand();
            this.table.deleteTable(rng);
            this.afterCommand();
        }
    };
    /**
     * @param {Position} pos
     * @param {jQuery} $target - target element
     * @param {Boolean} [bKeepRatio] - keep ratio
     */
    Editor.prototype.resizeTo = function (pos, $target, bKeepRatio) {
        var imageSize;
        if (bKeepRatio) {
            var newRatio = pos.y / pos.x;
            var ratio = $target.data('ratio');
            imageSize = {
                width: ratio > newRatio ? pos.x : pos.y / ratio,
                height: ratio > newRatio ? pos.x * ratio : pos.y
            };
        }
        else {
            imageSize = {
                width: pos.x,
                height: pos.y
            };
        }
        $target.css(imageSize);
    };
    /**
     * returns whether editable area has focus or not.
     */
    Editor.prototype.hasFocus = function () {
        return this.$editable.is(':focus');
    };
    /**
     * set focus
     */
    Editor.prototype.focus = function () {
        // [workaround] Screen will move when page is scolled in IE.
        //  - do focus when not focused
        if (!this.hasFocus()) {
            this.$editable.focus();
        }
    };
    /**
     * returns whether contents is empty or not.
     * @return {Boolean}
     */
    Editor.prototype.isEmpty = function () {
        return dom.isEmpty(this.$editable[0]) || dom.emptyPara === this.$editable.html();
    };
    /**
     * Removes all contents and restores the editable instance to an _emptyPara_.
     */
    Editor.prototype.empty = function () {
        this.context.invoke('code', dom.emptyPara);
    };
    /**
     * normalize content
     */
    Editor.prototype.normalizeContent = function () {
        this.$editable[0].normalize();
    };
    return Editor;
}());

var Clipboard = /** @class */ (function () {
    function Clipboard(context) {
        this.context = context;
        this.$editable = context.layoutInfo.editable;
    }
    Clipboard.prototype.initialize = function () {
        this.$editable.on('paste', this.pasteByEvent.bind(this));
    };
    /**
     * paste by clipboard event
     *
     * @param {Event} event
     */
    Clipboard.prototype.pasteByEvent = function (event) {
        var clipboardData = event.originalEvent.clipboardData;
        if (clipboardData && clipboardData.items && clipboardData.items.length) {
            var item = lists.head(clipboardData.items);
            if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
            }
            this.context.invoke('editor.afterCommand');
        }
    };
    return Clipboard;
}());

var Dropzone = /** @class */ (function () {
    function Dropzone(context) {
        this.context = context;
        this.$eventListener = $$1(document);
        this.$editor = context.layoutInfo.editor;
        this.$editable = context.layoutInfo.editable;
        this.options = context.options;
        this.lang = this.options.langInfo;
        this.documentEventHandlers = {};
        this.$dropzone = $$1([
            '<div class="note-dropzone">',
            '  <div class="note-dropzone-message"/>',
            '</div>'
        ].join('')).prependTo(this.$editor);
    }
    /**
     * attach Drag and Drop Events
     */
    Dropzone.prototype.initialize = function () {
        if (this.options.disableDragAndDrop) {
            // prevent default drop event
            this.documentEventHandlers.onDrop = function (e) {
                e.preventDefault();
            };
            // do not consider outside of dropzone
            this.$eventListener = this.$dropzone;
            this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
        }
        else {
            this.attachDragAndDropEvent();
        }
    };
    /**
     * attach Drag and Drop Events
     */
    Dropzone.prototype.attachDragAndDropEvent = function () {
        var _this = this;
        var collection = $$1();
        var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');
        this.documentEventHandlers.onDragenter = function (e) {
            var isCodeview = _this.context.invoke('codeview.isActivated');
            var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;
            if (!isCodeview && !collection.length && hasEditorSize) {
                _this.$editor.addClass('dragover');
                _this.$dropzone.width(_this.$editor.width());
                _this.$dropzone.height(_this.$editor.height());
                $dropzoneMessage.text(_this.lang.image.dragImageHere);
            }
            collection = collection.add(e.target);
        };
        this.documentEventHandlers.onDragleave = function (e) {
            collection = collection.not(e.target);
            if (!collection.length) {
                _this.$editor.removeClass('dragover');
            }
        };
        this.documentEventHandlers.onDrop = function () {
            collection = $$1();
            _this.$editor.removeClass('dragover');
        };
        // show dropzone on dragenter when dragging a object to document
        // -but only if the editor is visible, i.e. has a positive width and height
        this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter)
            .on('dragleave', this.documentEventHandlers.onDragleave)
            .on('drop', this.documentEventHandlers.onDrop);
        // change dropzone's message on hover.
        this.$dropzone.on('dragenter', function () {
            _this.$dropzone.addClass('hover');
            $dropzoneMessage.text(_this.lang.image.dropImage);
        }).on('dragleave', function () {
            _this.$dropzone.removeClass('hover');
            $dropzoneMessage.text(_this.lang.image.dragImageHere);
        });
        // attach dropImage
        this.$dropzone.on('drop', function (event) {
            var dataTransfer = event.originalEvent.dataTransfer;
            // stop the browser from opening the dropped content
            event.preventDefault();
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                _this.$editable.focus();
                _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
            }
            else {
                $$1.each(dataTransfer.types, function (idx, type) {
                    var content = dataTransfer.getData(type);
                    if (type.toLowerCase().indexOf('text') > -1) {
                        _this.context.invoke('editor.pasteHTML', content);
                    }
                    else {
                        $$1(content).each(function (idx, item) {
                            _this.context.invoke('editor.insertNode', item);
                        });
                    }
                });
            }
        }).on('dragover', false); // prevent default dragover event
    };
    Dropzone.prototype.destroy = function () {
        var _this = this;
        Object.keys(this.documentEventHandlers).forEach(function (key) {
            _this.$eventListener.off(key.substr(2).toLowerCase(), _this.documentEventHandlers[key]);
        });
        this.documentEventHandlers = {};
    };
    return Dropzone;
}());

var CodeMirror;
if (env.hasCodeMirror) {
    if (env.isSupportAmd) {
        require(['codemirror'], function (cm) {
            CodeMirror = cm;
        });
    }
    else {
        CodeMirror = window.CodeMirror;
    }
}
/**
 * @class Codeview
 */
var CodeView = /** @class */ (function () {
    function CodeView(context) {
        this.context = context;
        this.$editor = context.layoutInfo.editor;
        this.$editable = context.layoutInfo.editable;
        this.$codable = context.layoutInfo.codable;
        this.options = context.options;
    }
    CodeView.prototype.sync = function () {
        var isCodeview = this.isActivated();
        if (isCodeview && env.hasCodeMirror) {
            this.$codable.data('cmEditor').save();
        }
    };
    /**
     * @return {Boolean}
     */
    CodeView.prototype.isActivated = function () {
        return this.$editor.hasClass('codeview');
    };
    /**
     * toggle codeview
     */
    CodeView.prototype.toggle = function () {
        if (this.isActivated()) {
            this.deactivate();
        }
        else {
            this.activate();
        }
        this.context.triggerEvent('codeview.toggled');
    };
    /**
     * activate code view
     */
    CodeView.prototype.activate = function () {
        var _this = this;
        this.$codable.val(dom.html(this.$editable, this.options.prettifyHtml));
        this.$codable.height(this.$editable.height());
        this.context.invoke('toolbar.updateCodeview', true);
        this.$editor.addClass('codeview');
        this.$codable.focus();
        // activate CodeMirror as codable
        if (env.hasCodeMirror) {
            var cmEditor_1 = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror);
            // CodeMirror TernServer
            if (this.options.codemirror.tern) {
                var server_1 = new CodeMirror.TernServer(this.options.codemirror.tern);
                cmEditor_1.ternServer = server_1;
                cmEditor_1.on('cursorActivity', function (cm) {
                    server_1.updateArgHints(cm);
                });
            }
            cmEditor_1.on('blur', function (event) {
                _this.context.triggerEvent('blur.codeview', cmEditor_1.getValue(), event);
            });
            // CodeMirror hasn't Padding.
            cmEditor_1.setSize(null, this.$editable.outerHeight());
            this.$codable.data('cmEditor', cmEditor_1);
        }
        else {
            this.$codable.on('blur', function (event) {
                _this.context.triggerEvent('blur.codeview', _this.$codable.val(), event);
            });
        }
    };
    /**
     * deactivate code view
     */
    CodeView.prototype.deactivate = function () {
        // deactivate CodeMirror as codable
        if (env.hasCodeMirror) {
            var cmEditor = this.$codable.data('cmEditor');
            this.$codable.val(cmEditor.getValue());
            cmEditor.toTextArea();
        }
        var value = dom.value(this.$codable, this.options.prettifyHtml) || dom.emptyPara;
        var isChange = this.$editable.html() !== value;
        this.$editable.html(value);
        this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
        this.$editor.removeClass('codeview');
        if (isChange) {
            this.context.triggerEvent('change', this.$editable.html(), this.$editable);
        }
        this.$editable.focus();
        this.context.invoke('toolbar.updateCodeview', false);
    };
    CodeView.prototype.destroy = function () {
        if (this.isActivated()) {
            this.deactivate();
        }
    };
    return CodeView;
}());

var EDITABLE_PADDING = 24;
var Statusbar = /** @class */ (function () {
    function Statusbar(context) {
        this.$document = $$1(document);
        this.$statusbar = context.layoutInfo.statusbar;
        this.$editable = context.layoutInfo.editable;
        this.options = context.options;
    }
    Statusbar.prototype.initialize = function () {
        var _this = this;
        if (this.options.airMode || this.options.disableResizeEditor) {
            this.destroy();
            return;
        }
        this.$statusbar.on('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();
            var onMouseMove = function (event) {
                var height = event.clientY - (editableTop + EDITABLE_PADDING);
                height = (_this.options.minheight > 0) ? Math.max(height, _this.options.minheight) : height;
                height = (_this.options.maxHeight > 0) ? Math.min(height, _this.options.maxHeight) : height;
                _this.$editable.height(height);
            };
            _this.$document.on('mousemove', onMouseMove).one('mouseup', function () {
                _this.$document.off('mousemove', onMouseMove);
            });
        });
    };
    Statusbar.prototype.destroy = function () {
        this.$statusbar.off();
        this.$statusbar.addClass('locked');
    };
    return Statusbar;
}());

var Fullscreen = /** @class */ (function () {
    function Fullscreen(context) {
        var _this = this;
        this.context = context;
        this.$editor = context.layoutInfo.editor;
        this.$toolbar = context.layoutInfo.toolbar;
        this.$editable = context.layoutInfo.editable;
        this.$codable = context.layoutInfo.codable;
        this.$window = $$1(window);
        this.$scrollbar = $$1('html, body');
        this.onResize = function () {
            _this.resizeTo({
                h: _this.$window.height() - _this.$toolbar.outerHeight()
            });
        };
    }
    Fullscreen.prototype.resizeTo = function (size) {
        this.$editable.css('height', size.h);
        this.$codable.css('height', size.h);
        if (this.$codable.data('cmeditor')) {
            this.$codable.data('cmeditor').setsize(null, size.h);
        }
    };
    /**
     * toggle fullscreen
     */
    Fullscreen.prototype.toggle = function () {
        this.$editor.toggleClass('fullscreen');
        if (this.isFullscreen()) {
            this.$editable.data('orgHeight', this.$editable.css('height'));
            this.$window.on('resize', this.onResize).trigger('resize');
            this.$scrollbar.css('overflow', 'hidden');
        }
        else {
            this.$window.off('resize', this.onResize);
            this.resizeTo({ h: this.$editable.data('orgHeight') });
            this.$scrollbar.css('overflow', 'visible');
        }
        this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
    };
    Fullscreen.prototype.isFullscreen = function () {
        return this.$editor.hasClass('fullscreen');
    };
    return Fullscreen;
}());

var Handle = /** @class */ (function () {
    function Handle(context) {
        var _this = this;
        this.context = context;
        this.$document = $$1(document);
        this.$editingArea = context.layoutInfo.editingArea;
        this.options = context.options;
        this.lang = this.options.langInfo;
        this.events = {
            'summernote.mousedown': function (we, e) {
                if (_this.update(e.target)) {
                    e.preventDefault();
                }
            },
            'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {
                _this.update();
            },
            'summernote.disable': function () {
                _this.hide();
            },
            'summernote.codeview.toggled': function () {
                _this.update();
            }
        };
    }
    Handle.prototype.initialize = function () {
        var _this = this;
        this.$handle = $$1([
            '<div class="note-handle">',
            '<div class="note-control-selection">',
            '<div class="note-control-selection-bg"></div>',
            '<div class="note-control-holder note-control-nw"></div>',
            '<div class="note-control-holder note-control-ne"></div>',
            '<div class="note-control-holder note-control-sw"></div>',
            '<div class="',
            (this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing'),
            ' note-control-se"></div>',
            (this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>'),
            '</div>',
            '</div>'
        ].join('')).prependTo(this.$editingArea);
        this.$handle.on('mousedown', function (event) {
            if (dom.isControlSizing(event.target)) {
                event.preventDefault();
                event.stopPropagation();
                var $target_1 = _this.$handle.find('.note-control-selection').data('target');
                var posStart_1 = $target_1.offset();
                var scrollTop_1 = _this.$document.scrollTop();
                var onMouseMove_1 = function (event) {
                    _this.context.invoke('editor.resizeTo', {
                        x: event.clientX - posStart_1.left,
                        y: event.clientY - (posStart_1.top - scrollTop_1)
                    }, $target_1, !event.shiftKey);
                    _this.update($target_1[0]);
                };
                _this.$document
                    .on('mousemove', onMouseMove_1)
                    .one('mouseup', function (e) {
                    e.preventDefault();
                    _this.$document.off('mousemove', onMouseMove_1);
                    _this.context.invoke('editor.afterCommand');
                });
                if (!$target_1.data('ratio')) {
                    $target_1.data('ratio', $target_1.height() / $target_1.width());
                }
            }
        });
        // Listen for scrolling on the handle overlay.
        this.$handle.on('wheel', function (e) {
            e.preventDefault();
            _this.update();
        });
    };
    Handle.prototype.destroy = function () {
        this.$handle.remove();
    };
    Handle.prototype.update = function (target) {
        if (this.context.isDisabled()) {
            return false;
        }
        var isImage = dom.isImg(target);
        var $selection = this.$handle.find('.note-control-selection');
        this.context.invoke('imagePopover.update', target);
        if (isImage) {
            var $image = $$1(target);
            var position = $image.position();
            var pos = {
                left: position.left + parseInt($image.css('marginLeft'), 10),
                top: position.top + parseInt($image.css('marginTop'), 10)
            };
            // exclude margin
            var imageSize = {
                w: $image.outerWidth(false),
                h: $image.outerHeight(false)
            };
            $selection.css({
                display: 'block',
                left: pos.left,
                top: pos.top,
                width: imageSize.w,
                height: imageSize.h
            }).data('target', $image); // save current image element.
            var origImageObj = new Image();
            origImageObj.src = $image.attr('src');
            var sizingText = imageSize.w + 'x' + imageSize.h + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
            $selection.find('.note-control-selection-info').text(sizingText);
            this.context.invoke('editor.saveTarget', target);
        }
        else {
            this.hide();
        }
        return isImage;
    };
    /**
     * hide
     *
     * @param {jQuery} $handle
     */
    Handle.prototype.hide = function () {
        this.context.invoke('editor.clearTarget');
        this.$handle.children().hide();
    };
    return Handle;
}());

var defaultScheme = 'http://';
var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
var AutoLink = /** @class */ (function () {
    function AutoLink(context) {
        var _this = this;
        this.context = context;
        this.events = {
            'summernote.keyup': function (we, e) {
                if (!e.isDefaultPrevented()) {
                    _this.handleKeyup(e);
                }
            },
            'summernote.keydown': function (we, e) {
                _this.handleKeydown(e);
            }
        };
    }
    AutoLink.prototype.initialize = function () {
        this.lastWordRange = null;
    };
    AutoLink.prototype.destroy = function () {
        this.lastWordRange = null;
    };
    AutoLink.prototype.replace = function () {
        if (!this.lastWordRange) {
            return;
        }
        var keyword = this.lastWordRange.toString();
        var match = keyword.match(linkPattern);
        if (match && (match[1] || match[2])) {
            var link = match[1] ? keyword : defaultScheme + keyword;
            var node = $$1('<a />').html(keyword).attr('href', link)[0];
            this.lastWordRange.insertNode(node);
            this.lastWordRange = null;
            this.context.invoke('editor.focus');
        }
    };
    AutoLink.prototype.handleKeydown = function (e) {
        if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
            var wordRange = this.context.invoke('editor.createRange').getWordRange();
            this.lastWordRange = wordRange;
        }
    };
    AutoLink.prototype.handleKeyup = function (e) {
        if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
            this.replace();
        }
    };
    return AutoLink;
}());

/**
 * textarea auto sync.
 */
var AutoSync = /** @class */ (function () {
    function AutoSync(context) {
        var _this = this;
        this.$note = context.layoutInfo.note;
        this.events = {
            'summernote.change': function () {
                _this.$note.val(context.invoke('code'));
            }
        };
    }
    AutoSync.prototype.shouldInitialize = function () {
        return dom.isTextarea(this.$note[0]);
    };
    return AutoSync;
}());

var Placeholder = /** @class */ (function () {
    function Placeholder(context) {
        var _this = this;
        this.context = context;
        this.$editingArea = context.layoutInfo.editingArea;
        this.options = context.options;
        this.events = {
            'summernote.init summernote.change': function () {
                _this.update();
            },
            'summernote.codeview.toggled': function () {
                _this.update();
            }
        };
    }
    Placeholder.prototype.shouldInitialize = function () {
        return !!this.options.placeholder;
    };
    Placeholder.prototype.initialize = function () {
        var _this = this;
        this.$placeholder = $$1('<div class="note-placeholder">');
        this.$placeholder.on('click', function () {
            _this.context.invoke('focus');
        }).text(this.options.placeholder).prependTo(this.$editingArea);
        this.update();
    };
    Placeholder.prototype.destroy = function () {
        this.$placeholder.remove();
    };
    Placeholder.prototype.update = function () {
        var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
        this.$placeholder.toggle(isShow);
    };
    return Placeholder;
}());

var Buttons = /** @class */ (function () {
    function Buttons(context) {
        this.ui = $$1.summernote.ui;
        this.context = context;
        this.$toolbar = context.layoutInfo.toolbar;
        this.options = context.options;
        this.lang = this.options.langInfo;
        this.invertedKeyMap = func.invertObject(this.options.keyMap[env.isMac ? 'mac' : 'pc']);
    }
    Buttons.prototype.representShortcut = function (editorMethod) {
        var shortcut = this.invertedKeyMap[editorMethod];
        if (!this.options.shortcuts || !shortcut) {
            return '';
        }
        if (env.isMac) {
            shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
        }
        shortcut = shortcut.replace('BACKSLASH', '\\')
            .replace('SLASH', '/')
            .replace('LEFTBRACKET', '[')
            .replace('RIGHTBRACKET', ']');
        return ' (' + shortcut + ')';
    };
    Buttons.prototype.button = function (o) {
        if (!this.options.tooltip && o.tooltip) {
            delete o.tooltip;
        }
        o.container = this.options.container;
        return this.ui.button(o);
    };
    Buttons.prototype.initialize = function () {
        this.addToolbarButtons();
        this.addImagePopoverButtons();
        this.addLinkPopoverButtons();
        this.addTablePopoverButtons();
        this.fontInstalledMap = {};
    };
    Buttons.prototype.destroy = function () {
        delete this.fontInstalledMap;
    };
    Buttons.prototype.isFontInstalled = function (name) {
        if (!this.fontInstalledMap.hasOwnProperty(name)) {
            this.fontInstalledMap[name] = env.isFontInstalled(name) ||
                lists.contains(this.options.fontNamesIgnoreCheck, name);
        }
        return this.fontInstalledMap[name];
    };
    Buttons.prototype.isFontDeservedToAdd = function (name) {
        var genericFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
        name = name.toLowerCase();
        return ((name !== '') && this.isFontInstalled(name) && ($$1.inArray(name, genericFamilies) === -1));
    };
    Buttons.prototype.addToolbarButtons = function () {
        var _this = this;
        this.context.memo('button.style', function () {
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.magic), _this.options),
                    tooltip: _this.lang.style.style,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdown({
                    className: 'dropdown-style',
                    items: _this.options.styleTags,
                    title: _this.lang.style.style,
                    template: function (item) {
                        if (typeof item === 'string') {
                            item = { tag: item, title: (_this.lang.style.hasOwnProperty(item) ? _this.lang.style[item] : item) };
                        }
                        var tag = item.tag;
                        var title = item.title;
                        var style = item.style ? ' style="' + item.style + '" ' : '';
                        var className = item.className ? ' class="' + item.className + '"' : '';
                        return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                    },
                    click: _this.context.createInvokeHandler('editor.formatBlock')
                })
            ]).render();
        });
        var _loop_1 = function (styleIdx, styleLen) {
            var item = this_1.options.styleTags[styleIdx];
            this_1.context.memo('button.style.' + item, function () {
                return _this.button({
                    className: 'note-btn-style-' + item,
                    contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
                    tooltip: _this.lang.style[item],
                    click: _this.context.createInvokeHandler('editor.formatBlock')
                }).render();
            });
        };
        var this_1 = this;
        for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
            _loop_1(styleIdx, styleLen);
        }
        this.context.memo('button.bold', function () {
            return _this.button({
                className: 'note-btn-bold',
                contents: _this.ui.icon(_this.options.icons.bold),
                tooltip: _this.lang.font.bold + _this.representShortcut('bold'),
                click: _this.context.createInvokeHandlerAndUpdateState('editor.bold')
            }).render();
        });
        this.context.memo('button.italic', function () {
            return _this.button({
                className: 'note-btn-italic',
                contents: _this.ui.icon(_this.options.icons.italic),
                tooltip: _this.lang.font.italic + _this.representShortcut('italic'),
                click: _this.context.createInvokeHandlerAndUpdateState('editor.italic')
            }).render();
        });
        this.context.memo('button.underline', function () {
            return _this.button({
                className: 'note-btn-underline',
                contents: _this.ui.icon(_this.options.icons.underline),
                tooltip: _this.lang.font.underline + _this.representShortcut('underline'),
                click: _this.context.createInvokeHandlerAndUpdateState('editor.underline')
            }).render();
        });
        this.context.memo('button.clear', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.eraser),
                tooltip: _this.lang.font.clear + _this.representShortcut('removeFormat'),
                click: _this.context.createInvokeHandler('editor.removeFormat')
            }).render();
        });
        this.context.memo('button.strikethrough', function () {
            return _this.button({
                className: 'note-btn-strikethrough',
                contents: _this.ui.icon(_this.options.icons.strikethrough),
                tooltip: _this.lang.font.strikethrough + _this.representShortcut('strikethrough'),
                click: _this.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
            }).render();
        });
        this.context.memo('button.superscript', function () {
            return _this.button({
                className: 'note-btn-superscript',
                contents: _this.ui.icon(_this.options.icons.superscript),
                tooltip: _this.lang.font.superscript,
                click: _this.context.createInvokeHandlerAndUpdateState('editor.superscript')
            }).render();
        });
        this.context.memo('button.subscript', function () {
            return _this.button({
                className: 'note-btn-subscript',
                contents: _this.ui.icon(_this.options.icons.subscript),
                tooltip: _this.lang.font.subscript,
                click: _this.context.createInvokeHandlerAndUpdateState('editor.subscript')
            }).render();
        });
        this.context.memo('button.fontname', function () {
            var styleInfo = _this.context.invoke('editor.currentStyle');
            // Add 'default' fonts into the fontnames array if not exist
            $$1.each(styleInfo['font-family'].split(','), function (idx, fontname) {
                fontname = fontname.trim().replace(/['"]+/g, '');
                if (_this.isFontDeservedToAdd(fontname)) {
                    if ($$1.inArray(fontname, _this.options.fontNames) === -1) {
                        _this.options.fontNames.push(fontname);
                    }
                }
            });
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents('<span class="note-current-fontname"/>', _this.options),
                    tooltip: _this.lang.font.name,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdownCheck({
                    className: 'dropdown-fontname',
                    checkClassName: _this.options.icons.menuCheck,
                    items: _this.options.fontNames.filter(_this.isFontInstalled.bind(_this)),
                    title: _this.lang.font.name,
                    template: function (item) {
                        return '<span style="font-family: \'' + item + '\'">' + item + '</span>';
                    },
                    click: _this.context.createInvokeHandlerAndUpdateState('editor.fontName')
                })
            ]).render();
        });
        this.context.memo('button.fontsize', function () {
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', _this.options),
                    tooltip: _this.lang.font.size,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdownCheck({
                    className: 'dropdown-fontsize',
                    checkClassName: _this.options.icons.menuCheck,
                    items: _this.options.fontSizes,
                    title: _this.lang.font.size,
                    click: _this.context.createInvokeHandlerAndUpdateState('editor.fontSize')
                })
            ]).render();
        });
        this.context.memo('button.color', function () {
            return _this.ui.buttonGroup({
                className: 'note-color',
                children: [
                    _this.button({
                        className: 'note-current-color-button',
                        contents: _this.ui.icon(_this.options.icons.font + ' note-recent-color'),
                        tooltip: _this.lang.color.recent,
                        click: function (e) {
                            var $button = $$1(e.currentTarget);
                            _this.context.invoke('editor.color', {
                                backColor: $button.attr('data-backColor'),
                                foreColor: $button.attr('data-foreColor')
                            });
                        },
                        callback: function ($button) {
                            var $recentColor = $button.find('.note-recent-color');
                            $recentColor.css('background-color', '#FFFF00');
                            $button.attr('data-backColor', '#FFFF00');
                        }
                    }),
                    _this.button({
                        className: 'dropdown-toggle',
                        contents: _this.ui.dropdownButtonContents('', _this.options),
                        tooltip: _this.lang.color.more,
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    _this.ui.dropdown({
                        items: [
                            '<div class="note-palette">',
                            '  <div class="note-palette-title">' + _this.lang.color.background + '</div>',
                            '  <div>',
                            '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">',
                            _this.lang.color.transparent,
                            '    </button>',
                            '  </div>',
                            '  <div class="note-holder" data-event="backColor"/>',
                            '</div>',
                            '<div class="note-palette">',
                            '  <div class="note-palette-title">' + _this.lang.color.foreground + '</div>',
                            '  <div>',
                            '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">',
                            _this.lang.color.resetToDefault,
                            '    </button>',
                            '  </div>',
                            '  <div class="note-holder" data-event="foreColor"/>',
                            '</div>'
                        ].join(''),
                        callback: function ($dropdown) {
                            $dropdown.find('.note-holder').each(function (idx, item) {
                                var $holder = $$1(item);
                                $holder.append(_this.ui.palette({
                                    colors: _this.options.colors,
                                    colorsName: _this.options.colorsName,
                                    eventName: $holder.data('event'),
                                    container: _this.options.container,
                                    tooltip: _this.options.tooltip
                                }).render());
                            });
                        },
                        click: function (event) {
                            var $button = $$1(event.target);
                            var eventName = $button.data('event');
                            var value = $button.data('value');
                            if (eventName && value) {
                                var key = eventName === 'backColor' ? 'background-color' : 'color';
                                var $color = $button.closest('.note-color').find('.note-recent-color');
                                var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                                $color.css(key, value);
                                $currentButton.attr('data-' + eventName, value);
                                _this.context.invoke('editor.' + eventName, value);
                            }
                        }
                    })
                ]
            }).render();
        });
        this.context.memo('button.ul', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.unorderedlist),
                tooltip: _this.lang.lists.unordered + _this.representShortcut('insertUnorderedList'),
                click: _this.context.createInvokeHandler('editor.insertUnorderedList')
            }).render();
        });
        this.context.memo('button.ol', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.orderedlist),
                tooltip: _this.lang.lists.ordered + _this.representShortcut('insertOrderedList'),
                click: _this.context.createInvokeHandler('editor.insertOrderedList')
            }).render();
        });
        var justifyLeft = this.button({
            contents: this.ui.icon(this.options.icons.alignLeft),
            tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
            click: this.context.createInvokeHandler('editor.justifyLeft')
        });
        var justifyCenter = this.button({
            contents: this.ui.icon(this.options.icons.alignCenter),
            tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
            click: this.context.createInvokeHandler('editor.justifyCenter')
        });
        var justifyRight = this.button({
            contents: this.ui.icon(this.options.icons.alignRight),
            tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
            click: this.context.createInvokeHandler('editor.justifyRight')
        });
        var justifyFull = this.button({
            contents: this.ui.icon(this.options.icons.alignJustify),
            tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
            click: this.context.createInvokeHandler('editor.justifyFull')
        });
        var outdent = this.button({
            contents: this.ui.icon(this.options.icons.outdent),
            tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
            click: this.context.createInvokeHandler('editor.outdent')
        });
        var indent = this.button({
            contents: this.ui.icon(this.options.icons.indent),
            tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
            click: this.context.createInvokeHandler('editor.indent')
        });
        this.context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));
        this.context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));
        this.context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));
        this.context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));
        this.context.memo('button.outdent', func.invoke(outdent, 'render'));
        this.context.memo('button.indent', func.invoke(indent, 'render'));
        this.context.memo('button.paragraph', function () {
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.alignLeft), _this.options),
                    tooltip: _this.lang.paragraph.paragraph,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdown([
                    _this.ui.buttonGroup({
                        className: 'note-align',
                        children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                    }),
                    _this.ui.buttonGroup({
                        className: 'note-list',
                        children: [outdent, indent]
                    })
                ])
            ]).render();
        });
        this.context.memo('button.height', function () {
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.textHeight), _this.options),
                    tooltip: _this.lang.font.height,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdownCheck({
                    items: _this.options.lineHeights,
                    checkClassName: _this.options.icons.menuCheck,
                    className: 'dropdown-line-height',
                    title: _this.lang.font.height,
                    click: _this.context.createInvokeHandler('editor.lineHeight')
                })
            ]).render();
        });
        this.context.memo('button.table', function () {
            return _this.ui.buttonGroup([
                _this.button({
                    className: 'dropdown-toggle',
                    contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.table), _this.options),
                    tooltip: _this.lang.table.table,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                _this.ui.dropdown({
                    title: _this.lang.table.table,
                    className: 'note-table',
                    items: [
                        '<div class="note-dimension-picker">',
                        '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                        '  <div class="note-dimension-picker-highlighted"/>',
                        '  <div class="note-dimension-picker-unhighlighted"/>',
                        '</div>',
                        '<div class="note-dimension-display">1 x 1</div>'
                    ].join('')
                })
            ], {
                callback: function ($node) {
                    var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                    $catcher.css({
                        width: _this.options.insertTableMaxSize.col + 'em',
                        height: _this.options.insertTableMaxSize.row + 'em'
                    }).mousedown(_this.context.createInvokeHandler('editor.insertTable'))
                        .on('mousemove', _this.tableMoveHandler.bind(_this));
                }
            }).render();
        });
        this.context.memo('button.link', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.link),
                tooltip: _this.lang.link.link + _this.representShortcut('linkDialog.show'),
                click: _this.context.createInvokeHandler('linkDialog.show')
            }).render();
        });
        this.context.memo('button.picture', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.picture),
                tooltip: _this.lang.image.image,
                click: _this.context.createInvokeHandler('imageDialog.show')
            }).render();
        });
        this.context.memo('button.video', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.video),
                tooltip: _this.lang.video.video,
                click: _this.context.createInvokeHandler('videoDialog.show')
            }).render();
        });
        this.context.memo('button.hr', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.minus),
                tooltip: _this.lang.hr.insert + _this.representShortcut('insertHorizontalRule'),
                click: _this.context.createInvokeHandler('editor.insertHorizontalRule')
            }).render();
        });
        this.context.memo('button.fullscreen', function () {
            return _this.button({
                className: 'btn-fullscreen',
                contents: _this.ui.icon(_this.options.icons.arrowsAlt),
                tooltip: _this.lang.options.fullscreen,
                click: _this.context.createInvokeHandler('fullscreen.toggle')
            }).render();
        });
        this.context.memo('button.codeview', function () {
            return _this.button({
                className: 'btn-codeview',
                contents: _this.ui.icon(_this.options.icons.code),
                tooltip: _this.lang.options.codeview,
                click: _this.context.createInvokeHandler('codeview.toggle')
            }).render();
        });
        this.context.memo('button.redo', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.redo),
                tooltip: _this.lang.history.redo + _this.representShortcut('redo'),
                click: _this.context.createInvokeHandler('editor.redo')
            }).render();
        });
        this.context.memo('button.undo', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.undo),
                tooltip: _this.lang.history.undo + _this.representShortcut('undo'),
                click: _this.context.createInvokeHandler('editor.undo')
            }).render();
        });
        this.context.memo('button.help', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.question),
                tooltip: _this.lang.options.help,
                click: _this.context.createInvokeHandler('helpDialog.show')
            }).render();
        });
    };
    /**
     * image : [
     *   ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
     *   ['float', ['floatLeft', 'floatRight', 'floatNone' ]],
     *   ['remove', ['removeMedia']]
     * ],
     */
    Buttons.prototype.addImagePopoverButtons = function () {
        var _this = this;
        // Image Size Buttons
        this.context.memo('button.imageSize100', function () {
            return _this.button({
                contents: '<span class="note-fontsize-10">100%</span>',
                tooltip: _this.lang.image.resizeFull,
                click: _this.context.createInvokeHandler('editor.resize', '1')
            }).render();
        });
        this.context.memo('button.imageSize50', function () {
            return _this.button({
                contents: '<span class="note-fontsize-10">50%</span>',
                tooltip: _this.lang.image.resizeHalf,
                click: _this.context.createInvokeHandler('editor.resize', '0.5')
            }).render();
        });
        this.context.memo('button.imageSize25', function () {
            return _this.button({
                contents: '<span class="note-fontsize-10">25%</span>',
                tooltip: _this.lang.image.resizeQuarter,
                click: _this.context.createInvokeHandler('editor.resize', '0.25')
            }).render();
        });
        // Float Buttons
        this.context.memo('button.floatLeft', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.alignLeft),
                tooltip: _this.lang.image.floatLeft,
                click: _this.context.createInvokeHandler('editor.floatMe', 'left')
            }).render();
        });
        this.context.memo('button.floatRight', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.alignRight),
                tooltip: _this.lang.image.floatRight,
                click: _this.context.createInvokeHandler('editor.floatMe', 'right')
            }).render();
        });
        this.context.memo('button.floatNone', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.alignJustify),
                tooltip: _this.lang.image.floatNone,
                click: _this.context.createInvokeHandler('editor.floatMe', 'none')
            }).render();
        });
        // Remove Buttons
        this.context.memo('button.removeMedia', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.trash),
                tooltip: _this.lang.image.remove,
                click: _this.context.createInvokeHandler('editor.removeMedia')
            }).render();
        });
    };
    Buttons.prototype.addLinkPopoverButtons = function () {
        var _this = this;
        this.context.memo('button.linkDialogShow', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.link),
                tooltip: _this.lang.link.edit,
                click: _this.context.createInvokeHandler('linkDialog.show')
            }).render();
        });
        this.context.memo('button.unlink', function () {
            return _this.button({
                contents: _this.ui.icon(_this.options.icons.unlink),
                tooltip: _this.lang.link.unlink,
                click: _this.context.createInvokeHandler('editor.unlink')
            }).render();
        });
    };
    /**
     * table : [
     *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
     *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
     * ],
     */
    Buttons.prototype.addTablePopoverButtons = function () {
        var _this = this;
        this.context.memo('button.addRowUp', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.rowAbove),
                tooltip: _this.lang.table.addRowAbove,
                click: _this.context.createInvokeHandler('editor.addRow', 'top')
            }).render();
        });
        this.context.memo('button.addRowDown', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.rowBelow),
                tooltip: _this.lang.table.addRowBelow,
                click: _this.context.createInvokeHandler('editor.addRow', 'bottom')
            }).render();
        });
        this.context.memo('button.addColLeft', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.colBefore),
                tooltip: _this.lang.table.addColLeft,
                click: _this.context.createInvokeHandler('editor.addCol', 'left')
            }).render();
        });
        this.context.memo('button.addColRight', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.colAfter),
                tooltip: _this.lang.table.addColRight,
                click: _this.context.createInvokeHandler('editor.addCol', 'right')
            }).render();
        });
        this.context.memo('button.deleteRow', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.rowRemove),
                tooltip: _this.lang.table.delRow,
                click: _this.context.createInvokeHandler('editor.deleteRow')
            }).render();
        });
        this.context.memo('button.deleteCol', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.colRemove),
                tooltip: _this.lang.table.delCol,
                click: _this.context.createInvokeHandler('editor.deleteCol')
            }).render();
        });
        this.context.memo('button.deleteTable', function () {
            return _this.button({
                className: 'btn-md',
                contents: _this.ui.icon(_this.options.icons.trash),
                tooltip: _this.lang.table.delTable,
                click: _this.context.createInvokeHandler('editor.deleteTable')
            }).render();
        });
    };
    Buttons.prototype.build = function ($container, groups) {
        for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
            var group = groups[groupIdx];
            var groupName = $$1.isArray(group) ? group[0] : group;
            var buttons = $$1.isArray(group) ? ((group.length === 1) ? [group[0]] : group[1]) : [group];
            var $group = this.ui.buttonGroup({
                className: 'note-' + groupName
            }).render();
            for (var idx = 0, len = buttons.length; idx < len; idx++) {
                var btn = this.context.memo('button.' + buttons[idx]);
                if (btn) {
                    $group.append(typeof btn === 'function' ? btn(this.context) : btn);
                }
            }
            $group.appendTo($container);
        }
    };
    /**
     * @param {jQuery} [$container]
     */
    Buttons.prototype.updateCurrentStyle = function ($container) {
        var _this = this;
        var $cont = $container || this.$toolbar;
        var styleInfo = this.context.invoke('editor.currentStyle');
        this.updateBtnStates($cont, {
            '.note-btn-bold': function () {
                return styleInfo['font-bold'] === 'bold';
            },
            '.note-btn-italic': function () {
                return styleInfo['font-italic'] === 'italic';
            },
            '.note-btn-underline': function () {
                return styleInfo['font-underline'] === 'underline';
            },
            '.note-btn-subscript': function () {
                return styleInfo['font-subscript'] === 'subscript';
            },
            '.note-btn-superscript': function () {
                return styleInfo['font-superscript'] === 'superscript';
            },
            '.note-btn-strikethrough': function () {
                return styleInfo['font-strikethrough'] === 'strikethrough';
            }
        });
        if (styleInfo['font-family']) {
            var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                return name.replace(/[\'\"]/g, '')
                    .replace(/\s+$/, '')
                    .replace(/^\s+/, '');
            });
            var fontName_1 = lists.find(fontNames, this.isFontInstalled.bind(this));
            $cont.find('.dropdown-fontname a').each(function (idx, item) {
                var $item = $$1(item);
                // always compare string to avoid creating another func.
                var isChecked = ($item.data('value') + '') === (fontName_1 + '');
                $item.toggleClass('checked', isChecked);
            });
            $cont.find('.note-current-fontname').text(fontName_1).css('font-family', fontName_1);
        }
        if (styleInfo['font-size']) {
            var fontSize_1 = styleInfo['font-size'];
            $cont.find('.dropdown-fontsize a').each(function (idx, item) {
                var $item = $$1(item);
                // always compare with string to avoid creating another func.
                var isChecked = ($item.data('value') + '') === (fontSize_1 + '');
                $item.toggleClass('checked', isChecked);
            });
            $cont.find('.note-current-fontsize').text(fontSize_1);
        }
        if (styleInfo['line-height']) {
            var lineHeight_1 = styleInfo['line-height'];
            $cont.find('.dropdown-line-height li a').each(function (idx, item) {
                // always compare with string to avoid creating another func.
                var isChecked = ($$1(item).data('value') + '') === (lineHeight_1 + '');
                _this.className = isChecked ? 'checked' : '';
            });
        }
    };
    Buttons.prototype.updateBtnStates = function ($container, infos) {
        var _this = this;
        $$1.each(infos, function (selector, pred) {
            _this.ui.toggleBtnActive($container.find(selector), pred());
        });
    };
    Buttons.prototype.tableMoveHandler = function (event) {
        var PX_PER_EM = 18;
        var $picker = $$1(event.target.parentNode); // target is mousecatcher
        var $dimensionDisplay = $picker.next();
        var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
        var $highlighted = $picker.find('.note-dimension-picker-highlighted');
        var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
        var posOffset;
        // HTML5 with jQuery - e.offsetX is undefined in Firefox
        if (event.offsetX === undefined) {
            var posCatcher = $$1(event.target).offset();
            posOffset = {
                x: event.pageX - posCatcher.left,
                y: event.pageY - posCatcher.top
            };
        }
        else {
            posOffset = {
                x: event.offsetX,
                y: event.offsetY
            };
        }
        var dim = {
            c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
            r: Math.ceil(posOffset.y / PX_PER_EM) || 1
        };
        $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
        $catcher.data('value', dim.c + 'x' + dim.r);
        if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
            $unhighlighted.css({ width: dim.c + 1 + 'em' });
        }
        if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
            $unhighlighted.css({ height: dim.r + 1 + 'em' });
        }
        $dimensionDisplay.html(dim.c + ' x ' + dim.r);
    };
    return Buttons;
}());

var Toolbar = /** @class */ (function () {
    function Toolbar(context) {
        this.context = context;
        this.$window = $$1(window);
        this.$document = $$1(document);
        this.ui = $$1.summernote.ui;
        this.$note = context.layoutInfo.note;
        this.$editor = context.layoutInfo.editor;
        this.$toolbar = context.layoutInfo.toolbar;
        this.options = context.options;
        this.followScroll = this.followScroll.bind(this);
    }
    Toolbar.prototype.shouldInitialize = function () {
        return !this.options.airMode;
    };
    Toolbar.prototype.initialize = function () {
        var _this = this;
        this.options.toolbar = this.options.toolbar || [];
        if (!this.options.toolbar.length) {
            this.$toolbar.hide();
        }
        else {
            this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
        }
        if (this.options.toolbarContainer) {
            this.$toolbar.appendTo(this.options.toolbarContainer);
        }
        this.changeContainer(false);
        this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
            _this.context.invoke('buttons.updateCurrentStyle');
        });
        this.context.invoke('buttons.updateCurrentStyle');
        if (this.options.followingToolbar) {
            this.$window.on('scroll resize', this.followScroll);
        }
    };
    Toolbar.prototype.destroy = function () {
        this.$toolbar.children().remove();
        if (this.options.followingToolbar) {
            this.$window.off('scroll resize', this.followScroll);
        }
    };
    Toolbar.prototype.followScroll = function () {
        if (this.$editor.hasClass('fullscreen')) {
            return false;
        }
        var $toolbarWrapper = this.$toolbar.parent('.note-toolbar-wrapper');
        var editorHeight = this.$editor.outerHeight();
        var editorWidth = this.$editor.width();
        var toolbarHeight = this.$toolbar.height();
        $toolbarWrapper.css({
            height: toolbarHeight
        });
        // check if the web app is currently using another static bar
        var otherBarHeight = 0;
        if (this.options.otherStaticBar) {
            otherBarHeight = $$1(this.options.otherStaticBar).outerHeight();
        }
        var currentOffset = this.$document.scrollTop();
        var editorOffsetTop = this.$editor.offset().top;
        var editorOffsetBottom = editorOffsetTop + editorHeight;
        var activateOffset = editorOffsetTop - otherBarHeight;
        var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight;
        if ((currentOffset > activateOffset) && (currentOffset < deactivateOffsetBottom)) {
            this.$toolbar.css({
                position: 'fixed',
                top: otherBarHeight,
                width: editorWidth
            });
        }
        else {
            this.$toolbar.css({
                position: 'relative',
                top: 0,
                width: '100%'
            });
        }
    };
    Toolbar.prototype.changeContainer = function (isFullscreen) {
        if (isFullscreen) {
            this.$toolbar.prependTo(this.$editor);
        }
        else {
            if (this.options.toolbarContainer) {
                this.$toolbar.appendTo(this.options.toolbarContainer);
            }
        }
    };
    Toolbar.prototype.updateFullscreen = function (isFullscreen) {
        this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
        this.changeContainer(isFullscreen);
    };
    Toolbar.prototype.updateCodeview = function (isCodeview) {
        this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);
        if (isCodeview) {
            this.deactivate();
        }
        else {
            this.activate();
        }
    };
    Toolbar.prototype.activate = function (isIncludeCodeview) {
        var $btn = this.$toolbar.find('button');
        if (!isIncludeCodeview) {
            $btn = $btn.not('.btn-codeview');
        }
        this.ui.toggleBtn($btn, true);
    };
    Toolbar.prototype.deactivate = function (isIncludeCodeview) {
        var $btn = this.$toolbar.find('button');
        if (!isIncludeCodeview) {
            $btn = $btn.not('.btn-codeview');
        }
        this.ui.toggleBtn($btn, false);
    };
    return Toolbar;
}());

var LinkDialog = /** @class */ (function () {
    function LinkDialog(context) {
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.$body = $$1(document.body);
        this.$editor = context.layoutInfo.editor;
        this.options = context.options;
        this.lang = this.options.langInfo;
        context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
    }
    LinkDialog.prototype.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.$editor;
        var body = [
            '<div class="form-group note-form-group">',
            "<label class=\"note-form-label\">" + this.lang.link.textToDisplay + "</label>",
            '<input class="note-link-text form-control note-form-control  note-input" type="text" />',
            '</div>',
            '<div class="form-group note-form-group">',
            "<label class=\"note-form-label\">" + this.lang.link.url + "</label>",
            '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />',
            '</div>',
            !this.options.disableLinkTarget
                ? $$1('<div/>').append(this.ui.checkbox({
                    id: 'sn-checkbox-open-in-new-window',
                    text: this.lang.link.openInNewWindow,
                    checked: true
                }).render()).html()
                : ''
        ].join('');
        var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
        var footer = "<button type=\"submit\" href=\"#\" class=\"" + buttonClass + "\" disabled>" + this.lang.link.insert + "</button>";
        this.$dialog = this.ui.dialog({
            className: 'link-dialog',
            title: this.lang.link.insert,
            fade: this.options.dialogsFade,
            body: body,
            footer: footer
        }).render().appendTo($container);
    };
    LinkDialog.prototype.destroy = function () {
        this.ui.hideDialog(this.$dialog);
        this.$dialog.remove();
    };
    LinkDialog.prototype.bindEnterKey = function ($input, $btn) {
        $input.on('keypress', function (event) {
            if (event.keyCode === key.code.ENTER) {
                event.preventDefault();
                $btn.trigger('click');
            }
        });
    };
    /**
     * toggle update button
     */
    LinkDialog.prototype.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
        this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
    };
    /**
     * Show link dialog and set event handlers on dialog controls.
     *
     * @param {Object} linkInfo
     * @return {Promise}
     */
    LinkDialog.prototype.showLinkDialog = function (linkInfo) {
        var _this = this;
        return $$1.Deferred(function (deferred) {
            var $linkText = _this.$dialog.find('.note-link-text');
            var $linkUrl = _this.$dialog.find('.note-link-url');
            var $linkBtn = _this.$dialog.find('.note-link-btn');
            var $openInNewWindow = _this.$dialog.find('input[type=checkbox]');
            _this.ui.onDialogShown(_this.$dialog, function () {
                _this.context.triggerEvent('dialog.shown');
                // if no url was given, copy text to url
                if (!linkInfo.url) {
                    linkInfo.url = linkInfo.text;
                }
                $linkText.val(linkInfo.text);
                var handleLinkTextUpdate = function () {
                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                    // if linktext was modified by keyup,
                    // stop cloning text from linkUrl
                    linkInfo.text = $linkText.val();
                };
                $linkText.on('input', handleLinkTextUpdate).on('paste', function () {
                    setTimeout(handleLinkTextUpdate, 0);
                });
                var handleLinkUrlUpdate = function () {
                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                    // display same link on `Text to display` input
                    // when create a new link
                    if (!linkInfo.text) {
                        $linkText.val($linkUrl.val());
                    }
                };
                $linkUrl.on('input', handleLinkUrlUpdate).on('paste', function () {
                    setTimeout(handleLinkUrlUpdate, 0);
                }).val(linkInfo.url);
                if (!env.isSupportTouch) {
                    $linkUrl.trigger('focus');
                }
                _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                _this.bindEnterKey($linkUrl, $linkBtn);
                _this.bindEnterKey($linkText, $linkBtn);
                var isChecked = linkInfo.isNewWindow !== undefined
                    ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                $openInNewWindow.prop('checked', isChecked);
                $linkBtn.one('click', function (event) {
                    event.preventDefault();
                    deferred.resolve({
                        range: linkInfo.range,
                        url: $linkUrl.val(),
                        text: $linkText.val(),
                        isNewWindow: $openInNewWindow.is(':checked')
                    });
                    _this.ui.hideDialog(_this.$dialog);
                });
            });
            _this.ui.onDialogHidden(_this.$dialog, function () {
                // detach events
                $linkText.off('input paste keypress');
                $linkUrl.off('input paste keypress');
                $linkBtn.off('click');
                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            });
            _this.ui.showDialog(_this.$dialog);
        }).promise();
    };
    /**
     * @param {Object} layoutInfo
     */
    LinkDialog.prototype.show = function () {
        var _this = this;
        var linkInfo = this.context.invoke('editor.getLinkInfo');
        this.context.invoke('editor.saveRange');
        this.showLinkDialog(linkInfo).then(function (linkInfo) {
            _this.context.invoke('editor.restoreRange');
            _this.context.invoke('editor.createLink', linkInfo);
        }).fail(function () {
            _this.context.invoke('editor.restoreRange');
        });
    };
    return LinkDialog;
}());

var LinkPopover = /** @class */ (function () {
    function LinkPopover(context) {
        var _this = this;
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.options = context.options;
        this.events = {
            'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {
                _this.update();
            },
            'summernote.disable summernote.dialog.shown': function () {
                _this.hide();
            }
        };
    }
    LinkPopover.prototype.shouldInitialize = function () {
        return !lists.isEmpty(this.options.popover.link);
    };
    LinkPopover.prototype.initialize = function () {
        this.$popover = this.ui.popover({
            className: 'note-link-popover',
            callback: function ($node) {
                var $content = $node.find('.popover-content,.note-popover-content');
                $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
            }
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content,.note-popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.link);
    };
    LinkPopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    LinkPopover.prototype.update = function () {
        // Prevent focusing on editable when invoke('code') is executed
        if (!this.context.invoke('editor.hasFocus')) {
            this.hide();
            return;
        }
        var rng = this.context.invoke('editor.createRange');
        if (rng.isCollapsed() && rng.isOnAnchor()) {
            var anchor = dom.ancestor(rng.sc, dom.isAnchor);
            var href = $$1(anchor).attr('href');
            this.$popover.find('a').attr('href', href).html(href);
            var pos = dom.posFromPlaceholder(anchor);
            this.$popover.css({
                display: 'block',
                left: pos.left,
                top: pos.top
            });
        }
        else {
            this.hide();
        }
    };
    LinkPopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return LinkPopover;
}());

var ImageDialog = /** @class */ (function () {
    function ImageDialog(context) {
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.$body = $$1(document.body);
        this.$editor = context.layoutInfo.editor;
        this.options = context.options;
        this.lang = this.options.langInfo;
    }
    ImageDialog.prototype.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.$editor;
        var imageLimitation = '';
        if (this.options.maximumImageFileSize) {
            var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
            var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                ' ' + ' KMGTP'[unit] + 'B';
            imageLimitation = "<small>" + (this.lang.image.maximumFileSize + ' : ' + readableSize) + "</small>";
        }
        var body = [
            '<div class="form-group note-form-group note-group-select-from-files">',
            '<label class="note-form-label">' + this.lang.image.selectFromFiles + '</label>',
            '<input class="note-image-input note-form-control note-input" ',
            ' type="file" name="files" accept="image/*" multiple="multiple" />',
            imageLimitation,
            '</div>',
            '<div class="form-group note-group-image-url" style="overflow:auto;">',
            '<label class="note-form-label">' + this.lang.image.url + '</label>',
            '<input class="note-image-url form-control note-form-control note-input ',
            ' col-md-12" type="text" />',
            '</div>'
        ].join('');
        var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
        var footer = "<button type=\"submit\" href=\"#\" class=\"" + buttonClass + "\" disabled>" + this.lang.image.insert + "</button>";
        this.$dialog = this.ui.dialog({
            title: this.lang.image.insert,
            fade: this.options.dialogsFade,
            body: body,
            footer: footer
        }).render().appendTo($container);
    };
    ImageDialog.prototype.destroy = function () {
        this.ui.hideDialog(this.$dialog);
        this.$dialog.remove();
    };
    ImageDialog.prototype.bindEnterKey = function ($input, $btn) {
        $input.on('keypress', function (event) {
            if (event.keyCode === key.code.ENTER) {
                event.preventDefault();
                $btn.trigger('click');
            }
        });
    };
    ImageDialog.prototype.show = function () {
        var _this = this;
        this.context.invoke('editor.saveRange');
        this.showImageDialog().then(function (data) {
            // [workaround] hide dialog before restore range for IE range focus
            _this.ui.hideDialog(_this.$dialog);
            _this.context.invoke('editor.restoreRange');
            if (typeof data === 'string') {
                _this.context.invoke('editor.insertImage', data);
            }
            else {
                _this.context.invoke('editor.insertImagesOrCallback', data);
            }
        }).fail(function () {
            _this.context.invoke('editor.restoreRange');
        });
    };
    /**
     * show image dialog
     *
     * @param {jQuery} $dialog
     * @return {Promise}
     */
    ImageDialog.prototype.showImageDialog = function () {
        var _this = this;
        return $$1.Deferred(function (deferred) {
            var $imageInput = _this.$dialog.find('.note-image-input');
            var $imageUrl = _this.$dialog.find('.note-image-url');
            var $imageBtn = _this.$dialog.find('.note-image-btn');
            _this.ui.onDialogShown(_this.$dialog, function () {
                _this.context.triggerEvent('dialog.shown');
                // Cloning imageInput to clear element.
                $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
                    deferred.resolve(event.target.files || event.target.value);
                }).val(''));
                $imageBtn.click(function (event) {
                    event.preventDefault();
                    deferred.resolve($imageUrl.val());
                });
                $imageUrl.on('keyup paste', function () {
                    var url = $imageUrl.val();
                    _this.ui.toggleBtn($imageBtn, url);
                }).val('');
                if (!env.isSupportTouch) {
                    $imageUrl.trigger('focus');
                }
                _this.bindEnterKey($imageUrl, $imageBtn);
            });
            _this.ui.onDialogHidden(_this.$dialog, function () {
                $imageInput.off('change');
                $imageUrl.off('keyup paste keypress');
                $imageBtn.off('click');
                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            });
            _this.ui.showDialog(_this.$dialog);
        });
    };
    return ImageDialog;
}());

/**
 * Image popover module
 *  mouse events that show/hide popover will be handled by Handle.js.
 *  Handle.js will receive the events and invoke 'imagePopover.update'.
 */
var ImagePopover = /** @class */ (function () {
    function ImagePopover(context) {
        var _this = this;
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.editable = context.layoutInfo.editable[0];
        this.options = context.options;
        this.events = {
            'summernote.disable': function () {
                _this.hide();
            }
        };
    }
    ImagePopover.prototype.shouldInitialize = function () {
        return !lists.isEmpty(this.options.popover.image);
    };
    ImagePopover.prototype.initialize = function () {
        this.$popover = this.ui.popover({
            className: 'note-image-popover'
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content,.note-popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.image);
    };
    ImagePopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    ImagePopover.prototype.update = function (target) {
        if (dom.isImg(target)) {
            var pos = dom.posFromPlaceholder(target);
            var posEditor = dom.posFromPlaceholder(this.editable);
            this.$popover.css({
                display: 'block',
                left: this.options.popatmouse ? event.pageX - 20 : pos.left,
                top: this.options.popatmouse ? event.pageY : Math.min(pos.top, posEditor.top)
            });
        }
        else {
            this.hide();
        }
    };
    ImagePopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return ImagePopover;
}());

var TablePopover = /** @class */ (function () {
    function TablePopover(context) {
        var _this = this;
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.options = context.options;
        this.events = {
            'summernote.mousedown': function (we, e) {
                _this.update(e.target);
            },
            'summernote.keyup summernote.scroll summernote.change': function () {
                _this.update();
            },
            'summernote.disable': function () {
                _this.hide();
            }
        };
    }
    TablePopover.prototype.shouldInitialize = function () {
        return !lists.isEmpty(this.options.popover.table);
    };
    TablePopover.prototype.initialize = function () {
        this.$popover = this.ui.popover({
            className: 'note-table-popover'
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content,.note-popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.table);
        // [workaround] Disable Firefox's default table editor
        if (env.isFF) {
            document.execCommand('enableInlineTableEditing', false, false);
        }
    };
    TablePopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    TablePopover.prototype.update = function (target) {
        if (this.context.isDisabled()) {
            return false;
        }
        var isCell = dom.isCell(target);
        if (isCell) {
            var pos = dom.posFromPlaceholder(target);
            this.$popover.css({
                display: 'block',
                left: pos.left,
                top: pos.top
            });
        }
        else {
            this.hide();
        }
        return isCell;
    };
    TablePopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return TablePopover;
}());

var VideoDialog = /** @class */ (function () {
    function VideoDialog(context) {
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.$body = $$1(document.body);
        this.$editor = context.layoutInfo.editor;
        this.options = context.options;
        this.lang = this.options.langInfo;
    }
    VideoDialog.prototype.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.$editor;
        var body = [
            '<div class="form-group note-form-group row-fluid">',
            "<label class=\"note-form-label\">" + this.lang.video.url + " <small class=\"text-muted\">" + this.lang.video.providers + "</small></label>",
            '<input class="note-video-url form-control note-form-control note-input" type="text" />',
            '</div>'
        ].join('');
        var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
        var footer = "<button type=\"submit\" href=\"#\" class=\"" + buttonClass + "\" disabled>" + this.lang.video.insert + "</button>";
        this.$dialog = this.ui.dialog({
            title: this.lang.video.insert,
            fade: this.options.dialogsFade,
            body: body,
            footer: footer
        }).render().appendTo($container);
    };
    VideoDialog.prototype.destroy = function () {
        this.ui.hideDialog(this.$dialog);
        this.$dialog.remove();
    };
    VideoDialog.prototype.bindEnterKey = function ($input, $btn) {
        $input.on('keypress', function (event) {
            if (event.keyCode === key.code.ENTER) {
                event.preventDefault();
                $btn.trigger('click');
            }
        });
    };
    VideoDialog.prototype.createVideoNode = function (url) {
        // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
        var ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        var ytMatch = url.match(ytRegExp);
        var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
        var igMatch = url.match(igRegExp);
        var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
        var vMatch = url.match(vRegExp);
        var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
        var vimMatch = url.match(vimRegExp);
        var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
        var dmMatch = url.match(dmRegExp);
        var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
        var youkuMatch = url.match(youkuRegExp);
        var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
        var qqMatch = url.match(qqRegExp);
        var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
        var qqMatch2 = url.match(qqRegExp2);
        var mp4RegExp = /^.+.(mp4|m4v)$/;
        var mp4Match = url.match(mp4RegExp);
        var oggRegExp = /^.+.(ogg|ogv)$/;
        var oggMatch = url.match(oggRegExp);
        var webmRegExp = /^.+.(webm)$/;
        var webmMatch = url.match(webmRegExp);
        var $video;
        if (ytMatch && ytMatch[1].length === 11) {
            var youtubeId = ytMatch[1];
            $video = $$1('<iframe>')
                .attr('frameborder', 0)
                .attr('src', '//www.youtube.com/embed/' + youtubeId)
                .attr('width', '640').attr('height', '360');
        }
        else if (igMatch && igMatch[0].length) {
            $video = $$1('<iframe>')
                .attr('frameborder', 0)
                .attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/')
                .attr('width', '612').attr('height', '710')
                .attr('scrolling', 'no')
                .attr('allowtransparency', 'true');
        }
        else if (vMatch && vMatch[0].length) {
            $video = $$1('<iframe>')
                .attr('frameborder', 0)
                .attr('src', vMatch[0] + '/embed/simple')
                .attr('width', '600').attr('height', '600')
                .attr('class', 'vine-embed');
        }
        else if (vimMatch && vimMatch[3].length) {
            $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                .attr('frameborder', 0)
                .attr('src', '//player.vimeo.com/video/' + vimMatch[3])
                .attr('width', '640').attr('height', '360');
        }
        else if (dmMatch && dmMatch[2].length) {
            $video = $$1('<iframe>')
                .attr('frameborder', 0)
                .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])
                .attr('width', '640').attr('height', '360');
        }
        else if (youkuMatch && youkuMatch[1].length) {
            $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                .attr('frameborder', 0)
                .attr('height', '498')
                .attr('width', '510')
                .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
        }
        else if ((qqMatch && qqMatch[1].length) || (qqMatch2 && qqMatch2[2].length)) {
            var vid = ((qqMatch && qqMatch[1].length) ? qqMatch[1] : qqMatch2[2]);
            $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                .attr('frameborder', 0)
                .attr('height', '310')
                .attr('width', '500')
                .attr('src', 'http://v.qq.com/iframe/player.html?vid=' + vid + '&amp;auto=0');
        }
        else if (mp4Match || oggMatch || webmMatch) {
            $video = $$1('<video controls>')
                .attr('src', url)
                .attr('width', '640').attr('height', '360');
        }
        else {
            // this is not a known video link. Now what, Cat? Now what?
            return false;
        }
        $video.addClass('note-video-clip');
        return $video[0];
    };
    VideoDialog.prototype.show = function () {
        var _this = this;
        var text = this.context.invoke('editor.getSelectedText');
        this.context.invoke('editor.saveRange');
        this.showVideoDialog(text).then(function (url) {
            // [workaround] hide dialog before restore range for IE range focus
            _this.ui.hideDialog(_this.$dialog);
            _this.context.invoke('editor.restoreRange');
            // build node
            var $node = _this.createVideoNode(url);
            if ($node) {
                // insert video node
                _this.context.invoke('editor.insertNode', $node);
            }
        }).fail(function () {
            _this.context.invoke('editor.restoreRange');
        });
    };
    /**
     * show image dialog
     *
     * @param {jQuery} $dialog
     * @return {Promise}
     */
    VideoDialog.prototype.showVideoDialog = function (text) {
        var _this = this;
        return $$1.Deferred(function (deferred) {
            var $videoUrl = _this.$dialog.find('.note-video-url');
            var $videoBtn = _this.$dialog.find('.note-video-btn');
            _this.ui.onDialogShown(_this.$dialog, function () {
                _this.context.triggerEvent('dialog.shown');
                $videoUrl.val(text).on('input', function () {
                    _this.ui.toggleBtn($videoBtn, $videoUrl.val());
                });
                if (!env.isSupportTouch) {
                    $videoUrl.trigger('focus');
                }
                $videoBtn.click(function (event) {
                    event.preventDefault();
                    deferred.resolve($videoUrl.val());
                });
                _this.bindEnterKey($videoUrl, $videoBtn);
            });
            _this.ui.onDialogHidden(_this.$dialog, function () {
                $videoUrl.off('input');
                $videoBtn.off('click');
                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            });
            _this.ui.showDialog(_this.$dialog);
        });
    };
    return VideoDialog;
}());

var HelpDialog = /** @class */ (function () {
    function HelpDialog(context) {
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.$body = $$1(document.body);
        this.$editor = context.layoutInfo.editor;
        this.options = context.options;
        this.lang = this.options.langInfo;
    }
    HelpDialog.prototype.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.$editor;
        var body = [
            '<p class="text-center">',
            '<a href="http://summernote.org/" target="_blank">Summernote 0.8.10</a> · ',
            '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ',
            '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>',
            '</p>'
        ].join('');
        this.$dialog = this.ui.dialog({
            title: this.lang.options.help,
            fade: this.options.dialogsFade,
            body: this.createShortcutList(),
            footer: body,
            callback: function ($node) {
                $node.find('.modal-body,.note-modal-body').css({
                    'max-height': 300,
                    'overflow': 'scroll'
                });
            }
        }).render().appendTo($container);
    };
    HelpDialog.prototype.destroy = function () {
        this.ui.hideDialog(this.$dialog);
        this.$dialog.remove();
    };
    HelpDialog.prototype.createShortcutList = function () {
        var _this = this;
        var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
        return Object.keys(keyMap).map(function (key) {
            var command = keyMap[key];
            var $row = $$1('<div><div class="help-list-item"/></div>');
            $row.append($$1('<label><kbd>' + key + '</kdb></label>').css({
                'width': 180,
                'margin-right': 10
            })).append($$1('<span/>').html(_this.context.memo('help.' + command) || command));
            return $row.html();
        }).join('');
    };
    /**
     * show help dialog
     *
     * @return {Promise}
     */
    HelpDialog.prototype.showHelpDialog = function () {
        var _this = this;
        return $$1.Deferred(function (deferred) {
            _this.ui.onDialogShown(_this.$dialog, function () {
                _this.context.triggerEvent('dialog.shown');
                deferred.resolve();
            });
            _this.ui.showDialog(_this.$dialog);
        }).promise();
    };
    HelpDialog.prototype.show = function () {
        var _this = this;
        this.context.invoke('editor.saveRange');
        this.showHelpDialog().then(function () {
            _this.context.invoke('editor.restoreRange');
        });
    };
    return HelpDialog;
}());

var AIR_MODE_POPOVER_X_OFFSET = 20;
var AirPopover = /** @class */ (function () {
    function AirPopover(context) {
        var _this = this;
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.options = context.options;
        this.events = {
            'summernote.keyup summernote.mouseup summernote.scroll': function () {
                _this.update();
            },
            'summernote.disable summernote.change summernote.dialog.shown': function () {
                _this.hide();
            },
            'summernote.focusout': function (we, e) {
                // [workaround] Firefox doesn't support relatedTarget on focusout
                //  - Ignore hide action on focus out in FF.
                if (env.isFF) {
                    return;
                }
                if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(_this.$popover[0]))) {
                    _this.hide();
                }
            }
        };
    }
    AirPopover.prototype.shouldInitialize = function () {
        return this.options.airMode && !lists.isEmpty(this.options.popover.air);
    };
    AirPopover.prototype.initialize = function () {
        this.$popover = this.ui.popover({
            className: 'note-air-popover'
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.air);
    };
    AirPopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    AirPopover.prototype.update = function () {
        var styleInfo = this.context.invoke('editor.currentStyle');
        if (styleInfo.range && !styleInfo.range.isCollapsed()) {
            var rect = lists.last(styleInfo.range.getClientRects());
            if (rect) {
                var bnd = func.rect2bnd(rect);
                this.$popover.css({
                    display: 'block',
                    left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,
                    top: bnd.top + bnd.height
                });
                this.context.invoke('buttons.updateCurrentStyle', this.$popover);
            }
        }
        else {
            this.hide();
        }
    };
    AirPopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return AirPopover;
}());

var POPOVER_DIST = 5;
var HintPopover = /** @class */ (function () {
    function HintPopover(context) {
        var _this = this;
        this.context = context;
        this.ui = $$1.summernote.ui;
        this.$editable = context.layoutInfo.editable;
        this.options = context.options;
        this.hint = this.options.hint || [];
        this.direction = this.options.hintDirection || 'bottom';
        this.hints = $$1.isArray(this.hint) ? this.hint : [this.hint];
        this.events = {
            'summernote.keyup': function (we, e) {
                if (!e.isDefaultPrevented()) {
                    _this.handleKeyup(e);
                }
            },
            'summernote.keydown': function (we, e) {
                _this.handleKeydown(e);
            },
            'summernote.disable summernote.dialog.shown': function () {
                _this.hide();
            }
        };
    }
    HintPopover.prototype.shouldInitialize = function () {
        return this.hints.length > 0;
    };
    HintPopover.prototype.initialize = function () {
        var _this = this;
        this.lastWordRange = null;
        this.$popover = this.ui.popover({
            className: 'note-hint-popover',
            hideArrow: true,
            direction: ''
        }).render().appendTo(this.options.container);
        this.$popover.hide();
        this.$content = this.$popover.find('.popover-content,.note-popover-content');
        this.$content.on('click', '.note-hint-item', function () {
            _this.$content.find('.active').removeClass('active');
            $$1(_this).addClass('active');
            _this.replace();
        });
    };
    HintPopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    HintPopover.prototype.selectItem = function ($item) {
        this.$content.find('.active').removeClass('active');
        $item.addClass('active');
        this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);
    };
    HintPopover.prototype.moveDown = function () {
        var $current = this.$content.find('.note-hint-item.active');
        var $next = $current.next();
        if ($next.length) {
            this.selectItem($next);
        }
        else {
            var $nextGroup = $current.parent().next();
            if (!$nextGroup.length) {
                $nextGroup = this.$content.find('.note-hint-group').first();
            }
            this.selectItem($nextGroup.find('.note-hint-item').first());
        }
    };
    HintPopover.prototype.moveUp = function () {
        var $current = this.$content.find('.note-hint-item.active');
        var $prev = $current.prev();
        if ($prev.length) {
            this.selectItem($prev);
        }
        else {
            var $prevGroup = $current.parent().prev();
            if (!$prevGroup.length) {
                $prevGroup = this.$content.find('.note-hint-group').last();
            }
            this.selectItem($prevGroup.find('.note-hint-item').last());
        }
    };
    HintPopover.prototype.replace = function () {
        var $item = this.$content.find('.note-hint-item.active');
        if ($item.length) {
            var node = this.nodeFromItem($item);
            // XXX: consider to move codes to editor for recording redo/undo.
            this.lastWordRange.insertNode(node);
            range.createFromNode(node).collapse().select();
            this.lastWordRange = null;
            this.hide();
            this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]);
            this.context.invoke('editor.focus');
        }
    };
    HintPopover.prototype.nodeFromItem = function ($item) {
        var hint = this.hints[$item.data('index')];
        var item = $item.data('item');
        var node = hint.content ? hint.content(item) : item;
        if (typeof node === 'string') {
            node = dom.createText(node);
        }
        return node;
    };
    HintPopover.prototype.createItemTemplates = function (hintIdx, items) {
        var hint = this.hints[hintIdx];
        return items.map(function (item, idx) {
            var $item = $$1('<div class="note-hint-item"/>');
            $item.append(hint.template ? hint.template(item) : item + '');
            $item.data({
                'index': hintIdx,
                'item': item
            });
            return $item;
        });
    };
    HintPopover.prototype.handleKeydown = function (e) {
        if (!this.$popover.is(':visible')) {
            return;
        }
        if (e.keyCode === key.code.ENTER) {
            e.preventDefault();
            this.replace();
        }
        else if (e.keyCode === key.code.UP) {
            e.preventDefault();
            this.moveUp();
        }
        else if (e.keyCode === key.code.DOWN) {
            e.preventDefault();
            this.moveDown();
        }
    };
    HintPopover.prototype.searchKeyword = function (index, keyword, callback) {
        var hint = this.hints[index];
        if (hint && hint.match.test(keyword) && hint.search) {
            var matches = hint.match.exec(keyword);
            hint.search(matches[1], callback);
        }
        else {
            callback();
        }
    };
    HintPopover.prototype.createGroup = function (idx, keyword) {
        var _this = this;
        var $group = $$1('<div class="note-hint-group note-hint-group-' + idx + '"/>');
        this.searchKeyword(idx, keyword, function (items) {
            items = items || [];
            if (items.length) {
                $group.html(_this.createItemTemplates(idx, items));
                _this.show();
            }
        });
        return $group;
    };
    HintPopover.prototype.handleKeyup = function (e) {
        var _this = this;
        if (!lists.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {
            var wordRange = this.context.invoke('editor.createRange').getWordRange();
            var keyword_1 = wordRange.toString();
            if (this.hints.length && keyword_1) {
                this.$content.empty();
                var bnd = func.rect2bnd(lists.last(wordRange.getClientRects()));
                if (bnd) {
                    this.$popover.hide();
                    this.lastWordRange = wordRange;
                    this.hints.forEach(function (hint, idx) {
                        if (hint.match.test(keyword_1)) {
                            _this.createGroup(idx, keyword_1).appendTo(_this.$content);
                        }
                    });
                    // select first .note-hint-item
                    this.$content.find('.note-hint-item:first').addClass('active');
                    // set position for popover after group is created
                    if (this.direction === 'top') {
                        this.$popover.css({
                            left: bnd.left,
                            top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                        });
                    }
                    else {
                        this.$popover.css({
                            left: bnd.left,
                            top: bnd.top + bnd.height + POPOVER_DIST
                        });
                    }
                }
            }
            else {
                this.hide();
            }
        }
    };
    HintPopover.prototype.show = function () {
        this.$popover.show();
    };
    HintPopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return HintPopover;
}());

var Context = /** @class */ (function () {
    /**
     * @param {jQuery} $note
     * @param {Object} options
     */
    function Context($note, options) {
        this.ui = $$1.summernote.ui;
        this.$note = $note;
        this.memos = {};
        this.modules = {};
        this.layoutInfo = {};
        this.options = options;
        this.initialize();
    }
    /**
     * create layout and initialize modules and other resources
     */
    Context.prototype.initialize = function () {
        this.layoutInfo = this.ui.createLayout(this.$note, this.options);
        this._initialize();
        this.$note.hide();
        return this;
    };
    /**
     * destroy modules and other resources and remove layout
     */
    Context.prototype.destroy = function () {
        this._destroy();
        this.$note.removeData('summernote');
        this.ui.removeLayout(this.$note, this.layoutInfo);
    };
    /**
     * destory modules and other resources and initialize it again
     */
    Context.prototype.reset = function () {
        var disabled = this.isDisabled();
        this.code(dom.emptyPara);
        this._destroy();
        this._initialize();
        if (disabled) {
            this.disable();
        }
    };
    Context.prototype._initialize = function () {
        var _this = this;
        // add optional buttons
        var buttons = $$1.extend({}, this.options.buttons);
        Object.keys(buttons).forEach(function (key) {
            _this.memo('button.' + key, buttons[key]);
        });
        var modules = $$1.extend({}, this.options.modules, $$1.summernote.plugins || {});
        // add and initialize modules
        Object.keys(modules).forEach(function (key) {
            _this.module(key, modules[key], true);
        });
        Object.keys(this.modules).forEach(function (key) {
            _this.initializeModule(key);
        });
    };
    Context.prototype._destroy = function () {
        var _this = this;
        // destroy modules with reversed order
        Object.keys(this.modules).reverse().forEach(function (key) {
            _this.removeModule(key);
        });
        Object.keys(this.memos).forEach(function (key) {
            _this.removeMemo(key);
        });
        // trigger custom onDestroy callback
        this.triggerEvent('destroy', this);
    };
    Context.prototype.code = function (html) {
        var isActivated = this.invoke('codeview.isActivated');
        if (html === undefined) {
            this.invoke('codeview.sync');
            return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
        }
        else {
            if (isActivated) {
                this.layoutInfo.codable.val(html);
            }
            else {
                this.layoutInfo.editable.html(html);
            }
            this.$note.val(html);
            this.triggerEvent('change', html);
        }
    };
    Context.prototype.isDisabled = function () {
        return this.layoutInfo.editable.attr('contenteditable') === 'false';
    };
    Context.prototype.enable = function () {
        this.layoutInfo.editable.attr('contenteditable', true);
        this.invoke('toolbar.activate', true);
        this.triggerEvent('disable', false);
    };
    Context.prototype.disable = function () {
        // close codeview if codeview is opend
        if (this.invoke('codeview.isActivated')) {
            this.invoke('codeview.deactivate');
        }
        this.layoutInfo.editable.attr('contenteditable', false);
        this.invoke('toolbar.deactivate', true);
        this.triggerEvent('disable', true);
    };
    Context.prototype.triggerEvent = function () {
        var namespace = lists.head(arguments);
        var args = lists.tail(lists.from(arguments));
        var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];
        if (callback) {
            callback.apply(this.$note[0], args);
        }
        this.$note.trigger('summernote.' + namespace, args);
    };
    Context.prototype.initializeModule = function (key) {
        var module = this.modules[key];
        module.shouldInitialize = module.shouldInitialize || func.ok;
        if (!module.shouldInitialize()) {
            return;
        }
        // initialize module
        if (module.initialize) {
            module.initialize();
        }
        // attach events
        if (module.events) {
            dom.attachEvents(this.$note, module.events);
        }
    };
    Context.prototype.module = function (key, ModuleClass, withoutIntialize) {
        if (arguments.length === 1) {
            return this.modules[key];
        }
        this.modules[key] = new ModuleClass(this);
        if (!withoutIntialize) {
            this.initializeModule(key);
        }
    };
    Context.prototype.removeModule = function (key) {
        var module = this.modules[key];
        if (module.shouldInitialize()) {
            if (module.events) {
                dom.detachEvents(this.$note, module.events);
            }
            if (module.destroy) {
                module.destroy();
            }
        }
        delete this.modules[key];
    };
    Context.prototype.memo = function (key, obj) {
        if (arguments.length === 1) {
            return this.memos[key];
        }
        this.memos[key] = obj;
    };
    Context.prototype.removeMemo = function (key) {
        if (this.memos[key] && this.memos[key].destroy) {
            this.memos[key].destroy();
        }
        delete this.memos[key];
    };
    /**
     * Some buttons need to change their visual style immediately once they get pressed
     */
    Context.prototype.createInvokeHandlerAndUpdateState = function (namespace, value) {
        var _this = this;
        return function (event) {
            _this.createInvokeHandler(namespace, value)(event);
            _this.invoke('buttons.updateCurrentStyle');
        };
    };
    Context.prototype.createInvokeHandler = function (namespace, value) {
        var _this = this;
        return function (event) {
            event.preventDefault();
            var $target = $$1(event.target);
            _this.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
        };
    };
    Context.prototype.invoke = function () {
        var namespace = lists.head(arguments);
        var args = lists.tail(lists.from(arguments));
        var splits = namespace.split('.');
        var hasSeparator = splits.length > 1;
        var moduleName = hasSeparator && lists.head(splits);
        var methodName = hasSeparator ? lists.last(splits) : lists.head(splits);
        var module = this.modules[moduleName || 'editor'];
        if (!moduleName && this[methodName]) {
            return this[methodName].apply(this, args);
        }
        else if (module && module[methodName] && module.shouldInitialize()) {
            return module[methodName].apply(module, args);
        }
    };
    return Context;
}());

$$1.fn.extend({
    /**
     * Summernote API
     *
     * @param {Object|String}
     * @return {this}
     */
    summernote: function () {
        var type = $$1.type(lists.head(arguments));
        var isExternalAPICalled = type === 'string';
        var hasInitOptions = type === 'object';
        var options = $$1.extend({}, $$1.summernote.options, hasInitOptions ? lists.head(arguments) : {});
        // Update options
        options.langInfo = $$1.extend(true, {}, $$1.summernote.lang['en-US'], $$1.summernote.lang[options.lang]);
        options.icons = $$1.extend(true, {}, $$1.summernote.options.icons, options.icons);
        options.tooltip = options.tooltip === 'auto' ? !env.isSupportTouch : options.tooltip;
        this.each(function (idx, note) {
            var $note = $$1(note);
            if (!$note.data('summernote')) {
                var context = new Context($note, options);
                $note.data('summernote', context);
                $note.data('summernote').triggerEvent('init', context.layoutInfo);
            }
        });
        var $note = this.first();
        if ($note.length) {
            var context = $note.data('summernote');
            if (isExternalAPICalled) {
                return context.invoke.apply(context, lists.from(arguments));
            }
            else if (options.focus) {
                context.invoke('editor.focus');
            }
        }
        return this;
    }
});

$$1.summernote = $$1.extend($$1.summernote, {
    version: '0.8.10',
    ui: ui,
    plugins: {},
    options: {
        modules: {
            'editor': Editor,
            'clipboard': Clipboard,
            'dropzone': Dropzone,
            'codeview': CodeView,
            'statusbar': Statusbar,
            'fullscreen': Fullscreen,
            'handle': Handle,
            // FIXME: HintPopover must be front of autolink
            //  - Script error about range when Enter key is pressed on hint popover
            'hintPopover': HintPopover,
            'autoLink': AutoLink,
            'autoSync': AutoSync,
            'placeholder': Placeholder,
            'buttons': Buttons,
            'toolbar': Toolbar,
            'linkDialog': LinkDialog,
            'linkPopover': LinkPopover,
            'imageDialog': ImageDialog,
            'imagePopover': ImagePopover,
            'tablePopover': TablePopover,
            'videoDialog': VideoDialog,
            'helpDialog': HelpDialog,
            'airPopover': AirPopover
        },
        buttons: {},
        lang: 'en-US',
        followingToolbar: true,
        otherStaticBar: '',
        // toolbar
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        // popover
        popatmouse: true,
        popover: {
            image: [
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
            link: [
                ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
                ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
            ],
            air: [
                ['color', ['color']],
                ['font', ['bold', 'underline', 'clear']],
                ['para', ['ul', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']]
            ]
        },
        // air mode: inline editor
        airMode: false,
        width: null,
        height: null,
        focus: false,
        tabSize: 4,
        styleWithSpan: true,
        shortcuts: true,
        textareaAutoSync: true,
        hintDirection: 'bottom',
        tooltip: 'auto',
        container: 'body',
        maxTextLength: 0,
        styleTags: ['p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        fontNames: [
            'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
            'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
            'Tahoma', 'Times New Roman', 'Verdana'
        ],
        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
        // pallete colors(n x n)
        colors: [
            ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
            ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
            ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
            ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
            ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
            ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
            ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
            ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
        ],
        // http://chir.ag/projects/name-that-color/
        colorsName: [
            ['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'],
            ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'],
            ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'],
            ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'],
            ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'],
            ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'],
            ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'],
            ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou']
        ],
        lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
        tableClassName: 'table table-bordered',
        insertTableMaxSize: {
            col: 10,
            row: 10
        },
        dialogsInBody: false,
        dialogsFade: false,
        maximumImageFileSize: null,
        callbacks: {
            onInit: null,
            onFocus: null,
            onBlur: null,
            onBlurCodeview: null,
            onEnter: null,
            onKeyup: null,
            onKeydown: null,
            onSubmit: null,
            onImageUpload: null,
            onImageUploadError: null
        },
        codemirror: {
            mode: 'text/html',
            htmlMode: true,
            lineNumbers: true
        },
        keyMap: {
            pc: {
                'ENTER': 'insertParagraph',
                'CTRL+Z': 'undo',
                'CTRL+Y': 'redo',
                'TAB': 'tab',
                'SHIFT+TAB': 'untab',
                'CTRL+B': 'bold',
                'CTRL+I': 'italic',
                'CTRL+U': 'underline',
                'CTRL+SHIFT+S': 'strikethrough',
                'CTRL+BACKSLASH': 'removeFormat',
                'CTRL+SHIFT+L': 'justifyLeft',
                'CTRL+SHIFT+E': 'justifyCenter',
                'CTRL+SHIFT+R': 'justifyRight',
                'CTRL+SHIFT+J': 'justifyFull',
                'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                'CTRL+SHIFT+NUM8': 'insertOrderedList',
                'CTRL+LEFTBRACKET': 'outdent',
                'CTRL+RIGHTBRACKET': 'indent',
                'CTRL+NUM0': 'formatPara',
                'CTRL+NUM1': 'formatH1',
                'CTRL+NUM2': 'formatH2',
                'CTRL+NUM3': 'formatH3',
                'CTRL+NUM4': 'formatH4',
                'CTRL+NUM5': 'formatH5',
                'CTRL+NUM6': 'formatH6',
                'CTRL+ENTER': 'insertHorizontalRule',
                'CTRL+K': 'linkDialog.show'
            },
            mac: {
                'ENTER': 'insertParagraph',
                'CMD+Z': 'undo',
                'CMD+SHIFT+Z': 'redo',
                'TAB': 'tab',
                'SHIFT+TAB': 'untab',
                'CMD+B': 'bold',
                'CMD+I': 'italic',
                'CMD+U': 'underline',
                'CMD+SHIFT+S': 'strikethrough',
                'CMD+BACKSLASH': 'removeFormat',
                'CMD+SHIFT+L': 'justifyLeft',
                'CMD+SHIFT+E': 'justifyCenter',
                'CMD+SHIFT+R': 'justifyRight',
                'CMD+SHIFT+J': 'justifyFull',
                'CMD+SHIFT+NUM7': 'insertUnorderedList',
                'CMD+SHIFT+NUM8': 'insertOrderedList',
                'CMD+LEFTBRACKET': 'outdent',
                'CMD+RIGHTBRACKET': 'indent',
                'CMD+NUM0': 'formatPara',
                'CMD+NUM1': 'formatH1',
                'CMD+NUM2': 'formatH2',
                'CMD+NUM3': 'formatH3',
                'CMD+NUM4': 'formatH4',
                'CMD+NUM5': 'formatH5',
                'CMD+NUM6': 'formatH6',
                'CMD+ENTER': 'insertHorizontalRule',
                'CMD+K': 'linkDialog.show'
            }
        },
        icons: {
            'align': 'note-icon-align',
            'alignCenter': 'note-icon-align-center',
            'alignJustify': 'note-icon-align-justify',
            'alignLeft': 'note-icon-align-left',
            'alignRight': 'note-icon-align-right',
            'rowBelow': 'note-icon-row-below',
            'colBefore': 'note-icon-col-before',
            'colAfter': 'note-icon-col-after',
            'rowAbove': 'note-icon-row-above',
            'rowRemove': 'note-icon-row-remove',
            'colRemove': 'note-icon-col-remove',
            'indent': 'note-icon-align-indent',
            'outdent': 'note-icon-align-outdent',
            'arrowsAlt': 'note-icon-arrows-alt',
            'bold': 'note-icon-bold',
            'caret': 'note-icon-caret',
            'circle': 'note-icon-circle',
            'close': 'note-icon-close',
            'code': 'note-icon-code',
            'eraser': 'note-icon-eraser',
            'font': 'note-icon-font',
            'frame': 'note-icon-frame',
            'italic': 'note-icon-italic',
            'link': 'note-icon-link',
            'unlink': 'note-icon-chain-broken',
            'magic': 'note-icon-magic',
            'menuCheck': 'note-icon-menu-check',
            'minus': 'note-icon-minus',
            'orderedlist': 'note-icon-orderedlist',
            'pencil': 'note-icon-pencil',
            'picture': 'note-icon-picture',
            'question': 'note-icon-question',
            'redo': 'note-icon-redo',
            'square': 'note-icon-square',
            'strikethrough': 'note-icon-strikethrough',
            'subscript': 'note-icon-subscript',
            'superscript': 'note-icon-superscript',
            'table': 'note-icon-table',
            'textHeight': 'note-icon-text-height',
            'trash': 'note-icon-trash',
            'underline': 'note-icon-underline',
            'undo': 'note-icon-undo',
            'unorderedlist': 'note-icon-unorderedlist',
            'video': 'note-icon-video'
        }
    }
});

})));
//# sourceMappingURL=summernote-lite.js.map
