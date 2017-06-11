import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'reflex-routing';
import Modal from './spa/components/modal.js';

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
 * Focus caret on an element
 *
 * @param  {object} elem Element to focus upon
 * @return {void}
 */
function focus_caret(elem) {
    let strLength;
    let focusElement = $(elem);

    // Multiply by 2 to ensure the cursor always ends up at the end;
    // Opera sometimes sees a carriage return as 2 characters.
    strLength = focusElement.val().length * 2;

    focusElement.focus();
    focusElement[0].setSelectionRange(0, strLength);
}

Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
Vue.transition('slide', {
    enter: (el, done) => $(el).slideDown({duration: 1000, done: done}),
    leave: (el, done) => $(el).slideUp({duration: 1000, done: done})
});

Vue.component('Modal', Modal);

Vue.transition('fade', {
    // element is already inserted into the DOM
    // call done when animation finishes.
    enter: (el, done) => $(el).css('opacity', 0).animate({ opacity: 1 }, 700, done),
    enterCancelled: el => $(el).stop(),
    // same as enter
    leave: (el, done) => $(el).animate({ opacity: 0 }, 700, done),
    leaveCancelled: el => $(el).stop()
});

(function(exports) {
    exports.Vue = Vue;
    exports.Router = Router;
    exports.focus_caret = focus_caret;
})(window);