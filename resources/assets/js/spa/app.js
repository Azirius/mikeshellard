import HomeComponent from './components/home.js';
import PostComponent from './components/post.js';
import ProfileComponent from './components/profile.js';
import {getURI, removeActiveClassFromParentListItems, addActiveClassToParentListItem} from '../helpers.js';

export default {
    el: '#app-container',

    data() {
        return {
            view: '',

            alert: false,

            notification: null,

            routes: {
                '/': () => this.setView('home'),

                'article/:slug': slug => this.setView('post', {slug}),

                'profile/:slug': slug => this.setView('profile', slug)
            },

            router: null,
        }
    },

    attached() {
        this.router = new Router(this.routes);

        this.router.after((router, route, uri, response) => {
            if (! router.isInitial && null == router.current) {
                document.location = uri;
                return response;
            }

            if (! router.isInitial || null != router.current) {
                $('#non-spa').hide();
            }

            removeActiveClassFromParentListItems();
            addActiveClassToParentListItem(`li > a[href="${uri}"]`);

            return response;
        });

        $(window).on('popstate', () => app.route());

        $('#app-container').on('click', 'a:not(.prevent)', function (e) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            app.route();
        });

        history.replaceState(null, document.title, document.location.href);

        this.route();
    },

    components: {
        home: HomeComponent,
        post: PostComponent,
        profile: ProfileComponent
    },

    methods: {
        /**
         * Set the alert type
         * @param {string} type Alert type
         */
        setAlert(type) {
            this.alert = type || false
        },

        /**
         * Fire off the actual alert
         * @param  {string}  type         Alert type
         * @param  {string}  notification Alert notification
         * @return {Vue}
         */
        makeAlert(type, notification) {
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
        error(notification) {
            return this.makeAlert('error', notification || 'Sorry, something went wrong!');
        },

        /**
         * Fires an info message
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        info(notification) {
            return this.makeAlert('info', notification);
        },

        /**
         * Fires an info message
         * @param  {string} notification Info notification
         * @return {Vue}
         */
        success(notification) {
            return this.makeAlert('success', notification);
        },

        user() {
            return window.mikeshellard.user;
        },

        /**
         * Fire the launcher on the root on completion of child load
         * @param  {Object} view Route to fire launch
         * @return {void}
         */
        onChildLoad(view) {
            var launcher = view.launch;

            if (launcher && typeof launcher === 'function') {
                launcher(this.params);
            }
        },

        route() {
            return this.router.route(getURI());
        },

        /**
         * Set the view
         * @param {string} newView The view to set
         * @param {object} params Params to send to child
         */
        setView(view, params = {}) {
            this.view = view;
            this.params = params;
        },

        /**
         * Get current view
         * @return {string}
         */
        getView() {
            return this.view;
        }
    }
}
