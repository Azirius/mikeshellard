import HomePage from './pages/Home.vue';
import PostPage from './pages/Post.vue';
import EditPostPage from './pages/EditPost.vue';
import ProfilePage from './pages/Profile.vue';
import ArticleManagementPage from './pages/ArticleManagement.vue';
import DashboardPage from './pages/Dashboard.vue';
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

                'profile/:slug': slug => this.setView('profile', slug),

                'admin/article': () => this.setView('articleManagement'),
                
                'admin/article/:slug/edit': slug => this.setView('editPost', slug),

                'dashboard': () => this.setView('dashboard')
            },

            router: null,
        }
    },

    mounted() {
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
            addActiveClassToParentListItem(`a[href="${uri}"]`);

            return response;
        });

        $(window).on('popstate', () => app.route());

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
        home: HomePage,
        post: PostPage,
        editPost: EditPostPage,
        profile: ProfilePage,
        articleManagement: ArticleManagementPage,
        dashboard: DashboardPage
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
        handleError(error) {
            if (error.response.data) {
                return this.handleValidationError(error);
            }

            this.handleAxiosException(error);
        },

        handleValidationError(error) {
            var errors      =   error.response.data.errors;
            var errorMessage=   '';

            for (var key in errors) {
                var currentError=   errors[key];
                var errorLength =   currentError.length;

                if (typeof currentError === 'string') {
                    errorMessage += '<p>' + currentError + '<p>';
                } else {
                    for (var i=0; i < errorLength; i++) {
                        errorMessage += currentError[i];
                        if (i < errorLength-1) {
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
        handleAxiosException(error) {
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
        error(notification) {
            return this.makeAlert('danger', notification || 'Sorry, something went wrong!');
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
