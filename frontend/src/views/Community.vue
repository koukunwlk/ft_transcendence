<template>
    <Navbar />
	<div class="flex h-full md:h-6/6 justify-center items-center">
        <div class="flex flex-col h-4/5 w-4/5 md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white">
            <div class="w-full h-1/3 bg-white">div 1</div>
            <div class="w-full h-1/3 bg-red">div 2</div>
            <div class="w-full h-1/3 bg-white">div 3</div>
        </div>
	</div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Avatar from "vue3-avatar";
import router from '../Router/index.ts'

function onClick() {
	router.push('/')
}

</script>
