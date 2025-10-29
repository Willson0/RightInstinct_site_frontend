<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: "SettingsNavComponent",
    components: {FooterComponent, HeaderComponent},
    data () {
        return {
            links: [
                ['/settings', 'Личная информация'],
                ['/settings/documents', 'Документы и файлы'],
                ['/settings/notifications', 'Уведомления'],
                ['/settings/auth', 'Авторизация'],
            ]
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="settings">
            <h1>Настройки</h1>
            <nav>
                <button @click="$router.push(link[0])" :class="{'active': $route.path === link[0]}"
                   v-for="link in links">{{ link[1] }}</button>
            </nav>
            <slot></slot>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>