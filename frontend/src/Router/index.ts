import { createRouter, createWebHistory } from 'vue-router';


var routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue')
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
