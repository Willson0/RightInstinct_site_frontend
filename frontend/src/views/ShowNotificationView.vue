<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from 'axios';
import config from "@/config.json";
import PostBlock from "@/components/PostBlock.vue";
import UserBlock from "@/components/UserBlock.vue";
import EventBlock from "@/components/EventBlock.vue";
import {notify, whatError} from "@/utils.js";

export default {
    name: "ShowNotificationView",
    components: {EventBlock, UserBlock, PostBlock, FooterComponent, HeaderComponent},
    data () {
        return {
            notification: {},
        }
    },
    async mounted () {
        if (!this.$route.params.id) window.location.href = "/notifications";

        await axios.post(config.backend + "notification/" + this.$route.params.id).then((response) => {
            this.notification = response.data;

            let interval = setInterval(() => {
                if (this.user.id) {
                    this.user.notifications.find(el => String(el.id) === this.$route.params.id).readed = 1;
                    this.$store.dispatch("updateUser", this.user);
                    clearInterval(interval);
                }
            }, 100);
        }).catch((error) => {
            notify(whatError(error));
        });
    },
    computed: {
        user () {
            return this.$store.state.user;
        }
    },
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="notification_view">
            <h1>Уведомление</h1>
            <div class="notifications_show">
                <h3 class="notifications_show_title">{{ notification.title }}</h3>
                <div class="notifications_show_description sign">{{ notification.description }}</div>
                <div class="notifications_show_object" v-if="notification.object">
                    <post-block v-if="['post', 'service'].includes(notification.type)"
                                :object="notification.object" :type="notification.type" :my="true" />
                    <user-block style="width:100%" v-if="['user'].includes(notification.type)" :user="notification.object" />
                    <event-block v-if="['event'].includes(notification.type)" :event="notification.object" />
                </div>
                <div v-else class="notifications_show_empty">
                    Объект уведомления удален...
                </div>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>