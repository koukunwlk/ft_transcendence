<template>
	<div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto" role="dialog">
		<div class="flex items-center justify-center min-h-screen pt-4">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
			<div
				class="inline-block align-bottom rounded-lg bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div class="p-6">
					<div class="text-center">
						<h3 class="text-lg font-medium text-gray-900" id="modal-title"> {{ title }} </h3>
                            <input type="text"
							class="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1 text-gray-900"
							placeholder="enter a friend nickname " v-model="inputValue">
                            <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
						
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"> <button @click="closeModal" type="button"
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
							Close </button> 
                        <button @click="addFriend" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Add Friend
                        </button>
                        </div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { FriendService } from '../services/FriendService';
export default {
    name: 'AddFriendModal',

	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
	},
	data() {
		return {
			inputValue: '',
            FriendService: new FriendService(),
            error: null
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal', this.isOpen);
		},

        addFriend() {
            this.FriendService.sendFriendRequest(this.inputValue).then((resp) => {
                if (resp.status == 201) {
                    this.error = null
                    this.inputValue = ''
                } 
            })
            .catch((error) => {
				console.log(error)
                this.error = error.response.data?.message || 'An error occurred'
            }).finally(() => {
                if (!this.error)
                    this.closeModal()
            })
        }
	}
}
</script>
