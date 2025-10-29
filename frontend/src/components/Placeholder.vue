<script>
export default {
    name: "placeholder",
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    props: {
        width: {
            type: String,
            default: 100
        },
        height: {
            type: String,
            default: 20,
        },
        onUser: {
            type: Boolean,
            default: true,
        }
    }
}
</script>

<template>
    <div v-if="onUser ? (Object.keys(user).length === 0 && user !== false) : true" :style="`width: ${width}px; height: ${height}px;`" class="placeholder"></div>
</template>

<style scoped>

</style>