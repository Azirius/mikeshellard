<template>
    <img v-if="currentUser" :src="getAvatarSource()" class="image avatar" :class="getAvatarClass()" alt="avatar">
</template>

<script>
export default {
    props: ['user', 'avatarClass', 'size'],

    data: function () {
        return {
            sizeMap: {
                small: 'is-24x24',
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
            var avatarClass = this.avatarClass || '';

            return avatarClass + this.sizeMap[this.size];

        },
    }
}
</script>
