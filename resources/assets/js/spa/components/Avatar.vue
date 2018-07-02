<template>
    <div v-if="currentUser">
        <img :src="getAvatarSource()" class="image avatar" :class="getAvatarClass()" alt="avatar">
    </div>
</template>

<script>
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
    }
}
</script>
