/**
 * Is element on screen?
 *
 * @return {Boolean}
 */
$.fn.isOnScreen = function () {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return bounds.top <= viewport.bottom && bounds.bottom >= viewport.top;
};
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
        var context = this,
            params = arguments;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            callback.apply(context, params);
        }, threshold);
    };
};

/**
 * Throttle
 *
 * Usage function(){}.throttle(threshold);
 * @param  {int} threshold How long to wait between executions
 * @return {function}
 */
Function.prototype.throttle = function (threshold) {
    var callback = this;
    var suppress = false;
    var clear = function clear() {
        suppress = false;
    };
    return function () {
        if (!suppress) {
            callback.apply(this, arguments);
            window.setTimeout(clear, threshold);
            suppress = true;
        }
    };
};