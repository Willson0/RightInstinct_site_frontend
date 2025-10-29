<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserBlock from "@/components/UserBlock.vue";
import PostBlock from "@/components/PostBlock.vue";
import EventBlock from "@/components/EventBlock.vue";
import axios from 'axios';
import config from "@/config.json";
import {notify, whatError} from "@/utils.js";

export default {
    name: "MyFavourite",
    components: {EventBlock, PostBlock, UserBlock, FooterComponent, HeaderComponent},
    data () {
        return {
            data: {},
            categories: {
                all: 'Все',
                user: "Владельцы",
                post: "Объявления",
                service: "Услуги"
            },
            selectedCategory: "all",
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
    },
    async mounted () {
        await axios.post(config.backend + "favourite/index")
        .then((response) => {
            this.data = response.data;
        }).catch((error) => notify(whatError(error), 1));
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="favourite">
            <h1>Избранное</h1>
            <div class="posts_categories">
                <button v-for="(cat, key) in categories" :class="{'active': selectedCategory === key}"
                        @click="selectedCategory === key ? null : selectedCategory = key">
                    {{ cat }}
                </button>
            </div>
            <div v-if="['all', 'user'].includes(selectedCategory)" class="favourite_users margin-side">
                <h3>Владельцы</h3>
                <div v-if="!data.user?.length" class="posts_main_nothing">Тут пока что ничего нет...</div>
                <div v-else class="home_block_users_container">
                    <user-block :user="object" v-for="object in data.user" />
                </div>
            </div>
            <div v-if="['all', 'post'].includes(selectedCategory)" class="favourite_posts">
                <h3 class="margin-side">Объявления</h3>
                <div v-if="!data.post?.length" class="posts_main_nothing">Тут пока что ничего нет...</div>
                <div v-else class="home_block_posts_container">
                    <post-block :object="post" v-for="post in data.post"/>
                </div>
            </div>
            <div v-if="['all', 'service'].includes(selectedCategory)" class="favourite_services">
                <h3 class="margin-side">Услуги</h3>
                <div v-if="!data.service?.length" class="posts_main_nothing">Тут пока что ничего нет...</div>
                <div v-else class="home_block_posts_container">
                    <post-block :object="post" type="service" v-for="post in data.service"/>
                </div>
            </div>
            <div v-if="data.event?.length" class="favourite_events margin-side">
                <h3>Мероприятия</h3>
                <div class="myevents_main">
                    <!--                <event-block event="" />-->
                </div>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>