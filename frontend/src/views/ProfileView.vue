<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import RatingBlock from "@/components/RatingBlock.vue";
import EventBlock from "@/components/EventBlock.vue";
import config from "@/config.json";
import axios from 'axios';
import PostBlock from "@/components/PostBlock.vue";
import Placeholder from "@/components/Placeholder.vue";
import {toLink} from "@/utils.js";

export default {
    name: "ProfileView",
    components: {Placeholder, PostBlock, EventBlock, RatingBlock, FooterComponent, HeaderComponent},
    data () {
        return {
            user: {},
        }
    },
    async mounted () {
        document.body.style.backgroundColor = "#F1EBD8";
        this.checkReg(this.user);
    },
    unmounted () {
        document.body.style.backgroundColor = "";
    },
    methods: {
        toLink,
        getCookie () {
            axios.post(config.backend + "site/test");
        },
        checkReg (val) {
            if (val === false) this.$router.push('/login');
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
    },
    watch: {
        '$store.state.user' (val) {
            this.checkReg(val);
        }
    }
}
</script>

<template>
<!--    <button @click="getCookie">GET COOKIE</button>-->
    <div class="container">
        <header-component />
        <main class="profile_view">
            <section class="profile_info">
                <div class="profile_info_header">
                    <h1>Личный кабинет</h1>
                    <div class="profile_info_header_buttons">
                        <button @click="$router.push('/notifications')">
                            <div>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1249_10650)">
                                        <path d="M17.3333 8.7C17.3333 7.32087 16.7714 5.99823 15.7712 5.02304C14.771 4.04786 13.4145 3.5 12 3.5C10.5855 3.5 9.22896 4.04786 8.22876 5.02304C7.22857 5.99823 6.66667 7.32087 6.66667 8.7C6.66667 14.7667 4 17.5 4 17.5H20C20 17.5 17.3333 14.7667 17.3333 8.7Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 20.5C13.7968 20.8042 13.505 21.0566 13.154 21.2321C12.803 21.4076 12.4051 21.5 12 21.5C11.5949 21.5 11.197 21.4076 10.846 21.2321C10.495 21.0566 10.2032 20.8042 10 20.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="18" cy="4.5" r="4" fill="#DD1117"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1249_10650">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div>Уведомления</div>
                            </div>
                        </button>
                        <button @click="$router.push('/chats')">
                            <div>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12.5C22 18.0229 17.5229 22.5 12 22.5C9.01327 22.5 2 22.5 2 22.5C2 22.5 2 15.0361 2 12.5C2 6.97715 6.47717 2.5 12 2.5C17.5229 2.5 22 6.97715 22 12.5Z" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 9.5H16" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13.5H16" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17.5H12" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div>Чат</div>
                            </div>
                        </button>
                        <button @click="$router.push('/settings')">
                            <div>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.1419 22.0854C7.46635 21.5866 5.9749 20.6604 4.79393 19.4333C5.2345 18.9111 5.5 18.2365 5.5 17.4998C5.5 15.843 4.15685 14.4998 2.5 14.4998C2.39977 14.4998 2.3007 14.5048 2.203 14.5144C2.0699 13.8636 2 13.1899 2 12.4998C2 11.4545 2.16039 10.4467 2.4579 9.49951C2.47191 9.49971 2.48594 9.49981 2.5 9.49981C4.15685 9.49981 5.5 8.15666 5.5 6.49981C5.5 6.02416 5.3893 5.57441 5.1923 5.17481C6.34875 4.09951 7.76025 3.29477 9.32605 2.86133C9.8222 3.83385 10.8333 4.49982 12 4.49982C13.1667 4.49982 14.1778 3.83385 14.674 2.86133C16.2398 3.29477 17.6512 4.09951 18.8077 5.17481C18.6107 5.57441 18.5 6.02416 18.5 6.49981C18.5 8.15666 19.8432 9.49981 21.5 9.49981C21.5141 9.49981 21.5281 9.49971 21.5421 9.49951C21.8396 10.4467 22 11.4545 22 12.4998C22 13.1899 21.9301 13.8636 21.797 14.5144C21.6993 14.5048 21.6002 14.4998 21.5 14.4998C19.8432 14.4998 18.5 15.843 18.5 17.4998C18.5 18.2365 18.7655 18.9111 19.2061 19.4333C18.0251 20.6604 16.5336 21.5866 14.8581 22.0854C14.4714 20.8758 13.338 19.9998 12 19.9998C10.662 19.9998 9.5286 20.8758 9.1419 22.0854Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                    <path d="M12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10.567 13.933 9 12 9C10.067 9 8.5 10.567 8.5 12.5C8.5 14.433 10.067 16 12 16Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                </svg>
                                <div>Настройки</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="profile_info_user">
                    <svg v-if="!Object.keys(user).length" width="100" height="100">
                        <rect width="100" height="100" fill="#d1d1d1"/>
                    </svg>
                    <img v-else-if="user.avatar" :src="user.avatar" alt="Аватарка пользователя">
                    <svg @click="$router.push('/profile')" v-else width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="22" fill="#787D46"/>
                        <path d="M22 20C23.933 20 25.5 18.433 25.5 16.5C25.5 14.567 23.933 13 22 13C20.067 13 18.5 14.567 18.5 16.5C18.5 18.433 20.067 20 22 20Z" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 30.4V31H31V30.4C31 28.1598 31 27.0397 30.5641 26.184C30.1806 25.4314 29.5686 24.8195 28.816 24.436C27.9603 24 26.8402 24 24.6 24H19.4C17.1598 24 16.0397 24 15.1841 24.436C14.4314 24.8195 13.8195 25.4314 13.436 26.184C13 27.0397 13 28.1598 13 30.4Z" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <div class="profile_info_user_name">
                            <placeholder v-if="!user.id" width="193" height="29"/>
                            <template v-else-if="user.fullname?.length">{{ user.fullname }}</template>
                            <span v-else>Имя пользователя</span>
                        </div>
                        <placeholder v-if="!user.id" width="29" height="19"/>
                        <div class="profile_info_user_city" v-else>
                            <template v-if="user.city_id != null">{{ user.city.name }}</template>
                            <span v-else>Город</span>
                        </div>
                        <div class="profile_info_user_rating" v-if="Object.keys(user).length !== 0 && user.rating !== 0">
                            <img src="/star.svg" alt="">
                            <div class="grey-light">{{ user.rating }}</div>
                        </div>
                    </div>
                    <div class="profile_info_user_phoneButtons">
                        <button @click="$router.push('/notifications')">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1249_10650)">
                                        <path d="M17.3333 8.7C17.3333 7.32087 16.7714 5.99823 15.7712 5.02304C14.771 4.04786 13.4145 3.5 12 3.5C10.5855 3.5 9.22896 4.04786 8.22876 5.02304C7.22857 5.99823 6.66667 7.32087 6.66667 8.7C6.66667 14.7667 4 17.5 4 17.5H20C20 17.5 17.3333 14.7667 17.3333 8.7Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 20.5C13.7968 20.8042 13.505 21.0566 13.154 21.2321C12.803 21.4076 12.4051 21.5 12 21.5C11.5949 21.5 11.197 21.4076 10.846 21.2321C10.495 21.0566 10.2032 20.8042 10 20.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="18" cy="4.5" r="4" fill="#DD1117"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1249_10650">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                        </button>
                        <button @click="$router.push('/chats')">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12.5C22 18.0229 17.5229 22.5 12 22.5C9.01327 22.5 2 22.5 2 22.5C2 22.5 2 15.0361 2 12.5C2 6.97715 6.47717 2.5 12 2.5C17.5229 2.5 22 6.97715 22 12.5Z" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 9.5H16" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13.5H16" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17.5H12" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </button>
                        <button @click="$router.push('/settings')">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.1419 22.0854C7.46635 21.5866 5.9749 20.6604 4.79393 19.4333C5.2345 18.9111 5.5 18.2365 5.5 17.4998C5.5 15.843 4.15685 14.4998 2.5 14.4998C2.39977 14.4998 2.3007 14.5048 2.203 14.5144C2.0699 13.8636 2 13.1899 2 12.4998C2 11.4545 2.16039 10.4467 2.4579 9.49951C2.47191 9.49971 2.48594 9.49981 2.5 9.49981C4.15685 9.49981 5.5 8.15666 5.5 6.49981C5.5 6.02416 5.3893 5.57441 5.1923 5.17481C6.34875 4.09951 7.76025 3.29477 9.32605 2.86133C9.8222 3.83385 10.8333 4.49982 12 4.49982C13.1667 4.49982 14.1778 3.83385 14.674 2.86133C16.2398 3.29477 17.6512 4.09951 18.8077 5.17481C18.6107 5.57441 18.5 6.02416 18.5 6.49981C18.5 8.15666 19.8432 9.49981 21.5 9.49981C21.5141 9.49981 21.5281 9.49971 21.5421 9.49951C21.8396 10.4467 22 11.4545 22 12.4998C22 13.1899 21.9301 13.8636 21.797 14.5144C21.6993 14.5048 21.6002 14.4998 21.5 14.4998C19.8432 14.4998 18.5 15.843 18.5 17.4998C18.5 18.2365 18.7655 18.9111 19.2061 19.4333C18.0251 20.6604 16.5336 21.5866 14.8581 22.0854C14.4714 20.8758 13.338 19.9998 12 19.9998C10.662 19.9998 9.5286 20.8758 9.1419 22.0854Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                    <path d="M12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10.567 13.933 9 12 9C10.067 9 8.5 10.567 8.5 12.5C8.5 14.433 10.067 16 12 16Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                                </svg>
                        </button>
                    </div>
                </div>
            </section>
            <section class="profile_my">
                <div>
                    <h3>Мои оценки</h3>
                    <button @click="$router.push('/ratings')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <h3>Мои подписки</h3>
                    <div v-if="user.subscriptions && user.subscriptions?.length !== 0" class="profile_subscribers">
                        <div v-if="user.subscriptions?.length > 2"><div>{{ user.subscriptions?.length-2 }}+</div></div>
                        <img v-if="user.subscriptions?.length > 1" :src="user.subscriptions[1].user_subscription.avatar" alt="">
                        <img :src="user?.subscriptions[0]?.user_subscription.avatar" alt="">
                    </div>
                    <button @click="$router.push('/subscriptions')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <h3>Избранное</h3>
                    <button @click="$router.push('/favourites')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 18L14.5 12L8.5 6" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </section>
            <section class="profile_mypost">
                <div class="main_posts">
                    <div class="main_posts_header">
                        <h2>Мои объявления</h2>
                        <button @click="$router.push('/post?my')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="main_posts_list">
                        <post-block :object="object" v-for="object in user.my?.posts" :my="true"/>
                    </div>
                    <button class="main_posts_phoneButton" @click="$router.push('/post?my')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                    <button @click="$router.push('/store?type=post')">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.03 5L12.0117 19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 12H19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div>Разместить</div>
                        </div>
                    </button>
                </div>
                <div class="main_posts">
                    <div class="main_posts_header">
                        <h2>Мои услуги</h2>
                        <button @click="$router.push('/service?my')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="main_posts_list">
                        <post-block :object="object" v-for="object in user.my?.services" :my="true" type="service"/>
                    </div>
                    <button class="main_posts_phoneButton" @click="$router.push('/service?my')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                    <button @click="$router.push('/store?type=service')">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.03 5L12.0117 19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 12H19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div>Разместить</div>
                        </div>
                    </button>
                </div>
                <div class="main_posts">
                    <div class="main_posts_header">
                        <h2>Мои мероприятия</h2>
                        <button @click="$router.push('/event?my')">
                            <div>
                                <div>Смотреть все</div>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="main_posts_list">
                        <event-block :my="true" :event="event" v-for="event in user.my?.events"/>
                    </div>
                    <button class="main_posts_phoneButton" @click="$router.push('/event?my')">
                        <div>
                            <div>Смотреть все</div>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.5L15 12.5L9 6.5" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                    <button @click="$router.push('/store?type=event')">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.03 5L12.0117 19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 12H19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div>Разместить</div>
                        </div>
                    </button>
                </div>
            </section>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>