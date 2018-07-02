<template>
    <modal :show="show" @close="close">
        <div class="modal-card">
            <div class="modal-card-head">
                <h1 class="modal-card-title">Changing your avatar</h1>
                <button class="delete" aria-label="close" @click="close()"></button>
            </div>

            <div class="modal-card-body">
                I use <p class="has-text-bold has-text-info is-inline">Gravatar</p> to handle the avatars on this website, so if you don't currently
                have an account, go make one <a href="https://en.gravatar.com/">here</a>. The email used on this account will be the one we
                use to look up your Gravatar! Otherwise, you'll be stuck with a default avatar:
                <p class="has-text-centered m-t-md">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y" alt="Default Avatar">
                </p>
            </div>

            <div class="modal-card-foot">
                <button class="button is-success" @click="close()">
                    Okay!
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['show'],

    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
