import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './Router/index';
import './styles/style.css';

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.mount('#app')

