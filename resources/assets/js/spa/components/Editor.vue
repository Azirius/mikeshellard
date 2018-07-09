<template>
    <textarea :name="name"><slot></slot></textarea>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },

        height: {
            type: [String,Number],
            default: 200
        },

        model: {
            required: false
        },

        placeholder: {
            required: false,
            default: 'Make some content!'
        }
    },

    name: 'Editor',

    methods: {
        getSlotContent() {
            return (this.$slots.default && this.$slots.default[0].text) || null;
        }
    },

    mounted() {
        let value = this.model || this.getSlotContent();
        let config = {
            minHeight: this.height,
            placeholder: this.placeholder,
            callbacks: {
                onInit: () => $(this.$el).summernote('code', value),
                onChange: () => this.$emit('change', $(this.$el).summernote('code')),
                onBlur: () => this.$emit('change', $(this.$el).summernote('code')),
                onApplyCustomStyle: function($target, context, onFormatBlock) {
                    var className = $target.data('option') || $target.parent('a').data('item').option;
                    var tag = $target.data('tag') || $target.parent('a').data('item').tag;

                    if (tag && className && window.getSelection) {
                        var selection = window.getSelection(),
                            selected = (selection.rangeCount > 0) && selection.getRangeAt(0);

                        // Only wrap tag around selected text
                        if (selected.startOffset !== selected.endOffset) {

                            var range = selected.cloneRange();

                            var startParentElement = range.startContainer.parentElement;
                            var endParentElement = range.endContainer.parentElement;

                            var newNode = document.createElement(tag);
                            console.log(typeof className);
                            if (Array.isArray(className)) {
                                className.forEach(className => newNode.classList.add(className));
                            } else {
                                newNode.classList.add(className);
                            }
                            newNode.appendChild(range.extractContents());
                            range.insertNode(newNode)
                            range.selectNodeContents(newNode);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    } else {
                        onFormatBlock($target.prop('tagName'));
                    }
                }
            },
            styleTags: [
                { tag: 'h1', title: 'Header 1', className: 'title has-bottom-highlight', option: ['title', 'has-bottom-highlight'] },
                { tag: 'h2', title: 'Header 2', className: 'subtitle', option: 'title' },
                { tag: 'h3', title: 'Header 3' },
            ]
        };

        $(this.$el).summernote(config);
    }
}
</script>
