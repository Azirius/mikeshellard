import Vue from 'vue';
import Pagination from './spa/components/Pagination.js';
import axios from 'axios';

Vue.component('Pagination', Pagination);

const app = new Vue({
    'el': '#app-container'
});

(function(exports) {
    exports.Vue = Vue;
    exports.axios = axios;
    exports.app = app;
})(window);

