<script setup>
import Navbar from "../components/Navbar.vue";
import PicUpload from "../components/ProfilePicUpload.vue"
import Avatar from "vue3-avatar";
import router from '../Router/index.ts';
import { useAuthStore } from "../stores/authStore.ts";
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';

const user = useAuthStore();
const picture = useProfilePictureStore();

function onClick() {
	router.push('/')
}

</script>

<template>
	<div class="text-white fixed end-0">
		<button
			class="h-10 w-16 mt-2 mb-6 md:mb-0 mr-2 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
			@click="onClick()">
			Home
		</button>
	</div>
	<div class="flex h-full md:h-6/6 justify-center items-center">
		<div class="h-full w-full md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<div class="flex flex-col justify-center items-center h-1/3">
				<div class="relative flex justify-center items-center">
					<img
						v-if="picture.getPicture"
						:src="picture.getPicture"
						alt="profile picture"
						class="rounded-full object-cover w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-56 2xl:h-56"
					>
					<!-- <Avatar
						v-else-if="user.getUser.nickname"
						:name=user.getUser.nickname
						:size=80
						borderColor="black">
					</Avatar> -->
					<img
						v-else
						src="../assets/profile-pictures/default-5.png"
						alt="default picture"
						class="rounded-full w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-56 2xl:h-56"
					>
					<PicUpload></PicUpload>
				</div>
				<!-- <p v-if="user.getUser">{{ user.getUser.nickname }}</p> teste -->
			</div>
			<div class="flex justify-content items-center text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light h-8">
				<button class="flex-1 focus:font-bold focus:border-t-2 focus:border-yellow-500 pt-2">
					Achievements
				</button>
				<button class="flex-1 focus:font-bold focus:border-t-2 focus:border-yellow-500 pt-2">
					Leader Level
				</button>
				<button class="flex-1 focus:font-bold focus:border-t-2 focus:border-yellow-500 pt-2">
					Match History
				</button>
				<button class="flex-1 focus:font-bold focus:border-t-2 focus:border-yellow-500 pt-2">
					Wins/Losses
				</button>
			</div>
			<div v-if="currentView === 'Achievements'">
				<h2>Selected = Achievements</h2>
			</div>
			<div v-else-if="currentView === 'Leader Level'">
				<h2>Selected = Leader Level</h2>
			</div>
			<div v-else-if="currentView === 'Macth History'">
				<h2>Selected = Match History</h2>
			</div>
			<div v-else-if="currentView === 'Wins/Losses'">
				<h2>Selected = Wins/Losses</h2>
			</div>
		</div>
	</div>
</template>
