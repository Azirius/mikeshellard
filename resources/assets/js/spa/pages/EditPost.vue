<template>
    <div v-if="post">
        <section class="hero is-medium is-info has-hero-background">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">
                        Editing '{{ post.title }}'
                    </h1>
                </div>
            </div>
        </section>
        <section class="section site-content">
            <div class="container container-into-hero">
                <div class="card">
                    <div class="card-content">
                        <div class="field">
                            <div class="control">
                                <label class="label" for="title">Title</label>
                                <input type="text" 
                                    class="input is-medium"  
                                    v-model="post.title"
                                >
                                <div class="help is-danger" v-if="errors.title" v-html="formatErrors(errors.title)"></div>
                            </div>
                        </div>

                        <transition-group name="fade">
                            <div class="field p-t-md p-b-md columns" :key="index" v-for="(page, index) in pages">
                                <div class="column">
                                    <div class="control m-b-md">
                                        <label class="label">Subtitle</label>
                                        <input type="text" 
                                            name="subtitle[]" 
                                            class="input"
                                            placeholder="Subtitle" 
                                            v-model="page.subtitle"
                                        >
                                        <div class="help is-danger" v-if="page.errors.subtitle" v-html="page.errors.subtitle"></div>
                                    </div>
                                    <div class="control">
                                        <label class="label">Page Content</label>
                                        <div class="help is-danger" v-if="page.errors.body" v-html="page.errors.body"></div>
                                        <editor name="body[]" @change="value => page.body = value" v-model="page.body" :height="350">{{ page.body }}</editor>
                                    </div>
                                </div>
                                <div class="column is-narrow is-vcentered">
                                    <a @click="removePage(page, index)"><i class="fas fa-lg fa-minus-circle has-text-warning"></i></a>
                                </div>
                            </div>
                        </transition-group>

                        <div class="field has-hero-background m-t-md">
                            <div class="control">
                                <button class="button is-info" @click="addPage">Add Page</button>
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link is-submit" @click="updateArticle">Update Article</button>
                            </div>
                            <div class="control">
                                <a href="/admin/article" class="button is-text is-cancel">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Page from './../components/Page.js';

export default Page.extend({
    data() {
        return {
            view: {
                name: 'edit-article',
                title: 'Edit Article'
            },
            post: null,
            pages: {},
            errors: {},
        }
    },

    methods: {
        launch(slug) {
            this.fetchPost(slug);
        },

        addPage() {
            this.pages.push({subtitle: '', body: '', errors: {subtitle: null, body: null}});
        },

        removePage(page) {
            if (0 === this.pages.length) {
                this.addPage();
                return;
            }

            if (1 === this.pages.length) {
                this.info('You cannot remove the last page! Every article needs at least one page!');
                return;
            }
            
            
            let data = this.getPostData();
            data.pages.splice(data.pages.indexOf(page), 1);
            this.sendPostToServer(data)
                .then(() => {
                    this.$root.success('Page removed successfully');
                    this.pages.splice(this.pages.indexOf(page), 1);
                })
                .catch(this.$root.handleError);
        },

        loadPost(slug) {
            return axios.get('/api/v1/article/' + slug);
        },

        fetchPost(slug) {
            this.loadPost(slug)
                .then(this.setPostData)
                .catch(this.$root.handleError);
        },

        setPostData(response) {
            this.isLoading(false);
            this.post = response.data;
            this.pages = response.data.pages.map(page => {
                page.errors = {subtitle: null, body: null}
                return page;
            });
        },

        getPostData() {
            return JSON.parse(JSON.stringify({
                title: this.post.title,
                id: this.post.id,
                pages: this.pages,
            }));
        },

        formatErrors(errors) {
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

            return errorMessage;
        },

        mapErrors(errors) {
            this.errors = errors.response.data.errors;
            this.pages = this.pages.map((page, index) => {
                if ('pages.' + index + '.subtitle' in this.errors) {
                    page.errors.subtitle = this.formatErrors(this.errors['pages.' + index + '.subtitle']);
                }

                if ('pages.' + index + '.body' in this.errors) {
                    page.errors.body = this.formatErrors(this.errors['pages.' + index + '.body']);
                }

                return page;
            });
        },

        sendPostToServer(postData) {
            return axios.put('/api/v1/article/' + this.post.slug, postData);
        },

        updateArticle() {
            this.sendPostToServer(this.getPostData())
                .then(() => this.$root.success('Article updated successfully'))
                .catch(this.mapErrors);
        }
    },


});
</script>
