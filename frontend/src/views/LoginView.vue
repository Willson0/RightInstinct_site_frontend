<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {checkRules, notify, whatError} from "@/utils.js";
import axios from 'axios';
import config from "@/config.json";

export default {
    name: "LoginView",
    components: {FooterComponent, HeaderComponent},
    data () {
        return {
            email: "",
            password: "",
        }
    },
    async mounted () {
        document.body.style.backgroundColor = "#2D3014";

        window.onTelegramAuth = async (user) => {
            await axios.post(config.backend + "site/auth/telegram", user)
                .then((response) => {
                    notify("Успешная регистрация!");
                    this.$router.push('/profile');
                }).catch((error) => notify(whatError(error), 1))
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'test_right_instinct_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        document.getElementById('telegram-container').appendChild(script);
    },
    unmounted () {
        document.body.style.backgroundColor = "";
    },
    methods: {
        async login () {
            let rules = [
                ["email", !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email), 'Невалидная электронная почта!'],
                ["password", this.password.length < 8, 'Пароль должен быть длиннее 8 символов!'],
            ]
            if (checkRules(rules)) return;

            await axios.post(config.backend + "site/auth/login", {
                email: this.email,
                password: this.password,
            }).then((response) => {
                notify("Успешная авторизация");
                this.$router.push('/profile');
            }).catch((error) => {
                notify(whatError(error), 1);
            })
        },
    },
    computed: {
        isInactive () {
            return (this.email.length === 0) || (this.password.length < 8);
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="login_view">
            <div>
                <h1>С возвращением</h1>
                <div class="login_view_form">
                    <div>
                        <label for="email">E-mail</label>
                        <input v-model="email" id="email" type="text">
                    </div>
                    <div>
                        <label for="password">Пароль</label>
                        <input v-model="password" id="password" type="password">
                        <a href="/recovery">Забыли пароль?</a>
                    </div>
                </div>
                <div class="login_view_buttons">
                    <button @click="!isInactive ? login() : null" :class="{'inactive': isInactive}">Войти</button>
                    <button @click="$router.push('/registration')">Зарегистрироваться</button>
                    <div id="telegram-container"></div>
                </div>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>