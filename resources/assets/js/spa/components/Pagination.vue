<template>
    <div>
        <div class="pagination-focus">
            <slot v-for="item in itemsToDisplay" :item="item" name="pagination-item"></slot>
        </div>
        <nav class="pagination m-t-md is-centered" role="navigation" aria-label="pagination" v-if="pages > 1">
            <ul class="pagination-list">
                <li>
                    <a class="pagination-previous prevent" @click="goToPreviousPage" :disabled="isOnFirstPage()">&laquo;</a>
                </li>
                <li>
                    <a class="pagination-previous prevent" @click="goToFirstPage" :disabled="isOnFirstPage()">First Page</a>
                </li>
                <li v-for="page in pages" :key="page">
                    <a class="pagination-link prevent" :class="{'is-current': (page) === currentPage}" @click="goToThisPage(page)" v-text="page"></a>
                </li>
                <li>
                    <a class="pagination-next prevent" @click="goToLastPage" :disabled="isOnLastPage()">Last Page</a>
                </li>
                <li>
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
                return Math.ceil(this.itemCount / this.perPage);
            },
    
            lastPage() {
                return this.pages;
            },
    
            firstPage() {
                return 1;
            },
    
            itemsToDisplay() {
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
                if ((this.currentPage + 1) > this.lastPage) {
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
            },

            isOnAllButLastPage() {
                return 1 > (this.lastPage - this.currentPage);
            }
        }
    };
</script>
