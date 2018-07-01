import PaginationTemplate from './pagination-template.vue.html';

export default {
    inheritAttrs: false,

    template: PaginationTemplate,

    props: {
        items: {
            type: [Array, Object],
            default: Array
        },
        perPage: Number
    },

    data() {
        return {
            currentPage: 1,
        };
    },

    computed: {
        pageItems: function() {
            var items = [];

            if (! Array.isArray(this.items)) {
                items = Object.keys(this.items).map(i => this.items[i])
            } else {
                items = this.items;
            }

            if (! items) {
                items = [];
            }

            return items;
        },

        itemCount: function() {
            return this.pageItems.length;
        },

        pages: function() {
            return Math.ceil(this.itemCount / this.perPage);
        },

        lastPage: function() {
            return this.pages;
        },

        firstPage: function() {
            return 1;
        },

        itemsToDisplay: function() {
            var from = (this.currentPage-1) * this.perPage;
            var to = from + this.perPage;
            
            return this.pageItems.slice(from, to);
        }
    },

    methods: {
        goToFirstPage() {
            this.setPage(this.firstPage);
        },

        goToLastPage() {
            this.setPage(this.lastPage);
        },

        goToNextPage() {
            if (this.currentPage + 1 === this.lastPage) {
                return;
            }

            this.setPage(this.currentPage + 1);
        },

        goToPreviousPage() {
            if (this.currentPage === 1) {
                return;
            }
            
            this.setPage(this.currentPage - 1);
        },

        goToThisPage(page) {
            if (page < 1 || page > this.lastPage) {
                return;
            }

            this.setPage(page);
        },

        setPage(page) {
            this.currentPage = page;
        },

        isOnFirstPage() {
            return this.firstPage === this.currentPage;
        },

        isOnLastPage() {
            return this.lastPage === this.currentPage;
        }
    }
};
