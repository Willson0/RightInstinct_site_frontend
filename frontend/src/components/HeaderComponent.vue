<script>
import axios from "axios";
import config from "@/config.json";

export default {
    data () {
        return {

        }
    },
    async mounted () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        if (this.user == null || Object.keys(this.user).length === 0) {
            await axios.post(config.backend + "auth/profile").then((response) => {
                this.$store.dispatch("updateUser", response.data);
            }).catch(() => {
                this.$store.dispatch("updateUser", false);
            })
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        }
    },
    methods: {
        openMenu () {
            document.body.style.overflow = "hidden";
            let el = this.$refs.side;

            el.style.display = "";
            requestAnimationFrame(() => {
                el.style.transform = "translate(0, 0)";
            })
        },
        closeMenu () {
            document.body.style.overflow = "";
            let el = this.$refs.side;

            el.style.transform = "";
            el.addEventListener('transitionend', () => {
                el.style.display = "none";
            }, {once: true})
        }
    }
}
</script>

<template>
    <header>
        <a href="/" class="header_logo">
            <img src="/logo.png" alt="Логотип проекта">
            <h2>Верное чутьё</h2>
        </a>
        <nav>
            <a href="/post">Объявления</a>
            <a href="/service">Услуги</a>
            <a href="/event">Мероприятия</a>
        </nav>
        <div>
            <button v-if="user === false" @click="$router.push('/login')">Войти</button>
            <div class="header_avatar_placeholder" v-else-if="Object.keys(user).length === 0"></div>
            <img @click="$router.push('/profile')" v-else-if="user.avatar" :src="user.avatar" alt="">
            <svg @click="$router.push('/profile')" v-else width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="44" height="44" rx="22" fill="#787D46"/>
                <path d="M22 20C23.933 20 25.5 18.433 25.5 16.5C25.5 14.567 23.933 13 22 13C20.067 13 18.5 14.567 18.5 16.5C18.5 18.433 20.067 20 22 20Z" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 30.4V31H31V30.4C31 28.1598 31 27.0397 30.5641 26.184C30.1806 25.4314 29.5686 24.8195 28.816 24.436C27.9603 24 26.8402 24 24.6 24H19.4C17.1598 24 16.0397 24 15.1841 24.436C14.4314 24.8195 13.8195 25.4314 13.436 26.184C13 27.0397 13 28.1598 13 30.4Z" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg @click="openMenu" class="header_phoneMenu" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.97461 5.97461H19.9746" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.97461 11.9746H19.9746" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.97461 17.9746H19.9746" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </header>
    <aside style="display: none;" ref="side" class="side-menu">
        <svg @click="closeMenu" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L20 20" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 20L20 4" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h2>Меню</h2>
        <nav>
            <a href="/login" v-if="user === false">Войти</a>
            <a href="/profile" v-else>Профиль</a>
            <a href="/post">Объявления</a>
            <a href="/service">Услуги</a>
            <a href="/event">Мероприятия</a>
        </nav>
    </aside>
</template>

<style scoped>

</style>