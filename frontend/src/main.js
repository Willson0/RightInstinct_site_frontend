import { createApp } from 'vue'
import './assets/main.css'
import './assets/fonts/font.css'
import App from './App.vue'
import router from "./router.js";
import store from './storage.js';
import axios from 'axios';

axios.defaults.withCredentials = true;
const app = createApp(App);

router.afterEach((to) => {
    // Title
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    // Description
    if (to.meta && to.meta.description) {
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', to.meta.description);
    }
});

app.use(store).use(router)
app.mount('#app')