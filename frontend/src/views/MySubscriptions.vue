<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserBlock from "@/components/UserBlock.vue";

export default {
    name: "MySubscriptions",
    components: {UserBlock, FooterComponent, HeaderComponent},
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="mysubscription">
            <h1>Мои подписки</h1>
            <div class="mysubscriptions_main">
                <span v-if="!user.subscriptions?.length">Тут пока что ничего нет...</span>
                <UserBlock :user="us.user_subscription" v-for="us in user.subscriptions"/>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>