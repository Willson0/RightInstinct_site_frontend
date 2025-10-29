<script>
import SettingsNavComponent from "@/components/SettingsNavComponent.vue";
import axios from "axios";
import config from "@/config.json";
import {checkRules, notify, whatError} from "@/utils.js";

export default {
    name: "SettingsPersonal",
    components: {SettingsNavComponent},
    data () {
        return {
            data: {},
            personal: {},
            phone: '',
            city: null,
            isLoading: false,
        }
    },
    async mounted () {
        if (this.user.id) document.querySelectorAll('.placeholder').forEach((el) => el.style.display = "none");

        this.initValues(this.user);
        await axios.get(config.backend + "data").then((response) => {
            this.data = response.data;
        });
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        hasChanges () {
            if (!this.user.id) return false;
            if (!this.data.cities) return false;
            if (this.isLoading) return false;

            for (let key in this.personal)
                if (this.personal[key] !== this.user.personal?.[key]) return true;
            for (let key in this.user.personal)
                if (this.personal[key] !== this.user.personal?.[key]) return true;

            if (this.phone !== this.user.phone) return true;
            if (this.city !== this.user.city_id) return true;
        }
    },
    watch: {
        user (nw) {
            this.initValues(nw);
        },
        personal: {
            handler() {
                for (let key in this.personal) {
                    if (this.personal[key]?.length === 0 || this.personal[key] == null) delete this.personal[key];
                }
            },
            deep: true
        },
        phone () {
            if (this.phone?.length === 0) this.phone = null;
        }
    },
    methods: {
        initValues (us) {
            if (!us.id) return;

            this.personal = {...us.personal} ?? {};
            this.phone = us.phone;
            this.city = us.city_id;

            document.querySelectorAll('.placeholder').forEach((el) => {
                el.style.opacity = "0";
                el.addEventListener('transitionend', () => {
                    el.style.display = "none";
                }, {once: true});
            })
        },
        async sendData () {
            if (this.isLoading) return;
            let rules = [
                ['lastname', this.personal?.lastname != null ? this.personal?.lastname.length <= 2 : false, 'Длина фамилии должна быть больше 2х символов!'],
                ['firstname', this.personal?.firstname != null ? this.personal?.firstname.length <= 1 : false, 'Длина имени должна быть больше 1-го символа!'],
                ['patronymic', this.personal?.patronymic != null ? this.personal?.patronymic.length <= 4 : false, 'Длина отчества должна быть больше 4-х символов!'],
            ]
            if (checkRules(rules)) return;

            let form = {};
            for (let key in this.personal)
                if (this.personal[key] !== this.user.personal?.[key]) form.personal = this.personal;
            for (let key in this.user.personal)
                if (this.personal[key] !== this.user.personal?.[key]) form.personal = this.personal;
            if (this.phone !== this.user.phone) form.phone = this.phone;
            if (this.city !== this.user.city_id) form.city = this.city;

            this.isLoading = true;
            await axios.post(config.backend + "site/auth/settings", form).then((response) => {
                this.$store.dispatch("updateUser", response.data);
                notify("Настройки успешно сохранены!");
            }).catch((error) => {
                notify(whatError(error), 1);
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
}
</script>

<template>
    <settings-nav-component>
        <div class="settings_slot settings_personal">
            <h2>Личная информация</h2>
            <form @submit.prevent>
                <div class="settings_personal_form">
                    <label>
                        <div class="placeholder full"></div>
                        <div>Фамилия</div>
                        <input v-model="personal.lastname" id="lastname" type="text">
                    </label>
                    <label>
                        <div class="placeholder full"></div>
                        <div>Имя</div>
                        <input v-model="personal.firstname" id="firstname" type="text">
                    </label>
                    <label>
                        <div class="placeholder full"></div>
                        <div>Отчество</div>
                        <input v-model="personal.patronymic" id="patronymic" type="text">
                    </label>
                    <label>
                        <div class="placeholder full"></div>
                        <div>Номер телефона</div>
                        <input v-model="phone" type="text" id="phone">
                    </label>
                    <label>
                        <div class="placeholder full"></div>
                        <div>Местоположение</div>
                        <select v-model="city" name="" id="city">
                            <option v-for="city in data.cities" :value="city.id">{{ city.name }}</option>
                        </select>
                    </label>
                    <label>
                        <div class="placeholder full"></div>
                        <div>Пол</div>
                        <select v-model="personal.gender" id="gender">
                            <option value="male">Мужчина</option>
                            <option value="female">Женщина</option>
                        </select>
                    </label>
                </div>
                <button @click="hasChanges ? sendData() : ''" type="submit" :class="{'active': hasChanges}">Сохранить</button>
            </form>
        </div>
    </settings-nav-component>
</template>

<style scoped>

</style>