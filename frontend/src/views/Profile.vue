<script>
import Navbar from "../components/Navbar.vue";
import PicUpload from "../components/ProfilePicUpload.vue";
import Avatar from "vue3-avatar";
import router from '../Router/index.ts';
import UserStatus from "../components/UserStatus.vue";
import { useAuthStore } from "../stores/authStore.ts";
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';
import { ProfileService } from '../services/ProfileService.ts';
import LastMatches from "../components/LastMatches.vue";
import Ranking from '../components/Ranking.vue';
import Achievements from '../components/Achievements.vue'
import { onBeforeMount, ref } from 'vue';

export default {
	components: {
		Navbar,
		PicUpload,
		Avatar,
		LastMatches,
		UserStatus,
		Ranking,
		Achievements
	},
	data() {
		return {
			tabs: ['Ranking', 'Last Matches'],
			activeTab: 0,
			isOpenSettings: false,
			profileUser: null,
			picture: useProfilePictureStore(),
			profileService: new ProfileService(),
			showDropdown: false,
			loadingPage: true,
		}
	},
	beforeMount() {
		try {
			this.profileService.me().then((profile) => {
				this.profileUser = profile.data;
			});
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	},
	methods: {
		goHome() {
			router.push('/');
		},
		activateTab(index) {
			this.activeTab = index;
		},
		openSettings() {
			this.isOpenSettings = true;
			console.log(this.isOpenSettings);
		},
		toggleDropdown() {
			console.log(this.showDropdown);
			this.showDropdown = !this.showDropdown;
		},
		updateStatus() {
			const oldStatus = this.profileUser.status;
			this.profileService.updateStatus(Number(this.selectedStatus)).then((response) => {
				console.log(response);
				this.profileUser.status = Number(this.selectedStatus);
			})
				.catch(e => {
					console.error("Error updating status:", e);
					this.profileUser.status = oldStatus;
				})
				.finally(() => {
					this.showDropdown = false;
				});
		},
	}
}
</script>

<template>
	<div class="flex h-full md:h-6/6 justify-center">
		<div class="relative h-max w-full md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<button class="absolute z-10 top-2 right-2 flex w-6 h-6" @click="openSettings">
				<img class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" src="../assets/svgs/settings.svg"
					alt="settings icon">
			</button>
			<button class="absolute z-10 top-2 left-2 flex w-6 h-6" @click="goHome">
				<img class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" src="../assets/svgs/home.svg"
					alt="home icon">
			</button>
			<div class="relative flex flex-row h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72">
				<div class="flex items-end mb-6 ml-3 md:ml-4 lg:ml-5 xl:ml-6 2xl:ml-7">
					<div class="relative w-32 h-32 md:w-36 md:h-36 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52">
						<img v-if="picture.getPicture" :src="picture.getPicture" alt="profile picture"
							class="rounded-full object-cover">
						<img v-else src="../assets/profile-pictures/default-5.png" alt="default picture"
							class="rounded-full object-cover">
						<PicUpload/>
					</div>
				</div>
				<div class="mt-14 lg:mt-16 xl:mt-20 ml-4">
					<h2 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" title="nickname">
						{{ profileUser ? profileUser.username : '' }}
					</h2>
					<h4 class="flex justify-end text-xs italic text-slate-300" title="intra nickname">
						The {{ profileUser && profileUser.nickname ? profileUser.nickname : 'Unknown' }}
					</h4>
				</div>
				<div class="flex justify-center">
					<p
						class="mt-14 lg:mt-16 xl:mt-20 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ml-1 relative">
						<UserStatus :status="profileUser ? profileUser.status : 0" />
						<img src="../assets/svgs/down-arrow.svg" alt="arrow down" class="w-4 cursor-pointer ml-2"
							@click="toggleDropdown">
						<select v-model="selectedStatus" @change="updateStatus"
							class="block w-auto absolute top-0 left-0 z-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							v-show="showDropdown">
							<option value="0">Offline</option>
							<option value="1">Online</option>
							<option value="2">Invisible</option>
							<option value="3">AFK</option>
							<option value="4">In Game</option>
						</select>
					</p>
				</div>
				<Achievements/>
			</div>
			<div
				class="flex justify-content items-center text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light h-8">
				<button v-for="(tab, index) in tabs" :key="index" class="flex-1 border-t-2 pt-3"
					:class="{ 'font-bold border-yellow-500': activeTab === index, 'border-slate-700': activeTab !== index }"
					@click="activateTab(index)">
					{{ tab }}
				</button>
			</div>
			<div
				class="mb-4"
				v-if="activeTab === 0">
				<Ranking/>
			</div>
			<div v-else="activeTab === 1" class="text-3xl text-yellow-500 pt-16 w-full">
				<LastMatches />
			</div>
		</div>
	</div>
</template>
