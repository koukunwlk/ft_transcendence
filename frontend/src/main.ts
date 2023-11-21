import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { Login } from '@/views/Login.vue'
import { router } from '@/Router/index'


createApp(App)
	.use(router)
	.mount('#app')

