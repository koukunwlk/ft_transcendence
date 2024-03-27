<template>
	<Navbar />
	<div class="flex h-full justify-center items-center border-4">
		<div class="justify-center flex bg-yellow-300 items-center h-screen">
			<div class="text-4xl">Hello 👋🏼 {{ user }}</div>
			<button @click="lobbyRedirect">Lobby</button>
		</div>
		<div class="flex flex-col justify-center items-center h-full w-full md:flex-row">
			<div class="">
				<button
					class="h-28 w-28 mb-6 md:mb-0 md:mr-10 md:h-56 md:w-56 xl:mr-14 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
					<div class="flex justify-center items-center">
						<svg class="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="5 3 19 12 5 21 5 3" />
						</svg>
					</div>
				</button>
			</div>
			<div class="">
				<button type="button" @click="communityRedirect()"
					class="h-28 w-28 md:h-56 md:w-56 bg-gray-600 bg-opacity-30  hover:bg-zinc-500 text-zinc-400 font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
					<div class="grid justify-center">
						<svg class="h-16 w-16 md:h-24 md:w-24" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
				</button>
			</div>
		</div>
		<FriendList />
	</div>
	<!-- <div class="grid grid-cols-2 w-screen h-screen justify-center content-center">
		<div class="grid sm:h-96">
			<div class="grid content-center justify-end">
				<button
					class="h-28 w-32 py-2.5 px-5 sm:h-52 sm:w-56 mr-1 sm:mr-2 bg-gray-600 bg-opacity-30  hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
						<div class="grid justify-center">
							<svg class="h-16 w-16 sm:h-24 sm:w-24" viewBox="0 0 24 24"  fill="none" stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						</div>
					</button>
			</div>
		</div>
		<div class="grid sm:h-96">
			<div class="grid content-center">
				<button type="button"
					class="h-28 w-32 sm:h-52 sm:w-56 py-2.5 px-5 ml-2 sm:ml-2 bg-gray-600 bg-opacity-30  hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent mr-5 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
						<div class="grid justify-center">
							<svg class="h-16 w-16 sm:h-24 sm:w-24" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						</div>
				</button>
			</div>
		</div>
	</div> -->
</template>

<script>
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import FriendList from "../components/FriendList.vue";

const authStore = useAuthStore();

export default {
	name: "Home",
	data() {
		return {
			user: ref(""),
		};
	},
	mounted() {
		this.getTokenFromCookie();
		this.getLoggedUser();
	},
	components: {
		FriendList,
	},
	methods: {
		getLoggedUser() {
			userService
				.me()
				.then(({ data }) => {
					this.user = data.username;
					authStore.setUser(data);
				})
				.catch((error) => {
					this.$router.push({ name: "Login" });
				});
		},
		lobbyRedirect() {
			this.$router.push({ name: "Lobby" });
		},
		getTokenFromCookie() {
			const cookies = document.cookie.split(";");

			cookies.forEach((cookie) => {
				if (cookie.trimStart().startsWith("token=")) {
					this.saveToken(cookie.trimStart());
				}
			});
		},
		saveToken(tokenCookie) {
			const token = tokenCookie.substring(6);
			authStore.setToken(token);
		},
	},
};

const router = useRouter();

function communityRedirect() {
	router.push('/community')
}

</script>
