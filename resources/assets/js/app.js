import Vue from 'vue';
import Router from 'reflex-routing';
import Modal from './spa/components/modal.js';
import axios from 'axios';

Vue.component('Modal', Modal);

$.fn.isOnScreen = function () {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return bounds.top <= viewport.bottom && bounds.bottom >= viewport.top;
};

$(function () {
    $('.navbar-burger').click(function (e) {
        var target = $('#' + $(this).data('target'));
        target.toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
})

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

(function(exports) {
    exports.eventHub = new Vue;
    exports.Vue = Vue;
    exports.Router = Router;
    exports.focus_caret = focus_caret;
    exports.axios = axios;
})(window);

window.axios.defaults.headers.common['X-CSRF-TOKEN'] = mikeshellard.csrf_token;
window.axios.defaults.headers.common['Authorization'] = `Bearer ${mikeshellard.api_token}`;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
