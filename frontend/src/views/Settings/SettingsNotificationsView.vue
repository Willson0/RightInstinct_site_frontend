<script>
import SettingsNavComponent from "@/components/SettingsNavComponent.vue";
import axios from 'axios';
import config from "@/config.json";
import {notify, whatError} from "@/utils.js";

export default {
    name: "SettingsNotificationsView",
    components: {SettingsNavComponent},
    data () {
        return {
            notifications: {
                'message': "Новые сообщения",
                'subscription': "На вас подписались",
                'comment': "Новый комментарий к записи",
                "repost": "Репост вашей записи",
                "favourite_post": "Объявление добавлено в Избранное",
                "favourite_service": "Услуга добавлена в Избранное",
                "favourite_event": "Мероприятие добавлено в Избранное",
                "event": "Напоминание о мероприятии",
                "anons": "Анонс мероприятия"
            },
            newSettings: [],
            isLoading: false,
        }
    },
    async mounted () {
        this.initSettings(this.user);
    },
    methods: {
        initSettings (us) {
            if (!us.id) return;
            this.newSettings = us.notifications_settings ?? [];
        },
        async sendData () {
            if (this.isLoading) return;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/notifications/", {
                settings: this.newSettings,
            }).then((response) => {
                notify("Настройки успешно сохранены!");
            }).catch((error) => notify(whatError(error), 1))
                .finally(() => this.isLoading = false);
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        }
    },
    watch: {
        user (nw) {
            this.initSettings(nw);
        }
    }
}
</script>

<template>
    <settings-nav-component>
        <div class="settings_slot settings_notifications">
            <h2>Уведомления</h2>
            <div>
                <section>
                    <h3>E-mail</h3>
                    <ul>
                        <li v-for="(not, key) in notifications" @click="newSettings.includes(key) ? newSettings = newSettings.filter(ns => ns !== key) : newSettings.push(key)">
                            <div class="checkbox" :class="{'active': newSettings.includes(key)}">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.52345 10.743L3.55615 7.77573C3.43435 7.65393 3.289 7.61643 3.1201 7.66323C2.9512 7.71003 2.84575 7.81548 2.80375 7.97958C2.76175 8.14368 2.80165 8.29128 2.92345 8.42238L6.52345 12.0224L13.7235 4.82238C13.8078 4.72848 13.8477 4.62063 13.8432 4.49883C13.8387 4.37703 13.7917 4.27158 13.7023 4.18248C13.6129 4.09338 13.5097 4.04883 13.3927 4.04883C13.2757 4.04883 13.1703 4.09098 13.0764 4.17528L6.52345 10.743Z" fill="#222B1B"/>
                                </svg>
                            </div>
                            <label>{{ not }}</label>
                        </li>
                    </ul>
                </section>
<!--                <section>-->
<!--                    <h3>СМС</h3>-->
<!--                    <ul>-->
<!--                        <li v-for="el in 3">-->
<!--                            <div class="checkbox">-->
<!--                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                    <path d="M6.52345 10.743L3.55615 7.77573C3.43435 7.65393 3.289 7.61643 3.1201 7.66323C2.9512 7.71003 2.84575 7.81548 2.80375 7.97958C2.76175 8.14368 2.80165 8.29128 2.92345 8.42238L6.52345 12.0224L13.7235 4.82238C13.8078 4.72848 13.8477 4.62063 13.8432 4.49883C13.8387 4.37703 13.7917 4.27158 13.7023 4.18248C13.6129 4.09338 13.5097 4.04883 13.3927 4.04883C13.2757 4.04883 13.1703 4.09098 13.0764 4.17528L6.52345 10.743Z" fill="#222B1B"/>-->
<!--                                </svg>-->
<!--                            </div>-->
<!--                            <label>Новый сообщения</label>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </section>-->
            </div>
            <button @click="sendData" :class="{'inactive': isLoading}">Сохранить</button>
        </div>
    </settings-nav-component>
</template>

<style scoped>

</style>