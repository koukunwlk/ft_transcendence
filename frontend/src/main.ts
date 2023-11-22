import { createApp } from 'vue';
import  Login  from './views/Login.vue';
import App from './App.vue';
import router from './Router/index';


createApp(App)
	.use(router)
	.mount('#app')

