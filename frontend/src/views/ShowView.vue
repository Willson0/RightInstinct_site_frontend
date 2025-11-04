<script>
import headerComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";
import config from "@/config.json";
import {complain, copy, favourite, notify, whatError} from "@/utils.js";
import RatingBlock from "@/components/RatingBlock.vue";
import Placeholder from "@/components/Placeholder.vue";
import PhotoSlider from "@/components/PhotoSlider.vue";
import UserBlock from "@/components/UserBlock.vue";
export default {
    name: "ShowView",
    components: {
        UserBlock,
        PhotoSlider,
        Placeholder,
        RatingBlock,
        FooterComponent,
        headerComponent
    },
    data () {
        return {
            type: "post",
            id: 0,
            object: {},
            config: config,
            startIndex: null,
            isLoading: {status: false},
        }
    },
    async mounted () {
        this.setBackground();
        window.addEventListener('resize', this.setBackground)

        this.type = this.$route.params.type;
        if (!['post', 'service', 'event'].includes(this.type)) this.type = "post";

        this.id = Number(this.$route.params.id);
        if (!this.id || this.id <= 0) window.location.href = "/";

        await this.fetchData();
    },
    unmounted () {
        document.body.style.backgroundColor = "";
        window.removeEventListener("resize", this.setBackground);
    },
    methods: {
        favourite,
        copy,
        complain,
        async fetchData () {
            await axios.get(config.backend + this.type + "/" + this.id).then((response) => {
                this.object = response.data;
            }).catch((error) => {
                notify(whatError(error), 1);
            })
        },
        setBackground () {
            if (window.innerWidth <= 850) document.body.style.backgroundColor = "#F1EBD8";
            else document.body.style.backgroundColor = "";
        },
        async deletePost (id) {
            const enums = {
                "post": {translate: 'объявление', my: 'posts'},
                "service": {translate: 'услугу', my: 'services'},
            }

            const name = this.user.my[enums[this.type].my].find(el => el.id === id).title;
            if (confirm(`Вы уверены, что хотите удалить ${enums[this.type].translate} \"${name}\"?`)) {
                await axios.post(config.backend + this.type + "/" + id + "/delete")
                    .then((response) => {
                        notify("Удаление успешно завершено!");
                        this.user.my[enums[this.type].my] =
                            this.user.my[enums[this.type].my].filter(el => el.id !== id);
                    }).catch((error) => notify(whatError(error), 1));
            }
        },
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
        my () {
            if (!this.user.id) return false;
            return this.user?.id === this.object?.user_id;
        },
        beautifullyPrice () {
            if (this.object?.price === -1) return "Договорная";
            return this.object?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " ₽";
        },
        beautifullyDate () {
            if (this.type !== "event" || !this.object.id) return;

            let startDate = new Date(this.object.start_date);
            let endDate = new Date(this.object.end_date);

            const months = ["января","февраля","марта","апреля","мая","июня","июля","августа",
                "сентября","октября","ноября","декабря"]

            if (startDate.getYear() === endDate.getYear())
                return (String(startDate.getDate()).padStart(2, "0") + " "
                    + months[startDate.getMonth()] + " - "
                    + String(endDate.getDate()).padStart(2, "0")
                    + " " + months[startDate.getMonth()]
                    + " " + String(endDate.getFullYear()).padStart(2,"0")) + " г."
        },
    }
}
</script>

<template>
    <PhotoSlider @close="startIndex=null" v-if="startIndex !== null" :images="object.pictures.map(item => item.url)" :start-index="startIndex" />
    <div class="container">
        <header-component />
        <main class="show">
            <section class="show_text">
                <div class="show_text_title">
                    <h1 v-if="object.id">{{ object.title }}</h1>
                    <placeholder :onUser="false" v-else width="465" height="59"/>

                    <rating-block v-if="object.id" @rated="fetchData" :id="id" :rating="object.rating" :type="type"/>
                    <placeholder :onUser="false" v-else width="42" height="24" class="rating"/>
                </div>
                <div class="show_text_breed" v-if="['post'].includes(type)">{{ object.breed?.name }}</div>
                <div class="show_text_addiction">
                    <div v-if="['post'].includes(type)" class="show_text_addiction_age">
                        <img :src="object.gender ? '/male.svg' : '/female.svg'" alt="">
                        <div class="input">{{ object.age }} {{ object.is_old ? 'лет' : 'месяцев' }}</div>
                    </div>
                    <template v-if="['service'].includes(type)">
                        <h4 v-if="object.id" class="show_text_addiction_category">
                            {{ object.category?.name }}
                        </h4>
                        <placeholder :onUser="false" v-else width="73" height="28"/>
                    </template>
                    <div v-if="object.id" class="show_text_addiction_location">
                        <img src="/location.svg" alt="">
                        <div class="input">{{ object.city?.name }}</div>
                    </div>
                    <placeholder :onUser="false" v-else width="82" height="28"/>
                </div>
                <div v-if="['post'].includes(type) && object.rewards != null" class="show_text_rewards">
                    <img src="/star.svg" alt="">
                    <div>{{ object.rewards }}</div>
                </div>
                <div v-if="object.id" class="show_text_description" lang="ru">
                    {{ object.description }}
                </div>
                <div v-else class="placeholder show_text_description" style="height: 48px;" ></div>
                <template v-if="['post', 'service'].includes(type)">
                    <div @click="$router.push('/user/' + object.user.id)" v-if="object.user" class="show_text_user">
                        <img :src="object.user.avatar" alt="">
                        <div>
                            <h3>Хозяин</h3>
                            <span>{{ object.user.fullname }}</span>
                        </div>
                    </div>
                    <placeholder width="120" height="46" :on-user="false" v-else class="show_text_user"/>
                </template>
                <div class="show_text_buttons">
                    <div class="button" v-if="['post', 'service'].includes(type)"><h3>{{ beautifullyPrice }}</h3></div>
                    <div class="show_text_buttons_dates button" v-else>
                        <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.08325 7.91675H17.9166V16.6667C17.9166 17.127 17.5435 17.5001 17.0833 17.5001H2.91659C2.45635 17.5001 2.08325 17.127 2.08325 16.6667V7.91675Z" stroke="#222B1B" stroke-width="1.5" stroke-linejoin="round"/>
                                <path d="M2.08325 3.75008C2.08325 3.28984 2.45635 2.91675 2.91659 2.91675H17.0833C17.5435 2.91675 17.9166 3.28984 17.9166 3.75008V7.91675H2.08325V3.75008Z" stroke="#222B1B" stroke-width="1.5" stroke-linejoin="round"/>
                                <path d="M6.66675 1.66675V5.00008" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.3333 1.66675V5.00008" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.6667 14.1667H14.1667" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.83325 14.1667H8.33325" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.6667 10.8333H14.1667" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.83325 10.8333H8.33325" stroke="#222B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div>{{ beautifullyDate }}</div>
                        </div>
                    </div>
                    <template v-if="!my && user !== false">
                        <button @click.stop="favourite(!user?.favourites[type]?.includes(object.id), type, object.id, isLoading, user)">
                            <img v-if="user?.favourites?.[type]?.includes(object.id)"
                                 src="/like_active.svg" style="width:24px; height: 24px;" alt="">
                            <img style="width: unset; height: unset" v-else src="/like.svg" alt="">
                        </button>
                        <button @click.stop="copy(config.frontend + `show/${type}/${id}`)"><img style="width: 24px; height: 24px;" src="/share.svg" alt=""></button>
                    </template>
                    <template v-else-if="user !== false">
                        <button @click="copy(config.frontend + `show/${type}/${id}`)"><img style="width: 24px; height: 24px;" src="/share.svg" alt=""></button>
                        <button @click="$router.push(`/update/${type}/${id}`)">
                            <img style="width: 24px; height: 24px;" src="/edit.svg" alt="">
                        </button>
                        <button @click="deletePost(object.id)"><img style="width: 24px; height: 24px;" src="/trash.svg" alt=""></button>
                    </template>
                </div>
                <button v-if="!my && user !== false" class="button" @click="$router.push('/chats?id=' + object.user?.id)">Связаться с продавцом</button>
                <a v-if="!my && user !== false" @click="complain(type, object.id)" class="postOverlay_main_complain">Пожаловаться</a>
            </section>
            <section class="show_pictures">
                <template v-if="object.id">
                    <div>
                        <a target="_blank" :href="object.link">
                            <img @click="object.link ? '' : startIndex = 0" :src="config.storage + object?.pictures?.[0]?.url" alt="">
                            <img v-if="object.link" class="show_text_photos_video" src="/play.svg">
                        </a>
                    </div>
                    <img @click="startIndex = index+1" v-for="(img, index) in object.pictures?.slice(1)" :src="config.storage + img.url" alt="">
                </template>
                <placeholder :onUser="false" v-else width="312" height="235" v-for="el in 2"/>
            </section>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>