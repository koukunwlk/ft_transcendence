<template>
	<h1>Home Page</h1>
	<div class="flex justify-end" style="height: 200px;">
		<ChatVue />
	</div>
	<RouterView />
</template>

<script setup>
import ChatVue from "../components/CommunityChat.vue";

</script>
