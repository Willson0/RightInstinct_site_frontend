<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";
import config from "@/config.json";
import PostBlock from "@/components/PostBlock.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import Placeholder from "@/components/Placeholder.vue";
import {hideList, hideOverlay, openList, showOverlay} from "@/utils.js";
import { ElSlider } from "element-plus";
import "element-plus/dist/index.css"
import EventBlock from "@/components/EventBlock.vue";

export default {
    name: "PostsView",
    components: {EventBlock, Placeholder, PaginationComponent, PostBlock, FooterComponent, HeaderComponent, ElSlider},
    data () {
        return {
            feed: false,
            categories: [],
            selectedCategory: null,
            filter: {},
            data: {},
            isLoading: false,
            cityString: "",
            page: 1,
            pageCount: 0,
            isMy: false,
        }
    },
    async mounted () {
        if (this.$route.query.my !== undefined) this.isMy = true;

        await axios.get(config.backend + "data").then((response) => {
            this.data = response.data;
            if (this.$route.path === '/post')
                this.categories = response.data.categories;
            else if (this.$route.path === "/service")
                this.categories = response.data.types;

            let count = this.data.count[String(this.$route.path).split('/')[1]];
            this.pageCount = Math.ceil(count / 9);
        });
        await this.fetchData();
    },
    watch: {
        async selectedCategory () {
            await this.fetchData();
        }
    },
    methods: {
        async fetchData () {
            if (this.isLoading) return;
            this.isLoading = true;

            let query = config.backend + "event?offset=" + (this.page - 1)*9 + "&limit=9";
            if (this.isMy) query += "&my=true";

            await axios.get(query).then((response) => {
                this.feed = response.data;
            }).finally(() => {
                this.isLoading = false;
            })
        },
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
        <main class="posts_view">
            <div class="posts_header">
                <h1>Мероприятия</h1>
                <div class="events_header_button" v-if="user">
                    <button class="posts_header_add" @click="$router.push('/store?type=event')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.03 5L12.0117 19" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 12H19" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="posts_list events_list">
                <div v-for="el in 2" class="placeholder" v-if="feed === false" style="width: 234px; height: 299px;"></div>
                <event-block v-for="obj in feed" :event="obj" />
                <div v-if="feed.length === 0">Тут пока что ничего нет...</div>
            </div>
            <pagination-component :page="page" :count="pageCount" @selected="page = $event; fetchData()"/>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>