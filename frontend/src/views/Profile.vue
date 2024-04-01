<script>
import Navbar from "../components/Navbar.vue";
import Avatar from "vue3-avatar";
import router from '../Router/index.ts';
import UserStatus from "../components/UserStatus.vue";
import { useAuthStore } from "../stores/authStore.ts";
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';
import LastMatches from "../components/LastMatches.vue";
import Ranking from '../components/Ranking.vue';
import Settings from '../components/Settings.vue'
import { onBeforeMount, ref } from 'vue';
import { MatchService } from '../services/MatchService';
import userService from "../services/UserService";
import { Buffer } from 'buffer';

const authStore = useAuthStore();
const profilePictureStore = useProfilePictureStore();

export default {
	components: {
		Navbar,
		Avatar,
		LastMatches,
		UserStatus,
		Ranking,
		Settings
	},
	data() {
		return {
			tabs: ['Ranking', 'Last Matches'],
			stats: ['Total games', 'Wins', 'Loses', 'Win Rate %', 'Rank'],
			statsKeys: ['totalGames', 'wins', 'loses', 'winRate', 'rank'],
			activeTab: 0,
			showSettingsModal: false,
			profileUser: null,
			userStats: {
				totalGames: 0,
				wins: 0,
				loses: 0,
				winRate: 0,
				rank: 0,
			},
			matchService: new MatchService(),
			picture: useProfilePictureStore(),
			showDropdown: false,
			isLoading: true,
			matches: [],
			// showDropdown: false,
			loadingPage: true,
		}
	},
	mounted() {
		if (this.$route.params.id) {
			this.getProfileUser();
		} else {
			this.getLoggedUser();
		}
	},
	methods: {
		getMatches() {
			if (this.profileUser) {
				this.matchService.getMyMatches().then((matches) => {
					this.matches = matches;
					this.$forceUpdate();
					this.calculateStats();
				}).catch((error) => {
					console.error("Error fetching matches:", error);
					this.matches = [];
				}).finally(() => {
					this.isLoading = false;
				});
			}
		},

		getProfileMatches() {
			const id = this.$route.params.id;
			this.matchService.getMatchesByUserId(id).then((matches) => {
				this.matches = matches;

			}).then(() => {
				this.$forceUpdate();
				this.calculateStats();
			}).catch((error) => {
				console.error("Error fetching matches:", error);
				this.matches = [];
			}).finally(() => {
				this.isLoading = false;
			});
		},

		calculateStats() {
			const userId = this.profileUser.id;
			if (this.matches) {
				this.matches.forEach(match => {
					if (match.playerOne.id === userId) {
						this.userStats.totalGames++;
						if (match.playerOneGoalsCount > match.playerTwoGoalsCount) {
							this.userStats.wins++;
						} else {
							this.userStats.loses++;
						}
					} else if (match.playerTwo.id === userId) {
						this.userStats.totalGames++;
						if (match.playerTwoGoalsCount > match.playerOneGoalsCount) {
							this.userStats.wins++;
						} else {
							this.userStats.loses++;
						}
					}
				});
				this.userStats.rank = this.profileUser.ranking;
				this.userStats.winRate = Math.round((this.userStats.wins / this.userStats.totalGames) * 100);
			}
		},

		homeRedirect() {
			this.$router.push({ name: "Home" });
		},
		activateTab(index) {
			this.activeTab = index;
		},
		openCloseSettings() {
			this.showSettingsModal = !this.showSettingsModal;
			this.getLoggedUser();
		},
		// toggleDropdown() {
		// 	console.log(this.showDropdown);
		// 	this.showDropdown = !this.showDropdown;
		// },
		updateStatus() {
			const oldStatus = this.profileUser.status;
			userService.updateStatus(Number(this.selectedStatus)).then((response) => {
				this.profileUser.status = Number(this.selectedStatus);
			})
				.catch(e => {
					console.error("Error updating status:", e);
					this.profileUser.status = oldStatus;
				})
			// .finally(() => {
			// 	this.showDropdown = false;
			// });
		},

		getProfileUser() {
			const id = this.$route.params.id;
			userService.getUser(id).then(({ data }) => {
				this.profileUser = data;
				this.saveAvatar();
				this.isLoading = false;
			}).then(() => {
				this.getProfileMatches();
			})
				.catch((error) => {
					console.error("Error fetching user:", error);
					this.$router.push({ name: "Home" });
				});
		},

		getLoggedUser() {
			userService.me().then(({ data }) => {
				this.profileUser = data;
				authStore.setUser(data);
				if (
					data.tfaEnabled != null &&
					!data.tfaAuthenticated
				) {
					this.$router.push({ name: "TFA" });
				}
				this.saveAvatar();
				this.isLoading = false;
			}).then(() => {
				("getting matches");
				this.getMatches();
			})
				.catch((error) => {
					this.$router.push({ name: "Login" });
				});
		},
		saveAvatar() {
			if (!this.profileUser.avatar) {
				return;
			}
			const buffs = Buffer.from(this.profileUser.avatar.data);
			const objectURL = URL.createObjectURL(new Blob([buffs]));
			profilePictureStore.setPicture(objectURL);
		},

		showUpdateStatus() {
			id = this.$router.params.id;
			if (id) {
				return false;
			}
			return true;
		}
	}
}
</script>

<template>
	<div v-if="!isLoading" class="flex h-full md:h-6/6 justify-center">
		<div class="relative h-max w-full md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
			<button v-show="this.$route.params.id == null" class="absolute z-10 top-2 right-2 flex w-6 h-6"
				@click="openCloseSettings">
				<img class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" src="../assets/svgs/settings.svg"
					alt="settings icon">
			</button>
			<div v-if="showSettingsModal">
				<Settings @clickedButton="openCloseSettings" />
			</div>
			<button class="absolute z-10 top-2 left-2 flex w-6 h-6" @click="homeRedirect">
				<img class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" src="../assets/svgs/home.svg"
					alt="home icon">
			</button>
			<div class="relative flex flex-row h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72 grow">
				<div class="flex items-end mb-6 ml-3 md:ml-4 lg:ml-5 xl:ml-6 2xl:ml-7">
					<div class="relative w-32 h-32 md:w-36 md:h-36 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52">
						<img v-if="picture.getPicture" :src="picture.getPicture" alt="profile picture"
							class="w-full h-full rounded-full object-cover">
						<img v-else src="../assets/profile-pictures/default-5.png" alt="default picture"
							class="rounded-full object-cover">
					</div>
				</div>
				<div class="mt-14 lg:mt-16 xl:mt-20 ml-4">
					<h3 class="md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" title="nickname">
						The {{ profileUser && profileUser.nickname ? profileUser.nickname : 'Unknown' }}
					</h3>
					<h4 class="flex justify-end text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl italic text-slate-300"
						title="intra nickname">
						{{ profileUser ? profileUser.username : '' }}
					</h4>
				</div>
				<div class="flex justify-center">
					<p
						class="relative flex flex-row mt-14 lg:mt-16 xl:mt-24 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ml-1">
						<UserStatus :status="profileUser ? profileUser.status : 0" />
						<select v-show="this.$route.params.id == undefined" v-model="selectedStatus"
							@change="updateStatus"
							class="w-1 h-1 p-2 ml-1 md:mt-1 lg:mt-1.5 z-10 cursor-pointer bg-transparent text-sm rounded-lg text-white">
							<option class="bg-gray-700" value="0">Offline</option>
							<option class="bg-gray-700" value="1">Online</option>
							<option class="bg-gray-700" value="2">Invisible</option>
							<option class="bg-gray-700" value="3">AFK</option>
							<option class="bg-gray-700" value="4">In Game</option>
						</select>
					</p>
				</div>
			</div>
			<div class="absolute right-0 xl:right-10 2xl:right-14 top-24 md:top-28 xl:top-20 px-2 md:px-4">
				<table>
					<tbody>
						<tr v-for="(stat, index) in stats" :key="index"
							class="text-xs md:text-sm 2xl:text-xl text-yellow-500">
							<th scope="row"
								class="bg-transparent pr-2 lg:pr-4 xl:pr-6 3xl:pr-8 text-left text-gray-500 uppercase md:tracking-wider">
								{{ stat }}
							</th>
							<td>
								{{ userStats[this.statsKeys[index]] }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div
				class="flex justify-content items-center text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light h-8">
				<button v-for="(tab, index) in tabs" :key="index" class="flex-1 border-t-2 pt-3"
					:class="{ 'font-bold border-yellow-500': activeTab === index, 'border-slate-700': activeTab !== index }"
					@click="activateTab(index)">
					{{ tab }}
				</button>
			</div>
			<div class="mb-4 lg:mt-4" v-if="activeTab === 0">
				<Ranking />
			</div>
			<div v-else="activeTab === 1" class="text-3xl text-yellow-500 pt-16 w-full">
				<LastMatches :matches="matches" />
			</div>
		</div>
	</div>
</template>
