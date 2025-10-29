<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: "NotificationView",
    components: {FooterComponent, HeaderComponent},
    computed: {
        user () {
            return this.$store.state.user;
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="notification_view">
            <h1>Уведомления</h1>
            <div class="notification_empty" v-if="user?.notifications?.length === 0">
                <p>У вас нет уведомлений</p>
                <div class="notifications_empty_img">
                    <img src="/dog.png" alt="">
                </div>
            </div>
            <div v-else class="notifications_main">
                <div @click="$router.push('/notifications/' + notification.id)" v-for="notification in user?.notifications">
                    <h3 class="notifications_el_title">{{ notification.title }}</h3>
                    <div class="notifications_el_text sign">{{ notification.description }}</div>
                    <div class="notifications_el_alert" v-if="notification.readed === 0"></div>
                </div>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>