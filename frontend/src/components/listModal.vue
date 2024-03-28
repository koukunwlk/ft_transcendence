<template>
	<div v-if="isOpen"
		class="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
		<div class="bg-white p-6 rounded-md w-full max-w-lg">
			<div class="sm:flex sm:items-start">
				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
						{{ title }}
					</h3>
					<ul v-if="list" class="space-y-2 mt-4">
						<li class="list-none" v-for="(item, index) in list" :key="index">
							{{ item.name }} te enviou uma notificação de amizade
						</li>
					</ul>
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
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		list: {
			type: Array,
			required: true
		},
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			modalOpen: false
		}
	},

	methods: {
		closeModal() {
			this.$emit('close-modal', this.isOpen);
		}
	}
}
</script>
