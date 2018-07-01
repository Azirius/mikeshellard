import AvatarTemplate from './avatar.vue.html';

export default {
    props: ['user', 'avatarClass', 'size'],

    name: 'Avatar',

    data: function () {
        return {
            sizeMap: {
                small: ' is-24x24',
                large: '' 
            },
            currentUser: null
        }
    },

    mounted: function() {
        this.currentUser = this.user ? this.user : this.$root.user();
    },

    methods: {
        getAvatarSource() {
            return this.currentUser.gravatar.large;
        },

        getAvatarClass() {
            var avatarClass = this.avatarClass;

            return avatarClass + this.sizeMap[this.size];

        },
    },

    template: AvatarTemplate,
}
