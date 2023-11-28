<template>
	<h1>Home Page</h1>
	<Bar />
	<RouterView />
</template>

<script>
import Bar from "./components/Bar.vue"

export default {
	name: "Home",
	components: {
		Bar,
	}
};
</script>
