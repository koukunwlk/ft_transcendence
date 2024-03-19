<template>
	<div class="bg-gray-900">
		<h1>Home Page</h1>
		<div class="h-96 bg-gray-900">
			<div class="flex justify-end bg-gray-900">
				<div class="bg-gray-500" style="height: 240px; width: 320px;">
					<ChatVue />
				</div>
			</div>
		</div>
		<RouterView />
	</div>
</template>

<script setup>
import ChatVue from "../components/CommunityChat.vue";

</script>
