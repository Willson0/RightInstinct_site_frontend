<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import UserBlock from "@/components/UserBlock.vue";
import axios from 'axios';
import config from '@/config.json';
import PostBlock from "@/components/PostBlock.vue";

export default {
    name: "FavouriteView",
    components: {PostBlock, UserBlock, FooterComponent, HeaderComponent},
    data () {
        return {
            links: [
                ['/favourite', 'Все'],
                ['/favourite/users', 'Владельцы'],
                ['/favourite/posts', 'Объявления'],
                ['/favourite/services', 'Услуги'],
                ['/favourite/events', 'Мероприятия'],
            ],
            data: {},
        }
    },
    async mounted () {
        await axios.post(config.backend + "favourite/index").then((response) => {
            this.data = response.data;
        }).catch((error) => {
            if (error.response) {
                return alert (`An error occurred: ${error.message}`);
            }
        });
    },
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
        <main class="favourite_view">
            <h1>Избранное</h1>
            <nav class="favourite_navigation">
                <button :class="{'active': $route.path === link[0]}"
                        @click="$router.push(link[0])"
                        v-for="link in links">{{ link[1] }}</button>
            </nav>
            <section v-if="data.user?.length" class="favourite_view_users">
                <h2>Владельцы</h2>
                <div>
                    <user-block :user="object" v-for="object in data.user" />
                </div>
            </section>
            <section v-if="data.post?.length">
                <h2>Объявления</h2>
                <div>
                    <post-block :object="post" v-for="post in data.post"/>
                </div>
            </section>
            <section v-if="data.service?.length">
                <h2>Услуги</h2>
                <div>
                    <post-block :object="post" type="service" v-for="post in data.service"/>
                </div>
            </section>
            <section v-if="data.event?.length">
                <h2>Мероприятия</h2>
                <div>
<!--                    <user-block :user="object" v-for="object in data.user" />-->
                </div>
            </section>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>