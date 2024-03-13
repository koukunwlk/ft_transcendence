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
	<div class=" text-white fixed end-0">
		<button
			class="h-10 w-16 mt-2 mb-6 md:mb-0 mr-2 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
			@click="onClick()">
			Home
		</button>
	</div>
	<div class="flex h-full md:h-6/6 justify-center items-center">
		<div class="h-4/5 w-4/5 md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<div class="flex flex-col justify-center items-center h-2/6">
				<div class="relative flex justify-center items-center">
					<img
						v-if="picture.getPicture"
						:src="picture.getPicture"
						alt="profile picture"
						class="rounded-full w-32 h-32"
					>
					<Avatar
						v-else-if="user.getUser.nickname"
						:name=user.getUser.nickname
						:size=80
						borderColor="black">
					</Avatar>
					<img
						v-else
						src="../assets/profile-pictures/default-5.png"
						alt="default picture"
						class="rounded-full w-32 h-32"
					>
					<PicUpload></PicUpload>
				</div>
				<!-- <p v-if="user.getUser">{{ user.getUser.nickname }}</p> Somente para teste -->
			</div>
			<div class="h-4/6 flex flex-col md:flex-row justify-center items-center">
				<div class="flex flex-col md:flex-col justify-center items-center w-full h-full">
					<div class="h-1/2 w-full rounded-lg border border-zinc-600">
						<p>Vitórias e Derrotas</p>
					</div>
					<div class="h-1/2 w-full rounded-lg border border-zinc-600">
						<p>Histórico</p>
					</div>
				</div>
				<div class="flex flex-col md:flex-col justify-center items-center  w-full h-full">
					<div class="h-1/2 w-full rounded-lg border border-zinc-600">
						<p>Ranking</p>
					</div>
					<div class="h-1/2 w-full rounded-lg border border-zinc-600">
						<p>Conquistas</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
