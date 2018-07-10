import Vue from 'vue/dist/vue.common.js';
import Router from 'reflex-routing';
import Editor from './spa/components/Editor.vue';
import Modal from './spa/components/Modal.vue';
import Pinned from './spa/components/Pinned.vue';
import ArticlePost from './spa/components/ArticlePost.vue';
import Avatar from './spa/components/Avatar.vue';
import axios from 'axios';
import SPA from './spa';

Vue.component('Editor', Editor);
Vue.component('Avatar', Avatar);
Vue.component('Modal', Modal);
Vue.component('Pinned', Pinned);
Vue.component('ArticlePost', ArticlePost);

window.Router = Router;

window.axios = axios;
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = mikeshellard.csrf_token;
window.axios.defaults.headers.common['Authorization'] = `Bearer ${mikeshellard.api_token}`;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = Vue;

window.eventHub = new Vue;
window.app = new Vue(SPA);

$(function () {
    $('.navbar-burger').click(function (e) {
        var target = $('#' + $(this).data('target'));
        target.toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
});
