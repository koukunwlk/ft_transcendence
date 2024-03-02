import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./Router/index";
import "./styles/style.css";
import axios from "axios";
import VueAxios from "vue-axios";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueAxios, axios).mount("#app");
