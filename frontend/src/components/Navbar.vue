<template>
	<div class="flex h-full justify-end">
		<div class="sm:h-20 sm:w-28 grid justify-center">
			<Avatar name="G" size="80" status="online" borderColor="black" ></Avatar>
		</div>
	</div>
</template>

<script>
import Avatar from "vue3-avatar"

export default {
	name: "Navbar",
	components: {
		Avatar: Avatar,
	},
};
</script>
