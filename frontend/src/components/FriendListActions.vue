<template>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-2">
		<!-- Add Friend Button -->
		<div class="">
			<button
				class="w-12 md:w-12 h-11 px-4 py-2 text-white shadow-lg shadow-yellow-500/5 rounded grid justify-center"
				@click="openAddFriendModal">
				<svg class="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
				</svg>
			</button>
			<AddFriendModal :isOpen="isAddFriendModalOpen" @close-modal="closeAddFriendModal" :title="'User to add:'" />
		</div>

		<!-- Block User Button -->
		<div class=" ">
			<button
				class="w-12 md:w-12 h-11 px-4 py-2 text-white shadow-lg shadow-yellow-500/5 rounded grid justify-center"
				@click="openBlockFriendModal">
				<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
					width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
				</svg>

			</button>
			<OneInputModal :isOpen="isBlockFriendModalOpen" @close-modal="closeBlockFriendModal"
				:title="'User to block:'" />
		</div>

		<!-- Notification Button -->
		<div class=" ">
			<button
				class="w-12 md:w-12 h-11 px-4 py-2 text-white shadow-lg shadow-yellow-500/5 rounded grid justify-center"
				@click="openFriendRequestModal">
				<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
					width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
				</svg>

			</button>
			<listModal :title="'Friend Requests'" :isOpen="isFriendRequestModalOpen" :list="friendRequests"
				@close-modal="closeFriendRequestModal" />
		</div>
	</div>
</template>

<script>

import OneInputModal from './OneInputModal.vue'
import listModal from './listModal.vue'
import AddFriendModal from './AddFriendModal.vue'

export default {
	name: 'FriendListActions',
	components: {
		OneInputModal,
		AddFriendModal,
		listModal
	},
	props: {
		friends: {
			type: Array,
			required: true
		},
		friendRequests: {
			type: Array,
			required: true
		},
	},
	data() {
		return {
			isAddFriendModalOpen: false,
			isBlockFriendModalOpen: false,
			isFriendRequestModalOpen: false,
		}
	},
	methods: {
		openAddFriendModal() {
			this.isAddFriendModalOpen = true
		},
		closeAddFriendModal() {
			this.isAddFriendModalOpen = false
		},
		openBlockFriendModal() {
			this.isBlockFriendModalOpen = true
		},
		closeBlockFriendModal() {
			this.isBlockFriendModalOpen = false
		},
		openFriendRequestModal() {
			this.isFriendRequestModalOpen = true
		},
		closeFriendRequestModal() {
			this.isFriendRequestModalOpen = false
		}
	}
}
</script>
