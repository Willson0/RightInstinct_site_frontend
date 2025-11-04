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

export default {
    name: "PostsView",
    components: {Placeholder, PaginationComponent, PostBlock, FooterComponent, HeaderComponent, ElSlider},
    data () {
        return {
            feed: false,
            isLoaded: false,
            categories: [],
            selectedCategory: null,
            filter: {},
            data: {},
            isLoading: false,
            cityString: "",
            page: 1,
            pageCount: 0,
            isMy: false,
            type: "",
        }
    },
    async mounted () {
        if (this.$route.query.my !== undefined) this.isMy = true;

        if (this.$route.path === '/service') this.type = "service";
        else this.type = "post";

        await axios.get(config.backend + "data").then((response) => {
            this.data = response.data;
            if (this.type === "post")
                this.categories = response.data.categories;
            else if (this.type === "service")
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
        hideOverlay,
        showOverlay,
        hideList,
        openList,
        async fetchData () {
            if (this.isLoading) return;
            this.isLoading = true;

            let query = config.backend + this.type + "?offset=" + (this.page - 1)*9 + "&limit=9";
            if (this.isMy) query += "&my=true";
            if (this.selectedCategory) query += "&category=" + this.selectedCategory;
            if (this.filter.search) query += "&s=" + this.filter.search;
            if (this.filter.age) {
                query += "&age_from=" + this.filter.age[0];
                query += "&age_to=" + this.filter.age[1];
            }
            for (let keyFilter in this.filter)
                query += `&${keyFilter}=` + this.filter[keyFilter];

            let city = this.data.cities.find(el => el.name.toLowerCase() === this.cityString.toLowerCase())?.id;
            if (city) query += `&city=` + city;

            await axios.get(query).then((response) => {
                this.feed = response.data;
            }).finally(() => {
                hideOverlay('posts_filter_overlay');
                this.isLoading = false;
            })
        },
        foc (event) {
            let el = event.target.closest('div');
            el.style.border = '1px solid #415134';
            el.style.backgroundColor = '#f8fff4';
        },
        bl (event) {
            let el = event.target.closest('div');
            el.style.border = '';
            el.style.backgroundColor = '';
        },
        inp () {
            this.page = 1;
            this.fetchData();
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="posts_view">
            <div class="posts_header">
                <h1>{{ type === "service" ? 'Услуги' : 'Объявления' }}</h1>
                <div>
                    <div class="posts_header_search">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z" stroke="#222B1B" stroke-width="2" stroke-linejoin="round"/>
                            <path d="M13.3287 7.17155C12.6049 6.4477 11.6049 6 10.5003 6C9.39572 6 8.39573 6.4477 7.67188 7.17155" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.6094 16.6108L20.852 20.8535" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input v-model="filter.search" @input="inp" @focus="foc" @blur="bl" type="text" placeholder="Найти...">
                    </div>
                    <button @click="showOverlay('posts_filter_overlay')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L10.2 12.9089V19.2222L13.8 21V12.9089L21 4.5H3Z" stroke="#222B1B" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button v-if="user" class="posts_header_add" @click="$router.push('/store?type=post')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.03 5L12.0117 19" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 12H19" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="posts_categories">
                <button v-for="cat in categories" :class="{'active': selectedCategory === cat.id}"
                @click="selectedCategory === cat.id ? selectedCategory = null : selectedCategory = cat.id">
                    {{ cat.name }}
                </button>
            </div>
            <div class="posts_list">
                <div v-for="el in 3" class="placeholder" v-if="feed === false" style="width: 234px; height: 299px;"></div>
                <post-block v-for="obj in feed" :type="type" :object="obj" @delete="fetchData"/>
                <div v-if="feed.length === 0">Тут пока что ничего нет...</div>
            </div>
            <pagination-component :page="page" :count="pageCount" @selected="page = $event; fetchData()"/>
        </main>
    </div>
    <footer-component />
    <div class="background posts_filter_overlay" @click="hideOverlay('posts_filter_overlay')" style="display: none"></div>
    <div class="overlay posts_filter_overlay filter" style="display: none">
        <div class="posts_filter_header">
            <h2>Фильтровать</h2>
            <svg @click="hideOverlay('posts_filter_overlay')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L20 20" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 20L20 4" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="filter_container">
            <div style="z-index:11" class="store_input_select_container">
                <div ref="breed" @click="openList" class="store_input_select">
                    <div class="store_input_select_main">
                        <div v-if="!filter.breed">Порода</div>
                        <div v-else>{{ data.breeds.find(el => el.id === filter.breed).name }}</div>
                        <img class="store_input_select_triangle" src="/triangle.svg" alt="">
                    </div>
                </div>
                <div class="store_input_select_list">
                    <div v-for="br in data.breeds" @click="filter.breed = br.id; hideList($event)">
                        <div>{{ br.name }}</div>
                    </div>
                </div>
            </div>
            <div style="z-index:10" class="store_input_container">
                <div class="store_input_select_container">
                    <div ref="gender" @click="openList" class="store_input_select">
                        <div class="store_input_select_main">
                            <div v-if="filter.gender == null">Пол</div>
                            <div v-else-if="filter.gender === 0">
                                <img src="/female.svg" alt="">
                                <div>Сука</div>
                            </div>
                            <div v-else-if="filter.gender === 1">
                                <img src="/male.svg" alt="">
                                <div>Кобель</div>
                            </div>
                            <img class="store_input_select_triangle" src="/triangle.svg" alt="">
                        </div>
                    </div>
                    <div class="store_input_select_list">
                        <div @click="filter.gender = 0; hideList($event)">
                            <img src="/female.svg" alt="">
                            <div>Сука</div>
                        </div>
                        <div @click="filter.gender = 1; hideList($event)">
                            <img src="/male.svg" alt="">
                            <div>Кобель</div>
                        </div>
                    </div>
                </div>
                <div class="store_input_select_container">
                    <div ref="category" class="store_input_select_container">
                        <div @click="openList" class="store_input_select">
                            <div class="store_input_select_main">
                                <div v-if="!filter.category">Категория</div>
                                <div v-else>{{categories.find(el => el.id === filter.category).name}}</div>
                                <img class="store_input_select_triangle" src="/triangle.svg" alt="">
                            </div>
                        </div>
                        <div class="store_input_select_list">
                            <div v-for="catg in categories" @click="filter.category = catg.id; hideList($event)">
                                <div>{{ catg.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="z-index:5" class="store_input_select_container">
                <div ref="city" @click="openList($event, 'city_string');" class="store_input_select">
                    <div class="store_input_select_main">
                        <input type="text" v-model="cityString" style="padding: 0; border: 0;" id="city_string"
                               :placeholder="!['event'].includes(type) ? 'Город' : 'Место проведения'" >
                        <img class="store_input_select_triangle" src="/triangle.svg" alt="">
                    </div>
                </div>
                <div class="store_input_select_list" v-if="data.cities">
                    <div v-for="ct in data.cities?.filter(el => el.name?.toLowerCase()?.includes(cityString.toLowerCase()))" @click="cityString = ct.name; hideList($event)">
                        <div>{{ ct.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter_age">
            <div class="filter_age_title">Возраст</div>
            <div class="slider-wrapper">
                <el-slider
                    v-model="filter.age"
                    :min="0"
                    :max="120"
                    :step="1"
                    range
                    :show-tooltip="false"
                    class="custom-slider"
                    height="12px"
                />
            </div>
            <div class="filter_age_sign">
                <div>0</div>
                <div>10 лет</div>
            </div>
        </div>
        <div class="filter_price_container">
            <h3>Цена</h3>
            <div style="z-index:4" class="store_input_container">
                <input ref="price" v-model="filter.price_from" type="number" placeholder="от">
                <input ref="price" v-model="filter.price_to" type="number" placeholder="до">
            </div>
        </div>
        <div class="filter_checkbox_container" :class="{'active': filter.rating}">
            <div @click="filter.rating = !filter.rating ?? true"  class="filter_checkbox">
                <img src="/check.svg" alt="">
            </div>
            <div @click="filter.rating = !filter.rating ?? true" class="filter_checkbox_text">Рейтинг выше 4</div>
        </div>
        <div class="filter_checkbox_container" :class="{'active': filter.isNew}">
            <div @click="filter.isNew = !filter.isNew ?? true"  class="filter_checkbox">
                <img src="/check.svg" alt="">
            </div>
            <div @click="filter.isNew = !filter.isNew ?? true" class="filter_checkbox_text">Сначала новые</div>
        </div>
        <button @click="feed = false; fetchData(); hideOverlay('posts_filter_overlay')" class="button">Применить</button>
    </div>
</template>

<style scoped>

</style>