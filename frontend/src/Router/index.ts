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
		component: () => import('../views/UserProfile.vue')
	},
	{
		path: '/game',
		name: 'Game',
		component: () => import('../views/GamePage.vue')
	},
	{
		path: '/community',
		name: 'Community',
		component: () => import('../views/Community.vue')
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
