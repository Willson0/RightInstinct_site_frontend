<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from 'axios';
import config from "@/config.json";
import {checkRules, notify, whatError} from "@/utils.js";

export default {
    name: "LoginView",
    components: {FooterComponent, HeaderComponent},
    data () {
        return {
            code: false,
            email: "",
            newPassword: "",
            confirmNewPassword: "",
            isLoading: false,
        }
    },
    async mounted () {
        document.body.style.backgroundColor = "#2D3014";
        this.code = this.$route.query.code ?? false;
    },
    unmounted () {
        document.body.style.backgroundColor = "";
    },
    methods: {
        async sendCode () {
            if (this.isLoading) return;
            let rules = [
                ["email", !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email), 'Невалидная электронная почта!'],
            ];
            if (checkRules(rules)) return;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/recovery/send", {
                email: this.email,
            }).then((response) => {
                notify("Ссылка успешно отправлена на почту");
            }).catch((error) => notify(whatError(error), 1))
                .finally(() => this.isLoading = false);
        },
        async checkCode () {
            if (this.isLoading) return;
            let rules = [
                ["newPassword", this.newPassword.length < 8, 'Пароль должен быть длиннее 8 символов!'],
                ["confirmNewPassword", this.confirmNewPassword !== this.newPassword, 'Пароли должны совпадать!'],
            ];
            if (checkRules(rules)) return;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/recovery/check", {
                code: this.code,
                password: this.newPassword,
            }).then((response) => {
                notify("Пароль успешно изменен!");
                setTimeout(() => {
                    this.$router.push("/login");
                }, 3000);
            }).catch((error) => {
                notify(whatError(error), 1);
                this.isLoading = false;
            })
        }
    },
    computed: {
        isActive () {
            if (this.code === false)
                return (this.email.length > 0) && !this.isLoading;
            else return (this.newPassword.length >= 8) && (this.confirmNewPassword.length >= 8)
                && !this.isLoading;
        }
    }
}
</script>

<template>
    <div class="container">
        <header-component />
        <main class="login_view">
            <div>
                <h1>Изменение пароля</h1>
                <div class="login_view_form">
                    <div v-if="code === false">
                        <label for="email">E-mail</label>
                        <input v-model="email" id="email" type="text">
                    </div>
                    <template v-else>
                        <div>
                            <label for="email">Новый пароль</label>
                            <input v-model="newPassword" id="newPassword" type="password">
                        </div>
                        <div>
                            <label for="email">Подтверждение нового пароля</label>
                            <input v-model="confirmNewPassword" id="confirmNewPassword" type="password">
                        </div>
                    </template>
                </div>
                <div>
                    <button :class="{'active': isActive}" class="recovery_button"
                            @click="code === false ? sendCode() : checkCode()">Изменить</button>
                </div>
            </div>
        </main>
    </div>
    <footer-component />
</template>

<style scoped>

</style>