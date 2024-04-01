<template>
	<div class="flex fixed w-full justify-end">
		<div class="h-20 w-20 mt-1 mr-1 grid justify-center">
			<Avatar name="G" size="80" status="online" borderColor="black" @click="onClick()" class="cursor-pointer">
			</Avatar>
		</div>
	</div>
</template>

<script>
//@ts-ignore
import Avatar from 'vue3-avatar';

export default {
	name: "Navbar",
	components: {
		Avatar: Avatar,
	},
	methods: {
		onClick() {
			this.$router.push('/profile')
		}
	},
};
</script>
