<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostBlock from "@/components/PostBlock.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import config from "@/config.json"
import axios from "axios";
import WallComponent from "@/components/WallComponent.vue";
import EventBlock from "@/components/EventBlock.vue";

export default {
    name: "MainView",
    components: {EventBlock, WallComponent, FooterComponent, PostBlock, HeaderComponent},
    data () {
        return {
            user: {},
            feed: {},
            freeze: false,

            mouseDown: false,
            startX: 0,
            scrollLeft: 0,
            selectedCategory: -1,
            isDragging: false,
            slider: '',
        }
    },
    async mounted () {
        window.addEventListener('mouseup', this.mouseup);
        window.addEventListener('mousemove', this.mousemove);

        document.body.style.backgroundColor = "#2D3014";
        axios.get(config.backend + "site/feed").then((response) => {
            this.feed = response.data;
        }).catch((error) => {
            if (error.response) {
                return alert (`An error occurred: ${error.message}`);
            }
        });
    },
    unmounted () {
        window.removeEventListener('mouseup', this.mouseup);
        window.removeEventListener('mousemove', this.mousemove);

        document.body.style.backgroundColor = "";
    },
    methods: {
        mousedown(ev, ref) {
            ev.preventDefault();
            this.slider = this.$refs[ref];

            this.mouseDown = true;
            this.startX = ev.pageX - this.slider.offsetLeft;
            this.scrollLeft = this.slider.scrollLeft;

            document.body.classList.add("grabbing");
        },
        mousemove(ev) {
            if (!this.mouseDown) return;

            if (Math.abs(ev.pageX - this.startX) > 5) {
                this.isDragging = true
            }

            ev.preventDefault();

            const x = ev.pageX - this.slider.offsetLeft;
            const walk = (x - this.startX) * 1; // 1 = чувствительность
            this.slider.scrollLeft = this.scrollLeft - walk;
        },
        mouseup(ev) {
            document.body.classList.remove("grabbing");

            this.mouseDown = false;
            setTimeout(() => {
                this.isDragging = false;
            }, 100);
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
        <main class="main_view">
            <section class="main_landing">
                <div class="main_landing_text">
                    <div class="main_landing_title">
                        <div class="main_landing_title_circle"></div>
                        <h1>Всё для охотника и его собаки в одном месте</h1>
                    </div>
                    <h3>Найдите партнёра для вязки, купите щенка или доверьте натаску профессионалам</h3>
                    <button @click="user === false ? $router.push('/login') : $router.push('/profile')">Начать</button>
                </div>
                <img src="/main_landing_photo.png" alt="">
            </section>
            <section class="main_popular">
                <div class="main_posts_header">
                    <h2>Популярное</h2>
                    <button @click="$router.push('/post')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="main_popular_list" ref="popularSlider" @mousedown.stop="mousedown($event, 'popularSlider')">
                    <post-block :object="pop" :type="pop.breed ? 'post' : 'service'" :isDragging="isDragging"
                                v-for="pop in feed.popular" @freeze="freeze = true" @unfreeze="freeze = false"/>
                </div>
                <button class="main_posts_phoneButton" @click="$router.push('/post')">
                    <div>
                        <div>Смотреть все</div>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </section>
            <section class="main_posts">
                <div class="main_posts_header">
                    <h2>Объявления</h2>
                    <button @click="$router.push('/post')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <h3>Продажа, покупка собак, щенки, предложения вязки, анонсы помёта</h3>
                <div class="main_posts_list" ref="postSlider" @mousedown.stop="mousedown($event, 'postSlider')">
                    <post-block :object="post" v-for="post in feed?.posts" :isDragging="isDragging"
                                @freeze="freeze = true" @unfreeze="freeze = false"/>
                </div>
                <button class="main_posts_phoneButton" @click="$router.push('/post')">
                    <div>
                        <div>Смотреть все</div>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </section>
            <section class="main_posts">
                <div class="main_posts_header">
                    <h2>Услуги</h2>
                    <button @click="$router.push('/service')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <h3>Полный спектр услуг для охотника и его собаки: консультации кинолога, помощь в выборе щенка, организация вязки, профессиональная натаска, советы по содержанию и ветеринарии.</h3>
                <div class="main_posts_list" ref="serviceSlider" @mousedown.stop="mousedown($event, 'serviceSlider')">
                    <post-block :object="service" type="service" v-for="service in feed?.services" :isDragging="isDragging"
                                @freeze="freeze = true" @unfreeze="freeze = false"/>
                </div>
                <button class="main_posts_phoneButton" @click="$router.push('/service')">
                    <div>
                        <div>Смотреть все</div>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </section>
            <section class="main_posts">
                <div class="main_posts_header">
                    <h2>Мероприятия</h2>
                    <button @click="$router.push('/event')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <h3>Продажа, покупка собак, щенки, предложения вязки, анонсы помёта</h3>
                <div class="main_posts_list" ref="eventSlider" @mousedown.stop="mousedown($event, 'eventSlider')">
                    <event-block :event="event" v-for="event in feed?.events" :isDragging="isDragging"
                                 @freeze="freeze = true" @unfreeze="freeze = false"/>
                </div>
                <button class="main_posts_phoneButton" @click="$router.push('/event')">
                    <div>
                        <div>Смотреть все</div>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </section>
<!--            <section class="main_wall">-->
<!--                <wall-component v-for="el in 3"/>-->
<!--            </section>-->
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>