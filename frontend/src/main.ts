import { createApp } from 'vue';
import App from './App.vue';
import router from './Router/index';
import './styles/style.css';
import Avatar from "vue3-avatar";

createApp(App)
	.use(router)
	.component("avatar", Avatar)
	.mount('#app')

