<template>
	<h1>Home Page</h1>
	<div class="h-96 bg-blue-300">
		<div class="flex justify-end bg-blue-200">
			<div class="bg-gray-500" style="height: 240px; width: 320px;">
				<ChatVue />
			</div>
		</div>
	</div>
	<RouterView />
</template>

<script setup>
import ChatVue from "../components/CommunityChat.vue";

</script>
