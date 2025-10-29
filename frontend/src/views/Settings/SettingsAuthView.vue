<script>
import SettingsNavComponent from "@/components/SettingsNavComponent.vue";
import {checkRules, notify, whatError} from "@/utils.js";
import axios from 'axios';
import config from "@/config.json";

export default {
    name: "SettingsAuthView",
    components: {SettingsNavComponent},
    data () {
        return {
            email: "",
            password: "",
            newPassword: "",
            acceptNewPassword: "",
            isLoading: false,
        }
    },
    methods: {
        async sendData () {
            if (this.isLoading) return;

            let rules = [
                ["email", !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email), 'Невалидная электронная почта!'],
                ["newPassword", this.newPassword.length < 8, "Новый пароль слишком короткий!"],
                ["acceptNewPassword", this.acceptNewPassword !== this.newPassword, "Пароли не совпадают!"],
            ];
            if (checkRules(rules)) return;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/change", {
                email: this.email,
                password: this.password,
                newPassword: this.newPassword,
            }).then((response) => {
                notify("Пароль успешно изменен!");
                this.email = ""; this.password = "";
                this.newPassword = ""; this.acceptNewPassword = "";

            }).catch((error) => notify(whatError(error), 1))
                .finally(() => this.isLoading = false);
        }
    },
    computed: {
        isInactive () {
            return this.email.length === 0 || this.newPassword.length === 0 ||
                this.acceptNewPassword.length === 0 || this.isLoading;
        }
    }
}
</script>

<template>
    <settings-nav-component>
        <div class="settings_slot settings_auth">
            <h2>Авторизация</h2>
            <div class="settings_auth_form">
                <label>
                    <div>Email</div>
                    <input id="email" type="text" v-model="email">
                </label>
                <label>
                    <div>Пароль</div>
                    <input id="password" type="password" v-model="password">
                </label>
                <label>
                    <div>Новый пароль</div>
                    <input id="newPassword" type="password" v-model="newPassword">
                </label>
                <label>
                    <div>Повторите новый пароль</div>
                    <input id="acceptNewPassword" type="password" v-model="acceptNewPassword">
                </label>
            </div>
            <button @click="isInactive ? null : sendData()" :class="{'inactive': isInactive}">Сохранить</button>
        </div>
    </settings-nav-component>
</template>

<style scoped>

</style>