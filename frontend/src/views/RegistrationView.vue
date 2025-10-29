<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {checkRules, notify, whatError} from "@/utils.js";
import axios from "axios";
import config from "@/config.json";

export default {
    name: "LoginView",
    components: {FooterComponent, HeaderComponent},
    data () {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
        }
    },
    async mounted () {
        document.body.style.backgroundColor = "#2D3014";
    },
    unmounted () {
        document.body.style.backgroundColor = "";
    },
    methods: {
        async register () {
            if (this.isLoading) return;
            let rules = [
                ["email", !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email), 'Невалидная электронная почта!'],
                ["password", this.password.length < 8, 'Пароль должен быть длиннее 8 символов!'],
                ["password2", this.password !== this.confirmPassword, "Пароли не совпадают!"],
            ];
            if (checkRules(rules)) return;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/register", {
                email: this.email,
                password: this.password,
            }).then((response) => {
                alert ("Успешная регистрация. Подтвердите почту, перейдя по ссылке в письме");
                notify("Подтвердите почту по приложенному письму!");
                this.$router.push('/login');
            }).catch((error) => {
                notify(whatError(error), 1);
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="login_view register_view">
            <div>
                <h1>Добро пожаловать</h1>
                <form @submit.prevent>
                    <div class="login_view_form">
                        <div>
                            <label for="email">E-mail</label>
                            <input v-model="email" id="email" type="text">
                        </div>
                        <div>
                            <label for="password">Пароль</label>
                            <input v-model="password" id="password" type="password">
                        </div>
                        <div>
                            <label for="password2">Повторите пароль</label>
                            <input v-model="confirmPassword" id="password2" type="password">
                        </div>
                    </div>
                    <div class="login_view_buttons">
                        <button type="submit" @click="register" :class="{'inactive': isLoading}">Зарегистрироваться</button>
                        <button @click="$router.push('/login')">Вход</button>
                    </div>
                </form>
            </div>
            <img class="registration_image" src="/registration_image.png" alt="">
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>