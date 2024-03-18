<script setup>
import Navbar from "../components/Navbar.vue";
import PicUpload from "../components/ProfilePicUpload.vue"
import Avatar from "vue3-avatar";
import router from '../Router/index.ts';
import { useAuthStore } from "../stores/authStore.ts";
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';
import { ref } from 'vue'

const user = useAuthStore();
const picture = useProfilePictureStore();
const tabs = ['Leader level', 'Achievements', 'Wins and losses', 'Match history'];
const activeTab = ref(0);

function onClick() {
	router.push('/')
}

const activateTab = (index) => {
	activeTab.value = index;
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
	<div class="flex h-full md:h-6/6 justify-center">
		<div class="h-full w-full md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<div class="flex flex-row h-1/3">
				<div class="flex items-center ml-3 md:ml-4 lg:ml-5 xl:ml-6 2xl:ml-7">
					<div class="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-56 2xl:h-56">
						<img
							v-if="picture.getPicture"
							:src="picture.getPicture"
							alt="profile picture"
							class="rounded-full object-cover w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-56 2xl:h-56"
						>
						<img
							v-else
							src="../assets/profile-pictures/default-5.png"
							alt="default picture"
							class="rounded-full w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-56 2xl:h-56"
						>
						<PicUpload></PicUpload>
					</div>
				</div>
				<div class="mt-14 ml-4">
					<h2 v-if="user.getUser && user.getUser.nickname">{{ user.getUser.nickname }}</h2>
					<h2 v-else class="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">GandalfTheGrey</h2>
					<h4 class="flex justify-end text-xs italic text-slate-300">nickname</h4>
				</div>
			</div>
			<div class="flex justify-content items-center text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light h-8">
				<button
					v-for="(tab, index) in tabs"
					:key="index"
					class="flex-1 border-t-2 pt-3"
					:class="{'font-bold border-yellow-500' : activeTab === index}, {'border-slate-700' : activeTab !== index}"
					@click="activateTab(index)"
				>
					{{ tab }}
				</button>
			</div>
			<div class="flex justify-center text-3xl text-yellow-500 pt-16">
				<h2>Show {{ tabs[activeTab] }}</h2>
			</div>
		</div>
	</div>
</template>
