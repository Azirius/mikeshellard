<template>
    <div>
        <div class="pagination-focus">
            <slot v-for="item in itemsToDisplay" :item="item" name="pagination-item"></slot>
        </div>
        <nav class="pagination m-t-md is-centered" role="navigation" aria-label="pagination" v-if="pages.length > 1">
            <ul class="pagination-list">
                <li v-if="showPreviousButton">
                    <a class="pagination-previous prevent" @click="goToPreviousPage" :disabled="isOnFirstPage()">&laquo;</a>
                </li>
                <li v-if="showFirstButton">
                    <a class="pagination-previous prevent" @click="goToFirstPage" :disabled="isOnFirstPage()">First Page</a>
                </li>
                <li v-if="showNumberedList" v-for="page in pages" :key="page.value">
                    <a class="pagination-link prevent" :class="{'is-current': page.value === currentPage}" @click="goToThisPage(page.value)" v-text="page.label"></a>
                </li>
                <li v-if="showLastButton">
                    <a class="pagination-next prevent" @click="goToLastPage" :disabled="isOnLastPage()">Last Page</a>
                </li>
                <li v-if="showNextButton">
                    <a class="pagination-next prevent" @click="goToNextPage" :disabled="isOnAllButLastPage()">&raquo;</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
    
        props: {
            items: {
                type: [Array, Object],
                default: Array,
            },

            perPage: Number,

            listLength: {
                type: Number,
                default: 4,
                validator: (value) => 0 === (value % 2), 
            },

            showPreviousButton: {
                type: Boolean,
                default: true,
            },

            showNextButton: {
                type: Boolean,
                default: true,
            },

            showLastButton: {
                type: Boolean,
                default: true,
            },

            showFirstButton: {
                type: Boolean,
                default: true,
            },

            showNumberedList: {
                type: Boolean,
                default: true,
            },
        },
    
        data() {
            return {
                currentPage: 0,
            };
        },
    
        computed: {
            pageItems() {
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
    
            itemCount() {
                return this.pageItems.length;
            },
    
            pages() {
                var start = this.currentPage - this.offset;
                var end = this.currentPage + this.offset;

                if (this.totalPages <= this.listLength) {
                    start = 0;
                    end = this.totalPages;
                } else if (this.currentPage <= this.offset) {
                    start = 0;
                    end = this.listLength;
                } else if ((this.currentPage + this.offset) >= this.totalPages) {
                    start = this.totalPages - this.listLength;
                    end = this.totalPages;
                }

                return this.generateRange(start, end);
            },

            offset() {
                return Math.ceil(this.listLength / 2);
            },
    
            lastPage() {
                return this.totalPages - 1;
            },
    
            firstPage() {
                return 0;
            },

            totalPages() {
                return Math.ceil(this.itemCount / this.perPage);
            },
    
            itemsToDisplay() {
                var from = (this.currentPage) * this.perPage;
                var to = from + this.perPage;
                
                return this.pageItems.slice(from, to);
            }
        },
    
        methods: {
            generateRange(start, end) {
                return Array(end - start).fill().map((_, idx) => {
                    return { 
                        value: start + idx, 
                        label: (start + idx) + 1 
                    } 
                });
            },

            goToFirstPage() {
                this.setPage(this.firstPage);
            },
    
            goToLastPage() {
                this.setPage(this.lastPage);
            },
    
            goToNextPage() {
                this.setPage(this.currentPage + 1);
            },
    
            goToPreviousPage() {
                this.setPage(this.currentPage - 1);
            },
    
            goToThisPage(page) {
                this.setPage(page);
            },
    
            setPage(page) {
                if (page >= this.totalPages
                    || page < 0) {
                    return;
                }
                
                this.currentPage = page;
            },
    
            isOnFirstPage() {
                return this.firstPage === this.currentPage;
            },
    
            isOnLastPage() {
                return this.lastPage === this.currentPage;
            },

            isOnAllButLastPage() {
                return 1 > (this.lastPage - this.currentPage);
            }
        }
    };
</script>
