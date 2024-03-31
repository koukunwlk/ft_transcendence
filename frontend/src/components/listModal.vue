<template>
	<div v-if="isOpen"
		class="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
		<div class="bg-white p-6 rounded-md w-full max-w-lg">
			<div class="sm:flex sm:items-start w-full">
				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
					<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
						{{ title }}
					</h3>
					<div class="mt-2">
						<div class="grid grid-cols-1 gap-4">
							<friend-request v-for="request in receivedsRequests" :key="request.id"
								:nickname="request.sender.nickname" :id="request.sender.id" />
						</div>
					</div>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> <button @click="closeModal"
					type="button"
					class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
					Close </button> </div>
		</div>
	</div>
</template>

<script>
import FriendRequest from './FriendRequest.vue'
import { FriendService } from '../services/FriendService'

export default {
	components: {
		FriendRequest
	},
	props: {
		title: {
			type: String,
			required: true
		},
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			modalOpen: false,
			friendService: new FriendService(),
			receivedsRequests: []
		}
	},

	beforeMount() {
		this.friendService.getReceivedFriendRequests().then(response => {
			this.receivedsRequests = response.data;
		})
	},

	methods: {
		closeModal() {
			this.$emit('close-modal', this.isOpen);
		}
	}
}
</script>
