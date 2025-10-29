<script>
import SettingsNavComponent from "@/components/SettingsNavComponent.vue";
import axios from 'axios';
import config from "@/config.json";
import {notify, whatError} from "@/utils.js";

export default {
    name: "SettingsDocumentsView",
    components: {SettingsNavComponent},
    data () {
        return {
            config: config
        }
    },
    methods: {
        async addFiles (ev) {
            let file = ev.target.files[0];
            ev.target.value = "";

            let fd = new FormData();
            fd.append('document', file);

            await axios.post(config.backend + "site/document", fd)
            .then((response) => {
                notify("Успешно загружено!");

                let newUser = {...this.user};
                if (newUser.documents == null) newUser.documents = {};
                newUser.documents[response.data.url] = file.name;
                this.$store.dispatch("updateUser", newUser);
            }).catch((error) => notify(whatError(error), 1));
        },
        async deleteFile (key) {
            let newUser = {...this.user};
            delete newUser.documents[key];
            this.$store.dispatch("updateUser", newUser);

            await axios.post(config.backend + "site/document/change", {
                documents: newUser.documents,
            })
            .then((response) => {
                notify("Успешно удалено!");
            }).catch((error) => notify(whatError(error), 1));
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        }
    }
}
</script>

<template>
    <settings-nav-component>
        <div class="settings_slot settings_documents">
            <h2>Документы и файлы</h2>
            <main>
                <a :href="config.storage + key" download v-for="(file, key) in user.documents">
                    <div>
                        <div>{{ file }}</div>
                        <svg @click.prevent="deleteFile(key)" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="43" height="43" rx="9.5" stroke="#222B1B"/>
                            <path d="M17.5 16L18.1 12.5H25.9L26.5 16" stroke="#222B1B" stroke-width="2" stroke-linejoin="round"/>
                            <path d="M13 16H31" stroke="#222B1B" stroke-width="2" stroke-linecap="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 16L27.5 31.5H16.5L15.5 16H28.5Z" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.5 27.5H24.5" stroke="#222B1B" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </a>
            </main>
            <label for="add">
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.03 5L12.0117 19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12H19" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>Загрузить</div>
                </div>
            </label>
            <input @change="addFiles" type="file" id="add" style="display: none">
        </div>
    </settings-nav-component>
</template>

<style scoped>

</style>