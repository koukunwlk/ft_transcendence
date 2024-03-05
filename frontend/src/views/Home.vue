<template>
	<h1>Home Page</h1>
	<div class="flex  bg-blue-200" style="height: 200px">
		<ChatVue />
	</div>
	<RouterView />
</template>

<script setup>
import ChatVue from "../components/CommunityChat.vue";

</script>
