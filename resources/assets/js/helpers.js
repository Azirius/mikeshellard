export function trimmer(string, charlist) {
    string = ltrim(string, charlist);
    return rtrim(string, charlist);
};

export function ltrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp(`^[${charlist}]*`), ''); 
};

export function rtrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp(`[${charlist}]*$`), ''); 
};

export function getURI() {
    return document.location.pathname;
}

export function removeActiveClassFromParentListItems() {
    $('a.navbar-item.is-active').removeClass('is-active');
}

export function addActiveClassToParentListItem(element) {
    $(element).addClass('is-active');
}

export function extend(to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
    return to;
}

/**
 * Key exists in array
 * @param  {string} key   Key to lookup
 * @param  {array}  array Object to look in
 * @return {boolean}       
 */
export function exists(key, array) {
    return is_object(array) && key in array;
}

/**
 * Assert something is an object
 * @param  {mixed}   thing      Thing to check
 * @return {Boolean}            
 */
export function is_object(thing) {
    return is_type(thing, 'object');
}

/**
 * Assert something is something
 * @param  {mixed}   thing      Thing to check
 * @param  {string}  assertThis Type to check against
 * @return {Boolean}            
 */
export function is_type(thing, assertThis) {
    let typeString = Object.prototype.toString.call(thing);

    return typeString.toLowerCase() === '[object ' + assertThis.toLowerCase() + ']';
}

/**
 * Debounce
 *
 * Usage: function(){}.debounce(threshold);
 *
 * @param  {int} threshold How long to hold of on execution
 * @return {function}
 */
Function.prototype.debounce = function(threshold) {
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
