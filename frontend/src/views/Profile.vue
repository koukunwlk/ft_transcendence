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
const tabs = ['Ranking', 'Match Stats'];
const activeTab = ref(0);
const isOpenSettings = ref(false);


function goHome() {
	router.push('/');
}

const activateTab = (index) => {
	activeTab.value = index;
}

const openSettings = () => {
	isOpenSettings.value = true;
	console.log(isOpenSettings.value);
}

</script>

<template>
	<div class="flex h-full md:h-6/6 justify-center">
		<div class="relative h-full w-full md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<button
				class="absolute top-2 right-2 flex w-6 h-6"
				@click="openSettings()">
				<img
					class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9"
					src="../assets/svgs/settings.svg"
					alt="settings icon"
				>
			</button>
			<button
				class="absolute top-2 left-2 flex w-6 h-6"
				@click="goHome()">
				<img
					class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9"
					src="../assets/svgs/home.svg"
					alt="home icon"
				>
			</button>
			<div class="relative flex flex-row h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72">
				<div class="flex items-end mb-6 ml-3 md:ml-4 lg:ml-5 xl:ml-6 2xl:ml-7">
					<div class="relative w-32 h-32 md:w-36 md:h-36 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52">
						<img
							v-if="picture.getPicture"
							:src="picture.getPicture"
							alt="profile picture"
							class="rounded-full object-cover"
						>
						<img
							v-else
							src="../assets/profile-pictures/default-5.png"
							alt="default picture"
							class="rounded-full object-cover"
						>
						<PicUpload></PicUpload>
					</div>
				</div>
				<div class="mt-14 lg:mt-16 xl:mt-20 ml-4">
					<h2 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" title="nickname">
						Gandalf
					</h2>
					<h2 v-if="user.getUser && user.getUser.nickname">
						{{ user.getUser.nickname }}
					</h2>
					<h4 v-else class="flex justify-end text-xs italic text-slate-300" title="intra nickname">
						TheWhite
					</h4>
				</div>
				<p class="mt-14 lg:mt-16 xl:mt-20 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ml-1 ">
					🟢online
				</p>
				<div class="bg-slate-700 h-20 w-48 md:h-24 2xl:h-28 md:w-64 lg:w-80 absolute bottom-6 left-40 md:left-44 xl:left-52 2xl:left-64">
					Conquistas
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
