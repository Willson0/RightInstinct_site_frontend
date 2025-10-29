import { createApp } from 'vue'
import './assets/main.css'
import './assets/fonts/font.css'
import App from './App.vue'
import router from "./router.js";
import store from './storage.js';
import axios from 'axios';

axios.defaults.withCredentials = true;
const app = createApp(App)

app.use(store).use(router)
app.mount('#app')