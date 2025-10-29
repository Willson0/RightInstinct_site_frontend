<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import WallComponent from "@/components/WallComponent.vue";
import axios from 'axios';
import config from "@/config.json";
import {favourite, notify, whatError} from "@/utils.js";
import RatingBlock from "@/components/RatingBlock.vue";
import PostBlock from "@/components/PostBlock.vue";
import EventBlock from "@/components/EventBlock.vue";
import Placeholder from "@/components/Placeholder.vue";

export default {
    name: "UserView",
    components: {Placeholder, EventBlock, PostBlock, RatingBlock, WallComponent, FooterComponent, HeaderComponent},
    data () {
        return {
            us: {},
            isLoaded: false,
            isLoading: false,
            isLoadingLike: {status: false},
            type: "user",

            mouseDown: false,
            startX: 0,
            scrollLeft: 0,
            selectedCategory: -1,
            isDragging: false,
            slider: '',
        }
    },
    async mounted () {
        document.body.style.backgroundColor = "#F1EBD8";
        window.addEventListener('mouseup', this.mouseup);
        window.addEventListener('mousemove', this.mousemove);

        if (Number(this.$route.params.id) === this.user.id) this.$router.push("/profile");
        else
            await axios.post(config.backend + "user/" + this.$route.params.id)
            .then((response) => {
                this.us = response.data;
                this.isLoaded = true;
            }).catch((error) => notify(whatError(error), 1))
    },
    unmounted () {
        document.body.style.backgroundColor = "";
        window.removeEventListener('mouseup', this.mouseup);
        window.removeEventListener('mousemove', this.mousemove);
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
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
        favourite,
        async subscribe (status = 1) {
            if (this.isLoading) return;

            this.us.isSubscribe = !this.us.isSubscribe;

            this.isLoading = true;
            await axios.post(config.backend + "subscription/" + (status ? 'subscribe' : 'unsubscribe'), {
                "user_subscription_id": this.us.id,
            }).then((response) => {
                notify(`Вы успешно ${status ? "подписались" : "отписались"} на ${this.us.fullname}!`);

                axios.post(config.backend + "auth/profile")
                .then((resp) => this.$store.dispatch("updateUser", resp.data));
            }).catch((error) => notify(whatError(error), 1))
            .finally(() => this.isLoading = false)
        },
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="user_view">
            <section class="user_info">
                <div class="user_info_user">
                    <img :src="us.avatar" alt="Аватарка пользователя">
                    <div class="user_info_main">
    <!--                    <div class="user_info_main_status">Охотник</div>-->
                        <div v-if="!isLoaded" class="placeholder" style="width: 390px; height: 59px;"></div>
                        <h1 v-else>{{ us.fullname }}</h1>

                        <div v-if="!isLoaded" class="placeholder" style="width: 29px; height: 19px;"></div>
                        <div class="user_info_main_city" v-else-if="us.city">{{ us.city.name }}</div>

                        <div v-if="!isLoaded" class="placeholder" style="width: 43px; height: 24px;"></div>
                        <rating-block v-else-if="us.rating" type="user" :rating="us.rating" :id="us.id" />
                    </div>
                </div>
                <div class="user_info_buttons">
                    <button @click="$router.push('/chats?id=' + us.id)">
                        <div>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 12C22.5 17.5229 18.0229 22 12.5 22C9.51327 22 2.5 22 2.5 22C2.5 22 2.5 14.5361 2.5 12C2.5 6.47715 6.97717 2 12.5 2C18.0229 2 22.5 6.47715 22.5 12Z" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.5 9H16.5" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.5 13H16.5" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.5 17H12.5" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div>Написать</div>
                        </div>
                    </button>
                    <button @click.stop="favourite(!user?.favourites[type]?.includes(us.id), 'user', us.id, isLoadingLike, user)">
                        <div>
                            <img height="24" width="24" v-if="user && user.favourites && user.favourites[type] && user?.favourites[type]?.includes(us.id)"
                                 src="/like_active.svg"  alt="">
                            <svg v-else width="24" height="24" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333374 6.37306C0.333374 2.7724 3.49223 0 7.20004 0C9.11134 0 10.7932 0.896185 12 2.05578C13.2069 0.896185 14.8887 0 16.8 0C20.5078 0 23.6667 2.7724 23.6667 6.37306C23.6667 8.83956 22.6149 11.0086 21.1576 12.8421C19.7029 14.6723 17.8 16.2257 15.978 17.488C15.2821 17.9701 14.5781 18.4148 13.9337 18.743C13.3287 19.0511 12.633 19.3333 12 19.3333C11.367 19.3333 10.6714 19.0511 10.0663 18.743C9.42201 18.4148 8.71799 17.9701 8.02208 17.488C6.20011 16.2257 4.2972 14.6723 2.84247 12.8421C1.38521 11.0086 0.333374 8.83956 0.333374 6.37306ZM7.20004 2C4.42771 2 2.33337 4.0388 2.33337 6.37306C2.33337 8.24439 3.12776 9.98667 4.40816 11.5976C5.69108 13.2117 7.41727 14.6359 9.16103 15.8439C9.82086 16.3011 10.4424 16.69 10.974 16.9608C11.5449 17.2515 11.8756 17.3333 12 17.3333C12.1245 17.3333 12.4552 17.2515 13.0261 16.9608C13.5577 16.69 14.1792 16.3011 14.8391 15.8439C16.5828 14.6359 18.309 13.2117 19.5919 11.5976C20.8723 9.98666 21.6667 8.24439 21.6667 6.37306C21.6667 4.0388 19.5724 2 16.8 2C15.2078 2 13.7211 2.95123 12.7928 4.15856C12.6035 4.40475 12.3106 4.54902 12 4.54902C11.6895 4.54902 11.3966 4.40475 11.2073 4.15856C10.279 2.95123 8.79224 2 7.20004 2Z" fill="#222B1B"/>
                            </svg>
                            <div v-if="user && user.favourites && user.favourites[type] && user?.favourites[type]?.includes(us.id)"><span>Убрать </span>из избранного</div>
                            <div v-else><span>Добавить </span>в избранное</div>
                        </div>
                    </button>
                    <button @click="subscribe(us.isSubscribe ? 0 : 1)">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0303 5L12.012 19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 12H19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div v-if="us.isSubscribe">Отписаться</div>
                            <div v-else>Подписаться</div>
                        </div>
                    </button>
                </div>
            </section>
            <div>
                <section class="user_content">
                    <aside v-if="us.posts?.length || !isLoaded">
                        <h2>Объявления</h2>
                        <div class="user_content_list" ref="postSlider" @mousedown.stop="mousedown($event, 'postSlider')">
                            <div v-for="el in 2" class="placeholder" style="min-width: 234px; width: 234px; height: 299px" v-if="!isLoaded"></div>
                            <PostBlock v-else :object="post" v-for="post in us.posts" :isDragging="isDragging"/>
                        </div>
                        <button @click="$router.push('/post')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </aside>
                    <aside v-if="us.services?.length || !isLoaded">
                        <h2>Услуги</h2>
                        <div class="user_content_list" ref="serviceSlider" @mousedown.stop="mousedown($event, 'serviceSlider')">
                            <div v-for="el in 2" class="placeholder" style="min-width: 234px; width: 234px; height: 299px" v-if="!isLoaded"></div>
                            <PostBlock v-else :object="service" type="service" v-for="service in us.services" :isDragging="isDragging"/>
                        </div>
                        <button @click="$router.push('/service')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </aside>
                    <aside v-if="us.events?.length || !isLoaded">
                        <h2>Мероприятия</h2>
                        <div class="user_content_list" ref="eventSlider" @mousedown.stop="mousedown($event, 'eventSlider')">
                            <div v-for="el in 2" class="placeholder" style="min-width: 234px; width: 234px; height: 289px" v-if="!isLoaded"></div>
                            <event-block v-else v-for="event in us.events" :event="event" :isDragging="isDragging"/>
                        </div>
                        <button @click="$router.push('/event')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </aside>
                </section>
                <section class="user_wall">
                    <div class="user_wall_filler">
                        <div>Тут пока что ничего нет...</div>
                    </div>
<!--                    <wall-component />-->
                </section>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>