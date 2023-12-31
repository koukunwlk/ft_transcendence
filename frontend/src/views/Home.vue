<template>
	<Navbar />
	<div class="grid grid-cols-2 w-screen h-screen justify-center content-center">
		<div class="grid sm:h-96">
			<div class="grid content-center justify-end">
				<button
					class="h-28 w-32 py-2.5 px-5 sm:h-52 sm:w-56 mr-1 sm:mr-2 bg-gray-600 bg-opacity-50  hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
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
					class="h-28 w-32 sm:h-52 sm:w-56 py-2.5 px-5 ml-2 sm:ml-2 bg-gray-600 bg-opacity-50  hover:bg-zinc-500 text-zinc-400  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent mr-5 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
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
	</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
	name: "Home",
	components: {
		Navbar: Navbar
	},
}
</script>
